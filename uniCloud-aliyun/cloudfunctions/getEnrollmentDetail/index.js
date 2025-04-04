'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  console.log('getEnrollmentDetail函数收到请求:', event);
  
  try {
    // 获取参数
    const { id, userId } = event;
    
    // 验证必要参数
    if (!id) {
      return {
        code: -1,
        message: '缺少报名ID参数'
      };
    }
    
    // 查询报名记录
    let enrollmentResult;
    try {
      enrollmentResult = await db.collection('enrollments').doc(id).get();
    } catch (err) {
      console.error('查询报名记录失败:', err);
      return {
        code: -1,
        message: '未找到报名记录'
      };
    }
    
    // 检查查询结果
    if (!enrollmentResult.data || enrollmentResult.data.length === 0) {
      return {
        code: -1,
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
        message: '无权限查看此报名记录'
      };
    }
    
    // 获取关联的课程信息
    let courseInfo = null;
    if (enrollment.courseId) {
      try {
        const courseResult = await db.collection('courses').doc(enrollment.courseId).get();
        if (courseResult.data && courseResult.data.length > 0) {
          courseInfo = courseResult.data[0] || courseResult.data;
        }
      } catch (err) {
        console.error('获取课程信息失败:', err);
        // 即使课程信息获取失败，也返回报名信息
      }
    }
    
    // 返回详细信息
    return {
      code: 0,
      message: '获取成功',
      data: {
        enrollment: enrollment,
        course: courseInfo
      }
    };
  } catch (error) {
    console.error('获取报名详情失败:', error);
    return {
      code: -1,
      message: '系统错误',
      error: error.message
    };
  }
}; 