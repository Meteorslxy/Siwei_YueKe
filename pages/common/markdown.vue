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
// 简单的Markdown解析
function simpleMarkdown(markdownText) {
  // 基本的markdown转HTML
  let html = markdownText
    // 标题转换
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    
    // 列表转换
    .replace(/^\* (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^- (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^[0-9]+\. (.*$)/gm, '<ol><li>$1</li></ol>')
    
    // 段落转换 - 连续的两个换行符表示段落
    .replace(/\n\n/g, '</p><p>')
    
    // 强调和加粗
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // 链接
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    
    // 代码块
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    
    // 行内代码
    .replace(/`(.*?)`/g, '<code>$1</code>')
    
    // 水平线
    .replace(/^\-\-\-$/gm, '<hr>')
    
    // 引用
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

  // 修复列表标签问题
  html = html
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/<\/ol>\s*<ol>/g, '');
  
  // 确保整个内容被包裹在<p>标签内
  if (!html.startsWith('<')) {
    html = '<p>' + html;
  }
  if (!html.endsWith('>')) {
    html += '</p>';
  }
  
  return html;
}

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
        // 使用内置的简单Markdown解析
        this.markdownHtml = simpleMarkdown(markdownText);
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
  }
  
  .back-icon {
    font-size: 40rpx;
    color: #333;
  }
  
  .title {
    flex: 1;
    text-align: center;
    font-size: 34rpx;
    font-weight: bold;
    margin-right: 80rpx;
  }
}

.content {
  padding: 30rpx;
  
  ::v-deep {
    h1, h2, h3, h4, h5, h6 {
      font-weight: bold;
      margin: 20rpx 0;
      color: #333;
    }
    
    h1 {
      font-size: 40rpx;
      margin-bottom: 30rpx;
    }
    
    h2 {
      font-size: 36rpx;
      margin-top: 30rpx;
      margin-bottom: 20rpx;
    }
    
    h3 {
      font-size: 32rpx;
    }
    
    p {
      margin: 16rpx 0;
      line-height: 1.6;
      font-size: 30rpx;
      color: #333;
    }
    
    ul, ol {
      padding-left: 40rpx;
      margin: 16rpx 0;
    }
    
    li {
      font-size: 30rpx;
      line-height: 1.6;
      color: #333;
      margin: 10rpx 0;
    }
    
    a {
      color: #007aff;
      text-decoration: none;
    }
    
    strong {
      font-weight: bold;
    }
    
    em {
      font-style: italic;
    }
    
    code {
      background-color: #f5f5f5;
      padding: 4rpx 8rpx;
      border-radius: 4rpx;
      font-family: monospace;
    }
    
    pre {
      background-color: #f5f5f5;
      padding: 20rpx;
      border-radius: 8rpx;
      overflow-x: auto;
      margin: 20rpx 0;
      
      code {
        background-color: transparent;
        padding: 0;
      }
    }
    
    blockquote {
      border-left: 8rpx solid #ddd;
      padding: 10rpx 20rpx;
      margin: 20rpx 0;
      color: #666;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20rpx 0;
      
      th, td {
        border: 1rpx solid #ddd;
        padding: 12rpx;
        text-align: left;
      }
      
      th {
        background-color: #f5f5f5;
        font-weight: bold;
      }
    }
  }
}
</style> 