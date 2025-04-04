'use strict';

const crypto = require('crypto');

// 生成32位随机密码
function generatePassword() {
  return crypto.randomBytes(16).toString('hex');
}

// 使用uni-id的密码加密方法
function encryptPassword(password, passwordSecret) {
  return crypto.createHash('sha1').update(password + passwordSecret).digest('hex');
}

exports.main = async (event, context) => {
  const db = uniCloud.database();
  const cmd = db.command;
  
  console.log('开始迁移用户数据...');
  
  try {
    // 检查uni-id-users表是否已存在
    const uniIdUsersCount = await db.collection('uni-id-users').count();
    console.log(`uni-id-users表中已有 ${uniIdUsersCount.total} 条记录`);
    
    // 获取所有旧用户数据
    const oldUsersResult = await db.collection('users').limit(1000).get();
    const oldUsers = oldUsersResult.data;
    
    console.log(`找到 ${oldUsers.length} 条旧用户记录需要迁移`);
    
    // 模拟密码加密的密钥（需要与uni-id配置一致）
    const passwordSecret = 'yuekePasswordSecret-2023';
    
    // 记录迁移结果
    const migrationResult = {
      total: oldUsers.length,
      success: 0,
      failed: 0,
      skipped: 0,
      errors: []
    };
    
    // 遍历旧用户数据并迁移
    for (const oldUser of oldUsers) {
      try {
        // 检查用户是否已存在
        const existingUser = await db.collection('uni-id-users')
          .where({
            $or: [
              { username: oldUser.username || '' },
              { mobile: oldUser.phone || '' },
              { email: oldUser.email || '' },
              { wx_openid: oldUser.openid ? { 'mp-weixin': oldUser.openid } : undefined }
            ].filter(item => 
              // 过滤掉undefined值和空值
              item && (Object.values(item)[0] !== '' && Object.values(item)[0] !== undefined)
            )
          })
          .limit(1)
          .get();
        
        // 如果用户已存在，则跳过
        if (existingUser.data && existingUser.data.length > 0) {
          console.log(`用户 ${oldUser.username || oldUser.nickname || oldUser._id} 已存在于uni-id-users，跳过`);
          migrationResult.skipped++;
          continue;
        }
        
        // 构造新用户数据
        const newUser = {
          username: oldUser.username || `user_${oldUser._id.slice(-6)}`,
          nickname: oldUser.nickname || oldUser.nickName || '',
          mobile: oldUser.phone || '',
          email: oldUser.email || '',
          password: oldUser.password ? oldUser.password : encryptPassword(generatePassword(), passwordSecret),
          avatar: oldUser.avatarUrl || '',
          gender: oldUser.gender || 0, // 0: 未知, 1: 男, 2: 女
          status: 1, // 正常状态
          register_date: oldUser.createTime || Date.now(),
          register_ip: oldUser.lastLoginIp || '',
          last_login_date: oldUser.lastLoginTime || Date.now(),
          last_login_ip: oldUser.lastLoginIp || ''
        };
        
        // 如果有微信OpenID，添加到wx_openid字段
        if (oldUser.openid) {
          newUser.wx_openid = {
            'mp-weixin': oldUser.openid
          };
        }
        
        // 添加到uni-id-users表
        const addResult = await db.collection('uni-id-users').add(newUser);
        
        if (addResult.id) {
          console.log(`成功迁移用户 ${oldUser.username || oldUser.nickname || oldUser._id} 到 uni-id-users, 新ID: ${addResult.id}`);
          migrationResult.success++;
        } else {
          throw new Error('添加用户失败，未返回ID');
        }
      } catch (err) {
        console.error(`迁移用户 ${oldUser._id} 失败:`, err);
        migrationResult.failed++;
        migrationResult.errors.push({
          userId: oldUser._id,
          error: err.message
        });
      }
    }
    
    console.log('用户数据迁移完成，结果:', migrationResult);
    
    return {
      code: 0,
      message: '用户数据迁移完成',
      data: migrationResult
    };
  } catch (err) {
    console.error('用户数据迁移过程中发生错误:', err);
    return {
      code: -1,
      message: '用户数据迁移失败',
      error: err.message
    };
  }
}; 