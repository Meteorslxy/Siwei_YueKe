'use strict';
const db = uniCloud.database();

/**
 * 初始化讲座数据
 * @param {Object} event - 调用参数
 * @param {Boolean} event.force - 是否强制初始化（会清空现有数据）
 * @returns {Object} 初始化结果
 */
exports.main = async (event, context) => {
  console.log('初始化讲座数据函数被调用，参数:', event);
  
  // 讲座数据初始化功能已禁用
  return {
    code: 0,
    success: true,
    message: '讲座数据初始化功能已禁用，不再插入模拟数据'
  };
}; 