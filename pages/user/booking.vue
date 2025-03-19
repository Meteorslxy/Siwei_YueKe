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
            <view class="action-btn primary" v-if="item.status === 'pending'" @click.stop="cancelBooking(item)">取消预约</view>
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
    
    <!-- 取消预约弹窗 -->
    <uni-popup ref="cancelPopup" type="dialog">
      <uni-popup-dialog
        title="取消预约"
        content="确定要取消此预约吗？取消后无法恢复"
        :before-close="true"
        @confirm="confirmCancel"
        @close="closePopup">
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 状态筛选标签
      tabs: [
        { label: '全部', value: 'all' },
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
    if (options.status && this.tabs.some(tab => tab.value === options.status)) {
      this.currentStatus = options.status
    }
    
    this.loadBookingList()
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
    
    // 加载预约记录列表
    async loadBookingList() {
      this.loadMoreStatus = 'loading'
      
      try {
        const userInfo = uni.getStorageSync('userInfo')
        if (!userInfo) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.redirectTo({ url: '/pages/user/user' })
          }, 1500)
          return Promise.resolve()
        }
        
        const userData = JSON.parse(userInfo)
        const userId = userData.userId || 'temp_user_id'
        
        // 调用云函数获取预约记录
        const res = await wx.cloud.callFunction({
          name: 'getBookings',
          data: {
            userId: userId,
            status: this.currentStatus !== 'all' ? this.currentStatus : '',
            limit: this.limit,
            skip: (this.page - 1) * this.limit
          }
        })
        
        if (res.result && res.result.success) {
          const newList = res.result.data
          this.total = res.result.total
          
          if (this.page === 1) {
            this.bookingList = newList
          } else {
            this.bookingList = [...this.bookingList, ...newList]
          }
          
          // 更新加载状态
          this.loadMoreStatus = this.bookingList.length >= this.total ? 'noMore' : 'more'
        } else {
          // 模拟数据
          this.useMockData()
        }
      } catch (e) {
        console.error('获取预约记录失败:', e)
        // 加载失败，使用模拟数据
        this.useMockData()
      }
      
      return Promise.resolve()
    },
    
    // 使用模拟数据
    useMockData() {
      const mockData = [
        {
          _id: '1',
          bookingId: 'B20230701001',
          userId: 'temp_user_id',
          courseId: '1',
          courseTitle: '三年级浪漫暑假班',
          courseStartTime: '2023-07-01 15:30',
          courseEndTime: '2023-07-17 15:30',
          schoolName: '雨花台校区',
          studentName: '王小明',
          contactPhone: '13812345678',
          status: 'confirmed',
          createTime: '2023-06-25 14:30:00'
        },
        {
          _id: '2',
          bookingId: 'B20230702001',
          userId: 'temp_user_id',
          courseId: '2',
          courseTitle: '四年级提优暑假班',
          courseStartTime: '2023-07-08 08:30',
          courseEndTime: '2023-07-10 08:30',
          schoolName: '大行宫校区',
          studentName: '王小明',
          contactPhone: '13812345678',
          status: 'pending',
          createTime: '2023-06-28 09:15:00'
        }
      ]
      
      // 根据状态筛选
      let filteredData = mockData
      if (this.currentStatus !== 'all') {
        filteredData = mockData.filter(item => item.status === this.currentStatus)
      }
      
      if (this.page === 1) {
        this.bookingList = filteredData
      } else {
        this.bookingList = [...this.bookingList, ...filteredData]
      }
      
      this.total = filteredData.length + 3
      this.loadMoreStatus = this.bookingList.length >= this.total ? 'noMore' : 'more'
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'pending': '待确认',
        'confirmed': '已确认',
        'finished': '已完成',
        'cancelled': '已取消'
      }
      return statusMap[status] || '未知状态'
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
      this.currentBooking = booking
      this.$refs.cancelPopup.open()
    },
    
    // 关闭弹窗
    closePopup() {
      this.$refs.cancelPopup.close()
    },
    
    // 确认取消预约
    async confirmCancel() {
      if (!this.currentBooking) return
      
      uni.showLoading({
        title: '取消中...'
      })
      
      try {
        // 调用云函数取消预约
        const res = await wx.cloud.callFunction({
          name: 'cancelBooking',
          data: {
            bookingId: this.currentBooking._id
          }
        })
        
        if (res.result && res.result.success) {
          uni.showToast({
            title: '取消成功',
            icon: 'success'
          })
          
          // 更新列表状态
          this.bookingList = this.bookingList.map(item => {
            if (item._id === this.currentBooking._id) {
              return {...item, status: 'cancelled'}
            }
            return item
          })
        } else {
          uni.showToast({
            title: res.result.message || '取消失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('取消预约失败:', e)
        uni.showToast({
          title: '取消失败，请稍后重试',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
        this.closePopup()
      }
    },
    
    // 联系老师
    contactTeacher(booking) {
      uni.makePhoneCall({
        phoneNumber: '13812345678',
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          })
        }
      })
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