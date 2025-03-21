<template>
	<view class="login-container">
		<view class="login-header">
			<image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
			<text class="title">管理员登录</text>
		</view>
		
		<view class="login-form">
			<view class="input-group">
				<text class="label">用户名</text>
				<input type="text" v-model="username" placeholder="请输入管理员用户名" />
			</view>
			
			<view class="input-group">
				<text class="label">密码</text>
				<input type="password" v-model="password" placeholder="请输入管理员密码" />
			</view>
			
			<button class="login-btn" @click="handleLogin">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			handleLogin() {
				if (!this.username || !this.password) {
					uni.showToast({
						title: '用户名和密码不能为空',
						icon: 'none'
					});
					return;
				}
				
				// 这里应该调用实际的管理员登录接口
				// 目前使用模拟登录，固定用户名admin，密码123456
				if (this.username === 'admin' && this.password === '123456') {
					// 登录成功
					uni.setStorageSync('adminToken', 'admin-token-placeholder');
					uni.setStorageSync('adminInfo', {
						username: this.username,
						role: 'admin'
					});
					
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					});
					
					// 跳转到管理控制台
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/admin/dashboard'
						});
					}, 1500);
				} else {
					// 登录失败
					uni.showToast({
						title: '用户名或密码错误',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		padding: 60rpx;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
		
		.login-header {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 80rpx;
			
			.logo {
				width: 160rpx;
				height: 160rpx;
				margin-bottom: 30rpx;
			}
			
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
		}
		
		.login-form {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 40rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
			
			.input-group {
				margin-bottom: 30rpx;
				
				.label {
					font-size: 28rpx;
					color: #666;
					margin-bottom: 10rpx;
					display: block;
				}
				
				input {
					width: 100%;
					height: 80rpx;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					padding: 0 20rpx;
					font-size: 28rpx;
				}
			}
			
			.login-btn {
				width: 100%;
				height: 90rpx;
				background-color: #EC7A49;
				color: #fff;
				font-size: 32rpx;
				border-radius: 8rpx;
				margin-top: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style> 