'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 导入时间冲突检测工具函数
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  try {
    // 尝试直接解析
    const date = new Date(dateStr);
    
    // 判断是否为有效日期
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // 处理常见的格式问题
    if (dateStr.length === 10 && dateStr.includes('-')) {
      // 处理YYYY-MM-DD格式
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // 月份从0开始
        const day = parseInt(parts[2], 10);
        
        const parsedDate = new Date(year, month, day);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }
    
    console.error('无法解析日期字符串:', dateStr);
    return null;
  } catch (e) {
    console.error('解析日期出错:', e);
    return null;
  }
};

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr || timeStr === '--:--') return 0;
  
  try {
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      const hours = parseInt(parts[0], 10) || 0;
      const minutes = parseInt(parts[1], 10) || 0;
      return hours * 60 + minutes;
    }
    return 0;
  } catch (e) {
    return 0;
  }
};

const isTimeOverlap = (start1, end1, start2, end2) => {
  start1 = Number(start1) || 0;
  end1 = Number(end1) || 0;
  start2 = Number(start2) || 0;
  end2 = Number(end2) || 0;
  
  // 时间重叠的条件：A的开始时间小于B的结束时间，并且A的结束时间大于B的开始时间
  return (start1 < end2 && end1 > start2);
};

/**
 * 验证时间槽是否有效
 * @param {Object} slot - 时间槽对象，包含start和end字段
 * @returns {Object} - 验证结果，包含valid、start和end字段
 */
const validateTimeSlot = (slot) => {
  try {
    if (!slot) {
      console.error('时间槽为空');
      return { valid: false };
    }
    
    console.log('验证时间槽:', JSON.stringify(slot));
    
    if (slot && slot.start && slot.end) {
      // 确保start和end是日期对象
      let start, end;
      
      // 处理不同格式的日期字符串或对象
      try {
        start = slot.start instanceof Date ? slot.start : new Date(slot.start);
        end = slot.end instanceof Date ? slot.end : new Date(slot.end);
        
        console.log(`解析时间: start=${start.toISOString()}, end=${end.toISOString()}`);
        console.log(`时间戳: start=${start.getTime()}, end=${end.getTime()}`);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.error('无效的日期格式:', slot.start, slot.end);
          return { valid: false };
        }
        
        return {
          valid: true,
          start,
          end
        };
      } catch (e) {
        console.error('日期解析错误:', e, '原始值:', slot.start, slot.end);
        return { valid: false };
      }
    }
    
    console.error('时间槽缺少start或end属性');
    return { valid: false };
  } catch (e) {
    console.error('时间槽验证错误:', e);
    return { valid: false };
  }
};

/**
 * 检测两个课程是否有时间冲突 - 支持处理timeSlots和常规时间字段
 * @param {Object} course1 - 第一个课程
 * @param {Object} course2 - 第二个课程
 * @returns {Object} - 冲突检测结果
 */
const checkCoursesConflict = (course1, course2) => {
  // 如果是同一个课程则不冲突
  console.log(`检查课程冲突: ${course1.title || '未命名课程1'} (ID: ${course1._id}) vs ${course2.title || '未命名课程2'} (ID: ${course2._id})`);
  
  if (course1._id && course2._id && course1._id === course2._id) {
    console.log('相同课程ID，不判断冲突');
    return { hasConflict: false };
  }

  try {
    // 处理字段名不一致问题
    const course1TimeSlots = course1.timeSlots || course1.time_slots || [];
    const course2TimeSlots = course2.timeSlots || course2.time_slots || [];
    
    // 检查timeSlots
    if (course1TimeSlots.length > 0 && course2TimeSlots.length > 0) {
      console.log(`课程1有${course1TimeSlots.length}个时间槽，课程2有${course2TimeSlots.length}个时间槽`);
      
      // 检查任意两个时间槽是否冲突
      for (const slot1 of course1TimeSlots) {
        const validatedSlot1 = validateTimeSlot(slot1);
        if (!validatedSlot1.valid) {
          console.log('课程1时间槽无效，跳过该时间槽');
          continue;
        }
        
        for (const slot2 of course2TimeSlots) {
          const validatedSlot2 = validateTimeSlot(slot2);
          if (!validatedSlot2.valid) {
            console.log('课程2时间槽无效，跳过该时间槽');
            continue;
          }
          
          const start1 = validatedSlot1.start.getTime();
          const end1 = validatedSlot1.end.getTime();
          const start2 = validatedSlot2.start.getTime();
          const end2 = validatedSlot2.end.getTime();
          
          console.log(`比较时间槽: 
            课程1: ${new Date(start1).toLocaleString()} - ${new Date(end1).toLocaleString()}
            课程2: ${new Date(start2).toLocaleString()} - ${new Date(end2).toLocaleString()}`);
          
          // 检查日期（忽略时间）是否相同
          const date1 = new Date(start1);
          date1.setHours(0, 0, 0, 0);
          const date2 = new Date(start2);
          date2.setHours(0, 0, 0, 0);
          
          console.log(`比较日期: ${formatDate(date1)} vs ${formatDate(date2)}`);
          console.log(`日期时间戳比较: ${date1.getTime()} vs ${date2.getTime()}`);
          
          if (date1.getTime() === date2.getTime()) {
            console.log('日期相同，检查时间重叠');
            
            // 检查时间重叠 - 使用更精确的算法
            const hasOverlap = Math.max(start1, start2) < Math.min(end1, end2);
            
            console.log('时间重叠检查详情:');
            console.log(`- 课程1开始时间: ${new Date(start1).toISOString()}, 时间戳: ${start1}`);
            console.log(`- 课程1结束时间: ${new Date(end1).toISOString()}, 时间戳: ${end1}`);
            console.log(`- 课程2开始时间: ${new Date(start2).toISOString()}, 时间戳: ${start2}`);
            console.log(`- 课程2结束时间: ${new Date(end2).toISOString()}, 时间戳: ${end2}`);
            console.log(`- 最大开始时间: ${Math.max(start1, start2)}, 最小结束时间: ${Math.min(end1, end2)}`);
            console.log(`- 重叠检测结果: ${hasOverlap ? '有重叠' : '无重叠'}`);
            
            if (hasOverlap) {
              console.log('检测到冲突日期:', formatDate(date1));
              return { hasConflict: true, conflictDate: formatDate(date1) };
            }
          }
        }
      }
      
      console.log('没有发现时间冲突');
      return { hasConflict: false };
    }
    
    // 如果没有time_slots，则检查time字段
    if (course1.time && course2.time) {
      // 其他冲突检测逻辑
      // ... 保留原有处理逻辑
    }
    
    console.log('没有足够的时间信息进行冲突检测');
    return { hasConflict: false };
  } catch (error) {
    console.error('检查课程冲突时发生错误:', error);
    return { hasConflict: false };
  }
};

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('bookCourse函数收到请求:', event);
  
  // 获取参数
  const { userId, courseId, userName, phoneNumber, remark = '' } = event;
  
  // 检查必要参数
  if (!userId) {
    console.log('缺少userId参数，预约失败');
    return {
      code: -1,
      success: false,
      message: '缺少用户ID参数'
    };
  }
  
  if (!courseId) {
    console.log('缺少courseId参数，预约失败');
    return {
      code: -1,
      success: false,
      message: '缺少课程ID参数'
    };
  }
  
  try {
    // 获取用户信息
    console.log('检查用户信息, userId:', userId, '类型:', typeof userId);
    
    // 添加更多调试信息
    let userResult;
    
    // 采用多种方式尝试查询用户
    try {
      console.log('尝试方法1: 使用doc直接查询');
      userResult = await db.collection('uni-id-users').doc(userId).get();
      console.log('方法1查询结果:', userResult);
    } catch (err1) {
      console.error('方法1查询失败:', err1);
      
      try {
        console.log('尝试方法2: 使用where查询_id');
        userResult = await db.collection('uni-id-users').where({
          _id: userId
        }).get();
        console.log('方法2查询结果:', userResult);
      } catch (err2) {
        console.error('方法2查询失败:', err2);
        
        try {
          console.log('尝试方法3: 使用where查询uid');
          userResult = await db.collection('uni-id-users').where({
            uid: userId
          }).get();
          console.log('方法3查询结果:', userResult);
        } catch (err3) {
          console.error('方法3查询失败:', err3);
          throw new Error('无法查询到用户信息，所有尝试均失败');
        }
      }
    }
    
    // 增强用户数据检查
    if (!userResult || !userResult.data) {
      console.error('查询结果没有data字段');
      return {
        code: -1,
        success: false,
        message: '用户信息查询结果异常'
      };
    }
    
    if (userResult.data.length === 0) {
      console.log('用户数据为空数组');
      return {
        code: -1,
        success: false,
        message: '用户不存在'
      };
    }
    
    // 获取用户数据
    const userData = userResult.data[0] || userResult.data;
    console.log('查询到的用户数据:', userData);
    
    // 使用uni-id-users的字段名
    const studentName = userName || userData.nickname || userData.username || '未知用户';
    const contactPhone = phoneNumber || userData.mobile || '';
    
    console.log('使用的学生姓名:', studentName);
    console.log('使用的联系电话:', contactPhone);
    
    // 获取课程信息
    console.log('检查课程信息:', courseId);
    const courseResult = await db.collection('courses').doc(courseId).get();
    
    if (!courseResult.data || courseResult.data.length === 0) {
      console.log('课程不存在');
      return {
        code: -1,
        success: false,
        message: '课程不存在'
      };
    }
    
    const course = courseResult.data[0] || courseResult.data;
    
    // 检查课程是否有名额
    const capacity = course.courseCount || course.capacity || 200; // 优先使用courseCount
    const enrollCount = course.bookingCount || 0;
    
    console.log('课程容量:', capacity, '已报名人数:', enrollCount);
    
    if (enrollCount >= capacity) {
      console.log('课程已满');
      return {
        code: -1,
        success: false,
        message: '课程名额已满'
      };
    }
    
    // 获取教师信息
    let teacherName = course.teacherName || '';
    let teacherPhone = course.teacherPhone || '';
    
    // 如果课程中有教师ID但没有教师名称，尝试从teachers集合获取
    if (course.teacherId && !teacherName) {
      try {
        console.log('从teachers集合获取教师信息:', course.teacherId);
        const teacherResult = await db.collection('teachers').doc(course.teacherId).get();
        if (teacherResult.data) {
          const teacher = teacherResult.data[0] || teacherResult.data;
          teacherName = teacher.name || teacher.fullName || '';
          teacherPhone = teacher.phone || teacher.phoneNumber || teacher.mobile || '';
          console.log('获取到教师信息:', teacherName, teacherPhone);
        }
      } catch (err) {
        console.error('获取教师信息失败:', err);
        // 继续执行，不影响预约流程
      }
    }
    
    // 保存用户的真实ID（可能是_id或uid）
    const realUserId = userData._id;
    console.log('使用真实用户ID:', realUserId);
    
    // 检查用户是否已经预约过该课程
    console.log('检查用户是否已预约过该课程');
    const existResult = await db.collection('bookings')
      .where({
        userId: realUserId,
        courseId: courseId,
        status: dbCmd.in(['pending', 'confirmed'])
      })
      .get();
    
    if (existResult.data && existResult.data.length > 0) {
      console.log('用户已预约过该课程');
      return {
        code: -1,
        success: false,
        message: '您已预约过该课程'
      };
    }
    
    // 检查课程时间冲突
    console.log('检查课程时间冲突');
    // 1. 获取用户已预约的课程
    const bookedCoursesResult = await uniCloud.callFunction({
      name: 'getUserBookings',
      data: {
        userId: realUserId,
        status: ['pending', 'confirmed'] // 检查待确认和已确认的预约，避免用户重复预约
      }
    });
    
    // 2. 获取课程的详细排课信息
    let courseScheduleData = null;
    try {
      const scheduleResult = await db.collection('course_schedule').where({
        courseId: courseId
      }).get();
      
      if (scheduleResult.data && scheduleResult.data.length > 0) {
        courseScheduleData = scheduleResult.data[0];
        console.log('找到课程排课数据:', courseId);
      }
    } catch (err) {
      console.error('获取课程排课数据失败:', err);
    }
    
    // 如果找到排课数据，添加到课程对象中
    if (courseScheduleData && courseScheduleData.timeSlots) {
      course.timeSlots = courseScheduleData.timeSlots;
      console.log('当前预约课程的排课时间槽数量:', course.timeSlots.length);
    }
    
    // 检查用户已预约的课程
    if (bookedCoursesResult.result && bookedCoursesResult.result.success && bookedCoursesResult.result.data) {
      const bookedCourses = bookedCoursesResult.result.data;
      console.log(`用户已预约${bookedCourses.length}个课程，开始检查冲突`);
      
      // 3. 获取已预约课程的排课信息
      const bookedCourseIds = bookedCourses.map(booking => booking.courseId).filter(id => id);
      console.log('待检查冲突的已预约课程IDs:', bookedCourseIds);
      
      let scheduleMap = {};
      
      if (bookedCourseIds.length > 0) {
        try {
          const schedulesResult = await db.collection('course_schedule').where({
            courseId: dbCmd.in(bookedCourseIds)
          }).get();
          
          if (schedulesResult.data && schedulesResult.data.length > 0) {
            schedulesResult.data.forEach(schedule => {
              scheduleMap[schedule.courseId] = schedule;
            });
            console.log('获取到已预约课程排课数据数量:', schedulesResult.data.length);
          }
        } catch (err) {
          console.error('获取已预约课程排课数据失败:', err);
        }
      }
      
      // 准备已预约课程列表
      const existingCourses = bookedCourses.map(booking => {
        const existingCourse = booking.courseInfo || {};
        existingCourse._id = booking.courseId;
        existingCourse.title = existingCourse.title || existingCourse.courseTitle || booking.courseTitle || '未命名课程';
        
        // 添加排课数据
        if (scheduleMap[booking.courseId]) {
          existingCourse.timeSlots = scheduleMap[booking.courseId].timeSlots;
        }
        
        return existingCourse;
      }).filter(course => course._id && course._id !== courseId); // 排除当前正在预约的课程
      
      // 使用优化后的冲突检测
      console.log('执行课程冲突检测');
      const conflictResult = checkCoursesConflict(course, existingCourses);
      
      if (conflictResult.hasConflict) {
        console.log('检测到课程时间冲突:', conflictResult);
        const firstConflict = conflictResult.conflicts[0];
        const conflictSlot = firstConflict.conflictSlots[0];
        return {
          code: -1,
          success: false,
          message: `您已预约的课程"${firstConflict.courseName}"在 ${conflictSlot.newSlot.date} 的时间段 ${conflictSlot.newSlot.timeRange} 与此课程冲突，请选择其他时间段的课程`
        };
      } else {
        console.log('未检测到与已预约课程的时间冲突');
      }
    } else {
      console.log('用户没有已预约的课程或获取失败');
    }
    
    // 还需要检查课程日程表中可能存在的冲突
    try {
      console.log('检查课程日程表中的冲突');
      // 从课程日程表中获取用户课程
      const userScheduleResult = await db.collection('course_schedule')
        .where({
          students: dbCmd.all([realUserId])
        })
        .get();
        
      if (userScheduleResult.data && userScheduleResult.data.length > 0) {
        console.log('用户在课程日程表中有记录，数量:', userScheduleResult.data.length);
        
        // 准备课程日程表中的课程列表
        const scheduleExistingCourses = userScheduleResult.data
          .filter(schedule => schedule.courseId !== courseId) // 排除当前课程
          .map(schedule => ({
            _id: schedule.courseId,
            title: schedule.courseName || '未命名课程',
            timeSlots: schedule.timeSlots || []
          }));
        
        // 使用优化后的冲突检测
        if (scheduleExistingCourses.length > 0) {
          const scheduleConflictResult = checkCoursesConflict(course, scheduleExistingCourses);
          
          if (scheduleConflictResult.hasConflict) {
            console.log('检测到与课程日程表中课程的时间冲突:', scheduleConflictResult);
            const firstConflict = scheduleConflictResult.conflicts[0];
            const conflictSlot = firstConflict.conflictSlots[0];
            return {
              code: -1,
              success: false,
              message: `您已安排的课程"${firstConflict.courseName}"在 ${conflictSlot.newSlot.date} 的时间段 ${conflictSlot.newSlot.timeRange} 与此课程冲突，请选择其他时间段的课程`
            };
          }
        }
      } else {
        console.log('用户在课程日程表中没有记录');
      }
    } catch (err) {
      console.error('检查课程日程表冲突失败:', err);
    }
    
    // 生成预约编号
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').substring(0, 14);
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const bookingNumber = `${timestamp}${randomStr}`;
    
    // 创建预约记录
    const bookingData = {
      userId: realUserId, // 使用真实用户ID
      courseId: courseId,
      courseTitle: course.title || '',
      courseStartTime: course.startTime || '',
      courseEndTime: course.endTime || '',
      startDate: course.startDate || '', // 添加课程开始日期
      endDate: course.endDate || '',     // 添加课程结束日期
      schoolName: course.schoolName || course.location || '未知校区',
      studentName: studentName,
      contactPhone: contactPhone,
      remark: remark,
      status: 'pending', // 初始状态为待确认（未缴费）
      paymentStatus: 'unpaid', // 支付状态：未支付
      bookingId: bookingNumber, // 确保有预约编号
      createTime: new Date(),
      updateTime: new Date(),
      teacherName: teacherName,
      teacherPhone: teacherPhone
    };
    
    console.log('准备创建预约记录:', bookingData);
    
    // 插入预约记录
    const bookingResult = await db.collection('bookings').add(bookingData);
    console.log('预约记录创建结果:', bookingResult);
    
    if (!bookingResult.id) {
      console.error('创建预约记录失败');
      return {
        code: -1,
        success: false,
        message: '创建预约记录失败'
      };
    }
    
    // 使用updateCourseBookingCount云函数更新报名人数
    try {
      console.log('调用updateCourseBookingCount更新课程报名人数');
      await uniCloud.callFunction({
        name: 'updateCourseBookingCount',
        data: { courseId: courseId }
      });
    } catch (error) {
      console.error('更新课程报名人数失败:', error);
      // 继续执行，不影响下面的流程
    }
    
    // 创建短格式的预约ID
    const shortBookingId = `B${bookingResult.id.slice(-10).toUpperCase()}`;
    
    // 更新预约记录，添加预约编号
    await db.collection('bookings').doc(bookingResult.id).update({
      bookingId: shortBookingId
    });
    
    console.log('预约成功，预约ID:', shortBookingId);
    
    return {
      code: 0,
      success: true,
      data: {
        bookingId: bookingResult.id,
        bookingInfo: {
          ...bookingData,
          bookingId: shortBookingId,
        }
      },
      message: '预约成功，等待确认'
    };
  } catch (err) {
    console.error('预约失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '预约失败，请稍后再试'
    };
  }
}; 