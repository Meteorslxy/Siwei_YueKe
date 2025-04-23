<template>
  <view class="favorite-button" @click.stop="toggleFavorite">
    <view :class="['cart-icon', {'is-favorite': isFavorite}]">
      <image class="cart-image" :src="isFavorite ? 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/Shopping-Bag-1.png' : 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/Shopping-Bag-2.png'" mode="aspectFit"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'favorite-button',
  props: {
    // 项目ID
    itemId: {
      type: String,
      required: true
    },
    // 项目类型（lecture, course, teacher等）
    itemType: {
      type: String,
      default: 'course'
    },
    // 项目标题
    itemTitle: {
      type: String,
      default: ''
    },
    // 项目封面图
    itemCover: {
      type: String,
      default: ''
    },
    // 项目URL
    itemUrl: {
      type: String,
      default: ''
    },
    // 初始收藏状态
    initialFavorite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFavorite: this.initialFavorite,
      favoriteId: '', // 收藏记录ID
      loading: false,
      navBarHeight: 0, // 导航栏高度
      statusBarHeight: 0 // 状态栏高度
    }
  },
  created() {
    // 确保收藏表已初始化
    this.ensureFavoriteTableExists();
    
    // 从父组件传入的initialFavorite进行初始化
    if (this.initialFavorite) {
      console.log('使用父组件传递的初始收藏状态:', this.initialFavorite);
      this.isFavorite = true;
    } else {
      // 立即检查一次收藏状态
      this.checkFavoriteStatus();
      
      // 延迟300ms后再检查一次，确保状态正确
      setTimeout(() => {
        console.log('延迟检查收藏状态...');
        this.checkFavoriteStatus();
      }, 300);
    }
    
    // 获取系统信息
    try {
      const systemInfo = uni.getSystemInfoSync();
      this.statusBarHeight = systemInfo.statusBarHeight;
      // 小程序导航栏高度（单位px）
      const navBarHeight = 44; // 默认导航栏高度
      this.navBarHeight = navBarHeight;
      
      console.log('状态栏高度:', this.statusBarHeight);
      console.log('导航栏高度:', this.navBarHeight);
      
      // 通知父组件状态栏和导航栏高度
      this.$emit('statusBarHeight', this.statusBarHeight);
      this.$emit('navBarHeight', this.navBarHeight);
    } catch (e) {
      console.error('获取系统信息失败:', e);
    }
  },
  methods: {
    // 确保收藏表已初始化
    async ensureFavoriteTableExists() {
      try {
        // 调用初始化云函数
        const initResult = await uniCloud.callFunction({
          name: 'initFavoriteTable'
        });
        console.log('初始化收藏表结果:', initResult);
      } catch (error) {
        console.error('初始化收藏表失败:', error);
      }
    },
    
    // 检查收藏状态
    async checkFavoriteStatus() {
      if (!this.itemId) return;
      
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) return;
        
        // 安全地解析用户数据
        let userData;
        try {
          userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
        } catch (e) {
          console.error('解析用户数据失败:', e);
          userData = userInfo; // 如果解析失败，使用原始数据
        }
        
        const userId = userData.userId || userData._id || userData.uid || 
                     (userData.userInfo && userData.userInfo._id) || 
                     (userData.userInfo && userData.userInfo.uid) || '';
        if (!userId) return;
        
        const res = await this.$api.user.checkFavorite({
          userId,
          itemId: this.itemId,
          itemType: this.itemType
        });
        
        console.log('检查收藏状态返回详细结果:', JSON.stringify(res));
        
        if (res && res.code === 0) {
          // 1. 优先检查结果对象中的isFavorite字段
          if (typeof res.isFavorite === 'boolean') {
            this.isFavorite = res.isFavorite;
          }
          // 2. 检查data中的isFavorite字段
          else if (res.data && typeof res.data.isFavorite === 'boolean') {
            this.isFavorite = res.data.isFavorite;
          }
          // 3. 如果data存在且不为空，则视为已收藏
          else if (res.data && res.data._id) {
            this.isFavorite = true;
          }
          // 4. 都不符合则未收藏
          else {
            this.isFavorite = false;
          }
          
          // 获取收藏ID
          this.favoriteId = (res.data && res.data._id) || '';
          
          console.log('❤️ 最终收藏状态:', this.isFavorite ? '已收藏' : '未收藏', '收藏ID:', this.favoriteId);
        } else {
          this.isFavorite = false;
          this.favoriteId = '';
        }
      } catch (error) {
        console.error('检查收藏状态失败:', error);
      }
    },
    
    // 检查是否已收藏
    async checkIsFavorite() {
      try {
        if (!this.itemType || !this.itemId) {
          console.error('收藏检查失败: 缺少必要参数', this.itemType, this.itemId);
          this.isFavorite = false;
          this.favoriteId = '';
          return;
        }
        
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) {
          this.isFavorite = false;
          this.favoriteId = '';
          return;
        }
        
        // 安全地解析用户数据
        let userData;
        try {
          userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
        } catch (e) {
          console.error('解析用户数据失败:', e);
          userData = userInfo; // 如果解析失败，使用原始数据
        }
        
        const userId = userData.userId || userData._id || userData.uid || 
                     (userData.userInfo && userData.userInfo._id) || 
                     (userData.userInfo && userData.userInfo.uid) || '';
        
        if (!userId) {
          console.log('无法获取用户ID，视为未收藏');
          this.isFavorite = false;
          this.favoriteId = '';
          return;
        }
        
        // 构建检查参数
        const checkData = {
          userId,
          itemType: this.itemType,
          itemId: this.itemId
        };
        
        console.log('检查收藏状态，参数:', checkData);
        
        // 调用API检查是否已收藏
        const res = await this.$api.user.checkFavorite(checkData);
        
        console.log('检查收藏状态返回详细结果:', JSON.stringify(res));
        
        if (res && res.code === 0) {
          // 1. 优先检查结果对象中的isFavorite字段
          if (typeof res.isFavorite === 'boolean') {
            this.isFavorite = res.isFavorite;
          }
          // 2. 检查data中的isFavorite字段
          else if (res.data && typeof res.data.isFavorite === 'boolean') {
            this.isFavorite = res.data.isFavorite;
          }
          // 3. 如果data存在且不为空，则视为已收藏
          else if (res.data && res.data._id) {
            this.isFavorite = true;
          }
          // 4. 都不符合则未收藏
          else {
            this.isFavorite = false;
          }
          
          // 获取收藏ID
          this.favoriteId = (res.data && res.data._id) || '';
          
          console.log('❤️ 最终收藏状态:', this.isFavorite ? '已收藏' : '未收藏', '收藏ID:', this.favoriteId);
        } else {
          this.isFavorite = false;
          this.favoriteId = '';
        }
      } catch (error) {
        console.error('检查收藏状态失败:', error);
        this.isFavorite = false;
        this.favoriteId = '';
      }
    },
    
    // 切换收藏状态
    async toggleFavorite() {
      // 检查登录状态
      const userInfo = uni.getStorageSync('userInfo');
      if (!userInfo) {
        uni.showModal({
          title: '提示',
          content: '请先登录',
          confirmText: '去登录',
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/login'
              });
            }
          }
        });
        return;
      }
      
      try {
        // 安全地解析用户数据
        let userData;
        try {
          userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
        } catch (e) {
          console.error('解析用户数据失败:', e);
          userData = userInfo; // 如果解析失败，使用原始数据
        }
        
        console.log('用户数据:', userData);
        
        // 更新用户信息：尝试通过云函数获取最新信息
        try {
          console.log('尝试获取最新用户信息...');
          
          // 获取token
          const token = uni.getStorageSync('uni_id_token');
          if (token) {
            // 获取用户详情
            const userDetailRes = await uniCloud.callFunction({
              name: 'getUserInfoByToken',
              data: { uniIdToken: token }
            });
            
            console.log('getUserInfoByToken结果:', userDetailRes);
            
            if (userDetailRes.result && userDetailRes.result.code === 0 && userDetailRes.result.userInfo) {
              const freshUserInfo = userDetailRes.result.userInfo;
              console.log('获取到最新用户信息:', freshUserInfo);
              
              // 更新到本地存储
              uni.setStorageSync('userInfo', freshUserInfo);
              
              // 更新当前使用的userData
              userData = freshUserInfo;
            }
          }
        } catch (refreshError) {
          console.error('刷新用户信息失败:', refreshError);
        }
        
        // 获取用户ID，支持多种字段格式
        let userId = '';
        
        // 第1步：尝试直接从uni-id-token中获取uid
        try {
          const token = uni.getStorageSync('uni_id_token');
          if (token) {
            console.log('尝试从token中解析获取用户ID');
            
            try {
              // 解析token
              const tokenParts = token.split('.');
              if (tokenParts.length === 3) {
                // 解码payload部分
                const base64Payload = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(atob(base64Payload));
                console.log('Token payload:', payload);
                
                if (payload.uid) {
                  userId = payload.uid;
                  console.log('从token获取到用户ID(uid):', userId);
                }
              }
            } catch (tokenError) {
              console.error('解析token失败:', tokenError);
            }
          }
        } catch (e) {
          console.error('获取token失败:', e);
        }
        
        // 第2步：如果没有从token获取，尝试从用户对象获取
        if (!userId) {
          if (userData._id) {
            userId = userData._id;
            console.log('使用用户对象中的_id:', userId);
          }
          else if (userData.uid) {
            userId = userData.uid;
            console.log('使用用户对象中的uid:', userId);
          }
          else if (userData.userId) {
            userId = userData.userId;
            console.log('使用用户对象中的userId:', userId);
          }
          else if (userData.userInfo && userData.userInfo._id) {
            userId = userData.userInfo._id;
            console.log('使用嵌套userInfo中的_id:', userId);
          }
          else if (userData.userInfo && userData.userInfo.uid) {
            userId = userData.userInfo.uid;
            console.log('使用嵌套userInfo中的uid:', userId);
          }
        }
        
        // 第3步：如果还没有ID，尝试从uni-id-pages-userInfo获取
        if (!userId) {
          try {
            const uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo');
            if (uniIdUserInfo) {
              console.log('尝试从uni-id-pages-userInfo获取用户ID');
              const uniIdData = typeof uniIdUserInfo === 'string' ? JSON.parse(uniIdUserInfo) : uniIdUserInfo;
              
              if (uniIdData._id) userId = uniIdData._id;
              else if (uniIdData.uid) userId = uniIdData.uid;
            }
          } catch (e) {
            console.error('从uni-id-pages-userInfo获取ID失败:', e);
          }
        }
        
        // 第4步：如果还是没有用户ID，使用临时ID
        if (!userId) {
          // 生成一个持久的设备ID
          let deviceId = uni.getStorageSync('device_id');
          if (!deviceId) {
            deviceId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
            uni.setStorageSync('device_id', deviceId);
          }
          userId = deviceId;
          console.log('使用临时设备ID作为用户ID:', userId);
        }
        
        // 检查用户ID
        if (!userId) {
          console.error('收藏操作失败: 无法获取用户ID', userData);
          uni.showToast({
            title: '用户信息不完整，请重新登录',
            icon: 'none'
          });
          
          // 跳转到登录页面
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login/login'
            });
          }, 1500);
          return;
        }
        
        // 检查必要参数
        if (!this.itemType || !this.itemId) {
          console.error('收藏操作失败: 缺少必要参数', this.itemType, this.itemId);
          uni.showToast({
            title: '参数错误',
            icon: 'none'
          });
          return;
        }
        
        uni.showLoading({ title: this.isFavorite ? '移出中' : '添加中' });
        
        if (this.isFavorite) {
          // 从购物车移出
          if (!this.favoriteId) {
            console.error('从购物车移出失败: 缺少ID');
            uni.hideLoading();
            uni.showToast({
              title: '操作失败',
              icon: 'none'
            });
            return;
          }
          
          const res = await this.$api.user.removeFavorite(this.favoriteId);
          
          if (res && res.code === 0) {
            this.isFavorite = false;
            this.favoriteId = '';
            uni.hideLoading();
            uni.showToast({
              title: '已移出购物车',
              icon: 'success'
            });
            
            // 强制更新购物车状态（解决有时状态不更新的问题）
            this.$nextTick(() => {
              console.log('强制更新购物车状态为:', false);
              this.isFavorite = false;
            });
            
            this.$emit('favoriteChange', false);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '操作失败',
              icon: 'none'
            });
          }
        } else {
          // 添加到购物车
          // 构建数据
          const favoriteData = {
            userId: userId, // 确保使用正确的用户ID
            itemType: this.itemType,
            itemId: this.itemId,
            itemTitle: this.itemTitle || '',
            itemCover: this.itemCover || '',
            itemUrl: this.itemUrl || `/pages/${this.itemType}/detail?id=${this.itemId}`,
            createTime: Date.now()
          };
          
          console.log('添加购物车数据:', favoriteData);
          
          // 根据类型调整URL
          if (this.itemType === 'lecture') {
            favoriteData.itemUrl = `/pages/course/lecture-detail?id=${this.itemId}`;
          } else if (this.itemType === 'teacher') {
            favoriteData.itemUrl = `/pages/teacher/detail?id=${this.itemId}`;
          }
          
          const res = await this.$api.user.addFavorite(favoriteData);
          
          if (res && res.code === 0) {
            this.isFavorite = true;
            this.favoriteId = res.data._id || res.data.favoriteId || '';
            uni.hideLoading();
            uni.showToast({
              title: '已加入购物车',
              icon: 'success'
            });
            
            // 强制更新购物车状态（解决有时状态不更新的问题）
            this.$nextTick(() => {
              console.log('强制更新购物车状态为:', true);
              this.isFavorite = true;
            });
            
            this.$emit('favoriteChange', true);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 3000
            });
            
            if (res && res.message) {
              console.error('加入购物车失败原因:', res.message);
            }
          }
        }
      } catch (error) {
        console.error('收藏操作失败:', error);
        uni.hideLoading();
        uni.showToast({
          title: '操作失败',
          icon: 'none'
        });
      }
    },
    
    // 手动更新收藏状态
    updateFavoriteStatus(status, favoriteId = '') {
      console.log('手动更新收藏状态:', status, '收藏ID:', favoriteId);
      this.isFavorite = !!status;
      if (favoriteId) {
        this.favoriteId = favoriteId;
      }
    },
    
    // 获取项目URL
    getItemUrl() {
      let url = '';
      
      switch (this.itemType) {
        case 'course':
          url = `/pages/course/detail?id=${this.itemId}`;
          break;
        case 'lecture':
          url = `/pages/course/lecture-detail?id=${this.itemId}`;
          break;
        case 'teacher':
          url = `/pages/teacher/detail?id=${this.itemId}`;
          break;
        default:
          url = '';
      }
      
      return url;
    },
    
    // 处理图片资源地址，添加默认图片处理
    processImageUrl(url) {
      if (!url) {
        return this.getDefaultImage();
      }
      
      // 检查图片是否为本地路径
      if (url.startsWith('/static/')) {
        // 添加错误处理，在图片加载失败时使用默认图片
        console.log('处理本地图片路径:', url);
        return url;
      }
      
      return url;
    },
    
    // 获取默认图片
    getDefaultImage() {
      switch (this.itemType) {
        case 'course':
          return '/static/images/default-course.jpg';
        case 'lecture':
          return '/static/images/default-lecture.jpg';
        case 'teacher':
          return '/static/images/default-teacher.jpg';
        default:
          return '/static/images/default.jpg';
      }
    }
  }
}
</script>

<style lang="scss">
.favorite-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  
  .cart-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70rpx;
    height: 70rpx;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.2);
    
    .cart-image {
      width: 40rpx;
      height: 40rpx;
      transition: all 0.3s;
    }
    
    &.is-favorite {
      .cart-image {
        transform: scale(1.1);
      }
    }
    
    &:active {
      transform: scale(0.9);
    }
  }
}
</style> 