'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { limit = 10 } = event;
  
  try {
    // 获取最新的资讯数据
    const result = await db.collection('news')
      .orderBy('publishTime', 'desc') // 按发布时间倒序
      .limit(limit)
      .get();
    
    return {
      code: 0,
      success: true,
      data: result.data,
      message: '获取资讯数据成功'
    };
  } catch (err) {
    console.error('获取资讯数据失败:', err);
    return {
      code: -1,
      success: false,
      data: [],
      message: err.message || '获取资讯数据失败'
    };
  }
}; 