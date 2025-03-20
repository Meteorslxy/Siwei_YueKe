'use strict';
const db = uniCloud.database();

/**
 * 获取教师详情
 * @param {Object} event - 请求参数
 * @param {String} event.id - 教师ID
 * @returns {Object} 查询结果
 */
exports.main = async (event, context) => {
  const { id } = event;
  
  if (!id) {
    return {
      code: -1,
      message: '教师ID不能为空'
    };
  }
  
  try {
    console.log('获取教师详情，ID:', id);
    
    // 查询教师详情
    const teacherResult = await db.collection('teachers').doc(id).get();
    if (!teacherResult.data || teacherResult.data.length === 0) {
      return {
        code: -1,
        message: '教师不存在'
      };
    }
    
    const teacher = teacherResult.data[0];
    
    // 查询该教师的课程
    const coursesResult = await db.collection('courses')
      .where({
        teacherId: id
      })
      .limit(5)
      .get();
    
    // 查询该教师的评价
    const reviewsResult = await db.collection('reviews')
      .where({
        teacherId: id
      })
      .orderBy('createTime', 'desc')
      .limit(5)
      .get();
    
    return {
      code: 0,
      data: {
        ...teacher,
        courses: coursesResult.data || [],
        reviews: reviewsResult.data || []
      }
    };
  } catch (err) {
    console.error('获取教师详情错误:', err);
    return {
      code: -1,
      message: '获取教师详情失败: ' + err.message
    };
  }
}; 