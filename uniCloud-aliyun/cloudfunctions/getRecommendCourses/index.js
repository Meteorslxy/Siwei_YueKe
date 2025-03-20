'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  try {
    const collection = db.collection('courses');
    const list = await collection
      .where({ tags: dbCmd.all(['推荐']) })
      .limit(10)
      .get();
    
    return {
      code: 0,
      success: true,
      data: list.data,
      message: '获取推荐课程成功'
    };
  } catch (error) {
    console.error('获取推荐课程失败:', error);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取推荐课程失败: ' + error.message
    };
  }
}; 