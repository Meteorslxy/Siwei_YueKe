<template>
  <view class="wechat-container">
    <view class="header">
      <text class="title">微信账号</text>
    </view>
    
    <view class="content">
      <view class="wechat-info">
        <image class="wechat-avatar" src="/static/images/default-avatar.png" mode="aspectFill"></image>
        <view class="wechat-detail">
          <text class="wechat-name">微信用户</text>
          <text class="wechat-status">已绑定</text>
        </view>
      </view>
      
      <view class="tip-box">
        <text class="tip-text">您已成功绑定微信账号，可以使用微信快捷登录</text>
      </view>
      
      <button class="unbind-btn" @click="showUnbindConfirm">解除绑定</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    // 显示解绑确认弹窗
    showUnbindConfirm() {
      uni.showModal({
        title: '解除绑定',
        content: '解除绑定后，将无法使用微信快捷登录，确定要解除吗？',
        confirmText: '确定解除',
        confirmColor: '#EC7A49',
        success: (res) => {
          if (res.confirm) {
            this.unbindWechat();
          }
        }
      });
    },
    
    // 解除微信绑定
    unbindWechat() {
      uni.showLoading({
        title: '解绑中'
      });
      
      setTimeout(() => {
        uni.hideLoading();
        
        uni.showModal({
          title: '提示',
          content: '当前应用必须绑定微信账号才能使用，暂不支持解除绑定',
          showCancel: false,
          success: () => {
            // 返回上一页
            // uni.navigateBack();
          }
        });
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
.wechat-container {
  min-height: 100vh;
  background-color: $bg-color;
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

.content {
  padding: 30rpx;
}

.wechat-info {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 40rpx 30rpx;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  
  .wechat-avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin-right: 30rpx;
  }
  
  .wechat-detail {
    flex: 1;
    
    .wechat-name {
      font-size: 32rpx;
      font-weight: bold;
      color: $text-color;
      margin-bottom: 10rpx;
      display: block;
    }
    
    .wechat-status {
      font-size: 28rpx;
      color: $theme-color;
      display: block;
    }
  }
}

.tip-box {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
  margin-bottom: 50rpx;
  
  .tip-text {
    font-size: 28rpx;
    color: $text-color-light;
    line-height: 1.6;
  }
}

.unbind-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: #f56c6c;
  border-radius: 44rpx;
}
</style> 