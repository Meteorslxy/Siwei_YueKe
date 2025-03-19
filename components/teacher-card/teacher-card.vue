<template>
  <view class="teacher-card" @click="goToDetail">
    <view class="teacher-avatar">
      <image class="avatar" :src="teacher.avatar || defaultAvatar" mode="aspectFill"></image>
    </view>
    <view class="teacher-info">
      <view class="teacher-name">{{teacher.name}}<text class="teacher-title">{{teacher.title}}</text></view>
      <view class="teacher-school">{{teacher.schoolName}}</view>
      <view class="teacher-desc">{{teacher.desc || '暂无介绍'}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'teacher-card',
  props: {
    teacher: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      defaultAvatar: '/static/images/default-avatar.png'
    }
  },
  methods: {
    goToDetail() {
      this.$emit('click', this.teacher);
      uni.navigateTo({
        url: `/pages/teacher/detail?id=${this.teacher._id}`
      });
    }
  }
}
</script>

<style lang="scss">
.teacher-card {
  display: flex;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .teacher-avatar {
    width: 120rpx;
    height: 120rpx;
    margin-right: 20rpx;
    
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  
  .teacher-info {
    flex: 1;
    
    .teacher-name {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 10rpx;
      
      .teacher-title {
        font-size: 24rpx;
        color: #999;
        margin-left: 20rpx;
        font-weight: normal;
      }
    }
    
    .teacher-school {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 10rpx;
    }
    
    .teacher-desc {
      font-size: 24rpx;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style> 