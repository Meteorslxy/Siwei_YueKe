'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

// 允许修改的用户资料字段
const ALLOWED_FIELDS = [
  'nickname',         // 昵称
  'gender',           // 性别
  'birthday',         // 生日
  'location',         // 所在地
  'introduction',     // 个人简介
  'avatar',           // 头像URL
  'mobile',           // 手机号
  'email',            // 邮箱
  'username'          // 用户名
];

exports.main = async (event, context) => {
  console.log('更新用户资料 - 原始参数:', JSON.stringify(event));
  
  try {
    // 获取用户ID和更新数据
    const { userId, userInfo: updateData, uniIdToken } = event;
    
    // 校验参数
    if (!userId) {
      return {
        code: -1,
        message: '用户ID不能为空'
      };
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      return {
        code: -1,
        message: '更新数据不能为空'
      };
    }
    
    // 获取当前时间戳
    const now = Date.now();
    
    // 过滤只允许更新指定字段
    const filteredData = {};
    let hasValidField = false;
    
    for (const field of ALLOWED_FIELDS) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
        hasValidField = true;
      }
    }
    
    if (!hasValidField) {
      return {
        code: -1,
        message: '没有有效的更新字段'
      };
    }
    
    // 添加更新时间
    filteredData.update_date = now;
    
    console.log('更新用户资料:', {
      userId,
      filteredData
    });
    
    // 检查用户是否存在
    const userCheck = await db.collection('uni-id-users')
      .doc(userId)
      .get();
    
    if (!userCheck.data || userCheck.data.length === 0) {
      return {
        code: -1,
        message: '用户不存在'
      };
    }
    
    // 执行更新操作
    const updateResult = await db.collection('uni-id-users')
      .doc(userId)
      .update(filteredData);
    
    console.log('更新结果:', updateResult);
    
    if (updateResult.updated) {
      // 再次查询用户信息，返回更新后的数据
      // 构建字段选择器
      const fieldSelector = {};
      ALLOWED_FIELDS.forEach(field => {
        fieldSelector[field] = true;
      });
      
      // 使用对象形式的字段选择器而不是字符串
      const updatedUser = await db.collection('uni-id-users')
        .doc(userId)
        .field(fieldSelector)
        .get();
      
      return {
        code: 0,
        message: '更新成功',
        data: updatedUser.data && updatedUser.data[0] || null
      };
    } else {
      return {
        code: 0,
        message: '用户资料没有变化',
        data: userCheck.data && userCheck.data[0] || null
      };
    }
  } catch (error) {
    console.error('更新用户资料失败:', error);
    return {
      code: -1,
      message: '更新用户资料失败: ' + error.message
    };
  }
}; 