'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('cancelBooking函数收到请求:', JSON.stringify(event));
  
  try {
    // 参数校验
    const { bookingId, userId } = event;
    if (!bookingId) {
      console.log('参数错误: 缺少bookingId');
      return {
        code: -1,
        success: false,
        message: '参数错误: 缺少预约ID'
      };
    }
    
    // 获取预约信息
    const bookingResult = await db.collection('bookings').doc(bookingId).get();
    
    if (!bookingResult.data || bookingResult.data.length === 0) {
      console.log('预约不存在:', bookingId);
      return {
        code: -1,
        success: false,
        message: '预约不存在或已被取消'
      };
    }
    
    // 获取预约数据
    let booking = bookingResult.data;
    if (Array.isArray(booking)) {
      booking = booking[0];
    }
    
    console.log('查询到预约信息:', JSON.stringify(booking));
    
    // 如果已经是取消状态，直接返回成功
    if (booking.status === 'cancelled') {
      console.log('预约已是取消状态, 无需操作');
      return {
        code: 0,
        success: true,
        message: '预约已取消',
        data: {
          bookingId,
          courseUpdated: true // 认为无需更新课程
        }
      };
    }
    
    // 权限检查：如果有userId参数，则检查是否为当前用户的预约
    if (userId && booking.userId && booking.userId !== userId) {
      console.log('权限错误，当前用户没有权限取消此预约');
      return {
        code: -1,
        success: false,
        message: '您无权取消此预约'
      };
    }
    
    // 获取课程ID
    const courseId = booking.courseId;
    console.log('预约对应的课程ID:', courseId);
    
    // 更新预约状态为已取消
    const updateResult = await db.collection('bookings').doc(bookingId).update({
      status: 'cancelled',
      updateTime: new Date(),
      cancelTime: new Date()
    });
    
    console.log('更新预约状态结果:', JSON.stringify(updateResult));
    
    let courseUpdateSuccess = false;
    
    // 获取课程信息，检查bookingCount
    let currentBookingCount = 0;
    let courseTitle = '';
    try {
      const courseResult = await db.collection('courses').doc(courseId).get();
      if (courseResult && courseResult.data) {
        let courseInfo = courseResult.data;
        if (Array.isArray(courseInfo)) {
          courseInfo = courseInfo[0];
        }
        
        currentBookingCount = courseInfo.bookingCount || 0;
        courseTitle = courseInfo.title || '';
        console.log(`课程 [${courseTitle}] 当前报名人数: ${currentBookingCount}`);
      } else {
        console.log('未找到课程信息:', courseId);
      }
    } catch (courseErr) {
      console.error('获取课程信息失败:', courseErr);
    }
    
    // 如果课程存在，更新课程报名人数
    if (courseId && updateResult.updated > 0) {
      try {
        console.log(`尝试更新课程 [${courseTitle || courseId}] 的报名人数`);
        
        // 方法1: 使用inc操作符
        const courseUpdateResult = await db.collection('courses')
          .doc(courseId)
          .update({
            bookingCount: dbCmd.inc(-1) // 减少bookingCount
          });
          
        console.log('更新课程报名人数结果:', JSON.stringify(courseUpdateResult));
        
        if (courseUpdateResult && courseUpdateResult.updated > 0) {
          courseUpdateSuccess = true;
          console.log(`✅ 课程 [${courseTitle || courseId}] 报名人数已减少: ${currentBookingCount} -> ${currentBookingCount - 1}`);
        } else {
          console.warn(`❌ 课程 [${courseTitle || courseId}] 报名人数更新失败，可能需要手动更新`);
        }
        
        // 验证是否确实减少了报名人数
        try {
          const verifyResult = await db.collection('courses').doc(courseId).get();
          if (verifyResult && verifyResult.data) {
            let courseInfo = verifyResult.data;
            if (Array.isArray(courseInfo)) {
              courseInfo = courseInfo[0];
            }
            
            const newBookingCount = courseInfo.bookingCount || 0;
            console.log(`验证: 课程 [${courseTitle || courseId}] 报名人数变化: ${currentBookingCount} -> ${newBookingCount}`);
            
            // 只有在原本报名人数大于0且新报名人数减少的情况下才认为是更新成功
            if (currentBookingCount > 0 && newBookingCount === currentBookingCount - 1) {
              courseUpdateSuccess = true;
            } else if (currentBookingCount === 0 && newBookingCount === 0) {
              courseUpdateSuccess = true; // 原本就是0，不需要减少
            } else {
              console.warn(`⚠️ 课程报名人数可能未正确更新，可以尝试使用forceUpdateBooking云函数更新`);
              courseUpdateSuccess = false;
            }
          }
        } catch (verifyErr) {
          console.error('验证课程报名人数失败:', verifyErr);
        }
      } catch (err) {
        console.error('更新课程报名人数失败:', err);
      }
    }
    
    // 返回处理结果
    return {
      code: 0,
      success: true,
      message: '预约已取消',
      data: {
        bookingId,
        courseId,
        status: 'cancelled',
        courseUpdated: courseUpdateSuccess,
        previousBookingCount: currentBookingCount
      }
    };
  } catch (err) {
    console.error('取消预约失败:', err);
    return {
      code: -1,
      success: false,
      message: '取消预约失败: ' + (err.message || '未知错误')
    };
  }
}; 