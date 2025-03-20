<script>
export default {
  globalData: {
    userInfo: null,
    systemInfo: null,
    $spaceId: 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29' // UniCloud阿里云空间ID
  },
  onLaunch: function() {
    console.log('App Launch')
    
    // 获取设备信息
    this.getSystemInfo()
    
    // 获取用户登录状态
    this.checkLoginStatus()
    
    // 测试云函数连接
    this.testCloudConnection()
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {  
    // 检查登录状态
    checkLoginStatus() {
      try {
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo) {
          this.globalData.userInfo = JSON.parse(userInfo)
        }
      } catch (e) {
        console.error('检查登录状态失败:', e)
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