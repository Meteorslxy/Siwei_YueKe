// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取课程ID
  const { courseId } = event
  
  // 校验参数
  if (!courseId) {
    return {
      success: false,
      message: '课程ID不能为空'
    }
  }
  
  try {
    // 查询课程详情
    const courseResult = await db.collection('courses').doc(courseId).get()
    
    if (!courseResult.data) {
      return {
        success: false,
        message: '课程不存在'
      }
    }
    
    const course = courseResult.data
    
    // 查询教师详情（如果课程中包含教师ID）
    if (course.teacherId) {
      try {
        const teacherResult = await db.collection('teachers').doc(course.teacherId).get()
        if (teacherResult.data) {
          // 合并教师信息到课程中
          course.teacherName = teacherResult.data.name
          course.teacherTitle = teacherResult.data.title
          course.teacherAvatar = teacherResult.data.avatar
          course.teacherDesc = teacherResult.data.description
        }
      } catch (e) {
        console.error('查询教师信息失败:', e)
      }
    }
    
    // 查询已报名人数
    try {
      const bookingCount = await db.collection('bookings')
        .where({
          courseId: courseId,
          status: 'confirmed' // 只统计确认的预约
        })
        .count()
      
      course.enrolled = bookingCount.total
    } catch (e) {
      console.error('查询报名人数失败:', e)
      course.enrolled = 0
    }
    
    return {
      success: true,
      data: course
    }
  } catch (e) {
    console.error('获取课程详情失败:', e)
    return {
      success: false,
      message: '获取课程详情失败'
    }
  }
} 