<template>
  <view class="empty-container">
    <image :src="emptySrc" class="empty-image" mode="aspectFit" @error="handleImageError"></image>
    <text class="empty-text">{{tip}}</text>
  </view>
</template>

<script>
export default {
  name: 'empty-tip',
  props: {
    tip: {
      type: String,
      default: '暂无数据'
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultEmptyImageSrc: '/static/images/empty-data.png',
      emptySrc: '',
      usingFallback: false
    }
  },
  created() {
    this.emptySrc = this.imgSrc || this.defaultEmptyImageSrc;
  },
  methods: {
    handleImageError(e) {
      console.log('空数据图片加载失败，使用备用图片');
      if (!this.usingFallback) {
        this.usingFallback = true;
        this.emptySrc = 'data:image/png;base64,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';
      }
    }
  }
}
</script>

<style scoped>
.empty-container {
  width: 100%;
  padding: 40rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style> 