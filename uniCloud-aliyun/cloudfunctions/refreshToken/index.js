'use strict';

// 云函数入口
exports.main = async (event, context) => {
	const { userId } = event;
	const db = uniCloud.database();
	
	console.log('开始刷新token，用户ID:', userId);
	
	// 如果没有提供userId，返回错误
	if (!userId) {
		return {
			code: -1,
			message: '缺少必要参数：userId'
		};
	}
	
	try {
		// 直接查询数据库确认用户是否存在
		const userResult = await db.collection('uni-id-users').doc(userId).get();
		
		if (!userResult.data || userResult.data.length === 0) {
			return {
				code: -2,
				message: '未找到用户'
			};
		}
		
		// 获取用户信息
		const userInfo = userResult.data[0] || userResult.data;
		
		// 生成新的token
		// 这里使用简单格式: ${userId}_${timestamp}_${randomPart}
		const timestamp = Date.now();
		const randomPart = Math.random().toString(36).substring(2, 10);
		const newToken = `${userId}_${timestamp}_${randomPart}`;
		
		// 生成token过期时间，这里设置为7天后
		const tokenExpired = timestamp + 7 * 24 * 60 * 60 * 1000;
		
		console.log('生成新token:', newToken);
		
		// 可选：将token更新到用户信息中
		/* 如果需要更新用户表中的token信息，取消这段代码的注释
		await db.collection('uni-id-users').doc(userId).update({
			token: newToken,
			token_expired: tokenExpired
		});
		*/
		
		return {
			code: 0,
			message: '刷新token成功',
			token: newToken,
			tokenExpired: tokenExpired
		};
	} catch (error) {
		console.error('刷新token失败:', error);
		return {
			code: -3,
			message: error.message || '刷新token失败',
			error: JSON.stringify(error)
		};
	}
}; 