<template>
  <view class="about-container">
    <view class="header">
      <image class="logo" src="https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png" mode="widthFix"></image>
      <text class="version">版本 1.0.0</text>
    </view>
    
    <view class="content">
      <view class="section">
        <view class="section-title">关于我们</view>
        <view class="section-content">
          <text class="paragraph">我们是一个专注于教育培训的平台，致力于为学生提供高质量的课程和教育资源，让学习变得更加高效和有趣。</text>
          <text class="paragraph">我们提供了丰富的课程内容，涵盖小学、初中、高中多个学科，同时还有优秀的教师资源，帮助学生更好地学习和成长。</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">我们的优势</view>
        <view class="section-content">
          <view class="feature-item">
            <view class="feature-icon-box"></view>
            <view class="feature-info">
              <text class="feature-title">优秀师资</text>
              <text class="feature-desc">汇聚经验丰富的优秀教师，确保教学质量</text>
            </view>
          </view>
          <view class="feature-item">
            <view class="feature-icon-box"></view>
            <view class="feature-info">
              <text class="feature-title">课程多样</text>
              <text class="feature-desc">提供丰富多样的课程内容，满足不同学习需求</text>
            </view>
          </view>
          <view class="feature-item">
            <view class="feature-icon-box"></view>
            <view class="feature-info">
              <text class="feature-title">安全可靠</text>
              <text class="feature-desc">保障用户信息安全，提供稳定的服务体验</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">联系我们</view>
        <view class="section-content">
          <view class="contact-item">
            <text class="contact-label">客服电话：</text>
            <text class="contact-value" @click="callPhone('400-123-4567')">400-123-4567</text>
          </view>
          <view class="contact-item">
            <text class="contact-label">电子邮箱：</text>
            <text class="contact-value">support@example.com</text>
          </view>
          <view class="contact-item">
            <text class="contact-label">官方网站：</text>
            <text class="contact-value">www.example.com</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    callPhone(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber,
        fail: (err) => {
          console.error('拨打电话失败:', err);
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
.about-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 40rpx;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
  background-color: #fff;
  
  .logo {
    width: 300rpx;
    height: auto;
    margin-bottom: 20rpx;
  }
  
  .version {
    font-size: 24rpx;
    color: $text-color-light;
  }
}

.content {
  padding: 30rpx;
  
  .section {
    background-color: #fff;
    border-radius: 12rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      padding: 30rpx;
      color: $text-color;
      border-bottom: 1rpx solid $border-color;
    }
    
    .section-content {
      padding: 30rpx;
      
      .paragraph {
        font-size: 28rpx;
        color: $text-color;
        line-height: 1.6;
        margin-bottom: 20rpx;
        display: block;
      }
    }
  }
}

.feature-item {
  display: flex;
  margin-bottom: 30rpx;
  align-items: center;
  
  .feature-icon-box {
    width: 32rpx;
    height: 32rpx;
    background-color: #FF6A3C; /* 橙色 */
    margin-right: 20rpx;
    border-radius: 0;
    flex-shrink: 0;
  }
  
  .feature-info {
    flex: 1;
    
    .feature-title {
      font-size: 30rpx;
      font-weight: bold;
      color: $text-color;
      margin-bottom: 10rpx;
      display: block;
    }
    
    .feature-desc {
      font-size: 26rpx;
      color: $text-color-light;
      line-height: 1.5;
    }
  }
}

.contact-item {
  display: flex;
  margin-bottom: 20rpx;
  
  .contact-label {
    font-size: 28rpx;
    color: $text-color;
    width: 180rpx;
  }
  
  .contact-value {
    font-size: 28rpx;
    color: $theme-color;
    flex: 1;
  }
}
</style> 