'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 处理预约退款
 * 只有已支付(paid)状态的预约可以被退款
 * 
 * @param {Object} event - 传入参数
 * @param {String} event.bookingId - 预约ID
 * @param {String} event.userId - 用户ID, 用于验证操作权限
 * @param {String} event.adminId - 管理员ID，如果是管理员操作，可以忽略userId验证
 * @param {String} event.refundReason - 退款原因 
 * @param {Boolean} event.skipAuth - 是否跳过权限验证(仅限内部调用)
 */
exports.main = async (event, context) => {
  console.log('refundBookingPayment函数收到请求:', JSON.stringify(event));
  
  const { bookingId, userId, adminId, refundReason, skipAuth = false } = event;
  
  // 基本验证
  if (!bookingId) {
    return {
      code: -1,
      success: false,
      message: '缺少预约ID'
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
    if (!skipAuth && !adminId) {
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
    
    // 验证预约状态
    if (booking.paymentStatus !== 'paid') {
      return {
        code: -1,
        success: false,
        message: '只有已支付的预约可以申请退款',
        currentStatus: booking.paymentStatus
      };
    }
    
    // 更新预约状态为已退款
    const updateData = {
      paymentStatus: 'refunded',
      refundTime: new Date(),
      updateTime: new Date(),
      refundReason: refundReason || '用户申请退款'
    };
    
    // 执行更新
    await db.collection('bookings')
      .doc(bookingId)
      .update(updateData);
    
    console.log(`预约(${bookingId})已更新为已退款状态`);
    
    // 返回成功结果
    return {
      code: 0,
      success: true,
      message: '退款处理成功',
      data: {
        bookingId,
        ...updateData
      }
    };
    
  } catch (err) {
    console.error('处理预约退款时出错:', err);
    return {
      code: -1,
      success: false,
      message: '处理退款失败: ' + (err.message || '未知错误')
    };
  }
}; 