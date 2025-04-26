'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 更新预约支付状态
 * 当预约状态从未支付变为已支付时，记录支付时间到paidTime字段
 * 
 * @param {Object} event - 传入参数
 * @param {String} event.bookingId - 预约ID
 * @param {String} event.paymentStatus - 支付状态：'paid'/'unpaid'/'cancelled'/'refunded'
 * @param {String} event.userId - 用户ID，用于权限验证
 * @param {Boolean} event.skipAuth - 是否跳过权限验证(仅限内部调用)
 */
exports.main = async (event, context) => {
  console.log('updateBookingPaymentStatus函数收到请求:', JSON.stringify(event));
  
  const { bookingId, paymentStatus, userId, skipAuth = false } = event;
  
  // 基本验证
  if (!bookingId) {
    return {
      code: -1,
      success: false,
      message: '缺少预约ID'
    };
  }
  
  if (!paymentStatus) {
    return {
      code: -1,
      success: false,
      message: '缺少支付状态'
    };
  }
  
  try {
    // 查询预约信息
    const bookingResult = await db.collection('bookings')
      .doc(bookingId)
      .get();
    
    if (!bookingResult.data || bookingResult.data.length === 0) {
      return {
        code: -1,
        success: false,
        message: '未找到该预约记录'
      };
    }
    
    const booking = bookingResult.data[0];
    
    // 验证权限
    if (!skipAuth) {
      if (!userId) {
        return {
          code: -1,
          success: false,
          message: '缺少用户ID'
        };
      }
      
      // 验证是否是该用户的预约
      if (booking.userId !== userId) {
        return {
          code: -1,
          success: false,
          message: '您没有权限操作该预约'
        };
      }
    }
    
    // 准备更新数据
    const updateData = {
      paymentStatus: paymentStatus,
      updateTime: new Date()
    };
    
    // 如果支付状态从unpaid变为paid，记录支付时间
    if (booking.paymentStatus !== 'paid' && paymentStatus === 'paid') {
      updateData.paidTime = new Date();
      console.log(`预约(${bookingId})支付状态变更为已支付，记录支付时间:`, updateData.paidTime);
    }
    
    // 执行更新
    await db.collection('bookings')
      .doc(bookingId)
      .update(updateData);
    
    console.log(`预约(${bookingId})支付状态已更新为${paymentStatus}`);
    
    // 返回成功结果
    return {
      code: 0,
      success: true,
      message: '支付状态更新成功',
      data: {
        bookingId,
        paymentStatus,
        ...updateData
      }
    };
    
  } catch (err) {
    console.error('更新支付状态时出错:', err);
    return {
      code: -1,
      success: false,
      message: '更新支付状态失败: ' + (err.message || '未知错误')
    };
  }
}; 