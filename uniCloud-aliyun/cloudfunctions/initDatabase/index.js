'use strict';

/**
 * 初始化数据库
 * @description 为云数据库创建集合并插入初始数据
 * @param {object} event - 调用参数，可以包含 force 选项来强制重新初始化
 * @returns {object} 初始化结果
 */
exports.main = async (event, context) => {
  console.log('数据库初始化函数被调用，参数:', event);
  const { force = false } = event;
  
  try {
    const db = uniCloud.database();
    const dbCmd = db.command;
    
    // 创建集合
    const collections = ['bookings', 'courses', 'teachers'];
    const creationResults = [];
    
    for (const collectionName of collections) {
      try {
        console.log(`尝试创建集合: ${collectionName}`);
        const result = await db.createCollection(collectionName);
        creationResults.push({
          collection: collectionName,
          success: true,
          message: '集合创建成功'
        });
        console.log(`集合 ${collectionName} 创建成功`);
      } catch (err) {
        // 如果集合已存在也视为成功
        if (err.message.includes('exist')) {
          creationResults.push({
            collection: collectionName,
            success: true,
            message: '集合已存在'
          });
          console.log(`集合 ${collectionName} 已存在`);
        } else {
          creationResults.push({
            collection: collectionName,
            success: false,
            message: err.message
          });
          console.error(`创建集合 ${collectionName} 失败:`, err);
        }
      }
    }
    
    // 检查 bookings 集合中是否有数据
    const bookingsCount = await db.collection('bookings').count();
    console.log(`bookings 集合中有 ${bookingsCount.total} 条数据`);
    
    // 检查 courses 集合中是否有数据
    const coursesCount = await db.collection('courses').count();
    console.log(`courses 集合中有 ${coursesCount.total} 条数据`);
    
    // 检查 teachers 集合中是否有数据
    const teachersCount = await db.collection('teachers').count();
    console.log(`teachers 集合中有 ${teachersCount.total} 条数据`);
    
    // 返回初始化结果
    return {
      code: 0,
      success: true,
      message: '数据库集合已初始化',
      data: {
        creationResults,
        counts: {
          bookings: bookingsCount.total,
          courses: coursesCount.total,
          teachers: teachersCount.total
        }
      }
    };
  } catch (err) {
    console.error('数据库初始化失败:', err);
    return {
      code: -1,
      success: false,
      message: '数据库初始化失败: ' + err.message,
      error: err
    };
  }
};
