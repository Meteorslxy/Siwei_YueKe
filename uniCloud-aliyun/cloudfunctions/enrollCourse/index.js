'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('enrollCourse函数收到请求:', event);
  
  // 获取参数
  const { userId, courseId, userName, phoneNumber, remark = '' } = event;
  
  // 检查必要参数
  if (!userId) {
    console.log('缺少userId参数，报名失败');
    return {
      code: -1,
      success: false,
      message: '缺少用户ID参数'
    };
  }
  
  if (!courseId) {
    console.log('缺少courseId参数，报名失败');
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
    
    // 检查用户是否已经报名过该课程
    console.log('检查用户是否已报名过该课程');
    
    // 保存用户的真实ID（可能是_id或uid）
    const realUserId = userData._id;
    console.log('使用真实用户ID:', realUserId);
    
    const existResult = await db.collection('enrollments')
      .where({
        userId: realUserId,
        courseId: courseId,
        status: dbCmd.in(['pending', 'confirmed'])
      })
      .get();
    
    if (existResult.data && existResult.data.length > 0) {
      console.log('用户已报名过该课程');
      return {
        code: -1,
        success: false,
        message: '您已报名过该课程'
      };
    }
    
    // 生成报名编号
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').substring(0, 14);
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const enrollmentNumber = `${timestamp}${randomStr}`;
    
    // 创建报名记录
    const enrollmentData = {
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
      createTime: new Date(),
      updateTime: new Date()
    };
    
    console.log('准备创建报名记录:', enrollmentData);
    
    // 插入报名记录
    const enrollmentResult = await db.collection('enrollments').add(enrollmentData);
    console.log('报名记录创建结果:', enrollmentResult);
    
    if (!enrollmentResult.id) {
      console.error('创建报名记录失败');
      return {
        code: -1,
        success: false,
        message: '创建报名记录失败'
      };
    }
    
    // 更新课程报名人数
    console.log('更新课程报名人数');
    await db.collection('courses').doc(courseId).update({
      bookingCount: dbCmd.inc(1) // 只更新bookingCount字段
    });
    
    // 创建短格式的报名ID
    const shortEnrollmentId = `E${enrollmentResult.id.slice(-10).toUpperCase()}`;
    
    // 更新报名记录，添加报名编号
    await db.collection('enrollments').doc(enrollmentResult.id).update({
      enrollmentId: shortEnrollmentId
    });
    
    console.log('报名成功，报名ID:', shortEnrollmentId);
    
    return {
      code: 0,
      success: true,
      data: {
        enrollmentId: enrollmentResult.id,
        enrollmentInfo: {
          ...enrollmentData,
          enrollmentId: shortEnrollmentId,
        }
      },
      message: '报名成功，等待确认'
    };
  } catch (err) {
    console.error('报名失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '报名失败，请稍后再试'
    };
  }
}; 