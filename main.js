import Vue from 'vue'
import App from './App'

// 禁用wx.cloud - 微信小程序环境
// #ifdef MP-WEIXIN
// 完全禁用微信云开发，使其返回null
if (typeof wx !== 'undefined' && wx.cloud) {
  wx.cloud = null;
  console.log('已禁用微信云开发，只使用阿里云UniCloud');
}

// 确保uni.cloud对象存在
if (typeof uni !== 'undefined' && typeof uni.cloud === 'undefined') {
  console.log('uni.cloud不存在，可能是平台不支持或未初始化');
}
// #endif

// 云服务空间ID - 全局唯一定义
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

// 初始化UniCloud云服务
if (typeof uniCloud !== 'undefined') {
  console.log('正在初始化UniCloud阿里云服务...');
  
  try {
    // 初始化阿里云
    uniCloud.init({
      provider: 'aliyun', // 服务商，使用阿里云
      spaceId, // 服务空间ID
      clientSecret: '6YQCnJGxPGKuluPbkDTiyg==', // 服务空间客户端密钥
      endpoint: 'https://api.next.bspapp.com', // 阿里云服务空间地址
    });
    

    // 测试云函数连接
    uniCloud.callFunction({
      name: 'yuekeCloudTest',
      data: { 
        message: '测试UniCloud阿里云',
        testMode: 'basic'
      }
    }).then(res => {
      console.log('云函数测试成功:', res.result);
    }).catch(err => {
      console.error('云函数测试失败:', err);
      // 如果云函数调用失败，使用模拟数据
      console.log('使用模拟数据代替云函数响应');
    });
  } catch (error) {
    console.error('UniCloud初始化失败:', error);
  }
} else {
  console.warn('uniCloud不可用');
}

const app = new Vue({
    ...App
})
app.$mount()