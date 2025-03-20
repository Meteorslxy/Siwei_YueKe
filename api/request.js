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
    if (typeof uniCloud === 'undefined') {
      console.error('uniCloud对象不存在，云函数调用失败');
      uni.showToast({
        title: '云服务不可用',
        icon: 'none'
      });
      if (showLoading) {
        uni.hideLoading();
      }
      return reject(new Error('uniCloud对象不存在'));
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
          uni.showToast({
            title: '数据获取失败',
            icon: 'none'
          });
          return reject(new Error('云函数返回数据为空'));
        }
        
        // 检查是否有数据库错误
        if (res.result.code === -1) {
          console.error(`云函数 ${name} 返回错误:`, res.result.message);
          uni.showToast({
            title: res.result.message || '数据获取失败',
            icon: 'none'
          });
          return reject(new Error(res.result.message || '数据获取失败'));
        }
        
        resolve(res.result);
      },
      fail: err => {
        console.error(`云函数 ${name} 调用失败:`, err);
        
        uni.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none'
        });
        reject(err);
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