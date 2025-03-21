'use strict';

/**
 * 从数据库获取多张图片的列表
 * @param {Object} event - 请求参数
 * @param {Array} event.imageIds - 可选的图片ID数组，如果不提供则返回全部图片
 * @param {Number} event.limit - 可选的返回图片数量限制
 * @param {Number} event.skip - 可选的跳过记录数
 * @returns {Object} 包含图片列表的响应
 */
exports.main = async (event, context) => {
  console.log('获取图片列表云函数被调用，参数:', event);
  
  try {
    const { imageIds, limit = 20, skip = 0 } = event;
    
    // 获取数据库引用
    const db = uniCloud.database();
    let query = db.collection('images');
    
    // 如果提供了图片ID数组，则按ID查询
    if (imageIds && Array.isArray(imageIds) && imageIds.length > 0) {
      query = query.where({
        _id: db.command.in(imageIds)
      });
    }
    
    // 执行查询，获取指定数量的图片
    const imageResults = await query
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(limit)
      .get();
    
    if (!imageResults.data || imageResults.data.length === 0) {
      console.log('未找到图片记录');
      return {
        code: 0,
        success: true,
        message: '未找到图片记录',
        images: []
      };
    }
    
    // 处理图片数据，返回必要的信息
    const images = imageResults.data.map(img => {
      return {
        _id: img._id,
        fileName: img.fileName,
        fileType: img.fileType,
        createTime: img.createTime,
        base64Data: img.base64Data,
        updateTime: img.updateTime
      };
    });
    
    // 返回图片列表
    return {
      code: 0,
      success: true,
      message: '获取图片列表成功',
      totalCount: images.length,
      images: images
    };
    
  } catch (error) {
    console.error('获取图片列表时发生错误:', error);
    return {
      code: -1,
      success: false,
      message: '获取图片列表时发生错误: ' + (error.message || error)
    };
  }
}; 