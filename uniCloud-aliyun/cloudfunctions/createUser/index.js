'use strict';

const db = uniCloud.database();
const userCollection = db.collection('uni-id-users');

exports.main = async (event, context) => {
  console.log('createUser 云函数开始执行', event);
  const { username, password, userInfo } = event;
  
  if (!username || !password) {
    return {
      code: 1,
      message: '缺少必要参数: username/password'
    };
  }
  
  try {
    // 检查用户名是否已存在
    const existUser = await userCollection.where({
      username: username
    }).get();
    
    if (existUser.data && existUser.data.length > 0) {
      return {
        code: 1,
        message: '用户名已存在'
      };
    }
    
    // 生成密码哈希 (实际应该使用更安全的方式)
    const passwordHash = 'hash_' + password;
    
    // 生成token
    const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
    
    // 创建用户
    const userResult = await userCollection.add({
      username: username,
      password: passwordHash,
      nickname: userInfo.nickName || username,
      avatar: userInfo.avatarUrl || '',
      gender: userInfo.gender || 0,
      register_date: new Date(),
      register_ip: context.CLIENTIP,
      token: token,
      token_expired: tokenExpired
    });
    
    // 查询创建的用户信息
    const user = await userCollection.doc(userResult.id).get();
    
    return {
      code: 0,
      message: '创建用户成功',
      uid: userResult.id,
      token: token,
      tokenExpired: tokenExpired,
      userInfo: user.data[0] || {
        _id: userResult.id,
        username: username,
        nickname: userInfo.nickName || username,
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0
      }
    };
  } catch (error) {
    console.error('createUser 执行出错', error);
    return {
      code: 1,
      message: error.message || '创建用户失败'
    };
  }
}; 