'use strict';

// 引入UniCloud模块
const uniCloud = require('unicloud-aliyun');
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
    
    const { access_token } = event;
    
    // 检查参数
    if (!access_token) {
      console.error('缺少access_token参数');
      return {
        code: -1,
        message: '缺少access_token参数'
      };
    }
    
    // 获取客户端平台类型
    const { PLATFORM } = context;
    console.log('当前平台:', PLATFORM);
    
    // 微信小程序平台处理方式
    if (PLATFORM === 'mp-weixin') {
      try {
        console.log('微信小程序获取手机号');
        
        // 调用微信云函数获取手机号
        const wxContext = uniCloud.getWXContext();
        
        // 通过code获取手机号
        const res = await uniCloud.httpclient.request(
          'https://api.weixin.qq.com/wxa/business/getuserphonenumber',
          {
            method: 'POST',
            dataType: 'json',
            data: {
              code: access_token
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('微信获取手机号结果:', res);
        
        if (res.data && res.data.errcode === 0 && res.data.phone_info && res.data.phone_info.phoneNumber) {
          // 获取成功，返回手机号
          return {
            code: 0,
            message: '获取手机号成功',
            phoneNumber: res.data.phone_info.phoneNumber
          };
        } else {
          // 获取失败
          return {
            code: -1,
            message: `获取手机号失败: ${res.data.errmsg || JSON.stringify(res.data)}`
          };
        }
      } catch (error) {
        console.error('微信获取手机号异常:', error);
        return {
          code: -1,
          message: '获取手机号失败: ' + (error.message || JSON.stringify(error))
        };
      }
    }
    // APP端一键登录处理方式
    else {
      // 调用云平台获取手机号API
      try {
        const res = await uniCloud.getPhoneNumber({
          access_token: access_token
        });
        
        console.log('获取手机号结果:', res);
        
        if (res && res.code === 0 && res.phoneNumber) {
          // 获取成功，返回手机号
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
        console.error('获取手机号异常:', error);
        return {
          code: -1,
          message: '获取手机号失败: ' + (error.message || error)
        };
      }
    }
  } catch (err) {
    console.error('getPhoneNumber函数异常:', err);
    return {
      code: -1,
      message: '系统异常: ' + (err.message || err)
    };
  }
}; 