'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 此函数用于修复所有预约记录的状态字段
 * 1. 将没有status字段的记录设置为'pending'（未缴费）
 * 2. 添加paymentStatus字段，未支付状态
 */
exports.main = async (event, context) => {
  console.log('开始修复预约记录状态');
  const { fix = true } = event;
  
  try {
    // 查询所有预约记录
    const bookingsResult = await db.collection('bookings').limit(1000).get();
    const bookings = bookingsResult.data || [];
    
    console.log(`共找到${bookings.length}条预约记录`);
    
    // 统计各种情况的记录数
    const stats = {
      noStatus: 0,
      pendingStatus: 0,
      confirmedStatus: 0,
      finishedStatus: 0,
      cancelledStatus: 0,
      otherStatus: 0,
      noPaymentStatus: 0
    };
    
    // 需要修复的记录
    const needsFix = [];
    
    // 分析记录
    bookings.forEach(booking => {
      if (!booking.status) {
        stats.noStatus++;
        needsFix.push({
          _id: booking._id,
          currentStatus: booking.status,
          newStatus: 'pending'
        });
      } else if (booking.status === 'pending') {
        stats.pendingStatus++;
      } else if (booking.status === 'confirmed') {
        stats.confirmedStatus++;
      } else if (booking.status === 'finished') {
        stats.finishedStatus++;
      } else if (booking.status === 'cancelled') {
        stats.cancelledStatus++;
      } else {
        stats.otherStatus++;
      }
      
      if (!booking.paymentStatus) {
        stats.noPaymentStatus++;
      }
    });
    
    console.log('记录状态统计:', stats);
    console.log('需要修复的记录数:', needsFix.length);
    
    // 只有当fix参数为true时才执行修复操作
    if (fix && needsFix.length > 0) {
      console.log('开始执行修复操作');
      
      // 修复没有状态的记录
      for (const item of needsFix) {
        await db.collection('bookings').doc(item._id).update({
          status: item.newStatus,
          paymentStatus: 'unpaid',
          updateTime: new Date()
        });
        console.log(`已修复记录: ${item._id}, 新状态: ${item.newStatus}`);
      }
      
      // 为所有已有状态但没有支付状态的记录添加支付状态
      if (stats.noPaymentStatus > 0) {
        const updateResult = await db.collection('bookings')
          .where({
            paymentStatus: dbCmd.exists(false)
          })
          .update({
            paymentStatus: 'unpaid',
            updateTime: new Date()
          });
        
        console.log(`已为${updateResult.updated || 0}条记录添加支付状态`);
      }
      
      return {
        code: 0,
        message: `成功修复${needsFix.length}条记录，${stats.noPaymentStatus}条记录添加了支付状态`,
        stats: stats
      };
    }
    
    return {
      code: 0,
      message: '分析完成，未执行修复操作',
      stats: stats,
      needsFix: needsFix
    };
  } catch (error) {
    console.error('修复过程中发生错误:', error);
    return {
      code: -1,
      message: '修复过程中发生错误: ' + error.message,
      error: error
    };
  }
}; 