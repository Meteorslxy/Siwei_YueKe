<template>
  <view class="login-container">
    <view class="header">
      <image class="logo" src="https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png" mode="aspectFit"></image>
      <view class="title">四维教育</view>
      <view class="subtitle">艺术教育预约平台</view>
    </view>
    
    <view class="content">
      <!-- 微信登录按钮 -->
      <button class="auth-btn wechat-btn" open-type="getUserInfo" @getuserinfo="handleUserInfo">
        <text class="iconfont icon-wechat"></text>
        <text>微信一键登录</text>
      </button>
      
      <!-- 手机号一键登录 -->
      <button class="auth-btn phone-btn" @click="handlePhoneLogin">
        <text class="iconfont icon-phone"></text>
        <text>手机号一键登录</text>
      </button>
      
      <!-- 调试用按钮 -->
      <button class="auth-btn debug-btn" @click="debugNavigate">
        <text>调试跳转</text>
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
      redirectUrl: '',
      isSupport: false // 是否支持一键登录
    }
  },
  onLoad(options) {
    // 获取重定向页面
    if (options.redirect) {
      this.redirectUrl = decodeURIComponent(options.redirect);
    }
    
    // 检查是否支持一键登录
    this.checkSupport();
  },
  methods: {
    // 调试跳转
    debugNavigate() {
      console.log('调试跳转');
      
      // 模拟登录成功
      uni.setStorageSync('userInfo', JSON.stringify({
        nickname: '调试用户',
        userId: 'debug-user'
      }));
      
      uni.showToast({
        title: '测试跳转',
        icon: 'none',
        duration: 1000
      });
      
      // 尝试不同的跳转方式
      setTimeout(() => {
        this.tryAllNavigations();
      }, 1000);
    },
    
    // 尝试所有跳转方式
    tryAllNavigations() {
      // 方法1: switchTab
      console.log('尝试方法1: switchTab到/pages/index/index');
      uni.switchTab({
        url: '/pages/index/index',
        success: () => {
          console.log('switchTab成功');
        },
        fail: (err) => {
          console.error('switchTab失败:', err);
          
          // 方法2: redirectTo
          console.log('尝试方法2: redirectTo到/pages/index/index');
          uni.redirectTo({
            url: '/pages/index/index',
            success: () => {
              console.log('redirectTo成功');
            },
            fail: (err2) => {
              console.error('redirectTo失败:', err2);
              
              // 方法3: navigateTo
              console.log('尝试方法3: navigateTo到/pages/index/index');
              uni.navigateTo({
                url: '/pages/index/index',
                success: () => {
                  console.log('navigateTo成功');
                },
                fail: (err3) => {
                  console.error('navigateTo失败:', err3);
                  
                  // 方法4: reLaunch
                  console.log('尝试方法4: reLaunch到/pages/index/index');
                  uni.reLaunch({
                    url: '/pages/index/index',
                    success: () => {
                      console.log('reLaunch成功');
                    },
                    fail: (err4) => {
                      console.error('reLaunch失败:', err4);
                      uni.showToast({
                        title: '所有跳转方式都失败',
                        icon: 'none'
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    
    // 检查是否支持一键登录
    checkSupport() {
      // 获取服务商
      uni.getProvider({
        service: 'oauth',
        success: (res) => {
          console.log('支持的服务商:', res.provider);
          
          // 预登录
          if (res.provider.includes('univerify')) {
            this.preLogin();
          }
        }
      });
    },
    
    // 预登录
    preLogin() {
      // #ifdef APP-PLUS
      uni.preLogin({
        provider: 'univerify',
        success: () => {
          console.log('预登录成功');
          this.isSupport = true;
        },
        fail: (err) => {
          console.error('预登录失败:', err);
          this.isSupport = false;
        }
      });
      // #endif
    },
    
    // 手机号一键登录
    handlePhoneLogin() {
      // #ifdef APP-PLUS
      if (this.isSupport) {
        uni.login({
          provider: 'univerify',
          univerifyStyle: {
            // 自定义登录框样式
            backgroundColor: '#ffffff',
            buttons: {
              iconWidth: '45px',
              iconHeight: '45px',
              list: [{
                name: '微信登录',
                id: 'weixin',
                authType: 'wechat',
                iconPath: 'https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png',
              }, {
                name: '手机号登录',
                id: 'univerify',
                authType: 'univerify',
                iconPath: 'https://mp-d0c06b27-ec33-40fe-b28b-337811bd2f29.cdn.bspapp.com/images/logo.png',
              }]
            }
          },
          success: (res) => {
            // 登录成功
            console.log('一键登录成功:', res.authResult);
            // 获取到access_token，调用云函数换取手机号
            this.getPhoneNumber(res.authResult.access_token);
          },
          fail: (err) => {
            console.error('一键登录失败:', err);
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        });
      } else {
        // #endif
        
        // 不支持一键登录，使用普通手机号登录
        this.showPhoneLoginModal();
        
        // #ifdef APP-PLUS
      }
      // #endif
    },
    
    // 显示手机号登录弹窗
    showPhoneLoginModal() {
      uni.showModal({
        title: '手机号登录',
        content: '请输入您的手机号码',
        editable: true,
        placeholderText: '请输入手机号',
        success: (res) => {
          if (res.confirm) {
            const phoneNumber = res.content;
            if (!phoneNumber) {
              uni.showToast({
                title: '请输入手机号',
                icon: 'none'
              });
              return;
            }
            
            // 简单验证手机号
            if (!/^1\d{10}$/.test(phoneNumber)) {
              uni.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
              });
              return;
            }
            
            // 直接使用手机号登录
            this.loginWithPhone(phoneNumber);
          }
        }
      });
    },
    
    // 获取手机号
    getPhoneNumber(access_token) {
      if (!access_token) {
        uni.showToast({
          title: '登录失败',
          icon: 'none'
        });
        return;
      }
      
      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      
      // 调用云函数获取手机号
      uniCloud.callFunction({
        name: 'getPhoneNumber',
        data: {
          access_token: access_token
        },
        success: (res) => {
          if (res.result && res.result.code === 0 && res.result.phoneNumber) {
            // 获取到手机号，进行登录
            this.loginWithPhone(res.result.phoneNumber);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '获取手机号失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('获取手机号失败:', err);
          uni.showToast({
            title: '获取手机号失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 使用手机号登录
    loginWithPhone(phoneNumber) {
      // 调用登录云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          phoneNumber: phoneNumber,
          loginType: 'phone'
        },
        success: (res) => {
          if (res.result && res.result.code === 0) {
            // 保存用户信息
            const userData = res.result.data || {};
            uni.setStorageSync('userInfo', JSON.stringify(userData));
            
            // 设置全局用户信息
            getApp().globalData.userInfo = userData;
            
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            });
            
            // 跳转到重定向页面或首页
            setTimeout(() => {
              this.navigateAfterLogin();
            }, 1500);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: (res.result && res.result.message) || '登录失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('登录失败', err);
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
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
            console.log('微信登录成功，获取到code:', loginRes.code);
            
            // 先获取openid
            uniCloud.callFunction({
              name: 'getWxOpenid',
              data: { 
                code: loginRes.code 
              },
              success: (openidRes) => {
                console.log('获取openid成功:', openidRes);
                
                const res = openidRes.result || {};
                if (res.code === 0 && res.data && res.data.openid) {
                  // 获取到openid，调用登录接口
                  this.loginWithOpenid(res.data.openid, userInfo);
                } else {
                  // 获取openid失败，尝试直接使用code登录
                  this.loginWithCode(loginRes.code, userInfo);
                }
              },
              fail: (err) => {
                console.error('获取openid失败:', err);
                // 获取openid出错，尝试直接使用code登录
                this.loginWithCode(loginRes.code, userInfo);
              }
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
    
    // 使用openid登录
    loginWithOpenid(openid, userInfo) {
      console.log('使用openid登录:', openid);
      uniCloud.callFunction({
        name: 'login',
        data: {
          openid: openid,
          userInfo: userInfo,
          loginType: 'wechat'
        },
        success: (res) => {
          console.log('登录结果:', res);
          this.handleLoginResult(res);
        },
        fail: (err) => {
          console.error('登录失败', err);
          uni.hideLoading();
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 使用code登录
    loginWithCode(code, userInfo) {
      console.log('使用code登录:', code);
      uniCloud.callFunction({
        name: 'login',
        data: {
          code: code,
          userInfo: userInfo,
          loginType: 'wechat'
        },
        success: (res) => {
          console.log('登录结果:', res);
          this.handleLoginResult(res);
        },
        fail: (err) => {
          console.error('登录失败', err);
          uni.hideLoading();
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 处理登录结果
    handleLoginResult(res) {
      console.log('处理登录结果:', res);
      if (res.result && res.result.code === 0) {
        // 保存用户信息
        const userData = res.result.data || {};
        console.log('保存用户信息:', userData);
        uni.setStorageSync('userInfo', JSON.stringify(userData));
        
        // 设置全局用户信息
        getApp().globalData.userInfo = userData;
        
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 跳转到重定向页面或首页
        setTimeout(() => {
          this.navigateAfterLogin();
        }, 1500);
      } else {
        uni.showToast({
          title: (res.result && res.result.message) || '登录失败',
          icon: 'none'
        });
      }
      uni.hideLoading();
    },
    
    // 登录成功后导航
    navigateAfterLogin() {
      console.log('准备登录后跳转');
      if (this.redirectUrl) {
        console.log('有重定向地址:', this.redirectUrl);
        
        // 1. 尝试redirectTo
        uni.redirectTo({
          url: this.redirectUrl,
          success: () => {
            console.log('重定向到指定页面成功');
          },
          fail: (err) => {
            console.error('重定向失败:', err);
            this.tryNavigateToHome();
          }
        });
      } else {
        this.tryNavigateToHome();
      }
    },
    
    // 尝试导航到首页
    tryNavigateToHome() {
      console.log('尝试跳转到首页');
      
      // 1. 尝试switchTab
      uni.switchTab({
        url: '/pages/index/index',
        success: () => {
          console.log('switchTab导航成功');
        },
        fail: (err) => {
          console.error('switchTab失败:', err);
          
          // 2. 尝试reLaunch
          uni.reLaunch({
            url: '/pages/index/index',
            success: () => {
              console.log('reLaunch成功');
            },
            fail: (err2) => {
              console.error('reLaunch失败:', err2);
              uni.showToast({
                title: '导航失败，请手动返回',
                icon: 'none',
                duration: 2000
              });
            }
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
    
    .wechat-btn {
      background-color: #07c160;
    }
    
    .phone-btn {
      background-color: #1989fa;
    }
    
    .debug-btn {
      background-color: #ff6347;
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