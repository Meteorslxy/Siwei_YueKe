<script>
export default {
  globalData: {
    userInfo: null,
    systemInfo: null,
    $spaceId: 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29', // UniCloud阿里云空间ID
    currentPage: null, // 当前页面对象引用
    hideUniIdPagesLogo: true, // 隐藏uni-id-pages模块中的logo，避免找不到图片资源的错误
  },
  onLaunch: function() {
    console.log('App Launch')
    
    // 获取设备信息
    this.getSystemInfo()
    
    // 获取用户登录状态
    this.checkLoginStatus()
    
    // 测试云函数连接
    this.testCloudConnection()

    // 初始化全局页面引用
    uni.$on('page-ready', (pageVm) => {
      if (pageVm && pageVm.$page) {
        console.log('页面准备就绪:', pageVm.$page.fullPath);
        this.globalData.currentPage = pageVm;
      } else {
        console.error('无效的页面实例:', pageVm);
      }
    });
    
    // 监听登录成功事件，只保留一个监听器
    // 合并所有登录事件，避免多次触发
    uni.$on('login:success', (userInfo) => {
      console.log('登录成功事件触发:', JSON.stringify(userInfo));
      
      // 先更新用户信息，确保登录页面能正常跳转
      uni.$emit('user:updated', userInfo);
      
      // 延迟检查学生姓名设置状态
      setTimeout(() => {
        this.checkStudentNameStatus(userInfo);
      }, 800);
      
      // 延迟检查手机绑定状态，确保先跳转到首页/用户页面后再提示
      setTimeout(() => {
        this.checkMobileBindingStatus(userInfo);
      }, 1000);
      
      // 延迟检查微信绑定状态
      setTimeout(() => {
        this.checkWechatBindStatus(userInfo);
      }, 1500);
    });
    
    // 监听刷新用户信息事件，用于处理用户修改信息后的状态刷新
    uni.$on('refresh:user-info', () => {
      console.log('接收到刷新用户信息事件，重新加载用户数据');
      // 重新获取存储的用户信息
      const storedUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
      if (storedUserInfo) {
        this.globalData.userInfo = storedUserInfo;
        // 通知用户信息已更新
        uni.$emit('user:updated', storedUserInfo);
      }
      
      // 检查token是否有效
      this.checkLoginStatus();
    });
    
    // 监听检查登录状态事件，用于处理可能的登录状态丢失
    uni.$on('check:login', () => {
      console.log('接收到检查登录状态事件，验证token有效性');
      
      // 检查token是否存在且有效
      const token = uni.getStorageSync('uni_id_token');
      const tokenExpired = uni.getStorageSync('uni_id_token_expired');
      
      if (!token || !tokenExpired || tokenExpired < Date.now()) {
        console.warn('检测到token无效或已过期，尝试恢复登录状态');
        
        // 获取用户信息
        const userInfo = uni.getStorageSync('uni-id-pages-userInfo');
        if (userInfo && userInfo._id) {
          // 通知需要重新登录
          uni.$emit('login:expired', userInfo);
        } else {
          console.error('无法恢复登录状态，找不到有效的用户信息');
        }
      }
    });
    
    // 添加微信绑定状态变更的事件监听
    uni.$on('wechat:binding:changed', (data) => {
      console.log('微信绑定状态变更:', data);
      // 重新检查微信绑定状态
      this.checkWechatBindStatus(null, false);
    });
    
    // 监听退出登录事件，确保彻底清理用户状态
    uni.$on('uni-id-pages-logout', () => {
      console.log('接收到退出登录事件，清理全局状态');
      
      // 清空用户信息
      this.globalData.userInfo = null;
      
      // 设置标志防止自动重新登录
      this.globalData.preventAutoLogin = true;
      
      // 记录退出登录时间
      this.globalData.logoutTime = Date.now();
      
      // 清理所有检查标志
      this._isCheckingMobileBinding = false;
      this._isCheckingWechatBinding = false;
    });
    
    // 监听自定义退出登录事件
    uni.$on('user:logout', () => {
      console.log('接收到自定义退出登录事件');
      this.globalData.userInfo = null;
      this.globalData.preventAutoLogin = true;
      this.globalData.logoutTime = Date.now();
    });
  },
  onShow: function() {
    console.log('App Show')
    
    // 检查是否刚刚退出登录
    if (this.globalData.preventAutoLogin) {
      const currentTime = Date.now();
      const logoutTime = this.globalData.logoutTime || 0;
      
      // 如果退出登录后短时间内(10秒)又重新打开应用，阻止自动登录
      if (currentTime - logoutTime < 10000) {
        console.log('检测到刚刚退出登录，阻止自动登录');
        return;
      } else {
        // 重置防止自动登录的标志
        this.globalData.preventAutoLogin = false;
      }
    }
  },
  onHide: function() {
    console.log('App Hide')
  },
  
  // 应用被销毁时清理事件监听
  onUnload: function() {
    console.log('App Unload - 清理事件监听')
    // 清理登录成功相关的事件监听
    uni.$off('login:success')
    uni.$off('page-ready')
    
    // 移除多余的监听器
    uni.$off('user:login')
    uni.$off('uni-id-pages-login-success')
    
    // 移除微信绑定状态变更监听
    uni.$off('wechat:binding:changed')
  },
  
  methods: {  
    // 获取系统信息
    getSystemInfo() {
      try {
        const systemInfo = uni.getSystemInfoSync()
        this.globalData.systemInfo = systemInfo
        console.log('系统信息获取成功:', systemInfo)
      } catch (e) {
        console.error('获取系统信息失败:', e)
      }
    },

    // 检查登录状态
    checkLoginStatus() {
      try {
        // 检查是否设置了阻止自动登录的标志
        if (this.globalData.preventAutoLogin) {
          console.log('检测到preventAutoLogin标志，阻止自动加载用户信息');
          return;
        }
        
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo) {
          // 检查userInfo是否已经是对象
          if (typeof userInfo === 'object') {
            this.globalData.userInfo = userInfo
          } else {
            // 尝试解析字符串
            try {
              this.globalData.userInfo = JSON.parse(userInfo)
            } catch (parseError) {
              console.error('解析userInfo失败:', parseError)
              // 解析失败时，使用原始值
              this.globalData.userInfo = userInfo
            }
          }
        }
        
        // 检查uni-id-pages的用户信息
        const uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo')
        if (uniIdUserInfo) {
          console.log('发现uni-id用户信息')
          // 如果没有基本用户信息但有uni-id用户信息，则使用uni-id用户信息
          if (!this.globalData.userInfo && uniIdUserInfo._id) {
            this.globalData.userInfo = uniIdUserInfo
          }
        }
        
        // 记录登录状态
        console.log('登录状态检查完成:', {
          hasUserInfo: !!this.globalData.userInfo,
          hasUniIdUserInfo: !!uniIdUserInfo
        })
        
        // 检查token是否有效
        const token = uni.getStorageSync('uni_id_token');
        const tokenExpired = uni.getStorageSync('uni_id_token_expired');
        const isTokenValid = token && 
                            typeof token === 'string' && 
                            token.length > 10 && 
                            tokenExpired && 
                            tokenExpired > Date.now();
        
        // 如果token无效但还有用户信息，可能是退出登录后未清理干净
        if (!isTokenValid && (this.globalData.userInfo || uniIdUserInfo)) {
          console.log('检测到token无效但有用户信息，可能是退出登录状态不一致，清理用户信息');
          this.globalData.userInfo = null;
          uni.removeStorageSync('userInfo');
          uni.removeStorageSync('uni-id-pages-userInfo');
          return;
        }
        
        // 如果已登录且token有效，检查手机绑定状态
        if ((this.globalData.userInfo || uniIdUserInfo) && isTokenValid) {
          console.log('用户已登录，直接检查手机绑定状态');
          // 获取合并后的用户信息对象
          const mergedUserInfo = this.globalData.userInfo || uniIdUserInfo;
          console.log('用于检查手机绑定的用户信息:', JSON.stringify({
            _id: mergedUserInfo._id,
            mobile: mergedUserInfo.mobile
          }));
          
          // 延迟执行检查，确保页面已完全加载
          setTimeout(() => {
            this.checkMobileBindingStatus(mergedUserInfo, true);
            // 同时检查微信绑定状态
            this.checkWechatBindStatus(mergedUserInfo, false);
          }, 1500);
        }
      } catch (e) {
        console.error('检查登录状态失败:', e)
      }
    },
    
    // 检查用户是否绑定手机号
    async checkMobileBindingStatus(userInfo, forceCheck = false) {
      // 使用一个正在检查的标志，避免重复检查
      if (this._isCheckingMobileBinding) {
        console.log('手机绑定状态检查正在进行中，跳过重复检查');
        return;
      }
      
      this._isCheckingMobileBinding = true;
      
      try {
        // 获取当前页面路径
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const currentPageRoute = currentPage ? currentPage.route : '';
        console.log('当前页面路径:', currentPageRoute);
        
        // 获取当前用户信息
        let currentUserInfo = userInfo;
        
        // 如果没有传入用户信息，则从存储中获取
        if (!currentUserInfo) {
          currentUserInfo = this.globalData.userInfo || uni.getStorageSync('uni-id-pages-userInfo');
          if (!currentUserInfo) {
            console.log('没有找到用户信息，无需检查手机绑定状态');
            this._isCheckingMobileBinding = false;
            return;
          }
        }
        
        console.log('准备检查用户手机绑定状态，用户信息:', JSON.stringify({
          _id: currentUserInfo._id,
          mobile: currentUserInfo.mobile || '未绑定'
        }));
        
        // 如果本地用户信息中已有手机号且不是强制检查，则直接返回
        if (currentUserInfo.mobile && currentUserInfo.mobile.trim() !== '') {
          console.log('本地信息显示用户已绑定手机号:', currentUserInfo.mobile);
          this._isCheckingMobileBinding = false;
          return;
        }
        
        // 检查是否已经显示过提示且不是强制检查
        const hasShownMobileBindingTip = uni.getStorageSync('hasShownMobileBindingTip');
        if (hasShownMobileBindingTip && !forceCheck) {
          console.log('已经显示过手机绑定提示，不再重复显示');
          this._isCheckingMobileBinding = false;
          return;
        }
        
        // 再次从云端验证
        const token = uni.getStorageSync('uni_id_token');
        if (!token) {
          console.log('用户未登录或token不存在');
          this._isCheckingMobileBinding = false;
          return;
        }
        
        // 调用云函数检查用户信息
        console.log('调用云函数获取最新用户信息');
        const result = await uniCloud.callFunction({
          name: 'getUserInfoByToken',
          data: { uniIdToken: token }
        });
        
        console.log('云函数返回用户信息状态:', result.result?.code);
        
        if (result.result && result.result.code === 0 && result.result.userInfo) {
          const cloudUserInfo = result.result.userInfo;
          
          // 更新本地用户信息
          if (cloudUserInfo._id) {
            this.globalData.userInfo = cloudUserInfo;
            uni.setStorageSync('uni-id-pages-userInfo', cloudUserInfo);
            uni.setStorageSync('userInfo', cloudUserInfo);
          }
          
          // 检查是否需要绑定手机号
          if (!cloudUserInfo.mobile || cloudUserInfo.mobile.trim() === '' || forceCheck) {
            console.log('用户未绑定手机号或需要强制检查，显示提示');
            
            // 设置已经显示过提示的标记
            uni.setStorageSync('hasShownMobileBindingTip', true);
            
            // 增加延迟，确保页面已完全加载
            setTimeout(() => {
              // 显示确认框
              uni.showModal({
                title: '绑定手机号',
                content: '为了提供更好的服务，请绑定您的手机号',
                confirmText: '去绑定',
                cancelText: '稍后再说',
                success: (res) => {
                  if (res.confirm) {
                    console.log('用户点击确认，跳转到手机绑定页面');
                    
                    // 延迟执行，避免页面跳转冲突
                    setTimeout(() => {
                      // 直接跳转到自定义手机绑定页面，避免使用可能不存在的uni-id-pages页面
                      uni.navigateTo({
                        url: '/pages/user/phone/index',
                        success: () => {
                          console.log('成功跳转到手机绑定页面');
                        },
                        fail: (err) => {
                          console.error('跳转到手机绑定页面失败:', err);
                          
                          // 如果失败，尝试跳转到用户页面
                          uni.switchTab({
                            url: '/pages/user/user',
                            success: () => {
                              console.log('成功跳转到用户页面');
                            },
                            fail: (err2) => {
                              console.error('跳转到用户页面也失败:', err2);
                            }
                          });
                        }
                      });
                    }, 500);
                  } else {
                    console.log('用户点击取消');
                  }
                }
              });
            }, 1000); // 增加到1秒的延迟，确保页面加载完成
          } else {
            console.log('云端验证用户已绑定手机号:', cloudUserInfo.mobile);
          }
        }
      } catch (error) {
        console.error('检查手机绑定状态失败:', error);
      } finally {
        // 无论成功或失败，都重置检查标志
        this._isCheckingMobileBinding = false;
        console.log('手机绑定状态检查完成');
      }
    },

    // 检查用户是否绑定微信账号
    async checkWechatBindStatus(userInfo, forceCheck = false) {
      // 使用一个正在检查的标志，避免重复检查
      if (this._isCheckingWechatBinding) {
        console.log('微信绑定状态检查正在进行中，跳过重复检查');
        return;
      }
      
      this._isCheckingWechatBinding = true;
      
      try {
        // 获取当前页面路径
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const currentPageRoute = currentPage ? currentPage.route : '';
        console.log('检查微信绑定状态 - 当前页面路径:', currentPageRoute);
        
        // 如果当前页面是登录相关页面，延迟检查
        if (currentPageRoute && (
            currentPageRoute.includes('login') || 
            currentPageRoute.includes('register') || 
            currentPageRoute.includes('auth')
          )) {
          console.log('当前在登录相关页面，将在页面跳转后再检查微信绑定状态');
          setTimeout(() => {
            this._isCheckingWechatBinding = false;
            this.checkWechatBindStatus(userInfo, forceCheck);
          }, 1500);
          return;
        }
        
        // 获取当前用户信息
        let currentUserInfo = userInfo;
        
        // 如果没有传入用户信息，则从存储中获取
        if (!currentUserInfo) {
          currentUserInfo = this.globalData.userInfo || uni.getStorageSync('uni-id-pages-userInfo');
          if (!currentUserInfo) {
            console.log('没有找到用户信息，无需检查微信绑定状态');
            this._isCheckingWechatBinding = false;
            return;
          }
        }
        
        // 检查微信绑定状态
        let isWechatBound = false;
        
        // 判断wx_openid是否存在且不为空
        if (currentUserInfo.wx_openid) {
          if (typeof currentUserInfo.wx_openid === 'object') {
            // 如果是对象，检查是否有任何属性值
            isWechatBound = Object.keys(currentUserInfo.wx_openid).length > 0;
          } else if (typeof currentUserInfo.wx_openid === 'string') {
            // 如果是字符串，检查是否非空
            isWechatBound = !!currentUserInfo.wx_openid;
          }
        } else if (currentUserInfo.wx_unionid) {
          // 或者通过unionid判断
          isWechatBound = !!currentUserInfo.wx_unionid;
        }
        
        console.log('用户微信绑定状态:', isWechatBound);
        
        // 发送绑定状态事件，设置页面可以监听此事件更新绑定状态显示
        uni.$emit('wechat:binding:status', { 
          isBound: isWechatBound,
          userInfo: currentUserInfo
        });
        
        // 如果用户需要绑定微信并且设置了强制检查，则可以在这里显示提示
        if (!isWechatBound && forceCheck) {
          uni.showModal({
            title: '绑定微信',
            content: '绑定微信账号可以使用微信快捷登录，是否立即绑定？',
            confirmText: '去绑定',
            cancelText: '稍后再说',
            success: (res) => {
              if (res.confirm) {
                // 跳转到微信绑定页面
                uni.navigateTo({
                  url: '/pages/user/setting/index'
                });
              }
            }
          });
        }
        
        return isWechatBound;
      } catch (error) {
        console.error('检查微信绑定状态失败:', error);
        return false;
      } finally {
        // 无论成功或失败，都重置检查标志
        this._isCheckingWechatBinding = false;
      }
    },

    // 测试云函数连接
    async testCloudConnection() {
      try {
        console.log('检查云服务状态...');
        
        // 如果在微信小程序环境中，确保wx.cloud被禁用
        // #ifdef MP-WEIXIN
        if (typeof wx !== 'undefined' && wx.cloud) {
          wx.cloud = null;
          console.log('在App.vue中禁用微信云开发');
        }
        // #endif
        
        // 检查uniCloud是否可用
        if (typeof uniCloud === 'undefined') {
          console.error('uniCloud对象不存在，可能是平台不支持');
          return false;
        }
        
        // 直接使用uniCloud调用云函数
        console.log('正在测试云函数连接...');
        const result = await uniCloud.callFunction({
          name: 'yuekeCloudTest',
          data: {
            message: '测试云函数连接 - ' + new Date().toLocaleString()
          }
        });
        
        console.log('云函数测试结果:', result);
        if (result && result.result && result.result.code === 0) {
          console.log('云函数连接成功');
          return true;
        } else {
          console.warn('云函数测试返回异常结果');
          return false;
        }
      } catch (error) {
        console.error('云函数连接测试失败:', error);
        return false;
      }
    },

    // 检查学生姓名设置状态
    async checkStudentNameStatus() {
      try {
        const hasSetStudentName = uni.getStorageSync('hasSetStudentName');
        let userInfo = uni.getStorageSync('userInfo');
        
        // 确保userInfo是对象
        if (typeof userInfo === 'string') {
          try {
            userInfo = JSON.parse(userInfo);
          } catch (parseError) {
            console.error('解析userInfo字符串失败:', parseError);
            // 如果解析失败，尝试获取另一个存储的用户信息
            userInfo = uni.getStorageSync('uni-id-pages-userInfo') || null;
          }
        }
        
        // 检查用户昵称是否为自动生成的
        const isAutoGeneratedNickname = userInfo && userInfo.nickname && 
          (userInfo.nickname.startsWith('用户') || 
           userInfo.nickname === '微信用户' ||
           /^用户\d+$/.test(userInfo.nickname)); // 增加正则匹配"用户"后跟数字的模式
        
        console.log('检查是否设置过学生姓名:', hasSetStudentName, 
                   '用户昵称:', userInfo?.nickname || '无昵称',
                   '是否自动生成:', isAutoGeneratedNickname);
        
        // 如果用户已明确设置了学生姓名且有非自动生成的昵称，则不显示弹窗
        if (hasSetStudentName === 'true' || (hasSetStudentName && !isAutoGeneratedNickname)) {
          console.log('已经设置过学生姓名且昵称非自动生成，无需再次设置');
          return;
        }
        
        // 只有当用户有自动生成的昵称时才显示弹窗
        if (userInfo && isAutoGeneratedNickname) {
          // 清除可能错误设置的标记
          if (hasSetStudentName) {
            console.log('检测到自动生成的昵称但已标记为设置过，清除标记');
            uni.removeStorageSync('hasSetStudentName');
          }
          
          this._showStudentNameModal();
        } else if (userInfo?.nickname) {
          console.log('用户已有昵称:', userInfo.nickname, '不显示弹窗');
        }
      } catch (error) {
        console.error('检查学生姓名设置状态失败:', error);
        // 出错时不自动显示弹窗，避免不必要的干扰
      }
    },
    
    // 新增：封装显示学生姓名弹窗的方法
    _showStudentNameModal() {
      // 延迟显示设置学生姓名弹窗，确保页面已完全加载
      setTimeout(() => {
        // 显示学生姓名设置弹窗
        console.log('显示学生姓名设置弹窗');
        // 全局事件触发学生姓名设置弹窗
        uni.$emit('show:student-name-modal');
      }, 500);
    }
  }
}
</script>

<style>
    /* 全局CSS变量 */
    page {
        /* 主题色 */
        --theme-color: #FF6B00;
        --theme-color-light: #FFE9D6;
        --theme-color-dark: #F37121;

        /* 文字颜色 */
        --text-color: #333333;
        --text-color-inverse: #ffffff;
        --text-color-grey: #666666;
        --text-color-light: #999999;

        /* 背景颜色 */
        --bg-color: #F7F7F7;
        --bg-color-white: #FFFFFF;
        --bg-color-grey: #F2F2F2;

        /* 边框颜色 */
        --border-color: #DDDDDD;
        --border-color-light: #EEEEEE;

        /* 尺寸变量 */
        --uni-size-grid: 8rpx;

        /* 文字尺寸 */
        --font-size-xs: 22rpx;
        --font-size-sm: 24rpx;
        --font-size-base: 28rpx;
        --font-size-lg: 32rpx;
        --font-size-xl: 36rpx;
        --font-size-xxl: 40rpx;

        /* 图片尺寸 */
        --img-size-sm: 80rpx;
        --img-size-base: 120rpx;
        --img-size-lg: 160rpx;

        /* 水平间距 */
        --spacing-xs: 10rpx;
        --spacing-sm: 20rpx;
        --spacing-base: 30rpx;
        --spacing-lg: 40rpx;
        --spacing-xl: 50rpx;

        /* 垂直间距 */
        --spacing-col-sm: 8rpx;
        --spacing-col-base: 16rpx;
        --spacing-col-lg: 24rpx;

        /* 边框半径 */
        --border-radius-sm: 4rpx;
        --border-radius-base: 8rpx;
        --border-radius-lg: 12rpx;
        --border-radius-circle: 50%;

        /* 阴影 */
        --box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
        --box-shadow-lg: 0 4rpx 10rpx rgba(0, 0, 0, 0.15);

        /* 透明度 */
        --opacity-disabled: 0.3;
        /* 组件禁用态的透明度 */

        /* 组件变量 */
        /* 导航栏 */
        --navbar-height: 88rpx;
        --navbar-bg-color: #ffffff;

        /* 选项卡 */
        --tab-height: 100rpx;
    }

    /* 定义图标字体 */
    @font-face {
        font-family: "iconfont";
        src: url('/static/fonts/iconfont.ttf') format('truetype');
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-home:before {
        content: "\e600";
    }

    .icon-course:before {
        content: "\e601";
    }

    .icon-schedule:before {
        content: "\e602";
    }

    .icon-user:before {
        content: "\e603";
    }

    .icon-search:before {
        content: "\e604";
    }

    .icon-location:before {
        content: "\e605";
    }

    .icon-time:before {
        content: "\e606";
    }

    .icon-phone:before {
        content: "\e607";
    }

    .icon-contact:before {
        content: "\e608";
    }

    .icon-right:before {
        content: "\e609";
    }

    .icon-left:before {
        content: "\e60a";
    }

    .icon-up:before {
        content: "\e60b";
    }

    .icon-down:before {
        content: "\e60c";
    }

    .icon-favorite:before {
        content: "\e60d";
    }

    .icon-teacher:before {
        content: "\e60e";
    }

    .icon-student:before {
        content: "\e60f";
    }

    .icon-pending:before {
        content: "\e610";
    }

    .icon-confirmed:before {
        content: "\e611";
    }

    .icon-finished:before {
        content: "\e612";
    }

    .icon-cancelled:before {
        content: "\e613";
    }

    .icon-all:before {
        content: "\e614";
    }

    /* 基础样式 */
    /* 页面根元素 */
    uni-page-body,
    page {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* 页面内容区域 */
    .container {
        flex: 1;
        padding: var(--spacing-base);
        width: 100%;
        box-sizing: border-box;
    }

    /* 文字样式 */
    text {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
        font-size: var(--font-size-base);
        color: var(--text-color);
        line-height: 1.5;
    }

    /* 清除浮动 */
    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }

    /* 1px边框 */
    .border-bottom {
        position: relative;
    }

    .border-bottom::after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid var(--border-color);
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }

    /* 圆角 */
    .rounded {
        border-radius: var(--border-radius-base);
    }

    /* 阴影 */
    .shadow {
        box-shadow: var(--box-shadow);
    }

    /* 卡片 */
    .card {
        background-color: #fff;
        border-radius: var(--border-radius-base);
        margin-bottom: var(--spacing-base);
        padding: var(--spacing-base);
        box-shadow: var(--box-shadow);
    }

    /* 标题 */
    .title {
        font-size: var(--font-size-lg);
        font-weight: bold;
        color: var(--text-color);
        margin-bottom: var(--spacing-base);
    }

    /* 小标题 */
    .subtitle {
        font-size: var(--font-size-base);
        color: var(--text-color-grey);
        margin-bottom: var(--spacing-sm);
    }

    /* 页面加载中 */
    .page-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: var(--bg-color);
        background-size: 30%;
    }
</style> 