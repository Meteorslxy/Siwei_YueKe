<!-- 用户资料页 -->
<template>
	<view class="uni-content">
		<view class="avatar">
			<uni-id-pages-avatar width="260rpx" height="260rpx"></uni-id-pages-avatar>
		</view>
		<uni-list>
			<uni-list-item class="item" @click="setNickname('')" title="昵称" :rightText="userInfo.nickname||'未设置'" link>
			</uni-list-item>
			<uni-list-item class="item" @click="bindMobile" title="手机号" :rightText="userInfo.mobile||'未绑定'" link>
			</uni-list-item>
			<uni-list-item v-if="userInfo.email" class="item" title="电子邮箱" :rightText="userInfo.email">
			</uni-list-item>
			<!-- #ifdef APP -->
      <!-- 如未开通实人认证服务，可以将实名认证入口注释 -->
			<uni-list-item class="item" @click="realNameVerify" title="实名认证" :rightText="realNameStatus !== 2 ? '未认证': '已认证'" link>
			</uni-list-item>
			<!-- #endif -->
			<uni-list-item v-if="hasPassword" class="item" @click="changePassword" title="修改密码" link>
			</uni-list-item>
		</uni-list>
		<!-- #ifndef MP -->
		<uni-list class="mt10">
			<uni-list-item @click="deactivate" title="注销账号" link="navigateTo"></uni-list-item>
		</uni-list>
		<!-- #endif -->
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname" :inputType="setNicknameIng?'nickname':'text'"
				title="设置昵称" placeholder="请输入要设置的昵称">
			</uni-popup-dialog>
		</uni-popup>
		<uni-id-pages-bind-mobile ref="bind-mobile-by-sms" @success="bindMobileSuccess"></uni-id-pages-bind-mobile>
		<template v-if="showLoginManage">
			<button v-if="userInfo._id" @click="logout">退出登录</button>
			<button v-else @click="login">去登录</button>
		</template>
	</view>
</template>
<script>
const uniIdCo = uniCloud.importObject("uni-id-co")
  import {
    store,
    mutations
  } from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
    computed: {
      userInfo() {
        return store.userInfo
      },
	  realNameStatus () {
		  if (!this.userInfo.realNameAuth) {
			  return 0
		  }

		  return this.userInfo.realNameAuth.authStatus
	  }
    },
		data() {
			return {
				univerifyStyle: {
					authButton: {
						"title": "本机号码一键绑定", // 授权按钮文案
					},
					otherLoginButton: {
						"title": "其他号码绑定",
					}
				},
				// userInfo: {
				// 	mobile:'',
				// 	nickname:''
				// },
				hasPassword: false,
				showLoginManage: false ,//通过页面传参隐藏登录&退出登录按钮
				setNicknameIng:false
			}
		},
		async onShow() {
			this.univerifyStyle.authButton.title = "本机号码一键绑定"
			this.univerifyStyle.otherLoginButton.title = "其他号码绑定"
		},
		async onLoad(e) {
			// 检查参数
			if (e && e.showLoginManage) {
				this.showLoginManage = true //通过页面传参隐藏登录&退出登录按钮
			}
			
			// 先尝试从缓存恢复用户信息
			if (store.userInfo && Object.keys(store.userInfo).length) {
				// 已有用户信息，无需再从缓存获取
				console.log('store中已有用户信息，无需从缓存获取');
			} else {
				console.log('尝试从缓存恢复用户信息');
				const cachedUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
				if (cachedUserInfo && cachedUserInfo._id) {
					mutations.setUserInfo(cachedUserInfo, {cover: true});
					console.log('从缓存恢复了用户信息:', cachedUserInfo._id);
				}
			}
			
			// 检查是否有token和用户信息
			const token = uni.getStorageSync('uni_id_token');
			const tokenExpired = uni.getStorageSync('uni_id_token_expired');
			const now = Date.now();
			const hasToken = !!token;
			const hasExpired = tokenExpired && new Date(tokenExpired).getTime() > now;
			// 只要有用户ID就允许访问页面
			const hasUserInfo = store.userInfo && store.userInfo._id;
			
			console.log('个人资料页面onLoad - 检查登录状态:', { 
				hasToken, 
				hasExpired,
				tokenExpired: tokenExpired || 0,
				now,
				hasUserInfo: hasUserInfo ? store.userInfo._id : false
			});
			
			// 有用户信息就允许访问页面，不管token是否有效
			if (!hasUserInfo) {
				console.log('没有找到用户信息，可能需要登录');
				uni.showModal({
					title: '提示',
					content: '无法加载用户信息，请返回首页',
					showCancel: false,
					success: () => {
						uni.navigateBack();
					}
				});
				return;
			}
			
			// 使用更安全的方式获取账号信息
			try {
				// 根据token状态决定是否尝试获取账号信息
				if (hasToken) {
					// 先直接使用token验证方法
					this.getAccountInfoSafe();
				} else {
					console.log('未找到有效token，仅使用本地用户信息');
					// 没有token但有用户信息，所以继续显示页面
					this.hasPassword = false; // 默认设置为false
				}
			} catch (e) {
				console.error('加载用户信息时出错:', e);
				// 出错时仍继续显示页面
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
					complete: (e) => {
						// console.log(e);
					}
				})
			},
			logout() {
				mutations.logout()
			},
			bindMobileSuccess() {
				mutations.updateUserInfo()
			},
			changePassword() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd',
					complete: (e) => {
						// console.log(e);
					}
				})
			},
			bindMobile() {
				// #ifdef APP-PLUS
				uni.preLogin({
					provider: 'univerify',
					success: this.univerify(), //预登录成功
					fail: (res) => { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res)
						this.bindMobileBySmsCode()
					}
				})
				// #endif

				// #ifdef MP-WEIXIN
				this.$refs['bind-mobile-by-sms'].open()
				// #endif

				// #ifdef H5
				//...去用验证码绑定
				this.bindMobileBySmsCode()
				// #endif
			},
			univerify() {
				uni.login({
					"provider": 'univerify',
					"univerifyStyle": this.univerifyStyle,
					success: async e => {
						uniIdCo.bindMobileByUniverify(e.authResult).then(res => {
							mutations.updateUserInfo()
						}).catch(e => {
							console.log(e);
						}).finally(e => {
							// console.log(e);
							uni.closeAuthView()
						})
					},
					fail: (err) => {
						console.log(err);
						if (err.code == '30002' || err.code == '30001') {
							this.bindMobileBySmsCode()
						}
					}
				})
			},
			bindMobileBySmsCode() {
				uni.navigateTo({
					url: './bind-mobile/bind-mobile'
				})
			},
			setNickname(nickname) {
				if (nickname) {
					mutations.updateUserInfo({
						nickname
					})
					this.setNicknameIng = false
					this.$refs.dialog.close()
				} else {
					this.$refs.dialog.open()
				}
			},
			deactivate(){
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate"
				})
			},
			async bindThirdAccount(provider) {
				const uniIdCo = uniCloud.importObject("uni-id-co")
				const bindField = {
					weixin: 'wx_openid',
					alipay: 'ali_openid',
					apple: 'apple_openid',
					qq: 'qq_openid'
				}[provider.toLowerCase()]

				if (this.userInfo[bindField]) {
					await uniIdCo['unbind' + provider]()
					await mutations.updateUserInfo()
				} else {
					uni.login({
						provider: provider.toLowerCase(),
						onlyAuthorize: true,
						success: async e => {
							const res = await uniIdCo['bind' + provider]({
								code: e.code
							})
							if (res.errCode) {
								uni.showToast({
									title: res.errMsg || '绑定失败',
									duration: 3000
								})
							}
							await mutations.updateUserInfo()
						},
						fail: async (err) => {
							console.log(err);
							uni.hideLoading()
						}
					})
				}
			},
			realNameVerify () {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"
				})
			},
			// 安全获取账号信息的方法
			async getAccountInfoSafe() {
				try {
					// 先检查是否有token
					const token = uni.getStorageSync('uni_id_token');
					if (!token) {
						console.log('没有找到token，跳过获取账户信息');
						this.hasPassword = false; // 默认假设没有密码
						return;
					}
					
					// 尝试获取账户信息
					const res = await uniIdCo.getAccountInfo();
					console.log('获取账户信息成功', res);
					this.hasPassword = !!res.isPasswordSet;
				} catch (err) {
					console.error('获取账户信息失败，但不影响页面使用:', err);
					
					// token可能已过期，但我们已经有用户信息，所以继续显示页面
					if (err.message && err.message.includes('token校验未通过')) {
						console.log('token校验未通过，使用缓存的用户信息继续显示页面');
						
						// 尝试刷新token
						this.tryRefreshToken().catch(e => {
							console.error('刷新token失败:', e);
						});
					}
					
					// 默认设置hasPassword为false，避免影响界面显示
					this.hasPassword = false;
				}
			},
			
			// 尝试刷新token
			async tryRefreshToken() {
				try {
					// 尝试清除旧token
					console.log('尝试刷新token...');
					
					// 检查是否有用户信息
					if (!store.userInfo || !store.userInfo._id) {
						console.log('没有用户信息，无法刷新token');
						return false;
					}
					
					// 使用用户ID创建临时token，这个方法需要根据你的实际云函数实现
					const userId = store.userInfo._id;
					console.log('准备刷新token，用户ID:', userId);
					
					// 调用refreshToken云函数刷新token
					const res = await uniCloud.callFunction({
						name: 'refreshToken',
						data: { userId }
					}).catch(e => {
						console.error('调用刷新token云函数失败，继续使用当前用户信息:', e);
						return null;
					});
					
					// 处理响应
					if (res && res.result && res.result.code === 0 && res.result.token) {
						// 保存新token
						console.log('刷新token成功，保存新token');
						uni.setStorageSync('uni_id_token', res.result.token);
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired);
						return true;
					} else {
						console.log('刷新token失败，响应:', res);
						// 即使刷新失败也不影响使用
						return false;
					}
				} catch (e) {
					console.error('尝试刷新token时出错，继续使用当前用户信息:', e);
					return false;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";

	.uni-content {
		padding: 0;
	}

	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	@media screen and (min-width: 690px) {
		.uni-content {
			padding: 0;
			max-width: 690px;
			margin-left: calc(50% - 345px);
			border: none;
			max-height: none;
			border-radius: 0;
			box-shadow: none;
		}
	}

	/* #endif */
	.avatar {
		align-items: center;
		justify-content: center;
		margin: 22px 0;
		width: 100%;
	}

	.item {
		flex: 1;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	button {
		margin: 10%;
		margin-top: 40px;
		border-radius: 0;
		background-color: #FFFFFF;
		width: 80%;
	}

	.mt10 {
		margin-top: 10px;
	}
</style>
