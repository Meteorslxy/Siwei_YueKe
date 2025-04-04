'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  console.log('getEnrollments函数收到请求:', event);
  
  try {
    // 获取参数
    const { userId, status, page = 1, pageSize = 10 } = event;
    
    // 验证必要参数
    if (!userId) {
      return {
        code: -1,
        message: '缺少用户ID参数'
      };
    }
    
    // 构建查询条件
    const condition = {
      userId: userId
    };
    
    // 根据状态筛选
    if (status) {
      if (status === 'active') {
        // 活跃状态：包括待确认和已确认
        condition.status = dbCmd.in(['pending', 'confirmed']);
      } else if (status === 'cancelled') {
        // 已取消状态
        condition.status = 'cancelled';
      } else if (status === 'completed') {
        // 已完成状态
        condition.status = 'completed';
      } else if (status !== 'all') {
        // 如果不是'all'，则按指定状态筛选
        condition.status = status;
      }
    }
    
    console.log('查询条件:', condition);
    
    // 分页计算
    const skip = (page - 1) * pageSize;
    
    // 获取记录总数
    const countResult = await db.collection('enrollments')
      .where(condition)
      .count();
      
    const total = countResult.total;
    
    // 查询报名记录
    let result = await db.collection('enrollments')
      .where(condition)
      .orderBy('createTime', 'desc') // 按创建时间倒序
      .skip(skip)
      .limit(pageSize)
      .get();
    
    // 检查结果
    if (!result.data) {
      return {
        code: -1,
        message: '查询失败'
      };
    }
    
    // 如果找不到报名记录，返回空数组
    if (result.data.length === 0) {
      return {
        code: 0,
        message: '未找到报名记录',
        data: [],
        total: 0,
        page,
        pageSize
      };
    }
    
    // 返回查询结果
    return {
      code: 0,
      message: '查询成功',
      data: result.data,
      total,
      page,
      pageSize
    };
  } catch (error) {
    console.error('查询报名记录失败:', error);
    return {
      code: -1,
      message: '系统错误',
      error: error.message
    };
  }
}; 