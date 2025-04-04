<template>
  <view class="detail-container">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'rpx' }">
      <view class="navbar-left" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <view class="navbar-title">讲座详情</view>
      <view class="navbar-right"></view>
    </view>
    
    <!-- 固定在右上角的收藏按钮 -->
    <view class="fixed-favorite-wrapper" :style="{ top: (statusBarHeight + 90) + 'rpx' }">
      <favorite-button 
        :itemId="lectureId"
        itemType="lecture"
        :itemTitle="lectureInfo.title"
        :itemCover="lectureInfo.coverUrl"
      ></favorite-button>
    </view>
    
    <!-- 讲座头部信息 - 使用与教师详情页类似的布局 -->
    <view class="lecture-header">
      <view class="avatar-container">
        <image class="lecture-avatar" :src="getImageUrl(lectureInfo.coverUrl)" mode="aspectFill"></image>
      </view>
      
      <view class="lecture-info">
        <view class="name-info">
          <view class="lecture-title">{{lectureInfo.title || '未命名讲座'}}</view>
        </view>
        <view class="lecture-speaker" v-if="lectureInfo.speaker">
          主讲人：{{lectureInfo.speaker}} 
          <text class="speaker-title" v-if="lectureInfo.speakerTitle">{{lectureInfo.speakerTitle}}</text>
        </view>
      </view>
    </view>
    
    <!-- 讲座信息卡片 -->
    <view class="info-card">
      <view class="info-price">
        <text class="price-value">{{lectureInfo.price > 0 ? '¥' + lectureInfo.price : '免费'}}</text>
        <text class="price-label">{{lectureInfo.price > 0 ? '/人' : ''}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-location"></text>
        <text class="item-label">地点：</text>
        <text class="item-value">{{lectureInfo.location || '未设置'}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-time"></text>
        <text class="item-label">时间：</text>
        <text class="item-value">{{formatDateTime(lectureInfo.startTime)}}</text>
      </view>
      
      <view class="info-item">
        <text class="item-icon iconfont icon-count"></text>
        <text class="item-label">名额：</text>
        <text class="item-value">{{formatCapacity(lectureInfo.capacity, lectureInfo.enrollmentCount)}}</text>
      </view>
    </view>
    
    <!-- 讲座详情 -->
    <view class="lecture-detail">
      <view class="detail-title">讲座简介</view>
      <view class="detail-content">
        <rich-text :nodes="lectureInfo.description || '暂无详细介绍'"></rich-text>
      </view>
    </view>
    
    <!-- 主讲人介绍 -->
    <view class="speaker-intro" v-if="lectureInfo.speakerIntro">
      <view class="detail-title">主讲人介绍</view>
      <view class="detail-content">
        <rich-text :nodes="lectureInfo.speakerIntro || '暂无讲师介绍'"></rich-text>
      </view>
    </view>
    
    <!-- 报名状态 -->
    <view class="enrollment-info" v-if="hasEnrolled">
      <view class="detail-title">报名状态</view>
      <view class="enrollment-status">
        <text class="status-icon iconfont icon-success"></text>
        <text class="status-text">您已成功报名该讲座</text>
      </view>
      <view class="enrollment-tips">
        可在<text class="tips-link" @click="navigateToEnrollmentList">我的报名</text>中查看详情
      </view>
    </view>
    
    <!-- 底部栏 -->
    <view class="footer">
      <view class="contact-btn" @click="contactSpeaker">
        <text class="btn-icon iconfont icon-contact"></text>
        <text>联系主讲人</text>
      </view>
      <button class="enroll-btn" v-if="!hasEnrolled" @click="enrollLecture">立即报名</button>
      <button class="enroll-btn enrolled" v-else @click="navigateToEnrollmentList">查看报名</button>
    </view>
  </view>
</template>

<script>
// 引入收藏按钮组件
import FavoriteButton from '@/components/favorite-button/favorite-button.vue';

export default {
  components: {
    FavoriteButton
  },
  data() {
    return {
      lectureId: '',
      lectureInfo: {},
      hasEnrolled: false,
      userInfo: null,
      statusBarHeight: 90, // 默认状态栏高度（rpx单位）
      defaultCover: '/static/images/default-lecture.jpg'
    }
  },
  mounted() {
    console.log('讲座详情页已挂载，当前状态:', {
      lectureId: this.lectureId,
      userInfo: this.userInfo ? '已登录' : '未登录',
      hasEnrolled: this.hasEnrolled
    });
    
    // 监听报名取消事件
    uni.$on('enrollment:cancel', this.handleEnrollmentCancelled);
  },
  beforeDestroy() {
    // 移除事件监听
    uni.$off('enrollment:cancel', this.handleEnrollmentCancelled);
    uni.$off('login:success', this.handleLoginSuccess);
  },
  onLoad(options) {
    console.log('加载讲座详情页面, 参数:', options);
    
    // 监听报名取消事件，更新本页面的报名状态
    uni.$on('enrollment:cancel', this.handleEnrollmentCancelled);
    
    // 加载用户信息
    this.loadUserInfo();
    
    if (options.id) {
      this.lectureId = options.id;
      
      // 获取讲座详情
      this.getLectureDetail();
      
      // 检查报名状态
      this.checkEnrollmentStatus();
    } else {
      uni.showToast({
        title: '未找到讲座ID',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  
  onUnload() {
    // 页面卸载时移除事件监听，防止内存泄漏
    uni.$off('enrollment:cancel', this.handleEnrollmentCancelled);
    uni.$off('login:success', this.handleLoginSuccess);
  },
  methods: {
    // 获取讲座详情
    async getLectureDetail() {
      try {
        uni.showLoading({
          title: '加载中...'
        });
        
        console.log('获取讲座详情, ID:', this.lectureId);
        const result = await this.$api.lecture.getLectureDetail(this.lectureId);
        
        uni.hideLoading();
        
        if (result && result.data) {
          this.lectureInfo = result.data;
          console.log('讲座详情:', this.lectureInfo);
        } else {
          uni.showToast({
            title: '获取讲座详情失败',
            icon: 'none'
          });
        }
      } catch (error) {
        uni.hideLoading();
        console.error('获取讲座详情失败:', error);
        uni.showToast({
          title: '获取讲座详情失败',
          icon: 'none'
        });
      }
    },
    
    // 加载用户信息
    loadUserInfo() {
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo) {
          // 安全地解析用户数据
          try {
            this.userInfo = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
          } catch (e) {
            console.error('解析用户数据失败:', e);
            this.userInfo = userInfo;
          }
          console.log('已加载用户信息');
        } else {
          console.log('未找到用户信息，用户未登录');
        }
      } catch (e) {
        console.error('获取用户信息失败:', e);
      }
    },
    
    // 检查报名状态
    async checkEnrollmentStatus() {
      if (!this.userInfo) {
        console.log('用户未登录，无法检查报名状态');
        return;
      }
      
      try {
        // 获取用户ID
        const userId = this.userInfo.userId || this.userInfo._id || this.userInfo.uid || 
                     (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                     (this.userInfo.userInfo && this.userInfo.userInfo.uid);
        
        if (!userId) {
          console.log('无法获取用户ID，无法检查报名状态');
          return;
        }
        
        // 查询用户的所有报名记录
        const res = await this.$api.user.getEnrollments({
          userId: userId,
          status: 'active' // 只查询有效的报名
        });
        
        console.log('获取报名记录结果:', res);
        
        if (res && res.code === 0 && res.data) {
          // 查找是否有本讲座的报名记录
          const enrollmentRecord = res.data.find(item => item.courseId === this.lectureId);
          this.hasEnrolled = !!enrollmentRecord;
          console.log('检查报名状态结果:', this.hasEnrolled ? '已报名' : '未报名');
        }
      } catch (error) {
        console.error('检查报名状态失败:', error);
      }
    },
    
    // 处理报名取消事件
    handleEnrollmentCancelled(data) {
      console.log('收到报名取消事件:', data);
      if (data && data.courseId === this.lectureId) {
        console.log('本讲座报名已被取消');
        this.hasEnrolled = false;
      }
    },
    
    // 处理登录成功事件
    handleLoginSuccess() {
      console.log('收到登录成功事件');
      this.loadUserInfo();
      this.checkEnrollmentStatus();
    },
    
    // 报名讲座
    enrollLecture() {
      console.log('点击报名讲座按钮');
      
      // 检查是否登录
      if (!this.userInfo) {
        console.log('用户未登录，跳转到登录页面');
        this.showLoginTip();
        return;
      }
      
      // 检查用户信息中的各种可能的ID字段
      const userId = this.userInfo.userId || this.userInfo.uid || 
                   this.userInfo._id || 
                   (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                   (this.userInfo.userInfo && this.userInfo.userInfo.uid);
      
      if (!userId) {
        console.log('用户信息中没有有效的ID字段，无法报名讲座', this.userInfo);
        this.showLoginTip();
        return;
      }
      
      // 显示确认弹窗
      uni.showModal({
        title: '确认报名',
        content: `您确定要报名"${this.lectureInfo.title}"讲座吗？`,
        success: async (res) => {
          if (res.confirm) {
            console.log('用户确认报名');
            // 用户点击确定
            await this.submitEnrollment();
          } else {
            console.log('用户取消报名');
          }
        }
      });
    },
    
    // 提交报名
    async submitEnrollment() {
      console.log('开始提交报名请求');
      
      uni.showLoading({
        title: '报名中...'
      });
      
      try {
        // 确保有有效的用户ID
        const userId = this.userInfo.userId || this.userInfo.uid || this.userInfo._id || 
                     (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                     (this.userInfo.userInfo && this.userInfo.userInfo.uid);
        
        if (!userId) {
          console.error('无法确定用户ID，报名失败');
          uni.hideLoading();
          uni.showToast({
            title: '用户信息不完整，请重新登录',
            icon: 'none'
          });
          return;
        }
        
        // 获取用户名称
        const userName = this.userInfo.nickName || 
                       this.userInfo.nickname || 
                       this.userInfo.username || 
                       (this.userInfo.userInfo && this.userInfo.userInfo.nickname) ||
                       '微信用户';
                       
        // 获取手机号
        const phoneNumber = this.userInfo.phoneNumber || 
                          this.userInfo.mobile ||
                          (this.userInfo.userInfo && this.userInfo.userInfo.mobile) ||
                          '';
        
        console.log('提交报名数据：用户ID:', userId, '讲座ID:', this.lectureId);
        
        // 调用云函数报名讲座
        const res = await this.$api.user.enrollCourse({
          userId: userId,
          courseId: this.lectureId,
          userName: userName,
          phoneNumber: phoneNumber,
          remark: ''
        });
        
        console.log('报名结果:', res);
        
        uni.hideLoading();
        
        if (res && res.success) {
          console.log('报名成功:', res);
          
          // 设置报名状态
          this.hasEnrolled = true;
          
          uni.showToast({
            title: '报名成功',
            icon: 'success'
          });
          
          // 更新报名人数
          if (this.lectureInfo) {
            this.lectureInfo.enrollmentCount = (this.lectureInfo.enrollmentCount || 0) + 1;
          }
          
          // 发送报名成功事件
          uni.$emit('enrollment:success', {
            courseId: this.lectureId,
            userId: userId
          });
        } else {
          uni.showToast({
            title: res.message || '报名失败',
            icon: 'none'
          });
        }
      } catch (error) {
        uni.hideLoading();
        console.error('报名失败:', error);
        uni.showToast({
          title: '报名失败，请稍后再试',
          icon: 'none'
        });
      }
    },
    
    // 导航到报名列表
    navigateToEnrollmentList() {
      uni.navigateTo({
        url: '/pages/user/enrollment/index'
      });
    },
    
    // 联系主讲人
    contactSpeaker() {
      if (this.lectureInfo.speakerPhone) {
        uni.makePhoneCall({
          phoneNumber: this.lectureInfo.speakerPhone,
          fail: () => {
            uni.showToast({
              title: '拨打电话失败',
              icon: 'none'
            });
          }
        });
      } else {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
      }
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 格式化日期时间
    formatDateTime(timestamp) {
      if (!timestamp) return '未设置';
      
      try {
        const date = new Date(timestamp);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } catch (e) {
        console.error('格式化日期时间失败:', e);
        return timestamp;
      }
    },
    
    // 格式化容量显示
    formatCapacity(capacity, enrolled) {
      if (!capacity) return '不限';
      
      const enrolledCount = enrolled || 0;
      return `${enrolledCount}/${capacity}人`;
    },
    
    // 显示登录提示
    showLoginTip() {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
      
      setTimeout(() => {
        // 跳转到登录页面，并设置重定向回当前页面
        const currentUrl = `/pages/lecture/detail?id=${this.lectureId}`;
        uni.navigateTo({
          url: `/pages/login/login?redirect=${encodeURIComponent(currentUrl)}`
        });
      }, 1500);
    },
    
    // 处理图片URL，确保正确加载
    getImageUrl(src) {
      if (!src) {
        console.log('使用默认讲座封面');
        return this.defaultCover;
      }
      
      // 检查是否为完整URL（以http或https开头）
      if (src.startsWith('http://') || src.startsWith('https://')) {
        console.log('使用云存储URL作为封面:', src);
        return src;
      } 
      
      // 检查是否为本地路径（以/开头）
      if (src.startsWith('/')) {
        // 已经是本地路径，保持原样
        console.log('使用本地路径作为封面:', src);
        return src;
      } 
      
      // 其他情况，可能是相对路径
      console.log('转换为本地相对路径作为封面:', `/static/images/lecture/${src}`);
      return `/static/images/lecture/${src}`;
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  background-color: rgba(255, 107, 0, 0.9);
  color: #fff;
  z-index: 999;
  
  .navbar-left {
    font-size: 36rpx;
    width: 60rpx;
  }
  
  .navbar-title {
    font-size: 32rpx;
    font-weight: bold;
  }
  
  .navbar-right {
    width: 60rpx;
  }
}

/* 讲座头部 - 采用与教师详情页类似的布局 */
.lecture-header {
  padding: 30rpx;
  display: flex;
  background-color: #fff;
  margin-top: 180rpx; /* 为导航栏留出空间 */
  
  .avatar-container {
    width: 160rpx;
    height: 160rpx;
    margin-right: 30rpx;
    border-radius: 50%;
    overflow: hidden;
    border: 6rpx solid rgba(236, 122, 73, 0.2);
    
    .lecture-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  
  .lecture-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .name-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10rpx;
    }
    
    .lecture-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    .lecture-speaker {
      font-size: 28rpx;
      color: #666;
      
      .speaker-title {
        font-size: 24rpx;
        color: #999;
        background-color: #f5f5f5;
        padding: 6rpx 12rpx;
        border-radius: 6rpx;
        margin-left: 10rpx;
      }
    }
  }
}

/* 讲座信息卡片 */
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
      color: #999;
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
      color: #FF6B00;
      margin-right: 10rpx;
    }
    
    .item-label {
      font-size: 28rpx;
      color: #999;
      width: 150rpx;
    }
    
    .item-value {
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }
    
    .teacher-title {
      font-size: 24rpx;
      color: #999;
      background-color: #f5f5f5;
      padding: 6rpx 12rpx;
      border-radius: 6rpx;
      margin-left: 10rpx;
    }
  }
}

/* 讲座详情和主讲人介绍 */
.lecture-detail, .speaker-intro {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.detail-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
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
    background-color: #FF6B00;
    border-radius: 3rpx;
  }
}

.detail-content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
}

/* 报名状态 */
.enrollment-info {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .enrollment-status {
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
      color: #333;
      font-weight: bold;
    }
  }
  
  .enrollment-tips {
    text-align: center;
    font-size: 28rpx;
    color: #999;
    padding-bottom: 30rpx;
    
    .tips-link {
      color: #FF6B00;
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
  border-top: 1rpx solid #eee;
  z-index: 100;
  
  .contact-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120rpx;
    border-right: 1rpx solid #eee;
    
    .btn-icon {
      font-size: 36rpx;
      color: #999;
    }
    
    text {
      font-size: 22rpx;
      color: #999;
    }
  }
  
  .enroll-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: bold;
    color: #fff;
    background-color: #FF6B00;
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    line-height: 100rpx;
    height: 100%;
    
    &.enrolled {
      background-color: #4CD964;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '✓';
        display: inline-block;
        margin-right: 10rpx;
        font-weight: bold;
      }
    }
  }
}

/* 固定在右上角的收藏按钮 */
.fixed-favorite-wrapper {
  position: fixed;
  right: 30rpx;
  z-index: 9999;
}
</style> 