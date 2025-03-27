'use strict';

const db = uniCloud.database();
const favoriteCollection = db.collection('favorites');

exports.main = async (event, context) => {
  // 检查参数
  if (!event.favoriteId) {
    return {
      code: -1,
      message: '收藏ID不能为空'
    }
  }
  
  try {
    // 删除收藏
    const res = await favoriteCollection.doc(event.favoriteId).remove();
    
    if (res && res.deleted) {
      return {
        code: 0,
        message: '取消收藏成功',
        deleted: res.deleted
      }
    } else {
      return {
        code: -1,
        message: '取消收藏失败'
      }
    }
  } catch (e) {
    console.error('取消收藏失败:', e);
    return {
      code: -1,
      message: '系统错误',
      error: e.message
    }
  }
}; 