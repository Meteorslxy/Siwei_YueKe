'use strict';

/**
 * 初始化数据库
 * @description 为云数据库创建集合并插入初始数据
 * @param {object} event - 调用参数，可以包含 force 选项来强制重新初始化
 * @returns {object} 初始化结果
 */
exports.main = async (event, context) => {
  console.log('数据库初始化函数被调用，参数:', event);
  
  return {
    code: 0,
    success: true,
    message: '数据库初始化功能已禁用，不再插入模拟数据'
  };
};
