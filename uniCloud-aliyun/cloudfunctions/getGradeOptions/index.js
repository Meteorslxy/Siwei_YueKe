'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 从grades集合中获取年级选项，不使用field方法
    const result = await db.collection('grades')
      .orderBy('display_order', 'asc') // 按显示顺序排序
      .get();
    
    // 格式化为选项格式
    const gradeOptions = [];
    if (result && result.data) {
      result.data.forEach(item => {
        if (item.name) {
          gradeOptions.push({
            label: item.name, // 显示名称
            value: item.name, // 查询值
            _id: item._id,
            educational_stage: item.educational_stage, // 教育阶段，便于分组
            code: item.code // 年级代码
          });
        }
      });
    }
    
    return {
      code: 0,
      success: true,
      message: '获取年级选项成功',
      data: gradeOptions
    };
  } catch (error) {
    console.error('获取年级选项失败:', error);
    return {
      code: -1,
      success: false,
      message: '获取年级选项失败: ' + error.message,
      data: []
    };
  }
}; 