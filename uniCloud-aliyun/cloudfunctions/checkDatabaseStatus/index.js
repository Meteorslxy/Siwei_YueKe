'use strict';

/**
 * 检查数据库状态
 * @description 检查数据库是否已初始化，如果数据库为空则返回需要初始化的标志
 */
exports.main = async (event, context) => {
  console.log('检查数据库状态函数被调用，参数:', event);
  
  return {
    code: 0,
    needInit: false,
    message: '不再检查数据库是否需要初始化'
  };
}; 