const {
  preLoginWithPassword,
  postLogin
} = require('../../lib/utils/login')
const {
  getNeedCaptcha,
  verifyCaptcha
} = require('../../lib/utils/captcha')
const {
  CAPTCHA_SCENE
} = require('../../common/constants')
const {
  ERROR
} = require('../../common/error')

/**
 * 用户名密码登录
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#login
 * @param {Object} params
 * @param {String} params.username    用户名
 * @param {String} params.mobile      手机号
 * @param {String} params.phoneNumber 手机号(兼容)
 * @param {String} params.email       邮箱
 * @param {String} params.identifier  通用标识符（可能是用户名、手机号或其他ID）
 * @param {Object} params.extraInfo   额外辅助信息
 * @param {String} params.password    密码
 * @param {String} params.captcha     图形验证码
 * @param {String} params.loginType   登录类型
 * @returns
 */
module.exports = async function (params = {}) {
  const schema = {
    username: {
      required: false,
      type: 'string'
    },
    mobile: {
      required: false,
      type: 'string'
    },
    phoneNumber: {
      required: false, 
      type: 'string'
    },
    email: {
      required: false,
      type: 'string'
    },
    identifier: {
      required: false,
      type: 'string'
    },
    extraInfo: {
      required: false,
      type: 'object'
    },
    password: 'password',
    captcha: {
      required: false,
      type: 'string'
    },
    loginType: {
      required: false,
      type: 'string'
    }
  }
  this.middleware.validate(params, schema)
  const {
    username,
    mobile,
    email,
    password,
    captcha,
    phoneNumber,
    identifier,
    extraInfo,
    loginType
  } = params
  
  // 构建查询条件
  let userQuery = {}
  
  // 处理标识符登录类型，尝试多种匹配方式
  if (identifier) {
    // 根据extraInfo中的信息确定最可能的查询类型
    const isNumeric = extraInfo?.isNumeric || /^\d+$/.test(identifier)
    const containsSpecial = extraInfo?.containsSpecial || /[@.]/.test(identifier)
    
    // 如果是纯数字，尝试按手机号查询
    if (isNumeric && identifier.length >= 5 && identifier.length <= 11) {
      console.log('使用标识符作为手机号查询:', identifier)
      userQuery = { mobile: identifier }
    } 
    // 如果包含@，可能是邮箱
    else if (containsSpecial && identifier.indexOf('@') > 0) {
      console.log('使用标识符作为邮箱查询:', identifier)
      userQuery = { email: identifier }
    }
    // 其他情况作为用户名查询
    else {
      console.log('使用标识符作为用户名查询:', identifier) 
      userQuery = { username: identifier }
    }
  }
  // 处理已知类型的登录
  else if (loginType === 'mobile-pwd' && phoneNumber) {
    userQuery = { mobile: phoneNumber }
  } else if (username) {
    userQuery = { username }
  } else if (mobile) {
    userQuery = { mobile }
  } else if (email) {
    userQuery = { email }
  } else if (phoneNumber) {
    // 兼容其他地方使用phoneNumber作为手机号参数
    userQuery = { mobile: phoneNumber }
  } else {
    throw {
      errCode: ERROR.INVALID_USERNAME
    }
  }
  
  const needCaptcha = await getNeedCaptcha.call(this, userQuery)
  if (needCaptcha) {
    await verifyCaptcha.call(this, {
      captcha,
      scene: CAPTCHA_SCENE.LOGIN_BY_PWD
    })
  }
  
  console.log('uni-id-co登录，查询条件:', JSON.stringify(userQuery))
  
  try {
    const {
      user,
      extraData
    } = await preLoginWithPassword.call(this, {
      user: userQuery,
      password
    })
    
    return postLogin.call(this, {
      user,
      extraData
    })
  } catch (err) {
    // 增强错误信息
    console.error('登录失败，详细错误:', JSON.stringify(err));
    
    // 确保错误信息包含详细信息
    if (err.errCode === ERROR.ACCOUNT_NOT_EXISTS || err.errCode === ERROR.ACCOUNT_NOT_EXISTS_IN_CURRENT_APP) {
      console.log('账号不存在，用户查询条件:', JSON.stringify(userQuery));
      
      // 如果没有详细信息，添加基本信息
      if (!err.details) {
        err.details = {
          query: userQuery
        };
      }
      
      // 添加手机号信息
      if (userQuery.mobile && !err.mobile) {
        err.mobile = userQuery.mobile;
      }
    }
    
    // 重新抛出错误
    throw err;
  }
}
