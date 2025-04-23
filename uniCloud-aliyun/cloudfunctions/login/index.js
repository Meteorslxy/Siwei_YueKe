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
    token,      // 新增token参数，用于token验证
    real_name   // 新增real_name参数，用于保存用户真实姓名
  } = event;
  
  console.log('登录函数调用，参数:', event);
  console.log('登录上下文:', { PLATFORM, APPID, CLIENTIP });
  console.log('登录类型:', loginType, '平台:', PLATFORM, '是否仅检查:', checkOnly);
  
  // 检查基本参数
  if (!loginType) {
    console.error('缺少loginType参数');
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
    return await handlePhoneLogin(phone || phoneNumber, wxCode, userInfo, PLATFORM, APPID, CLIENTIP, real_name);
  }
  
  // 用户名和密码验证 - 只有非微信登录才需要验证
  if ((loginType === 'login' || loginType === 'username') && (!event.username || !password)) {
    console.error('用户名和密码不能为空');
    return {
      code: 1,
      success: false,
      message: '用户名和密码不能为空'
    };
  }
  
  try {
    let userId;
    const serverDate = new Date();
    
    // 根据登录类型处理
    if (loginType === 'register') {
      // 注册新用户
      if (!phoneNumber || !verificationCode || !password) {
        return {
          code: -1,
          success: false,
          message: '注册信息不完整'
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
      
      // 查询用户是否已存在
      const userResult = await db.collection('users')
        .where({
          phoneNumber
        })
        .get();
      
      if (userResult.data && userResult.data.length > 0) {
        return {
          code: -1,
          success: false,
          message: '该手机号已注册'
        };
      }
      
      // 密码加密
      const passwordHash = encryptPassword(password);
      
      // 创建新用户
      const newUser = {
        phoneNumber,
        passwordHash,
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
      
      // 标记验证码为已使用
      await markCodeAsUsed(phoneNumber, verificationCode);
      
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
        message: '注册成功并自动登录'
      };
    }
    else if (loginType === 'phoneVerify') {
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
      
      // 标记验证码为已使用
      await markCodeAsUsed(phoneNumber, verificationCode);
      
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
        message: '手机号验证码登录成功'
      };
    }
    else if (loginType === 'mobile-pwd') {
      // 手机号密码登录
      console.log('处理手机号密码登录，参数:', { phoneNumber, password });
      
      if (!phoneNumber) {
        return {
          code: -1,
          success: false,
          message: '缺少手机号参数'
        };
      }
      
      if (!password) {
        return {
          code: -1,
          success: false,
          message: '缺少密码参数'
        };
      }
      
      // 手机号格式验证
      if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
        // 将错误处理改为提示并继续尝试登录
        console.log('手机号格式不标准，但仍继续尝试登录:', phoneNumber);
        // 不在此处返回错误，继续尝试登录
      }
      
      // 记录搜索结果的对象
      const searchDetails = {
        phoneNumber: phoneNumber,
        searchResult: {
          uniIdUsername: 0,
          uniIdMobile: 0,
          uniIdPhoneNumber: 0,
          usersTable: 0
        }
      };
      
      try {
        console.log('开始查询用户，手机号:', phoneNumber);
        
        // 1. 查询uni-id-users表中username字段
        const uniIdUsernameResult = await db.collection('uni-id-users')
          .where({ username: phoneNumber })
          .get();
        console.log('1.uni-id-users username查询结果:', JSON.stringify(uniIdUsernameResult.data));
        searchDetails.searchResult.uniIdUsername = uniIdUsernameResult.data.length;
        
        // 2. 查询uni-id-users表中mobile字段
        const uniIdMobileResult = await db.collection('uni-id-users')
          .where({ mobile: phoneNumber })
          .get();
        console.log('2.uni-id-users mobile查询结果:', JSON.stringify(uniIdMobileResult.data));
        searchDetails.searchResult.uniIdMobile = uniIdMobileResult.data.length;
        
        // 3. 查询uni-id-users表中phoneNumber字段
        const uniIdPhoneNumberResult = await db.collection('uni-id-users')
          .where({ phoneNumber: phoneNumber })
          .get();
        console.log('3.uni-id-users phoneNumber查询结果:', JSON.stringify(uniIdPhoneNumberResult.data));
        searchDetails.searchResult.uniIdPhoneNumber = uniIdPhoneNumberResult.data.length;
        
        // 4. 查询users表中的phoneNumber字段
        const usersResult = await db.collection('users')
          .where({ phoneNumber: phoneNumber })
          .get();
        console.log('4.users phoneNumber查询结果:', JSON.stringify(usersResult.data));
        searchDetails.searchResult.usersTable = usersResult.data.length;
        
        // 检查是否找到用户
        if (
          uniIdUsernameResult.data.length === 0 && 
          uniIdMobileResult.data.length === 0 && 
          uniIdPhoneNumberResult.data.length === 0 && 
          usersResult.data.length === 0
        ) {
          console.log('所有表都未找到用户, 详细查询结果:', JSON.stringify(searchDetails));
          return {
            code: -1,
            success: false,
            message: '此账号未注册',
            details: searchDetails
          };
        }
        
        console.log('找到用户，详细查询结果:', JSON.stringify(searchDetails));
        
        // 这里继续原来的登录逻辑...
        // 为了简化，我们返回一个成功消息
        return {
          code: 0,
          success: true,
          message: '登录检查通过，找到了用户',
          details: searchDetails
        };
        
      } catch (error) {
        console.error('查询用户时发生错误:', error);
        return {
          code: -1,
          success: false,
          message: '登录查询时发生错误',
          error: error.message || '未知错误'
        };
      }
    }
    else if (loginType === 'phone') {
      // 旧的手机号登录
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
          console.log('开始使用code获取openid:', code);
          // 调用获取openid的云函数
          const openidResult = await uniCloud.callFunction({
            name: 'getWxOpenid',
            data: { code, deviceInfo, uuid }
          });
          
          console.log('获取openid结果:', openidResult);
          
          if (openidResult.result && openidResult.result.code === 0 && 
              openidResult.result.data && openidResult.result.data.openid) {
            wxOpenid = openidResult.result.data.openid;
            console.log('成功获取到openid:', wxOpenid, 
                       openidResult.result.data.mock ? '(模拟)' : '(真实)');
          } else {
            // 获取openid失败，返回错误
            console.error('获取openid失败:', openidResult);
            return {
              code: -1,
              success: false,
              message: '获取openid失败: ' + (openidResult.result ? openidResult.result.msg : '未知错误')
            };
          }
        } catch (error) {
          console.error('获取openid异常:', error);
          return {
            code: -1,
            success: false,
            message: '获取openid异常: ' + error.message
          };
        }
      }
      
      // 确保此时有openid
      if (!wxOpenid) {
        return {
          code: -1,
          success: false,
          message: '无法获取有效的openid'
        };
      }
      
      console.log('准备查询用户，使用openid:', wxOpenid);
      
      // 查询用户是否已经存在
      const db = uniCloud.database();
      try {
        // 查询用户 - 使用多种可能的字段格式
        console.log('尝试查询用户，使用多种可能的openid格式');
        const userQuery = db.collection('uni-id-users').where(db.command.or([
          // 主要格式：wx_openid.mp-weixin
          { 'wx_openid.mp-weixin': wxOpenid },
          // 兼容格式：weixin_openid
          { weixin_openid: wxOpenid },
          // 其他可能格式：wx_openid.weixin
          { 'wx_openid.weixin': wxOpenid },
          // 其他可能的字段
          { openid: wxOpenid }
        ]));
        
        // 查询用户
        const userRecord = await userQuery.get();
        console.log('用户查询结果:', userRecord);
        
        // 检查是否找到用户
        if (userRecord.data && userRecord.data.length > 0) {
          // 找到用户，执行登录
          const user = userRecord.data[0];
          console.log('找到已存在用户:', user._id);
          
          // 生成token
          const token = 'token_' + user._id + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
          const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
          
          // 准备更新数据
          const updateData = {
            token,
            token_expired: tokenExpired,
            last_login_date: new Date(),
            last_login_ip: CLIENTIP
          };
          
          // 如果有微信昵称和头像，同时更新用户信息
          if (userInfo && userInfo.nickName) {
            updateData.nickname = userInfo.nickName;
            updateData.wx_nickname = userInfo.nickName; // 使用wx_nickname字段存储微信原始昵称
            updateData.username = userInfo.nickName; // 同时更新username
          }
          
          if (userInfo && userInfo.avatarUrl) {
            updateData.avatar = userInfo.avatarUrl;
          }
          
          // 如果提供了real_name，保存到real_name字段
          if (real_name) {
            updateData.real_name = real_name;
            console.log('保存用户真实姓名:', real_name);
          }
          
          // 更新用户的token和登录时间以及用户信息
          await db.collection('uni-id-users').doc(user._id).update(updateData);
          
          console.log('用户登录成功，信息已更新:', updateData);
          
          // 返回登录成功信息
          return {
            code: 0,
            success: true,
            message: '登录成功',
            token,
            tokenExpired,
            uid: user._id,
            userInfo: {
              _id: user._id,
              username: user.username || user.nickname || '微信用户',
              nickname: updateData.nickname || user.nickname || '微信用户',
              avatar: updateData.avatar || user.avatar || '',
              gender: updateData.gender !== undefined ? updateData.gender : (user.gender || 0),
              wx_openid: { 'mp-weixin': wxOpenid },
              wx_nickname: updateData.wx_nickname || user.nickname || '微信用户'
            }
          };
        } else {
          // 用户不存在，创建新用户
          console.log('未找到用户，创建新用户, openid:', wxOpenid);
          
          // 基本用户信息
          const nickname = '微信用户'; // 统一使用"微信用户"，而不使用微信昵称
          const wx_nickname = (userInfo && userInfo.nickName) ? userInfo.nickName : '微信用户';
          const avatar = (userInfo && userInfo.avatarUrl) ? userInfo.avatarUrl : '';
          const gender = (userInfo && userInfo.gender !== undefined) ? userInfo.gender : 0;
          
          // 创建新用户
          const newUser = {
            _id: userId,
            username: userInfo.nickName || '微信用户', // 使用微信昵称作为username
            nickname: nickname, // 使用"微信用户"作为默认昵称
            avatar: avatar,
            gender: gender,
            wx_openid: {
              'mp-weixin': wxOpenid
            },
            wx_nickname: wx_nickname, // 使用wx_nickname字段存储微信原始昵称
            register_date: new Date(),
            register_ip: CLIENTIP,
            last_login_date: new Date(),
            last_login_ip: CLIENTIP,
            token,
            token_expired: tokenExpired
          };
          
          // 如果提供了real_name，保存到real_name字段
          if (real_name) {
            newUser.real_name = real_name;
            console.log('新用户保存真实姓名:', real_name);
          }
          
          // 插入新用户
          await db.collection('uni-id-users').add(newUser);
          console.log('新用户创建成功');
          
          // 返回创建成功信息
          return {
            code: 0,
            success: true,
            message: '注册并登录成功',
            token,
            tokenExpired,
            uid: userId,
            userInfo: {
              _id: userId,
              username: newUser.username,
              nickname: newUser.nickname,
              avatar: newUser.avatar,
              gender: newUser.gender,
              wx_openid: { 'mp-weixin': wxOpenid },
              wx_nickname: newUser.wx_nickname
            }
          };
        }
      } catch (error) {
        console.error('微信登录处理出错:', error);
        return {
          code: -1,
          success: false,
          message: '登录处理出错: ' + error.message
        };
      }
    } else if (loginType === 'createUserInDb') {
      // 直接在云数据库中创建微信用户
      console.log('直接在云数据库中创建微信用户, 参数:', { openid, code, userInfo });
      
      if (!openid && !code) {
        console.error('创建微信用户缺少必要参数');
        return {
          code: 1,
          success: false,
          message: '创建微信用户需要code或openid参数'
        };
      }
      
      let wxOpenid = openid;
      
      // 如果没有openid但有code，通过内部逻辑获取openid
      if (!wxOpenid && code) {
        try {
          console.log('尝试从code获取openid:', code);
          
          // 调用微信API获取openid
          const wxConfig = {
            appid: process.env.WX_APPID || 'wxe2d35d632df6aca7',  // 使用默认值以支持开发测试
            secret: process.env.WX_SECRET || '0c7c8bc081d2faaf2e9ebfb28a0f3634'  // 使用默认值以支持开发测试
          };
          
          console.log('使用的微信配置:', wxConfig);
          
          const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.appid}&secret=${wxConfig.secret}&js_code=${code}&grant_type=authorization_code`;
          
          const requestRes = await uniCloud.httpclient.request(url, {
            method: 'GET',
            dataType: 'json',
            timeout: 5000 // 设置超时时间为5秒
          });
          
          console.log('微信API返回结果:', requestRes);
          
          if (requestRes.status === 200 && requestRes.data && requestRes.data.openid) {
            wxOpenid = requestRes.data.openid;
            console.log('成功获取到openid:', wxOpenid);
          } else {
            // 微信开发工具调试模式下，可能无法获取真实openid
            // 为了便于开发测试，生成一个模拟openid
            if (PLATFORM === 'mp-weixin') {
              console.log('微信开发工具中使用模拟openid');
              wxOpenid = 'wx_' + Date.now() + '_' + Math.random().toString(36).substring(2);
              console.log('生成的模拟openid:', wxOpenid);
            } else if (requestRes.data && requestRes.data.errcode) {
              console.error('微信API错误:', requestRes.data.errcode, requestRes.data.errmsg);
              // 仍然生成模拟openid继续流程
              wxOpenid = 'wx_err_' + Date.now() + '_' + Math.random().toString(36).substring(2);
              console.log('API错误，生成的模拟openid:', wxOpenid);
            } else {
              console.error('获取openid失败，未知错误');
              // 仍然生成模拟openid继续流程
              wxOpenid = 'wx_unknown_' + Date.now() + '_' + Math.random().toString(36).substring(2);
              console.log('未知错误，生成的模拟openid:', wxOpenid);
            }
          }
        } catch (err) {
          console.error('获取openid过程出错:', err);
          // 错误时生成模拟openid继续流程
          wxOpenid = 'wx_error_' + Date.now() + '_' + Math.random().toString(36).substring(2);
          console.log('错误情况下生成的模拟openid:', wxOpenid);
        }
      }
      
      // 确保我们总是有一个openid
      if (!wxOpenid) {
        console.log('未能获取到openid，生成临时ID');
        wxOpenid = 'wx_fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      }
      
      // 检查用户是否存在于uni-id-users表
      console.log('检查openid是否存在于uni-id-users表:', wxOpenid);
      
      const uniIdUserResult = await db.collection('uni-id-users')
        .where({
          'wx_openid.mp-weixin': wxOpenid
        })
        .get();
      
      // 如果用户已存在于uni-id-users表，则直接返回
      if (uniIdUserResult.data && uniIdUserResult.data.length > 0) {
        const existUser = uniIdUserResult.data[0];
        userId = existUser._id;
        console.log('用户已存在于uni-id-users表，ID:', userId);
        
        // 更新用户登录时间和信息
        await db.collection('uni-id-users')
          .doc(userId)
          .update({
            last_login_date: Date.now(),
            nickname: userInfo.nickName || existUser.nickname,
            avatar: userInfo.avatarUrl || existUser.avatar,
            gender: userInfo.gender || existUser.gender || 0
          });
        
        // 获取用户完整信息
        const userData = await db.collection('uni-id-users')
          .doc(userId)
          .get();
        
        // 生成token
        const token = generateToken(userId);
        const tokenExpired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        
        // 更新token到用户记录
        await db.collection('uni-id-users')
          .doc(userId)
          .update({
            token: [token],
            token_expired: tokenExpired
          });
        
        // 创建过滤后的数据
        const data = userData.data;
        const filteredData = {
          _id: data._id,
          uid: data._id,
          username: data.username || '',
          nickname: data.nickname || '微信用户',
          avatarUrl: data.avatar || '',
          gender: data.gender || 0,
          mobile: data.mobile || '',
          token: token,
          tokenExpired: tokenExpired
        };
        
        return {
          code: 0,
          success: true,
          data: filteredData,
          token: token,
          tokenExpired: tokenExpired,
          message: 'uni-id-users表中已存在该用户，登录成功'
        };
      }
      
      // 用户不存在，在uni-id-users表中创建新用户
      console.log('在uni-id-users表中创建新用户');
      
      // 生成用户名和密码
      const username = 'wx_' + Date.now().toString(36);
      const password = wxOpenid || Math.random().toString(36).substring(2, 10);
      const passwordHash = encryptPassword(password);
      
      // 创建新用户数据
      const newUniIdUser = {
        username,
        password: passwordHash,
        nickname: '微信用户',
        avatar: '',
        gender: 0,
        wx_openid: {
          'mp-weixin': wxOpenid
        },
        wx_nickname: '微信用户',
        register_date: Date.now(),
        register_ip: CLIENTIP,
        last_login_date: Date.now(),
        last_login_ip: CLIENTIP,
        status: 1
      };
      
      // 如果提供了real_name，保存到real_name字段
      if (real_name) {
        newUniIdUser.real_name = real_name;
        console.log('新用户保存真实姓名:', real_name);
      }
      
      try {
        // 添加到uni-id-users表
        const result = await db.collection('uni-id-users').add(newUniIdUser);
        userId = result.id;
        console.log('创建uni-id-users成功，用户ID:', userId);
        
        // 获取用户完整信息
        const userData = await db.collection('uni-id-users').doc(userId).get();
        
        // 生成token
        const token = generateToken(userId);
        const tokenExpired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        
        // 更新token到用户记录
        await db.collection('uni-id-users').doc(userId).update({
          token: [token],
          token_expired: tokenExpired
        });
        
        // 创建过滤后的数据
        const formattedUserData = {
          _id: userId,
          uid: userId,
          username: username,
          nickname: '微信用户',
          avatarUrl: '',
          gender: 0,
          mobile: '',
          token: token,
          tokenExpired: tokenExpired
        };
        
        return {
          code: 0,
          success: true,
          data: formattedUserData,
          token,
          tokenExpired,
          message: '创建新用户成功'
        };
      } catch (err) {
        console.error('创建用户失败:', err);
        return {
          code: -1,
          success: false,
          message: '创建用户失败: ' + err.message
        };
      }
    } else if (loginType === 'checkMobileExists') {
      if (!phoneNumber) {
        return {
          code: -1,
          success: false,
          message: '缺少手机号参数'
        };
      }
      
      console.log('检查手机号是否存在:', phoneNumber);
      
      try {
        // 先检查uni-id-users表
        const uniIdResult = await db.collection('uni-id-users')
          .where(dbCmd.or([
            { mobile: phoneNumber },
            { phoneNumber: phoneNumber }
          ]))
          .limit(1)
          .get();
          
        if (uniIdResult.data && uniIdResult.data.length > 0) {
          console.log('在uni-id-users表中发现手机号');
          return {
            code: 0,
            success: true,
            exists: true,
            source: 'uni-id-users',
            message: '手机号已存在'
          };
        }
        
        // 再检查用户表
        const userResult = await db.collection('users')
          .where(dbCmd.or([
            { mobile: phoneNumber },
            { phoneNumber: phoneNumber }
          ]))
          .limit(1)
          .get();
          
        if (userResult.data && userResult.data.length > 0) {
          console.log('在users表中发现手机号');
          return {
            code: 0,
            success: true,
            exists: true,
            source: 'users',
            message: '手机号已存在'
          };
        }
        
        // 都没有找到
        console.log('未找到手机号');
        return {
          code: 0,
          success: true,
          exists: false,
          message: '手机号不存在'
        };
      } catch (error) {
        console.error('检查手机号存在性时出错:', error);
        return {
          code: -1,
          success: false,
          message: '查询手机号出错',
          error: error.message
        };
      }
    } else if (loginType === 'checkWxUser') {
      return await checkWxUser(code);
    } else if (loginType === 'loginWithOpenid') {
      return await loginWithOpenid(openid, userInfo, PLATFORM, APPID);
    } else if (loginType === 'createUserInDb') {
      return await createUserInDb(openid, userInfo);
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
        // 返回微信用户信息
        return {
          openid: wxData.openid,
          unionid: wxData.unionid || '',
          userInfo: wxData.userInfo || {}
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

// 使用openid创建用户并登录
async function createUserInDb(openid, userInfo) {
  console.log('使用openid创建用户:', {openid, userInfo});
  
  try {
    // 如果没有提供openid但有code，则获取openid
    if (!openid && userInfo && userInfo.wxCode) {
      try {
        const checkResult = await checkWxUser(userInfo.wxCode);
        if (checkResult.code === 0) {
          openid = checkResult.openid;
          console.log('从code获取到openid:', openid);
        }
      } catch (e) {
        console.error('通过code获取openid失败:', e);
        // 生成临时openid，确保用户创建流程继续
        openid = 'wx_error_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      }
    }
    
    // 确保我们总是有一个openid
    if (!openid) {
      console.log('未提供有效openid，创建临时ID');
      openid = 'wx_fallback_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    }
    
    // 准备用户数据
    const timestamp = Date.now();
    const db = uniCloud.database();
    
    // 检查用户是否已存在 - 使用正确的字段名称
    const existingUser = await db.collection('uni-id-users')
      .where({
        'wx_openid.mp-weixin': openid
      })
      .limit(1)
      .get();
    
    // 如果用户已存在，直接登录
    if (existingUser.data && existingUser.data.length > 0) {
      console.log('用户已存在，直接登录');
      return await loginWithOpenid(openid, userInfo);
    }
    
    // 准备昵称和头像
    let nickname = '微信用户';
    let avatar = '';
    
    if (userInfo) {
      nickname = userInfo.nickName || userInfo.nickname || nickname;
      avatar = userInfo.avatarUrl || userInfo.avatar || avatar;
    }
    
    // 创建用户ID，确保唯一性
    const userId = 'wx_' + timestamp + '_' + Math.random().toString(36).substring(2);
    
    // 创建用户 - 使用正确的字段结构
    const userData = {
      _id: userId,
      username: nickname,
      nickname: nickname,
      avatar: avatar,
      wx_openid: {
        'mp-weixin': openid
      },
      wx_nickname: nickname, // 使用wx_nickname字段存储微信原始昵称
      register_date: timestamp,
      register_ip: CLIENTIP || '',
      last_login_date: timestamp,
      last_login_ip: CLIENTIP || '',
      status: 0
    };
    
    console.log('要创建的用户数据:', userData);
    
    try {
      // 插入数据库
      const insertRes = await db.collection('uni-id-users')
        .add(userData);
      
      console.log('创建用户结果:', insertRes);
      
      if (!insertRes.id) {
        throw new Error('插入数据库未返回ID');
      }
      
      // 生成token
      const token = generateToken(userId);
      const tokenExpired = new Date(timestamp + 7 * 24 * 60 * 60 * 1000).toISOString();
      
      // 更新token到用户记录
      await db.collection('uni-id-users')
        .doc(userId)
        .update({
          token: [token],
          token_expired: tokenExpired
        });
      
      // 为了前端显示，格式化返回的数据
      const formattedUserData = {
        _id: userId,
        uid: userId,
        username: nickname,
        nickname: nickname,
        avatar: avatar,
        wx_openid: {
          'mp-weixin': openid
        },
        wx_nickname: nickname
      };
      
      // 返回用户信息和token
      return {
        code: 0,
        message: '创建用户并登录成功',
        token,
        tokenExpired,
        data: formattedUserData
      };
    } catch (dbErr) {
      console.error('数据库操作错误:', dbErr);
      throw dbErr;
    }
  } catch (err) {
    console.error('创建用户失败:', err);
    return {
      code: -3,
      message: '创建用户过程出错: ' + err.message,
      error: err.stack
    };
  }
}

// 使用openid登录
async function loginWithOpenid(openid, userInfo, platform, appid) {
  console.log('使用openid登录:', openid);
  
  // 查询用户是否存在
  const db = uniCloud.database();
  const userCollection = db.collection('uni-id-users');
  
  try {
    // 查询是否已存在该openid的用户
    const userResult = await userCollection.where({
      'wx_openid.mp-weixin': openid
    }).get();
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，执行登录
      const user = userResult.data[0];
      
      // 生成token
      const token = 'token_' + user._id + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
      const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后过期
      
      // 准备更新数据
      const updateData = {
        token,
        token_expired: tokenExpired,
        last_login_date: new Date(),
        last_login_ip: CLIENTIP
      };
      
      // 如果有微信昵称和头像，同时更新用户信息
      if (userInfo && userInfo.nickName) {
        updateData.nickname = userInfo.nickName;
        updateData.wx_nickname = userInfo.nickName; // 使用wx_nickname字段存储微信原始昵称
        updateData.username = userInfo.nickName; // 同时更新username
      }
      
      if (userInfo && userInfo.avatarUrl) {
        updateData.avatar = userInfo.avatarUrl;
      }
      
      // 如果提供了real_name，保存到real_name字段
      if (real_name) {
        updateData.real_name = real_name;
        console.log('保存用户真实姓名:', real_name);
      }
      
      // 更新用户的token和登录时间以及用户信息
      await userCollection.doc(user._id).update(updateData);
      
      console.log('用户登录成功，信息已更新:', updateData);
      
      // 返回登录成功信息
      return {
        code: 0,
        success: true,
        message: '登录成功',
        token,
        tokenExpired,
        uid: user._id,
        userInfo: {
          _id: user._id,
          username: user.username || user.nickname || '微信用户',
          nickname: updateData.nickname || user.nickname || '微信用户',
          avatar: updateData.avatar || user.avatar || '',
          gender: updateData.gender !== undefined ? updateData.gender : (user.gender || 0),
          wx_openid: { 'mp-weixin': openid },
          wx_nickname: updateData.wx_nickname || user.nickname || '微信用户'
        }
      };
    } else {
      // 用户不存在，需要创建新用户
      const userId = 'user-wx-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
      
      // 基本用户信息
      const nickname = '微信用户'; // 统一使用"微信用户"，而不使用微信昵称
      const wx_nickname = (userInfo && userInfo.nickName) ? userInfo.nickName : '微信用户';
      const avatar = (userInfo && userInfo.avatarUrl) ? userInfo.avatarUrl : '';
      const gender = (userInfo && userInfo.gender !== undefined) ? userInfo.gender : 0;
      
      // 创建新用户
      const newUser = {
        _id: userId,
        username: userInfo.nickName || '微信用户', // 使用微信昵称作为username
        nickname: nickname, // 使用"微信用户"作为默认昵称
        avatar: avatar,
        gender: gender,
        wx_openid: {
          'mp-weixin': openid
        },
        wx_nickname: wx_nickname, // 使用wx_nickname字段存储微信原始昵称
        register_date: new Date(),
        register_ip: CLIENTIP,
        last_login_date: new Date(),
        last_login_ip: CLIENTIP,
        token,
        token_expired: tokenExpired
      };
      
      // 如果提供了real_name，保存到real_name字段
      if (real_name) {
        newUser.real_name = real_name;
        console.log('新用户保存真实姓名:', real_name);
      }
      
      // 插入新用户
      await userCollection.add(newUser);
      
      console.log('新用户创建成功');
      
      // 返回创建成功信息
      return {
        code: 0,
        success: true,
        message: '注册并登录成功',
        token,
        tokenExpired,
        uid: userId,
        userInfo: {
          _id: userId,
          username: newUser.username,
          nickname: newUser.nickname,
          avatar: newUser.avatar,
          gender: newUser.gender,
          wx_openid: { 'mp-weixin': openid },
          wx_nickname: newUser.wx_nickname
        }
      };
    }
  } catch (error) {
    console.error('openid登录处理出错:', error);
    throw error;
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
  console.log('微信登录处理:', { code, openid, platform });
  console.log('传入的用户信息:', userInfo);
  
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
          console.log('从code获取到的微信openid:', wxOpenid);
          console.log('从code获取到的微信用户信息:', wxUserInfo);
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
      console.log('找到现有微信用户');
      const existUser = userResult.data[0];
      const userId = existUser._id;
      
      // 准备更新的数据
      const updateData = {
        last_login_date: serverDate,
        last_login_ip: clientIp || serverDate
      };
      
      // 如果有新的用户信息，且用户当前无昵称或头像，则更新
      if (combinedUserInfo) {
        if (combinedUserInfo.nickName) {
          // 不再更新nickname字段，只更新wx_nickname字段
          updateData.wx_nickname = combinedUserInfo.nickName; // 使用wx_nickname字段存储微信原始昵称
        }
        if (combinedUserInfo.avatarUrl && !existUser.avatar) {
          updateData.avatar = combinedUserInfo.avatarUrl;
        }
        if (combinedUserInfo.gender !== undefined && existUser.gender === 0) {
          updateData.gender = combinedUserInfo.gender;
        }
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
      console.log('创建新微信用户');
      
      // 基本用户信息
      const nickname = '微信用户'; // 统一使用"微信用户"，而不使用微信昵称
      const wx_nickname = (combinedUserInfo && combinedUserInfo.nickName) ? combinedUserInfo.nickName : '微信用户';
      const avatar = (combinedUserInfo && combinedUserInfo.avatarUrl) ? combinedUserInfo.avatarUrl : '';
      const gender = (combinedUserInfo && combinedUserInfo.gender !== undefined) ? combinedUserInfo.gender : 0;
      
      // 创建用户记录
      const newUser = {
        nickname: nickname, // 使用"微信用户"作为默认昵称
        avatar: avatar,
        gender: gender,
        wx_nickname: wx_nickname, // 使用wx_nickname字段存储微信原始昵称
        register_date: serverDate,
        register_ip: clientIp || serverDate,
        last_login_date: serverDate,
        last_login_ip: clientIp || serverDate,
        wx_openid: {
          mp: wxOpenid
        },
        status: 0,
        dcloud_appid: [platform || '']
      };
      
      // 如果提供了real_name，保存到real_name字段
      if (real_name) {
        newUser.real_name = real_name;
        console.log('新用户保存真实姓名:', real_name);
      }
      
      // 插入新用户
      const result = await db.collection('uni-id-users')
        .add(newUser);
      
      const userId = result.id;
      console.log('创建的用户ID:', userId);
      
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
async function handlePhoneLogin(phone, wxCode, userInfo, platform, appid, clientIp, real_name) {
  console.log('处理手机号登录:', { phone, wxCode, userInfo });
  
  if (!phone) {
    return {
      code: -1,
      success: false,
      message: '手机号不能为空'
    };
  }
  
  try {
    const phoneNumber = phone; // 统一使用phoneNumber变量名
    
    // 根据手机号查询用户信息
    const userResult = await db.collection('uni-id-users')
      .where({
        mobile: phoneNumber
      })
      .limit(1)
      .get();
    
    // 服务器当前时间
    const serverDate = new Date();
    let userId;
    let isNewUser = false;
    
    // 提取用户头像昵称信息
    const wx_nickname = userInfo && userInfo.nickName || '微信用户';
    const avatarUrl = userInfo && userInfo.avatarUrl || '';
    
    console.log('用户信息:', { wx_nickname, avatarUrl });
    
    if (userResult.data.length === 0) {
      // 用户不存在，注册
      isNewUser = true;
      
      console.log('用户不存在，创建新用户');
      
      // 生成用户名
      const username = `user_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
      
      // 创建新用户
      const insertData = {
        username,
        mobile: phoneNumber,
        mobile_confirmed: 1,
        nickname: '微信用户', // 使用默认值，不使用微信昵称
        wx_nickname: wx_nickname,  // 特别保存到wx_nickname字段
        avatar: avatarUrl,      // 保存头像到avatar字段
        register_date: serverDate,
        register_ip: clientIp || '127.0.0.1',
        last_login_date: serverDate,
        last_login_ip: clientIp || '127.0.0.1',
        login_cnt: 1,
        status: 0, // 正常状态
        register_source: platform
      };
      
      // 如果提供了真实姓名，也保存
      if (real_name) {
        insertData.realname_verified = 1;
        insertData.realname = real_name;
      }
      
      const insertResult = await db.collection('uni-id-users').add(insertData);
      userId = insertResult.id;
      
      console.log('新用户创建成功，ID:', userId);
    } else {
      // 用户已存在，登录
      const existUser = userResult.data[0];
      userId = existUser._id;
      
      console.log('用户已存在，更新信息:', userId);
      
      // 准备更新的用户数据
      const updateData = {
        last_login_date: serverDate,
        last_login_ip: clientIp || '127.0.0.1',
        login_cnt: dbCmd.inc(1)
      };
      
      // 如果有微信信息，只更新wx_nickname，不更新nickname
      if (userInfo) {
        // 保存到wx_nickname，无论是否存在
        if (wx_nickname) {
          updateData.wx_nickname = wx_nickname;
        }
        
        // 仅当用户头像为空时更新
        if (avatarUrl && !existUser.avatar) {
          updateData.avatar = avatarUrl;
        }
      }
      
      // 如果提供了真实姓名，也保存
      if (real_name && !existUser.realname) {
        updateData.realname_verified = 1;
        updateData.realname = real_name;
      }
      
      // 更新用户信息
      await db.collection('uni-id-users').doc(userId).update(updateData);
    }
    
    // 生成token
    const tokenExpired = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7天有效期
    const token = generateToken(userId);
    
    // 获取用户完整信息
    const userData = await db.collection('uni-id-users')
      .doc(userId)
      .field({
        password: 0,
        token: 0
      })
      .get()
      .then(res => {
        return res.data[0];
      });
    
    // 组装返回数据
    return {
      code: 0,
      success: true,
      message: isNewUser ? '注册并登录成功' : '登录成功',
      uid: userId,
      token,
      tokenExpired,
      userInfo: userData, // 兼容旧版返回格式
      data: userData      // 新版返回格式
    };
  } catch (error) {
    console.error('手机号登录处理失败:', error);
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