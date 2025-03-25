'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 检查users表是否存在，如果不存在则创建
    let tableCreated = false;
    
    try {
      // 尝试获取users表的数据，如果能获取到则表示表已存在
      const countResult = await db.collection('users').count();
      console.log('用户表已存在，当前记录数:', countResult.total);
    } catch (err) {
      // 获取数据失败，可能是表不存在，创建表
      console.log('创建用户表');
      try {
        await db.createCollection('users');
        tableCreated = true;
        console.log('用户表创建成功');
      } catch (createErr) {
        console.error('创建用户表失败:', createErr);
        return {
          code: -1,
          success: false,
          message: '创建用户表失败: ' + createErr.message
        };
      }
    }
    
    // 初始化管理员账号
    let adminCreated = false;
    const adminResult = await db.collection('users')
      .where({
        role: 'admin'
      })
      .count();
    
    if (adminResult.total === 0) {
      // 创建管理员账号
      try {
        const serverDate = new Date();
        await db.collection('users').add({
          phoneNumber: 'admin',
          nickName: '系统管理员',
          avatarUrl: '',
          role: 'admin',
          createTime: serverDate,
          lastLoginTime: serverDate,
          platform: context.PLATFORM,
          status: 0
        });
        adminCreated = true;
        console.log('管理员账号创建成功');
      } catch (adminErr) {
        console.error('创建管理员账号失败:', adminErr);
      }
    } else {
      console.log('管理员账号已存在，跳过创建');
    }
    
    return {
      code: 0,
      success: true,
      data: {
        tableCreated: tableCreated,
        adminCreated: adminCreated
      },
      message: '用户表初始化成功'
    };
  } catch (err) {
    console.error('初始化用户表失败:', err);
    return {
      code: -1,
      success: false,
      message: '初始化用户表失败: ' + err.message
    };
  }
}; 