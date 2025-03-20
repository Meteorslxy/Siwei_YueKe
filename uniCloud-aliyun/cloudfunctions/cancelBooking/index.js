'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookingId, userId } = event;
  
  if (!bookingId) {
    return {
      code: -1,
      success: false,
      message: '预约ID不能为空'
    };
  }
  
  if (!userId) {
    return {
      code: -1,
      success: false,
      message: '用户ID不能为空'
    };
  }
  
  try {
    // 查询当前预约信息
    const bookingResult = await db.collection('bookings')
      .doc(bookingId)
      .get();
    
    if (!bookingResult.data) {
      return {
        code: -1,
        success: false,
        message: '预约记录不存在'
      };
    }
    
    const booking = bookingResult.data;
    
    // 检查预约状态是否可以取消
    if (booking.status !== 'pending' && booking.status !== 'confirmed') {
      return {
        code: -1,
        success: false,
        message: `当前状态(${booking.status})不允许取消预约`
      };
    }
    
    // 检查是否有权限取消该预约（只能取消自己的预约）
    if (booking.userId !== userId) {
      return {
        code: -1,
        success: false,
        message: '无权取消该预约'
      };
    }
    
    // 更新预约状态为已取消
    await db.collection('bookings')
      .doc(bookingId)
      .update({
        status: 'cancelled',
        cancelTime: new Date()
      });
    
    // 如果预约已确认，需要减少课程的报名人数
    if (booking.status === 'confirmed' && booking.courseId) {
      await db.collection('courses')
        .doc(booking.courseId)
        .update({
          enrollCount: dbCmd.inc(-1)
        });
    }
    
    return {
      code: 0,
      success: true,
      message: '预约已取消'
    };
  } catch (err) {
    console.error('取消预约失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '取消预约失败'
    };
  }
}; 