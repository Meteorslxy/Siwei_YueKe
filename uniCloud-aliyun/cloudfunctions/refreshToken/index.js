'use strict';

// 云函数入口
exports.main = async (event, context) => {
	// 获取客户端传递的userId
	const { userId } = event;
	
	// 参数检查
	if (!userId) {
		return {
			code: 1,
			message: '缺少用户ID'
		};
	}
	
	// 获取数据库引用
	const db = uniCloud.database();
	
	try {
		// 查询用户信息确认用户存在
		const userInfo = await db.collection('uni-id-users').doc(userId).get();
		
		if (!userInfo.data || userInfo.data.length === 0) {
			return {
				code: 2,
				message: '用户不存在'
			};
		}
		
		// 获取用户数据
		const user = userInfo.data[0];
		
		// 创建token
		const token = createToken(user);
		
		// 设置token过期时间
		const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天有效期
		
		// 返回token信息
		return {
			code: 0,
			message: 'token刷新成功',
			token,
			tokenExpired
		};
	} catch (error) {
		console.error('刷新token失败:', error);
		return {
			code: 500,
			message: '服务器内部错误',
			error: error.message
		};
	}
};

// 创建一个简单的token
function createToken(user) {
	// 创建token的payload部分
	const payload = {
		uid: user._id,
		role: user.role || [],
		exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7天有效期
	};
	
	// 将payload转为JSON，再编码为Base64
	const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
	
	// 在实际应用中，这里应该添加签名，但为了简单起见，我们只返回编码后的payload
	// 注意：这不是一个安全的token生成方法，仅用于演示
	const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Payload}.SIGNATURE`;
	
	return token;
} 