<template>
  <view class="teacher-card" @click="goToDetail">
    <view class="teacher-avatar">
      <image class="avatar" :src="teacher.avatar || defaultAvatar" mode="aspectFill"></image>
    </view>
    <view class="teacher-info">
      <view class="teacher-content">
        <view class="name-subject">
          <view class="teacher-name">{{teacher.name || '叶老师'}}</view>
          <view class="subject-tag">{{teacher.subject || 'math'}}</view>
        </view>
        <view class="intro-section">
          <view class="intro-item" v-if="teacher.education">
            <text class="intro-label">教育背景：</text>
            <text class="intro-content">{{teacher.education}}</text>
          </view>
          <view class="intro-item" v-if="teacher.experience && teacher.experience.length > 0">
            <text class="intro-label">教学经历：</text>
          </view>
          <view class="teacher-desc-list" v-if="teacher.experience && teacher.experience.length > 0">
            <view class="desc-item" v-for="(item, index) in teacher.experience" :key="index">
              <text class="bullet">•</text> {{item}}
            </view>
          </view>
        </view>
      </view>
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
  computed: {
    descList() {
      if (!this.teacher.desc) return [];
      if (Array.isArray(this.teacher.desc)) {
        return this.teacher.desc;
      }
      // 假设描述是用换行符分隔的条目
      return this.teacher.desc.split('\n').filter(item => item.trim());
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
  padding: 30rpx;
  margin-bottom: 180rpx;
  background-color: #fff;
  margin-top: -140rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .teacher-avatar {
    width: 230rpx;
    height: 350rpx;
    margin-right: 24rpx;
    
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
      object-fit: cover;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }
  }
  
  .teacher-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .teacher-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .name-subject {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
    }
    
    .teacher-name {
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
    }
    
    .subject-tag {
      display: inline-block;
      font-size: 24rpx;
      color: #EC7A49;
      background-color: rgba(236, 122, 73, 0.1);
      padding: 4rpx 14rpx;
      border-radius: 4rpx;
    }
    
    .intro-section {
      padding-top: 10rpx;
      border-top: 1px dashed #eee;
    }
    
    .intro-item {
      margin-bottom: 10rpx;
    }
    
    .intro-label {
      font-size: 23rpx;
      color: #333;
      font-weight: 500;
    }
    
    .intro-content {
      font-size: 22rpx;
      color: #666;
    }
    
    .teacher-desc-list {
      padding-left: 10rpx;
      
      .desc-item {
        font-size: 22rpx;
        color: #666;
        margin-bottom: 8rpx;
        display: flex;
        line-height: 32rpx;
        
        .bullet {
          color: #EC7A49;
          margin-right: 8rpx;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style> 