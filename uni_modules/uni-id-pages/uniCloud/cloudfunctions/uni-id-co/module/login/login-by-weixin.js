const {
  initWeixin
} = require('../../lib/third-party/index')
const {
  ERROR
} = require('../../common/error')
const {
  preUnifiedLogin,
  postUnifiedLogin
} = require('../../lib/utils/unified-login')
const {
  generateWeixinCache,
  getWeixinPlatform,
  saveWeixinUserKey,
  saveSecureNetworkCache
} = require('../../lib/utils/weixin')
const {
  LOG_TYPE
} = require('../../common/constants')
const url = require('url')

/**
 * 微信登录
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#login-by-weixin
 * @param {Object} params
 * @param {String} params.code          微信登录返回的code
 * @param {String} params.platform      客户端类型：mp-weixin、app-plus、h5、web
 * @param {String} params.inviteCode    邀请码
 * @param {Object} params.userInfo      微信用户信息，包含昵称和头像(可选)
 * @returns
 */
module.exports = async function (params = {}) {
  const schema = {
    code: 'string',
    platform: {
      type: 'string',
      required: true
    },
    inviteCode: {
      type: 'string',
      required: false
    },
    userInfo: {
      type: 'object',
      required: false,
      properties: {
        nickName: {
          type: 'string',
          required: false
        },
        avatarUrl: {
          type: 'string',
          required: false
        }
      }
    }
  }
  this.middleware.validate(params, schema)
  const {
    code,
    platform,
    inviteCode,
    myInviteCode, // 邀请码
    userInfo = {},
    // 内部参数，暂不暴露
    secureNetworkCache = false
  } = params
  const {
    appId
  } = this.getUniversalClientInfo()
  const weixinApi = initWeixin.call(this)
  const weixinPlatform = getWeixinPlatform.call(this)
  let apiName
  switch (weixinPlatform) {
    case 'mp':
      apiName = 'code2Session'
      break
    case 'app':
    case 'h5':
    case 'web':
      apiName = 'getOauthAccessToken'
      break
    default:
      throw new Error('Unsupported weixin platform')
  }
  let getWeixinAccountResult
  try {
    getWeixinAccountResult = await weixinApi[apiName](code)
  } catch (error) {
    console.error(error)
    await this.middleware.uniIdLog({
      success: false,
      type: LOG_TYPE.LOGIN
    })
    throw {
      errCode: ERROR.GET_THIRD_PARTY_ACCOUNT_FAILED
    }
  }

  const {
    openid,
    unionid,
    // 保存下面四个字段
    sessionKey, // 微信小程序用户sessionKey
    accessToken, // App端微信用户accessToken
    refreshToken, // App端微信用户refreshToken
    expired: accessTokenExpired // App端微信用户accessToken过期时间
  } = getWeixinAccountResult

  if (secureNetworkCache) {
    if (weixinPlatform !== 'mp') {
      throw new Error('Unsupported weixin platform, expect mp-weixin')
    }
    await saveSecureNetworkCache.call(this, {
      code,
      openid,
      unionid,
      sessionKey
    })
  }

  const {
    type,
    user
  } = await preUnifiedLogin.call(this, {
    user: {
      wx_openid: {
        [weixinPlatform]: openid
      },
      wx_unionid: unionid
    }
  })
  
  const extraData = {
    wx_openid: {
      [`${weixinPlatform}_${appId}`]: openid
    },
    wx_unionid: unionid
  }
  
  // 处理微信用户信息 - 获取或使用传入的用户信息
  let nickname = '';
  let avatar = '';
  
  // 如果是注册新用户并且在非小程序端，从微信API获取用户信息
  if (type === 'register' && weixinPlatform !== 'mp') {
    try {
      const wxUserInfo = await weixinApi.getUserInfo({
        accessToken,
        openid
      });
      nickname = wxUserInfo.nickname;
      avatar = wxUserInfo.avatar;
    } catch (error) {
      console.error('从微信API获取用户信息失败:', error);
    }
  }
  
  // 使用传入的用户信息(优先级高于API获取的信息)
  if (userInfo && userInfo.nickName) {
    nickname = userInfo.nickName;
    console.log('使用传入的微信昵称:', nickname);
  }
  
  if (userInfo && userInfo.avatarUrl) {
    avatar = userInfo.avatarUrl;
    console.log('使用传入的微信头像:', avatar);
  }
  
  // 保存用户信息到extraData
  if (nickname) {
    // 只存储到wx_nickname字段，不更新nickname
    extraData.wx_nickname = nickname;
    
    // 如果是注册新用户，则使用临时昵称
    if (type === 'register') {
      extraData.nickname = '微信用户';
    }
  }
  
  if (avatar) {
    // 保存头像URL
    extraData.avatar = avatar;
    
    // 如果提供了可用的头像URL，下载并上传到云存储
    try {
      // eslint-disable-next-line n/no-deprecated-api
      const avatarPath = url.parse(avatar).pathname;
      const extName = avatarPath.indexOf('.') > -1 ? url.parse(avatar).pathname.split('.').pop() : 'jpg';
      const cloudPath = `user/avatar/${openid.slice(-8) + Date.now()}-avatar.${extName}`;
      const getAvatarRes = await uniCloud.httpclient.request(avatar);
      
      if (getAvatarRes.status >= 400) {
        console.error('获取头像失败, 状态码:', getAvatarRes.status);
      } else {
        const { fileID } = await uniCloud.uploadFile({
          cloudPath,
          fileContent: getAvatarRes.data
        });
        
        extraData.avatar_file = {
          name: cloudPath,
          extname: extName,
          url: fileID
        };
        console.log('成功上传头像到云存储');
      }
    } catch (error) {
      console.error('处理用户头像时出错:', error);
    }
  }
  
  // 如果是更新用户信息的情况
  if (type === 'login' && (nickname || avatar)) {
    // 仅当用户之前没有设置昵称或头像时，才使用微信的昵称和头像
    const userRecord = await this.getUserInfo({
      uid: user._id
    })
    
    const updateData = {}
    
    // 如果用户没有昵称，使用临时昵称，等用户设置真实姓名
    if (!userRecord.nickname || userRecord.nickname === '') {
      updateData.nickname = '微信用户';
    }
    
    // 无论如何都更新wx_nickname字段，保存最新的微信昵称
    if (nickname) {
      updateData.wx_nickname = nickname;
    }
    
    // 如果用户没有头像但有微信头像，则更新头像
    if (avatar && (!userRecord.avatar || userRecord.avatar === '')) {
      updateData.avatar = avatar;
    }
    
    // 如果有需要更新的数据，则执行更新
    if (Object.keys(updateData).length > 0) {
      await this.updateUser({
        uid: user._id,
        ...updateData
      })
    }
  }
  
  await saveWeixinUserKey.call(this, {
    openid,
    sessionKey,
    accessToken,
    refreshToken,
    accessTokenExpired
  })
  
  return postUnifiedLogin.call(this, {
    user,
    extraData: {
      ...extraData,
      ...generateWeixinCache.call(this, {
        openid,
        sessionKey, // 微信小程序用户sessionKey
        accessToken, // App端微信用户accessToken
        refreshToken, // App端微信用户refreshToken
        accessTokenExpired // App端微信用户accessToken过期时间
      })
    },
    isThirdParty: true,
    type,
    inviteCode
  })
}
