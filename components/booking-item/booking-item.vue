<template>
  <view class="booking-item" @click="goToDetail">
    <view class="booking-info">
      <view class="course-name">{{booking.courseName}}</view>
      <view class="booking-meta">
        <text class="booking-id">预约编号：{{booking.bookingId}}</text>
        <text class="booking-time">{{booking.bookingTime}}</text>
      </view>
      <view class="school-info">
        <text class="school-name">{{booking.schoolName}}</text>
        <text class="teacher-name">{{booking.teacherName ? (booking.teacherName + ' 老师') : '暂无教师'}}</text>
      </view>
    </view>
    <view class="booking-status" :style="{color: statusColor}">
      {{statusText}}
    </view>
  </view>
</template>

<script>
export default {
  name: 'booking-item',
  props: {
    booking: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    statusText() {
      const statusMap = {
        0: '待确认',
        1: '已确认',
        2: '已取消',
        3: '已完成'
      };
      return statusMap[this.booking.status] || '待确认';
    },
    statusColor() {
      const colorMap = {
        0: '#999999', // 待确认
        1: '#007AFF', // 已确认
        2: '#FF0000', // 已取消
        3: '#4CD964'  // 已完成
      };
      return colorMap[this.booking.status] || '#999999';
    }
  },
  methods: {
    goToDetail() {
      this.$emit('click', this.booking);
      uni.navigateTo({
        url: `/pages/booking/detail?id=${this.booking._id}`
      });
    }
  }
}
</script>

<style lang="scss">
.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.08);
  
  .booking-info {
    flex: 1;
    overflow: hidden;
    
    .course-name {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 15rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .booking-meta {
      display: flex;
      font-size: 24rpx;
      color: #999;
      margin-bottom: 15rpx;
      
      .booking-id {
        margin-right: 20rpx;
      }
    }
    
    .school-info {
      font-size: 26rpx;
      color: #666;
      margin-top: 12rpx;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      
      .school-name {
        margin-right: 20rpx;
        margin-bottom: 8rpx;
      }
      
      .teacher-name {
        color: #FF6B00;
        font-weight: 500;
        background-color: rgba(255, 107, 0, 0.1);
        padding: 6rpx 12rpx;
        border-radius: 8rpx;
        display: inline-block;
        margin-bottom: 8rpx;
      }
    }
  }
  
  .booking-status {
    font-size: 28rpx;
    font-weight: 500;
    padding-left: 20rpx;
  }
}
</style> 