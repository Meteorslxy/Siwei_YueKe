<template>
  <view class="news-detail-container">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-back" @click="goBack">
        <text class="iconfont icon-back"></text>
      </view>
      <view class="nav-title">通知详情</view>
    </view>
    
    <!-- 详情内容 -->
    <view class="detail-content" v-if="newsInfo">
      <view class="article-header">
        <view class="article-title">{{newsInfo.title}}</view>
        <view class="article-info">
          <text class="article-source">{{newsInfo.source || '四维工作室'}}</text>
          <text class="article-time">{{formatDate(newsInfo.publishTime || newsInfo.createTime)}}</text>
        </view>
      </view>
      
      <view class="article-cover" v-if="newsInfo.coverImage">
        <image class="cover-image" :src="newsInfo.coverImage" mode="widthFix"></image>
      </view>
      
      <view class="article-content">
        <rich-text :nodes="formatContent(newsInfo.content)"></rich-text>
      </view>
    </view>

    <!-- 加载中或错误状态 -->
    <view class="loading-container" v-else>
      <view class="loading-text" v-if="loading">加载中...</view>
      <view class="error-container" v-else>
        <view class="error-text">获取通知详情失败</view>
        <view class="error-tip">请稍后再试</view>
        <button class="retry-btn" @click="retryLoad">重新加载</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      newsId: '',
      newsInfo: null,
      statusBarHeight: 0,
      loading: true
    }
  },
  onLoad(options) {
    console.log('新闻详情页面加载，参数:', options);
    
    // 获取状态栏高度
    this.getStatusBarHeight();
    
    if (options && options.id) {
      this.newsId = options.id;
      console.log('收到新闻ID:', this.newsId);
      this.fetchNewsDetail();
    } else {
      console.error('未接收到新闻ID');
      uni.showToast({
        title: '未找到通知详情',
        icon: 'none'
      });
      
      // 返回上一页
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
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
    
    async fetchNewsDetail() {
      try {
        console.log('开始获取新闻详情，ID:', this.newsId);
        this.loading = true;
        
        // 调用API获取新闻详情
        const result = await this.$api.course.getNewsDetail(this.newsId);
        console.log('获取新闻详情结果:', result);
        
        if (result && result.data) {
          this.newsInfo = result.data;
        } else {
          uni.showToast({
            title: '获取通知详情失败',
            icon: 'none'
          });
          console.error('获取新闻详情API返回空数据');
        }
      } catch (e) {
        console.error('获取新闻详情失败:', e);
        uni.showToast({
          title: '获取通知详情失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
      }
    },
    
    // 添加重试方法
    retryLoad() {
      // 重置状态
      this.loading = true;
      this.newsInfo = null;
      
      // 重新尝试加载
      if (this.newsId) {
        this.fetchNewsDetail();
      } else {
        uni.navigateBack();
      }
    },
    
    // 格式化日期
    formatDate(date) {
      if (!date) return '';
      
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    },
    
    // 格式化内容
    formatContent(content) {
      if (!content) return '暂无内容'
      
      // 如果内容已经是HTML格式的，直接返回
      if (content.includes('<') && content.includes('>')) {
        return content
      }
      
      // 将普通文本转换为HTML
      return content.split('\n').map(line => `<p>${line}</p>`).join('')
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style lang="scss">
.news-detail-container {
  min-height: 100vh;
  background-color: #fff;
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
  
  .nav-back {
    padding: 0 30rpx;
    font-size: 40rpx;
  }
  
  .nav-title {
    flex: 1;
    text-align: center;
    font-size: 36rpx;
    font-weight: bold;
    padding-right: 60rpx;
  }
}

.detail-content {
  padding: 30rpx;
  margin-top: calc(44px + var(--status-bar-height));
  
  .article-header {
    margin-bottom: 30rpx;
    
    .article-title {
      font-size: 40rpx;
      font-weight: bold;
      color: $text-color;
      line-height: 1.4;
      margin-bottom: 20rpx;
    }
    
    .article-info {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      color: $text-color-light;
    }
  }
  
  .article-cover {
    margin-bottom: 30rpx;
    
    .cover-image {
      width: 100%;
      border-radius: 8rpx;
    }
  }
  
  .article-content {
    font-size: 30rpx;
    color: $text-color;
    line-height: 1.6;
    
    :deep(p) {
      margin-bottom: 20rpx;
    }
    
    :deep(img) {
      max-width: 100%;
      margin: 20rpx 0;
    }
  }
}

.loading-container {
  padding: 30rpx;
  margin-top: calc(44px + var(--status-bar-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  
  .loading-text {
    font-size: 28rpx;
    color: $text-color-light;
    text-align: center;
  }
  
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .error-text {
      font-size: 32rpx;
      color: $text-color;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    
    .error-tip {
      font-size: 28rpx;
      color: $text-color-light;
      margin-bottom: 40rpx;
    }
    
    .retry-btn {
      background-color: $theme-color;
      color: #fff;
      font-size: 28rpx;
      padding: 10rpx 60rpx;
      border-radius: 40rpx;
    }
  }
}
</style> 