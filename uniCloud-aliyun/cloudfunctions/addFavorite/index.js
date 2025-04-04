'use strict';

const db = uniCloud.database();
const favoriteCollection = db.collection('favorites');

exports.main = async (event, context) => {
  console.log('收到添加收藏请求:', event);
  
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
    
    // 检查是否已经收藏
    const existingFavorite = await favoriteCollection.where({
      userId: event.userId,
      itemId: event.itemId,
      itemType: event.itemType
    }).get();
    
    console.log('查询现有收藏结果:', existingFavorite);
    
    if (existingFavorite.data && existingFavorite.data.length > 0) {
      console.log('该内容已被收藏:', existingFavorite.data[0]);
      return {
        code: 0,
        message: '该内容已收藏',
        data: existingFavorite.data[0]
      }
    }
    
    // 添加收藏
    const now = Date.now();
    const favoriteData = {
      userId: event.userId,  // 保持一致使用userId字段
      itemId: event.itemId,
      itemType: event.itemType,
      itemTitle: event.itemTitle || '',
      itemCover: event.itemCover || '',
      itemUrl: event.itemUrl || '',
      createTime: now,
      updateTime: now
    };
    
    console.log('准备添加收藏数据:', favoriteData);
    
    const res = await favoriteCollection.add(favoriteData);
    console.log('添加收藏结果:', res);
    
    if (res && res.id) {
      console.log('收藏成功, ID:', res.id);
      return {
        code: 0,
        message: '收藏成功',
        data: {
          _id: res.id,
          ...favoriteData
        }
      }
    } else {
      console.error('收藏失败: 未返回ID');
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