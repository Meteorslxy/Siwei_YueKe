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
    
    // 处理年级组筛选
    if (educationalStages) {
      // 使用数组条件，匹配任一字段
      condition.gradeCondition = {
        $or: [
          { educationalStages: educationalStages },
          { gradeGroup: educationalStages },
          { grade: educationalStages }
        ]
      };
      filterConditions.push(`教育阶段=${educationalStages}`);
    }
    
    // 处理学科筛选
    if (subject) {
      condition.subjectCondition = {
        $or: [
          { subject: subject },
          { subjects: subject }
        ]
      };
      filterConditions.push(`学科=${subject}`);
    }
    
    // 处理校区/地点筛选
    if (location) {
      condition.locationCondition = {
        $or: [
          { location: location },
          { schoolName: location }
        ]
      };
      filterConditions.push(`校区=${location}`);
    }
    
    if (schoolId) {
      condition.schoolId = schoolId;
      filterConditions.push(`schoolId=${schoolId}`);
    }
    
    console.log('构建的查询条件:', condition, '筛选条件:', filterConditions.join(', '));
    
    // 构建最终的查询条件
    const finalCondition = {};
    
    // 基本过滤条件
    if (category) finalCondition.category = condition.category;
    if (keyword) finalCondition.title = condition.title;
    if (schoolId) finalCondition.schoolId = condition.schoolId;
    
    // 构建 $and 条件数组，确保每个筛选条件都被满足
    const andConditions = [];
    
    // 年级条件
    if (condition.gradeCondition) {
      andConditions.push(condition.gradeCondition);
    }
    
    // 学科条件
    if (condition.subjectCondition) {
      andConditions.push(condition.subjectCondition);
    }
    
    // 校区条件
    if (condition.locationCondition) {
      andConditions.push(condition.locationCondition);
    }
    
    // 如果有 $and 条件，添加到最终查询中
    if (andConditions.length > 0) {
      finalCondition.$and = andConditions;
    }
    
    console.log('最终查询条件:', JSON.stringify(finalCondition));
    
    // 使用最终构建的条件进行查询
    if (Object.keys(finalCondition).length > 0) {
      query = query.where(finalCondition);
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
      filters: filterConditions, // 返回使用的筛选条件给前端，便于调试
      query: JSON.stringify(finalCondition) // 返回最终查询条件，便于调试
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