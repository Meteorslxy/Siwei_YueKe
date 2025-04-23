'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 从subjects集合中查询科目
    const result = await db.collection('subjects')
      .orderBy('sort', 'asc')
      .get();
    
    // 格式化为选项格式
    const subjectOptions = [];
    if (result && result.data) {
      result.data.forEach(item => {
        if (item.name) {
          subjectOptions.push({
            label: item.name,
            value: item.name,
            _id: item._id,
            code: item.code
          });
        }
      });
    }
    
    return {
      code: 0,
      success: true,
      message: '获取科目选项成功',
      data: subjectOptions
    };
  } catch (error) {
    console.error('获取科目选项失败:', error);
    return {
      code: -1,
      success: false,
      message: '获取科目选项失败: ' + error.message,
      data: []
    };
  }
}; 