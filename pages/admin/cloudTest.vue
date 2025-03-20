<template>
  <view class="container">
    <view class="header">
      <text class="title">阿里云函数连接测试</text>
    </view>
    
    <view class="info-section">
      <view class="info-item">
        <text class="label">云服务商:</text>
        <text class="value">阿里云</text>
      </view>
      <view class="info-item">
        <text class="label">云环境ID:</text>
        <text class="value">{{spaceId}}</text>
        <text class="copy-btn" @tap="copySpaceId">复制</text>
      </view>
      <view class="info-item">
        <text class="label">当前模式:</text>
        <text class="value" :class="isDevMode ? 'warning' : 'success'">
          {{isDevMode ? '模拟数据模式' : '云服务模式'}}
        </text>
      </view>
    </view>
    
    <view class="mode-selector">
      <view class="section-title">测试模式</view>
      <radio-group @change="onModeChange">
        <label class="mode-item" v-for="(item, index) in testModes" :key="index">
          <radio :value="item.value" :checked="item.value === currentMode" />
          <text>{{item.name}}</text>
        </label>
      </radio-group>
    </view>
    
    <view class="test-panel">
      <view class="panel-title">云函数测试</view>
      
      <view class="test-group">
        <view class="test-name">常规测试</view>
        <view class="test-desc">使用uni.cloud调用云函数</view>
        <button @tap="runTest('normal')" type="primary" :loading="loading.normal">测试</button>
        <view class="result" v-if="results.normal">
          <view class="status" :class="results.normal.success ? 'success' : 'error'">
            {{results.normal.success ? '成功' : '失败'}}
          </view>
          <view class="message">{{results.normal.message}}</view>
        </view>
      </view>
      
      <view class="test-group">
        <view class="test-name">直接初始化测试</view>
        <view class="test-desc">先重新初始化云环境再调用</view>
        <button @tap="runTest('init')" type="primary" :loading="loading.init">测试</button>
        <view class="result" v-if="results.init">
          <view class="status" :class="results.init.success ? 'success' : 'error'">
            {{results.init.success ? '成功' : '失败'}}
          </view>
          <view class="message">{{results.init.message}}</view>
        </view>
      </view>
      
      <view class="test-group">
        <view class="test-name">错误处理测试</view>
        <view class="test-desc">详细显示错误信息</view>
        <button @tap="runTest('error')" type="primary" :loading="loading.error">测试</button>
        <view class="result" v-if="results.error">
          <view class="status" :class="results.error.success ? 'success' : 'error'">
            {{results.error.success ? '成功' : '失败'}}
          </view>
          <view class="message">{{results.error.message}}</view>
          <view class="details" v-if="results.error.details">
            <text selectable>{{results.error.details}}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="actions">
      <button type="default" @tap="checkCloudFiles">检查云函数文件</button>
      <button type="default" @tap="resetCloudEnv">重置云环境</button>
      <button type="warn" @tap="toggleDevMode">
        {{isDevMode ? '切换到云服务模式' : '切换到模拟数据模式'}}
      </button>
    </view>
    
    <view class="log-section" v-if="logs.length > 0">
      <view class="section-title">日志</view>
      <scroll-view scroll-y class="log-content">
        <view v-for="(log, index) in logs" :key="index" class="log-item" :class="log.type">
          <text class="log-time">{{log.time}}</text>
          <text class="log-message" selectable>{{log.message}}</text>
        </view>
      </scroll-view>
      <button size="mini" type="default" @tap="clearLogs">清除日志</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      spaceId: '',
      isDevMode: false,
      currentMode: 'basic', // 默认测试模式
      testModes: [
        { name: '基础连接测试', value: 'basic' },
        { name: '详细信息测试', value: 'detail' },
        { name: '数据库连接测试', value: 'db' },
        { name: '错误处理测试', value: 'error' }
      ],
      loading: {
        normal: false,
        init: false,
        error: false
      },
      results: {
        normal: null,
        init: null,
        error: null
      },
      logs: []
    }
  },
  onLoad() {
    this.spaceId = getApp().globalData.$spaceId || '-';
    this.isDevMode = getApp().globalData.$isDevMode || false;
    this.addLog('info', '页面加载完成，云环境ID: ' + this.spaceId);
  },
  methods: {
    // 切换测试模式
    onModeChange(e) {
      this.currentMode = e.detail.value;
      this.addLog('info', `已切换到测试模式: ${this.currentMode}`);
    },
    
    // 运行测试
    async runTest(type) {
      this.loading[type] = true;
      this.results[type] = null;
      
      try {
        switch(type) {
          case 'normal':
            await this.runNormalTest();
            break;
          case 'init':
            await this.runInitTest();
            break;
          case 'error':
            await this.runErrorTest();
            break;
        }
      } catch (error) {
        this.addLog('error', `${type}测试发生异常: ${error.message}`);
      } finally {
        this.loading[type] = false;
      }
    },
    
    // 常规测试
    async runNormalTest() {
      this.addLog('info', `开始常规测试，模式: ${this.currentMode}...`);
      
      try {
        const result = await uni.cloud.callFunction({
          name: 'test',
          data: {
            message: '常规测试 ' + new Date().toLocaleString(),
            testMode: this.currentMode
          }
        });
        
        this.addLog('success', `常规测试成功: ${JSON.stringify(result.result)}`);
        this.results.normal = {
          success: true,
          message: `调用成功: ${result.result.message || 'OK'}`
        };
      } catch (error) {
        this.addLog('error', `常规测试失败: ${JSON.stringify(error)}`);
        this.results.normal = {
          success: false,
          message: this.formatError(error)
        };
      }
    },
    
    // 初始化测试
    async runInitTest() {
      this.addLog('info', `开始初始化测试，模式: ${this.currentMode}...`);
      
      try {
        // 先清除并重新初始化uni.cloud
        if (uni.cloud) {
          this.addLog('info', '重新初始化云环境...');
          uni.cloud.init({
            provider: 'aliyun',
            spaceId: this.spaceId,
            endpoint: 'https://api.next.bspapp.com'
          });
        }
        
        const result = await uni.cloud.callFunction({
          name: 'test',
          data: {
            message: '初始化测试 ' + new Date().toLocaleString(),
            testMode: this.currentMode
          }
        });
        
        this.addLog('success', `初始化测试成功: ${JSON.stringify(result.result)}`);
        this.results.init = {
          success: true,
          message: `调用成功: ${result.result.message || 'OK'}`
        };
      } catch (error) {
        this.addLog('error', `初始化测试失败: ${JSON.stringify(error)}`);
        this.results.init = {
          success: false,
          message: this.formatError(error)
        };
      }
    },
    
    // 错误处理测试
    async runErrorTest() {
      this.addLog('info', `开始错误处理测试，模式: ${this.currentMode}...`);
      
      try {
        // 使用Promise方式，以便获取更详细的错误信息
        const promise = new Promise((resolve, reject) => {
          uni.cloud.callFunction({
            name: 'test',
            data: { 
              message: '错误处理测试',
              testMode: this.currentMode
            },
            success: (res) => resolve(res),
            fail: (err) => reject(err)
          });
        });
        
        const result = await promise;
        
        this.addLog('success', `错误处理测试成功: ${JSON.stringify(result.result)}`);
        this.results.error = {
          success: true,
          message: `调用成功: ${result.result.message || 'OK'}`
        };
      } catch (error) {
        this.addLog('error', `错误处理测试失败: ${JSON.stringify(error)}`);
        
        const details = `错误类型: ${error.errCode || 'Unknown'}\n` +
                        `错误消息: ${error.errMsg || error.message || 'Unknown'}\n` +
                        `callId: ${error.callId || 'N/A'}\n` +
                        `调用栈: ${error.stack || 'N/A'}`;
        
        this.results.error = {
          success: false,
          message: this.formatError(error),
          details: details
        };
      }
    },
    
    // 格式化错误信息
    formatError(error) {
      if (typeof error === 'string') return error;
      
      let message = '';
      
      if (error.errMsg) {
        // 提取errMsg中的主要错误信息
        const match = error.errMsg.match(/fail\s+(.*?)(?:\s+\(|$)/);
        message = match ? match[1] : error.errMsg;
      } else if (error.message) {
        message = error.message;
      } else {
        message = '未知错误';
      }
      
      return message;
    },
    
    // 检查云函数文件
    checkCloudFiles() {
      this.addLog('info', '检查云函数文件...');
      
      // 在小程序中无法直接检查文件系统
      // 这里提示用户检查HBuilderX中的文件
      uni.showModal({
        title: '云函数文件检查',
        content: '请在HBuilderX中检查以下文件是否存在：\n' +
                 '1. uniCloud-aliyun/cloudfunctions/test/index.js\n' +
                 '2. uniCloud-aliyun/cloudfunctions/test/package.json\n\n' +
                 '并确保这些文件已上传部署到阿里云。',
        showCancel: false
      });
    },
    
    // 重置云环境
    resetCloudEnv() {
      this.addLog('info', '重置云环境...');
      
      if (uni.cloud) {
        uni.cloud.init({
          provider: 'aliyun',
          spaceId: this.spaceId,
          endpoint: 'https://api.next.bspapp.com'
        });
        
        this.addLog('success', '云环境已重置');
        
        uni.showToast({
          title: '云环境已重置',
          icon: 'success'
        });
      } else {
        this.addLog('error', '无法重置云环境，uni.cloud不存在');
        
        uni.showToast({
          title: '重置失败',
          icon: 'none'
        });
      }
    },
    
    // 切换开发模式
    toggleDevMode() {
      this.isDevMode = !this.isDevMode;
      getApp().globalData.$isDevMode = this.isDevMode;
      
      this.addLog('info', `已切换到${this.isDevMode ? '模拟数据' : '云服务'}模式`);
      
      uni.showToast({
        title: `已切换到${this.isDevMode ? '模拟数据' : '云服务'}模式`,
        icon: 'none'
      });
    },
    
    // 复制云环境ID
    copySpaceId() {
      uni.setClipboardData({
        data: this.spaceId,
        success: () => {
          uni.showToast({
            title: '已复制',
            icon: 'success'
          });
        }
      });
    },
    
    // 添加日志
    addLog(type, message) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      this.logs.unshift({
        type,
        time,
        message
      });
      
      // 限制日志数量
      if (this.logs.length > 50) {
        this.logs.length = 50;
      }
      
      // 输出到控制台
      if (type === 'error') {
        console.error(`[${time}] ${message}`);
      } else if (type === 'success') {
        console.log(`[${time}] ✓ ${message}`);
      } else {
        console.log(`[${time}] ${message}`);
      }
    },
    
    // 清除日志
    clearLogs() {
      this.logs = [];
    }
  }
}
</script>

<style>
.container {
  padding: 30rpx;
}

.header {
  margin-bottom: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: var(--theme-color);
}

.info-section {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.info-item {
  display: flex;
  padding: 15rpx 0;
  border-bottom: 1px solid #f2f2f2;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  width: 180rpx;
  color: #666;
}

.value {
  flex: 1;
}

.copy-btn {
  color: var(--theme-color);
  font-size: 24rpx;
  padding: 0 20rpx;
}

.success {
  color: #07c160;
}

.warning {
  color: #ff8d3c;
}

.error {
  color: #fa5151;
}

.mode-selector {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.mode-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.mode-item text {
  margin-left: 10rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 15rpx;
}

.test-panel {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.panel-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.test-group {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid #f2f2f2;
}

.test-group:last-child {
  border-bottom: none;
}

.test-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.test-desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 15rpx;
}

.result {
  margin-top: 15rpx;
  background-color: #f8f8f8;
  padding: 15rpx;
  border-radius: 8rpx;
}

.status {
  font-weight: bold;
  margin-bottom: 10rpx;
}

.details {
  margin-top: 10rpx;
  font-size: 24rpx;
  background-color: #fff;
  padding: 10rpx;
  border-radius: 4rpx;
  white-space: pre-wrap;
  word-break: break-all;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.log-section {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-top: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 15rpx;
}

.log-content {
  max-height: 400rpx;
  margin-bottom: 15rpx;
}

.log-item {
  padding: 10rpx 0;
  font-size: 24rpx;
  border-bottom: 1px solid #f5f5f5;
}

.log-item.error {
  color: #fa5151;
}

.log-item.success {
  color: #07c160;
}

.log-time {
  color: #999;
  margin-right: 10rpx;
}

.log-message {
  word-break: break-all;
}
</style> 