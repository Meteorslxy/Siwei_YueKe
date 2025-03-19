// 云函数入口文件
const cloud = require('wx-server-sdk')
const config = require('../config')

cloud.init({
  env: config.env
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const appid = wxContext.APPID
  const unionid = wxContext.UNIONID || ''
  
  // 用户信息
  const { userInfo = {} } = event
  
  try {
    // 查询用户是否已存在
    const userResult = await db.collection(config.collections.users)
      .where({
        openid
      })
      .get()
    
    let userId
    
    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，更新用户信息
      const existUser = userResult.data[0]
      userId = existUser._id
      
      // 更新用户信息
      if (Object.keys(userInfo).length > 0) {
        await db.collection(config.collections.users)
          .doc(userId)
          .update({
            data: {
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              gender: userInfo.gender,
              country: userInfo.country,
              province: userInfo.province,
              city: userInfo.city,
              language: userInfo.language,
              lastLoginTime: db.serverDate()
            }
          })
      } else {
        // 仅更新登录时间
        await db.collection(config.collections.users)
          .doc(userId)
          .update({
            data: {
              lastLoginTime: db.serverDate()
            }
          })
      }
    } else {
      // 用户不存在，创建新用户
      const newUser = {
        openid,
        appid,
        unionid,
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0,
        country: userInfo.country || '',
        province: userInfo.province || '',
        city: userInfo.city || '',
        language: userInfo.language || 'zh_CN',
        createTime: db.serverDate(),
        lastLoginTime: db.serverDate()
      }
      
      const result = await db.collection(config.collections.users)
        .add({
          data: newUser
        })
      
      userId = result._id
    }
    
    return {
      success: true,
      userId
    }
  } catch (err) {
    console.error('登录失败:', err)
    return {
      success: false,
      message: err.message || '登录失败'
    }
  }
} 