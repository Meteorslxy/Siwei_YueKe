'use strict';

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取当前时间
    const now = new Date().toLocaleString();
    
    // 获取传入的参数
    const { message = '默认测试消息', testMode } = event;
    
    // 阿里云特有的上下文信息
    const spaceInfo = context.SPACEINFO || {};
    const clientInfo = context.CLIENTINFO || {};
    const clientIP = context.CLIENTIP || '未知IP';
    
    // 基本连接测试
    if (testMode === 'basic') {
      return {
        code: 0,
        message: '基础连接测试成功'
      };
    }
    
    // 错误测试模式
    if (testMode === 'error') {
      throw new Error('这是一个人为触发的测试错误');
    }
    
    // 数据库连接测试
    if (testMode === 'db') {
      const db = uniCloud.database();
      // 尝试访问数据库
      const dbResult = await db.collection('system').limit(1).get();
      return {
        code: 0,
        message: '数据库连接测试成功',
        data: {
          requestTime: now,
          requestMessage: message,
          dbResult: dbResult.data,
          spaceInfo: {
            provider: spaceInfo.provider || '阿里云',
            spaceId: spaceInfo.spaceId || '未知空间ID'
          },
          clientInfo: {
            platform: clientInfo.platform || '未知平台',
            appId: clientInfo.appId || '未知应用ID',
            deviceId: clientInfo.deviceId || '未知设备ID'
          },
          clientIP
        }
      };
    }
    
    // 默认返回详细信息
    return {
      code: 0,
      message: '云函数连接成功',
      data: {
        requestTime: now,
        requestMessage: message,
        spaceInfo: {
          provider: spaceInfo.provider || '阿里云',
          spaceId: spaceInfo.spaceId || '未知空间ID'
        },
        clientInfo: {
          platform: clientInfo.platform || '未知平台',
          appId: clientInfo.appId || '未知应用ID',
          deviceId: clientInfo.deviceId || '未知设备ID'
        },
        clientIP,
        event: event
      }
    };
  } catch (error) {
    // 详细的错误响应
    console.error('云函数执行错误:', error);
    return {
      code: -1,
      message: '云函数执行出错',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
  }
}; 