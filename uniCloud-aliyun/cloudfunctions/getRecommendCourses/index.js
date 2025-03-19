'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const collection = db.collection('courses');
    const list = await collection
      .where({ tags: db.command.all(['推荐']) })
      .limit(10)
      .get();
    
    return {
      code: 0,
      data: list.data,
      message: '获取推荐课程成功'
    };
  } catch (error) {
    console.error('获取推荐课程失败:', error);
    return {
      code: -1,
      data: [],
      message: '获取推荐课程失败: ' + error.message
    };
  }
}; 