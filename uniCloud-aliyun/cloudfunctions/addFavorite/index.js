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
        message: '该内容已收藏',
        data: existingFavorite.data[0]
      }
    }
    
    // 添加收藏
    const now = Date.now();
    const favoriteData = {
      userId: event.userId,
      itemId: event.itemId,
      itemType: event.itemType,
      itemTitle: event.itemTitle || '',
      itemCover: event.itemCover || '',
      itemUrl: event.itemUrl || '',
      createTime: now,
      updateTime: now
    };
    
    const res = await favoriteCollection.add(favoriteData);
    
    if (res && res.id) {
      return {
        code: 0,
        message: '收藏成功',
        data: {
          _id: res.id,
          ...favoriteData
        }
      }
    } else {
      return {
        code: -1,
        message: '收藏失败'
      }
    }
  } catch (e) {
    console.error('收藏失败:', e);
    return {
      code: -1,
      message: '系统错误',
      error: e.message
    }
  }
}; 