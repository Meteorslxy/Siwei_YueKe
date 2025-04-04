'use strict';

// 模拟uuid生成
function generateToken() {
  return 'wx_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 计算token过期时间（7天后）
function getTokenExpired() {
  return Date.now() + 7 * 24 * 60 * 60 * 1000;
}

exports.main = async (event, context) => {
  const { openid, platform = 'mp-weixin', userInfo = {} } = event;
  console.log('收到登录请求:', { openid, platform, userInfo });
  
  if (!openid) {
    return {
      code: -1,
      message: '缺少openid参数'
    };
  }
  
  const db = uniCloud.database();
  const dbCmd = db.command;
  
  try {
    // 查询条件：检查指定平台的openid
    const whereObj = {};
    whereObj[`wx_openid.${platform}`] = openid;
    
    // 查找是否已存在该openid的用户
    console.log('查询条件:', whereObj);
    const userRecord = await db.collection('uni-id-users').where(whereObj).limit(1).get();
    
    // 用户存在，直接返回用户信息和token
    if (userRecord.data && userRecord.data.length > 0) {
      const user = userRecord.data[0];
      console.log('找到已存在用户:', user._id);
      
      // 生成token
      const token = generateToken();
      const tokenExpired = getTokenExpired();
      
      // 更新用户最后登录时间
      await db.collection('uni-id-users').doc(user._id).update({
        last_login_date: Date.now(),
        last_login_ip: context.CLIENTIP || '',
        token: [token]
      });
      
      return {
        code: 0,
        uid: user._id,
        userInfo: {
          uid: user._id,
          username: user.username,
          nickname: user.nickname || userInfo.nickname || '微信用户',
          avatar: user.avatar || userInfo.avatar
        },
        token: token,
        tokenExpired: tokenExpired,
        message: '登录成功'
      };
    }
    
    // 用户不存在，创建新用户
    console.log('用户不存在，创建新用户');
    
    // 准备新用户数据
    const nickname = userInfo.nickname || '微信用户';
    const avatar = userInfo.avatar || '';
    
    // 构建用户信息
    const newUser = {
      username: `wx_${openid.substring(0, 8)}`,
      nickname: nickname,
      avatar: avatar,
      gender: userInfo.gender || 0,
      status: 1,
      register_date: Date.now(),
      register_ip: context.CLIENTIP || '',
      last_login_date: Date.now(),
      last_login_ip: context.CLIENTIP || ''
    };
    
    // 设置对应平台的openid
    newUser.wx_openid = {};
    newUser.wx_openid[platform] = openid;
    
    // 添加到数据库
    const addResult = await db.collection('uni-id-users').add(newUser);
    console.log('创建用户结果:', addResult);
    
    if (!addResult.id) {
      return {
        code: -1,
        message: '创建用户失败'
      };
    }
    
    // 生成token
    const token = generateToken();
    const tokenExpired = getTokenExpired();
    
    // 更新token
    await db.collection('uni-id-users').doc(addResult.id).update({
      token: [token]
    });
    
    // 返回用户信息和token
    return {
      code: 0,
      uid: addResult.id,
      userInfo: {
        uid: addResult.id,
        username: newUser.username,
        nickname: newUser.nickname,
        avatar: newUser.avatar
      },
      token: token,
      tokenExpired: tokenExpired,
      message: '注册并登录成功'
    };
  } catch (error) {
    console.error('处理微信登录出错:', error);
    return {
      code: -1,
      message: error.message || '登录失败'
    };
  }
}; 