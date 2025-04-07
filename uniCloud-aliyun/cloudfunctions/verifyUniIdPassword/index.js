'use strict';
const crypto = require('crypto');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('验证密码参数:', event);
  
  const { password, passwordHash } = event;
  
  if (!password || !passwordHash) {
    return {
      code: -1,
      success: false,
      message: '缺少必要参数'
    };
  }
  
  try {
    const isValid = verifyPassword(password, passwordHash);
    
    return {
      code: 0,
      success: isValid,
      message: isValid ? '密码验证成功' : '密码验证失败'
    };
  } catch (err) {
    console.error('验证密码出错:', err);
    return {
      code: -1,
      success: false,
      message: '验证密码出错: ' + err.message
    };
  }
};

/**
 * 验证密码
 * @param {String} password 待验证的密码
 * @param {String} passwordHash 数据库中存储的密码哈希
 * @returns {Boolean}
 */
function verifyPassword(password, passwordHash) {
  console.log('验证密码:', { password: '***' });
  
  // 处理非uni-id格式的密码
  if (!passwordHash.startsWith('$')) {
    // 对于普通的SHA256密码
    return crypto.createHash('sha256').update(password).digest('hex') === passwordHash;
  }
  
  // 处理uni-id格式的密码
  const [, algorithmKey = '', cost = 0, hashStr = ''] = passwordHash.split('$');
  
  console.log('解析密码格式:', { algorithmKey, cost });
  
  // 目前支持的算法
  if (algorithmKey === 'UNI_ID_HMAC_SHA1') {
    // 无法在这个简单云函数中验证，因为需要密钥
    return false;
  } else if (algorithmKey === 'UNI_ID_HMAC_SHA256') {
    const salt = hashStr.substring(0, Number(cost));
    const hash = hashStr.substring(Number(cost));
    
    console.log('SHA256参数:', { salt: salt, hashLength: hash.length });
    
    // 使用相同的盐和算法计算哈希
    const calculatedHash = crypto.createHmac('sha256', salt).update(password).digest('hex');
    
    return calculatedHash === hash;
  }
  
  // 不支持的算法
  console.log('不支持的密码算法:', algorithmKey);
  return false;
} 