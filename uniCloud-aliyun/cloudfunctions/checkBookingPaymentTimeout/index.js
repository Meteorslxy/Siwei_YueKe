'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 检查预约支付超时
 * 前端调用函数，检查指定预约是否超时未支付
 */
exports.main = async (event, context) => {
  console.log('checkBookingPaymentTimeout函数收到请求:', JSON.stringify(event));
  
  try {
    // 获取必要参数
    const { bookingId } = event;
    
    if (!bookingId) {
      console.error('缺少预约ID参数');
      return {
        code: -1,
        success: false,
        message: '缺少预约ID参数'
      };
    }
    
    // 查询预约记录
    console.log(`查询预约记录(ID: ${bookingId})`);
    const bookingResult = await db.collection('bookings').doc(bookingId).get();
    
    if (!bookingResult.data || bookingResult.data.length === 0) {
      console.error(`未找到预约记录(ID: ${bookingId})`);
      return {
        code: -1,
        success: false,
        message: '未找到预约记录'
      };
    }
    
    const booking = bookingResult.data[0];
    console.log(`找到预约记录:`, JSON.stringify(booking));
    
    // 预约不是pending状态，或已支付，无需检查
    if (booking.status !== 'pending' || booking.paymentStatus === 'paid') {
      console.log(`预约无需检查超时(状态:${booking.status}, 支付状态:${booking.paymentStatus})`);
      return {
        code: 0,
        success: true,
        expired: false,
        booking
      };
    }
    
    // 确保创建时间是有效的日期对象
    let createTime;
    try {
      createTime = new Date(booking.createTime);
      if (isNaN(createTime.getTime())) {
        console.error(`预约创建时间格式无效:`, booking.createTime);
        createTime = new Date(); // 如果无效，使用当前时间作为创建时间
        createTime.setMinutes(createTime.getMinutes() - 2); // 假设已经超时
      }
    } catch (err) {
      console.error(`解析预约创建时间出错:`, err);
      createTime = new Date();
      createTime.setMinutes(createTime.getMinutes() - 2); // 假设已经超时
    }
    
    // 计算时间阈值：创建时间 + 1分钟
    const timeoutThreshold = new Date(createTime.getTime() + 60000); // +1分钟(60000毫秒)
    const now = new Date();
    
    console.log(`预约时间信息 - 创建时间:${createTime.toISOString()}, 超时阈值:${timeoutThreshold.toISOString()}, 当前时间:${now.toISOString()}`);
    
    // 检查是否已超时
    const isExpired = now > timeoutThreshold;
    console.log(`预约是否超时: ${isExpired}，当前时间(毫秒): ${now.getTime()}, 超时阈值(毫秒): ${timeoutThreshold.getTime()}, 时间差(秒): ${(now.getTime() - timeoutThreshold.getTime())/1000}`);
    
    // 强制检查时间差，防止因时区或其他问题导致比较不准确
    const timeElapsedMs = now.getTime() - createTime.getTime();
    const forcedExpired = timeElapsedMs >= 60000; // 60秒 = 1分钟
    console.log(`强制检查超时: ${forcedExpired}, 已过时间(毫秒): ${timeElapsedMs}, 已过时间(秒): ${timeElapsedMs/1000}`);
    
    // 如果任一条件满足，则认为已超时
    if (isExpired || forcedExpired) {
      try {
        console.log(`预约已超时，更新状态为已取消(ID: ${bookingId})`);
        await db.collection('bookings').doc(bookingId).update({
          status: 'cancelled',
          paymentStatus: 'cancelled',
          cancelTime: new Date(),
          updateTime: new Date(),
          cancelReason: '超时未支付，系统自动取消',
          autoCancel: true
        });
        
        console.log(`已自动取消预约: ${bookingId}, 原因: 超时未支付`);
        
        return {
          code: 0,
          success: true,
          expired: true,
          message: '预约已超时未支付，已自动取消',
          booking: {
            ...booking,
            status: 'cancelled',
            paymentStatus: 'cancelled',
            cancelReason: '超时未支付，系统自动取消',
            autoCancel: true
          }
        };
      } catch (updateErr) {
        console.error(`更新预约(${bookingId})状态失败:`, updateErr);
        return {
          code: -1,
          success: false,
          message: '更新预约状态失败'
        };
      }
    }
    
    // 计算剩余时间（秒）
    const remainingTime = Math.max(0, Math.floor((timeoutThreshold - now) / 1000));
    console.log(`预约支付剩余时间: ${remainingTime}秒`);
    
    return {
      code: 0,
      success: true,
      expired: false,
      booking,
      remainingTime,
      createTime: createTime.toISOString(),
      timeoutThreshold: timeoutThreshold.toISOString()
    };
  } catch (err) {
    console.error('检查预约支付超时失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '检查预约支付超时失败'
    };
  }
}; 