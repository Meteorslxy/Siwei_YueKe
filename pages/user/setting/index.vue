<template>
  <view class="setting-container">
    <view class="section">
      <view class="section-title">账号设置</view>
      <view class="setting-list">
        <view class="setting-item" @click="goToUserProfile">
          <text class="item-label">个人资料</text>
          <view class="item-action">
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
        
        <view class="setting-item" @click="showPhoneInputPopup">
          <text class="item-label">手机号码</text>
          <view class="item-action">
            <text class="item-value">{{phoneNumber || '未绑定'}}</text>
            <text class="item-arrow iconfont icon-right"></text>
          </view>
        </view>
        
        <view class="setting-item" @click="showFeatureInDevelopment('微信账号管理')">
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
        
        <view class="setting-item" @click="navigateToAbout">
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
      }
    }
  },
  onLoad() {
    this.loadUserInfo();
    this.calculateCacheSize();
    // 调试登录状态
    this.checkLoginStatus();
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
          
          // 优先使用mobile字段，兼容phoneNumber字段
          this.fullPhoneNumber = userInfo.mobile || userInfo.phoneNumber || '';
          
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
    
    // 显示手机号码输入弹窗
    showPhoneInputPopup() {
      // 检查是否已经绑定了手机号
      if (this.phoneNumber) {
        // 已绑定手机号，显示已绑定信息并提供更改选项
        uni.showModal({
          title: '手机号码已绑定',
          content: `当前绑定手机号：${this.fullPhoneNumber}`,
          confirmText: '更改绑定',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              // 用户选择更改绑定
              this.showEditableModal();
            }
          }
        });
        return;
      }
      
      // 未绑定手机号，直接显示输入框
      this.showEditableModal();
    },
    
    // 显示可编辑的手机号输入框
    showEditableModal() {
      // 使用带输入框的模态框（图三）
      uni.showModal({
        title: '绑定手机号',
        placeholderText: '请输入11位手机号码',
        editable: true,
        confirmText: '确定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            const inputPhone = res.content.trim();
            // 验证手机号格式
            if (!/^1\d{10}$/.test(inputPhone)) {
              // 手机号格式错误，显示图二的提示样式
              this.showInvalidPhonePrompt();
              return;
            }
            
            // 保存手机号
            this.savePhoneNumber(inputPhone);
          }
        },
        fail: (err) => {
          console.error('可编辑模态框失败:', err);
          // 如果可编辑模态框不可用，使用备选方案
          this.showPhoneInputAlternative();
        }
      });
    },
    
    // 显示无效手机号提示
    showInvalidPhonePrompt() {
      uni.showModal({
        title: '绑定手机号',
        content: '请输入11位手机号码',
        confirmText: '重新绑定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 用户点击"重新绑定"，回到图三的输入界面
            this.showEditableModal();
          }
        }
      });
      
      // 也可以设置3秒后自动回到输入界面
      setTimeout(() => {
        // 获取当前所有模态框，只有当仍在显示无效手机号提示时才自动关闭
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        if (currentPage && currentPage.route && currentPage.route.includes('setting')) {
          this.showEditableModal();
        }
      }, 3000);
    },
    
    // 备选的手机号输入方法
    showPhoneInputAlternative() {
      // 在这个方法中，我们使用通用的输入页面来模拟图三的界面样式
      uni.navigateTo({
        url: '/pages/common/input-page?title=绑定手机号&placeholder=请输入11位手机号码&maxlength=11&type=number',
        events: {
          // 监听输入完成事件
          inputDone: (value) => {
            if (value && /^1\d{10}$/.test(value)) {
              this.savePhoneNumber(value);
            } else {
              // 手机号格式错误，显示图二的提示样式
              this.showInvalidPhonePrompt();
            }
          }
        },
        fail: () => {
          // 如果页面跳转失败，则使用简单的提示框
          this.showInvalidPhonePrompt();
        }
      });
    },
    
    // 保存手机号码
    savePhoneNumber(phoneNumber) {
      // 显示加载提示
      uni.showLoading({
        title: '正在绑定...',
        mask: true
      });
      
      // 检查是否登录 - 尝试获取所有可能的token
      const uniIdToken = uni.getStorageSync('uni_id_token') || '';
      const token = uni.getStorageSync('token') || '';
      const userToken = uni.getStorageSync('userToken') || '';
      
      // 获取优先级: uniIdToken > token > userToken
      const effectiveToken = uniIdToken || token || userToken;
      
      // 登录状态调试
      console.log('保存手机号时的登录状态:', {
        'uni_id_token': !!uniIdToken,
        'token': !!token,
        'userToken': !!userToken,
        'effectiveToken': !!effectiveToken,
        'userInfo': !!uni.getStorageSync('userInfo')
      });
      
      if (!effectiveToken) {
        uni.hideLoading();
        uni.showModal({
          title: '未登录',
          content: '您需要登录后才能绑定手机号',
          confirmText: '去登录',
          success: (res) => {
            if (res.confirm) {
              // 跳转到登录页面
              uni.navigateTo({
                url: '/pages/login/login'
              });
            }
          }
        });
        return;
      }
      
      // 首先更新到云数据库
      updatePhoneNumber({ phoneNumber })
        .then(res => {
          if (res.code === 0) {
            // 云端更新成功，再更新本地存储
            try {
              const userInfoStr = uni.getStorageSync('userInfo');
              let userInfo;
              
              // 检查是否已经是对象，避免重复解析
              if (typeof userInfoStr === 'string') {
                userInfo = JSON.parse(userInfoStr);
              } else if (userInfoStr && typeof userInfoStr === 'object') {
                // 已经是对象
                userInfo = userInfoStr;
              } else {
                // 没有用户信息或格式不正确，创建新对象
                userInfo = {};
              }
              
              // 更新完整手机号变量
              this.fullPhoneNumber = phoneNumber;
              userInfo.phoneNumber = phoneNumber;
              userInfo.mobile = phoneNumber; // 同时保存mobile字段
              uni.setStorageSync('userInfo', JSON.stringify(userInfo));
              
              // 更新显示的手机号(脱敏处理)
              this.phoneNumber = phoneNumber.substr(0, 3) + '****' + phoneNumber.substr(-4);
              
              uni.hideLoading();
              uni.showToast({
                title: '手机号绑定成功',
                icon: 'success'
              });
            } catch (e) {
              console.error('保存用户信息到本地失败:', e);
              uni.hideLoading();
              uni.showToast({
                title: '本地绑定失败',
                icon: 'none'
              });
            }
          } else if (res.code === -1 && res.message && res.message.includes('登录')) {
            // 登录过期或未登录
            uni.hideLoading();
            uni.showModal({
              title: '登录已过期',
              content: '您的登录已过期，请重新登录后再绑定手机号',
              confirmText: '去登录',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  // 跳转到登录页面
                  uni.navigateTo({
                    url: '/pages/login/login'
                  });
                }
              }
            });
          } else {
            // 云端更新失败
            console.error('更新手机号到云数据库失败:', res.message);
            uni.hideLoading();
            uni.showToast({
              title: res.message || '绑定失败，请稍后重试',
              icon: 'none'
            });
          }
        })
        .catch(err => {
          console.error('调用更新手机号API失败:', err);
          uni.hideLoading();
          
          // 检查是否是网络错误
          if (err.errMsg && err.errMsg.includes('request:fail')) {
            uni.showToast({
              title: '网络连接失败，请检查网络',
              icon: 'none',
              duration: 2000
            });
          } else {
            uni.showToast({
              title: '网络异常，请稍后重试',
              icon: 'none',
              duration: 2000
            });
          }
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
      // 获取user页的实例
      const pages = getCurrentPages();
      let userPage = null;
      
      // 查找user页面
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].route && pages[i].route.includes('/pages/user/user')) {
          userPage = pages[i];
          break;
        }
      }
      
      if (userPage && userPage.testUniIdPages) {
        // 如果找到了user页面，使用它的测试方法
        uni.navigateBack({
          success: () => {
            // 延迟调用测试方法，确保页面已经渲染
            setTimeout(() => {
              userPage.testUniIdPages('profile');
            }, 500);
          }
        });
      } else {
        // 如果没有找到user页面，跳转到user页面并传递参数
        uni.switchTab({
          url: '/pages/user/user',
          success: () => {
            // 设置一个标记，让user页面知道要打开个人资料
            getApp().globalData.openUserProfile = true;
          }
        });
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
          font-size: 24rpx;
          color: $text-color-light;
        }
      }
    }
  }
}
</style> 