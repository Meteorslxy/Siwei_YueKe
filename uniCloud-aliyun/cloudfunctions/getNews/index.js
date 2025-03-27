'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { limit = 10 } = event;
  
  try {
    // 获取最新的资讯数据
    const result = await db.collection('news')
      .orderBy('publishTime', 'desc') // 按发布时间倒序
      .limit(limit)
      .get();
    
    // 确保每个新闻项目都有正确的图片字段
    const processedData = result.data.map(item => {
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
      message: '获取资讯数据成功'
    };
  } catch (err) {
    console.error('获取资讯数据失败:', err);
    return {
      code: -1,
      success: false,
      data: [],
      message: err.message || '获取资讯数据失败'
    };
  }
}; 