/**
 * 云函数请求封装
 * @param {Object} options
 * @param {String} options.name 云函数名称
 * @param {Object} options.data 请求参数
 * @param {Boolean} options.showLoading 是否显示加载提示
 */
function request(options = {}) {
  const { name, data = {}, showLoading = true } = options;
  
  // 检查云函数名称是否存在
  if (!name) {
    console.error('云函数名称不能为空');
    return Promise.reject(new Error('云函数名称不能为空'));
  }
  
  if (showLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
  }
  
  return new Promise((resolve, reject) => {
    // 正常调用云函数 - 使用uniCloud
    const spaceId = getApp().globalData.$spaceId || 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29';
    
    // 微信小程序特殊处理 - 只使用阿里云UniCloud
    // #ifdef MP-WEIXIN
    // 确保微信云函数被禁用
    if (typeof wx !== 'undefined' && wx.cloud) {
      wx.cloud = null;
    }
    // #endif
    
    console.log(`调用阿里云云函数[${name}]，环境ID: ${spaceId}`);
    
    // 检查uniCloud是否存在
    if (typeof uniCloud === 'undefined' || !uniCloud) {
      console.error('uniCloud对象不存在，使用模拟数据');
      
      // 根据不同的接口返回模拟数据
      let mockResult = {
        code: 0,
        message: '模拟数据',
        data: null
      };
      
      if (name === 'login') {
        mockResult.data = {
          userId: 'mock-user-id',
          nickName: '模拟用户',
          avatarUrl: '/static/images/default-avatar.png'
        };
      }
      
      if (showLoading) {
        uni.hideLoading();
      }
      
      return resolve(mockResult);
    }
    
    // 使用uniCloud调用云函数
    uniCloud.callFunction({
      name,
      data,
      success: res => {
        console.log(`云函数 ${name} 调用成功:`, res.result);
        
        // 检查返回数据是否为空或有错误
        if (!res.result) {
          console.warn(`云函数 ${name} 返回数据为空`);
          // 返回一个默认结构，而不是直接reject
          resolve({
            code: -1,
            message: '返回数据为空',
            data: null
          });
          return;
        }
        
        // 检查是否有数据库错误，但仍然返回数据而不是reject
        if (res.result.code === -1) {
          console.error(`云函数 ${name} 返回错误:`, res.result.message);
          // 直接返回错误数据，由业务层处理
          resolve(res.result);
          return;
        }
        
        resolve(res.result);
      },
      fail: err => {
        console.error(`云函数 ${name} 调用失败:`, err);
        
        // 返回错误数据而不是reject，让业务层处理
        resolve({
          code: -1,
          message: '请求失败，请稍后重试',
          error: err
        });
      },
      complete: () => {
        if (showLoading) {
          uni.hideLoading();
        }
      }
    });
  });
}

export default request; 