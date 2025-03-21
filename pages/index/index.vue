<template>
  <view class="index-container">
    <!-- 顶部背景图片 -->
    <view class="header-background" :style="{ paddingTop: statusBarHeight + 'px' }">
      <image class="bg-image" src="/static/images/home.png" mode="widthFix"></image>
    </view>
    
    <!-- 功能导航菜单 -->
    <view class="nav-card">
      <view class="nav-menu">
        <view class="nav-item" @click="switchTab('/pages/course/course')">
          <image class="nav-icon" src="/static/images/icons/featured.png" mode="aspectFit"></image>
          <text class="nav-text">精选好课</text>
        </view>
        <view class="nav-item" @click="navigateTo('/pages/course/lectures')">
          <image class="nav-icon" src="/static/images/icons/lecture.png" mode="aspectFit"></image>
          <text class="nav-text">热点讲座</text>
        </view>
        <view class="nav-item" @click="navigateTo('/pages/teacher/list')">
          <image class="nav-icon" src="/static/images/icons/teacher.png" mode="aspectFit"></image>
          <text class="nav-text">名师介绍</text>
        </view>
        <view class="nav-item" @click="navigateTo('/pages/school/detail')">
          <image class="nav-icon" src="/static/images/icons/school.png" mode="aspectFit"></image>
          <text class="nav-text">校区介绍</text>
        </view>
      </view>
    </view>
    
    <!-- 资讯轮播 -->
    <view class="news-section">
      <view class="section-header">
        <view class="section-tag"></view>
        <text class="section-title">最新通知</text>
        <view class="section-more" @click="navigateTo('/pages/news/list')">
          <text>查看全部</text>
          <view class="more-arrow"></view>
        </view>
      </view>
      <scroll-view scroll-x class="news-scroll" show-scrollbar="false">
        <view 
          class="news-item" 
          v-for="(item, index) in newsList" 
          :key="index"
          @click="navigateToNewsDetail(item)">
          <image class="news-image" :src="item.coverImage" mode="aspectFill"></image>
          <view class="news-content">
            <text class="news-title">{{item.title}}</text>
            <text class="news-desc">{{item.digest}}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 推荐课程 -->
    <view class="course-section">
      <view class="section-header">
        <view class="section-tag"></view>
        <text class="section-title">推荐课程</text>
        <view class="section-more" @click="switchTab('/pages/course/course')">
          <text>更多</text>
          <view class="more-arrow"></view>
        </view>
      </view>
      
      <view class="course-list">
        <view 
          class="course-item" 
          v-for="(item, index) in recommendCourses" 
          :key="index"
          @click="navigateTo(`/pages/course/detail?id=${item._id}`)">
          <image class="course-image" :src="item.coverImage" mode="aspectFill"></image>
          <view class="course-content">
            <view class="course-title">
              <text v-if="item.school" class="school-tag">[{{item.school}}]</text>
              <text>{{item.title}}</text>
            </view>
            <view class="course-info">
              <text class="course-location">{{item.schoolName}}</text>
              <text class="course-time">{{formatCourseTime(item.startTime, item.endTime)}}</text>
            </view>
            <view class="course-teacher">
              <image class="teacher-avatar" :src="item.teacherAvatar" mode="aspectFill"></image>
              <text class="teacher-name">{{item.teacherName}}</text>
              <text class="teacher-title">{{item.teacherTitle}}</text>
            </view>
            <view class="course-bottom">
              <text class="course-price">¥{{item.price}}</text>
              <view class="course-status">
                <text class="max-students">名额 {{item.enrollCount}}/{{item.maxEnroll}}</text>
                <text class="lesson-count">课时 {{item.lessonCount}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      newsList: [],
      recommendCourses: [],
      statusBarHeight: 0
    }
  },
  onLoad() {
    this.getNews()
    this.getRecommendCourses()
    // 获取状态栏高度
    this.getStatusBarHeight()
  },
  onPullDownRefresh() {
    Promise.all([
      this.getNews(),
      this.getRecommendCourses()
    ]).then(() => {
      uni.stopPullDownRefresh()
    })
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
    
    // 获取资讯列表
    async getNews() {
      try {
        console.log('首页获取资讯列表');
        
        // 调用API获取资讯
        const result = await this.$api.course.getNewsList({
          page: 1,
          pageSize: 5
        });
        
        console.log('获取资讯结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          this.newsList = result.data;
        } else {
          console.warn('未获取到资讯数据');
          this.newsList = [];
        }
      } catch (e) {
        console.error('获取资讯失败:', e);
        this.newsList = [];
        uni.showToast({
          title: '获取通知列表失败',
          icon: 'none'
        });
      }
    },
    
    // 获取推荐课程
    async getRecommendCourses() {
      try {
        // 调用API获取推荐课程
        const result = await this.$api.course.getRecommendCourses({
          limit: 4
        });
        
        if (result && result.data) {
          this.recommendCourses = result.data;
        } else {
          // 使用模拟数据
          this.recommendCourses = [
            {
              _id: '1',
              title: '三年级浪漫暑假班',
              school: '雨花台',
              schoolName: '雨花台校区',
              teacherName: '刘星宇',
              teacherTitle: '小学教师',
              teacherAvatar: '/static/images/teacher/teacher1.jpg',
              coverImage: '/static/images/course/course1.jpg',
              price: 4000,
              enrollCount: 5,
              maxEnroll: 10,
              lessonCount: 10,
              startTime: '2023-07-01 15:30',
              endTime: '2023-07-17 15:30'
            },
            {
              _id: '2',
              title: '四年级提优暑假班',
              school: '大行宫',
              schoolName: '大行宫校区',
              teacherName: '刘星宇',
              teacherTitle: '小学教师',
              teacherAvatar: '/static/images/teacher/teacher1.jpg',
              coverImage: '/static/images/course/course2.jpg',
              price: 4000,
              enrollCount: 3,
              maxEnroll: 10,
              lessonCount: 10,
              startTime: '2023-07-08 08:30',
              endTime: '2023-07-10 08:30'
            },
            {
              _id: '3',
              title: '四年级提优暑假班',
              school: '大行宫',
              schoolName: '大行宫校区',
              teacherName: '刘星宇',
              teacherTitle: '小学教师',
              teacherAvatar: '/static/images/teacher/teacher1.jpg',
              coverImage: '/static/images/course/course3.jpg',
              price: 4000,
              enrollCount: 2,
              maxEnroll: 10,
              lessonCount: 10,
              startTime: '2023-07-08 08:30',
              endTime: '2023-07-10 08:30'
            }
          ]
        }
      } catch (e) {
        console.error('获取推荐课程失败:', e)
        // 使用模拟数据
        this.recommendCourses = [
          {
            _id: '1',
            title: '三年级浪漫暑假班',
            school: '雨花台',
            schoolName: '雨花台校区',
            teacherName: '刘星宇',
            teacherTitle: '小学教师',
            teacherAvatar: '/static/images/teacher/teacher1.jpg',
            coverImage: '/static/images/course/course1.jpg',
            price: 4000,
            enrollCount: 5,
            maxEnroll: 10,
            lessonCount: 10,
            startTime: '2023-07-01 15:30',
            endTime: '2023-07-17 15:30'
          },
          {
            _id: '2',
            title: '四年级提优暑假班',
            school: '大行宫',
            schoolName: '大行宫校区',
            teacherName: '刘星宇',
            teacherTitle: '小学教师',
            teacherAvatar: '/static/images/teacher/teacher1.jpg',
            coverImage: '/static/images/course/course2.jpg',
            price: 4000,
            enrollCount: 3,
            maxEnroll: 10,
            lessonCount: 10,
            startTime: '2023-07-08 08:30',
            endTime: '2023-07-10 08:30'
          }
        ]
      }
    },
    
    // 获取图片URL - 处理本地和云端图片
    getImageUrl(path) {
      if (!path) return '/static/images/default.png';
      
      // 如果是完整路径或本地路径，直接返回
      if (path.startsWith('http') || path.startsWith('/')) {
        return path;
      }
      
      // 否则作为云端图片处理
      return `/static/images/${path}`;
    },
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return ''
      
      const start = new Date(startTime)
      const formattedStart = `${start.getMonth() + 1}.${start.getDate()}`
      
      if (endTime) {
        const end = new Date(endTime)
        const formattedEnd = `${end.getMonth() + 1}.${end.getDate()}`
        return `${formattedStart}-${formattedEnd}`
      }
      
      return formattedStart
    },
    
    // 页面导航
    navigateTo(url) {
      console.log('导航到:', url);
      uni.navigateTo({ 
        url,
        success: function() {
          console.log('导航成功:', url);
        },
        fail: function(err) {
          console.error('导航失败:', url, err);
          // 尝试使用另一种导航方式
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },

    // 切换到课程页面
    switchTab(url) {
      uni.switchTab({ url })
    },

    // 新闻详情页导航
    navigateToNewsDetail(news) {
      console.log('准备查看新闻:', news);
      
      if (!news) {
        console.error('新闻对象为空');
        uni.showToast({
          title: '无法查看该通知',
          icon: 'none'
        });
        return;
      }
      
      // 尝试所有可能的ID字段
      const newsId = news._id || news.id || news.newsId;
      console.log('使用的新闻ID:', newsId);
      
      if (!newsId) {
        console.error('无法找到新闻ID');
        // 显示模拟新闻详情
        uni.navigateTo({
          url: `/pages/news/detail?id=mock_news_${Date.now()}`,
          success: (res) => {
            console.log('新闻详情页导航成功(使用模拟ID)');
          },
          fail: (err) => {
            console.error('新闻详情页导航失败:', err);
            uni.showToast({
              title: '无法查看该通知',
              icon: 'none'
            });
          }
        });
        return;
      }
      
      // 使用ID参数跳转到详情页
      const url = `/pages/news/detail?id=${newsId}`;
      console.log('导航到新闻详情页:', url);
      
      uni.navigateTo({
        url,
        success: (res) => {
          console.log('新闻详情页导航成功:', res);
        },
        fail: (err) => {
          console.error('新闻详情页导航失败:', err);
          // 尝试使用另一种导航方式
          uni.redirectTo({
            url,
            fail: (err2) => {
              console.error('重定向到新闻详情页也失败了:', err2);
              uni.showToast({
                title: '无法跳转到详情页',
                icon: 'none'
              });
            }
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
.index-container {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 顶部背景图片 */
.header-background {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-top: 0 !important; /* 覆盖内联样式的paddingTop */
  
  .bg-image {
    width: 100%;
    display: block;
    margin-top: 0rpx; /* 增大向上移动的距离 */
  }
}

/* 功能导航菜单 */
.nav-card {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  margin: -100rpx 30rpx 0;
  padding: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.nav-menu {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx 0;
  background-color: #fff;
  margin-top: 0;
  
  .nav-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 0;
    
    .nav-icon {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 10rpx;
    }
    
    .nav-text {
      font-size: 24rpx;
      color: $text-color;
    }
  }
}

/* 资讯轮播区域 */
.news-section {
  margin: 30rpx 30rpx 0;
  background-color: #fff;
  padding: 20rpx 0;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  
  .section-header {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    
    .section-tag {
      width: 8rpx;
      height: 32rpx;
      background-color: $theme-color;
      margin-right: 16rpx;
      border-radius: 4rpx;
    }
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $text-color;
      flex: 1;
    }
    
    .section-more {
      font-size: 24rpx;
      color: $text-color-light;
      display: flex;
      align-items: center;
      
      .more-arrow {
        width: 12rpx;
        height: 12rpx;
        border-top: 2rpx solid $text-color-light;
        border-right: 2rpx solid $text-color-light;
        transform: rotate(45deg);
        margin-left: 8rpx;
      }
    }
  }
  
  .news-scroll {
    width: 100%;
    white-space: nowrap;
    
    .news-item {
      display: inline-block;
      width: 600rpx;
      border-radius: 12rpx;
      overflow: hidden;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
      margin-left: 30rpx;
      position: relative; /* 确保定位正确 */
      z-index: 1; /* 确保可点击 */
      
      &:active {
        opacity: 0.8; /* 点击反馈 */
      }
      
      .news-image {
        width: 600rpx;
        height: 300rpx;
      }
      
      .news-content {
        padding: 20rpx;
        
        .news-title {
          font-size: 28rpx;
          font-weight: bold;
          color: $text-color;
          margin-bottom: 10rpx;
          display: block;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        
        .news-desc {
          font-size: 24rpx;
          color: $text-color-light;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}

/* 推荐课程区域 */
.course-section {
  margin: 30rpx 30rpx 0;
  background-color: #fff;
  padding: 20rpx 0;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  
  .section-header {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    
    .section-tag {
      width: 8rpx;
      height: 32rpx;
      background-color: $theme-color;
      margin-right: 16rpx;
      border-radius: 4rpx;
    }
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $text-color;
      flex: 1;
    }
    
    .section-more {
      font-size: 24rpx;
      color: $text-color-light;
      display: flex;
      align-items: center;
      
      .more-arrow {
        width: 12rpx;
        height: 12rpx;
        border-top: 2rpx solid $text-color-light;
        border-right: 2rpx solid $text-color-light;
        transform: rotate(45deg);
        margin-left: 8rpx;
      }
    }
  }
  
  .course-list {
    padding: 0 30rpx;
    
    .course-item {
      margin-bottom: 30rpx;
      background-color: #fff;
      border-radius: 12rpx;
      overflow: hidden;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
      
      .course-image {
        width: 100%;
        height: 300rpx;
      }
      
      .course-content {
        padding: 20rpx;
        
        .course-title {
          font-size: 32rpx;
          font-weight: bold;
          color: $text-color;
          margin-bottom: 16rpx;
          display: flex;
          
          .school-tag {
            color: $theme-color;
            margin-right: 10rpx;
          }
        }
        
        .course-info {
          display: flex;
          margin-bottom: 16rpx;
          font-size: 24rpx;
          color: $text-color-grey;
          
          .course-location {
            margin-right: 30rpx;
          }
        }
        
        .course-teacher {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;
          
          .teacher-avatar {
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
            margin-right: 16rpx;
          }
          
          .teacher-name {
            font-size: 28rpx;
            color: $text-color;
            margin-right: 16rpx;
          }
          
          .teacher-title {
            font-size: 24rpx;
            color: $text-color-light;
          }
        }
        
        .course-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .course-price {
            font-size: 36rpx;
            font-weight: bold;
            color: #FF3B30;
          }
          
          .course-status {
            font-size: 24rpx;
            color: $text-color-light;
            
            .max-students {
              margin-right: 20rpx;
            }
          }
        }
      }
    }
  }
}
</style> 