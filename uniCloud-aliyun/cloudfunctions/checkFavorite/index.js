'use strict';

const db = uniCloud.database();
const favoriteCollection = db.collection('favorites');

exports.main = async (event, context) => {
  // 检查参数
  if (!event.userId || !event.itemId || !event.itemType) {
    return {
      code: -1,
      message: '参数不完整'
    }
  }
  
  try {
    // 检查是否已经收藏
    const existingFavorite = await favoriteCollection.where({
      userId: event.userId,
      itemId: event.itemId,
      itemType: event.itemType
    }).get();
    
    if (existingFavorite.data && existingFavorite.data.length > 0) {
      return {
        code: 0,
        message: '已收藏',
        data: existingFavorite.data[0],
        isFavorite: true
      }
    } else {
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