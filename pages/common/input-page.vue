<template>
  <view class="input-container">
    <view class="header">
      <text class="title">{{title}}</text>
    </view>
    
    <view class="input-area">
      <input 
        class="input" 
        :type="inputType" 
        :maxlength="maxlength" 
        :placeholder="placeholder" 
        v-model="inputValue" 
        @input="onInput"
        @confirm="onConfirm"
        focus
        confirm-type="done"
      />
      <button class="confirm-btn" @click="onConfirm" :disabled="!inputValue">确认</button>
    </view>
    
    <view class="tip-area" v-if="tip">
      <text class="tip-text">{{tip}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '输入',
      placeholder: '请输入',
      inputType: 'text',
      maxlength: 50,
      inputValue: '',
      tip: ''
    }
  },
  onLoad(options) {
    // 解析页面参数
    this.title = options.title || '输入';
    this.placeholder = options.placeholder || '请输入';
    this.inputType = options.type || 'text';
    this.maxlength = parseInt(options.maxlength || '50');
    this.tip = options.tip || '';
    
    // 初始值
    if (options.value) {
      this.inputValue = decodeURIComponent(options.value);
    }
  },
  methods: {
    onInput(e) {
      this.inputValue = e.detail.value;
    },
    onConfirm() {
      if (!this.inputValue) {
        uni.showToast({
          title: '请输入内容',
          icon: 'none'
        });
        return;
      }
      
      // 根据不同类型做验证
      if (this.inputType === 'number' && this.maxlength === 11) {
        // 手机号验证
        if (!/^1\d{10}$/.test(this.inputValue)) {
          uni.showToast({
            title: '请输入正确的手机号码',
            icon: 'none'
          });
          return;
        }
      }
      
      // 将输入结果返回到上一页
      const eventChannel = this.getOpenerEventChannel();
      if (eventChannel && eventChannel.emit) {
        eventChannel.emit('inputDone', this.inputValue);
      }
      
      // 返回上一页
      uni.navigateBack();
    },
    getOpenerEventChannel() {
      // 兼容不同平台获取事件通道的方法
      let eventChannel;
      try {
        // #ifdef MP-WEIXIN
        eventChannel = this.getOpenerEventChannel();
        // #endif
        
        // #ifndef MP-WEIXIN
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        if (currPage.$page && currPage.$page.fullPath) {
          const prevPage = pages[pages.length - 2];
          if (prevPage && prevPage.$vm) {
            eventChannel = {
              emit: (eventName, data) => {
                prevPage.$vm.$emit(eventName, data);
              }
            };
          }
        }
        // #endif
      } catch (e) {
        console.error('获取事件通道失败:', e);
      }
      return eventChannel;
    }
  }
}
</script>

<style lang="scss">
.input-container {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
}

.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
  }
}

.input-area {
  margin: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  
  .input {
    width: 100%;
    height: 80rpx;
    font-size: 32rpx;
    padding: 0 20rpx;
    border-bottom: 1rpx solid $border-color;
    margin-bottom: 30rpx;
  }
  
  .confirm-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    color: #fff;
    background-color: $theme-color;
    border-radius: 44rpx;
    
    &[disabled] {
      background-color: #ccc;
    }
  }
}

.tip-area {
  margin: 0 30rpx;
  
  .tip-text {
    font-size: 28rpx;
    color: $text-color-light;
    line-height: 1.6;
  }
}
</style> 