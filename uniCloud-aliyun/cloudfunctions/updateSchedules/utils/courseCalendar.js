'use strict';

/**
 * 解析日期字符串为Date对象
 * 支持格式: YYYY-MM-DD, YYYY/MM/DD
 */
function parseDate(dateStr) {
    if (!dateStr) return null;
    
    // 处理多种日期分隔符
    const normalizedDateStr = dateStr.replace(/[\/\.]/g, '-');
    
    // 尝试直接解析标准格式
    let date = new Date(normalizedDateStr);
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
        // 尝试解析非标准格式
        const parts = normalizedDateStr.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // 月份从0开始
            const day = parseInt(parts[2], 10);
            
            date = new Date(year, month, day);
        } else {
            return null; // 无法解析
        }
    }
    
    // 最终检查日期是否有效
    return isNaN(date.getTime()) ? null : date;
}

/**
 * 将Date对象格式化为YYYY-MM-DD字符串
 */
function formatDate(date) {
    if (!date || !(date instanceof Date)) return '';
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

/**
 * 获取星期几的数字表示（0-6，从周日开始）
 */
function getDayOfWeek(date) {
    return date.getDay();
}

/**
 * 检查日期是否匹配特定的星期几
 * @param {Date} date - 日期对象
 * @param {String} dayPattern - 星期几的中文名称
 * @returns {Boolean} - 是否匹配
 */
function matchesDayOfWeek(date, dayPattern) {
    const dayOfWeek = getDayOfWeek(date);
    
    switch (dayPattern) {
        case '周一':
        case '星期一':
            return dayOfWeek === 1;
        case '周二':
        case '星期二':
            return dayOfWeek === 2;
        case '周三':
        case '星期三':
            return dayOfWeek === 3;
        case '周四':
        case '星期四':
            return dayOfWeek === 4;
        case '周五':
        case '星期五':
            return dayOfWeek === 5;
        case '周六':
        case '星期六':
            return dayOfWeek === 6;
        case '周日':
        case '星期日':
        case '周天':
            return dayOfWeek === 0;
        case '每天':
            return true;
        case '工作日':
            return dayOfWeek >= 1 && dayOfWeek <= 5;
        case '周末':
            return dayOfWeek === 0 || dayOfWeek === 6;
        default:
            return false;
    }
}

/**
 * 计算两个日期之间相差的天数
 */
function daysBetween(start, end) {
    // 一天的毫秒数
    const oneDay = 24 * 60 * 60 * 1000;
    
    // 创建不带时间的日期副本，避免夏令时问题
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    
    // 计算差异的毫秒数
    const diffTime = Math.abs(endDate - startDate);
    
    // 转换为天数
    return Math.round(diffTime / oneDay);
}

/**
 * 将日期加上指定的天数
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * 获取开始日期和结束日期之间匹配指定课程时间模式的所有日期
 * @param {Date} startDate - 开始日期
 * @param {Date} endDate - 结束日期
 * @param {Array<String>} classTimePatterns - 课程时间模式数组（如["周一", "周三"]）
 * @returns {Array<Date>} - 匹配的日期数组
 */
function getMatchingDates(startDate, endDate, classTimePatterns) {
    if (!startDate || !endDate || !Array.isArray(classTimePatterns)) {
        return [];
    }
    
    // 如果结束日期早于开始日期，则交换它们
    if (endDate < startDate) {
        const temp = startDate;
        startDate = endDate;
        endDate = temp;
    }
    
    const matchingDates = [];
    const totalDays = daysBetween(startDate, endDate);
    
    // 遍历开始日期和结束日期之间的所有日期
    for (let i = 0; i <= totalDays; i++) {
        const currentDate = addDays(startDate, i);
        
        // 检查当前日期是否匹配任何课程时间模式
        for (const pattern of classTimePatterns) {
            if (matchesDayOfWeek(currentDate, pattern)) {
                matchingDates.push(new Date(currentDate));
                break; // 一旦找到匹配项，就跳出内部循环
            }
        }
    }
    
    return matchingDates;
}

module.exports = {
    parseDate,
    formatDate,
    getDayOfWeek,
    matchesDayOfWeek,
    daysBetween,
    addDays,
    getMatchingDates
}; 