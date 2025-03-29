'use strict';

/**
 * 云函数入口文件
 * 四维教育小程序云函数连接测试
 * @description 用于测试云函数连接状态的函数
 */
exports.main = async (event, context) => {
	console.log('云函数测试被调用，环境上下文：', context);
	console.log('云函数测试输入参数：', event);
	
	// 提取测试模式
	const testMode = event.testMode || 'basic';
	const message = event.message || '无消息';
	
	// 记录请求设备和来源
	let clientInfo = {};
	if (context && context.CLIENTINFO) {
		clientInfo = context.CLIENTINFO;
	}
	
	try {
		// 根据测试模式选择不同的测试
		switch (testMode) {
			case 'basic':
				// 基础连接测试 - 返回简单的成功消息
				return {
					code: 0,
					success: true,
					message: `云函数连接成功: ${message}`,
					requestId: context.requestId || '',
					timestamp: new Date().toISOString(),
				};
				
			case 'detail':
				// 详细信息测试 - 返回更多环境信息
				return {
					code: 0,
					success: true,
					message: `云函数连接成功: ${message}`,
					requestId: context.requestId || '',
					timestamp: new Date().toISOString(),
					context: {
						spaceInfo: context.SPACEINFO,
						clientInfo: clientInfo,
						env: process.env.NODE_ENV,
						platform: process.platform,
						version: process.version
					}
				};
				
			case 'db':
				// 数据库连接测试
				console.log('测试数据库连接...');
				const db = uniCloud.database();
				// 尝试执行一个简单的集合查询
				const collection = db.collection('test');
				
				const testData = {
					name: '测试数据',
					createdAt: new Date(),
					message
				};
				
				// 写入测试数据
				const addResult = await collection.add(testData);
				
				// 查询刚添加的数据
				const dbResult = await collection.doc(addResult.id).get();
				
				return {
					code: 0,
					success: true,
					message: '数据库连接成功',
					data: dbResult.data,
					requestId: context.requestId || '',
					timestamp: new Date().toISOString()
				};
				
			case 'error':
				// 错误处理测试 - 故意抛出错误
				throw new Error('这是一个测试错误');
				
			default:
				// 未知测试模式
				return {
					code: 1,
					success: false,
					message: `未知的测试模式: ${testMode}`,
					requestId: context.requestId || '',
					timestamp: new Date().toISOString()
				};
		}
	} catch (error) {
		// 记录详细错误信息
		console.error('云函数测试发生错误:', error);
		
		// 返回格式化的错误响应
		return {
			code: -1,
			success: false,
			message: `云函数执行错误: ${error.message}`,
			error: {
				message: error.message,
				stack: error.stack,
				name: error.name
			},
			requestId: context.requestId || '',
			timestamp: new Date().toISOString()
		};
	}
}; 