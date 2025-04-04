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
        <image class="teacher-avatar" :src="getTeacherAvatar(course)" mode="aspectFill"></image>
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
      if (!startTime) return '';
      
      try {
        // 处理日期时间分离的情况
        let startDate = startTime;
        let startTimeOnly = '';
        let endDate = endTime;
        let endTimeOnly = '';
        
        // 处理日期时间组合格式
        if (startTime.includes(' ') || startTime.includes('T')) {
          const date = new Date(startTime);
          if (!isNaN(date.getTime())) {
            startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            startTimeOnly = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          } else {
            return startTime; // 无法解析时返回原值
          }
        }
        
        if (endTime && (endTime.includes(' ') || endTime.includes('T'))) {
          const date = new Date(endTime);
          if (!isNaN(date.getTime())) {
            endDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            endTimeOnly = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          }
        }
        
        // 格式化日期部分
        if (startDate && endDate) {
          return `${startDate} 至 ${endDate}`;
        } else if (startDate) {
          return startDate;
        }
        
        return startTime; // 如果无法处理，返回原始时间
      } catch (e) {
        console.error('时间格式化错误:', e, startTime, endTime);
        return startTime || '时间待定'; // 发生错误时返回原值或默认值
      }
    },
    getTeacherAvatar(course) {
      // 如果没有教师信息，返回默认头像
      if (!course.teacherName) {
        return '/static/images/default-avatar.png';
      }
      
      // 处理教师头像URL - 优先顺序：teacherAvatar > avatar > 默认头像
      if (course.teacherAvatar) {
        // 检查teacherAvatar是否为完整URL
        if (course.teacherAvatar.startsWith('http://') || course.teacherAvatar.startsWith('https://')) {
          return course.teacherAvatar;
        }
        
        // 检查是否为本地资源路径
        if (course.teacherAvatar.startsWith('/')) {
          return course.teacherAvatar;
        }
        
        // 可能是文件ID，尝试使用完整路径
        return course.teacherAvatar;
      }
      
      // 如果课程中有avatar字段，也可能是教师头像
      if (course.avatar) {
        if (course.avatar.startsWith('http://') || course.avatar.startsWith('https://')) {
          return course.avatar;
        }
        
        if (course.avatar.startsWith('/')) {
          return course.avatar;
        }
        
        return course.avatar;
      }
      
      // 最后返回默认头像
      return '/static/images/default-avatar.png';
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