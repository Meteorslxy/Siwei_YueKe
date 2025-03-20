<template>
  <view class="index-container">
    <!-- 顶部背景图片 -->
    <view class="header-background" :style="{ paddingTop: statusBarHeight + 'px' }">
      <image class="bg-image" src="/static/images/home.jpg" mode="widthFix"></image>
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
      </view>
      <scroll-view scroll-x class="news-scroll" show-scrollbar="false">
        <view 
          class="news-item" 
          v-for="(item, index) in newsList" 
          :key="index"
          @click="navigateTo(`/pages/news/detail?id=${item._id}`)">
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
          <text class="iconfont icon-right"></text>
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
        // 调用API获取资讯
        const result = await this.$api.course.getNewsList({
          page: 1,
          pageSize: 5
        });
        
        if (result && result.data) {
          this.newsList = result.data;
        } else {
          // 使用模拟数据
          this.newsList = [
            {
              id: '1',
              title: '四维工作室春季游学课程时间...',
              digest: '尊敬的各位家长朋友，春季游学课程将于3月开始，敬请关注',
              coverImage: '/static/images/news/news1.jpg',
              publishTime: new Date('2023-02-15')
            },
            {
              id: '2',
              title: '四维工作室热烈祝贺学员杯赛季...',
              digest: '尊敬的各位家长朋友，热烈祝贺我校学员在数学竞赛中获得一等奖',
              coverImage: '/static/images/news/news2.jpg',
              publishTime: new Date('2023-02-10')
            }
          ]
        }
      } catch (e) {
        console.error('获取资讯失败:', e)
        // 使用模拟数据
        this.newsList = [
          {
            id: '1',
            title: '四维工作室春季游学课程时间...',
            digest: '尊敬的各位家长朋友，春季游学课程将于3月开始，敬请关注',
            coverImage: '/static/images/news/news1.jpg',
            publishTime: new Date('2023-02-15')
          },
          {
            id: '2',
            title: '四维工作室热烈祝贺学员杯赛季...',
            digest: '尊敬的各位家长朋友，热烈祝贺我校学员在数学竞赛中获得一等奖',
            coverImage: '/static/images/news/news2.jpg',
            publishTime: new Date('2023-02-10')
          }
        ]
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
      uni.navigateTo({ url })
    },

    // 切换到课程页面
    switchTab(url) {
      uni.switchTab({ url })
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
  
  .bg-image {
    width: 100%;
    display: block;
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

/* 资讯区域 */
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
    }
  }
  
  .news-scroll {
    white-space: nowrap;
    
    .news-item {
      display: inline-block;
      width: 600rpx;
      margin-right: 20rpx;
      background-color: #fff;
      border-radius: 12rpx;
      overflow: hidden;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
      
      &:first-child {
        margin-left: 30rpx;
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
      
      .iconfont {
        margin-left: 4rpx;
        font-size: 24rpx;
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