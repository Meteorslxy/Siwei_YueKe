<template>
    <view class="user-container">
      <!-- 用户信息区域 -->
      <view class="user-info-section">
        <view class="user-bg">
          <!-- 返回按钮 -->
          <view class="back-button" @click="goBack">
            <text>←</text>
          </view>
          <!-- 添加刷新按钮 -->
          <view class="refresh-button" @click="reload">
            <text>⟳</text>
          </view>
        </view>
        <view class="user-info">
          <view class="avatar-wrap">
            <image 
              class="user-avatar" 
              :src="userInfo.avatarUrl || '/static/images/avatar.jpg'" 
              mode="aspectFill"
            ></image>
          </view>
          <view class="user-detail">
            <text v-if="hasUserInfo" class="user-name">{{getUserDisplayName()}}</text>
            <button v-else class="login-btn" @click="getUserProfile">点击登录</button>
            <button v-if="hasUserInfo" class="edit-profile-btn" @click="navigateTo('/pages/user/profile/index')">编辑资料</button>
          </view>
        </view>
      </view>
      
      <!-- 当没有内容时的重新加载提示 -->
      <view class="reload-container" v-if="!hasContent">
        <image src="/static/images/empty.png" mode="aspectFit"></image>
        <text>内容加载失败</text>
        <button class="reload-btn" @click="reload">点击重新加载</button>
      </view>
      
      <!-- 用户菜单 -->
      <view class="menu-section" v-else>
        <!-- 我的预约 -->
        <view class="menu-group">
          <view class="menu-title">
            我的预约
            <text class="refresh-link" @click="refreshBookingCount">刷新</text>
          </view>
          <view class="menu-content">
            <view class="menu-item" @click="navigateTo('/pages/user/booking?status=all')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/all.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">全部</text>
              <text v-if="bookingCounts.all > 0" class="item-badge">{{bookingCounts.all}}</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/booking?status=usable')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/use.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">可使用</text>
              <text v-if="bookingCounts.usable > 0" class="item-badge">{{bookingCounts.usable}}</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/booking?status=expired')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/out.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">已完成</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/booking?status=canceled')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/cancal.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">已取消</text>
              <text v-if="bookingCounts.canceled > 0" class="item-badge">{{bookingCounts.canceled}}</text>
            </view>
          </view>
        </view>
        
        <!-- 我的订单 -->
        <view class="menu-group">
          <view class="menu-title">我的订单</view>
          <view class="menu-content">
            <view class="menu-item" @click="navigateTo('/pages/cart/index')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/购物车.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">购课单</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/orders?status=pending')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/待付款.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">待付款</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/orders?status=paid')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/已付款.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">已付款</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/refunds')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/退款.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">退款</text>
            </view>
          </view>
          <view class="menu-content second-row">
            <view class="menu-item" @click="navigateTo('/pkgs/course/lectures')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/讲义邮寄.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">讲义邮寄</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/coupons')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/优惠券.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">优惠券</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/exchange')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/课程兑换.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">课程兑换</text>
            </view>
            <view class="menu-item">
              <!-- 空占位 -->
            </view>
          </view>
        </view>
        
        <!-- 学习服务 -->
        <view class="menu-group">
          <view class="menu-title">学习服务</view>
          <view class="menu-content">
            <view class="menu-item" @click="navigateTo('/pages/user/calendar')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/日历.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">日历</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/schedule')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/调课.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">调课</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/transfer')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/转班.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">转班</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/records')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/试听记录.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">试听记录</text>
            </view>
          </view>
          <view class="menu-content second-row">
            <view class="menu-item" @click="navigateTo('/pages/user/diagnosis')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/诊断记录.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">诊断记录</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/activities')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/活动记录.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">活动记录</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/parent')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/家长空间.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">家长空间</text>
            </view>
            <view class="menu-item">
              <!-- 空占位 -->
            </view>
          </view>
        </view>
        
        <!-- 其他 -->
        <view class="menu-group">
          <view class="menu-title">其他</view>
          <view class="menu-content">
            <view class="menu-item" @click="navigateTo('/pages/shop/index')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/商城.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">商城</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/resetPassword')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/修改密码.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">修改密码</text>
            </view>
            <view class="menu-item" @click="openCustomerService">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/在线客服.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">在线客服</text>
            </view>
            <view class="menu-item" @click="navigateTo('/pages/user/more')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/更多服务.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">更多服务</text>
            </view>
          </view>
          <view class="menu-content second-row">
            <view class="menu-item" @click="navigateTo('/pages/user/privacy')">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/隐私协议.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">隐私协议</text>
            </view>
            <view class="menu-item" @click="share">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/分享.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">分享</text>
            </view>
            <view class="menu-item" @click="openFeedback">
              <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/意见反馈-c.png" mode="aspectFit" @error="handleImageError"></image>
              <text class="item-text">意见反馈</text>
            </view>
            <view class="menu-item">
              <!-- 空占位 -->
            </view>
          </view>
        </view>
        
        <!-- 测试功能区域 -->
        <view class="menu-group" v-if="isDev">
          <view class="menu-title">测试功能</view>
          <view class="menu-list">
            <view class="menu-list-item test-btn" @click="testUniIdPages('login')">
              <text class="list-icon iconfont icon-user"></text>
              <text class="list-text">测试统一登录</text>
              <text class="list-arrow">></text>
            </view>
            <view class="menu-list-item test-btn" @click="testUniIdPages('register')">
              <text class="list-icon iconfont icon-user"></text>
              <text class="list-text">测试统一注册</text>
              <text class="list-arrow">></text>
            </view>
            <view class="menu-list-item test-btn" @click="testUniIdPages('profile')">
              <text class="list-icon iconfont icon-user"></text>
              <text class="list-text">测试个人资料</text>
              <text class="list-arrow">></text>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 退出登录 (放在页面底部) -->
      <view class="bottom-area">
        <!-- 退出登录按钮 -->
        <view v-if="hasUserInfo" class="logout-btn" @click="logout">退出登录</view>
        
        <!-- 安全区域 -->
        <view class="safe-area-bottom"></view>
      </view>
  
      <!-- 添加学生姓名设置弹窗 -->
      <student-name-modal ref="studentNameModal"></student-name-modal>
    </view>
  </template>
  
  <script>
  // 脚本部分保持与原user.vue相同
  import { store as uniIdPagesStore, mutations as uniIdPagesMutations } from '@/uni_modules/uni-id-pages/common/store.js';
  import StudentNameModal from '@/components/common/student-name-modal.vue'
  
  export default {
    components: {
      StudentNameModal
    },
    data() {
      return {
        userInfo: {},
        hasUserInfo: false,
        bookingCounts: {
          all: 0,
          usable: 0,
          expired: 0,
          canceled: 0
        },
        isDev: false,
        hasContent: false,
        verboseLogging: false,
        isUpdatingUserInfo: false,
        lastUserUpdateTime: 0,
        userInfoDebounceTime: 5000,
        forceUpdateUserInfo: false
      }
    },
    // 保留原来的各种方法和生命周期钩子
    methods: {
      // 这些方法应该与原user.vue保持一致
      goBack() {
        uni.navigateBack({
          delta: 1
        });
      },
      reload() {
        this.loadUserInfo();
      },
      getUserDisplayName() {
        // 示例方法，实际应与原文件保持一致
        return this.userInfo.nickname || this.userInfo.nickName || '用户';
      },
      navigateTo(url) {
        uni.navigateTo({
          url: url
        });
      },
      logout() {
        // 示例方法，实际应与原文件保持一致
        uni.showModal({
          title: '退出登录',
          content: '确定要退出登录吗？',
          success: (res) => {
            if (res.confirm) {
              // 清除用户信息
              this.userInfo = {};
              this.hasUserInfo = false;
              uni.removeStorageSync('userInfo');
              uni.showToast({
                title: '已退出登录',
                icon: 'success'
              });
            }
          }
        });
      },
      loadUserInfo() {
        // 示例方法
        setTimeout(() => {
          this.hasContent = true;
        }, 500);
      },
      refreshBookingCount() {
        // 示例方法
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        });
      },
      handleImageError() {
        console.log('图片加载失败');
      },
      openFeedback() {
        this.navigateTo('/pages/user/feedback');
      },
      openCustomerService() {
        uni.showToast({
          title: '客服功能开发中',
          icon: 'none'
        });
      },
      share() {
        uni.showShareMenu({
          withShareTicket: true
        });
      },
      testUniIdPages(page) {
        console.log('测试页面:', page);
      },
      initStudentNameModal() {
        // 示例方法
      },
      showStudentNameModal() {
        // 示例方法
      },
      handleLoginExpired() {
        // 示例方法
      },
      fetchBookingCounts() {
        // 示例方法
      },
      refreshUserInfo() {
        // 示例方法
      }
    }
  }
  </script>
  
  <style lang="scss">
  .user-container {
    min-height: 100vh;
    background-color: $bg-color;
    display: flex;
    flex-direction: column;
  }
  
  /* 用户信息区域 */
  .user-info-section {
    position: relative;
    height: 280rpx;
    
    .user-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 200rpx;
      background-color: #EC7A49;
      
      /* 返回按钮样式 */
      .back-button {
        position: absolute;
        top: 30rpx;
        left: 30rpx;
        width: 60rpx;
        height: 60rpx;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        
        text {
          color: #fff;
          font-size: 36rpx;
          font-weight: bold;
        }
      }
      /* 刷新按钮样式 */
      .refresh-button {
        position: absolute;
        top: 30rpx;
        right: 30rpx;
        width: 60rpx;
        height: 60rpx;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        
        text {
          color: #fff;
          font-size: 36rpx;
          font-weight: bold;
        }
      }
    }
    
    .user-info {
      position: absolute;
      top: 100rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 690rpx;
      height: 240rpx;
      background-color: #fff;
      border-radius: 12rpx;
      border-top-left-radius: 50rpx;
      border-top-right-radius: 50rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 80rpx;
      
      .avatar-wrap {
        position: absolute;
        top: -80rpx;
        width: 160rpx;
        height: 160rpx;
        border-radius: 80rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .user-avatar {
          width: 144rpx;
          height: 144rpx;
          border-radius: 72rpx;
        }
      }
      
      .user-detail {
        text-align: center;
        
        .user-name {
          font-size: 36rpx;
          font-weight: bold;
          color: $text-color;
        }
        
        .login-btn {
          margin-top: 50rpx;
          font-size: 32rpx;
          background-color: $theme-color;
          color: #fff;
          border-radius: 40rpx;
          padding: 0 40rpx;
          height: 80rpx;
          line-height: 80rpx;
        }
        
        .edit-profile-btn {
          margin-top: 20rpx;
          font-size: 32rpx;
          background-color: $theme-color;
          color: #fff;
          border-radius: 40rpx;
          padding: 0 40rpx;
          height: 80rpx;
          line-height: 80rpx;
        }
      }
    }
  }
  
  /* 菜单区域 */
  .menu-section {
    padding: 20rpx;
    margin-top: 40rpx;
    
    .menu-group {
      background-color: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      padding: 30rpx;
      
      .menu-title {
        font-size: 32rpx;
        font-weight: bold;
        color: $text-color;
        margin-bottom: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .refresh-link {
          font-size: 24rpx;
          color: $theme-color;
          font-weight: normal;
        }
      }
      
      .menu-content {
        display: flex;
        flex-wrap: wrap;
        padding: 10rpx 0;
        
        &.second-row {
          margin-top: 10rpx;
          border-top: 1rpx solid $border-color-light;
          padding-top: 20rpx;
        }
        
        .menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 25%;
          position: relative;
          margin-bottom: 10rpx;
          
          .item-badge {
            position: absolute;
            top: -6rpx;
            right: 10rpx;
            min-width: 32rpx;
            height: 32rpx;
            line-height: 32rpx;
            padding: 0 8rpx;
            background-color: #FF6B00;
            color: #fff;
            font-size: 20rpx;
            border-radius: 16rpx;
            text-align: center;
            z-index: 1;
          }
          
          .item-icon-img {
            width: 72rpx;
            height: 72rpx;
            margin-bottom: 10rpx;
          }
  
          .item-text {
            font-size: 24rpx;
            color: $text-color;
          }
        }
      }
      
      .menu-list {
        .menu-list-item {
          display: flex;
          align-items: center;
          height: 100rpx;
          border-bottom: 1rpx solid $border-color-light;
          
          &:last-child {
            border-bottom: none;
          }
          
          .list-icon {
            font-size: 36rpx;
            color: $theme-color;
            margin-right: 20rpx;
          }
          
          .list-icon-img {
            width: 42rpx;
            height: 42rpx;
            margin-right: 20rpx;
          }
          
          .list-text {
            flex: 1;
            font-size: 28rpx;
            color: $text-color;
          }
          
          .list-arrow {
            font-size: 32rpx;
            color: $text-color-light;
            font-weight: normal;
          }
          
          &.test-btn {
            background-color: #f8f8f8;
            margin-bottom: 10rpx;
            border-radius: 8rpx;
            height: 110rpx;
            
            .list-icon {
              color: #1974FF;
            }
            
            .list-text {
              color: #1974FF;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  
  /* 底部区域 */
  .bottom-area {
    margin-top: auto;
    padding: 30rpx 20rpx;
    
    .logout-btn {
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      background-color: #fff;
      border-radius: 12rpx;
      font-size: 32rpx;
      color: #FF3B30;
      margin-bottom: 20rpx;
    }
    
    .safe-area-bottom {
      height: 50rpx;
    }
  }
  
  /* 当没有内容时的重新加载提示 */
  .reload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20rpx;
    
    image {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 20rpx;
    }
    
    text {
      font-size: 28rpx;
      color: $text-color;
      margin-bottom: 20rpx;
    }
    
    button {
      font-size: 32rpx;
      background-color: $theme-color;
      color: #fff;
      border-radius: 40rpx;
      padding: 0 40rpx;
      height: 80rpx;
      line-height: 80rpx;
    }
  }
  </style>