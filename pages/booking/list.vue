<template>
  <view class="booking-list">
    <view class="tab-container">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="tab-item" 
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{tab}}
      </view>
    </view>
    
    <view class="booking-container">
      <block v-if="bookingList.length > 0">
        <booking-item 
          v-for="(booking, index) in bookingList" 
          :key="booking._id || index" 
          :booking="booking"
          @click="onBookingClick"
        ></booking-item>
      </block>
      <empty-tip v-else tip="暂无预约记录" :show="!loading"></empty-tip>
      
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['全部', '待确认', '已确认', '已完成', '已取消'],
      currentTab: 0,
      bookingList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more', // more-加载更多 loading-加载中 noMore-没有更多了
      hasMore: true
    }
  },
  onLoad() {
    this.getBookingList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.refreshList();
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.bookingList = [];
      this.getBookingList();
    },
    
    // 获取预约列表
    getBookingList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize
      };
      
      // 根据当前标签筛选预约状态
      if (this.currentTab > 0) {
        params.status = this.currentTab - 1;
      }
      
      uni.showLoading({ title: '加载中' });
      
      // 调用获取预约列表接口
      this.$api.user.getBookings(params)
        .then(res => {
          const list = res.data || [];
          
          if (this.page === 1) {
            this.bookingList = list;
          } else {
            this.bookingList = [...this.bookingList, ...list];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
          
          uni.stopPullDownRefresh();
        })
        .catch(err => {
          console.error('获取预约列表失败', err);
          uni.showToast({
            title: '获取预约列表失败',
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
        this.getBookingList();
      }
    },
    
    // 点击预约项
    onBookingClick(booking) {
      // 导航到预约详情页的处理已经在booking-item组件中实现
    }
  }
}
</script>

<style lang="scss">
.booking-list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
  
  .tab-container {
    display: flex;
    background-color: #fff;
    padding: 0 20rpx;
    border-bottom: 1rpx solid #eee;
    
    .tab-item {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      &.active {
        color: #FF6B00;
        font-weight: 500;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background-color: #FF6B00;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  .booking-container {
    flex: 1;
    padding: 20rpx;
  }
}
</style> 