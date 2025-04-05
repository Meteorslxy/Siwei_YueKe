'use strict';

const db = uniCloud.database();
const userCollection = db.collection('uni-id-users');

exports.main = async (event, context) => {
  console.log('checkToken 云函数开始执行', event);
  const { token } = event;
  
  if (!token) {
    return {
      code: 1,
      message: '缺少必要参数: token'
    };
  }
  
  try {
    // 查询用户
    const userResult = await userCollection.where({
      token: token
    }).get();
    
    if (!userResult.data || userResult.data.length === 0) {
      return {
        code: 1,
        message: 'token不存在'
      };
    }
    
    const user = userResult.data[0];
    
    // 检查token是否过期
    if (!user.token_expired || Date.now() > user.token_expired) {
      return {
        code: 1,
        message: 'token已过期'
      };
    }
    
    // token有效，返回用户信息
    return {
      code: 0,
      message: 'token有效',
      uid: user._id,
      userInfo: {
        _id: user._id,
        username: user.username || user.nickname || '用户',
        nickname: user.nickname || '用户',
        avatar: user.avatar || '',
        gender: user.gender || 0,
        mobile: user.mobile || ''
      }
    };
  } catch (error) {
    console.error('checkToken 执行出错', error);
    return {
      code: 1,
      message: error.message || '校验失败'
    };
  }
}; 