<template>
  <view class="detail-container">
    <!-- 课程封面 -->
    <view class="course-cover">
      <image class="cover-image" :src="courseInfo.coverImage" mode="aspectFill"></image>
      <view class="cover-mask"></view>
      <view class="course-title">{{courseInfo.title}}</view>
    </view>
    
    <!-- 课程信息卡片 -->
    <view class="info-card">
      <view class="info-price">
        <text class="price-value">¥{{courseInfo.price}}.00</text>
        <text class="price-label">/全期课程</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-teacher"></text>
        <text class="item-label">授课老师：</text>
        <text class="item-value">{{courseInfo.teacherName}}</text>
        <text class="teacher-title">{{courseInfo.teacherTitle}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-location"></text>
        <text class="item-label">授课地点：</text>
        <text class="item-value">{{courseInfo.schoolName}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-time"></text>
        <text class="item-label">课程时间：</text>
        <text class="item-value">{{formatCourseTime(courseInfo.startTime, courseInfo.endTime)}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-student"></text>
        <text class="item-label">招生人数：</text>
        <text class="item-value">{{courseInfo.capacity || 20}}人 (已报名{{courseInfo.enrolled || 0}}人)</text>
      </view>
    </view>
    
    <!-- 课程详情 -->
    <view class="course-detail">
      <view class="detail-title">课程详情</view>
      <view class="detail-content">
        <rich-text :nodes="courseInfo.description || '暂无课程详情'"></rich-text>
      </view>
    </view>
    
    <!-- 师资介绍 -->
    <view class="teacher-intro">
      <view class="detail-title">师资介绍</view>
      <view class="teacher-card">
        <image class="teacher-avatar" :src="courseInfo.teacherAvatar" mode="aspectFill"></image>
        <view class="teacher-info">
          <view class="teacher-header">
            <text class="teacher-name">{{courseInfo.teacherName}}</text>
            <text class="teacher-title">{{courseInfo.teacherTitle}}</text>
          </view>
          <view class="teacher-desc">{{courseInfo.teacherDesc || '暂无介绍'}}</view>
        </view>
      </view>
    </view>
    
    <!-- 预约信息 -->
    <view class="booking-info" v-if="showBookingForm">
      <view class="detail-title">预约信息</view>
      <view class="form-item">
        <text class="form-label">学生姓名</text>
        <input class="form-input" v-model="bookingForm.studentName" placeholder="请输入学生姓名" />
      </view>
      <view class="form-item">
        <text class="form-label">联系电话</text>
        <input class="form-input" v-model="bookingForm.contactPhone" placeholder="请输入联系电话" />
      </view>
      <view class="form-item">
        <text class="form-label">备注信息</text>
        <textarea class="form-textarea" v-model="bookingForm.remark" placeholder="请输入备注信息（选填）"></textarea>
      </view>
    </view>
    
    <!-- 底部栏 -->
    <view class="footer">
      <view class="contact-btn" @click="contactTeacher">
        <text class="btn-icon iconfont icon-contact"></text>
        <text>联系老师</text>
      </view>
      <view class="book-btn" @click="toggleBookingForm">
        {{showBookingForm ? '取消预约' : '预约课程'}}
      </view>
      <view class="submit-btn" v-if="showBookingForm" @click="submitBooking">立即预约</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseId: '',
      courseInfo: {},
      showBookingForm: false,
      bookingForm: {
        studentName: '',
        contactPhone: '',
        remark: ''
      }
    }
  },
  onLoad(options) {
    if (options.id) {
      this.courseId = options.id
      this.fetchCourseDetail()
    }
  },
  methods: {
    // 获取课程详情
    async fetchCourseDetail() {
      try {
        // 显示加载提示
        uni.showLoading({
          title: '加载中...'
        });
        
        // 使用API接口获取课程详情
        const result = await this.$api.course.getCourseDetail(this.courseId);
        
        // 隐藏加载提示
        uni.hideLoading();
        
        if (result && result.data) {
          this.courseInfo = result.data;
          console.log('课程详情:', this.courseInfo);
        } else {
          // 获取失败时使用模拟数据
          console.error('获取课程详情失败: 未找到数据');
          this.useMockData();
        }
      } catch (error) {
        // 隐藏加载提示
        uni.hideLoading();
        
        console.error('获取课程详情失败:', error);
        // 加载失败，使用模拟数据
        this.useMockData();
        
        // 显示错误提示
        uni.showToast({
          title: '获取课程详情失败',
          icon: 'none'
        });
      }
    },
    
    // 使用模拟数据
    useMockData() {
      this.courseInfo = {
        _id: '1',
        title: '三年级浪漫暑假班',
        school: '雨花台',
        schoolName: '雨花台校区',
        teacherName: '刘星宇',
        teacherTitle: '小学教师',
        teacherAvatar: '/static/images/teacher/teacher1.jpg',
        coverImage: '/static/images/course/course1.jpg',
        price: 4000,
        startTime: '2023-07-01 15:30',
        endTime: '2023-07-17 15:30',
        capacity: 30,
        enrolled: 15,
        description: `<p style="text-indent:2em;">暑假班的主要内容包括：</p>
<p style="text-indent:2em;">1. 语文与数学的基础知识巩固</p>
<p style="text-indent:2em;">2. 英语口语和听力训练</p>
<p style="text-indent:2em;">3. 趣味科学实验</p>
<p style="text-indent:2em;">4. 艺术创作和音乐欣赏</p>`,
        teacherDesc: '毕业于南京师范大学教育系，从教十年，教学经验丰富，善于启发学生思考，深受学生和家长喜爱。'
      }
    },
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return ''
      
      const formatDateTime = (dateStr) => {
        const date = new Date(dateStr)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
      }
      
      if (endTime) {
        return `${formatDateTime(startTime)} - ${formatDateTime(endTime)}`
      }
      
      return formatDateTime(startTime)
    },
    
    // 切换预约表单显示状态
    toggleBookingForm() {
      this.showBookingForm = !this.showBookingForm
    },
    
    // 联系老师
    contactTeacher() {
      uni.makePhoneCall({
        phoneNumber: '13812345678',
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 提交预约
    async submitBooking() {
      // 表单验证
      if (!this.bookingForm.studentName) {
        uni.showToast({
          title: '请输入学生姓名',
          icon: 'none'
        });
        return;
      }
      
      if (!this.bookingForm.contactPhone) {
        uni.showToast({
          title: '请输入联系电话',
          icon: 'none'
        });
        return;
      }
      
      const phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(this.bookingForm.contactPhone)) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
      
      uni.showLoading({
        title: '提交中...'
      });
      
      try {
        // 获取用户ID（实际应从登录状态获取）
        const userInfo = getApp().globalData.userInfo || {};
        const userId = userInfo.userId || 'temp_user_id';
        
        // 使用API接口调用预约课程
        const result = await this.$api.course.bookCourse({
          courseId: this.courseId,
          userId: userId,
          studentName: this.bookingForm.studentName,
          contactPhone: this.bookingForm.contactPhone,
          remark: this.bookingForm.remark
        });
        
        uni.hideLoading();
        
        if (result && result.success) {
          uni.showToast({
            title: '预约成功',
            icon: 'success'
          });
          
          // 重置表单
          this.bookingForm = {
            studentName: '',
            contactPhone: '',
            remark: ''
          };
          this.showBookingForm = false;
          
          // 刷新课程信息
          this.fetchCourseDetail();
        } else {
          uni.showToast({
            title: result.message || '预约失败',
            icon: 'none'
          });
        }
      } catch (e) {
        console.error('预约课程失败:', e);
        uni.showToast({
          title: '预约失败，请稍后重试',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  background-color: $bg-color;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* 课程封面 */
.course-cover {
  height: 400rpx;
  position: relative;
  
  .cover-image {
    width: 100%;
    height: 100%;
  }
  
  .cover-mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  }
  
  .course-title {
    position: absolute;
    bottom: 30rpx;
    left: 30rpx;
    right: 30rpx;
    color: #fff;
    font-size: 36rpx;
    font-weight: bold;
  }
}

/* 课程信息卡片 */
.info-card {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .info-price {
    margin-bottom: 20rpx;
    
    .price-value {
      font-size: 48rpx;
      font-weight: bold;
      color: #FF3B30;
    }
    
    .price-label {
      font-size: 24rpx;
      color: $text-color-grey;
      margin-left: 8rpx;
    }
  }
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .item-icon {
      font-size: 32rpx;
      color: $theme-color;
      margin-right: 10rpx;
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-grey;
      width: 150rpx;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      flex: 1;
    }
    
    .teacher-title {
      font-size: 24rpx;
      color: $text-color-light;
      background-color: #f5f5f5;
      padding: 6rpx 12rpx;
      border-radius: 6rpx;
      margin-left: 10rpx;
    }
  }
}

/* 课程详情和师资介绍 */
.course-detail, .teacher-intro {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.detail-title {
  font-size: 32rpx;
  font-weight: bold;
  color: $text-color;
  margin-bottom: 20rpx;
  position: relative;
  padding-left: 20rpx;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8rpx;
    height: 32rpx;
    width: 6rpx;
    background-color: $theme-color;
    border-radius: 3rpx;
  }
}

.detail-content {
  font-size: 28rpx;
  color: $text-color;
  line-height: 1.8;
}

/* 师资介绍 */
.teacher-card {
  display: flex;
  margin-top: 30rpx;
  
  .teacher-avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    margin-right: 20rpx;
  }
  
  .teacher-info {
    flex: 1;
    
    .teacher-header {
      margin-bottom: 10rpx;
      
      .teacher-name {
        font-size: 32rpx;
        font-weight: bold;
        color: $text-color;
        margin-right: 16rpx;
      }
      
      .teacher-title {
        font-size: 24rpx;
        color: $text-color-light;
        background-color: #f5f5f5;
        padding: 4rpx 12rpx;
        border-radius: 6rpx;
      }
    }
    
    .teacher-desc {
      font-size: 28rpx;
      color: $text-color-grey;
      line-height: 1.6;
    }
  }
}

/* 预约信息 */
.booking-info {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .form-item {
    margin-bottom: 30rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .form-label {
      display: block;
      font-size: 28rpx;
      color: $text-color;
      margin-bottom: 16rpx;
    }
    
    .form-input, .form-textarea {
      width: 100%;
      background-color: #f9f9f9;
      border-radius: 8rpx;
      border: 1rpx solid #eee;
      padding: 20rpx;
      font-size: 28rpx;
      box-sizing: border-box;
    }
    
    .form-textarea {
      height: 200rpx;
    }
  }
}

/* 底部栏 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  border-top: 1rpx solid $border-color-light;
  
  .contact-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120rpx;
    border-right: 1rpx solid $border-color-light;
    
    .btn-icon {
      font-size: 36rpx;
      color: $text-color-grey;
    }
    
    text {
      font-size: 22rpx;
      color: $text-color-grey;
    }
  }
  
  .book-btn, .submit-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    color: #fff;
  }
  
  .book-btn {
    background-color: #FF9500;
  }
  
  .submit-btn {
    background-color: #FF3B30;
  }
}
</style> 