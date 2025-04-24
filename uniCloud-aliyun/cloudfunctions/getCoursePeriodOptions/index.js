'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    console.log('开始查询course_period集合');
    // 从course_period集合中查询周期类型
    const result = await db.collection('course_period')
      .get();
    
    console.log('course_period查询结果:', JSON.stringify(result.data));
    
    // 从结果中提取周期类型并格式化为选项格式
    const periodOptions = [];
    if (result && result.data && result.data.length > 0) {
      result.data.forEach(item => {
        console.log('正在处理period项目:', JSON.stringify(item));
        // 确保使用正确的字段名，即数据库中真实存在的字段
        periodOptions.push({
          label: item.period || '',
          value: item.period || '',
          _id: item._id || ''
        });
        console.log('已添加期数选项:', item.period);
      });
    } else {
      console.log('未查询到course_period数据或数据为空');
    }
    
    console.log('最终返回的periodOptions:', JSON.stringify(periodOptions));
    
    return {
      code: 0,
      success: true,
      message: '获取课程周期选项成功',
      data: periodOptions
    };
  } catch (error) {
    console.error('获取课程周期选项失败:', error);
    return {
      code: -1,
      success: false,
      message: '获取课程周期选项失败: ' + error.message,
      data: []
    };
  }
}; 