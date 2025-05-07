<template>
  <view class="enrollment-page">
    <!-- 顶部筛选栏 -->
    <view class="filter-bar">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="filter-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{tab.name}}
      </view>
    </view>
    
    <!-- 报名列表 -->
    <view class="enrollment-list">
      <block v-if="enrollmentList.length > 0">
        <view 
          class="enrollment-item" 
          v-for="(item, index) in enrollmentList" 
          :key="index"
          @click="viewDetail(item)"
        >
          <view class="item-header">
            <view class="item-title">{{item.courseTitle || '未命名讲座'}}</view>
            <view class="item-status" :class="getStatusClass(item.status)">
              {{getStatusText(item.status)}}
            </view>
          </view>
          
          <view class="item-info">
            <view class="info-row">
              <text class="info-label">报名时间：</text>
              <text class="info-value">{{formatDate(item.createTime)}}</text>
            </view>
            <view class="info-row">
              <text class="info-label">讲座时间：</text>
              <text class="info-value">{{formatDateTime(item.courseStartTime)}}</text>
            </view>
            <view class="info-row">
              <text class="info-label">报名校区：</text>
              <text class="info-value">{{item.schoolName || '未设置'}}</text>
            </view>
          </view>
          
          <view class="item-footer">
            <view class="btn cancel-btn" v-if="canCancel(item.status)" @click.stop="cancelEnrollment(index)">
              取消报名
            </view>
            <view class="btn detail-btn" @click.stop="viewDetail(item)">
              查看详情
            </view>
          </view>
        </view>
      </block>
      
      <view class="empty-tip" v-else-if="!loading">
        <image class="empty-icon" src="/static/images/empty.png" mode="aspectFit"></image>
        <text class="empty-text">暂无报名记录</text>
      </view>
      
      <view class="loading-container" v-if="loading">
        <uni-load-more status="loading" :contentText="loadMoreText"></uni-load-more>
      </view>
      
      <uni-load-more v-if="!loading && enrollmentList.length > 0" :status="loadMoreStatus" :contentText="loadMoreText" @clickLoadMore="loadMore"></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: '全部', status: 'all' },
        { name: '待确认', status: 'pending' },
        { name: '已确认', status: 'confirmed' },
        { name: '已取消', status: 'cancelled' }
      ],
      currentTab: 0,
      enrollmentList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true,
      loadMoreText: {
        contentdown: '上拉加载更多',
        contentrefresh: '加载中...',
        contentnomore: '没有更多数据了'
      }
    };
  },
  onLoad() {
    this.getEnrollmentList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  onReachBottom() {
    if (this.hasMore && !this.loading) {
      this.loadMore();
    }
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
      this.enrollmentList = [];
      this.getEnrollmentList();
    },
    
    // 获取报名列表
    async getEnrollmentList() {
      if (this.loading) return;
      
      this.loading = true;
      
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) {
          this.loading = false;
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          
          // 跳转到登录页面
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/login/login'
            });
          }, 1500);
          return;
        }
        
        // 安全地解析用户数据
        let userData;
        try {
          userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
        } catch (e) {
          console.error('解析用户数据失败:', e);
          userData = userInfo; // 如果解析失败，使用原始数据
        }
        
        // 获取用户ID
        const userId = userData.userId || userData._id || userData.uid || 
                     (userData.userInfo && userData.userInfo._id) || 
                     (userData.userInfo && userData.userInfo.uid) || '';
                     
        if (!userId) {
          console.error('获取报名列表失败: 无法获取用户ID', userData);
          this.loading = false;
          uni.showToast({
            title: '用户信息不完整，请重新登录',
            icon: 'none'
          });
          return;
        }
        
        const params = {
          userId: userId,
          status: this.tabs[this.currentTab].status,
          page: this.page,
          pageSize: this.pageSize
        };
        
        console.log('获取报名列表参数:', params);
        
        const res = await this.$api.user.getEnrollments(params);
        
        console.log('获取报名列表结果:', res);
        
        if (res && res.code === 0) {
          const list = res.data || [];
          
          if (this.page === 1) {
            this.enrollmentList = list;
          } else {
            this.enrollmentList = [...this.enrollmentList, ...list];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
        } else {
          uni.showToast({
            title: res.message || '获取报名列表失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取报名列表失败:', error);
        uni.showToast({
          title: '获取报名列表失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
        uni.stopPullDownRefresh();
      }
    },
    
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.getEnrollmentList();
      }
    },
    
    // 取消报名
    cancelEnrollment(index) {
      const item = this.enrollmentList[index];
      if (!item) return;
      
      uni.showModal({
        title: '取消报名',
        content: '确定要取消该报名吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({
                title: '取消中...'
              });
              
              const enrollmentId = item._id || item.enrollmentId;
              const result = await this.$api.user.cancelEnrollment(enrollmentId);
              
              uni.hideLoading();
              
              if (result && result.code === 0) {
                uni.showToast({
                  title: '取消成功',
                  icon: 'success'
                });
                
                // 更新本地列表数据状态
                this.enrollmentList[index].status = 'cancelled';
                
                // 如果当前不是查看全部或已取消，则从列表中移除
                if (this.currentTab !== 0 && this.currentTab !== 3) {
                  this.enrollmentList.splice(index, 1);
                }
                
                // 发送取消报名事件
                uni.$emit('enrollment:cancel', {
                  courseId: item.courseId,
                  enrollmentId: enrollmentId
                });
              } else {
                uni.showToast({
                  title: result.message || '取消失败',
                  icon: 'none'
                });
              }
            } catch (error) {
              uni.hideLoading();
              console.error('取消报名失败:', error);
              uni.showToast({
                title: '取消失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },
    
    // 查看详情
    viewDetail(item) {
      const enrollmentId = item._id || item.enrollmentId;
      uni.navigateTo({
        url: `/pages/user/enrollment/detail?id=${enrollmentId}`
      });
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '未知';
      
      try {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      } catch (e) {
        console.error('格式化日期失败:', e);
        return '未知';
      }
    },
    
    // 格式化日期时间
    formatDateTime(timestamp) {
      if (!timestamp) return '未设置';
      
      try {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } catch (e) {
        console.error('格式化日期时间失败:', e);
        return '未设置';
      }
    },
    
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return '待确认';
        case 'confirmed':
          return '已确认';
        case 'cancelled':
          return '已取消';
        case 'completed':
          return '已完成';
        default:
          return '未知状态';
      }
    },
    
    // 获取状态样式类
    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'status-pending';
        case 'confirmed':
          return 'status-confirmed';
        case 'cancelled':
          return 'status-cancelled';
        case 'completed':
          return 'status-completed';
        default:
          return '';
      }
    },
    
    // 检查是否可以取消
    canCancel(status) {
      return status === 'pending' || status === 'confirmed';
    }
  }
}
</script>

<style lang="scss">
.enrollment-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部筛选栏 */
.filter-bar {
  display: flex;
  background-color: #fff;
  padding: 20rpx 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .filter-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;
    padding: 16rpx 0;
    
    &.active {
      color: #FF6B00;
      font-weight: bold;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 64rpx;
        height: 6rpx;
        background-color: #FF6B00;
        border-radius: 3rpx;
      }
    }
  }
}

/* 报名列表 */
.enrollment-list {
  padding: 20rpx;
  
  .enrollment-item {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .item-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        flex: 1;
      }
      
      .item-status {
        font-size: 24rpx;
        padding: 6rpx 12rpx;
        border-radius: 6rpx;
        
        &.status-pending {
          color: #FF9500;
          background-color: rgba(255, 149, 0, 0.1);
        }
        
        &.status-confirmed {
          color: #4CD964;
          background-color: rgba(76, 217, 100, 0.1);
        }
        
        &.status-cancelled {
          color: #8E8E93;
          background-color: rgba(142, 142, 147, 0.1);
        }
        
        &.status-completed {
          color: #007AFF;
          background-color: rgba(0, 122, 255, 0.1);
        }
      }
    }
    
    .item-info {
      margin-bottom: 20rpx;
      
      .info-row {
        display: flex;
        margin-bottom: 10rpx;
        
        .info-label {
          font-size: 28rpx;
          color: #999;
          width: 180rpx;
        }
        
        .info-value {
          font-size: 28rpx;
          color: #333;
          flex: 1;
        }
      }
    }
    
    .item-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 20rpx;
      border-top: 1px solid #f0f0f0;
      
      .btn {
        padding: 12rpx 30rpx;
        border-radius: 30rpx;
        font-size: 28rpx;
        margin-left: 20rpx;
      }
      
      .cancel-btn {
        color: #FF3B30;
        background-color: rgba(255, 59, 48, 0.1);
      }
      
      .detail-btn {
        color: #007AFF;
        background-color: rgba(0, 122, 255, 0.1);
      }
    }
  }
}

/* 空状态提示 */
.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
  
  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
  }
  
  .empty-text {
    font-size: 30rpx;
    color: #999;
  }
}

/* 加载状态 */
.loading-container {
  padding: 30rpx 0;
  text-align: center;
}
</style> 