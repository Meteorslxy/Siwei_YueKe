'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 先尝试从course_term集合中获取学期选项
    let result = await db.collection('course_term').get();
    
    // 如果course_term表有数据，则使用它
    if (result && result.data && result.data.length > 0) {
      // 格式化为选项格式
      const termOptions = [];
      result.data.forEach(item => {
        if (item.value) {
          termOptions.push({
            label: item.value,
            value: item.value,
            _id: item._id
          });
        }
      });
      
      return {
        code: 0,
        success: true,
        message: '从course_term表获取学期选项成功',
        data: termOptions
      };
    }
    
    // 如果course_term表没有数据，从courses表聚合查询获取学期数据
    result = await db.collection('courses')
      .aggregate()
      .group({
        _id: '$term',
        count: db.command.aggregate.count()
      })
      .match({
        _id: db.command.exists(true)
      })
      .sort({
        _id: 1
      })
      .end();
    
    // 从结果中提取term值并格式化为选项格式
    const termOptions = [];
    if (result && result.data) {
      // 处理分组结果
      result.data.forEach(item => {
        if (item._id && item._id.trim() !== '') {
          termOptions.push({
            label: item._id,
            value: item._id,
            _id: item._id
          });
        }
      });
    }
    
    return {
      code: 0,
      success: true,
      message: '从courses表获取学期选项成功',
      data: termOptions
    };
  } catch (error) {
    console.error('获取学期选项失败:', error);
    return {
      code: -1,
      success: false,
      message: '获取学期选项失败: ' + error.message,
      data: []
    };
  }
}; 