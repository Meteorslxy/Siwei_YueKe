'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event;
  
  try {
    const collection = db.collection('news');
    const countResult = await collection.count();
    const total = countResult.total;
    
    const list = await collection
      .orderBy('date', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    
    return {
      code: 0,
      data: list.data,
      total,
      message: '获取资讯列表成功'
    };
  } catch (error) {
    console.error('获取资讯列表失败:', error);
    return {
      code: -1,
      data: [],
      message: '获取资讯列表失败: ' + error.message
    };
  }
}; 