// wxLogin函数 - 不使用uni-id-co
wxLogin(userInfo) {
  // 显示加载中
  uni.showLoading({
    title: '登录中...',
    mask: true
  });
  
  // 获取code
  uni.login({
    provider: 'weixin',
    success: (res) => {
      if (res.code) {
        console.log('获取code成功:', res.code);
        
        // 保存code
        this.loginState.code = res.code;
        
        // 直接调用云函数处理微信登录
        uniCloud.callFunction({
          name: 'wxLogin',
          data: {
            code: res.code,
            userInfo: {
              nickName: userInfo.nickName || '微信用户',
              avatarUrl: userInfo.avatarUrl || '',
              gender: userInfo.gender || 0
            }
          }
        }).then(result => {
          console.log('云函数微信登录结果:', result);
          
          if (result.result && result.result.code === 0) {
            // 登录成功，保存用户信息
            this.saveUserInfo(result.result);
          } else if (result.result && result.result.openid) {
            // 有openid但登录失败，尝试使用openid注册
            this.registerUserWithCloud(result.result.openid, userInfo);
          } else {
            // 登录失败，显示错误
            uni.hideLoading();
            uni.showToast({
              title: (result.result && result.result.message) || '登录失败，请重试',
              icon: 'none'
            });
          }
        }).catch(err => {
          console.error('云函数微信登录失败:', err);
          // 尝试使用备用云函数
          this.loginWithCloudFunction(res.code, userInfo);
        });
      } else {
        uni.hideLoading();
        console.log('获取code失败');
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      }
    },
    fail: (err) => {
      uni.hideLoading();
      console.error('微信登录失败:', err);
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      });
    }
  });
},

// 使用openid和云函数注册用户
registerUserWithCloud(openid, userInfo) {
  console.log('尝试使用openid注册用户:', openid);
  
  // 调用云函数注册用户
  uniCloud.callFunction({
    name: 'registerUser',
    data: {
      openid: openid,
      userInfo: {
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0
      }
    }
  }).then(result => {
    console.log('注册用户结果:', result);
    
    if (result.result && result.result.code === 0) {
      // 注册成功，保存用户信息
      this.saveUserInfo(result.result);
    } else {
      // 注册失败，使用备用登录方法
      this.loginWithCloudFunction(this.loginState.code, userInfo);
    }
  }).catch(err => {
    console.error('注册用户失败:', err);
    // 尝试使用备用云函数
    this.loginWithCloudFunction(this.loginState.code, userInfo);
  });
},

// 使用备用云函数登录
loginWithCloudFunction(code, userInfo) {
  console.log('使用备用云函数登录, code:', code);
  
  // 调用登录云函数
  uniCloud.callFunction({
    name: 'login',
    data: {
      loginType: 'weixin',
      code: code,
      userInfo: {
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0
      }
    }
  }).then(result => {
    console.log('备用云函数登录结果:', result);
    
    if (result.result && result.result.code === 0) {
      // 登录成功，保存用户信息
      this.saveUserInfo(result.result);
    } else {
      // 登录失败，尝试自动注册
      this.createUserInDB(userInfo);
    }
  }).catch(err => {
    console.error('备用云函数登录失败:', err);
    // 尝试直接创建用户
    this.createUserInDB(userInfo);
  });
},

// 在数据库中创建用户
createUserInDB(userInfo) {
  console.log('尝试在数据库中创建用户');
  
  // 显示加载中
  uni.showLoading({
    title: '创建账号中...',
    mask: true
  });
  
  // 生成唯一用户名
  const username = 'wxuser_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  
  // 调用云函数注册普通账号
  uniCloud.callFunction({
    name: 'createUser',
    data: {
      username: username,
      password: Math.random().toString(36).substring(2, 10),
      userInfo: {
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0
      }
    }
  }).then(result => {
    console.log('创建用户结果:', result);
    uni.hideLoading();
    
    if (result.result && result.result.code === 0) {
      // 创建成功，保存用户信息
      uni.showToast({
        title: '账号创建成功',
        icon: 'success'
      });
      this.saveUserInfo(result.result);
    } else {
      // 创建失败，提示用户
      uni.showToast({
        title: (result.result && result.result.message) || '创建账号失败',
        icon: 'none'
      });
    }
  }).catch(err => {
    uni.hideLoading();
    console.error('创建用户失败:', err);
    uni.showToast({
      title: '创建账号失败，请重试',
      icon: 'none'
    });
  });
},

// 处理微信登录失败的备用方案
handleWxLoginFallback(code, userInfo) {
  console.log('使用备用方案处理微信登录, code:', code);
  
  // 使用云函数尝试登录
  this.loginWithCloudFunction(code, userInfo);
},

// 使用openid登录（备用方法）
loginWithOpenid(openid, userInfo) {
  console.log('使用openid直接登录:', openid);
  
  // 显示加载中
  uni.showLoading({
    title: '登录中...',
    mask: true
  });
  
  // 准备用户数据
  const userData = {
    nickname: userInfo.nickName || '微信用户',
    avatar: userInfo.avatarUrl || '',
    gender: userInfo.gender || 0
  };
  
  // 调用云函数查询用户
  uniCloud.callFunction({
    name: 'loginWithOpenid',
    data: {
      openid: openid,
      userInfo: userData
    }
  }).then(result => {
    console.log('openid登录结果:', result);
    
    if (result.result && result.result.code === 0) {
      // 登录成功，保存用户信息
      this.saveUserInfo(result.result);
    } else {
      // 登录失败，尝试注册
      this.registerUserWithCloud(openid, userInfo);
    }
  }).catch(err => {
    console.error('openid登录失败:', err);
    // 使用备用方法注册
    this.registerUserWithCloud(openid, userInfo);
  });
},

// 保存用户信息
async saveUserInfo(res) {
  try {
    // 保存用户信息到本地
    console.log('保存用户信息, 原始数据:', JSON.stringify(res));
    
    // 确保res是对象
    const userData = typeof res === 'string' ? JSON.parse(res) : res;
    
    // 保存token到storage
    if (userData.token) {
      uni.setStorageSync('uni_id_token', userData.token);
      uni.setStorageSync('uni_id_token_expired', userData.tokenExpired);
      console.log('保存了token和过期时间:', userData.tokenExpired);
    }
    
    // 构建完整的用户信息对象
    let userInfo = {
      uid: userData.uid || '',
      _id: userData.uid || userData._id || '',
      token: userData.token || '',
      tokenExpired: userData.tokenExpired || '',
      username: '',
      nickname: '',
      mobile: '',
      email: '',
      avatar: '',
      gender: 0
    };
    
    // 如果存在userInfo字段
    if (userData.userInfo && typeof userData.userInfo === 'object') {
      console.log('从userInfo字段提取数据');
      // 合并用户信息
      Object.assign(userInfo, {
        username: userData.userInfo.username || userData.userInfo.nickName || '',
        nickname: userData.userInfo.nickname || userData.userInfo.nickName || '',
        mobile: userData.userInfo.mobile || '',
        email: userData.userInfo.email || '',
        avatar: userData.userInfo.avatar || userData.userInfo.avatarUrl || '',
        gender: userData.userInfo.gender || 0
      });
    } 
    // 如果直接包含用户信息字段
    else {
      console.log('从顶级字段提取数据');
      userInfo.username = userData.username || userData.nickName || '';
      userInfo.nickname = userData.nickname || userData.nickName || '';
      userInfo.mobile = userData.mobile || '';
      userInfo.email = userData.email || '';
      userInfo.avatar = userData.avatar || userData.avatarUrl || '';
      userInfo.gender = userData.gender || 0;
    }
    
    // 确保UI显示需要的userInfo属性存在
    userInfo.userInfo = {
      _id: userInfo.uid || userInfo._id,
      uid: userInfo.uid || userInfo._id,
      username: userInfo.username,
      nickname: userInfo.nickname,
      avatar: userInfo.avatar
    };
    
    console.log('处理后的用户信息:', JSON.stringify(userInfo));
    
    // 存储用户信息
    uni.setStorageSync('userInfo', userInfo);
    
    // 保存到全局变量以便其他页面使用
    getApp().globalData.userInfo = userInfo;
    
    // 同时保存到uni-id-pages的标准存储位置
    uni.setStorageSync('uni-id-pages-userInfo', userInfo);
    
    console.log('保存用户信息成功');
    
    // 隐藏加载
    uni.hideLoading();
    
    // 触发登录成功事件
    uni.$emit('user:login', userInfo);
    uni.$emit('login:success', userInfo);
    
    // 显示登录成功提示
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    });
    
    // 登录成功后自动跳转到首页或指定页面
    setTimeout(() => {
      this.navigateAfterLogin();
    }, 1000);
  } catch (e) {
    uni.hideLoading();
    console.error('保存用户信息失败:', e);
    uni.showToast({
      title: '登录失败，请重试',
      icon: 'none'
    });
  }
},

// 静默登录方法
silentLogin() {
  console.log('执行静默登录...');
  try {
    // 检查是否有有效的token
    const token = uni.getStorageSync('uni_id_token');
    const tokenExpired = uni.getStorageSync('uni_id_token_expired');
    
    // 如果没有token或者token已过期，不做任何操作
    if (!token || !tokenExpired || Date.now() > tokenExpired) {
      console.log('无有效token或token已过期，需要用户主动登录');
      return;
    }
    
    console.log('发现有效token，尝试静默登录');
    
    // 使用云函数检查token有效性
    uniCloud.callFunction({
      name: 'checkToken',
      data: { token: token }
    })
    .then(res => {
      if (res.result && res.result.code === 0 && res.result.uid) {
        console.log('token有效，静默登录成功');
        
        // 刷新页面显示
        this.refreshUserInfo(res.result);
        
        // 如果有重定向页面，直接跳转
        setTimeout(() => {
          const redirectUrl = this.getRedirectUrl();
          if (redirectUrl) {
            console.log('静默登录成功，跳转到:', redirectUrl);
            this.navigateAfterLogin();
          }
        }, 500);
      } else {
        console.log('token无效，需要用户主动登录');
      }
    })
    .catch(err => {
      console.error('静默登录失败:', err);
    });
  } catch (err) {
    console.error('静默登录出错:', err);
  }
},

// 检查token有效性
checkTokenValidity(token) {
  uni.showLoading({
    title: '检查中...'
  });
  
  // 使用云函数检查token有效性，不使用uni-id-co
  uniCloud.callFunction({
    name: 'checkToken',
    data: { token: token }
  })
  .then(res => {
    uni.hideLoading();
    console.log('token检查结果:', res);
    
    if (res.result && res.result.code === 0) {
      // 成功获取到用户信息，显示详细内容
      let infoText = `登录状态: 已登录\n`;
      
      // 添加用户ID信息
      infoText += `用户ID: ${res.result.uid || '未知'}\n`;
      
      // 检查云数据库中的用户信息
      this.checkDatabaseUserInfo(res.result.uid);
      
      // 添加用户名和昵称信息
      if (res.result.userInfo) {
        infoText += `用户名: ${res.result.userInfo.username || '未设置'}\n`;
        infoText += `昵称: ${res.result.userInfo.nickname || res.result.userInfo.username || '未设置'}\n`;
        
        // 如果有手机号，显示手机号
        if (res.result.userInfo.mobile) {
          infoText += `手机号: ${res.result.userInfo.mobile}\n`;
        }
        
        // 显示是否绑定手机号
        infoText += `是否绑定手机号: ${res.result.userInfo.mobile ? '是' : '否'}\n`;
      }
      
      // 尝试获取用户完整信息
      const userInfo = uni.getStorageSync('userInfo');
      
      // 如果存储了用户信息，添加到显示中
      if (userInfo) {
        infoText += `\n本地存储信息:\n`;
        infoText += `存储用户ID: ${userInfo.uid || userInfo._id || '未知'}\n`;
        
        if (typeof userInfo === 'object') {
          // 检查userInfo属性
          if (userInfo.userInfo) {
            infoText += `存储昵称: ${userInfo.userInfo.nickname || userInfo.nickname || '未设置'}\n`;
          } else {
            infoText += `存储昵称: ${userInfo.nickname || '未设置'}\n`;
          }
        }
      }
      
      // 显示token过期时间
      const tokenExpired = uni.getStorageSync('uni_id_token_expired');
      if (tokenExpired) {
        const expireDate = new Date(tokenExpired);
        infoText += `\nToken过期时间: ${expireDate.toLocaleString()}\n`;
        infoText += `是否已过期: ${Date.now() > tokenExpired ? '是' : '否'}\n`;
      }
      
      // 显示用户信息
      uni.showModal({
        title: '登录状态',
        content: infoText,
        showCancel: false
      });
      
      // 如果没有用户信息，尝试重新获取
      if (!userInfo || !userInfo.nickname) {
        this.refreshUserInfo(res.result);
      }
    } else {
      uni.showModal({
        title: '登录状态',
        content: `登录已失效: ${(res.result && res.result.message) || '未知错误'}`,
        showCancel: false
      });
    }
  })
  .catch(err => {
    uni.hideLoading();
    console.error('检查token失败:', err);
    
    uni.showModal({
      title: '登录状态',
      content: `检查失败: ${err.message || JSON.stringify(err)}`,
      showCancel: false
    });
  });
} 