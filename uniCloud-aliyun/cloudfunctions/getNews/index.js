// 云函数入口文件
const cloud = require('wx-server-sdk')
const config = require('../config')

cloud.init({
  env: config.env
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { limit = 10 } = event
  
  try {
    // 获取最新的资讯数据
    const result = await db.collection(config.collections.news)
      .orderBy('publishTime', 'desc') // 按发布时间倒序
      .limit(limit)
      .get()
    
    return {
      success: true,
      data: result.data
    }
  } catch (err) {
    return {
      success: false,
      errMsg: err.message || '获取资讯数据失败'
    }
  }
} 