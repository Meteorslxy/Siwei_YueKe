<template>
  <view class="course-card" @click="onClick">
    <view class="card-upper">
      <view class="course-image">
        <image :src="course.coverImage || '/static/images/course-default.jpg'" mode="aspectFill"></image>
        <view class="course-tag" v-if="course.tag">{{course.tag}}</view>
      </view>
      <view class="course-info">
        <view class="course-title">{{course.title}}</view>
        <view class="course-location" v-if="course.location">
          <image class="icon-image" src="/static/images/icons/map.png"></image>
          <text class="location-text">{{course.location}}</text>
        </view>
        <view class="course-time" v-if="course.startTime">
          <image class="icon-image" src="/static/images/icons/time.png"></image>
          <text class="time-text">{{formatTime(course.startTime, course.endTime)}}</text>
        </view>
      </view>
    </view>
    
    <view class="divider"></view>
    
    <view class="card-lower">
      <view class="teacher-info">
        <image class="teacher-avatar" :src="course.teacherAvatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
        <text class="teacher-name">{{course.teacherName}}</text>
        <text class="teacher-title">{{course.teacherTitle || ''}}</text>
      </view>
      <view class="price-info">
        <text class="price-value">{{course.price || 4000}}.00</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'course-card',
  props: {
    course: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.course)
    },
    onBookClick() {
      this.$emit('book', this.course)
    },
    formatTime(startTime, endTime) {
      if (!startTime) return ''
      
      const start = new Date(startTime)
      const formattedStart = `${start.getMonth() + 1}.${start.getDate()}`
      
      if (endTime) {
        const end = new Date(endTime)
        const formattedEnd = `${end.getMonth() + 1}.${end.getDate()}`
        return `${formattedStart}-${formattedEnd}`
      }
      
      return formattedStart
    }
  }
}
</script>

<style>
.course-card {
  background-color: #fff;
  margin-bottom: 24rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.card-upper {
  display: flex;
  padding: 20rpx;
}

.course-image {
  width: 180rpx;
  height: 140rpx;
  position: relative;
  margin-right: 20rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.course-image image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-tag {
  position: absolute;
  top: 10rpx;
  left: 0;
  background-color: #FF6B00;
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 8rpx;
  border-radius: 0 6rpx 6rpx 0;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6rpx 0;
}

.course-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  line-height: 1.4;
  color: #333;
}

.course-location, .course-time {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 8rpx;
  display: flex;
  align-items: center;
}

.icon-image {
  width: 24rpx;
  height: 24rpx;
  margin-right: 8rpx;
}

.location-text, .time-text {
  color: #666;
}

.divider {
  height: 1px;
  background-color: #EEEEEE;
  margin: 0 20rpx;
}

.card-lower {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 20rpx;
  height: 60rpx;
}

.teacher-info {
  display: flex;
  align-items: center;
}

.teacher-avatar {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  margin-right: 12rpx;
}

.teacher-name {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
  margin-right: 10rpx;
}

.teacher-title {
  font-size: 22rpx;
  color: #999;
}

.price-info {
  display: flex;
  align-items: baseline;
}

.price-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF3B30;
}
</style> 