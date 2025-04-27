'use strict';

const db = uniCloud.database();

// 课程日程安排集合
const courseSchedulesCollection = db.collection('course_schedule');
// 教师日程集合
const teacherSchedulesCollection = db.collection('teacher_schedules');
// 学生日程集合
const studentSchedulesCollection = db.collection('student_schedules');

exports.main = async (event, context) => {
	try {
		// 获取参数
		const { courseId, teacherId, schedules } = event;
		
		// 参数校验
		if (!courseId) {
			return {
				code: -1,
				message: '缺少课程ID'
			};
		}
		
		if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
			return {
				code: -1,
				message: '缺少课程计划数据'
			};
		}
		
		// 构建时间槽数据
		const timeSlots = schedules.map((schedule, index) => {
			const startTime = schedule.startTime || '09:00';
			const endTime = schedule.endTime || '11:00';
			
			// 创建时间槽
			return {
				start: schedule.date,
				end: addHoursToDateString(schedule.date, startTime, endTime),
				status: 'scheduled',
				index: index + 1,
				totalClasses: schedules.length
			};
		});
		
		if (timeSlots.length === 0) {
			return {
				code: -1,
				message: '无法创建有效的时间槽'
			};
		}
		
		// 创建时间哈希
		const timeHash = timeSlots.map(slot => {
			const date = new Date(slot.start);
			const dateStr = formatDateForHash(date);
			const startTime = new Date(slot.start).toTimeString().substring(0, 5);
			const endTime = new Date(slot.end).toTimeString().substring(0, 5);
			const timeRangeStr = formatTimeRangeForHash(startTime, endTime);
			return `${dateStr}T${timeRangeStr}`;
		});
		
		// 准备课程安排数据
		const courseScheduleData = {
			courseId: courseId,
			teacherId: teacherId || '',
			timeSlots: timeSlots,
			timeHash: timeHash,
			version: 1
		};
		
		// 准备教师日程数据
		let teacherScheduleData = null;
		if (teacherId) {
			teacherScheduleData = {
				teacherId: teacherId,
				courses: [{
					courseId: courseId,
					timeRanges: timeSlots.map(slot => slot.start) // 只保存开始时间
				}]
			};
		}
		
		// 处理教师日程
		if (teacherScheduleData) {
			const teacherId = teacherScheduleData.teacherId;
			
			// 检查教师是否已经有日程记录
			const teacherResult = await teacherSchedulesCollection.where({
				teacherId: teacherId
			}).get();
			
			if (teacherResult.data && teacherResult.data.length > 0) {
				// 已有记录，更新现有的教师日程
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
				await teacherSchedulesCollection.add(teacherScheduleData);
			}
		}
		
		// 处理课程安排
		// 查询现有课程安排
		const scheduleResult = await courseSchedulesCollection.where({
			courseId: courseId
		}).get();
		
		if (scheduleResult.data && scheduleResult.data.length > 0) {
			// 已有记录，更新现有课程安排
			await courseSchedulesCollection.doc(scheduleResult.data[0]._id).update(courseScheduleData);
		} else {
			// 没有现有记录，创建新的课程安排
			await courseSchedulesCollection.add(courseScheduleData);
		}
		
		// 如果一切成功，返回成功消息
		return {
			code: 0,
			message: '成功保存课程安排',
			data: {
				courseSchedulesCount: timeSlots.length,
				firstClassDate: formatReadableDate(new Date(timeSlots[0].start)),
				lastClassDate: formatReadableDate(new Date(timeSlots[timeSlots.length - 1].start))
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

// 辅助函数：格式化日期为时间哈希
function formatDateForHash(date) {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// 辅助函数：格式化时间范围为时间哈希
function formatTimeRangeForHash(startTime, endTime) {
	return `${startTime}-${endTime}`;
}

// 辅助函数：格式化可读日期
function formatReadableDate(date) {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// 辅助函数：为日期字符串添加小时
function addHoursToDateString(dateStr, startTime, endTime) {
	try {
		const date = new Date(dateStr);
		const [startHour, startMinute] = startTime.split(':').map(n => parseInt(n, 10));
		const [endHour, endMinute] = endTime.split(':').map(n => parseInt(n, 10));
		
		// 创建结束时间
		const endDate = new Date(date);
		endDate.setHours(endHour, endMinute, 0, 0);
		
		return endDate;
	} catch (e) {
		console.error('添加小时到日期失败:', e);
		// 返回原始日期加2小时作为默认值
		const date = new Date(dateStr);
		date.setHours(date.getHours() + 2);
		return date;
	}
} 