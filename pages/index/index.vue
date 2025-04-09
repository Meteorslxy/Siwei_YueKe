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
          <image class="news-image" :src="getNewsImageUrl(item.coverImage || item.image)" mode="aspectFill"></image>
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
              <text class="course-location">{{item.location || item.schoolName}}</text>
              <text class="course-time">{{item.startTime && item.endTime ? `${item.startTime}-${item.endTime}` : ''}}</text>
            </view>
            <view class="course-teacher">
              <image class="teacher-avatar" :src="getTeacherAvatar(item)" mode="aspectFill"></image>
              <text class="teacher-name">{{item.teacherName}}</text>
              <text class="teacher-title">{{item.teacherTitle}}</text>
            </view>
            <view class="course-bottom">
              <text class="course-price">¥{{item.price}}</text>
              <view class="course-status">
                <text class="max-students">名额 {{item.bookingCount}}/{{item.courseCapacity || item.courseCount || item.maxEnroll}}</text>
                <text class="lesson-count">{{item.startDate && item.endDate ? `${item.startDate}-${item.endDate}` : '日期待定'}}</text>
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
    // 初始化应用
    this.initApp();
    
    this.getNews()
    this.getRecommendCourses()
    // 获取状态栏高度
    this.getStatusBarHeight()
  },
  onShow() {
    // 每次显示页面时刷新数据，确保显示最新数据
    this.getRecommendCourses()
  },
  onPullDownRefresh() {
    Promise.all([
      this.getNews(),
      this.getRecommendCourses()
    ]).then(() => {
      uni.stopPullDownRefresh()
    })
  },
  // 小程序从后台切换到前台时触发
  onTabItemTap() {
    // 当用户点击Tab切换到此页面时刷新数据
    this.getRecommendCourses()
  },
  methods: {
    // 初始化应用
    async initApp() {
      try {
        // 检查数据库状态
        const res = await uniCloud.callFunction({
          name: 'initUserTable'
        });
        
        if (res.result && res.result.code === 0) {
          console.log('用户表初始化完成:', res.result);
        } else {
          console.warn('用户表初始化警告:', res.result);
        }
      } catch (err) {
        console.error('应用初始化失败:', err);
      }
    },
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
        console.log('获取推荐课程');
        
        // 调用API获取推荐课程
        const result = await this.$api.course.getRecommendCourses({
          limit: 4
        });
        
        console.log('获取推荐课程结果:', result);
        
        if (result && result.data) {
          // 处理每个课程项，确保有正确的数据格式
          this.recommendCourses = result.data.map(course => {
            // 确保有正确的名额数据
            if (!course.courseCapacity) {
              if (course.courseCount) {
                course.courseCapacity = course.courseCount;
              } else if (course.maxEnroll) {
                course.courseCapacity = course.maxEnroll;
              } else {
                course.courseCapacity = 20; // 默认值
              }
            }
            
            if (!course.bookingCount && course.enrollCount) {
              course.bookingCount = course.enrollCount;
            }
            
            // 确保有正确的日期和时间数据
            if (!course.startDate && course.startTime) {
              if (course.startTime.includes(' ')) {
                const parts = course.startTime.split(' ');
                course.startDate = parts[0];
                course.startTime = parts[1];
              } else if (course.startTime.includes('T')) {
                try {
                  const date = new Date(course.startTime);
                  if (!isNaN(date.getTime())) {
                    course.startDate = date.toISOString().split('T')[0];
                    course.startTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                  }
                } catch (e) {
                  console.error('解析startTime失败:', e, course.startTime);
                }
              }
            }
            
            if (!course.endDate && course.endTime) {
              if (course.endTime.includes(' ')) {
                const parts = course.endTime.split(' ');
                course.endDate = parts[0];
                course.endTime = parts[1];
              } else if (course.endTime.includes('T')) {
                try {
                  const date = new Date(course.endTime);
                  if (!isNaN(date.getTime())) {
                    course.endDate = date.toISOString().split('T')[0];
                    course.endTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                  }
                } catch (e) {
                  console.error('解析endTime失败:', e, course.endTime);
                }
              }
            }
            
            // 确保有地点信息
            if (!course.location && course.schoolName) {
              course.location = course.schoolName;
            }
            
            return course;
          });
        } else {
          console.warn('未获取到推荐课程数据');
          this.recommendCourses = [];
          uni.showToast({
            title: '暂无推荐课程',
            icon: 'none'
          });
        }
      } catch (e) {
        console.error('获取推荐课程失败:', e);
        this.recommendCourses = [];
        uni.showToast({
          title: '获取推荐课程失败',
          icon: 'none'
        });
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
    
    // 获取新闻图片URL - 处理图片路径
    getNewsImageUrl(path) {
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
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return '时间待定'
      
      try {
        const start = new Date(startTime)
        // 检查日期是否有效
        if (isNaN(start.getTime())) {
          console.warn('无效的开始时间格式:', startTime);
          return '时间待定';
        }
        
        const formattedStart = `${start.getMonth() + 1}.${start.getDate()}`
        
        if (endTime) {
          const end = new Date(endTime)
          // 检查日期是否有效
          if (isNaN(end.getTime())) {
            console.warn('无效的结束时间格式:', endTime);
            return formattedStart;
          }
          
          const formattedEnd = `${end.getMonth() + 1}.${end.getDate()}`
          return `${formattedStart}-${formattedEnd}`
        }
        
        return formattedStart
      } catch (e) {
        console.error('时间格式化错误:', e, startTime, endTime);
        return '时间待定';
      }
    },
    
    // 格式化课程日期和时间
    formatCourseDateAndTime(startDate, endDate, startTime, endTime) {
      // 检查必要参数
      if (!startDate && !endDate) {
        // 尝试使用原有的时间格式
        if (startTime && startTime.includes(' ')) {
          const parts = startTime.split(' ');
          startDate = parts[0];
          startTime = parts[1];
          
          if (endTime && endTime.includes(' ')) {
            const endParts = endTime.split(' ');
            endDate = endParts[0];
            endTime = endParts[1];
          }
        } else if (!startTime) {
          return '时间待定';
        }
      }
      
      // 格式化日期部分
      const formatDate = (dateStr) => {
        if (!dateStr) return '';
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return '';
          
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          
          return `${year}-${month}-${day}`;
        } catch (e) {
          console.error('日期格式化错误:', e, dateStr);
          return '';
        }
      };
      
      // 格式化时间部分
      const formatTime = (timeStr) => {
        if (!timeStr) return '';
        try {
          // 如果是标准时间格式 (HH:MM)
          if (timeStr.includes(':')) {
            return timeStr.substring(0, 5); // 只取小时和分钟 HH:MM
          }
          
          // 如果是完整日期时间，尝试提取时间部分
          if (timeStr.includes('T') || timeStr.includes(' ')) {
            const date = new Date(timeStr);
            if (!isNaN(date.getTime())) {
              return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            }
          }
          
          return timeStr; // 如果无法解析，返回原值
        } catch (e) {
          console.error('时间格式化错误:', e, timeStr);
          return timeStr;
        }
      };
      
      // 尝试格式化日期和时间
      const startDateFormatted = formatDate(startDate);
      const endDateFormatted = formatDate(endDate);
      const startTimeFormatted = formatTime(startTime);
      const endTimeFormatted = formatTime(endTime);
      
      // 组合日期和时间
      let result = '';
      
      // 添加日期范围
      if (startDateFormatted && endDateFormatted) {
        if (startDateFormatted === endDateFormatted) {
          // 如果开始和结束日期相同
          result = startDateFormatted;
        } else {
          result = `${startDateFormatted} 至 ${endDateFormatted}`;
        }
      } else if (startDateFormatted) {
        result = startDateFormatted;
      } else if (endDateFormatted) {
        result = endDateFormatted;
      }
      
      // 添加时间范围
      if (startTimeFormatted && endTimeFormatted) {
        if (result) {
          result += ` ${startTimeFormatted}-${endTimeFormatted}`;
        } else {
          result = `${startTimeFormatted}-${endTimeFormatted}`;
        }
      } else if (startTimeFormatted) {
        if (result) {
          result += ` ${startTimeFormatted}`;
        } else {
          result = startTimeFormatted;
        }
      }
      
      return result || '时间待定';
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
    },

    // 获取教师头像
    getTeacherAvatar(course) {
      // 如果没有教师信息，返回默认头像
      if (!course.teacherName) {
        return '/static/images/default-avatar.png';
      }
      
      // 处理教师头像URL - 优先顺序：teacherAvatar > avatar > 默认头像
      if (course.teacherAvatar) {
        // 检查teacherAvatar是否为完整URL
        if (course.teacherAvatar.startsWith('http://') || course.teacherAvatar.startsWith('https://')) {
          return course.teacherAvatar;
        }
        
        // 检查是否为本地资源路径
        if (course.teacherAvatar.startsWith('/')) {
          return course.teacherAvatar;
        }
        
        // 可能是文件ID，尝试使用完整路径
        return course.teacherAvatar;
      }
      
      // 如果课程中有avatar字段，也可能是教师头像
      if (course.avatar) {
        if (course.avatar.startsWith('http://') || course.avatar.startsWith('https://')) {
          return course.avatar;
        }
        
        if (course.avatar.startsWith('/')) {
          return course.avatar;
        }
        
        return course.avatar;
      }
      
      // 最后返回默认头像
      return '/static/images/default-avatar.png';
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
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            
            .max-students {
              margin-bottom: 8rpx;
              color: $theme-color;
            }
            
            .lesson-count {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 320rpx;
            }
          }
        }
      }
    }
  }
}
</style> 