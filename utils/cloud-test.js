/**
 * 云函数连接测试工具
 * 用于测试云服务连接
 */

/**
 * 测试云函数连接
 * @param {String} functionName 云函数名称，默认为yuekeCloudTest
 * @param {Object} data 测试数据
 * @returns {Promise} 测试结果Promise
 */
export function testCloudConnection(functionName = 'yuekeCloudTest', data = { message: '连接测试' }) {
  // 获取可用的云函数对象
  const cloudObj = typeof uniCloud !== 'undefined' ? uniCloud : 
                   (typeof uni !== 'undefined' && uni.cloud) ? uni.cloud : null;
  
  if (!cloudObj) {
    console.error('云服务对象不可用，无法测试连接');
    return Promise.reject(new Error('云服务对象不可用'));
  }
  
  console.log(`正在测试云函数[${functionName}]连接...`);
  
  return new Promise((resolve, reject) => {
    cloudObj.callFunction({
      name: functionName,
      data
    }).then(res => {
      console.log('云函数连接测试成功:', res.result);
      resolve({
        success: true,
        result: res.result,
        message: '云服务连接正常'
      });
    }).catch(err => {
      console.error('云函数连接测试失败:', err);
      
      // 解析错误信息
      let errorMsg = '未知错误';
      let errorCode = -1;
      
      if (err.errCode) {
        errorCode = err.errCode;
        switch(err.errCode) {
          case -501004:
            errorMsg = '云函数不存在或执行出错';
            break;
          case -403009:
            errorMsg = '没有访问权限';
            break;
          case -501001:
            errorMsg = '云服务未开通或已到期';
            break;
          default:
            errorMsg = err.errMsg || '调用失败';
        }
      } else if (err.errMsg) {
        errorMsg = err.errMsg;
      }
      
      reject({
        success: false,
        code: errorCode,
        message: errorMsg,
        error: err
      });
    });
  });
}

/**
 * 显示云服务连接状态
 * 在界面上显示云服务连接测试结果
 */
export function showCloudConnectionStatus() {
  uni.showLoading({
    title: '检测云服务...',
    mask: true
  });
  
  testCloudConnection()
    .then(res => {
      uni.hideLoading();
      uni.showToast({
        title: '云服务连接正常',
        icon: 'success',
        duration: 2000
      });
    })
    .catch(err => {
      uni.hideLoading();
      uni.showModal({
        title: '云服务连接异常',
        content: `错误: ${err.message}`,
        showCancel: false
      });
    });
} 