'use strict';

const db = uniCloud.database();
const userCollection = db.collection('uni-id-users');

exports.main = async (event, context) => {
  console.log('wxLogin 云函数开始执行', event);
  const { code, userInfo } = event;
  
  if (!code) {
    return {
      code: 1,
      message: '缺少必要参数: code'
    };
  }
  
  try {
    // 模拟获取openid (实际项目中应该调用微信API)
    const openid = 'wx_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    
    // 查询用户是否已存在
    const userResult = await userCollection.where({
      wx_openid: openid
    }).get();
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，返回用户信息
      const user = userResult.data[0];
      
      // 生成token (简化版)
      const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
      
      // 更新用户的token
      await userCollection.doc(user._id).update({
        token: token,
        token_expired: tokenExpired
      });
      
      return {
        code: 0,
        message: '登录成功',
        uid: user._id,
        token: token,
        tokenExpired: tokenExpired,
        userInfo: {
          _id: user._id,
          username: user.username || user.nickname || '微信用户',
          nickname: user.nickname || '微信用户',
          avatar: user.avatar || userInfo.avatarUrl || '',
          gender: user.gender || userInfo.gender || 0
        }
      };
    } else {
      // 用户不存在，返回openid，由前端决定下一步操作
      return {
        code: 1,
        message: '用户不存在',
        openid: openid
      };
    }
  } catch (error) {
    console.error('wxLogin 执行出错', error);
    return {
      code: 1,
      message: error.message || '登录失败'
    };
  }
}; 