'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 预约状态处理工具
const statusUtils = {
  // 确保预约记录有正确的状态字段
  normalizeStatus(booking) {
    if (!booking) return booking;
    
    // 复制一份以便修改
    const newBooking = {...booking};
    
    // 状态处理
    if (!newBooking.status) {
      newBooking.status = 'pending';
    }
    
    // 支付状态处理
    if (!newBooking.paymentStatus) {
      // 如果已确认且没有支付状态，默认为未支付
      if (newBooking.status === 'confirmed') {
        newBooking.paymentStatus = 'unpaid';
        // 重新调整状态为confirmed_unpaid
        newBooking.status = 'confirmed_unpaid';
      } else {
        newBooking.paymentStatus = 'unpaid';
      }
    }
    
    return newBooking;
  }
};

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('getBookings函数收到请求:', event);
  
  const { 
    userId, 
    courseId,
    status, 
    limit = 10, 
    skip = 0,
    isUsable = false // 新增isUsable参数，用于过滤可用的预约
  } = event;
  
  if (!userId && !courseId) {
    console.log('缺少查询参数，需要userId或courseId');
    return {
      code: -1,
      success: false,
      message: '参数错误，请提供用户ID或课程ID'
    };
  }
  
  try {
    // 构建查询条件
    const whereCondition = {};
    
    // 按用户ID查询
    if (userId) {
      whereCondition.userId = userId;
    }
    
    // 按课程ID查询
    if (courseId) {
      whereCondition.courseId = courseId;
    }
    
    // 按状态查询
    if (status) {
      whereCondition.status = status;
    }
    
    // 处理"可使用"状态 - 包括待确认和已确认状态，排除已取消状态
    if (isUsable) {
      whereCondition.status = dbCmd.in(['pending', 'confirmed', 'confirmed_unpaid']);
    }
    
    console.log('查询条件:', whereCondition);
    
    // 先获取总数
    const countResult = await db.collection('bookings')
      .where(whereCondition)
      .count();
    
    const total = countResult.total;
    console.log('总记录数:', total);
    
    // 查询数据
    const result = await db.collection('bookings')
      .where(whereCondition)
      .skip(skip)
      .limit(limit)
      .orderBy('createTime', 'desc')
      .get();
    
    // 处理数据，确保所有记录都有正确的状态字段
    let bookings = result.data || [];
    bookings = bookings.map(statusUtils.normalizeStatus);
    
    console.log(`查询到${bookings.length}条记录`);
    
    return {
      code: 0,
      success: true,
      data: bookings,
      total: total,
      message: '获取预约记录成功'
    };
  } catch (err) {
    console.error('获取预约记录失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '获取预约记录失败'
    };
  }
}; 