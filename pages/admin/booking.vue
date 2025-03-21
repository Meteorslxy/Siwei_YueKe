<template>
	<view class="booking-admin">
		<view class="header">
			<text class="title">预约管理</text>
			<view class="actions">
				<button class="btn-default" @click="refreshData">刷新</button>
			</view>
		</view>
		
		<view class="filter-bar">
			<view class="filter-item" :class="{ active: status === 'all' }" @click="filterByStatus('all')">全部</view>
			<view class="filter-item" :class="{ active: status === 'pending' }" @click="filterByStatus('pending')">待确认</view>
			<view class="filter-item" :class="{ active: status === 'confirmed' }" @click="filterByStatus('confirmed')">已确认</view>
			<view class="filter-item" :class="{ active: status === 'completed' }" @click="filterByStatus('completed')">已完成</view>
			<view class="filter-item" :class="{ active: status === 'cancelled' }" @click="filterByStatus('cancelled')">已取消</view>
		</view>
		
		<view class="content" v-if="bookingList.length > 0">
			<view class="booking-item" v-for="(item, index) in filteredBookingList" :key="item._id">
				<view class="booking-info">
					<view class="info-section">
						<view class="booking-id">#{{formatId(item._id)}}</view>
						<view class="status-tag" :class="{
							'status-pending': item.status === 'pending',
							'status-confirmed': item.status === 'confirmed',
							'status-completed': item.status === 'completed',
							'status-cancelled': item.status === 'cancelled'
						}">{{getStatusText(item.status)}}</view>
					</view>
					
					<view class="course-section">
						<view class="course-title">{{item.courseName || '未知课程'}}</view>
						<view class="time">预约时间：{{formatDate(item.bookingTime)}}</view>
						<view class="time">上课时间：{{formatDate(item.classTime)}}</view>
					</view>
					
					<view class="user-section">
						<view class="label">预约人信息</view>
						<view class="user-name">姓名：{{item.userName}}</view>
						<view class="user-phone">电话：{{item.userPhone}}</view>
					</view>
					
					<view class="remark-section" v-if="item.remark">
						<view class="label">备注</view>
						<view class="remark">{{item.remark}}</view>
					</view>
				</view>
				
				<view class="actions">
					<text v-if="item.status === 'pending'" class="action confirm" @click="confirmBooking(item)">确认</text>
					<text v-if="item.status === 'pending' || item.status === 'confirmed'" class="action cancel" @click="cancelBooking(item)">取消</text>
					<text v-if="item.status === 'confirmed'" class="action complete" @click="completeBooking(item)">完成</text>
					<text class="action view" @click="viewBookingDetail(item)">详情</text>
				</view>
			</view>
		</view>
		
		<view class="empty" v-else-if="!loading">
			<text class="empty-text">暂无预约数据</text>
		</view>
		
		<view class="loading" v-if="loading">
			<view class="spinner"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookingList: [],
				loading: false,
				status: 'all' // 'all', 'pending', 'confirmed', 'completed', 'cancelled'
			}
		},
		computed: {
			// 根据筛选条件过滤预约列表
			filteredBookingList() {
				if (this.status === 'all') {
					return this.bookingList;
				}
				return this.bookingList.filter(item => item.status === this.status);
			}
		},
		onLoad() {
			// 检查管理员登录状态
			const adminInfo = uni.getStorageSync('adminInfo');
			if (!adminInfo) {
				uni.redirectTo({
					url: '/pages/admin/login'
				});
				return;
			}
			
			this.fetchBookingList();
		},
		methods: {
			// 获取预约列表
			async fetchBookingList() {
				this.loading = true;
				try {
					// 这里假设后端提供了管理员获取所有预约的接口
					// 实际实现可能需要调用特定的管理员接口
					const result = await this.$api.user.getBookingList({
						admin: true
					});
					
					if (result && result.success) {
						this.bookingList = result.data || [];
					} else {
						uni.showToast({
							title: result.message || '获取预约列表失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('获取预约列表失败:', error);
					uni.showToast({
						title: '获取预约列表失败',
						icon: 'none'
					});
				} finally {
					this.loading = false;
				}
			},
			
			// 格式化ID
			formatId(id) {
				if (!id) return '';
				// 只显示ID的后6位，如果ID长度不足6位，则显示全部
				return id.length > 6 ? id.substring(id.length - 6) : id;
			},
			
			// 格式化日期
			formatDate(timestamp) {
				if (!timestamp) return '未设置';
				
				const date = new Date(timestamp);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hour = String(date.getHours()).padStart(2, '0');
				const minute = String(date.getMinutes()).padStart(2, '0');
				
				return `${year}-${month}-${day} ${hour}:${minute}`;
			},
			
			// 获取状态文本
			getStatusText(status) {
				switch (status) {
					case 'pending': return '待确认';
					case 'confirmed': return '已确认';
					case 'completed': return '已完成';
					case 'cancelled': return '已取消';
					default: return '未知状态';
				}
			},
			
			// 按状态筛选
			filterByStatus(status) {
				this.status = status;
			},
			
			// 刷新数据
			refreshData() {
				this.fetchBookingList();
			},
			
			// 确认预约
			confirmBooking(booking) {
				uni.showModal({
					title: '确认预约',
					content: `确定要确认 #${this.formatId(booking._id)} 的预约吗？`,
					success: async (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '确认功能开发中',
								icon: 'none'
							});
							// 模拟操作成功后临时更新UI
							const index = this.bookingList.findIndex(item => item._id === booking._id);
							if (index !== -1) {
								this.bookingList[index].status = 'confirmed';
								// 强制视图更新
								this.bookingList = [...this.bookingList];
							}
						}
					}
				});
			},
			
			// 取消预约
			cancelBooking(booking) {
				uni.showModal({
					title: '取消预约',
					content: `确定要取消 #${this.formatId(booking._id)} 的预约吗？`,
					success: async (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '取消功能开发中',
								icon: 'none'
							});
							// 模拟操作成功后临时更新UI
							const index = this.bookingList.findIndex(item => item._id === booking._id);
							if (index !== -1) {
								this.bookingList[index].status = 'cancelled';
								// 强制视图更新
								this.bookingList = [...this.bookingList];
							}
						}
					}
				});
			},
			
			// 完成预约
			completeBooking(booking) {
				uni.showModal({
					title: '完成预约',
					content: `确定要将 #${this.formatId(booking._id)} 的预约标记为已完成吗？`,
					success: async (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '完成功能开发中',
								icon: 'none'
							});
							// 模拟操作成功后临时更新UI
							const index = this.bookingList.findIndex(item => item._id === booking._id);
							if (index !== -1) {
								this.bookingList[index].status = 'completed';
								// 强制视图更新
								this.bookingList = [...this.bookingList];
							}
						}
					}
				});
			},
			
			// 查看预约详情
			viewBookingDetail(booking) {
				uni.showToast({
					title: '详情功能开发中',
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss">
	.booking-admin {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 30rpx;
		
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
			
			.actions {
				display: flex;
				
				.btn-default {
					font-size: 26rpx;
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 24rpx;
					margin-left: 16rpx;
					border-radius: 6rpx;
					background-color: #f0f0f0;
					color: #666;
				}
			}
		}
		
		.filter-bar {
			display: flex;
			background-color: #fff;
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			
			.filter-item {
				flex: 1;
				text-align: center;
				font-size: 28rpx;
				color: #666;
				padding: 20rpx 0;
				position: relative;
				
				&.active {
					color: #EC7A49;
					font-weight: bold;
					
					&:after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 30%;
						right: 30%;
						height: 4rpx;
						background-color: #EC7A49;
						border-radius: 2rpx;
					}
				}
			}
		}
		
		.content {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 20rpx;
			
			.booking-item {
				padding: 20rpx;
				border-bottom: 1px solid #eee;
				
				&:last-child {
					border-bottom: none;
				}
				
				.booking-info {
					.info-section {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 16rpx;
						
						.booking-id {
							font-size: 32rpx;
							font-weight: bold;
							color: #333;
						}
						
						.status-tag {
							font-size: 24rpx;
							padding: 4rpx 16rpx;
							border-radius: 20rpx;
							
							&.status-pending {
								background-color: #E6A23C;
								color: #fff;
							}
							
							&.status-confirmed {
								background-color: #409EFF;
								color: #fff;
							}
							
							&.status-completed {
								background-color: #67C23A;
								color: #fff;
							}
							
							&.status-cancelled {
								background-color: #909399;
								color: #fff;
							}
						}
					}
					
					.course-section {
						margin-bottom: 16rpx;
						
						.course-title {
							font-size: 30rpx;
							color: #333;
							font-weight: bold;
							margin-bottom: 8rpx;
						}
						
						.time {
							font-size: 26rpx;
							color: #666;
							margin-bottom: 4rpx;
						}
					}
					
					.user-section, .remark-section {
						margin-bottom: 16rpx;
						
						.label {
							font-size: 26rpx;
							color: #999;
							margin-bottom: 8rpx;
						}
						
						.user-name, .user-phone, .remark {
							font-size: 28rpx;
							color: #333;
							margin-bottom: 4rpx;
						}
					}
				}
				
				.actions {
					display: flex;
					justify-content: flex-end;
					margin-top: 20rpx;
					
					.action {
						font-size: 26rpx;
						padding: 6rpx 20rpx;
						border-radius: 6rpx;
						margin-left: 16rpx;
						
						&.confirm {
							color: #409EFF;
							background-color: rgba(64, 158, 255, 0.1);
						}
						
						&.cancel {
							color: #F56C6C;
							background-color: rgba(245, 108, 108, 0.1);
						}
						
						&.complete {
							color: #67C23A;
							background-color: rgba(103, 194, 58, 0.1);
						}
						
						&.view {
							color: #909399;
							background-color: rgba(144, 147, 153, 0.1);
						}
					}
				}
			}
		}
		
		.empty {
			padding: 100rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			border-radius: 12rpx;
			
			.empty-text {
				font-size: 28rpx;
				color: #999;
			}
		}
		
		.loading {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(255, 255, 255, 0.6);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 999;
			
			.spinner {
				width: 60rpx;
				height: 60rpx;
				border: 6rpx solid #f3f3f3;
				border-top: 6rpx solid #EC7A49;
				border-radius: 50%;
				animation: spin 1s linear infinite;
			}
			
			@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			}
		}
	}
</style> 