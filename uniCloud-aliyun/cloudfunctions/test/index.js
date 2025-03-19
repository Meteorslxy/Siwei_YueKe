'use strict';

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取当前时间
    const now = new Date().toLocaleString();
    
    // 获取传入的参数
    const { message = '默认测试消息' } = event;
    
    // 返回成功响应
    return {
      code: 0,
      message: '云函数连接成功',
      data: {
        requestTime: now,
        requestMessage: message,
        env: context.ENV || '未知环境',
        appid: context.APPID || '未知APPID',
        unionid: context.UNIONID || '未知UNIONID'
      }
    };
  } catch (error) {
    // 返回错误响应
    return {
      code: -1,
      message: '云函数执行出错',
      error: error.message
    };
  }
}; 