/**
 * 云函数请求封装
 * @param {Object} options
 * @param {String} options.name 云函数名称
 * @param {Object} options.data 请求参数
 * @param {Boolean} options.showLoading 是否显示加载提示
 * @param {Number} options.timeout 请求超时时间（毫秒），默认30000ms
 */
function request(options = {}) {
  const { name, data = {}, showLoading = true, timeout = 30000 } = options;
  
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
    
    // 获取可用的云函数调用对象
    let cloudObj = null;
    
    // 检查微信小程序环境
    // #ifdef MP-WEIXIN
    console.log('当前运行环境: 微信小程序');
    
    // 优先使用uniCloud而不是uni.cloud
    cloudObj = (typeof uniCloud !== 'undefined' && uniCloud) ? uniCloud : 
               (typeof uni !== 'undefined' && uni.cloud) ? uni.cloud : null;
    
    if (!cloudObj) {
      console.error('云函数对象不可用，无法调用云函数');
      
      if (showLoading) {
        uni.hideLoading();
      }
      
      // 返回错误
      return resolve({
        code: -501001,
        message: '云服务不可用，请检查网络或重新登录',
        data: null
      });
    } else {
      console.log('云函数调用对象已准备就绪:', cloudObj === uniCloud ? 'uniCloud' : 'uni.cloud');
    }
    // #endif
    
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
    
    // 非微信环境默认使用uniCloud
    // #ifndef MP-WEIXIN
    cloudObj = uniCloud;
    // #endif
    
    // 处理超时的定时器
    let timeoutTimer = null;
    if (timeout > 0) {
      timeoutTimer = setTimeout(() => {
        console.warn(`云函数 ${name} 调用超时（${timeout}ms）`);
        if (showLoading) {
          uni.hideLoading();
        }
        
        // 如果是课程详情请求且是从内存或缓存中获取
        if (name === 'getCourseDetail' && data && data.courseId) {
          // 尝试从本地获取缓存数据
          try {
            const cachedKey = `course_${data.courseId}`;
            const cachedData = uni.getStorageSync(cachedKey);
            
            if (cachedData) {
              console.log(`从缓存中获取课程详情数据: ${cachedKey}`);
              return resolve({
                code: 0,
                message: '从缓存获取成功',
                data: JSON.parse(cachedData),
                fromCache: true
              });
            }
          } catch (e) {
            console.error('读取缓存失败:', e);
          }
        }
        
        resolve({
          code: -1,
          message: `请求超时（${timeout / 1000}秒）`,
          error: new Error(`[${name}]: 请求云函数超时`)
        });
      }, timeout);
    }
    
    // 使用uniCloud调用云函数
    cloudObj.callFunction({
      name,
      data,
      success: res => {
        // 清除超时定时器
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
          timeoutTimer = null;
        }
        
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
        
        // 如果是课程详情请求且成功获取数据，则缓存结果
        if (name === 'getCourseDetail' && res.result.data && data && data.courseId) {
          try {
            const cachedKey = `course_${data.courseId}`;
            uni.setStorageSync(cachedKey, JSON.stringify(res.result.data));
            console.log(`课程详情数据已缓存: ${cachedKey}`);
          } catch (e) {
            console.error('缓存课程详情数据失败:', e);
          }
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
        // 清除超时定时器
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
          timeoutTimer = null;
        }
        
        console.error(`云函数 ${name} 调用失败:`, err);
        
        // 记录更详细的错误信息以便调试
        let errorMsg = '未知错误';
        let errorCode = -1;
        
        // 解析具体错误类型
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
        
        console.error(`[云函数错误] 代码: ${errorCode}, 消息: ${errorMsg}`);
        
        // 返回错误数据而不是reject，让业务层处理
        resolve({
          code: errorCode,
          message: errorMsg,
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