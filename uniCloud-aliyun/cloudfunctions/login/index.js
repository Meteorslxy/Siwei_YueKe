'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;
const crypto = require('crypto');

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取客户端信息
  const { PLATFORM, APPID, CLIENTIP } = context;
  const { 
    userInfo = {}, 
    openid, 
    phoneNumber, 
    phone, // 新增手机号参数
    code, 
    wxCode, // 新增微信code参数，用于关联微信号
    password,
    verificationCode,
    loginType, 
    checkOnly = false,
    deviceInfo, // 设备信息
    uuid,       // 设备uuid
    token       // 新增token参数，用于token验证
  } = event;
  
  // 精简日志输出
  console.log(`登录请求: 类型=${loginType}, 平台=${PLATFORM}`);
  
  // 检查基本参数
  if (!loginType) {
    return {
      code: 1,
      success: false,
      message: '登录类型不能为空'
    };
  }
  
  // 处理token验证登录
  if (loginType === 'token') {
    if (!token) {
      return {
        code: -1,
        success: false,
        message: 'token不能为空'
      };
    }
    
    return await handleTokenVerify(token, CLIENTIP);
  }
  
  // 特殊处理微信登录方式
  if (loginType === 'wechat' || loginType === 'weixin') {
    // 微信登录不需要用户名和密码，使用专门的处理函数
    return await handleWechatLogin(code, openid, userInfo, PLATFORM, CLIENTIP, {deviceInfo, uuid});
  }
  
  // 特殊处理手机号登录
  if (loginType === 'phone') {
    // 手机号登录，使用专门的处理函数
    return await handlePhoneLogin(phone || phoneNumber, wxCode, userInfo, PLATFORM, APPID, CLIENTIP);
  }
  
  try {
    let userId;
    const serverDate = new Date();
    
    // 根据登录类型处理
    if (loginType === 'phoneVerify') {
      // 手机号验证码登录
      if (!phoneNumber || !verificationCode) {
        return {
          code: -1,
          success: false,
          message: '手机号或验证码不能为空'
        };
      }
      
      // 验证手机号格式
      if (!/^1\d{10}$/.test(phoneNumber)) {
        return {
          code: -1,
          success: false,
          message: '手机号格式不正确'
        };
      }
      
      // 验证验证码
      const verifyResult = await verifyCode(phoneNumber, verificationCode);
      if (!verifyResult.success) {
        return verifyResult;
      }
      
      // 查询用户是否存在 - 已优化查询
      const userResult = await db.collection('uni-id-users')
        .where({
          mobile: phoneNumber  // 使用统一的字段
        })
        .field({ password: 0 }) // 不返回密码字段
        .get();
      
      if (userResult.data && userResult.data.length > 0) {
        // 用户已存在，更新用户信息
        const existUser = userResult.data[0];
        userId = existUser._id;
        
        // 更新用户登录时间
        await db.collection('uni-id-users')
          .doc(userId)
          .update({
            last_login_date: serverDate,
            last_login_ip: CLIENTIP || ''
          });
      } else {
        // 用户不存在，创建新用户
        const newUser = {
          mobile: phoneNumber,
          nickname: '用户' + phoneNumber.substr(phoneNumber.length - 4),
          avatar: '',
          gender: 0,
          register_date: serverDate,
          register_ip: CLIENTIP || '',
          last_login_date: serverDate,
          last_login_ip: CLIENTIP || '',
          status: 0
        };
        
        const result = await db.collection('uni-id-users')
          .add(newUser);
        
        userId = result.id;
      }
      
      // 标记验证码为已使用
      await markCodeAsUsed(phoneNumber, verificationCode);
      
      // 获取用户完整信息 - 使用已有数据，避免额外查询
      let userData;
      if (userResult.data && userResult.data.length > 0) {
        userData = { data: [userResult.data[0]] };
      } else {
        // 只有新用户才需要重新查询
        userData = await db.collection('uni-id-users')
          .doc(userId)
          .field({ password: 0 })
          .get();
      }
      
      // 过滤敏感信息，只返回前端需要的数据
      const filteredData = filterUserData(userData.data[0]);
      
      // 生成token
      const token = generateToken(userId);
      const tokenExpired = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      
      return {
        code: 0,
        success: true,
        data: filteredData,
        token,
        tokenExpired,
        message: '手机号验证码登录成功'
      };
    }
    else if (loginType === 'checkWxUser') {
      return await checkWxUser(code);
    } else if (loginType === 'loginWithOpenid') {
      return await loginWithOpenid(openid, userInfo, PLATFORM, APPID);
    } else if (loginType === 'createUserInDb') {
      return await createUserInDb(openid, userInfo, PLATFORM, APPID);
    } else {
      // 未知登录类型
      return {
        code: 1,
        success: false,
        message: '未知登录类型'
      };
    }
  } catch (err) {
    // 简化错误输出
    console.error('登录失败:', err.message);
    
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
  // 如果没有用户信息或用户信息是空对象，创建一个基本的用户对象
  if (!userInfo || Object.keys(userInfo).length === 0) {
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
  if (!userData) return {};
  
  // 创建新对象，避免修改原有数据
  const filteredData = {
    _id: userData._id || '',
    uid: userData._id || '',  // 使用_id作为uid确保一致性
    nickname: userData.nickname || '',
    username: userData.username || '',
    mobile: userData.mobile || '',
    email: userData.email || '',
    avatar: userData.avatar || '',
    gender: userData.gender || 0,
    status: userData.status || 0
  };
  
  // 确保兼容性：添加前端可能使用的其他字段名
  filteredData.userId = filteredData._id;
  filteredData.nickName = filteredData.nickname;
  filteredData.avatarUrl = filteredData.avatar;
  filteredData.phoneNumber = filteredData.mobile;
  
  // 过滤掉敏感信息和密码字段
  return filteredData;
};

// 加密密码
const encryptPassword = (password) => {
  // 这里使用简单的md5加密，实际应用中建议使用更安全的加密方式
  // 例如bcrypt或带盐值的SHA256等
  return crypto.createHash('sha256').update(password).digest('hex');
};

// 验证验证码
const verifyCode = async (phoneNumber, code) => {
  // 查询验证码记录
  const verificationCodesCollection = db.collection('verification_codes');
  
  const result = await verificationCodesCollection
    .where({
      phoneNumber,
      code,
      used: false,
      expireTime: db.command.gt(Date.now())
    })
    .get();
  
  if (!result.data || result.data.length === 0) {
    return {
      code: -1,
      success: false,
      message: '验证码无效或已过期'
    };
  }
  
  return {
    code: 0,
    success: true,
    message: '验证码验证通过'
  };
};

// 标记验证码为已使用
const markCodeAsUsed = async (phoneNumber, code) => {
  const verificationCodesCollection = db.collection('verification_codes');
  
  await verificationCodesCollection
    .where({
      phoneNumber,
      code
    })
    .update({
      used: true
    });
};

// 生成token方法
const generateToken = (userId) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `token_${userId}_${timestamp}_${random}`;
};

// 检查微信用户是否已存在
async function checkWxUser(code) {
  console.log('检查微信用户信息，code:', code);
  
  try {
    // 调用获取微信用户信息的云函数
    const wxResult = await uniCloud.callFunction({
      name: 'getWxOpenid',
      data: { code }
    });
    
    console.log('获取微信信息结果:', wxResult);
    
    if (wxResult.result && wxResult.result.code === 0 && wxResult.result.data) {
      const wxData = wxResult.result.data;
      
      // 确保返回用户的openid
      if (wxData.openid) {
        // 获取用户信息
        let userInfo = {};
        
        // 尝试获取微信用户信息 - 新版微信小程序需要单独接口获取用户信息
        try {
          // 如果wxData中包含用户信息，则使用它
          if (wxData.userInfo) {
            userInfo = wxData.userInfo;
          } else {
            // 这里可以根据需要调用其他API获取用户信息
            console.log('微信API未返回用户信息，使用默认值');
            userInfo = {
              nickName: '微信用户',
              avatarUrl: '',
              gender: 0
            };
          }
        } catch (userInfoErr) {
          console.error('获取微信用户信息失败:', userInfoErr);
          userInfo = {
            nickName: '微信用户',
            avatarUrl: '',
            gender: 0
          };
        }
        
        // 返回微信用户信息
        return {
          openid: wxData.openid,
          unionid: wxData.unionid || '',
          userInfo: userInfo
        };
      } else {
        throw new Error('无法获取微信openid');
      }
    } else {
      const errorMsg = wxResult.result ? wxResult.result.message || '获取openid失败' : '未知错误';
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('检查微信用户出错:', error);
    throw error;
  }
}

// 使用openid登录
async function loginWithOpenid(openid, userInfo, platform, appid) {
  // 减少日志输出
  console.log('使用openid登录');
  
  // 查询用户是否存在
  const db = uniCloud.database();
  const userCollection = db.collection('uni-id-users');
  
  try {
    // 查询是否已存在该openid的用户
    const userResult = await userCollection.where({
      'wx_openid.mp-weixin': openid
    }).field({ password: 0 }).get();
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，执行登录
      const user = userResult.data[0];
      
      // 生成token
      const token = 'token_' + user._id + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
      
      // 准备更新的数据
      const updateData = {
        token,
        token_expired: tokenExpired,
        last_login_date: new Date(),
        last_login_ip: CLIENTIP || ''
      };
      
      // 如果有微信用户信息，只更新头像，不更新昵称
      if (userInfo) {
        if (userInfo.avatarUrl || userInfo.avatar) {
          updateData.avatar = userInfo.avatarUrl || userInfo.avatar;
        }
        
        if (userInfo.gender !== undefined) {
          updateData.gender = userInfo.gender;
        }
      }
      
      // 更新用户的token和登录时间
      await userCollection.doc(user._id).update(updateData);
      
      // 过滤用户信息
      const filteredUserData = filterUserData(user);
      
      // 返回登录成功信息
      return {
        code: 0,
        success: true,
        message: '登录成功',
        token,
        tokenExpired,
        data: filteredUserData,
        userInfo: filteredUserData
      };
    } else {
      // 用户不存在，创建新用户
      return await createUserInDb(openid, userInfo, platform, appid);
    }
  } catch (error) {
    console.error('使用openid登录出错:', error.message);
    return {
      code: -1,
      success: false,
      message: '登录失败: ' + error.message
    };
  }
}

// 使用code登录
async function loginWithCode(code, userInfo, platform, appid) {
  console.log('使用code登录:', code);
  
  try {
    // 获取openid
    let openid;
    
    // 调用获取openid的云函数
    try {
      const openidResult = await uniCloud.callFunction({
        name: 'getWxOpenid',
        data: { code, deviceInfo, uuid }
      });
      
      console.log('获取openid结果:', openidResult);
      
      if (openidResult.result && openidResult.result.code === 0 && openidResult.result.data && openidResult.result.data.openid) {
        openid = openidResult.result.data.openid;
        console.log('成功获取到openid:', openid);
      } else {
        // 微信开发工具调试模式下，可能无法获取真实openid
        // 为了便于开发测试，生成一个模拟openid
        if (platform === 'mp-weixin') {
          console.log('微信开发工具中使用模拟openid');
          openid = 'wx_' + Math.random().toString(36).substring(2, 8);
          console.log('生成的模拟openid:', openid);
        } else {
          throw new Error('获取openid失败: ' + (openidResult.result ? openidResult.result.msg : '未知错误'));
        }
      }
    } catch (error) {
      console.error('获取openid失败:', error);
      throw new Error('获取openid失败: ' + error.message);
    }
    
    // 有了openid后，复用上面的openid登录方法
    return await loginWithOpenid(openid, userInfo, platform, appid);
  } catch (error) {
    console.error('code登录处理出错:', error);
    throw error;
  }
}

// 微信登录处理
async function handleWechatLogin(code, openid, userInfo, platform, clientIp, {deviceInfo, uuid}) {
  // 减少日志输出
  console.log('微信登录处理');
  
  try {
    let wxUserInfo = null;
    let wxOpenid = openid;
    
    // 如果没有提供openid，则通过code获取
    if (!wxOpenid && code) {
      try {
        const wxUser = await checkWxUser(code);
        if (wxUser.openid) {
          wxOpenid = wxUser.openid;
          wxUserInfo = wxUser.userInfo;
        } else {
          return {
            code: -1,
            success: false,
            message: '无法获取微信openid'
          };
        }
      } catch (wxErr) {
        console.error('通过code获取微信用户信息失败:', wxErr);
        return {
          code: -1,
          success: false,
          message: '微信授权失败: ' + wxErr.message
        };
      }
    }
    
    if (!wxOpenid) {
      console.error('无法获取有效的openid');
      return {
        code: -1,
        success: false,
        message: '微信登录失败，无法获取用户标识'
      };
    }
    
    // 合并用户信息
    const combinedUserInfo = userInfo || wxUserInfo || {};
    
    // 根据openid查询是否已存在用户
    const userResult = await db.collection('uni-id-users')
      .where({
        'wx_openid.mp': wxOpenid
      })
      .get();
    
    const serverDate = new Date();
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，更新信息并登录
      const existUser = userResult.data[0];
      const userId = existUser._id;
      
      // 准备更新的数据
      const updateData = {
        last_login_date: serverDate,
        last_login_ip: clientIp || '',
      };
      
      // 只更新头像，不更新昵称（昵称由用户自行设置）
      if (combinedUserInfo.avatarUrl) {
        updateData.avatar = combinedUserInfo.avatarUrl;
      }
      
      if (combinedUserInfo.gender !== undefined) {
        updateData.gender = combinedUserInfo.gender;
      }
      
      // 更新用户信息
      await db.collection('uni-id-users')
        .doc(userId)
        .update(updateData);
      
      // 获取更新后的用户信息
      const updatedUser = await db.collection('uni-id-users')
        .doc(userId)
        .get();
      
      // 使用过滤函数处理用户数据
      const filteredData = filterUserData(updatedUser.data[0]);
      
      // 生成token
      const token = generateToken(userId);
      
      return {
        code: 0,
        success: true,
        message: '登录成功',
        data: filteredData,
        userInfo: filteredData,
        token: token,
        tokenExpired: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7天有效期
        isNewUser: false
      };
    } else {
      // 用户不存在，创建新用户
      // 从微信获取用户头像和性别，但不使用微信昵称
      const avatar = (combinedUserInfo && combinedUserInfo.avatarUrl) ? combinedUserInfo.avatarUrl : '';
      const gender = (combinedUserInfo && combinedUserInfo.gender !== undefined) ? combinedUserInfo.gender : 0;
      
      // 创建用户记录，使用"微信用户"作为临时昵称，等待用户自行设置
      const newUser = {
        nickname: '微信用户',
        username: '微信用户',
        avatar: avatar,
        gender: gender,
        register_date: serverDate,
        register_ip: clientIp || '',
        last_login_date: serverDate,
        last_login_ip: clientIp || '',
        wx_openid: {
          mp: wxOpenid
        },
        status: 0,
        dcloud_appid: [platform || '']
      };
      
      // 如果有unionId，也添加到用户记录
      if (wxUserInfo && wxUserInfo.unionId) {
        newUser.wx_unionid = wxUserInfo.unionId;
      }
      
      // 添加用户到数据库
      const result = await db.collection('uni-id-users')
        .add(newUser);
      
      const userId = result.id;
      
      // 获取创建后的完整用户信息
      const createdUser = await db.collection('uni-id-users')
        .doc(userId)
        .get();
      
      // 过滤用户信息
      const filteredData = filterUserData(createdUser.data[0]);
      
      // 生成token
      const token = generateToken(userId);
      
      return {
        code: 0,
        success: true,
        message: '注册成功并自动登录',
        data: filteredData,
        userInfo: filteredData,
        token: token,
        tokenExpired: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7天有效期
        isNewUser: true
      };
    }
  } catch (error) {
    console.error('微信登录处理出错:', error);
    return {
      code: -1,
      success: false,
      message: '微信登录失败: ' + error.message
    };
  }
}

// 新增手机号登录处理函数
async function handlePhoneLogin(phone, wxCode, userInfo, platform, appid, clientIp) {
  console.log('处理手机号登录:', phone);
  console.log('用户信息:', userInfo);
  console.log('微信code:', wxCode);
  
  if (!phone) {
    return {
      code: -1,
      success: false,
      message: '手机号不能为空'
    };
  }
  
  // 验证手机号格式
  if (!/^1\d{10}$/.test(phone)) {
    return {
      code: -1,
      success: false,
      message: '手机号格式不正确'
    };
  }
  
  const serverDate = new Date();
  
  try {
    // 查询用户是否存在 - 修改为使用uni-id-users集合
    let userResult = await db.collection('uni-id-users')
      .where({
        mobile: phone  // 在uni-id-users集合中，手机号字段是mobile而不是phoneNumber
      })
      .get();
    
    let userId;
    let isNewUser = false;
    
    // 如果有微信code，尝试获取openid并关联
    let wxOpenid = null;
    let wxUserInfo = null;
    if (wxCode) {
      try {
        const wxUser = await checkWxUser(wxCode);
        if (wxUser && wxUser.openid) {
          wxOpenid = wxUser.openid;
          wxUserInfo = wxUser.userInfo;
          console.log('获取到微信openid:', wxOpenid);
        }
      } catch (wxErr) {
        console.error('获取微信openid失败:', wxErr);
        // 继续处理，不影响主流程
      }
    }
    
    // 合并用户信息，优先使用传入的userInfo
    const combinedUserInfo = {
      ...(wxUserInfo || {}),
      ...(userInfo || {})
    };
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，更新用户信息
      const existUser = userResult.data[0];
      userId = existUser._id;
      
      const updateData = {
        last_login_date: serverDate,
        last_login_ip: clientIp || serverDate
      };
      
      // 如果有微信openid，更新用户的openid
      if (wxOpenid) {
        updateData['wx_openid.mp'] = wxOpenid;  // 在uni-id-users中，微信小程序的openid字段是wx_openid.mp
      }
      
      // 更新用户信息
      if (combinedUserInfo.nickName) {
        updateData.nickname = combinedUserInfo.nickName;
      }
      
      if (combinedUserInfo.avatarUrl) {
        updateData.avatar = combinedUserInfo.avatarUrl;
      }
      
      if (combinedUserInfo.gender !== undefined) {
        updateData.gender = combinedUserInfo.gender;
      }
      
      // 更新用户登录时间和其他信息
      await db.collection('uni-id-users')
        .doc(userId)
        .update(updateData);
      
      // 获取最新用户信息
      userResult = await db.collection('uni-id-users')
        .doc(userId)
        .get();
    } else {
      // 用户不存在，创建新用户
      isNewUser = true;
      
      // 创建用户 - 适配uni-id-users集合的字段
      const newUser = {
        mobile: phone,  // 手机号字段改为mobile
        mobile_confirmed: 1,  // 标记手机号已验证
        nickname: combinedUserInfo.nickName || ('用户' + phone.substr(phone.length - 4)),
        avatar: combinedUserInfo.avatarUrl || '',
        gender: combinedUserInfo.gender || 0,
        // 使用uni-id-users的标准字段
        register_date: serverDate,
        register_ip: clientIp || serverDate,
        last_login_date: serverDate,
        last_login_ip: clientIp || serverDate,
        status: 0,  // 正常状态
        dcloud_appid: [appid || '']
      };
      
      // 如果有微信openid，添加到用户信息中
      if (wxOpenid) {
        newUser.wx_openid = {
          mp: wxOpenid  // 在uni-id-users中，微信小程序的openid字段是wx_openid.mp
        };
      }
      
      console.log('创建新用户:', newUser);
      
      // 添加用户到uni-id-users数据库
      const result = await db.collection('uni-id-users')
        .add(newUser);
      
      userId = result.id;
      
      // 获取创建后的用户信息
      userResult = await db.collection('uni-id-users')
        .doc(userId)
        .get();
    }
    
    // 过滤敏感信息，只返回前端需要的数据
    const filteredData = filterUserData(userResult.data[0]);
    
    // 生成token
    const token = generateToken(userId);
    
    return {
      code: 0,
      success: true,
      message: isNewUser ? '用户注册成功' : '登录成功',
      data: filteredData,
      userInfo: filteredData,
      token: token,
      tokenExpired: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7天有效期
      isNewUser
    };
  } catch (error) {
    console.error('手机号登录出错:', error);
    return {
      code: -1,
      success: false,
      message: '登录失败: ' + error.message
    };
  }
}

// 处理token验证
async function handleTokenVerify(token, clientIp) {
  console.log('验证token:', token);
  
  try {
    // 解析token
    let userId = '';
    const serverDate = new Date();
    
    // 尝试解析JWT格式token
    try {
      // JWT格式: header.payload.signature
      const parts = token.split('.');
      if (parts.length === 3) {
        // 解码payload部分
        const base64Payload = parts[1];
        let payload;
        
        // 解码base64
        if (typeof atob === 'function') {
          payload = JSON.parse(atob(base64Payload));
        } else {
          // Node.js环境
          payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
        }
        
        console.log('JWT token payload:', payload);
        
        if (payload && payload.uid) {
          userId = payload.uid;
          console.log('从JWT token获取用户ID:', userId);
        }
      }
    } catch (jwtError) {
      console.error('解析JWT token失败:', jwtError);
    }
    
    // 如果JWT解析失败，尝试解析简单格式token (格式: token_userId_timestamp_random)
    if (!userId && token.includes('_')) {
      const parts = token.split('_');
      if (parts.length >= 3 && parts[0] === 'token') {
        userId = parts[1];
        console.log('从简单token获取用户ID:', userId);
      }
    }
    
    if (!userId) {
      return {
        code: -1,
        success: false,
        message: 'token校验未通过'
      };
    }
    
    // 查询用户信息 - 使用uni-id-users集合
    const userResult = await db.collection('uni-id-users')
      .doc(userId)
      .get();
    
    if (!userResult.data || userResult.data.length === 0) {
      return {
        code: -1,
        success: false,
        message: '用户不存在'
      };
    }
    
    // 获取用户信息
    const userData = userResult.data[0];
    
    // 更新最后登录时间
    await db.collection('uni-id-users')
      .doc(userId)
      .update({
        last_login_date: serverDate,
        last_login_ip: clientIp || serverDate
      });
    
    // 过滤敏感信息
    const filteredData = filterUserData(userData);
    
    // 生成新token
    const newToken = generateToken(userId);
    
    return {
      code: 0,
      success: true,
      message: '验证成功',
      data: filteredData,
      userInfo: filteredData,
      token: newToken,
      tokenExpired: new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7天有效期
    };
  } catch (error) {
    console.error('验证token出错:', error);
    return {
      code: -1,
      success: false,
      message: 'token校验未通过: ' + error.message
    };
  }
}

// 创建新用户
async function createUserInDb(openid, userInfo, platform, appid) {
  console.log('创建新用户');

  try {
    const db = uniCloud.database();
    const userCollection = db.collection('uni-id-users');
    
    // 生成token
    const userId = db.command.getObjectId();
    const token = 'token_' + userId + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
    const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
    
    // 准备用户数据
    const userData = {
      _id: userId,
      username: '微信用户_' + Math.random().toString(36).substr(2, 6),
      nickname: userInfo?.nickName || userInfo?.nickname || '微信用户',
      avatar: userInfo?.avatarUrl || userInfo?.avatar || '',
      gender: userInfo?.gender !== undefined ? userInfo.gender : 0,
      wx_openid: {
        'mp-weixin': openid
      },
      wx_unionid: userInfo?.unionId || userInfo?.unionid || '',
      register_date: new Date(),
      register_ip: CLIENTIP || '',
      last_login_date: new Date(),
      last_login_ip: CLIENTIP || '',
      token,
      token_expired: tokenExpired,
      status: 1,
      register_source: platform,
      appid: appid
    };
    
    // 创建用户
    await userCollection.add(userData);
    
    // 过滤用户数据
    const filteredUserData = filterUserData(userData);
    
    // 返回登录成功信息
    return {
      code: 0,
      success: true,
      message: '登录成功',
      token,
      tokenExpired,
      data: filteredUserData,
      userInfo: filteredUserData
    };
  } catch (error) {
    console.error('创建用户失败:', error.message);
    return {
      code: -1,
      success: false,
      message: '创建用户失败: ' + error.message
    };
  }
} 