<template>
  <view class="course-card" @click="onClick" :class="{ 'course-full': isFull }">
    <!-- 已约满图章 -->
    <image v-if="isFull" class="sold-out-stamp" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/已约满-c2.png" mode="aspectFit"></image>
    
    <view class="card-upper">
      <view class="course-image">
        <image :src="course.coverImage || '/static/images/course-default.jpg'" mode="aspectFill" @error="handleImageError"></image>
        <view class="course-tag" v-if="course.tag">{{course.tag}}</view>
        <view class="course-full-tag" v-if="isFull">已约满</view>
      </view>
      <view class="course-info">
        <view class="course-title">{{course.title}}</view>
        <view class="course-detail-row" v-if="course.location">
          <view class="course-location">
            <image class="icon-image" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/map.png"></image>
            <text class="location-text">{{course.location}}</text>
          </view>
          <view class="enrollment-status" v-if="course.maxEnroll || course.courseCapacity">
            <text class="enrollment-text">名额 {{getEnrollmentStatus()}}</text>
          </view>
        </view>
        <view class="course-detail-row" v-if="course.startTime">
          <view class="course-time">
            <image class="icon-image" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/time.png"></image>
            <text class="time-text">{{formatTime(course.startTime, course.endTime)}}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="divider"></view>
    
    <view class="card-lower">
      <view class="teacher-info">
        <image class="teacher-avatar" :src="getTeacherAvatar(course)" mode="aspectFill" @error="handleAvatarError"></image>
        <text class="teacher-name">{{course.teacherName}}</text>
        <text class="teacher-title">{{course.teacherTitle || ''}}</text>
      </view>
      <view class="price-info">
        <text class="price-value">{{getTotalPrice()}}.00</text>
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
  computed: {
    isFull() {
      const maxEnroll = this.course.maxEnroll || this.course.courseCapacity || this.course.capacity || 10;
      const bookingCount = this.course.bookingCount || this.course.enrolled || 0;
      return bookingCount >= maxEnroll;
    }
  },
  methods: {
    getTotalPrice() {
      const classFee = parseFloat(this.course.classFee || 0);
      const materialFee = parseFloat(this.course.materialFee || 0);
      const totalPrice = classFee + materialFee;
      return totalPrice || this.course.price || 4000;
    },
    onClick() {
      this.$emit('click', this.course)
    },
    onBookClick() {
      this.$emit('book', this.course)
    },
    getEnrollmentStatus() {
      const maxEnroll = this.course.maxEnroll || this.course.courseCapacity || this.course.capacity || 10;
      const bookingCount = this.course.bookingCount || this.course.enrolled || 0;
      return `${bookingCount}/${maxEnroll}`;
    },
    formatTime(startTime, endTime) {
      if (!startTime) return '';
      
      try {
        let startDate = startTime;
        let startTimeOnly = '';
        let endDate = endTime;
        let endTimeOnly = '';
        
        if (startTime.includes(' ') || startTime.includes('T')) {
          const date = new Date(startTime);
          if (!isNaN(date.getTime())) {
            startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            startTimeOnly = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          } else {
            return startTime;
          }
        }
        
        if (endTime && (endTime.includes(' ') || endTime.includes('T'))) {
          const date = new Date(endTime);
          if (!isNaN(date.getTime())) {
            endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            endTimeOnly = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          }
        }
        
        if (startDate && endDate) {
          return `${startDate} 至 ${endDate}`;
        } else if (startDate) {
          return startDate;
        }
        
        return startTime;
      } catch (e) {
        console.error('时间格式化错误:', e, startTime, endTime);
        return startTime || '时间待定';
      }
    },
    getTeacherAvatar(course) {
      if (!course.teacherName) {
        return '/static/images/default-avatar.png';
      }
      
      if (course.teacherAvatarUrl) {
        return course.teacherAvatarUrl;
      }
      
      if (course.teacherAvatar) {
        if (course.teacherAvatar.startsWith('http://') || course.teacherAvatar.startsWith('https://')) {
          return course.teacherAvatar;
        }
        
        if (course.teacherAvatar.startsWith('/')) {
          return course.teacherAvatar;
        }
        
        return course.teacherAvatar;
      }
      
      if (course.avatar) {
        if (course.avatar.startsWith('http://') || course.avatar.startsWith('https://')) {
          return course.avatar;
        }
        
        if (course.avatar.startsWith('/')) {
          return course.avatar;
        }
        
        return course.avatar;
      }
      
      return '/static/images/default-avatar.png';
    },
    handleImageError(e) {
      console.log('课程封面图片加载失败，使用默认图片');
      if (e.target) {
        e.target.src = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/default-course.jpg';
      }
    },
    handleAvatarError(e) {
      console.log('教师头像加载失败，使用默认头像');
      if (e.target) {
        e.target.src = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/default-avatar.jpg';
      }
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
  box-shadow: 0 6rpx 16rpx rgba(236, 122, 73, 0.2);
  position: relative;
}

.course-card.course-full {
  background-color: #f5f5f5;
  opacity: 0.8;
}

.course-card.course-full .course-title,
.course-card.course-full .location-text,
.course-card.course-full .time-text,
.course-card.course-full .teacher-name,
.course-card.course-full .teacher-title {
  color: #999;
}

.course-card.course-full .price-value {
  color: #999;
}

.card-upper {
  display: flex;
  padding: 20rpx;
}

.course-image {
  width: 190rpx;
  height: 140rpx;
  margin-top: 10rpx;  /* 添加这行代码，数值可以根据需要调整 */
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

.course-full-tag {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(150, 150, 150, 0.9);
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 8rpx 16rpx;
  transform: rotate(-45deg) translate(-20rpx, -10rpx);
  transform-origin: left top;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  z-index: 5;
  width: 120rpx;
  text-align: center;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.course-location, .course-time {
  font-size: 22rpx;
  color: #666;
  display: flex;
  align-items: center;
  flex: 1;
}

.enrollment-status {
  font-size: 22rpx;
  display: flex;
  align-items: center;
  margin-left: auto;
}

.enrollment-text {
  color: #FF6B00;
  font-weight: 500;
  background-color: rgba(255, 107, 0, 0.1);
  padding: 2rpx 8rpx;
  border-radius: 4rpx;
}

.course-card.course-full .enrollment-text {
  color: #999;
  background-color: rgba(153, 153, 153, 0.1);
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

/* 已约满图章样式 */
.sold-out-stamp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180rpx;
  height: 180rpx;
  z-index: 10;
  opacity: 0.8;
  pointer-events: none; /* 防止图章影响点击事件 */
}
</style> 