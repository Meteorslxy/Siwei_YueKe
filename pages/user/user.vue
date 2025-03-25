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
          <text v-if="hasUserInfo" class="user-name">{{userInfo.nickName || userInfo.nickname || '微信用户'}}</text>
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
          <!-- 图片上传 -->
          <view class="menu-list-item" @click="navigateTo('/pages/user/upload-image')">
            <text class="list-icon iconfont icon-upload"></text>
            <text class="list-text">图片上传</text>
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
    <view class="section admin-section" v-if="false">
      <!-- 已禁用管理功能 -->
    </view>

    <!-- 管理员入口按钮 -->
    <view class="menu-section">
      <view class="admin-entry-btn" @click="navigateToAdminLogin">管理员入口</view>
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
    this.loadUserInfo()
    
    // 获取我的预约数
    this.getBookingCount()
    
    // 监听登录事件
    uni.$on('user:login', (userData) => {
      console.log('接收到登录事件，刷新用户信息:', userData)
      this.loadUserInfo()
    })
  },
  onUnload() {
    // 取消监听登录事件
    uni.$off('user:login')
  },
  onShow() {
    // 每次页面显示时重新获取用户信息，解决登录后跳转但不显示用户信息的问题
    this.loadUserInfo()
    
    if (this.hasUserInfo) {
      this.fetchBookingCounts()
    }
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      console.log('加载用户信息')
      const userInfoStr = uni.getStorageSync('userInfo')
      if (userInfoStr) {
        try {
          let userInfo = JSON.parse(userInfoStr)
          console.log('读取到的用户信息:', JSON.stringify(userInfo))
          
          // 检查是否为数组格式(登录函数可能返回数组格式)
          if (Array.isArray(userInfo) && userInfo.length > 0) {
            userInfo = userInfo[0]
          }
          
          // 处理一层嵌套数据的情况（有些时候data是嵌套的）
          if (userInfo.data && typeof userInfo.data === 'object') {
            userInfo = userInfo.data
          }
          
          this.userInfo = this.formatUserInfo(userInfo)
          this.hasUserInfo = !!this.userInfo.nickName || !!this.userInfo.nickname
          console.log('处理后的用户信息:', JSON.stringify(this.userInfo))
          console.log('是否有用户信息：', this.hasUserInfo)
          console.log('头像地址：', this.userInfo.avatarUrl)
          console.log('昵称：', this.userInfo.nickName || this.userInfo.nickname)
        } catch (e) {
          console.error('解析用户信息失败:', e)
          this.userInfo = {}
          this.hasUserInfo = false
        }
      } else {
        console.log('未找到用户信息')
        this.userInfo = {}
        this.hasUserInfo = false
      }
    },
    
    // 格式化用户信息
    formatUserInfo(userInfo) {
      if (!userInfo) return {};
      
      // 创建新对象，避免直接修改原对象
      const formattedInfo = {...userInfo};
      
      // 确保有默认值
      if (!formattedInfo.nickName && !formattedInfo.nickname) {
        // 如果有手机号，使用手机号生成昵称
        if (formattedInfo.phoneNumber) {
          formattedInfo.nickName = '用户' + formattedInfo.phoneNumber.substr(formattedInfo.phoneNumber.length - 4);
        } else {
          formattedInfo.nickName = '微信用户';
        }
      }
      
      // 兼容nickName和nickname两种属性名
      if (!formattedInfo.nickName && formattedInfo.nickname) {
        formattedInfo.nickName = formattedInfo.nickname;
      }
      
      // 确保有默认头像
      if (!formattedInfo.avatarUrl) {
        formattedInfo.avatarUrl = '/static/images/default-avatar.png';
      }
      
      // 确保userId字段
      if (!formattedInfo.userId && formattedInfo._id) {
        formattedInfo.userId = formattedInfo._id;
      }
      
      return formattedInfo;
    },
    // 获取预约数量
    async getBookingCount() {
      if (!this.hasUserInfo) return;
      
      try {
        const userInfo = this.userInfo;
        const userId = userInfo.userId || userInfo._id || '';
        
        // 直接调用云函数获取预约统计
        const res = await uniCloud.callFunction({
          name: 'getBookingCounts', 
          data: {
            userId
          }
        });
        
        if (res.result && res.result.code === 0) {
          const counts = res.result.data.counts || {};
          this.bookingStats = {
            total: counts.all || 0,
            pending: counts.pending || 0,
            confirmed: counts.confirmed || 0,
            finished: counts.finished || 0,
            cancelled: counts.cancelled || 0
          };
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
    
    // 获取预约数量
    async fetchBookingCounts() {
      if (!this.hasUserInfo || !this.userInfo.userId) {
        return;
      }
      
      try {
        // 使用API接口获取预约数量
        const res = await uniCloud.callFunction({
          name: 'getBookingCounts',
          data: {
            userId: this.userInfo.userId || this.userInfo._id
          }
        });
        
        if (res.result && res.result.code === 0) {
          // 获取counts下的数据
          const counts = res.result.data.counts || {};
          this.bookingCounts = {
            usable: counts.pending + counts.confirmed || 0,
            expired: counts.finished || 0,
            canceled: counts.cancelled || 0
          };
          
          // 如果用户有未完成的预约，在tabBar上添加红点提示
          if (this.bookingCounts.usable > 0) {
            uni.showTabBarRedDot({
              index: 2 // 假设"我的"页面是第三个tabBar页面（索引从0开始）
            });
          } else {
            uni.hideTabBarRedDot({
              index: 2
            });
          }
        } else {
          // 模拟数据
          this.bookingCounts = {
            usable: 0,
            expired: 0,
            canceled: 0
          };
        }
      } catch (e) {
        console.error('获取预约数量失败', e);
        // 模拟数据
        this.bookingCounts = {
          usable: 0,
          expired: 0,
          canceled: 0
        };
      }
    },
    
    // 页面跳转
    navigateTo(url) {
      // 替换status=usable为status=confirmed,pending的组合查询
      if (url.includes('status=usable')) {
        url = url.replace('status=usable', 'status=usable');
        console.log('修改后的URL:', url);
      }
      
      // 替换status=expired为status=finished
      if (url.includes('status=expired')) {
        url = url.replace('status=expired', 'status=finished');
        console.log('修改后的URL:', url);
      }
      
      // 确保cancelled拼写与服务器一致
      if (url.includes('status=canceled')) {
        url = url.replace('status=canceled', 'status=cancelled');
        console.log('修改后的URL:', url);
      }
      
      uni.navigateTo({
        url: url,
        fail: (err) => {
          console.error('页面跳转错误:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 管理员登录入口
    navigateToAdminLogin() {
      uni.navigateTo({
        url: '/pages/admin/login'
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
    },
    
    // 获取用户信息
    getUserProfile() {
      // 重定向到登录页面
      uni.navigateTo({
        url: '/pages/login/login?redirect=' + encodeURIComponent('/pages/user/user')
      });
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
  
  .admin-entry-btn {
    margin-top: 20rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 12rpx;
    font-size: 32rpx;
    color: #2C405A;
    border: 1px solid #eee;
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