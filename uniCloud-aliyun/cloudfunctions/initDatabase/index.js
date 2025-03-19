'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const collections = ['courses', 'teachers', 'news', 'users', 'bookings'];
  const results = {};
  
  try {
    // 检查和创建所有必要的集合
    for (const collection of collections) {
      try {
        // 尝试查询，如果集合不存在会抛出错误
        await db.collection(collection).limit(1).get();
        results[collection] = { exists: true, created: false, message: '集合已存在' };
      } catch (error) {
        // 检查错误类型
        if (error.code === 'SCHEMA_COLLECTION_NOT_EXISTS') {
          try {
            // 创建一个临时文档，会自动创建集合
            const tempDoc = {
              _id: `temp_${Date.now()}`, // 临时ID
              createdAt: new Date(),
              isTemp: true
            };
            await db.collection(collection).add(tempDoc);
            
            // 立即删除临时文档
            await db.collection(collection).doc(tempDoc._id).remove();
            
            results[collection] = { exists: false, created: true, message: '集合已成功创建' };
          } catch (createError) {
            results[collection] = { 
              exists: false, 
              created: false, 
              error: createError.message,
              message: '创建集合失败' 
            };
          }
        } else {
          results[collection] = { 
            exists: false, 
            created: false, 
            error: error.message,
            message: '检查集合时出错' 
          };
        }
      }
    }
    
    return {
      success: true,
      results,
      message: '数据库初始化完成'
    };
  } catch (error) {
    console.error('初始化数据库失败:', error);
    return {
      success: false,
      error: error.message,
      message: '初始化数据库失败'
    };
  }
};
