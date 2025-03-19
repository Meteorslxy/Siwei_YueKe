<template>
  <view class="detail-container">
    <!-- 状态栏 -->
    <view class="status-bar" :class="'status-' + bookingDetail.status">
      <view class="status-icon">
        <text class="iconfont" :class="getStatusIcon(bookingDetail.status)"></text>
      </view>
      <view class="status-info">
        <view class="status-text">{{getStatusText(bookingDetail.status)}}</view>
        <view class="status-desc">{{getStatusDesc(bookingDetail.status)}}</view>
      </view>
    </view>
    
    <!-- 课程信息 -->
    <view class="info-card">
      <view class="card-title">课程信息</view>
      <view class="course-title">{{bookingDetail.courseTitle}}</view>
      <view class="info-row">
        <text class="info-label">预约编号：</text>
        <text class="info-value">{{bookingDetail.bookingId}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">课程时间：</text>
        <text class="info-value">{{formatCourseTime(bookingDetail.courseStartTime, bookingDetail.courseEndTime)}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">校区地点：</text>
        <text class="info-value">{{bookingDetail.schoolName}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">预约时间：</text>
        <text class="info-value">{{formatBookingTime(bookingDetail.createTime)}}</text>
      </view>
    </view>
    
    <!-- 学生信息 -->
    <view class="info-card">
      <view class="card-title">学生信息</view>
      <view class="info-row">
        <text class="info-label">学生姓名：</text>
        <text class="info-value">{{bookingDetail.studentName}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">联系电话：</text>
        <text class="info-value">{{bookingDetail.contactPhone}}</text>
      </view>
      <view class="info-row" v-if="bookingDetail.remark">
        <text class="info-label">备注信息：</text>
        <text class="info-value">{{bookingDetail.remark}}</text>
      </view>
    </view>
    
    <!-- 操作区域 -->
    <view class="action-bar">
      <view class="action-btn outline" @click="goBack">返回列表</view>
      
      <block v-if="bookingDetail.status === 'pending'">
        <view class="action-btn primary" @click="cancelBooking">取消预约</view>
      </block>
      
      <block v-if="bookingDetail.status === 'confirmed'">
        <view class="action-btn" @click="contactTeacher">联系老师</view>
        <view class="action-btn primary" @click="navigateToCourse">查看课程</view>
      </block>
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
      bookingId: '',
      bookingDetail: {
        _id: '',
        bookingId: '',
        courseId: '',
        courseTitle: '',
        courseStartTime: '',
        courseEndTime: '',
        schoolName: '',
        studentName: '',
        contactPhone: '',
        remark: '',
        status: 'pending',
        createTime: ''
      }
    }
  },
  onLoad(options) {
    if (options.id) {
      this.bookingId = options.id
      this.fetchBookingDetail()
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  },
  methods: {
    // 获取预约详情
    async fetchBookingDetail() {
      uni.showLoading({
        title: '加载中...'
      })
      
      try {
        // 调用云函数获取预约详情
        const res = await wx.cloud.callFunction({
          name: 'getBookingDetail',
          data: {
            bookingId: this.bookingId
          }
        })
        
        if (res.result && res.result.success) {
          this.bookingDetail = res.result.data
        } else {
          // 使用模拟数据
          this.useMockData()
        }
      } catch (e) {
        console.error('获取预约详情失败:', e)
        // 加载失败，使用模拟数据
        this.useMockData()
      } finally {
        uni.hideLoading()
      }
    },
    
    // 使用模拟数据
    useMockData() {
      this.bookingDetail = {
        _id: this.bookingId,
        bookingId: 'B20230701001',
        userId: 'temp_user_id',
        courseId: '1',
        courseTitle: '三年级浪漫暑假班',
        courseStartTime: '2023-07-01 15:30',
        courseEndTime: '2023-07-17 15:30',
        schoolName: '雨花台校区',
        studentName: '王小明',
        contactPhone: '13812345678',
        remark: '学生性格内向，希望老师多关注',
        status: 'confirmed',
        createTime: '2023-06-25 14:30:00'
      }
    },
    
    // 获取状态图标
    getStatusIcon(status) {
      const iconMap = {
        'pending': 'icon-pending',
        'confirmed': 'icon-confirmed',
        'finished': 'icon-finished',
        'cancelled': 'icon-cancelled'
      }
      return iconMap[status] || 'icon-unknown'
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
    
    // 获取状态描述
    getStatusDesc(status) {
      const descMap = {
        'pending': '您的预约正在等待确认',
        'confirmed': '您的预约已确认，请按时上课',
        'finished': '课程已结束，感谢您的参与',
        'cancelled': '预约已取消'
      }
      return descMap[status] || ''
    },
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return ''
      
      const formatDateTime = (dateStr) => {
        const date = new Date(dateStr)
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      }
      
      if (endTime) {
        return `${formatDateTime(startTime)} 至 ${formatDateTime(endTime)}`
      }
      
      return formatDateTime(startTime)
    },
    
    // 格式化预约时间
    formatBookingTime(timeStr) {
      if (!timeStr) return ''
      
      const date = new Date(timeStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 返回列表
    goBack() {
      uni.navigateBack()
    },
    
    // 取消预约
    cancelBooking() {
      this.$refs.cancelPopup.open()
    },
    
    // 关闭弹窗
    closePopup() {
      this.$refs.cancelPopup.close()
    },
    
    // 确认取消预约
    async confirmCancel() {
      uni.showLoading({
        title: '取消中...'
      })
      
      try {
        // 调用云函数取消预约
        const res = await wx.cloud.callFunction({
          name: 'cancelBooking',
          data: {
            bookingId: this.bookingDetail._id
          }
        })
        
        if (res.result && res.result.success) {
          uni.showToast({
            title: '取消成功',
            icon: 'success'
          })
          
          // 更新状态
          this.bookingDetail.status = 'cancelled'
          
          // 返回上一页并刷新列表
          setTimeout(() => {
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2]
            if (prevPage && prevPage.$vm) {
              prevPage.$vm.resetList()
              prevPage.$vm.loadBookingList()
            }
            uni.navigateBack()
          }, 1500)
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
    contactTeacher() {
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
    navigateToCourse() {
      uni.navigateTo({
        url: `/pages/course/detail?id=${this.bookingDetail.courseId}`
      })
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 120rpx;
}

/* 状态栏 */
.status-bar {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  color: #fff;
  
  &.status-pending {
    background: linear-gradient(to right, #FF9500, #FF7800);
  }
  
  &.status-confirmed {
    background: linear-gradient(to right, #4CD964, #3CC651);
  }
  
  &.status-finished {
    background: linear-gradient(to right, #007AFF, #0055CC);
  }
  
  &.status-cancelled {
    background: linear-gradient(to right, #8E8E93, #636366);
  }
  
  .status-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30rpx;
    
    .iconfont {
      font-size: 60rpx;
    }
  }
  
  .status-info {
    flex: 1;
    
    .status-text {
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .status-desc {
      font-size: 26rpx;
      opacity: 0.8;
    }
  }
}

/* 信息卡片 */
.info-card {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  
  .card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid $theme-color;
  }
  
  .course-title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20rpx;
  }
  
  .info-row {
    display: flex;
    margin-bottom: 16rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 160rpx;
      font-size: 28rpx;
      color: $text-color-grey;
    }
    
    .info-value {
      flex: 1;
      font-size: 28rpx;
      color: $text-color;
    }
  }
}

/* 操作区域 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  box-shadow: 0 -2rpx 6rpx rgba(0, 0, 0, 0.05);
  
  .action-btn {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: $text-color;
    background-color: #f5f5f5;
    border-radius: 40rpx;
    margin: 0 10rpx;
    
    &.outline {
      background-color: #fff;
      border: 1rpx solid $border-color;
    }
    
    &.primary {
      color: #fff;
      background-color: $theme-color;
    }
  }
}
</style> 