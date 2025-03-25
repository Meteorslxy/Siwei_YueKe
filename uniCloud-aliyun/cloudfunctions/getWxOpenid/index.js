'use strict';
const crypto = require('crypto');
const https = require('https');
const fs = require('fs');
const path = require('path');

// 尝试读取本地配置文件
let config = {
  'mp-weixin': {
    appid: '',
    secret: ''
  }
};

try {
  const configPath = path.join(__dirname, 'config.json');
  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configData);
  }
} catch (e) {
  console.error('读取配置文件失败:', e);
}

/**
 * 获取微信小程序openid
 * @param {Object} event - 请求参数
 * @param {String} event.code - 微信登录后获取的code
 * @returns {Object} - 返回openid等信息
 */
exports.main = async (event, context) => {
  try {
    console.log('获取微信openid函数调用，参数:', event);
    const { PLATFORM } = context;
    
    const { code } = event;
    if (!code) {
      return {
        code: -1,
        msg: '缺少code参数'
      };
    }
    
    // 小程序appid和appsecret
    // 从配置文件获取
    const appid = config['mp-weixin']?.appid || 'wxdummyappid';
    const secret = config['mp-weixin']?.secret || 'dummy-secret-for-testing';
    
    console.log('使用的AppID:', appid);
    
    // 微信开发工具中可以模拟返回
    if (PLATFORM === 'mp-weixin' && appid === 'wxdummyappid') {
      console.log('开发环境中使用模拟数据');
      
      // 返回模拟数据
      return {
        code: 0,
        data: {
          openid: 'wx_' + Math.random().toString(36).substr(2, 10),
          sessionKey: 'simulated_session_key'
        },
        msg: '模拟数据'
      };
    }
    
    // 获取openid
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    
    // 请求微信接口
    const result = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch(e) {
            reject(e);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
    
    console.log('微信返回结果:', result);
    
    // 处理微信返回的结果
    if (result.errcode) {
      return {
        code: result.errcode,
        msg: result.errmsg || '微信获取openid失败'
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