'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log('开始同步用户数据');
    
    // 获取所有用户数据
    const userResult = await db.collection('users').get();
    const users = userResult.data || [];
    
    console.log(`当前用户总数: ${users.length}`);
    
    // 同步用户数据
    let updatedCount = 0;
    let processedCount = 0;
    
    for (const user of users) {
      processedCount++;
      const userId = user._id;
      const updateData = {};
      let needUpdate = false;
      
      // 检查并补充userId字段
      if (!user.userId) {
        updateData.userId = userId;
        needUpdate = true;
      }
      
      // 检查并补充role字段
      if (!user.role) {
        updateData.role = 'user';
        needUpdate = true;
      }
      
      // 检查并补充status字段
      if (user.status === undefined) {
        updateData.status = 0;
        needUpdate = true;
      }
      
      // 修正昵称
      if (!user.nickName && user.nickname) {
        updateData.nickName = user.nickname;
        needUpdate = true;
      }
      
      // 修正头像
      if (!user.avatarUrl && user.avatar) {
        updateData.avatarUrl = user.avatar;
        needUpdate = true;
      }
      
      // 如果有需要更新的字段，执行更新
      if (needUpdate) {
        try {
          await db.collection('users')
            .doc(userId)
            .update(updateData);
          
          updatedCount++;
          console.log(`已更新用户 ${processedCount}/${users.length}: ${user.nickName || user.phoneNumber || userId}`);
        } catch (updateErr) {
          console.error(`更新用户数据失败 ${userId}:`, updateErr);
        }
      }
    }
    
    return {
      code: 0,
      success: true,
      data: {
        total: users.length,
        updated: updatedCount
      },
      message: `用户数据同步完成，共处理 ${users.length} 条数据，更新 ${updatedCount} 条数据`
    };
  } catch (err) {
    console.error('同步用户数据失败:', err);
    return {
      code: -1,
      success: false,
      message: '同步用户数据失败: ' + err.message
    };
  }
}; 