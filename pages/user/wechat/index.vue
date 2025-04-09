<template>
  <view class="wechat-container">
    <view class="header">
      <text class="title">微信账号</text>
    </view>
    
    <view class="content">
      <view class="wechat-info">
        <image class="wechat-avatar" :src="wechatInfo.avatarUrl || '/static/images/default-avatar.png'" mode="aspectFill"></image>
        <view class="wechat-detail">
          <text class="wechat-name">{{wechatInfo.nickName || '微信用户'}}</text>
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
      wechatInfo: {
        nickName: '',
        avatarUrl: ''
      }
    }
  },
  onLoad() {
    // 加载用户微信信息
    this.loadWechatInfo();
  },
  methods: {
    // 加载微信信息
    loadWechatInfo() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          // 解析用户信息
          let userInfo;
          if (typeof userInfoStr === 'string') {
            userInfo = JSON.parse(userInfoStr);
          } else {
            userInfo = userInfoStr;
          }
          
          // 获取微信相关信息
          if (userInfo.nickname) {
            this.wechatInfo.nickName = userInfo.nickname;
          }
          
          if (userInfo.avatar) {
            this.wechatInfo.avatarUrl = userInfo.avatar;
          }
        }
      } catch (error) {
        console.error('加载微信信息失败:', error);
      }
    },
    
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
    async unbindWechat() {
      uni.showLoading({
        title: '解绑中'
      });
      
      try {
        // 调用云函数解绑微信
        const result = await uniCloud.callFunction({
          name: 'uni-id-co',
          data: {
            action: 'unbindWeixin'
          }
        });
        
        uni.hideLoading();
        
        if (result.result && result.result.code === 0) {
          // 解绑成功
          uni.showToast({
            title: '解绑成功',
            icon: 'success'
          });
          
          // 更新缓存中的用户信息
          this.updateUserInfoAfterUnbind();
          
          // 触发微信绑定状态变更事件
          uni.$emit('wechat:binding:changed', { isBound: false });
          
          // 延迟返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          // 解绑失败
          uni.showModal({
            title: '解绑失败',
            content: result.result?.message || '微信账号解绑失败，请稍后再试',
            showCancel: false
          });
        }
      } catch (error) {
        uni.hideLoading();
        console.error('解绑微信失败:', error);
        
        uni.showModal({
          title: '提示',
          content: '当前应用必须绑定微信账号才能使用，暂不支持解除绑定',
          showCancel: false
        });
      }
    },
    
    // 更新解绑后的用户信息
    async updateUserInfoAfterUnbind() {
      try {
        // 从缓存获取用户信息
        const userInfoStr = uni.getStorageSync('userInfo');
        if (!userInfoStr) return;
        
        // 解析用户信息
        let userInfo;
        if (typeof userInfoStr === 'string') {
          userInfo = JSON.parse(userInfoStr);
        } else {
          userInfo = userInfoStr;
        }
        
        // 清除微信相关信息
        if (userInfo.wx_openid) {
          userInfo.wx_openid = {};
        }
        
        if (userInfo.wx_unionid) {
          userInfo.wx_unionid = '';
        }
        
        // 更新缓存
        uni.setStorageSync('userInfo', userInfo);
        
        // 刷新用户信息
        const userId = userInfo._id || userInfo.uid;
        if (userId) {
          // 获取最新用户信息
          const result = await uniCloud.callFunction({
            name: 'getUserInfoById',
            data: {
              userId,
              uniIdToken: uni.getStorageSync('uni_id_token')
            }
          });
          
          if (result.result && result.result.code === 0 && result.result.userInfo) {
            // 更新到缓存
            uni.setStorageSync('userInfo', result.result.userInfo);
          }
        }
      } catch (error) {
        console.error('更新解绑后用户信息失败:', error);
      }
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