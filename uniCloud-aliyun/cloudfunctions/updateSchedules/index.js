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
		const { courseId, teacherId, teacherName, studentIds, saveToDatabase = false, startDate, endDate, classTime, classTimes, name, startTime: inputStartTime, endTime: inputEndTime } = event;
		
		// 记录输入参数，帮助调试
		console.log('调用updateSchedules, 参数:', {
			courseId, teacherId, teacherName, 
			startDate, endDate, 
			startTime: inputStartTime,
			endTime: inputEndTime,
			classTime: Array.isArray(classTime) ? classTime.length + '项' : classTime,
			classTimes: Array.isArray(classTimes) ? classTimes.length + '项' : classTimes,
			saveToDatabase
		});
		
		// 参数校验
		if (!courseId) {
			return {
				code: -1,
				message: '缺少课程ID'
			};
		}
		
		// 检查数据库连接
		console.log('数据库集合名称:', {
			courseCollectionName: courseCollection.name,
			scheduleCollectionName: courseSchedulesCollection.name
		});
		
		// 尝试直接获取课程信息（用于调试）
		try {
			const dbTest = await db.collection('course').limit(1).get();
			console.log('数据库连接测试:', {
				success: dbTest.data && dbTest.data.length > 0,
				count: dbTest.data ? dbTest.data.length : 0
			});
		} catch(dbErr) {
			console.error('数据库连接测试失败:', dbErr);
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
			teacherName: teacherName || '',  // 添加教师名称
			name: name || '',  // 添加课程名称 (可能使用title字段)
			title: '',         // 数据库中的title字段
			startTime: inputStartTime || '', // 如果传入了startTime，使用它
			endTime: inputEndTime || ''      // 如果传入了endTime，使用它
		};
		
		// 尝试从数据库获取课程信息
		try {
			console.log('准备查询课程数据，courseId:', courseId);
			// 使用doc方式查询可能会失败，改用where查询
			const courseResult = await courseCollection.where({
				_id: courseId
			}).get();
			
			if (courseResult.data && courseResult.data.length > 0) {
				// 使用数据库中的课程信息
				course = {...courseResult.data[0]};
				
				// 记录原始数据，帮助调试
				console.log('从数据库读取到的原始课程数据:', JSON.stringify(courseResult.data[0]));
				
				// 使用传入的参数覆盖课程信息（如果有的话）
				if (startDate) course.startDate = startDate;
				if (endDate) course.endDate = endDate;
				if (classTime) course.classTime = classTime;
				if (classTimes) course.classTimes = classTimes;
				if (teacherId) course.teacherId = teacherId;
				if (inputStartTime) course.startTime = inputStartTime;
				if (inputEndTime) course.endTime = inputEndTime;
				
				// 打印课程数据库中的时间信息
				console.log('数据库课程信息 - 时间详情:', {
					title: course.title,
					startTime: course.startTime,
					endTime: course.endTime,
					classTime: course.classTime,
					classTimes: course.classTimes,
					startDate: course.startDate,
					endDate: course.endDate
				});
				
				console.log('使用数据库课程信息:', courseId);
			} else {
				// 仅使用传入的参数
				console.log('未找到课程数据，使用传入参数:', courseId);
				
				// 直接从course集合重新查询一次，可能是_id格式问题
				try {
					console.log('尝试直接查询courses集合');
					const directResult = await db.collection('courses').where({
						_id: courseId
					}).get();
					
					if (directResult.data && directResult.data.length > 0) {
						console.log('直接从courses集合找到数据:', JSON.stringify(directResult.data[0]));
						course = {...directResult.data[0], ...course};
					}
				} catch (directErr) {
					console.error('直接查询courses集合失败:', directErr);
				}
				
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
			console.error('课程信息不完整:', {
				startDate: course.startDate,
				endDate: course.endDate,
				classTime: course.classTime,
				classTimes: course.classTimes
			});
			return {
				code: -1,
				message: '课程信息不完整，请检查开始日期、结束日期和上课时间'
			};
		}
		
		// 打印完整的课程数据，帮助调试
		console.log('课程完整数据 - 关键字段:',  {
			id: course.id || course._id,
			name: course.name || course.title,
			startDate: course.startDate,
			endDate: course.endDate,
			startTime: course.startTime,
			endTime: course.endTime,
			classTime: course.classTime,
			classTimes: course.classTimes
		});
		
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
			console.log('使用课程的classTime数组:', classTimePatterns);
		} else if (typeof course.classTimes === 'string') {
			// 如果是字符串，尝试解析为JSON
			try {
				classTimePatterns = JSON.parse(course.classTimes);
				console.log('将classTimes字符串解析为JSON:', classTimePatterns);
			} catch (e) {
				// 如果解析失败，假设是以逗号分隔的字符串
				classTimePatterns = course.classTimes.split(',').map(item => item.trim());
				console.log('将classTimes分割为数组:', classTimePatterns);
			}
		} else if (Array.isArray(course.classTimes)) {
			classTimePatterns = course.classTimes;
			console.log('使用课程的classTimes数组:', classTimePatterns);
		} else {
			// 如果都没有找到，尝试使用classTime字段（可能是字符串）
			if (typeof course.classTime === 'string') {
				try {
					classTimePatterns = JSON.parse(course.classTime);
					console.log('将classTime字符串解析为JSON:', classTimePatterns);
				} catch (e) {
					classTimePatterns = course.classTime.split(',').map(item => item.trim());
					console.log('将classTime分割为数组:', classTimePatterns);
				}
			}
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
		
		// 使用课程的startTime和endTime (优先使用数据库中的时间)
		// 注意：course数据库中使用title作为课程名称，课程时间在startTime和endTime字段中
		let realStartTimeStr = course.startTime;
		let realEndTimeStr = course.endTime;
		
		// 记录实际使用的时间，用于调试
		console.log('实际使用的课程时间:', { 
			realStartTimeStr, 
			realEndTimeStr,
			courseTitle: course.title || course.name
		});
		
		// 安全检查：如果时间未设置，尝试备用方案
		if (!realStartTimeStr || !realEndTimeStr) {
			console.error('课程时间未设置，尝试备用方案:', { 
				courseId: course.id || course._id,
				courseTitle: course.title || course.name
			});
			
			// 方案1：从数据库重新查询
			try {
				console.log('尝试从数据库中重新查询课程');
				
				// 尝试使用courses集合（可能使用不同的集合名称）
				const allCollections = await db.collection('courses').where({
					_id: courseId
				}).get();
				
				if (allCollections.data && allCollections.data.length > 0) {
					const foundCourse = allCollections.data[0];
					console.log('从courses集合找到课程:', JSON.stringify(foundCourse));
					
					// 如果找到了时间，则使用
					if (foundCourse.startTime && foundCourse.endTime) {
						course.startTime = foundCourse.startTime;
						course.endTime = foundCourse.endTime;
						console.log('使用courses集合中的时间:', course.startTime, course.endTime);
					}
				} else {
					console.log('courses集合中未找到课程');
				}
			} catch (e) {
				console.error('备用方案查询失败:', e);
			}
			
			// 方案2：如果仍然没有时间，使用输入参数
			if (!course.startTime && inputStartTime) {
				course.startTime = inputStartTime;
				console.log('使用输入参数startTime:', inputStartTime);
			}
			if (!course.endTime && inputEndTime) {
				course.endTime = inputEndTime;
				console.log('使用输入参数endTime:', inputEndTime);
			}
			
			// 方案3：最后使用默认值
			if (!course.startTime || !course.endTime) {
				// 显示警告
				console.warn('使用默认时间值作为最后手段');
				
				// 使用默认时间
				if (!course.startTime) course.startTime = '15:00';
				if (!course.endTime) course.endTime = '17:00';
			}
			
			// 更新时间变量
			realStartTimeStr = course.startTime;
			realEndTimeStr = course.endTime;
			
			console.log('最终使用的时间:', {
				startTime: realStartTimeStr,
				endTime: realEndTimeStr
			});
		}
		
		// 检查时间格式
		const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
		if (!timePattern.test(realStartTimeStr) || !timePattern.test(realEndTimeStr)) {
			console.error('课程时间格式不正确:', {
				courseId: course.id || course._id,
				courseTitle: course.title || course.name,
				realStartTimeStr,
				realEndTimeStr
			});
			return {
				status: 400,
				message: '课程时间格式不正确，应为HH:MM格式'
			};
		}
		
		// 解析开始和结束时间为小时和分钟
		const [startHours, startMinutes] = realStartTimeStr.split(':').map(Number);
		const [endHours, endMinutes] = realEndTimeStr.split(':').map(Number);
		
		// 如果结束时间小于开始时间，则返回错误
		if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
			console.error('课程结束时间必须晚于开始时间:', {
				courseId: course.id || course._id,
				courseTitle: course.title || course.name,
				realStartTimeStr,
				realEndTimeStr
			});
			return {
				status: 400,
				message: '课程结束时间必须晚于开始时间'
			};
		}
		
		// 创建符合新数据结构的时间槽
		const timeSlots = [];
		const timeHash = [];
		
		// 为每个日期创建时间槽
		for (let i = 0; i < classDates.length; i++) {
			const classDate = classDates[i];
			
			// 创建开始和结束时间（作为字符串）
			let startDateTime = createDateTimeString(classDate, realStartTimeStr);
			let endDateTime = createDateTimeString(classDate, realEndTimeStr);
			
			// 如果无法创建时间，详细记录原因
			if (!startDateTime || !endDateTime) {
				console.error('无法为该日期创建时间:', {
					classDate,
					startTime: realStartTimeStr,
					endTime: realEndTimeStr,
					result: {startDateTime, endDateTime}
				});
				continue; // 跳过这个日期，尝试下一个
			}
			
			// 只有当开始和结束时间有效时才添加时间槽
			if (startDateTime && endDateTime) {
				// 创建时间槽
				timeSlots.push({
					start: startDateTime, // 已经是带时区的ISO字符串
					end: endDateTime,     // 已经是带时区的ISO字符串
					status: 'scheduled',
					index: i + 1,       // 第几次课
					totalClasses: classDates.length  // 总课次
				});
				
				// 创建时间哈希 - 使用原始的时间字符串
				const dateStr = formatDateForHash(classDate);
				
				// 使用课程原始设置的时间，而不是从Date对象中提取时间
				// 这样确保timeHash中的时间与用户设置的课程时间一致
				const formattedStartTime = realStartTimeStr.split(':')
					.map(part => part.padStart(2, '0'))
					.join('')
					.substring(0, 4);
				const formattedEndTime = realEndTimeStr.split(':')
					.map(part => part.padStart(2, '0'))
					.join('')
					.substring(0, 4);
				
				// 使用固定格式的时间字符串
				timeHash.push(`${dateStr}T${formattedStartTime}-${formattedEndTime}`);
			}
		}
		
		// 在处理结束后再次检查是否有有效的时间槽
		if (timeSlots.length === 0) {
			console.error('处理完所有日期后，没有生成有效的时间槽', {
				classDates: classDates.length, 
				startTime: realStartTimeStr, 
				endTime: realEndTimeStr
			});
			return {
				code: -1,
				message: '无法创建有效的时间槽，请检查课程时间设置'
			};
		}
		
		// 创建简化的课程日程结构（用于预览）
		const schedules = timeSlots.map(slot => {
			const date = new Date(slot.start);
			return {
				date: slot.start, // ISO字符串格式
				startTime: realStartTimeStr, // 直接使用本地时间字符串
				endTime: realEndTimeStr,     // 直接使用本地时间字符串
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
					firstClassDate: schedules.length > 0 ? schedules[0].date : '',
					lastClassDate: schedules.length > 0 ? schedules[schedules.length - 1].date : '',
					savedToDatabase: false
				}
			};
		}
		
		// 处理课程安排
		console.log('处理课程安排...');
		
		// 检查并修复timeHash中可能存在的时间格式问题
		const fixedTimeHash = timeHash.map(hash => {
			// 示例格式: 20250503T1500-1700
			const parts = hash.split('T');
			if (parts.length !== 2) return hash;
			
			const dateStr = parts[0];
			const timeStr = parts[1];
			
			// 检查时间部分
			const timeParts = timeStr.split('-');
			if (timeParts.length !== 2) return hash;
			
			const startTime = timeParts[0];
			const endTime = timeParts[1];
			
			// 如果开始时间大于结束时间，则交换它们
			if (startTime && endTime && parseInt(startTime) > parseInt(endTime)) {
				console.warn(`修复timeHash中的时间顺序问题: ${hash} -> ${dateStr}T${endTime}-${startTime}`);
				return `${dateStr}T${endTime}-${startTime}`;
			}
			
			return hash;
		});
		
		// 打印修复前后的timeHash以便调试
		console.log('原始timeHash:', JSON.stringify(timeHash));
		console.log('修复后timeHash:', JSON.stringify(fixedTimeHash));
		
		// 准备课程安排数据 - 按照course_schedule的schema结构
		const courseScheduleData = {
			courseId: courseId,
			courseName: course.title || course.name || '未命名课程', // 优先使用title字段
			teacherId: teacherId || course.teacherId || '',
			teacherName: teacherName || course.teacherName || '', // 添加教师名称
			timeSlots: timeSlots,
			timeHash: fixedTimeHash,
			version: 1
		};
		
		// 打印生成的数据结构，用于调试
		console.log('生成的timeSlots第一项:', timeSlots.length > 0 ? JSON.stringify(timeSlots[0]) : '无');
		console.log('生成的timeHash前几项:', fixedTimeHash.slice(0, 3));
		console.log('使用的时间设置:', {
			startTime: realStartTimeStr,
			endTime: realEndTimeStr
		});
		
		// 准备教师日程数据 - 按照teacher_schedules的schema结构
		let teacherScheduleData = null;
		if (teacherId || course.teacherId) {
			const usedTeacherId = teacherId || course.teacherId;
			
			// 创建符合teacher_schedules结构的数据
			teacherScheduleData = {
				teacherId: usedTeacherId,
				courses: [{
					courseId: courseId,
					timeRanges: timeSlots.map(slot => slot.start) // 已经是字符串
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
						selectedSlots: timeSlots.map(slot => slot.start) // 已经是字符串
					}]
				});
			}
		}
		
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
				firstClassDate: timeSlots.length > 0 ? timeSlots[0].start : '',
				lastClassDate: timeSlots.length > 0 ? timeSlots[timeSlots.length - 1].start : '',
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
	
	try {
		const d = new Date(date);
		if (isNaN(d.getTime())) {
			console.error('无效的日期:', date);
			return '';
		}
		
		const year = d.getFullYear();
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		
		return `${year}${month}${day}`;
	} catch (e) {
		console.error('格式化日期失败:', e, date);
		return '';
	}
}

// 辅助函数：格式化时间范围为时间哈希格式 HHMM-HHMM
function formatTimeRangeForHash(startTime, endTime) {
	if (!startTime || !endTime) return '';
	
	try {
		// 解析时间字符串
		const startParts = startTime.split(':');
		const endParts = endTime.split(':');
		
		if (startParts.length < 2 || endParts.length < 2) {
			return '';
		}
		
		// 确保是有效的数字
		const startHours = parseInt(startParts[0], 10);
		const startMinutes = parseInt(startParts[1], 10);
		const endHours = parseInt(endParts[0], 10);
		const endMinutes = parseInt(endParts[1], 10);
		
		if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
			return '';
		}
		
		// 格式化时间字符串
		const start = `${String(startHours).padStart(2, '0')}${String(startMinutes).padStart(2, '0')}`;
		const end = `${String(endHours).padStart(2, '0')}${String(endMinutes).padStart(2, '0')}`;
		
		return `${start}-${end}`;
	} catch (e) {
		console.error('格式化时间范围失败:', e, startTime, endTime);
		return '';
	}
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

// 辅助函数：创建日期时间字符串（格式：YYYY-MM-DDThh:mm:ss.sssZ）
function createDateTimeString(date, timeStr) {
	if (!date || !timeStr) return null;
	
	try {
		// 创建日期对象，只用于获取年月日
		const d = new Date(date);
		if (isNaN(d.getTime())) {
			console.error('无效的日期:', date);
			return null;
		}
		
		// 获取日期部分
		const year = d.getFullYear();
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		
		// 解析时间字符串
		const timeParts = timeStr.split(':');
		if (timeParts.length < 2) {
			console.error('无效的时间格式:', timeStr);
			return null;
		}
		
		// 获取时间部分
		const hours = parseInt(timeParts[0], 10);
		const minutes = parseInt(timeParts[1], 10);
		if (isNaN(hours) || isNaN(minutes)) {
			console.error('无效的时间值:', timeStr);
			return null;
		}
		
		// 创建手动格式化的ISO时间字符串
		// 注意：这里我们直接使用本地时间并加上+08:00时区标记，不进行时区转换
		const hoursStr = hours.toString().padStart(2, '0');
		const minutesStr = minutes.toString().padStart(2, '0');
		
		// 创建带时区标记的时间字符串 (中国标准时间，UTC+8)
		const result = `${year}-${month}-${day}T${hoursStr}:${minutesStr}:00.000+08:00`;
		
		// 记录创建的时间字符串，用于调试
		console.log(`创建时间字符串: ${date} + ${timeStr} => ${result}`);
		
		return result;
	} catch (e) {
		console.error('创建日期时间字符串失败:', e, date, timeStr);
		return null;
	}
} 