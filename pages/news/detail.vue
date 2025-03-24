<template>
  <view class="news-detail-container">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-back" @click="goBack">
        <view class="back-arrow"></view>
      </view>
      <view class="nav-title">通知详情</view>
      <view class="nav-right">
        <text class="iconfont icon-share"></text>
      </view>
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
        <!-- 1. 当content存在时，以富文本形式显示content -->
        <rich-text v-if="newsInfo.content" :nodes="formatContent(newsInfo.content)"></rich-text>
        
        <!-- 2. 当content不存在但summary存在时，显示summary -->
        <view class="article-summary" v-else-if="newsInfo.summary">
          <view class="summary-title">摘要</view>
          <view class="summary-content">{{newsInfo.summary}}</view>
        </view>
        
        <!-- 3. 当content和summary都不存在但digest存在时，显示digest -->
        <view class="article-summary" v-else-if="newsInfo.digest">
          <view class="summary-title">摘要</view>
          <view class="summary-content">{{newsInfo.digest}}</view>
        </view>
        
        <!-- 4. 都不存在时显示暂无内容 -->
        <view class="no-content" v-else>暂无内容</view>
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
          
          // 打印详细的数据结构，方便调试
          console.log('新闻详情数据结构:', {
            title: this.newsInfo.title,
            content: this.newsInfo.content ? '有内容' : '无内容',
            summary: this.newsInfo.summary ? '有摘要' : '无摘要',
            coverImage: this.newsInfo.coverImage ? '有封面图' : '无封面图',
            publishTime: this.newsInfo.publishTime,
            createTime: this.newsInfo.createTime,
            source: this.newsInfo.source,
            完整数据: JSON.stringify(this.newsInfo)
          });
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
      // 如果内容为空，尝试使用summary字段
      if (!content && this.newsInfo && this.newsInfo.summary) {
        content = this.newsInfo.summary;
      }
      
      // 如果内容仍然为空，显示暂无内容
      if (!content) return '暂无内容';
      
      // 如果内容已经是HTML格式的，直接返回
      if (content.includes('<') && content.includes('>')) {
        return content;
      }
      
      // 将普通文本转换为HTML
      return content.split('\n').map(line => `<p>${line}</p>`).join('');
    },
    
    // 返回上一页
    goBack() {
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

.detail-content {
  padding: 30rpx;
  margin-top: calc(44px + var(--status-bar-height) + 10px);
  
  .article-header {
    margin-bottom: 40rpx;
    
    .article-title {
      font-size: 40rpx;
      font-weight: 600;
      color: $text-color;
      line-height: 1.5;
      margin-bottom: 24rpx;
    }
    
    .article-info {
      display: flex;
      justify-content: space-between;
      font-size: 26rpx;
      color: $text-color-light;
      
      .article-source {
        color: $theme-color;
      }
    }
  }
  
  .article-cover {
    margin-bottom: 40rpx;
    
    .cover-image {
      width: 100%;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    }
  }
  
  .article-content {
    font-size: 30rpx;
    color: $text-color;
    line-height: 1.8;
    letter-spacing: 0.5rpx;
    
    .article-summary {
      margin-bottom: 40rpx;
      
      .summary-title {
        font-size: 32rpx;
        font-weight: 600;
        color: $theme-color;
        margin-bottom: 16rpx;
        padding-left: 16rpx;
        border-left: 6rpx solid $theme-color;
      }
      
      .summary-content {
        font-size: 30rpx;
        color: $text-color;
        line-height: 1.8;
        background-color: rgba(236, 122, 73, 0.05);
        padding: 20rpx;
        border-radius: 12rpx;
      }
    }
    
    :deep(p) {
      margin-bottom: 24rpx;
    }
    
    :deep(img) {
      max-width: 100%;
      margin: 24rpx 0;
      border-radius: 12rpx;
    }
    
    :deep(h2) {
      font-size: 36rpx;
      font-weight: 600;
      margin: 30rpx 0 20rpx;
      color: #333;
    }
    
    :deep(h3) {
      font-size: 32rpx;
      font-weight: 600;
      margin: 26rpx 0 18rpx;
      color: #333;
    }
    
    :deep(ul), :deep(ol) {
      padding-left: 40rpx;
      margin-bottom: 24rpx;
    }
    
    :deep(li) {
      margin-bottom: 12rpx;
    }
    
    :deep(a) {
      color: $theme-color;
      text-decoration: none;
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
      font-weight: 600;
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
      padding: 16rpx 80rpx;
      border-radius: 40rpx;
      
      &:active {
        opacity: 0.9;
      }
    }
  }
}

.no-content {
  text-align: center;
  padding: 60rpx 0;
  color: $text-color-light;
  font-size: 30rpx;
}
</style> 