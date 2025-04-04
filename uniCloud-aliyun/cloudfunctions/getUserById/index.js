'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { userId } = event;
  
  // 记录请求参数
  console.log('getUserById接收到的参数:', event);
  
  if (!userId) {
    return {
      code: -1,
      message: '用户ID不能为空'
    };
  }
  
  try {
    // 直接查询数据库
    const userResult = await db.collection('uni-id-users').doc(userId).get();
    
    // 记录查询结果
    console.log('数据库查询结果:', userResult);
    
    if (!userResult.data || userResult.data.length === 0) {
      // 未找到用户信息
      return {
        code: -2,
        message: '未找到用户信息'
      };
    }
    
    // 获取用户信息
    const userInfo = userResult.data[0] || userResult.data;
    
    // 移除敏感字段
    delete userInfo.password;
    delete userInfo.token;
    delete userInfo.token_expired;
    
    console.log('获取到用户信息:', userInfo);
    
    return {
      code: 0,
      message: '获取用户信息成功',
      userInfo: userInfo
    };
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return {
      code: -3,
      message: error.message || '获取用户信息失败',
      error: JSON.stringify(error)
    };
  }
}; 