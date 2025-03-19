// 云函数入口文件
const cloud = require('wx-server-sdk')
const config = require('../config')

cloud.init({
  env: config.env
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookingId } = event
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  
  if (!bookingId) {
    return {
      success: false,
      message: '预约ID不能为空'
    }
  }
  
  try {
    // 查询当前预约信息
    const bookingResult = await db.collection(config.collections.bookings)
      .doc(bookingId)
      .get()
    
    if (!bookingResult.data) {
      return {
        success: false,
        message: '预约记录不存在'
      }
    }
    
    const booking = bookingResult.data
    
    // 检查预约状态是否可以取消
    if (booking.status !== 'pending' && booking.status !== 'confirmed') {
      return {
        success: false,
        message: `当前状态(${booking.status})不允许取消预约`
      }
    }
    
    // 检查是否有权限取消该预约（只能取消自己的预约）
    const userResult = await db.collection(config.collections.users)
      .where({
        openid
      })
      .get()
    
    if (!userResult.data || userResult.data.length === 0) {
      return {
        success: false,
        message: '无法验证用户身份'
      }
    }
    
    const user = userResult.data[0]
    
    if (booking.userId !== user._id) {
      return {
        success: false,
        message: '无权取消该预约'
      }
    }
    
    // 更新预约状态为已取消
    await db.collection(config.collections.bookings)
      .doc(bookingId)
      .update({
        data: {
          status: 'cancelled',
          cancelTime: db.serverDate()
        }
      })
    
    // 如果预约已确认，需要减少课程的报名人数
    if (booking.status === 'confirmed') {
      await db.collection(config.collections.courses)
        .doc(booking.courseId)
        .update({
          data: {
            enrollCount: db.command.inc(-1)
          }
        })
    }
    
    return {
      success: true,
      message: '预约已取消'
    }
  } catch (err) {
    console.error('取消预约失败:', err)
    return {
      success: false,
      message: err.message || '取消预约失败'
    }
  }
} 