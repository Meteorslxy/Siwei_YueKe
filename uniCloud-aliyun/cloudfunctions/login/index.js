'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取客户端信息
  const { PLATFORM, APPID, CLIENTIP } = context;
  const { userInfo = {}, openid } = event;
  
  // 阿里云没有getWXContext，需要从客户端传入openid或使用其他登录方式
  if (!openid) {
    return {
      code: -1,
      success: false,
      message: '缺少openid参数'
    };
  }
  
  try {
    // 查询用户是否已存在
    const userResult = await db.collection('users')
      .where({
        openid
      })
      .get();
    
    let userId;
    const serverDate = new Date();
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，更新用户信息
      const existUser = userResult.data[0];
      userId = existUser._id;
      
      // 更新用户信息
      if (Object.keys(userInfo).length > 0) {
        await db.collection('users')
          .doc(userId)
          .update({
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            country: userInfo.country,
            province: userInfo.province,
            city: userInfo.city,
            language: userInfo.language,
            lastLoginTime: serverDate
          });
      } else {
        // 仅更新登录时间
        await db.collection('users')
          .doc(userId)
          .update({
            lastLoginTime: serverDate
          });
      }
    } else {
      // 用户不存在，创建新用户
      const newUser = {
        openid,
        appid: APPID || '',
        unionid: event.unionid || '',
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0,
        country: userInfo.country || '',
        province: userInfo.province || '',
        city: userInfo.city || '',
        language: userInfo.language || 'zh_CN',
        createTime: serverDate,
        lastLoginTime: serverDate,
        platform: PLATFORM
      };
      
      const result = await db.collection('users')
        .add(newUser);
      
      userId = result.id;
    }
    
    return {
      code: 0,
      success: true,
      data: {
        userId
      },
      message: '登录成功'
    };
  } catch (err) {
    console.error('登录失败:', err);
    return {
      code: -1,
      success: false,
      data: null,
      message: err.message || '登录失败'
    };
  }
}; 