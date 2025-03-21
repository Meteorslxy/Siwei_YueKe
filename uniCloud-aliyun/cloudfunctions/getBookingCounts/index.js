'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { userId } = event;
  
  if (!userId) {
    return {
      code: -1,
      success: false,
      message: '用户ID不能为空'
    };
  }
  
  try {
    // 状态计数的Promise数组
    const countPromises = [
      // 待确认的预约数量
      db.collection('bookings')
        .where({
          userId,
          status: 'pending'
        })
        .count(),
      
      // 已确认的预约数量
      db.collection('bookings')
        .where({
          userId,
          status: 'confirmed'
        })
        .count(),
      
      // 已完成的预约数量
      db.collection('bookings')
        .where({
          userId,
          status: 'finished'
        })
        .count(),
      
      // 已取消的预约数量
      db.collection('bookings')
        .where({
          userId,
          status: 'cancelled'
        })
        .count(),
      
      // 全部预约数量
      db.collection('bookings')
        .where({
          userId
        })
        .count()
    ];
    
    // 并行执行所有计数查询
    const [
      pendingCount,
      confirmedCount,
      finishedCount,
      cancelledCount,
      allCount
    ] = await Promise.all(countPromises);
    
    return {
      code: 0,
      success: true,
      data: {
        counts: {
          pending: pendingCount.total,
          confirmed: confirmedCount.total,
          finished: finishedCount.total,
          cancelled: cancelledCount.total,
          all: allCount.total
        }
      },
      message: '获取预约数量成功'
    };
  } catch (err) {
    console.error('获取预约数量失败:', err);
    return {
      code: -1,
      success: false,
      data: null,
      message: err.message || '获取预约数量失败'
    };
  }
}; 