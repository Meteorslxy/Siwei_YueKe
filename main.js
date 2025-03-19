import Vue from 'vue'
import App from './App'

// 全局组件注册
import './components/global.js'

// 引入API接口
import api from './api/index.js'
Vue.prototype.$api = api

Vue.config.productionTip = false

App.mpType = 'app'

// 云服务空间ID - 全局唯一定义 (UniCloud)
const spaceId = 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29' // UniCloud阿里云空间ID
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

// 开发调试辅助：默认尝试使用真实数据
Vue.prototype.$isDevMode = false; // 默认尝试使用真实数据，仅在云函数不可用时会自动切换为true

// 初始化UniCloud云服务
if (uni.cloud) {
    console.log('正在初始化UniCloud阿里云服务...');

    // 初始化uniCloud
    uni.cloud.init({
        provider: 'aliyun', // 服务商，切换为阿里云
        spaceId, // 服务空间ID
        clientSecret: '', // 阿里云不需要填写secret
        endpoint: 'https://api.next.bspapp.com', // 阿里云服务空间地址
    });

    // 测试云环境连接
    uni.cloud.callFunction({
        name: 'test',
        data: {
            message: '测试UniCloud阿里云'
        }
    }).then(res => {
        console.log('云函数测试成功:', res.result);
        Vue.prototype.$isDevMode = false; // 测试成功后可以使用真实数据
    }).catch(err => {
        console.error('云函数测试失败:', err);
        console.warn('将使用模拟数据');
        Vue.prototype.$isDevMode = true; // 测试失败后使用模拟数据

        // 提示用户需要创建云服务空间
        uni.showModal({
            title: 'UniCloud配置错误',
            content: '请确保已在HBuilderX中创建阿里云服务空间，并将空间ID更新到main.js中的spaceId变量',
            showCancel: false
        });
    });
}

// 测试云函数连接方法
Vue.prototype.$testConnection = async function() {
    try {
        console.log('正在测试阿里云函数连接...');
        const result = await uni.cloud.callFunction({
            name: 'test',
            data: {
                message: '来自前端的测试消息 - ' + new Date().toLocaleString()
            }
        });

        console.log('云函数测试结果:', result);

        if (result.result && result.result.code === 0) {
            uni.showToast({
                title: '云函数连接成功',
                icon: 'success'
            });
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
        throw error;
    }
};

const app = new Vue({
    ...App
})
app.$mount()