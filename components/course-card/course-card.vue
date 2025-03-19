<template>
  <view class="course-card" @click="onClick">
    <view class="course-image">
      <image :src="course.coverImage || '/static/images/course-default.jpg'" mode="aspectFill"></image>
      <view class="course-tag" v-if="course.tag">{{course.tag}}</view>
    </view>
    <view class="course-info">
      <view class="course-title">{{course.title}}</view>
      <view class="course-school" v-if="course.schoolName">
        <text class="school-icon iconfont icon-location"></text>
        <text class="school-name">{{course.schoolName}}</text>
      </view>
      <view class="course-time" v-if="course.startTime">
        <text class="time-icon iconfont icon-time"></text>
        <text class="time-text">{{formatTime(course.startTime, course.endTime)}}</text>
      </view>
      <view class="course-bottom">
        <view class="course-price">
          <text class="price-value">¥{{course.price}}</text>
          <text class="price-original" v-if="course.originalPrice">¥{{course.originalPrice}}</text>
        </view>
        <view class="book-btn" @click.stop="onBookClick">预约</view>
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
  display: flex;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.course-image {
  width: 220rpx;
  height: 220rpx;
  position: relative;
}

.course-image image {
  width: 100%;
  height: 100%;
}

.course-tag {
  position: absolute;
  top: 16rpx;
  left: 0;
  background-color: #FF6B00;
  color: #fff;
  font-size: 22rpx;
  padding: 6rpx 12rpx;
  border-radius: 0 6rpx 6rpx 0;
}

.course-info {
  flex: 1;
  padding: 16rpx;
  position: relative;
  display: flex;
  flex-direction: column;
}

.course-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
  line-height: 1.4;
  color: #333;
}

.course-school, .course-time {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 8rpx;
  display: flex;
  align-items: center;
}

.school-icon, .time-icon {
  font-size: 24rpx;
  margin-right: 8rpx;
  color: #999;
}

.course-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.course-price {
  display: flex;
  align-items: baseline;
}

.price-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF3B30;
}

.price-original {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
  margin-left: 8rpx;
}

.book-btn {
  height: 56rpx;
  line-height: 56rpx;
  background-color: #FF6B00;
  color: #fff;
  font-size: 24rpx;
  padding: 0 20rpx;
  border-radius: 28rpx;
}
</style> 