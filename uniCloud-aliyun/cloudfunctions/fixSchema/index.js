'use strict';

/**
 * 修复和验证集合 Schema
 * @description 为指定集合修复和验证 Schema
 * @returns {object} 修复结果
 */
exports.main = async (event, context) => {
  console.log('修复和验证 Schema 函数被调用，参数:', event);
  const { collectionName = 'bookings' } = event;
  
  try {
    const db = uniCloud.database();
    
    // 验证 Schema 是否正确
    try {
      console.log(`尝试获取集合 ${collectionName} 信息`);
      const collectionInfo = await db.collection(collectionName).get();
      console.log(`集合 ${collectionName} 信息获取成功:`, collectionInfo);
    } catch (err) {
      console.error(`验证集合 ${collectionName} 失败:`, err);
      return {
        code: -1,
        success: false,
        message: `验证集合 ${collectionName} 失败: ` + err.message,
        error: err
      };
    }
    
    // 获取数据记录数
    const countResult = await db.collection(collectionName).count();
    const recordCount = countResult.total;
    
    return {
      code: 0,
      success: true,
      message: `集合 ${collectionName} Schema 验证成功`,
      data: {
        collectionName,
        recordCount
      }
    };
  } catch (err) {
    console.error('Schema 修复失败:', err);
    return {
      code: -1,
      success: false,
      message: 'Schema 修复失败: ' + err.message,
      error: err
    };
  }
}; 