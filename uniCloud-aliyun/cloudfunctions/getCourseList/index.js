'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 打印接收到的所有参数，用于调试
  console.log('getCourseList接收到的参数:', event);
  
  const { 
    page = 1, 
    pageSize = 10, 
    category = '', 
    keyword = '',
    educationalStages = '', // 教育阶段/年级组
    subject = '',           // 学科
    location = '',          // 校区/地点
    schoolId = ''
  } = event;
  
  try {
    const collection = db.collection('courses');
    let query = collection;
    
    // 构建查询条件
    let condition = {};
    
    // 记录筛选条件，用于调试
    const filterConditions = [];
    
    if (category) {
      condition.category = category;
      filterConditions.push(`category=${category}`);
    }
    
    if (keyword) {
      condition.title = new RegExp(keyword, 'i');
      filterConditions.push(`keyword=${keyword}`);
    }
    
    // 处理年级组筛选，支持多种字段名称
    if (educationalStages) {
      // 使用 OR 查询以适应不同的字段名
      condition.$or = [
        { educationalStages: educationalStages },
        { gradeGroup: educationalStages },
        { grade: educationalStages }
      ];
      filterConditions.push(`教育阶段=${educationalStages}`);
    }
    
    // 处理学科筛选，支持多种字段名称
    if (subject) {
      condition.$or = condition.$or || [];
      condition.$or.push(
        { subject: subject },
        { subjects: subject }
      );
      filterConditions.push(`学科=${subject}`);
    }
    
    // 处理校区/地点筛选，支持多种字段名称
    if (location) {
      condition.$or = condition.$or || [];
      condition.$or.push(
        { location: location },
        { schoolName: location }
      );
      filterConditions.push(`校区=${location}`);
    }
    
    if (schoolId) {
      condition.schoolId = schoolId;
      filterConditions.push(`schoolId=${schoolId}`);
    }
    
    console.log('构建的查询条件:', condition, '筛选条件:', filterConditions.join(', '));
    
    if (Object.keys(condition).length > 0) {
      query = query.where(condition);
    }
    
    // 获取总数
    const countResult = await query.count();
    const total = countResult.total;
    console.log('符合条件的记录总数:', total);
    
    // 获取数据列表
    const list = await query
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    
    console.log(`成功获取${list.data.length}条课程数据`);
    
    return {
      code: 0,
      success: true,
      data: list.data,
      total,
      message: '获取课程列表成功',
      filters: filterConditions // 返回使用的筛选条件给前端，便于调试
    };
  } catch (error) {
    console.error('获取课程列表失败:', error);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取课程列表失败: ' + error.message
    };
  }
}; 