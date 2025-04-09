'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('updateCourseBookingCount函数收到请求:', JSON.stringify(event));
  
  // 支持单独更新某个课程或更新所有课程
  const { courseId, updateAll = false } = event;
  
  try {
    // 如果指定了课程ID，只更新该课程
    if (courseId && !updateAll) {
      console.log(`更新指定课程(${courseId})的报名人数`);
      const result = await updateSingleCourseBookingCount(courseId);
      return {
        code: 0,
        success: true,
        data: result,
        message: `课程(${courseId})报名人数更新成功`
      };
    } 
    // 否则更新所有课程
    else {
      console.log('更新所有课程的报名人数');
      const result = await updateAllCoursesBookingCount();
      return {
        code: 0,
        success: true,
        data: result,
        message: `${result.updatedCount}个课程报名人数更新成功`
      };
    }
  } catch (error) {
    console.error('更新课程报名人数失败:', error);
    return {
      code: -1,
      success: false,
      message: error.message || '更新课程报名人数失败'
    };
  }
};

// 更新单个课程的报名人数
async function updateSingleCourseBookingCount(courseId) {
  // 确保课程存在
  const courseResult = await db.collection('courses').doc(courseId).get();
  if (!courseResult.data) {
    throw new Error(`课程(${courseId})不存在`);
  }
  
  // 查询该课程的有效预约数量（状态为pending或confirmed）
  const bookingCountResult = await db.collection('bookings')
    .where({
      courseId: courseId,
      status: dbCmd.in(['pending', 'confirmed', 'confirmed_unpaid'])
    })
    .count();
  
  const bookingCount = bookingCountResult.total;
  console.log(`课程(${courseId})有效预约数量:`, bookingCount);
  
  // 更新课程的报名人数
  const updateResult = await db.collection('courses')
    .doc(courseId)
    .update({
      bookingCount: bookingCount,
      updateTime: new Date()
    });
  
  console.log(`课程(${courseId})报名人数更新结果:`, updateResult);
  
  return {
    courseId,
    bookingCount,
    updated: updateResult.updated > 0
  };
}

// 更新所有课程的报名人数
async function updateAllCoursesBookingCount() {
  // 获取所有课程
  const coursesResult = await db.collection('courses').get();
  const courses = coursesResult.data;
  
  if (!courses || courses.length === 0) {
    return { updatedCount: 0 };
  }
  
  console.log(`找到${courses.length}个课程需要更新报名人数`);
  
  // 记录更新成功的课程数量
  let updatedCount = 0;
  
  // 逐个更新每个课程的报名人数
  for (const course of courses) {
    try {
      const result = await updateSingleCourseBookingCount(course._id);
      if (result.updated) {
        updatedCount++;
      }
    } catch (error) {
      console.error(`更新课程(${course._id})报名人数失败:`, error);
      // 继续处理下一个课程
    }
  }
  
  return { updatedCount };
} 