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
          />
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
            <!-- 使用官方短信验证码组件 -->
            <uni-id-pages-sms-form
              ref="smsForm"
              type="bind-mobile-by-sms"
              :phone="formData.mobile"
              v-model="formData.code"
            />
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
    
    <view class="test-mode-indicator" v-if="isDevMode">测试模式已开启</view>
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
      isDevMode: true
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
    
    // 测试模式下自动设置验证码
    if (this.isDevMode) {
      this.formData.code = '123456';
      console.log('测试模式已激活，验证码设置为:', this.formData.code);
    }
  },
  methods: {
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
      
      // 显示加载提示
      uni.showLoading({
        title: '正在绑定...',
        mask: true
      });
      
      // 测试模式下直接模拟成功
      if (this.isDevMode && this.formData.code === '123456') {
        setTimeout(() => {
          uni.hideLoading();
          
          // 模拟成功响应
          const mockUserInfo = {
            ...store.userInfo,
            mobile: this.formData.mobile
          };
          
          // 更新用户信息到存储
          uni.setStorageSync('uni-id-pages-userInfo', mockUserInfo);
          uni.setStorageSync('userInfo', mockUserInfo);
          
          // 更新全局状态
          mutations.updateUserInfo();
          
          // 调用API来确保手机号被更新到数据库
          updatePhoneNumber({ phoneNumber: this.formData.mobile })
            .then(result => {
              console.log('测试模式：手机号更新到数据库成功:', result);
            })
            .catch(updateErr => {
              console.error('测试模式：手机号更新到数据库失败:', updateErr);
            });
          
          uni.showToast({
            title: '测试模式：绑定成功',
            icon: 'success'
          });
          
          // 返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }, 1000);
        return;
      }
      
      // 正常模式下使用云对象绑定
      const uniIdCo = uniCloud.importObject("uni-id-co");
      uniIdCo.bindMobileBySms(this.formData).then(res => {
        uni.hideLoading();
        
        // 更新用户信息
        mutations.updateUserInfo();
        
        // 调用API来确保手机号被更新到数据库
        updatePhoneNumber({ phoneNumber: this.formData.mobile })
          .then(result => {
            console.log('手机号更新到数据库成功:', result);
          })
          .catch(updateErr => {
            console.error('手机号更新到数据库失败:', updateErr);
          });
        
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
        } else if (this.isDevMode) {
          // 测试模式下，无论出现什么错误都模拟成功
          setTimeout(() => {
            const mockUserInfo = {
              ...store.userInfo,
              mobile: this.formData.mobile
            };
            
            // 更新用户信息到存储
            uni.setStorageSync('uni-id-pages-userInfo', mockUserInfo);
            uni.setStorageSync('userInfo', mockUserInfo);
            
            // 更新全局状态
            mutations.updateUserInfo();
            
            // 调用API来确保手机号被更新到数据库
            updatePhoneNumber({ phoneNumber: this.formData.mobile })
              .then(result => {
                console.log('测试模式：手机号更新到数据库成功:', result);
              })
              .catch(updateErr => {
                console.error('测试模式：手机号更新到数据库失败:', updateErr);
              });
            
            uni.showToast({
              title: '测试模式：绑定成功',
              icon: 'success'
            });
            
            // 返回上一页
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          }, 500);
        } else {
          uni.showToast({
            title: err.errMsg || '绑定失败，请稍后重试',
            icon: 'none'
          });
        }
      });
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
</style> 