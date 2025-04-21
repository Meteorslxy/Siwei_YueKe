<template>
  <view class="phone-container">
    <view class="header">
      <text class="title">绑定手机号</text>
    </view>
    
    <view class="form-container">
      <!-- 使用uni-id-pages官方的短信表单组件 -->
      <uni-forms>
        <uni-forms-item>
          <uni-easyinput 
            v-model="formData.mobile" 
            placeholder="请输入手机号码" 
            type="number"
            maxlength="11"
            @input="onMobileChange"
          />
          <!-- 添加手机号错误提示 -->
          <view class="error-tip" v-if="mobileError">
            <text class="error-text">{{mobileErrorText}}</text>
          </view>
        </uni-forms-item>
        
        <!-- 添加图形验证码输入 -->
        <uni-forms-item>
          <uni-captcha ref="captcha" scene="bind-mobile-by-sms" v-model="formData.captcha" />
        </uni-forms-item>
        
        <uni-forms-item>
          <view class="code-box">
            <uni-easyinput 
              v-model="formData.code" 
              placeholder="请输入验证码" 
              type="number"
              maxlength="6"
            />
            <!-- 添加手动发送验证码按钮 -->
            <button class="send-code-btn" :disabled="isSending" @click="sendSmsCode">
              {{ sendCodeText }}
            </button>
          </view>
        </uni-forms-item>
      </uni-forms>
    </view>
    
    <button class="submit-btn" type="primary" @click="bindPhone">绑定手机号</button>
    
    <view class="tips">
      <text class="tips-text">绑定手机号后，您可以使用手机号登录，也可以在忘记密码时通过手机号找回</text>
    </view>
    
    <!-- 图形验证码弹窗 -->
    <uni-popup-captcha
      ref="captcha"
      scene="bind-mobile-by-sms"
      v-model="formData.captcha"
      @confirm="bindPhone"
    />
  </view>
</template>

<script>
import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js'
import { updatePhoneNumber } from '@/api/modules/user.js';

export default {
  data() {
    return {
      formData: {
        mobile: '',
        code: '',
        captcha: ''
      },
      countdown: 0,
      isSending: false,
      sendCodeText: '获取验证码',
      mobileError: false,
      mobileErrorText: '',
      rules: {
        // ... existing code ...
      },
      fieldErrorMsg: {
        // ... existing code ...
      }
    }
  },
  computed: {
    isFormValid() {
      return this.formData.mobile.length === 11 && this.formData.code.length === 6;
    }
  },
  onLoad() {
    // 检查是否已经绑定手机号
    this.checkPhoneBind();
  },
  methods: {
    // 监听手机号输入变化
    onMobileChange(value) {
      // 清除可能的错误提示
      this.mobileError = false;
      this.mobileErrorText = '';
      
      // 当输入满11位时，自动检查是否已存在
      if (value && value.length === 11) {
        // 检查是否是已知重复手机号
        const knownDuplicates = uni.getStorageSync('duplicate_mobiles') || [];
        if (knownDuplicates.includes(value)) {
          // 如果是已知重复的手机号，直接提示用户
          this.showMobileError('该手机号已被其他账号绑定');
          return;
        }
        
        // 如果不是已知重复，且输入完成，静默验证
        this.quietlyCheckMobileExists(value);
      }
    },
    
    // 显示手机号错误提示
    showMobileError(message) {
      this.mobileError = true;
      this.mobileErrorText = message;
      uni.showToast({
        title: message,
        icon: 'none'
      });
    },
    
    // 静默检查手机号是否已被其他账号使用（不显示loading）
    quietlyCheckMobileExists(mobile) {
      // 不显示loading，静默验证
      uniCloud.callFunction({
        name: 'checkMobileExists',
        data: { 
          mobile,
          userId: store.userInfo?._id || ''
        }
      }).then(res => {
        if (res.result && res.result.code === 10001) {
          // 手机号已被其他账号使用
          // 缓存这个重复的手机号
          const duplicates = uni.getStorageSync('duplicate_mobiles') || [];
          if (!duplicates.includes(mobile)) {
            duplicates.push(mobile);
            uni.setStorageSync('duplicate_mobiles', duplicates);
          }
          
          // 显示友好提示
          this.showMobileError('该手机号已被其他账号绑定');
          
          // 清空输入，便于重新输入
          setTimeout(() => {
            this.formData.mobile = '';
          }, 1000);
        }
      }).catch(err => {
        console.error('静默检查手机号错误:', err);
        // 出错时不做特殊处理，等用户提交时再验证
      });
    },
    
    // 检查是否已绑定手机号
    checkPhoneBind() {
      try {
        if (store.userInfo && store.userInfo.mobile) {
          // 已绑定手机号，显示当前绑定状态
          this.formData.mobile = store.userInfo.mobile;
          uni.showModal({
            title: '提示',
            content: `您已绑定手机号：${this.formatPhoneNumber(this.formData.mobile)}，是否需要更换？`,
            success: (res) => {
              if (!res.confirm) {
                // 用户取消更换，返回上一页
                uni.navigateBack();
              } else {
                // 清空已填写的手机号，让用户重新输入
                this.formData.mobile = '';
              }
            }
          });
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
    
    // 绑定手机号
    bindPhone() {
      if (!this.formData.mobile) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return;
      }
      
      if (!this.formData.captcha) {
        uni.showToast({
          title: '请输入图形验证码',
          icon: 'none'
        });
        this.$refs.captcha.getImageCaptcha();
        return;
      }
      
      if (!this.formData.code) {
        uni.showToast({
          title: '请输入短信验证码',
          icon: 'none'
        });
        return;
      }
      
      // 先检查手机号是否已被其他用户绑定
      this.checkMobileExists(this.formData.mobile);
    },
    
    // 检查手机号是否已被其他账号使用
    checkMobileExists(mobile) {
      // 在验证前先检查本地缓存中已知的手机号冲突记录
      const knownDuplicates = uni.getStorageSync('duplicate_mobiles') || [];
      if (knownDuplicates.includes(mobile)) {
        // 如果是已知重复的手机号，直接提示用户，不显示loading
        this.showMobileError('该手机号已被其他账号绑定');
        return;
      }
      
      // 显示加载提示
      uni.showLoading({
        title: '正在验证...',
        mask: true
      });
      
      // 使用云函数查询该手机号是否已存在
      uniCloud.callFunction({
        name: 'checkMobileExists',
        data: { 
          mobile,
          // 传入当前用户ID，排除自己的账号
          userId: store.userInfo?._id || ''
        }
      }).then(res => {
        uni.hideLoading();
        
        if (res.result && res.result.code === 0) {
          // code为0表示不存在冲突
          this.proceedWithBinding();
        } else if (res.result && res.result.code === 10001) {
          // 手机号已被其他账号使用
          // 缓存这个重复的手机号，下次直接提示，不显示loading
          const duplicates = uni.getStorageSync('duplicate_mobiles') || [];
          if (!duplicates.includes(mobile)) {
            duplicates.push(mobile);
            uni.setStorageSync('duplicate_mobiles', duplicates);
          }
          
          // 显示错误提示
          this.showMobileError('该手机号已被其他账号绑定');
          
          // 让输入框获取焦点，便于用户直接修改
          setTimeout(() => {
            this.formData.mobile = '';
            this.focusOnMobileInput();
          }, 300);
        } else {
          // 其他错误
          console.error('检查手机号失败:', res);
          
          // 如果是开发模式，直接继续流程
          if (this.isDevMode) {
            console.log('开发模式：忽略手机号检查失败，继续绑定流程');
            this.proceedWithBinding();
          } else {
            uni.showToast({
              title: '验证失败，请稍后重试',
              icon: 'none'
            });
          }
        }
      }).catch(err => {
        uni.hideLoading();
        console.error('检查手机号错误:', err);
        
        // 如果是开发模式，直接继续流程
        if (this.isDevMode) {
          console.log('开发模式：忽略手机号检查错误，继续绑定流程');
          this.proceedWithBinding();
        } else {
          uni.showToast({
            title: '网络错误，请稍后重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 让手机号输入框获取焦点
    focusOnMobileInput() {
      // 使用uni.createSelectorQuery获取输入框并设置焦点
      const query = uni.createSelectorQuery().in(this);
      query.select('.uni-easyinput__content-input').boundingClientRect(data => {
        if (data) {
          // 清空已有手机号，便于重新输入
          this.formData.mobile = '';
          
          // 使用setTimeout确保DOM更新后再尝试获取焦点
          setTimeout(() => {
            // #ifdef H5
            const input = document.querySelector('.uni-easyinput__content-input');
            if (input) {
              input.focus();
            }
            // #endif
            
            // #ifndef H5
            // 小程序环境中使用focus方法获取焦点
            uni.nextTick(() => {
              const mobileInput = uni.createSelectorQuery().in(this).select('.uni-easyinput__content-input');
              mobileInput.fields({
                properties: ['value']
              }, () => {
                // 使其获得焦点
                // 这种方式不一定在所有环境都有效，但可以尝试
              }).exec();
            });
            // #endif
          }, 300);
        }
      }).exec();
    },
    
    // 继续执行绑定流程
    proceedWithBinding() {
      // 显示加载提示
      uni.showLoading({
        title: '正在绑定...',
        mask: true
      });
      
      // 正常模式下使用云对象绑定
      const uniIdCo = uniCloud.importObject("uni-id-co");
      uniIdCo.bindMobileBySms({
        mobile: this.formData.mobile,
        code: this.formData.code,
        captcha: this.formData.captcha,
        mobile_confirmed: 1 // 确保设置mobile_confirmed字段
      }).then(res => {
        uni.hideLoading();
        
        // 更新用户信息
        mutations.updateUserInfo();
        
        // 调用API来确保手机号和mobile_confirmed字段被更新到数据库
        this.updateUserInDatabase(this.formData.mobile);
        
        uni.showToast({
          title: '绑定成功',
          icon: 'success'
        });
        
        // 返回上一页
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      }).catch(err => {
        uni.hideLoading();
        console.error('绑定手机号失败:', err);
        
        // 检查验证码错误
        if (err.errCode === 'uni-id-captcha-required') {
          this.$refs.captcha.open();
        } else {
          uni.showToast({
            title: err.errMsg || '绑定失败，请稍后重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 更新数据库中的用户信息，确保mobile_confirmed字段被设为1
    updateUserInDatabase(phoneNumber) {
      // 使用直接请求确保更新mobile_confirmed字段
      updatePhoneNumber({ 
        phoneNumber: phoneNumber,
        mobile_confirmed: 1 // 确保设置mobile_confirmed字段
      })
      .then(result => {
        console.log('手机号更新到数据库成功:', result);
        
        // 如果更新成功，再次请求云函数直接更新mobile_confirmed字段
        this.updateMobileConfirmedField(phoneNumber);
      })
      .catch(updateErr => {
        console.error('手机号更新到数据库失败:', updateErr);
        
        // 即使失败，仍然尝试直接更新mobile_confirmed字段
        this.updateMobileConfirmedField(phoneNumber);
      });
    },
    
    // 直接更新mobile_confirmed字段
    updateMobileConfirmedField(phoneNumber) {
      console.log('直接更新mobile_confirmed字段');
      
      // 调用云函数直接更新mobile_confirmed字段
      uniCloud.callFunction({
        name: 'updateUserInfo',
        data: {
          mobile: phoneNumber,
          mobile_confirmed: 1,
          // 提供明确的update对象
          update: {
            mobile: phoneNumber,
            mobile_confirmed: 1
          }
        }
      }).then(res => {
        console.log('mobile_confirmed字段更新成功:', res);
      }).catch(err => {
        console.error('mobile_confirmed字段更新失败:', err);
      });
    },
    
    // 发送短信验证码
    sendSmsCode() {
      if (!this.formData.mobile) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return;
      }
      
      if (!/^1\d{10}$/.test(this.formData.mobile)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
      
      if (!this.formData.captcha) {
        uni.showToast({
          title: '请先完成图形验证码',
          icon: 'none'
        });
        this.$refs.captcha.open();
        return;
      }
      
      this.isSending = true;
      uni.showLoading({
        title: '发送中...'
      });
      
      const uniIdCo = uniCloud.importObject("uni-id-co");
      uniIdCo.sendSmsCode({
        mobile: this.formData.mobile,
        scene: "bind-mobile-by-sms",
        captcha: this.formData.captcha
      }).then(() => {
        uni.hideLoading();
        uni.showToast({
          title: '验证码已发送',
          icon: 'none'
        });
        this.startCountdown();
      }).catch(err => {
        uni.hideLoading();
        console.error('发送验证码失败:', err);
        
        if (this.isDevMode || err.code === 'uni-id-invalid-sms-template-id') {
          // 开发模式或模板ID错误时，使用测试验证码
          this.formData.code = '123456';
          uni.showToast({
            title: '测试模式：验证码为123456',
            icon: 'none'
          });
          this.startCountdown();
        } else {
          this.isSending = false;
          // 显示错误信息
          uni.showToast({
            title: err.message || '发送失败，请稍后重试',
            icon: 'none'
          });
          
          // 如果是验证码错误，重新打开验证码弹窗
          if (err.errCode === 'uni-id-captcha-required' || err.errCode === 'uni-id-invalid-captcha') {
            setTimeout(() => {
              this.$refs.captcha.open();
            }, 1500);
          }
        }
      });
    },
    
    // 开始倒计时
    startCountdown() {
      this.countdown = 60;
      this.sendCodeText = `重新发送(${this.countdown}s)`;
      this.isSending = true;
      
      if (this.timer) clearInterval(this.timer);
      
      this.timer = setInterval(() => {
        this.countdown--;
        this.sendCodeText = `重新发送(${this.countdown}s)`;
        
        if (this.countdown <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.isSending = false;
          this.sendCodeText = "获取验证码";
        }
      }, 1000);
    }
  },
  
  // 添加组件销毁时的清理
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
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

.form-container {
  margin-top: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
}

.code-box {
  display: flex;
  align-items: center;
  position: relative;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  margin-top: 60rpx;
  background-color: $theme-color;
  color: #fff;
  font-size: 32rpx;
  border-radius: 44rpx;
}

.tips {
  margin-top: 30rpx;
  padding: 0 20rpx;
  
  .tips-text {
    font-size: 24rpx;
    color: $text-color-light;
    line-height: 1.5;
  }
}

.test-mode-indicator {
  margin-top: 20rpx;
  padding: 10rpx 20rpx;
  background-color: #ffd700;
  color: #333;
  font-size: 24rpx;
  border-radius: 8rpx;
  text-align: center;
}

.send-code-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 200rpx;
  height: 84rpx;
  line-height: 84rpx;
  font-size: 24rpx;
  padding: 0;
  background-color: #FF6B00;
  color: #FFFFFF;
  border-radius: 6rpx;
  z-index: 10;
}

.send-code-btn[disabled] {
  background-color: #cccccc;
  color: #ffffff;
}

.error-tip {
  margin-top: 8rpx;
  
  .error-text {
    font-size: 24rpx;
    color: #f56c6c;
  }
}
</style> 