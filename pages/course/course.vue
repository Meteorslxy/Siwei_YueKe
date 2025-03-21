<template>
  <view class="course-container">
    <!-- 顶部背景 -->
    <view class="header-background" :style="{ paddingTop: statusBarHeight + 'px' }">
      <!-- 筛选区域 -->
      <view class="filter-section">
        <!-- 多选筛选 -->
        <view class="filter-dropdown">
          <view class="filter-item" @click="toggleGradeFilter">
            <text class="filter-text">{{selectedGradeText}}</text>
            <view class="arrow-icon" :class="{ 'arrow-up': isGradeFilterShow }"></view>
          </view>
          <view class="filter-dropdown-content" v-if="isGradeFilterShow">
            <view class="dropdown-title">选择年级</view>
            <view class="dropdown-options">
              <view 
                class="dropdown-option" 
                v-for="(grade, index) in gradeGroups" 
                :key="index"
                :class="{ active: selectedGradeGroup === grade.value }"
                @click="selectGradeGroup(grade.value)">
                {{grade.label}}
              </view>
            </view>
          </view>
        </view>

        <view class="filter-dropdown">
          <view class="filter-item" @click="toggleSchoolFilter">
            <text class="filter-text">{{selectedSchoolText}}</text>
            <view class="arrow-icon" :class="{ 'arrow-up': isSchoolFilterShow }"></view>
          </view>
          <view class="filter-dropdown-content" v-if="isSchoolFilterShow">
            <view class="dropdown-title">选择校区</view>
            <view class="dropdown-options">
              <view 
                class="dropdown-option" 
                v-for="(school, index) in schoolOptions" 
                :key="index"
                :class="{ active: selectedSchool === school.value }"
                @click="selectSchool(school.value)">
                {{school.label}}
              </view>
            </view>
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
        <view class="course-left">
          <view class="course-brand-logo">
            <text class="brand-text">思维</text>
            <text class="brand-text sm">拓展</text>
          </view>
          <image class="course-logo" :src="item.coverImage" mode="aspectFill"></image>
        </view>
        <view class="course-content">
          <view class="course-title">
            <text v-if="item.school" class="school-tag">[{{item.school}}]</text>
            <text>{{item.title}}</text>
          </view>
          <view class="course-info">
            <text class="location-icon iconfont icon-location"></text>
            <text class="location-text">{{item.schoolName || item.location}}</text>
          </view>
          <view class="course-info">
            <text class="time-icon iconfont icon-time"></text>
            <text class="time-text">{{formatCourseTime(item.startTime, item.endTime)}}</text>
          </view>
          <view class="course-info">
            <text class="tag-icon iconfont icon-tag"></text>
            <text class="subject-text">{{item.subjects || '未分类'}}</text>
            <text class="level-text" v-if="item.educationalStages">| {{item.educationalStages}}</text>
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
      // 状态栏高度
      statusBarHeight: 0,
      
      // 年级筛选相关
      isGradeFilterShow: false,
      selectedGradeGroup: 'all',
      gradeGroups: [
        { label: '全部', value: 'all' },
        { label: '小学', value: '小学' },
        { label: '初中', value: '初中' }
      ],
      
      // 校区筛选相关
      isSchoolFilterShow: false,
      selectedSchool: 'all',
      schoolOptions: [
        { label: '全部校区', value: 'all' },
        { label: '雨花台校区', value: '雨花台校区' },
        { label: '大行宫校区', value: '大行宫校区' },
        { label: '闵行校区', value: '闵行校区' }
      ],
      
      // 学科筛选相关
      selectedSubject: 'all',
      subjectOptions: [
        { label: '全部', value: 'all' },
        { label: '语文', value: '语文' },
        { label: '数学', value: '数学' },
        { label: '英语', value: '英语' },
        { label: '物理', value: '物理' },
        { label: '化学', value: '化学' }
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
      const found = this.gradeGroups.find(item => item.value === this.selectedGradeGroup)
      return found ? found.label : '全部'
    },
    selectedSchoolText() {
      const found = this.schoolOptions.find(item => item.value === this.selectedSchool)
      return found ? found.label : '全部校区'
    }
  },
  onLoad() {
    this.getStatusBarHeight()
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
    
    // 切换年级筛选下拉框
    toggleGradeFilter() {
      this.isGradeFilterShow = !this.isGradeFilterShow
      if (this.isGradeFilterShow) {
        this.isSchoolFilterShow = false
      }
    },
    
    // 切换校区筛选下拉框
    toggleSchoolFilter() {
      this.isSchoolFilterShow = !this.isSchoolFilterShow
      if (this.isSchoolFilterShow) {
        this.isGradeFilterShow = false
      }
    },
    
    // 选择年级组
    selectGradeGroup(gradeGroup) {
      if (this.selectedGradeGroup === gradeGroup) return
      
      this.selectedGradeGroup = gradeGroup
      this.isGradeFilterShow = false
      this.resetList()
      this.loadCourseList()
    },
    
    // 选择校区
    selectSchool(school) {
      if (this.selectedSchool === school) return
      
      this.selectedSchool = school
      this.isSchoolFilterShow = false
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
    
    // 重置列表
    resetList() {
      this.page = 1;
      this.courseList = [];
      this.total = 0;
      this.loadMoreStatus = 'more';
    },
    
    // 加载更多
    loadMore() {
      if (this.isLoading) return;
      this.page++;
      this.loadCourseList();
    },
    
    // 获取课程列表
    async loadCourseList() {
      if (this.isLoading) return;
      
      this.isLoading = true;
      this.loadMoreStatus = 'loading';
      
      try {
        // 构建查询参数
        const params = {
          page: this.page,
          pageSize: this.limit
        };
        
        // 添加筛选条件
        if (this.selectedGradeGroup !== 'all') {
          params.educationalStages = this.selectedGradeGroup;
        }
        
        if (this.selectedSchool !== 'all') {
          params.location = this.selectedSchool;
        }
        
        if (this.selectedSubject !== 'all') {
          params.subjects = this.selectedSubject;
        }
        
        console.log('发送课程查询参数:', params);
        
        // 调用云函数获取课程列表
        const result = await this.$api.course.getCourseList(params);
        console.log('云函数返回结果:', result);
        
        // 处理返回结果
        if (result && result.data) {
          let filteredData = [...result.data];
          
          // 前端再次过滤数据，确保结果正确
          if (this.selectedGradeGroup !== 'all') {
            filteredData = filteredData.filter(item => 
              item.educationalStages === this.selectedGradeGroup
            );
          }
          
          if (this.selectedSchool !== 'all') {
            filteredData = filteredData.filter(item => 
              item.location === this.selectedSchool || 
              item.schoolName === this.selectedSchool
            );
          }
          
          if (this.selectedSubject !== 'all') {
            filteredData = filteredData.filter(item => 
              item.subjects === this.selectedSubject
            );
          }
          
          console.log('前端过滤后的数据:', filteredData);
          
          if (this.page === 1) {
            this.courseList = filteredData;
          } else {
            this.courseList = [...this.courseList, ...filteredData];
          }
          
          this.total = filteredData.length;
          
          // 更新加载状态
          if (this.courseList.length >= this.total) {
            this.loadMoreStatus = 'noMore';
          } else {
            this.loadMoreStatus = 'more';
          }
        } else {
          if (this.page === 1) {
            this.courseList = [];
          }
          this.loadMoreStatus = 'noMore';
        }
      } catch (error) {
        console.error('获取课程列表失败:', error);
        uni.showToast({
          title: '获取课程列表失败',
          icon: 'none'
        });
        this.loadMoreStatus = 'more';
      } finally {
        this.isLoading = false;
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
    }
  }
}
</script>

<style lang="scss">
.course-container {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 顶部背景 */
.header-background {
  width: 100%;
  background-color: #EC7A49; /* 与用户页面一致的颜色 */
  padding-bottom: 120rpx;
}

/* 筛选区域 */
.filter-section {
  padding: 40rpx 30rpx 30rpx;
  display: flex;
  gap: 20rpx;
}

.filter-dropdown {
  position: relative;
  flex: 1;
  
  .filter-item {
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 20rpx;
    
    .filter-text {
      font-size: 28rpx;
      font-weight: bold;
      margin-right: 6rpx;
    }
    
    .arrow-icon {
      width: 0;
      height: 0;
      border-left: 10rpx solid transparent;
      border-right: 10rpx solid transparent;
      border-top: 10rpx solid #fff;
      margin-left: 0;
      transition: transform 0.3s;
      
      &.arrow-up {
        transform: rotate(180deg);
      }
    }
  }
  
  .filter-dropdown-content {
    position: absolute;
    top: 80rpx;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 12rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
    z-index: 100;
    
    .dropdown-title {
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      font-size: 28rpx;
      color: $text-color-light;
      border-bottom: 1rpx solid $border-color-light;
    }
    
    .dropdown-options {
      max-height: 350rpx;
      overflow-y: auto;
      
      .dropdown-option {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 28rpx;
        color: $text-color;
        
        &.active {
          color: $theme-color;
          font-weight: bold;
        }
      }
    }
  }
}

/* 学科选项卡 */
.subject-scroll {
  white-space: nowrap;
  padding: 0 20rpx;
  margin-top: 20rpx;
  
  .subject-item {
    display: inline-block;
    padding: 0 30rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    position: relative;
    color: rgba(255,255,255,0.8);
    
    &.active {
      color: #fff;
      font-weight: bold;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30rpx;
        height: 4rpx;
        background-color: #fff;
        border-radius: 2rpx;
      }
    }
  }
}

/* 课程列表 */
.course-list {
  padding: 20rpx 30rpx 30rpx;
  margin-top: -100rpx;
  position: relative;
  z-index: 10;
  
  .course-item {
    display: flex;
    margin-bottom: 30rpx;
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    
    .course-left {
      width: 180rpx;
      height: 220rpx;
      position: relative;
      
      .course-brand-logo {
        position: absolute;
        top: 10rpx;
        left: 10rpx;
        width: 80rpx;
        height: 80rpx;
        background-color: $theme-color;
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        
        .brand-text {
          font-size: 28rpx;
          line-height: 1.2;
        }
        
        .brand-text.sm {
          font-size: 22rpx;
          line-height: 1.2;
        }
      }
      
      .course-logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .course-content {
      flex: 1;
      padding: 20rpx;
      position: relative;
      
      .course-title {
        font-size: 28rpx;
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
        
        .location-icon, .time-icon, .tag-icon {
          font-size: 24rpx;
          margin-right: 8rpx;
        }
        
        .subject-text {
          color: #4CAF50;
          margin-right: 6rpx;
        }
        
        .level-text {
          color: #888;
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

  .course-item:first-child {
    margin-top: 10rpx;
  }
}
</style> 