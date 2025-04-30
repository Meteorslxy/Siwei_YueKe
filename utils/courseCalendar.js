// 课程日历功能

/**
 * 获取当前学期的开始和结束日期
 */
function getCurrentSemesterDates() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  let startDate, endDate;

  if (currentMonth >= 2 && currentMonth <= 7) {
    // 春季学期（2月至7月）
    startDate = new Date(currentYear, 1, 1); // 2月1日
    endDate = new Date(currentYear, 6, 31); // 7月31日
  } else {
    // 秋季学期（8月至次年1月）
    startDate = new Date(currentYear, 8, 1); // 9月1日
    if (currentMonth >= 9) {
      // 当前是9-12月
      endDate = new Date(currentYear + 1, 0, 31); // 次年1月31日
    } else {
      // 当前是1月
      endDate = new Date(currentYear, 0, 31); // 当年1月31日
      startDate = new Date(currentYear - 1, 8, 1); // 前一年9月1日
    }
  }

  return { startDate, endDate };
}

/**
 * 解析日期字符串为Date对象
 * @param {String} dateStr 日期字符串，支持多种格式
 * @returns {Date|null} 解析后的Date对象，解析失败则返回null
 */
export function parseDate(dateStr) {
  if (!dateStr) return null;
  
  // 预处理日期字符串
  let normalizedDateStr = dateStr;
  
  // 统一分隔符为"-"
  normalizedDateStr = normalizedDateStr.replace(/\//g, '-').replace(/\./g, '-');
  
  try {
    // 尝试直接解析
    const date = new Date(normalizedDateStr);
    
    // 判断是否为有效日期
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    // 处理常见的格式问题
    if (normalizedDateStr.length === 10 && normalizedDateStr.includes('-')) {
      // 处理YYYY-MM-DD格式
      const parts = normalizedDateStr.split('-');
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
    
    // 尝试解析其他常见格式
    // ...
    
    // 所有尝试都失败了
    console.error('无法解析日期字符串:', dateStr);
    return null;
  } catch (e) {
    console.error('解析日期出错:', e);
    return null;
  }
}

/**
 * 将时间字符串解析为分钟数（从凌晨开始计算）
 * @param {String} timeStr 时间字符串，如"14:30"
 * @returns {Number} 分钟数，解析失败则返回0
 */
export function parseTimeToMinutes(timeStr) {
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
}

/**
 * 检查两个时间区间是否重叠
 * @param {number} start1 - 第一个区间的开始（分钟）
 * @param {number} end1 - 第一个区间的结束（分钟）
 * @param {number} start2 - 第二个区间的开始（分钟）
 * @param {number} end2 - 第二个区间的结束（分钟）
 * @returns {boolean} - 如果重叠则返回true
 */
function isTimeOverlap(start1, end1, start2, end2) {
  // 确保所有参数都是有效的数字
  start1 = Number(start1) || 0;
  end1 = Number(end1) || 0;
  start2 = Number(start2) || 0;
  end2 = Number(end2) || 0;
  
  // 详细记录时间区间
  console.log(`检查时间区间重叠: [${start1}-${end1}] vs [${start2}-${end2}]`);
  
  // 时间重叠的条件：A的开始时间小于B的结束时间，并且A的结束时间大于B的开始时间
  const isOverlapping = (start1 < end2 && end1 > start2);
  
  // 记录检查结果
  console.log(`时间区间重叠检查结果: ${isOverlapping ? '有重叠' : '无重叠'}`);
  
  // 提供详细的重叠逻辑解释
  if (isOverlapping) {
    console.log(`重叠逻辑: 第一区间开始(${start1}) < 第二区间结束(${end2}) 且 第一区间结束(${end1}) > 第二区间开始(${start2})`);
    
    // 计算重叠的范围
    const overlapStart = Math.max(start1, start2);
    const overlapEnd = Math.min(end1, end2);
    const overlapMinutes = overlapEnd - overlapStart;
    
    console.log(`重叠区间: [${overlapStart}-${overlapEnd}], 重叠时长: ${overlapMinutes}分钟`);
  } else {
    if (end1 <= start2) {
      console.log(`无重叠原因: 第一区间结束(${end1}) <= 第二区间开始(${start2})`);
    } else if (start1 >= end2) {
      console.log(`无重叠原因: 第一区间开始(${start1}) >= 第二区间结束(${end2})`);
    }
  }
  
  return isOverlapping;
}

/**
 * 判断一个日期是否匹配指定的星期几
 * @param {Date} date - 要检查的日期
 * @param {string} weekDay - 星期几，例如 "周一"、"周二" 等
 * @returns {boolean} - 如果匹配则返回true
 */
function isMatchingWeekDay(date, weekDay) {
  if (!date || !weekDay) {
    console.log('isMatchingWeekDay: 参数无效', date, weekDay);
    return false;
  }
  
  try {
    // 获取日期是星期几
    const dayOfWeek = date.getDay();
    console.log(`isMatchingWeekDay: 检查日期 ${date.toISOString().split('T')[0]} 是星期 ${dayOfWeek} 是否匹配 ${weekDay}`);
    
    // 标准化周几格式
    const weekDayMap = {
      // 中文格式
      "周日": 0, "周一": 1, "周二": 2, "周三": 3, "周四": 4, "周五": 5, "周六": 6,
      "星期日": 0, "星期一": 1, "星期二": 2, "星期三": 3, "星期四": 4, "星期五": 5, "星期六": 6,
      "礼拜日": 0, "礼拜一": 1, "礼拜二": 2, "礼拜三": 3, "礼拜四": 4, "礼拜五": 5, "礼拜六": 6,
      "日": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6,
      // 数字格式
      "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
      // 英文格式
      "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6,
      "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6
    };
    
    // 从标准化映射获取周几值
    let expectedDay = null;
    
    // 如果传入的是字符串数组，尝试匹配第一个合法格式
    if (Array.isArray(weekDay)) {
      console.log('isMatchingWeekDay: 检测到weekDay是数组', weekDay);
      for (const day of weekDay) {
        if (day in weekDayMap) {
          expectedDay = weekDayMap[day];
          console.log(`isMatchingWeekDay: 从数组中找到匹配项 ${day} => ${expectedDay}`);
          break;
        }
      }
    } else if (weekDay in weekDayMap) {
      expectedDay = weekDayMap[weekDay];
      console.log(`isMatchingWeekDay: 找到匹配项 ${weekDay} => ${expectedDay}`);
    } else {
      // 尝试忽略大小写匹配英文格式
      const lowerWeekDay = typeof weekDay === 'string' ? weekDay.toLowerCase() : weekDay;
      const lowerCaseMap = {
        "sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6,
        "sunday": 0, "monday": 1, "tuesday": 2, "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6
      };
      
      if (lowerWeekDay in lowerCaseMap) {
        expectedDay = lowerCaseMap[lowerWeekDay];
        console.log(`isMatchingWeekDay: 找到忽略大小写的匹配项 ${lowerWeekDay} => ${expectedDay}`);
      } else {
        console.error('未能识别的星期格式:', weekDay);
        return false;
      }
    }
    
    const result = dayOfWeek === expectedDay;
    console.log(`isMatchingWeekDay: 结果 ${result} (${dayOfWeek} === ${expectedDay})`);
    return result;
  } catch (e) {
    console.error('检查星期匹配出错:', e, date, weekDay);
    return false;
  }
}

/**
 * 获取指定日期范围内满足特定星期几的所有日期
 * @param {Date} startDate - 开始日期
 * @param {Date} endDate - 结束日期
 * @param {Array<string>|string} weekDays - 星期几列表，例如 ["周一", "周三"] 或 "周一"，如果为 "每天" 或空数组则表示每天
 * @returns {Array<Date>} - 满足条件的日期列表
 */
export function getMatchingDates(startDate, endDate, weekDays) {
  console.log('获取匹配日期:', 
    startDate ? startDate.toISOString().split('T')[0] : startDate, 
    endDate ? endDate.toISOString().split('T')[0] : endDate, 
    weekDays);
  
  if (!startDate || !endDate) {
    console.error('开始或结束日期无效');
    return [];
  }
  
  // 检查是否为每天模式
  let isEveryDay = false;
  
  // 如果weekDays是字符串，转换为数组
  let weekDaysArray = weekDays;
  if (typeof weekDays === 'string') {
    if (weekDays === '每天') {
      isEveryDay = true;
      weekDaysArray = [];
    } else {
      console.log('weekDays是字符串，转换为数组:', weekDays);
      weekDaysArray = [weekDays];
    }
  } else if (!Array.isArray(weekDays)) {
    console.error('星期几参数格式无效:', weekDays, typeof weekDays);
    return [];
  } else if (weekDays.length === 0 || weekDays.includes('每天')) {
    isEveryDay = true;
  }
  
  console.log('处理的星期几列表:', weekDaysArray, '是否每天模式:', isEveryDay);
  
  // 确保日期对象有效
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error('无效的日期对象');
    return [];
  }
  
  // 确保日期顺序正确
  if (startDate > endDate) {
    console.error('开始日期晚于结束日期');
    return [];
  }
  
  try {
    const dates = [];
    const currentDate = new Date(startDate);
    
    // 计算时间范围的天数
    const daysDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    console.log(`日期范围包含 ${daysDiff} 天`);
    
    // 最多处理365天，防止无限循环
    let maxIterations = Math.min(365, daysDiff + 1);
    let iterations = 0;
    
    while (currentDate <= endDate && iterations < maxIterations) {
      iterations++;
      const dateString = currentDate.toISOString().split('T')[0];
      
      // 如果是每天模式，直接添加日期
      if (isEveryDay) {
        dates.push(new Date(currentDate));
        if (iterations % 7 === 0) {  // 每7天记录一次日志，减少日志量
          console.log(`找到匹配日期: ${dateString} (每天模式)`);
        }
      } else {
        // 非每天模式，检查星期几是否匹配
        for (const weekDay of weekDaysArray) {
          if (isMatchingWeekDay(currentDate, weekDay)) {
            dates.push(new Date(currentDate));
            console.log(`找到匹配日期: ${dateString} 匹配 ${weekDay}`);
            break;
          }
        }
      }
      
      // 移到下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    console.log('找到匹配日期数量:', dates.length);
    if (dates.length > 0) {
      console.log('第一个匹配日期:', dates[0].toISOString().split('T')[0]);
      console.log('最后一个匹配日期:', dates[dates.length - 1].toISOString().split('T')[0]);
    }
    return dates;
  } catch (e) {
    console.error('获取匹配日期时出错:', e);
    return [];
  }
}

/**
 * 检测新课程与用户所有已有课程的时间冲突（支持批量检测）
 * @param {Object} newCourse - 待检测的新课程
 * @param {Array} existingCourses - 用户已预约的所有课程数组
 * @returns {Object} - 返回冲突检测结果
 *                    { 
 *                      hasConflict: boolean,
 *                      conflicts: [{
 *                        courseId: string,
 *                        courseName: string,
 *                        conflictSlots: Array<{newSlot: TimeSlot, existingSlot: TimeSlot}>
 *                      }]
 *                    }
 */
function checkCoursesConflict(newCourse, existingCourses = []) {
  // 输入验证增强版
  if (!newCourse) {
    console.error('新课程对象为空');
    return { hasConflict: false, conflicts: [], conflictDays: [] };
  }
  
  // 兼容单个课程和多个课程的情况
  if (!Array.isArray(existingCourses)) {
    if (existingCourses && typeof existingCourses === 'object') {
      existingCourses = [existingCourses];
    } else {
      existingCourses = [];
    }
  }
  
  const allConflicts = [];

  // 为每个现有课程检查冲突
  existingCourses.forEach(existingCourse => {
    if (!existingCourse) return;
    
    // 使用课程字段的多种可能名称
    const course1 = {
      courseId: newCourse._id || newCourse.id || newCourse.courseId || '',
      courseName: newCourse.title || newCourse.name || newCourse.courseTitle || '未命名课程',
      timeSlots: newCourse.timeSlots || newCourse.time_slots || []
    };
    
    const course2 = {
      courseId: existingCourse._id || existingCourse.id || existingCourse.courseId || '',
      courseName: existingCourse.title || existingCourse.name || existingCourse.courseTitle || '未命名课程',
      timeSlots: existingCourse.timeSlots || existingCourse.time_slots || []
    };
    
    // 如果是同一个课程，跳过
    if (course1.courseId && course2.courseId && course1.courseId === course2.courseId) {
      console.log('相同课程ID，不判断冲突');
      return;
    }

    console.log(`开始检测课程冲突: 
  ${course1.courseName} (${course1.courseId})
  vs 
  ${course2.courseName} (${course2.courseId})`);

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
            originalSlot: slot
          });
        } catch (e) {
          console.error(`解析时间槽失败，课程 ${course.courseId}`, slot, e);
        }
      });
      return dateMap;
    };

    // 构建日期索引
    const course1Map = buildDateMap(course1);
    const course2Map = buildDateMap(course2);
    
    const conflicts = [];
    
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
              duration: (Math.min(s1.end, s2.end) - Math.max(s1.start, s2.start)) / 60000,
              newSlot: {
                date,
                start: new Date(s1.start).toISOString(),
                end: new Date(s1.end).toISOString(),
                timeRange: formatUTCTime(s1.start, s1.end)
              },
              existingSlot: {
                date,
                start: new Date(s2.start).toISOString(),
                end: new Date(s2.end).toISOString(),
                timeRange: formatUTCTime(s2.start, s2.end)
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
              duration: (Math.min(s1.end, s2.end) - Math.max(s1.start, s2.start)) / 60000,
              newSlot: {
                date,
                start: new Date(s1.start).toISOString(),
                end: new Date(s1.end).toISOString(),
                timeRange: formatUTCTime(s1.start, s1.end)
              },
              existingSlot: {
                date,
                start: new Date(s2.start).toISOString(),
                end: new Date(s2.end).toISOString(),
                timeRange: formatUTCTime(s2.start, s2.end)
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
      // 将冲突数据转换为旧格式，兼容其他地方用法
      allConflicts.push({
        courseId: course2.courseId,
        courseName: course2.courseName,
        conflictSlots: conflicts.map(c => ({
          newSlot: c.newSlot,
          existingSlot: c.existingSlot
        })),
        conflictDates: [...new Set(conflicts.map(c => c.date))]
      });
    }
  });
  
  // 构建最终结果
  const result = {
    hasConflict: allConflicts.length > 0,
    conflicts: allConflicts,
    conflictDays: [...new Set(allConflicts.flatMap(c => c.conflictDates))]
  };
  
  console.log(`冲突检测结果: ${result.hasConflict ? '有冲突' : '无冲突'}, 冲突课程数: ${allConflicts.length}`);
  return result;
}

// 格式化输出
function formatSlot(slot) {
  return {
    date: slot.date || (slot.start ? new Date(slot.start).toISOString().split('T')[0] : ''),
    start: slot.start,
    end: slot.end,
    timeRange: `${formatTime(new Date(slot.start))} - ${formatTime(new Date(slot.end))}`
  };
}

/**
 * 格式化日期为 "YYYY-MM-DD" 格式
 * @param {Date} date - 日期对象
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(date) {
  if (!date) return '';
  
  let dateObj;
  if (date instanceof Date) {
    dateObj = date;
  } else {
    try {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        console.error('无效的日期输入:', date);
        return '';
      }
    } catch (e) {
      console.error('日期转换错误:', e, '输入:', date);
      return '';
    }
  }
  
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
}

/**
 * 根据课程信息生成日历事件
 * @param {Object} course - 课程信息
 * @returns {Array} - 日历事件列表
 */
function generateCalendarEvents(course) {
  console.log('生成课程日历事件:', course);
  
  if (!course) {
    console.error('课程对象为空');
    return [];
  }
  
  if (!course.startDate || !course.endDate) {
    console.error('课程缺少开始或结束日期:', course._id);
    return [];
  }
  
  if (!course.classTime || !Array.isArray(course.classTime) || course.classTime.length === 0) {
    console.error('课程缺少上课时间:', course._id);
    return [];
  }
  
  // 解析日期
  const startDate = parseDate(course.startDate);
  const endDate = parseDate(course.endDate);
  
  if (!startDate || !endDate) {
    console.error('解析课程日期失败:', course.startDate, course.endDate);
    return [];
  }
  
  // 日期顺序检查
  if (startDate > endDate) {
    console.error('课程开始日期晚于结束日期:', course.startDate, course.endDate);
    return [];
  }
  
  // 获取所有上课日期
  const classDates = getMatchingDates(startDate, endDate, course.classTime);
  console.log('获取到上课日期数量:', classDates.length);
  
  if (classDates.length === 0) {
    console.warn('未能生成有效的上课日期');
    return [];
  }
  
  // 为每个上课日期生成日历事件
  return classDates.map(date => {
    return {
      id: `course-${course._id || 'unknown'}-${formatDate(date)}`,
      title: course.title || course.courseTitle || '未命名课程',
      start: formatDate(date) + ' ' + (course.startTime || '00:00'),
      end: formatDate(date) + ' ' + (course.endTime || '00:00'),
      courseId: course._id || 'unknown',
      teacherName: course.teacherName || '未知',
      location: course.location || course.schoolName || '未知',
      color: '#FF6B00', // 使用橙色作为默认颜色
      textColor: '#FFFFFF'
    };
  });
}

/**
 * 格式化时间为 "HH:MM" 格式
 * @param {Date} date - 日期对象
 * @returns {string} - 格式化后的时间字符串
 */
function formatTime(date) {
  if (!date) return '--:--';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

module.exports = {
  getCurrentSemesterDates,
  parseDate,
  parseTimeToMinutes,
  isTimeOverlap,
  checkCoursesConflict,
  generateCalendarEvents,
  formatDate,
  getMatchingDates,
  isMatchingWeekDay,
  formatTime
};