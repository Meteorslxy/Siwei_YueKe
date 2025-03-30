<template>
	<view class="dashboard-container">
		<view class="header">
			<text class="title">管理控制台</text>
			<text class="welcome">欢迎回来，{{ adminInfo.username }}</text>
		</view>
		
		<view class="menu-grid">
			<view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="navigateTo(item.path)">
				<view class="menu-icon" :style="{ backgroundColor: item.color }">
					<text class="iconfont" :class="item.icon"></text>
				</view>
				<text class="menu-name">{{ item.name }}</text>
			</view>
		</view>
		
		<view class="logout-btn" @click="handleLogout">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adminInfo: {
					username: 'admin'
				},
				menuItems: [
					{
						name: '教师管理',
						path: '/pages/admin/teacher',
						icon: 'icon-teacher',
						color: '#5B8FF9'
					},
					{
						name: '课程管理',
						path: '/pages/admin/course',
						icon: 'icon-course',
						color: '#5AD8A6'
					},
					{
						name: '讲座管理',
						path: '/pages/admin/lecture',
						icon: 'icon-lecture',
						color: '#F6BD16'
					},
					{
						name: '新闻动态',
						path: '/pages/admin/news',
						icon: 'icon-news',
						color: '#E86452'
					},
					{
						name: '预约管理',
						path: '/pages/admin/booking',
						icon: 'icon-booking',
						color: '#6DC8EC'
					},
					{
						name: '内容上传',
						path: '/pages/admin/content-upload/index',
						icon: 'icon-upload',
						color: '#9270CA'
					},
					{
						name: '课程教师关联',
						path: '/pages/admin/course-teacher-update',
						icon: 'icon-link',
						color: '#FF9800'
					}
				]
			}
		},
		onLoad() {
			// 获取管理员信息
			const adminInfo = uni.getStorageSync('adminInfo');
			if (adminInfo) {
				this.adminInfo = adminInfo;
			} else {
				// 未登录，跳转到登录页
				uni.redirectTo({
					url: '/pages/admin/login'
				});
			}
		},
		methods: {
			navigateTo(path) {
				uni.navigateTo({
					url: path
				});
			},
			handleLogout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							// 清除登录信息
							uni.removeStorageSync('adminToken');
							uni.removeStorageSync('adminInfo');
							
							// 跳转到登录页
							uni.redirectTo({
								url: '/pages/admin/login'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.dashboard-container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 30rpx;
		
		.header {
			background-color: #EC7A49;
			padding: 40rpx 30rpx;
			border-radius: 12rpx;
			margin-bottom: 30rpx;
			box-shadow: 0 4rpx 12rpx rgba(236, 122, 73, 0.2);
			
			.title {
				font-size: 36rpx;
				color: #fff;
				font-weight: bold;
				margin-bottom: 16rpx;
				display: block;
			}
			
			.welcome {
				font-size: 28rpx;
				color: rgba(255, 255, 255, 0.9);
			}
		}
		
		.menu-grid {
			display: flex;
			flex-wrap: wrap;
			margin: 0 -10rpx;
			
			.menu-item {
				width: calc(33.33% - 20rpx);
				margin: 10rpx;
				background-color: #fff;
				border-radius: 12rpx;
				padding: 30rpx 10rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
				
				.menu-icon {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20rpx;
					
					.iconfont {
						font-size: 50rpx;
						color: #fff;
					}
				}
				
				.menu-name {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
		
		.logout-btn {
			margin-top: 60rpx;
			height: 90rpx;
			background-color: #fff;
			color: #EC7A49;
			font-size: 32rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2rpx solid #EC7A49;
		}
	}
</style> 