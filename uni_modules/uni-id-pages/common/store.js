import pagesJson from '@/pages.json'
import config from '@/uni_modules/uni-id-pages/config.js'

// #ifdef VUE2
import Vue from 'vue'
// #endif

// #ifdef VUE3
import { reactive } from 'vue'
// #endif

const uniIdCo = uniCloud.importObject("uni-id-co", {
	errorOptions: {
		type: 'toast'
	}
})
const db = uniCloud.database();
const usersTable = db.collection('uni-id-users')

let hostUserInfo = uni.getStorageSync('uni-id-pages-userInfo')||{}

const data = {
	userInfo: hostUserInfo,
	hasLogin: Object.keys(hostUserInfo).length != 0
}

// 创建响应式store对象
let store;
// #ifdef VUE2
// 通过Vue.observable创建一个可响应的对象
store = Vue.observable(data)
// #endif

// #ifdef VUE3
// 通过reactive创建一个可响应的对象
store = reactive(data)
// #endif

// 定义 mutations, 修改属性
export const mutations = {
	// data不为空，表示传递要更新的值(注意不是覆盖是合并),什么也不传时，直接查库获取更新
	async updateUserInfo(data = false) {
		if (data) {
			usersTable.where('_id==$env.uid').update(data).then(e => {
				// console.log(e);
				if (e.result.updated) {
					uni.showToast({
						title: "更新成功",
						icon: 'none',
						duration: 3000
					});
					this.setUserInfo(data);
				} else {
					uni.showToast({
						title: "没有改变",
						icon: 'none',
						duration: 3000
					});
				}
			});
		} else {
			try {
				// 先检查本地存储的用户信息是否存在
				const storedUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
				const hasStoredUserInfo = storedUserInfo && storedUserInfo._id;
				
				// 再检查token是否存在和有效
				const token = uni.getStorageSync('uni_id_token');
				const tokenExpired = uni.getStorageSync('uni_id_token_expired');
				
				console.log('更新用户信息检查:', {
					hasToken: !!token,
					hasExpired: !!tokenExpired,
					tokenValid: tokenExpired > Date.now(),
					hasStoredInfo: !!hasStoredUserInfo
				});
				
				// 优先使用本地存储的用户信息，确保至少有基本数据
				if (hasStoredUserInfo) {
					console.log('先加载本地缓存的用户信息');
					// 确保store中有用户信息，但不完全覆盖，保留可能存在的其他信息
					if (!store.userInfo || !store.userInfo._id) {
						this.setUserInfo(storedUserInfo, {cover: true});
					}
				}
				
				// 如果token有效，尝试从服务器获取最新信息
				if (token && typeof token === 'string' && tokenExpired && tokenExpired > Date.now()) {
					// 不等待联网查询，立即更新用户_id确保store.userInfo中的_id是最新的
					const userInfoFromToken = uniCloud.getCurrentUserInfo();
					if (userInfoFromToken && userInfoFromToken.uid) {
						const _id = userInfoFromToken.uid;
						
						// 如果store中的_id和token中的不一致，更新它
						if (!store.userInfo || store.userInfo._id !== _id) {
							this.setUserInfo({_id}, {cover: false}); // 不覆盖，只更新_id
						}
						
						// 查库获取用户信息，更新store.userInfo
						try {
							let res = await usersTable.where("'_id' == $cloudEnv_uid")
								.field('mobile,nickname,username,email,avatar_file')
								.get();

							if (res.result && res.result.data && res.result.data.length > 0) {
								let realNameRes;
								try {
									realNameRes = await uniIdCo.getRealNameInfo();
								} catch (realNameError) {
									console.error('获取实名信息失败:', realNameError);
									realNameRes = null;
								}

								// 更新用户信息，但不覆盖已有信息
								const newUserInfo = {
									...res.result.data[0],
									realNameAuth: realNameRes || {}
								};
								
								console.log('从服务器获取到新的用户信息', newUserInfo);
								this.setUserInfo(newUserInfo, {cover: false});
							}
						} catch (e) {
							console.error('获取用户信息失败:', e);
							// 这里不再清除token和用户信息，保持现有状态
						}
					}
				} else if (token && !hasStoredUserInfo) {
					// token无效且没有缓存用户信息，才清理token
					console.log('token无效，清除token但不清除用户状态');
					uni.removeStorageSync('uni_id_token');
					uni.removeStorageSync('uni_id_token_expired');
				}
			} catch (outerError) {
				console.error('updateUserInfo外层错误:', outerError);
				// 即使出错也不清除用户信息，保持最后一个可用状态
			}
		}
	},
	
	// 静默更新token的方法（小程序环境）
	async silentUpdateToken() {
		// #ifdef MP-WEIXIN
		try {
			// 获取小程序登录凭证
			const loginRes = await new Promise((resolve, reject) => {
				uni.login({
					provider: 'weixin',
					success: resolve,
					fail: reject
				});
			});
			
			if (loginRes.code) {
				console.log('获取到小程序登录凭证，尝试刷新token');
				// 调用云函数刷新token
				
				// 静默登录，更新token
				const loginResult = await uniIdCo.loginByWeixin({
					code: loginRes.code,
					autoUpdate: true  // 该参数表示静默更新，不创建新用户
				}).catch(err => {
					console.error('静默登录失败:', err);
					return null;
				});
				
				if (loginResult && loginResult.token) {
					console.log('成功刷新token');
					uni.setStorageSync('uni_id_token', loginResult.token);
					uni.setStorageSync('uni_id_token_expired', loginResult.tokenExpired);
					return true;
				}
			}
		} catch (err) {
			console.error('静默更新token失败:', err);
		}
		// #endif
		return false;
	},
	setUserInfo(data, {cover}={cover:false}) {
		// console.log('set-userInfo', data);
		let userInfo = cover?data:Object.assign(store.userInfo,data);
		store.userInfo = Object.assign({},userInfo);
		store.hasLogin = Object.keys(store.userInfo).length != 0;
		// console.log('store.userInfo', store.userInfo);
		uni.setStorageSync('uni-id-pages-userInfo', store.userInfo);
		return data;
	},
	async logout() {
		// 先保存当前用户信息，以便后续恢复
		const currentUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
		console.log('注销前保存用户信息:', currentUserInfo);
		
		// 1. 已经过期就不需要调用服务端的注销接口	2.即使调用注销接口失败，不能阻塞客户端
		try {
			// 获取token并检查类型和有效性
			const token = uni.getStorageSync('uni_id_token');
			const tokenExpired = uni.getStorageSync('uni_id_token_expired');
			
			// 增强token有效性检查：确保token格式正确、非空且未过期
			const isTokenValid = token && 
			    typeof token === 'string' && 
			    token.length > 10 && // 确保token不是空字符串或过短
			    tokenExpired && 
			    tokenExpired > Date.now(); // 确保token未过期
			
			if (isTokenValid) {
				try{
					console.log('token有效，调用logout云函数');
					// 使用customUI参数创建uniIdCo对象，禁止自动显示错误提示
					const uniIdCoCustom = uniCloud.importObject("uni-id-co", {
						customUI: true,
						// 完全禁用错误提示
						errorOptions: {
							type: 'none' 
						}
					});
					await uniIdCoCustom.logout();
					console.log('logout云函数调用成功');
				}catch(e){
					// 完全静默处理错误，仅记录日志
					console.log('注销时发生错误，已捕获并忽略:', e.message || e);
				}
			} else {
				console.log('token无效或已过期，跳过调用logout云函数');
			}
		} catch (logoutError) {
			console.log('注销过程处理错误:', logoutError.message || logoutError);
		}
		
		// 清理所有相关的本地缓存
		console.log('清理本地存储的token和用户信息');
		uni.removeStorageSync('uni_id_token');
		uni.removeStorageSync('uni_id_token_expired');
		uni.removeStorageSync('uni-id-pages-userInfo');
		uni.removeStorageSync('userInfo');
		
		// 清除其他可能存在的与用户相关的缓存
		try {
			let cacheKeys = [];
			// #ifdef MP || APP-PLUS
			cacheKeys = uni.getStorageInfoSync().keys;
			// #endif
			// #ifdef H5
			for (let i = 0; i < localStorage.length; i++) {
				cacheKeys.push(localStorage.key(i));
			}
			// #endif
			
			// 清除包含"token"或"user"的存储项
			const userRelatedKeys = cacheKeys.filter(key => 
				key.toLowerCase().includes('token') || 
				key.toLowerCase().includes('user') ||
				key.toLowerCase().includes('login')
			);
			
			userRelatedKeys.forEach(key => {
				console.log('清除用户相关缓存:', key);
				uni.removeStorageSync(key);
			});
		} catch (e) {
			console.error('清除用户缓存时出错:', e);
		}
		
		// 清空store中的用户信息
		this.setUserInfo({},{cover:true});
		
		// 在全局应用对象中设置防止自动重新登录的标志
		try {
			const app = getApp();
			if (app && app.globalData) {
				console.log('设置全局防止自动登录标志');
				app.globalData.preventAutoLogin = true;
				app.globalData.logoutTime = Date.now();
				app.globalData.userInfo = null;
			}
		} catch (e) {
			console.log('设置全局防止自动登录标志失败:', e);
		}
		
		// 通知其他组件登录状态改变
		uni.$emit('uni-id-pages-logout');
		
		// 跳转到首页而不是登录页，避免找不到页面的问题
		try {
			// 尝试返回到上一页
			uni.navigateBack({
				fail: () => {
					// 如果返回失败，跳转到首页
					const homePage = pagesJson.pages[0].path;
					console.log('跳转到首页:', homePage);
					uni.reLaunch({
						url: `/${homePage}`
					});
				}
			});
		} catch (e) {
			console.error('跳转失败:', e);
			// 最后防线：尝试跳转到tabBar页面
			const tabbarPages = pagesJson.tabBar ? pagesJson.tabBar.list : [];
			if (tabbarPages && tabbarPages.length > 0) {
				const firstTabPage = tabbarPages[0].pagePath;
				console.log('尝试跳转到tabBar页面:', firstTabPage);
				uni.switchTab({
					url: `/${firstTabPage}`
				});
			}
		}
	},
	loginBack (e = {}) {
		const {uniIdRedirectUrl = ''} = e;
		let delta = 0; //判断需要返回几层
		let pages = getCurrentPages();
		// console.log(pages);
		pages.forEach((page, index) => {
			if (pages[pages.length - index - 1].route.split('/')[3] == 'login') {
				delta++;
			}
		});
		// console.log('判断需要返回几层:', delta);
		if (uniIdRedirectUrl) {
			return uni.redirectTo({
				url: uniIdRedirectUrl,
				fail: (err1) => {
					uni.switchTab({
						url:uniIdRedirectUrl,
						fail: (err2) => {
							console.log(err1,err2);
						}
					});
				}
			});
		}
		// #ifdef H5
		if (e.loginType == 'weixin') {
			// console.log('window.history', window.history);
			return window.history.go(-3);
		}
		// #endif

		if (delta) {
			const page = pagesJson.pages[0];
			return uni.reLaunch({
				url: `/${page.path}`
			});
		}

		uni.navigateBack({
			delta
		});
	},
	loginSuccess(e = {}) {
		// 设置 token
		const {
			showToast = true, 
			toastText = '登录成功', 
			autoBack = true, 
			uniIdRedirectUrl = '', 
			passwordConfirmed = (e.password_confirm && e.password_confirm === 'true'),
			config: paramConfig // 从参数中获取config
		} = e;
		
		// 确保引用的是正确的config
		const localConfig = paramConfig || config || {}; // 优先使用传入的config，然后是导入的config
		
		// 确保setPasswordAfterLogin存在并检查类型
		const needSetPassword = typeof localConfig.setPasswordAfterLogin === 'object' 
			? !!localConfig.setPasswordAfterLogin 
			: !!localConfig.setPasswordAfterLogin;

		if (e.errMsg && e.errMsg.indexOf('token不存在') > -1) {
			uni.showToast({
				title: e.errMsg || '登录失败',
				icon: 'none'
			});
			return
		}

		//习惯问题，有的云端会返回 token 有的返回 accessToken 
		if (e.token || e.accessToken) {
			let token = (e.token || e.accessToken);
			
			// 增强的类型检查和错误处理
			// 1. 如果token是数组，取第一个有效的字符串token
			if (Array.isArray(token)) {
				console.log('收到token数组，尝试提取有效token');
				const validTokens = token.filter(t => typeof t === 'string' && t.length > 0);
				if (validTokens.length > 0) {
					token = validTokens[0];
					console.log('从数组中提取到有效token');
				} else {
					console.error('token数组中没有有效的token');
					token = null;
				}
			} 
			// 2. 如果token是对象但不是数组，尝试转为字符串
			else if (typeof token === 'object' && token !== null) {
				console.error('收到对象类型token，尝试转换为字符串', typeof token);
				try {
					if (token.toString && typeof token.toString === 'function' && token.toString() !== '[object Object]') {
						token = token.toString();
						console.log('将对象token转换为字符串');
					} else {
						console.error('无法将对象token转换为有效字符串');
						token = null;
					}
				} catch (err) {
					console.error('转换token对象为字符串时出错:', err);
					token = null;
				}
			}
			
			// 3. 最后检查token是否为有效字符串
			if (typeof token === 'string' && token.length > 0) {
				uni.setStorageSync('uni_id_token', token);
				uni.setStorageSync('uni_id_token_expired', e.tokenExpired);
				console.log('已保存token信息到storage');
			} else {
				console.error('token格式无效，无法保存:', typeof token);
				// 创建临时token以便用户后续刷新
				if (e.uid || (e.userInfo && e.userInfo._id)) {
					const userId = e.uid || e.userInfo._id;
					const tmpToken = `${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
					const tmpExpired = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7天过期
					console.log('创建临时token:', tmpToken.substring(0, 10) + '...');
					uni.setStorageSync('uni_id_token', tmpToken);
					uni.setStorageSync('uni_id_token_expired', tmpExpired);
				}
			}
		}
    
		// 异步调用（更新用户信息）防止获取头像等操作阻塞页面返回
		this.updateUserInfo();

		// 触发uni-id-pages的登录成功事件
		uni.$emit('uni-id-pages-login-success');
		
		// 同时触发应用自定义的登录成功事件，确保兼容性
		uni.$emit('user:login', e.userInfo || {});
		uni.$emit('login:success', e.userInfo || {});
		
		// 显示登录成功的提示
		if (showToast) {
			uni.showToast({
				title: toastText,
				icon: 'none',
				duration: 3000
			});
		}
		
		// 检查是否是首次登录
		const hasSetStudentName = uni.getStorageSync('hasSetStudentName');
		const isFirstLogin = !hasSetStudentName;
		
		// 检查用户信息是否有效
		const token = uni.getStorageSync('uni_id_token');
		const userInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
		const hasValidUserInfo = token && userInfo && userInfo._id;
		
		// 如果是首次登录且用户信息有效，在跳转后触发学生姓名设置弹窗
		if (isFirstLogin && hasValidUserInfo) {
			console.log('检测到首次登录，即将展示学生姓名设置弹窗');
			// 确保清除可能错误设置的标记
			uni.removeStorageSync('hasSetStudentName');
			
			setTimeout(() => {
				// 再次检查登录状态，确保用户仍然登录
				const currentToken = uni.getStorageSync('uni_id_token');
				if (currentToken) {
					console.log('触发App全局方法检查学生姓名设置状态');
					try {
						// 获取App实例
						const app = getApp();
						if (app && app.checkStudentNameStatus) {
							// 使用App中的方法进行更完整的检查
							app.checkStudentNameStatus(userInfo, true);
						} else {
							// 如果获取不到App实例或方法不存在，则直接触发弹窗
							console.log('无法获取App实例或方法不存在，直接触发学生姓名设置弹窗');
							uni.$emit('show:student-name-modal');
						}
					} catch (e) {
						console.error('触发学生姓名设置检查失败:', e);
						// 出错时直接触发弹窗
						uni.$emit('show:student-name-modal');
					}
				} else {
					console.log('用户已退出登录，不显示姓名设置弹窗');
				}
			}, 1500); // 页面跳转完成后显示弹窗
		} else if (hasValidUserInfo) {
			console.log('非首次登录或已设置过学生姓名，但仍检查一次云端数据');
			// 即使不是首次登录，也调用一次检查方法，以确保与云端数据一致
			try {
				// 获取App实例
				const app = getApp();
				if (app && app.checkStudentNameStatus) {
					// 延迟执行，确保页面跳转完成
					setTimeout(() => {
						app.checkStudentNameStatus(userInfo, false);
					}, 1800);
				}
			} catch (e) {
				console.error('非首次登录检查学生姓名设置状态失败:', e);
			}
		}
		
		// 检查是否需要设置密码
		if (needSetPassword && !passwordConfirmed) {
			// 账号密码登录方式不需要跳转到设置密码页面
			if (e.loginType === 'username' || e.type === 'password' || e.type === 'account') {
				console.log('账号密码登录方式，跳过设置密码步骤');
				// 不执行跳转到设置密码页面的逻辑，继续后续操作
			} else {
				try {
					// 确保loginType有值，避免undefined在URL中
					const loginTypeParam = e.loginType ? `&loginType=${e.loginType}` : '';
					const uniIdRedirectUrlParam = uniIdRedirectUrl ? 
						`?uniIdRedirectUrl=${encodeURIComponent(uniIdRedirectUrl)}${loginTypeParam}` : 
						(e.loginType ? `?loginType=${e.loginType}` : '');
					
					// 确保路径格式正确
					const setPasswordPath = '/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd';
					const url = setPasswordPath + uniIdRedirectUrlParam;
					
					console.log('准备跳转到设置密码页面:', url);
					
					uni.redirectTo({
						url: url,
						fail: (err) => {
							console.error('跳转到设置密码页面失败:', err);
							// 如果路径不存在，尝试备用路径
							if (err.errMsg && err.errMsg.includes('not found')) {
								const fallbackUrl = '/pages/index/index';
								console.log('尝试跳转到首页:', fallbackUrl);
								uni.reLaunch({
									url: fallbackUrl,
									fail: (fallbackErr) => {
										console.error('跳转到首页也失败:', fallbackErr);
										uni.showToast({
											title: '页面跳转失败',
											icon: 'none'
										});
									}
								});
								return;
							}
							
							// 跳转失败时回到首页
							uni.showToast({
								title: '页面跳转失败',
								icon: 'none'
							});
							setTimeout(() => {
								uni.reLaunch({
									url: localConfig.customHomePagePath || '/pages/index/index'
								});
							}, 1500);
						}
					});
					return; // 阻止继续执行后续代码
				} catch (err) {
					console.error('设置密码页面跳转出错:', err);
				}
			}
		}

		// 修改：优先跳转到用户个人中心页面
		if (autoBack) {
			// 跳转到个人中心页面
			console.log('登录成功，跳转到个人中心页面');
			setTimeout(() => {
				uni.switchTab({
					url: '/pkgs/user/user',
					success: () => {
						console.log('跳转到个人中心成功');
					},
					fail: (err) => {
						console.error('跳转到个人中心失败:', err);
						// 失败时使用原有的跳转逻辑
						this.loginBack({uniIdRedirectUrl});
					}
				});
			}, 1000);
		} else if (!needSetPassword) {
			// 没有自动返回且不需要设置密码时，跳转到首页
			console.log('登录成功，跳转到首页:', localConfig.customHomePagePath);
			setTimeout(() => {
				uni.reLaunch({
					url: localConfig.customHomePagePath || '/pages/index/index',
					fail: (err) => {
						console.error('跳转首页失败:', err);
						// 尝试使用switchTab
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				});
			}, 1500);
		}
	}
}

// 创建token修复函数 - 将字符串token转换为数组格式
export const fixTokenFormat = async function(userId) {
	if (!userId) return console.error('修复token需要用户ID');
	
	try {
		console.log('尝试修复用户token格式:', userId);
		const db = uniCloud.database();
		
		// 查询用户信息
		const userResult = await db.collection('uni-id-users').doc(userId).get();
		if (!userResult.data || userResult.data.length === 0) {
			return console.error('找不到要修复token的用户');
		}
		
		const user = userResult.data[0];
		const token = user.token;
		
		// 检查token格式
		if (typeof token === 'string') {
			console.log('发现字符串格式token，修复为数组格式');
			
			// 更新为数组格式
			await db.collection('uni-id-users').doc(userId).update({
				token: [token]
			});
			
			console.log('token格式修复完成');
			return true;
		} else if (Array.isArray(token)) {
			console.log('token已经是数组格式，无需修复');
			return false;
		} else if (!token) {
			console.log('用户没有token，无需修复');
			return false;
		} else {
			console.error('未知token格式:', typeof token);
			return false;
		}
	} catch (err) {
		console.error('修复token格式失败:', err);
		return false;
	}
}

export { store } 