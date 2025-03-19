<template>
  <view class="booking-item" @click="goToDetail">
    <view class="booking-info">
      <view class="course-name">{{booking.courseName}}</view>
      <view class="booking-meta">
        <text class="booking-id">预约号: {{booking.bookingId || '--'}}</text>
        <text class="booking-date">{{booking.bookingDate || '待确认'}}</text>
      </view>
      <view class="school-info">
        <text class="school-name">{{booking.schoolName}}</text>
        <text class="teacher-name">{{booking.teacherName}}老师</text>
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
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .booking-info {
    flex: 1;
    overflow: hidden;
    
    .course-name {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 10rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .booking-meta {
      display: flex;
      font-size: 24rpx;
      color: #999;
      margin-bottom: 10rpx;
      
      .booking-id {
        margin-right: 20rpx;
      }
    }
    
    .school-info {
      font-size: 26rpx;
      color: #666;
      
      .school-name {
        margin-right: 20rpx;
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