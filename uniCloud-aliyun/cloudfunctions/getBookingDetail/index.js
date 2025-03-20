'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookingId } = event;
  // 获取用户信息
  const { PLATFORM, APPID, USERID } = context;
  
  if (!bookingId) {
    return {
      code: -1,
      success: false,
      message: '预约ID不能为空'
    };
  }
  
  try {
    // 查询用户ID - 注意阿里云需要从context或其他方式获取用户ID
    if (!USERID) {
      return {
        code: -1,
        success: false,
        message: '用户未登录'
      };
    }
    
    const userId = USERID;
    
    // 查询预约详情
    const bookingResult = await db.collection('bookings')
      .doc(bookingId)
      .get();
    
    if (!bookingResult.data) {
      return {
        code: -1,
        success: false,
        message: '预约记录不存在'
      };
    }
    
    const booking = bookingResult.data;
    
    // 检查权限（只能查看自己的预约）
    if (booking.userId !== userId) {
      return {
        code: -1,
        success: false,
        message: '无权查看该预约'
      };
    }
    
    // 查询关联的课程信息
    let course = {};
    
    if (booking.courseId) {
      try {
        const courseResult = await db.collection('courses')
          .doc(booking.courseId)
          .get();
        
        if (courseResult.data) {
          course = courseResult.data;
        }
      } catch (err) {
        console.error('查询课程信息失败:', err);
      }
    }
    
    // 格式化预约编号
    const formattedId = booking._id.slice(-10).toUpperCase();
    
    // 构建详细信息
    const bookingDetail = {
      _id: booking._id,
      bookingId: `B${formattedId}`,
      userId: booking.userId,
      courseId: booking.courseId,
      courseTitle: course.title || booking.courseName || '未知课程',
      courseStartTime: course.startTime || booking.startTime,
      courseEndTime: course.endTime || booking.endTime,
      schoolName: course.schoolName || booking.schoolName || '未知校区',
      studentName: booking.studentName,
      contactPhone: booking.contactPhone,
      remark: booking.remark,
      status: booking.status,
      createTime: booking.createTime,
      confirmTime: booking.confirmTime,
      cancelTime: booking.cancelTime,
      finishTime: booking.finishTime
    };
    
    return {
      code: 0,
      success: true,
      data: bookingDetail,
      message: '获取预约详情成功'
    };
  } catch (err) {
    console.error('获取预约详情失败:', err);
    return {
      code: -1,
      success: false,
      data: null,
      message: err.message || '获取预约详情失败'
    };
  }
}; 