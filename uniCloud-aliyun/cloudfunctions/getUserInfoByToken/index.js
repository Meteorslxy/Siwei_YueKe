'use strict';

exports.main = async (event, context) => {
  const { uniIdToken, forceRefresh, userId } = event;
  const db = uniCloud.database();
  
  // 获取客户端传递的token，如果没有传递则从context中获取
  const token = uniIdToken || context.UNICLOUD_TOKEN;
  
  // 如果提供了userId，优先使用userId直接查询
  if (userId) {
    console.log('直接使用提供的userId查询用户信息:', userId);
    
    try {
      // 直接查询数据库
      const userResult = await db.collection('uni-id-users').doc(userId).get();
      
      if (userResult.data && userResult.data.length > 0) {
        const userInfo = userResult.data[0];
        
        // 移除敏感字段
        delete userInfo.password;
        delete userInfo.token;
        delete userInfo.token_expired;
        
        console.log('使用userId直接查询到用户信息:', userInfo);
        
        return {
          code: 0,
          message: '获取用户信息成功',
          userInfo: userInfo
        };
      } else {
        console.log('使用userId未找到用户信息');
      }
    } catch (e) {
      console.error('使用userId查询出错:', e);
    }
  }
  
  // 如果没有token，且userId查询失败，返回错误
  if (!token) {
    return {
      code: -1,
      message: '未提供有效的token'
    };
  }
  
  try {
    console.log('尝试通过token获取用户信息:', token, '是否强制刷新:', forceRefresh);
    
    // 尝试从token中解析uid
    let uid = '';
    try {
      // 将token按 . 分割
      const parts = token.split('.');
      if (parts.length === 3) {
        // Base64解码payload部分(第二部分)
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        console.log('从token负载中解析的信息:', payload);
        if (payload.uid) {
          uid = payload.uid;
          console.log('从token负载中获取到uid:', uid);
        }
      }
    } catch (e) {
      console.error('解析token载荷失败:', e);
    }
    
    // 如果无法从token中提取uid，且没有传入userId，则尝试使用uni-id-co验证token
    if (!uid && !userId) {
      try {
        // 创建云对象
        const uniIdCo = uniCloud.importObject('uni-id-co', {
          customUI: true
        });
        
        // 检查token
        const checkTokenRes = await uniIdCo.checkToken({
          token: token
        });
        
        console.log('检查token结果:', checkTokenRes);
        
        if (checkTokenRes.code !== 0) {
          return {
            code: -2,
            message: 'token无效或已过期',
            detail: checkTokenRes
          };
        }
        
        // 获取用户id
        uid = checkTokenRes.uid;
        
        // 如果uid为空，尝试从userInfo中获取
        if (!uid && checkTokenRes.userInfo && checkTokenRes.userInfo._id) {
          uid = checkTokenRes.userInfo._id;
        }
        
        console.log('从token检查中获取到的用户ID:', uid);
      } catch (checkError) {
        console.error('检查token出错，将继续使用解析方式:', checkError);
        // 继续使用已经解析的uid或userId
      }
    }
    
    // 使用userId作为备用
    uid = uid || userId;
    
    if (!uid) {
      return {
        code: -3,
        message: '无法从token中获取用户ID'
      };
    }
    
    // 直接使用ID查询用户信息
    console.log('查询数据库用户信息，uid:', uid);
    
    // 确保使用正确的集合名
    const userResult = await db.collection('uni-id-users').doc(uid).get();
    
    console.log('数据库查询结果:', userResult);
    
    if (!userResult.data || userResult.data.length === 0) {
      // 如果直接按ID查询失败，尝试使用查询条件
      console.log('按ID直接查询失败，尝试使用条件查询');
      try {
        const queryResult = await db.collection('uni-id-users')
          .where({
            _id: uid
          })
          .limit(1)
          .get();
          
        console.log('条件查询结果:', queryResult);
        
        if (queryResult.data && queryResult.data.length > 0) {
          const userInfo = queryResult.data[0];
          
          // 移除敏感字段
          delete userInfo.password;
          delete userInfo.token;
          delete userInfo.token_expired;
          
          console.log('获取到完整用户信息:', userInfo);
          
          return {
            code: 0,
            message: '获取用户信息成功',
            userInfo: userInfo
          };
        }
      } catch (e) {
        console.error('条件查询失败:', e);
      }
      
      return {
        code: -4,
        message: '未找到用户信息'
      };
    }
    
    // 获取用户信息
    const userInfo = userResult.data[0] || userResult.data;
    
    // 移除敏感字段
    delete userInfo.password;
    delete userInfo.token;
    delete userInfo.token_expired;
    
    console.log('获取到完整用户信息:', userInfo);
    
    // 如果强制刷新，主动更新本地缓存
    if (forceRefresh) {
      try {
        const uni_id_token = token;
        
        // 尝试将获取到的用户信息存入缓存，用于后续的用户信息获取
        const cacheKey = `uni-id-pages-userInfo:${uid}`;
        await uniCloud.redis.set(cacheKey, JSON.stringify(userInfo), {
          ex: 60 * 60 * 24 // 缓存24小时
        });
        
        console.log('用户信息已缓存');
      } catch (cacheError) {
        console.error('缓存用户信息失败:', cacheError);
      }
    }
    
    return {
      code: 0,
      message: '获取用户信息成功',
      userInfo: userInfo
    };
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return {
      code: -5,
      message: error.message || '获取用户信息失败',
      error: JSON.stringify(error)
    };
  }
}; 