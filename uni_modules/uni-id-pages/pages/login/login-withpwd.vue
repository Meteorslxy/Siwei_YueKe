<!-- 账号密码登录页 -->
<template>
	<view class="uni-content">
		<!-- 顶部文字 -->
		<text class="title title-box">账号密码登录</text>
		<uni-forms>
			<uni-forms-item name="username">
				<uni-easyinput :focus="focusUsername" @blur="focusUsername = false" class="input-box"
					:inputBorder="false" v-model="username" placeholder="请输入手机号/用户名/邮箱" trim="all" />
			</uni-forms-item>
			<uni-forms-item name="password">
					<uni-easyinput :focus="focusPassword" @blur="focusPassword = false" class="input-box" clearable
					               type="password" :inputBorder="false" v-model="password" placeholder="请输入密码" trim="all" />
			</uni-forms-item>
		</uni-forms>
		<uni-captcha v-if="needCaptcha" focus ref="captcha" scene="login-by-pwd" v-model="captcha" />
		<!-- 带选择框的隐私政策协议组件 -->
		<uni-id-pages-agreements scope="login" ref="agreements"></uni-id-pages-agreements>
		<button class="uni-btn" type="primary" @click="pwdLogin">登录</button>
		<!-- 忘记密码 -->
		<view class="link-box">
			<view v-if="!config.isAdmin">
				<text class="forget">忘记了？</text>
				<text class="link" @click="toRetrievePwd">找回密码</text>
			</view>
			<text class="link" @click="toRegister">{{config.isAdmin ? '注册管理员账号': '注册账号'}}</text>
			<!-- <text class="link" @click="toRegister" v-if="!config.isAdmin">注册账号</text> -->
		</view>
		<!-- 悬浮登录方式组件 -->
		<uni-id-pages-fab-login ref="uniFabLogin"></uni-id-pages-fab-login>
	</view>
</template>

<script>
	import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
	import config from '@/uni_modules/uni-id-pages/config.js';
	import {
		mapMutations,
		mapActions
	} from 'vuex';
	import { fixTokenFormat } from '@/uni_modules/uni-id-pages/common/store.js';
	
	const uniIdCo = uniCloud.importObject("uni-id-co", {
		errorOptions: {
			type: 'toast'
		}
	})
	
	// 获取平台信息函数
	function getPlatform() {
		// #ifdef APP-PLUS
		return uni.getSystemInfoSync().platform;
		// #endif
		
		// #ifdef H5
		return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 ? 'mp-weixin' : 'h5';
		// #endif
		
		// #ifdef MP-WEIXIN
		return 'mp-weixin';
		// #endif
		
		// #ifdef MP-ALIPAY
		return 'mp-alipay';
		// #endif
		
		// 其他平台
		return 'other';
	}
	
	export default {
		mixins: [mixin],
		data() {
			const currentPage = getCurrentPages()[0]?.route
			return {
				config: {
					...this.mixinDatacomPage?.options,
					...config
				}, //应用配置信息
				type: '', //密码类型
				errorType: ["account", "password", "captcha", "mobile", 'nickname'],
				focusAccount: false,
				focusPassword: false,
				logo: 'https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png',
				showPassword: false, //是否显示密码
				username: "",
				password: "",
				captchaCode: "",
				needCaptcha: false, //是否需要验证码
				loginErr: "",
				loginType: config.defaultLoginType,
				currentLoginType: null, //当前登录类型
				phoneMod: '', //手机型号安卓ios ...
				// #ifdef APP-PLUS ||MP
				isMask: false,
				// #endif
				loginErrorCount: uni.getStorageSync('login_error_count') || 0,
				loginRetryAttempts: 0, // 记录重试次数
				focusUsername: false,
				focusPassword: false,
				isPhone: false,
				errorText: {
					phone: '',
					username: '',
					password: ''
				},
				loginLockTime: uni.getStorageSync('login_lock_time') || 0,
				loginLocked: false,
				lockCountdown: 0,
				countdownTimer: null,
				captchaLoading: false
			}
		},
		computed: {
			isIPad() {
				return getPlatform() == 'iPad';
			},
			canSubmit() {
				return this.username.length > 0 && this.password.length > 0 && (!this.needCaptcha || this.captcha.length == 4);
			},
		},
		created() {
			// 检查是否需要显示验证码
			this.checkCaptchaRequired();
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.pwdLogin()
				}
			};
			// #endif

			// 检查是否存在登录锁定
			const loginLockTime = uni.getStorageSync('login_lock_time');
			if (loginLockTime) {
				const now = Date.now();
				const remainTime = loginLockTime - now;
				if (remainTime > 0) {
					// 仍在锁定期内
					this.loginLocked = true;
					this.lockCountdown = Math.ceil(remainTime / 1000);
					this.startCountdown();
				} else {
					// 锁定已过期，清除
					uni.removeStorageSync('login_lock_time');
					uni.removeStorageSync('login_error_count');
				}
			}

			// 恢复错误计数
			const savedErrorCount = uni.getStorageSync('login_error_count') || 0;
			this.loginErrorCount = savedErrorCount;
			
			// 如果之前登录错误次数超过2次，就显示验证码
			if (savedErrorCount >= 2) {
				this.needCaptcha = true;
				this.$nextTick(() => {
					if (this.$refs.captcha) {
						this.$refs.captcha.getImageCaptcha();
					}
				});
			}
		},
		onUnload() {
			// 清除倒计时定时器
			this.clearCountdown();
		},
		methods: {
			// 开始倒计时
			startCountdown() {
				// 先清除可能存在的定时器
				this.clearCountdown();
				
				// 设置新的定时器
				this.countdownTimer = setInterval(() => {
					this.lockCountdown -= 1;
					if (this.lockCountdown <= 0) {
						// 倒计时结束，解除锁定
						this.loginLocked = false;
						this.loginErrorCount = 0;
						uni.removeStorageSync('login_lock_time');
						uni.removeStorageSync('login_error_count');
						this.clearCountdown();
					}
				}, 1000);
			},
			
			// 清除倒计时
			clearCountdown() {
				if (this.countdownTimer) {
					clearInterval(this.countdownTimer);
					this.countdownTimer = null;
				}
			},

			// 锁定登录
			lockLogin(minutes) {
				const lockTime = Date.now() + minutes * 60 * 1000;
				uni.setStorageSync('login_lock_time', lockTime);
				uni.setStorageSync('login_error_count', this.loginErrorCount);
				this.loginLocked = true;
				this.lockCountdown = minutes * 60;
				this.startCountdown();
				
				uni.showModal({
					title: '登录已锁定',
					content: `由于多次密码错误，账号已被锁定${minutes}分钟，请稍后再试`,
					showCancel: false
				});
			},

			// 检查是否需要验证码
			async checkCaptchaRequired() {
				try {
					// 如果错误次数>=2，自动显示验证码
					if (this.loginErrorCount >= 2) {
						this.needCaptcha = true;
						return;
					}
					
					// 不直接调用云函数，而是根据登录错误次数决定是否需要验证码
					this.needCaptcha = this.loginErrorCount >= 1;
					
					// 如果需要验证码，则主动获取
					if (this.needCaptcha) {
						this.$nextTick(() => {
							if (this.$refs.captcha) {
								this.$refs.captcha.getImageCaptcha();
							}
						});
					}
				} catch (e) {
					console.error('检查验证码状态出错:', e);
					// 出错时为安全起见显示验证码
					this.needCaptcha = true;
				}
			},

			// 页面跳转，找回密码
			toRetrievePwd() {
				let url = '/uni_modules/uni-id-pages/pages/retrieve/retrieve'
				//如果刚好用户名输入框的值为手机号码，就把它传到retrieve页面，根据该手机号找回密码
				if (/^1\d{10}$/.test(this.username)) {
					url += `?phoneNumber=${this.username}`
				}
				uni.navigateTo({
					url
				})
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				// 安全检查: 防止无限重试
				if (this.loginRetryAttempts > 2) {
					uni.showModal({
						title: '登录暂时无法完成',
						content: '您的登录请求遇到了系统问题，请稍后再试',
						showCancel: false,
						success: () => {
							// 重置重试计数器
							this.loginRetryAttempts = 0;
							// 清空密码
							this.password = '';
							// 刷新验证码
							if (this.needCaptcha) {
								this.$refs.captcha.getImageCaptcha();
							}
						}
					});
					return;
				}

				// 自增重试计数
				this.loginRetryAttempts++;
				
				// 验证规则
				if (!this.username) {
					this.loginErr = this.i18n.account.accountRequiredTips
					return;
				}
				
				// 验证码必填验证
				if (this.needCaptcha && !this.captchaCode) {
					this.loginErr = this.i18n.account.captchaRequiredTips
					return;
				}
				
				// 检查是否被锁定
				if (this.loginLocked) {
					return uni.showModal({
						title: '登录已锁定',
						content: `由于多次密码错误，账号已被锁定，请${this.lockCountdown}秒后再试`,
						showCancel: false
					});
				}
				
				// 基本数据检查
				if (!this.password || !this.username) {
					if (!this.username) {
						this.focusUsername = true;
						uni.showToast({
							title: '请输入账号',
							icon: 'none'
						});
						return;
					}
					if (!this.password) {
						this.focusPassword = true;
						uni.showToast({
							title: '请输入密码',
							icon: 'none'
						});
						return;
					}
				}
				
				// 检查验证码
				if (this.needCaptcha && (!this.captcha || this.captcha.length !== 4)) {
					uni.showToast({
						title: '请输入4位图形验证码',
						icon: 'none'
					});
					// 重新获取验证码
					this.$nextTick(() => {
						if (this.$refs.captcha) {
							this.$refs.captcha.getImageCaptcha();
						}
					});
					return;
				}
				
				if (!/^.{6,20}$/.test(this.password)) {
					this.focusPassword = true;
					return uni.showToast({
						title: '密码长度应在6-20位之间',
						icon: 'none'
					});
				}

				// 构建登录数据
				let data = {
					password: this.password.trim() // 确保密码无空格
				}

				// 判断平台
				if (this.isPhone) {
					data.mobile = this.username;
					data.loginType = 'mobile-pwd';
				} else if (/^1\d{10}$/.test(this.username)) {
					// 若为完整手机号则作为手机号登录
					data.mobile = this.username;
					data.loginType = 'mobile-pwd';
				} else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.username)) {
					// 若包含@符号则视为邮箱
					data.email = this.username;
				} else if(/^[a-zA-Z0-9_-]+$/.test(this.username)) {
					// 若满足用户名规则，则作为用户名登录
					data.username = this.username;
				} else {
					// 不满足任何格式要求，尝试作为一个集成字段处理
					// 可能是手机号、用户ID、用户名等多种可能
					data.identifier = this.username;
					data.loginType = 'detail';
					
					// 添加额外辅助信息，帮助服务端识别
					data.extraInfo = {
						isNumeric: /^\d+$/.test(this.username),
						length: this.username.length,
						containsSpecial: /[^\w\d-_]/.test(this.username)
					};
				}

				// 如果需要验证码，则添加验证码信息
				if (this.needCaptcha) {
					data.captcha = this.captcha;
				}

				// 显示登录中
				uni.showLoading({
					title: '登录中...',
					mask: true
				});

				// 确保请求数据格式正确 - 调试输出
				console.log('登录请求数据:', JSON.stringify(data));
				
				// 检查password是否存在且正确
				if (!data.password) {
					console.error('密码未正确传递，手动添加');
					data.password = this.password.trim();
				}

				// 最后的数据验证
				console.log('最终登录请求数据:', JSON.stringify(data));
				console.log('开始尝试登录...');
				
				// 开始登录请求
				uniIdCo.login(data).then(e => {
					// 登录成功后，重置计数器
					this.loginErrorCount = 0;
					this.loginRetryAttempts = 0;
					uni.removeStorageSync('login_error_count');
					this.needCaptcha = false;
					uni.hideLoading();
					
					// 添加token格式检查和修复
					try {
						// 获取用户ID
						const userId = e.uid || (e.userInfo && e.userInfo._id);
						
						// 检查token是否为字符串
						if (userId && e.token && typeof e.token === 'string') {
							console.log('检测到字符串token，尝试修复格式');
							
							// 直接调用已导入的fixTokenFormat函数
							fixTokenFormat(userId).then(() => {
								console.log('token格式修复完成');
							}).catch(fixErr => {
								console.error('修复token格式失败:', fixErr);
							});
						}
					} catch (err) {
						console.error('处理token格式时出错:', err);
					}
					
					this.loginSuccess(e);
				}).catch(e => {
					// 添加错误分析代码
					console.error('登录错误详细信息:', e);
					
					// 输出错误的堆栈信息
					if (e.stack) {
						console.error('错误堆栈:', e.stack);
					}
					
					// 检测错误是否与token相关
					if (e.errMsg && e.errMsg.indexOf('filter is not a function') !== -1) {
						console.error('检测到token过滤错误');
						
						// 尝试输出错误位置的代码
						if (e.stack) {
							const matches = e.stack.match(/at\s+(\S+)\s+\(([^:]+):(\d+):(\d+)\)/g);
							if (matches) {
								console.log('错误位置:', matches[0]);
							}
						}
					}
					
					// 输出用户查询信息（如果存在）
					if (e.userRecord) {
						console.log('查询到的用户数据:', JSON.stringify(e.userRecord, null, 2));
						// 特别检查token字段
						if (e.userRecord.token) {
							console.log('用户token类型:', typeof e.userRecord.token);
							console.log('用户token值:', e.userRecord.token);
							console.log('是否为数组:', Array.isArray(e.userRecord.token));
							if (typeof e.userRecord.token === 'string') {
								console.log('警告: token是字符串而不是数组');
							}
						} else {
							console.log('用户没有token字段');
						}
					}
					
					// 原始错误处理代码继续
					uni.hideLoading();
					if (e.errCode == 'uni-id-captcha-required') {
						this.needCaptcha = true;
						this.$nextTick(() => {
							// 主动获取新的验证码图片
							if (this.$refs.captcha) {
								this.$refs.captcha.getImageCaptcha();
							}
						});
						// 显示友好提示
						uni.showToast({
							title: '请输入图形验证码',
							icon: 'none',
							duration: 2000
						});
					} else if (this.needCaptcha) {
						//登录失败，自动重新获取验证码
						this.$refs.captcha.getImageCaptcha();
					}

					// 处理密码错误
					if (e.errCode === 'PASSWORD_ERROR') {
						this.loginErrorCount += 1;
						uni.setStorageSync('login_error_count', this.loginErrorCount);

						// 清空密码字段
						this.password = '';
						this.focusPassword = true;

						// 根据错误次数采取不同措施
						if (this.loginErrorCount >= 3) {
							// 锁定账号5分钟
							this.lockLogin(5);
						} else {
							// 显示错误信息
							uni.showModal({
								title: '登录失败',
								content: `密码错误，您还有${3 - this.loginErrorCount}次机会`,
								showCancel: false
							});
						}
					} else if (e.errCode === 'uni-id-account-not-exists') {
						// 处理账号不存在的情况
						console.error('账号不存在详情:', e);
						
						// 显示错误信息
						uni.showModal({
							title: '登录失败',
							content: '此账号未注册，请先注册账号',
							confirmText: '去注册',
							cancelText: '取消',
							success: (res) => {
								if (res.confirm) {
									this.toRegister();
								}
							}
						});
					} else if (e.errMsg && e.errMsg.indexOf('filter is not a function') !== -1) {
						// 特殊处理token过滤错误（已修复，以防万一）
						console.error('Token处理错误，将清除token并重试:', e);
						
						// 详细分析错误
						if (e.userInfo && e.userInfo.token) {
							console.log('出错用户token值:', e.userInfo.token);
							console.log('token类型:', typeof e.userInfo.token);
							try {
								// 尝试手动过滤
								if (typeof e.userInfo.token === 'string') {
									console.log('错误原因: token是字符串，不是数组，不能使用filter方法');
								} else if (Array.isArray(e.userInfo.token)) {
									console.log('token是数组，但仍然出错，这很奇怪');
								} else {
									console.log('token类型异常:', Object.prototype.toString.call(e.userInfo.token));
								}
							} catch (filterErr) {
								console.error('尝试分析token时出错:', filterErr);
							}
						} else {
							console.log('错误对象中不包含userInfo.token数据');
							// 遍历错误对象寻找token相关信息
							for (const key in e) {
								try {
									if (typeof e[key] === 'object' && e[key] !== null) {
										console.log(`${key}内容:`, JSON.stringify(e[key]));
									}
								} catch (err) {}
							}
						}
						
						// 清空密码和token相关存储
						this.password = '';
						uni.removeStorageSync('uni_id_token');
						uni.removeStorageSync('uni_id_token_expired');
						
						// 显示加载提示
						uni.showLoading({
							title: '正在重试...',
							mask: true
						});
						
						// 如果已经重试过，增加等待时间，防止无限循环
						if (this.loginRetryAttempts > 1) {
							setTimeout(() => {
								uni.hideLoading();
								uni.showModal({
									title: '登录遇到问题',
									content: '系统暂时无法完成登录，请稍后再试',
									showCancel: false,
									success: () => {
										// 重置重试计数器
										this.loginRetryAttempts = 0;
									}
								});
							}, 1000);
							return;
						}
						
						// 1秒后重试登录
						setTimeout(() => {
							uni.hideLoading();
							this.pwdLogin();
						}, 1000);
					} else {
						uni.hideLoading()
						console.log(e.errMsg)
						this.loginErrorCount++
						uni.setStorageSync('login_error_count', this.loginErrorCount)
						
						// 检查登录重试次数，超过限制则显示特殊提示
						if (this.loginRetryAttempts > 2) {
							uni.showModal({
								content: '登录失败次数过多，请稍后再试',
								showCancel: false,
								success: () => {
									// 重置重试计数器
									this.loginRetryAttempts = 0;
								}
							})
							return;
						}
						
						// 针对不同错误进行处理
						if (e.errCode == 'uni-id-account-not-exists') {
							// 这部分代码已在上面处理，不应重复出现
							console.error('重复的账号不存在处理被忽略');
						} else {
							// 其他错误
							uni.showModal({
								title: '登录失败',
								content: e.message || '未知错误',
								showCancel: false
							});
							
							// 添加错误详情输出到控制台
							console.error('登录失败详情:', e);
							console.error('错误完整信息:', JSON.stringify(e));
							
							// 使用更加可靠的方式遍历错误对象
							console.error('==== 错误对象的所有属性 ====');
							for (const key in e) {
								try {
									console.error(`${key}:`, typeof e[key] === 'object' ? JSON.stringify(e[key]) : e[key]);
								} catch (jsonErr) {
									console.error(`${key}: [无法序列化]`);
								}
							}
							
							// 检查并展示用户查询结果
							if (e.details) {
								console.error('用户搜索结果详情:', JSON.stringify(e.details));
								console.error('搜索的手机号:', e.mobile || (e.details.query ? e.details.query.mobile : '未知'));
								
								if (e.details.results) {
									console.error('搜索结果汇总:',  
										'total:', e.details.results.total,
										'matched:', e.details.results.matched,
										'usersTable:', e.details.results.usersTable || 0
									);
								}
								
								if (e.details.query) {
									console.error('用户查询参数:', JSON.stringify(e.details.query));
								}
								
								// 显示更加友好的错误信息
								uni.showModal({
									title: '提示',
									content: '该手机号尚未注册，是否立即注册?',
									confirmText: '去注册',
									success: (res) => {
										if (res.confirm) {
											this.toRegister();
										}
									}
								});
							} else {
								console.error('没有获取到搜索结果详情');
							}
							
							// 将错误消息显示到界面
							this.$nextTick(() => {
								uni.showToast({
									title: '详细错误已记录到控制台',
									icon: 'none',
									duration: 3000
								});
							});
						}
					}
				});
			},
			/* 前往注册 */
			toRegister() {
				uni.navigateTo({
					url: this.config.isAdmin ? '/uni_modules/uni-id-pages/pages/register/register-admin' :
						'/uni_modules/uni-id-pages/pages/register/register',
					fail(e) {
						console.error(e);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";

	@media screen and (min-width: 690px) {
		.uni-content {
			height: auto;
		}
	}

	.forget {
		font-size: 12px;
		color: #8a8f8b;
	}

	.link-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.link {
		font-size: 12px;
	}

	.title-box {
		margin-top: 20px;
		margin-bottom: 40px;
		font-size: 38rpx;
		font-weight: bold;
	}

	.uni-btn {
		margin-top: 30px;
	}

	.input-box {
		margin-bottom: 15px;
	}
</style>
