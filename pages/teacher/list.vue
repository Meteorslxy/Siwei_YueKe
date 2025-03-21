<template>
  <view class="teacher-list">
    <!-- 年级选择 -->
    <view class="grade-selector">
      <view class="grade-dropdown">
        <view class="selected-grade" @click="toggleGradeOptions">
          {{selectedGradeName}} <text class="triangle-down" :class="{ 'arrow-up': showGradeOptions }"></text>
        </view>
        <view class="grade-options" v-if="showGradeOptions">
          <view 
            v-for="(grade, index) in grades" 
            :key="index" 
            class="grade-option"
            :class="{ active: currentGrade === grade.id }"
            @click="selectGrade(grade.id)"
          >
            {{grade.name}}
          </view>
        </view>
      </view>
    </view>
    
    <!-- 学科选择 -->
    <view class="subject-tabs">
      <scroll-view scroll-x class="scroll-view">
        <view class="tabs-container">
          <view 
            v-for="(tab, index) in subjects" 
            :key="index" 
            class="tab-item" 
            :class="{ active: currentSubject === tab.id }"
            @click="filterBySubject(tab.id)"
          >
            {{tab.name}}
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
      
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      currentGrade: 'all',
      showGradeOptions: false,
      grades: [
        { id: 'all', name: '全部年级' },
        { id: 'primary', name: '小学' },
        { id: 'junior', name: '初中' }
      ],
      currentSubject: '',
      subjects: [
        { id: '', name: '全部' },
        { id: 'chinese', name: '语文' },
        { id: 'math', name: '数学' },
        { id: 'english', name: '英语' },
        { id: 'physics', name: '物理' },
        { id: 'chemistry', name: '化学' }
      ],
      teacherList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  computed: {
    selectedGradeName() {
      const grade = this.grades.find(item => item.id === this.currentGrade);
      return grade ? grade.name : '全部';
    }
  },
  onLoad(options) {
    // 如果有科目参数，设置当前科目
    if (options.subject) {
      this.currentSubject = options.subject;
    }
    
    // 如果有年级参数，设置当前年级
    if (options.grade) {
      this.currentGrade = options.grade;
    }
    
    this.getTeacherList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 搜索
    search() {
      this.refreshList();
    },
    
    // 切换年级选项显示
    toggleGradeOptions() {
      this.showGradeOptions = !this.showGradeOptions;
    },
    
    // 选择年级
    selectGrade(gradeId) {
      this.currentGrade = gradeId;
      this.showGradeOptions = false;
      this.refreshList();
    },
    
    // 按科目筛选
    filterBySubject(subjectId) {
      if (this.currentSubject === subjectId) return;
      this.currentSubject = subjectId;
      this.refreshList();
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.teacherList = [];
      this.getTeacherList();
    },
    
    // 获取教师列表
    getTeacherList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword,
        subject: this.currentSubject,
        gradeGroup: this.currentGrade
      };
      
      uni.showLoading({ title: '加载中' });
      
      // 使用API接口调用
      this.$api.teacher.getTeacherList(params).then(result => {
        if (result && result.data) {
          const list = result.data || [];
          
          if (this.page === 1) {
            this.teacherList = list;
          } else {
            this.teacherList = [...this.teacherList, ...list];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
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
      if (this.hasMore && !this.loading) {
        this.page++;
        this.getTeacherList();
      }
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
  
  .grade-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80rpx;
    padding: 0 30rpx;
    
    .grade-dropdown {
      position: relative;
      text-align: center;
      
      .selected-grade {
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
      
      .grade-options {
        position: absolute;
        top: 60rpx;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 8rpx;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
        width: 160rpx;
        z-index: 10;
        overflow: hidden;
        
        .grade-option {
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