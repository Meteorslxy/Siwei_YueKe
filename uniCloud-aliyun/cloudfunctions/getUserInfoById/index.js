'use strict';

exports.main = async (event, context) => {
	const { userId } = event;
	
	if (!userId) {
		return {
			code: -1,
			message: '缺少必要参数：userId'
		};
	}
	
	try {
		// 使用管理员权限访问数据库
		const db = uniCloud.database();
		const dbCmd = db.command;
		
		console.log('开始以管理员权限查询用户信息:', userId);
		
		// 定义字段选择器(对象形式)
		const fieldSelector = {
			_id: true,
			username: true,
			nickname: true,
			mobile: true,
			email: true,
			avatar: true,
			avatar_file: true,
			gender: true,
			birthday: true,
			location: true,
			introduction: true,
			register_date: true,
			last_login_date: true,
			role: true,
			status: true,
			wx_openid: true
		};
		
		// 查询用户基本信息（不包含敏感字段）
		let userResult;
		try {
			userResult = await db.collection('uni-id-users')
				.doc(userId)
				.field(fieldSelector)
				.get();
				
			console.log('查询结果:', JSON.stringify(userResult));
		} catch (dbError) {
			console.error('数据库查询失败:', dbError);
			
			// 尝试使用云函数操作模式
			try {
				const collection = db.collection('uni-id-users');
				userResult = await collection.doc(userId).get({
					getOne: true,  // 明确指定获取一条记录
					field: fieldSelector
				});
				
				console.log('使用云函数模式查询结果:', JSON.stringify(userResult));
			} catch (altError) {
				console.error('备选查询方式也失败:', altError);
				return {
					code: -4, 
					message: '数据库查询失败:' + (altError.message || JSON.stringify(altError))
				};
			}
		}
		
		if (!userResult || !userResult.data || (Array.isArray(userResult.data) && userResult.data.length === 0)) {
			console.log('未找到用户信息:', userId);
			return {
				code: -2,
				message: '未找到用户信息'
			};
		}
		
		// 获取用户信息
		const userInfo = Array.isArray(userResult.data) ? userResult.data[0] : userResult.data;
		console.log('成功获取用户信息');
		
		// 检查用户是否设置了密码
		let hasPassword = false;
		try {
			const hasPasswordResult = await db.collection('uni-id-users')
				.where({
					_id: userId,
					password: dbCmd.exists(true)
				})
				.count();
				
			hasPassword = hasPasswordResult && hasPasswordResult.total > 0;
		} catch (pwdError) {
			console.error('检查密码字段失败:', pwdError);
			// 如果检查密码字段失败，默认为false，不影响其他功能
		}
		
		// 返回用户信息
		return {
			code: 0,
			message: '获取用户信息成功',
			userInfo: userInfo,
			isPasswordSet: hasPassword
		};
	} catch (error) {
		console.error('获取用户信息失败:', error);
		return {
			code: -3,
			message: error.message || '获取用户信息失败',
			error: JSON.stringify(error)
		};
	}
}; 