<template>
  <view class="login-container">
    <!-- 背景图 -->
    <image class="bg-image" src="/static/images/login.png" mode="aspectFill"></image>
    
    <!-- 自定义导航栏 -->
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <text class="nav-title">登录</text>
      </view>
    </view>
    
    <view class="content">
      <!-- Logo -->
      <view class="header">
        <image class="logo" src="../../static/images/logo.png" mode="aspectFit"></image>
      </view>
      
      <!-- 登录按钮 -->
      <view class="auth-buttons">
        <button class="auth-btn wechat-btn" open-type="getUserInfo" @getuserinfo="handleUserInfo">
          微信登陆
        </button>
        <button class="auth-btn phone-btn" @click="handlePhoneLogin">
          手机号登陆
        </button>
      </view>
      
      <!-- 用户协议 -->
      <view class="footer">
        <view class="agreement">
          <text class="dot"></text>
          <text>登录即代表同意</text>
          <text class="link" @click="showUserAgreement">《用户协议》</text>
          <text>和</text>
          <text class="link" @click="showPrivacyPolicy">《隐私政策》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      redirectUrl: '',
      isSupport: false, // 是否支持一键登录
      statusBarHeight: 0,
      loginState: {
        code: '', // 微信登录code
        openid: '', // 用户openid
        sessionKey: '' // 会话密钥
      }
    }
  },
  onLoad(options) {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    
    // 获取重定向页面
    if (options.redirect) {
      this.redirectUrl = decodeURIComponent(options.redirect);
    }
    
    // 检查是否支持一键登录
    this.checkSupport();
    
    // 进入页面就开始静默登录
    this.silentLogin();
  },
  methods: {
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
                  iconPath: '/static/images/logo.png',
                  title: '微信登录'
                },
                {
                  iconPath: '/static/images/logo.png',
                  title: '微博登录'
                }
              ]
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
      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      
      console.log('使用手机号登录:', phoneNumber);
      
      // 调用登录云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          phoneNumber: phoneNumber,
          loginType: 'phone'
        },
        success: (res) => {
          console.log('手机号登录结果:', res);
          
          if (res.result && res.result.code === 0) {
            // 处理登录结果
            this.handleLoginResult(res);
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
          console.error('登录失败:', err);
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 静默登录，获取code和openid
    async silentLogin() {
      try {
        // 调用微信登录获取code
        const loginRes = await this.wxLoginPromise();
        
        if (loginRes.code) {
          console.log('静默登录获取code成功:', loginRes.code);
          this.loginState.code = loginRes.code;
          
          // 获取openid
          try {
            const openidRes = await this.getOpenid(loginRes.code);
            console.log('静默登录获取openid成功:', openidRes);
            
            if (openidRes.result && openidRes.result.code === 0 && openidRes.result.data) {
              this.loginState.openid = openidRes.result.data.openid;
              this.loginState.sessionKey = openidRes.result.data.sessionKey;
            }
          } catch (error) {
            console.error('静默登录获取openid失败:', error);
          }
        }
      } catch (error) {
        console.error('静默登录失败:', error);
      }
    },
    
    // Promise化的wx.login
    wxLoginPromise() {
      return new Promise((resolve, reject) => {
        uni.login({
          success(res) {
            resolve(res);
          },
          fail(err) {
            reject(err);
          }
        });
      });
    },
    
    // 获取openid
    getOpenid(code) {
      return new Promise((resolve, reject) => {
        uniCloud.callFunction({
          name: 'getWxOpenid',
          data: { code },
          success: res => {
            resolve(res);
          },
          fail: err => {
            reject(err);
          }
        });
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
      
      // 如果已经有了openid，直接使用
      if (this.loginState.openid) {
        console.log('使用已获取的openid登录:', this.loginState.openid);
        this.loginWithOpenid(this.loginState.openid, userInfo);
        return;
      }
      
      // 如果有code但没有openid，重新获取openid
      if (this.loginState.code && !this.loginState.openid) {
        this.getOpenid(this.loginState.code)
          .then(openidRes => {
            console.log('重新获取openid成功:', openidRes);
            if (openidRes.result && openidRes.result.code === 0 && openidRes.result.data) {
              this.loginState.openid = openidRes.result.data.openid;
              this.loginState.sessionKey = openidRes.result.data.sessionKey;
              this.loginWithOpenid(openidRes.result.data.openid, userInfo);
            } else {
              // 获取openid失败，重新获取code
              this.refreshLogin(userInfo);
            }
          })
          .catch(err => {
            console.error('获取openid失败:', err);
            // 获取openid失败，重新获取code
            this.refreshLogin(userInfo);
          });
        return;
      }
      
      // 没有code和openid，完全重新登录
      this.refreshLogin(userInfo);
    },
    
    // 刷新登录状态
    refreshLogin(userInfo) {
      // 进行微信登录
      uni.login({
        success: (loginRes) => {
          if (loginRes.code) {
            console.log('微信登录成功，获取到code:', loginRes.code);
            this.loginState.code = loginRes.code;
            
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
                  // 保存openid和sessionKey
                  this.loginState.openid = res.data.openid;
                  this.loginState.sessionKey = res.data.sessionKey;
                  
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
    async handleLoginResult(result) {
      try {
        console.log('处理登录结果，原始数据:', result);
        
        // 检查result.result结构
        if (result && result.result) {
          console.log('云函数返回结构:', {
            code: result.result.code,
            success: result.result.success,
            message: result.result.message,
            hasData: !!result.result.data
          });
        }
        
        // 处理云函数返回的结构
        let loginData = result.result || result;
        
        if (loginData && (loginData.code === 0 || loginData.success === true) && loginData.data) {
          let userData = loginData.data;
          console.log('登录成功，用户数据结构:', Object.keys(userData));
          
          // 处理返回数据为数组的情况
          if (Array.isArray(userData) && userData.length > 0) {
            console.log('用户数据是数组，取第一项');
            userData = userData[0];
          }
          
          // 确保用户信息包含userId
          if (!userData.userId && userData._id) {
            console.log('用户数据中没有userId，使用_id代替:', userData._id);
            userData.userId = userData._id;
          }
          
          // 保存到本地存储和全局状态
          console.log('最终保存的用户信息:', userData);
          uni.setStorageSync('userInfo', JSON.stringify(userData));
          getApp().globalData.userInfo = userData;
          
          // 隐藏加载提示
          uni.hideLoading();
          
          // 显示登录成功提示
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          
          // 发送登录成功事件通知
          try {
            uni.$emit('user:login', userData);
            console.log('已发送登录成功事件');
          } catch (err) {
            console.error('发送登录事件失败:', err);
          }
          
          // 跳转到重定向页面或首页
          setTimeout(() => {
            this.navigateAfterLogin();
          }, 1000);
        } else {
          // 登录失败
          uni.hideLoading();
          console.error('登录失败，返回数据无效:', loginData);
          uni.showToast({
            title: (loginData && loginData.message) || '登录失败',
            icon: 'none'
          });
        }
      } catch (e) {
        uni.hideLoading();
        console.error('处理登录结果错误，详细信息:', e);
        uni.showToast({
          title: '登录处理失败',
          icon: 'none'
        });
      }
    },
    
    // 登录成功后导航
    navigateAfterLogin() {
      try {
        // 先调用调试日志
        this.logDebugInfo();
        
        console.log('准备跳转，重定向URL:', this.redirectUrl);
        
        // 判断是否是tabBar页面
        const tabBarPages = ['/pages/index/index', '/pages/course/course', '/pages/user/user'];
        const isTabBarPage = tabBarPages.some(page => this.redirectUrl && this.redirectUrl.indexOf(page) === 0);
        
        if (this.redirectUrl) {
          if (isTabBarPage) {
            // 如果是tabBar页面，使用switchTab
            console.log('检测到tabBar页面，使用switchTab');
            uni.switchTab({
              url: this.redirectUrl,
              fail: (err) => {
                console.error('switchTab失败，回到首页:', err);
                uni.switchTab({
                  url: '/pages/index/index'
                });
              }
            });
          } else {
            // 非tabBar页面，使用redirectTo
            uni.redirectTo({
              url: this.redirectUrl,
              fail: (err) => {
                console.error('重定向失败，回到首页:', err);
                uni.switchTab({
                  url: '/pages/index/index'
                });
              }
            });
          }
        } else {
          // 默认跳转到首页
          uni.switchTab({
            url: '/pages/index/index'
          });
        }
      } catch (e) {
        console.error('跳转出错:', e);
        // 发生错误，强制回到首页
        uni.switchTab({
          url: '/pages/index/index'
        });
      }
    },
    
    // 调试日志输出
    logDebugInfo() {
      try {
        console.log('----- 用户登录调试信息 -----');
        
        // 读取本地存储的用户信息
        const userInfoStr = uni.getStorageSync('userInfo');
        console.log('本地存储的用户信息字符串长度:', userInfoStr ? userInfoStr.length : 0);
        
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            console.log('解析后的用户信息字段:', Object.keys(userInfo));
            console.log('用户ID:', userInfo.userId || userInfo._id);
            console.log('用户名:', userInfo.nickName || userInfo.username);
            console.log('是否有手机号:', !!userInfo.phoneNumber);
          } catch (e) {
            console.error('解析用户信息失败:', e);
          }
        } else {
          console.log('本地存储中没有用户信息');
        }
        
        // 检查全局状态
        const globalData = getApp().globalData || {};
        console.log('全局状态中是否有用户信息:', !!globalData.userInfo);
        
        // 输出环境信息
        const sysInfo = uni.getSystemInfoSync();
        console.log('运行环境:', sysInfo.platform, sysInfo.system);
        
        console.log('----- 调试信息结束 -----');
      } catch (err) {
        console.error('输出调试信息失败:', err);
      }
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
    },
    
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
      
      // 延迟跳转
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
    }
  }
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .bg-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .custom-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: transparent;
    
    .nav-content {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .nav-title {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  
  .content {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 60rpx;
    padding-top: calc(44px + var(--status-bar-height));
    
    .header {
      margin-top: 25vh;
      text-align: center;
      
      .logo {
        width: 120rpx;
        height: 120rpx;
      }
    }
    
    .auth-buttons {
      margin-top: 460rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .auth-btn {
        width: 80%;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        border-radius: 44rpx;
        font-size: 32rpx;
        margin-bottom: 30rpx;
        border: none;
        
        &::after {
          border: none;
        }
      }
      
      .wechat-btn {
        background-color: #47c76d;
        color: #fff;
      }
      
      .phone-btn {
        background-color: #fff;
        color: #333;
        border: 2rpx solid rgba(0, 0, 0, 0.1);
      }
    }
  }
  
  .footer {
    position: fixed;
    bottom: 40rpx;
    left: 0;
    width: 100%;
    z-index: 1;
    
    .agreement {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #666;
      
      .dot {
        width: 8rpx;
        height: 8rpx;
        background-color: #666;
        border-radius: 50%;
        margin-right: 8rpx;
      }
      
      .link {
        color: #FF6B00;
      }
    }
  }
}
</style> 