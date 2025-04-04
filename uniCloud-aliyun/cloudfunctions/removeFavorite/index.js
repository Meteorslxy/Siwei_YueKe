'use strict';

const db = uniCloud.database();
const favoriteCollection = db.collection('favorites');

exports.main = async (event, context) => {
  console.log('收到取消收藏请求:', event);
  
  // 检查参数
  if (!event.favoriteId) {
    console.error('收藏ID不能为空');
    return {
      code: -1,
      message: '收藏ID不能为空'
    }
  }
  
  try {
    console.log('准备删除收藏ID:', event.favoriteId);
    
    // 删除收藏
    const res = await favoriteCollection.doc(event.favoriteId).remove();
    console.log('删除收藏结果:', res);
    
    if (res && res.deleted) {
      console.log('取消收藏成功, 删除数量:', res.deleted);
      return {
        code: 0,
        message: '取消收藏成功',
        deleted: res.deleted
      }
    } else {
      console.error('取消收藏失败: 未删除任何记录');
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