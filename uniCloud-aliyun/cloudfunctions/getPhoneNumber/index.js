'use strict';

// 使用全局的uniCloud对象
// const uniCloud = require('unicloud-aliyun'); -- 这行删除
const db = uniCloud.database();

/**
 * 获取手机号码
 * 通过一键登录access_token获取手机号
 * @param {Object} event - 请求参数
 * @param {String} event.access_token - 微信获取手机号的code或一键登录获取的access_token
 * @returns {Object} - 返回手机号码或错误信息
 */
exports.main = async (event, context) => {
  try {
    console.log('getPhoneNumber 函数调用，参数:', event);
    
    // 获取请求参数
    const { access_token } = event;
    
    // 检查参数
    if (!access_token) {
      console.error('缺少参数');
      return {
        code: -1,
        message: '缺少参数'
      };
    }
    
    // 获取客户端平台类型
    const { PLATFORM } = context;
    console.log('当前平台:', PLATFORM);
    
    // 微信小程序平台处理方式
    if (PLATFORM === 'mp-weixin') {
      try {
        console.log('微信小程序获取手机号，code:', access_token);
        
        // 请求微信接口获取用户手机号
        // 1. 获取小程序access_token - 增加超时时间和重试逻辑
        const tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token';
        const appid = 'wxba8e830214e74736'; // 使用实际的小程序appid
        const secret = '4f390bcd66b272f886c8935af558c74d'; // 使用实际的小程序secret
        
        // 定义重试函数
        const getTokenWithRetry = async (retryCount = 3, timeout = 10000) => {
          let lastError = null;
          
          for(let i = 0; i < retryCount; i++) {
            try {
              console.log(`尝试获取access_token，第${i+1}次尝试，超时设置: ${timeout}ms`);
              
              const tokenRes = await uniCloud.httpclient.request(tokenUrl, {
                method: 'GET',
                data: {
                  grant_type: 'client_credential',
                  appid: appid,
                  secret: secret
                },
                dataType: 'json',
                timeout: timeout // 增加超时时间
              });
              
              console.log('获取access_token结果:', JSON.stringify(tokenRes.data));
              
              if (tokenRes.data && tokenRes.data.access_token) {
                return tokenRes.data.access_token;
              } else {
                throw new Error(`获取失败: ${JSON.stringify(tokenRes.data)}`);
              }
            } catch (error) {
              console.error(`第${i+1}次获取access_token失败:`, error);
              lastError = error;
              
              // 最后一次尝试失败，直接抛出错误
              if (i === retryCount - 1) {
                throw lastError;
              }
              
              // 等待一段时间再重试
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        };
        
        // 使用重试机制获取token
        const wx_access_token = await getTokenWithRetry();
        
        if (!wx_access_token) {
          return {
            code: -1,
            message: '获取微信access_token失败，请重试'
          };
        }
        
        // 2. 使用access_token获取手机号 - 同样增加超时和重试
        const getPhoneWithRetry = async (token, code, retryCount = 2, timeout = 10000) => {
          const phoneUrl = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${token}`;
          let lastError = null;
          
          for(let i = 0; i < retryCount; i++) {
            try {
              console.log(`尝试获取手机号，第${i+1}次尝试，超时设置: ${timeout}ms`);
              
              const phoneRes = await uniCloud.httpclient.request(phoneUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                  code: code
                }),
                dataType: 'json',
                timeout: timeout // 增加超时时间
              });
              
              console.log('微信API返回状态:', phoneRes.status);
              console.log('微信API返回数据:', JSON.stringify(phoneRes.data));
              
              // 判断是否成功获取手机号
              if (phoneRes.status === 200 && phoneRes.data && phoneRes.data.errcode === 0 && 
                  phoneRes.data.phone_info && phoneRes.data.phone_info.phoneNumber) {
                return phoneRes.data.phone_info.phoneNumber;
              } else {
                throw new Error(phoneRes.data ? 
                  `错误码: ${phoneRes.data.errcode}, 错误信息: ${phoneRes.data.errmsg || '未知错误'}` : 
                  '未能获取到有效数据');
              }
            } catch (error) {
              console.error(`第${i+1}次获取手机号失败:`, error);
              lastError = error;
              
              // 最后一次尝试失败，直接抛出错误
              if (i === retryCount - 1) {
                throw lastError;
              }
              
              // 等待一段时间再重试
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        };
        
        // 使用重试机制获取手机号
        const phoneNumber = await getPhoneWithRetry(wx_access_token, access_token);
        
        if (phoneNumber) {
          return {
            code: 0,
            message: '获取手机号成功',
            phoneNumber: phoneNumber
          };
        } else {
          return {
            code: -1,
            message: '获取手机号失败，请重试'
          };
        }
      } catch (error) {
        console.error('微信获取手机号异常:', error);
        return {
          code: -1,
          message: '获取手机号异常: ' + (error.message || JSON.stringify(error))
        };
      }
    } 
    // APP端一键登录处理
    else {
      try {
        console.log('APP端一键登录获取手机号');
        
        // 调用uniCloud平台API获取手机号
        const res = await uniCloud.getPhoneNumber({
          access_token: access_token
        });
        
        console.log('一键登录获取手机号结果:', res);
        
        if (res && res.code === 0 && res.phoneNumber) {
          // 获取成功
          return {
            code: 0,
            message: '获取手机号成功',
            phoneNumber: res.phoneNumber
          };
        } else {
          // 获取失败
          return {
            code: -1,
            message: res.message || '获取手机号失败'
          };
        }
      } catch (error) {
        console.error('一键登录获取手机号异常:', error);
        return {
          code: -1,
          message: '获取手机号异常: ' + (error.message || JSON.stringify(error))
        };
      }
    }
  } catch (err) {
    console.error('getPhoneNumber函数执行异常:', err);
    return {
      code: -1,
      message: '系统异常: ' + (err.message || JSON.stringify(err))
    };
  }
}; 