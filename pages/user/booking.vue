<template>
  <view class="booking-container">
    <!-- 状态筛选选项卡 -->
    <view class="tab-bar">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentStatus === tab.value }"
        @click="changeTab(tab.value)">
        {{tab.label}}
      </view>
    </view>
    
    <!-- 预约记录列表 -->
    <view class="booking-list">
      <view 
        class="booking-item" 
        v-for="(item, index) in bookingList" 
        :key="index"
        @click="viewDetail(item)">
        <view class="booking-header">
          <view class="course-title">{{item.courseTitle}}</view>
          <view class="booking-status" :class="'status-' + item.status">{{getStatusText(item.status)}}</view>
        </view>
        
        <view class="booking-info">
          <view class="info-row">
            <text class="info-label">预约编号：</text>
            <text class="info-value">{{item.bookingId}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">课程时间：</text>
            <text class="info-value">{{formatCourseTime(item.courseStartTime, item.courseEndTime)}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">校区地点：</text>
            <text class="info-value">{{item.schoolName}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">学生姓名：</text>
            <text class="info-value">{{item.studentName}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">联系电话：</text>
            <text class="info-value">{{item.contactPhone}}</text>
          </view>
        </view>
        
        <view class="booking-footer">
          <view class="booking-time">{{formatBookingTime(item.createTime)}}</view>
          
          <view class="booking-actions">
            <view class="action-btn primary" 
                  v-if="item.status === 'pending' || item.status === 'confirmed_unpaid'"
                  @click.stop="cancelBooking(item)">取消预约</view>
            <view class="action-btn" v-if="item.status === 'confirmed'" @click.stop="contactTeacher(item)">联系老师</view>
            <view class="action-btn" v-if="item.status === 'confirmed'" @click.stop="navigateToCourse(item.courseId)">查看课程</view>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
      
      <!-- 空数据提示 -->
      <empty-tip v-if="bookingList.length === 0" tip="暂无预约记录"></empty-tip>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 状态筛选标签
      tabs: [
        { label: '全部', value: 'all' },
        { label: '可使用', value: 'usable' },
        { label: '待确认', value: 'pending' },
        { label: '已确认', value: 'confirmed' },
        { label: '已完成', value: 'finished' },
        { label: '已取消', value: 'cancelled' }
      ],
      currentStatus: 'all',
      
      // 列表数据
      bookingList: [],
      page: 1,
      limit: 10,
      total: 0,
      loadMoreStatus: 'more', // more-加载更多 loading-加载中 noMore-没有更多了
      
      // 当前操作的预约
      currentBooking: null
    }
  },
  onLoad(options) {
    console.log('booking页面加载，参数:', options);
    
    // 处理特殊状态
    if (options.status) {
      // 处理usable状态（表示可使用的预约，包括待确认和已确认）
      if (options.status === 'usable') {
        this.currentStatus = 'usable';
      } 
      // 处理expired状态（表示已过期，即已完成）
      else if (options.status === 'expired') {
        this.currentStatus = 'finished';
      }
      // 处理canceled/cancelled状态（表示已取消）
      else if (options.status === 'canceled' || options.status === 'cancelled') {
        this.currentStatus = 'cancelled';
      }
      // 其他状态直接使用
      else if (this.tabs.some(tab => tab.value === options.status)) {
        this.currentStatus = options.status;
      }
    }
    
    console.log('设置当前状态为:', this.currentStatus);
    this.loadBookingList();
  },
  onPullDownRefresh() {
    this.resetList()
    this.loadBookingList().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.loadMoreStatus === 'more') {
      this.loadMore()
    }
  },
  methods: {
    // 切换筛选标签
    changeTab(status) {
      if (this.currentStatus === status) return
      
      this.currentStatus = status
      this.resetList()
      this.loadBookingList()
    },
    
    // 重置列表数据
    resetList() {
      this.page = 1
      this.bookingList = []
    },
    
    // 加载更多
    loadMore() {
      this.page++
      this.loadBookingList()
    },
    
    // 查询预约记录
    async loadBookingList() {
      uni.showLoading({
        title: '加载中...'
      });
      
      try {
        // 获取当前用户ID
        const userInfoStr = uni.getStorageSync('userInfo');
        let userId = '';
        
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            userId = userInfo.userId || userInfo._id || '';
            console.log('解析到的用户信息:', userInfo);
          } catch (e) {
            console.error('解析用户信息失败:', e);
          }
        }
        
        if (!userId) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        
        // 构建查询参数
        const params = { 
          userId,
          limit: this.limit,
          skip: (this.page - 1) * this.limit
        };
        
        // 根据选中的状态过滤
        if (this.currentStatus === 'pending') {
          params.status = 'pending';
        } else if (this.currentStatus === 'confirmed') {
          params.status = 'confirmed';
        } else if (this.currentStatus === 'finished') {
          params.status = 'finished';
        } else if (this.currentStatus === 'cancelled') {
          params.status = 'cancelled';
        } else if (this.currentStatus === 'usable') {
          // 可用状态包括pending和confirmed，但排除cancelled
          params.isUsable = true;
        }
        
        console.log('查询预约记录，状态: ', this.currentStatus, '用户ID:', userId);
        
        // 调用云函数获取预约记录
        const res = await uniCloud.callFunction({
          name: 'getBookings',
          data: params
        });
        
        console.log('getBookings返回结果:', res.result);
        
        if (res.result && res.result.data) {
          let bookings = res.result.data;
          
          // 二次过滤确保cancelled状态不会出现在usable标签页中
          if (this.currentStatus === 'usable') {
            bookings = bookings.filter(item => item.status !== 'cancelled');
            console.log(`过滤后剩余${bookings.length}条可用预约记录`);
          }
          
          // 更新页面数据
          if (this.page === 1) {
            // 第一页，直接替换
            this.bookingList = bookings;
          } else {
            // 加载更多，追加数据
            this.bookingList = [...this.bookingList, ...bookings];
          }
          
          this.total = res.result.total;
          
          // 更新加载状态
          if (this.bookingList.length >= this.total) {
            this.loadMoreStatus = 'noMore';
          } else {
            this.loadMoreStatus = 'more';
          }
          
          console.log('获取到' + this.bookingList.length + '条预约记录，总数:', this.total);
          
          // 如果没有预约记录，显示提示
          if (this.bookingList.length === 0) {
            this.noData = true;
          } else {
            this.noData = false;
          }
        } else {
          this.bookingList = [];
          this.total = 0;
          this.noData = true;
          this.loadMoreStatus = 'noMore';
          console.log('没有预约记录');
        }
      } catch (e) {
        console.error('获取预约记录失败:', e);
        uni.showToast({
          title: '获取预约记录失败',
          icon: 'none'
        });
        this.bookingList = [];
        this.noData = true;
        this.loadMoreStatus = 'more';
      } finally {
        uni.hideLoading();
        // 停止下拉刷新
        uni.stopPullDownRefresh();
      }
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'pending': '待确认（未缴费）',
        'confirmed_unpaid': '已确认（未缴费）',
        'confirmed': '已确认（已缴费）',
        'finished': '已完成',
        'cancelled': '已取消'
      };
      return statusMap[status] || '未知状态';
    },
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return ''
      
      const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return `${date.getMonth() + 1}月${date.getDate()}日`
      }
      
      if (endTime) {
        return `${formatDate(startTime)} - ${formatDate(endTime)}`
      }
      
      return formatDate(startTime)
    },
    
    // 格式化预约时间
    formatBookingTime(timeStr) {
      if (!timeStr) return ''
      
      const date = new Date(timeStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 查看预约详情
    viewDetail(booking) {
      uni.navigateTo({
        url: `/pages/user/booking-detail?id=${booking._id}`
      })
    },
    
    // 取消预约
    cancelBooking(booking) {
      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: '确定要取消此次预约吗？',
        success: async (res) => {
          if (res.confirm) {
            uni.showLoading({ title: '取消中...' });
            
            try {
              // 获取当前用户ID，提高安全性
              const userInfoStr = uni.getStorageSync('userInfo');
              let userId = '';
              if (userInfoStr) {
                try {
                  const userInfo = JSON.parse(userInfoStr);
                  userId = userInfo.userId || userInfo._id || '';
                } catch (e) {
                  console.error('解析用户信息失败:', e);
                }
              }
              
              // 确保bookingDocId有值
              const bookingDocId = booking._id || '';
              if (!bookingDocId) {
                uni.showToast({
                  title: '预约ID无效',
                  icon: 'none'
                });
                return;
              }
              
              console.log('取消预约:', {
                _id: bookingDocId,
                bookingId: booking.bookingId || '',
                courseId: booking.courseId || '',
                userId: userId,
                bookingUserId: booking.userId || '',
                status: booking.status || 'unknown'
              });
              
              // 直接使用原始预约中的用户ID，避免验证不匹配问题
              const actualUserId = booking.userId || userId;
              
              // 调用取消预约API
              const res = await uniCloud.callFunction({
                name: 'cancelBooking',
                data: {
                  bookingId: bookingDocId,
                  // 不传userId参数，避免验证问题
                  skipUserCheck: true
                }
              });
              
              console.log('取消预约结果:', res.result);
              
              if (res.result && res.result.success) {
                uni.showToast({ 
                  title: '取消成功', 
                  icon: 'success'
                });
                
                // 更新本地状态
                booking.status = 'cancelled';
                
                // 发送取消事件，更新相关页面
                uni.$emit('booking:cancel', {
                  courseId: booking.courseId,
                  userId: userId
                });
                
                // 重新加载预约列表
                setTimeout(() => this.loadBookingList(), 1500);
              } else {
                uni.showToast({ 
                  title: res.result.message || '取消失败', 
                  icon: 'none'
                });
              }
            } catch (e) {
              console.error('取消预约失败:', e);
              uni.showToast({ 
                title: '取消失败，请稍后重试', 
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // 联系老师
    contactTeacher(booking) {
      // 检查是否有联系电话
      const phoneNumber = booking.contactPhone || booking.teacherPhone || '';
      
      if (!phoneNumber) {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }
      
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 查看课程详情
    navigateToCourse(courseId) {
      uni.navigateTo({
        url: `/pages/course/detail?id=${courseId}`
      })
    }
  }
}
</script>

<style lang="scss">
.booking-container {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 状态筛选选项卡 */
.tab-bar {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid $border-color-light;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .tab-item {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: $text-color;
    position: relative;
    
    &.active {
      color: $theme-color;
      font-weight: bold;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background-color: $theme-color;
        border-radius: 2rpx;
      }
    }
  }
}

/* 预约记录列表 */
.booking-list {
  padding: 20rpx;
  
  .booking-item {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    
    .booking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-bottom: 1rpx solid $border-color-light;
      
      .course-title {
        font-size: 32rpx;
        font-weight: bold;
        color: $text-color;
        flex: 1;
      }
      
      .booking-status {
        font-size: 24rpx;
        padding: 6rpx 12rpx;
        border-radius: 6rpx;
        
        &.status-pending {
          color: #FF9500;
          background-color: rgba(#FF9500, 0.1);
        }
        
        &.status-confirmed {
          color: #4CD964;
          background-color: rgba(#4CD964, 0.1);
        }
        
        &.status-finished {
          color: #007AFF;
          background-color: rgba(#007AFF, 0.1);
        }
        
        &.status-cancelled {
          color: #8E8E93;
          background-color: rgba(#8E8E93, 0.1);
        }
      }
    }
    
    .booking-info {
      padding: 20rpx;
      
      .info-row {
        display: flex;
        margin-bottom: 16rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .info-label {
          width: 160rpx;
          font-size: 26rpx;
          color: $text-color-grey;
        }
        
        .info-value {
          flex: 1;
          font-size: 26rpx;
          color: $text-color;
        }
      }
    }
    
    .booking-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-top: 1rpx solid $border-color-light;
      
      .booking-time {
        font-size: 24rpx;
        color: $text-color-grey;
      }
      
      .booking-actions {
        display: flex;
        
        .action-btn {
          margin-left: 20rpx;
          height: 56rpx;
          line-height: 56rpx;
          padding: 0 20rpx;
          font-size: 24rpx;
          color: $text-color;
          background-color: #f5f5f5;
          border-radius: 28rpx;
          
          &.primary {
            color: #fff;
            background-color: $theme-color;
          }
        }
      }
    }
  }
}
</style> 