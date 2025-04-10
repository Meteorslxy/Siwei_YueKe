'use strict';
const crypto = require('crypto');
const https = require('https');
const fs = require('fs');
const path = require('path');

// 初始默认配置 - 保留默认值便于开发测试
let config = {
  'mp-weixin': {
    appid: 'wx64b3a851f619fc04',
    secret: 'c5c9c4047bf0c292e28f5019a950b18d'
  }
};

// 获取环境变量函数，用于判断是否在开发环境
function getEnvironment() {
  const envType = process.env.NODE_ENV || 'development';
  const isDev = envType === 'development';
  
  console.log('当前运行环境:', envType);
  
  return {
    isDevelopment: isDev,
    envType
  };
}

// 尝试读取配置文件的函数
function loadConfig() {
  // 首先尝试读取本地配置文件
  try {
    const configPath = path.join(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configData);
      console.log('成功读取本地微信配置文件');
      return true;
    }
  } catch (e) {
    console.error('读取本地配置文件失败:', e.message);
  }
  
  // 尝试读取uni-id配置
  try {
    const uniIdConfigPath = path.resolve(__dirname, '../../common/uni-config-center/uni-id/config.json');
    if (fs.existsSync(uniIdConfigPath)) {
      const uniIdConfig = JSON.parse(fs.readFileSync(uniIdConfigPath, 'utf8'));
      if (uniIdConfig['mp-weixin'] && uniIdConfig['mp-weixin'].oauth && uniIdConfig['mp-weixin'].oauth.weixin) {
        console.log('使用uni-id配置中的微信设置');
        const wxConfig = uniIdConfig['mp-weixin'].oauth.weixin;
        config['mp-weixin'] = {
          appid: wxConfig.appid,
          secret: wxConfig.appsecret || wxConfig.secret || ''
        };
        console.log('获取到AppID:', config['mp-weixin'].appid);
        return true;
      }
    }
  } catch (e) {
    console.error('读取uni-id配置失败:', e.message);
  }
  
  console.warn('未找到有效的微信配置，将检查环境变量');
  
  // 尝试从环境变量读取
  try {
    if (process.env.WX_APPID && process.env.WX_SECRET) {
      console.log('使用环境变量配置, appid:', process.env.WX_APPID);
      config['mp-weixin'] = {
        appid: process.env.WX_APPID,
        secret: process.env.WX_SECRET
      };
      return true;
    }
  } catch (e) {
    console.error('读取环境变量失败:', e.message);
  }
  
  return false;
}

// 加载配置并获取环境信息
const configLoaded = loadConfig();
const { isDevelopment } = getEnvironment();

if (!configLoaded) {
  console.warn('未能成功加载微信配置，可能会影响OpenID获取');
}

/**
 * 生成测试环境下的稳定openid
 */
function generateTestOpenid(code, deviceInfo, uuid, clientIP) {
  // 优先使用设备唯一标识
  let userIdentifier = '';
  
  if (uuid) {
    userIdentifier = 'uuid:' + uuid;
  } else if (deviceInfo) {
    userIdentifier = 'device:' + JSON.stringify(deviceInfo).substring(0, 100);
  } else if (clientIP) {
    userIdentifier = 'ip:' + clientIP;
  } else if (code) {
    // 仅在没有其他标识时使用code
    // 使用整个code来保证同一用户每次生成相同的openid
    userIdentifier = 'code:' + code;
  } else {
    // 如果连code都没有，使用固定值
    userIdentifier = 'fixed:default-test-user';
  }
  
  // 使用MD5生成稳定的哈希值作为openid
  const hash = crypto.createHash('md5').update(userIdentifier).digest('hex');
  const mockOpenid = 'wx_dev_' + hash.substring(0, 16);
  
  console.log('开发环境下生成的测试openid:', mockOpenid, '(基于标识符类型:', userIdentifier.split(':')[0], ')');
  
  return {
    openid: mockOpenid,
    sessionKey: 'test_session_key_' + hash.substring(0, 8),
    mock: true
  };
}

/**
 * 获取微信小程序openid
 * @param {Object} event - 请求参数
 * @param {String} event.code - 微信登录后获取的code
 * @param {String} event.deviceInfo - 设备信息用于稳定openid
 * @param {String} event.uuid - 设备UUID用于稳定openid
 * @returns {Object} - 返回openid等信息
 */
exports.main = async (event, context) => {
  try {
    console.log('获取微信openid函数调用，参数:', event);
    const { PLATFORM = 'mp-weixin', CLIENTIP } = context || {};
    
    const { code, deviceInfo, uuid } = event;
    if (!code) {
      return {
        code: -1,
        msg: '缺少code参数'
      };
    }
    
    // 开发环境始终返回测试openid
    if (isDevelopment) {
      console.log('开发环境模式，返回测试openid');
      const testData = generateTestOpenid(code, deviceInfo, uuid, CLIENTIP);
      
      return {
        code: 0,
        data: testData,
        msg: '开发环境测试openid'
      };
    }
    
    // 生产环境逻辑 - 必须有有效配置
    // 获取配置
    const appid = config['mp-weixin']?.appid;
    const secret = config['mp-weixin']?.secret;
    
    // 检查配置有效性
    if (!appid || !secret) {
      console.error('微信AppID或Secret未配置');
      return {
        code: -1,
        msg: '微信AppID或Secret未配置，请在云函数配置中设置'
      };
    }
    
    if (appid === 'wx64b3a851f619fc04' || appid === 'wxdummyappid' || 
        secret === 'c5c9c4047bf0c292e28f5019a950b18d' || secret === 'dummy-secret-for-testing') {
      console.error('微信AppID或Secret使用了默认测试值，无法在生产环境使用');
      return {
        code: -1,
        msg: '微信AppID或Secret使用了默认测试值，请替换为正式值'
      };
    }
    
    console.log('生产环境使用的AppID:', appid);
    
    // 调用微信接口获取openid
    console.log('调用微信API获取openid，code长度:', code.length);
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    
    // 请求微信接口
    const result = await new Promise((resolve, reject) => {
      console.log('发起微信API请求...');
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            console.log('微信API响应状态码:', res.statusCode);
            const json = JSON.parse(data);
            resolve(json);
          } catch(e) {
            console.error('解析微信API响应失败:', e, '原始数据:', data);
            reject(e);
          }
        });
      }).on('error', (error) => {
        console.error('微信API请求失败:', error);
        reject(error);
      });
    });
    
    console.log('微信API返回结果:', result);
    
    // 处理微信返回的结果
    if (result.errcode) {
      return {
        code: -1,
        msg: '微信获取openid失败: ' + (result.errmsg || `错误码: ${result.errcode}`)
      };
    }
    
    // 检查是否获取到了有效的openid
    if (!result.openid) {
      console.error('微信未返回有效的openid:', result);
      return {
        code: -1,
        msg: '未获取到有效的openid'
      };
    }
    
    // 返回openid和session_key
    return {
      code: 0,
      data: {
        openid: result.openid,
        sessionKey: result.session_key,
        unionid: result.unionid
      },
      msg: '获取成功'
    };
  } catch (err) {
    console.error('获取微信openid异常:', err);
    return {
      code: -1,
      msg: '获取openid失败: ' + (err.message || err)
    };
  }
}; 