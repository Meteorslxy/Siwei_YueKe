'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取客户端信息
  const { PLATFORM, APPID, CLIENTIP } = context;
  const { userInfo = {}, openid, phoneNumber, code, loginType } = event;
  
  console.log('登录函数调用，参数:', event);
  console.log('登录上下文:', { PLATFORM, APPID, CLIENTIP });
  console.log('登录类型:', loginType, '平台:', PLATFORM);
  
  // 检查基本参数
  if (!loginType) {
    console.error('缺少loginType参数');
    return {
      code: 1,
      success: false,
      message: '登录类型不能为空'
    };
  }
  
  try {
    let userId;
    const serverDate = new Date();
    
    // 根据登录类型处理
    if (loginType === 'phone') {
      // 手机号登录
      if (!phoneNumber) {
        return {
          code: -1,
          success: false,
          message: '缺少手机号参数'
        };
      }
      
      // 查询用户是否存在
      const userResult = await db.collection('users')
        .where({
          phoneNumber
        })
        .get();
      
      if (userResult.data && userResult.data.length > 0) {
        // 用户已存在，更新用户信息
        const existUser = userResult.data[0];
        userId = existUser._id;
        
        // 更新用户登录时间
        await db.collection('users')
          .doc(userId)
          .update({
            lastLoginTime: serverDate,
            // 如果提供了额外的用户信息，也进行更新
            ...(Object.keys(userInfo).length > 0 ? {
              nickName: userInfo.nickName || existUser.nickName,
              avatarUrl: userInfo.avatarUrl || existUser.avatarUrl,
              gender: userInfo.gender || existUser.gender || 0
            } : {})
          });
      } else {
        // 用户不存在，创建新用户
        const newUser = {
          phoneNumber,
          appid: APPID || '',
          nickName: userInfo.nickName || ('用户' + phoneNumber.substr(phoneNumber.length - 4)),
          avatarUrl: userInfo.avatarUrl || '',
          gender: userInfo.gender || 0,
          country: userInfo.country || '',
          province: userInfo.province || '',
          city: userInfo.city || '',
          language: userInfo.language || 'zh_CN',
          createTime: serverDate,
          lastLoginTime: serverDate,
          platform: PLATFORM,
          role: 'user',
          status: 0
        };
        
        const result = await db.collection('users')
          .add(newUser);
        
        userId = result.id;
        
        // 更新userId字段，确保与_id一致
        await db.collection('users')
          .doc(userId)
          .update({
            userId: userId
          });
      }
      
      // 获取用户完整信息
      const userData = await db.collection('users')
        .doc(userId)
        .get();
      
      // 过滤敏感信息，只返回前端需要的数据
      const filteredData = filterUserData(userData.data);
      
      // 添加userId字段
      filteredData.userId = userId;
      
      return {
        code: 0,
        success: true,
        data: filteredData,
        message: '手机号登录成功'
      };
    } else if (loginType === 'wechat') {
      // 微信登录 - 需要前端传code或openid
      console.log('处理微信登录，参数:', { openid, code, userInfo });
      
      if (!code && !openid) {
        console.error('微信登录缺少必要参数');
        return {
          code: 1,
          success: false,
          message: '微信登录需要code或openid参数'
        };
      }
      
      let wxOpenid = openid;
      
      // 如果没有openid但有code，通过云函数获取openid
      if (!wxOpenid && code) {
        try {
          // 调用获取openid的云函数
          const openidResult = await uniCloud.callFunction({
            name: 'getWxOpenid',
            data: { code }
          });
          
          console.log('获取openid结果:', openidResult);
          
          if (openidResult.result && openidResult.result.code === 0 && openidResult.result.data && openidResult.result.data.openid) {
            wxOpenid = openidResult.result.data.openid;
            console.log('成功获取到openid:', wxOpenid);
          } else {
            // 微信开发工具调试模式下，可能无法获取真实openid
            // 为了便于开发测试，生成一个模拟openid
            if (PLATFORM === 'mp-weixin') {
              console.log('微信开发工具中使用模拟openid');
              wxOpenid = 'wx_' + Math.random().toString(36).substr(2, 10);
              console.log('生成的模拟openid:', wxOpenid);
            } else {
              console.error('获取openid失败:', openidResult);
              return {
                code: -1,
                success: false,
                message: '获取openid失败: ' + (openidResult.result ? openidResult.result.msg : '未知错误')
              };
            }
          }
        } catch (err) {
          // 调用云函数失败时，在开发环境下可以使用模拟openid
          console.error('获取openid云函数调用失败:', err);
          
          if (PLATFORM === 'mp-weixin') {
            console.log('微信开发工具中使用模拟openid');
            wxOpenid = 'wx_' + Math.random().toString(36).substr(2, 10);
            console.log('生成的模拟openid:', wxOpenid);
          } else {
            return {
              code: -1,
              success: false,
              message: '获取openid失败: ' + (err.message || err)
            };
          }
        }
      }
      
      // 查询用户是否已存在
      console.log('使用openid查询用户:', wxOpenid);
      const userResult = await db.collection('users')
        .where({
          openid: wxOpenid
        })
        .get();
      
      console.log('查询用户结果:', userResult);
      
      if (userResult.data && userResult.data.length > 0) {
        // 用户已存在，更新用户信息
        const existUser = userResult.data[0];
        userId = existUser._id;
        console.log('用户已存在，ID:', userId);
        
        // 更新用户信息
        if (Object.keys(userInfo).length > 0) {
          // 处理用户信息，确保字段的完整性
          const processedUserInfo = processUserInfo(userInfo, wxOpenid);
          
          await db.collection('users')
            .doc(userId)
            .update({
              nickName: processedUserInfo.nickName,
              avatarUrl: processedUserInfo.avatarUrl,
              gender: processedUserInfo.gender,
              country: processedUserInfo.country,
              province: processedUserInfo.province,
              city: processedUserInfo.city,
              language: processedUserInfo.language,
              lastLoginTime: serverDate
            });
            
          console.log('用户信息已更新');
        } else {
          // 仅更新登录时间
          await db.collection('users')
            .doc(userId)
            .update({
              lastLoginTime: serverDate
            });
            
          console.log('用户登录时间已更新');
        }
      } else {
        // 用户不存在，创建新用户
        console.log('用户不存在，创建新用户');
        const processedUserInfo = processUserInfo(userInfo || {}, wxOpenid);
        
        // 添加额外信息
        const newUser = {
          ...processedUserInfo,
          appid: APPID || '',
          unionid: event.unionid || '',
          createTime: serverDate,
          lastLoginTime: serverDate,
          platform: PLATFORM,
          role: 'user', // 默认角色为普通用户
          status: 0 // 默认状态为正常
        };
        
        console.log('新建用户数据:', newUser);
        
        try {
          const result = await db.collection('users').add(newUser);
          userId = result.id;
          console.log('用户创建成功，ID:', userId);
          
          // 更新userId字段，确保与_id一致
          await db.collection('users')
            .doc(userId)
            .update({
              userId: userId
            });
            
          console.log('用户ID已更新');
        } catch (err) {
          console.error('创建用户失败:', err);
          return {
            code: -1,
            success: false,
            message: '创建用户失败: ' + err.message
          };
        }
      }
      
      // 获取用户完整信息
      console.log('获取用户完整信息, ID:', userId);
      const userData = await db.collection('users')
        .doc(userId)
        .get();
      
      // 过滤敏感信息，只返回前端需要的数据
      const filteredData = filterUserData(userData.data);
      
      // 添加userId字段
      filteredData.userId = userId;
      
      console.log('登录成功，返回用户数据:', filteredData);
      
      return {
        code: 0,
        success: true,
        data: filteredData,
        message: '微信登录成功'
      };
    } else {
      // 未知登录类型
      console.error('未知登录类型:', loginType);
      return {
        code: 1,
        success: false,
        message: '未知登录类型'
      };
    }
  } catch (err) {
    // 详细记录错误信息
    console.error('登录失败，详细错误:', err);
    console.error('错误堆栈:', err.stack);
    
    // 识别常见错误类型并给出友好提示
    let errorMessage = '登录失败';
    
    if (err.message && err.message.includes('openid')) {
      errorMessage = 'OpenID 处理错误，请重试';
    } else if (err.message && (err.message.includes('数据库') || err.message.includes('db'))) {
      errorMessage = '数据库操作失败，请重试';
    } else if (err.message && err.message.includes('超时')) {
      errorMessage = '服务请求超时，请检查网络';
    }
    
    return {
      code: -1,
      success: false,
      data: null,
      message: errorMessage + ': ' + (err.message || '未知错误')
    };
  }
};

// 处理用户信息
const processUserInfo = (userInfo, openid) => {
  console.log('处理用户信息:', { userInfo, openid });
  
  // 如果没有用户信息或用户信息是空对象，创建一个基本的用户对象
  if (!userInfo || Object.keys(userInfo).length === 0) {
    console.log('用户信息为空，使用默认值');
    return {
      openid,
      nickName: '微信用户',
      avatarUrl: '',
      gender: 0,
      country: '',
      province: '',
      city: '',
      language: 'zh_CN',
      lastLoginTime: Date.now(),
      role: 'user',
      status: 0
    };
  }
  
  // 如果有用户信息，确保必要的字段
  return {
    openid,
    nickName: userInfo.nickName || userInfo.nickname || '微信用户',
    avatarUrl: userInfo.avatarUrl || userInfo.avatar || '',
    gender: userInfo.gender || 0,
    country: userInfo.country || '',
    province: userInfo.province || '',
    city: userInfo.city || '',
    language: userInfo.language || 'zh_CN',
    lastLoginTime: Date.now(),
    role: userInfo.role || 'user',
    status: userInfo.status === undefined ? 0 : userInfo.status
  };
};

// 过滤用户数据，只返回前端需要的信息
const filterUserData = (userData) => {
  // 如果用户数据为空，返回一个基本的空对象
  if (!userData) {
    console.error('用户数据为空');
    return {
      userId: '',
      nickName: '未知用户',
      avatarUrl: '',
      role: 'user'
    };
  }
  
  console.log('过滤前的用户数据:', userData);
  
  // 确保返回必要的用户信息字段
  const filteredData = {
    userId: userData._id || '',
    openid: userData.openid || '',
    nickName: userData.nickName || userData.nickname || '微信用户',
    avatarUrl: userData.avatarUrl || userData.avatar || '',
    gender: userData.gender || 0,
    country: userData.country || '',
    province: userData.province || '',
    city: userData.city || '',
    language: userData.language || 'zh_CN',
    lastLoginTime: userData.lastLoginTime || Date.now(),
    role: userData.role || 'user',
    phoneNumber: userData.phoneNumber || ''
  };
  
  console.log('过滤后的用户数据:', filteredData);
  
  return filteredData;
}; 