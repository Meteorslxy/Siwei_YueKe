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
    userId, 
    status, 
    limit = 10, 
    skip = 0 
  } = event
  
  if (!userId) {
    return {
      success: false,
      message: '用户ID不能为空'
    }
  }
  
  try {
    // 构建查询条件
    const query = { userId }
    
    // 如果指定了状态，添加到查询条件中
    if (status) {
      query.status = status
    }
    
    // 查询符合条件的总数
    const countResult = await db.collection(config.collections.bookings)
      .where(query)
      .count()
    
    const total = countResult.total
    
    // 查询预约记录
    const bookingResult = await db.collection(config.collections.bookings)
      .where(query)
      .skip(skip)
      .limit(limit)
      .orderBy('createTime', 'desc')
      .get()
    
    // 获取所有关联的课程ID
    const courseIds = bookingResult.data
      .map(booking => booking.courseId)
      .filter((id, index, self) => self.indexOf(id) === index) // 去重
    
    // 查询课程信息
    const courseMap = {}
    
    if (courseIds.length > 0) {
      const courseResult = await db.collection(config.collections.courses)
        .where({
          _id: db.command.in(courseIds)
        })
        .get()
      
      courseResult.data.forEach(course => {
        courseMap[course._id] = course
      })
    }
    
    // 将课程信息添加到预约记录中
    const bookings = bookingResult.data.map(booking => {
      const course = courseMap[booking.courseId] || {}
      
      // 格式化预约编号
      const bookingId = booking._id.slice(-10).toUpperCase()
      
      return {
        _id: booking._id,
        bookingId: `B${bookingId}`,
        userId: booking.userId,
        courseId: booking.courseId,
        courseTitle: course.title || booking.courseName || '未知课程',
        courseStartTime: course.startTime || booking.startTime,
        courseEndTime: course.endTime || booking.endTime,
        schoolName: course.schoolName || booking.schoolName || '未知校区',
        studentName: booking.studentName,
        contactPhone: booking.contactPhone,
        remark: booking.remark,
        status: booking.status,
        createTime: booking.createTime
      }
    })
    
    return {
      success: true,
      total,
      data: bookings
    }
  } catch (err) {
    console.error('获取预约记录失败:', err)
    return {
      success: false,
      message: err.message || '获取预约记录失败'
    }
  }
} 