// 云函数入口文件
const cloud = require('wx-server-sdk')
const config = require('../config')

cloud.init({
  env: config.env
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { userId } = event
  
  if (!userId) {
    return {
      success: false,
      message: '用户ID不能为空'
    }
  }
  
  try {
    // 状态计数的Promise数组
    const countPromises = [
      // 待确认的预约数量
      db.collection(config.collections.bookings)
        .where({
          userId,
          status: 'pending'
        })
        .count(),
      
      // 已确认的预约数量
      db.collection(config.collections.bookings)
        .where({
          userId,
          status: 'confirmed'
        })
        .count(),
      
      // 已完成的预约数量
      db.collection(config.collections.bookings)
        .where({
          userId,
          status: 'finished'
        })
        .count(),
      
      // 已取消的预约数量
      db.collection(config.collections.bookings)
        .where({
          userId,
          status: 'cancelled'
        })
        .count(),
      
      // 全部预约数量
      db.collection(config.collections.bookings)
        .where({
          userId
        })
        .count()
    ]
    
    // 并行执行所有计数查询
    const [
      pendingCount,
      confirmedCount,
      finishedCount,
      cancelledCount,
      allCount
    ] = await Promise.all(countPromises)
    
    return {
      success: true,
      counts: {
        pending: pendingCount.total,
        confirmed: confirmedCount.total,
        finished: finishedCount.total,
        cancelled: cancelledCount.total,
        all: allCount.total
      }
    }
  } catch (err) {
    console.error('获取预约数量失败:', err)
    return {
      success: false,
      message: err.message || '获取预约数量失败'
    }
  }
} 