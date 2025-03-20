<template>
  <view class="user-container">
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="user-bg"></view>
      <view class="user-info">
        <view class="avatar-wrap">
          <image 
            class="user-avatar" 
            :src="userInfo.avatarUrl || '/static/images/default-avatar.png'" 
            mode="aspectFill"
          ></image>
        </view>
        <view class="user-detail">
          <text v-if="hasUserInfo" class="user-name">{{userInfo.nickName}}</text>
          <button v-else class="login-btn" @click="getUserProfile">点击登录</button>
        </view>
      </view>
    </view>
    
    <!-- 用户菜单 -->
    <view class="menu-section">
      <!-- 订单管理 -->
      <view class="menu-group">
        <view class="menu-title">预约记录</view>
        <view class="menu-content">
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=all')">
            <image class="item-icon-img" src="/static/images/my/all.png" mode="aspectFit"></image>
            <text class="item-text">全部</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=usable')">
            <image class="item-icon-img" src="/static/images/my/use.png" mode="aspectFit"></image>
            <text class="item-text">可使用</text>
            <text v-if="bookingCounts.usable > 0" class="item-badge">{{bookingCounts.usable}}</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=expired')">
            <image class="item-icon-img" src="/static/images/my/out.png" mode="aspectFit"></image>
            <text class="item-text">已过期</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=canceled')">
            <image class="item-icon-img" src="/static/images/my/cancal.png" mode="aspectFit"></image>
            <text class="item-text">已取消</text>
          </view>
        </view>
      </view>
      
      <!-- 我的服务 -->
      <view class="menu-group">
        <view class="menu-title">我的服务</view>
        <view class="menu-list">
          <view class="menu-list-item" @click="navigateTo('/pages/user/favorite')">
            <text class="list-icon iconfont icon-favorite"></text>
            <text class="list-text">我的收藏</text>
            <text class="list-arrow iconfont icon-right"></text>
          </view>
          <view class="menu-list-item" @click="openFeedback">
            <text class="list-icon iconfont icon-feedback"></text>
            <text class="list-text">意见反馈</text>
            <text class="list-arrow iconfont icon-right"></text>
          </view>
          <view class="menu-list-item" @click="navigateTo('/pages/user/about')">
            <text class="list-icon iconfont icon-about"></text>
            <text class="list-text">关于我们</text>
            <text class="list-arrow iconfont icon-right"></text>
          </view>
          <view class="menu-list-item" @click="navigateTo('/pages/user/setting')">
            <text class="list-icon iconfont icon-setting"></text>
            <text class="list-text">设置</text>
            <text class="list-arrow iconfont icon-right"></text>
          </view>
          <!-- 管理员工具入口 - 开发环境可见 -->
          <view v-if="isDev" class="menu-list-item" @click="navigateTo('/pages/admin/import-data')">
            <text class="list-icon iconfont icon-setting"></text>
            <text class="list-text">云数据库导入工具</text>
            <text class="list-arrow iconfont icon-right"></text>
          </view>
        </view>
      </view>
      
      <!-- 退出登录 -->
      <view v-if="hasUserInfo" class="logout-btn" @click="logout">退出登录</view>
    </view>

    <!-- 管理功能区域 -->
    <view class="section admin-section" v-if="isAdmin">
      <view class="section-title">
        <text>管理功能</text>
      </view>
      <view class="admin-menu">
        <view class="menu-item" @click="navigateTo('/pages/admin/import-data')">
          <view class="item-icon">
            <text class="iconfont icon-data"></text>
          </view>
          <view class="item-info">
            <text class="item-name">数据导入</text>
            <text class="item-desc">导入系统数据</text>
          </view>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/admin/testCloud')">
          <view class="item-icon">
            <text class="iconfont icon-cloud"></text>
          </view>
          <view class="item-info">
            <text class="item-name">云函数测试</text>
            <text class="item-desc">测试云函数连接</text>
          </view>
          <text class="iconfont icon-right"></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/admin/cloudTest')">
          <view class="item-icon">
            <text class="iconfont icon-cloud"></text>
          </view>
          <view class="item-info">
            <text class="item-name">阿里云高级测试</text>
            <text class="item-desc">阿里云连接诊断工具</text>
          </view>
          <text class="iconfont icon-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      hasUserInfo: false,
      bookingCounts: {
        usable: 0,
        expired: 0,
        canceled: 0
      },
      isDev: false, // 是否为开发环境
      isAdmin: false // 是否为管理员
    }
  },
  onLoad() {
    // 获取全局变量
    this.isDev = getApp().globalData.$isDevMode
    
    // 设置为管理员（测试阶段都显示管理功能）
    this.isAdmin = true
    
    // 获取当前用户信息
    const userInfo = uni.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
      this.hasUserInfo = true
    }
    
    // 获取我的预约数
    this.getBookingCount()
  },
  onShow() {
    if (this.hasUserInfo) {
      this.fetchBookingCounts()
    }
  },
  methods: {
    // 获取预约数量
    async getBookingCount() {
      if (!this.hasUserInfo) return;
      
      try {
        const result = await this.$api.user.getBookingCount({
          userId: this.userInfo.id || ''
        });
        
        if (result && result.data) {
          this.bookingStats = result.data;
        } else {
          // 使用模拟数据
          this.bookingStats = {
            total: 0,
            pending: 0,
            confirmed: 0,
            finished: 0,
            cancelled: 0
          };
        }
      } catch (error) {
        console.error('获取预约统计失败:', error);
        // 使用模拟数据
        this.bookingStats = {
          total: 0,
          pending: 0,
          confirmed: 0,
          finished: 0,
          cancelled: 0
        };
      }
    },
    
    // 检查登录状态
    checkLoginStatus() {
      const userInfo = uni.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
        this.hasUserInfo = true
        this.fetchBookingCounts()
      }
    },
    
    // 获取用户信息
    getUserProfile() {
      // 在 uniapp 中获取用户信息
      uni.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          this.userInfo = res.userInfo
          this.hasUserInfo = true
          
          // 存储用户信息
          uni.setStorageSync('userInfo', JSON.stringify(res.userInfo))
          
          // 登录微信小程序
          this.wxLogin()
        },
        fail: (err) => {
          console.error('获取用户信息失败', err)
          uni.showToast({
            title: '获取用户信息失败',
            icon: 'none'
          })
        }
      })
    },
    
    // 微信登录
    wxLogin() {
      uni.login({
        success: async (res) => {
          try {
            // 调用云函数登录
            const loginRes = await uni.cloud.callFunction({
              name: 'login',
              data: {
                code: res.code,
                userInfo: this.userInfo
              }
            })
            
            if (loginRes.result && loginRes.result.success) {
              const { userId } = loginRes.result
              
              // 保存用户ID
              this.userInfo.userId = userId
              uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
              
              // 获取预约数量
              this.fetchBookingCounts()
            } else {
              console.error('登录云函数调用失败', loginRes)
            }
          } catch (e) {
            console.error('登录失败', e)
          }
        },
        fail: (err) => {
          console.error('微信登录失败', err)
        }
      })
    },
    
    // 获取预约数量
    async fetchBookingCounts() {
      if (!this.hasUserInfo || !this.userInfo.userId) {
        return
      }
      
      try {
        // 调用云函数获取预约数量
        const res = await uni.cloud.callFunction({
          name: 'getBookingCounts',
          data: {
            userId: this.userInfo.userId
          }
        })
        
        if (res.result && res.result.success) {
          this.bookingCounts = res.result.counts
        } else {
          // 模拟数据
          this.bookingCounts = {
            usable: 1,
            expired: 2,
            canceled: 0
          }
        }
      } catch (e) {
        console.error('获取预约数量失败', e)
        // 模拟数据
        this.bookingCounts = {
          usable: 1,
          expired: 2,
          canceled: 0
        }
      }
    },
    
    // 页面跳转
    navigateTo(url) {
      uni.navigateTo({
        url: url
      })
    },
    
    // 打开反馈页面
    openFeedback() {
      if (!this.hasUserInfo) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return
      }
      
      // 调用小程序的意见反馈功能
      wx.openEmbeddedMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: '299971'  // 小程序意见反馈的ID
        }
      })
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除登录信息
            uni.removeStorageSync('userInfo')
            
            // 重置状态
            this.userInfo = {}
            this.hasUserInfo = false
            this.bookingCounts = {
              usable: 0,
              expired: 0,
              canceled: 0
            }
            
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.user-container {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 用户信息区域 */
.user-info-section {
  position: relative;
  height: 380rpx;
  
  .user-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 260rpx;
    background-color: #EC7A49;
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
  margin-top: 160rpx;
  
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
    }
    
    .menu-content {
      display: flex;
      justify-content: space-between;
      
      .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 25%;
        
        .item-icon-img {
          width: 56rpx;
          height: 56rpx;
          margin-bottom: 10rpx;
        }
        
        .item-text {
          font-size: 26rpx;
          color: $text-color;
        }
        
        .item-badge {
          position: absolute;
          top: -10rpx;
          right: 20rpx;
          background-color: #FF3B30;
          color: #fff;
          font-size: 20rpx;
          height: 32rpx;
          min-width: 32rpx;
          border-radius: 16rpx;
          padding: 0 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
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
        
        .list-text {
          flex: 1;
          font-size: 28rpx;
          color: $text-color;
        }
        
        .list-arrow {
          font-size: 24rpx;
          color: $text-color-light;
        }
      }
    }
  }
  
  .logout-btn {
    margin-top: 40rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 12rpx;
    font-size: 32rpx;
    color: #FF3B30;
  }
}

/* 管理功能区域 */
.section.admin-section {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 30rpx;
  }
  
  .admin-menu {
    .menu-item {
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid $border-color-light;
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-icon {
        font-size: 36rpx;
        color: $theme-color;
        margin-right: 20rpx;
      }
      
      .item-info {
        flex: 1;
        .item-name {
          font-size: 28rpx;
          color: $text-color;
        }
        .item-desc {
          font-size: 24rpx;
          color: $text-color-light;
        }
      }
      
      .iconfont.icon-right {
        font-size: 24rpx;
        color: $text-color-light;
      }
    }
  }
}
</style> 