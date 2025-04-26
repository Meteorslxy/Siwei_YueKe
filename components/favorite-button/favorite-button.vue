<template>
  <view class="favorite-button" @click.stop="toggleFavorite">
    <view :class="['cart-icon', {'is-favorite': isFavorite}]">
      <image class="cart-image" :src="isFavorite ? 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/Shopping-Bag-1.png' : 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/Shopping-Bag-2.png'" mode="aspectFit"></image>
      <text class="cart-text">{{isFavorite ? '已加入购物车' : '加入购物车'}}</text>
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
    },
    // 价格
    price: {
      type: [Number, String],
      default: 0
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
    
    // 添加到购物车
    async addToCart(userId, userData) {
      try {
        // 构建数据前先获取最新课程价格
        let finalPrice = parseFloat(this.price) || 0;
        
        // 如果是课程类型，尝试获取最新价格
        if (this.itemType === 'course') {
          try {
            const courseRes = await this.$api.course.getCourseDetail(this.itemId);
            if (courseRes && courseRes.code === 0 && courseRes.data) {
              const course = courseRes.data;
              // 计算课时费和材料费的总和
              const classFee = parseFloat(course.classFee || 0);
              const materialFee = parseFloat(course.materialFee || 0);
              const totalPrice = classFee + materialFee;
              
              // 如果计算得到的价格不为0，则使用计算得到的价格
              finalPrice = totalPrice > 0 ? totalPrice : (parseFloat(course.price) || finalPrice);
              console.log(`获取到课程 ${this.itemTitle} 的价格: ${finalPrice}`);
            }
          } catch (error) {
            console.error('获取课程价格失败，使用传入的价格:', error);
          }
        }
        
        // 确保价格为数字类型
        finalPrice = parseFloat(finalPrice) || 0;
        
        // 构建收藏数据
        const favoriteData = {
          userId: userId, // 确保使用正确的用户ID
          userName: userData.nickname || userData.username || '', // 添加用户名
          itemType: this.itemType,
          itemId: this.itemId,
          itemTitle: this.itemTitle || '',
          itemCover: this.itemCover || '',
          itemUrl: this.itemUrl || `/pages/${this.itemType}/detail?id=${this.itemId}`,
          price: finalPrice, // 使用获取到的最新价格
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
        
        return res;
      } catch (error) {
        console.error('添加购物车失败:', error);
        throw error;
      }
    },
    
    // 点击收藏按钮
    async toggleFavorite() {
      console.log('点击收藏按钮, 当前状态:', this.isFavorite ? '已收藏' : '未收藏');
      console.log('itemId:', this.itemId, 'itemType:', this.itemType);
      
      // 检查是否已登录
      const userInfo = uni.getStorageSync('userInfo');
      
      if (!userInfo) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/login'
          });
        }, 1500);
        
        return;
      }
      
      // 处理登录信息
      let userData;
      try {
        userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
      } catch (error) {
        console.error('解析用户数据失败:', error);
        userData = userInfo; // 如果解析失败，使用原始数据
      }
      
      const userId = userData.userId || userData._id || userData.uid || 
                     (userData.userInfo && userData.userInfo._id) || 
                     (userData.userInfo && userData.userInfo.uid);
      
      if (!userId) {
        console.error('收藏操作失败: 无法获取用户ID');
        uni.showToast({
          title: '用户信息不完整，请重新登录',
          icon: 'none'
        });
        return;
      }
      
      try {
        uni.showLoading({
          title: this.isFavorite ? '移出中' : '添加中'
        });
        
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
          
          // 直接传递ID字符串，而不是包含ID的对象
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
          const res = await this.addToCart(userId, userData);
          
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
  position: relative;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rpx;
  
  .cart-icon {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .cart-image {
      width: 55rpx;
      height: 55rpx;
    }
    
    .cart-text {
      position: absolute;
      bottom: -50rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24rpx;
      color: white;
      white-space: nowrap;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 4rpx 10rpx;
      border-radius: 10rpx;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    &.is-favorite {
      .cart-text {
        background-color: rgba(255, 107, 0, 0.8);
      }
    }
  }
  
  &:active {
    .cart-text {
      opacity: 1;
    }
  }
}
</style> 