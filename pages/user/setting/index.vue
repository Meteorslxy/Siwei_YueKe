<template>
  <view class="setting-container">
    <view class="section">
      <view class="section-title">账号设置</view>
      <view class="setting-list">
        <view class="setting-item" @click="goToUserProfile">
          <text class="item-label">个人资料</text>
          <view class="item-action">
            <text class="item-arrow">&gt;</text>
          </view>
        </view>
        
        <view class="setting-item" @click="bindMobile">
          <text class="item-label">手机号码</text>
          <view class="item-action">
            <text class="item-value">{{fullPhoneNumber ? (phoneNumber || '已绑定') : '未绑定'}}</text>
            <text class="item-arrow">&gt;</text>
          </view>
        </view>
        
        <view class="setting-item" @click="showFeatureInDevelopment('微信账号管理')">
          <text class="item-label">微信账号</text>
          <view class="item-action">
            <text class="item-value">未绑定</text>
            <text class="item-arrow">&gt;</text>
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
            <text class="item-arrow">&gt;</text>
          </view>
        </view>
        
        <view class="setting-item" @click="checkUpdate">
          <text class="item-label">检查更新</text>
          <view class="item-action">
            <text class="item-value">当前版本：{{version}}</text>
            <text class="item-arrow">&gt;</text>
          </view>
        </view>
        
        <view class="setting-item" @click="navigateToAbout">
          <text class="item-label">关于我们</text>
          <view class="item-action">
            <text class="item-arrow">&gt;</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { updatePhoneNumber } from '@/api/modules/user.js';

export default {
  data() {
    return {
      phoneNumber: '', // 显示用的脱敏手机号
      fullPhoneNumber: '', // 存储完整手机号
      cacheSize: '0.00MB',
      version: '1.0.0',
      notifications: {
        course: true,
        promotion: true,
        system: true
      },
      isWechatBound: false
    }
  },
  onLoad() {
    this.loadUserInfo();
    this.calculateCacheSize();
    // 调试登录状态
    this.checkLoginStatus();
    // 从数据库获取最新用户信息
    this.fetchUserFromDatabase();
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          // 检查是否已经是对象，避免重复解析
          let userInfo;
          if (typeof userInfoStr === 'string') {
            userInfo = JSON.parse(userInfoStr);
          } else {
            // 已经是对象
            userInfo = userInfoStr;
          }
          
          // 直接获取手机号 - 只读取mobile字段
          this.fullPhoneNumber = userInfo.mobile || '';
          console.log('初始化读取的手机号:', this.fullPhoneNumber);
          
          // 处理显示用的手机号（脱敏）
          if (this.fullPhoneNumber && this.fullPhoneNumber.length > 7) {
            this.phoneNumber = this.fullPhoneNumber.substr(0, 3) + '****' + this.fullPhoneNumber.substr(-4);
          } else {
            this.phoneNumber = '';
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
    
    // 跳转到关于我们页面
    navigateToAbout() {
      uni.navigateTo({
        url: '/pages/user/about/index',
        fail: (err) => {
          console.error('页面跳转失败:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 显示功能开发中提示
    showFeatureInDevelopment(feature) {
      uni.showToast({
        title: `${feature}功能开发中，敬请期待！`,
        icon: 'none',
        duration: 2000
      });
    },
    
    // 跳转到手机号绑定页面
    bindMobile() {
      uni.navigateTo({
        url: '/pages/user/phone/index'
      });
    },
    
    // 检查登录状态
    checkLoginStatus() {
      // 检查所有可能的token存储
      const uniIdToken = uni.getStorageSync('uni_id_token');
      const token = uni.getStorageSync('token');
      const userToken = uni.getStorageSync('userToken');
      
      console.log('登录状态检查:', {
        'uni_id_token': !!uniIdToken,
        'token': !!token,
        'userToken': !!userToken,
        'userInfo': !!uni.getStorageSync('userInfo')
      });
    },
    
    // 跳转到个人资料页面（通过测试功能）
    goToUserProfile() {
      // 直接跳转到自定义个人资料页面
      uni.navigateTo({
        url: '/pages/user/profile/index'
      });
    },
    
    // 从数据库获取最新用户信息
    async fetchUserFromDatabase() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (!userInfoStr) return;
        
        // 解析用户信息
        let userInfo;
        if (typeof userInfoStr === 'string') {
          userInfo = JSON.parse(userInfoStr);
        } else {
          userInfo = userInfoStr;
        }
        
        // 获取用户ID
        const userId = userInfo._id || userInfo.uid;
        if (!userId) return;
        
        // 获取token
        const token = uni.getStorageSync('uni_id_token');
        if (!token) return;
        
        console.log('正在从数据库获取最新用户信息...');
        
        // 调用云函数获取完整用户信息
        const result = await uniCloud.callFunction({
          name: 'getUserInfoById',
          data: {
            userId,
            uniIdToken: token
          }
        });
        
        if (result.result && result.result.code === 0 && result.result.userInfo) {
          const dbUserInfo = result.result.userInfo;
          console.log('从数据库获取的最新用户信息:', dbUserInfo);
          
          // 更新本地存储
          Object.assign(userInfo, dbUserInfo);
          uni.setStorageSync('userInfo', userInfo);
          
          // 直接获取手机号信息
          this.fullPhoneNumber = dbUserInfo.mobile || '';
          console.log('数据库中的手机号:', this.fullPhoneNumber);
          
          // 处理显示用的手机号（脱敏）
          if (this.fullPhoneNumber && this.fullPhoneNumber.length > 7) {
            this.phoneNumber = this.fullPhoneNumber.substr(0, 3) + '****' + this.fullPhoneNumber.substr(-4);
          } else {
            this.phoneNumber = '';
          }
          
          // 强制更新视图
          this.$forceUpdate();
        }
      } catch (err) {
        console.error('获取数据库用户信息失败:', err);
      }
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
          font-size: 36rpx;
          color: #999;
          font-weight: bold;
          margin-left: 10rpx;
        }
      }
    }
  }
}
</style> 