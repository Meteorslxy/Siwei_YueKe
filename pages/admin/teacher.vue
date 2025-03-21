<template>
	<view class="teacher-admin">
		<view class="header">
			<text class="title">教师管理</text>
			<view class="actions">
				<button class="btn-primary" @click="navigateToUpload">添加教师</button>
				<button class="btn-default" @click="refreshData">刷新</button>
			</view>
		</view>
		
		<view class="content" v-if="teacherList.length > 0">
			<view class="teacher-item" v-for="(item, index) in teacherList" :key="item._id">
				<view class="teacher-info">
					<image class="avatar" :src="getImageUrl(item.avatarId || item.avatar)" mode="aspectFill"></image>
					<view class="info">
						<view class="name-row">
							<text class="name">{{item.name}}</text>
							<text class="subject">{{item.subject}}</text>
						</view>
						<text class="title">{{item.title}}</text>
						<text class="description">{{formatDescription(item.description)}}</text>
					</view>
				</view>
				<view class="actions">
					<text class="action edit" @click="editTeacher(item)">编辑</text>
					<text class="action delete" @click="deleteTeacher(item)">删除</text>
				</view>
			</view>
		</view>
		
		<view class="empty" v-else>
			<text class="empty-text">暂无教师数据</text>
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
				teacherList: [],
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
			
			this.fetchTeacherList();
		},
		methods: {
			// 获取教师列表
			async fetchTeacherList() {
				this.loading = true;
				try {
					const result = await this.$api.teacher.getTeacherList();
					console.log('获取教师列表结果:', result);
					
					if (result && result.code === 0) {
						this.teacherList = result.data || [];
						
						// 预加载头像
						for (const teacher of this.teacherList) {
							if (teacher.avatarId) {
								// 获取头像ID保存到缓存
								this.preloadImage(teacher.avatarId);
							} else if (teacher.avatar) {
								// 兼容直接有avatar字段的情况
								this.imageCache[teacher._id] = teacher.avatar;
							}
						}
					} else {
						uni.showToast({
							title: result?.message || '获取教师列表失败',
							icon: 'none'
						});
					}
				} catch (error) {
					console.error('获取教师列表失败:', error);
					uni.showToast({
						title: '获取教师列表失败',
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
					
					console.log('预加载图片，ID:', imageId);
					const result = await this.$api.file.getImage(imageId);
					console.log('预加载图片结果:', result);
					
					if (result && result.success) {
						const imgUrl = `data:image/${result.imageData.fileType};base64,${result.imageData.base64Data}`;
						console.log('生成图片URL:', imgUrl.substring(0, 50) + '...');
						this.imageCache[imageId] = imgUrl;
						
						// 强制更新视图
						this.$forceUpdate();
					} else {
						console.error('获取图片失败:', result?.message || '未知错误');
					}
				} catch (error) {
					console.error('预加载图片失败:', error);
				}
			},
			
			// 获取图片URL
			getImageUrl(imageId) {
				// 处理不同格式的图片ID或路径
				console.log('获取图片URL, ID:', imageId);
				
				// 1. 直接是路径格式，直接返回
				if (imageId && imageId.startsWith('/')) {
					console.log('使用路径格式图片:', imageId);
					return imageId;
				}
				
				// 2. 如果是图片ID，先从缓存获取
				if (imageId) {
					// 检查缓存中是否有该图片
					const cached = this.imageCache[imageId];
					if (cached) {
						console.log('从缓存获取图片:', imageId);
						return cached;
					}
					
					// 如果没有在缓存中找到，尝试加载
					console.log('缓存中未找到图片，尝试加载:', imageId);
					this.preloadImage(imageId);
					return '/static/images/teacher/default-avatar.png';
				}
				
				// 3. 没有图片ID，返回默认图片
				console.log('使用默认头像');
				return '/static/images/teacher/default-avatar.png';
			},
			
			// 格式化描述文字
			formatDescription(text) {
				if (!text) return '';
				return text.length > 50 ? text.substring(0, 50) + '...' : text;
			},
			
			// 刷新数据
			refreshData() {
				this.fetchTeacherList();
			},
			
			// 跳转到添加教师页面
			navigateToUpload() {
				console.log('点击添加教师按钮');
				try {
					uni.navigateTo({
						url: '/pages/admin/content-upload/index',
						fail: (err) => {
							console.error('跳转失败:', err);
							uni.showToast({
								title: '跳转失败:' + (err.errMsg || JSON.stringify(err)),
								icon: 'none',
								duration: 3000
							});
						},
						success: () => {
							console.log('跳转成功');
						}
					});
				} catch (error) {
					console.error('跳转异常:', error);
					uni.showToast({
						title: '跳转异常:' + (error.message || JSON.stringify(error)),
						icon: 'none',
						duration: 3000
					});
				}
			},
			
			// 编辑教师信息
			editTeacher(teacher) {
				// 暂时实现为提示，可以跳转到编辑页面
				uni.showToast({
					title: '编辑功能开发中',
					icon: 'none'
				});
			},
			
			// 删除教师
			deleteTeacher(teacher) {
				uni.showModal({
					title: '确认删除',
					content: `确定要删除教师"${teacher.name}"吗？`,
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
	.teacher-admin {
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
			
			.teacher-item {
				padding: 20rpx;
				border-bottom: 1px solid #eee;
				
				&:last-child {
					border-bottom: none;
				}
				
				.teacher-info {
					display: flex;
					margin-bottom: 20rpx;
					
					.avatar {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					
					.info {
						flex: 1;
						
						.name-row {
							display: flex;
							align-items: center;
							margin-bottom: 8rpx;
							
							.name {
								font-size: 32rpx;
								font-weight: bold;
								color: #333;
								margin-right: 16rpx;
							}
							
							.subject {
								font-size: 24rpx;
								color: #EC7A49;
								background-color: rgba(236, 122, 73, 0.1);
								padding: 2rpx 12rpx;
								border-radius: 20rpx;
							}
						}
						
						.title {
							font-size: 26rpx;
							color: #666;
							margin-bottom: 10rpx;
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