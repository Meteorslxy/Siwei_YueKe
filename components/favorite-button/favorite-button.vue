<template>
  <view class="favorite-button" @click.stop="toggleFavorite">
    <view :class="['heart-icon', {'is-favorite': isFavorite}]">
      <text class="iconfont" :class="isFavorite ? 'icon-heart-fill' : 'icon-heart'"></text>
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
      loading: false
    }
  },
  created() {
    // 确保收藏表已初始化
    this.ensureFavoriteTableExists();
    this.checkFavoriteStatus();
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
        
        const userId = JSON.parse(userInfo).userId || JSON.parse(userInfo)._id;
        if (!userId) return;
        
        const res = await this.$api.user.checkFavorite({
          userId,
          itemId: this.itemId,
          itemType: this.itemType
        });
        
        if (res && res.code === 0 && res.data) {
          this.isFavorite = true;
          this.favoriteId = res.data._id || '';
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
        
        const userData = JSON.parse(userInfo);
        const userId = userData.userId || userData._id;
        
        // 构建检查参数
        const checkData = {
          userId,
          itemType: this.itemType,
          itemId: this.itemId
        };
        
        // 调用API检查是否已收藏
        const res = await this.$api.user.checkFavorite(checkData);
        
        if (res && res.code === 0) {
          this.isFavorite = res.data.isFavorite || false;
          this.favoriteId = res.data.favoriteId || '';
          console.log('收藏状态:', this.isFavorite ? '已收藏' : '未收藏', '收藏ID:', this.favoriteId);
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
        const userData = JSON.parse(userInfo);
        const userId = userData.userId || userData._id;
        
        // 检查必要参数
        if (!this.itemType || !this.itemId) {
          console.error('收藏操作失败: 缺少必要参数', this.itemType, this.itemId);
          uni.showToast({
            title: '参数错误',
            icon: 'none'
          });
          return;
        }
        
        uni.showLoading({ title: this.isFavorite ? '取消中' : '收藏中' });
        
        if (this.isFavorite) {
          // 取消收藏
          if (!this.favoriteId) {
            console.error('取消收藏失败: 缺少收藏ID');
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
              title: '已取消收藏',
              icon: 'success'
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
          // 添加收藏
          // 构建收藏数据
          const favoriteData = {
            userId,
            itemType: this.itemType,
            itemId: this.itemId,
            itemTitle: this.itemTitle || '',
            itemCover: this.itemCover || '',
            itemUrl: this.itemUrl || `/pages/${this.itemType}/detail?id=${this.itemId}`,
            createTime: Date.now()
          };
          
          // 根据类型调整URL
          if (this.itemType === 'lecture') {
            favoriteData.itemUrl = `/pages/course/lecture-detail?id=${this.itemId}`;
          } else if (this.itemType === 'teacher') {
            favoriteData.itemUrl = `/pages/teacher/detail?id=${this.itemId}`;
          }
          
          const res = await this.$api.user.addFavorite(favoriteData);
          
          if (res && res.code === 0) {
            this.isFavorite = true;
            this.favoriteId = res.data.favoriteId || '';
            uni.hideLoading();
            uni.showToast({
              title: '收藏成功',
              icon: 'success'
            });
            
            this.$emit('favoriteChange', true);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '操作失败',
              icon: 'none'
            });
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
    }
  }
}
</script>

<style lang="scss">
.favorite-button {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .heart-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    
    .iconfont {
      font-size: 44rpx;
      color: #999999;
      transition: all 0.3s;
    }
    
    &.is-favorite {
      .iconfont {
        color: #FF6B00;
      }
    }
  }
}
</style> 