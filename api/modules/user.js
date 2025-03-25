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

export default {
  login,
  getWxOpenid,
  getUserInfo,
  logout
}; 