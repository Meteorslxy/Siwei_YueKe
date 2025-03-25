'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { 
    action, // 操作类型：list查询列表，get获取单个用户，update更新用户，delete删除用户
    userId,
    userData = {},
    page = 1,
    limit = 10,
    keyword = '',
    role = '',
    status = -1
  } = event;
  
  try {
    // 根据操作类型处理
    if (action === 'list') {
      // 构建查询条件
      const query = {};
      
      // 关键字搜索
      if (keyword) {
        query.$or = [
          { nickName: new RegExp(keyword, 'i') },
          { phoneNumber: new RegExp(keyword, 'i') }
        ];
      }
      
      // 角色筛选
      if (role) {
        query.role = role;
      }
      
      // 状态筛选
      if (status !== -1) {
        query.status = status;
      }
      
      // 获取总数
      const countResult = await db.collection('users')
        .where(query)
        .count();
      
      // 获取列表
      const userResult = await db.collection('users')
        .where(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .orderBy('createTime', 'desc')
        .get();
      
      return {
        code: 0,
        success: true,
        data: {
          list: userResult.data,
          total: countResult.total,
          page: Number(page),
          limit: Number(limit)
        },
        message: '获取用户列表成功'
      };
    } else if (action === 'get') {
      if (!userId) {
        return {
          code: -1,
          success: false,
          message: '用户ID不能为空'
        };
      }
      
      // 获取单个用户
      const userResult = await db.collection('users')
        .doc(userId)
        .get();
      
      if (!userResult.data) {
        return {
          code: -1,
          success: false,
          message: '用户不存在'
        };
      }
      
      return {
        code: 0,
        success: true,
        data: userResult.data,
        message: '获取用户信息成功'
      };
    } else if (action === 'update') {
      if (!userId) {
        return {
          code: -1,
          success: false,
          message: '用户ID不能为空'
        };
      }
      
      if (Object.keys(userData).length === 0) {
        return {
          code: -1,
          success: false,
          message: '更新数据不能为空'
        };
      }
      
      // 防止更新敏感字段
      delete userData._id;
      delete userData.createTime;
      
      // 添加更新时间
      userData.updateTime = new Date();
      
      // 更新用户
      await db.collection('users')
        .doc(userId)
        .update(userData);
      
      return {
        code: 0,
        success: true,
        message: '更新用户信息成功'
      };
    } else if (action === 'delete') {
      if (!userId) {
        return {
          code: -1,
          success: false,
          message: '用户ID不能为空'
        };
      }
      
      // 删除用户
      await db.collection('users')
        .doc(userId)
        .remove();
      
      return {
        code: 0,
        success: true,
        message: '删除用户成功'
      };
    } else {
      return {
        code: -1,
        success: false,
        message: '未知操作类型'
      };
    }
  } catch (err) {
    console.error('用户管理操作失败:', err);
    return {
      code: -1,
      success: false,
      message: '操作失败: ' + err.message
    };
  }
}; 