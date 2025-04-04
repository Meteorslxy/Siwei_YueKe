<template>
  <view class="login-container">
    <!-- 背景图 -->
    <image class="bg-image" src="/static/images/login.png" mode="aspectFill"></image>
    
    <!-- 自定义导航栏 -->
    <view class="custom-nav" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <!-- 添加返回按钮 -->
        <view class="nav-back" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <text class="nav-title">登录</text>
      </view>
    </view>
    
    <view class="content">
      <!-- Logo -->
      <view class="header">
        <image class="logo" src="../../static/images/logo.png" mode="aspectFit"></image>
      </view>
      
      <!-- 登录按钮 -->
      <view class="auth-buttons">
        <button class="auth-btn wechat-btn" open-type="getUserInfo" @getuserinfo="handleUserInfo">
          <image src="/static/images/wechat.png" mode="aspectFit" class="btn-icon"></image>
          微信登录
        </button>
        <button class="auth-btn other-login-btn" @click="showLoginOptions">
          其他登录方式
        </button>
        <!-- 调试按钮，仅在开发环境显示 -->
        <button class="auth-btn debug-btn" @click="checkLoginStatus">
          检查登录状态
        </button>
      </view>
      
      <!-- 用户协议 -->
      <view class="footer">
        <view class="agreement">
          <text class="dot"></text>
          <text class="agreement-text">登录即代表同意</text>
          <text class="link" @click="showUserAgreement">《用户协议》</text>
          <text class="agreement-text">和</text>
          <text class="link" @click="showPrivacyPolicy">《隐私政策》</text>
        </view>
      </view>
    </view>
    
    <!-- 其他登录方式弹窗 -->
    <view class="login-options-modal" v-if="showLoginOptionsModal">
      <view class="modal-mask" @click="closeLoginModals"></view>
      <view class="modal-content">
        <view class="modal-title">登录方式</view>
        <view class="login-options">
          <view class="login-option-item" @click="selectLoginMethod('phonePassword')">
            <text class="option-icon">🔐</text>
            <text class="option-text">账号密码登录</text>
          </view>
          <view class="login-option-item" @click="selectLoginMethod('phoneVerify')">
            <text class="option-icon">📱</text>
            <text class="option-text">手机号验证码登录</text>
          </view>
          <view class="login-option-item" @click="selectLoginMethod('register')">
            <text class="option-icon">📝</text>
            <text class="option-text">注册账号</text>
          </view>
        </view>
        <view class="modal-close">
          <text class="close-btn" @click="closeLoginModals">关闭</text>
        </view>
      </view>
    </view>
    
    <!-- 手机号验证码登录弹窗 -->
    <view class="phone-login-modal" v-if="showPhoneVerifyModal">
      <view class="modal-mask" @click="closeLoginModals"></view>
      <view class="modal-content">
        <view class="modal-title">手机号验证码登录</view>
        <view class="input-box">
          <uni-easyinput 
            v-model="mobile" 
            placeholder="请输入手机号" 
            type="number"
            maxlength="11"
            focus
          />
        </view>
        <view class="input-box verification-box">
          <input 
            type="number" 
            maxlength="6" 
            placeholder="请输入验证码" 
            placeholder-class="input-placeholder"
            v-model="verificationCode"
          />
          <button class="get-code-btn" :disabled="countdown > 0" @click="getVerificationCode">
            {{countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}}
          </button>
        </view>
        <view class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="closeLoginModals">取消</button>
          <button class="modal-btn confirm-btn" @click="confirmPhoneVerifyLogin">确定</button>
        </view>
      </view>
    </view>
    
    <!-- 手机号密码登录弹窗 -->
    <view class="phone-login-modal" v-if="showPhonePasswordModal">
      <view class="modal-mask" @click="closeLoginModals"></view>
      <view class="modal-content">
        <view class="modal-title">账号密码登录</view>
        <view class="input-box">
          <uni-easyinput 
            v-model="account" 
            placeholder="请输入用户名/手机号" 
            focus
          />
        </view>
        <view class="input-box">
          <uni-easyinput 
            v-model="password" 
            placeholder="请输入密码"
            type="password"
          />
        </view>
        <view class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="closeLoginModals">取消</button>
          <button class="modal-btn confirm-btn" @click="confirmPhonePasswordLogin">确定</button>
        </view>
      </view>
    </view>
    
    <!-- 注册弹窗 -->
    <view class="phone-login-modal" v-if="showRegisterModal">
      <view class="modal-mask" @click="closeLoginModals"></view>
      <view class="modal-content">
        <view class="modal-title">注册账号</view>
        <view class="input-box">
          <uni-easyinput 
            v-model="mobile" 
            placeholder="请输入手机号" 
            type="number"
            maxlength="11"
            focus
          />
        </view>
        <view class="input-box verification-box">
          <input 
            type="number" 
            maxlength="6" 
            placeholder="请输入验证码" 
            placeholder-class="input-placeholder"
            v-model="verificationCode"
          />
          <button class="get-code-btn" :disabled="countdown > 0" @click="getVerificationCode">
            {{countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}}
          </button>
        </view>
        <view class="input-box">
          <uni-easyinput 
            v-model="password" 
            placeholder="请设置密码"
            type="password"
          />
        </view>
        <view class="input-box">
          <uni-easyinput 
            v-model="confirmPassword" 
            placeholder="请确认密码"
            type="password"
          />
        </view>
        <view class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="closeLoginModals">取消</button>
          <button class="modal-btn confirm-btn" @click="confirmRegister">确定</button>
        </view>
      </view>
    </view>
    
    <!-- 图形验证码弹窗 -->
    <view class="phone-login-modal" v-if="showCaptchaModal">
      <view class="modal-mask" @click="closeCaptchaModal"></view>
      <view class="modal-content">
        <view class="modal-title">请输入图形验证码</view>
        <view class="captcha-img-box">
          <image class="captcha-img" :src="captchaData ? captchaData.captchaBase64 : ''" mode="widthFix" @click="refreshCaptcha"></image>
          <text class="refresh-text" @click="refreshCaptcha">刷新验证码</text>
        </view>
        <view class="input-box">
          <input 
            type="text" 
            maxlength="4" 
            placeholder="请输入图形验证码" 
            placeholder-class="input-placeholder"
            v-model="captchaCode"
            focus 
          />
        </view>
        <view class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="closeCaptchaModal">取消</button>
          <button class="modal-btn confirm-btn" @click="confirmCaptchaAndSendSms">确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {
    // 注册组件
  },
  data() {
    return {
      redirectUrl: '',
      isSupport: false, // 是否支持一键登录
      statusBarHeight: 0,
      mobile: '', // 手机号输入
      account: '', // 账号输入（用户名或手机号）
      password: '', // 密码输入
      confirmPassword: '', // 确认密码
      verificationCode: '', // 验证码
      countdown: 0, // 验证码倒计时
      showLoginOptionsModal: false, // 是否显示其他登录方式弹窗
      showPhoneVerifyModal: false, // 是否显示手机号验证码登录弹窗
      showPhonePasswordModal: false, // 是否显示手机号密码登录弹窗
      showRegisterModal: false, // 是否显示注册弹窗
      captchaData: null, // 图形验证码数据
      showCaptchaModal: false, // 是否显示图形验证码弹窗
      captchaCode: '', // 图形验证码输入
      loginState: {
        code: '', // 微信登录code
        openid: '', // 用户openid
        sessionKey: '' // 会话密钥
      },
      selectedLoginMethod: "", // 用户选择的登录方式
    }
  },
  onLoad(options) {
    // 获取状态栏高度
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    
    // 获取重定向页面
    if (options.redirect) {
      this.redirectUrl = decodeURIComponent(options.redirect);
    }
    
    // 检查是否支持一键登录
    this.checkSupport();
    
    // 进入页面就开始静默登录
    this.silentLogin();
  },
  methods: {
    // 检查是否支持一键登录
    checkSupport() {
      // 获取服务商
      uni.getProvider({
        service: 'oauth',
        success: (res) => {
          console.log('支持的服务商:', res.provider);
          
          // 预登录
          if (res.provider.includes('univerify')) {
            this.preLogin();
          }
        }
      });
    },
    
    // 预登录
    preLogin() {
      // #ifdef APP-PLUS
      uni.preLogin({
        provider: 'univerify',
        success: () => {
          console.log('预登录成功');
          this.isSupport = true;
        },
        fail: (err) => {
          console.error('预登录失败:', err);
          this.isSupport = false;
        }
      });
      // #endif
    },
    
    // 显示手机号登录弹窗
    showPhoneLoginModal(type) {
      // 重置输入
      this.mobile = '';
      this.password = '';
      this.confirmPassword = '';
      this.verificationCode = '';
      
      // 根据类型显示不同弹窗
      if (type === 'phoneVerify') {
        this.showPhoneVerifyModal = true;
      } else if (type === 'phonePassword') {
        this.showPhonePasswordModal = true;
      } else if (type === 'register') {
        this.showRegisterModal = true;
      }
    },
    
    // 关闭所有登录弹窗
    closeLoginModals() {
      this.showLoginOptionsModal = false;
      this.showPhoneVerifyModal = false;
      this.showPhonePasswordModal = false;
      this.showRegisterModal = false;
      this.showCaptchaModal = false;
      
      // 重置输入
      this.mobile = '';
      this.password = '';
      this.confirmPassword = '';
      this.verificationCode = '';
    },
    
    // 获取验证码
    getVerificationCode() {
      console.log('获取验证码');
      
      // 手机号码验证
      if (!this.mobile || !/^1\d{10}$/.test(this.mobile)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }
      
      // 显示加载提示
      uni.showLoading({
        title: '发送中...'
      });
      
      console.log('手机号码通过验证，准备发送');
      
      // 直接调用最终方法
      this.sendSmsDirectly(this.mobile);
    },
    
    // 直接发送短信验证码
    directSendSmsCode() {
      const phoneStr = String(this.mobile).trim();
      console.log('手机号(直接方式):', phoneStr, 'typeof:', typeof phoneStr, 'length:', phoneStr.length);
      
      if (!phoneStr || phoneStr.length !== 11) {
        console.error("手机号格式不正确:", phoneStr);
        uni.hideLoading();
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
      
      // 使用我们的新方法发送短信
      this.sendSmsDirectly(phoneStr);
    },
    
    // 使用图形验证码方式获取验证码
    getVerificationCodeWithCaptcha() {
      uni.showLoading({
        title: '获取验证码中',
        mask: true
      });
      
      // 先获取图形验证码
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      // 必须提供scene参数
      uniIdCo.createCaptcha({
        scene: 'login-by-sms'  // 必须提供scene参数
      })
        .then(res => {
          console.log('获取图形验证码成功:', res);
          
          // 尝试手动提取captchaId (有些版本存储在不同位置)
          let captchaId = '';
          if (res.captchaId) {
            captchaId = res.captchaId;
          } else if (res.data && res.data.captchaId) {
            captchaId = res.data.captchaId;
          }
          
          // 手动添加captchaId
          if (captchaId) {
            res.captchaId = captchaId;
            console.log('成功提取captchaId:', captchaId);
          } else {
            console.log('无法提取captchaId，将使用备用方式');
          }
          
          // 隐藏加载
          uni.hideLoading();
          
          // 显示图形验证码弹窗
          this.captchaData = res;
          this.showCaptchaModal = true;
        })
        .catch(err => {
          uni.hideLoading();
          console.error('获取图形验证码失败:', err);
          
          // 直接使用短信发送
          this.sendSmsDirectly(this.mobile);
        });
    },
    
    // 验证手机号格式
    validatePhoneNumber(phoneNumber) {
      if (!phoneNumber) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
        return false;
      }
      
      // 简单验证手机号
      if (!/^1\d{10}$/.test(phoneNumber)) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return false;
      }
      
      return true;
    },
    
    // 验证密码
    validatePassword(password) {
      if (!password) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        });
        return false;
      }
      
      if (password.length < 6) {
        uni.showToast({
          title: '密码长度不能少于6位',
          icon: 'none'
        });
        return false;
      }
      
      return true;
    },
    
    // 验证验证码
    validateVerificationCode(code) {
      if (!code) {
        uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        });
        return false;
      }
      
      // 简单验证验证码是否为4-6位数字
      if (!/^\d{4,6}$/.test(code)) {
        uni.showToast({
          title: '请输入正确的验证码',
          icon: 'none'
        });
        return false;
      }
      
      return true;
    },
    
    // 确认手机号验证码登录
    confirmPhoneVerifyLogin() {
      // 验证输入
      if (!this.validatePhoneNumber(this.mobile) || !this.validateVerificationCode(this.verificationCode)) {
        return;
      }
      
      // 关闭弹窗
      this.closeLoginModals();
      
      // 显示加载
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      
      console.log('手机号验证码登录 - 手机号:', this.mobile, '验证码:', this.verificationCode);
      
      // 使用importObject方式调用云对象
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      uniIdCo.loginBySms({
        mobile: this.mobile,
        code: this.verificationCode
      })
      .then(res => {
        console.log('手机号验证码登录成功:', res);
        uni.hideLoading();
        
        // 保存用户信息
        this.saveUserInfo(res);
        
        // 显示登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 触发登录成功事件
        uni.$emit('user:login', res.userInfo || res);
        uni.$emit('login:success', res.userInfo || res);
        
        // 刷新页面或跳转
        setTimeout(() => {
          this.$emit('login-success', res);
          // 登录成功后进行页面跳转
          this.navigateAfterLogin();
        }, 1500);
      })
      .catch(err => {
        uni.hideLoading();
        console.error('验证码登录失败:', err);
        
        // 记录详细错误信息
        console.log('错误代码:', err.errCode);
        console.log('错误消息:', err.message);
        console.log('错误详情:', JSON.stringify(err));
        
        // 根据错误类型提供具体提示
        let errorMsg = err.message || '登录失败';
        
        // 处理常见错误类型
        if (err.errCode === 'uni-id-mobile-verify-code-error') {
          errorMsg = '验证码错误或已过期';
          // 清空验证码字段
          this.verificationCode = '';
        } else if (err.errCode === 'uni-id-account-not-exists') {
          errorMsg = '该手机号未注册，请先注册账号';
        } else if (err.errCode === 'uni-id-account-banned') {
          errorMsg = '账号已被禁用';
        }
        
        // 显示错误提示
        uni.showModal({
          title: '登录失败',
          content: errorMsg,
          showCancel: false
        });
      });
    },
    
    // 确认手机号密码登录
    confirmPhonePasswordLogin() {
      if (!this.account) {
        uni.showToast({
          title: '请输入账号',
          icon: 'none'
        });
        return;
      }
      
      if (!this.password) {
        uni.showToast({
          title: '请输入密码',
          icon: 'none'
        });
        return;
      }
      
      // 显示加载
      uni.showLoading({
        title: '登录中...'
      });
      
      // 判断账号是用户名还是手机号
      const isPhone = /^1\d{10}$/.test(this.account);
      
      console.log('登录信息 - 账号:', this.account, '是手机号:', isPhone);
      
      // 使用uni-id-co登录
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      console.log('使用uni-id-co云对象方式登录');
      
      // 根据账号类型调用不同的登录方法
      let loginPromise;
      
      if (isPhone) {
        loginPromise = uniIdCo.login({
          // 同时提供mobile和username字段，增加登录成功率
          mobile: this.account,
          username: this.account, // 也作为用户名尝试登录
          password: this.password
        });
      } else {
        loginPromise = uniIdCo.login({
          username: this.account,
          password: this.password
        });
      }
      
      loginPromise
      .then(res => {
        uni.hideLoading();
          console.log('账号密码登录成功:', res);
          
          // 确保先保存token
          if (res.token) {
            uni.setStorageSync('uni_id_token', res.token);
            uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
            console.log('保存了token:', res.token);
            
            // 立即使用token获取完整用户信息
            uniCloud.callFunction({
              name: 'getUserInfoByToken',
              data: { uniIdToken: res.token }
            }).then(result => {
              console.log('获取完整用户信息结果:', result);
              
              if (result.result && result.result.code === 0 && result.result.userInfo) {
                // 获取到完整用户信息，进行保存和更新
                const userInfo = result.result.userInfo;
                
                console.log('获取到完整用户信息:', userInfo);
                
                // 保存到storage
                uni.setStorageSync('userInfo', userInfo);
                uni.setStorageSync('uni-id-pages-userInfo', userInfo);
                
                // 保存到全局变量
                getApp().globalData.userInfo = userInfo;
                
                // 触发登录事件，通知其他页面
                uni.$emit('user:login', userInfo);
                uni.$emit('login:success', userInfo);
        
        // 显示登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
                
                // 关闭登录弹窗
                this.closeLoginModals();
        
        // 刷新页面或跳转
        setTimeout(() => {
                  this.$emit('login-success', userInfo);
          // 登录成功后进行页面跳转
          this.navigateAfterLogin();
        }, 1500);
              } else {
                // 获取完整用户信息失败，使用基本信息
                console.error('获取完整用户信息失败，使用基本信息:', result);
                this.saveUserInfo(res);
              }
            }).catch(err => {
              console.error('获取完整用户信息出错:', err);
              // 发生错误时仍使用基本信息
              this.saveUserInfo(res);
            });
          } else {
            // 没有token的情况，使用基本信息
            this.saveUserInfo(res);
          }
      })
      .catch(err => {
        uni.hideLoading();
        console.error('登录失败:', err);
          
          // 记录详细错误信息
          console.log('错误代码:', err.errCode);
          console.log('错误消息:', err.message);
          console.log('错误详情:', JSON.stringify(err));
          
          // 根据错误类型提供具体提示
          let errorMsg = err.message || '登录失败';
          
          // 处理常见错误类型
          if (err.errCode === 'uni-id-password-error') {
            errorMsg = '密码错误，请重试';
            // 清空密码字段
            this.password = '';
          } else if (err.errCode === 'uni-id-account-not-exists') {
            // 如果是手机号格式，提示更明确的信息
            if (/^1\d{10}$/.test(this.account)) {
              // 尝试调用查询接口验证手机号是否已在数据库中
              this.checkPhoneExistence(this.account)
                .then(exists => {
                  if (exists) {
                    // 如果手机号存在但登录失败，可能是密码问题
                    uni.showModal({
                      title: '登录失败',
                      content: '密码错误或账号异常，请重新输入密码或使用手机验证码登录',
                      showCancel: true,
                      cancelText: '重新输入',
                      confirmText: '验证码登录',
                      success: (res) => {
                        if (res.confirm) {
                          // 切换到手机验证码登录
                          this.selectedLoginMethod = 'phoneVerify';
                          this.phoneNumber = this.account;
                          this.showPhoneLoginModal('phoneVerify');
                        } else {
                          // 清空密码重新输入
                          this.password = '';
                        }
                      }
                    });
                  } else {
                    // 手机号不存在，提示注册
                    uni.showModal({
                      title: '账号未注册',
                      content: '该手机号未注册，是否立即注册？',
                      showCancel: true,
                      cancelText: '取消',
                      confirmText: '去注册',
                      success: (res) => {
                        if (res.confirm) {
                          // 切换到注册页面
                          this.showRegisterModal();
                          this.mobile = this.account;
                        }
                      }
                    });
                  }
                });
            } else {
              errorMsg = '账号不存在，请检查输入';
              // 显示错误提示
              uni.showModal({
                title: '登录失败',
                content: errorMsg,
                showCancel: false
              });
            }
            return; // 提前返回，不显示一般错误提示
          } else if (err.errCode === 'uni-id-account-banned') {
            errorMsg = '账号已被禁用';
          } else if (err.errCode === 'uni-id-account-not-exists-in-current-app') {
            errorMsg = '账号在当前应用不存在';
          } else if (err.errCode === 'uni-id-password-error-exceed-limit') {
            errorMsg = '密码错误次数过多，账号已被锁定';
          }
          
          // 显示错误提示
          uni.showModal({
            title: '登录失败',
            content: errorMsg,
            showCancel: false
        });
      });
    },
    
    // 确认注册
    confirmRegister() {
      // 验证输入
      if (!this.validatePhoneNumber(this.mobile) || 
          !this.validateVerificationCode(this.verificationCode) || 
          !this.validatePassword(this.password)) {
        return;
      }
      
      // 验证两次密码是否一致
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        });
        return;
      }
      
      // 关闭弹窗
      this.closeLoginModals();
      
      // 显示加载
      uni.showLoading({
        title: '注册中',
        mask: true
      });
      
      // 使用importObject方式调用云对象
      const uniIdCo = uniCloud.importObject('uni-id-co');
      uniIdCo.register({
        username: this.mobile,
        password: this.password,
        code: this.verificationCode,
        mobile: this.mobile
      })
      .then(res => {
        console.log('注册成功:', res);
        uni.hideLoading();
        
        // 保存用户信息
        this.saveUserInfo(res);
        
        // 显示注册成功提示
        uni.showToast({
          title: '注册成功',
          icon: 'success'
        });
        
        // 刷新页面或跳转
        setTimeout(() => {
          this.$emit('login-success', res);
          // 登录成功后进行页面跳转
          this.navigateAfterLogin();
        }, 1500);
      })
      .catch(err => {
        uni.hideLoading();
        console.error('注册失败:', err);
        uni.showToast({
          title: err.message || '注册失败',
          icon: 'none'
        });
      });
    },
    
    // 手机号登录（旧方法，保留兼容性）
    handlePhoneLogin() {
      this.showPhoneLoginModal('phoneVerify');
    },
    
    // 使用手机号登录（旧方法，保留兼容性）
    loginWithPhone(phoneNumber) {
      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      
      console.log('使用手机号登录:', phoneNumber);
      
      // 调用登录云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          phoneNumber: phoneNumber,
          loginType: 'phone'
        },
        success: (res) => {
          console.log('手机号登录结果:', res);
          
          if (res.result && res.result.code === 0) {
            // 处理登录结果
            this.handleLoginResult(res);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: (res.result && res.result.message) || '登录失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('登录失败:', err);
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 静默登录，获取code和openid
    async silentLogin() {
      try {
        // 调用微信登录获取code
        const loginRes = await this.wxLoginPromise();
        
        if (loginRes.code) {
          console.log('静默登录获取code成功:', loginRes.code);
          this.loginState.code = loginRes.code;
          
          // 获取openid
          try {
            const openidRes = await this.getOpenid(loginRes.code);
            console.log('静默登录获取openid成功:', openidRes);
            
            if (openidRes.result && openidRes.result.code === 0 && openidRes.result.data) {
              this.loginState.openid = openidRes.result.data.openid;
              this.loginState.sessionKey = openidRes.result.data.sessionKey;
              
              // 有了openid后尝试自动登录
              if (this.loginState.openid) {
                this.checkUserExistsAndLogin();
              }
            }
          } catch (error) {
            console.error('静默登录获取openid失败:', error);
          }
        }
      } catch (error) {
        console.error('静默登录失败:', error);
      }
    },
    
    // 检查用户是否已存在，如果已存在则自动登录
    checkUserExistsAndLogin() {
      if (!this.loginState.openid) return;
      
      // 显示加载中
      uni.showLoading({
        title: '检查登录状态',
        mask: true
      });
      
      const defaultUserInfo = {
        nickName: '微信用户',
        avatarUrl: '',
        gender: 0
      };
      
      // 调用云函数检查用户是否存在并自动登录
      uniCloud.callFunction({
        name: 'login',
        data: {
          openid: this.loginState.openid,
          userInfo: defaultUserInfo,
          loginType: 'wechat',
          checkOnly: true  // 添加标记，仅检查用户是否存在
        },
        success: (res) => {
          uni.hideLoading();
          console.log('检查用户存在结果:', res);
          
          if (res.result && res.result.code === 0 && res.result.userExists) {
            console.log('用户已存在，自动登录');
            // 用户已存在，自动登录
            this.loginWithOpenid(this.loginState.openid, defaultUserInfo);
          } else {
            console.log('用户不存在，需要点击登录按钮');
            // 用户不存在，不进行自动登录，等待用户点击登录按钮
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('检查用户存在失败:', err);
        }
      });
    },
    
    // 自动使用openid登录
    autoLoginWithOpenid() {
      const defaultUserInfo = {
        nickName: '微信用户',
        avatarUrl: '',
        gender: 0
      };
      
      if (this.loginState.openid) {
        console.log('使用已获取的openid登录:', this.loginState.openid);
        this.loginWithOpenid(this.loginState.openid, defaultUserInfo);
      }
    },
    
    // Promise化的wx.login
    wxLoginPromise() {
      return new Promise((resolve, reject) => {
        uni.login({
          success(res) {
            resolve(res);
          },
          fail(err) {
            reject(err);
          }
        });
      });
    },
    
    // 获取openid
    getOpenid(code) {
      return new Promise((resolve, reject) => {
        uniCloud.callFunction({
          name: 'getWxOpenid',
          data: { code },
          success: res => {
            resolve(res);
          },
          fail: err => {
            reject(err);
          }
        });
      });
    },
    
    // 处理微信登录
    handleUserInfo(e) {
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        uni.showToast({
          title: '授权失败',
          icon: 'none'
        });
        return;
      }
      
      // 获取用户信息
      const userInfo = e.detail.userInfo;
      
      // 显示加载中
      uni.showLoading({
        title: '登录中',
        mask: true
      });
      
      // 进行微信登录
      uni.login({
        success: (loginRes) => {
          if (loginRes.code) {
            console.log('微信登录成功，获取到code:', loginRes.code);
            
            // 优先使用uni-id-co登录方式
            this.loginWithUniIdCo(loginRes.code, userInfo);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 使用uni-id-co的方式登录
    loginWithUniIdCo(code, userInfo) {
      console.log('尝试使用uni-id-co微信登录');
      
      // 使用云对象方式调用登录
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true // 使用自定义UI
      });
      
      uniIdCo.loginByWeixin({
        code: code // 提供正确的code参数
      })
      .then(res => {
        uni.hideLoading();
        console.log('uni-id-co微信登录成功:', res);
        
        // 保存token等信息到storage
        uni.setStorageSync('uni_id_token', res.token);
        uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
        
        // 保存用户信息
        this.saveUserInfo(res);
        
        // 显示登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 触发登录成功事件
        uni.$emit('user:login', res.userInfo || res);
        uni.$emit('login:success', res.userInfo || res);
        
        // 登录成功后自动跳转到首页或指定页面
        setTimeout(() => {
          this.navigateAfterLogin();
        }, 1000);
      })
      .catch(err => {
        console.error('uni-id-co微信登录失败:', err);
        
        // 尝试备用方式
        this.getWxOpenidAndLogin(code, userInfo);
      });
    },
    
    // 获取微信openid并登录（备用方案）
    getWxOpenidAndLogin(code, userInfo) {
      console.log('使用备用方式获取openid并登录');
      
      // 通过getWxOpenid获取openid等信息
      uniCloud.callFunction({
        name: 'getWxOpenid',
        data: { code: code },
        success: (openidRes) => {
          console.log('获取openid结果:', openidRes);
          
          if (openidRes.result && openidRes.result.code === 0 && openidRes.result.data) {
            const openid = openidRes.result.data.openid;
            
            // 使用openid登录
            this.loginWithOpenid(openid, userInfo || {
              nickName: '微信用户',
              avatarUrl: '',
              gender: 0
            });
          } else {
            uni.hideLoading();
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('获取openid失败:', err);
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 处理登录结果
    handleLoginResult(res) {
      uni.hideLoading();
      
      console.log('处理登录结果:', res);
      const result = res.result;
      console.log('结果数据结构:', result);
      
      // 成功
      if (result && result.code === 0) {
        try {
          // 保存用户信息 (根据uni-id-co的返回格式)
          const userInfo = {
            uid: result.uid,
            token: result.token,
            tokenExpired: result.tokenExpired,
            userInfo: result.userInfo || {}
          };
          
          uni.setStorageSync('userInfo', userInfo);
          
          // 显示登录成功提示
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          
          // 触发全局登录成功事件
          uni.$emit('user:login', userInfo);
          uni.$emit('login:success', userInfo);
          
          // 关闭登录弹窗
          this.closeLoginModals();
          
          // 登录成功后自动跳转到首页或指定页面
          setTimeout(() => {
            this.navigateAfterLogin();
          }, 1000);
        } catch (e) {
          console.error('保存用户信息失败:', e);
        }
      } else {
        // 失败
        console.error('登录失败:', result);
        uni.showToast({
          title: (result && result.message) || '登录失败',
          icon: 'none'
        });
      }
    },
    
    // 登录后的跳转逻辑
    navigateAfterLogin() {
      console.log('执行登录后跳转...');
      
      // 获取重定向URL
      const redirectUrl = this.getRedirectUrl();
      
      if (redirectUrl) {
        console.log('跳转到指定页面:', redirectUrl);
        
        // 判断是否是tabbar页面
        const tabbarPages = ['/pages/index/index', '/pages/course/index', '/pages/user/user'];
        const isTabbarPage = tabbarPages.some(page => redirectUrl.startsWith(page));
        
        if (isTabbarPage) {
            uni.switchTab({
            url: redirectUrl,
            success: () => {
              console.log('跳转成功');
            },
              fail: (err) => {
              console.error('跳转失败:', err);
              // 失败时默认跳转到首页
                uni.switchTab({
                  url: '/pages/index/index'
                });
              }
            });
          } else {
            uni.redirectTo({
            url: redirectUrl,
            success: () => {
              console.log('跳转成功');
            },
              fail: (err) => {
              console.error('跳转失败:', err);
              // 失败时默认跳转到首页
                uni.switchTab({
                  url: '/pages/index/index'
                });
              }
            });
          }
        } else {
        // 没有重定向URL则跳转到首页
        console.log('没有重定向URL，跳转到首页');
          uni.switchTab({
          url: '/pages/index/index',
          success: () => {
            console.log('跳转到首页成功');
          },
          fail: (err) => {
            console.error('跳转到首页失败:', err);
          }
        });
      }
    },
    
    // 获取重定向URL
    getRedirectUrl() {
      // 优先使用URL参数中的redirect
      if (this.options && this.options.redirect) {
        return decodeURIComponent(this.options.redirect);
      }
      
      // 其次尝试从存储中获取
      const redirectUrl = uni.getStorageSync('loginRedirectUrl');
      if (redirectUrl) {
        // 使用后清除，避免下次重复使用
        uni.removeStorageSync('loginRedirectUrl');
        return redirectUrl;
      }
      
      return '';
    },
    
    // 调试日志输出
    logDebugInfo() {
      try {
        console.log('----- 用户登录调试信息 -----');
        
        // 读取本地存储的用户信息
        const userInfoStr = uni.getStorageSync('userInfo');
        console.log('本地存储的用户信息字符串长度:', typeof userInfoStr === 'string' ? userInfoStr.length : '对象类型');
        
        if (userInfoStr) {
          try {
            // 检查是否已经是对象
            const userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
            console.log('解析后的用户信息字段:', Object.keys(userInfo));
            console.log('用户ID:', userInfo.userId || userInfo._id);
            console.log('用户名:', userInfo.nickName || userInfo.username);
            console.log('是否有手机号:', !!userInfo.phoneNumber);
          } catch (e) {
            console.error('解析用户信息失败:', e);
          }
        } else {
          console.log('本地存储中没有用户信息');
        }
        
        // 检查全局状态
        const globalData = getApp().globalData || {};
        console.log('全局状态中是否有用户信息:', !!globalData.userInfo);
        
        // 输出环境信息
        const sysInfo = uni.getSystemInfoSync();
        console.log('运行环境:', sysInfo.platform, sysInfo.system);
        
        console.log('----- 调试信息结束 -----');
      } catch (err) {
        console.error('输出调试信息失败:', err);
      }
    },
    
    // 显示隐私政策
    showPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/common/webview?title=隐私政策&url=' + encodeURIComponent('https://example.com/privacy')
      });
    },
    
    // 显示用户协议
    showUserAgreement() {
      uni.navigateTo({
        url: '/pages/common/webview?title=用户协议&url=' + encodeURIComponent('https://example.com/agreement')
      });
    },
    
    // 保存用户信息
    async saveUserInfo(res) {
      try {
        // 保存用户信息到本地
        console.log('保存用户信息, 原始数据:', JSON.stringify(res));
        
        // 保存token到storage
        if (res.token) {
          uni.setStorageSync('uni_id_token', res.token);
          uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
          console.log('保存了token和过期时间:', res.tokenExpired);
          
          // 登录成功后，立即调用getUserInfoByToken云函数获取完整用户信息
          console.log('尝试获取完整用户信息...');
          
          try {
            const result = await uniCloud.callFunction({
              name: 'getUserInfoByToken',
              data: { uniIdToken: res.token }
            });
            
            console.log('获取完整用户信息结果:', result);
            
            if (result && result.result && result.result.code === 0 && result.result.userInfo) {
              // 使用完整的用户信息
              const completeUserInfo = result.result.userInfo;
              
              console.log('获取到完整用户信息:', completeUserInfo);
              
              // 保存到存储
              uni.setStorageSync('uni-id-pages-userInfo', completeUserInfo);
              uni.setStorageSync('userInfo', completeUserInfo);
              
              // 保存到全局变量
              getApp().globalData.userInfo = completeUserInfo;
              
              console.log('完整用户信息保存成功');
              
              // 触发登录成功事件
              uni.$emit('user:login', completeUserInfo);
              uni.$emit('login:success', completeUserInfo);
              
              // 显示登录成功提示
              uni.showToast({
                title: '登录成功',
                icon: 'success'
              });
              
              // 登录成功后自动跳转到首页或指定页面
              setTimeout(() => {
                this.navigateAfterLogin();
              }, 1000);
            }
          } catch (err) {
            console.error('获取完整用户信息失败，将使用标准方式:', err);
          }
        }
        
        // 如果获取完整用户信息失败，则使用标准方式保存简化信息
        // 从不同格式的响应中提取完整用户信息
        let userInfo = {
          uid: res.uid || '',
          token: res.token || '',
          tokenExpired: res.tokenExpired || '',
          username: '',
          nickname: '',
          mobile: '',
          email: '',
          avatar: '',
          avatar_file: ''
        };
        
        // 如果存在userInfo字段
        if (res.userInfo && typeof res.userInfo === 'object') {
          console.log('从userInfo字段提取数据');
          // 合并用户信息
          Object.assign(userInfo, {
            username: res.userInfo.username || '',
            nickname: res.userInfo.nickname || '',
            mobile: res.userInfo.mobile || '',
            email: res.userInfo.email || '',
            avatar: res.userInfo.avatar || '',
            avatar_file: res.userInfo.avatar_file || ''
          });
        } 
        // 如果直接包含用户信息字段
        else {
          console.log('从顶级字段提取数据');
          userInfo.username = res.username || '';
          userInfo.nickname = res.nickname || '';
          userInfo.mobile = res.mobile || '';
          userInfo.email = res.email || '';
          userInfo.avatar = res.avatar || '';
          userInfo.avatar_file = res.avatar_file || '';
        }
        
        // 确保uid和userInfo属性一定存在
        if (!userInfo.userInfo) {
          userInfo.userInfo = {
            _id: userInfo.uid,
            uid: userInfo.uid,
            username: userInfo.username,
            nickname: userInfo.nickname
          };
        }
        
        console.log('处理后的用户信息:', JSON.stringify(userInfo));
        
        // 直接存储对象，而不是字符串，减少解析错误
        uni.setStorageSync('userInfo', userInfo);
        
        // 保存到全局变量以便其他页面使用
        getApp().globalData.userInfo = userInfo;
        
        // 同时保存到uni-id-pages的标准存储位置
        uni.setStorageSync('uni-id-pages-userInfo', userInfo);
        
        console.log('保存用户信息成功');
        
        // 触发登录成功事件
        uni.$emit('user:login', userInfo);
        uni.$emit('login:success', userInfo);
        
        // 显示登录成功提示
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 登录成功后自动跳转到首页或指定页面
        setTimeout(() => {
          this.navigateAfterLogin();
        }, 1000);
      } catch (e) {
        console.error('保存用户信息失败:', e);
      }
    },
    
    // 关闭验证码弹窗
    closeCaptchaModal() {
      this.showCaptchaModal = false;
      this.captchaCode = '';
    },
    
    // 刷新图形验证码
    refreshCaptcha() {
      uni.showLoading({
        title: '刷新中',
        mask: true
      });
      
      const uniIdCo = uniCloud.importObject('uni-id-co');
      
      // 必须提供scene参数
      uniIdCo.createCaptcha({
        scene: 'login-by-sms'  // 必须提供scene参数
      })
        .then(res => {
          uni.hideLoading();
          console.log('刷新图形验证码成功:', res);
          
          // 尝试手动提取captchaId (有些版本存储在不同位置)
          let captchaId = '';
          if (res.captchaId) {
            captchaId = res.captchaId;
          } else if (res.data && res.data.captchaId) {
            captchaId = res.data.captchaId;
          }
          
          // 手动添加captchaId
          if (captchaId) {
            res.captchaId = captchaId;
            console.log('成功提取captchaId:', captchaId);
          } else {
            console.log('无法提取captchaId，将使用备用方式');
          }
          
          this.captchaData = res;
        })
        .catch(err => {
          uni.hideLoading();
          console.error('刷新图形验证码失败:', err);
          uni.showToast({
            title: '刷新失败，请重试',
            icon: 'none'
          });
        });
    },
    
    // 确认图形验证码并发送短信
    confirmCaptchaAndSendSms() {
      if (!this.captchaCode) {
        uni.showToast({
          title: '请输入图形验证码',
          icon: 'none'
        });
        return;
      }
      
      const phoneStr = String(this.mobile).trim();
      console.log('准备发送验证码，captchaData详细内容:', JSON.stringify(this.captchaData));
      console.log('输入的验证码:', this.captchaCode);
      console.log('手机号(验证码方式):', phoneStr, 'typeof:', typeof phoneStr, 'length:', phoneStr.length);
      
      // 验证手机号
      if (!phoneStr || phoneStr.length !== 11) {
        console.error("手机号格式不正确:", phoneStr);
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
      
      uni.showLoading({
        title: '发送中',
        mask: true
      });
      
      // 验证成功后直接发送短信
      console.log('验证码验证通过，直接发送短信');
      
      // 直接调用短信发送方法
      this.sendSmsDirectly(phoneStr);
    },
    
    // 直接发送短信 - 最后的方法
    sendSmsDirectly(phoneNumber) {
      console.log('直接发送短信 - 最终方法, 手机号:', phoneNumber);
      
      // 确保手机号格式正确
      phoneNumber = String(phoneNumber).trim();
      if (!phoneNumber || phoneNumber.length !== 11) {
        console.error("手机号格式不正确:", phoneNumber);
        uni.hideLoading();
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
        return;
      }
      
      // 尝试不同的数据格式
      // 格式1: 直接在表单中添加mobile字段
      const formData = {
        mobile: phoneNumber
      };
      
      console.log('发送参数 (格式1):', JSON.stringify(formData));
      
      // 直接调用API接口
      uni.request({
        url: 'https://fc-mp-7e3e0dc5-f41a-4295-acf9-83f1b1b089b9.next.bspapp.com/sendSmsCode',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: formData,
        success: (res) => {
          console.log('发送响应 (格式1):', res);
          
          if (res.statusCode === 200 && res.data && res.data.code === 0) {
            uni.hideLoading();
            // 关闭验证码弹窗
            this.closeCaptchaModal();
            
            // 提示成功并开始倒计时
            uni.showToast({
              title: '验证码已发送',
              icon: 'success'
            });
            
            // 开始倒计时
            this.startCountdown();
          } else {
            console.error('格式1失败，尝试格式2');
            
            // 格式2: 使用params包装
            const formData2 = {
              params: {
                mobile: phoneNumber
              }
            };
            
            console.log('发送参数 (格式2):', JSON.stringify(formData2));
            
            uni.request({
              url: 'https://fc-mp-7e3e0dc5-f41a-4295-acf9-83f1b1b089b9.next.bspapp.com/sendSmsCode',
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: formData2,
              success: (res2) => {
                console.log('发送响应 (格式2):', res2);
                
                if (res2.statusCode === 200 && res2.data && res2.data.code === 0) {
                  uni.hideLoading();
                  // 关闭验证码弹窗
                  this.closeCaptchaModal();
                  
                  // 提示成功并开始倒计时
                  uni.showToast({
                    title: '验证码已发送',
                    icon: 'success'
                  });
                  
                  // 开始倒计时
                  this.startCountdown();
                } else {
                  // 所有方式都失败，使用格式3
                  console.error('格式2失败，尝试格式3 (URL参数)');
                  
                  uni.request({
                    url: `https://fc-mp-7e3e0dc5-f41a-4295-acf9-83f1b1b089b9.next.bspapp.com/sendSmsCode?mobile=${encodeURIComponent(phoneNumber)}`,
                    method: 'GET',
                    success: (res3) => {
                      uni.hideLoading();
                      console.log('发送响应 (格式3):', res3);
                      
                      // 关闭验证码弹窗
                      this.closeCaptchaModal();
                      
                      if (res3.statusCode === 200 && res3.data && res3.data.code === 0) {
                        uni.showToast({
                          title: '验证码已发送',
                          icon: 'success'
                        });
                        
                        // 开始倒计时
                        this.startCountdown();
                      } else {
                        uni.showToast({
                          title: '发送失败，请稍后重试',
                          icon: 'none'
                        });
                      }
                    },
                    fail: (err3) => {
                      uni.hideLoading();
                      console.error('发送请求失败 (格式3):', err3);
                      
                      // 关闭验证码弹窗
                      this.closeCaptchaModal();
                      
                      uni.showToast({
                        title: '验证码发送失败',
                        icon: 'none'
                      });
                    }
                  });
                }
              },
              fail: (err2) => {
                console.error('发送请求失败 (格式2):', err2);
                // 继续尝试格式3...
              }
            });
          }
        },
        fail: (err) => {
          console.error('发送请求失败 (格式1):', err);
          // 继续尝试格式2...
        }
      });
    },
    
    // 尝试从SVG中获取验证码文本
    getCaptchaTextFromSvg() {
      try {
        if (this.captchaData && this.captchaData.captchaBase64) {
          const svg = this.captchaData.captchaBase64;
          
          // 尝试提取文本内容
          let captchaText = '';
          
          // 如果是SVG格式，尝试从中提取文本节点
          if (svg.includes('<svg') && svg.includes('</svg>')) {
            // 查找text标签
            const textMatch = svg.match(/<text[^>]*>(.*?)<\/text>/g);
            if (textMatch) {
              captchaText = textMatch.map(t => {
                // 提取text标签内的文本
                const content = t.match(/<text[^>]*>(.*?)<\/text>/);
                return content ? content[1] : '';
              }).join('');
            }
            
            // 如果没有找到text标签，尝试查看title或desc标签
            if (!captchaText) {
              const titleMatch = svg.match(/<title[^>]*>(.*?)<\/title>/);
              if (titleMatch) {
                captchaText = titleMatch[1];
              }
            }
            
            // 如果还是没找到，尝试通过路径或线条的标识猜测
            if (!captchaText && svg.includes('path')) {
              console.log('SVG包含路径，但无法提取文本');
            }
          }
          
          if (captchaText) {
            console.log('从SVG中提取的验证码文本可能是:', captchaText);
            return captchaText;
          }
        }
      } catch (err) {
        console.error('尝试提取验证码文本失败:', err);
      }
      
      return null;
    },
    
    // 开始倒计时
    startCountdown() {
      this.countdown = 60;
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer);
          this.countdown = 0;
        }
      }, 1000);
    },
    
    // 使用openid登录（备用方法）
    loginWithOpenid(openid, userInfo) {
      console.log('使用openid直接登录:', openid);
      
      // 显示加载中
      uni.showLoading({
        title: '登录中...',
        mask: true
      });
      
      // 准备用户数据
      const userData = {
        nickname: userInfo.nickName || '微信用户',
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0
      };
      
      // 调用云函数，使其在uni-id-users中查找或创建用户
      uniCloud.callFunction({
        name: 'loginWithOpenid',
        data: {
          openid: openid,
          platform: 'mp-weixin',
          userInfo: userData
        },
        success: (res) => {
          uni.hideLoading();
          console.log('openid登录结果:', res);
          
          if (res.result && res.result.code === 0) {
            // 保存token等信息
            if (res.result.token) {
              uni.setStorageSync('uni_id_token', res.result.token);
              uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired);
            }
            
            // 保存用户信息
            this.saveUserInfo(res.result);
            
            // 显示登录成功提示
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            });
            
            // 触发登录成功事件
            uni.$emit('user:login', res.result.userInfo || res.result);
            uni.$emit('login:success', res.result.userInfo || res.result);
            
            // 登录成功后自动跳转到首页或指定页面
            setTimeout(() => {
              this.navigateAfterLogin();
            }, 1000);
          } else {
            console.error('登录失败:', res.result);
            uni.showToast({
              title: res.result?.message || '登录失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('调用登录云函数失败:', err);
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1,
        fail: () => {
          // 如果没有上一页，则返回首页
          uni.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    },
    
    // 显示其他登录方式
    showLoginOptions() {
      this.showLoginOptionsModal = true;
    },
    
    // 调用登录API
    callLoginApi(loginParams) {
      // 显示加载中
      uni.showLoading({
        title: '登录中...'
      });
      
      // 调用登录API
      uniCloud.callFunction({
        name: 'login',
        data: {
          ...loginParams,
          loginType: 'phone'
        },
        success: (res) => {
          console.log('登录结果:', res);
          
          if (res.result && res.result.code === 0) {
            // 处理登录结果
            this.handleLoginResult(res);
          } else {
            uni.hideLoading();
            uni.showToast({
              title: (res.result && res.result.message) || '登录失败',
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error('登录失败:', err);
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 选择登录方式
    selectLoginMethod(method) {
      this.selectedLoginMethod = method;
      this.closeLoginModals();
      
      // 直接显示对应的登录表单
      this.showPhoneLoginModal(method);
    },
    
    // 检查登录状态
    checkLoginStatus() {
      try {
        // 检查本地存储中的token
        const token = uni.getStorageSync('uni_id_token');
        const tokenExpired = uni.getStorageSync('uni_id_token_expired');
        const userInfoStr = uni.getStorageSync('userInfo');
        
        console.log('本地token:', token);
        console.log('token过期时间:', tokenExpired);
        console.log('用户信息:', userInfoStr);
        
        // 检查token是否过期
        const now = Date.now();
        const isExpired = !tokenExpired || now > tokenExpired;
        console.log('token是否过期:', isExpired);
        
        // 在界面上显示用户信息
        uni.showToast({
          title: '正在检查登录状态',
          icon: 'loading'
        });
        
        // 调试日志输出
        this.logDebugInfo();
        
        // 使用云对象检查token有效性
        if (token) {
          this.checkTokenValidity(token);
        } else {
          uni.showModal({
            title: '登录状态',
            content: '未找到登录凭证，请重新登录',
            showCancel: false
          });
        }
      } catch (err) {
        console.error('检查登录状态错误:', err);
        uni.showModal({
          title: '错误',
          content: `检查登录状态时出错: ${err.message}`,
          showCancel: false
        });
      }
    },
    
    // 检查token有效性
    checkTokenValidity(token) {
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      uni.showLoading({
        title: '检查中...'
      });
      
      uniIdCo.checkToken({
        token: token
      })
      .then(res => {
        uni.hideLoading();
        console.log('token检查结果:', res);
        
        if (res.code === 0) {
          // 成功获取到用户信息，显示详细内容
          let infoText = `登录状态: 已登录\n`;
          
          // 添加用户ID信息
          infoText += `用户ID: ${res.uid || '未知'}\n`;
          
          // 检查云数据库中的用户信息
          this.checkDatabaseUserInfo(res.uid);
          
          // 添加用户名和昵称信息
          if (res.userInfo) {
            infoText += `用户名: ${res.userInfo.username || '未设置'}\n`;
            infoText += `昵称: ${res.userInfo.nickname || res.userInfo.username || '未设置'}\n`;
            
            // 如果有手机号，显示手机号
            if (res.userInfo.mobile) {
              infoText += `手机号: ${res.userInfo.mobile}\n`;
            }
            
            // 显示是否绑定手机号
            infoText += `是否绑定手机号: ${res.userInfo.mobile ? '是' : '否'}\n`;
          }
          
          // 尝试获取用户完整信息
          const userInfo = uni.getStorageSync('userInfo');
          
          // 如果存储了用户信息，添加到显示中
          if (userInfo) {
            infoText += `\n本地存储信息:\n`;
            infoText += `存储用户ID: ${userInfo.uid || userInfo._id || '未知'}\n`;
            
            if (typeof userInfo === 'object') {
              // 检查userInfo属性
              if (userInfo.userInfo) {
                infoText += `存储昵称: ${userInfo.userInfo.nickname || userInfo.nickname || '未设置'}\n`;
              } else {
                infoText += `存储昵称: ${userInfo.nickname || '未设置'}\n`;
              }
            }
          }
          
          // 显示token过期时间
          const tokenExpired = uni.getStorageSync('uni_id_token_expired');
          if (tokenExpired) {
            const expireDate = new Date(tokenExpired);
            infoText += `\nToken过期时间: ${expireDate.toLocaleString()}\n`;
            infoText += `是否已过期: ${Date.now() > tokenExpired ? '是' : '否'}\n`;
          }
          
          // 显示用户信息
          uni.showModal({
            title: '登录状态',
            content: infoText,
            showCancel: false
          });
          
          // 如果没有用户信息，尝试重新获取
          if (!userInfo || !userInfo.nickname) {
            this.refreshUserInfo(res);
          }
        } else {
          uni.showModal({
            title: '登录状态',
            content: `登录已失效: ${res.message || '未知错误'}`,
            showCancel: false
          });
        }
      })
      .catch(err => {
        uni.hideLoading();
        console.error('检查token失败:', err);
        
        uni.showModal({
          title: '登录状态',
          content: `检查失败: ${err.message || JSON.stringify(err)}`,
          showCancel: false
        });
      });
    },
    
    // 检查数据库中的用户信息
    checkDatabaseUserInfo(uid) {
      if (!uid) return;
      
      console.log('检查数据库中的用户信息, uid:', uid);
      
      uniCloud.callFunction({
        name: 'getUserInfoByToken',
        data: { 
          uniIdToken: uni.getStorageSync('uni_id_token')
        }
      }).then(res => {
        if (res.result && res.result.code === 0 && res.result.userInfo) {
          console.log('数据库用户信息:', res.result.userInfo);
          
          uni.showModal({
            title: '数据库用户信息',
            content: `用户ID: ${res.result.userInfo._id}\n用户名: ${res.result.userInfo.username || '未设置'}\n昵称: ${res.result.userInfo.nickname || '未设置'}`,
            showCancel: false
          });
        } else {
          console.error('获取数据库用户信息失败:', res);
        }
      }).catch(err => {
        console.error('查询数据库用户信息失败:', err);
      });
    },
    
    // 刷新用户信息
    refreshUserInfo(tokenCheckRes) {
      if (!tokenCheckRes || !tokenCheckRes.uid) return;
      
      console.log('尝试刷新用户信息');
      
      // 使用uid构建基本用户信息
      const basicUserInfo = {
        uid: tokenCheckRes.uid,
        _id: tokenCheckRes.uid
      };
      
      // 如果有用户信息，添加到基本信息中
      if (tokenCheckRes.userInfo) {
        Object.assign(basicUserInfo, tokenCheckRes.userInfo);
      }
      
      // 保存到storage
      uni.setStorageSync('userInfo', basicUserInfo);
      uni.setStorageSync('uni-id-pages-userInfo', basicUserInfo);
      
      // 同时触发登录事件，让用户页面刷新
      uni.$emit('user:login', basicUserInfo);
      uni.$emit('login:success', basicUserInfo);
      
      console.log('已刷新用户信息:', basicUserInfo);
      
      uni.showToast({
        title: '用户信息已刷新',
        icon: 'success'
      });
    },
    
    // 检查手机号是否存在于数据库中
    async checkPhoneExistence(phoneNumber) {
      try {
        // 使用云函数查询手机号是否存在
        const result = await uniCloud.callFunction({
          name: 'login',
          data: { 
            phoneNumber,
            loginType: 'checkMobileExists'
          }
        });
        
        console.log('检查手机号是否存在结果:', result);
        
        if (result && result.result && result.result.exists !== undefined) {
          return result.result.exists;
        }
        
        // 如果还没有该云函数逻辑，尝试查询可能存在用户的表
        const db = uniCloud.database();
        
        // 查询uni-id-users表
        const uniIdResult = await db.collection('uni-id-users')
          .where({
            mobile: phoneNumber
          })
          .limit(1)
          .field({ _id: true })
          .get();
          
        if (uniIdResult && uniIdResult.data && uniIdResult.data.length > 0) {
          console.log('在uni-id-users表中找到手机号');
          return true;
        }
        
        // 查询users表
        const usersResult = await db.collection('users')
          .where({
            phoneNumber
          })
          .limit(1)
          .field({ _id: true })
          .get();
          
        if (usersResult && usersResult.data && usersResult.data.length > 0) {
          console.log('在users表中找到手机号');
          return true;
        }
        
        console.log('未找到该手机号的用户');
        return false;
      } catch (err) {
        console.error('检查手机号存在性时出错:', err);
        // 出错时默认假设存在，避免错误提示
        return false;
      }
    },
  }
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  
  .bg-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .custom-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: transparent;
    
    .nav-content {
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .nav-back {
        position: absolute;
        left: 15px;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .back-icon {
          font-size: 28px;
          font-weight: bold;
          color: #fff;
        }
      }
      
      .nav-title {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
  
  .content {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 60rpx;
    padding-top: calc(44px + var(--status-bar-height));
    
    .header {
      margin-top: 25vh;
      text-align: center;
      
      .logo {
        width: 120rpx;
        height: 120rpx;
      }
    }
    
    .auth-buttons {
      margin-top: 180px;  /* 增加顶部间距，将按钮往下移 */
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .auth-btn {
        position: relative;
        width: 90%;
        height: 90rpx;
        line-height: 90rpx;
        margin-bottom: 30rpx;
        border-radius: 45rpx;
        font-size: 32rpx;
        font-weight: 500;
        
        &.wechat-btn {
          background-color: #07C160;
          color: #fff;
        }
        
        &.other-login-btn {
          background-color: rgba(255, 255, 255, 0.15);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
      }
      
        &.debug-btn {
          background-color: rgba(255, 255, 255, 0.15);
        color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .btn-icon {
          position: absolute;
          left: 30rpx;
          top: 50%;
          transform: translateY(-50%);
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
  
  .footer {
    position: fixed;
    bottom: 40rpx;
    left: 0;
    width: 100%;
    z-index: 1;
    
    .agreement {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 30rpx;
      flex-wrap: wrap;
      
      .dot {
        width: 8rpx;
        height: 8rpx;
        background-color: #fff;  /* 改为白色 */
        border-radius: 50%;
        margin-right: 8rpx;
      }
      
      .agreement-text {
        font-size: 28rpx;  /* 增大字体 */
        color: #fff;  /* 改为白色 */
      }
      
      .link {
        font-size: 28rpx;  /* 增大字体 */
        color: #FF6B00;
      }
    }
  }
}

/* 手机号登录弹窗样式 */
.phone-login-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  
  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  
  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 580rpx;
    border-radius: 12rpx;
    padding: 30rpx;
    
    .modal-title {
      font-size: 32rpx;
      text-align: center;
      margin-bottom: 30rpx;
      font-weight: 500;
      color: #333;
    }
    
    .input-box {
      margin-bottom: 30rpx;
      border-bottom: 1px solid #eee;
      padding: 10rpx 0;
      
      input {
        height: 80rpx;
        font-size: 32rpx;
        width: 100%;
      }
      
      .input-placeholder {
        color: #bbb;
      }
    }
    
    .modal-buttons {
      display: flex;
      justify-content: space-between;
      
      .modal-btn {
        flex: 1;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 30rpx;
        margin: 0 10rpx;
        border-radius: 40rpx;
        
        &::after {
          border: none;
        }
      }
      
      .cancel-btn {
        background-color: #f5f5f5;
        color: #666;
      }
      
      .confirm-btn {
        background-color: #47c76d;
        color: #fff;
      }
    }
  }
}

.captcha-img-box {
    margin: 20rpx 0;
    text-align: center;
    
    .captcha-img {
      width: 100%;
      height: auto;
      border-radius: 8rpx;
    }
    
    .refresh-text {
      display: block;
      font-size: 24rpx;
      color: #47c76d;
      margin-top: 10rpx;
    }
  }

.login-options-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  
  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  .modal-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0 0;
    padding: 30rpx;
    
    .modal-title {
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 40rpx;
    }
    
    .login-options {
      .login-option-item {
        display: flex;
        align-items: center;
        padding: 30rpx 0;
        border-bottom: 1px solid #f1f1f1;
        
        .option-icon {
          font-size: 40rpx;
          margin-right: 20rpx;
        }
        
        .option-text {
          font-size: 32rpx;
          color: #333;
        }
      }
    }
    
    .modal-close {
      margin-top: 40rpx;
      text-align: center;
      
      .close-btn {
        display: inline-block;
        padding: 20rpx 60rpx;
        border-radius: 40rpx;
        background-color: #f5f5f5;
        color: #333;
        font-size: 28rpx;
      }
    }
  }
}

/* 移除了选择登录方式按钮的样式 */
</style> 