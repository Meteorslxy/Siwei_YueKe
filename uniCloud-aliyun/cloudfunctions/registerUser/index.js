'use strict';

const db = uniCloud.database();
const userCollection = db.collection('uni-id-users');

exports.main = async (event, context) => {
  console.log('registerUser 云函数开始执行', event);
  const { openid, userInfo } = event;
  
  if (!openid) {
    return {
      code: 1,
      message: '缺少必要参数: openid'
    };
  }
  
  try {
    // 生成用户名
    const username = 'wx_user_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    
    // 生成token
    const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
    
    // 创建用户
    const userResult = await userCollection.add({
      username: username,
      nickname: userInfo.nickname || '微信用户',
      avatar: userInfo.avatar || '',
      gender: userInfo.gender || 0,
      wx_openid: openid,
      register_date: new Date(),
      register_ip: context.CLIENTIP,
      token: token,
      token_expired: tokenExpired
    });
    
    // 查询创建的用户信息
    const user = await userCollection.doc(userResult.id).get();
    
    return {
      code: 0,
      message: '注册成功',
      uid: userResult.id,
      token: token,
      tokenExpired: tokenExpired,
      userInfo: user.data[0] || {
        _id: userResult.id,
        username: username,
        nickname: userInfo.nickname || '微信用户',
        avatar: userInfo.avatar || '',
        gender: userInfo.gender || 0
      }
    };
  } catch (error) {
    console.error('registerUser 执行出错', error);
    return {
      code: 1,
      message: error.message || '注册失败'
    };
  }
}; 