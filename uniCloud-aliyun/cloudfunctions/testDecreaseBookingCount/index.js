'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数 - 测试对课程bookingCount的减一操作
exports.main = async (event, context) => {
  const { courseId } = event;
  
  if (!courseId) {
    return {
      code: -1,
      success: false,
      message: '课程ID不能为空'
    };
  }
  
  try {
    console.log('===== 测试减少课程bookingCount开始 =====');
    console.log('课程ID:', courseId);
    
    // 首先获取课程当前信息
    console.log('步骤1: 获取课程当前信息');
    const courseInfo = await db.collection('courses').doc(courseId).get();
    
    if (!courseInfo || !courseInfo.data) {
      console.error('获取课程信息失败');
      return {
        code: -1,
        success: false,
        message: '获取课程信息失败，可能课程ID不存在'
      };
    }
    
    // 处理课程数据，确保获取到正确的对象
    let course;
    if (Array.isArray(courseInfo.data)) {
      // 如果返回的是数组，取第一个元素
      console.log('课程数据返回为数组，取第一个元素');
      course = courseInfo.data[0] || {};
    } else {
      // 返回的是单个对象
      course = courseInfo.data;
    }
    
    // 打印完整的课程数据以进行调试
    console.log('完整的课程数据:', JSON.stringify(course));
    
    // 特别输出bookingCount相关信息
    console.log('课程信息检查:', {
      id: course._id,
      title: course.title || '未命名课程',
      // 详细输出bookingCount相关信息
      bookingCount: course.bookingCount,
      bookingCountType: typeof course.bookingCount,
      isNumberOrUndefined: (typeof course.bookingCount === 'number' || course.bookingCount === undefined),
      hasBookingCountProperty: course.hasOwnProperty('bookingCount'),
      keysInCourse: Object.keys(course)
    });
    
    // 为了防止类型问题，尝试不同方式获取bookingCount
    let currentCount = 0;
    // 尝试作为对象属性访问
    if (course.hasOwnProperty('bookingCount') && typeof course.bookingCount === 'number') {
      currentCount = course.bookingCount;
    } 
    // 尝试作为字符串访问
    else if (course.hasOwnProperty('bookingCount') && typeof course.bookingCount === 'string') {
      currentCount = parseInt(course.bookingCount, 10) || 0;
    }
    // 如果课程中没有bookingCount属性，尝试检查是否有count或者booking_count属性
    else if (course.hasOwnProperty('count')) {
      if (typeof course.count === 'number') {
        currentCount = course.count;
      } else if (typeof course.count === 'string') {
        currentCount = parseInt(course.count, 10) || 0;
      }
    }
    else if (course.hasOwnProperty('booking_count')) {
      if (typeof course.booking_count === 'number') {
        currentCount = course.booking_count;
      } else if (typeof course.booking_count === 'string') {
        currentCount = parseInt(course.booking_count, 10) || 0;
      }
    }
    // 尝试设置一个默认值
    else if (course.title) {
      // 如果找不到bookingCount但课程存在，尝试创建一个
      console.log('课程数据中不存在bookingCount属性，尝试创建');
      
      try {
        // 更新数据库，添加bookingCount字段
        const createResult = await db.collection('courses')
          .doc(courseId)
          .update({
            bookingCount: 1 // 假设至少有一个预约
          });
          
        console.log('创建bookingCount结果:', createResult);
        
        if (createResult && createResult.updated > 0) {
          console.log('成功为课程添加bookingCount字段，设置为1');
          currentCount = 1;
        }
      } catch (createErr) {
        console.error('创建bookingCount字段失败:', createErr);
      }
    }

    console.log('最终确定的当前bookingCount:', currentCount);
    
    // 如果当前计数为0，不进行减少
    if (currentCount <= 0) {
      console.log('当前课程报名人数已为0或未找到，无需减少');
      return {
        code: 0,
        success: true,
        message: '当前报名人数已为0或未找到，无需减少',
        data: {
          courseId,
          bookingCount: currentCount,
          courseData: course
        }
      };
    }
    
    let updateSuccess = false;
    
    // 方法1: 使用dbCmd.inc(-1)
    try {
      console.log('步骤2: 尝试方法1 - 使用dbCmd.inc(-1)');
      const result1 = await db.collection('courses')
        .doc(courseId)
        .update({
          bookingCount: dbCmd.inc(-1)
        });
        
      console.log('方法1结果:', result1);
      
      if (result1 && result1.updated > 0) {
        updateSuccess = true;
        console.log('方法1成功: bookingCount已减少');
      } else {
        console.warn('方法1失败: 未能更新bookingCount');
      }
    } catch (err1) {
      console.error('方法1异常:', err1);
    }
    
    // 验证更新结果
    console.log('步骤3: 验证更新结果');
    const updatedCourseInfo = await db.collection('courses').doc(courseId).get();
    
    if (!updatedCourseInfo || !updatedCourseInfo.data) {
      console.error('验证失败: 无法获取更新后的课程信息');
    } else {
      // 处理课程数据，确保获取到正确的对象
      let updatedCourse;
      if (Array.isArray(updatedCourseInfo.data)) {
        console.log('验证时课程数据返回为数组，取第一个元素');
        updatedCourse = updatedCourseInfo.data[0] || {};
      } else {
        updatedCourse = updatedCourseInfo.data;
      }
      
      console.log('更新后的课程完整数据:', JSON.stringify(updatedCourse));
      
      let newCount = 0;
      
      // 同样尝试不同方式获取更新后的bookingCount
      if (updatedCourse.hasOwnProperty('bookingCount') && typeof updatedCourse.bookingCount === 'number') {
        newCount = updatedCourse.bookingCount;
      } else if (updatedCourse.hasOwnProperty('bookingCount') && typeof updatedCourse.bookingCount === 'string') {
        newCount = parseInt(updatedCourse.bookingCount, 10) || 0;
      } else if (updatedCourse.hasOwnProperty('count')) {
        if (typeof updatedCourse.count === 'number') {
          newCount = updatedCourse.count;
        } else if (typeof updatedCourse.count === 'string') {
          newCount = parseInt(updatedCourse.count, 10) || 0;
        }
      } else if (updatedCourse.hasOwnProperty('booking_count')) {
        if (typeof updatedCourse.booking_count === 'number') {
          newCount = updatedCourse.booking_count;
        } else if (typeof updatedCourse.booking_count === 'string') {
          newCount = parseInt(updatedCourse.booking_count, 10) || 0;
        }
      }
      
      console.log('更新后bookingCount:', newCount, '(之前:', currentCount, ')');
      
      // 判断是否成功更新
      if (newCount === currentCount - 1) {
        console.log('验证成功: bookingCount已成功减少');
        updateSuccess = true;
      } else if (updateSuccess) {
        console.warn('验证失败: 虽然更新操作返回成功，但bookingCount未减少');
        updateSuccess = false;
      }
    }
    
    // 如果方法1失败，尝试方法2: 直接设置新值
    if (!updateSuccess) {
      try {
        console.log('步骤4: 尝试方法2 - 直接设置新值');
        
        // 重新获取当前值，以防方法1已经产生了某些变化
        const refreshCourse = await db.collection('courses').doc(courseId).get();
        
        let refreshCount = 0;
        // 尝试不同方式获取bookingCount
        if (refreshCourse.data) {
          const course = refreshCourse.data;
          if (course.hasOwnProperty('bookingCount') && typeof course.bookingCount === 'number') {
            refreshCount = course.bookingCount;
          } else if (course.hasOwnProperty('bookingCount') && typeof course.bookingCount === 'string') {
            refreshCount = parseInt(course.bookingCount, 10) || 0;
          } else if (course['bookingCount'] !== undefined) {
            if (typeof course['bookingCount'] === 'number') {
              refreshCount = course['bookingCount'];
            } else if (typeof course['bookingCount'] === 'string') {
              refreshCount = parseInt(course['bookingCount'], 10) || 0;
            }
          }
        }
        
        if (refreshCount > 0) {
          const newCount = refreshCount - 1;
          console.log(`尝试直接设置值: ${refreshCount} -> ${newCount}`);
          
          const result2 = await db.collection('courses')
            .doc(courseId)
            .update({
              bookingCount: newCount
            });
            
          console.log('方法2结果:', result2);
          
          if (result2 && result2.updated > 0) {
            updateSuccess = true;
            console.log('方法2成功: bookingCount已成功设置为新值');
          } else {
            console.warn('方法2失败: 未能更新bookingCount');
          }
        } else {
          console.log('当前报名人数已为0或未找到，跳过方法2');
        }
      } catch (err2) {
        console.error('方法2异常:', err2);
      }
    }
    
    // 最后验证
    console.log('步骤5: 最终验证');
    const finalCourseInfo = await db.collection('courses').doc(courseId).get();
    
    let finalCount = 0;
    let finalCourse = null;
    if (finalCourseInfo && finalCourseInfo.data) {
      // 处理课程数据，确保获取到正确的对象
      if (Array.isArray(finalCourseInfo.data)) {
        console.log('最终验证时课程数据返回为数组，取第一个元素');
        finalCourse = finalCourseInfo.data[0] || {};
      } else {
        finalCourse = finalCourseInfo.data;
      }
      
      if (finalCourse.hasOwnProperty('bookingCount') && typeof finalCourse.bookingCount === 'number') {
        finalCount = finalCourse.bookingCount;
      } else if (finalCourse.hasOwnProperty('bookingCount') && typeof finalCourse.bookingCount === 'string') {
        finalCount = parseInt(finalCourse.bookingCount, 10) || 0;
      } else if (finalCourse.hasOwnProperty('count')) {
        if (typeof finalCourse.count === 'number') {
          finalCount = finalCourse.count;
        } else if (typeof finalCourse.count === 'string') {
          finalCount = parseInt(finalCourse.count, 10) || 0;
        }
      } else if (finalCourse.hasOwnProperty('booking_count')) {
        if (typeof finalCourse.booking_count === 'number') {
          finalCount = finalCourse.booking_count;
        } else if (typeof finalCourse.booking_count === 'string') {
          finalCount = parseInt(finalCourse.booking_count, 10) || 0;
        }
      }
    }
    console.log('最终bookingCount:', finalCount, '(最初:', currentCount, ')');
    
    console.log('===== 测试减少课程bookingCount结束 =====');
    
    return {
      code: 0,
      success: true,
      message: updateSuccess ? 'bookingCount减少成功' : 'bookingCount减少失败',
      data: {
        courseId,
        originalCount: currentCount,
        finalCount: finalCount,
        updated: updateSuccess,
        courseData: course // 返回原始课程数据以便前端检查
      }
    };
  } catch (err) {
    console.error('测试减少bookingCount失败:', err);
    return {
      code: -1,
      success: false,
      message: '测试失败: ' + (err.message || '未知错误')
    };
  }
}; 