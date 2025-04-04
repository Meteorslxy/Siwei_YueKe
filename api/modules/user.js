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
 * 检查课程/讲座/老师是否已收藏
 * @param {Object} params - 请求参数
 * @param {String} params.userId - 用户ID
 * @param {String} params.itemId - 项目ID
 * @param {String} params.itemType - 项目类型(course/lecture/teacher)
 * @returns {Promise} API请求Promise
 */
export function checkFavorite(params = {}) {
  console.log('调用checkFavorite API，参数:', params);
  
  if (!params.userId || !params.itemId || !params.itemType) {
    console.error('检查收藏状态失败: 参数不完整', params);
    return Promise.reject(new Error('参数不完整'));
  }
  
  return request({
    name: 'checkFavorite',
    data: params
  });
}

/**
 * 添加收藏
 * @param {Object} params - 请求参数
 * @param {String} params.userId - 用户ID
 * @param {String} params.itemId - 项目ID
 * @param {String} params.itemType - 项目类型(course/lecture/teacher)
 * @param {String} params.itemTitle - 项目标题
 * @param {String} params.itemCover - 项目封面图
 * @param {String} params.itemUrl - 项目URL
 * @returns {Promise} API请求Promise
 */
export function addFavorite(params = {}) {
  console.log('调用addFavorite API，参数:', params);
  
  if (!params.userId || !params.itemId || !params.itemType) {
    console.error('添加收藏失败: 参数不完整', params);
    return Promise.reject(new Error('参数不完整'));
  }
  
  return request({
    name: 'addFavorite',
    data: params
  });
}

/**
 * 删除收藏
 * @param {String} favoriteId - 收藏记录ID
 * @returns {Promise} API请求Promise
 */
export function removeFavorite(favoriteId) {
  console.log('调用removeFavorite API，参数:', favoriteId);
  
  if (!favoriteId) {
    console.error('删除收藏失败: 收藏ID不能为空');
    return Promise.reject(new Error('收藏ID不能为空'));
  }
  
  return request({
    name: 'removeFavorite',
    data: {
      favoriteId
    }
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
      // 检查是否已经是对象，避免重复解析
      let userInfo;
      if (typeof userInfoStr === 'string') {
        userInfo = JSON.parse(userInfoStr);
      } else {
        // 已经是对象
        userInfo = userInfoStr;
      }
      
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
      // 明确指定update对象中的mobile字段
      update: {
        mobile: params.phoneNumber,
        phoneNumber: params.phoneNumber
      },
      
      // 直接在根级别也提供mobile字段，以防update对象处理有问题
      mobile: params.phoneNumber,
      phoneNumber: params.phoneNumber,
      
      // 用户ID参数，使用多种可能的参数名增加成功率
      uid: userId,           // uni-id标准用户ID参数
      userId: userId,        // 常见用户ID参数
      _id: userId,           // MongoDB文档ID
      id: userId,            // 通用ID参数名
      user_id: userId,       // 下划线格式ID
      
      // token相关参数
      uniIdToken: effectiveToken,
      token: effectiveToken,
      userToken: effectiveToken
    }
  });
}

export default {
  login,
  getWxOpenid,
  getUserInfo,
  logout,
  updatePhoneNumber,
  checkFavorite,
  addFavorite,
  removeFavorite
}; 