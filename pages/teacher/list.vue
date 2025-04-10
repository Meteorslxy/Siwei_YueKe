<template>
  <view class="teacher-list">
    <!-- 筛选栏 -->
    <view class="filter-bar">
      <!-- 年级选择 -->
      <view class="filter-dropdown">
        <view class="selected-filter" @click="toggleGradeOptions">
          {{selectedGradeName}} <text class="triangle-down" :class="{ 'arrow-up': showGradeOptions }"></text>
        </view>
        <view class="filter-options" v-if="showGradeOptions">
          <view 
            v-for="(grade, index) in filterOptions.gradeOptions.options" 
            :key="index" 
            class="filter-option"
            :class="{ active: currentGrade === grade.value }"
            @click="selectGrade(grade.value)"
          >
            {{grade.label}}
          </view>
        </view>
      </view>
      
      <!-- 校区选择 -->
      <view class="filter-dropdown">
        <view class="selected-filter" @click="toggleSchoolOptions">
          {{selectedSchoolName}} <text class="triangle-down" :class="{ 'arrow-up': showSchoolFilter }"></text>
        </view>
        <view class="filter-options" v-if="showSchoolFilter">
          <view 
            v-for="(school, index) in filterOptions.schoolOptions.options" 
            :key="index" 
            class="filter-option"
            :class="{ active: schoolFilter === school.value }"
            @click="selectSchool(school.value)"
          >
            {{school.label}}
          </view>
        </view>
      </view>
    </view>
    
    <!-- 学科选择 -->
    <view class="subject-tabs">
      <scroll-view scroll-x class="scroll-view">
        <view class="tabs-container">
          <view 
            v-for="(tab, index) in filterOptions.subjectOptions.options" 
            :key="index" 
            class="tab-item" 
            :class="{ active: currentSubject === tab.value }"
            @click="filterBySubject(tab.value)"
          >
            {{tab.label}}
          </view>
        </view>
      </scroll-view>
    </view>
    
    <view class="content-area">
      <block v-if="teacherList.length > 0">
        <teacher-card 
          v-for="(teacher, index) in teacherList" 
          :key="teacher._id || index" 
          :teacher="teacher"
        ></teacher-card>
      </block>
      <empty-tip v-else tip="暂无教师" :show="!loading"></empty-tip>
      
      <load-more :status="loadMoreStatus" @click="loadMore" :autoLoad="true"></load-more>
    </view>
  </view>
</template>

<script>
// 导入筛选选项JSON和工具类
import filterOptions from '@/static/data/filter-options.json';
import filterUtils from '@/api/utils/filters';

export default {
  data() {
    return {
      keyword: '',
      currentGrade: 'all',
      showGradeOptions: false,
      filterOptions: filterOptions, // 从JSON文件导入的筛选选项
      currentSubject: '',
      schoolFilter: '',
      showSchoolFilter: false,
      teacherList: [],
      page: 1,
      pageSize: 999,  // 大幅提高每页数量，确保能一次获取到所有老师
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true,
      allTeacherList: [], // 存储所有老师数据
      displayedTeachers: [], // 当前显示的老师数据
      displayCount: 10, // 初始显示数量
      isReachBottom: false // 是否触底标记
    }
  },
  computed: {
    selectedGradeName() {
      const grade = this.filterOptions.gradeOptions.options.find(item => item.value === this.currentGrade);
      return grade ? grade.label : '全部';
    },
    
    selectedSchoolName() {
      if (!this.schoolFilter || this.schoolFilter === 'all') {
        return '全部校区';
      }
      return filterUtils.getSchoolLabelByValue(this.schoolFilter) || '全部校区';
    }
  },
  onLoad(options) {
    console.log('教师列表页面加载，参数:', options);
    
    // 如果有科目参数，设置当前科目
    if (options.subject) {
      this.currentSubject = options.subject;
      console.log('设置初始学科:', this.currentSubject);
    }
    
    // 如果有年级参数，设置当前年级
    if (options.grade) {
      this.currentGrade = options.grade;
      console.log('设置初始年级:', this.currentGrade);
    }
    
    // 如果有校区参数，设置当前校区
    if (options.school) {
      this.schoolFilter = options.school;
      console.log('设置初始校区:', this.schoolFilter);
    }
    
    this.getTeacherList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  // 添加页面触底事件处理函数
  onReachBottom() {
    this.isReachBottom = true;
    console.log('触发页面触底事件');
    this.loadMoreTeachers();
  },
  methods: {
    // 搜索
    search() {
      this.refreshList();
    },
    
    // 切换年级选项显示
    toggleGradeOptions() {
      this.showGradeOptions = !this.showGradeOptions;
      // 如果打开年级选项，关闭校区选项
      if (this.showGradeOptions && this.showSchoolFilter) {
        this.showSchoolFilter = false;
      }
    },
    
    // 切换校区选项显示
    toggleSchoolOptions() {
      this.showSchoolFilter = !this.showSchoolFilter;
      // 如果打开校区选项，关闭年级选项
      if (this.showSchoolFilter && this.showGradeOptions) {
        this.showGradeOptions = false;
      }
    },
    
    // 选择年级
    selectGrade(gradeValue) {
      this.currentGrade = gradeValue;
      this.showGradeOptions = false;
      this.refreshList();
    },
    
    // 选择校区
    selectSchool(schoolValue) {
      this.schoolFilter = schoolValue;
      this.showSchoolFilter = false;
      this.refreshList();
    },
    
    // 按科目筛选
    filterBySubject(subjectValue) {
      if (this.currentSubject === subjectValue) return;
      this.currentSubject = subjectValue;
      this.refreshList();
    },
    
    // 获取教师列表
    getTeacherList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize
      };
      
      // 只有在有值且不为'all'时才添加筛选参数
      if (this.keyword) {
        params.keyword = this.keyword;
      }
      
      if (filterUtils.isValidFilterValue(this.currentSubject)) {
        params.subject = this.currentSubject;
      }
      
      if (filterUtils.isValidFilterValue(this.currentGrade)) {
        params.grade = this.currentGrade;
      }
      
      if (filterUtils.isValidFilterValue(this.schoolFilter)) {
        params.school = this.schoolFilter;
      }
      
      console.log('获取教师列表参数:', params);
      
      uni.showLoading({ title: '加载中' });
      
      // 使用API接口调用
      this.$api.teacher.getTeacherList(params).then(result => {
        console.log('获取教师列表结果:', result);
        if (result && result.data) {
          const list = result.data || [];
          console.log('获取到教师列表数量:', list.length);
          console.log('当前页码:', this.page);
          console.log('每页大小:', this.pageSize);
          
          if (this.page === 1) {
            this.allTeacherList = list;
            // 初始只显示部分教师
            this.teacherList = list.slice(0, this.displayCount);
          } else {
            this.allTeacherList = [...this.allTeacherList, ...list];
            // 添加新加载的教师到显示列表
            this.teacherList = this.allTeacherList.slice(0, this.displayCount);
          }
          
          console.log('当前显示教师总数:', this.teacherList.length);
          console.log('已加载教师总数:', this.allTeacherList.length);
          
          // 修改判断逻辑：如果返回的数据长度等于页大小，则认为还有更多数据
          // 如果后端返回了总数，则使用总数判断
          if (result.total !== undefined) {
            console.log('服务器返回总数:', result.total);
            this.hasMore = this.allTeacherList.length < result.total;
          } else {
            this.hasMore = list.length >= this.pageSize;
          }
          console.log('是否有更多数据:', this.hasMore);
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
          
          // 如果触底了，立即显示更多
          if (this.isReachBottom) {
            this.loadMoreTeachers();
            this.isReachBottom = false;
          }
        } else {
          uni.showToast({
            title: '获取教师列表失败',
            icon: 'none'
          });
          this.loadMoreStatus = 'more';
        }
        
        uni.stopPullDownRefresh();
      }).catch(err => {
        console.error('获取教师列表失败', err);
        uni.showToast({
          title: '获取教师列表失败',
          icon: 'none'
        });
        this.loadMoreStatus = 'more';
        uni.stopPullDownRefresh();
      }).finally(() => {
        this.loading = false;
        uni.hideLoading();
      });
    },
    
    // 加载更多
    loadMore() {
      // 优先从已加载的数据中显示更多
      if (this.allTeacherList.length > this.teacherList.length) {
        this.loadMoreTeachers();
      } 
      // 如果已加载的数据都显示完了，再从服务器加载更多
      else if (this.hasMore && !this.loading) {
        console.log('已显示所有已加载数据，从服务器加载更多，页码增加到:', this.page + 1);
        this.page++;
        this.getTeacherList();
      } else {
        console.log('没有更多数据或正在加载中');
      }
    },
    
    // 从已加载的数据中显示更多教师
    loadMoreTeachers() {
      if (this.allTeacherList.length <= this.teacherList.length) {
        console.log('已经显示所有已加载的教师数据');
        return;
      }
      
      console.log('从已加载数据中显示更多教师');
      const newDisplayCount = this.displayCount + 10; // 每次增加10个
      this.displayCount = newDisplayCount;
      this.teacherList = this.allTeacherList.slice(0, newDisplayCount);
      console.log('增加显示教师数量，当前显示:', this.teacherList.length);
      
      // 检查是否已显示所有数据
      if (this.teacherList.length >= this.allTeacherList.length && !this.hasMore) {
        this.loadMoreStatus = 'noMore';
      }
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.teacherList = [];
      this.allTeacherList = [];
      this.displayCount = 10;
      this.getTeacherList();
    }
  }
}
</script>

<style lang="scss">
.teacher-list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #EC7A49;
  
  .filter-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80rpx;
    padding: 0 30rpx;
    
    .filter-dropdown {
      position: relative;
      text-align: center;
      margin: 0 20rpx;
      
      .selected-filter {
        font-size: 28rpx;
        color: #fff;
        font-weight: bold;
        padding: 0 20rpx;
        display: flex;
        align-items: center;
        
        .triangle-down {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 8rpx;
          border-left: 8rpx solid transparent;
          border-right: 8rpx solid transparent;
          border-top: 10rpx solid #fff;
          transition: transform 0.3s ease;
          
          &.arrow-up {
            transform: rotate(180deg);
          }
        }
      }
      
      .filter-options {
        position: absolute;
        top: 60rpx;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 8rpx;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
        width: 160rpx;
        z-index: 10;
        max-height: 400rpx;
        overflow-y: auto;
        
        .filter-option {
          font-size: 28rpx;
          color: #333;
          padding: 16rpx 0;
          text-align: center;
          
          &.active {
            color: #EC7A49;
            background-color: rgba(236, 122, 73, 0.1);
          }
          
          &:not(:last-child) {
            border-bottom: 1rpx solid #f2f2f2;
          }
        }
      }
    }
  }
  
  .subject-tabs {
    padding: 10rpx 0 120rpx;
    
    .scroll-view {
      width: 100%;
      white-space: nowrap;
    }
    
    .tabs-container {
      display: inline-flex;
      padding: 0 20rpx;
    }
    
    .tab-item {
      padding: 10rpx 30rpx;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
      display: inline-block;
      
      &.active {
        color: #fff;
        font-weight: bold;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 30%;
          width: 40%;
          height: 4rpx;
          background-color: #fff;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  .content-area {
    flex: 1;
    padding: 20rpx;
    padding-top: 90rpx;
    background-color: $bg-color;
  }
}
</style> 