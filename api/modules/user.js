/**
 * 用户相关API
 */
import request from '../request';

/**
 * 用户登录
 * @param {Object} params - 登录参数
 * @param {String} params.code - 微信登录code
 * @param {Object} params.userInfo - 用户信息
 * @param {String} params.loginType - 登录类型 wechat/phone
 * @param {String} params.phoneNumber - 手机号(loginType为phone时必填)
 * @returns {Promise} API请求Promise
 */
export function login(params = {}) {
  console.log('调用login API，参数:', params);
  
  return request({
    name: 'login',
    data: params
  });
}

/**
 * 获取微信OpenID
 * @param {Object} params - 请求参数
 * @param {String} params.code - 微信登录code
 * @returns {Promise} API请求Promise
 */
export function getWxOpenid(params = {}) {
  console.log('调用getWxOpenid API，参数:', params);
  
  if (!params.code) {
    return Promise.reject(new Error('缺少code参数'));
  }
  
  return request({
    name: 'getWxOpenid',
    data: params
  });
}

/**
 * 获取用户信息
 * @returns {Promise} API请求Promise
 */
export function getUserInfo() {
  return request({
    name: 'getUserInfo',
    data: {}
  });
}

/**
 * 退出登录
 * @returns {Promise} API请求Promise
 */
export function logout() {
  return request({
    name: 'logout',
    data: {}
  });
}

/**
 * 更新用户手机号
 * @param {Object} params - 请求参数
 * @param {String} params.phoneNumber - 新的手机号码
 * @returns {Promise} API请求Promise
 */
export function updatePhoneNumber(params = {}) {
  console.log('调用updatePhoneNumber API，参数:', params);
  
  if (!params.phoneNumber) {
    return Promise.reject(new Error('缺少phoneNumber参数'));
  }
  
  // 尝试获取所有可能的token
  const uniIdToken = uni.getStorageSync('uni_id_token') || '';
  const token = uni.getStorageSync('token') || '';
  const userToken = uni.getStorageSync('userToken') || '';
  
  // 获取优先级: uniIdToken > token > userToken
  const effectiveToken = uniIdToken || token || userToken;
  
  // 获取可能的用户ID
  let userId = '';
  try {
    const userInfoStr = uni.getStorageSync('userInfo');
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      userId = userInfo._id || userInfo.userId || userInfo.id || '';
    }
  } catch (e) {
    console.error('获取用户ID失败:', e);
  }
  
  console.log('使用token:', {
    'uni_id_token': !!uniIdToken,
    'token': !!token,
    'userToken': !!userToken,
    'effectiveToken': !!effectiveToken,
    'userId': userId
  });
  
  return request({
    name: 'updateUserInfo',
    data: {
      update: {
        phoneNumber: params.phoneNumber
      },
      // 以多种方式提供身份信息，提高成功率
      uniIdToken: effectiveToken,
      token: effectiveToken,
      userToken: effectiveToken,
      userId: userId,
      phoneNumber: params.phoneNumber
    }
  });
}

export default {
  login,
  getWxOpenid,
  getUserInfo,
  logout,
  updatePhoneNumber
}; 