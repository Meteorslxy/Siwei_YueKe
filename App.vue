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
    
    // 监听登录成功事件，检查用户是否绑定手机号
    // 使用箭头函数保证this指向当前实例
    uni.$on('login:success', (userInfo) => {
      console.log('App.vue 收到 login:success 事件，用户信息:', JSON.stringify(userInfo));
      this.checkMobileBindingStatus(userInfo);
    });
    
    uni.$on('user:login', (userInfo) => {
      console.log('App.vue 收到 user:login 事件，用户信息:', JSON.stringify(userInfo));
      this.checkMobileBindingStatus(userInfo);
    });
    
    uni.$on('uni-id-pages-login-success', (userInfo) => {
      console.log('App.vue 收到 uni-id-pages-login-success 事件，用户信息:', JSON.stringify(userInfo));
      this.checkMobileBindingStatus(userInfo);
    });
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  
  // 应用被销毁时清理事件监听
  onUnload: function() {
    console.log('App Unload - 清理事件监听')
    // 清理登录成功相关的事件监听
    uni.$off('login:success')
    uni.$off('user:login')
    uni.$off('uni-id-pages-login-success')
    uni.$off('page-ready')
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
        
        // 如果已登录，检查手机绑定状态
        if (this.globalData.userInfo || uniIdUserInfo) {
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
          }, 1500);
        }
      } catch (e) {
        console.error('检查登录状态失败:', e)
      }
    },
    
    // 检查用户是否绑定手机号
    async checkMobileBindingStatus(userInfo, forceCheck = false) {
      console.log('检查用户手机绑定状态', forceCheck ? '(强制检查)' : '', '调用堆栈:', new Error().stack);
      
      // 检查是否已经显示过提示
      const hasShownMobileBindingTip = uni.getStorageSync('hasShownMobileBindingTip');
      if (hasShownMobileBindingTip && !forceCheck) {
        console.log('已经显示过手机绑定提示，不再重复显示');
        return;
      }
      
      try {
        // 获取当前用户信息
        let currentUserInfo = userInfo;
        
        // 如果没有传入用户信息，则从存储中获取
        if (!currentUserInfo) {
          currentUserInfo = this.globalData.userInfo || uni.getStorageSync('uni-id-pages-userInfo');
          if (!currentUserInfo) {
            console.log('没有找到用户信息，无需检查手机绑定状态');
            return;
          }
        }
        
        console.log('准备检查用户手机绑定状态，用户信息:', JSON.stringify({
          _id: currentUserInfo._id,
          mobile: currentUserInfo.mobile || '未绑定',
          type: typeof currentUserInfo.mobile,
          isEmpty: currentUserInfo.mobile === '',
          isNull: currentUserInfo.mobile === null,
          isUndefined: currentUserInfo.mobile === undefined
        }));
        
        // 修改检查逻辑：确保mobile不为空且不是空字符串
        if (currentUserInfo.mobile && currentUserInfo.mobile.trim() !== '' && !forceCheck) {
          console.log('用户已绑定手机号:', currentUserInfo.mobile);
          return;
        }
        
        // 再次从云端验证
        const token = uni.getStorageSync('uni_id_token');
        if (!token) {
          console.log('用户未登录或token不存在');
          return;
        }
        
        // 调用云函数检查用户信息
        console.log('调用云函数获取最新用户信息');
        const result = await uniCloud.callFunction({
          name: 'getUserInfoByToken',
          data: { uniIdToken: token }
        });
        
        console.log('云函数返回用户信息:', result);
        
        if (result.result && result.result.code === 0 && result.result.userInfo) {
          const cloudUserInfo = result.result.userInfo;
          
          // 更新本地用户信息
          if (cloudUserInfo._id) {
            this.globalData.userInfo = cloudUserInfo;
            uni.setStorageSync('uni-id-pages-userInfo', cloudUserInfo);
            uni.setStorageSync('userInfo', cloudUserInfo);
          }
          
          // 修改检查逻辑：确保mobile不为空且不是空字符串
          if (!cloudUserInfo.mobile || cloudUserInfo.mobile.trim() === '' || forceCheck) {
            console.log('用户未绑定手机号或需要强制检查，显示提示');
            
            // 设置已经显示过提示的标记
            uni.setStorageSync('hasShownMobileBindingTip', true);
            
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
                    // 跳转到"我的"页面中的设置
                    uni.navigateTo({
                      url: '/pages/user/phone/index',
                      fail: (err) => {
                        console.error('跳转到手机绑定页面失败:', err);
                        // 如果失败，尝试跳转到用户页面
                        uni.switchTab({
                          url: '/pages/user/user',
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
          } else {
            console.log('云端验证用户已绑定手机号:', cloudUserInfo.mobile);
          }
        }
      } catch (error) {
        console.error('检查手机绑定状态失败:', error);
      }
      
      console.log('手机绑定状态检查完成');
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