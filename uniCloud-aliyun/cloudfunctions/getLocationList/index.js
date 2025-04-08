'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    // 查询所有启用状态的校区
    const locationResult = await db.collection('locations')
      .where({
        status: 1
      })
      .orderBy('create_date', 'asc')
      .get();
    
    return {
      code: 0,
      success: true,
      data: locationResult.data,
      message: '获取校区列表成功'
    };
  } catch (e) {
    console.error('获取校区列表失败:', e);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取校区列表失败: ' + e.message
    };
  }
}; 