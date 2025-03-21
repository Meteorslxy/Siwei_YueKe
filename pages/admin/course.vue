<template>
	<view class="course-admin">
		<view class="header">
			<text class="title">课程管理</text>
			<view class="actions">
				<button class="btn-primary" @click="navigateToUpload">添加课程</button>
				<button class="btn-default" @click="refreshData">刷新</button>
			</view>
		</view>
		
		<view class="content" v-if="courseList.length > 0">
			<view class="course-item" v-for="(item, index) in courseList" :key="item._id">
				<view class="course-info">
					<image class="cover" :src="getImageUrl(item.coverId)" mode="aspectFill"></image>
					<view class="info">
						<view class="title-row">
							<text class="title">{{item.title}}</text>
							<text class="category">{{item.category}}</text>
						</view>
						<view class="detail-row">
							<text class="teacher">主讲：{{item.teacher}}</text>
							<text class="price">¥{{item.price}}</text>
						</view>
						<text class="location">地点：{{item.location}}</text>
						<text class="description">{{formatDescription(item.description)}}</text>
					</view>
				</view>
				<view class="actions">
					<text class="action edit" @click="editCourse(item)">编辑</text>
					<text class="action delete" @click="deleteCourse(item)">删除</text>
				</view>
			</view>
		</view>
		
		<view class="empty" v-else>
			<text class="empty-text">暂无课程数据</text>
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
				courseList: [],
				loading: false,
				imageCache: {}
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
			
			this.fetchCourseList();
		},
		methods: {
			// 获取课程列表
			async fetchCourseList() {
				this.loading = true;
				try {
					const result = await this.$api.course.getCourseList();
					if (result && result.success) {
						this.courseList = result.data || [];
						
						// 预加载封面图片
						for (const course of this.courseList) {
							if (course.coverId) {
								this.preloadImage(course.coverId);
							}
						}
					} else {
						uni.showToast({
							title: result.message || '获取课程列表失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('获取课程列表失败:', error);
					uni.showToast({
						title: '获取课程列表失败',
						icon: 'none'
					});
				} finally {
					this.loading = false;
				}
			},
			
			// 预加载图片
			async preloadImage(imageId) {
				try {
					if (this.imageCache[imageId]) return;
					
					const result = await this.$api.file.getImage(imageId);
					if (result && result.success) {
						this.imageCache[imageId] = `data:image/${result.imageData.fileType};base64,${result.imageData.base64Data}`;
					}
				} catch (error) {
					console.error('预加载图片失败:', error);
				}
			},
			
			// 获取图片URL
			getImageUrl(imageId) {
				if (!imageId) return '/static/images/default-course.png';
				return this.imageCache[imageId] || '/static/images/default-course.png';
			},
			
			// 格式化描述文字
			formatDescription(text) {
				if (!text) return '';
				return text.length > 50 ? text.substring(0, 50) + '...' : text;
			},
			
			// 刷新数据
			refreshData() {
				this.fetchCourseList();
			},
			
			// 跳转到添加课程页面
			navigateToUpload() {
				uni.navigateTo({
					url: '/pages/admin/content-upload/index?tab=2'
				});
			},
			
			// 编辑课程信息
			editCourse(course) {
				// 暂时实现为提示，可以跳转到编辑页面
				uni.showToast({
					title: '编辑功能开发中',
					icon: 'none'
				});
			},
			
			// 删除课程
			deleteCourse(course) {
				uni.showModal({
					title: '确认删除',
					content: `确定要删除课程"${course.title}"吗？`,
					success: async (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '删除功能开发中',
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.course-admin {
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
				
				.btn-primary, .btn-default {
					font-size: 26rpx;
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 24rpx;
					margin-left: 16rpx;
					border-radius: 6rpx;
				}
				
				.btn-primary {
					background-color: #EC7A49;
					color: #fff;
				}
				
				.btn-default {
					background-color: #f0f0f0;
					color: #666;
				}
			}
		}
		
		.content {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 20rpx;
			
			.course-item {
				padding: 20rpx;
				border-bottom: 1px solid #eee;
				
				&:last-child {
					border-bottom: none;
				}
				
				.course-info {
					display: flex;
					margin-bottom: 20rpx;
					
					.cover {
						width: 180rpx;
						height: 120rpx;
						border-radius: 8rpx;
						margin-right: 20rpx;
						background-color: #f0f0f0;
					}
					
					.info {
						flex: 1;
						
						.title-row {
							display: flex;
							align-items: center;
							margin-bottom: 10rpx;
							
							.title {
								font-size: 32rpx;
								font-weight: bold;
								color: #333;
								margin-right: 16rpx;
							}
							
							.category {
								font-size: 24rpx;
								color: #EC7A49;
								background-color: rgba(236, 122, 73, 0.1);
								padding: 2rpx 12rpx;
								border-radius: 20rpx;
							}
						}
						
						.detail-row {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-bottom: 8rpx;
							
							.teacher {
								font-size: 26rpx;
								color: #666;
							}
							
							.price {
								font-size: 30rpx;
								color: #f56c6c;
								font-weight: bold;
							}
						}
						
						.location {
							font-size: 26rpx;
							color: #666;
							margin-bottom: 8rpx;
						}
						
						.description {
							font-size: 26rpx;
							color: #999;
							line-height: 1.4;
						}
					}
				}
				
				.actions {
					display: flex;
					justify-content: flex-end;
					
					.action {
						font-size: 26rpx;
						padding: 6rpx 20rpx;
						border-radius: 6rpx;
						margin-left: 16rpx;
						
						&.edit {
							color: #5B8FF9;
							background-color: rgba(91, 143, 249, 0.1);
						}
						
						&.delete {
							color: #F56C6C;
							background-color: rgba(245, 108, 108, 0.1);
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