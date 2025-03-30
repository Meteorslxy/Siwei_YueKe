<template>
  <view class="phone-container">
    <view class="header">
      <text class="title">绑定手机号</text>
    </view>
    
    <view class="phone-form">
      <view class="form-item">
        <text class="item-label">手机号</text>
        <input class="input" type="number" maxlength="11" placeholder="请输入手机号" v-model="phoneNumber" />
      </view>
      
      <view class="form-item">
        <text class="item-label">验证码</text>
        <input class="input" type="number" maxlength="6" placeholder="请输入验证码" v-model="verifyCode" />
        <button class="verify-btn" :disabled="countDown > 0" @click="sendVerifyCode">
          {{ countDown > 0 ? `${countDown}秒后重新获取` : '获取验证码' }}
        </button>
      </view>
    </view>
    
    <button class="submit-btn" :disabled="!isFormValid" @click="bindPhone">绑定</button>
    
    <view class="tips">
      <text class="tips-text">绑定手机号后，您可以使用手机号登录，也可以在忘记密码时通过手机号找回</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      verifyCode: '',
      countDown: 0,
      timer: null
    }
  },
  computed: {
    isFormValid() {
      return this.phoneNumber.length === 11 && this.verifyCode.length === 6;
    }
  },
  onLoad() {
    // 检查是否已经绑定手机号
    this.checkPhoneBind();
  },
  onUnload() {
    // 页面卸载时清除定时器
    this.clearTimer();
  },
  methods: {
    // 检查是否已绑定手机号
    checkPhoneBind() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo.phoneNumber) {
            // 已绑定手机号，显示当前绑定状态
            this.phoneNumber = userInfo.phoneNumber;
            uni.showModal({
              title: '提示',
              content: `您已绑定手机号：${this.formatPhoneNumber(this.phoneNumber)}，是否需要更换？`,
              success: (res) => {
                if (!res.confirm) {
                  // 用户取消更换，返回上一页
                  uni.navigateBack();
                } else {
                  // 清空已填写的手机号，让用户重新输入
                  this.phoneNumber = '';
                }
              }
            });
          }
        }
      } catch (e) {
        console.error('检查手机绑定状态失败:', e);
      }
    },
    
    // 格式化手机号（中间4位显示为星号）
    formatPhoneNumber(phone) {
      if (phone && phone.length === 11) {
        return phone.substr(0, 3) + '****' + phone.substr(7);
      }
      return phone;
    },
    
    // 发送验证码
    sendVerifyCode() {
      if (this.phoneNumber.length !== 11) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
      
      // 开始倒计时
      this.countDown = 60;
      this.startCountDown();
      
      // 模拟发送验证码
      uni.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
    },
    
    // 开始倒计时
    startCountDown() {
      this.clearTimer();
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          this.clearTimer();
        }
      }, 1000);
    },
    
    // 清除定时器
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    
    // 绑定手机号
    bindPhone() {
      if (!this.isFormValid) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
      
      // 模拟验证过程
      uni.showLoading({
        title: '验证中'
      });
      
      setTimeout(() => {
        uni.hideLoading();
        
        // 保存手机号到用户信息
        try {
          const userInfoStr = uni.getStorageSync('userInfo');
          let userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
          userInfo.phoneNumber = this.phoneNumber;
          uni.setStorageSync('userInfo', JSON.stringify(userInfo));
          
          uni.showToast({
            title: '绑定成功',
            icon: 'success'
          });
          
          // 返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } catch (e) {
          console.error('保存用户信息失败:', e);
          uni.showToast({
            title: '绑定失败',
            icon: 'none'
          });
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
.phone-container {
  min-height: 100vh;
  background-color: $bg-color;
  padding: 0 30rpx;
}

.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  margin: 0 -30rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
  }
}

.phone-form {
  margin-top: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 0 20rpx;
  
  .form-item {
    display: flex;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid $border-color;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-label {
      font-size: 30rpx;
      color: $text-color;
      width: 120rpx;
    }
    
    .input {
      flex: 1;
      height: 60rpx;
      font-size: 28rpx;
    }
    
    .verify-btn {
      width: 200rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 24rpx;
      color: #fff;
      background-color: $theme-color;
      border-radius: 30rpx;
      padding: 0;
      margin: 0;
      
      &[disabled] {
        background-color: #ccc;
      }
    }
  }
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: $theme-color;
  border-radius: 44rpx;
  margin-top: 50rpx;
  
  &[disabled] {
    background-color: #ccc;
  }
}

.tips {
  margin-top: 30rpx;
  padding: 0 20rpx;
  
  .tips-text {
    font-size: 26rpx;
    color: $text-color-light;
    line-height: 1.6;
  }
}
</style> 