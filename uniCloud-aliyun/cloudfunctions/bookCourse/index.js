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
const checkCoursesConflict = (course1, existingCourses = []) => {
  // 如果existingCourses不是数组，则转为数组
  if (!Array.isArray(existingCourses)) {
    if (existingCourses && typeof existingCourses === 'object') {
      existingCourses = [existingCourses];
    } else {
      existingCourses = [];
    }
  }
  
  // 处理单课程情况
  if (existingCourses.length === 0) {
    return { hasConflict: false, conflicts: [], conflictDays: [] };
  }
  
  const allConflicts = [];

  // 为每个现有课程检查冲突
  existingCourses.forEach(existingCourse => {
    if (!existingCourse) return;
    
    // 提取课程字段
    const courseInfo1 = {
      courseId: course1._id || course1.id || course1.courseId || '',
      courseName: course1.title || course1.name || course1.courseTitle || '未命名课程',
      timeSlots: course1.timeSlots || course1.time_slots || []
    };
    
    const courseInfo2 = {
      courseId: existingCourse._id || existingCourse.id || existingCourse.courseId || '',
      courseName: existingCourse.title || existingCourse.name || existingCourse.courseTitle || '未命名课程',
      timeSlots: existingCourse.timeSlots || existingCourse.time_slots || []
    };
    
    // 如果是同一个课程则不冲突
    if (courseInfo1.courseId && courseInfo2.courseId && courseInfo1.courseId === courseInfo2.courseId) {
      console.log('相同课程ID，不判断冲突');
      return;
    }
    
    console.log(`开始检测课程冲突: 
  ${courseInfo1.courseName} (${courseInfo1.courseId})
  vs 
  ${courseInfo2.courseName} (${courseInfo2.courseId})`);

  // 优化后的日期映射表结构
  const buildDateMap = (course) => {
    const dateMap = new Map();
    (course.timeSlots || []).forEach(slot => {
      try {
        const start = new Date(slot.start);
        const end = new Date(slot.end);
        if (start >= end) {
          console.warn(`无效时间槽：开始时间晚于结束时间，课程 ${course.courseId}`, slot);
          return;
        }
        
        const dateKey = start.toISOString().split('T')[0]; // 按UTC日期分组
        const timeKey = `${start.getUTCHours().toString().padStart(2,'0')}${start.getUTCMinutes().toString().padStart(2,'0')}-${end.getUTCHours().toString().padStart(2,'0')}${end.getUTCMinutes().toString().padStart(2,'0')}`;
        
        if (!dateMap.has(dateKey)) {
          dateMap.set(dateKey, []);
        }
        dateMap.get(dateKey).push({
          start: start.getTime(),
          end: end.getTime(),
          timeKey, // 用于快速匹配相同时间段
          originalSlot: slot,
          date: dateKey, // 添加日期字段
          timeRange: `${start.getUTCHours().toString().padStart(2,'0')}:${start.getUTCMinutes().toString().padStart(2,'0')}-${end.getUTCHours().toString().padStart(2,'0')}:${end.getUTCMinutes().toString().padStart(2,'0')}` // 添加时间范围字段
        });
      } catch (e) {
        console.error(`解析时间槽失败，课程 ${course.courseId}`, slot, e);
      }
    });
    return dateMap;
  };

  // 构建日期索引
  const course1Map = buildDateMap(courseInfo1);
  const course2Map = buildDateMap(courseInfo2);
  
  const conflicts = [];
  const conflictSlots = [];
  
  // 只比较存在相同日期的槽位
  course1Map.forEach((slots1, date) => {
    if (!course2Map.has(date)) return;
    
    const slots2 = course2Map.get(date);
    console.log(`检测 ${date} 的潜在冲突，课程1有${slots1.length}个时段，课程2有${slots2.length}个时段`);

    // 双重循环检测同日期冲突
    slots1.forEach(s1 => {
      slots2.forEach(s2 => {
        // 快速匹配：先检查timeHash是否相同
        if (s1.timeKey === s2.timeKey) {
          conflicts.push({
            date,
            conflictType: '完全重叠',
            course1Time: formatUTCTime(s1.start, s1.end),
            course2Time: formatUTCTime(s2.start, s2.end),
            duration: (Math.min(s1.end, s2.end) - Math.max(s1.start, s2.start)) / 60000
          });
          
          // 保存冲突的时间槽
          conflictSlots.push({
            newSlot: {
              date: date,
              timeRange: s1.timeRange
            },
            existingSlot: {
              date: date,
              timeRange: s2.timeRange
            }
          });
          
          return;
        }
        
        // 精确时间重叠检测
        if (s1.start < s2.end && s1.end > s2.start) {
          conflicts.push({
            date,
            conflictType: '部分重叠',
            course1Time: formatUTCTime(s1.start, s1.end),
            course2Time: formatUTCTime(s2.start, s2.end),
            duration: (Math.min(s1.end, s2.end) - Math.max(s1.start, s2.start)) / 60000
          });
          
          // 保存冲突的时间槽
          conflictSlots.push({
            newSlot: {
              date: date,
              timeRange: s1.timeRange
            },
            existingSlot: {
              date: date,
              timeRange: s2.timeRange
            }
          });
        }
      });
    });
  });

  // 辅助格式化函数
  function formatUTCTime(start, end) {
    const format = (ts) => {
      const d = new Date(ts);
      return `${d.getUTCHours().toString().padStart(2,'0')}:${d.getUTCMinutes().toString().padStart(2,'0')}`;
    };
    return `${format(start)}-${format(end)}`;
  }

  console.log('检测完成，发现冲突数量:', conflicts.length);
  
  if (conflicts.length > 0) {
    allConflicts.push({
      courseId: courseInfo2.courseId,
      courseName: courseInfo2.courseName,
      conflictDates: [...new Set(conflicts.map(c => c.date))],
      conflictSlots: conflictSlots // 添加冲突时间槽信息
    });
  }
  });
  
  // 返回冲突结果
  const result = {
    hasConflict: allConflicts.length > 0,
    conflicts: allConflicts,
    conflictDays: [...new Set(allConflicts.flatMap(c => c.conflictDates ? c.conflictDates : []))],
    conflictDate: allConflicts.length > 0 && Array.isArray(allConflicts[0].conflictDates) && allConflicts[0].conflictDates.length > 0 ? allConflicts[0].conflictDates[0] : null
  };
  
  console.log(`冲突检测结果: ${result.hasConflict ? '有冲突' : '无冲突'}, 冲突课程数: ${allConflicts.length}`);
  return result;
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
    
    // 确保userResult.data是数组或对象
    let userData;
    if (Array.isArray(userResult.data)) {
      if (userResult.data.length === 0) {
        console.log('用户数据为空数组');
        return {
          code: -1,
          success: false,
          message: '用户不存在'
        };
      }
      userData = userResult.data[0];
    } else {
      userData = userResult.data;
    }
    
    if (!userData) {
      console.error('无法获取有效的用户数据');
      return {
        code: -1,
        success: false,
        message: '用户数据异常'
      };
    }
    
    console.log('查询到的用户数据:', userData);
    
    // 使用uni-id-users的字段名
    const studentName = userName || userData.nickname || userData.username || '未知用户';
    const contactPhone = phoneNumber || userData.mobile || '';
    
    console.log('使用的学生姓名:', studentName);
    console.log('使用的联系电话:', contactPhone);
    
    // 获取课程信息
    console.log('检查课程信息:', courseId);
    const courseResult = await db.collection('courses').doc(courseId).get();
    
    if (!courseResult.data) {
      console.log('课程数据为空');
      return {
        code: -1,
        success: false,
        message: '课程不存在'
      };
    }
    
    // 确保courseResult.data是对象或者从数组中提取第一个元素
    let course;
    if (Array.isArray(courseResult.data)) {
      if (courseResult.data.length === 0) {
        console.log('课程数据为空数组');
        return {
          code: -1,
          success: false,
          message: '课程不存在'
        };
      }
      course = courseResult.data[0];
    } else {
      course = courseResult.data;
    }
    
    if (!course) {
      console.log('无法获取有效的课程数据');
      return {
        code: -1,
        success: false,
        message: '课程数据异常'
      };
    }
    
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
          let teacher;
          if (Array.isArray(teacherResult.data)) {
            if (teacherResult.data.length > 0) {
              teacher = teacherResult.data[0];
            }
          } else {
            teacher = teacherResult.data;
          }
          
          if (teacher) {
            teacherName = teacher.name || teacher.fullName || '';
            teacherPhone = teacher.phone || teacher.phoneNumber || teacher.mobile || '';
            console.log('获取到教师信息:', teacherName, teacherPhone);
          }
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
      
      // 确保bookedCourses是数组
      if (!Array.isArray(bookedCourses)) {
        console.warn('bookedCourses不是数组，将其转换为数组');
        bookedCourses = [bookedCourses].filter(Boolean);
      }
      
      // 3. 获取已预约课程的排课信息
      const bookedCourseIds = bookedCourses
        .map(booking => booking?.courseId)
        .filter(id => id);
      console.log('待检查冲突的已预约课程IDs:', bookedCourseIds);
      
      let scheduleMap = {};
      
      if (bookedCourseIds.length > 0) {
        try {
          const schedulesResult = await db.collection('course_schedule').where({
            courseId: dbCmd.in(bookedCourseIds)
          }).get();
          
          if (schedulesResult.data && Array.isArray(schedulesResult.data) && schedulesResult.data.length > 0) {
            schedulesResult.data.forEach(schedule => {
              if (schedule && schedule.courseId) {
                scheduleMap[schedule.courseId] = schedule;
              }
            });
            console.log('获取到已预约课程排课数据数量:', schedulesResult.data.length);
          }
        } catch (err) {
          console.error('获取已预约课程排课数据失败:', err);
        }
      }
      
      // 准备已预约课程列表
      const existingCourses = bookedCourses.map(booking => {
        if (!booking) return null;
        
        const existingCourse = booking.courseInfo || {};
        existingCourse._id = booking.courseId;
        existingCourse.title = existingCourse.title || existingCourse.courseTitle || booking.courseTitle || '未命名课程';
        
        // 添加排课数据
        if (booking.courseId && scheduleMap[booking.courseId]) {
          existingCourse.timeSlots = scheduleMap[booking.courseId].timeSlots;
        }
        
        return existingCourse;
      }).filter(course => course && course._id && course._id !== courseId); // 排除当前正在预约的课程和无效数据
      
      // 使用优化后的冲突检测
      console.log('执行课程冲突检测, 已筛选出有效课程数:', existingCourses.length);
      const conflictResult = checkCoursesConflict(course, existingCourses);
      
      if (conflictResult.hasConflict) {
        console.log('检测到课程时间冲突:', conflictResult);
        // 安全获取冲突信息
        let conflictMessage = "检测到课程时间冲突，请选择其他时间段的课程";
        
        if (Array.isArray(conflictResult.conflicts) && conflictResult.conflicts.length > 0) {
          const firstConflict = conflictResult.conflicts[0];
          
          if (firstConflict) {
            const courseName = firstConflict.courseName || '未命名课程';
            
            if (Array.isArray(firstConflict.conflictSlots) && firstConflict.conflictSlots.length > 0) {
              const conflictSlot = firstConflict.conflictSlots[0];
              if (conflictSlot && conflictSlot.newSlot) {
                conflictMessage = `您已预约的课程"${courseName}"在 ${conflictSlot.newSlot.date} 的时间段 ${conflictSlot.newSlot.timeRange} 与此课程冲突，请选择其他时间段的课程`;
              } else {
                conflictMessage = `您已预约的课程"${courseName}"与此课程时间冲突，请选择其他时间段的课程`;
              }
            } else if (Array.isArray(firstConflict.conflictDates) && firstConflict.conflictDates.length > 0) {
              const conflictDate = firstConflict.conflictDates[0] || '';
              conflictMessage = `您已预约的课程"${courseName}"在 ${conflictDate} 与此课程时间冲突，请选择其他时间段的课程`;
            } else {
              conflictMessage = `您已预约的课程"${courseName}"与此课程时间冲突，请选择其他时间段的课程`;
            }
          }
        }
        
        return {
          code: -1,
          success: false,
          message: conflictMessage
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
            // 安全获取冲突信息
            let conflictMessage = "检测到课程时间冲突，请选择其他时间段的课程";
            
            if (Array.isArray(scheduleConflictResult.conflicts) && scheduleConflictResult.conflicts.length > 0) {
              const firstConflict = scheduleConflictResult.conflicts[0];
              
              if (firstConflict) {
                const courseName = firstConflict.courseName || '未命名课程';
                
                if (Array.isArray(firstConflict.conflictSlots) && firstConflict.conflictSlots.length > 0) {
                  const conflictSlot = firstConflict.conflictSlots[0];
                  if (conflictSlot && conflictSlot.newSlot) {
                    conflictMessage = `您已安排的课程"${courseName}"在 ${conflictSlot.newSlot.date} 的时间段 ${conflictSlot.newSlot.timeRange} 与此课程冲突，请选择其他时间段的课程`;
                  } else {
                    conflictMessage = `您已安排的课程"${courseName}"与此课程时间冲突，请选择其他时间段的课程`;
                  }
                } else if (Array.isArray(firstConflict.conflictDates) && firstConflict.conflictDates.length > 0) {
                  const conflictDate = firstConflict.conflictDates[0] || '';
                  conflictMessage = `您已安排的课程"${courseName}"在 ${conflictDate} 与此课程时间冲突，请选择其他时间段的课程`;
                } else {
                  conflictMessage = `您已安排的课程"${courseName}"与此课程时间冲突，请选择其他时间段的课程`;
                }
              }
            }
            
            return {
              code: -1,
              success: false,
              message: conflictMessage
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
    
    if (!bookingResult || !bookingResult.id) {
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