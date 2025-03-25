<template>
  <view class="detail-container">
    <!-- 状态栏 -->
    <view class="status-bar" :class="'status-' + bookingDetail.status">
      <view class="status-icon">
        <text class="iconfont" :class="statusIcon"></text>
      </view>
      <view class="status-info">
        <view class="status-text">{{statusText}}</view>
        <view class="status-desc">{{statusDesc}}</view>
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
      
      <block v-if="bookingDetail.status === 'pending' || bookingDetail.status === 'confirmed_unpaid'">
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
  computed: {
    statusIcon() {
      return this.getStatusIcon(this.bookingDetail.status);
    },
    statusText() {
      return this.getStatusText(this.bookingDetail.status);
    },
    statusDesc() {
      return this.getStatusDesc(this.bookingDetail.status);
    }
  },
  methods: {
    // 获取预约详情
    async fetchBookingDetail() {
      if (!this.bookingId) {
        console.error('预约ID为空，无法获取详情')
        uni.showToast({
          title: '参数错误',
          icon: 'none'
        })
        return
      }
      
      uni.showLoading({
        title: '加载中...'
      })
      
      try {
        // 调用云函数获取预约详情
        const res = await uniCloud.callFunction({
          name: 'getBookingDetail',
          data: {
            bookingId: this.bookingId
          }
        })
        
        console.log('预约详情云函数返回结果:', res.result)
        
        if (res.result && res.result.success && res.result.data) {
          this.bookingDetail = res.result.data
          console.log('获取到预约详情:', this.bookingDetail)
        } else {
          console.error('获取预约详情失败:', res.result)
          uni.showToast({
            title: '获取预约详情失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取预约详情出错:', e)
        uni.showToast({
          title: '获取预约详情失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
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
        // 确定使用哪个ID
        const bookingDocId = this.bookingDetail._id;
        const displayBookingId = this.bookingDetail.bookingId;
        
        console.log('取消预约详情:', {
          _id: bookingDocId,
          bookingId: displayBookingId,
          courseId: this.bookingDetail.courseId,
          status: this.bookingDetail.status
        });
        
        // 调用云函数取消预约，跳过用户ID验证
        const res = await uniCloud.callFunction({
          name: 'cancelBooking',
          data: {
            bookingId: bookingDocId, // 使用文档_id
            skipUserCheck: true // 跳过用户ID验证
          }
        })
        
        console.log('取消预约结果:', res.result);
        
        if (res.result && res.result.success) {
          uni.showToast({
            title: '取消成功',
            icon: 'success'
          })
          
          // 更新状态
          this.bookingDetail.status = 'cancelled'
          
          // 通知课程详情页面更新预约状态
          uni.$emit('booking:cancel', {
            courseId: this.bookingDetail.courseId,
            userId: userId
          });
          
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
      // 检查是否有联系电话
      const phoneNumber = this.bookingDetail.contactPhone || this.bookingDetail.teacherPhone || '';
      
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
    navigateToCourse() {
      uni.navigateTo({
        url: `/pages/course/detail?id=${this.bookingDetail.courseId}`
      })
    },
    
    // 获取状态图标
    getStatusIcon(status) {
      switch(status) {
        case 'pending':
          return 'icon-time';
        case 'confirmed':
          return 'icon-check-circle';
        case 'finished':
          return 'icon-success';
        case 'cancelled':
          return 'icon-close-circle';
        default:
          return 'icon-help';
      }
    },
    
    // 获取状态文本
    getStatusText(status) {
      switch(status) {
        case 'pending':
          return '待确认（未缴费）';
        case 'confirmed_unpaid':
          return '已确认（未缴费）';
        case 'confirmed':
          return '已确认（已缴费）';
        case 'finished':
          return '已完成';
        case 'cancelled':
          return '已取消';
        default:
          return '未知状态';
      }
    },
    
    // 获取状态描述
    getStatusDesc(status) {
      switch(status) {
        case 'pending':
          return '您的预约正在等待教师确认，未缴费状态可随时取消';
        case 'confirmed_unpaid':
          return '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'confirmed':
          return '教师已确认您的预约，您已完成缴费，请按时参加课程';
        case 'finished':
          return '课程已顺利完成，感谢您的参与';
        case 'cancelled':
          return '预约已取消';
        default:
          return '';
      }
    },
  }
}
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 120rpx;
}

/* 图标样式 */
.iconfont {
  font-family: "iconfont";
  font-size: 48rpx;
  font-style: normal;
  display: inline-block;
  
  &.icon-time:before { content: "\e657"; }
  &.icon-check-circle:before { content: "\e645"; }
  &.icon-success:before { content: "\e6b3"; }
  &.icon-close-circle:before { content: "\e646"; }
  &.icon-help:before { content: "\e6a8"; }
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