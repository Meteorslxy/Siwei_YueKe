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
      // 增加更多调试信息
      console.log('查询的用户ID:', userId, '类型:', typeof userId);
      
      // 增加用户ID查询的灵活性
      whereCondition.userId = userId;
    }
    
    // 按课程ID查询
    if (courseId) {
      whereCondition.courseId = courseId;
    }
    
    // 按状态查询
    if (status) {
      // 处理多状态查询，如status=pending,confirmed
      if (typeof status === 'string' && status.includes(',')) {
        const statusArray = status.split(',').map(s => s.trim());
        console.log('处理多状态查询:', statusArray);
        whereCondition.status = dbCmd.in(statusArray);
      } else if (Array.isArray(status)) {
        console.log('使用状态数组:', status);
        whereCondition.status = dbCmd.in(status);
      } else {
        whereCondition.status = status;
      }
    }
    
    // 处理"可使用"状态 - 包括待确认和已确认状态
    if (isUsable) {
      whereCondition.status = dbCmd.in(['pending', 'confirmed', 'confirmed_unpaid']);
    }
    
    console.log('查询条件:', JSON.stringify(whereCondition));
    
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
    
    // 检查关联课程是否存在
    const processedBookings = [];
    
    // 从所有预约中获取唯一的课程ID列表
    const courseIds = [...new Set(bookings.filter(booking => booking.courseId).map(booking => booking.courseId))];
    
    // 批量查询这些课程是否存在
    let existingCourseIds = [];
    if (courseIds.length > 0) {
      console.log(`检查${courseIds.length}个关联课程是否存在`);
      
      // 由于可能有很多课程ID，我们使用in条件来一次性查询
      const coursesResult = await db.collection('courses')
        .where({
          _id: dbCmd.in(courseIds)
        })
        .field({ _id: true })
        .get();
      
      existingCourseIds = coursesResult.data.map(course => course._id);
      console.log(`找到${existingCourseIds.length}个有效课程`);
    }
    
    // 处理每个预约，检查其关联的课程是否存在
    for (const booking of bookings) {
      const processedBooking = { ...booking };
      
      // 如果有课程ID但该课程不存在
      if (processedBooking.courseId && !existingCourseIds.includes(processedBooking.courseId)) {
        console.log(`预约(${processedBooking._id})关联的课程(${processedBooking.courseId})不存在，标记为已取消`);
        
        // 更新状态为已取消
        processedBooking.status = 'cancelled';
        processedBooking.paymentStatus = 'cancelled';
        
        // 添加标记，表示课程已删除
        processedBooking.isCourseDeleted = true;
        processedBooking.courseDeletedNote = '课程已删除';
        
        // 如果可以，我们可以将此信息保存到数据库
        try {
          await db.collection('bookings').doc(processedBooking._id).update({
            status: 'cancelled',
            paymentStatus: 'cancelled',
            isCourseDeleted: true,
            courseDeletedNote: '课程已删除',
            updateTime: new Date()
          });
          console.log(`已更新预约(${processedBooking._id})状态为已取消`);
        } catch (updateErr) {
          console.error(`更新预约(${processedBooking._id})状态失败:`, updateErr);
          // 继续处理，不影响返回结果
        }
      }
      
      processedBookings.push(processedBooking);
    }
    
    return {
      code: 0,
      success: true,
      data: processedBookings,
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