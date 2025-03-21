'use strict';

/**
 * 从数据库中删除图片
 * @param {Object} event - 请求参数
 * @param {String} event.imageId - 要删除的图片ID
 * @returns {Object} 删除结果
 */
exports.main = async (event, context) => {
  console.log('删除图片云函数被调用，参数:', event);
  
  try {
    const { imageId } = event;
    
    if (!imageId) {
      console.error('缺少图片ID参数');
      return {
        code: -1,
        success: false,
        message: '缺少图片ID参数'
      };
    }
    
    // 获取数据库引用
    const db = uniCloud.database();
    
    // 从数据库中删除图片记录
    const deleteResult = await db.collection('images').doc(imageId).remove();
    
    if (deleteResult.deleted === 1) {
      console.log('图片删除成功:', imageId);
      return {
        code: 0,
        success: true,
        message: '图片删除成功'
      };
    } else {
      console.error('图片删除失败，可能不存在该记录');
      return {
        code: -1,
        success: false,
        message: '图片删除失败，可能不存在该记录'
      };
    }
    
  } catch (error) {
    console.error('删除图片时发生错误:', error);
    return {
      code: -1,
      success: false,
      message: '删除图片时发生错误: ' + (error.message || error)
    };
  }
}; 