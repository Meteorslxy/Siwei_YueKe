'use strict';

const db = uniCloud.database();
const favoriteCollection = db.collection('favorites');

exports.main = async (event, context) => {
  // 检查参数
  if (!event.userId) {
    return {
      code: -1,
      message: '用户ID不能为空'
    }
  }
  
  try {
    const page = parseInt(event.page) || 1;
    const pageSize = parseInt(event.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    
    // 查询条件
    let query = {
      userId: event.userId
    };
    
    // 按类型筛选
    if (event.type && event.type !== 'all') {
      query.itemType = event.type;
    }
    
    // 查询总数
    const countResult = await favoriteCollection.where(query).count();
    const total = countResult.total;
    
    // 查询收藏列表
    const res = await favoriteCollection
      .where(query)
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(pageSize)
      .get();
    
    return {
      code: 0,
      message: '获取成功',
      data: res.data || [],
      total,
      page,
      pageSize
    }
  } catch (e) {
    console.error('获取收藏列表失败:', e);
    return {
      code: -1,
      message: '系统错误',
      error: e.message
    }
  }
}; 