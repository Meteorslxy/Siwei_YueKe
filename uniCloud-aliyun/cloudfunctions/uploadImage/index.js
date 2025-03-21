'use strict';
const fs = require('fs');
const path = require('path');

/**
 * 上传图片到云数据库
 * @param {Object} event - 请求参数
 * @param {String} event.base64Data - 图片的base64编码数据
 * @param {String} event.fileName - 图片的文件名
 * @param {String} event.fileType - 图片的文件类型（如：jpg, png等）
 * @returns {Object} 上传结果
 */
exports.main = async (event, context) => {
  console.log('上传图片云函数被调用，参数:', {
    fileName: event.fileName,
    fileType: event.fileType,
    base64Length: event.base64Data ? event.base64Data.length : 0
  });
  
  try {
    const { base64Data, fileName, fileType = 'jpg' } = event;
    
    if (!base64Data) {
      console.error('缺少图片数据');
      return {
        code: -1,
        success: false,
        message: '缺少图片数据'
      };
    }
    
    // 从base64数据中提取实际图片数据（去掉头部的data:image/jpeg;base64,等信息）
    let imageData = base64Data;
    const isDataUrl = base64Data.indexOf('base64,') !== -1;
    
    if (isDataUrl) {
      console.log('处理Data URL格式的base64数据');
      imageData = base64Data.split('base64,')[1];
    }
    
    if (!imageData) {
      console.error('图片数据格式错误');
      return {
        code: -1,
        success: false,
        message: '图片数据格式错误'
      };
    }
    
    console.log('解析后的图片数据长度:', imageData.length);
    
    // 生成一个唯一的文件名
    const uniqueFileName = fileName || `image_${Date.now()}.${fileType}`;
    
    try {
      // 获取数据库引用
      const db = uniCloud.database();
      
      // 创建图片记录，直接存储base64数据
      const imageRecord = {
        base64Data: imageData,
        fileName: uniqueFileName,
        fileType: fileType,
        createTime: new Date().getTime(),
        updateTime: new Date().getTime()
      };
      
      // 将图片信息存储到images集合
      const dbResult = await db.collection('images').add(imageRecord);
      console.log('图片已存储到数据库:', dbResult);
      
      return {
        code: 0,
        success: true,
        message: '图片上传成功',
        fileName: uniqueFileName,
        _id: dbResult.id // 返回数据库记录ID
      };
    } catch (dbError) {
      console.error('保存到数据库失败:', dbError);
      return {
        code: -1,
        success: false,
        message: '保存到数据库失败: ' + (dbError.message || dbError)
      };
    }
  } catch (error) {
    console.error('图片上传过程中发生错误:', error);
    return {
      code: -1,
      success: false,
      message: '图片上传过程中发生错误: ' + (error.message || error)
    };
  }
}; 