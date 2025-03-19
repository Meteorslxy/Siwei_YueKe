<template>
  <view class="login-container">
    <view class="header">
      <image class="logo" src="/static/images/logo.png" mode="aspectFit"></image>
      <view class="title">悦课</view>
      <view class="subtitle">艺术教育预约平台</view>
    </view>
    
    <view class="content">
      <button class="auth-btn" open-type="getUserInfo" @getuserinfo="handleUserInfo">
        <text class="iconfont icon-wechat"></text>
        <text>微信一键登录</text>
      </button>
      <view class="tips">登录后可使用完整功能</view>
    </view>
    
    <view class="footer">
      <view class="agreement">
        <text>登录即代表您已同意</text>
        <text class="link" @click="showPrivacyPolicy">《隐私政策》</text>
        <text>和</text>
        <text class="link" @click="showUserAgreement">《用户协议》</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      redirectUrl: ''
    }
  },
  onLoad(options) {
    // 获取重定向页面
    if (options.redirect) {
      this.redirectUrl = decodeURIComponent(options.redirect);
    }
  },
  methods: {
    // 处理获取用户信息结果
    handleUserInfo(e) {
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        uni.showToast({
          title: '授权失败',
          icon: 'none'
        });
        return;
      }
      
      // 获取用户信息
      const userInfo = e.detail.userInfo;
      
      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      
      // 进行微信登录
      uni.login({
        success: (loginRes) => {
          if (loginRes.code) {
            // 调用登录接口
            this.$api.user.login({
              code: loginRes.code,
              userInfo: userInfo
            })
              .then(res => {
                if (res.code === 0) {
                  // 保存用户信息
                  const userData = res.data || {};
                  uni.setStorageSync('userInfo', JSON.stringify(userData));
                  
                  // 设置全局用户信息
                  getApp().globalData.userInfo = userData;
                  
                  uni.showToast({
                    title: '登录成功',
                    icon: 'success'
                  });
                  
                  // 跳转到重定向页面或首页
                  setTimeout(() => {
                    if (this.redirectUrl) {
                      uni.redirectTo({
                        url: this.redirectUrl
                      });
                    } else {
                      uni.switchTab({
                        url: '/pages/index/index'
                      });
                    }
                  }, 1500);
                } else {
                  uni.showToast({
                    title: res.message || '登录失败',
                    icon: 'none'
                  });
                }
              })
              .catch(err => {
                console.error('登录失败', err);
                uni.showToast({
                  title: '登录失败，请重试',
                  icon: 'none'
                });
              })
              .finally(() => {
                uni.hideLoading();
              });
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 显示隐私政策
    showPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/common/webview?title=隐私政策&url=' + encodeURIComponent('https://example.com/privacy')
      });
    },
    
    // 显示用户协议
    showUserAgreement() {
      uni.navigateTo({
        url: '/pages/common/webview?title=用户协议&url=' + encodeURIComponent('https://example.com/agreement')
      });
    }
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40rpx;
  background-color: #fff;
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80rpx;
    margin-bottom: 100rpx;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 30rpx;
    }
    
    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .subtitle {
      font-size: 30rpx;
      color: #666;
    }
  }
  
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .auth-btn {
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      background-color: #07c160;
      color: #fff;
      font-size: 32rpx;
      border-radius: 45rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30rpx;
      
      .iconfont {
        margin-right: 10rpx;
      }
    }
    
    .tips {
      font-size: 26rpx;
      color: #999;
    }
  }
  
  .footer {
    margin-top: auto;
    padding-bottom: 40rpx;
    
    .agreement {
      font-size: 24rpx;
      color: #999;
      text-align: center;
      
      .link {
        color: #FF6B00;
      }
    }
  }
}
</style> 