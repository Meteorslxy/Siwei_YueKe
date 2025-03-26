'use strict';

// 通用数据库更新函数，可以选择绕过schema验证
exports.main = async (event, context) => {
  console.log('common_update函数收到请求:', event);
  
  const { table, id, data, where, use_schema = true } = event;
  
  if (!table) {
    return {
      code: -1,
      success: false,
      message: '缺少表名参数'
    };
  }
  
  if (!id && !where) {
    return {
      code: -1,
      success: false,
      message: '缺少id或where条件'
    };
  }
  
  if (!data || Object.keys(data).length === 0) {
    return {
      code: -1,
      success: false,
      message: '缺少更新数据'
    };
  }
  
  try {
    const db = uniCloud.database();
    let updateResult;
    
    // 如果指定不使用schema验证，则使用`db._collection`方法，这将绕过schema验证
    const collection = use_schema ? db.collection(table) : db._collection(table);
    
    // 使用ID更新
    if (id) {
      console.log(`使用ID(${id})更新${table}表`);
      updateResult = await collection.doc(id).update(data);
    } 
    // 使用where条件更新
    else if (where) {
      console.log(`使用条件(${JSON.stringify(where)})更新${table}表`);
      updateResult = await collection.where(where).update(data);
    }
    
    console.log('更新结果:', updateResult);
    
    // 检查更新结果
    if (updateResult && updateResult.updated >= 0) {
      return {
        code: 0,
        success: true,
        message: '更新成功',
        updated: updateResult.updated
      };
    } else {
      return {
        code: -1,
        success: false,
        message: '未更新任何数据'
      };
    }
  } catch (err) {
    console.error('更新数据失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '更新数据失败'
    };
  }
}; 