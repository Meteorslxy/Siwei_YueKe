<template>
  <view class="favorite-page">
    <!-- 顶部筛选栏 -->
    <view class="filter-bar">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="filter-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{tab.name}}
      </view>
    </view>
    
    <!-- 收藏列表 -->
    <view class="favorite-list">
      <block v-if="favoriteList.length > 0">
        <view 
          class="favorite-item" 
          v-for="(item, index) in favoriteList" 
          :key="index"
        >
          <view class="item-content" @click="handleClick(index)">
            <view class="item-image">
              <image :src="item.itemCover || getDefaultImage(item.itemType)" 
                mode="aspectFill" 
                @error="handleImageError(index)"></image>
            </view>
            
            <view class="item-info">
              <view class="item-title">{{item.itemTitle || '未命名'}}</view>
              <view class="item-type">{{getItemTypeName(item.itemType)}}</view>
              <view class="item-time">{{formatDate(item.createTime)}}</view>
            </view>
          </view>
          
          <view class="item-action">
            <view class="action-btn delete-btn" @click="handleDelete(index)">
              <text class="iconfont icon-delete"></text>
              <text class="delete-text">取消收藏</text>
            </view>
          </view>
        </view>
      </block>
      
      <empty-tip v-else tip="暂无收藏内容" :show="!loading"></empty-tip>
      
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: '全部', type: 'all' },
        { name: '课程', type: 'course' },
        { name: '讲座', type: 'lecture' },
        { name: '教师', type: 'teacher' }
      ],
      currentTab: 0,
      favoriteList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  onLoad() {
    this.getFavoriteList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.refreshList();
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.favoriteList = [];
      this.getFavoriteList();
    },
    
    // 获取收藏列表
    async getFavoriteList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) {
          this.loading = false;
          this.loadMoreStatus = 'more';
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
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
        
        // 获取用户ID，支持多种字段格式
        const userId = userData.userId || userData._id || userData.uid || 
                     (userData.userInfo && userData.userInfo._id) || 
                     (userData.userInfo && userData.userInfo.uid) || '';
                     
        // 检查用户ID
        if (!userId) {
          console.error('获取收藏列表失败: 无法获取用户ID', userData);
          this.loading = false;
          this.loadMoreStatus = 'more';
          uni.showToast({
            title: '用户信息不完整，请重新登录',
            icon: 'none'
          });
          return;
        }
        
        // 构建请求参数
        const params = {
          userId,
          page: this.page,
          pageSize: this.pageSize,
          type: this.tabs[this.currentTab].type
        };
        
        console.log('获取收藏列表，参数:', params);
        uni.showLoading({ title: '加载中' });
        
        const res = await this.$api.user.getFavoriteList(params);
        
        if (res && res.code === 0) {
          const list = res.data || [];
          
          // 确保列表项都有必要的属性
          const processedList = list.map(item => {
            // 处理可能的数据结构问题
            const processedItem = {...item};
            
            // 如果缺少必要的属性，添加默认值
            if (!processedItem.itemType) {
              console.warn('收藏项缺少itemType:', item);
              processedItem.itemType = 'unknown';
            }
            
            // 确保itemId存在
            if (!processedItem.itemId && processedItem.itemUrl) {
              // 尝试从URL提取ID
              const match = processedItem.itemUrl.match(/id=([^&]+)/);
              if (match && match[1]) {
                processedItem.itemId = match[1];
              }
            }
            
            // 确保图片地址有效
            if (!processedItem.itemCover) {
              processedItem.itemCover = this.getDefaultImage(processedItem.itemType);
            }
            
            return processedItem;
          });
          
          if (this.page === 1) {
            this.favoriteList = processedList;
          } else {
            this.favoriteList = [...this.favoriteList, ...processedList];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
        } else {
          uni.showToast({
            title: '获取收藏列表失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取收藏列表失败:', error);
        uni.showToast({
          title: '获取收藏列表失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
        uni.hideLoading();
        uni.stopPullDownRefresh();
      }
    },
    
    // 获取默认图片
    getDefaultImage(itemType) {
      switch (itemType) {
        case 'course':
          return '/static/images/default-course.jpg';
        case 'lecture':
          return '/static/images/default-lecture.jpg';
        case 'teacher':
          return '/static/images/default-teacher.jpg';
        default:
          return '/static/images/default.jpg';
      }
    },
    
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.getFavoriteList();
      }
    },
    
    // 处理点击项目
    handleClick(index) {
      if (index < 0 || index >= this.favoriteList.length) {
        console.error('无效的索引:', index);
        return;
      }
      
      const item = this.favoriteList[index];
      if (!item) {
        console.error('索引对应的收藏项为空:', index);
        return;
      }
      
      console.log('点击收藏项, 索引:', index);
      this.openDetail(index);
    },
    
    // 处理删除
    handleDelete(index) {
      if (index < 0 || index >= this.favoriteList.length) {
        console.error('无效的索引:', index);
        return;
      }
      
      const item = this.favoriteList[index];
      if (!item) {
        console.error('索引对应的收藏项为空:', index);
        return;
      }
      
      console.log('删除收藏项, 索引:', index);
      this.cancelFavorite(index);
    },
    
    // 打开详情页
    openDetail(index) {
      const item = this.favoriteList[index];
      
      if (!item) {
        uni.showToast({
          title: '收藏项不存在',
          icon: 'none'
        });
        return;
      }
      
      // 构建跳转URL
      let url = '';
      
      if (item.itemUrl) {
        url = item.itemUrl;
      } else if (item.itemType && item.itemId) {
        // 根据类型和ID构建URL
        switch (item.itemType) {
          case 'course':
            url = `/pages/course/detail?id=${item.itemId}`;
            break;
          case 'lecture':
            url = `/pages/course/lecture-detail?id=${item.itemId}`;
            break;
          case 'teacher':
            url = `/pages/teacher/detail?id=${item.itemId}`;
            break;
          default:
            url = '';
        }
      }
      
      // 检查url是否有效
      if (!url) {
        uni.showToast({
          title: '链接无效',
          icon: 'none'
        });
        return;
      }
      
      // 执行跳转
      console.log('跳转到:', url);
      uni.navigateTo({
        url,
        fail: (err) => {
          console.error('页面跳转失败:', err);
          uni.showToast({
            title: '页面不存在',
            icon: 'none'
          });
        }
      });
    },
    
    // 取消收藏
    cancelFavorite(index) {
      const item = this.favoriteList[index];
      
      if (!item) {
        uni.showToast({
          title: '收藏项不存在',
          icon: 'none'
        });
        return;
      }
      
      if (!item._id) {
        uni.showToast({
          title: '收藏ID不存在',
          icon: 'none'
        });
        return;
      }
      
      uni.showModal({
        title: '提示',
        content: '确定要取消收藏吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '处理中' });
              
              const favoriteId = item._id;
              console.log('准备删除收藏，ID:', favoriteId);
              
              const result = await this.$api.user.removeFavorite(favoriteId);
              
              if (result && result.code === 0) {
                // 从列表中移除
                this.favoriteList.splice(index, 1);
                
                uni.showToast({
                  title: '已取消收藏',
                  icon: 'success'
                });
              } else {
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('取消收藏失败:', error);
              uni.showToast({
                title: '操作失败',
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // 获取项目类型名称
    getItemTypeName(type) {
      const typeMap = {
        'course': '课程',
        'lecture': '讲座',
        'teacher': '教师',
        'news': '资讯'
      };
      
      return typeMap[type] || '未知';
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    },
    
    // 处理图片加载错误
    handleImageError(index) {
      if (index < 0 || index >= this.favoriteList.length) {
        console.error('无效的索引:', index);
        return;
      }
      
      const item = this.favoriteList[index];
      if (!item) {
        console.error('索引对应的收藏项为空:', index);
        return;
      }
      
      console.log('图片加载错误, 索引:', index);
      item.itemCover = this.getDefaultImage(item.itemType);
    }
  }
}
</script>

<style lang="scss">
.favorite-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
}

.filter-bar {
  display: flex;
  background-color: #fff;
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1rpx solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .filter-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;
    
    &.active {
      color: #FF6B00;
      font-weight: bold;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 4rpx;
        background-color: #FF6B00;
        border-radius: 2rpx;
      }
    }
  }
}

.favorite-list {
  flex: 1;
  padding: 20rpx;
  
  .favorite-item {
    display: flex;
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 8rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    padding: 20rpx;
    
    .item-content {
      flex: 1;
      display: flex;
    }
    
    .item-image {
      width: 160rpx;
      height: 120rpx;
      margin-right: 20rpx;
      border-radius: 8rpx;
      overflow: hidden;
      
      image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .item-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
        line-height: 1.4;
      }
      
      .item-type {
        font-size: 24rpx;
        color: #FF6B00;
        background-color: rgba(255, 107, 0, 0.1);
        padding: 4rpx 12rpx;
        border-radius: 4rpx;
        display: inline-block;
        margin-bottom: 10rpx;
      }
      
      .item-time {
        font-size: 22rpx;
        color: #999;
      }
    }
    
    .item-action {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20rpx;
      
      .action-btn {
        padding: 10rpx 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 8rpx;
        
        .iconfont {
          font-size: 36rpx;
          color: #999;
          margin-bottom: 6rpx;
        }
        
        .delete-text {
          font-size: 20rpx;
          color: #999;
        }
      }
      
      .delete-btn {
        .iconfont, .delete-text {
          color: #FF3B30;
        }
      }
    }
  }
}
</style> 