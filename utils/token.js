/**
 * token相关的通用工具函数
 */

// 获取token
export function getToken() {
  // 检查是否设置了防止自动登录的标记
  if (uni.getStorageSync('prevent_auto_login')) {
    console.log('检测到防止自动登录标记，返回空token');
    return '';
  }
  return uni.getStorageSync('uni_id_token') || '';
}

// 保存token
export function saveToken(token, tokenExpired) {
  if (token) {
    uni.setStorageSync('uni_id_token', token);
  }
  
  if (tokenExpired) {
    uni.setStorageSync('uni_id_token_expired', tokenExpired);
  }
  
  // 保存token时清除防止自动登录的标记
  uni.removeStorageSync('prevent_auto_login');
}

// 检查token是否有效
export function isTokenValid() {
  // 检查是否设置了防止自动登录的标记
  if (uni.getStorageSync('prevent_auto_login')) {
    console.log('检测到防止自动登录标记，token视为无效');
    return false;
  }
  
  const token = uni.getStorageSync('uni_id_token');
  const tokenExpired = uni.getStorageSync('uni_id_token_expired');
  
  return token && 
    typeof token === 'string' && 
    token.length > 10 && 
    tokenExpired && 
    tokenExpired > Date.now();
}

// 清除token
export function clearToken(key) {
  if (key) {
    uni.removeStorageSync(key);
    return;
  }
  
  // 清除基本token
  uni.removeStorageSync('uni_id_token');
  uni.removeStorageSync('uni_id_token_expired');
  
  // 设置防止自动登录的标记，并记录登出时间
  uni.setStorageSync('prevent_auto_login', true);
  uni.setStorageSync('logout_time', Date.now());
  
  // 清除微信登录相关信息
  uni.removeStorageSync('wx_openid');
  
  // 清除可能存在的用户信息缓存
  uni.removeStorageSync('uni-id-pages-userInfo');
  uni.removeStorageSync('userInfo');
}

// 检查是否防止自动登录
export function isPreventAutoLogin() {
  return !!uni.getStorageSync('prevent_auto_login');
}

// 重置防止自动登录标记（仅在用户主动登录时调用）
export function resetPreventAutoLogin() {
  uni.removeStorageSync('prevent_auto_login');
  uni.removeStorageSync('logout_time');
}

// 获取用户ID (从token中)
export function getUserId() {
  // 检查是否设置了防止自动登录的标记
  if (uni.getStorageSync('prevent_auto_login')) {
    return '';
  }
  
  // 优先从uni-id-pages-userInfo中获取
  const userInfo = uni.getStorageSync('uni-id-pages-userInfo');
  if (userInfo && userInfo._id) {
    return userInfo._id;
  }
  
  // 尝试从token获取
  try {
    const userInfoFromToken = uniCloud.getCurrentUserInfo();
    if (userInfoFromToken && userInfoFromToken.uid) {
      return userInfoFromToken.uid;
    }
  } catch (e) {
    console.error('从token获取用户ID失败', e);
  }
  
  return '';
}

// 为请求添加token
export function addTokenToRequest(options = {}) {
  if (!options.header) {
    options.header = {};
  }
  
  const token = getToken();
  if (token) {
    options.header['x-token'] = token;
  }
  
  return options;
} 