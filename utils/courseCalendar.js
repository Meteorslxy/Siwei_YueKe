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
 * 检测两个课程是否有时间冲突
 * @param {Object} course1 - 第一个课程
 * @param {Object} course2 - 第二个课程
 * @returns {Object} - 冲突信息，如果有冲突返回 {hasConflict: true, conflictDates: [...]}，否则返回 {hasConflict: false}
 */
function checkCoursesConflict(course1, course2) {
  console.log('======= 开始检测课程冲突 =======');
  console.log('课程1:', 
    course1 ? (course1.title || course1.courseTitle || '未命名课程1') : '无效课程1', 
    course1 ? `ID: ${course1._id || '未知'}` : ''
  );
  console.log('课程2:', 
    course2 ? (course2.title || course2.courseTitle || '未命名课程2') : '无效课程2',
    course2 ? `ID: ${course2._id || '未知'}` : ''
  );
  
  // 验证课程对象
  if (!course1 || !course2) {
    console.error('无效的课程对象');
    return { hasConflict: false };
  }
  
  // 检查是否有timeSlots数据（来自course_schedule）
  if (course1.timeSlots && course1.timeSlots.length > 0 && 
      course2.timeSlots && course2.timeSlots.length > 0) {
    console.log('检测到两个课程都有timeSlots数据，使用timeSlots进行冲突检测');
    
    // 直接比较timeSlots中的时间，确保处理start和end可能颠倒的情况
    const conflictDates = [];
    
    for (const slot1 of course1.timeSlots) {
      for (const slot2 of course2.timeSlots) {
        // 获取两个时间
        const time1Start = new Date(slot1.start);
        const time1End = new Date(slot1.end);
        const time2Start = new Date(slot2.start);
        const time2End = new Date(slot2.end);
        
        // 确保start早于end（处理可能颠倒的情况）
        const slot1Start = time1Start < time1End ? time1Start : time1End;
        const slot1End = time1Start < time1End ? time1End : time1Start;
        const slot2Start = time2Start < time2End ? time2Start : time2End;
        const slot2End = time2Start < time2End ? time2End : time2Start;
        
        // 检查日期（忽略时间）是否相同
        const date1 = new Date(slot1Start);
        date1.setHours(0, 0, 0, 0);
        const date2 = new Date(slot2Start);
        date2.setHours(0, 0, 0, 0);
        
        if (date1.getTime() === date2.getTime()) {
          // 同一天，检查时间是否重叠
          const hasTimeOverlap = (slot1Start < slot2End && slot1End > slot2Start);
          
          if (hasTimeOverlap) {
            console.log('检测到冲突:', 
              formatDate(slot1Start), 
              `${formatTime(slot1Start)}-${formatTime(slot1End)} vs ${formatTime(slot2Start)}-${formatTime(slot2End)}`
            );
            
            // 添加到冲突日期列表
            conflictDates.push(new Date(date1));
          }
        }
      }
    }
    
    // 如果找到冲突，返回结果
    if (conflictDates.length > 0) {
      console.log('通过timeSlots检测到冲突，冲突日期数:', conflictDates.length);
      return { 
        hasConflict: true, 
        conflictDates: conflictDates 
      };
    }
    
    // 没有找到冲突
    console.log('通过timeSlots未检测到冲突');
    return { hasConflict: false };
  }
  
  // 如果没有timeSlots数据，使用原有的冲突检测逻辑
  console.log('使用常规方法检测冲突');
  
  // 记录所有相关字段，便于调试
  console.log('课程1字段:');
  console.log('  开始日期:', course1.startDate, typeof course1.startDate);
  console.log('  结束日期:', course1.endDate, typeof course1.endDate);
  console.log('  开始时间:', course1.startTime, typeof course1.startTime);
  console.log('  结束时间:', course1.endTime, typeof course1.endTime);
  console.log('  上课日:', course1.classTime, Array.isArray(course1.classTime) ? course1.classTime.join(',') : course1.classTime);
  
  console.log('课程2字段:');
  console.log('  开始日期:', course2.startDate, typeof course2.startDate);
  console.log('  结束日期:', course2.endDate, typeof course2.endDate);
  console.log('  开始时间:', course2.startTime, typeof course2.startTime);
  console.log('  结束时间:', course2.endTime, typeof course2.endTime);
  console.log('  上课日:', course2.classTime, Array.isArray(course2.classTime) ? course2.classTime.join(',') : course2.classTime);
  
  // 验证必要字段
  if (!course1.startDate || !course1.endDate || !course1.startTime || !course1.endTime || 
      !course2.startDate || !course2.endDate || !course2.startTime || !course2.endTime) {
    console.error('课程缺少必要的时间字段');
    return { hasConflict: false };
  }
  
  // 确保classTime字段存在且为数组
  if (!course1.classTime) course1.classTime = ['每天'];
  if (!course2.classTime) course2.classTime = ['每天'];
  
  if (!Array.isArray(course1.classTime)) course1.classTime = [course1.classTime];
  if (!Array.isArray(course2.classTime)) course2.classTime = [course2.classTime];
  
  if (course1.classTime.length === 0) course1.classTime = ['每天'];
  if (course2.classTime.length === 0) course2.classTime = ['每天'];
  
  // 解析课程1的日期和时间
  const course1Start = parseDate(course1.startDate);
  const course1End = parseDate(course1.endDate);
  const course1StartMinutes = parseTimeToMinutes(course1.startTime);
  const course1EndMinutes = parseTimeToMinutes(course1.endTime);
  const course1WeekDays = course1.classTime;
  
  // 解析课程2的日期和时间
  const course2Start = parseDate(course2.startDate);
  const course2End = parseDate(course2.endDate);
  const course2StartMinutes = parseTimeToMinutes(course2.startTime);
  const course2EndMinutes = parseTimeToMinutes(course2.endTime);
  const course2WeekDays = course2.classTime;
  
  console.log('解析后的课程1时间:');
  console.log('  开始日期:', course1Start ? course1Start.toISOString() : null);
  console.log('  结束日期:', course1End ? course1End.toISOString() : null);
  console.log('  开始时间(分钟):', course1StartMinutes);
  console.log('  结束时间(分钟):', course1EndMinutes);
  console.log('  上课日:', course1WeekDays);
  
  console.log('解析后的课程2时间:');
  console.log('  开始日期:', course2Start ? course2Start.toISOString() : null);
  console.log('  结束日期:', course2End ? course2End.toISOString() : null);
  console.log('  开始时间(分钟):', course2StartMinutes);
  console.log('  结束时间(分钟):', course2EndMinutes);
  console.log('  上课日:', course2WeekDays);
  
  // 验证解析结果
  if (!course1Start || !course1End || !course2Start || !course2End) {
    console.error('课程日期解析失败');
    return { hasConflict: false };
  }
  
  // 如果日期范围没有重叠，则没有冲突
  const datesOverlap = !(course1End < course2Start || course2End < course1Start);
  console.log('日期范围是否重叠:', datesOverlap ? '是' : '否');
  
  if (!datesOverlap) {
    console.log('课程日期范围无重叠，无冲突');
    return { hasConflict: false };
  }
  
  // 如果时间没有重叠，则没有冲突
  const timesOverlap = isTimeOverlap(course1StartMinutes, course1EndMinutes, course2StartMinutes, course2EndMinutes);
  console.log('时间段是否重叠:', timesOverlap ? '是' : '否');
  
  if (!timesOverlap) {
    console.log('课程时间段无重叠，无冲突');
    return { hasConflict: false };
  }
  
  // 检查上课日是否有重叠（例如都在周一上课）
  let hasWeekDayOverlap = false;
  const overlappingDays = [];
  
  for (const day1 of course1WeekDays) {
    for (const day2 of course2WeekDays) {
      // 标准化星期几表示
      const weekDayMap = {
        // 中文格式
        "周日": "周日", "周一": "周一", "周二": "周二", "周三": "周三", "周四": "周四", "周五": "周五", "周六": "周六",
        "星期日": "周日", "星期一": "周一", "星期二": "周二", "星期三": "周三", "星期四": "周四", "星期五": "周五", "星期六": "周六",
        "礼拜日": "周日", "礼拜一": "周一", "礼拜二": "周二", "礼拜三": "周三", "礼拜四": "周四", "礼拜五": "周五", "礼拜六": "周六",
        "日": "周日", "一": "周一", "二": "周二", "三": "周三", "四": "周四", "五": "周五", "六": "周六",
        // 英文格式
        "Sun": "周日", "Mon": "周一", "Tue": "周二", "Wed": "周三", "Thu": "周四", "Fri": "周五", "Sat": "周六",
        "Sunday": "周日", "Monday": "周一", "Tuesday": "周二", "Wednesday": "周三", "Thursday": "周四", "Friday": "周五", "Saturday": "周六",
        // 如果是每天，则特殊处理
        "每天": "每天"
      };
      
      const normalizedDay1 = weekDayMap[day1] || day1;
      const normalizedDay2 = weekDayMap[day2] || day2;
      
      // 如果任一为"每天"或两个值相等，则认为有重叠
      if (normalizedDay1 === "每天" || normalizedDay2 === "每天" || normalizedDay1 === normalizedDay2) {
        hasWeekDayOverlap = true;
        overlappingDays.push(normalizedDay1 === "每天" ? normalizedDay2 : normalizedDay1);
      }
    }
  }
  
  console.log('上课日是否有重叠:', hasWeekDayOverlap ? `是，重叠日: ${overlappingDays.join(', ')}` : '否');
  
  if (!hasWeekDayOverlap) {
    console.log('课程上课日无重叠，无冲突');
    return { hasConflict: false };
  }
  
  // 确定重叠的日期范围
  const overlapStart = new Date(Math.max(course1Start.getTime(), course2Start.getTime()));
  const overlapEnd = new Date(Math.min(course1End.getTime(), course2End.getTime()));
  console.log(`重叠日期范围: ${overlapStart.toISOString().split('T')[0]} 至 ${overlapEnd.toISOString().split('T')[0]}`);
  
  // 获取课程1在重叠日期范围内的所有上课日期
  const course1Dates = getMatchingDates(overlapStart, overlapEnd, course1WeekDays);
  console.log(`课程1在重叠范围内的上课日期数量: ${course1Dates.length}`);
  
  // 获取课程2在重叠日期范围内的所有上课日期
  const course2Dates = getMatchingDates(overlapStart, overlapEnd, course2WeekDays);
  console.log(`课程2在重叠范围内的上课日期数量: ${course2Dates.length}`);
  
  // 查找冲突的日期
  const conflictDates = [];
  
  // 优化: 创建一个映射来快速查找课程2的日期
  const course2DateMap = new Map();
  course2Dates.forEach(date => {
    const key = formatDate(date);
    course2DateMap.set(key, date);
  });
  
  // 遍历课程1的日期，查找与课程2日期相同的
  for (const date1 of course1Dates) {
    const key = formatDate(date1);
    if (course2DateMap.has(key)) {
      // 日期相同，且之前已确认时间有重叠，存在冲突
      conflictDates.push(new Date(date1));
      console.log(`发现冲突日期: ${key}`);
    }
  }
  
  const result = {
    hasConflict: conflictDates.length > 0,
    conflictDates: conflictDates
  };
  
  console.log(`冲突检测结果: ${result.hasConflict ? '有冲突' : '无冲突'}, 冲突日期数量: ${conflictDates.length}`);
  if (result.hasConflict) {
    console.log('冲突日期列表:', conflictDates.map(d => formatDate(d)).join(', '));
  }
  console.log('======= 结束检测课程冲突 =======');
  
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