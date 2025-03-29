<template>
  <view class="setting-container">
    <view class="section">
      <view class="section-title">账号设置</view>
      <view class="setting-list">
        <view class="setting-item">
          <text class="item-label">个人资料</text>
          <view class="item-action">
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
        
        <view class="setting-item">
          <text class="item-label">手机号码</text>
          <view class="item-action">
            <text class="item-value">{{phoneNumber || '未绑定'}}</text>
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
        
        <view class="setting-item">
          <text class="item-label">微信账号</text>
          <view class="item-action">
            <text class="item-value">已绑定</text>
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">通知设置</view>
      <view class="setting-list">
        <view class="setting-item">
          <text class="item-label">课程提醒</text>
          <view class="item-action">
            <switch :checked="notifications.course" @change="toggleNotification('course', $event)" color="#EC7A49" />
          </view>
        </view>
        
        <view class="setting-item">
          <text class="item-label">优惠活动</text>
          <view class="item-action">
            <switch :checked="notifications.promotion" @change="toggleNotification('promotion', $event)" color="#EC7A49" />
          </view>
        </view>
        
        <view class="setting-item">
          <text class="item-label">系统通知</text>
          <view class="item-action">
            <switch :checked="notifications.system" @change="toggleNotification('system', $event)" color="#EC7A49" />
          </view>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">其他设置</view>
      <view class="setting-list">
        <view class="setting-item" @click="clearCache">
          <text class="item-label">清除缓存</text>
          <view class="item-action">
            <text class="item-value">{{cacheSize}}</text>
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
        
        <view class="setting-item" @click="checkUpdate">
          <text class="item-label">检查更新</text>
          <view class="item-action">
            <text class="item-value">当前版本：{{version}}</text>
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
        
        <view class="setting-item" @click="navigateTo('/pages/user/about/index')">
          <text class="item-label">关于我们</text>
          <view class="item-action">
            <text class="item-arrow iconfont icon-right"></text>
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
      phoneNumber: '',
      cacheSize: '0.00MB',
      version: '1.0.0',
      notifications: {
        course: true,
        promotion: true,
        system: true
      }
    }
  },
  onLoad() {
    this.loadUserInfo();
    this.calculateCacheSize();
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          this.phoneNumber = userInfo.phoneNumber || '';
          if (this.phoneNumber && this.phoneNumber.length > 7) {
            // 手机号码脱敏处理
            this.phoneNumber = this.phoneNumber.substr(0, 3) + '****' + this.phoneNumber.substr(-4);
          }
        }
      } catch (e) {
        console.error('加载用户信息失败:', e);
      }
    },
    
    // 计算缓存大小
    calculateCacheSize() {
      // 模拟计算缓存大小，实际应用中可使用uni.getSavedFileList等API获取
      this.cacheSize = '3.45MB';
    },
    
    // 切换通知设置
    toggleNotification(type, e) {
      this.notifications[type] = e.detail.value;
      uni.showToast({
        title: e.detail.value ? '已开启通知' : '已关闭通知',
        icon: 'none'
      });
      
      // 保存设置到本地
      uni.setStorageSync('notifications', JSON.stringify(this.notifications));
    },
    
    // 清除缓存
    clearCache() {
      uni.showModal({
        title: '提示',
        content: '确定要清除缓存吗？',
        success: (res) => {
          if (res.confirm) {
            // 执行清除缓存的操作
            uni.showLoading({
              title: '清除中'
            });
            
            setTimeout(() => {
              uni.hideLoading();
              this.cacheSize = '0.00MB';
              uni.showToast({
                title: '缓存已清除',
                icon: 'success'
              });
            }, 1000);
          }
        }
      });
    },
    
    // 检查更新
    checkUpdate() {
      uni.showLoading({
        title: '检查中'
      });
      
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: '已是最新版本',
          icon: 'none'
        });
      }, 1000);
    },
    
    // 页面导航
    navigateTo(url) {
      uni.navigateTo({
        url,
        fail: (err) => {
          console.error('页面跳转失败:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
.setting-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 20rpx 0;
}

.section {
  margin-bottom: 20rpx;
  
  .section-title {
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: $text-color-light;
  }
  
  .setting-list {
    background-color: #fff;
    
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid $border-color;
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-label {
        font-size: 30rpx;
        color: $text-color;
      }
      
      .item-action {
        display: flex;
        align-items: center;
        
        .item-value {
          font-size: 28rpx;
          color: $text-color-light;
          margin-right: 10rpx;
        }
        
        .item-arrow {
          font-size: 24rpx;
          color: $text-color-light;
        }
      }
    }
  }
}
</style> 