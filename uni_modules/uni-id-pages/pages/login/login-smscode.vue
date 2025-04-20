<!-- 短信验证码登录页 -->
<template>
	<view class="uni-content">
		<view class="login-logo" v-if="showLogo">
			<image :src="logo"></image>
		</view>
		<!-- 顶部文字 -->
		<text class="title">请输入验证码</text>
		<text class="tip">先输入图形验证码，再获取短信验证码</text>
		<uni-forms>
			<uni-id-pages-sms-form focusCaptchaInput v-model="code" type="login-by-sms" ref="smsCode" :phone="phone">
			</uni-id-pages-sms-form>
			<button class="uni-btn send-btn" type="primary" @click="submit">登录</button>
		</uni-forms>
		<uni-popup-captcha @confirm="submit" v-model="captcha" scene="login-by-sms" ref="popup"></uni-popup-captcha>
	</view>
</template>
<script>
	import mixin from '@/uni_modules/uni-id-pages/common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				"code": "",
				"phone": "",
				"captcha": "",
				"logo": "https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png"
			}
		},
		computed: {
			tipText() {
				return '验证码已通过短信发送至' + this.phone;
			},
			showLogo() {
				try {
					// 检查全局变量
					const app = getApp();
					if (app && app.globalData && app.globalData.hideUniIdPagesLogo) {
						return false;
					}
				} catch (e) {
					console.error('获取全局变量失败', e);
				}
				return true;
			}
		},
		onLoad({
			phoneNumber
		}) {
			this.phone = phoneNumber;
		},
		onShow() {
			// #ifdef H5
			document.onkeydown = event => {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					this.submit()
				}
			};
			// #endif
		},
		methods: {
			submit() { //完成并提交
				const uniIdCo = uniCloud.importObject("uni-id-co", {
					errorOptions: {
						type: 'toast'
					}
				})
				if (this.code.length != 6) {
					this.$refs.smsCode.focusSmsCodeInput = true
					return uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 3000
					});
				}
				uniIdCo.loginBySms({
					"mobile": this.phone,
					"code": this.code,
					"captcha": this.captcha
				}).then(e => {
					// 登录成功前检查是否是首次登录
					const hasSetStudentName = uni.getStorageSync('hasSetStudentName');
					const isFirstLogin = !hasSetStudentName;
					
					// 如果是首次登录，记录在e对象中
					if (isFirstLogin) {
						e.isFirstLogin = true;
						console.log('检测到验证码登录的首次登录用户');
					}
					
					// 将自定义参数传递给loginSuccess
					this.loginSuccess({
						...e,
						autoBack: true,
						toastText: '登录成功，跳转中...',
						// 验证码登录成功后始终跳转到用户页面
						uniIdRedirectUrl: '/pages/user/user'
					});
				}).catch(e => {
					if (e.errCode == 'uni-id-captcha-required') {
						this.$refs.popup.open()
					} else if (e.errCode == 'uni-id-invalid-sms-template-id') {
						// 在开发环境下使用测试验证码
						this.code = "123456";  // 自动填入测试验证码
						uni.showToast({
							title: '测试验证码：123456',
							icon: 'none',
							duration: 3000
						});
					} else {
						// 显示更友好的错误信息
						uni.showToast({
							title: e.errMsg || '登录失败，请稍后再试',
							icon: 'none',
							duration: 3000
						});
						console.log(e.errMsg);
					}
				}).finally(e => {
					this.captcha = ''
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "@/uni_modules/uni-id-pages/common/login-page.scss";

	.tip {
		margin-top: -15px;
		margin-bottom: 15px;
	}

	.popup-captcha {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding: 20rpx;
		background-color: #FFF;
		border-radius: 2px;
		flex-direction: column;
		position: relative;
	}

	.popup-captcha .title {
		font-weight: normal;
		padding: 0;
		padding-bottom: 15px;
		color: #666;
	}

	.popup-captcha .close {
		position: absolute;
		bottom: -40px;
		margin-left: -13px;
		left: 50%;
	}

	.popup-captcha .uni-btn {
		margin: 0;
	}
</style>
