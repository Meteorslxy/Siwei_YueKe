'use strict';

const db = uniCloud.database();
const bookingsCollection = db.collection('bookings');
const coursesCollection = db.collection('courses');

exports.main = async (event, context) => {
  console.log('getUserBookings函数接收参数:', event);
  
  // 从请求体提取参数
  const { userId, status = [] } = event;
  
  // 参数校验
  if (!userId) {
    return {
      success: false,
      message: "缺少用户ID参数",
      data: []
    };
  }
  
  try {
    const db = uniCloud.database();
    const $ = db.command.aggregate;
    
    // 构建查询条件
    const whereCondition = { userId };
    
    // 根据参数添加状态筛选
    if (status && status.length > 0) {
      // 使用 in 操作符筛选多个状态
      whereCondition.status = db.command.in(status);
      console.log('按指定状态筛选预约:', status);
    } else {
      // 如果没有指定状态，默认排除已取消的预约
      whereCondition.status = db.command.nin(['cancelled', 'cancel']);
      console.log('默认查询所有非取消状态的预约');
    }
    
    console.log('查询条件:', whereCondition);
    
    // 获取用户的预约记录
    const bookingsResult = await db.collection('bookings')
      .where(whereCondition)
      .orderBy('createTime', 'desc')
      .get();
    
    // 从预约记录中提取课程ID
    const bookings = bookingsResult.data;
    console.log('查询到预约记录数量:', bookings.length);
    
    if (bookings.length === 0) {
      return {
        success: true,
        message: "未查询到预约记录",
        data: []
      };
    }
    
    // 提取所有课程ID
    const courseIds = bookings.map(booking => booking.courseId).filter(id => id);
    
    // 获取所有课程详情
    const coursesResult = await db.collection('courses')
      .where({
        _id: db.command.in(courseIds)
      })
      .get();
    
    // 创建课程ID到课程信息的映射
    const courseMap = {};
    coursesResult.data.forEach(course => {
      courseMap[course._id] = course;
    });
    
    // 获取课程的排课信息
    const scheduleResult = await db.collection('course_schedule')
      .where({
        courseId: db.command.in(courseIds)
      })
      .get();
    
    // 创建课程ID到排课信息的映射
    const scheduleMap = {};
    scheduleResult.data.forEach(schedule => {
      // 只保留未取消的时间槽
      if (schedule.timeSlots && schedule.timeSlots.length > 0) {
        schedule.timeSlots = schedule.timeSlots.filter(slot => slot.status !== 'cancelled');
      }
      scheduleMap[schedule.courseId] = schedule;
    });
    
    // 为每个预约记录添加课程详情和排课信息
    bookings.forEach(booking => {
      if (booking.courseId && courseMap[booking.courseId]) {
        booking.courseInfo = courseMap[booking.courseId];
        
        // 添加排课信息中的时间槽到课程信息中
        if (scheduleMap[booking.courseId] && scheduleMap[booking.courseId].timeSlots) {
          booking.courseInfo.timeSlots = scheduleMap[booking.courseId].timeSlots;
        }
      }
    });
    
    return {
      success: true,
      message: "查询成功",
      data: bookings
    };
  } catch (error) {
    console.error('获取用户预约记录失败:', error);
    return {
      success: false,
      message: error.message || "获取预约记录失败",
      data: []
    };
  }
}; 