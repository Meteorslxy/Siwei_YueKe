'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 数据库修复工具
 * 用于修复预约记录、课程记录等数据问题
 */
exports.main = async (event, context) => {
  console.log('fixDatabase函数收到请求:', event);
  const { action = 'analyze', collection } = event;
  
  try {
    if (collection === 'bookings' || !collection) {
      // 修复预约记录
      return await fixBookings(action);
    } else if (collection === 'courses') {
      // 修复课程记录
      return await fixCourses(action);
    } else {
      return {
        code: -1,
        success: false,
        message: `不支持的集合: ${collection}`
      };
    }
  } catch (error) {
    console.error('修复数据库出错:', error);
    return {
      code: -1,
      success: false,
      message: `执行出错: ${error.message}`
    };
  }
};

/**
 * 修复预约记录
 * @param {string} action - 操作类型：'analyze'仅分析,'fix'执行修复
 */
async function fixBookings(action) {
  console.log(`开始${action === 'fix' ? '修复' : '分析'}预约记录`);
  
  // 获取所有预约记录
  const bookingsResult = await db.collection('bookings').limit(1000).get();
  const bookings = bookingsResult.data || [];
  
  console.log(`共找到${bookings.length}条预约记录`);
  
  // 分析结果
  const stats = {
    total: bookings.length,
    noStatus: 0,
    noPaymentStatus: 0,
    noBookingId: 0,
    needsUpdate: 0,
    statusCounts: {
      pending: 0,
      confirmed: 0,
      confirmed_unpaid: 0,
      finished: 0,
      cancelled: 0,
      unknown: 0
    }
  };
  
  // 需要修复的记录
  const needsFixing = [];
  
  // 分析每条记录
  bookings.forEach(booking => {
    let needsUpdate = false;
    const fixes = {};
    
    // 检查状态
    if (!booking.status) {
      stats.noStatus++;
      fixes.status = 'pending';
      needsUpdate = true;
    } else {
      // 统计各状态数量
      if (booking.status === 'pending') {
        stats.statusCounts.pending++;
      } else if (booking.status === 'confirmed') {
        stats.statusCounts.confirmed++;
      } else if (booking.status === 'confirmed_unpaid') {
        stats.statusCounts.confirmed_unpaid++;
      } else if (booking.status === 'finished') {
        stats.statusCounts.finished++;
      } else if (booking.status === 'cancelled') {
        stats.statusCounts.cancelled++;
      } else {
        stats.statusCounts.unknown++;
      }
    }
    
    // 检查支付状态
    if (!booking.paymentStatus) {
      stats.noPaymentStatus++;
      
      // 根据status确定paymentStatus
      if (booking.status === 'confirmed') {
        fixes.paymentStatus = 'paid';
      } else {
        fixes.paymentStatus = 'unpaid';
      }
      needsUpdate = true;
    }
    
    // 检查预约编号
    if (!booking.bookingId) {
      stats.noBookingId++;
      
      // 生成预约编号
      const bookingId = booking._id.slice(-10).toUpperCase();
      fixes.bookingId = `B${bookingId}`;
      needsUpdate = true;
    }
    
    // 如果需要更新，添加到修复列表
    if (needsUpdate) {
      stats.needsUpdate++;
      needsFixing.push({
        _id: booking._id,
        currentValues: {
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          bookingId: booking.bookingId
        },
        fixes: fixes
      });
    }
  });
  
  console.log('分析结果:', stats);
  
  if (action === 'fix' && needsFixing.length > 0) {
    console.log(`开始修复${needsFixing.length}条记录`);
    
    let fixedCount = 0;
    let errorCount = 0;
    
    for (const item of needsFixing) {
      try {
        // 更新记录
        await db.collection('bookings').doc(item._id).update({
          ...item.fixes,
          updateTime: new Date()
        });
        
        console.log(`已修复记录 ${item._id}:`, item.fixes);
        fixedCount++;
      } catch (error) {
        console.error(`修复记录 ${item._id} 失败:`, error);
        errorCount++;
      }
    }
    
    return {
      code: 0,
      success: true,
      stats: stats,
      fixResult: {
        fixedCount,
        errorCount,
        totalAttempted: needsFixing.length
      },
      message: `成功修复${fixedCount}条记录，失败${errorCount}条`
    };
  }
  
  // 仅分析不修复
  return {
    code: 0,
    success: true,
    stats: stats,
    needsFixing: needsFixing.slice(0, 10), // 只返回前10条需修复记录作为示例
    message: `分析完成，发现${stats.needsUpdate}条需要修复的记录`
  };
}

/**
 * 修复课程记录
 * @param {string} action - 操作类型：'analyze'仅分析,'fix'执行修复
 */
async function fixCourses(action) {
  console.log(`开始${action === 'fix' ? '修复' : '分析'}课程记录`);
  
  // 获取所有课程记录
  const coursesResult = await db.collection('courses').limit(500).get();
  const courses = coursesResult.data || [];
  
  console.log(`共找到${courses.length}条课程记录`);
  
  // 分析结果
  const stats = {
    total: courses.length,
    noBookingCount: 0,
    needsUpdate: 0
  };
  
  // 需要修复的记录
  const needsFixing = [];
  
  // 分析每条记录
  courses.forEach(course => {
    let needsUpdate = false;
    const fixes = {};
    
    // 检查bookingCount字段
    if (course.bookingCount === undefined || course.bookingCount === null) {
      stats.noBookingCount++;
      fixes.bookingCount = 0; // 默认设置为0
      needsUpdate = true;
    }
    
    // 如果需要更新，添加到修复列表
    if (needsUpdate) {
      stats.needsUpdate++;
      needsFixing.push({
        _id: course._id,
        currentValues: {
          bookingCount: course.bookingCount
        },
        fixes: fixes
      });
    }
  });
  
  console.log('分析结果:', stats);
  
  if (action === 'fix' && needsFixing.length > 0) {
    console.log(`开始修复${needsFixing.length}条记录`);
    
    let fixedCount = 0;
    let errorCount = 0;
    
    for (const item of needsFixing) {
      try {
        // 更新记录
        await db.collection('courses').doc(item._id).update({
          ...item.fixes,
          updateTime: new Date()
        });
        
        console.log(`已修复课程记录 ${item._id}:`, item.fixes);
        fixedCount++;
      } catch (error) {
        console.error(`修复课程记录 ${item._id} 失败:`, error);
        errorCount++;
      }
    }
    
    return {
      code: 0,
      success: true,
      stats: stats,
      fixResult: {
        fixedCount,
        errorCount,
        totalAttempted: needsFixing.length
      },
      message: `成功修复${fixedCount}条课程记录，失败${errorCount}条`
    };
  }
  
  // 仅分析不修复
  return {
    code: 0,
    success: true,
    stats: stats,
    needsFixing: needsFixing.slice(0, 10), // 只返回前10条需修复记录作为示例
    message: `分析完成，发现${stats.needsUpdate}条需要修复的课程记录`
  };
} 