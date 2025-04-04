'use strict';

const db = uniCloud.database();
const favoriteCollection = db.collection('favorites');

exports.main = async (event, context) => {
  console.log('收到检查收藏状态请求:', event);
  
  // 检查参数
  if (!event.userId || !event.itemId || !event.itemType) {
    console.error('参数不完整:', event);
    return {
      code: -1,
      message: '参数不完整'
    }
  }
  
  try {
    // 记录用户ID，用于调试
    console.log('用户ID(userId):', event.userId);
    console.log('项目ID:', event.itemId, '项目类型:', event.itemType);
    
    // 检查是否已经收藏
    const existingFavorite = await favoriteCollection.where({
      userId: event.userId,
      itemId: event.itemId,
      itemType: event.itemType
    }).get();
    
    console.log('查询结果:', existingFavorite);
    
    if (existingFavorite.data && existingFavorite.data.length > 0) {
      console.log('该内容已被收藏:', existingFavorite.data[0]);
      return {
        code: 0,
        message: '已收藏',
        data: existingFavorite.data[0],
        isFavorite: true
      }
    } else {
      console.log('该内容未被收藏');
      return {
        code: 0,
        message: '未收藏',
        data: null,
        isFavorite: false
      }
    }
  } catch (e) {
    console.error('检查收藏状态失败:', e);
    return {
      code: -1,
      message: '系统错误',
      error: e.message
    }
  }
}; 