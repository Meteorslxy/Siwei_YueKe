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
    // 查询用户ID
    const userResult = await db.collection(config.collections.users)
      .where({
        openid
      })
      .get()
    
    if (!userResult.data || userResult.data.length === 0) {
      return {
        success: false,
        message: '用户不存在'
      }
    }
    
    const userId = userResult.data[0]._id
    
    // 查询预约详情
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
    
    // 检查权限（只能查看自己的预约）
    if (booking.userId !== userId) {
      return {
        success: false,
        message: '无权查看该预约'
      }
    }
    
    // 查询关联的课程信息
    let course = {}
    
    if (booking.courseId) {
      try {
        const courseResult = await db.collection(config.collections.courses)
          .doc(booking.courseId)
          .get()
        
        if (courseResult.data) {
          course = courseResult.data
        }
      } catch (err) {
        console.error('查询课程信息失败:', err)
      }
    }
    
    // 格式化预约编号
    const bookingId = booking._id.slice(-10).toUpperCase()
    
    // 构建详细信息
    const bookingDetail = {
      _id: booking._id,
      bookingId: `B${bookingId}`,
      userId: booking.userId,
      courseId: booking.courseId,
      courseTitle: course.title || booking.courseName || '未知课程',
      courseStartTime: course.startTime || booking.startTime,
      courseEndTime: course.endTime || booking.endTime,
      schoolName: course.schoolName || booking.schoolName || '未知校区',
      studentName: booking.studentName,
      contactPhone: booking.contactPhone,
      remark: booking.remark,
      status: booking.status,
      createTime: booking.createTime,
      confirmTime: booking.confirmTime,
      cancelTime: booking.cancelTime,
      finishTime: booking.finishTime
    }
    
    return {
      success: true,
      data: bookingDetail
    }
  } catch (err) {
    console.error('获取预约详情失败:', err)
    return {
      success: false,
      message: err.message || '获取预约详情失败'
    }
  }
} 