'use strict';

// 阿里云云函数入口文件
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	console.log('刷新token云函数调用:', event);
	
	const { userId } = event;
	if (!userId) {
		return {
			code: -1,
			message: '缺少用户ID'
		};
	}
	
	try {
		// 查询用户信息
		const userInfo = await db.collection('uni-id-users')
			.doc(userId)
			.get();
		
		if (!userInfo.data || userInfo.data.length === 0) {
			return {
				code: -1,
				message: '用户不存在'
			};
		}
		
		const userData = userInfo.data[0];
		
		// 生成新token
		const token = generateToken(userId);
		const tokenExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天有效期
		
		// 更新用户token
		await db.collection('uni-id-users')
			.doc(userId)
			.update({
				token: [token],
				token_expired: new Date(tokenExpired)
			});
		
		// 过滤敏感信息，返回前端需要的数据
		const filteredData = filterUserData(userData);
		
		return {
			code: 0,
			message: 'token刷新成功',
			token,
			tokenExpired,
			userInfo: filteredData
		};
	} catch (error) {
		console.error('刷新token失败:', error);
		return {
			code: -1,
			message: '刷新token失败: ' + error.message
		};
	}
};

// 生成token函数
function generateToken(userId) {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2, 10);
	return `token_${userId}_${timestamp}_${random}`;
}

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
		status: userData.status || 0,
		wx_nickname: userData.wx_nickname || '',
		real_name: userData.real_name || ''
	};
	
	// 确保兼容性：添加前端可能使用的其他字段名
	filteredData.userId = filteredData._id;
	filteredData.nickName = filteredData.nickname;
	filteredData.avatarUrl = filteredData.avatar;
	filteredData.phoneNumber = filteredData.mobile;
	
	return filteredData;
} 