'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取课程ID
  const { courseId } = event;
  
  // 校验参数
  if (!courseId) {
    return {
      code: -1,
      success: false,
      message: '课程ID不能为空'
    };
  }
  
  try {
    // 查询课程详情
    const courseResult = await db.collection('courses').doc(courseId).get();
    
    if (!courseResult.data) {
      return {
        code: -1,
        success: false,
        message: '课程不存在'
      };
    }
    
    const course = courseResult.data;
    
    // 确保image字段存在，如果不存在则使用coverImage的值
    if (!course.image && course.coverImage) {
      course.image = course.coverImage;
    }
    
    // 查询教师详情（如果课程中包含教师ID）
    if (course.teacherId) {
      try {
        const teacherResult = await db.collection('teachers').doc(course.teacherId).get();
        if (teacherResult.data) {
          // 合并教师信息到课程中
          course.teacherName = teacherResult.data.name;
          course.teacherTitle = teacherResult.data.title;
          course.teacherAvatar = teacherResult.data.avatar;
          course.teacherDesc = teacherResult.data.description;
        }
      } catch (e) {
        console.error('查询教师信息失败:', e);
      }
    }
    
    // 查询已报名人数
    try {
      const bookingCount = await db.collection('bookings')
        .where({
          courseId: courseId,
          status: 'confirmed' // 只统计确认的预约
        })
        .count();
      
      course.enrolled = bookingCount.total;
    } catch (e) {
      console.error('查询报名人数失败:', e);
      course.enrolled = 0;
    }
    
    return {
      code: 0,
      success: true,
      data: course,
      message: '获取课程详情成功'
    };
  } catch (e) {
    console.error('获取课程详情失败:', e);
    return {
      code: -1,
      success: false,
      data: null,
      message: '获取课程详情失败: ' + e.message
    };
  }
}; 