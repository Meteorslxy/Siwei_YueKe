<template>
  <view class="teacher-list">
    <view class="filter-bar">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input type="text" v-model="keyword" placeholder="搜索教师" confirm-type="search" @confirm="search" />
      </view>
    </view>
    
    <view class="filter-tabs">
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
    
    <view class="teachers-container">
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
      currentSubject: '',
      subjects: [
        { id: '', name: '全部' },
        { id: '1', name: '钢琴' },
        { id: '2', name: '小提琴' },
        { id: '3', name: '古筝' },
        { id: '4', name: '吉他' },
        { id: '5', name: '声乐' }
      ],
      teacherList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  onLoad(options) {
    // 如果有科目参数，设置当前科目
    if (options.subject) {
      this.currentSubject = options.subject;
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
        subject: this.currentSubject
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
  background-color: #f7f7f7;
  
  .filter-bar {
    padding: 20rpx;
    background-color: #fff;
    
    .search-box {
      display: flex;
      align-items: center;
      height: 70rpx;
      background-color: #f5f5f5;
      border-radius: 35rpx;
      padding: 0 20rpx;
      
      .iconfont {
        font-size: 28rpx;
        color: #999;
        margin-right: 10rpx;
      }
      
      input {
        flex: 1;
        height: 100%;
        font-size: 26rpx;
      }
    }
  }
  
  .filter-tabs {
    display: flex;
    flex-wrap: wrap;
    padding: 16rpx 10rpx;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    
    .tab-item {
      padding: 10rpx 20rpx;
      font-size: 26rpx;
      color: #666;
      border-radius: 26rpx;
      margin: 6rpx;
      
      &.active {
        color: #fff;
        background-color: #FF6B00;
      }
    }
  }
  
  .teachers-container {
    flex: 1;
    padding: 20rpx;
  }
}
</style> 