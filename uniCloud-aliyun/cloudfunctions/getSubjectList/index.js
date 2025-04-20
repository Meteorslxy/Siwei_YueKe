'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 查询所有启用状态的科目
    const subjectResult = await db.collection('subjects')
      .where({
        status: 1
      })
      .orderBy('sort', 'asc')
      .get();
    
    return {
      code: 0,
      success: true,
      data: subjectResult.data,
      message: '获取科目列表成功'
    };
  } catch (e) {
    console.error('获取科目列表失败:', e);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取科目列表失败: ' + e.message
    };
  }
}; 