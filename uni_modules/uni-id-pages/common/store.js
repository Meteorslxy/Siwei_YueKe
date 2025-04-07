import pagesJson from '@/pages.json'
import config from '@/uni_modules/uni-id-pages/config.js'

// #ifdef VUE2
import Vue from 'vue'
// #endif

// #ifdef VUE3
import { reactive } from 'vue'
// #endif

const uniIdCo = uniCloud.importObject("uni-id-co")
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
				if (token && tokenExpired && tokenExpired > Date.now()) {
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
							const uniIdCo = uniCloud.importObject("uni-id-co", {
								customUI: true
							});
							
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
				const uniIdCo = uniCloud.importObject("uni-id-co", {
					customUI: true
				});
				
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
		if(uniCloud.getCurrentUserInfo().tokenExpired > Date.now()){
			try{
				await uniIdCo.logout();
			}catch(e){
				console.error('注销时发生错误:', e);
			}
		}
		
		// 清理token
		uni.removeStorageSync('uni_id_token');
		uni.setStorageSync('uni_id_token_expired', 0);
		
		// 清空store中的用户信息
		this.setUserInfo({},{cover:true});
		
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
			uni.setStorageSync('uni_id_token', e.token || e.accessToken);
			uni.setStorageSync('uni_id_token_expired', e.tokenExpired);
			console.log('已保存token信息到storage');
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

		if (autoBack) {
			this.loginBack({uniIdRedirectUrl});
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

export { store } 