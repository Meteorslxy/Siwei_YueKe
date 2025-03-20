'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { 
    courseId,
    userId,
    studentName,
    contactPhone,
    remark
  } = event;
  
  if (!courseId || !userId) {
    return {
      code: -1,
      success: false,
      message: '课程ID和用户ID不能为空'
    };
  }
  
  try {
    // 验证课程是否存在
    const courseResult = await db.collection('courses')
      .doc(courseId)
      .get();
    
    if (!courseResult.data) {
      return {
        code: -1,
        success: false,
        message: '课程不存在'
      };
    }
    
    const course = courseResult.data;
    
    // 验证名额是否已满
    if (course.enrollCount >= course.maxEnroll) {
      return {
        code: -1,
        success: false,
        message: '该课程名额已满'
      };
    }
    
    // 创建预约记录
    const bookingResult = await db.collection('bookings').add({
      courseId,
      userId,
      courseName: course.title,
      teacherName: course.teacherName,
      schoolId: course.schoolId,
      schoolName: course.schoolName,
      startTime: course.startTime,
      endTime: course.endTime,
      studentName,
      contactPhone,
      remark,
      status: 'pending', // 待确认
      createTime: new Date()
    });
    
    // 更新课程报名人数
    await db.collection('courses').doc(courseId).update({
      enrollCount: dbCmd.inc(1)
    });
    
    return {
      code: 0,
      success: true,
      data: {
        bookingId: bookingResult.id
      },
      message: '预约成功'
    };
  } catch (err) {
    console.error('预约失败:', err);
    return {
      code: -1,
      success: false,
      data: null,
      message: err.message || '预约失败'
    };
  }
}; 