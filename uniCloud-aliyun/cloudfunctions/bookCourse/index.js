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
    console.log('检查用户信息, userId:', userId, '类型:', typeof userId);
    
    // 添加更多调试信息
    let userResult;
    
    // 采用多种方式尝试查询用户
    try {
      console.log('尝试方法1: 使用doc直接查询');
      userResult = await db.collection('uni-id-users').doc(userId).get();
      console.log('方法1查询结果:', userResult);
    } catch (err1) {
      console.error('方法1查询失败:', err1);
      
      try {
        console.log('尝试方法2: 使用where查询_id');
        userResult = await db.collection('uni-id-users').where({
          _id: userId
        }).get();
        console.log('方法2查询结果:', userResult);
      } catch (err2) {
        console.error('方法2查询失败:', err2);
        
        try {
          console.log('尝试方法3: 使用where查询uid');
          userResult = await db.collection('uni-id-users').where({
            uid: userId
          }).get();
          console.log('方法3查询结果:', userResult);
        } catch (err3) {
          console.error('方法3查询失败:', err3);
          throw new Error('无法查询到用户信息，所有尝试均失败');
        }
      }
    }
    
    // 增强用户数据检查
    if (!userResult || !userResult.data) {
      console.error('查询结果没有data字段');
      return {
        code: -1,
        success: false,
        message: '用户信息查询结果异常'
      };
    }
    
    if (userResult.data.length === 0) {
      console.log('用户数据为空数组');
      return {
        code: -1,
        success: false,
        message: '用户不存在'
      };
    }
    
    // 获取用户数据
    const userData = userResult.data[0] || userResult.data;
    console.log('查询到的用户数据:', userData);
    
    // 使用uni-id-users的字段名
    const studentName = userName || userData.nickname || userData.username || '未知用户';
    const contactPhone = phoneNumber || userData.mobile || '';
    
    console.log('使用的学生姓名:', studentName);
    console.log('使用的联系电话:', contactPhone);
    
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
    
    // 保存用户的真实ID（可能是_id或uid）
    const realUserId = userData._id;
    console.log('使用真实用户ID:', realUserId);
    
    const existResult = await db.collection('bookings')
      .where({
        userId: realUserId,
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
      userId: realUserId, // 使用真实用户ID
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
      bookingId: bookingNumber, // 确保有预约编号
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
    
    // 使用updateCourseBookingCount云函数更新报名人数
    try {
      console.log('调用updateCourseBookingCount更新课程报名人数');
      await uniCloud.callFunction({
        name: 'updateCourseBookingCount',
        data: { courseId: courseId }
      });
    } catch (error) {
      console.error('更新课程报名人数失败:', error);
      // 继续执行，不影响下面的流程
    }
    
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