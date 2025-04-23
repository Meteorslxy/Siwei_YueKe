'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('getBookingDetail函数收到请求:', event);
  
  const { bookingId } = event;
  // 获取用户信息
  const { PLATFORM, APPID, USERID } = context;
  
  if (!bookingId) {
    console.log('缺少bookingId参数，查询失败');
    return {
      code: -1,
      success: false,
      message: '预约ID不能为空'
    };
  }
  
  try {
    console.log('查询预约详情:', bookingId);
    
    // 查询用户ID - 注意阿里云需要从context或其他方式获取用户ID
    if (!USERID) {
      return {
        code: -1,
        success: false,
        message: '用户未登录'
      };
    }
    
    const userId = USERID;
    
    // 查询预约详情 - 确保返回所有字段
    const bookingResult = await db.collection('bookings')
      .doc(bookingId)
      .get();
    
    if (!bookingResult.data) {
      console.log('预约记录不存在:', bookingId);
      return {
        code: -1,
        success: false,
        message: '预约记录不存在'
      };
    }
    
    console.log('获取到预约详情:', bookingResult.data);
    
    const booking = bookingResult.data;
    
    // 检查权限（只能查看自己的预约）
    if (booking.userId !== userId) {
      return {
        code: -1,
        success: false,
        message: '无权查看该预约'
      };
    }
    
    // 记录预约中教师信息（如果存在）
    const originalTeacherName = booking.teacherName || '';
    const originalTeacherPhone = booking.teacherPhone || '';
    console.log('数据库原始教师信息:', { 
      teacherName: originalTeacherName, 
      teacherPhone: originalTeacherPhone 
    });
    
    // 获取用户手机号
    let userPhoneNumber = '';
    try {
      const userResult = await db.collection('users')
        .doc(userId)
        .field({ phoneNumber: true })
        .get();
      
      if (userResult.data && userResult.data.phoneNumber) {
        userPhoneNumber = userResult.data.phoneNumber;
        console.log('获取到用户手机号:', userPhoneNumber);
      } else {
        console.log('用户无手机号或未找到用户信息');
      }
    } catch (userErr) {
      console.error('获取用户信息失败:', userErr);
      // 继续执行，不影响预约详情返回
    }
    
    // 获取关联的课程信息
    let courseTime = '';
    let isCourseDeleted = false;
    let courseDeletedNote = '';
    let courseTeacherName = '';
    let courseTeacherPhone = '';
    
    if (booking.courseId) {
      try {
        console.log('查询关联课程详情:', booking.courseId);
        const courseResult = await db.collection('courses')
          .doc(booking.courseId)
          .get();
        
        if (courseResult.data) {
          console.log('获取到课程详情，补充预约记录信息');
          // 保存课程中的教师信息
          if (courseResult.data.teacherName) {
            courseTeacherName = courseResult.data.teacherName;
            console.log('从课程获取到教师名称:', courseTeacherName);
          }
          
          if (courseResult.data.teacherPhone) {
            courseTeacherPhone = courseResult.data.teacherPhone;
            console.log('从课程获取到教师电话:', courseTeacherPhone);
          }
          
          // 补充课程信息
          if (!booking.courseTitle && courseResult.data.title) {
            booking.courseTitle = courseResult.data.title;
          }
          
          if (!booking.schoolName && courseResult.data.schoolName) {
            booking.schoolName = courseResult.data.schoolName;
          }
          
          if (!booking.teacherName && courseResult.data.teacherName) {
            booking.teacherName = courseResult.data.teacherName;
          }
          
          // 格式化课程时间
          if (courseResult.data.startTime && courseResult.data.endTime) {
            courseTime = `${courseResult.data.startTime} 至 ${courseResult.data.endTime}`;
          } else if (courseResult.data.time) {
            courseTime = courseResult.data.time;
          }
        } else {
          console.log(`课程(${booking.courseId})不存在，标记为已删除`);
          isCourseDeleted = true;
          courseDeletedNote = '课程已删除';
          
          // 更新预约状态为已取消
          if (booking.status !== 'cancelled') {
            try {
              await db.collection('bookings').doc(bookingId).update({
                status: 'cancelled',
                paymentStatus: 'cancelled',
                isCourseDeleted: true,
                courseDeletedNote: '课程已删除',
                updateTime: new Date()
              });
              
              booking.status = 'cancelled';
              booking.paymentStatus = 'cancelled';
              
              console.log(`已更新预约(${bookingId})状态为已取消`);
            } catch (updateErr) {
              console.error(`更新预约(${bookingId})状态失败:`, updateErr);
            }
          }
        }
      } catch (courseErr) {
        console.error('获取课程信息失败:', courseErr);
        // 如果是因为课程不存在导致的错误
        if (courseErr.message && courseErr.message.includes('not exist')) {
          console.log(`课程(${booking.courseId})不存在，标记为已删除`);
          isCourseDeleted = true;
          courseDeletedNote = '课程已删除';
          
          // 更新预约状态为已取消
          if (booking.status !== 'cancelled') {
            try {
              await db.collection('bookings').doc(bookingId).update({
                status: 'cancelled',
                paymentStatus: 'cancelled',
                isCourseDeleted: true,
                courseDeletedNote: '课程已删除',
                updateTime: new Date()
              });
              
              booking.status = 'cancelled';
              booking.paymentStatus = 'cancelled';
              
              console.log(`已更新预约(${bookingId})状态为已取消`);
            } catch (updateErr) {
              console.error(`更新预约(${bookingId})状态失败:`, updateErr);
            }
          }
        }
        // 继续执行，不影响预约详情返回
      }
    }
    
    // 格式化预约编号
    const formattedId = booking._id.slice(-10).toUpperCase();
    
    // 构建详细信息
    const bookingDetail = {
      _id: booking._id,
      bookingId: booking.bookingId || `B${formattedId}`,
      userId: booking.userId,
      courseId: booking.courseId,
      courseTitle: booking.courseTitle || booking.courseName || '未知课程',
      // 如果有开始和结束时间，优先使用并格式化
      courseStartTime: booking.courseStartTime || booking.startTime || '',
      courseEndTime: booking.courseEndTime || booking.endTime || '',
      // 已经格式化好的课程时间
      courseTime: courseTime || (booking.courseTime || ''),
      schoolName: booking.schoolName || '未知校区',
      studentName: booking.studentName || '未知学生',
      contactPhone: booking.contactPhone || '',
      // 优先使用预约记录中的教师信息，然后是课程中的教师信息
      teacherName: originalTeacherName || courseTeacherName || booking.teacherName || '',
      teacherPhone: originalTeacherPhone || courseTeacherPhone || booking.teacherPhone || '',
      // 添加用户手机号
      userPhoneNumber: userPhoneNumber,
      remark: booking.remark || '',
      status: booking.status || 'pending',
      // 添加支付状态
      paymentStatus: booking.paymentStatus || '',
      createTime: booking.createTime || '',
      confirmTime: booking.confirmTime || '',
      cancelTime: booking.cancelTime || '',
      finishTime: booking.finishTime || '',
      // 添加课程删除标记
      isCourseDeleted: booking.isCourseDeleted || isCourseDeleted,
      courseDeletedNote: booking.courseDeletedNote || courseDeletedNote
    };
    
    console.log('返回的教师信息:', {
      teacherName: bookingDetail.teacherName,
      teacherPhone: bookingDetail.teacherPhone
    });
    
    return {
      code: 0,
      success: true,
      data: bookingDetail,
      message: '获取预约详情成功'
    };
  } catch (err) {
    console.error('查询预约详情失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '获取预约详情失败'
    };
  }
}; 