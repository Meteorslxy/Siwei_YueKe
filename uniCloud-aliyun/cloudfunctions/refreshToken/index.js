'use strict';

// 云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 刷新用户token
 * @param {Object} event
 * @param {String} event.token - 当前token
 */
exports.main = async (event, context) => {
	console.log('refreshToken云函数被调用，参数:', event);
	
	try {
		const { token } = event;
		
		// 基本参数校验
		if (!token) {
			return {
				code: -1,
				message: '缺少必要参数',
			};
		}
		
		// 解析token，获取用户信息
		// 注意：这里直接使用getUserInfoByToken云函数获取用户信息，不自己解析token
		const userInfoResult = await uniCloud.callFunction({
			name: 'getUserInfoByToken',
			data: { uniIdToken: token }
		});
		
		console.log('获取用户信息结果:', userInfoResult.result);
		
		// 检查用户信息获取是否成功
		if (userInfoResult.result.code !== 0 || !userInfoResult.result.userInfo) {
			console.log('根据token获取用户信息失败');
			return {
				code: -2,
				message: '无效的token或token已失效',
			};
		}
		
		const userData = userInfoResult.result.userInfo;
		
		// 生成新的token，有效期延长7天
		const tokenExpireTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天后的时间戳
		const newToken = token.split('.')[0] + '.' + Math.random().toString(36).substring(2) + '.' + Math.random().toString(36).substring(2);
		
		// 更新用户token信息到数据库
		try {
			await db.collection('users').doc(userData._id).update({
				token: newToken,
				token_expired: tokenExpireTime,
				last_login_date: new Date()
			});
			
			console.log('已更新用户token，用户ID:', userData._id);
		} catch (dbError) {
			console.error('更新用户token失败:', dbError);
			
			// 尝试使用另一种表名
			try {
				await db.collection('uni-id-users').doc(userData._id).update({
					token: [newToken],
					token_expired: tokenExpireTime,
					last_login_date: new Date()
				});
				console.log('已更新用户token(uni-id-users表)，用户ID:', userData._id);
			} catch (dbError2) {
				console.error('更新用户token失败(uni-id-users表):', dbError2);
				return {
					code: -3,
					message: '更新token失败',
				};
			}
		}
		
		// 保留用户原有nickname，防止被重置
		if (userData.nickname && userData.nickname !== '微信用户') {
			console.log('保留用户原有昵称:', userData.nickname);
			// 确保返回的用户信息中包含原有nickname
		}
		
		// 返回成功结果
		return {
			code: 0,
			message: 'token刷新成功',
			token: newToken,
			tokenExpired: tokenExpireTime,
			userInfo: userData
		};
	} catch (error) {
		console.error('刷新token失败:', error);
		return {
			code: -4,
			message: '刷新token失败: ' + (error.message || '未知错误')
		};
	}
}; 