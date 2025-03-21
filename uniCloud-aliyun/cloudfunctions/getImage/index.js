'use strict';

/**
 * 从数据库获取图片
 * @param {Object} event - 请求参数
 * @param {String} event.imageId - 图片ID
 * @returns {Object} 包含图片数据的响应
 */
exports.main = async (event, context) => {
  console.log('获取图片云函数被调用，参数:', event);
  
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
    
    // 从images集合中查询图片记录
    const imageResult = await db.collection('images').doc(imageId).get();
    
    if (!imageResult.data || imageResult.data.length === 0) {
      console.error('未找到指定图片');
      return {
        code: -1,
        success: false,
        message: '未找到指定图片'
      };
    }
    
    const imageData = imageResult.data[0];
    
    // 检查是否存在base64数据
    if (!imageData.base64Data) {
      console.error('图片数据不完整');
      return {
        code: -1,
        success: false,
        message: '图片数据不完整'
      };
    }
    
    // 返回图片数据，包括base64编码和文件信息
    return {
      code: 0,
      success: true,
      message: '获取图片成功',
      imageData: {
        base64Data: imageData.base64Data,
        fileName: imageData.fileName,
        fileType: imageData.fileType,
        createTime: imageData.createTime
      }
    };
    
  } catch (error) {
    console.error('获取图片时发生错误:', error);
    return {
      code: -1,
      success: false,
      message: '获取图片时发生错误: ' + (error.message || error)
    };
  }
}; 