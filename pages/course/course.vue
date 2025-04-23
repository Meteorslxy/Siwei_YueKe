<template>
  <view class="course-container" @click="closeAllDropdowns">
    <!-- 顶部背景 -->
    <view class="header-background" :style="{ paddingTop: statusBarHeight + 'px' }">
      <!-- 顶部标题 -->
      <view class="app-title">四维工作室</view>
      
      <!-- 顶部城市选择和年级选择栏 -->
      <view class="sub-header">
        <view class="city-selector" @click.stop="toggleGradeFilter">
          <text class="grade-name">{{selectedGradeText}}</text>
          <view class="arrow-icon" :class="{ 'arrow-up': isGradeFilterShow }"></view>
        </view>
        
        <view class="grade-selector" @click.stop="toggleSchoolFilter">
          <text class="city-name">{{selectedSchoolText}}</text>
          <view class="arrow-icon" :class="{ 'arrow-up': isSchoolFilterShow }"></view>
        </view>
      </view>
      
      <!-- 年级选择面板 -->
      <view class="grade-dropdown-panel" v-if="isGradeFilterShow" @click.stop>
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
      
      <!-- 校区选择面板 -->
      <view class="grade-dropdown" v-if="isSchoolFilterShow" @click.stop>
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
      
      <!-- 筛选区域 -->
      <view class="filter-section">
        <!-- 科目筛选 -->
        <view class="filter-dropdown">
          <view class="filter-item" @click.stop="toggleSubjectFilter">
            <text class="filter-text">{{selectedSubject === 'all' ? '科目' : getSubjectLabel(selectedSubject)}}</text>
            <view class="arrow-icon" :class="{ 'arrow-up': isSubjectFilterShow }"></view>
          </view>
          
          <!-- 科目下拉选项 -->
          <view class="dropdown-content" v-if="isSubjectFilterShow" @click.stop>
            <view 
              class="dropdown-option" 
              v-for="(subject, index) in subjectOptions" 
              :key="index"
              :class="{ active: selectedSubject === subject.value }"
              @click="selectSubject(subject.value)">
              {{subject.label}}
            </view>
          </view>
        </view>
        
        <!-- 学期筛选 -->
        <view class="filter-dropdown">
          <view class="filter-item" @click.stop="toggleTermFilter">
            <text class="filter-text">{{selectedTerm === 'all' ? '学期' : getTermLabel(selectedTerm)}}</text>
            <view class="arrow-icon" :class="{ 'arrow-up': isTermFilterShow }"></view>
          </view>
          
          <!-- 学期下拉选项 -->
          <view class="dropdown-content" v-if="isTermFilterShow" @click.stop>
            <view 
              class="dropdown-option" 
              v-for="(term, index) in termOptions" 
              :key="index"
              :class="{ active: selectedTerm === term.value }"
              @click="selectTerm(term.value)">
              {{term.label}}
            </view>
          </view>
        </view>
        
        <!-- 班型筛选 -->
        <view class="filter-dropdown">
          <view class="filter-item" @click.stop="toggleClassTypeFilter">
            <text class="filter-text">{{selectedCourseType === 'all' ? '班型' : getClassTypeLabel(selectedCourseType)}}</text>
            <view class="arrow-icon" :class="{ 'arrow-up': isClassTypeFilterShow }"></view>
          </view>
          
          <!-- 班型下拉选项 -->
          <view class="dropdown-content" v-if="isClassTypeFilterShow" @click.stop>
            <view 
              class="dropdown-option" 
              v-for="(type, index) in courseTypes" 
              :key="index"
              :class="{ active: selectedCourseType === type.value }"
              @click="selectCourseType(type.value)">
              {{type.label}}
            </view>
          </view>
        </view>
        
        <!-- 筛选按钮 -->
        <view class="filter-button" @click.stop="showFilterPanel">
          <view class="filter-icon"></view>
          <text class="filter-button-text">筛选</text>
        </view>
      </view>
    </view>
    
    <!-- 遮罩层 -->
    <view class="mask" v-if="isFilterPanelShow" @click="hideFilterPanel"></view>
    
    <!-- 筛选面板 -->
    <view class="filter-panel" v-if="isFilterPanelShow" :class="{ 'show': isFilterPanelShow }" @click.stop>
      <view class="filter-panel-header">
        <view class="filter-section-title">类型</view>
        <view class="filter-options">
          <view class="filter-option-item" 
            v-for="(type, index) in courseTypes" 
            :key="index"
            :class="{ active: selectedCourseType === type.value }"
            @click="selectCourseType(type.value)">
            {{type.label}}
          </view>
        </view>
      </view>
      
      <view class="filter-panel-section">
        <view class="filter-section-title">时间</view>
        <view class="filter-options">
          <view class="filter-option-item" 
            v-for="(time, index) in timeOptions" 
            :key="index"
            :class="{ active: selectedTime === time.value }"
            @click="selectTime(time.value)">
            {{time.label}}
          </view>
        </view>
      </view>
      
      <view class="filter-panel-section">
        <view class="filter-section-title">校区</view>
        <view class="filter-options">
          <view class="filter-option-item" 
            v-for="(location, index) in schoolOptions" 
            :key="index"
            :class="{ active: selectedSchool === location.value }"
            @click="selectSchool(location.value)">
            {{location.label}}
          </view>
        </view>
      </view>
      
      <view class="filter-panel-section">
        <view class="filter-section-title">教师</view>
        <view class="filter-section-action" @click="toggleAllTeachers">
          <text>不限</text>
          <view class="arrow-icon-right"></view>
        </view>
      </view>
      
      <view class="filter-panel-buttons">
        <view class="reset-button" @click="resetFilters">重置</view>
        <view class="apply-button" @click="applyFilters">完成</view>
      </view>
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
import filterUtils from '@/api/utils/filters'

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
      
      // 筛选面板显示状态
      isFilterPanelShow: false,
      
      // 筛选项显示状态
      isSubjectFilterShow: false,
      isTermFilterShow: false,
      isClassTypeFilterShow: false,
      
      // 年级筛选相关
      isGradeFilterShow: false,
      selectedGradeGroup: 'all',
      gradeGroups: [], // 从grades数据库获取
      
      // 校区筛选相关
      isSchoolFilterShow: false,
      selectedSchool: 'all',
      schoolOptions: [], // 从locations数据库获取
      
      // 课程类型筛选相关
      selectedCourseType: 'all',
      courseTypes: [], // 从course_classtype数据库获取
      
      // 学期筛选相关
      selectedTerm: 'all',
      termOptions: [], // 从course_term数据库获取
      
      // 时间筛选相关
      selectedTime: 'all',
      timeOptions: [
        { label: '不限', value: 'all' },
        { label: '周三', value: 'wednesday' },
        { label: '周四', value: 'thursday' },
        { label: '周五', value: 'friday' },
        { label: '周六', value: 'saturday' },
        { label: '周日', value: 'sunday' },
        { label: '二期', value: 'secondPhase' },
        { label: '三期', value: 'thirdPhase' }
      ],
      
      // 学科筛选相关
      selectedSubject: 'all',
      subjectOptions: [], // 从subjects数据库获取
      
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
    
    // 获取筛选选项数据的Promise数组
    const promises = [
      this.getGradeOptions(),
      this.getSubjectOptions(),
      this.getTermOptions(),
      this.getClassTypeOptions(),
      this.getLocationOptions()
    ];
    
    // 等待所有数据加载完成后再加载课程列表
    Promise.all(promises)
      .then(() => {
        console.log('所有筛选选项加载完成');
        console.log('班型选项:', this.courseTypes);
        this.loadCourseList();
      })
      .catch(error => {
        console.error('筛选选项加载失败:', error);
        // 即使失败也尝试加载课程列表
        this.loadCourseList();
      });
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
    
    // 切换科目筛选
    toggleSubjectFilter() {
      this.isSubjectFilterShow = !this.isSubjectFilterShow
      this.isTermFilterShow = false
      this.isClassTypeFilterShow = false
    },
    
    // 切换学期筛选
    toggleTermFilter() {
      this.isTermFilterShow = !this.isTermFilterShow
      this.isSubjectFilterShow = false
      this.isClassTypeFilterShow = false
    },
    
    // 切换班型筛选
    toggleClassTypeFilter() {
      this.isClassTypeFilterShow = !this.isClassTypeFilterShow
      this.isSubjectFilterShow = false
      this.isTermFilterShow = false
    },
    
    // 显示筛选面板
    showFilterPanel() {
      this.isFilterPanelShow = true
    },
    
    // 隐藏筛选面板
    hideFilterPanel() {
      this.isFilterPanelShow = false
    },
    
    // 选择课程类型
    selectCourseType(type) {
      if (this.selectedCourseType === type) return;
      
      this.selectedCourseType = type;
      this.isClassTypeFilterShow = false;
      this.resetList();
      this.loadCourseList();
    },
    
    // 选择时间
    selectTime(time) {
      if (this.selectedTime === time) return;
      
      this.selectedTime = time;
      this.resetList();
      this.loadCourseList();
    },
    
    // 切换所有教师
    toggleAllTeachers() {
      // 实现切换所有教师的逻辑
    },
    
    // 重置筛选条件
    resetFilters() {
      this.selectedCourseType = 'all'
      this.selectedTime = 'all'
      this.selectedTerm = 'all'
      this.selectedSchool = 'all'
      this.selectedSubject = 'all'
      this.selectedGradeGroup = 'all'
    },
    
    // 应用筛选条件
    applyFilters() {
      this.hideFilterPanel()
      this.resetList()
      this.loadCourseList()
    },
    
    // 切换年级筛选下拉框
    toggleGradeFilter() {
      this.isGradeFilterShow = !this.isGradeFilterShow
      if (this.isGradeFilterShow) {
        this.isSchoolFilterShow = false
        this.isSubjectFilterShow = false
        this.isTermFilterShow = false
        this.isClassTypeFilterShow = false
      }
    },
    
    // 切换校区筛选下拉框
    toggleSchoolFilter() {
      this.isSchoolFilterShow = !this.isSchoolFilterShow
      if (this.isSchoolFilterShow) {
        this.isGradeFilterShow = false
        this.isSubjectFilterShow = false
        this.isTermFilterShow = false
        this.isClassTypeFilterShow = false
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
      this.isSubjectFilterShow = false
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
        学期: this.selectedTerm,
        班型: this.selectedCourseType,
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
          params.grade = this.selectedGradeGroup; // 直接使用年级name作为查询条件
        }
        
        if (this.selectedSchool !== 'all') {
          params.location = this.selectedSchool;
        }
        
        if (this.selectedSubject !== 'all') {
          params.subject = this.selectedSubject;
        }
        
        if (this.selectedTerm !== 'all') {
          params.term = this.selectedTerm;
        }
        
        if (this.selectedCourseType !== 'all') {
          params.classType = this.selectedCourseType;
        }
        
        if (this.selectedTime !== 'all') {
          params.classTime = this.selectedTime;
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
      
      console.log('需要查询的教师名称:', teacherNames);
      
      if (teacherNames.length === 0) {
        console.log('没有需要查询的教师名称，跳过API调用');
        return courses;
      }
      
      try {
        // 批量查询教师信息
        const teacherResult = await this.$api.teacher.getTeacherList({
          names: teacherNames // 传递教师名称数组进行筛选
        });
        
        if (teacherResult && teacherResult.code === 0 && teacherResult.data) {
          const teachers = teacherResult.data;
          console.log('获取到教师数据:', teachers.length);
          
          // 创建教师名称到头像的映射
          const teacherAvatarMap = {};
          teachers.forEach(teacher => {
            if (teacher.name && teacher.avatar) {
              teacherAvatarMap[teacher.name] = teacher.avatar;
              console.log(`找到教师 ${teacher.name} 的头像:`, teacher.avatar);
            }
          });
          
          // 为每个课程添加教师头像URL
          return courses.map(course => {
            if (course.teacherName && teacherAvatarMap[course.teacherName]) {
              course.teacherAvatarUrl = teacherAvatarMap[course.teacherName];
              console.log(`为课程 ${course.title} 设置教师头像:`, course.teacherAvatarUrl);
            } else if (course.teacherName) {
              console.log(`未找到教师 ${course.teacherName} 的头像`);
            }
            return course;
          });
        } else {
          console.log('API调用成功但未返回教师数据:', teacherResult);
          return courses;
        }
      } catch (error) {
        console.error('获取教师头像信息失败:', error);
        return courses;
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
    },
    
    // 获取年级选项
    async getGradeOptions() {
      try {
        const result = await this.$api.common.getGradeOptions();
        console.log('获取年级选项结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 直接使用从数据库获取的年级数据，不进行转换
          const grades = result.data;
          
          // 添加"全部年级"选项
          this.gradeGroups = [
            { label: '全部年级', value: 'all' },
            ...grades
          ];
          
          console.log('更新后的年级选项:', this.gradeGroups);
        } else {
          console.warn('未获取到年级数据，使用默认值');
          this.gradeGroups = [
            { label: '全部年级', value: 'all' },
            { label: '初一', value: '初一' },
            { label: '初二', value: '初二' },
            { label: '初三', value: '初三' }
          ];
        }
      } catch (e) {
        console.error('获取年级选项失败:', e);
        this.gradeGroups = [
          { label: '全部年级', value: 'all' },
          { label: '初一', value: '初一' },
          { label: '初二', value: '初二' },
          { label: '初三', value: '初三' }
        ];
      }
    },
    
    // 获取学科选项
    async getSubjectOptions() {
      try {
        const result = await this.$api.common.getSubjectOptions();
        console.log('获取学科选项结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 直接使用从数据库获取的科目数据
          const subjects = result.data;
          
          // 添加"全部"选项
          this.subjectOptions = [
            { label: '全部', value: 'all' },
            ...subjects
          ];
          
          console.log('更新后的学科选项:', this.subjectOptions);
        } else {
          console.warn('未获取到学科数据，使用默认值');
          this.subjectOptions = [
            { label: '全部', value: 'all' },
            { label: '语文', value: '语文' },
            { label: '数学', value: '数学' },
            { label: '英语', value: '英语' },
            { label: '物理', value: '物理' },
            { label: '化学', value: '化学' }
          ];
        }
      } catch (e) {
        console.error('获取学科选项失败:', e);
        this.subjectOptions = [
          { label: '全部', value: 'all' },
          { label: '语文', value: '语文' },
          { label: '数学', value: '数学' },
          { label: '英语', value: '英语' },
          { label: '物理', value: '物理' },
          { label: '化学', value: '化学' }
        ];
      }
    },
    
    // 获取学期选项
    async getTermOptions() {
      try {
        const result = await this.$api.common.getTermOptions();
        console.log('获取学期选项结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 格式化学期数据
          const terms = result.data.map(item => {
            return {
              label: item.name || item.label,
              value: item._id || item.value
            };
          });
          
          // 添加"全部"选项
          this.termOptions = [
            { label: '全部', value: 'all' },
            { label: '春季班', value: '春季班' },
            { label: '夏季班', value: '夏季班' },
            { label: '秋季班', value: '秋季班' },
            { label: '冬季班', value: '冬季班' },
            { label: '短期班', value: '短期班' }
          ];
          
          console.log('更新后的学期选项:', this.termOptions);
        } else {
          console.warn('未获取到学期数据，使用默认值');
          this.termOptions = [
            { label: '全部', value: 'all' },
            { label: '春季班', value: '春季班' },
            { label: '夏季班', value: '夏季班' },
            { label: '秋季班', value: '秋季班' },
            { label: '冬季班', value: '冬季班' },
            { label: '短期班', value: '短期班' }
          ];
        }
      } catch (e) {
        console.error('获取学期选项失败:', e);
        this.termOptions = [
          { label: '全部', value: 'all' },
          { label: '春季班', value: '春季班' },
          { label: '夏季班', value: '夏季班' },
          { label: '秋季班', value: '秋季班' },
          { label: '冬季班', value: '冬季班' },
          { label: '短期班', value: '短期班' }
        ];
      }
    },
    
    // 获取班型选项
    async getClassTypeOptions() {
      try {
        console.log('开始获取班型选项...');
        const result = await this.$api.common.getClassTypeOptions();
        console.log('获取班型选项API返回结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 格式化班型数据
          const classTypes = result.data.map(item => {
            const option = {
              label: item.name || item.label,
              value: item.classType || item.value
            };
            console.log('格式化班型选项:', option);
            return option;
          });
          
          // 添加"不限"选项
          this.courseTypes = [
            { label: '不限', value: 'all' },
            ...classTypes
          ];
          
          console.log('更新后的班型选项:', this.courseTypes);
        } else {
          console.warn('未获取到班型数据或数据为空，使用默认值');
          this.setDefaultClassTypes();
        }
      } catch (e) {
        console.error('获取班型选项失败，具体错误:', e);
        this.setDefaultClassTypes();
      }
      
      return Promise.resolve(); // 确保Promise总是resolved
    },
    
    // 设置默认班型选项
    setDefaultClassTypes() {
      console.log('设置默认班型选项');
      this.courseTypes = [
        { label: '不限', value: 'all' },
        { label: 'S', value: 'S' },
        { label: 'A+', value: 'Aplus' },
        { label: 'S+', value: 'Splus' }
      ];
    },
    
    // 获取校区选项
    async getLocationOptions() {
      try {
        const result = await this.$api.location.getLocationList();
        console.log('获取校区列表结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 将校区数据转换为下拉选项格式，使用name作为value
          const locations = result.data.map(item => {
            return {
              label: item.name,
              value: item.name, // 使用校区名称作为value，而不是ID
              _id: item._id // 保留ID供其他用途
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
          this.schoolOptions = [
            { label: '全部校区', value: 'all' },
            { label: '江宁校区', value: '江宁校区' },
            { label: '鼓楼校区', value: '鼓楼校区' },
            { label: '浦口校区', value: '浦口校区' }
          ];
        }
      } catch (e) {
        console.error('获取校区列表失败:', e);
        this.schoolOptions = [
          { label: '全部校区', value: 'all' },
          { label: '江宁校区', value: '江宁校区' },
          { label: '鼓楼校区', value: '鼓楼校区' },
          { label: '浦口校区', value: '浦口校区' }
        ];
      }
    },
    
    // 选择学期
    selectTerm(term) {
      if (this.selectedTerm === term) return
      
      this.selectedTerm = term
      this.isTermFilterShow = false
      this.resetList()
      this.loadCourseList()
    },
    
    // 获取校区列表
    async getLocationList() {
      // 已被 getLocationOptions 方法替代
    },
    
    // 关闭所有下拉框
    closeAllDropdowns() {
      this.isGradeFilterShow = false;
      this.isSubjectFilterShow = false;
      this.isTermFilterShow = false;
      this.isClassTypeFilterShow = false;
    },
    
    // 获取学科标签
    getSubjectLabel(value) {
      const subject = this.subjectOptions.find(item => item.value === value);
      return subject ? subject.label : '科目';
    },
    
    // 获取学期标签
    getTermLabel(value) {
      const term = this.termOptions.find(item => item.value === value);
      return term ? term.label : '学期';
    },
    
    // 获取班型标签
    getClassTypeLabel(value) {
      const classType = this.courseTypes.find(item => item.value === value);
      return classType ? classType.label : '班型';
    },
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
  padding-bottom: 50rpx;
}

/* 应用标题 */
.app-title {
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  padding: 20rpx 0;
}

/* 顶部城市和年级选择栏 */
.sub-header {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 30rpx 20rpx;
}

/* 城市选择 */
.city-selector {
  display: flex;
  align-items: center;
}

.city-name {
  font-size: 28rpx;
  color: #fff;
  font-weight: bold;
  margin-right: 10rpx;
}

/* 年级选择 */
.grade-selector {
  display: flex;
  align-items: center;
}

.grade-name {
  font-size: 28rpx;
  color: #fff;
  font-weight: bold;
  margin-right: 10rpx;
}

/* 年级选择下拉面板 */
.grade-dropdown-panel {
  position: absolute;
  top: 120rpx;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-options {
  padding: 20rpx 0;
  max-height: 500rpx;
  overflow-y: auto;
}

.dropdown-option {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-option.active {
  color: #EC7A49;
  background-color: #f7f7f7;
}

.dropdown-option:last-child {
  border-bottom: none;
}

/* 筛选下拉内容 */
.dropdown-content {
  position: absolute;
  top: 70rpx;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

/* 箭头图标 */
.arrow-icon {
  width: 0;
  height: 0;
  border-left: 10rpx solid transparent;
  border-right: 10rpx solid transparent;
  border-top: 10rpx solid #fff;
  transition: transform 0.3s;
}

.arrow-icon.arrow-up {
  transform: rotate(180deg);
}

/* 筛选区域 */
.filter-section {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 20rpx 20rpx;
}

.filter-dropdown {
  flex: 1;
}

.filter-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-text {
  font-size: 28rpx;
  color: #fff;
  margin-right: 10rpx;
}

.filter-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-icon {
  width: 32rpx;
  height: 32rpx;
  /* 使用纯CSS替代图片 */
  position: relative;
  margin-right: 8rpx;
  border: 2rpx solid #fff;
  border-radius: 4rpx;
}

.filter-icon::before {
  content: "";
  position: absolute;
  top: 8rpx;
  left: 6rpx;
  width: 16rpx;
  height: 2rpx;
  background-color: #fff;
  box-shadow: 0 6rpx 0 #fff, 0 12rpx 0 #fff;
}

.filter-button-text {
  font-size: 28rpx;
  color: #fff;
}

/* 筛选面板 */
.filter-panel {
  position: absolute;
  top: 220rpx;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  padding: 30rpx;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.filter-panel.show {
  transform: translateY(0);
  opacity: 1;
}

.filter-panel-header,
.filter-panel-section {
  margin-bottom: 40rpx;
}

.filter-section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.filter-option-item {
  padding: 15rpx 30rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.filter-option-item.active {
  background-color: #EC7A49;
  color: #fff;
}

.filter-section-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 26rpx;
  color: #666;
}

.arrow-icon-right {
  width: 15rpx;
  height: 26rpx;
  /* 使用纯CSS替代图片 */
  position: relative;
}

.arrow-icon-right::before {
  content: "";
  position: absolute;
  width: 8rpx;
  height: 8rpx;
  border-top: 2rpx solid #666;
  border-right: 2rpx solid #666;
  transform: rotate(45deg);
  top: 8rpx;
  right: 6rpx;
}

.filter-panel-buttons {
  display: flex;
  margin-top: 40rpx;
}

.reset-button {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 28rpx;
  color: #666;
}

.apply-button {
  flex: 2;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  background-color: #1989FA;
  border-radius: 8rpx;
}

/* 课程列表 */
.course-list {
  padding: 30rpx 30rpx 30rpx;
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

/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
}
</style> 