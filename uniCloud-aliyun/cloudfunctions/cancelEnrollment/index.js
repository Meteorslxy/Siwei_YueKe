'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  console.log('cancelEnrollment函数收到请求:', event);
  
  try {
    // 获取参数
    const { enrollmentId, userId, reason = '用户取消' } = event;
    
    // 验证必要参数
    if (!enrollmentId) {
      return {
        code: -1,
        success: false,
        message: '缺少报名ID参数'
      };
    }
    
    // 查询报名记录
    let enrollmentResult;
    try {
      enrollmentResult = await db.collection('enrollments').doc(enrollmentId).get();
    } catch (err) {
      console.error('查询报名记录失败:', err);
      return {
        code: -1,
        success: false,
        message: '未找到报名记录'
      };
    }
    
    // 检查查询结果
    if (!enrollmentResult.data || enrollmentResult.data.length === 0) {
      return {
        code: -1,
        success: false,
        message: '未找到报名记录'
      };
    }
    
    // 获取报名数据
    const enrollment = enrollmentResult.data[0] || enrollmentResult.data;
    
    // 如果提供了用户ID，检查是否为该用户的报名记录
    if (userId && enrollment.userId !== userId) {
      console.log('用户ID不匹配', userId, enrollment.userId);
      return {
        code: -1,
        success: false,
        message: '无权限取消此报名'
      };
    }
    
    // 检查报名记录状态是否允许取消
    if (enrollment.status === 'cancelled') {
      return {
        code: -1,
        success: false,
        message: '该报名已被取消'
      };
    }
    
    if (enrollment.status === 'completed') {
      return {
        code: -1,
        success: false,
        message: '该报名已完成，无法取消'
      };
    }
    
    // 更新报名记录状态
    const updateResult = await db.collection('enrollments').doc(enrollmentId).update({
      status: 'cancelled',
      cancelReason: reason,
      cancelTime: new Date(),
      updateTime: new Date()
    });
    
    console.log('更新报名状态结果:', updateResult);
    
    // 更新课程报名人数
    try {
      const courseId = enrollment.courseId;
      if (courseId) {
        // 使用事务更新课程报名数量
        await db.collection('courses').doc(courseId).update({
          bookingCount: dbCmd.inc(-1) // 减少报名人数
        });
        console.log('成功更新课程报名人数');
      }
    } catch (err) {
      console.error('更新课程报名人数失败:', err);
      // 即使更新报名人数失败，也不影响取消报名的操作，因此继续处理
    }
    
    // 返回成功结果
    return {
      code: 0,
      success: true,
      message: '取消报名成功'
    };
  } catch (error) {
    console.error('取消报名失败:', error);
    return {
      code: -1,
      success: false,
      message: '取消报名失败，请稍后再试',
      error: error.message
    };
  }
}; 