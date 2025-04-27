'use strict';

const db = uniCloud.database();
const courseCalendar = require('./utils/courseCalendar.js');

// 课程集合
const courseCollection = db.collection('course');
// 课程日程安排集合 - 确保与schema一致
const courseSchedulesCollection = db.collection('course_schedule');
// 教师日程集合
const teacherSchedulesCollection = db.collection('teacher_schedules');
// 学生日程集合
const studentSchedulesCollection = db.collection('student_schedules');

exports.main = async (event, context) => {
	try {
		// 获取参数
		const { courseId, teacherId, studentIds, saveToDatabase = false, startDate, endDate, classTime, classTimes, name } = event;
		
		// 参数校验
		if (!courseId) {
			return {
				code: -1,
				message: '缺少课程ID'
			};
		}
		
		// 准备课程数据对象
		let course = {
			// 默认值和传入的参数
			id: courseId,
			courseId: courseId,
			startDate: startDate || '',
			endDate: endDate || '',
			classTime: classTime || '',
			classTimes: classTimes || [],
			teacherId: teacherId || '',
			name: name || ''  // 添加课程名称
		};
		
		// 尝试从数据库获取课程信息
		try {
			const courseResult = await courseCollection.doc(courseId).get();
			
			if (courseResult.data && courseResult.data.length > 0) {
				// 使用数据库中的课程信息
				course = {...courseResult.data[0]};
				
				// 使用传入的参数覆盖课程信息（如果有的话）
				if (startDate) course.startDate = startDate;
				if (endDate) course.endDate = endDate;
				if (classTime) course.classTime = classTime;
				if (classTimes) course.classTimes = classTimes;
				if (teacherId) course.teacherId = teacherId;
				
				console.log('使用数据库课程信息:', courseId);
			} else {
				// 仅使用传入的参数
				console.log('未找到课程数据，使用传入参数:', courseId);
				
				// 查询course_schedule表中的课程名称
				try {
					const scheduleResult = await courseSchedulesCollection.where({
						courseId: courseId
					}).limit(1).get();
					
					if (scheduleResult.data && scheduleResult.data.length > 0) {
						course.name = scheduleResult.data[0].courseName;
						course.title = scheduleResult.data[0].courseName;
					}
				} catch (e) {
					console.error('查询课程名称失败:', e);
				}
			}
		} catch (e) {
			console.error('获取课程信息失败:', e);
			// 继续使用传入的参数
		}
		
		// 校验课程信息完整性
		if (!course.startDate || !course.endDate || (!course.classTimes && !course.classTime)) {
			return {
				code: -1,
				message: '课程信息不完整，请检查开始日期、结束日期和上课时间'
			};
		}
		
		// 解析日期 - 兼容不同的日期格式 (2024/3/1 或 2024-03-01)
		const startDateStr = course.startDate.replace(/\//g, '-');
		const endDateStr = course.endDate.replace(/\//g, '-');
		
		const startDate_date = courseCalendar.parseDate(startDateStr);
		const endDate_date = courseCalendar.parseDate(endDateStr);
		
		if (!startDate_date || !endDate_date) {
			return {
				code: -1,
				message: '日期格式错误：' + course.startDate + ', ' + course.endDate
			};
		}
		
		// 解析上课时间模式（如：["周一", "周三"]）
		let classTimePatterns = [];
		if (course.classTime && Array.isArray(course.classTime)) {
			// 如果直接是数组，直接使用
			classTimePatterns = course.classTime;
		} else if (typeof course.classTimes === 'string') {
			// 如果是字符串，尝试解析为JSON
			try {
				classTimePatterns = JSON.parse(course.classTimes);
			} catch (e) {
				// 如果解析失败，假设是以逗号分隔的字符串
				classTimePatterns = course.classTimes.split(',').map(item => item.trim());
			}
		} else if (Array.isArray(course.classTimes)) {
			classTimePatterns = course.classTimes;
		}
		
		if (classTimePatterns.length === 0) {
			return {
				code: -1,
				message: '上课时间格式错误或为空。课程数据：' + JSON.stringify({
					classTime: course.classTime,
					classTimes: course.classTimes
				})
			};
		}
		
		// 获取匹配的上课日期
		const classDates = courseCalendar.getMatchingDates(startDate_date, endDate_date, classTimePatterns);
		
		if (classDates.length === 0) {
			return {
				code: -1,
				message: '未找到符合条件的上课日期'
			};
		}
		
		// 使用startTime和endTime作为上课时间（如果存在）
		const startTimeStr = course.startTime || course.classTime || '09:00';
		const endTimeStr = course.endTime || (course.startTime ? addTimeHours(course.startTime, 2) : '11:00');
		
		// 创建符合新数据结构的时间槽
		const timeSlots = [];
		const timeHash = [];
		
		// 为每个日期创建时间槽
		for (let i = 0; i < classDates.length; i++) {
			const classDate = classDates[i];
			
			// 创建开始和结束时间
			const startDateTime = createDateTime(classDate, startTimeStr);
			const endDateTime = createDateTime(classDate, endTimeStr);
			
			// 只有当开始和结束时间有效时才添加时间槽
			if (startDateTime && endDateTime) {
				// 创建时间槽
				timeSlots.push({
					start: startDateTime,
					end: endDateTime,
					status: 'scheduled',
					index: i + 1,       // 第几次课
					totalClasses: classDates.length  // 总课次
				});
				
				// 创建时间哈希
				const dateStr = formatDateForHash(classDate);
				const timeRangeStr = formatTimeRangeForHash(startTimeStr, endTimeStr);
				timeHash.push(`${dateStr}T${timeRangeStr}`);
			}
		}
		
		if (timeSlots.length === 0) {
			return {
				code: -1,
				message: '无法创建有效的时间槽'
			};
		}
		
		// 创建简化的课程日程结构（用于预览）
		const schedules = timeSlots.map(slot => {
			const date = new Date(slot.start);
			return {
				date: slot.start,
				startTime: startTimeStr,
				endTime: endTimeStr,
				index: slot.index,
				totalClasses: slot.totalClasses,
				status: 'scheduled'
			};
		});
		
		// 如果不需要保存到数据库，直接返回计算结果
		if (!saveToDatabase) {
			return {
				code: 0,
				message: '成功计算课程安排，未保存到数据库',
				data: {
					schedules,
					courseSchedulesCount: schedules.length,
					firstClassDate: formatReadableDate(new Date(schedules[0].date)),
					lastClassDate: formatReadableDate(new Date(schedules[schedules.length - 1].date)),
					savedToDatabase: false
				}
			};
		}
		
		// 准备课程安排数据 - 按照course_schedule的schema结构
		const courseScheduleData = {
			courseId: courseId,
			teacherId: teacherId || course.teacherId || '',
			timeSlots: timeSlots,
			timeHash: timeHash,
			version: 1
		};
		
		// 准备教师日程数据 - 按照teacher_schedules的schema结构
		let teacherScheduleData = null;
		if (teacherId || course.teacherId) {
			const usedTeacherId = teacherId || course.teacherId;
			
			// 创建符合teacher_schedules结构的数据
			teacherScheduleData = {
				teacherId: usedTeacherId,
				courses: [{
					courseId: courseId,
					timeRanges: timeSlots.map(slot => slot.start) // 只保存开始时间
				}]
			};
		}
		
		// 处理教师日程
		if (teacherScheduleData) {
			const teacherId = teacherScheduleData.teacherId;
			
			// 先检查教师是否已经有日程记录
			const teacherResult = await teacherSchedulesCollection.where({
				teacherId: teacherId
			}).get();
			
			if (teacherResult.data && teacherResult.data.length > 0) {
				// 已经有记录，更新现有的教师日程
				console.log('更新现有教师日程...');
				
				// 获取现有的教师日程记录
				const existingTeacherSchedule = teacherResult.data[0];
				const existingCourses = existingTeacherSchedule.courses || [];
				
				// 删除当前课程的日程安排
				const filteredCourses = existingCourses.filter(c => c.courseId !== courseId);
				
				// 添加新的课程日程安排
				filteredCourses.push(teacherScheduleData.courses[0]);
				
				// 更新教师日程记录
				await teacherSchedulesCollection.doc(existingTeacherSchedule._id).update({
					courses: filteredCourses
				});
			} else {
				// 没有现有记录，创建新的教师日程
				console.log('创建新教师日程...');
				await teacherSchedulesCollection.add(teacherScheduleData);
			}
		}
		
		// 准备学生日程数据 - 如果有学生ID列表
		let studentSchedulesDataArray = [];
		if (Array.isArray(studentIds) && studentIds.length > 0) {
			// 为每个学生创建日程数据
			for (const studentId of studentIds) {
				studentSchedulesDataArray.push({
					studentId: studentId,
					courses: [{
						courseId: courseId,
						selectedSlots: timeSlots.map(slot => slot.start) // 只保存开始时间
					}]
				});
			}
		}
		
		// 处理课程安排
		console.log('处理课程安排...');
		
		// 查询现有课程安排
		const scheduleResult = await courseSchedulesCollection.where({
			courseId: courseId
		}).get();
		
		if (scheduleResult.data && scheduleResult.data.length > 0) {
			// 已经有记录，更新现有课程安排
			console.log('更新现有课程安排...');
			await courseSchedulesCollection.doc(scheduleResult.data[0]._id).update(courseScheduleData);
		} else {
			// 没有现有记录，创建新的课程安排
			console.log('创建新课程安排...');
			await courseSchedulesCollection.add(courseScheduleData);
		}
		
		// 处理学生日程
		if (studentSchedulesDataArray.length > 0) {
			console.log('处理学生日程...');
			
			for (const studentScheduleData of studentSchedulesDataArray) {
				// 检查学生是否已经有日程记录
				const studentResult = await studentSchedulesCollection.where({
					studentId: studentScheduleData.studentId
				}).get();
				
				if (studentResult.data && studentResult.data.length > 0) {
					// 已经有记录，更新现有的学生日程
					console.log('更新学生日程:', studentScheduleData.studentId);
					
					// 获取现有的学生日程
					const existingStudentSchedule = studentResult.data[0];
					const existingCourses = existingStudentSchedule.courses || [];
					
					// 删除当前课程的日程安排
					const filteredCourses = existingCourses.filter(c => c.courseId !== courseId);
					
					// 添加新的课程日程安排
					filteredCourses.push(studentScheduleData.courses[0]);
					
					// 更新学生日程记录
					await studentSchedulesCollection.doc(existingStudentSchedule._id).update({
						courses: filteredCourses
					});
				} else {
					// 没有现有记录，创建新的学生日程
					console.log('创建学生日程:', studentScheduleData.studentId);
					await studentSchedulesCollection.add(studentScheduleData);
				}
			}
		}
		
		// 如果一切成功，返回成功消息
		return {
			code: 0,
			message: '成功生成并保存课程安排',
			data: {
				courseSchedulesCount: timeSlots.length,
				firstClassDate: formatReadableDate(new Date(timeSlots[0].start)),
				lastClassDate: formatReadableDate(new Date(timeSlots[timeSlots.length - 1].start)),
				savedToDatabase: true
			}
		};
	} catch (error) {
		console.error('云函数执行错误', error);
		return {
			code: -1,
			message: '云函数执行错误: ' + error.message
		};
	}
};

// 辅助函数：格式化日期为可读格式
function formatReadableDate(date) {
	if (!date) return '';
	const d = new Date(date);
	return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

// 辅助函数：格式化日期为时间哈希格式 YYYYMMDD
function formatDateForHash(date) {
	if (!date) return '';
	const d = new Date(date);
	return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}`;
}

// 辅助函数：格式化时间范围为时间哈希格式 HHMM-HHMM
function formatTimeRangeForHash(startTime, endTime) {
	if (!startTime || !endTime) return '';
	
	// 移除所有非数字字符，只保留小时和分钟
	const start = startTime.replace(/[^0-9]/g, '').padStart(4, '0').substring(0, 4);
	const end = endTime.replace(/[^0-9]/g, '').padStart(4, '0').substring(0, 4);
	
	return `${start}-${end}`;
}

// 辅助函数：创建日期时间
function createDateTime(date, timeStr) {
	if (!date || !timeStr) return null;
	
	try {
		const d = new Date(date);
		const timeParts = timeStr.split(':');
		
		if (timeParts.length >= 2) {
			const hours = parseInt(timeParts[0], 10);
			const minutes = parseInt(timeParts[1], 10);
			
			if (!isNaN(hours) && !isNaN(minutes)) {
				d.setHours(hours, minutes, 0, 0);
				return d;
			}
		}
	} catch (e) {
		console.error('创建日期时间失败:', e, date, timeStr);
	}
	
	return null;
}

// 辅助函数：在时间字符串上添加小时
function addTimeHours(timeStr, hours) {
	if (!timeStr) return '';
	
	try {
		const timeParts = timeStr.split(':');
		
		if (timeParts.length >= 2) {
			let h = parseInt(timeParts[0], 10);
			const m = parseInt(timeParts[1], 10);
			
			if (!isNaN(h) && !isNaN(m)) {
				h = (h + hours) % 24;
				return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
			}
		}
	} catch (e) {
		console.error('添加时间失败:', e, timeStr, hours);
	}
	
	return '';
} 