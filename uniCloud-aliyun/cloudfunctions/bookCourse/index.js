'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('bookCourse函数收到请求:', event);
  
  // 获取参数
  const { userId, courseId, userName, phoneNumber, remark = '' } = event;
  
  // 检查必要参数
  if (!userId) {
    console.log('缺少userId参数，预约失败');
    return {
      code: -1,
      success: false,
      message: '缺少用户ID参数'
    };
  }
  
  if (!courseId) {
    console.log('缺少courseId参数，预约失败');
    return {
      code: -1,
      success: false,
      message: '缺少课程ID参数'
    };
  }
  
  try {
    // 获取用户信息
    console.log('检查用户信息:', userId);
    const userResult = await db.collection('users').doc(userId).get();
    
    if (!userResult.data || userResult.data.length === 0) {
      console.log('用户不存在');
      return {
        code: -1,
        success: false,
        message: '用户不存在'
      };
    }
    
    const userData = userResult.data[0] || userResult.data;
    const studentName = userName || userData.nickName || userData.username || '未知用户';
    const contactPhone = phoneNumber || userData.phoneNumber || '';
    
    // 获取课程信息
    console.log('检查课程信息:', courseId);
    const courseResult = await db.collection('courses').doc(courseId).get();
    
    if (!courseResult.data || courseResult.data.length === 0) {
      console.log('课程不存在');
      return {
        code: -1,
        success: false,
        message: '课程不存在'
      };
    }
    
    const course = courseResult.data[0] || courseResult.data;
    
    // 检查课程是否有名额
    const capacity = course.courseCount || course.capacity || 200; // 优先使用courseCount
    const enrollCount = course.bookingCount || 0;
    
    console.log('课程容量:', capacity, '已报名人数:', enrollCount);
    
    if (enrollCount >= capacity) {
      console.log('课程已满');
      return {
        code: -1,
        success: false,
        message: '课程名额已满'
      };
    }
    
    // 检查用户是否已经预约过该课程
    console.log('检查用户是否已预约过该课程');
    const existResult = await db.collection('bookings')
      .where({
        userId: userId,
        courseId: courseId,
        status: dbCmd.in(['pending', 'confirmed'])
      })
      .get();
    
    if (existResult.data && existResult.data.length > 0) {
      console.log('用户已预约过该课程');
      return {
        code: -1,
        success: false,
        message: '您已预约过该课程'
      };
    }
    
    // 生成预约编号
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').substring(0, 14);
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const bookingNumber = `${timestamp}${randomStr}`;
    
    // 创建预约记录
    const bookingData = {
      userId: userId,
      courseId: courseId,
      courseTitle: course.title || '',
      courseStartTime: course.startTime || '',
      courseEndTime: course.endTime || '',
      schoolName: course.schoolName || course.location || '未知校区',
      studentName: studentName,
      contactPhone: contactPhone,
      remark: remark,
      status: 'pending', // 初始状态为待确认（未缴费）
      paymentStatus: 'unpaid', // 支付状态：未支付
      createTime: new Date(),
      updateTime: new Date()
    };
    
    console.log('准备创建预约记录:', bookingData);
    
    // 插入预约记录
    const bookingResult = await db.collection('bookings').add(bookingData);
    console.log('预约记录创建结果:', bookingResult);
    
    if (!bookingResult.id) {
      console.error('创建预约记录失败');
      return {
        code: -1,
        success: false,
        message: '创建预约记录失败'
      };
    }
    
    // 更新课程报名人数
    console.log('更新课程报名人数');
    await db.collection('courses').doc(courseId).update({
      bookingCount: dbCmd.inc(1) // 只更新bookingCount字段
    });
    
    // 创建短格式的预约ID
    const shortBookingId = `B${bookingResult.id.slice(-10).toUpperCase()}`;
    
    // 更新预约记录，添加预约编号
    await db.collection('bookings').doc(bookingResult.id).update({
      bookingId: shortBookingId
    });
    
    console.log('预约成功，预约ID:', shortBookingId);
    
    return {
      code: 0,
      success: true,
      data: {
        bookingId: bookingResult.id,
        bookingInfo: {
          ...bookingData,
          bookingId: shortBookingId,
        }
      },
      message: '预约成功，等待确认'
    };
  } catch (err) {
    console.error('预约失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '预约失败，请稍后再试'
    };
  }
}; 