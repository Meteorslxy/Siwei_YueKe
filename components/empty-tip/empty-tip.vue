<template>
  <view class="empty-container" v-if="show">
    <image class="empty-image" 
           :src="emptyImageUrl" 
           mode="aspectFit"
           @error="handleImageError"></image>
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
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      emptyImageUrl: '/static/images/empty.png'
    }
  },
  methods: {
    handleImageError() {
      console.log('空数据图片加载失败，使用CDN图片');
      // 使用CDN上的默认图片
      this.emptyImageUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/empty.png';
    }
  }
}
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
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