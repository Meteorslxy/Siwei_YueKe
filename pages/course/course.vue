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
      <block v-if="courseList.length > 0">
        <course-card 
          v-for="(item, index) in courseList" 
          :key="index"
          :course="item"
          @click="navigateTo(`/pages/course/detail?id=${item._id}`)"
        ></course-card>
      </block>
      
      <!-- 加载更多 -->
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
      
      <!-- 空数据提示 -->
      <empty-tip v-if="courseList.length === 0" tip="暂无相关课程"></empty-tip>
    </view>
  </view>
</template>

<script>
import CourseCard from '@/components/course-card/course-card.vue'
import LoadMore from '@/components/load-more/load-more.vue'
import EmptyTip from '@/components/empty-tip/empty-tip.vue'

export default {
  components: {
    CourseCard,
    LoadMore,
    EmptyTip
  },
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      
      // 年级筛选相关
      isGradeFilterShow: false,
      selectedGradeGroup: 'all',
      gradeGroups: [
        { label: '全部年级', value: 'all' },
        { label: '小学', value: '小学' },
        { label: '初中', value: '初中' }
      ],
      
      // 校区筛选相关
      isSchoolFilterShow: false,
      selectedSchool: 'all',
      schoolOptions: [
        { label: '全部校区', value: 'all' },
        { label: '江宁万达', value: '江宁万达' },
        { label: '江宁黄金海岸', value: '江宁黄金海岸' },
        { label: '大行宫', value: '大行宫' },
        { label: '新街口', value: '新街口' },
        { label: '雨花', value: '雨花' },
        { label: '桥北', value: '桥北' },
        { label: '奥体', value: '奥体' },
        { label: '龙江', value: '龙江' },
        { label: '六合', value: '六合' }
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
      
      console.log('开始加载课程列表，当前筛选条件：', {
        年级: this.selectedGradeGroup,
        校区: this.selectedSchool,
        学科: this.selectedSubject,
        页码: this.page,
        数量限制: this.limit
      });
      
      try {
        // 构建查询参数
        const params = {
          page: this.page,
          pageSize: this.limit
        };
        
        // 添加筛选条件 - 确保参数名称与后端一致
        if (this.selectedGradeGroup !== 'all') {
          params.educationalStages = this.selectedGradeGroup;
        }
        
        if (this.selectedSchool !== 'all') {
          params.location = this.selectedSchool;
        }
        
        if (this.selectedSubject !== 'all') {
          params.subject = this.selectedSubject;
        }
        
        console.log('发送到后端的查询参数:', params);
        
        // 调用云函数获取课程列表
        const result = await this.$api.course.getCourseList(params);
        console.log('云函数返回结果:', result, '数据条数:', result?.data?.length || 0);
        
        // 处理返回结果
        if (result && result.data) {
          let filteredData = [...result.data];
          
          // 处理每个课程的时间字段，避免NaN问题
          filteredData = filteredData.map(course => {
            // 处理日期和时间
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
            
            return course;
          });
          
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
      if (!startTime) return '时间待定';
      
      try {
        // 尝试解析日期
        const start = new Date(startTime);
        
        // 检查日期是否有效
        if (isNaN(start.getTime())) {
          console.warn('无效的开始时间格式:', startTime);
          
          // 如果是YYYY-MM-DD格式，直接返回
          if (typeof startTime === 'string' && 
              (startTime.includes('-') || startTime.includes('/'))) {
            return startTime;
          }
          
          return '时间待定';
        }
        
        const formattedStart = `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}`;
        
        if (endTime) {
          const end = new Date(endTime);
          
          // 检查结束日期是否有效
          if (isNaN(end.getTime())) {
            console.warn('无效的结束时间格式:', endTime);
            return formattedStart;
          }
          
          const formattedEnd = `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, '0')}-${end.getDate().toString().padStart(2, '0')}`;
          return `${formattedStart} 至 ${formattedEnd}`;
        }
        
        return formattedStart;
      } catch (e) {
        console.error('时间格式化错误:', e, startTime, endTime);
        
        // 如果是字符串格式，尝试直接返回
        if (typeof startTime === 'string') {
          return startTime;
        }
        
        return '时间待定';
      }
    },
    
    // 页面导航
    navigateTo(url) {
      uni.navigateTo({ url });
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
  padding: 30rpx 30rpx 30rpx;
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
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
          margin-right: 20rpx;
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