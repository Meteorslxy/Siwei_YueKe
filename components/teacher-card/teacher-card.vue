<template>
  <view class="teacher-card" @click="goToDetail">
    <view class="teacher-avatar">
      <image class="avatar" :src="getImageUrl(teacher.avatarId || teacher.avatar)" mode="aspectFill"></image>
    </view>
    <view class="teacher-info">
      <view class="teacher-content">
        <view class="name-subject">
          <view class="teacher-name">{{teacher.name || '叶老师'}}</view>
          <view class="subject-tag" v-if="teacher.grade && teacher.subject">{{teacher.grade + teacher.subject}}</view>
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
    },
    getImageUrl(imageId) {
      console.log('获取图片URL, 图片ID:', imageId);
      
      // 如果未提供ID，返回默认头像
      if (!imageId) {
        console.log('图片ID为空，使用默认头像');
        return this.defaultAvatar;
      }
      
      // 如果是路径格式，直接返回
      if (imageId.startsWith('/') || imageId.startsWith('http')) {
        console.log('使用路径格式图片:', imageId);
        return imageId;
      }
      
      // 尝试从缓存获取
      if (this.imageCache[imageId]) {
        console.log('从缓存获取图片:', imageId);
        return this.imageCache[imageId];
      }
      
      // 如果有ID但没缓存，尝试加载
      this.preloadImage(imageId);
      
      // 返回默认头像
      console.log('暂未加载到图片，使用默认头像');
      return this.defaultAvatar;
    },
    preloadImage(imageId) {
      console.log('预加载图片开始:', imageId);
      
      // 如果已经是URL格式，直接缓存
      if (imageId.startsWith('/') || imageId.startsWith('http')) {
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
          } else if (res && res.imageData && res.imageData.url) {
            // 处理包含imageData.url的情况
            this.imageCache[imageId] = res.imageData.url;
            console.log('从imageData获取到图片URL:', res.imageData.url);
          } else if (res && res.imageData && res.imageData.base64Data) {
            // 处理base64数据的情况
            const base64Url = 'data:image/jpeg;base64,' + res.imageData.base64Data;
            this.imageCache[imageId] = base64Url;
            console.log('从imageData.base64Data生成图片URL');
          } else if (res && typeof res === 'string' && res.startsWith('data:image')) {
            // 直接返回的base64数据
            this.imageCache[imageId] = res;
            console.log('接收到直接的base64图片数据');
          } else {
            console.error('获取图片URL失败,返回数据结构不正确:', res);
            // 设置默认图片到缓存，避免重复请求
            this.imageCache[imageId] = this.defaultAvatar;
          }
          
          // 强制视图更新
          this.$forceUpdate();
        })
        .catch(err => {
          console.error('获取图片失败:', err);
          // 设置默认图片到缓存，避免重复请求失败的图片
          this.imageCache[imageId] = this.defaultAvatar;
          this.$forceUpdate();
        });
    },
    formatSubject(subject) {
      // 直接返回学科名（已是中文）
      return subject;
    },
    formatGrade(grade) {
      // 直接返回年级名（已是中文）
      return grade;
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