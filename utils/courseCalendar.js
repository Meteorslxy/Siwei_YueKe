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
  return (start1 <= end2 && start2 <= end1);
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
 * 检测两个课程是否有时间冲突
 * @param {Object} course1 - 第一个课程
 * @param {Object} course2 - 第二个课程
 * @returns {Object} - 冲突信息，如果有冲突返回 {hasConflict: true, conflictDates: [...]}，否则返回 {hasConflict: false}
 */
function checkCoursesConflict(course1, course2) {
  console.log('检测课程冲突:', 
    course1 ? (course1.title || course1.courseTitle || '未命名课程1') : '无效课程1', 
    course2 ? (course2.title || course2.courseTitle || '未命名课程2') : '无效课程2'
  );
  
  // 验证课程对象
  if (!course1 || !course2) {
    console.error('无效的课程对象');
    return { hasConflict: false };
  }
  
  // 验证必要字段
  if (!course1.startDate || !course1.endDate || !course1.startTime || !course1.endTime || !course1.classTime || 
      !course2.startDate || !course2.endDate || !course2.startTime || !course2.endTime || !course2.classTime) {
    console.error('课程缺少必要的时间字段');
    return { hasConflict: false };
  }
  
  // 解析课程1的日期和时间
  const course1Start = parseDate(course1.startDate);
  const course1End = parseDate(course1.endDate);
  const course1StartMinutes = parseTimeToMinutes(course1.startTime);
  const course1EndMinutes = parseTimeToMinutes(course1.endTime);
  const course1WeekDays = course1.classTime || [];
  
  // 解析课程2的日期和时间
  const course2Start = parseDate(course2.startDate);
  const course2End = parseDate(course2.endDate);
  const course2StartMinutes = parseTimeToMinutes(course2.startTime);
  const course2EndMinutes = parseTimeToMinutes(course2.endTime);
  const course2WeekDays = course2.classTime || [];
  
  console.log('课程1时间:', course1Start, course1End, course1StartMinutes, course1EndMinutes, course1WeekDays);
  console.log('课程2时间:', course2Start, course2End, course2StartMinutes, course2EndMinutes, course2WeekDays);
  
  // 验证解析结果
  if (!course1Start || !course1End || !course2Start || !course2End) {
    console.error('课程日期解析失败');
    return { hasConflict: false };
  }
  
  // 如果日期范围没有重叠，则没有冲突
  if (course1End < course2Start || course2End < course1Start) {
    console.log('课程日期范围无重叠，无冲突');
    return { hasConflict: false };
  }
  
  // 如果时间没有重叠，则没有冲突
  if (!isTimeOverlap(course1StartMinutes, course1EndMinutes, course2StartMinutes, course2EndMinutes)) {
    console.log('课程时间段无重叠，无冲突');
    return { hasConflict: false };
  }
  
  // 如果没有上课日信息，或者上课日列表为空，则无法判断冲突
  if (!course1WeekDays.length || !course2WeekDays.length) {
    console.log('课程上课日列表为空，无法判断是否冲突');
    return { hasConflict: false };
  }
  
  // 检查上课日是否有重叠（例如都在周一上课）
  let hasWeekDayOverlap = false;
  for (const day1 of course1WeekDays) {
    if (course2WeekDays.includes(day1)) {
      hasWeekDayOverlap = true;
      console.log('发现上课日重叠:', day1);
      break;
    }
  }
  
  if (!hasWeekDayOverlap) {
    console.log('课程上课日无重叠，无冲突');
    return { hasConflict: false };
  }
  
  // 确定重叠的日期范围
  const overlapStart = new Date(Math.max(course1Start.getTime(), course2Start.getTime()));
  const overlapEnd = new Date(Math.min(course1End.getTime(), course2End.getTime()));
  console.log('重叠日期范围:', overlapStart, overlapEnd);
  
  // 获取课程1在重叠日期范围内的所有上课日期
  const course1Dates = getMatchingDates(overlapStart, overlapEnd, course1WeekDays);
  console.log('课程1在重叠范围内的上课日期:', course1Dates.length);
  
  // 获取课程2在重叠日期范围内的所有上课日期
  const course2Dates = getMatchingDates(overlapStart, overlapEnd, course2WeekDays);
  console.log('课程2在重叠范围内的上课日期:', course2Dates.length);
  
  // 查找冲突的日期
  const conflictDates = [];
  
  for (const date1 of course1Dates) {
    for (const date2 of course2Dates) {
      if (date1.getFullYear() === date2.getFullYear() && 
          date1.getMonth() === date2.getMonth() && 
          date1.getDate() === date2.getDate()) {
        // 日期相同，且时间有重叠，存在冲突
        conflictDates.push(new Date(date1));
        console.log('发现冲突日期:', formatDate(date1));
        break;
      }
    }
  }
  
  const result = {
    hasConflict: conflictDates.length > 0,
    conflictDates: conflictDates
  };
  
  console.log('冲突检测结果:', result);
  return result;
}

/**
 * 格式化日期为 "YYYY-MM-DD" 格式
 * @param {Date} date - 日期对象
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
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

module.exports = {
  getCurrentSemesterDates,
  parseDate,
  parseTimeToMinutes,
  isTimeOverlap,
  checkCoursesConflict,
  generateCalendarEvents,
  formatDate,
  getMatchingDates,
  isMatchingWeekDay
};