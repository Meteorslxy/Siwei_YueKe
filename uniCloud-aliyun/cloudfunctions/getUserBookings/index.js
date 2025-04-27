'use strict';

const db = uniCloud.database();
const bookingsCollection = db.collection('bookings');
const coursesCollection = db.collection('courses');

exports.main = async (event, context) => {
  // 解析请求参数
  const { userId, status } = event;
  console.log('getUserBookings 请求参数:', event);
  
  if (!userId) {
    return {
      success: false,
      message: '请提供用户ID',
      data: []
    };
  }
  
  try {
    const bookingDB = db.collection('booking');
    const courseScheduleDB = db.collection('course_schedule');
    
    // 查询条件
    let where = { userId };
    
    // 如果指定了状态，则添加到查询条件
    if (status) {
      where.status = status;
    }
    
    // 查询用户所有预约记录
    const bookingRes = await bookingDB.where(where).get();
    console.log('预约记录查询结果:', bookingRes);
    
    // 获取用户的学生ID，用于查询课程日程表
    let studentId = userId;
    // 如果需要，可以从用户表查询学生ID
    // const userDB = db.collection('user');
    // const userRes = await userDB.where({ _id: userId }).get();
    // if (userRes && userRes.data && userRes.data.length > 0) {
    //   studentId = userRes.data[0].studentId || userId;
    // }
    
    // 查询用户在课程日程表中的记录
    const scheduleRes = await courseScheduleDB.where({
      students: studentId
    }).get();
    console.log('课程日程表查询结果:', scheduleRes);
    
    // 创建课程ID集合，用于去重
    const courseIdSet = new Set();
    
    // 处理预约记录
    const bookingData = bookingRes.data || [];
    bookingData.forEach(booking => {
      if (booking.courseId) {
        courseIdSet.add(booking.courseId);
      } else if (booking.courseInfo && booking.courseInfo._id) {
        courseIdSet.add(booking.courseInfo._id);
      }
    });
    
    // 处理课程日程表记录
    const scheduleData = scheduleRes.data || [];
    scheduleData.forEach(schedule => {
      if (schedule.courseId) {
        courseIdSet.add(schedule.courseId);
      }
    });
    
    // 将课程ID集合转换为数组
    const courseIds = Array.from(courseIdSet);
    
    // 如果没有课程ID，直接返回预约记录
    if (courseIds.length === 0) {
      return {
        success: true,
        message: '查询成功',
        data: bookingData
      };
    }
    
    // 查询所有相关课程的详细信息
    const courseDB = db.collection('course');
    const courseRes = await courseDB.where({
      _id: db.command.in(courseIds)
    }).get();
    console.log('课程详情查询结果:', courseRes);
    
    // 课程映射表，方便查找
    const courseMap = {};
    if (courseRes && courseRes.data) {
      courseRes.data.forEach(course => {
        courseMap[course._id] = course;
      });
    }
    
    // 合并结果
    let result = [...bookingData];
    
    // 为结果中没有完整课程信息的记录添加详细信息
    result.forEach(item => {
      if (!item.courseInfo && item.courseId && courseMap[item.courseId]) {
        item.courseInfo = courseMap[item.courseId];
      }
    });
    
    // 添加日程表中的课程（如果预约记录中没有）
    scheduleData.forEach(schedule => {
      if (!schedule.courseId) return;
      
      // 检查该课程是否已经在结果中
      const existsInResult = result.some(item => 
        (item.courseId === schedule.courseId) || 
        (item.courseInfo && item.courseInfo._id === schedule.courseId)
      );
      
      // 如果不在结果中，添加一条记录
      if (!existsInResult && courseMap[schedule.courseId]) {
        result.push({
          _id: 'schedule_' + schedule._id, // 添加前缀防止ID冲突
          courseId: schedule.courseId,
          userId: userId,
          status: 'confirmed', // 日程表中的课程默认为已确认状态
          courseInfo: courseMap[schedule.courseId],
          createdDate: schedule.createdDate || new Date(),
          fromSchedule: true, // 标记来源于日程表
          scheduleId: schedule._id
        });
      }
    });
    
    console.log('合并后的结果数量:', result.length);
    
    return {
      success: true,
      message: '查询成功',
      data: result
    };
    
  } catch (e) {
    console.error('getUserBookings 错误:', e);
    return {
      success: false,
      message: '查询失败: ' + e.message,
      data: []
    };
  }
}; 