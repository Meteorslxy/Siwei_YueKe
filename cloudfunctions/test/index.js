'use strict';

// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化云环境
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const { action } = event;
  
  // 检查环境连接
  if (action === 'ping') {
    return {
      code: 0,
      message: 'UniCloud云服务连接成功',
      spaceId: context.SPACEINFO.spaceId,
      timestamp: new Date().toISOString()
    }
  }
  
  // 获取系统信息
  if (action === 'system') {
    const userInfo = context.USERINFO;
    
    return {
      code: 0,
      message: '获取系统信息成功',
      userInfo,
      spaceInfo: context.SPACEINFO
    }
  }
  
  return {
    code: -1,
    message: '未知操作'
  }
} 