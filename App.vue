<script>
export default {
  globalData: {
    userInfo: null,
    systemInfo: null,
    $spaceId: 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29', // UniCloud阿里云空间ID
    $isDevMode: true // 默认使用模拟数据，确保界面先显示
  },
  onLaunch: function() {
    console.log('App Launch')
    
    // 获取设备信息
    this.getSystemInfo()
    
    // 获取用户登录状态
    this.checkLoginStatus()
    
    // 延迟测试云函数连接，确保界面先显示
    setTimeout(() => {
      this.testCloudConnection()
    }, 1500)
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
	  
    // 获取系统信息
    getSystemInfo() {
      try {
        const systemInfo = uni.getSystemInfoSync()
        this.globalData.systemInfo = systemInfo
        console.log('系统信息:', systemInfo)
      } catch (e) {
        console.error('获取系统信息失败:', e)
      }
    },
    
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
      if (!uni.cloud || !uni.cloud.init) {
        console.error('uni.cloud未初始化');
        this.setDevMode(true);
        return false;
      }
      
      try {
        console.log('重新初始化阿里云环境...');
        // 确保重新初始化阿里云环境
        uni.cloud.init({
          provider: 'aliyun',
          spaceId: this.$spaceId, // 使用全局定义的空间ID
          endpoint: 'https://api.next.bspapp.com',
        });
        
        console.log('正在测试云函数连接...');
        const result = await uni.cloud.callFunction({
          name: 'test',
          data: {
            message: '测试云函数连接 - ' + new Date().toLocaleString()
          }
        });
        
        console.log('云函数测试结果:', result);
        if (result.result && result.result.code === 0) {
          console.log('云函数连接成功，切换到生产模式');
          this.setDevMode(false);
          return true;
        } else {
          throw new Error('云函数返回异常');
        }
      } catch (error) {
        console.error('云函数连接测试失败:', error);
        console.warn('切换到开发模式，使用模拟数据');
        this.setDevMode(true);
        return false;
      }
    },

    // 初始化云数据库
    initCloudDatabase() {
      // 尝试初始化数据库，确保有必要的集合
      uni.cloud.callFunction({
        name: 'initDatabase'
      }).then(res => {
        console.log('数据库初始化结果:', res.result);
        if (res.result && res.result.success) {
          // 数据库初始化成功，可以进行其他操作
          this.checkAndImportData();
        }
      }).catch(err => {
        console.error('数据库初始化失败，降级使用模拟数据:', err);
        // 初始化失败时自动使用模拟数据
        this.globalData.$isDevMode = true;
      });
    },
    
    // 检查并导入数据
    checkAndImportData() {
      // 依次检查各个集合中是否有数据，如果没有则导入
      const collections = ['courses', 'teachers', 'news', 'users', 'bookings'];
      const mockData = require('./pages/admin/mock-data.js');
      
      // 依次导入数据
      collections.forEach(collection => {
        uni.cloud.callFunction({
          name: 'importData',
          data: {
            collection,
            data: mockData[collection] || [],
            clear: false // 不清空现有数据
          }
        }).then(res => {
          console.log(`导入${collection}数据结果:`, res.result);
        }).catch(err => {
          console.error(`导入${collection}数据失败:`, err);
        });
      });
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
  --opacity-disabled: 0.3; /* 组件禁用态的透明度 */

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

.icon-home:before { content: "\e600"; }
.icon-course:before { content: "\e601"; }
.icon-schedule:before { content: "\e602"; }
.icon-user:before { content: "\e603"; }
.icon-search:before { content: "\e604"; }
.icon-location:before { content: "\e605"; }
.icon-time:before { content: "\e606"; }
.icon-phone:before { content: "\e607"; }
.icon-contact:before { content: "\e608"; }
.icon-right:before { content: "\e609"; }
.icon-left:before { content: "\e60a"; }
.icon-up:before { content: "\e60b"; }
.icon-down:before { content: "\e60c"; }
.icon-favorite:before { content: "\e60d"; }
.icon-teacher:before { content: "\e60e"; }
.icon-student:before { content: "\e60f"; }
.icon-pending:before { content: "\e610"; }
.icon-confirmed:before { content: "\e611"; }
.icon-finished:before { content: "\e612"; }
.icon-cancelled:before { content: "\e613"; }
.icon-all:before { content: "\e614"; }
.icon-feedback:before { content: "\e615"; }
.icon-about:before { content: "\e616"; }
.icon-setting:before { content: "\e617"; }

/* 全局样式 */
page {
  background-color: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui", "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
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

/* 滚动条 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

/* 图片加载错误处理 */
image {
  will-change: transform;
}

/* 图片加载错误样式 */
.img-error {
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.img-error::before {
  content: "\e622"; /* 使用图片图标 */
  font-family: "iconfont";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: #ccc;
}

/* 全局默认图片 - 所有image元素添加默认图片 */
image {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMy0xOVQxMDowNzoxNSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDMtMTlUMTA6MDk6NDErMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMTlUMTA6MDk6NDErMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjI0MDFiYTktZTJmMy1kYTQ5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');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30%;
}
</style> 