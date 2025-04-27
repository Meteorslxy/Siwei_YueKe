<template>
  <view class="featured-courses">
    <view class="filter-container">
      <view class="filter-item" @click="showCategoryFilter">
        <text>{{selectedCategory.name || '全部分类'}}</text>
        <text class="iconfont icon-down"></text>
      </view>
      <view class="filter-item" @click="showAreaFilter">
        <text>{{selectedArea.name || '全部区域'}}</text>
        <text class="iconfont icon-down"></text>
      </view>
      <view class="filter-item" @click="toggleSortOrder">
        <text>{{currentSort.name}}</text>
        <text class="iconfont icon-down"></text>
      </view>
    </view>
    
    <view class="course-list">
      <block v-if="courseList.length > 0">
        <course-card 
          v-for="(course, index) in courseList" 
          :key="course._id || index" 
          :course="course"
          @click="onCourseClick"
          @book="onBookClick"
        ></course-card>
      </block>
      <empty-tip v-else tip="暂无课程" :show="!loading"></empty-tip>
      
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseList: [],
      categories: [
        { id: '', name: '全部分类' },
        { id: '1', name: '钢琴' },
        { id: '2', name: '小提琴' },
        { id: '3', name: '古筝' },
        { id: '4', name: '吉他' },
        { id: '5', name: '架子鼓' }
      ],
      areas: [
        { id: '', name: '全部区域' },
        { id: '1', name: '东城区' },
        { id: '2', name: '西城区' },
        { id: '3', name: '朝阳区' },
        { id: '4', name: '海淀区' },
        { id: '5', name: '丰台区' }
      ],
      sortOptions: [
        { id: 'time', name: '最新发布', order: 'desc' },
        { id: 'price', name: '价格从低到高', order: 'asc' },
        { id: 'price', name: '价格从高到低', order: 'desc' }
      ],
      selectedCategory: { id: '', name: '全部分类' },
      selectedArea: { id: '', name: '全部区域' },
      currentSort: { id: 'time', name: '最新发布', order: 'desc' },
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  onLoad() {
    this.getCourseList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 显示分类筛选
    showCategoryFilter() {
      uni.showActionSheet({
        itemList: this.categories.map(item => item.name),
        success: res => {
          this.selectedCategory = this.categories[res.tapIndex];
          this.refreshList();
        }
      });
    },
    
    // 显示区域筛选
    showAreaFilter() {
      uni.showActionSheet({
        itemList: this.areas.map(item => item.name),
        success: res => {
          this.selectedArea = this.areas[res.tapIndex];
          this.refreshList();
        }
      });
    },
    
    // 切换排序方式
    toggleSortOrder() {
      uni.showActionSheet({
        itemList: this.sortOptions.map(item => item.name),
        success: res => {
          this.currentSort = this.sortOptions[res.tapIndex];
          this.refreshList();
        }
      });
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.courseList = [];
      this.getCourseList();
    },
    
    // 获取课程列表
    getCourseList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        category: this.selectedCategory.id,
        area: this.selectedArea.id,
        sortField: this.currentSort.id,
        sortOrder: this.currentSort.order,
        featured: true
      };
      
      uni.showLoading({ title: '加载中' });
      
      // 调用获取课程列表接口
      this.$api.course.getCourseList(params)
        .then(res => {
          const list = res.data || [];
          
          if (this.page === 1) {
            this.courseList = list;
          } else {
            this.courseList = [...this.courseList, ...list];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
          
          uni.stopPullDownRefresh();
        })
        .catch(err => {
          console.error('获取课程列表失败', err);
          uni.showToast({
            title: '获取课程列表失败',
            icon: 'none'
          });
          this.loadMoreStatus = 'more';
          uni.stopPullDownRefresh();
        })
        .finally(() => {
          this.loading = false;
          uni.hideLoading();
        });
    },
    
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.getCourseList();
      }
    },
    
    // 点击课程
    onCourseClick(course) {
      uni.navigateTo({
        url: `/pages/course/detail?id=${course._id}`
      });
    },
    
    // 点击预约
    onBookClick(course) {
      if (!course || !course._id) return;
      
      // 跳转到课程详情页面进行预约
      uni.navigateTo({
        url: `/pages/course/detail?id=${course._id}`
      });
    }
  }
}
</script>

<style lang="scss">
.featured-courses {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
  
  .filter-container {
    display: flex;
    background-color: #fff;
    padding: 0 20rpx;
    border-bottom: 1rpx solid #eee;
    
    .filter-item {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 26rpx;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .iconfont {
        font-size: 24rpx;
        color: #999;
        margin-left: 6rpx;
      }
    }
  }
  
  .course-list {
    flex: 1;
    padding: 20rpx;
  }
}
</style> 