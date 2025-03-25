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
    
    // 查询预约详情
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
    
    // 获取关联的课程信息
    if (booking.courseId) {
      try {
        console.log('查询关联课程详情:', booking.courseId);
        const courseResult = await db.collection('courses')
          .doc(booking.courseId)
          .get();
        
        if (courseResult.data) {
          console.log('获取到课程详情，补充预约记录信息');
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
        }
      } catch (courseErr) {
        console.error('获取课程信息失败:', courseErr);
        // 继续执行，不影响预约详情返回
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
      courseTitle: booking.courseTitle || booking.courseName || '未知课程',
      courseStartTime: booking.startTime,
      courseEndTime: booking.endTime,
      schoolName: booking.schoolName || '未知校区',
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
    console.error('查询预约详情失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '获取预约详情失败'
    };
  }
}; 