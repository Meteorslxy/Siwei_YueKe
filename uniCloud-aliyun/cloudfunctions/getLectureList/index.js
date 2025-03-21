'use strict';
const db = uniCloud.database();

/**
 * 获取热点讲座列表
 * @param {Object} event - 请求参数
 * @param {Number} event.page - 页码，默认1
 * @param {Number} event.pageSize - 每页数量，默认10
 * @param {String} event.keyword - 搜索关键词，可选
 * @param {String} event.status - 状态筛选，可选值：upcoming（即将开始）, ongoing（进行中）, ended（已结束）
 * @returns {Object} 查询结果
 */
exports.main = async (event, context) => {
  const { page = 1, pageSize = 10, keyword = '', status = '' } = event;
  
  try {
    console.log('获取热点讲座列表，参数:', event);
    
    // 构建查询条件
    const query = {};
    if (keyword) {
      query.title = new RegExp(keyword, 'i'); // 使用正则进行模糊搜索
    }
    
    // 根据状态筛选
    const now = Date.now();
    if (status === 'upcoming') {
      query.startTime = db.command.gt(now);
    } else if (status === 'ongoing') {
      query.startTime = db.command.lte(now);
      query.endTime = db.command.gte(now);
    } else if (status === 'ended') {
      query.endTime = db.command.lt(now);
    }
    
    // 查询总数
    const countResult = await db.collection('lectures').where(query).count();
    const total = countResult.total;
    
    // 分页查询
    const list = await db.collection('lectures')
      .where(query)
      .orderBy('startTime', 'asc') // 按开始时间升序排列
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
    console.error('获取热点讲座列表错误:', err);
    return {
      code: -1,
      message: '获取热点讲座列表失败: ' + err.message
    };
  }
}; 