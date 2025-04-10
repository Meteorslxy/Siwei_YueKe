/**
 * 云服务配置文件
 * 集中管理云服务配置，便于维护
 */

// 阿里云服务空间配置
export const cloudConfig = {
  provider: 'aliyun',
  spaceId: 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29',
  clientSecret: 'c3DWEyYRkArWA6mZ2b+gxQ==',
  endpoint: 'https://api.next.bspapp.com'
};

/**
 * 初始化云服务
 * 确保在各个平台上都能正确初始化云服务
 */
export function initCloudService() {
  if (typeof uniCloud === 'undefined') {
    console.error('uniCloud对象不存在，无法初始化云服务');
    return false;
  }
  
  try {
    console.log('正在初始化云服务...');
    
    // 检查是否已在开发者工具调试环境
    const accountInfo = uni.getAccountInfoSync ? uni.getAccountInfoSync() : null;
    const isRelease = accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.envVersion === 'release';
    
    if (isRelease) {
      console.log('当前为正式发布环境，使用标准初始化');
    }
    
    // 初始化阿里云服务
    uniCloud.init({
      provider: cloudConfig.provider,
      spaceId: cloudConfig.spaceId,
      clientSecret: cloudConfig.clientSecret,
      endpoint: cloudConfig.endpoint
    });
    
    // 微信小程序环境特殊处理
    // #ifdef MP-WEIXIN
    if (typeof uni !== 'undefined' && uni) {
      if (!uni.cloud) {
        uni.cloud = {};
        uni.cloud.init = uniCloud.init;
        uni.cloud.callFunction = uniCloud.callFunction;
      }
    }
    // #endif
    
    console.log('云服务初始化成功');
    return true;
  } catch (error) {
    console.error('云服务初始化失败:', error);
    return false;
  }
} 