'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('cancelBooking函数收到请求:', event);
  const { bookingId, userId, skipUserCheck = false } = event;
  
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
    
    // 如果提供了userId且未设置skipUserCheck，则执行用户验证
    if (userId && !skipUserCheck) {
      console.log('用户ID验证:');
      console.log('- 请求中的userId:', userId, '(类型:', typeof userId, ')');
      console.log('- 预约中的userId:', booking.userId, '(类型:', typeof booking.userId, ')');
      
      // 特殊情况处理：检查字符串形式是否相等
      const userIdStr = String(userId);
      const bookingUserIdStr = String(booking.userId);
      
      if (userIdStr === bookingUserIdStr) {
        console.log('字符串形式匹配，允许操作继续');
      } else {
        console.log('用户无权取消该预约，ID不匹配');
        return {
          code: -1,
          success: false,
          message: '您无权取消该预约'
        };
      }
    } else if (skipUserCheck) {
      console.log('已设置skipUserCheck=true，跳过用户验证');
    }
    
    // 检查预约状态是否可以取消
    // 确保booking.status有值，默认为'pending'（未缴费）
    booking.status = booking.status || 'pending';
    
    // 检查状态，允许未缴费(pending)和已确认但未支付(confirmed_unpaid)状态取消
    // pending: 待确认（默认状态，未缴费）
    // confirmed_unpaid: 已确认但未支付
    // confirmed: 已确认且已支付
    // finished: 已完成
    // cancelled: 已取消
    if (booking.status !== 'pending' && booking.status !== 'confirmed_unpaid' && booking.status !== 'confirmed') {
      console.log(`当前预约状态(${booking.status})不允许取消`);
      return {
        code: -1,
        success: false,
        message: `当前状态(${booking.status})不允许取消预约`
      };
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
      await db.collection('bookings')
        .doc(bookingDocId)
        .update({
          status: 'cancelled',
          cancelTime: new Date(),
          updateTime: new Date()
        });
      console.log('预约状态已更新为已取消');
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
        
        // 更新课程报名人数
        const updateResult = await db.collection('courses')
          .doc(courseId)
          .update({
            bookingCount: dbCmd.inc(-1) // 只减少bookingCount
          });
        
        console.log('课程报名人数更新结果:', updateResult);
        console.log('课程报名人数已更新');
      } catch (courseErr) {
        console.error('更新课程报名人数失败:', courseErr);
        // 继续执行，不影响取消预约的结果
      }
    } else {
      console.log('未找到课程ID，跳过更新课程报名人数');
    }
    
    return {
      code: 0,
      success: true,
      message: '预约已取消'
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