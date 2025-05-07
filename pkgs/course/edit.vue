<template>
	<view class="course-edit-container">
		<view class="header">
			<view class="title">{{isEdit ? '编辑课程' : '添加课程'}}</view>
		</view>
		
		<view class="form-container">
			<view class="form-group">
				<view class="form-item">
					<text class="label required">课程名称</text>
					<input class="input" type="text" v-model="courseForm.name" placeholder="请输入课程名称"/>
				</view>
				
				<view class="form-item">
					<text class="label required">课程类型</text>
					<picker class="picker" :range="courseTypes" @change="handleTypeChange">
						<view class="picker-value">{{courseForm.type || '请选择课程类型'}}</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="label required">课时时长</text>
					<view class="input-group">
						<input class="input number-input" type="number" v-model="courseForm.duration" placeholder="请输入"/>
						<text class="unit">分钟/节</text>
					</view>
				</view>
				
				<view class="form-item">
					<text class="label required">课程价格</text>
					<view class="input-group">
						<text class="prefix">¥</text>
						<input class="input number-input" type="digit" v-model="courseForm.price" placeholder="请输入"/>
					</view>
				</view>
				
				<view class="form-item">
					<text class="label">课程介绍</text>
					<textarea class="textarea" v-model="courseForm.description" placeholder="请输入课程介绍"/>
				</view>
			</view>
			
			<view class="form-group">
				<view class="group-title">排课信息</view>
				
				<view class="form-item">
					<text class="label required">开始日期</text>
					<picker class="picker" mode="date" :value="courseForm.startDate" @change="handleStartDateChange">
						<view class="picker-value">{{courseForm.startDate || '请选择开始日期'}}</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="label required">结束日期</text>
					<picker class="picker" mode="date" :value="courseForm.endDate" @change="handleEndDateChange">
						<view class="picker-value">{{courseForm.endDate || '请选择结束日期'}}</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="label required">上课时间</text>
					<picker class="picker" mode="time" :value="courseForm.classTime" @change="handleClassTimeChange">
						<view class="picker-value">{{courseForm.classTime || '请选择上课时间'}}</view>
					</picker>
				</view>
				
				<view class="form-item">
					<text class="label required">上课星期</text>
					<view class="weekday-selector">
						<view 
							v-for="(day, index) in weekDays" 
							:key="index" 
							:class="['weekday-item', isWeekdaySelected(day.value) ? 'active' : '']"
							@click="toggleWeekday(day.value)"
						>
							{{day.label}}
						</view>
					</view>
				</view>
				
				<view class="form-item">
					<text class="label">教师选择</text>
					<picker class="picker" :range="teachers" range-key="name" @change="handleTeacherChange">
						<view class="picker-value">{{getSelectedTeacherName() || '请选择教师'}}</view>
					</picker>
				</view>
			</view>
			
			<view class="form-group">
				<view class="group-title">课程设置</view>
				
				<view class="form-item">
					<text class="label">课程状态</text>
					<view class="radio-group">
						<view 
							v-for="(status, index) in statusOptions" 
							:key="index" 
							:class="['radio-item', courseForm.status === status.value ? 'active' : '']"
							@click="courseForm.status = status.value"
						>
							<view class="radio-circle">
								<view class="radio-inner" v-if="courseForm.status === status.value"></view>
							</view>
							<text class="radio-label">{{status.label}}</text>
						</view>
					</view>
				</view>
				
				<view class="form-item">
					<text class="label">是否推荐</text>
					<switch color="#EC7A49" :checked="courseForm.isFeatured" @change="handleFeatureChange"/>
				</view>
			</view>
			
			<view class="form-group">
				<view class="group-title">课程封面</view>
				
				<view class="upload-container" @click="uploadImage">
					<image v-if="courseForm.coverImage" :src="courseForm.coverImage" mode="aspectFill" class="preview-image"></image>
					<view v-else class="upload-placeholder">
						<uni-icons type="camera-filled" size="30" color="#ddd"></uni-icons>
						<text class="upload-text">点击上传封面</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="button-group">
			<button class="cancel-btn" @click="navigateBack">取消</button>
			<button class="save-btn" @click="saveCourse">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isEdit: false,
			courseId: '',
			courseTypes: ['一对一', '小班课', '大班课'],
			statusOptions: [
				{ label: '已上线', value: '已上线' },
				{ label: '已下线', value: '已下线' }
			],
			weekDays: [
				{ label: '周一', value: '周一' },
				{ label: '周二', value: '周二' },
				{ label: '周三', value: '周三' },
				{ label: '周四', value: '周四' },
				{ label: '周五', value: '周五' },
				{ label: '周六', value: '周六' },
				{ label: '周日', value: '周日' }
			],
			teachers: [
				{ id: 1, name: '李老师' },
				{ id: 2, name: '张老师' },
				{ id: 3, name: '王老师' }
			],
			courseForm: {
				name: '',
				type: '',
				duration: '',
				price: '',
				description: '',
				startDate: '',
				endDate: '',
				classTime: '',
				classTimes: [], // 上课星期数组，如 ['周一', '周三']
				teacherId: '',
				teacherName: '',
				status: '已下线',
				isFeatured: false,
				coverImage: ''
			}
		}
	},
	onLoad(options) {
		if (options.id) {
			this.isEdit = true;
			this.courseId = options.id;
			this.loadCourseData();
		}
	},
	methods: {
		loadCourseData() {
			// 模拟从API获取课程数据
			// 实际使用时应替换为真实的API调用
			const mockCourses = [
				{
					id: 1,
					name: '初中数学一对一',
					type: '一对一',
					duration: 45,
					price: 350,
					description: '针对初中学生的一对一数学辅导课程，帮助学生解决学习中的难点。',
					startDate: '2023-08-01',
					endDate: '2023-12-31',
					classTime: '14:00',
					classTimes: ['周一', '周三'],
					teacherId: 1,
					teacherName: '李老师',
					status: '已上线',
					isFeatured: true,
					coverImage: '/static/images/course-math.jpg'
				},
				{
					id: 2,
					name: '高中英语小班课',
					type: '小班课',
					duration: 60,
					price: 180,
					description: '高中英语提升班，针对高考英语的重点难点进行系统训练。',
					startDate: '2023-09-01',
					endDate: '2024-01-31',
					classTime: '16:30',
					classTimes: ['周二', '周四', '周六'],
					teacherId: 2,
					teacherName: '张老师',
					status: '已上线',
					isFeatured: false,
					coverImage: '/static/images/course-english.jpg'
				}
			];
			
			const course = mockCourses.find(c => c.id == this.courseId);
			if (course) {
				this.courseForm = {...course};
			} else {
				uni.showToast({
					title: '课程不存在',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		},
		handleTypeChange(e) {
			const index = e.detail.value;
			this.courseForm.type = this.courseTypes[index];
		},
		handleStartDateChange(e) {
			this.courseForm.startDate = e.detail.value;
		},
		handleEndDateChange(e) {
			this.courseForm.endDate = e.detail.value;
		},
		handleClassTimeChange(e) {
			this.courseForm.classTime = e.detail.value;
		},
		handleTeacherChange(e) {
			const index = e.detail.value;
			const teacher = this.teachers[index];
			this.courseForm.teacherId = teacher.id;
			this.courseForm.teacherName = teacher.name;
		},
		getSelectedTeacherName() {
			if (!this.courseForm.teacherId) return '';
			const teacher = this.teachers.find(t => t.id === this.courseForm.teacherId);
			return teacher ? teacher.name : '';
		},
		isWeekdaySelected(day) {
			return this.courseForm.classTimes.includes(day);
		},
		toggleWeekday(day) {
			if (this.isWeekdaySelected(day)) {
				// 如果已选中，则移除
				this.courseForm.classTimes = this.courseForm.classTimes.filter(d => d !== day);
			} else {
				// 如果未选中，则添加
				this.courseForm.classTimes.push(day);
			}
		},
		handleFeatureChange(e) {
			this.courseForm.isFeatured = e.detail.value;
		},
		uploadImage() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					// 实际使用时，这里应该调用上传API将图片上传到服务器
					// 这里简单处理，直接使用本地临时路径
					this.courseForm.coverImage = res.tempFilePaths[0];
				}
			});
		},
		validateForm() {
			if (!this.courseForm.name) {
				uni.showToast({
					title: '请输入课程名称',
					icon: 'none'
				});
				return false;
			}
			
			if (!this.courseForm.type) {
				uni.showToast({
					title: '请选择课程类型',
					icon: 'none'
				});
				return false;
			}
			
			if (!this.courseForm.duration) {
				uni.showToast({
					title: '请输入课时时长',
					icon: 'none'
				});
				return false;
			}
			
			if (!this.courseForm.price) {
				uni.showToast({
					title: '请输入课程价格',
					icon: 'none'
				});
				return false;
			}
			
			if (!this.courseForm.startDate) {
				uni.showToast({
					title: '请选择开始日期',
					icon: 'none'
				});
				return false;
			}
			
			if (!this.courseForm.endDate) {
				uni.showToast({
					title: '请选择结束日期',
					icon: 'none'
				});
				return false;
			}
			
			if (!this.courseForm.classTime) {
				uni.showToast({
					title: '请选择上课时间',
					icon: 'none'
				});
				return false;
			}
			
			if (this.courseForm.classTimes.length === 0) {
				uni.showToast({
					title: '请选择上课星期',
					icon: 'none'
				});
				return false;
			}
			
			return true;
		},
		saveCourse() {
			if (!this.validateForm()) return;
			
			uni.showLoading({
				title: '保存中...'
			});
			
			// 准备提交的数据
			const courseData = {
				...this.courseForm,
				// 确保classTimes是JSON格式的字符串
				classTimes: JSON.stringify(this.courseForm.classTimes)
			};
			
			// 如果是编辑模式，添加id
			if (this.isEdit) {
				courseData.id = this.courseId;
			}
			
			// 实际应调用API保存课程数据
			// 这里模拟API调用
			setTimeout(() => {
				// 模拟生成课程ID
				if (!this.isEdit) {
					this.courseId = Math.floor(Math.random() * 1000) + 5; // 随机ID，避开已有的ID
				}
				
				uni.hideLoading();
				
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				});
				
				// 询问是否立即生成课程计划
				setTimeout(() => {
					uni.showModal({
						title: '生成课程计划',
						content: '课程已保存成功，是否立即生成课程计划？',
						confirmText: '立即生成',
						cancelText: '稍后处理',
						success: (res) => {
							if (res.confirm) {
								// 用户选择立即生成课程计划
								this.generateCourseSchedule();
							} else {
								// 用户选择稍后处理，直接返回上一页
								uni.navigateBack();
							}
						}
					});
				}, 500);
			}, 1000);
		},
		
		// 生成课程计划
		generateCourseSchedule() {
			uni.showLoading({
				title: '生成课程计划中...'
			});
			
			// 调用云函数生成课程计划
			uniCloud.callFunction({
				name: 'updateSchedules',
				data: {
					courseId: this.courseId,
					teacherId: this.courseForm.teacherId || '',
					saveToDatabase: true
				},
				success: (res) => {
					uni.hideLoading();
					
					if (res.result && res.result.code === 0) {
						// 成功
						uni.showToast({
							title: '课程计划生成成功',
							icon: 'success'
						});
						
						// 显示详细信息
						setTimeout(() => {
							uni.showModal({
								title: '课程计划详情',
								content: `共生成${res.result.data.courseSchedulesCount}个课程日程，首次上课日期为${res.result.data.firstClassDate}，最后上课日期为${res.result.data.lastClassDate}`,
								showCancel: false,
								success: () => {
									// 关闭对话框后返回上一页
									uni.navigateBack();
								}
							});
						}, 500);
					} else {
						// 失败
						uni.showModal({
							title: '生成课程计划失败',
							content: res.result && res.result.message ? res.result.message : '未知错误',
							showCancel: false,
							success: () => {
								// 关闭对话框后返回上一页
								uni.navigateBack();
							}
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error('调用updateSchedules失败:', err);
					
					uni.showModal({
						title: '生成课程计划失败',
						content: err.message || '网络错误，请稍后重试',
						showCancel: false,
						success: () => {
							// 关闭对话框后返回上一页
							uni.navigateBack();
						}
					});
				}
			});
		},
		navigateBack() {
			uni.navigateBack();
		}
	}
}
</script>

<style lang="scss">
.course-edit-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	
	.header {
		margin-bottom: 30rpx;
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}
	
	.form-container {
		.form-group {
			background-color: #fff;
			border-radius: 12rpx;
			padding: 30rpx;
			margin-bottom: 20rpx;
			
			.group-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333;
				margin-bottom: 20rpx;
				border-bottom: 1px solid #f5f5f5;
				padding-bottom: 20rpx;
			}
			
			.form-item {
				margin-bottom: 30rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
				
				.label {
					display: block;
					font-size: 28rpx;
					color: #666;
					margin-bottom: 15rpx;
					
					&.required:after {
						content: '*';
						color: #F56C6C;
						margin-left: 5rpx;
					}
				}
				
				.input, .picker {
					width: 100%;
					height: 80rpx;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					padding: 0 20rpx;
					font-size: 28rpx;
				}
				
				.picker {
					display: flex;
					align-items: center;
				}
				
				.picker-value {
					color: #333;
				}
				
				.input-group {
					display: flex;
					align-items: center;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					padding: 0 20rpx;
					
					.number-input {
						background-color: transparent;
						padding: 0;
						flex: 1;
					}
					
					.prefix, .unit {
						font-size: 28rpx;
						color: #666;
					}
				}
				
				.textarea {
					width: 100%;
					height: 200rpx;
					background-color: #f8f8f8;
					border-radius: 8rpx;
					padding: 20rpx;
					font-size: 28rpx;
				}
				
				.weekday-selector {
					display: flex;
					flex-wrap: wrap;
					
					.weekday-item {
						width: 120rpx;
						height: 80rpx;
						background-color: #f8f8f8;
						border-radius: 8rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						color: #666;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						
						&.active {
							background-color: #EC7A49;
							color: #fff;
						}
					}
				}
				
				.radio-group {
					display: flex;
					
					.radio-item {
						display: flex;
						align-items: center;
						margin-right: 60rpx;
						
						.radio-circle {
							width: 36rpx;
							height: 36rpx;
							border-radius: 50%;
							border: 1px solid #ddd;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 10rpx;
							
							.radio-inner {
								width: 20rpx;
								height: 20rpx;
								border-radius: 50%;
								background-color: #EC7A49;
							}
						}
						
						&.active {
							.radio-circle {
								border-color: #EC7A49;
							}
						}
						
						.radio-label {
							font-size: 28rpx;
							color: #333;
						}
					}
				}
			}
		}
		
		.upload-container {
			width: 300rpx;
			height: 200rpx;
			background-color: #f8f8f8;
			border-radius: 8rpx;
			overflow: hidden;
			
			.preview-image {
				width: 100%;
				height: 100%;
			}
			
			.upload-placeholder {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				
				.upload-text {
					font-size: 24rpx;
					color: #999;
					margin-top: 10rpx;
				}
			}
		}
	}
	
	.button-group {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
		
		button {
			width: 46%;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 45rpx;
			font-size: 32rpx;
		}
		
		.cancel-btn {
			background-color: #f5f5f5;
			color: #666;
			border: 1px solid #ddd;
		}
		
		.save-btn {
			background-color: #EC7A49;
			color: #fff;
		}
	}
}
</style> 