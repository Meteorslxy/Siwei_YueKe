'use strict';
const db = uniCloud.database();

/**
 * 获取教师列表
 * @param {Object} event - 请求参数
 * @param {Number} event.page - 页码，默认1
 * @param {Number} event.pageSize - 每页数量，默认10
 * @param {String} event.keyword - 搜索关键词，可选
 * @param {String} event.subject - 科目，可选，中文表示（如"数学"、"语文"）
 * @param {String} event.grade - 年级，可选，中文表示（如"小学"、"初中"）
 * @returns {Object} 查询结果
 */
exports.main = async (event, context) => {
  const { 
    page = 1, 
    pageSize = 10, 
    keyword = '', 
    subject = '',
    grade = '' 
  } = event;
  
  try {
    console.log('获取教师列表，参数:', event);
    
    // 构建查询条件
    const query = {};
    if (keyword) {
      query.name = new RegExp(keyword, 'i'); // 使用正则进行模糊搜索
    }
    
    // 按学科筛选（直接使用中文）
    if (subject) {
      query.subject = subject;
    }
    
    // 按年级筛选（直接使用中文）
    if (grade && grade !== 'all') {
      query.grade = grade;
    }
    
    console.log('查询条件:', query);
    
    // 查询总数
    const countResult = await db.collection('teachers').where(query).count();
    const total = countResult.total;
    
    // 分页查询
    const list = await db.collection('teachers')
      .where(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    
    return {
      code: 0,
      data: list.data,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / pageSize)
    };
  } catch (err) {
    console.error('获取教师列表错误:', err);
    return {
      code: -1,
      message: '获取教师列表失败: ' + err.message
    };
  }
}; 