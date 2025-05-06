'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取客户端信息
  const { PLATFORM, APPID, CLIENTIP } = context;
  
  // 直接记录完整的event对象
  console.log('完整的event参数:', JSON.stringify(event));
  
  // 尝试多种方式获取nickname
  const nickname = event.nickname || event.nickName || (event.data && event.data.nickname) || '';
  const avatar = event.avatar || event.avatarUrl || (event.data && event.data.avatar) || '';
  const gender = event.gender !== undefined ? event.gender : 
                (event.data && event.data.gender !== undefined ? event.data.gender : undefined);
  
  // 获取wx_nickname，用于保存微信原始昵称
  const wx_nickname = event.wx_nickname || (event.data && event.data.wx_nickname) || 
                     (event.updateData && event.updateData.wx_nickname) || '';
  
  console.log('提取的参数:', {nickname, avatar, gender, wx_nickname});
  
  try {
    // 获取当前用户ID
    // 先尝试从事件参数中获取token，再尝试从context中获取
    const token = event.token || event.uni_id_token || context.UNICLOUD_TOKEN || '';
    
    if (!token) {
      console.error('未获取到token');
      return {
        code: -1,
        message: '未登录'
      };
    }
    
    console.log('获取到token:', token.substring(0, 20) + '...');
    
    // 解析token获取用户ID
    let userId = '';
    
    // 尝试解析JWT格式token
    try {
      // JWT格式: header.payload.signature
      const parts = token.split('.');
      if (parts.length === 3) {
        // 解码payload部分
        const base64Payload = parts[1];
        let payload;
        
        // 解码base64
        if (typeof atob === 'function') {
          payload = JSON.parse(atob(base64Payload));
        } else {
          // Node.js环境
          payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
        }
        
        console.log('JWT token payload:', JSON.stringify(payload));
        
        if (payload && payload.uid) {
          userId = payload.uid;
          console.log('从JWT token获取用户ID:', userId);
        }
      }
    } catch (jwtError) {
      console.error('解析JWT token失败:', jwtError);
    }
    
    // 如果JWT解析失败，尝试解析简单格式token (格式: token_userId_timestamp_random)
    if (!userId && token.includes('_')) {
      const parts = token.split('_');
      if (parts.length >= 3 && parts[0] === 'token') {
        userId = parts[1];
        console.log('从简单token获取用户ID:', userId);
      }
    }
    
    // 如果还是没有userId，尝试直接从event中获取
    if (!userId && (event.userId || event.uid || event._id || event.user_id)) {
      userId = event.userId || event.uid || event._id || event.user_id;
      console.log('从请求参数中获取用户ID:', userId);
    }
    
    // 直接从token查询用户
    if (!userId && token) {
      try {
        // 尝试通过token从uni-id-tokens集合获取用户ID
        const tokenInfo = await db.collection('uni-id-tokens')
          .where({
            token: token
          })
          .limit(1)
          .get();
        
        if (tokenInfo.data && tokenInfo.data.length > 0) {
          userId = tokenInfo.data[0].user_id;
          console.log('从uni-id-tokens表获取用户ID:', userId);
        }
      } catch (err) {
        console.error('查询token表失败:', err);
      }
    }
    
    // 如果前面的方法都没有获取到userId，尝试通过用户信息中的手机号查询
    if (!userId && event.mobile) {
      try {
        const userByMobile = await db.collection('uni-id-users')
          .where({
            mobile: event.mobile
          })
          .limit(1)
          .get();
        
        if (userByMobile.data && userByMobile.data.length > 0) {
          userId = userByMobile.data[0]._id;
          console.log('通过手机号查询获取用户ID:', userId);
        }
      } catch (err) {
        console.error('通过手机号查询用户失败:', err);
      }
    }
    
    if (!userId) {
      console.error('无法识别用户ID');
      return {
        code: -1,
        message: '无法识别用户，请重新登录'
      };
    }
    
    // 准备要更新的数据
    const updateData = {};
    
    if (nickname) {
      console.log('设置昵称:', nickname);
      updateData.nickname = nickname;
      
      // 检查是否是真实姓名设置，如果是，将nickname作为真实姓名使用
      if (event.isRealName || event.real_name) {
        console.log('设置真实姓名到nickname字段');
        updateData.nickname = nickname;
        
        // 同时将real_name字段更新为真实姓名
        updateData.real_name = nickname;
      }
    }
    
    // 处理微信原始昵称
    if (wx_nickname) {
      // 获取用户当前信息，检查wx_nickname是否已设置
      try {
        const userInfo = await db.collection('uni-id-users')
          .doc(userId)
          .field({ wx_nickname: true })
          .get();
          
        if (userInfo.data && userInfo.data.length > 0) {
          const currentWxNickname = userInfo.data[0].wx_nickname;
          
          // 只有在以下情况才更新wx_nickname:
          // 1. 用户没有设置过wx_nickname
          // 2. 用户的wx_nickname为默认值"微信用户"
          // 3. 明确在updateData中请求更新wx_nickname (特殊处理，由缓存清理时触发)
          if (!currentWxNickname || 
              currentWxNickname === '微信用户' || 
              event.updateData && event.updateData.wx_nickname) {
            console.log('更新wx_nickname:', wx_nickname);
            updateData.wx_nickname = wx_nickname;
          } else {
            console.log('保留用户现有wx_nickname:', currentWxNickname);
          }
        } else {
          // 如果没有查到用户信息，就直接设置
          console.log('未查询到现有wx_nickname，直接设置:', wx_nickname);
          updateData.wx_nickname = wx_nickname;
        }
      } catch (e) {
        console.error('查询用户wx_nickname失败:', e);
        // 出错时仍然尝试更新
        updateData.wx_nickname = wx_nickname;
      }
    }
    
    if (avatar) {
      console.log('设置头像:', avatar);
      updateData.avatar = avatar;
    }
    
    if (gender !== undefined) {
      console.log('设置性别:', gender);
      updateData.gender = gender;
    }
    
    // 如果没有要更新的数据则返回错误
    if (Object.keys(updateData).length === 0) {
      console.error('未提供要更新的数据');
      return {
        code: -1,
        message: '未提供要更新的数据'
      };
    }
    
    console.log('最终更新数据:', JSON.stringify(updateData));
    
    // 更新用户信息
    await db.collection('uni-id-users')
      .doc(userId)
      .update(updateData);
    
    console.log('数据库更新成功');
    
    // 生成新token
    const newToken = generateToken(userId);
    const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天有效期
    
    // 更新用户token
    await db.collection('uni-id-users')
      .doc(userId)
      .update({
        token: [newToken],
        token_expired: new Date(tokenExpired)
      });
    
    console.log('生成并更新了新token');
    
    // 获取更新后的用户信息
    const userInfo = await db.collection('uni-id-users')
      .doc(userId)
      .get();
    
    if (!userInfo.data || userInfo.data.length === 0) {
      console.error('获取更新后用户信息失败');
      return {
        code: -1,
        message: '获取更新后的用户信息失败'
      };
    }
    
    // 过滤敏感信息，返回前端需要的数据
    const filteredData = filterUserData(userInfo.data[0]);
    
    return {
      code: 0,
      message: '更新成功',
      data: filteredData,
      token: newToken,
      tokenExpired: tokenExpired
    };
  } catch (error) {
    console.error('更新用户信息失败:', error);
    return {
      code: -1,
      message: '更新失败: ' + error.message
    };
  }
};

// 过滤用户数据
function filterUserData(userData) {
  if (!userData) return {};
  
  // 创建新对象，避免修改原有数据
  const filteredData = {
    _id: userData._id || '',
    uid: userData._id || '',  // 使用_id作为uid确保一致性
    nickname: userData.nickname || '',
    username: userData.username || '',
    mobile: userData.mobile || '',
    email: userData.email || '',
    avatar: userData.avatar || '',
    gender: userData.gender || 0,
    status: userData.status || 0
  };
  
  // 确保兼容性：添加前端可能使用的其他字段名
  filteredData.userId = filteredData._id;
  filteredData.nickName = filteredData.nickname;
  filteredData.avatarUrl = filteredData.avatar;
  filteredData.phoneNumber = filteredData.mobile;
  
  return filteredData;
}

// 生成token函数
function generateToken(userId) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `token_${userId}_${timestamp}_${random}`;
} 