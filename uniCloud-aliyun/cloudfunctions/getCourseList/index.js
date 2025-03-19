'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10, category = '', keyword = '' } = event;
  
  try {
    const collection = db.collection('courses');
    let query = collection;
    
    // 构建查询条件
    let condition = {};
    
    if (category) {
      condition.category = category;
    }
    
    if (keyword) {
      condition.title = new RegExp(keyword, 'i');
    }
    
    if (Object.keys(condition).length > 0) {
      query = query.where(condition);
    }
    
    // 获取总数
    const countResult = await query.count();
    const total = countResult.total;
    
    // 获取数据列表
    const list = await query
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    
    return {
      code: 0,
      data: list.data,
      total,
      message: '获取课程列表成功'
    };
  } catch (error) {
    console.error('获取课程列表失败:', error);
    return {
      code: -1,
      data: [],
      message: '获取课程列表失败: ' + error.message
    };
  }
}; 