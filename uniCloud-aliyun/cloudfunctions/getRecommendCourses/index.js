'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  console.log('getRecommendCourses接收到的参数:', event);
  
  const { limit = 10 } = event;
  
  try {
    const collection = db.collection('courses');
    
    // 根据tags字段筛选推荐课程
    let query = collection;
    
    // 尝试使用多种查询方式，确保能找到推荐课程
    const result1 = await query
      .where({ tags: dbCmd.all(['推荐']) })
      .limit(limit)
      .get();
      
    console.log(`查询方式1找到${result1.data.length}条推荐课程`);
      
    // 如果第一种方式找不到数据，尝试第二种方式
    if (!result1.data || result1.data.length === 0) {
      const result2 = await collection
        .where({ isRecommend: true })
        .limit(limit)
        .get();
        
      console.log(`查询方式2找到${result2.data.length}条推荐课程`);
      
      // 如果第二种方式也找不到，尝试第三种方式 - 简单返回最新课程
      if (!result2.data || result2.data.length === 0) {
        const result3 = await collection
          .orderBy('createTime', 'desc')
          .limit(limit)
          .get();
          
        console.log(`查询方式3找到${result3.data.length}条最新课程`);
        
        return {
          code: 0,
          success: true,
          data: result3.data,
          message: '获取最新课程成功(无推荐课程)',
          queryMethod: 3
        };
      }
      
      return {
        code: 0,
        success: true,
        data: result2.data,
        message: '获取推荐课程成功(方式2)',
        queryMethod: 2
      };
    }
    
    return {
      code: 0,
      success: true,
      data: result1.data,
      message: '获取推荐课程成功',
      queryMethod: 1
    };
  } catch (error) {
    console.error('获取推荐课程失败:', error);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取推荐课程失败: ' + error.message
    };
  }
}; 