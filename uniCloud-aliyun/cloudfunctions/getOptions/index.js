'use strict';

// 云端数据库API
const db = uniCloud.database();

// 默认年级数据
const DEFAULT_GRADES = [
  { name: '小学', value: '小学' },
  { name: '初中', value: '初中' }
];

// 默认学科数据
const DEFAULT_SUBJECTS = [
  { name: '语文', value: '语文' },
  { name: '数学', value: '数学' },
  { name: '英语', value: '英语' },
  { name: '物理', value: '物理' },
  { name: '化学', value: '化学' }
];

exports.main = async (event, context) => {
  // 参数校验
  const { type = 'all' } = event;
  
  try {
    // 根据类型获取不同的选项数据
    let result = {};
    
    if (type === 'grades' || type === 'all') {
      // 从数据库获取年级数据
      try {
        const gradesDb = await db.collection('grades').limit(100).get();
        if (gradesDb && gradesDb.data && gradesDb.data.length > 0) {
          result.grades = gradesDb.data;
          console.log('从数据库获取年级数据成功:', gradesDb.data);
        } else {
          // 如果数据库为空，使用默认数据
          result.grades = DEFAULT_GRADES;
          console.log('数据库年级数据为空，使用默认数据');
        }
      } catch (err) {
        console.error('获取年级数据出错:', err);
        result.grades = DEFAULT_GRADES;
      }
    }
    
    if (type === 'subjects' || type === 'all') {
      // 从数据库获取学科数据
      try {
        const subjectsDb = await db.collection('subjects').limit(100).get();
        if (subjectsDb && subjectsDb.data && subjectsDb.data.length > 0) {
          result.subjects = subjectsDb.data;
          console.log('从数据库获取学科数据成功:', subjectsDb.data);
        } else {
          // 如果数据库为空，使用默认数据
          result.subjects = DEFAULT_SUBJECTS;
          console.log('数据库学科数据为空，使用默认数据');
        }
      } catch (err) {
        console.error('获取学科数据出错:', err);
        result.subjects = DEFAULT_SUBJECTS;
      }
    }
    
    // 返回单个类型数据，直接返回数组
    if (type === 'grades') {
      return {
        code: 0,
        message: '获取年级列表成功',
        data: result.grades
      };
    } else if (type === 'subjects') {
      return {
        code: 0,
        message: '获取学科列表成功',
        data: result.subjects
      };
    }
    
    // 返回所有类型数据
    return {
      code: 0,
      message: '获取选项数据成功',
      data: result
    };
    
  } catch (error) {
    console.error('获取选项数据出错:', error);
    return {
      code: -1,
      message: '获取选项数据失败: ' + error.message,
      data: null
    };
  }
}; 