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
	const uniIdCo = uniCloud.importObject("uni-id-co", {
		errorOptions: {
			type: 'toast'
		}
	})
	export default {
		mixins: [mixin],
		data() {
			return {
				"password": "",
				"username": "",
				"captcha": "",
				"needCaptcha": false,
				"focusUsername": false,
				"focusPassword": false,
				"logo": "../../../../static/images/logo.png",
				"loginErrorCount": 0, // 登录错误计数
				"loginLocked": false, // 登录锁定状态
				"lockCountdown": 0, // 锁定倒计时
				"countdownTimer": null // 倒计时定时器
			}
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
				// 检查是否在锁定状态
				if (this.loginLocked) {
					return uni.showModal({
						title: '登录已锁定',
						content: `由于多次密码错误，账号已被锁定，请${this.lockCountdown}秒后再试`,
						showCancel: false
					});
				}

				if (!this.password.length) {
					this.focusPassword = true
					return uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration: 3000
					});
				}
				if (!this.username.length) {
					this.focusUsername = true
					return uni.showToast({
						title: '请输入手机号/用户名/邮箱',
						icon: 'none',
						duration: 3000
					});
				}
				if (this.needCaptcha && this.captcha.length != 4) {
					this.$refs.captcha.getImageCaptcha()
					return uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 3000
					});
				}

				if (this.needAgreements && !this.agree) {
					return this.$refs.agreements.popup(this.pwdLogin)
				}

				let data = {
					"password": this.password,
					"captcha": this.captcha
				}

				if (/^1\d{10}$/.test(this.username)) {
					data.mobile = this.username
				} else if (/@/.test(this.username)) {
					data.email = this.username
				} else {
					data.username = this.username
				}

				// 显示登录中
				uni.showLoading({
					title: '登录中...',
					mask: true
				});

				uniIdCo.login(data).then(e => {
					// 登录成功，重置错误计数
					this.loginErrorCount = 0;
					uni.removeStorageSync('login_error_count');
					uni.hideLoading();
					this.loginSuccess(e);
				}).catch(e => {
					uni.hideLoading();
					
					if (e.errCode == 'uni-id-captcha-required') {
						this.needCaptcha = true;
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
					} else {
						// 其他错误
						uni.showModal({
							title: '登录失败',
							content: e.message || '未知错误',
							showCancel: false
						});
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
