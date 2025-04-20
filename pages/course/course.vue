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
      <load-more :status="loadMoreStatus" @click="loadMore" :autoLoad="true"></load-more>
      
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
        { label: '初一', value: '初一' },
        { label: '初二', value: '初二' },
        { label: '初三', value: '初三' }
      ],
      
      // 校区筛选相关
      isSchoolFilterShow: false,
      selectedSchool: 'all',
      schoolOptions: [
        { label: '全部校区', value: 'all' }
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
      limit: 999, // 增大每页数量，一次性加载所有课程
      total: 0,
      loadMoreStatus: 'more', // more-加载更多 loading-加载中 noMore-没有更多了
      isLoading: false,
      allCourses: [], // 存储所有课程数据
      displayCount: 10, // 初始显示数量
      isReachBottom: false // 是否触底标记
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
    // 加载校区数据
    this.getLocationList()
    this.loadCourseList()
  },
  onPullDownRefresh() {
    this.resetList()
    this.loadCourseList().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    console.log('触发页面触底事件');
    this.isReachBottom = true;
    this.loadMoreCourses();
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
      this.allCourses = [];
      this.displayCount = 10;
      this.total = 0;
      this.loadMoreStatus = 'more';
    },
    
    // 加载更多
    loadMore() {
      // 优先从已加载的数据中显示更多
      if (this.allCourses.length > this.courseList.length) {
        this.loadMoreCourses();
      } 
      // 如果已加载的数据都显示完了，再从服务器加载更多
      else if (this.loadMoreStatus === 'more' && !this.isLoading) {
        this.page++;
        this.loadCourseList();
      }
    },
    
    // 从已加载的课程中显示更多
    loadMoreCourses() {
      if (this.allCourses.length <= this.courseList.length) {
        console.log('已经显示所有已加载的课程数据');
        return;
      }
      
      console.log('从已加载数据中显示更多课程');
      const newDisplayCount = this.displayCount + 10; // 每次增加10个
      this.displayCount = newDisplayCount;
      this.courseList = this.allCourses.slice(0, newDisplayCount);
      console.log('增加显示课程数量，当前显示:', this.courseList.length);
      
      // 检查是否已显示所有数据
      if (this.courseList.length >= this.allCourses.length && this.courseList.length >= this.total) {
        this.loadMoreStatus = 'noMore';
      }
      
      // 重置触底状态
      this.isReachBottom = false;
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
          // 同时传递grade参数，以支持新的年级筛选
          params.grade = this.selectedGradeGroup;
        }
        
        if (this.selectedSchool !== 'all') {
          params.location = this.selectedSchool;
        }
        
        if (this.selectedSubject !== 'all') {
          params.subject = this.selectedSubject;
        }
        
        console.log('发送到后端的查询参数:', params);
        
        // 设置重试次数
        let retryCount = 0;
        const maxRetries = 3;
        let result = null;
        
        while(retryCount < maxRetries) {
          try {
            // 调用云函数获取课程列表
            result = await this.$api.course.getCourseList(params);
            // 如果成功获取数据，跳出重试循环
            if(result && result.success) {
              break;
            }
          } catch (error) {
            console.error(`第${retryCount + 1}次尝试失败:`, error);
          }
          
          // 重试前等待一段时间
          await new Promise(resolve => setTimeout(resolve, 1000));
          retryCount++;
          
          if(retryCount === maxRetries) {
            // 所有重试都失败了
            throw new Error('多次尝试获取课程列表失败');
          }
        }
        
        console.log('云函数返回结果:', result, '数据条数:', result?.data?.length || 0);
        
        // 处理返回结果
        if (result && result.data && result.data.length > 0) {
          // 处理每个课程的教师头像数据
          const processedData = await this.processTeacherAvatars(result.data);
          
          if (this.page === 1) {
            this.allCourses = processedData;
            // 初始只显示部分课程
            this.courseList = processedData.slice(0, this.displayCount);
          } else {
            this.allCourses = [...this.allCourses, ...processedData];
            // 更新显示的课程
            this.courseList = this.allCourses.slice(0, this.displayCount);
          }
          
          this.total = result.total || processedData.length;
          
          console.log('当前显示课程总数:', this.courseList.length);
          console.log('已加载课程总数:', this.allCourses.length);
          console.log('服务器返回总数:', this.total);
          
          // 更新加载状态
          const hasMoreOnServer = this.allCourses.length < this.total;
          if (!hasMoreOnServer && this.courseList.length >= this.allCourses.length) {
            this.loadMoreStatus = 'noMore';
          } else {
            this.loadMoreStatus = 'more';
          }
          
          // 如果触底了，立即显示更多
          if (this.isReachBottom) {
            this.loadMoreCourses();
          }
        } else {
          if (this.page === 1) {
            this.courseList = [];
            this.allCourses = [];
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
    
    // 处理教师头像数据
    async processTeacherAvatars(courses) {
      if (!courses || courses.length === 0) return courses;
      
      // 获取所有需要查询教师信息的课程
      const needTeacherInfoCourses = courses.filter(course => 
        course.teacherName && (!course.teacherAvatarUrl || !course.teacherAvatar)
      );
      
      if (needTeacherInfoCourses.length === 0) return courses;
      
      console.log('需要查询教师头像的课程数:', needTeacherInfoCourses.length);
      
      // 获取所有需要查询的教师名称
      const teacherNames = needTeacherInfoCourses
        .map(course => course.teacherName)
        .filter((name, index, self) => self.indexOf(name) === index); // 去重
      
      try {
        // 批量查询教师信息
        const teacherResult = await this.$api.teacher.getTeacherList();
        
        if (teacherResult && teacherResult.code === 0 && teacherResult.data) {
          const teachers = teacherResult.data;
          console.log('获取到教师数据:', teachers.length);
          
          // 创建教师名称到头像的映射
          const teacherAvatarMap = {};
          teachers.forEach(teacher => {
            if (teacher.name && teacher.avatar) {
              teacherAvatarMap[teacher.name] = teacher.avatar;
            }
          });
          
          // 为每个课程添加教师头像URL
          return courses.map(course => {
            if (course.teacherName && teacherAvatarMap[course.teacherName]) {
              course.teacherAvatarUrl = teacherAvatarMap[course.teacherName];
              console.log(`为课程 ${course.title} 设置教师头像:`, course.teacherAvatarUrl);
            }
            return course;
          });
        }
      } catch (error) {
        console.error('获取教师头像信息失败:', error);
      }
      
      return courses;
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
    },
    
    // 获取校区列表
    async getLocationList() {
      try {
        const result = await this.$api.location.getLocationList();
        console.log('获取校区列表结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 将校区数据转换为下拉选项格式
          const locations = result.data.map(item => {
            return {
              label: item.name,
              value: item.name
            };
          });
          
          // 将全部校区选项和后端获取的校区选项合并
          this.schoolOptions = [
            { label: '全部校区', value: 'all' },
            ...locations
          ];
          
          console.log('更新后的校区选项:', this.schoolOptions);
        } else {
          console.warn('未获取到校区数据，使用默认值');
        }
      } catch (e) {
        console.error('获取校区列表失败:', e);
        uni.showToast({
          title: '获取校区列表失败',
          icon: 'none'
        });
      }
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
  
  .filter-dropdown {
    position: relative;
    flex: 1;
    
    .filter-item {
      height: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20rpx;
      
      .filter-text {
        font-size: 28rpx;
        font-weight: bold;
        margin-right: 6rpx;
        color: #fff !important; /* 强制使用白色 */
      }
      
      .arrow-icon {
        width: 0;
        height: 0;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
        border-top: 10rpx solid #fff; /* 箭头颜色设为白色 */
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
        color: #333; /* 下拉菜单标题保持黑色 */
        border-bottom: 1rpx solid #eee;
      }
      
      .dropdown-options {
        max-height: 350rpx;
        overflow-y: auto;
        
        .dropdown-option {
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          font-size: 28rpx;
          color: #333; /* 下拉选项保持黑色 */
          
          &.active {
            color: #EC7A49; /* 选中项使用主题色 */
            font-weight: bold;
          }
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