<template>
  <view class="news-container">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-back" @click="navigateBack">
        <view class="back-arrow"></view>
      </view>
      <view class="nav-title">最新通知</view>
      <view class="nav-right">
        <text class="iconfont icon-search"></text>
      </view>
    </view>
    
    <!-- 新闻列表 -->
    <view class="news-list">
      <!-- 加载中状态 -->
      <view class="loading-state" v-if="loading">
        <text class="loading-text">加载中...</text>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-else-if="newsList.length === 0">
        <image class="empty-icon" src="/static/images/icons/empty.png" mode="aspectFit"></image>
        <text class="empty-text">暂无通知信息</text>
        <button class="refresh-btn" @click="refreshList">刷新</button>
      </view>
      
      <!-- 列表内容 -->
      <block v-else>
        <view 
          class="news-item" 
          v-for="(item, index) in newsList" 
          :key="index"
          @click="navigateTo(`/pages/news/detail?id=${item._id || item.id}`)">
          <image class="news-image" :src="getImageUrl(item.coverImage || item.image)" mode="aspectFill"></image>
          <view class="news-content">
            <view class="news-title">{{item.title}}</view>
            <view class="news-desc">{{item.digest}}</view>
            <view class="news-info">
              <text class="news-time">{{formatDate(item.publishTime || item.createTime)}}</text>
              <text class="news-source">{{item.source || '四维工作室'}}</text>
            </view>
          </view>
        </view>
        
        <!-- 加载更多 -->
        <view class="load-more" v-if="hasMore" @click="loadMore">加载更多</view>
        <view class="no-more" v-else>已加载全部</view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      page: 1,
      pageSize: 10,
      hasMore: true,
      statusBarHeight: 0,
      loading: false
    }
  },
  onLoad() {
    // 获取状态栏高度
    this.getStatusBarHeight()
    // 加载新闻列表
    this.getNewsList()
  },
  onPullDownRefresh() {
    // 下拉刷新
    this.page = 1
    this.newsList = []
    this.hasMore = true
    this.getNewsList().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    // 触底加载更多
    if (this.hasMore && !this.loading) {
      this.loadMore()
    }
  },
  methods: {
    // 获取状态栏高度
    getStatusBarHeight() {
      try {
        const systemInfo = uni.getSystemInfoSync()
        this.statusBarHeight = systemInfo.statusBarHeight || 20
      } catch (e) {
        console.error('获取状态栏高度失败:', e)
        this.statusBarHeight = 20
      }
    },
    
    // 获取新闻列表
    async getNewsList() {
      if (this.loading) return
      this.loading = true
      
      try {
        // 显示加载提示
        uni.showLoading({
          title: '加载中...'
        })
        
        console.log('获取新闻列表, 页码:', this.page, '每页数量:', this.pageSize);
        
        // 调用API获取新闻列表
        const result = await this.$api.course.getNewsList({
          page: this.page,
          pageSize: this.pageSize
        })
        
        // 隐藏加载提示
        uni.hideLoading()
        
        console.log('获取新闻列表结果:', result);
        
        if (result && result.data) {
          // 追加数据
          if (this.page === 1) {
            this.newsList = result.data
          } else {
            this.newsList = [...this.newsList, ...result.data]
          }
          
          // 判断是否有更多数据
          this.hasMore = result.data.length === this.pageSize
        } else {
          if (this.page === 1) {
            this.newsList = [];
            uni.showToast({
              title: '暂无通知数据',
              icon: 'none'
            });
          }
        }
      } catch (e) {
        console.error('获取新闻列表失败:', e)
        uni.hideLoading()
        
        uni.showToast({
          title: '获取通知列表失败',
          icon: 'none'
        });
        
        if (this.page === 1) {
          this.newsList = [];
        }
      }
      
      this.loading = false
    },
    
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++
        this.getNewsList()
      }
    },
    
    // 格式化日期
    formatDate(date) {
      if (!date) return ''
      
      try {
        if (typeof date === 'string') {
          date = new Date(date)
        }
        
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        
        return `${year}-${month}-${day}`
      } catch (e) {
        console.error('格式化日期失败:', e)
        return ''
      }
    },
    
    // 获取图片URL，处理图片路径
    getImageUrl(path) {
      if (!path) return '/static/images/default-news.png';
      
      // 如果是完整路径，直接返回
      if (path.startsWith('http')) {
        return path;
      }
      
      // 确保路径以/开头
      if (!path.startsWith('/')) {
        path = '/' + path;
      }
      
      // 特殊处理static路径
      if (!path.startsWith('/static') && path.includes('/static/')) {
        path = path.substring(path.indexOf('/static'));
      }
      
      return path;
    },
    
    // 页面导航
    navigateTo(url) {
      console.log('导航到:', url);
      uni.navigateTo({ 
        url,
        success: (res) => {
          console.log('导航成功:', url);
        },
        fail: (err) => {
          console.error('导航失败:', url, err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 返回上一页
    navigateBack() {
      console.log('点击返回按钮');
      
      // 判断是否可以返回上一页
      const pages = getCurrentPages();
      if (pages.length > 1) {
        uni.navigateBack({
          delta: 1,
          success: () => {
            console.log('返回上一页成功');
          },
          fail: (err) => {
            console.error('返回上一页失败:', err);
            // 如果返回失败，尝试跳转到首页
            uni.switchTab({
              url: '/pages/index/index'
            });
          }
        });
      } else {
        // 如果没有上一页，返回首页
        console.log('没有上一页，返回首页');
        uni.switchTab({
          url: '/pages/index/index'
        });
      }
    },
    
    // 添加刷新方法
    refreshList() {
      this.page = 1;
      this.newsList = [];
      this.hasMore = true;
      this.getNewsList();
    }
  }
}
</script>

<style lang="scss">
.news-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 30rpx;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: $theme-color;
  color: #fff;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  z-index: 100;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  .nav-back {
    width: 88rpx;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .back-arrow {
      width: 24rpx;
      height: 24rpx;
      border-top: 4rpx solid #fff;
      border-left: 4rpx solid #fff;
      transform: rotate(-45deg);
      margin-left: 10rpx;
    }
    
    &:active {
      opacity: 0.8;
    }
  }
  
  .nav-title {
    flex: 1;
    text-align: center;
    font-size: 34rpx;
    font-weight: 500;
  }
  
  .nav-right {
    width: 88rpx;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .iconfont {
      font-size: 36rpx;
    }
  }
}

.news-list {
  padding: 20rpx 30rpx;
  margin-top: calc(44px + var(--status-bar-height) + 30px);
  
  .news-item {
    display: flex;
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    padding: 24rpx;
    position: relative;
    
    &:active {
      transform: scale(0.98);
      transition: transform 0.2s;
    }
    
    .news-image {
      width: 180rpx;
      height: 160rpx;
      border-radius: 12rpx;
      margin-right: 24rpx;
      flex-shrink: 0;
      background-color: #f5f5f5;
    }
    
    .news-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      
      .news-title {
        font-size: 32rpx;
        font-weight: 600;
        color: $text-color;
        line-height: 1.4;
        margin-bottom: 12rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      
      .news-desc {
        font-size: 26rpx;
        color: $text-color-light;
        line-height: 1.4;
        margin-bottom: 16rpx;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      
      .news-info {
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;
        color: $text-color-light;
        
        .news-time, .news-source {
          position: relative;
          z-index: 1;
        }
        
        .news-source {
          color: $theme-color;
        }
      }
    }
  }
  
  .load-more, .no-more {
    text-align: center;
    padding: 30rpx 0;
    font-size: 26rpx;
    color: $text-color-light;
  }
  
  .load-more {
    color: $theme-color;
    font-weight: 500;
  }
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  
  .loading-text, .empty-text {
    font-size: 28rpx;
    color: $text-color-light;
    margin: 24rpx 0;
  }
  
  .empty-icon {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 30rpx;
  }
  
  .refresh-btn {
    margin-top: 40rpx;
    font-size: 28rpx;
    background-color: $theme-color;
    color: #fff;
    padding: 16rpx 60rpx;
    border-radius: 40rpx;
    box-shadow: 0 4rpx 12rpx rgba(236, 122, 73, 0.2);
    
    &:active {
      opacity: 0.9;
      transform: translateY(2rpx);
    }
  }
}
</style> 