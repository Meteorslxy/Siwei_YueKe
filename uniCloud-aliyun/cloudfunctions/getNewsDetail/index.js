'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 获取新闻ID (支持_id或id格式)
  const newsId = event._id || event.id;
  
  // 校验参数
  if (!newsId) {
    return {
      code: -1,
      success: false,
      message: '新闻ID不能为空'
    };
  }
  
  try {
    // 查询新闻详情
    const newsResult = await db.collection('news').doc(newsId).get();
    
    if (!newsResult.data || newsResult.data.length === 0) {
      return {
        code: -1,
        success: false,
        message: '新闻不存在'
      };
    }
    
    const newsDetail = newsResult.data[0] || newsResult.data;
    
    // 只处理image路径，不合并coverImage和image
    if (newsDetail.image && !newsDetail.image.startsWith('/') && !newsDetail.image.startsWith('http')) {
      newsDetail.image = '/static/images/news/' + newsDetail.image;
    }
    
    // 更新阅读量
    try {
      await db.collection('news').doc(newsId).update({
        viewCount: db.command.inc(1)
      });
    } catch (e) {
      console.error('更新阅读量失败:', e);
    }
    
    return {
      code: 0,
      success: true,
      data: newsDetail,
      message: '获取新闻详情成功'
    };
  } catch (e) {
    console.error('获取新闻详情失败:', e);
    return {
      code: -1,
      success: false,
      data: null,
      message: '获取新闻详情失败: ' + e.message
    };
  }
}; 