import Vue from 'vue'
import App from './App'

// 云服务空间ID - 全局唯一定义 (UniCloud)
const spaceId = 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29' // UniCloud阿里云空间ID

// #ifdef MP-WEIXIN
console.log('微信小程序环境 - 只使用UniCloud阿里云');
// #endif

// 全局组件注册
import './components/global.js'

// 引入API接口
import api from './api/index.js'
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$spaceId = spaceId

// 添加全局数据对象 - 确保在小程序环境中可以通过getApp()访问
if (!App.globalData) {
    App.globalData = {};
}
App.globalData.$spaceId = spaceId;
// 初始设置为true，防止启动过程中显示问题
App.globalData.$isDevMode = true;

// 全局混入
Vue.mixin({
    methods: {
        // 统一的页面跳转方法
        navigateTo(url) {
            uni.navigateTo({
                url
            })
        },

        // 返回上一页
        navigateBack(delta = 1) {
            uni.navigateBack({
                delta
            })
        },

        // 重定向
        redirectTo(url) {
            uni.redirectTo({
                url
            })
        },

        // 切换选项卡
        switchTab(url) {
            uni.switchTab({
                url
            })
        }
    }
})

// 全局样式变量
const themeColor = 'var(--theme-color)' // 使用CSS变量
Vue.prototype.$themeColor = themeColor

// 开发调试辅助：默认使用模拟数据，先显示界面
Vue.prototype.$isDevMode = true; // 默认先使用模拟数据，保证界面显示

// 初始化UniCloud云服务
if (uni.cloud) {
  console.log('正在初始化UniCloud阿里云服务...');
  
  // 强制使用阿里云初始化
  uni.cloud.init({
    provider: 'aliyun', // 服务商，切换为阿里云
    spaceId, // 服务空间ID
    endpoint: 'https://api.next.bspapp.com', // 阿里云服务空间地址
  });
  
  console.log('UniCloud阿里云环境初始化完成');
  uni.cloud._aliyunInit = true;
  
  // 测试云环境连接 - 延迟执行，确保小程序先启动
  setTimeout(() => {
    console.log('延迟测试云函数连接');
    uni.cloud.callFunction({
      name: 'test',
      data: { 
        message: '测试UniCloud阿里云',
        testMode: 'basic'
      }
    }).then(res => {
      console.log('云函数测试成功:', res.result);
      Vue.prototype.$isDevMode = false; // 测试成功后可以使用真实数据
      App.globalData.$isDevMode = false;
    }).catch(err => {
      console.error('云函数测试失败:', err);
      console.warn('将使用模拟数据');
      Vue.prototype.$isDevMode = true; // 测试失败后使用模拟数据
      App.globalData.$isDevMode = true;
    });
  }, 2000);
}

// 测试云函数连接方法
Vue.prototype.$testConnection = async function(testMode = 'basic') {
  try {
    console.log(`正在测试阿里云函数连接，模式: ${testMode}...`);
    const result = await uni.cloud.callFunction({
      name: 'test',
      data: {
        message: '来自前端的测试消息 - ' + new Date().toLocaleString(),
        testMode
      }
    });
    
    console.log('云函数测试结果:', result);
    
    if (result.result && result.result.code === 0) {
      uni.showToast({
        title: '云函数连接成功',
        icon: 'success'
      });
      Vue.prototype.$isDevMode = false;
      App.globalData.$isDevMode = false;
      return result.result;
    } else {
      throw new Error(result.result?.message || '未知错误');
    }
  } catch (error) {
    console.error('云函数测试失败:', error);
    uni.showToast({
      title: '云函数连接失败',
      icon: 'none'
    });
    Vue.prototype.$isDevMode = true; // 切换到开发模式
    App.globalData.$isDevMode = true;
    throw error;
  }
};

const app = new Vue({
    ...App
})
app.$mount()