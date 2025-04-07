'use strict';
// 云函数入口文件
const db = uniCloud.database();

/**
 * 检查手机号是否已被其他用户绑定
 * @param {Object} event
 * @param {String} event.mobile 要检查的手机号
 * @param {String} event.userId 当前用户ID（可选，如果提供则排除该用户）
 * @return {Object} 包含结果代码和消息的对象
 */
exports.main = async (event, context) => {
  try {
    console.log('checkMobileExists函数调用参数:', event);
    
    const { mobile, userId = '' } = event;
    
    // 检查手机号参数
    if (!mobile || typeof mobile !== 'string' || mobile.length !== 11) {
      return {
        code: -1,
        message: '手机号格式不正确'
      };
    }
    
    // 查询条件：找到具有相同手机号的用户
    const whereCondition = {
      mobile: mobile
    };
    
    // 如果提供了当前用户ID，则排除当前用户
    if (userId) {
      whereCondition._id = db.command.neq(userId);
    }
    
    // 查询数据库
    const { data: users } = await db.collection('uni-id-users')
      .where(whereCondition)
      .limit(1)
      .get();
    
    console.log('查询结果:', users);
    
    // 检查是否找到用户
    if (users && users.length > 0) {
      // 手机号已被其他用户绑定
      return {
        code: 10001,
        message: '该手机号已被其他账号绑定'
      };
    }
    
    // 手机号可用
    return {
      code: 0,
      message: '手机号可用'
    };
    
  } catch (err) {
    console.error('检查手机号时出错:', err);
    return {
      code: -1,
      message: '服务器错误: ' + err.message
    };
  }
}; 