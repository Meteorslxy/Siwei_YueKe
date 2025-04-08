'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event;
  
  try {
    const collection = db.collection('news');
    const countResult = await collection.count();
    const total = countResult.total;
    
    // 确保按照date字段由近到远排序
    const list = await collection
      .orderBy('date', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    
    // 确保每个新闻项目都有正确的图片字段
    const processedData = list.data.map(item => {
      // 保留原始图片URL，避免没有必要的字段合并
      const originalCoverImage = item.coverImage;
      const originalImage = item.image;
      
      // 确保图片路径格式正确
      if (item.coverImage && !item.coverImage.startsWith('/') && !item.coverImage.startsWith('http')) {
        item.coverImage = '/static/images/news/' + item.coverImage;
      }
      
      if (item.image && !item.image.startsWith('/') && !item.image.startsWith('http')) {
        item.image = '/static/images/news/' + item.image;
      }
      
      // 只在其中一个为空时才进行字段填充
      if (!originalCoverImage && originalImage) {
        item.coverImage = item.image;
      } else if (!originalImage && originalCoverImage) {
        item.image = item.coverImage;
      }
      
      return item;
    });
    
    return {
      code: 0,
      success: true,
      data: processedData,
      total,
      message: '获取资讯列表成功'
    };
  } catch (error) {
    console.error('获取资讯列表失败:', error);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取资讯列表失败: ' + error.message
    };
  }
}; 