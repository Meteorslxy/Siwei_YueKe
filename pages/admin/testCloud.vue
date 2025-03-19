<template>
  <view class="test-container">
    <view class="test-header">
      <text class="test-title">阿里云服务连接测试</text>
    </view>
    
    <view class="test-content">
      <view class="status-box">
        <text class="status-label">服务商:</text>
        <text class="status-value">阿里云 UniCloud</text>
      </view>
      
      <view class="status-box">
        <text class="status-label">云环境ID:</text>
        <text class="status-value">{{spaceId}}</text>
      </view>
      
      <view class="status-box">
        <text class="status-label">连接状态:</text>
        <text class="status-value" :class="{'status-success': connectionStatus === '已连接', 'status-error': connectionStatus === '未连接'}">{{connectionStatus}}</text>
      </view>
      
      <view class="test-actions">
        <button type="primary" @click="runTest" :loading="loading">测试云函数连接</button>
        <button type="default" @click="copySpaceId" style="margin-top: 15px;">复制云环境ID</button>
      </view>
      
      <view class="result-box" v-if="testResult">
        <text class="result-title">测试结果:</text>
        <view class="result-json">
          <text selectable>{{resultJson}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      spaceId: '',
      connectionStatus: '未测试',
      loading: false,
      testResult: null
    }
  },
  computed: {
    resultJson() {
      return this.testResult ? JSON.stringify(this.testResult, null, 2) : '';
    }
  },
  onLoad() {
    this.spaceId = this.$spaceId || '未设置';
  },
  methods: {
    async runTest() {
      this.loading = true;
      this.connectionStatus = '测试中...';
      
      try {
        // 调用云函数测试
        const result = await this.$testConnection();
        this.testResult = result;
        this.connectionStatus = '已连接';
        
        // 更新全局开发模式状态
        this.$isDevMode = false;
      } catch (error) {
        console.error('测试失败', error);
        this.testResult = {
          error: error.message || '未知错误',
          time: new Date().toLocaleString()
        };
        this.connectionStatus = '未连接';
        
        // 更新全局开发模式状态
        this.$isDevMode = true;
      } finally {
        this.loading = false;
      }
    },
    
    copySpaceId() {
      // 复制云环境ID到剪贴板
      uni.setClipboardData({
        data: this.spaceId,
        success: () => {
          uni.showToast({
            title: '云环境ID已复制',
            icon: 'success'
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
.test-container {
  padding: 20px;
  
  .test-header {
    margin-bottom: 30px;
    
    .test-title {
      font-size: 22px;
      font-weight: bold;
      color: var(--theme-color);
    }
  }
  
  .test-content {
    .status-box {
      display: flex;
      margin-bottom: 15px;
      
      .status-label {
        width: 120px;
        font-weight: bold;
      }
      
      .status-value {
        flex: 1;
        &.status-success {
          color: #07c160;
        }
        &.status-error {
          color: #fa5151;
        }
      }
    }
    
    .test-actions {
      margin: 30px 0;
    }
    
    .result-box {
      margin-top: 20px;
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      
      .result-title {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
      }
      
      .result-json {
        background-color: #fff;
        padding: 12px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        overflow-x: auto;
      }
    }
  }
}
</style> 