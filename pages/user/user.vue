<template>
  <view class="user-container">
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="user-bg">
        <!-- 使用箭头字符代替 < 符号 -->
        <view class="back-button" @click="goBack">
          <text>←</text>
        </view>
        <!-- 添加刷新按钮 -->
        <view class="refresh-button" @click="reload">
          <text>⟳</text>
        </view>
      </view>
      <view class="user-info">
        <view class="avatar-wrap">
          <image 
            class="user-avatar" 
            :src="userInfo.avatarUrl || '/static/images/avatar.jpg'" 
            mode="aspectFill"
          ></image>
        </view>
        <view class="user-detail">
          <text v-if="hasUserInfo" class="user-name">{{getUserDisplayName()}}</text>
          <button v-else class="login-btn" @click="getUserProfile">点击登录</button>
        </view>
      </view>
    </view>
    
    <!-- 当没有内容时的重新加载提示 -->
    <view class="reload-container" v-if="!hasContent">
      <image src="/static/images/empty.png" mode="aspectFit"></image>
      <text>内容加载失败</text>
      <button class="reload-btn" @click="reload">点击重新加载</button>
    </view>
    
    <!-- 用户菜单 -->
    <view class="menu-section" v-else>
      <!-- 订单管理 -->
      <view class="menu-group">
        <view class="menu-title">
          预约记录
          <text class="refresh-link" @click="refreshBookingCount">刷新</text>
        </view>
        <view class="menu-content">
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=all')">
            <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/all.png" mode="aspectFit" @error="handleImageError"></image>
            <text class="item-text">全部</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=usable')">
            <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/use.png" mode="aspectFit" @error="handleImageError"></image>
            <text class="item-text">可使用</text>
            <text v-if="bookingCounts.usable > 0" class="item-badge">{{bookingCounts.usable}}</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=expired')">
            <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/out.png" mode="aspectFit" @error="handleImageError"></image>
            <text class="item-text">已过期</text>
          </view>
          <view class="menu-item" @click="navigateTo('/pages/user/booking?status=canceled')">
            <image class="item-icon-img" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/my/cancal.png" mode="aspectFit" @error="handleImageError"></image>
            <text class="item-text">已取消</text>
          </view>
        </view>
      </view>
      
      <!-- 我的服务 -->
      <view class="menu-group">
        <view class="menu-title">我的服务</view>
        <view class="menu-list">
          <view class="menu-list-item" @click="navigateTo('/pages/user/favorite/index')">
            <text class="list-icon iconfont icon-favorite"></text>
            <text class="list-text">我的收藏</text>
            <text class="list-arrow">></text>
          </view>
          <view class="menu-list-item" @click="openFeedback">
            <text class="list-icon iconfont icon-feedback"></text>
            <text class="list-text">意见反馈</text>
            <text class="list-arrow">></text>
          </view>
          <view class="menu-list-item" @click="navigateTo('/pages/user/about/index')">
            <text class="list-icon iconfont icon-about"></text>
            <text class="list-text">关于我们</text>
            <text class="list-arrow">></text>
          </view>
          <view class="menu-list-item" @click="navigateTo('/pages/user/setting/index')">
            <text class="list-icon iconfont icon-setting"></text>
            <text class="list-text">设置</text>
            <text class="list-arrow">></text>
          </view>
          <!-- 图片上传 -->
          <!-- <view class="menu-list-item" @click="navigateTo('/pages/user/upload-image')">
            <text class="list-icon iconfont icon-upload"></text>
            <text class="list-text">图片上传</text>
            <text class="list-arrow">></text>
          </view> -->
        </view>
      </view>
      
      <!-- 测试功能区域 -->
      <view class="menu-group" v-if="isDev">
        <view class="menu-title">测试功能</view>
        <view class="menu-list">
          <view class="menu-list-item test-btn" @click="testUniIdPages('login')">
            <text class="list-icon iconfont icon-user"></text>
            <text class="list-text">测试统一登录</text>
            <text class="list-arrow">></text>
          </view>
          <view class="menu-list-item test-btn" @click="testUniIdPages('register')">
            <text class="list-icon iconfont icon-user"></text>
            <text class="list-text">测试统一注册</text>
            <text class="list-arrow">></text>
          </view>
          <view class="menu-list-item test-btn" @click="testUniIdPages('profile')">
            <text class="list-icon iconfont icon-user"></text>
            <text class="list-text">测试个人资料</text>
            <text class="list-arrow">></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录 (放在页面底部) -->
    <view class="bottom-area">
      <!-- 退出登录按钮 -->
      <view v-if="hasUserInfo" class="logout-btn" @click="logout">退出登录</view>
      
      <!-- 安全区域 -->
      <view class="safe-area-bottom"></view>
    </view>

    <!-- 添加学生姓名设置弹窗 -->
    <student-name-modal ref="studentNameModal"></student-name-modal>
  </view>
</template>

<script>
// 导入uni-id-pages的store
import { store as uniIdPagesStore, mutations as uniIdPagesMutations } from '@/uni_modules/uni-id-pages/common/store.js';
// 导入学生姓名设置弹窗组件
import StudentNameModal from '@/components/common/student-name-modal.vue'

export default {
  components: {
    // 添加学生姓名设置弹窗组件
    StudentNameModal
  },
  data() {
    return {
      userInfo: {},
      hasUserInfo: false,
      bookingCounts: {
        usable: 0,
        expired: 0,
        canceled: 0
      },
      isDev: false, // 是否为开发环境
      hasContent: false, // 是否存在内容
      verboseLogging: false, // 是否显示详细日志
      // 添加防止重复更新的标记
      isUpdatingUserInfo: false,
      lastUserUpdateTime: 0
    }
  },
  onLoad() {
    // 获取全局变量
    this.isDev = getApp().globalData.$isDevMode
    
    // 清理不完整的登录状态
    this.checkAndCleanupIncompleteLogin()
    
    // 获取当前用户信息
    this.loadUserInfo()
    
    // 获取我的预约数
    this.getBookingCount()
    
    // 监听登录事件
    uni.$on('user:login', (userData) => {
      console.log('接收到user:login事件，刷新用户信息:', userData)
      this.loadUserInfo()
    })
    
    // 添加对login:success事件的监听
    uni.$on('login:success', (userData) => {
      console.log('接收到login:success事件，刷新用户信息:', userData)
      this.loadUserInfo()
    })
    
    // 添加对uni-id-pages-login-success事件的监听
    uni.$on('uni-id-pages-login-success', () => {
      console.log('接收到uni-id-pages-login-success事件，刷新用户信息')
      this.loadUserInfo()
    })
    
    // 监听显示学生姓名设置弹窗事件
    uni.$on('show:student-name-modal', () => {
      console.log('接收到show:student-name-modal事件，显示学生姓名设置弹窗');
      this.showStudentNameModal();
    })
  },
  onUnload() {
    // 取消监听登录事件
    uni.$off('user:login')
    uni.$off('login:success')
    uni.$off('uni-id-pages-login-success')
    // 取消监听显示学生姓名设置弹窗事件
    uni.$off('show:student-name-modal')
  },
  onShow() {
    // 每次页面显示时重新获取用户信息，解决登录后跳转但不显示用户信息的问题
    this.loadUserInfo()
    
    // 确保获取uni-id-token，可能uni-id-pages组件登录后没有保存userInfo但保存了token
    const token = uni.getStorageSync('uni_id_token')
    const tokenExpired = uni.getStorageSync('uni_id_token_expired')
    
    // 减少不必要的日志输出
    if (this.isDev) {
      console.log('当前uni_id_token状态:', !!token, '过期时间:', tokenExpired)
    }
    
    if (token && tokenExpired && new Date(tokenExpired).getTime() > Date.now() && !this.hasUserInfo) {
      if (this.isDev) console.log('发现有效的uni_id_token，但可能没有用户信息，尝试获取')
      this.fetchUserInfoByToken()
    }
    
    // 每次打开页面都重新获取预约数量
    this.fetchBookingCounts()
    
    // 检查是否有内容显示
    setTimeout(() => {
      this.checkContent()
    }, 500)
    
    // 延迟检查用户手机绑定状态，确保在用户信息完全加载后
    setTimeout(() => {
      if (this.hasUserInfo && this.userInfo && this.userInfo._id) {
        console.log('页面显示时检查手机绑定状态');
        // 获取App实例，调用其checkMobileBindingStatus方法
        const app = getApp();
        if (app && app.checkMobileBindingStatus) {
          app.checkMobileBindingStatus(this.userInfo);
        } else {
          console.error('无法获取App实例或checkMobileBindingStatus方法不存在');
        }
      } else {
        console.log('用户未登录，无需检查手机绑定状态');
      }
    }, 1000);
    
    // 检查是否需要打开个人资料
    if (getApp().globalData.openUserProfile) {
      // 清除标记
      getApp().globalData.openUserProfile = false
      
      // 延迟执行，确保页面已经加载完成
      setTimeout(() => {
        if (this.hasUserInfo) {
          this.testUniIdPages('profile')
        } else {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
        }
      }, 800)
    }
    
    // 检查是否需要打开注册页面
    if (getApp().globalData.openUserRegister) {
      // 清除标记
      getApp().globalData.openUserRegister = false
      
      // 延迟执行，确保页面已经加载完成
      setTimeout(() => {
        this.testUniIdPages('register')
      }, 800)
    }

    // 检查是否需要显示学生姓名设置弹窗
    this.checkAndShowStudentNameModal();
  },
  mounted() {
    // 加载用户信息
    this.loadUserInfo();
    
    console.log('user.vue 页面已挂载，开始加载数据');
    console.log('是否有用户信息:', this.hasUserInfo);
    console.log('用户信息:', JSON.stringify(this.userInfo));
    
    // 立即同步用户信息到uni-id-pages组件
    this.syncUserInfoToUniIdPages();
    
    // 查询预约数量
    this.getBookingCount();
    
    // 获取用户可兑换优惠券列表
    this.getUserCoupons();
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          // 如果没有上一页，则返回首页
          uni.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    },
    // 检查并清理不完整的登录状态
    checkAndCleanupIncompleteLogin() {
      console.log('检查登录状态完整性')
      const token = uni.getStorageSync('uni_id_token')
      const tokenExpired = uni.getStorageSync('uni_id_token_expired')
      const uniIdPagesUserInfo = uni.getStorageSync('uni-id-pages-userInfo')
      const userInfo = uni.getStorageSync('userInfo')
      
      // 检查有无token但没有用户信息的情况
      if (token && tokenExpired && new Date(tokenExpired).getTime() > Date.now()) {
        // 有token但没有用户信息，需要获取用户信息
        if (!uniIdPagesUserInfo || Object.keys(uniIdPagesUserInfo).length === 0) {
          console.log('发现有token但没有用户信息，将尝试获取用户信息')
          this.fetchUserInfoByToken()
        }
      }
      
      // 检查有没有过期token的情况
      if (token && tokenExpired && new Date(tokenExpired).getTime() <= Date.now()) {
        console.log('发现已过期token，将清除登录状态')
        this.cleanupStorage()
      }
      
      // 检查uni-id-pages和应用自定义的用户信息同步情况
      if (uniIdPagesUserInfo && Object.keys(uniIdPagesUserInfo).length > 0) {
        if (!userInfo || Object.keys(userInfo).length === 0) {
          console.log('同步uni-id-pages用户信息到自定义存储')
          uni.setStorageSync('userInfo', uniIdPagesUserInfo)
        }
      }
      
      // 检查自定义和uni-id-pages的用户信息同步情况
      if (userInfo && Object.keys(userInfo).length > 0) {
        if (!uniIdPagesUserInfo || Object.keys(uniIdPagesUserInfo).length === 0) {
          console.log('同步自定义用户信息到uni-id-pages存储')
          uni.setStorageSync('uni-id-pages-userInfo', userInfo)
        }
      }
    },
    
    // 清理缓存的方法
    cleanupStorage() {
      uni.removeStorageSync('uni_id_token')
      uni.removeStorageSync('uni_id_token_expired')
      uni.removeStorageSync('uni-id-pages-userInfo')
      uni.removeStorageSync('userInfo')
      this.userInfo = {}
      this.hasUserInfo = false
    },
    
    // 获取当前用户信息
    async loadUserInfo() {
      // 加载用户信息前先检查标记，避免短时间内多次加载
      const now = Date.now();
      if (this.isUpdatingUserInfo && now - this.lastUserUpdateTime < 5000) {
        console.log('上次更新用户信息时间太近，跳过此次更新');
        return;
      }
      
      this.isUpdatingUserInfo = true;
      this.lastUserUpdateTime = now;
      
      try {
        console.log('加载用户信息...');
        
        // 优先从本地存储获取用户信息
        const userInfo = uni.getStorageSync('uni-id-pages-userInfo') || uni.getStorageSync('userInfo') || {};
        
        // 检查用户ID
        if (userInfo && (userInfo._id || userInfo.uid)) {
          console.log('从本地存储中加载到用户信息:', userInfo.nickname || userInfo.nickName || userInfo.username || userInfo._id);
          
          // 更新组件的用户信息
          this.userInfo = userInfo;
          this.hasUserInfo = true;
          this.hasContent = true;
          
          // 检查是否为首次登录（无学生姓名）并需要弹窗
          const hasSetStudentName = uni.getStorageSync('hasSetStudentName');
          const nickname = userInfo.nickname || userInfo.nickName;
          
          // 检测是否是自动生成的昵称
          const isAutoGeneratedNickname = nickname && 
              (nickname.startsWith('用户') || 
               nickname === '微信用户' ||
               /^用户\d{4}$/.test(nickname)); // 增加正则匹配"用户"后跟4位数字的模式
          
          // 如果用户有自动生成的昵称，清除已设置标记，确保弹窗显示
          if (isAutoGeneratedNickname) {
            console.log('检测到自动生成的默认昵称:', nickname);
            console.log('需要用户设置真实姓名，将尝试显示学生姓名设置弹窗');
            uni.removeStorageSync('hasSetStudentName');
            
            // 延迟调用App中的方法进行设置
            setTimeout(() => {
              try {
                // 获取App实例
                const app = getApp();
                if (app && app.checkStudentNameStatus) {
                  app.checkStudentNameStatus(userInfo, true);
                } else {
                  // 如果无法获取App实例，直接显示弹窗
                  this.showStudentNameModal();
                }
              } catch (e) {
                console.error('调用学生姓名检查方法失败:', e);
                // 直接显示弹窗
                this.showStudentNameModal();
              }
            }, 500);
            return;
          }
          
          // 如果用户已设置昵称或已标记过，则不显示弹窗
          if (hasSetStudentName || (nickname && nickname.trim() !== '' && !isAutoGeneratedNickname)) {
            // 确保hasSetStudentName标记已设置，但必须不是自动生成的昵称
            if (!hasSetStudentName && nickname && !isAutoGeneratedNickname) {
              console.log('用户已有有效昵称但未标记，自动设置hasSetStudentName标记');
              uni.setStorageSync('hasSetStudentName', true);
            } else if (isAutoGeneratedNickname && hasSetStudentName) {
              // 如果是自动生成的昵称但已标记为设置过，清除标记
              console.log('检测到自动生成的昵称但已标记为设置过，清除标记');
              uni.removeStorageSync('hasSetStudentName');
              // 延迟显示弹窗
              setTimeout(() => {
                this.showStudentNameModal();
              }, 500);
            }
          } else {
            console.log('检测到用户未设置学生姓名，将显示学生姓名设置弹窗');
            setTimeout(() => {
              this.showStudentNameModal();
            }, 500);
          }
          
          // 同步更新全局状态的用户信息
          if (getApp().globalData) {
            getApp().globalData.userInfo = userInfo;
          }
          
          // 同步更新uni-id-pages的store
          if (uniIdPagesStore && typeof uniIdPagesStore === 'object') {
            uniIdPagesStore.userInfo = userInfo;
            uniIdPagesStore.hasLogin = true;
          }
          
          // 立即从服务器获取最新的用户信息（包括nickname）
          this.fetchCompleteUserInfo(userInfo._id || userInfo.uid);
        } else {
          console.log('本地存储中没有有效的用户信息');
          
          // 尝试从uniId页面获取
          if (uniIdPagesStore && uniIdPagesStore.hasLogin && uniIdPagesStore.userInfo) {
            console.log('从uni-id-pages的store中获取用户信息');
            this.userInfo = uniIdPagesStore.userInfo;
            this.hasUserInfo = true;
            this.hasContent = true;
            
            // 同步到全局状态
            if (getApp().globalData) {
              getApp().globalData.userInfo = uniIdPagesStore.userInfo;
            }
            
            // 同步到本地存储
            uni.setStorageSync('userInfo', uniIdPagesStore.userInfo);
            uni.setStorageSync('uni-id-pages-userInfo', uniIdPagesStore.userInfo);
            
            // 从服务器获取最新的用户信息（包括nickname）
            this.fetchCompleteUserInfo(uniIdPagesStore.userInfo._id || uniIdPagesStore.userInfo.uid);
          } else {
            // 都没有，则清空用户信息
            this.userInfo = {};
            this.hasUserInfo = false;
            
            // 仍然显示基本内容
            this.hasContent = true;
          }
        }
      } catch (e) {
        console.error('加载用户信息错误:', e);
        // 发生错误时，确保basic content仍然可见
        this.hasContent = true;
      } finally {
        this.isUpdatingUserInfo = false;
        
        // 确认是否显示内容
        setTimeout(() => {
          if (!this.hasContent) {
            this.hasContent = true;
          }
          console.log('内容检查结果:', this.hasContent, '用户信息状态:', this.hasUserInfo);
        }, 300);
      }
    },
    
    // 格式化用户信息
    formatUserInfo(userInfo) {
      if (!userInfo) return {};
      
      // 创建新对象，避免直接修改原对象
      const formattedInfo = {...userInfo};
      
      // 调试日志，仅在verboseLogging为true时输出
      if (this.verboseLogging) {
        console.log('原始用户信息:', JSON.stringify(userInfo));
      }
      
      // 直接从数据库查询完整用户信息
      this.fetchCompleteUserInfo(formattedInfo._id || formattedInfo.uid);
      
      // 检查是否有空字符串的_id和uid
      if (formattedInfo._id === "") {
        // 尝试从用户信息的其他字段中找到有效值
        formattedInfo._id = formattedInfo.uid || '';
      }
      
      if (formattedInfo.uid === "") {
        formattedInfo.uid = formattedInfo._id || '';
      }
      
      // 检查userInfo嵌套结构，uni-id-co有时会返回嵌套结构
      if (formattedInfo.userInfo && typeof formattedInfo.userInfo === 'object') {
        if (this.verboseLogging) console.log('发现嵌套的userInfo结构，提取内部数据');
        Object.keys(formattedInfo.userInfo).forEach(key => {
          if (!formattedInfo[key] && formattedInfo.userInfo[key]) {
            formattedInfo[key] = formattedInfo.userInfo[key];
          }
        });
      }
      
      // 优先使用nickname字段，uni-id中的昵称字段是nickname
      if (formattedInfo.nickname) {
        formattedInfo.nickName = formattedInfo.nickname;
        if (this.verboseLogging) console.log('使用nickname字段:', formattedInfo.nickname);
      } 
      // 如果没有nickname，尝试使用username
      else if (formattedInfo.username) {
        formattedInfo.nickName = formattedInfo.username;
        if (this.verboseLogging) console.log('使用username字段:', formattedInfo.username);
      }
      // 仅当nickname和username都不存在时才使用自动生成的默认用户名
      else {
        // 如果有手机号，使用手机号生成昵称
        if (formattedInfo.phoneNumber || formattedInfo.mobile) {
          const phone = formattedInfo.phoneNumber || formattedInfo.mobile;
          formattedInfo.nickName = '用户' + phone.substr(phone.length - 4);
          if (this.verboseLogging) console.log('使用手机号生成昵称');
        } else if (formattedInfo._id && formattedInfo._id.length > 4) {
          // 使用用户ID后四位
          formattedInfo.nickName = '用户' + formattedInfo._id.substr(-4);
          if (this.verboseLogging) console.log('使用ID生成昵称');
        } else if (formattedInfo.uid && formattedInfo.uid.length > 4) {
          // 使用uid后四位
          formattedInfo.nickName = '用户' + formattedInfo.uid.substr(-4);
          if (this.verboseLogging) console.log('使用UID生成昵称');
        } else {
          // 最后的备选
          formattedInfo.nickName = '未知用户';
          if (this.verboseLogging) console.log('使用默认昵称: 未知用户');
        }
      }
      
      // 处理头像路径，兼容avatar和avatarUrl两种字段名
      if (!formattedInfo.avatarUrl && formattedInfo.avatar) {
        formattedInfo.avatarUrl = formattedInfo.avatar;
      }
      
      // 处理avatar_file字段
      if (!formattedInfo.avatarUrl && formattedInfo.avatar_file) {
        if (typeof formattedInfo.avatar_file === 'object' && formattedInfo.avatar_file.url) {
          formattedInfo.avatarUrl = formattedInfo.avatar_file.url;
        } else if (typeof formattedInfo.avatar_file === 'string') {
          formattedInfo.avatarUrl = formattedInfo.avatar_file;
        }
      }
      
      // 确保有默认头像
      if (!formattedInfo.avatarUrl) {
        formattedInfo.avatarUrl = '/static/images/avatar.jpg';
      }
      
      // 确保userId字段，兼容多种可能的ID字段名
      if (!formattedInfo.userId) {
        formattedInfo.userId = formattedInfo._id || formattedInfo.uid || '';
      }
      
      console.log('格式化后的用户信息:', JSON.stringify(formattedInfo));
      return formattedInfo;
    },

    // 从数据库获取完整用户信息
    async fetchCompleteUserInfo(userId) {
      if (!userId) return;
      
      if (this.isDev) console.log('正在从数据库获取完整用户信息, ID:', userId);
      
      try {
        // 获取token
        const token = uni.getStorageSync('uni_id_token');
        if (!token) {
          if (this.isDev) console.log('未找到有效token，无法获取用户信息');
          return;
        }
        
        // 直接调用云函数获取完整用户信息，不在客户端使用uniIdCo.checkToken
        const result = await uniCloud.callFunction({
          name: 'getUserInfoByToken',
          data: { 
            uniIdToken: token,
            forceRefresh: true, // 强制从数据库刷新
            userId: userId     // 额外传递userId参数确保获取正确的用户
          }
        });
        
        if (this.verboseLogging) console.log('从云函数获取用户信息结果:', result);
        
        if (result.result && result.result.code === 0 && result.result.userInfo) {
          const dbUserInfo = result.result.userInfo;
          if (this.isDev) console.log('从数据库获取到完整用户信息:', dbUserInfo);
          
          // 根据实际服务器数据检查昵称字段
          if (dbUserInfo && (!dbUserInfo.nickname || dbUserInfo.nickname.startsWith('用户'))) {
            // 如果数据库里的昵称也是自动生成的，查询其他可用的信息
            if (this.isDev) console.log('数据库中的昵称也是自动生成的，查看用户其他信息');
            
            // 可以在这里查询数据库中的其他用户信息字段
            // ...
          } else {
            // 更新本地存储的用户信息
            this.updateUserInfoWithDBData(dbUserInfo);
          }
        }
      } catch (err) {
        console.error('获取完整用户信息失败:', err);
      }
    },
    
    // 使用数据库信息更新用户信息
    updateUserInfoWithDBData(dbUserInfo) {
      if (!dbUserInfo || !dbUserInfo._id) return;
      
      console.log('使用数据库信息更新用户信息', dbUserInfo);
      
      // 从存储获取当前用户信息
      let currentUserInfo;
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        currentUserInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
      } catch (e) {
        console.error('解析用户信息失败:', e);
        currentUserInfo = {};
      }
      
      // 记录是否有重大变化需要刷新UI
      let needRefreshUI = false;
      
      // 检查昵称是否有变化
      if (dbUserInfo.nickname && dbUserInfo.nickname !== currentUserInfo.nickname) {
        console.log('检测到昵称变化，旧值:', currentUserInfo.nickname, '新值:', dbUserInfo.nickname);
        needRefreshUI = true;
      }
      
      // 合并数据库信息和当前信息
      const mergedInfo = {
        ...currentUserInfo,
        _id: dbUserInfo._id || currentUserInfo._id || '',
        uid: dbUserInfo._id || currentUserInfo.uid || '',
        nickname: dbUserInfo.nickname || currentUserInfo.nickname || '',
        username: dbUserInfo.username || currentUserInfo.username || '',
        mobile: dbUserInfo.mobile || currentUserInfo.mobile || '',
        email: dbUserInfo.email || currentUserInfo.email || '',
        avatar: dbUserInfo.avatar || currentUserInfo.avatar || '',
        avatar_file: dbUserInfo.avatar_file || currentUserInfo.avatar_file || ''
      };
      
      // 确保nickName字段同步
      mergedInfo.nickName = mergedInfo.nickname || mergedInfo.nickName;
      
      // 确保avatarUrl字段同步
      if (dbUserInfo.avatar) {
        mergedInfo.avatarUrl = dbUserInfo.avatar;
      } else if (dbUserInfo.avatar_file) {
        if (typeof dbUserInfo.avatar_file === 'object' && dbUserInfo.avatar_file.url) {
          mergedInfo.avatarUrl = dbUserInfo.avatar_file.url;
        } else if (typeof dbUserInfo.avatar_file === 'string') {
          mergedInfo.avatarUrl = dbUserInfo.avatar_file;
        }
      }
      
      // 确保userId字段
      mergedInfo.userId = mergedInfo._id || mergedInfo.uid || '';
      
      console.log('合并后的用户信息:', mergedInfo);
      
      // 保存到存储
      uni.setStorageSync('userInfo', mergedInfo);
      uni.setStorageSync('uni-id-pages-userInfo', mergedInfo);
      
      // 更新组件数据
      this.userInfo = mergedInfo;
      this.hasUserInfo = true;
      
      // 如果检测到重大变化，强制刷新UI
      if (needRefreshUI) {
        this.$forceUpdate();
        console.log('用户信息有重大变化，已强制刷新UI');
      }
      
      // 触发更新事件
      uni.$emit('user:updated', mergedInfo);
      
      // 同步更新到uni-id-pages组件的store
      try {
        // 使用导入的uni-id-pages store和mutations
        if (uniIdPagesMutations && uniIdPagesMutations.setUserInfo) {
          console.log('使用导入的uniIdPagesMutations同步用户信息');
          uniIdPagesMutations.setUserInfo(mergedInfo, {cover: true});
          
          // 检查同步是否成功
          if (uniIdPagesStore && uniIdPagesStore.userInfo && uniIdPagesStore.userInfo._id === mergedInfo._id) {
            console.log('用户信息同步成功');
          } else {
            console.warn('同步可能不完整，store中的用户ID:', 
                         uniIdPagesStore && uniIdPagesStore.userInfo ? uniIdPagesStore.userInfo._id : 'undefined');
          }
        } else {
          console.warn('找不到uniIdPagesMutations.setUserInfo方法, 尝试备用方案');
          
          // 备用方案：尝试直接使用全局变量
          if (getApp().globalData) {
            console.log('使用globalData存储用户信息');
            getApp().globalData.currentUserInfo = mergedInfo;
          }
        }
      } catch (error) {
        console.error('同步用户信息到uni-id-pages失败:', error);
      }
      
      console.log('用户信息已更新');
      
      // 获取预约数量
      this.fetchBookingCounts();
      
      if (this.isDev) console.log('完整用户信息保存成功');
      
      // 延迟检查用户手机绑定状态
      setTimeout(() => {
        // 获取App实例调用检查方法
        const app = getApp();
        if (app && app.checkMobileBindingStatus) {
          console.log('检查用户手机绑定状态');
          app.checkMobileBindingStatus(mergedInfo);
        }
      }, 1000);
    },
    
    // 获取预约数量
    async getBookingCount() {
      if (!this.hasUserInfo) {
        console.log('未登录，无法获取预约数量');
        return;
      }
      
      console.log('正在获取预约统计');
      
      try {
        const userInfo = this.userInfo;
        const userId = userInfo.userId || userInfo._id || '';
        
        if (!userId) {
          console.log('无法获取用户ID，跳过获取预约统计');
          return;
        }
        
        console.log('获取预约统计，用户ID:', userId);
        
        // 直接调用云函数获取预约统计
        const res = await uniCloud.callFunction({
          name: 'getBookingCounts', 
          data: {
            userId
          }
        });
        
        console.log('获取预约统计结果:', res);
        
        if (res && res.result && res.result.code === 0 && res.result.data) {
          const counts = res.result.data.counts || {};
          // 更新预约计数
          this.bookingCounts = {
            usable: (counts.pending || 0) + (counts.confirmed_unpaid || 0) + (counts.confirmed || 0),
            expired: counts.finished || 0,
            canceled: counts.cancelled || 0
          };
          
          console.log('预约计数已更新:', this.bookingCounts);
          
          // 如果有未完成预约，添加红点提示
          if (this.bookingCounts.usable > 0) {
            uni.showTabBarRedDot({
              index: 2
            });
          }
          
          // 同时更新bookingStats（如果页面上有使用）
          this.bookingStats = {
            total: counts.all || 0,
            pending: counts.pending || 0,
            confirmed: counts.confirmed || 0,
            finished: counts.finished || 0,
            cancelled: counts.cancelled || 0
          };
        } else {
          console.warn('获取预约统计失败:', res);
        }
      } catch (error) {
        console.error('获取预约统计出错:', error);
      }
    },
    
    // 获取预约数量
    async fetchBookingCounts() {
      // 返回Promise以便于外部调用时使用then/catch
      return new Promise(async (resolve, reject) => {
        try {
          // 确保用户已登录
          if (!this.hasUserInfo || !this.userInfo || !this.userInfo.userId) {
            console.log('用户未登录或没有userId，跳过获取预约数量');
            return resolve();
          }
          
          console.log('正在获取预约数量，用户ID:', this.userInfo.userId);
          
          // 使用API接口获取预约数量
          const res = await uniCloud.callFunction({
            name: 'getBookingCounts',
            data: {
              userId: this.userInfo.userId || this.userInfo._id || ''
            }
          });
          
          console.log('获取预约数量响应:', res);
          
          if (res && res.result && res.result.code === 0 && res.result.data) {
            // 获取counts下的数据
            const counts = res.result.data.counts || {};
            console.log('预约数量详情:', counts);
            
            // 修复"可使用"预约数量计算，确保与预约列表页显示一致
            this.bookingCounts = {
              usable: (counts.pending || 0) + (counts.confirmed_unpaid || 0) + (counts.confirmed || 0),
              expired: counts.finished || 0,
              canceled: counts.cancelled || 0
            };
            
            // 添加额外调试信息
            console.log('计算后的预约数量:', JSON.stringify(this.bookingCounts));
            console.log('可使用数量:', this.bookingCounts.usable);
            
            // 如果用户有未完成的预约，在tabBar上添加红点提示
            if (this.bookingCounts.usable > 0) {
              console.log('添加红点提示，未处理预约数:', this.bookingCounts.usable);
              uni.showTabBarRedDot({
                index: 2 // 假设"我的"页面是第三个tabBar页面（索引从0开始）
              });
            } else {
              uni.hideTabBarRedDot({
                index: 2
              });
            }
            
            resolve(this.bookingCounts);
          } else {
            console.warn('获取预约数量失败或返回数据格式不符合预期:', res);
            this.bookingCounts = {
              usable: 0,
              expired: 0,
              canceled: 0
            };
            resolve(this.bookingCounts);
          }
        } catch (e) {
          console.error('获取预约数量出错:', e);
          // 出错时仍然显示默认值
          this.bookingCounts = {
            usable: 0,
            expired: 0,
            canceled: 0
          };
          reject(e);
        }
      });
    },
    
    // 页面跳转
    navigateTo(url) {
      // 替换status=usable为status=confirmed,pending的组合查询
      if (url.includes('status=usable')) {
        url = url.replace('status=usable', 'status=usable');
        console.log('修改后的URL:', url);
      }
      
      // 替换status=expired为status=finished
      if (url.includes('status=expired')) {
        url = url.replace('status=expired', 'status=finished');
        console.log('修改后的URL:', url);
      }
      
      // 确保cancelled拼写与服务器一致
      if (url.includes('status=canceled')) {
        url = url.replace('status=canceled', 'status=cancelled');
        console.log('修改后的URL:', url);
      }
      
      uni.navigateTo({
        url: url,
        fail: (err) => {
          console.error('页面跳转错误:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 打开反馈页面
    openFeedback() {
      if (!this.hasUserInfo) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return
      }
      
      // 调用小程序的意见反馈功能
      wx.openEmbeddedMiniProgram({
        appId: 'wx8abaf00ee8c3202e',
        extraData: {
          id: '299971'  // 小程序意见反馈的ID
        }
      })
    },
    
    // 使用token获取用户信息
    async fetchUserInfoByToken() {
      try {
        // 先检查token是否存在
        const token = uni.getStorageSync('uni_id_token');
        if (!token) {
          console.error('token不存在，无法获取用户信息');
          return false;
        }
        
        // 检查token是否过期
        const tokenExpired = uni.getStorageSync('uni_id_token_expired');
        if (tokenExpired) {
          const now = Date.now();
          if (now >= tokenExpired) {
            console.error('token已过期');
            // 清除过期的token
            uni.removeStorageSync('uni_id_token');
            uni.removeStorageSync('uni_id_token_expired');
            return false;
          }
        }
        
        // 使用云函数获取用户信息
        try {
          // 使用login云函数验证token并获取用户信息
          const result = await uniCloud.callFunction({
            name: 'login',
            data: {
              loginType: 'token',
              token: token
            }
          });
          
          if (result.result && result.result.code === 0 && result.result.data) {
            const userInfo = result.result.data;
            console.log('通过云函数获取的用户信息:', userInfo);
            
            // 保存用户信息
            uni.setStorageSync('uni-id-pages-userInfo', userInfo);
            uni.setStorageSync('userInfo', userInfo);
            
            // 更新当前页面状态
            this.userInfo = this.formatUserInfo(userInfo);
            this.hasUserInfo = true;
            
            // 触发登录成功事件
            uni.$emit('user:login', userInfo);
            uni.$emit('login:success', userInfo);
            
            // 获取预约数量
            this.fetchBookingCounts();
            
            return true;
          }
        } catch (cloudError) {
          console.error('通过云函数获取用户信息失败:', cloudError);
        }
        
        // 如果云函数方法失败，尝试使用本地存储中的用户信息
        const userInfo = uni.getStorageSync('userInfo') || uni.getStorageSync('uni-id-pages-userInfo');
        if (userInfo && (userInfo._id || userInfo.uid)) {
          console.log('使用本地存储的用户信息:', userInfo);
          
          // 更新当前页面状态
          this.userInfo = this.formatUserInfo(userInfo);
          this.hasUserInfo = true;
          
          // 获取预约数量
          this.fetchBookingCounts();
          
          return true;
        }
        
        return false;
      } catch (err) {
        console.error('获取用户信息失败:', err);
        return false;
      }
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              console.log('开始执行退出登录流程')
              
              // 获取token
              const token = uni.getStorageSync('uni_id_token')
              if (token) {
                try {
                  // 使用customUI参数创建uniIdCo对象，禁止自动显示错误提示
                  const uniIdCo = uniCloud.importObject('uni-id-co', {
                    customUI: true
                  })
                  await uniIdCo.logout()
                } catch (e) {
                  // 捕获错误但不显示给用户
                  console.log('调用logout云函数失败，错误已被静默处理:', e.message || e)
                }
              }
              
              // 清除缓存 - 更彻底的清理方式
              console.log('清除本地缓存数据')
              uni.removeStorageSync('userInfo')
              uni.removeStorageSync('uni-id-pages-userInfo')
              uni.removeStorageSync('uni_id_token')
              uni.removeStorageSync('uni_id_token_expired')
              
              // 尝试清除其他可能的相关缓存
              try {
                const info = uni.getStorageInfoSync()
                if (info && info.keys) {
                  const userRelatedKeys = info.keys.filter(key => 
                    key.toLowerCase().includes('token') || 
                    key.toLowerCase().includes('user') ||
                    key.toLowerCase().includes('login') ||
                    key.toLowerCase().includes('auth')
                  )
                  userRelatedKeys.forEach(key => {
                    console.log('清除额外缓存:', key)
                    uni.removeStorageSync(key)
                  })
                }
              } catch (storageError) {
                console.log('清除额外缓存时出错:', storageError)
              }
              
              // 重置状态
              this.userInfo = {}
              this.hasUserInfo = false
              this.bookingCounts = {
                usable: 0,
                expired: 0,
                canceled: 0
              }
              
              // 直接引入和修改uni-id-pages的store，确保其也被重置
              try {
                // 引入uni-id-pages的store和mutations
                const { store: uniIdStore, mutations: uniIdMutations } = require('@/uni_modules/uni-id-pages/common/store')
                // 确保store的登录状态被重置
                if (uniIdStore) {
                  uniIdStore.userInfo = {}
                  uniIdStore.hasLogin = false
                }
                
                // 确保App的globalData中的用户信息也被清除
                if (getApp().globalData) {
                  getApp().globalData.userInfo = null
                  getApp().globalData.hasLogin = false
                  getApp().globalData.token = null
                  getApp().globalData.tokenExpired = null
                }
              } catch (e) {
                console.error('重置uni-id-pages store失败:', e)
              }
              
              // 触发登出事件
              uni.$emit('uni-id-pages-logout')
              uni.$emit('user:logout') // 增加自定义事件便于其他组件监听
              
              // 强制清理页面状态，防止页面恢复时自动重新登录
              this.$forceUpdate()
              
              uni.showToast({
                title: '已退出登录',
                icon: 'success'
              })
              
              // 延迟执行页面跳转，确保状态完全清除
              setTimeout(() => {
                // 直接跳转到首页，避免回到可能恢复登录状态的页面
                uni.reLaunch({
                  url: '/pages/index/index',
                  success: () => {
                    console.log('成功跳转至首页')
                    // 执行二次检查，确保登录状态被清除
                    setTimeout(() => {
                      const tokenCheck = uni.getStorageSync('uni_id_token')
                      if (tokenCheck) {
                        console.log('检测到token未完全清除，执行二次清理')
                        uni.removeStorageSync('uni_id_token')
                        uni.removeStorageSync('uni_id_token_expired')
                      }
                    }, 500)
                  }
                })
              }, 300)
            } catch (e) {
              console.error('退出登录过程中出错:', e)
              // 确保清除了登录状态
              uni.removeStorageSync('userInfo')
              uni.removeStorageSync('uni-id-pages-userInfo')
              uni.removeStorageSync('uni_id_token')
              uni.removeStorageSync('uni_id_token_expired')
              
              // 重置状态
              this.userInfo = {}
              this.hasUserInfo = false
              
              uni.showToast({
                title: '已退出登录',
                icon: 'success'
              })
              
              // 强制跳转到首页
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }
          }
        }
      })
    },
    
    // 获取用户信息
    getUserProfile() {
      // 重定向到登录页面
      uni.navigateTo({
        url: '/pages/login/login?redirect=' + encodeURIComponent('/pages/user/user')
      });
    },

    // 测试统一登录
    testUniIdPages(type) {
      // 实现测试统一登录的逻辑
      console.log(`测试uni-id-pages的${type}功能`);
      
      switch (type) {
        case 'login':
          // 先清除当前的用户信息，以便测试登录
          this.userInfo = {}
          this.hasUserInfo = false
          
          // 同样确保清除token，避免干扰测试
          uni.removeStorageSync('uni_id_token')
          uni.removeStorageSync('uni_id_token_expired')
          uni.removeStorageSync('uni-id-pages-userInfo')
          uni.removeStorageSync('userInfo')
          
          // 跳转到不需要密码的登录页
          console.log('比较 /uni_modules/uni-id-pages/pages/login/login-withoutpwd /pages/user/user /uni_modules/uni-id-pages/pages/login/login-withpwd');
          
          // 设置当前页为重定向目标
          const redirectUrl = encodeURIComponent('/pages/user/user');
          
          uni.navigateTo({
            url: `/uni_modules/uni-id-pages/pages/login/login-withoutpwd?uniIdRedirectUrl=${redirectUrl}`
          });
          break;
        case 'register':
          // 先清除当前的用户信息，以便测试注册
          this.userInfo = {}
          this.hasUserInfo = false
          
          // 同样确保清除token，避免干扰测试
          uni.removeStorageSync('uni_id_token')
          uni.removeStorageSync('uni_id_token_expired')
          uni.removeStorageSync('uni-id-pages-userInfo')
          uni.removeStorageSync('userInfo')
          
          // 跳转到注册页
          uni.navigateTo({
            url: '/uni_modules/uni-id-pages/pages/register/register'
          });
          break;
        case 'profile':
          // 跳转到个人资料页而不清除用户信息
          this.toUserProfile();
          break;
        default:
          uni.showToast({
            title: '功能开发中',
            icon: 'none'
          });
      }
    },

    // 获取用户显示名称
    getUserDisplayName() {
      // 始终优先使用nickname字段，这是uni-id中存储的真实昵称
      if (this.userInfo.nickname) {
        return this.userInfo.nickname;
      } 
      // 其次使用nickName字段
      else if (this.userInfo.nickName && !this.userInfo.nickName.startsWith('用户')) {
        return this.userInfo.nickName;
      } 
      // 再次尝试使用username
      else if (this.userInfo.username) {
        return this.userInfo.username;
      } 
      // 最后才使用默认用户名
      else {
        return this.userInfo.userId ? '用户' + this.userInfo.userId.substr(-6) : '未知用户';
      }
    },

    // 同步用户信息到uni-id-pages组件
    syncUserInfoToUniIdPages() {
      try {
        const userInfo = this.userInfo;
        if (!userInfo || !userInfo._id) {
          console.log('没有用户信息可同步');
          return;
        }
        
        // 将当前用户信息也保存到uni-id-pages使用的存储中
        console.log('同步用户信息到uni-id-pages组件');
        uni.setStorageSync('uni-id-pages-userInfo', userInfo);
        
        // 使用导入的uni-id-pages store和mutations
        if (uniIdPagesMutations && uniIdPagesMutations.setUserInfo) {
          console.log('使用导入的uniIdPagesMutations同步用户信息');
          uniIdPagesMutations.setUserInfo(userInfo, {cover: true});
          
          // 检查同步是否成功
          if (uniIdPagesStore && uniIdPagesStore.userInfo && uniIdPagesStore.userInfo._id === userInfo._id) {
            console.log('用户信息同步成功');
          } else {
            console.warn('同步可能不完整，store中的用户ID:', 
                         uniIdPagesStore && uniIdPagesStore.userInfo ? uniIdPagesStore.userInfo._id : 'undefined');
          }
        } else {
          console.warn('找不到uniIdPagesMutations.setUserInfo方法, 尝试备用方案');
          
          // 备用方案：尝试直接使用全局变量
          if (getApp().globalData) {
            console.log('使用globalData存储用户信息');
            getApp().globalData.currentUserInfo = userInfo;
          }
        }
        
        // 确保token信息也是同步的
        const token = uni.getStorageSync('uni_id_token');
        const tokenExpired = uni.getStorageSync('uni_id_token_expired');
        
        if (token && tokenExpired) {
          console.log('token信息已存在，不需要更新');
        } else if (userInfo._id) {
          // 如果没有token但有用户信息，可能需要生成临时token
          console.log('用户已登录但没有有效token，尝试重新登录获取token');
          
          // 使用已有的用户信息模拟登录成功
          if (uniIdPagesMutations.loginSuccess) {
            const loginSuccessInfo = {
              userInfo: userInfo
            };
            // 调用loginSuccess可能会触发token更新
            uniIdPagesMutations.loginSuccess(loginSuccessInfo);
            console.log('已触发loginSuccess方法');
          }
        }
      } catch (error) {
        console.error('同步用户信息到uni-id-pages失败:', error);
      }
    },

    // 跳转到个人资料页
    toUserProfile() {
      console.log('跳转到个人资料页面');
      
      // 在跳转前先确保本地有token
      let token = uni.getStorageSync('uni_id_token');
      if (!token) {
        // 尝试生成一个临时token
        try {
          const userId = this.userInfo._id || this.userInfo.userId;
          if (userId) {
            console.log('本地token不存在，生成临时token');
            const timestamp = Date.now();
            const randomPart = Math.random().toString(36).substring(2, 10);
            const newToken = `${userId}_${timestamp}_${randomPart}`;
            const tokenExpired = timestamp + 7 * 24 * 60 * 60 * 1000; // 7天后过期
            
            uni.setStorageSync('uni_id_token', newToken);
            uni.setStorageSync('uni_id_token_expired', tokenExpired);
            console.log('已生成新token以确保个人资料页正常加载');
          }
        } catch (e) {
          console.error('生成临时token失败:', e);
        }
      }
      
      // 跳转到个人资料页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo',
        success: (res) => {
          console.log('成功跳转到个人资料页');
        },
        fail: (err) => {
          console.error('跳转到个人资料页失败:', err);
          // 失败时尝试另一种跳转方式
          setTimeout(() => {
            uni.redirectTo({
              url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo',
              fail: (redirectErr) => {
                console.error('重定向到个人资料页也失败:', redirectErr);
                uni.showToast({
                  title: '页面跳转失败',
                  icon: 'none'
                });
              }
            });
          }, 500);
        }
      });
    },

    // 获取用户可兑换优惠券列表
    getUserCoupons() {
      // 如果没有登录，直接返回
      if (!this.hasUserInfo) return;
      
      console.log('获取用户优惠券列表');
      // 实际获取优惠券的代码可以在此添加
    },

    // 处理图片加载错误
    handleImageError(event) {
      console.error('图片加载错误:', event);
      // 可以添加一些错误处理逻辑，比如显示默认图片或提示用户
    },

    // 重新加载页面
    reload() {
      console.log('重新加载user页面');
      
      // 显示加载中提示
      uni.showLoading({
        title: '加载中...'
      });
      
      // 清除之前的缓存数据
      this.bookingCounts = {
        usable: 0,
        expired: 0,
        canceled: 0
      };
      
      // 重新获取用户信息
      this.loadUserInfo();
      
      // 重新获取预约数量
      this.fetchBookingCounts();
      
      // 强制刷新用户信息同步
      this.syncUserInfoToUniIdPages();
      
      // 2秒后隐藏加载提示
      setTimeout(() => {
        uni.hideLoading();
        
        // 通知用户
        uni.showToast({
          title: '已刷新',
          icon: 'success',
          duration: 1500
        });
        
        // 再次确保预约数量已更新
        if (this.hasUserInfo && this.userInfo.userId) {
          this.fetchBookingCounts();
        }
        
        // 检查内容是否成功加载
        this.hasContent = true;
      }, 1500);
    },

    // 手动刷新预约数量
    refreshBookingCount() {
      if (!this.hasUserInfo || !this.userInfo.userId) {
        console.log('用户未登录，无法刷新预约数量');
        return;
      }
      
      console.log('手动刷新预约数量');
      uni.showLoading({
        title: '刷新中...'
      });
      
      this.fetchBookingCounts().then(() => {
        uni.hideLoading();
        uni.showToast({
          title: '刷新成功',
          icon: 'success'
        });
      }).catch(err => {
        console.error('刷新预约数量失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '刷新失败',
          icon: 'none'
        });
      });
    },

    // 开启下拉刷新
    onPullDownRefresh() {
      console.log('触发下拉刷新');
      // 调用重载方法
      this.reload();
      // 延迟结束下拉刷新
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 1000);
    },

    // 检查页面是否有内容
    checkContent() {
      console.log('检查页面内容');
      
      // 使用简单方法检查是否应该显示内容
      setTimeout(() => {
        if (!this.hasUserInfo && this.userInfo._id) {
          // 如果有用户ID但hasUserInfo为false，可能是数据错误
          this.hasUserInfo = true;
        }
        
        // 始终显示页面内容，但如果没有用户信息，给用户提示
        this.hasContent = true;
        
        console.log('内容检查结果:', this.hasContent, '用户信息状态:', this.hasUserInfo);
      }, 300);
    },

    // 检查是否需要显示学生姓名设置弹窗
    checkAndShowStudentNameModal() {
      // 检查全局变量中是否有显示弹窗的标记
      const app = getApp();
      if (app && app.globalData) {
        if (app.globalData.needShowStudentNameModal) {
          console.log('检测到全局变量中有显示学生姓名弹窗的标记');
          // 清除标记
          app.globalData.needShowStudentNameModal = false;
          // 显示弹窗
          setTimeout(() => {
            this.showStudentNameModal();
          }, 500);
          return;
        }
      }
      
      // 检查本地存储是否设置过学生姓名
      const hasSetStudentName = uni.getStorageSync('hasSetStudentName');
      if (hasSetStudentName) {
        console.log('用户已设置过学生姓名，不显示弹窗');
        return;
      }
      
      // 检查用户是否已有昵称
      const userInfo = uni.getStorageSync('uni-id-pages-userInfo') || uni.getStorageSync('userInfo') || {};
      const nickname = userInfo.nickname || userInfo.nickName;
      if (nickname && nickname.trim() !== '') {
        console.log('用户已有昵称:', nickname, '不显示弹窗');
        // 自动设置标记
        uni.setStorageSync('hasSetStudentName', true);
        return;
      }
      
      console.log('检测到用户未设置学生姓名，将显示弹窗');
      // 延迟显示，确保页面已加载完成
      setTimeout(() => {
        this.showStudentNameModal();
      }, 500);
      
      // 检查是否需要打开个人资料
      if (getApp().globalData.openUserProfile) {
        // 清除标记
        getApp().globalData.openUserProfile = false
        
        // 延迟执行，确保页面已经加载完成
        setTimeout(() => {
          if (this.hasUserInfo) {
            this.testUniIdPages('profile')
          } else {
            uni.showToast({
              title: '请先登录',
              icon: 'none'
            })
          }
        }, 800)
      }
    },

    // 显示学生姓名设置弹窗
    showStudentNameModal() {
      console.log('执行showStudentNameModal方法', this.$refs.studentNameModal ? '弹窗组件已找到' : '弹窗组件未找到');
      
      if (this.$refs.studentNameModal) {
        this.$refs.studentNameModal.open();
        console.log('已调用studentNameModal组件的open方法');
      } else {
        console.error('找不到studentNameModal组件引用');
        // 如果找不到组件引用，延迟再次尝试
        setTimeout(() => {
          if (this.$refs.studentNameModal) {
            console.log('延迟后找到了studentNameModal组件');
            this.$refs.studentNameModal.open();
          } else {
            console.error('即使延迟后仍找不到studentNameModal组件，尝试强制刷新页面');
            // 强制刷新页面以确保组件正确加载
            this.reload();
          }
        }, 1000);
      }
    }
  }
}
</script>

<style lang="scss">
.user-container {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
}

/* 用户信息区域 */
.user-info-section {
  position: relative;
  height: 280rpx;
  
  .user-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200rpx;
    background-color: #EC7A49;
    
    /* 返回按钮样式 */
    .back-button {
      position: absolute;
      top: 80rpx;
      left: 30rpx;
      width: 60rpx;
      height: 60rpx;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      
      text {
        color: #fff;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
    /* 刷新按钮样式 */
    .refresh-button {
      position: absolute;
      top: 80rpx;
      right: 30rpx;
      width: 60rpx;
      height: 60rpx;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      
      text {
        color: #fff;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
  }
  
  .user-info {
    position: absolute;
    top: 100rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 690rpx;
    height: 240rpx;
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80rpx;
    
    .avatar-wrap {
      position: absolute;
      top: -80rpx;
      width: 160rpx;
      height: 160rpx;
      border-radius: 80rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .user-avatar {
        width: 144rpx;
        height: 144rpx;
        border-radius: 72rpx;
      }
    }
    
    .user-detail {
      text-align: center;
      
      .user-name {
        font-size: 36rpx;
        font-weight: bold;
        color: $text-color;
      }
      
      .login-btn {
        margin-top: 20rpx;
        font-size: 32rpx;
        background-color: $theme-color;
        color: #fff;
        border-radius: 40rpx;
        padding: 0 40rpx;
        height: 80rpx;
        line-height: 80rpx;
      }
    }
  }
}

/* 菜单区域 */
.menu-section {
  padding: 20rpx;
  margin-top: 40rpx;
  
  .menu-group {
    background-color: #fff;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    padding: 30rpx;
    
    .menu-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $text-color;
      margin-bottom: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .refresh-link {
        font-size: 24rpx;
        color: $theme-color;
        font-weight: normal;
      }
    }
    
    .menu-content {
      display: flex;
      justify-content: space-between;
      
      .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 25%;
        
        .item-icon-img {
          width: 56rpx;
          height: 56rpx;
          margin-bottom: 10rpx;
        }
        
        .item-text {
          font-size: 26rpx;
          color: $text-color;
        }
        
        .item-badge {
          position: absolute;
          top: -10rpx;
          right: 20rpx;
          background-color: #FF3B30;
          color: #fff;
          font-size: 20rpx;
          height: 32rpx;
          min-width: 32rpx;
          border-radius: 16rpx;
          padding: 0 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    
    .menu-list {
      .menu-list-item {
        display: flex;
        align-items: center;
        height: 100rpx;
        border-bottom: 1rpx solid $border-color-light;
        
        &:last-child {
          border-bottom: none;
        }
        
        .list-icon {
          font-size: 36rpx;
          color: $theme-color;
          margin-right: 20rpx;
        }
        
        .list-text {
          flex: 1;
          font-size: 28rpx;
          color: $text-color;
        }
        
        .list-arrow {
          font-size: 32rpx;
          color: $text-color-light;
          font-weight: normal;
        }
        
        &.test-btn {
          background-color: #f8f8f8;
          margin-bottom: 10rpx;
          border-radius: 8rpx;
          height: 110rpx;
          
          .list-icon {
            color: #1974FF;
          }
          
          .list-text {
            color: #1974FF;
            font-weight: bold;
          }
        }
      }
    }
  }
}

/* 底部区域 */
.bottom-area {
  margin-top: auto;
  padding: 30rpx 20rpx;
  
  .logout-btn {
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #fff;
    border-radius: 12rpx;
    font-size: 32rpx;
    color: #FF3B30;
    margin-bottom: 20rpx;
  }
  
  .safe-area-bottom {
    height: 50rpx;
  }
}

/* 当没有内容时的重新加载提示 */
.reload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20rpx;
  
  image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
  
  text {
    font-size: 28rpx;
    color: $text-color;
    margin-bottom: 20rpx;
  }
  
  button {
    font-size: 32rpx;
    background-color: $theme-color;
    color: #fff;
    border-radius: 40rpx;
    padding: 0 40rpx;
    height: 80rpx;
    line-height: 80rpx;
  }
}
</style> 
