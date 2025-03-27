<template>
  <view class="load-more" @click.stop="onClick">
    <view class="loading" v-if="status === 'loading'">
      <view class="loading-icon"></view>
      <text class="loading-text">加载中...</text>
    </view>
    <text class="text" v-else-if="status === 'noMore'">没有更多了</text>
    <text class="text" v-else>点击加载更多</text>
  </view>
</template>

<script>
export default {
  name: 'load-more',
  props: {
    status: {
      type: String,
      default: 'more' // more-加载更多 loading-加载中 noMore-没有更多了
    }
  },
  methods: {
    onClick(event) {
      // 防止事件冒泡
      if (event) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        // 小程序环境特殊处理
        if (event.mp) {
          event.mp.stopPropagation();
        }
      }
      
      // 只有非loading状态下触发点击事件
      if (this.status !== 'loading') {
        console.log('load-more 组件点击');
        this.$emit('click');
      }
    }
  }
}
</script>

<style>
.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  margin: 20rpx 0;
}

.loading {
  display: flex;
  align-items: center;
}

.loading-icon {
  width: 32rpx;
  height: 32rpx;
  border: 4rpx solid #f2f2f2;
  border-top: 4rpx solid #FF6B00;
  border-radius: 50%;
  margin-right: 16rpx;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text, .text {
  font-size: 28rpx;
  color: #999;
}
</style> 