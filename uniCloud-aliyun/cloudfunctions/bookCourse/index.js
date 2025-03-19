// 云函数入口文件
const cloud = require('wx-server-sdk')
const config = require('../config')

cloud.init({
  env: config.env
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { 
    courseId,
    userId,
    studentName,
    contactPhone,
    remark
  } = event
  
  if (!courseId || !userId) {
    return {
      success: false,
      errMsg: '课程ID和用户ID不能为空'
    }
  }
  
  try {
    // 验证课程是否存在
    const courseResult = await db.collection(config.collections.courses)
      .doc(courseId)
      .get()
    
    if (!courseResult.data) {
      return {
        success: false,
        errMsg: '课程不存在'
      }
    }
    
    const course = courseResult.data
    
    // 验证名额是否已满
    if (course.enrollCount >= course.maxEnroll) {
      return {
        success: false,
        errMsg: '该课程名额已满'
      }
    }
    
    // 创建预约记录
    const bookingResult = await db.collection(config.collections.bookings).add({
      data: {
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
        createTime: db.serverDate()
      }
    })
    
    // 更新课程报名人数
    await db.collection(config.collections.courses).doc(courseId).update({
      data: {
        enrollCount: db.command.inc(1)
      }
    })
    
    return {
      success: true,
      bookingId: bookingResult._id
    }
  } catch (err) {
    return {
      success: false,
      errMsg: err.message || '预约失败'
    }
  }
} 