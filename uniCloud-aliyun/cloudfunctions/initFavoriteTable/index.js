'use strict';

// 初始化收藏表
exports.main = async (event, context) => {
  const db = uniCloud.database();
  
  console.log('开始初始化收藏表...');
  
  try {
    // 由于阿里云UniCloud中没有listCollections API，我们直接尝试创建集合和索引
    
    // 创建favorites集合（尝试操作，如果存在会自动忽略）
    const favoriteCollection = db.collection('favorites');
    console.log('准备创建favorites集合');
    
    // 尝试添加一个临时文档来确保集合存在
    try {
      // 添加一个临时文档
      const tempId = 'temp_' + Date.now();
      await favoriteCollection.doc(tempId).set({
        temp: true,
        createTime: Date.now()
      });
      console.log('临时文档添加成功，集合已创建');
      
      // 删除临时文档
      await favoriteCollection.doc(tempId).remove();
      console.log('临时文档已删除');
    } catch (e) {
      console.log('尝试创建集合时出错（可能已存在）:', e);
    }
    
    // 创建索引 - 使用阿里云UniCloud兼容的方式
    // 注意：阿里云UniCloud不支持直接createIndex API，
    // 索引需要在控制台或通过db_init.json创建
    
    console.log('注意: 索引需要在阿里云控制台手动创建。建议的索引:');
    console.log('1. 索引名: idx_user_type, 字段: {userId: 1, itemType: 1}');
    console.log('2. 索引名: idx_user_item_type, 字段: {userId: 1, itemId: 1, itemType: 1}, 唯一索引');
    console.log('3. 索引名: idx_create_time, 字段: {createTime: -1}');
    
    return {
      code: 0,
      message: '收藏表初始化成功，请在控制台手动创建索引',
      data: {
        collection: {
          success: true,
          message: '集合创建或已存在'
        },
        indexes: {
          success: true,
          message: '索引需要在控制台手动创建'
        }
      }
    };
  } catch (error) {
    console.error('初始化收藏表失败:', error);
    return {
      code: -1,
      message: '收藏表初始化失败',
      error: error.message
    };
  }
}; 