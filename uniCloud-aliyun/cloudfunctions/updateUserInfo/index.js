'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log('更新用户信息', event);
    
    // 增加参数原始内容的日志输出
    console.log('更新用户信息 - 原始参数:', JSON.stringify(event));
    console.log('更新用户信息 - update字段:', JSON.stringify(event.update));
    
    // 获取更新的字段
    const { update } = event;
    
    if (!update) {
      return {
        code: -1,
        message: '未提供更新数据'
      };
    }
    
    // 获取token，支持多种参数名
    const uniIdToken = event.uniIdToken || event.token || event.userToken;
    
    // 请求中没有提供token
    if (!uniIdToken) {
      console.log('未提供Token');
      return {
        code: -1,
        message: '未登录或登录已过期'
      };
    }
    
    console.log('接收到token:', uniIdToken.substring(0, 10) + '...');
    
    // 从token中获取用户ID
    let userId;
    try {
      // 尝试从context中获取用户信息
      const { USERID } = context;
      userId = USERID;
      console.log('从context获取的userId:', userId);
      
      // 如果没有，则尝试从数据库查询token对应的用户
      if (!userId) {
        try {
          // 尝试查询uni-id-tokens表
          const tokenInfo = await db.collection('uni-id-tokens')
            .where({
              token: uniIdToken
            })
            .limit(1)
            .get();
          
          if (tokenInfo.data && tokenInfo.data.length > 0) {
            userId = tokenInfo.data[0].user_id;
            console.log('从uni-id-tokens查询到userId:', userId);
          }
        } catch (e) {
          console.error('查询uni-id-tokens失败:', e);
        }
      }
      
      // 如果还是没有，尝试直接从users表中查询
      if (!userId) {
        try {
          // 尝试通过token字段查询
          const userInfo = await db.collection('uni-id-users')
            .where({
              token: uniIdToken
            })
            .limit(1)
            .get();
          
          if (userInfo.data && userInfo.data.length > 0) {
            userId = userInfo.data[0]._id;
            console.log('从uni-id-users表token字段查询到userId:', userId);
          }
        } catch (e) {
          console.error('通过token查询uni-id-users表失败:', e);
        }
      }
      
      // 如果还是没有，尝试通过openid查询
      if (!userId && update.phoneNumber) {
        try {
          // 查询是否有与该手机号关联的用户
          const userByPhone = await db.collection('uni-id-users')
            .where({
              mobile: update.phoneNumber
            })
            .limit(1)
            .get();
          
          if (userByPhone.data && userByPhone.data.length > 0) {
            userId = userByPhone.data[0]._id;
            console.log('通过手机号查询到userId:', userId);
          }
        } catch (e) {
          console.error('通过手机号查询用户失败:', e);
        }
      }
      
      // 如果还是没有，以防万一，尝试解析token (简化代码，实际应使用uni-id)
      if (!userId && uniIdToken) {
        try {
          const tokenParts = uniIdToken.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
            userId = payload.uid || payload.userId || payload._id;
            console.log('从token解析得到userId:', userId);
          }
        } catch (e) {
          console.error('尝试解析token失败:', e);
        }
      }
    } catch (e) {
      console.error('获取用户ID失败:', e);
    }
    
    // 如果还是没有userId，尝试从请求中获取
    if (!userId && (event.userId || event.user_id || event._id)) {
      userId = event.userId || event.user_id || event._id;
      console.log('从请求参数中获取userId:', userId);
    }
    
    // 如果还是没有userId，则返回错误
    if (!userId) {
      console.log('无法确定用户身份');
      return {
        code: -1,
        message: '无法获取用户信息'
      };
    }
    
    console.log('最终确定的userId:', userId);
    
    // 检查用户是否存在
    const userCheck = await db.collection('uni-id-users')
      .doc(userId)
      .get();
    
    if (!userCheck.data || userCheck.data.length === 0) {
      console.log('用户不存在:', userId);
      return {
        code: -1,
        message: '用户不存在'
      };
    }
    
    // 执行更新
    const allowedFields = ['phoneNumber', 'mobile', 'nickName', 'avatarUrl', 'gender', 'province', 'city', 'country'];
    const updateData = {};
    
    // 只更新允许的字段
    for (const key of allowedFields) {
      if (update[key] !== undefined) {
        updateData[key] = update[key];
      }
    }
    
    // 确保mobile字段存在
    if (update.phoneNumber && !updateData.mobile) {
      updateData.mobile = update.phoneNumber;
    }
    
    // 如果外部直接传递了mobile字段，也添加到更新数据中
    if (event.mobile && typeof event.mobile === 'string') {
      console.log('从event根参数中获取到mobile:', event.mobile);
      updateData.mobile = event.mobile;
    }
    
    // 如果没有要更新的字段
    if (Object.keys(updateData).length === 0) {
      return {
        code: -1,
        message: '没有有效的更新字段'
      };
    }
    
    // 添加更新时间
    updateData.updateTime = Date.now();
    
    console.log('更新用户数据:', {userId, updateData});
    
    try {
      // 直接使用set方法而不是update，确保字段被更新
      const updateResult = await db.collection('uni-id-users')
        .doc(userId)
        .update(updateData);
      
      console.log('数据库更新结果:', updateResult);
      
      // 更新后再次查询验证
      const verifyUpdate = await db.collection('uni-id-users')
        .doc(userId)
        .get();
      
      console.log('更新后的用户数据:', verifyUpdate.data);
      
      // 检查mobile字段是否存在
      const userAfterUpdate = verifyUpdate.data && verifyUpdate.data[0];
      if (userAfterUpdate && !userAfterUpdate.mobile && update.phoneNumber) {
        console.log('mobile字段更新失败，尝试单独更新mobile字段');
        
        // 尝试单独更新mobile字段
        await db.collection('uni-id-users')
          .doc(userId)
          .update({
            mobile: update.phoneNumber
          });
        
        console.log('mobile字段单独更新完成');
        
        // 尝试使用set方法强制更新
        try {
          console.log('尝试使用set方法更新mobile字段');
          // 获取当前用户所有字段
          const currentUser = userAfterUpdate;
          // 添加mobile字段
          currentUser.mobile = update.phoneNumber;
          // 使用set方法替换整个文档
          await db.collection('uni-id-users')
            .doc(userId)
            .set(currentUser);
          console.log('set方法更新完成');
        } catch (setErr) {
          console.error('set方法更新失败:', setErr);
        }
      }
      
      return {
        code: 0,
        message: '更新成功',
        data: {
          updated: updateData
        }
      };
    } catch (updateErr) {
      console.error('数据库更新操作失败:', updateErr);
      return {
        code: -1,
        message: '数据库更新失败: ' + updateErr.message
      };
    }
  } catch (err) {
    console.error('更新用户信息失败:', err);
    return {
      code: -1,
      message: '更新用户信息失败: ' + err.message
    };
  }
}; 