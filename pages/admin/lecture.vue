<template>
	<view class="lecture-admin">
		<view class="header">
			<text class="title">讲座管理</text>
			<view class="actions">
				<button class="btn-primary" @click="navigateToUpload">添加讲座</button>
				<button class="btn-default" @click="refreshData">刷新</button>
			</view>
		</view>
		
		<view class="content" v-if="lectureList.length > 0">
			<view class="lecture-item" v-for="(item, index) in lectureList" :key="item._id">
				<view class="lecture-info">
					<image class="cover" :src="getImageUrl(item._id)" mode="aspectFill"></image>
					<view class="info">
						<view class="title-row">
							<text class="title">{{item.title || '未命名讲座'}}</text>
						</view>
						<view class="detail-row">
							<text class="speaker">主讲：{{item.speaker || '未知讲师'}}</text>
						</view>
						<view class="time-row">
							<text class="time">{{formatTime(item.time, item.endTime)}}</text>
						</view>
						<text class="location">地点：{{item.location || '未设置地点'}}</text>
						<text class="description">{{formatDescription(item.description || item.content || '')}}</text>
					</view>
				</view>
				<view class="actions">
					<text class="action edit" @click="editLecture(item)">编辑</text>
					<text class="action delete" @click="deleteLecture(item)">删除</text>
				</view>
			</view>
		</view>
		
		<view class="empty" v-else>
			<text class="empty-text">暂无讲座数据</text>
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
				lectureList: [],
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
			
			this.fetchLectureList();
		},
		methods: {
			// 获取讲座列表
			async fetchLectureList() {
				this.loading = true;
				try {
					const result = await this.$api.lecture.getLectureList();
					console.log('获取讲座列表结果:', result);
					
					if (result && result.code === 0) {
						this.lectureList = result.data || [];
						
						// 预加载封面图片
						for (const lecture of this.lectureList) {
							if (lecture.poster) {
								// 讲座使用poster字段存储封面图片
								this.imageCache[lecture._id] = lecture.poster;
							}
						}
					} else {
						uni.showToast({
							title: result?.message || '获取讲座列表失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('获取讲座列表失败:', error);
					uni.showToast({
						title: '获取讲座列表失败',
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
				// 优先从缓存中获取
				if (this.imageCache[imageId] && this.imageCache[imageId].startsWith('/')) {
					// 如果是路径格式，直接返回
					return this.imageCache[imageId];
				}
				if (!imageId) return '/static/images/default-lecture.png';
				return this.imageCache[imageId] || '/static/images/default-lecture.png';
			},
			
			// 格式化时间
			formatTime(startTime, endTime) {
				if (!startTime) return '时间未设置';
				
				// 处理字符串格式的时间
				if (typeof startTime === 'string') {
					// 尝试解析日期
					try {
						const start = new Date(startTime);
						if (isNaN(start.getTime())) {
							// 如果是非标准格式，直接返回原始字符串
							return startTime;
						}
						
						const year = start.getFullYear();
						const month = String(start.getMonth() + 1).padStart(2, '0');
						const day = String(start.getDate()).padStart(2, '0');
						const startHour = String(start.getHours()).padStart(2, '0');
						const startMinute = String(start.getMinutes()).padStart(2, '0');
						
						let timeStr = `${year}-${month}-${day} ${startHour}:${startMinute}`;
						
						if (endTime) {
							// 处理结束时间
							try {
								const end = new Date(endTime);
								const endHour = String(end.getHours()).padStart(2, '0');
								const endMinute = String(end.getMinutes()).padStart(2, '0');
								timeStr += ` 至 ${endHour}:${endMinute}`;
							} catch (e) {
								console.error('解析结束时间失败:', e);
							}
						}
						
						return timeStr;
					} catch (e) {
						console.error('解析开始时间失败:', e);
						return startTime;
					}
				}
				
				return String(startTime);
			},
			
			// 格式化描述文字
			formatDescription(text) {
				if (!text) return '';
				return text.length > 50 ? text.substring(0, 50) + '...' : text;
			},
			
			// 刷新数据
			refreshData() {
				this.fetchLectureList();
			},
			
			// 跳转到添加讲座页面
			navigateToUpload() {
				uni.navigateTo({
					url: '/pages/admin/content-upload/index?tab=1'
				});
			},
			
			// 编辑讲座信息
			editLecture(lecture) {
				// 暂时实现为提示，可以跳转到编辑页面
				uni.showToast({
					title: '编辑功能开发中',
					icon: 'none'
				});
			},
			
			// 删除讲座
			deleteLecture(lecture) {
				uni.showModal({
					title: '确认删除',
					content: `确定要删除讲座"${lecture.title}"吗？`,
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
	.lecture-admin {
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
			
			.lecture-item {
				padding: 20rpx;
				border-bottom: 1px solid #eee;
				
				&:last-child {
					border-bottom: none;
				}
				
				.lecture-info {
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
							margin-bottom: 10rpx;
							
							.title {
								font-size: 32rpx;
								font-weight: bold;
								color: #333;
							}
						}
						
						.detail-row {
							margin-bottom: 8rpx;
							
							.speaker {
								font-size: 26rpx;
								color: #666;
							}
						}
						
						.time-row {
							margin-bottom: 8rpx;
							
							.time {
								font-size: 26rpx;
								color: #5B8FF9;
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