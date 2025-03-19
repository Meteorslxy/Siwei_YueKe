<template>
  <view class="course-container">
    <!-- 筛选区域 -->
    <view class="filter-area">
      <!-- 年级筛选 -->
      <view class="grade-filter">
        <view class="selected-grade" @click="toggleGradeSelect">
          <text class="label">{{selectedGradeText}}</text>
          <text class="iconfont" :class="isGradeSelectShow ? 'icon-up' : 'icon-down'"></text>
        </view>
        <view class="grade-dropdown" v-if="isGradeSelectShow">
          <view 
            class="grade-option" 
            v-for="(grade, index) in gradeOptions" 
            :key="index"
            :class="{ active: selectedGrade === grade.value }"
            @click="selectGrade(grade.value)">
            {{grade.label}}
          </view>
        </view>
      </view>
      
      <!-- 学科选项卡 -->
      <scroll-view class="subject-scroll" scroll-x show-scrollbar="false">
        <view 
          class="subject-item" 
          v-for="(subject, index) in subjectOptions" 
          :key="index"
          :class="{ active: selectedSubject === subject.value }"
          @click="selectSubject(subject.value)">
          {{subject.label}}
        </view>
      </scroll-view>
    </view>
    
    <!-- 课程列表 -->
    <view class="course-list">
      <view 
        class="course-item" 
        v-for="(item, index) in courseList" 
        :key="index"
        @click="navigateTo(`/pages/course/detail?id=${item._id}`)">
        <view class="course-logo">
          <image class="logo-image" :src="item.coverImage" mode="aspectFill"></image>
        </view>
        <view class="course-content">
          <view class="course-title">
            <text v-if="item.school" class="school-tag">[{{item.school}}]</text>
            <text>{{item.title}}</text>
          </view>
          <view class="course-info">
            <text class="location-icon iconfont icon-location"></text>
            <text class="location-text">{{item.schoolName}}</text>
          </view>
          <view class="course-info">
            <text class="time-icon iconfont icon-time"></text>
            <text class="time-text">{{formatCourseTime(item.startTime, item.endTime)}}</text>
          </view>
          <view class="course-teacher">
            <image class="teacher-avatar" :src="item.teacherAvatar" mode="aspectFill"></image>
            <text class="teacher-name">{{item.teacherName}}</text>
            <text class="teacher-title">{{item.teacherTitle}}</text>
          </view>
          <view class="course-price">
            <text class="price-value">{{item.price}}.00</text>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
      
      <!-- 空数据提示 -->
      <empty-tip v-if="courseList.length === 0" tip="暂无相关课程"></empty-tip>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 年级筛选相关
      isGradeSelectShow: false,
      selectedGrade: 'all',
      gradeOptions: [
        { label: '全部', value: 'all' },
        { label: '一年级', value: 'grade1' },
        { label: '二年级', value: 'grade2' },
        { label: '三年级', value: 'grade3' },
        { label: '四年级', value: 'grade4' },
        { label: '五年级', value: 'grade5' },
        { label: '六年级', value: 'grade6' },
        { label: '初中', value: 'junior' },
        { label: '高中', value: 'senior' }
      ],
      
      // 学科筛选相关
      selectedSubject: 'all',
      subjectOptions: [
        { label: '全部', value: 'all' },
        { label: '语文', value: 'chinese' },
        { label: '数学', value: 'math' },
        { label: '英语', value: 'english' },
        { label: '物理', value: 'physics' },
        { label: '化学', value: 'chemistry' }
      ],
      
      // 课程列表相关
      courseList: [],
      page: 1,
      limit: 10,
      total: 0,
      loadMoreStatus: 'more', // more-加载更多 loading-加载中 noMore-没有更多了
      isLoading: false
    }
  },
  computed: {
    selectedGradeText() {
      const found = this.gradeOptions.find(item => item.value === this.selectedGrade)
      return found ? found.label : '全部'
    }
  },
  onLoad() {
    this.loadCourseList()
  },
  onPullDownRefresh() {
    this.resetList()
    this.loadCourseList().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.loadMoreStatus === 'more') {
      this.loadMore()
    }
  },
  methods: {
    // 切换年级筛选下拉框
    toggleGradeSelect() {
      this.isGradeSelectShow = !this.isGradeSelectShow
    },
    
    // 选择年级
    selectGrade(grade) {
      if (this.selectedGrade === grade) return
      
      this.selectedGrade = grade
      this.isGradeSelectShow = false
      this.resetList()
      this.loadCourseList()
    },
    
    // 选择学科
    selectSubject(subject) {
      if (this.selectedSubject === subject) return
      
      this.selectedSubject = subject
      this.resetList()
      this.loadCourseList()
    },
    
    // 重置列表数据
    resetList() {
      this.page = 1
      this.courseList = []
    },
    
    // 加载更多
    loadMore() {
      this.page++
      this.loadCourseList()
    },
    
    // 获取课程列表
    async fetchCourses() {
      if (this.isLoading) return Promise.resolve()
      
      this.isLoading = true
      
      try {
        // 使用API接口调用云函数
        const params = {
          gradeLevel: this.selectedGrade !== 'all' ? this.selectedGrade : '',
          subject: this.selectedSubject !== 'all' ? this.selectedSubject : '',
          limit: this.limit,
          skip: (this.page - 1) * this.limit
        };
        
        const result = await this.$api.course.getCourseList(params);
        
        if (result && result.success) {
          const newList = result.data
          this.total = result.total
          
          if (this.page === 1) {
            this.courseList = newList
          } else {
            this.courseList = [...this.courseList, ...newList]
          }
          
          // 更新加载状态
          this.loadMoreStatus = this.courseList.length >= this.total ? 'noMore' : 'more'
        } else {
          // 模拟数据
          this.useMockData()
        }
      } catch (e) {
        console.error('获取课程列表失败:', e)
        // 加载失败，使用模拟数据
        this.useMockData()
      }
      
      this.isLoading = false
      return Promise.resolve()
    },
    
    // 使用模拟数据
    useMockData() {
      const mockData = [
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
          startTime: '2023-07-08 08:30',
          endTime: '2023-07-10 08:30'
        }
      ]
      
      if (this.page === 1) {
        this.courseList = mockData
      } else {
        this.courseList = [...this.courseList, ...mockData]
      }
      
      this.total = 10
      this.loadMoreStatus = this.courseList.length >= this.total ? 'noMore' : 'more'
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
    }
  }
}
</script>

<style lang="scss">
.course-container {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 筛选区域 */
.filter-area {
  background-color: #fff;
  
  /* 年级筛选 */
  .grade-filter {
    position: relative;
    
    .selected-grade {
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      .label {
        font-size: 32rpx;
        font-weight: bold;
      }
      
      .iconfont {
        font-size: 24rpx;
        margin-left: 8rpx;
      }
    }
    
    .grade-dropdown {
      position: absolute;
      top: 80rpx;
      left: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
      z-index: 10;
      
      .grade-option {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 28rpx;
        border-bottom: 1rpx solid $border-color-light;
        
        &.active {
          color: $theme-color;
          font-weight: bold;
        }
      }
    }
  }
  
  /* 学科选项卡 */
  .subject-scroll {
    white-space: nowrap;
    border-bottom: 1rpx solid $border-color-light;
    
    .subject-item {
      display: inline-block;
      padding: 0 30rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      position: relative;
      
      &.active {
        color: $theme-color;
        font-weight: bold;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30rpx;
          height: 4rpx;
          background-color: $theme-color;
          border-radius: 2rpx;
        }
      }
    }
  }
}

/* 课程列表 */
.course-list {
  padding: 20rpx;
  
  .course-item {
    display: flex;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
    
    .course-logo {
      width: 220rpx;
      height: 220rpx;
      overflow: hidden;
      
      .logo-image {
        width: 100%;
        height: 100%;
      }
    }
    
    .course-content {
      flex: 1;
      padding: 16rpx;
      position: relative;
      
      .course-title {
        font-size: 30rpx;
        font-weight: bold;
        color: $text-color;
        margin-bottom: 12rpx;
        
        .school-tag {
          color: $theme-color;
          margin-right: 6rpx;
        }
      }
      
      .course-info {
        font-size: 24rpx;
        color: $text-color-grey;
        margin-bottom: 8rpx;
        display: flex;
        align-items: center;
        
        .location-icon, .time-icon {
          font-size: 24rpx;
          margin-right: 8rpx;
        }
      }
      
      .course-teacher {
        display: flex;
        align-items: center;
        margin-top: 16rpx;
        
        .teacher-avatar {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }
        
        .teacher-name {
          font-size: 24rpx;
          color: $text-color;
          margin-right: 10rpx;
        }
        
        .teacher-title {
          font-size: 22rpx;
          color: $text-color-light;
        }
      }
      
      .course-price {
        position: absolute;
        right: 16rpx;
        bottom: 16rpx;
        
        .price-value {
          font-size: 32rpx;
          font-weight: bold;
          color: #FF3B30;
        }
      }
    }
  }
}
</style> 