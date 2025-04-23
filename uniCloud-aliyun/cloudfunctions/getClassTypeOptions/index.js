'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const { subject } = event;
    let query = {};
    
    // 如果提供了学科，按学科筛选班型
    if (subject) {
      query.subject = subject;
    }
    
    // 从course_classtype集合中查询班型
    const result = await db.collection('course_classtype')
      .where(query)
      .get();
    
    // 从结果中提取classType值并格式化为选项格式
    const classTypeOptions = [];
    if (result && result.data) {
      result.data.forEach(item => {
        if (item.classType && item.classType.trim() !== '') {
          // 检查是否已存在相同的班型选项，避免重复
          const existingOption = classTypeOptions.find(option => option.value === item.classType);
          if (!existingOption) {
            classTypeOptions.push({
              label: item.classType,
              value: item.classType,
              _id: item._id
            });
          }
        }
      });
    }
    
    return {
      code: 0,
      success: true,
      message: '获取班型选项成功',
      data: classTypeOptions
    };
  } catch (error) {
    console.error('获取班型选项失败:', error);
    return {
      code: -1,
      success: false,
      message: '获取班型选项失败: ' + error.message,
      data: []
    };
  }
}; 