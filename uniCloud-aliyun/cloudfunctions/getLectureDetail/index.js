'use strict';
const db = uniCloud.database();

/**
 * 获取热点讲座详情
 * @param {Object} event - 请求参数
 * @param {String} event.id - 讲座ID
 * @returns {Object} 查询结果
 */
exports.main = async (event, context) => {
  const { id } = event;
  
  if (!id) {
    return {
      code: -1,
      message: '讲座ID不能为空'
    };
  }
  
  try {
    console.log('获取热点讲座详情，ID:', id);
    
    // 查询讲座详情
    const lectureResult = await db.collection('lectures').doc(id).get();
    if (!lectureResult.data || lectureResult.data.length === 0) {
      return {
        code: -1,
        message: '讲座不存在'
      };
    }
    
    const lecture = lectureResult.data[0];
    
    // 查询讲师信息
    let speakerInfo = null;
    if (lecture.speakerId) {
      const speakerResult = await db.collection('teachers').doc(lecture.speakerId).get();
      if (speakerResult.data && speakerResult.data.length > 0) {
        speakerInfo = speakerResult.data[0];
      }
    }
    
    // 查询相关讲座推荐
    const recommendResult = await db.collection('lectures')
      .where({
        _id: db.command.neq(id),
        category: lecture.category
      })
      .limit(3)
      .get();
    
    // 增加查看次数
    await db.collection('lectures').doc(id).update({
      viewCount: db.command.inc(1)
    });
    
    return {
      code: 0,
      data: {
        ...lecture,
        speakerInfo,
        recommendLectures: recommendResult.data || []
      }
    };
  } catch (err) {
    console.error('获取热点讲座详情错误:', err);
    return {
      code: -1,
      message: '获取热点讲座详情失败: ' + err.message
    };
  }
}; 