<template>
<view class="course-management-wrapper">
	<view class="course-management-container">
		<view class="header">
			<view class="title">课程管理</view>
			<button class="add-btn" @click="addNewCourse">添加课程</button>
		</view>
		
		<view class="filter-section">
			<view class="search-box">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input class="search-input" type="text" v-model="searchKeyword" placeholder="搜索课程名称" @input="searchCourses"/>
			</view>
			<view class="filter-tabs">
				<view 
					v-for="(tab, index) in filterTabs" 
					:key="index" 
					:class="['tab-item', activeTabIndex === index ? 'active' : '']"
					@click="switchTab(index)"
				>
					{{tab}}
				</view>
			</view>
		</view>
		
		<view class="course-list" v-if="filteredCourses.length > 0">
			<view class="course-item" v-for="(course, index) in filteredCourses" :key="course.id">
				<view class="course-info">
					<view class="course-name">{{course.name}}</view>
					<view class="course-details">
						<view class="detail-item">
							<text class="label">课程类型：</text>
							<text>{{course.type}}</text>
						</view>
						<view class="detail-item">
							<text class="label">课时：</text>
							<text>{{course.duration}} 分钟/节</text>
						</view>
						<view class="detail-item">
							<text class="label">价格：</text>
							<text>¥{{course.price}}</text>
						</view>
						<view class="detail-item">
							<text class="label">状态：</text>
							<text :class="['status', course.status === '已上线' ? 'online' : 'offline']">{{course.status}}</text>
						</view>
					</view>
				</view>
				<view class="course-actions">
					<view class="action-buttons">
						<view class="btn edit-btn" @click="handleEditCourse(index)">编辑</view>
						<view class="btn schedule-btn" @click="handleGenerateSchedule(index)">排课</view>
						<view class="btn preview-btn" @click="generateCourseSchedule(filteredCourses[index], true)">预览</view>
						<view v-if="course.status === '已下线'" class="btn publish-btn" @click="handleToggleStatus(index)">上线</view>
						<view v-else class="btn unpublish-btn" @click="handleToggleStatus(index)">下线</view>
						<view class="btn delete-btn" @click="handleDeleteCourse(index)">删除</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty-state" v-else>
			<image src="/static/images/empty.png" mode="aspectFit" class="empty-image"></image>
			<text class="empty-text">暂无课程数据</text>
		</view>
	</view>
	
	<!-- 日程预览模态框 -->
	<view class="schedule-preview-modal" v-if="showPreviewModal">
		<view class="modal-mask" @click="showPreviewModal = false"></view>
		<view class="modal-content">
			<view class="modal-header">
				<text class="modal-title">课程安排预览</text>
				<text class="modal-close" @click="showPreviewModal = false">×</text>
			</view>
			<scroll-view scroll-y="true" class="modal-body">
				<view class="schedule-item" v-for="(item, index) in formattedSchedules" :key="index">
					<view class="schedule-date">{{item.date}} <text class="weekday">{{item.weekday}}</text></view>
					<view class="schedule-time">{{item.startTime}} - {{item.endTime}}</view>
				</view>
				<view class="no-schedules" v-if="formattedSchedules.length === 0">
					暂无课程安排
				</view>
			</scroll-view>
			<view class="modal-footer">
				<button class="btn-cancel" @click="showPreviewModal = false">取消</button>
				<button class="btn-confirm" @click="saveScheduleFromPreview">保存安排</button>
			</view>
		</view>
	</view>
</view>
</template>

<script>
export default {
	data() {
		return {
			searchKeyword: '',
			activeTabIndex: 0,
			filterTabs: ['全部', '已上线', '已下线'],
			courseList: [],
			filteredCourses: [],
			previewSchedules: [],
			formattedSchedules: [],
			showPreviewModal: false,
			currentCourse: null,
			loading: false,
			currentPage: 1,
			hasMore: true,
			pageSize: 10
		}
	},
	onLoad() {
		this.loadCourseData();
	},
	methods: {
		loadCourseData() {
			// 显示加载提示
			uni.showLoading({
				title: '加载中...'
			});
			
			// 使用uniCloud云函数获取课程数据
			uniCloud.callFunction({
				name: 'getCourseList',
				data: {},
				success: (res) => {
					uni.hideLoading();
					
					// 检查返回结果
					if (res.result && res.result.data) {
						// 转换返回的数据格式，确保字段名称一致
						this.courseList = res.result.data.map(course => ({
							id: course._id,
							name: course.title || course.name || '未命名课程',
							type: course.type || course.classType || '未知',
							duration: course.duration || 0,
							price: course.price || course.classFee || 0,
							status: course.status === 1 ? '已上线' : '已下线',
							teacherId: course.teacherId,
							teacherName: course.teacherName,
							// 其他必要字段
							startDate: course.startDate,
							endDate: course.endDate,
							startTime: course.startTime, // 新增：上课开始时间
							endTime: course.endTime,     // 新增：上课结束时间
							classTime: course.startTime, // 兼容旧代码：使用startTime作为classTime
							classTimes: Array.isArray(course.classTime) ? course.classTime : 
										(typeof course.classTime === 'string' ? [course.classTime] : [])
						}));
						
						// 过滤课程
						this.filterCourses();
					} else {
						// 如果没有数据或发生错误，使用空数组
						this.courseList = [];
						this.filteredCourses = [];
						
						// 显示错误提示
						uni.showToast({
							title: '获取课程数据失败',
							icon: 'none'
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error('获取课程列表失败:', err);
					
					// 使用模拟数据作为备选
					const mockData = [
						{
							id: 1,
							name: '初中数学一对一',
							type: '一对一',
							duration: 45,
							price: 350,
							status: '已上线',
							startDate: '2023-05-01',
							endDate: '2023-07-31',
							classTime: '14:00',
							classTimes: ['周一', '周三']
						},
						{
							id: 2,
							name: '高中英语小班课',
							type: '小班课',
							duration: 60,
							price: 180,
							status: '已上线',
							startDate: '2023-06-01',
							endDate: '2023-08-31',
							classTime: '16:30',
							classTimes: ['周二', '周四', '周六']
						},
						{
							id: 3,
							name: '小学语文拓展课',
							type: '一对一',
							duration: 40,
							price: 280,
							status: '已下线',
							startDate: '2023-05-15',
							endDate: '2023-07-15',
							classTime: '10:00',
							classTimes: ['周六', '周日']
						},
						{
							id: 4,
							name: '物理竞赛培训班',
							type: '小班课',
							duration: 90,
							price: 220,
							status: '已上线',
							startDate: '2023-07-01',
							endDate: '2023-09-30',
							classTime: '18:00',
							classTimes: ['周一', '周五']
						}
					];
					
					this.courseList = mockData;
					this.filterCourses();
					
					// 显示错误提示
					uni.showToast({
						title: '获取课程数据失败，使用缓存数据',
						icon: 'none'
					});
				}
			});
		},
		searchCourses() {
			this.filterCourses();
		},
		switchTab(index) {
			this.activeTabIndex = index;
			this.filterCourses();
		},
		filterCourses() {
			let results = [...this.courseList];
			
			// 关键字过滤
			if (this.searchKeyword) {
				results = results.filter(course => 
					course.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
				);
			}
			
			// 状态过滤
			if (this.activeTabIndex === 1) {
				results = results.filter(course => course.status === '已上线');
			} else if (this.activeTabIndex === 2) {
				results = results.filter(course => course.status === '已下线');
			}
			
			this.filteredCourses = results;
		},
		addNewCourse() {
			// 跳转到添加新课程页面
			uni.navigateTo({
				url: '/pages/course/edit'
			});
		},
		// 使用索引而不是直接传递对象，避免对象引用问题
		handleEditCourse(index) {
			const course = this.filteredCourses[index];
			if (!course || !course.id) {
				uni.showToast({
					title: '无效的课程数据',
					icon: 'none'
				});
				return;
			}
			
			uni.navigateTo({
				url: `/pages/course/edit?id=${course.id}`
			});
		},
		// 使用索引而不是直接传递对象，避免对象引用问题
		handleGenerateSchedule(index) {
			const course = this.filteredCourses[index];
			if (!course || !course.id) {
				uni.showToast({
					title: '无效的课程数据',
					icon: 'none'
				});
				return;
			}
			
			// 检查是否有必要的日期和时间信息
			if (!course.startDate || !course.endDate) {
				uni.showToast({
					title: '课程缺少开始或结束日期',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			
			// 日期格式处理
			let startDateFormatted = course.startDate;
			let endDateFormatted = course.endDate;
			
			// 检查课程的上课时间和上课星期
			let classTimeValue = '';
			let classTimesValue = [];
			
			// 处理上课时间
			if (course.startTime) {
				classTimeValue = course.startTime;
			} else if (course.classTime) {
				classTimeValue = course.classTime;
			}
			
			// 处理上课星期
			if (Array.isArray(course.classTime)) {
				classTimesValue = course.classTime;
			} else if (Array.isArray(course.classTimes)) {
				classTimesValue = course.classTimes;
			} else if (typeof course.classTimes === 'string') {
				try {
					classTimesValue = JSON.parse(course.classTimes);
				} catch (e) {
					classTimesValue = course.classTimes.split(',').map(item => item.trim());
				}
			}
			
			// 如果没有找到有效的classTimes，显示确认对话框让用户选择
			if (!classTimesValue || classTimesValue.length === 0) {
				uni.showModal({
					title: '上课星期',
					content: '未找到课程的上课星期信息，是否使用默认值（周一、周三、周五）？',
					success: (res) => {
						if (res.confirm) {
							// 使用默认值继续
							const modifiedCourse = {
								...course,
								classTimes: ['周一', '周三', '周五']
							};
							this.showScheduleConfirmation(modifiedCourse, classTimeValue);
						} else {
							// 用户取消
							uni.showToast({
								title: '已取消排课',
								icon: 'none'
							});
						}
					}
				});
				return;
			}
			
			// 有效的课程信息，显示确认对话框
			this.showScheduleConfirmation(course, classTimeValue, classTimesValue);
		},
		
		// 显示排课确认对话框
		showScheduleConfirmation(course, classTimeValue, classTimesValue) {
			// 准备展示的星期信息
			const weekdaysText = Array.isArray(classTimesValue) && classTimesValue.length > 0 
				? classTimesValue.join('、') 
				: (Array.isArray(course.classTimes) && course.classTimes.length > 0 
					? course.classTimes.join('、') 
					: '未知');
			
			// 显示确认对话框
			uni.showModal({
				title: '生成课程计划',
				content: `确定要为课程"${course.name}"生成课程计划吗？\n\n开始日期: ${course.startDate}\n结束日期: ${course.endDate}\n上课时间: ${classTimeValue || '未知'}\n上课星期: ${weekdaysText}`,
				success: (res) => {
					if (res.confirm) {
						// 构建修改后的课程对象
						const modifiedCourse = {
							...course,
							classTime: classTimeValue,
							classTimes: classTimesValue || course.classTimes
						};
						this.generateCourseSchedule(modifiedCourse);
					}
				}
			});
		},
		// 生成课程计划
		generateCourseSchedule(course, previewOnly = false) {
			if (!course) {
				return uni.showToast({
					title: '课程信息为空',
					icon: 'none'
				});
			}
			
			if (!course._id && !course.id) {
				return uni.showToast({
					title: '课程ID缺失',
					icon: 'none'
				});
			}
			
			// 确保课程有一个有效的ID
			if (!course._id) {
				course._id = course.id;
			}
			
			// 检查课程必要信息
			if (!course.startDate || !course.endDate) {
				return uni.showToast({
					title: '课程缺少开始或结束日期',
					icon: 'none'
				});
			}
			
			if (!course.classTime && (!course.classTimes || course.classTimes.length === 0)) {
				return uni.showToast({
					title: '课程缺少上课时间或星期信息',
					icon: 'none'
				});
			}
			
			// 先显示预览
			this.showSchedulePreview(course);
		},
		
		// 显示课程计划预览
		async showSchedulePreview(course) {
			if (!course) {
				return uni.showToast({
					title: '课程信息为空',
					icon: 'none'
				});
			}
			
			if (!course._id && !course.id) {
				return uni.showToast({
					title: '课程ID缺失',
					icon: 'none'
				});
			}
			
			// 确保课程有一个有效的ID
			if (!course._id) {
				course._id = course.id;
			}
			
			// 检查课程必要信息
			if (!course.startDate || !course.endDate) {
				return uni.showToast({
					title: '课程缺少开始或结束日期',
					icon: 'none'
				});
			}
			
			if (!course.classTime && (!course.classTimes || course.classTimes.length === 0)) {
				return uni.showToast({
					title: '课程缺少上课时间或星期信息',
					icon: 'none'
				});
			}
			
			uni.showLoading({
				title: '正在生成课程安排...',
				mask: true
			});
			
			uniCloud.callFunction({
				name: 'updateSchedules',
				data: {
					courseId: course._id,
					teacherId: course.teacherId,
					teacherName: course.teacherName || '', // 添加教师姓名
					name: course.name || course.title || '未命名课程', // 添加课程名称
					startDate: course.startDate,
					endDate: course.endDate,
					classTime: course.classTime,
					classTimes: course.classTimes,
					saveToDatabase: true
				}
			}).then(res => {
				uni.hideLoading();
				if (res.result.code === 0) {
					uni.showToast({
						title: '课程安排已更新',
						icon: 'success'
					});
				} else {
					uni.showToast({
						title: res.result.message || '更新失败',
						icon: 'none'
					});
				}
			}).catch(err => {
				uni.hideLoading();
				console.error('更新课程安排失败', err);
				uni.showToast({
					title: '更新课程安排失败',
					icon: 'none'
				});
			});
		},
		
		async saveScheduleFromPreview() {
			if (!this.previewSchedules || this.previewSchedules.length === 0) {
				return uni.showToast({
					title: '没有课程安排可保存',
					icon: 'none'
				});
			}
			
			// 获取当前预览的课程ID
			const courseId = this.previewSchedules[0].courseId;
			const course = this.courseList.find(c => c.id === courseId);
			
			if (!course) {
				return uni.showToast({
					title: '课程信息不存在',
					icon: 'none'
				});
			}
			
			this.loading = true;
			
			try {
				const { result } = await uniCloud.callFunction({
					name: 'updateSchedules',
					data: {
						courseId: course.id,
						teacherId: course.teacherId,
						teacherName: course.teacherName || '',
						name: course.name || course.title || '未命名课程',
						startDate: course.startDate,
						endDate: course.endDate,
						classTime: course.classTime,
						classTimes: course.classTimes,
						saveToDatabase: true
					}
				});
				
				this.loading = false;
				
				if (result.code === 0) {
					uni.showToast({
						title: '课程安排已保存',
						icon: 'success'
					});
					this.showPreviewModal = false;
				} else {
					uni.showToast({
						title: result.message || '保存课程安排失败',
						icon: 'none'
					});
				}
			} catch (e) {
				console.error('保存课程安排失败', e);
				this.loading = false;
				uni.showToast({
					title: '保存课程安排失败，请重试',
					icon: 'none'
				});
			}
		},
		
		formatDate(dateString) {
			if (!dateString) return '';
			const date = new Date(dateString);
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		},
		
		getWeekday(dateString) {
			if (!dateString) return '';
			const date = new Date(dateString);
			const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
			return weekdays[date.getDay()];
		},
		// 使用索引而不是直接传递对象，避免对象引用问题
		handleToggleStatus(index) {
			const course = this.filteredCourses[index];
			if (!course || !course.id) {
				uni.showToast({
					title: '无效的课程数据',
					icon: 'none'
				});
				return;
			}
			
			// 切换课程状态
			const newStatus = course.status === '已上线' ? '已下线' : '已上线';
			
			uni.showModal({
				title: '确认操作',
				content: `确定要将课程"${course.name}"${course.status === '已上线' ? '下线' : '上线'}吗？`,
				success: (res) => {
					if (res.confirm) {
						this.toggleCourseStatus(course, newStatus);
					}
				}
			});
		},
		// 更新课程状态
		toggleCourseStatus(course, newStatus) {
			// 显示加载提示
			uni.showLoading({
				title: '更新中...'
			});
			
			// 调用云函数更新课程状态
			uniCloud.callFunction({
				name: 'updateCourseStatus',
				data: {
					courseId: course.id,
					status: newStatus === '已上线' ? 1 : 0
				},
				success: (res) => {
					uni.hideLoading();
					
					if (res.result && res.result.code === 0) {
						// 成功更新状态，更新本地数据
						const index = this.courseList.findIndex(item => item.id === course.id);
						if (index !== -1) {
							this.courseList[index].status = newStatus;
							this.filterCourses();
							
							uni.showToast({
								title: '状态更新成功',
								icon: 'success'
							});
						}
					} else {
						// 更新失败
						uni.showToast({
							title: res.result && res.result.message ? res.result.message : '状态更新失败',
							icon: 'none'
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error('调用updateCourseStatus失败:', err);
					
					uni.showToast({
						title: '状态更新失败',
						icon: 'none'
					});
				}
			});
		},
		// 使用索引而不是直接传递对象，避免对象引用问题
		handleDeleteCourse(index) {
			const course = this.filteredCourses[index];
			if (!course || !course.id) {
				uni.showToast({
					title: '无效的课程数据',
					icon: 'none'
				});
				return;
			}
			
			uni.showModal({
				title: '确认删除',
				content: `确定要删除课程"${course.name}"吗？此操作不可恢复。`,
				success: (res) => {
					if (res.confirm) {
						this.deleteCourse(course);
					}
				}
			});
		},
		// 删除课程
		deleteCourse(course) {
			// 显示加载提示
			uni.showLoading({
				title: '删除中...'
			});
			
			// 调用云函数删除课程
			uniCloud.callFunction({
				name: 'deleteCourse',
				data: {
					courseId: course.id
				},
				success: (res) => {
					uni.hideLoading();
					
					if (res.result && res.result.code === 0) {
						// 成功删除，更新本地数据
						const index = this.courseList.findIndex(item => item.id === course.id);
						if (index !== -1) {
							this.courseList.splice(index, 1);
							this.filterCourses();
							
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
						}
					} else {
						// 删除失败
						uni.showToast({
							title: res.result && res.result.message ? res.result.message : '删除失败',
							icon: 'none'
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error('调用deleteCourse失败:', err);
					
					uni.showToast({
						title: '删除失败',
						icon: 'none'
					});
				}
			});
		}
	}
}
</script>

<style lang="scss">
.course-management-wrapper {
	width: 100%;
	min-height: 100vh;
	background-color: #f5f5f5;
	position: relative;
}

.course-management-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	
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
		
		.add-btn {
			background-color: #EC7A49;
			color: #fff;
			font-size: 28rpx;
			padding: 15rpx 30rpx;
			border-radius: 30rpx;
			border: none;
			line-height: 1;
		}
	}
	
	.filter-section {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		
		.search-box {
			display: flex;
			align-items: center;
			background-color: #f8f8f8;
			border-radius: 30rpx;
			padding: 10rpx 20rpx;
			margin-bottom: 20rpx;
			
			.search-input {
				flex: 1;
				height: 60rpx;
				margin-left: 10rpx;
				font-size: 28rpx;
			}
		}
		
		.filter-tabs {
			display: flex;
			border-bottom: 1px solid #eee;
			
			.tab-item {
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				color: #666;
				position: relative;
				
				&.active {
					color: #EC7A49;
					font-weight: bold;
					
					&:after {
						content: '';
						position: absolute;
						bottom: -1px;
						left: 50%;
						transform: translateX(-50%);
						width: 40rpx;
						height: 4rpx;
						background-color: #EC7A49;
						border-radius: 2rpx;
					}
				}
			}
		}
	}
	
	.course-list {
		.course-item {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
			
			.course-info {
				margin-bottom: 20rpx;
				
				.course-name {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;
					margin-bottom: 15rpx;
				}
				
				.course-details {
					display: flex;
					flex-wrap: wrap;
					
					.detail-item {
						width: 50%;
						margin-bottom: 10rpx;
						font-size: 26rpx;
						color: #666;
						
						.label {
							color: #999;
						}
						
						.status {
							&.online {
								color: #67C23A;
							}
							
							&.offline {
								color: #909399;
							}
						}
					}
				}
			}
			
			.course-actions {
				display: flex;
				justify-content: flex-end;
				border-top: 1px solid #eee;
				padding-top: 20rpx;
				
				.action-buttons {
					display: flex;
					justify-content: flex-end;
					
					.btn {
						padding: 10rpx 20rpx;
						font-size: 24rpx;
						border-radius: 6rpx;
						margin-left: 20rpx;
						
						&.edit-btn {
							color: #409EFF;
							border: 1px solid #409EFF;
						}
						
						&.schedule-btn {
							color: #8957E5;
							border: 1px solid #8957E5;
						}
						
						&.preview-btn {
							background-color: #8a2be2; /* 紫色 */
							color: #fff;
						}
						
						&.publish-btn {
							color: #67C23A;
							border: 1px solid #67C23A;
						}
						
						&.unpublish-btn {
							color: #E6A23C;
							border: 1px solid #E6A23C;
						}
						
						&.delete-btn {
							color: #F56C6C;
							border: 1px solid #F56C6C;
						}
					}
				}
			}
		}
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
		
		.empty-image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 30rpx;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}
}

/* 日程预览模态框 */
.schedule-preview-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	
	.modal-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.modal-content {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		width: 80%;
		max-width: 600rpx;
		position: relative;
		
		.modal-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.modal-title {
				font-size: 36rpx;
				font-weight: bold;
				color: #333;
			}
			
			.modal-close {
				font-size: 28rpx;
				color: #999;
				cursor: pointer;
			}
		}
		
		.modal-body {
			max-height: 400rpx;
			overflow-y: auto;
			
			.schedule-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10rpx 0;
				
				.schedule-date {
					font-size: 28rpx;
					color: #333;
				}
				
				.weekday {
					font-size: 24rpx;
					color: #999;
				}
				
				.schedule-time {
					font-size: 28rpx;
					color: #666;
				}
			}
			
			.no-schedules {
				text-align: center;
				padding: 20rpx;
				color: #999;
			}
		}
		
		.modal-footer {
			display: flex;
			justify-content: flex-end;
			padding-top: 20rpx;
			
			.btn-cancel, .btn-confirm {
				padding: 10rpx 20rpx;
				font-size: 28rpx;
				border-radius: 6rpx;
				margin-left: 20rpx;
				
				&.btn-cancel {
					background-color: #909399;
					color: #fff;
				}
				
				&.btn-confirm {
					background-color: #EC7A49;
					color: #fff;
				}
			}
		}
	}
}
</style> 