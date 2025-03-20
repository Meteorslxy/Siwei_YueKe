'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;
const MAX_LIMIT = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取请求参数
  const { subject, gradeLevel, skip = 0, limit = 10 } = event;
  
  try {
    // 构建查询条件
    const query = {};
    
    // 添加学科筛选
    if (subject) {
      query.subject = subject;
    }
    
    // 添加年级筛选
    if (gradeLevel) {
      query.gradeLevel = gradeLevel;
    }
    
    // 查询符合条件的总数
    const countResult = await db.collection('courses')
      .where(query)
      .count();
    
    const total = countResult.total;
    
    // 查询符合条件的记录
    const courseResult = await db.collection('courses')
      .where(query)
      .skip(skip)
      .limit(limit)
      .orderBy('createTime', 'desc')
      .get();
    
    // 获取所有课程ID
    const courseIds = courseResult.data.map(course => course._id);
    
    // 批量查询课程的预约数量
    const bookingsCountMap = {};
    
    // 这里使用了一个技巧，将所有课程ID分批次查询预约数量
    if (courseIds.length > 0) {
      const batchTasks = [];
      // 将课程ID分批，每批最多20个
      const batchSize = 20;
      
      for (let i = 0; i < courseIds.length; i += batchSize) {
        const batch = courseIds.slice(i, i + batchSize);
        
        const promise = db.collection('bookings')
          .where({
            courseId: dbCmd.in(batch),
            status: 'confirmed'
          })
          .get();
        
        batchTasks.push(promise);
      }
      
      const bookingResults = await Promise.all(batchTasks);
      
      // 统计每个课程的预约数量
      bookingResults.forEach(result => {
        if (result.data && result.data.length > 0) {
          result.data.forEach(booking => {
            if (!bookingsCountMap[booking.courseId]) {
              bookingsCountMap[booking.courseId] = 0;
            }
            bookingsCountMap[booking.courseId]++;
          });
        }
      });
    }
    
    // 将预约数量添加到课程信息中
    const courses = courseResult.data.map(course => {
      course.enrolled = bookingsCountMap[course._id] || 0;
      return course;
    });
    
    // 查询课程关联的教师信息
    const teacherIds = courses
      .filter(course => course.teacherId)
      .map(course => course.teacherId)
      .filter((id, index, self) => self.indexOf(id) === index); // 去重
    
    const teacherMap = {};
    
    if (teacherIds.length > 0) {
      const teacherResult = await db.collection('teachers')
        .where({
          _id: dbCmd.in(teacherIds)
        })
        .get();
      
      teacherResult.data.forEach(teacher => {
        teacherMap[teacher._id] = teacher;
      });
    }
    
    // 将教师信息添加到课程中
    courses.forEach(course => {
      if (course.teacherId && teacherMap[course.teacherId]) {
        const teacher = teacherMap[course.teacherId];
        course.teacherName = teacher.name;
        course.teacherTitle = teacher.title;
        course.teacherAvatar = teacher.avatar;
      }
    });
    
    return {
      code: 0,
      success: true,
      total: total,
      data: courses,
      message: '获取课程列表成功'
    };
  } catch (e) {
    console.error('获取课程列表失败:', e);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取课程列表失败: ' + e.message
    };
  }
}; 