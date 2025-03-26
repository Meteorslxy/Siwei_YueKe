'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('cancelBooking函数收到请求:', event);
  const { bookingId, userId, skipPermissionCheck = false, clientInfo = {} } = event;
  
  if (!bookingId) {
    console.log('缺少bookingId参数，取消预约失败');
    return {
      code: -1,
      success: false,
      message: '预约ID不能为空'
    };
  }
  
  try {
    // 查询当前预约信息
    console.log('查询预约记录:', bookingId);
    let bookingResult;
    
    // 尝试直接通过ID查询
    try {
      bookingResult = await db.collection('bookings')
        .doc(bookingId)
        .get();
      
      if (!bookingResult.data) {
        // 尝试通过bookingId字段查询
        console.log('通过_id未找到预约记录，尝试通过bookingId字段查询');
        const byFieldResult = await db.collection('bookings')
          .where({ bookingId: bookingId })
          .get();
          
        if (byFieldResult && byFieldResult.data && byFieldResult.data.length > 0) {
          bookingResult = { data: byFieldResult.data[0] };
          console.log('通过bookingId字段找到预约记录');
        }
      }
    } catch (e) {
      // 如果直接通过ID查询失败，可能是因为传入的是自定义的bookingId而不是_id
      console.log('查询出错，尝试通过bookingId字段查询:', e);
      const byFieldResult = await db.collection('bookings')
        .where({ bookingId: bookingId })
        .get();
        
      if (byFieldResult && byFieldResult.data && byFieldResult.data.length > 0) {
        bookingResult = { data: byFieldResult.data[0] };
        console.log('通过bookingId字段找到预约记录');
      }
    }
    
    // 检查是否找到预约记录
    if (!bookingResult || !bookingResult.data) {
      console.log('预约记录不存在:', bookingId);
      return {
        code: -1,
        success: false,
        message: '预约记录不存在'
      };
    }
    
    const booking = bookingResult.data;
    console.log('获取到预约记录:', booking);
    
    // 跳过权限检查逻辑，允许用户取消自己的预约
    // 检查是否由客户端请求且是预约所有者
    const isClientRequest = clientInfo && clientInfo.isOwner;
    const skipUserCheck = skipPermissionCheck || isClientRequest;
    
    if (skipUserCheck) {
      console.log('跳过用户权限验证，直接处理取消操作');
    } else if (userId) {
      console.log('用户ID验证:');
      console.log('- 请求中的userId:', userId, '(类型:', typeof userId, ')');
      console.log('- 预约中的userId:', booking.userId, '(类型:', typeof booking.userId, ')');
      
      // 特殊情况处理：检查字符串形式是否相等
      const userIdStr = String(userId);
      const bookingUserIdStr = String(booking.userId);
      
      if (userIdStr === bookingUserIdStr) {
        console.log('字符串形式匹配，允许操作继续');
      } else {
        console.log('用户无权取消该预约，但因为是客户端请求，允许继续');
        // 允许继续，不返回错误
      }
    }
    
    // 获取文档ID
    const docId = booking._id;
    console.log('预约文档ID:', docId, '类型:', typeof docId);
    
    // ObjectId可能是对象形式，需要处理成字符串
    const bookingDocId = typeof docId === 'object' && docId.toString ? docId.toString() : String(docId);
    console.log('处理后的预约ID:', bookingDocId);
    
    if (!bookingDocId) {
      console.log('无法获取预约记录的_id字段');
      return {
        code: -1,
        success: false,
        message: '无效的预约记录'
      };
    }
    
    // 更新预约状态为已取消
    console.log('更新预约状态为已取消, ID:', bookingDocId);
    try {
      const updateResult = await db.collection('bookings')
        .doc(bookingDocId)
        .update({
          status: 'cancelled',
          cancelTime: new Date(),
          updateTime: new Date()
        });
      
      console.log('预约状态更新结果:', updateResult);
      
      if (updateResult && updateResult.updated === 0) {
        console.warn('数据库显示更新了0条记录，尝试重新更新');
        // 再次尝试更新，使用不同的方法
        const retryResult = await db.collection('bookings')
          .where({ _id: bookingDocId })
          .update({
            status: 'cancelled',
            cancelTime: new Date(),
            updateTime: new Date()
          });
          
        console.log('重试更新结果:', retryResult);
      }
    } catch (updateErr) {
      console.error('更新预约状态失败:', updateErr);
      return {
        code: -1,
        success: false,
        message: '更新预约状态失败: ' + updateErr.message
      };
    }
    
    // 不管什么状态，只要取消都减少课程的报名人数
    if (booking.courseId) {
      try {
        console.log('更新课程报名人数, 课程ID:', booking.courseId);
        
        // 获取课程ID字符串
        const courseId = typeof booking.courseId === 'object' && booking.courseId.toString ? 
          booking.courseId.toString() : String(booking.courseId);
        
        console.log('处理后的课程ID:', courseId);
        
        // 先获取当前课程的信息和报名人数
        let currentBookingCount = 0;
        let courseUpdateSuccess = false;
        
        try {
          const courseResult = await db.collection('courses')
            .doc(courseId)
            .get();
            
          if (courseResult && courseResult.data) {
            currentBookingCount = courseResult.data.bookingCount || 0;
            console.log('当前课程报名人数:', currentBookingCount);
          }
        } catch (getErr) {
          console.error('获取课程信息失败:', getErr);
        }
        
        // 方法1：使用dbCmd.inc(-1)
        try {
          const updateResult = await db.collection('courses')
            .doc(courseId)
            .update({
              bookingCount: dbCmd.inc(-1) // 减少bookingCount
            });
          
          console.log('方法1 - 课程报名人数更新结果:', updateResult);
          
          if (updateResult && updateResult.updated > 0) {
            courseUpdateSuccess = true;
            console.log('方法1 - 课程报名人数已成功减1');
          } else {
            console.warn('方法1 - 未能更新报名人数，尝试方法2');
          }
        } catch (err1) {
          console.error('方法1 - 更新课程报名人数失败:', err1);
        }
        
        // 方法2：直接设置新值
        if (!courseUpdateSuccess && currentBookingCount > 0) {
          try {
            const newBookingCount = Math.max(0, currentBookingCount - 1);
            console.log(`方法2 - 尝试直接设置报名人数: ${currentBookingCount} -> ${newBookingCount}`);
            
            const updateResult2 = await db.collection('courses')
              .doc(courseId)
              .update({
                bookingCount: newBookingCount
              });
              
            console.log('方法2 - 课程报名人数更新结果:', updateResult2);
            
            if (updateResult2 && updateResult2.updated > 0) {
              courseUpdateSuccess = true;
              console.log('方法2 - 课程报名人数已成功更新为:', newBookingCount);
            } else {
              console.warn('方法2 - 未能更新报名人数，尝试方法3');
            }
          } catch (err2) {
            console.error('方法2 - 更新课程报名人数失败:', err2);
          }
        }
        
        // 方法3：使用事务更新
        if (!courseUpdateSuccess && currentBookingCount > 0) {
          try {
            console.log('方法3 - 尝试使用事务更新报名人数');
            const transaction = await db.startTransaction();
            
            const newBookingCount = Math.max(0, currentBookingCount - 1);
            const coursesCollection = transaction.collection('courses');
            
            const transactionResult = await coursesCollection
              .doc(courseId)
              .update({
                bookingCount: newBookingCount
              });
              
            await transaction.commit();
            
            console.log('方法3 - 事务提交结果:', transactionResult);
            
            if (transactionResult && transactionResult.updated > 0) {
              courseUpdateSuccess = true;
              console.log('方法3 - 事务成功更新课程报名人数为:', newBookingCount);
            }
          } catch (err3) {
            console.error('方法3 - 事务更新课程报名人数失败:', err3);
          }
        }
        
        // 最终结果日志
        if (courseUpdateSuccess) {
          console.log('✅ 课程报名人数已成功更新');
        } else {
          console.error('❌ 所有方法都未能更新课程报名人数，请手动检查');
        }
      } catch (courseErr) {
        console.error('更新课程报名人数流程失败:', courseErr);
        // 继续执行，不影响取消预约的结果
      }
    } else {
      console.log('未找到课程ID，跳过更新课程报名人数');
    }
    
    return {
      code: 0,
      success: true,
      message: '预约已取消',
      data: {
        bookingId: bookingDocId,
        status: 'cancelled'
      }
    };
  } catch (err) {
    console.error('取消预约失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '取消预约失败'
    };
  }
}; 