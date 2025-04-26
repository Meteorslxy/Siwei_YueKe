<template>
  <view class="course-container" @click="closeAllDropdowns">
    <!-- 顶部背景 -->
    <view class="header-background" :style="{ paddingTop: statusBarHeight + 'px' }">
      <!-- 顶部标题 -->
      <view class="app-title">四维工作室</view>
      
      <!-- 顶部选择栏 -->
      <view class="sub-header">
        <view class="selector-item" @click.stop="toggleFilter('grade')">
          <text class="selector-text">{{selectedGradeText}}</text>
          <view class="arrow-icon" :class="{ 'arrow-up': isGradeFilterShow }"></view>
        </view>
        
        <view class="selector-item" @click.stop="toggleFilter('school')">
          <text class="selector-text">{{selectedSchoolText}}</text>
          <view class="arrow-icon" :class="{ 'arrow-up': isSchoolFilterShow }"></view>
        </view>
        
        <view class="selector-item" @click.stop="toggleFilter('subject')">
          <text class="selector-text">{{selectedSubject === 'all' ? '科目' : getSubjectLabel(selectedSubject)}}</text>
          <view class="arrow-icon" :class="{ 'arrow-up': isSubjectFilterShow }"></view>
        </view>

        <view class="selector-item filter-button" @click.stop="showFilterPanel">
          <view class="filter-icon"></view>
          <text class="selector-text">筛选</text>
          <view class="arrow-icon" :class="{ 'arrow-up': isFilterPanelShow }"></view>
        </view>
      </view>
      
      <!-- 下拉选择面板 -->
      <view class="grade-dropdown-panel" v-if="isGradeFilterShow" @click.stop>
        <view class="grade-dropdown-options">
          <view class="grade-dropdown-header">选择年级</view>
          <view 
            class="dropdown-option" 
            v-for="(grade, index) in gradeGroups" 
            :key="index"
            :class="{ active: selectedGradeGroup === grade.value }"
            @click="selectOption('grade', grade.value)">
            {{grade.label}}
          </view>
        </view>
      </view>
      
      <view class="school-dropdown-panel" v-if="isSchoolFilterShow" @click.stop>
        <view class="school-dropdown-options">
          <view class="school-dropdown-header">选择校区</view>
          <view 
            class="dropdown-option" 
            v-for="(school, index) in schoolOptions" 
            :key="index"
            :class="{ active: selectedSchool === school.value }"
            @click="selectOption('school', school.value)">
            {{school.label}}
          </view>
        </view>
      </view>
      
      <view class="subject-dropdown-panel" v-if="isSubjectFilterShow" @click.stop>
        <view class="subject-dropdown-options">
          <view class="subject-dropdown-header">选择科目</view>
          <view 
            class="dropdown-option" 
            v-for="(subject, index) in subjectOptions" 
            :key="index"
            :class="{ active: selectedSubject === subject.value }"
            @click="selectOption('subject', subject.value)">
            {{subject.label}}
          </view>
        </view>
      </view>
    </view>
    
    <!-- 遮罩层 -->
    <view class="mask" v-if="isFilterPanelShow" @click="hideFilterPanel"></view>
    
    <!-- 筛选面板 -->
    <view class="filter-panel" v-if="isFilterPanelShow" :class="{ 'show': isFilterPanelShow }" @click.stop>
      <!-- 添加学期筛选 -->
      <view class="filter-panel-section">
        <view class="filter-section-title">学期</view>
        <view class="filter-options">
          <view class="filter-option-item"
            :class="{ active: selectedTerm === 'all' }"
            @click="selectTerm('all')">
            不限
          </view>
          <view class="filter-option-item" 
            v-for="(term, index) in termOptions.slice(1)" 
            :key="index"
            :class="{ active: selectedTerm === term.value }"
            @click="selectTerm(term.value)">
            {{term.label}}
          </view>
        </view>
      </view>
      
      <!-- 添加班型筛选 -->
      <view class="filter-panel-section">
        <view class="filter-section-title">班型</view>
        <view class="filter-options">
          <view class="filter-option-item"
            :class="{ active: selectedCourseType === 'all' }"
            @click="selectCourseType('all')">
            不限
          </view>
          <view class="filter-option-item" 
            v-for="(type, index) in courseTypes.slice(1)" 
            :key="index"
            :class="{ active: selectedCourseType === type.value }"
            @click="selectCourseType(type.value)">
            {{type.label}}
          </view>
        </view>
      </view>
      
      <view class="filter-panel-header">
        <view class="filter-section-title">时期</view>
        <view class="filter-options">
          <view class="filter-option-item" 
            v-for="(type, index) in periodTypes" 
            :key="index"
            :class="{ active: selectedPeriod === type.value }"
            @click="selectPeriod(type.value)">
            {{type.label}}
          </view>
        </view>
      </view>
      
      <view class="filter-panel-section">
        <view class="filter-section-title">上课时间</view>
        <view class="filter-options">
          <view class="filter-option-item" 
            v-for="(time, index) in timeOptions" 
            :key="index"
            :class="{ 
              'active': time.value === 'all' ? selectedTime === 'all' : selectedTimes.includes(time.value)
            }"
            @click="selectTime(time.value)">
            {{time.label}}
          </view>
        </view>
      </view>
      
      <view class="filter-panel-section">
        <view class="filter-section-title">教师</view>
        <view class="filter-options">
          <view class="filter-option-item"
            :class="{ active: selectedTeacher === 'all' }"
            @click="selectTeacher('all')">
            不限
          </view>
          <!-- 这里可以添加教师列表 -->
          <view class="filter-option-item" 
            v-for="(teacher, index) in teacherOptions" 
            :key="index"
            :class="{ active: selectedTeacher === teacher.value }"
            @click="selectTeacher(teacher.value)">
            {{teacher.label}}
          </view>
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
      
      // 统一管理筛选器显示状态
      filterStates: {
        grade: false,
        school: false,
        subject: false
      },
      
      // 统一管理筛选器选中值
      filterValues: {
        grade: 'all',
        school: 'all',
        subject: 'all'
      },
      
      // 年级筛选相关
      gradeGroups: [], // 从grades数据库获取
      
      // 校区筛选相关
      schoolOptions: [], // 从locations数据库获取
      
      // 课程类型筛选相关
      selectedCourseType: 'all',
      courseTypes: [], // 从course_classtype数据库获取
      
      // 时期筛选相关
      selectedPeriod: 'all',
      periodTypes: [], // 从course_period数据库获取
      
      // 学期筛选相关
      selectedTerm: 'all',
      termOptions: [], // 从course_term数据库获取
      
      // 时间筛选相关
      selectedTime: 'all',
      selectedTimes: [], // 多选时间数组
      timeOptions: [
        { label: '不限', value: 'all' },
        { label: '周一', value: '周一' },
        { label: '周二', value: '周二' },
        { label: '周三', value: '周三' },
        { label: '周四', value: '周四' },
        { label: '周五', value: '周五' },
        { label: '周六', value: '周六' },
        { label: '周日', value: '周日' },
        { label: '每天', value: '每天' }
      ],
      
      // 学科筛选相关
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
      isReachBottom: false, // 是否触底标记
      selectedTeacher: 'all',
      teacherOptions: []
    }
  },
  computed: {
    // 筛选器显示状态的计算属性
    isGradeFilterShow() {
      return this.filterStates.grade
    },
    isSchoolFilterShow() {
      return this.filterStates.school
    },
    isSubjectFilterShow() {
      return this.filterStates.subject
    },
    
    // 选中值的计算属性
    selectedGradeGroup: {
      get() {
        return this.filterValues.grade
      },
      set(value) {
        this.filterValues.grade = value
      }
    },
    selectedSchool: {
      get() {
        return this.filterValues.school
      },
      set(value) {
        this.filterValues.school = value
      }
    },
    selectedSubject: {
      get() {
        return this.filterValues.subject
      },
      set(value) {
        this.filterValues.subject = value
      }
    },
    
    // 显示文本的计算属性
    selectedGradeText() {
      if (this.selectedGradeGroup === 'all') {
        return '年级'
      }
      const found = this.gradeGroups.find(item => item.value === this.selectedGradeGroup)
      return found ? found.label : '年级'
    },
    selectedSchoolText() {
      if (this.selectedSchool === 'all') {
        return '校区'
      }
      const found = this.schoolOptions.find(item => item.value === this.selectedSchool)
      return found ? found.label : '校区'
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
      this.getTeacherOptions(),
      this.getCoursePeriodOptions(),
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
    
    // 统一的筛选器切换方法
    toggleFilter(type) {
      // 关闭其他筛选器
      Object.keys(this.filterStates).forEach(key => {
        if (key !== type) {
          this.filterStates[key] = false
        }
      })
      // 切换当前筛选器
      this.filterStates[type] = !this.filterStates[type]
    },
    
    // 统一的选项选择方法
    selectOption(type, value) {
      if (this.filterValues[type] === value) return
      
      this.filterValues[type] = value
      this.filterStates[type] = false
      this.resetList()
      this.loadCourseList()
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
      this.resetList();
      this.loadCourseList();
    },
    
    // 选择时间
    selectTime(time) {
      if (time === 'all') {
        // 如果选择"不限"，清空已选时间
        this.selectedTimes = [];
        this.selectedTime = 'all';
      } else {
        // 多选时间逻辑
        const index = this.selectedTimes.indexOf(time);
        if (index > -1) {
          // 如果已经选择了该时间，则取消选择
          this.selectedTimes.splice(index, 1);
        } else {
          // 如果没有选择该时间，则添加选择
          this.selectedTimes.push(time);
        }
        
        // 如果没有选择任何时间，则回到"全部"
        if (this.selectedTimes.length === 0) {
          this.selectedTime = 'all';
        } else {
          // 否则使用多选值，显示第一个选中值加数量提示
          this.selectedTime = this.selectedTimes.length > 1 
            ? `${this.timeOptions.find(t => t.value === this.selectedTimes[0]).label}等${this.selectedTimes.length}项` 
            : this.selectedTimes[0];
        }
      }
      
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
      this.selectedPeriod = 'all'
      this.selectedTime = 'all'
      this.selectedTimes = [] // 清空多选时间
      this.selectedTerm = 'all'
      this.selectedSubject = 'all'
      this.selectedGradeGroup = 'all'
      this.selectedTeacher = 'all'
    },
    
    // 应用筛选条件
    applyFilters() {
      this.hideFilterPanel()
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
        
        if (this.selectedPeriod !== 'all') {
          params.period = this.selectedPeriod;
        }
        
        if (this.selectedTime !== 'all') {
          // 使用多选时间数组
          params.classTime = this.selectedTimes.length > 0 ? this.selectedTimes.join(',') : this.selectedTime;
        }
        
        if (this.selectedTeacher !== 'all') {
          params.teacherName = this.selectedTeacher;
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
          
          // 保持下拉选项中的"全部年级"文本
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
          
          // 保持下拉选项中的"全部校区"文本
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
      this.resetList()
      this.loadCourseList()
    },
    
    // 关闭所有下拉框
    closeAllDropdowns() {
      Object.keys(this.filterStates).forEach(key => {
        this.filterStates[key] = false
      })
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
    
    // 选择教师
    selectTeacher(teacher) {
      this.selectedTeacher = teacher;
    },
    
    // 获取教师列表
    async getTeacherOptions() {
      try {
        console.log('开始获取教师列表...');
        const result = await this.$api.teacher.getTeacherList({});
        console.log('获取教师列表API返回结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 格式化教师数据
          const teachers = result.data.map(item => {
            return {
              label: item.realname || item.nickname || item.name || '未命名教师',
              value: item.name || item.realname || item.nickname || '未命名教师',
              avatar: item.avatar || ''
            };
          });
          
          this.teacherOptions = teachers;
          console.log('更新后的教师选项:', this.teacherOptions);
        } else {
          console.warn('未获取到教师数据或数据为空');
          this.teacherOptions = [
            {
              label: '胡柱昂',
              value: '胡柱昂',
              avatar: ''
            }
          ];
        }
      } catch (e) {
        console.error('获取教师列表失败，具体错误:', e);
        this.teacherOptions = [
          {
            label: '胡柱昂',
            value: '胡柱昂',
            avatar: ''
          }
        ];
      }
      
      return Promise.resolve(); // 确保Promise总是resolved
    },
    
    // 获取时期选项
    async getCoursePeriodOptions() {
      try {
        console.log('开始获取时期选项...');
        const result = await this.$api.common.getCoursePeriodOptions();
        console.log('获取时期选项API返回结果:', JSON.stringify(result));
        
        if (result && result.data && result.data.length > 0) {
          // 格式化时期数据，打印每一项进行调试
          const periods = result.data.map(item => {
            console.log('处理时期选项项目:', JSON.stringify(item));
            const option = {
              label: item.label || item.period || '未知期数',
              value: item.value || item.period || '未知期数',
              _id: item._id || ''
            };
            console.log('格式化后的时期选项:', option);
            return option;
          });
          
          // 添加"不限"选项
          this.periodTypes = [
            { label: '不限', value: 'all' },
            ...periods
          ];
          
          console.log('更新后的时期选项:', JSON.stringify(this.periodTypes));
        } else {
          console.warn('未获取到时期数据或数据为空，使用默认值');
          this.setDefaultPeriodTypes();
        }
      } catch (e) {
        console.error('获取时期选项失败，具体错误:', e);
        this.setDefaultPeriodTypes();
      }
      
      return Promise.resolve(); // 确保Promise总是resolved
    },
    
    // 设置默认时期选项
    setDefaultPeriodTypes() {
      console.log('设置默认时期选项');
      this.periodTypes = [
        { label: '不限', value: 'all' },
        { label: '零期', value: '零期' },
        { label: '一期', value: '一期' },
        { label: '二期', value: '二期' },
        { label: '三期', value: '三期' },
        { label: '四期', value: '四期' },
        { label: '五期', value: '五期' }
      ];
    },
    
    // 选择时期
    selectPeriod(period) {
      if (this.selectedPeriod === period) return
      
      this.selectedPeriod = period
      this.resetList()
      this.loadCourseList()
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
  background-color: #EC7A49;
  padding-bottom: 120rpx;
}

/* 应用标题 */
.app-title {
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  padding: 20rpx 0 30rpx;
}

/* 顶部城市和年级选择栏 */
.sub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 30rpx;
  background-color: #EC7A49;
}

/* 城市选择 */
.selector-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rpx 20rpx;
  position: relative;
}

.selector-text {
  font-size: 28rpx;
  color: #fff;
  margin-right: 8rpx;
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

.arrow-up {
  transform: rotate(180deg);
}

/* 筛选按钮样式 */
.filter-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 8rpx;
  /* 修改为白色的筛选图标 */
  background-image: url('data:image/svg+xml;base64,PHN2ZyB0PSIxNjg5MTQwNDk5NDY4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzNDgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNODk2IDEyOEgxMjhjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjM2YzAgNC40IDMuNiA4IDggOGg2MGMwLjkgMCAxLjgtMC4yIDIuNi0wLjVsMjguOC0xMS41YzIuMi0wLjkgNC43LTAuOSA2LjkgMGwyOC44IDExLjVjMC44IDAuMyAxLjcgMC41IDIuNiAwLjVoNjBjNC40IDAgOC0zLjYgOC04di0zNmMwLTE3LjctMTQuMy0zMi0zMi0zMkg4OTZ6TTg5NiA0NDhIMTI4Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnYzNmMwIDQuNCAzLjYgOCA4IDhoNjBjMC45IDAgMS44LTAuMiAyLjYtMC41bDI4LjgtMTEuNWMyLjItMC45IDQuNy0wLjkgNi45IDBsMjguOCAxMS41YzAuOCAwLjMgMS43IDAuNSAyLjYgMC41aDYwYzQuNCAwIDgtMy42IDgtOHYtMzZjMC0xNy43LTE0LjMtMzItMzItMzJIODk2ek04OTYgNzY4SDEyOGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2MzZjMCA0LjQgMy42IDggOCA4aDYwYzAuOSAwIDEuOC0wLjIgMi42LTAuNWwyOC44LTExLjVjMi4yLTAuOSA0LjctMC45IDYuOSAwbDI4LjggMTEuNWMwLjggMC4zIDEuNyAwLjUgMi42IDAuNWg2MGM0LjQgMCA4LTMuNiA4LTh2LTM2YzAtMTcuNy0xNC4zLTMyLTMyLTMySDg5NnoiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjIzNDkiPjwvcGF0aD48L3N2Zz4=');
  background-size: contain;
  background-repeat: no-repeat;
}

/* 筛选区域 */
.filter-section {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 30rpx 30rpx;
  margin: 0 20rpx;
}

.filter-dropdown {
  flex: 1;
}

.filter-button {
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgba(255, 255, 255, 0.2);
  padding: 8rpx 20rpx;
  // border-radius: 30rpx;
  transition: all 0.2s ease;
}

.filter-button:active {
  background-color: rgba(255, 255, 255, 0.3);
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
  top: 280rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  padding: 30rpx;
  border-radius: 16rpx;
  opacity: 0;
  transition: all 0.3s ease;
}

.filter-panel.show {
  opacity: 1;
}

.filter-panel-header,
.filter-panel-section {
  margin-bottom: 30rpx;
}

.filter-section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
  position: relative;
}

.filter-section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4rpx;
  height: 24rpx;
  background-color: #EC7A49;
  border-radius: 2rpx;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 0 6rpx;
}

.filter-option-item {
  padding: 12rpx 24rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #f8f8f8;
  border-radius: 26rpx;
  transition: all 0.2s ease;
}

.filter-option-item.active {
  background-color: rgba(236, 122, 73, 0.1);
  color: #EC7A49;
  font-weight: 500;
}

.filter-panel-buttons {
  display: flex;
  margin-top: 40rpx;
  gap: 20rpx;
  padding: 0 20rpx;
}

.reset-button {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 40rpx;
}

.apply-button {
  flex: 2;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  background-color: #EC7A49;
  border-radius: 40rpx;
}

/* 课程列表 */
.course-list {
  padding: 30rpx 30rpx 30rpx;
  position: relative;
  z-index: 10;
  margin-top: -120rpx;  /* 添加负边距使列表向上移动 */
  
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
    margin-top: 0;  /* 移除第一个卡片的顶部边距 */
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

/* 统一的下拉面板样式 */
.dropdown-panel {
  position: absolute;
  top: 240rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.15);
  border-radius: 16rpx;
  overflow: hidden;
}

.dropdown-options {
  padding: 10rpx 0;
  max-height: 350rpx;
  overflow-y: auto;
}

.dropdown-header {
  padding: 20rpx 30rpx;
  font-size: 30rpx;
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-option {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #333;
  text-align: center;
  transition: all 0.2s ease;
}

.dropdown-option.active {
  color: #EC7A49;
  background-color: rgba(236, 122, 73, 0.1);
  font-weight: bold;
}

.dropdown-option:hover, .dropdown-option:active {
  background-color: #f9f9f9;
}

/* 年级下拉面板 */
.grade-dropdown-panel {
  position: absolute;
  top: 280rpx;
  left: 3%;
  width: 25%;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.15);
  border-radius: 16rpx;
  overflow: hidden;
}

.grade-dropdown-options {
  padding: 10rpx 0;
  max-height: 350rpx;
  overflow-y: auto;
}

.grade-dropdown-header {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

/* 校区下拉面板 */
.school-dropdown-panel {
  position: absolute;
  top: 280rpx;
  left: 22%;
  width: 35%;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.15);
  border-radius: 16rpx;
  overflow: hidden;
}

.school-dropdown-options {
  padding: 10rpx 0;
  max-height: 350rpx;
  overflow-y: auto;
}

.school-dropdown-header {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

/* 科目下拉面板 */
.subject-dropdown-panel {
  position: absolute;
  top: 280rpx;
  left: 50%;
  width: 25%;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.15);
  border-radius: 16rpx;
  overflow: hidden;
}

.subject-dropdown-options {
  padding: 10rpx 0;
  max-height: 350rpx;
  overflow-y: auto;
}

.subject-dropdown-header {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

/* 统一的下拉选项样式 */
.dropdown-option {
  padding: 20rpx 30rpx;
  font-size: 26rpx;
  color: #333;
  text-align: center;
  transition: all 0.2s ease;
}

.dropdown-option.active {
  color: #EC7A49;
  background-color: rgba(236, 122, 73, 0.1);
  font-weight: bold;
}

.dropdown-option:hover, .dropdown-option:active {
  background-color: #f9f9f9;
}

</style> 