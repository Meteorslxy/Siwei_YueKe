<template>
  <view class="markdown-container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="title">{{title}}</text>
    </view>
    
    <view class="content">
      <rich-text :nodes="markdownHtml"></rich-text>
    </view>
  </view>
</template>

<script>
// 引入一个简单的Markdown解析器
import marked from '@/common/utils/marked.min.js';

export default {
  data() {
    return {
      title: '文档',
      path: '',
      markdownHtml: ''
    }
  },
  onLoad(options) {
    if (options.title) {
      this.title = options.title;
    }
    
    if (options.path) {
      this.path = options.path;
      this.loadMarkdownFile();
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    // 加载Markdown文件
    loadMarkdownFile() {
      uni.showLoading({
        title: '加载中'
      });
      
      // 获取小程序环境上下文
      const ctx = uni.getStorageSync('__wxContext') || {};
      // 考虑到小程序环境特殊性，调整文件路径
      let filePath = this.path;
      const isWxMiniProgram = typeof wx !== 'undefined' && wx.getSystemInfoSync;
      
      // 小程序环境特殊处理
      if (isWxMiniProgram) {
        // 显示默认内容
        this.setDefaultContent();
        uni.hideLoading();
        return;
      }
      
      // 通过本地资源加载文件
      try {
        // 先尝试使用uni.request加载文件（适用于H5环境）
        uni.request({
          url: filePath,
          success: (res) => {
            if (typeof res.data === 'string') {
              this.renderMarkdown(res.data);
            } else {
              // 如果返回的不是字符串，可能是本地小程序资源
              this.setDefaultContent();
            }
            uni.hideLoading();
          },
          fail: (err) => {
            console.error('加载Markdown文件失败(request):', err);
            
            // 尝试使用getFileSystemManager（仅原生App环境可用）
            try {
              const fs = uni.getFileSystemManager();
              fs.readFile({
                filePath: this.path,
                encoding: 'utf8',
                success: (res) => {
                  this.renderMarkdown(res.data);
                  uni.hideLoading();
                },
                fail: (fsErr) => {
                  console.error('加载Markdown文件失败(fs):', fsErr);
                  this.setDefaultContent();
                  uni.hideLoading();
                }
              });
            } catch (fsInitErr) {
              console.error('文件系统不可用:', fsInitErr);
              this.setDefaultContent();
              uni.hideLoading();
            }
          }
        });
      } catch (e) {
        console.error('加载过程出错:', e);
        this.setDefaultContent();
        uni.hideLoading();
      }
    },
    
    // 设置默认内容
    setDefaultContent() {
      // 显示错误提示
      this.markdownHtml = '<div style="color: #666; padding: 20px; text-align: center;">加载内容失败</div>';
      
      // 如果找不到文件，提供静态内容
      if (this.title === '隐私政策') {
        this.setDefaultPrivacyPolicy();
      } else if (this.title === '用户协议') {
        this.setDefaultUserAgreement();
      }
    },
    
    // 渲染Markdown内容
    renderMarkdown(markdownText) {
      try {
        // 如果有引入marked库
        if (typeof marked === 'function') {
          this.markdownHtml = marked(markdownText);
        } else {
          // 简单的处理，替换标题和段落
          let html = markdownText
            .replace(/^# (.*)/gm, '<h1>$1</h1>')
            .replace(/^## (.*)/gm, '<h2>$1</h2>')
            .replace(/^### (.*)/gm, '<h3>$1</h3>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>');
          
          this.markdownHtml = html;
        }
      } catch (error) {
        console.error('渲染Markdown失败:', error);
        this.markdownHtml = '<div style="color: red;">渲染失败</div>';
      }
    },
    
    // 设置默认隐私政策
    setDefaultPrivacyPolicy() {
      const defaultPolicy = `
        <h1>隐私政策</h1>
        <p>本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。</p>
        
        <h2>信息收集</h2>
        <p>我们会收集以下信息：</p>
        <ul>
          <li>个人资料：包括您注册时提供的姓名、手机号、电子邮件等</li>
          <li>设备信息：我们可能收集设备型号、操作系统版本等信息</li>
          <li>位置信息：经您授权，我们可能收集您的位置信息</li>
        </ul>
        
        <h2>信息使用</h2>
        <p>我们使用收集的信息用于：</p>
        <ul>
          <li>提供、维护、改进我们的服务</li>
          <li>回应您的请求和提供客户支持</li>
          <li>向您发送服务相关通知</li>
        </ul>
        
        <h2>信息保护</h2>
        <p>我们采取各种安全措施来保护您的个人信息。数据加密、安全协议等技术手段确保您的信息不被未授权访问。</p>
        
        <h2>您的权利</h2>
        <p>您有权访问、更正您的个人信息，您也可以要求删除您的账户。</p>
        
        <h2>隐私政策的更改</h2>
        <p>我们可能会不时更新本隐私政策。我们会通过应用内通知或其他方式告知您重大变更。</p>
        
        <h2>联系我们</h2>
        <p>如您对本隐私政策有任何疑问，请联系我们。</p>
      `;
      
      this.markdownHtml = defaultPolicy;
    },
    
    // 设置默认用户协议
    setDefaultUserAgreement() {
      const defaultAgreement = `
        <h1>用户协议</h1>
        <p>欢迎使用我们的服务！在使用我们的服务之前，请仔细阅读并理解以下用户协议。</p>
        
        <h2>服务内容</h2>
        <p>我们的服务包括但不限于：</p>
        <ul>
          <li>提供信息搜索服务</li>
          <li>提供信息存储服务</li>
          <li>提供信息分享服务</li>
        </ul>
        
        <h2>用户权利</h2>
        <p>您在使用我们的服务时，享有以下权利：</p>
        <ul>
          <li>访问和使用服务的权利</li>
          <li>修改和删除个人信息的权利</li>
          <li>退出服务的权利</li>
        </ul>
        
        <h2>服务使用限制</h2>
        <p>您在使用我们的服务时，应遵守以下限制：</p>
        <ul>
          <li>不得利用我们的服务进行违法活动</li>
          <li>不得侵犯他人的合法权益</li>
          <li>不得干扰我们的正常运营</li>
        </ul>
        
        <h2>隐私保护</h2>
        <p>我们采取各种安全措施来保护您的个人信息。数据加密、安全协议等技术手段确保您的信息不被未授权访问。</p>
        
        <h2>协议的更改</h2>
        <p>我们可能会不时更新本协议。我们会通过应用内通知或其他方式告知您重大变更。</p>
        
        <h2>联系我们</h2>
        <p>如您对本协议有任何疑问，请联系我们。</p>
      `;
      
      this.markdownHtml = defaultAgreement;
    }
  }
}
</script>

<style lang="scss">
.markdown-container {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 30rpx;
}

.header {
  display: flex;
  align-items: center;
  height: 88rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  position: relative;
  
  .back-button {
    width: 80rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .back-icon {
      font-size: 40rpx;
      color: #333;
    }
  }
  
  .title {
    flex: 1;
    text-align: center;
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-right: 80rpx; /* 平衡左侧按钮宽度 */
  }
}

.content {
  padding: 30rpx;
  
  /* Markdown样式 */
  :deep(h1) {
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
    color: #333;
  }
  
  :deep(h2) {
    font-size: 36rpx;
    font-weight: bold;
    margin: 24rpx 0;
    color: #333;
  }
  
  :deep(h3) {
    font-size: 32rpx;
    font-weight: bold;
    margin: 20rpx 0;
    color: #333;
  }
  
  :deep(p) {
    font-size: 30rpx;
    line-height: 1.6;
    margin-bottom: 20rpx;
    color: #666;
  }
  
  :deep(ul), :deep(ol) {
    padding-left: 40rpx;
    margin-bottom: 20rpx;
  }
  
  :deep(li) {
    font-size: 30rpx;
    line-height: 1.6;
    margin-bottom: 10rpx;
    color: #666;
  }
  
  :deep(a) {
    color: #007AFF;
    text-decoration: none;
  }
  
  :deep(strong) {
    font-weight: bold;
  }
  
  :deep(em) {
    font-style: italic;
  }
  
  :deep(code) {
    background-color: #f3f3f3;
    padding: 4rpx 10rpx;
    border-radius: 6rpx;
    font-family: Consolas, Monaco, monospace;
    font-size: 28rpx;
  }
  
  :deep(pre) {
    background-color: #f3f3f3;
    padding: 20rpx;
    border-radius: 8rpx;
    overflow-x: auto;
    margin-bottom: 20rpx;
  }
  
  :deep(blockquote) {
    border-left: 8rpx solid #ddd;
    padding: 10rpx 20rpx;
    margin: 20rpx 0;
    color: #666;
    background-color: #f9f9f9;
  }
}
</style> 