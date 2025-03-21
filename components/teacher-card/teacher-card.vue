<template>
  <view class="teacher-card" @click="goToDetail">
    <view class="teacher-avatar">
      <image class="avatar" :src="getImageUrl(teacher.avatarId || teacher.avatar)" mode="aspectFill"></image>
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
      defaultAvatar: '/static/images/default-avatar.png',
      imageCache: {}
    }
  },
  created() {
    // 预加载教师头像
    console.log('teacher-card组件创建，教师数据:', this.teacher);
    console.log('头像ID:', this.teacher.avatarId);
    
    if (this.teacher.avatarId) {
      console.log('预加载头像ID:', this.teacher.avatarId);
      this.preloadImage(this.teacher.avatarId);
    } else if (this.teacher.avatar) {
      console.log('预加载头像(avatar):', this.teacher.avatar);
      this.preloadImage(this.teacher.avatar);
    } else {
      console.log('教师没有头像数据');
    }
  },
  methods: {
    goToDetail() {
      this.$emit('click', this.teacher);
      uni.navigateTo({
        url: `/pages/teacher/detail?id=${this.teacher._id}`
      });
    },
    getImageUrl(imageId) {
      console.log('获取图片URL, 图片ID:', imageId);
      
      // 如果是路径格式，直接返回
      if (imageId && (imageId.startsWith('/') || imageId.startsWith('http'))) {
        console.log('使用路径格式图片:', imageId);
        return imageId;
      }
      
      // 尝试从缓存获取
      if (imageId && this.imageCache[imageId]) {
        console.log('从缓存获取图片:', imageId);
        return this.imageCache[imageId];
      }
      
      // 如果有ID但没缓存，尝试加载
      if (imageId) {
        console.log('尝试加载图片:', imageId);
        this.preloadImage(imageId);
      }
      
      // 返回默认头像
      console.log('使用默认头像');
      return this.defaultAvatar;
    },
    preloadImage(imageId) {
      console.log('预加载图片开始:', imageId);
      
      // 如果已经是URL格式，直接缓存
      if (imageId && (imageId.startsWith('/') || imageId.startsWith('http'))) {
        this.imageCache[imageId] = imageId;
        console.log('已缓存URL格式图片:', imageId);
        return;
      }
      
      // 调用API获取图片URL
      this.$api.file.getImage(imageId)
        .then(res => {
          console.log('预加载图片完整结果:', JSON.stringify(res));
          
          // 处理不同格式的返回数据
          if (res && res.data && res.data.url) {
            // 处理包含data.url的情况
            this.imageCache[imageId] = res.data.url;
            console.log('已缓存图片URL:', res.data.url);
            // 强制视图更新
            this.$forceUpdate();
          } else if (res && res.imageData && res.imageData.url) {
            // 处理包含imageData.url的情况
            this.imageCache[imageId] = res.imageData.url;
            console.log('从imageData获取到图片URL:', res.imageData.url);
            // 强制视图更新
            this.$forceUpdate();
          } else if (res && res.imageData && res.imageData.base64Data) {
            // 处理base64数据的情况
            const base64Url = 'data:image/jpeg;base64,' + res.imageData.base64Data;
            this.imageCache[imageId] = base64Url;
            console.log('从imageData.base64Data生成图片URL');
            // 强制视图更新
            this.$forceUpdate();
          } else {
            console.error('获取图片URL失败,返回数据结构不正确:', res);
          }
        })
        .catch(err => {
          console.error('获取图片失败:', err);
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