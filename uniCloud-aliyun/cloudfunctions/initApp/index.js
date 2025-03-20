'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 调用initDatabase云函数
    const initDbResult = await uniCloud.callFunction({
      name: 'initDatabase'
    });
    
    console.log('数据库初始化结果:', initDbResult);
    
    if (!initDbResult.result || !initDbResult.result.success) {
      const errorMessage = initDbResult.result && initDbResult.result.message ? initDbResult.result.message : '未知错误';
      throw new Error('初始化数据库失败: ' + errorMessage);
    }
    
    // 测试查询几个表的数据
    const results = {};
    
    // 测试查询课程
    try {
      const coursesResult = await db.collection('courses').limit(2).get();
      results.courses = {
        success: true,
        count: coursesResult.data.length,
        data: coursesResult.data
      };
    } catch (error) {
      results.courses = {
        success: false,
        error: error.message
      };
    }
    
    // 测试查询新闻
    try {
      const newsResult = await db.collection('news').limit(2).get();
      results.news = {
        success: true,
        count: newsResult.data.length,
        data: newsResult.data
      };
    } catch (error) {
      results.news = {
        success: false,
        error: error.message
      };
    }
    
    // 测试查询教师
    try {
      const teachersResult = await db.collection('teachers').limit(2).get();
      results.teachers = {
        success: true,
        count: teachersResult.data.length,
        data: teachersResult.data
      };
    } catch (error) {
      results.teachers = {
        success: false,
        error: error.message
      };
    }
    
    return {
      code: 0,
      success: true,
      results: results,
      initResult: initDbResult.result,
      message: '应用初始化成功'
    };
  } catch (error) {
    console.error('应用初始化失败:', error);
    return {
      code: -1,
      success: false,
      error: error.message,
      message: '应用初始化失败: ' + error.message
    };
  }
}; 