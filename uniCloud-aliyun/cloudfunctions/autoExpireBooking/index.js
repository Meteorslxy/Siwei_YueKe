'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 自动取消超时未支付的预约
 * 规则：当用户预约课程后，1分钟内没有变成支付状态，则自动取消该预约
 */
exports.main = async (event, context) => {
  console.log('autoExpireBooking函数开始执行, 参数:', JSON.stringify(event));
  
  // 检查是否为强制检查模式（前端调用）
  const forceCheck = event && event.forceCheck === true;
  if (forceCheck) {
    console.log('强制检查模式，忽略时间阈值限制');
  }
  
  try {
    // 计算时间阈值：现在时间减去1分钟
    const timeThreshold = new Date();
    timeThreshold.setMinutes(timeThreshold.getMinutes() - 1);
    
    console.log(`时间阈值: ${timeThreshold.toISOString()}，查询早于此时间且未支付的预约`);
    
    // 查询条件：
    // 1. 状态为待确认(pending)
    // 2. 支付状态为未支付(unpaid)
    // 3. 创建时间超过1分钟
    let query = {
      status: 'pending',
      paymentStatus: 'unpaid'
    };
    
    // 只有在非强制模式下才添加时间限制
    if (!forceCheck) {
      query.createTime = dbCmd.lt(timeThreshold);
    }
    
    console.log('查询条件:', JSON.stringify(query));
    
    // 如果是强制检查模式且有指定的预约ID，则只检查该预约
    if (forceCheck && event.bookingId) {
      query._id = event.bookingId;
      console.log(`强制检查指定预约: ${event.bookingId}`);
    }
    
    // 查询符合条件的预约记录
    const queryResult = await db.collection('bookings')
      .where(query)
      .limit(100) // 限制每次最多处理100条
      .get();
    
    const bookings = queryResult.data || [];
    console.log(`找到 ${bookings.length} 条超时未支付的预约记录`);
    
    // 存储已更新的预约ID
    const updatedBookingIds = [];
    
    // 更新这些预约记录
    for (const booking of bookings) {
      try {
        // 二次验证创建时间，确保真的超时了
        const createTime = new Date(booking.createTime);
        const now = new Date();
        if (isNaN(createTime.getTime())) {
          console.error(`预约(${booking._id})创建时间无效:`, booking.createTime);
          continue; // 跳过无效的时间记录
        }
        
        const elapsedMs = now.getTime() - createTime.getTime();
        if (elapsedMs < 60000) { // 小于1分钟
          console.log(`预约(${booking._id})未超时，已经过时间: ${Math.floor(elapsedMs/1000)}秒`);
          continue; // 未超时，跳过
        }
        
        console.log(`更新预约(${booking._id})状态，已超时 ${Math.floor(elapsedMs/1000)}秒`);
        
        await db.collection('bookings').doc(booking._id).update({
          status: 'cancelled',
          paymentStatus: 'cancelled',
          cancelTime: new Date(),
          updateTime: new Date(),
          cancelReason: '超时未支付，系统自动取消',
          autoCancel: true  // 标记为自动取消
        });
        
        console.log(`已自动取消预约: ${booking._id}, 原因: 超时未支付`);
        updatedBookingIds.push(booking._id);
      } catch (updateErr) {
        console.error(`更新预约(${booking._id})状态失败:`, updateErr);
      }
    }
    
    return {
      code: 0,
      success: true,
      message: `已自动取消 ${updatedBookingIds.length} 条超时未支付的预约`,
      updatedBookingIds: updatedBookingIds
    };
  } catch (err) {
    console.error('自动取消预约失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '自动取消预约失败'
    };
  }
}; 