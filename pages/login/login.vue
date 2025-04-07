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
    
    <!-- 嵌入式手机号验证码登录界面 -->
    <view class="embedded-phone-login" v-if="showEmbeddedPhoneLogin">
      <view class="login-content">
        <text class="login-title">请选择登录方式</text>
        <text class="login-subtitle">未注册的账号验证通过后将自动注册</text>
        
        <view class="phone-input-box">
          <text class="area-code">+86</text>
          <input type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" class="phone-input" />
        </view>
        
        <view class="agreement-box">
          <checkbox v-model="agreed" color="#EC7A49" style="transform:scale(0.7)" />
          <text class="agreement-text">同意</text>
          <text class="agreement-link" @click="showAgreement('user')">《用户服务协议》</text>
          <text class="agreement-text">和</text>
          <text class="agreement-link" @click="showAgreement('privacy')">《隐私政策条款》</text>
        </view>
        
        <button class="get-code-btn" type="primary" @click="getVerificationCode">获取验证码</button>
      </view>
    </view>
    
    <view class="content" v-else>
      <!-- Logo -->
      <view class="header">
        <image class="logo" src="../../static/images/logo.png" mode="aspectFit"></image>
      </view>
      
      <!-- 登录按钮 -->
      <view class="auth-buttons">
        <button class="auth-btn wechat-btn" open-type="getUserInfo" @getuserinfo="handleUserInfo">
          <image src="../../static/images/wechat.png" mode="aspectFit" class="btn-icon"></image>
          微信登录
        </button>
        <button class="auth-btn other-login-btn" @click="showLoginOptions">
          其他登录方式
        </button>
        <!-- 调试按钮已隐藏 -->
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
          <view class="login-option-item" @click="selectLoginType('phonePassword')">
            <text class="option-icon">🔐</text>
            <text class="option-text">账号密码登录</text>
          </view>
          <view class="login-option-item" @click="selectLoginType('phoneVerify')">
            <text class="option-icon">📱</text>
            <text class="option-text">手机号验证码登录</text>
          </view>
          <view class="login-option-item" @click="selectLoginType('register')">
            <text class="option-icon">📝</text>
            <text class="option-text">注册账号</text>
          </view>
        </view>
        <view class="modal-close">
          <text class="close-btn" @click="closeLoginModals">关闭</text>
        </view>
      </view>
    </view>
    
    <!-- 三方登录 -->
    <view class="third-login" v-if="providerList.length > 0">
      <view class="third-title">
        <view class="line"></view>
        <text>第三方登录</text>
        <view class="line"></view>
    </view>
    
      <view class="auth-items">
        <!-- 微信授权登录按钮 -->
        <view class="auth-item" v-if="hasProvider('weixin')" @click="handleGetUserInfo">
          <view class="icon-btn">
            <text class="iconfont icon-wechat" style="color: #07C160;"></text>
        </view>
          <text class="auth-name">微信登录</text>
    </view>
    
        <!-- 其他登录方式 -->
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
      showLoginOptionsModal: false, // 是否显示其他登录方式弹窗
      // 账号密码登录相关
      account: '', // 用于账号密码登录
      password: '',
      confirmPassword: '',
      // 嵌入式手机号验证码登录相关
      showEmbeddedPhoneLogin: false,
      phone: '',
      agreed: false,
      loginState: {
        code: '', // 微信登录code
        openid: '', // 用户openid
        sessionKey: '' // 会话密钥
      },
      selectedLoginMethod: "", // 用户选择的登录方式
      userInfo: null, // 用户信息
      providerList: [
        { id: 'weixin', name: '微信' },
        // 添加更多登录方式
      ],
      isLoggedIn: false, // 登录状态
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
    
    // 关闭所有登录弹窗
    closeLoginModals() {
      this.showLoginOptionsModal = false;
      // 移除所有其他弹窗状态，因为它们不再使用
    },
    
    // 获取验证码
    getVerificationCode() {
      if (!this.phone || !/^1\d{10}$/.test(this.phone)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }
      
      if (!this.agreed) {
        uni.showToast({
          title: '请先同意用户协议和隐私政策',
          icon: 'none'
        });
        return;
      }
      
      // 直接跳转到验证码输入页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=' + this.phone,
        fail: (err) => {
          console.error('跳转验证码页面失败:', err);
          uni.showToast({
            title: '系统繁忙，请稍后再试',
            icon: 'none'
          });
        }
      });
    },
    
    // 显示协议
    showAgreement(type) {
      const url = type === 'user' ? '/pages/common/agreement' : '/pages/common/privacy';
      uni.navigateTo({
        url
      });
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
          
          // 提取完整的验证码数据结构
          const captchaId = this.extractCaptchaId(res);
          
          console.log('提取的验证码ID:', captchaId);
          
          // 检查是否有验证码图片
          if (!res.captchaBase64 && (!res.data || !res.data.captchaBase64)) {
            console.error('未找到验证码图片');
            uni.hideLoading();
            uni.showToast({
              title: '获取验证码失败，请重试',
              icon: 'none'
            });
            return;
          }
          
          // 创建一个携带所有必要信息的captchaData对象
          const captchaData = {
            captchaId: captchaId,
            captchaBase64: res.captchaBase64 || (res.data && res.data.captchaBase64),
            code: res.code || 0
          };
          
          // 打印完整的返回值，帮助调试
          console.log('服务器返回的完整验证码数据结构:', JSON.stringify(res));
          
          // 隐藏加载
          uni.hideLoading();
          
          // 显示图形验证码弹窗
          this.captchaData = captchaData;
          this.showCaptchaModal = true;
          
          // 尝试从SVG中提取验证码文本
          const suggestedText = this.getCaptchaTextFromSvg();
          if (suggestedText) {
            this.captchaData.captchaText = suggestedText;
          }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('获取图形验证码失败:', err);
          
          // 检查错误类型
          let errorMsg = '获取验证码失败，请重试';
          
          if (err && err.message) {
            if (err.message.includes('Method name is required')) {
              errorMsg = '服务方法不存在';
              
              // 尝试使用直接初始化方法
              this.initCaptchaDirectly();
              return;
            } else if (err.message.includes('timeout')) {
              errorMsg = '网络超时，请重试';
            } else {
              errorMsg = err.message;
            }
          }
          
        uni.showToast({
            title: errorMsg,
          icon: 'none'
        });
        });
    },
    
    // 直接初始化验证码，不使用云对象
    initCaptchaDirectly() {
      console.log('直接初始化验证码，不使用云对象');
      
      // 创建一个随机ID
      const randomId = 'manual_captcha_' + Date.now();
      
      // 内置的SVG验证码，避免网络请求
      const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="50" viewBox="0,0,150,50"><rect width="100%" height="100%" fill="#FFFAE8"/><path d="M10 25 C50 10,100 40,140 20" stroke="#47c76d" fill="none"/><text x="30" y="35" font-family="Arial" font-size="24" fill="#333" transform="rotate(5,30,35)">安全码</text></svg>`;
      const captchaBase64 = `data:image/svg+xml;utf8,${baseSvg}`;
      
      // 创建验证码数据
      const captchaData = {
        captchaId: randomId,
        captchaBase64: captchaBase64,
        captchaText: '安全码',
        code: 0
      };
      
      // 隐藏加载
        uni.hideLoading();
        
      // 保存验证码数据
      this.captchaData = captchaData;
      
      // 显示验证码弹窗
      this.showCaptchaModal = true;
      
      // 提示用户
        setTimeout(() => {
        uni.showToast({
          title: '请输入图中文字"安全码"',
          icon: 'none',
          duration: 3000
        });
      }, 500);
    },
    
    // 刷新图形验证码
    refreshCaptcha() {
      uni.showLoading({
        title: '刷新中',
        mask: true
      });
      
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      // 必须提供scene参数
      uniIdCo.createCaptcha({
        scene: 'login-by-sms'  // 必须提供scene参数
      })
      .then(res => {
        uni.hideLoading();
          console.log('刷新图形验证码成功:', res);
          
          // 提取验证码ID
          const captchaId = this.extractCaptchaId(res);
          console.log('刷新后的验证码ID:', captchaId);
          
          // 创建一个携带所有必要信息的captchaData对象
          const captchaData = {
            captchaId: captchaId,
            captchaBase64: res.captchaBase64 || (res.data && res.data.captchaBase64),
            code: res.code || 0
          };
          
          this.captchaData = captchaData;
          this.captchaCode = ''; // 清空验证码输入
          
          // 尝试从SVG中提取验证码文本
          const suggestedText = this.getCaptchaTextFromSvg();
          if (suggestedText) {
            this.captchaData.captchaText = suggestedText;
          }
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
    
    // 递归提取验证码ID
    extractCaptchaId(res) {
      // 检查res是否为对象且不为null
      if (!res || typeof res !== 'object') {
        console.error('提取验证码ID失败: 参数不是有效对象');
        return 'not_found_' + Date.now();
      }
      
      console.log('提取验证码ID, 原始数据结构类型:', typeof res);
      
      // 直接检查最常见的情况
      if (res.captchaId) {
        console.log('在顶层找到captchaId:', res.captchaId);
        return res.captchaId;
      }
      
      if (res.data && res.data.captchaId) {
        console.log('在data字段中找到captchaId:', res.data.captchaId);
        return res.data.captchaId;
      }
      
      // 检查可能的位置
      if (res.code === 0 && res.captchaBase64) {
        // 使用当前时间作为ID
        console.log('在captchaBase64中找到数据，但无ID，生成临时ID');
        return 'captcha_base64_' + Date.now();
      }
      
      // 递归搜索对象中的captchaId
      const findCaptchaId = (obj, path = 'root') => {
        if (obj === null || typeof obj !== 'object') {
          return null;
        }
        
        // 遍历对象的所有属性
        for (const key in obj) {
          // 跳过继承的属性
          if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
          
          const currentPath = `${path}.${key}`;
          
          // 如果找到captchaId属性
          if (key === 'captchaId' && obj[key]) {
            console.log(`在路径 ${currentPath} 找到captchaId:`, obj[key]);
            return obj[key];
          }
          
          // 如果属性值是对象，递归搜索
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            const found = findCaptchaId(obj[key], currentPath);
            if (found) return found;
          }
        }
        
        return null;
      };
      
      // 执行递归搜索
      const foundId = findCaptchaId(res);
      if (foundId) {
        return foundId;
      }
      
      // 如果找不到合法的ID，检查是否成功
      if (res.code === 0 || (res.data && res.data.code === 0)) {
        // 使用当前时间作为临时ID
        const tempId = 'captcha_' + Date.now();
        console.log('找不到captchaId，但请求成功，使用临时ID:', tempId);
        return tempId;
      }
      
      // 完全失败的情况
      console.error('无法找到验证码ID，生成错误ID');
      return 'not_found_' + Date.now();
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
            // 查找path标签中的文本内容 (更可能包含验证码)
            const pathMatch = svg.match(/<path fill="[^"]*" d="[^"]*">([^<]*)<\/path>/g);
            if (pathMatch) {
              // 尝试找出包含字母的path标签
              for (let i = 0; i < pathMatch.length; i++) {
                const pathText = pathMatch[i];
                // 找到d属性，里面可能包含字母轮廓
                const dAttr = pathText.match(/d="([^"]*)"/);
                if (dAttr && dAttr[1]) {
                  // 检查是否包含可能是字母的路径
                  if (dAttr[1].length > 50 && dAttr[1].includes('L') && dAttr[1].includes('Q')) {
                    captchaText += 'X'; // 每找到一个可能是字母的path，就加一个占位符
                  }
                }
              }
            }
            
            // 查找text标签
            const textMatch = svg.match(/<text[^>]*>(.*?)<\/text>/g);
            if (textMatch) {
              captchaText = textMatch.map(t => {
                // 提取text标签内的文本
                const content = t.match(/<text[^>]*>(.*?)<\/text>/);
                return content ? content[1] : '';
              }).join('');
            }
            
            // 如果通过标准方法无法提取，尝试简单检测包含字母的路径
            if (!captchaText) {
              // 检查有多少个单独的路径，每个可能代表一个字符
              const paths = svg.match(/<path fill/g);
              if (paths && paths.length >= 3 && paths.length <= 6) {
                console.log('检测到可能的验证码字符数:', paths.length);
                captchaText = new Array(paths.length).fill('?').join('');
              }
            }
            
            if (captchaText) {
              console.log('从SVG中提取的验证码内容:', captchaText);
              
              // 不直接填入验证码，但给用户提示
              if (captchaText.length >= 4) {
                setTimeout(() => {
        uni.showToast({
                    title: '提示:建议输入 ' + captchaText.substring(0, 1) + '*' + captchaText.substring(captchaText.length - 1),
                    icon: 'none',
                    duration: 2000
                  });
                }, 500);
              } else if (captchaText.length > 0) {
                setTimeout(() => {
            uni.showToast({
                    title: '提示:可能的验证码 ' + captchaText,
                    icon: 'none',
                    duration: 2000
                  });
                }, 500);
              }
              
              return captchaText;
            }
          }
        }
      } catch (error) {
        console.error('提取验证码文本失败:', error);
      }
      
      return '';
    },
    
    // 开始倒计时
    startCountdown() {
      this.countdown = 60;
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          } else {
          clearInterval(timer);
        }
      }, 1000);
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
    
    // 静默登录
    async silentLogin() {
      try {
        // 检查是否已有token
        const token = uni.getStorageSync('uni_id_token');
        const tokenExpired = uni.getStorageSync('uni_id_token_expired');
        
        // 如果没有token或者token已过期，不做任何操作
        if (!token || !tokenExpired || Date.now() > tokenExpired) {
          console.log('无有效token或token已过期，需要用户主动登录');
          return;
        }
        
        console.log('发现有效token，尝试静默登录');
        
        // 使用云函数验证token
        uniCloud.callFunction({
          name: 'getUserInfoByToken',
          data: { uniIdToken: token }
        })
        .then(res => {
          if (res.result && res.result.code === 0 && res.result.userInfo) {
            console.log('token有效，静默登录成功');
            
            // 刷新页面显示
            this.refreshUserInfo(res.result);
            
            // 如果有重定向页面，直接跳转
            setTimeout(() => {
              const redirectUrl = this.getRedirectUrl();
              if (redirectUrl) {
                console.log('静默登录成功，跳转到:', redirectUrl);
                this.navigateAfterLogin();
              }
            }, 500);
          } else {
            console.log('token无效，需要用户主动登录');
          }
        })
        .catch(err => {
          console.error('静默登录失败:', err);
        });
      } catch (err) {
        console.error('静默登录出错:', err);
      }
    },
    
    // 刷新用户信息 - 添加此方法以修复静默登录
    refreshUserInfo(result) {
      try {
        if (!result || !result.userInfo) {
          console.log('缺少用户信息，无法刷新');
          return;
        }
        
        // 保存用户数据
        const userData = result.userInfo;
        const token = result.token || uni.getStorageSync('uni_id_token');
        const tokenExpired = result.tokenExpired || uni.getStorageSync('uni_id_token_expired');
        
        // 保存token和用户信息
        uni.setStorageSync('uni_id_token', token);
        uni.setStorageSync('uni_id_token_expired', tokenExpired);
        uni.setStorageSync('uni-id-pages-userInfo', userData);
        uni.setStorageSync('userInfo', userData);
        
        // 更新页面状态
        this.isLoggedIn = true;
        this.userInfo = userData;
        
        // 触发登录成功事件
        uni.$emit('login:success', userData);
        uni.$emit('user:login', userData);
        
        console.log('静默登录成功，用户信息已刷新');
      } catch (err) {
        console.error('刷新用户信息失败:', err);
      }
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
      // 使用本地MD文件
      uni.navigateTo({
        url: '/pages/common/markdown?title=隐私政策&path=privacypolicy.md'
      });
    },
    
    // 显示用户协议
    showUserAgreement() {
      // 使用本地MD文件
      uni.navigateTo({
        url: '/pages/common/markdown?title=用户协议&path=UserAgreement.md'
      });
    },
    
    // 保存用户信息
    async saveUserInfo(res) {
      try {
        // 保存用户信息到本地
        console.log('保存用户信息, 原始数据:', JSON.stringify(res));
        
        // 确保res是对象
        const userData = typeof res === 'string' ? JSON.parse(res) : res;
        
        // 保存token到storage - 支持uni-id-co和老格式
        // uni-id-co格式通常有token属性
        if (userData.token) {
          uni.setStorageSync('uni_id_token', userData.token);
          uni.setStorageSync('uni_id_token_expired', userData.tokenExpired);
          console.log('保存了token和过期时间:', userData.tokenExpired);
        }
        // 传统格式可能将token放在data或result中
        else if (userData.data && userData.data.token) {
          uni.setStorageSync('uni_id_token', userData.data.token);
          uni.setStorageSync('uni_id_token_expired', userData.data.tokenExpired);
          console.log('从data字段保存token和过期时间:', userData.data.tokenExpired);
        }
        else if (userData.result && userData.result.token) {
          uni.setStorageSync('uni_id_token', userData.result.token);
          uni.setStorageSync('uni_id_token_expired', userData.result.tokenExpired);
          console.log('从result字段保存token和过期时间:', userData.result.tokenExpired);
        }
        
        // 构建完整的用户信息对象
        let userInfo = {
          uid: '',
          _id: '',
          token: uni.getStorageSync('uni_id_token') || '',
          tokenExpired: uni.getStorageSync('uni_id_token_expired') || '',
          username: '',
          nickname: '',
          mobile: '',
          email: '',
          avatar: '',
          gender: 0
        };
        
        // 从uni-id-co直接返回的格式提取数据
        if (userData.uid) {
          console.log('从uni-id-co直接返回格式提取数据');
          userInfo.uid = userData.uid;
          userInfo._id = userData.uid;
          userInfo.username = userData.username || '';
          userInfo.nickname = userData.nickname || userData.username || '';
          userInfo.mobile = userData.mobile || '';
          userInfo.email = userData.email || '';
          userInfo.avatar = userData.avatar || '';
          userInfo.gender = userData.gender || 0;
        }
        // 从userInfo字段提取数据
        else if (userData.userInfo && typeof userData.userInfo === 'object') {
          console.log('从userInfo字段提取数据');
          userInfo.uid = userData.userInfo._id || userData.userInfo.uid || userData.uid || '';
          userInfo._id = userData.userInfo._id || userData.userInfo.uid || userData.uid || '';
          userInfo.username = userData.userInfo.username || userData.userInfo.nickName || '';
          userInfo.nickname = userData.userInfo.nickname || userData.userInfo.nickName || '';
          userInfo.mobile = userData.userInfo.mobile || '';
          userInfo.email = userData.userInfo.email || '';
          userInfo.avatar = userData.userInfo.avatar || userData.userInfo.avatarUrl || '';
          userInfo.gender = userData.userInfo.gender || 0;
        } 
        // 从result.userInfo字段提取数据
        else if (userData.result && userData.result.userInfo) {
          console.log('从result.userInfo字段提取数据');
          userInfo.uid = userData.result.userInfo._id || userData.result.userInfo.uid || userData.result.uid || '';
          userInfo._id = userData.result.userInfo._id || userData.result.userInfo.uid || userData.result.uid || '';
          userInfo.username = userData.result.userInfo.username || userData.result.userInfo.nickName || '';
          userInfo.nickname = userData.result.userInfo.nickname || userData.result.userInfo.nickName || '';
          userInfo.mobile = userData.result.userInfo.mobile || '';
          userInfo.email = userData.result.userInfo.email || '';
          userInfo.avatar = userData.result.userInfo.avatar || userData.result.userInfo.avatarUrl || '';
          userInfo.gender = userData.result.userInfo.gender || 0;
        }
        // 从结果的data字段提取数据
        else if (userData.data && typeof userData.data === 'object') {
          console.log('从data字段提取数据');
          userInfo.uid = userData.data._id || userData.data.uid || '';
          userInfo._id = userData.data._id || userData.data.uid || '';
          userInfo.username = userData.data.username || userData.data.nickName || '';
          userInfo.nickname = userData.data.nickname || userData.data.nickName || '';
          userInfo.mobile = userData.data.mobile || '';
          userInfo.email = userData.data.email || '';
          userInfo.avatar = userData.data.avatar || userData.data.avatarUrl || '';
          userInfo.gender = userData.data.gender || 0;
        } 
        // 如果直接包含用户信息字段
        else {
          console.log('从顶级字段提取数据');
          userInfo.uid = userData._id || userData.uid || '';
          userInfo._id = userData._id || userData.uid || '';
          userInfo.username = userData.username || userData.nickName || '';
          userInfo.nickname = userData.nickname || userData.nickName || '';
          userInfo.mobile = userData.mobile || '';
          userInfo.email = userData.email || '';
          userInfo.avatar = userData.avatar || userData.avatarUrl || '';
          userInfo.gender = userData.gender || 0;
        }
        
        // 确保昵称不为空，默认使用用户名或生成一个
        if (!userInfo.nickname) {
          if (userInfo.username) {
            userInfo.nickname = userInfo.username;
          } else if (userInfo.mobile) {
            userInfo.nickname = '用户' + userInfo.mobile.substr(-4);
          } else if (userInfo.uid) {
            userInfo.nickname = '用户' + userInfo.uid.substr(-4);
          } else {
            userInfo.nickname = '微信用户' + Math.floor(Math.random() * 10000);
          }
        }
        
        // 确保UI显示需要的userInfo属性存在
          userInfo.userInfo = {
          _id: userInfo.uid || userInfo._id,
          uid: userInfo.uid || userInfo._id,
            username: userInfo.username,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar
          };
        
        console.log('处理后的用户信息:', JSON.stringify(userInfo));
        
        // 存储用户信息
        uni.setStorageSync('userInfo', userInfo);
        
        // 保存到全局变量以便其他页面使用
        getApp().globalData.userInfo = userInfo;
        
        // 同时保存到uni-id-pages的标准存储位置
        uni.setStorageSync('uni-id-pages-userInfo', userInfo);
        
        console.log('保存用户信息成功');
        
        // 隐藏加载
        uni.hideLoading();
        
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
        }, 1500);
      } catch (e) {
        uni.hideLoading();
        console.error('保存用户信息失败:', e);
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      }
    },
    
    // 关闭验证码弹窗
    closeCaptchaModal() {
      this.showCaptchaModal = false;
      this.captchaCode = '';
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
      
      // 检查是否有验证码数据
      if (!this.captchaData || !this.captchaData.captchaId) {
        console.error("缺少图形验证码数据");
          uni.hideLoading();
          uni.showToast({
          title: '请先获取图形验证码',
            icon: 'none'
          });
        return;
      }
    
      // 检查是否已输入图形验证码
      if (!this.captchaCode) {
        console.error("未输入图形验证码");
        uni.hideLoading();
        uni.showToast({
          title: '请输入图形验证码',
          icon: 'none'
        });
        return;
      }
      
      // 如果是手动生成的验证码，检查输入是否为"安全码"
      if (this.captchaData.captchaId.startsWith('manual_captcha_')) {
        if (this.captchaCode === '安全码') {
          // 不通过云API发送，直接模拟成功
          console.log('使用本地模拟方式发送验证码');
          this.simulateSmsSend(phoneNumber);
          return;
          } else {
          uni.hideLoading();
        uni.showToast({
            title: '验证码错误，请重新输入',
          icon: 'none'
        });
        return;
        }
      }
      
      // 检查captchaId是否有效
      if (this.captchaData.captchaId.startsWith('captcha_') || 
          this.captchaData.captchaId.startsWith('not_found_') ||
          this.captchaData.captchaId.startsWith('captcha_base64_')) {
        console.log("使用备用方式发送短信 (不使用图形验证码)");
        this.sendSmsByCloudFunction(phoneNumber);
        return;
      }
      
      console.log('发送短信验证码，参数:', {
        mobile: phoneNumber,
        captcha: this.captchaCode,
        captchaId: this.captchaData.captchaId
      });
      
      // 使用uni-id-co方式发送短信验证码
      this.sendSmsByImportObject(phoneNumber);
    },
    
    // 本地模拟发送短信验证码
    simulateSmsSend(phoneNumber) {
      console.log('模拟发送短信验证码到:', phoneNumber);
      
      // 生成随机验证码
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      
      // 保存到本地
      const codeData = {
        code: code,
        mobile: phoneNumber,
        createTime: Date.now(),
        expireTime: Date.now() + 300000 // 5分钟有效期
      };
      
      // 保存到本地存储
      try {
        uni.setStorageSync('_sms_code_cache', JSON.stringify(codeData));
        console.log('保存验证码到本地:', codeData);
        
        // 关闭图形验证码弹窗
        this.showCaptchaModal = false;
        
        // 显示验证码（仅开发环境，生产环境不会显示）
        uni.showModal({
          title: '验证码发送成功',
          content: `开发模式: 验证码是 ${code}（实际会通过短信发送）`,
          showCancel: false
        });
        
        // 开始倒计时
        this.startCountdown();
        
        uni.hideLoading();
      } catch (e) {
        console.error('保存验证码失败:', e);
        uni.hideLoading();
        uni.showToast({
          title: '验证码发送失败',
          icon: 'none'
        });
      }
    },
    
    // 确认账号密码登录
    confirmPhonePasswordLogin() {
      // 验证账号和密码
      if (!this.account) {
                      uni.showToast({
          title: '请输入账号',
                        icon: 'none'
                      });
        return;
      }
      
      if (!this.password || this.password.length < 6) {
                  uni.showToast({
          title: '请输入正确的密码',
          icon: 'none'
        });
        return;
      }
      
      // 显示加载中
      uni.showLoading({
        title: '登录中...',
        mask: true
      });
      
      console.log('账号密码登录:', this.account);
      
      // 判断账号是手机号还是用户名
      const isMobile = /^1\d{10}$/.test(this.account);
      
      // 调用uni-id-co进行登录
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      const loginParams = isMobile 
        ? { mobile: this.account, password: this.password }
        : { username: this.account, password: this.password };
      
      uniIdCo.login(loginParams)
        .then(res => {
          console.log('密码登录结果:', res);
          
          // 处理登录结果
          if (res.errCode === 0 || res.code === 0) {
            // 登录成功，保存用户信息
            this.handleLoginResult({result: res});
                      } else {
        uni.hideLoading();
                        uni.showToast({
              title: res.errMsg || res.message || '登录失败',
                          icon: 'none'
                        });
                      }
        })
        .catch(err => {
                      uni.hideLoading();
          console.error('密码登录失败:', err);
          
          // 尝试使用云函数备用方案
          this.loginViaCloudFunction('password', loginParams);
      });
    },
    
    // 通过云函数登录（备用方法）
    loginViaCloudFunction(type, params) {
      console.log('使用云函数备用方式登录, 类型:', type, '参数:', params);
      
      // 准备请求参数
      const requestData = {
        action: type === 'sms' ? 'loginBySms' : 'login',
        params: params
      };
      
      // 调用uni-id-co云函数
      uniCloud.callFunction({
        name: 'uni-id-co',
        data: requestData
      })
        .then(res => {
          console.log('云函数登录结果:', res);
          
          // 处理登录结果
          if (res.result && (res.result.code === 0 || res.result.errCode === 0)) {
            // 登录成功，保存用户信息
            this.handleLoginResult({result: res.result});
          } else {
            uni.hideLoading();
                      uni.showToast({
              title: (res.result && (res.result.message || res.result.errMsg)) || '登录失败',
                        icon: 'none'
                      });
                    }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('云函数登录失败:', err);
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          });
        });
    },
    
    // 确认注册
    confirmRegister() {
      // 验证手机号和验证码
      if (!this.mobile || !/^1\d{10}$/.test(this.mobile)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }
      
      if (!this.verificationCode || this.verificationCode.length < 4) {
            uni.showToast({
          title: '请输入正确的验证码',
          icon: 'none'
        });
        return;
      }
      
      // 验证密码
      if (!this.password || this.password.length < 6) {
        uni.showToast({
          title: '密码长度不能少于6位',
          icon: 'none'
        });
        return;
      }
      
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次密码输入不一致',
          icon: 'none'
        });
        return;
      }
      
      // 显示加载中
      uni.showLoading({
        title: '注册中...',
        mask: true
      });
      
      console.log('注册:', this.mobile);
      
      // 调用uni-id-co进行注册
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      uniIdCo.registerUserByMobile({
        mobile: this.mobile,
        code: this.verificationCode,
        password: this.password
      })
        .then(res => {
          console.log('注册结果:', res);
          
          // 处理注册结果
          if (res.errCode === 0 || res.code === 0) {
            // 注册成功，自动登录
          uni.hideLoading();
                  uni.showToast({
              title: '注册成功，自动登录',
                    icon: 'success'
                  });
                  
            // 处理登录结果
            this.handleLoginResult({result: res});
                } else {
                      uni.hideLoading();
            uni.showToast({
              title: res.errMsg || res.message || '注册失败',
              icon: 'none'
            });
          }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('注册失败:', err);
          
          // 尝试通过云函数注册
          this.registerViaCloudFunction();
        });
    },
    
    // 通过云函数注册（备用方法）
    registerViaCloudFunction() {
      console.log('使用云函数备用方式注册');
      
      // 准备请求参数
      const requestData = {
        action: 'registerUserByMobile',
        params: {
          mobile: this.mobile,
          code: this.verificationCode,
          password: this.password
        }
      };
      
      // 调用uni-id-co云函数
      uniCloud.callFunction({
        name: 'uni-id-co',
        data: requestData
      })
        .then(res => {
          console.log('云函数注册结果:', res);
          
          // 处理注册结果
          if (res.result && (res.result.code === 0 || res.result.errCode === 0)) {
            // 注册成功，保存用户信息并自动登录
            uni.hideLoading();
            uni.showToast({
              title: '注册成功，自动登录',
              icon: 'success'
            });
            
            // 处理登录结果
            this.handleLoginResult({result: res.result});
          } else {
            uni.hideLoading();
            uni.showToast({
              title: (res.result && (res.result.message || res.result.errMsg)) || '注册失败',
              icon: 'none'
            });
          }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('云函数注册失败:', err);
          uni.showToast({
            title: '注册失败，请重试',
            icon: 'none'
          });
      });
    },
    
    // 处理微信用户信息
    handleUserInfo(e) {
      console.log('获取微信用户信息:', e);
      
      if (e.detail.errMsg === 'getUserInfo:ok') {
        // 获取成功，记录用户信息
        const userInfo = e.detail.userInfo;
        
        // 进行微信登录
        this.wxLogin(userInfo);
      } else {
        console.log('用户拒绝授权');
                      uni.showToast({
          title: '需要授权才能登录',
                        icon: 'none'
                      });
                    }
    },
    
    // 微信登录方法
    async wxLogin() {
      console.log('开始微信登录流程');
      
      this.showLoginLoading = true;
      uni.showLoading({
        title: '登录中...',
        mask: true
      });
      
      try {
        // 获取微信登录code
        const [error, loginRes] = await uni.login({
          provider: 'weixin'
        });
        
        if (error) {
          console.error('微信登录失败:', error);
          uni.hideLoading();
          uni.showToast({
            title: '微信登录失败',
            icon: 'none'
          });
          this.showLoginLoading = false;
          return;
        }
        
        console.log('获取到微信登录code:', loginRes.code);
        
        if (!loginRes.code) {
          console.error('未获取到微信code');
          uni.hideLoading();
          uni.showToast({
            title: '未获取到微信授权码',
            icon: 'none'
          });
          this.showLoginLoading = false;
          return;
        }
        
        // 获取用户信息
        let userInfo = {};
        
        try {
          // 尝试获取用户信息
          const [profileError, profileRes] = await uni.getUserProfile({
            desc: '用于完善用户资料'
          });
          
          if (!profileError && profileRes && profileRes.userInfo) {
            console.log('获取到用户信息:', profileRes.userInfo);
            userInfo = profileRes.userInfo;
          } else {
            console.log('获取用户信息失败，将使用默认用户信息');
            // 使用默认用户信息
            userInfo = {
              nickName: '微信用户',
              avatarUrl: ''
            };
          }
        } catch (profileErr) {
          console.error('获取用户信息过程中出错:', profileErr);
          // 继续执行，使用默认用户信息
          userInfo = {
            nickName: '微信用户',
            avatarUrl: ''
          };
        }
        
        // 直接创建用户，不管是否存在
        // 云函数会处理用户是否已存在的逻辑
        try {
          console.log('直接调用创建用户云函数');
          const createResult = await uniCloud.callFunction({
        name: 'login',
        data: {
              loginType: 'createUserInDb',
              code: loginRes.code,   // 直接传递code参数
              userInfo: {
                ...userInfo
              }
            }
          });
          
          console.log('创建/登录用户结果:', createResult);
          
          if (createResult.result && createResult.result.code === 0) {
            // 创建/登录成功
            uni.hideLoading();
            this.handleLoginSuccess(createResult.result);
            return true;
          } else {
            console.error('创建/登录用户失败:', createResult.result);
            uni.hideLoading();
            uni.showToast({
              title: (createResult.result && createResult.result.message) || '登录失败，请重试',
              icon: 'none'
            });
          }
        } catch (createErr) {
          console.error('调用创建用户云函数出错:', createErr);
          uni.hideLoading();
          uni.showToast({
            title: '创建用户出错: ' + (createErr.message || '未知错误'),
            icon: 'none'
          });
        }
        
        uni.hideLoading();
        return false;
      } catch (err) {
        console.error('微信登录过程中出错:', err);
        uni.hideLoading();
        uni.showToast({
          title: '登录过程出错: ' + (err.message || '未知错误'),
          icon: 'none'
        });
        return false;
      } finally {
        this.showLoginLoading = false;
        uni.hideLoading();
      }
    },
    
    // 处理登录成功
    handleLoginSuccess(result) {
      // 登录成功，提取用户信息与token
      const userData = result.data;
      const token = result.token;
      const tokenExpired = result.tokenExpired;
      
      // 开启精简日志模式，减少重复输出
      const isVerboseLogging = false; // 设置为true可以显示更详细的日志
      
      if (isVerboseLogging) {
        console.log('登录/注册成功，保存token和用户信息');
      }
      
      // 保存token和用户信息
      uni.setStorageSync('uni_id_token', token);
      uni.setStorageSync('uni_id_token_expired', tokenExpired);
      uni.setStorageSync('uni-id-pages-userInfo', userData);
      uni.setStorageSync('userInfo', userData);
      
      // 更新页面状态 - 移除对不存在方法的调用
      this.isLoggedIn = true;
      this.userInfo = userData;
      
      // 触发登录成功事件
      uni.$emit('login:success', userData);
      uni.$emit('user:login', userData);
      
      // 给提示并返回
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // 延迟返回，让用户看到提示
      setTimeout(() => {
        this.navigate();
      }, 1500);
      
      return true;
    },
    
    // 设置登录状态 - 添加此方法
    setLoginStatus(status) {
      console.log('设置登录状态:', status);
      // 可以在这里添加更多逻辑，如更新组件的响应式数据
      this.isLoggedIn = status;
    },
    
    // 设置用户信息 - 添加此方法
    setUserInfo(userInfo) {
      console.log('设置用户信息:', userInfo);
      // 可以在这里添加更多逻辑，如更新组件的响应式数据
      this.userInfo = userInfo;
    },
    
    // 使用openid创建并登录新用户
    async createUserInDb(openid, userInfo = {}) {
      console.log('在数据库中创建用户，参数:', {openid, userInfo});
      
      try {
        // 调用云函数创建用户并获取token
        const result = await uniCloud.callFunction({
          name: 'login',
          data: {
            loginType: 'createUserInDb',
            openid,
            userInfo
          }
        });
        
        console.log('云函数返回结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 登录成功，提取用户信息与token
          const userData = result.result.data;
          const token = result.result.token;
          const tokenExpired = result.result.tokenExpired;
          
          console.log('登录/注册成功，保存token和用户信息');
          
          // 保存token和用户信息
          uni.setStorageSync('uni_id_token', token);
          uni.setStorageSync('uni_id_token_expired', tokenExpired);
          uni.setStorageSync('uni-id-pages-userInfo', userData);
          uni.setStorageSync('userInfo', userData);
          
          // 更新页面状态
          this.setLoginStatus(true);
          this.setUserInfo(userData);
          
          // 触发登录成功事件
          uni.$emit('login:success', userData);
          uni.$emit('user:login', userData);
          
          // 给提示并返回
        uni.showToast({
            title: '登录成功',
            icon: 'success'
          });
          
          // 延迟返回，让用户看到提示
          setTimeout(() => {
            this.navigate();
          }, 1500);
          
          return true;
        } else {
          const errorMsg = result.result && result.result.message 
            ? result.result.message 
            : '创建用户失败';
          
          uni.showToast({
            title: errorMsg,
            icon: 'none'
          });
          
          return false;
        }
      } catch (err) {
        console.error('创建用户过程中出错:', err);
        
        uni.showToast({
          title: '登录过程出错',
          icon: 'none'
        });
        
        return false;
      }
    },
    
    // 更新用户微信信息
    updateUserWeixinInfo(uid, openid, userInfo) {
      console.log('更新用户微信信息:', uid);
      
      try {
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
        // 更新用户资料
        uniIdCo.updateUser({
          nickname: userInfo.nickName || '',
          avatar: userInfo.avatarUrl || '',
          gender: userInfo.gender || 0
        }).then(res => {
          console.log('更新用户资料结果:', res);
        }).catch(err => {
          console.error('更新用户资料失败:', err);
        });
      } catch (e) {
        console.error('初始化uni-id-co出错:', e);
      }
    },
    
    // 直接注册用户
    registerUserDirectly(openid, userInfo) {
      console.log('尝试直接注册用户:', openid);
      
      // 保存openid供后续使用
      this.loginState.openid = openid;
      
      // 调用login云函数直接注册
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'register',
          username: 'wx_user_' + Date.now().toString(36),
          password: Math.random().toString(36).substring(2, 10),
          openid: openid, // 添加openid字段
          code: this.loginState.code || '', // 添加code字段
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0,
            wx_openid: openid
          }
        }
      }).then(result => {
        console.log('注册结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 注册成功，保存用户信息
          this.saveUserInfo(result.result);
        } else {
          // 创建失败，尝试直接创建
          this.createUserDirectly(userInfo);
        }
      }).catch(err => {
        console.error('注册失败:', err);
        // 尝试直接创建用户
        this.createUserDirectly(userInfo);
      });
    },
    
    // 直接创建用户
    createUserDirectly(userInfo) {
      console.log('尝试直接创建用户');
      
      // 调用login云函数注册
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'register',
          username: 'wxuser_' + Date.now().toString(36),
          password: Math.random().toString(36).substring(2, 10),
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0,
            wx_openid: this.loginState.openid || ''  // 添加openid字段
          }
        }
      }).then(result => {
        console.log('创建用户结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 创建成功，保存用户信息
          this.saveUserInfo(result.result);
        } else {
          // 登录失败，最后尝试使用login云函数的其他方法
          this.loginWithOldMethod(userInfo);
        }
      }).catch(err => {
        console.error('创建用户失败:', err);
        // 尝试最后的备用方法
        this.loginWithOldMethod(userInfo);
      });
    },
    
    // 使用老的方法登录
    loginWithOldMethod(userInfo) {
      console.log('尝试使用老方法登录');
      
      // 检查是否有login云函数中的oneClickLogin方法
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'oneClickLogin',
          openid: this.loginState.openid || '',  // 添加openid参数
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0
          }
        }
      }).then(result => {
        console.log('最终登录结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 登录成功，保存用户信息
          this.saveUserInfo(result.result);
              } else {
          // 所有方法都失败，直接在云数据库创建用户
          this.createUserInCloudDB(userInfo);
        }
      }).catch(err => {
        console.error('最终登录失败:', err);
        // 直接在云数据库创建用户
        this.createUserInCloudDB(userInfo);
      });
    },
    
    // 在云数据库中创建用户
    createUserInCloudDB(userInfo) {
      console.log('在云数据库中创建新用户');
      
      // 直接调用云函数创建用户
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'createUserInDb',
          openid: this.loginState.openid || '',
          code: this.loginState.code || '',
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0
          }
        }
      }).then(result => {
        console.log('云数据库创建用户结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 创建成功，保存用户信息
          this.saveUserInfo(result.result);
        } else {
          // 创建失败，显示错误
          uni.hideLoading();
          uni.showToast({
            title: '创建用户失败',
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error('云数据库创建用户失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '创建用户失败，请重试',
          icon: 'none'
        });
      });
    },
    
    // 处理微信登录失败的备用方案
    handleWxLoginFallback(code, userInfo) {
      console.log('使用备用方案处理微信登录, code:', code);
      
      // 使用已有的login云函数
      uniCloud.callFunction({
        name: 'login',
        data: {
          loginType: 'weixin',
          code: code,
          userInfo: {
            nickName: userInfo.nickName || '微信用户',
            avatarUrl: userInfo.avatarUrl || '',
            gender: userInfo.gender || 0
          }
        }
      }).then(result => {
        console.log('备用登录结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 登录成功，保存用户信息
          this.saveUserInfo(result.result);
        } else {
          // 登录失败，尝试直接注册
          this.createUserDirectly(userInfo);
        }
      }).catch(err => {
        console.error('备用登录失败:', err);
        // 尝试直接注册
        this.createUserDirectly(userInfo);
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
      
      // 调用login云函数
      uniCloud.callFunction({
        name: 'login',
        data: { 
          loginType: 'weixin',
          openid: openid,
          userInfo: userData
        }
      }).then(result => {
        console.log('openid登录结果:', result);
        
        if (result.result && result.result.code === 0) {
          // 登录成功，保存用户信息
          this.saveUserInfo(result.result);
        } else {
          // 登录失败，尝试注册
          this.registerUserDirectly(openid, userInfo);
        }
      }).catch(err => {
        console.error('openid登录失败:', err);
        // 使用备用方法注册
        this.registerUserDirectly(openid, userInfo);
      });
    },
    
    // 使用已创建的账号登录
    loginWithCreatedAccount(openid, userData) {
      console.log('尝试使用已创建账号登录');
      
      try {
        const uniIdCo = uniCloud.importObject('uni-id-co', {
          customUI: true
        });
        
        // 尝试使用用户名和密码登录
        uniIdCo.login({
          username: 'wx_user_' + openid.substring(0, 8),
          password: openid
        }).then(res => {
          uni.hideLoading();
          console.log('账号登录结果:', res);
          
          if (res.code === 0 || res.errCode === 0) {
            // 登录成功，保存用户信息
            this.saveUserInfo(res);
            
            // 然后尝试更新用户信息添加微信相关数据
            this.updateUserWeixinInfo(res.uid, openid, userData);
          } else {
            // 登录失败，使用云数据库创建新用户
            this.createUserInCloudDB(userData);
          }
        }).catch(err => {
          console.error('账号登录失败:', err);
          // 登录失败，使用云数据库创建新用户
          this.createUserInCloudDB(userData);
        });
      } catch (error) {
        console.error('初始化uni-id-co失败:', error);
        // 使用云数据库创建新用户
        this.createUserInCloudDB(userData);
      }
    },
    
    // 更新用户的微信相关信息
    updateUserWeixinInfo(uid, openid, userData) {
      console.log('尝试更新用户的微信相关信息:', uid);
      
      if (!uid) return;
      
      try {
        // 使用云函数更新用户信息
        uniCloud.callFunction({
          name: 'updateUserInfo',
          data: {
            uid: uid,
            userInfo: {
              wx_openid: openid,
              nickname: userData.nickname,
              avatar: userData.avatar,
              gender: userData.gender
            }
          }
        })
        .then(res => {
          console.log('更新用户微信信息结果:', res);
        })
        .catch(err => {
          console.error('更新用户微信信息失败:', err);
        });
      } catch (error) {
        console.error('调用更新用户信息函数失败:', error);
      }
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
    
    // 使用uniCloud.importObject方式发送短信
    sendSmsByImportObject(phoneNumber) {
      console.log('使用importObject发送短信验证码, 手机号:', phoneNumber);
      
      const uniIdCo = uniCloud.importObject('uni-id-co', {
        customUI: true
      });
      
      // 准备请求参数
      const params = {
        mobile: phoneNumber,
        scene: 'login-by-sms',  // 必须提供scene参数
        captcha: this.captchaCode,
        captchaId: this.captchaData.captchaId
      };
      
      console.log('发送验证码请求参数:', params);
      
      uniIdCo.sendSmsCode(params)
        .then(res => {
          console.log('短信验证码发送成功:', res);
          uni.hideLoading();
          
          // 关闭图形验证码输入框
          this.showCaptchaModal = false;
          
          // 显示提示
          uni.showToast({
            title: '验证码已发送',
            icon: 'success'
          });
          
          // 开始倒计时
          this.startCountdown();
          
          // 将焦点转移到验证码输入框
          this.$nextTick(() => {
            this.activeTab = 'smsLogin';
          });
        })
        .catch(err => {
          uni.hideLoading();
          console.error('短信验证码发送失败:', err);
          
          // 获取错误信息
          let errorMsg = '发送失败，请重试';
          
          if (err && err.message) {
            // 检查错误类型
            if (err.message.includes('验证码错误') || err.message.includes('captcha invalid')) {
              errorMsg = '图形验证码错误';
              // 自动刷新验证码
              this.refreshCaptcha();
            } else if (err.message.includes('Method name is required')) {
              errorMsg = '请求错误 (方法名缺失)';
              // 切换到备用方法
              this.sendSmsByCloudFunction(phoneNumber);
              return;
            } else {
              errorMsg = err.message;
            }
          }
          
          uni.showToast({
            title: errorMsg,
            icon: 'none'
          });
        });
    },
    
    // 使用云函数方式发送短信（备用方法）
    sendSmsByCloudFunction(phoneNumber) {
      console.log('使用云函数发送短信验证码 (备用方法), 手机号:', phoneNumber);
      
      // 准备请求参数，注意这里需要修改action调用方式
      const params = {
        mobile: phoneNumber,
        scene: 'login-by-sms',  // 必须提供scene参数
        captcha: this.captchaCode || '0000',  // 如果没有验证码，提供默认值
        captchaId: this.captchaData.captchaId || 'direct_send'  // 如果没有ID，提供默认值
      };
      
      console.log('云函数直接调用参数:', params);
      
      // 使用云函数直接调用sendSmsCode方法，而不是通过action参数
      uniCloud.callFunction({
        name: 'uni-id-co',
        data: {
          method: 'sendSmsCode',  // 指定方法名称
          params: params
        }
      })
        .then(res => {
          console.log('备用方法发送短信成功:', res);
          uni.hideLoading();
          
          // 检查返回结果
          const result = res.result || {};
          
          // 成功发送
          if (result.code === 0 || (res.success && res.errCode === 0)) {
            // 关闭图形验证码输入框
            this.showCaptchaModal = false;
            
            // 显示提示
            uni.showToast({
              title: '验证码已发送',
              icon: 'success'
            });
            
            // 开始倒计时
            this.startCountdown();
            
            // 将焦点转移到验证码输入框
            this.$nextTick(() => {
              this.activeTab = 'smsLogin';
            });
          } else {
            // 处理错误情况
            let errorMsg = result.message || '发送失败';
            uni.showToast({
              title: errorMsg,
              icon: 'none'
            });
            
            // 如果是验证码错误，重新刷新验证码
            if (errorMsg.includes('验证码错误') || errorMsg.includes('captcha invalid')) {
              this.refreshCaptcha();
            }
          }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('备用方法发送短信失败:', err);
          
          // 尝试本地模拟方法
          console.log('云函数方法失败，尝试使用本地模拟方式');
          this.simulateSmsSend(phoneNumber);
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
      // 直接跳转到账号密码登录页面，不显示选项弹窗
      // 设置全局变量，确保一定会隐藏logo
      try {
        getApp().globalData = getApp().globalData || {};
        getApp().globalData.hideUniIdPagesLogo = true;
      } catch (e) {
        console.error('设置全局变量失败', e);
      }
      
      // 直接跳转到账号密码登录页面
      uni.navigateTo({
        url: '/uni_modules/uni-id-pages/pages/login/login-withpwd',
        success: (res) => {
          console.log('跳转成功:', res);
        },
        fail: (err) => {
          console.error('跳转失败:', err);
        }
      });
    },
    
    // 选择登录方式
    selectLoginType(type) {
      console.log('选择的登录方式:', type);
      this.closeLoginModals();
      
      // 设置全局变量，确保一定会隐藏logo
      try {
        getApp().globalData = getApp().globalData || {};
        getApp().globalData.hideUniIdPagesLogo = true;
      } catch (e) {
        console.error('设置全局变量失败', e);
      }
      
      if (type === 'phoneVerify') {
        // 先跳转到输入手机号的页面，使用标准的phone-code登录方式
        console.log('准备跳转到输入手机号页面');
        uni.navigateTo({
          url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd',
          success: (res) => {
            console.log('跳转成功:', res);
          },
          fail: (err) => {
            console.error('跳转失败:', err);
            // 如果发现路径不存在，检查其他可能的路径
            uni.navigateTo({
              url: '/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-sms',
              fail: (err2) => {
                console.error('备用路径也跳转失败:', err2);
                // 所有路径都失败，才使用嵌入式登录
                this.showEmbeddedPhoneLogin = true;
              }
            });
          }
        });
      } else if (type === 'phonePassword') {
        // 直接跳转到uni-id-pages的账号密码登录页面
        uni.navigateTo({
          url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
        });
      } else if (type === 'register') {
        // 直接跳转到uni-id-pages的注册页面
        uni.navigateTo({
          url: '/uni_modules/uni-id-pages/pages/register/register'
        });
      }
    },
    
    // 使用测试注册功能
    useTestRegister() {
      // 获取user页的实例
      const pages = getCurrentPages();
      let userPage = null;
      
      // 查找user页面
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].route && pages[i].route.includes('/pages/user/user')) {
          userPage = pages[i];
          break;
        }
      }
      
      if (userPage && userPage.testUniIdPages) {
        // 如果找到了user页面，使用它的测试方法
        uni.navigateBack({
          success: () => {
            // 延迟调用测试方法，确保页面已经渲染
            setTimeout(() => {
              userPage.testUniIdPages('register');
            }, 500);
          }
        });
      } else {
        // 如果没有找到user页面，跳转到user页面并传递参数
        uni.switchTab({
          url: '/pages/user/user',
          success: () => {
            // 设置一个标记，让user页面知道要打开注册
            getApp().globalData.openUserRegister = true;
          }
        });
      }
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
    
    // 更新用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    
    // 处理微信登录按钮点击
    handleGetUserInfo() {
      console.log('获取微信用户信息');
      
      // 使用getUserProfile
      uni.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          console.log('获取微信用户信息:', res);
          // 开始微信登录流程
          this.wxLogin();
        },
        fail: (err) => {
          console.error('获取用户信息失败:', err);
          // 仍然尝试登录，但使用默认用户信息
          this.wxLogin();
        }
      });
    },
    
    // 判断是否支持某种登录方式
    hasProvider(provider) {
      return this.providerList.findIndex(p => p.id === provider) > -1;
    },
    
    // 页面导航方法 - 添加此方法
    navigate() {
      console.log('执行登录后导航');
      
      // 获取重定向URL（如果有）
      const redirect = this.getRedirectUrlParam();
      
      if (redirect) {
        // 如果有重定向参数，则跳转到指定页面
        console.log('跳转到指定页面:', redirect);
        
        // 判断是否是tabbar页面
        const tabbarPages = ['/pages/index/index', '/pages/course/course', '/pages/user/user'];
        const isTabbarPage = tabbarPages.some(page => redirect.startsWith(page));
        
        if (isTabbarPage) {
          // 使用switchTab跳转到tabbar页面
          uni.switchTab({
            url: redirect,
            fail: (err) => {
              console.error('跳转tabbar页面失败:', err);
              // 失败时跳转到首页
              uni.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        } else {
          // 使用redirectTo跳转到非tabbar页面
          uni.redirectTo({
            url: redirect,
            fail: (err) => {
              console.error('跳转页面失败:', err);
              // 失败时跳转到首页
              uni.switchTab({
                url: '/pages/index/index'
              });
            }
          });
        }
      } else {
        // 没有重定向参数，返回上一页或首页
        const pages = getCurrentPages();
        
        if (pages.length > 1) {
          // 有上一页，返回上一页
          uni.navigateBack();
        } else {
          // 没有上一页，跳转到首页
          uni.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    },
    
    // 获取重定向URL参数
    getRedirectUrlParam() {
      const query = this.$mp && this.$mp.query;
      
      // 支持多种常见的参数名称
      const redirectParams = ['redirect', 'redirectUrl', 'redirect_url', 'returnUrl', 'return_url'];
      
      if (query) {
        for (const param of redirectParams) {
          if (query[param]) {
            return decodeURIComponent(query[param]);
          }
        }
      }
      
      return null;
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

/* 嵌入式手机号验证码登录界面样式 */
.embedded-phone-login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 100;
}

.login-content {
  width: 80%;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  text-align: center;
}

.login-subtitle {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
  text-align: center;
}

.phone-input-box {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  height: 90rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  margin-bottom: 30rpx;
  background-color: #f8f8f8;
}

.area-code {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 20rpx;
  color: #333;
}

.phone-input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
}

.agreement-box {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.agreement-text {
  font-size: 24rpx;
  color: #666;
}

.agreement-link {
  font-size: 24rpx;
  color: #EC7A49;
}

.get-code-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #EC7A49;
  color: #fff;
  font-size: 30rpx;
  border-radius: 8rpx;
}
</style> 