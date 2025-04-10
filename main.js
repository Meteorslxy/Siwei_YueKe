import Vue from 'vue'
import App from './App'

// 引入uni-id-pages
import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js'

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

// 引入云服务配置
import { cloudConfig, initCloudService } from './utils/cloud-config.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$spaceId = spaceId

// 添加全局数据对象 - 确保在小程序环境中可以通过getApp()访问
if (!App.globalData) {
    App.globalData = {};
}
App.globalData.$spaceId = spaceId;
// 设置全局测试模式变量为false，关闭测试模式
App.globalData.$isDevMode = false;

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

// 初始化云服务
const cloudInitResult = initCloudService();
console.log('云服务初始化结果:', cloudInitResult);

// 测试云函数连接
// #ifdef MP-WEIXIN
if (cloudInitResult) {
  setTimeout(() => {
    console.log('测试云函数连接...');
    const cloudObj = typeof uniCloud !== 'undefined' ? uniCloud : uni.cloud;
    cloudObj.callFunction({
      name: 'yuekeCloudTest',
      data: { message: '连接测试' }
    }).then(res => {
      console.log('云服务连接测试成功:', res.result);
    }).catch(err => {
      console.error('云服务连接测试失败:', err);
    });
  }, 2000);
}
// #endif

// 添加页面跳转的错误处理
uni.addInterceptor('navigateTo', {
  fail(err) {
    console.error('页面跳转错误:', err);
  }
});

const app = new Vue({
    ...App
})
app.$mount()