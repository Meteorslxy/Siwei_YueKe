<template>
  <view class="detail-container">
    <!-- 课程封面 -->
    <view class="course-cover">
      <image class="cover-image" :src="courseInfo.coverImage" mode="aspectFill"></image>
      <view class="cover-mask"></view>
      <view class="course-title">{{courseInfo.title}}</view>
    </view>
    
    <!-- 课程ID调试信息，仅在调试模式下显示 -->
    <view class="debug-info" v-if="false" style="padding: 10px; background-color: #f0f0f0; margin: 10px;">
      <text style="display: block;">课程ID: {{courseId}}</text>
      <text style="display: block;">用户ID: {{userInfo ? userInfo.userId : '未登录'}}</text>
      <text style="display: block;">预约状态: {{hasBooked ? '已预约' : '未预约'}}</text>
      <button @click="toggleBookStatus" style="margin-top: 5px; font-size: 12px; padding: 2px 5px;">切换预约状态</button>
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
        <text class="item-value">{{courseInfo.location || courseInfo.schoolName || '未指定'}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-time"></text>
        <text class="item-label">课程时间：</text>
        <text class="item-value">{{formatCourseDateAndTime(courseInfo.startDate, courseInfo.endDate, courseInfo.startTime, courseInfo.endTime)}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-student"></text>
        <text class="item-label">招生人数：</text>
        <text class="item-value">{{courseInfo.courseCount || courseInfo.capacity || 20}}人 (已报名{{courseInfo.bookingCount || 0}}人，剩余{{calculateRemainingSeats()}}人)</text>
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
        <image class="teacher-avatar" 
               :src="courseInfo.teacherAvatarUrl || courseInfo.teacherAvatar || '/static/images/teacher/default-avatar.png'" 
               mode="aspectFill"></image>
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
    <view class="booking-info" v-if="hasBooked">
      <view class="detail-title">预约状态</view>
      <view class="booking-status">
        <text class="status-icon iconfont icon-success"></text>
        <text class="status-text">您已成功预约该课程</text>
      </view>
      <view class="booking-tips">
        可在<text class="tips-link" @click="navigateToBookingList">我的预约</text>中查看详情
      </view>
    </view>
    
    <!-- 底部栏 -->
    <view class="footer">
      <view class="contact-btn" @click="contactTeacher">
        <text class="btn-icon iconfont icon-contact"></text>
        <text>联系老师</text>
      </view>
      <button class="book-btn" v-if="!hasBooked" @click="bookCourse">立即预约</button>
      <button class="book-btn booked" v-else @click="navigateToBookingList">查看预约</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseId: '',
      courseInfo: {},
      hasBooked: false,
      userInfo: null
    }
  },
  mounted() {
    console.log('课程详情页已挂载，当前状态:', {
      courseId: this.courseId,
      userInfo: this.userInfo ? '已登录' : '未登录',
      hasBooked: this.hasBooked
    });
    
    // 每3秒输出状态信息，但不使用document.querySelector
    this.debugInterval = setInterval(() => {
      console.log('课程详情页状态:', {
        courseId: this.courseId,
        hasBooked: this.hasBooked
      });
    }, 3000);
    
    // 监听预约取消事件
    uni.$on('booking:cancel', this.handleBookingCancelled);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.debugInterval) {
      clearInterval(this.debugInterval);
    }
    
    // 移除事件监听
    uni.$off('booking:cancel', this.handleBookingCancelled);
  },
  onLoad(options) {
    console.log('加载课程详情页面, 参数:', options);
    
    // 监听预约取消事件，更新本页面的预约状态
    uni.$on('booking:cancel', this.handleBookingCancelled);
    
    if (options.id) {
      this.courseId = options.id;
      // 获取课程详情
      this.getCourseDetail();
      // 如果登录了，检查预约状态
      this.checkBookingStatus();
    } else {
      uni.showToast({
        title: '未找到课程ID',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  
  onUnload() {
    // 页面卸载时移除事件监听，防止内存泄漏
    uni.$off('booking:cancel', this.handleBookingCancelled);
  },
  methods: {
    // 获取课程详情
    async fetchCourseDetail() {
      // 验证课程ID是否有效
      if (!this.courseId) {
        console.error('课程ID为空，无法获取详情');
        return;
      }
      
      try {
        // 显示加载提示
        uni.showLoading({
          title: '加载中...'
        });
        
        console.log('开始获取课程详情，ID:', this.courseId);
        
        // 直接使用MongoDB ObjectId格式调用API
        const result = await this.$api.course.getCourseDetail(this.courseId);
        
        // 隐藏加载提示
        uni.hideLoading();
        
        console.log('课程详情API返回结果:', result);
        
        if (result && result.data) {
          // 处理返回的数组数据 - 获取第一个元素作为课程信息
          if (Array.isArray(result.data) && result.data.length > 0) {
            this.courseInfo = result.data[0];
            console.log('课程详情数据(数组第一项):', this.courseInfo);
          } else {
            this.courseInfo = result.data;
            console.log('课程详情数据(对象):', this.courseInfo);
          }
          
          // 预处理数据，确保所有字段都有值
          this.processCourseData();
        } else {
          // 获取失败时显示错误提示
          console.error('获取课程详情失败: 未找到数据');
          uni.showToast({
            title: '获取课程详情失败',
            icon: 'none'
          });
        }
      } catch (error) {
        // 隐藏加载提示
        uni.hideLoading();
        
        console.error('获取课程详情失败:', error);
        
        // 显示错误提示
        uni.showToast({
          title: '获取课程详情失败',
          icon: 'none'
        });
      }
    },
    
    // 新函数，与onLoad中使用的方法名匹配
    getCourseDetail() {
      // 调用原有的获取课程详情函数
      this.fetchCourseDetail();
    },
    
    // 预处理课程数据，确保所有需要的字段都存在
    processCourseData() {
      if (!this.courseInfo) return;
      
      console.log('预处理课程数据:', this.courseInfo);
      
      // 确保基本字段有默认值
      this.courseInfo.title = this.courseInfo.title || '未命名课程';
      this.courseInfo.price = this.courseInfo.price || 0;
      this.courseInfo.teacherName = this.courseInfo.teacherName || '未指定';
      this.courseInfo.location = this.courseInfo.location || '未指定';
      
      // 处理课程容量和报名人数
      this.courseInfo.courseCount = this.courseInfo.courseCount || 20; // 优先使用courseCount
      this.courseInfo.capacity = this.courseInfo.capacity || this.courseInfo.courseCount || 20;
      this.courseInfo.bookingCount = this.courseInfo.bookingCount || 0;
      
      // 处理日期和时间
      if (!this.courseInfo.startDate && this.courseInfo.startTime && this.courseInfo.startTime.includes(' ')) {
        // 从旧格式提取日期和时间
        const parts = this.courseInfo.startTime.split(' ');
        this.courseInfo.startDate = parts[0];
        this.courseInfo.startTime = parts[1];
      }
      
      if (!this.courseInfo.endDate && this.courseInfo.endTime && this.courseInfo.endTime.includes(' ')) {
        // 从旧格式提取日期和时间
        const parts = this.courseInfo.endTime.split(' ');
        this.courseInfo.endDate = parts[0];
        this.courseInfo.endTime = parts[1];
      }
      
      this.courseInfo.description = this.courseInfo.description || '暂无课程详情';
      
      // 处理封面图片路径
      if (this.courseInfo.coverImage && !this.courseInfo.coverImage.startsWith('/')) {
        this.courseInfo.coverImage = `/static/images/course/${this.courseInfo.coverImage}`;
      } else if (!this.courseInfo.coverImage && this.courseInfo.image) {
        // 使用image字段作为备选
        this.courseInfo.coverImage = this.courseInfo.image.startsWith('/') ? 
          this.courseInfo.image : `/static/images/course/${this.courseInfo.image}`;
      } else if (!this.courseInfo.coverImage) {
        // 没有封面图时使用默认图片
        this.courseInfo.coverImage = '/static/images/course/course1.jpg';
      }
      
      // 预加载教师头像
      if (this.courseInfo.teacherAvatar) {
        this.preloadTeacherAvatar();
      }
      
      console.log('预处理后的课程数据:', this.courseInfo);
    },
    
    // 预加载教师头像
    async preloadTeacherAvatar() {
      if (!this.courseInfo.teacherAvatar) return;
      
      try {
        // 判断是否是本地图片路径（以/static开头或/开头）
        if (this.courseInfo.teacherAvatar.startsWith('/static') || 
            this.courseInfo.teacherAvatar.startsWith('/')) {
          console.log('使用本地头像图片:', this.courseInfo.teacherAvatar);
          // 如果是本地路径，直接使用
          this.courseInfo.teacherAvatarUrl = this.courseInfo.teacherAvatar;
        } else {
          // 否则从云端获取
          console.log('从云端获取头像图片:', this.courseInfo.teacherAvatar);
          const avatarResult = await this.$api.file.getImage(this.courseInfo.teacherAvatar);
          if (avatarResult && avatarResult.data && avatarResult.data.url) {
            this.courseInfo.teacherAvatarUrl = avatarResult.data.url;
          }
        }
      } catch (error) {
        console.error('加载教师头像失败:', error);
        // 加载失败时使用默认头像
        this.courseInfo.teacherAvatarUrl = '/static/images/teacher/default-avatar.png';
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
    
    // 加载用户信息
    loadUserInfo() {
      console.log('加载用户信息');
      
      // 调试全局用户信息
      const globalUserInfo = getApp().globalData.userInfo;
      console.log('全局用户信息:', globalUserInfo);
      
      const userInfoStr = uni.getStorageSync('userInfo');
      console.log('本地存储用户信息字符串:', userInfoStr ? '存在(长度:' + userInfoStr.length + ')' : '不存在');
      
      if (userInfoStr) {
        try {
          this.userInfo = JSON.parse(userInfoStr);
          console.log('当前用户信息解析成功:', this.userInfo);
          
          // 确保userInfo包含userId
          if (!this.userInfo.userId && this.userInfo._id) {
            console.log('用户信息中没有userId，使用_id代替:', this.userInfo._id);
            this.userInfo.userId = this.userInfo._id;
          }
          
          console.log('用户ID:', this.userInfo.userId);
        } catch (e) {
          console.error('解析用户信息失败:', e);
          this.userInfo = null;
          
          // 尝试从全局状态恢复
          if (globalUserInfo) {
            console.log('从全局状态恢复用户信息');
            this.userInfo = globalUserInfo;
          }
        }
      } else {
        console.log('本地存储中没有用户信息');
        this.userInfo = globalUserInfo || null;
      }
      
      // 最终检查
      if (this.userInfo) {
        console.log('最终用户信息:', this.userInfo);
      } else {
        console.log('用户未登录');
      }
    },
    
    // 检查是否已预约
    async checkBookingStatus() {
      console.log('开始检查预约状态，当前用户信息:', this.userInfo);
      
      // 先设置为未预约状态，确保按钮可见
      this.hasBooked = false;
      
      if (!this.userInfo || !this.userInfo.userId || !this.courseId) {
        console.log('用户未登录或缺少必要参数，设置为未预约状态');
        return;
      }
      
      try {
        console.log('检查预约状态，用户ID:', this.userInfo.userId, '课程ID:', this.courseId);
        
        const res = await uniCloud.callFunction({
          name: 'getBookings',
          data: {
            userId: this.userInfo.userId,
            courseId: this.courseId,
            status: ['pending', 'confirmed']
          }
        });
        
        console.log('查询预约状态结果详情:', JSON.stringify(res.result));
        
        if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
          this.hasBooked = true;
          console.log('用户已预约该课程，预约记录:', res.result.data[0]);
        } else {
          console.log('用户未预约该课程，API返回:', res.result);
        }
      } catch (e) {
        console.error('检查预约状态失败，详细错误:', e);
      }
      
      console.log('预约状态检查完成，hasBooked=', this.hasBooked);
    },
    
    // 预约课程
    bookCourse() {
      console.log('点击预约课程按钮');
      
      // 再次检查用户是否登录
      if (!this.userInfo || !this.userInfo.userId) {
        console.log('用户未登录，跳转到登录页面');
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        
        setTimeout(() => {
          // 跳转到登录页面，并设置重定向回当前页面
          const currentUrl = `/pages/course/detail?id=${this.courseId}`;
          console.log('设置登录后重定向地址:', currentUrl);
          uni.navigateTo({
            url: `/pages/login/login?redirect=${encodeURIComponent(currentUrl)}`
          });
        }, 1500);
        return;
      }
      
      // 显示确认弹窗
      uni.showModal({
        title: '确认预约',
        content: `您确定要预约"${this.courseInfo.title}"课程吗？`,
        success: async (res) => {
          if (res.confirm) {
            console.log('用户确认预约');
            // 用户点击确定
            await this.submitBooking();
          } else {
            console.log('用户取消预约');
          }
        }
      });
    },
    
    // 提交预约
    async submitBooking() {
      console.log('开始提交预约请求');
      
      uni.showLoading({
        title: '预约中...'
      });
      
      try {
        console.log('提交预约数据：用户ID:', this.userInfo.userId, '课程ID:', this.courseId);
        
        // 调用云函数预约课程
        const res = await uniCloud.callFunction({
          name: 'bookCourse',
          data: {
            userId: this.userInfo.userId,
            courseId: this.courseId,
            userName: this.userInfo.nickName || this.userInfo.username || '未知用户',
            phoneNumber: this.userInfo.phoneNumber || '',
            remark: ''
          }
        });
        
        console.log('预约结果详情:', JSON.stringify(res.result));
        
        uni.hideLoading();
        
        if (res.result && res.result.success) {
          console.log('预约成功:', res.result);
          uni.showToast({
            title: '预约成功',
            icon: 'success'
          });
          
          // 设置已预约状态
          this.hasBooked = true;
          
          // 更新预约人数，确保UI显示正确
          if (this.courseInfo) {
            this.courseInfo.bookingCount = (this.courseInfo.bookingCount || 0) + 1;
            console.log('更新预约人数，bookingCount:', this.courseInfo.bookingCount);
          }
          
          // 发送预约成功事件，用于其他页面更新
          uni.$emit('booking:success', {
            courseId: this.courseId,
            userId: this.userInfo.userId
          });
          
          // 延迟1.5秒后刷新数据，确保云端数据已更新
          setTimeout(() => {
            // 重新获取课程详情
            this.fetchCourseDetail().then(() => {
              // 再次检查预约状态
              this.checkBookingStatus();
            });
          }, 1500);
        } else {
          console.error('预约失败:', res.result);
          uni.showToast({
            title: res.result && res.result.message ? res.result.message : '预约失败',
            icon: 'none'
          });
        }
      } catch (e) {
        uni.hideLoading();
        console.error('预约课程过程中发生异常:', e);
        uni.showToast({
          title: '预约失败，请稍后重试',
          icon: 'none'
        });
      }
    },
    
    // 跳转到预约列表
    navigateToBookingList() {
      uni.navigateTo({
        url: '/pages/user/booking?status=all'
      });
    },
    
    // 联系老师
    contactTeacher() {
      // 获取教师电话号码
      const teacherPhone = this.courseInfo.teacherPhone || '';
      
      console.log('尝试联系老师，电话:', teacherPhone);
      
      if (!teacherPhone || teacherPhone.trim() === '') {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }
      
      // 检查电话号码格式
      const isValidPhone = /^1[3-9]\d{9}$/.test(teacherPhone) || /^0\d{2,3}-?\d{7,8}$/.test(teacherPhone);
      
      if (!isValidPhone) {
        console.warn('教师电话格式可能不正确:', teacherPhone);
        // 尽管格式可能不正确，仍然尝试拨打，但显示警告
        uni.showModal({
          title: '提示',
          content: '电话号码格式可能不正确，是否继续拨打？',
          success: (res) => {
            if (res.confirm) {
              this.makePhoneCall(teacherPhone);
            }
          }
        });
        return;
      }
      
      // 格式正确，直接拨打
      this.makePhoneCall(teacherPhone);
    },
    
    // 拨打电话
    makePhoneCall(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        success: () => {
          console.log('拨打电话成功');
        },
        fail: (err) => {
          console.error('拨打电话失败:', err);
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 格式化课程日期和时间
    formatCourseDateAndTime(startDate, endDate, startTime, endTime) {
      // 检查必要参数，如果没有新格式的字段，则使用原来的时间格式
      if (!startDate && !endDate) {
        if (this.courseInfo.startTime && this.courseInfo.endTime) {
          return this.formatCourseTime(this.courseInfo.startTime, this.courseInfo.endTime);
        }
        return '时间待定';
      }
      
      // 格式化日期部分
      const formatDate = (dateStr) => {
        if (!dateStr) return '';
        let date;
        try {
          date = new Date(dateStr);
          // 检查日期是否有效
          if (isNaN(date.getTime())) {
            return '';
          }
        } catch (e) {
          console.error('日期格式化错误:', e);
          return '';
        }
        return `${date.getFullYear()}年${(date.getMonth() + 1)}月${date.getDate()}日`;
      };
      
      // 格式化时间部分
      const formatTime = (timeStr) => {
        if (!timeStr) return '';
        
        // 如果timeStr是标准时间格式，则直接使用Date对象解析
        if (timeStr.includes(':')) {
          try {
            // 处理"HH:MM"格式
            const parts = timeStr.split(':');
            const hours = parseInt(parts[0]);
            const minutes = parts.length > 1 ? parseInt(parts[1]) : 0;
            
            if (!isNaN(hours) && !isNaN(minutes)) {
              return `${hours}:${minutes.toString().padStart(2, '0')}`;
            }
          } catch (e) {
            console.error('时间格式化错误:', e);
          }
        }
        
        // 如果不是标准格式，尝试作为完整日期解析
        try {
          const time = new Date(timeStr);
          if (!isNaN(time.getTime())) {
            return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
          }
        } catch (e) {
          console.error('时间格式化错误:', e);
        }
        
        return timeStr; // 兜底返回原始值
      };
      
      let result = '';
      
      // 添加日期范围
      const startDateFormatted = formatDate(startDate);
      const endDateFormatted = formatDate(endDate);
      
      if (startDateFormatted && endDateFormatted) {
        if (startDateFormatted === endDateFormatted) {
          // 如果开始和结束日期相同
          result = startDateFormatted;
        } else {
          result = `${startDateFormatted} 至 ${endDateFormatted}`;
        }
      } else if (startDateFormatted) {
        result = startDateFormatted;
      } else if (endDateFormatted) {
        result = endDateFormatted;
      }
      
      // 添加时间范围
      const startTimeFormatted = formatTime(startTime);
      const endTimeFormatted = formatTime(endTime);
      
      if (startTimeFormatted && endTimeFormatted) {
        if (result) {
          result += ` ${startTimeFormatted}-${endTimeFormatted}`;
        } else {
          result = `${startTimeFormatted}-${endTimeFormatted}`;
        }
      }
      
      return result || '时间待定';
    },
    
    // 计算剩余名额
    calculateRemainingSeats() {
      const total = this.courseInfo.courseCount || this.courseInfo.capacity || 20;
      const enrolled = this.courseInfo.bookingCount || 0;
      const remaining = Math.max(0, total - enrolled);
      return remaining;
    },
    
    // 新增：调试方法，简单切换预约状态
    toggleBookStatus() {
      this.hasBooked = !this.hasBooked;
      console.log('手动切换预约状态，当前值:', this.hasBooked);
    },
    
    // 处理预约取消事件
    handleBookingCancelled(data) {
      console.log('收到预约取消事件:', data);
      
      // 判断是否是当前课程的预约取消
      if (data && data.courseId === this.courseId) {
        // 更新预约状态
        this.hasBooked = false;
        this.bookingId = '';
        this.bookingStatus = '';
        
        uni.showToast({
          title: '预约已取消',
          icon: 'none'
        });
        
        // 刷新课程详情，获取最新的报名人数
        this.getCourseDetail();
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
  
  .booking-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
    
    .status-icon {
      font-size: 48rpx;
      color: #4CD964;
      margin-right: 20rpx;
    }
    
    .status-text {
      font-size: 32rpx;
      color: $text-color;
      font-weight: bold;
    }
  }
  
  .booking-tips {
    text-align: center;
    font-size: 28rpx;
    color: $text-color-grey;
    padding-bottom: 30rpx;
    
    .tips-link {
      color: $theme-color;
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
  z-index: 100;
  
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
    font-weight: bold;
    color: #fff;
    background-color: #FF6B00; /* 主题色 */
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    line-height: 100rpx;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    
    &::after {
      border: none;
    }
  }
  
  .book-btn {
    &.booked {
      background-color: #4CD964;
    }
    
    &.disabled {
      background-color: #999;
      color: #fff;
      cursor: not-allowed;
    }
  }
}
</style> 