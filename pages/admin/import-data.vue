<template>
  <view class="import-data">
    <view class="header">
      <text class="title">数据导入工具</text>
      <text class="subtitle">集合不存在时会自动创建</text>
    </view>
    
    <view class="section help-section">
      <view class="section-title">使用说明</view>
      <view class="help-content">
        <view class="help-item">1. 选择需要导入的数据集合</view>
        <view class="help-item">2. 选择是否清空现有数据</view>
        <view class="help-item">3. 点击"导入数据"按钮开始导入</view>
        <view class="help-item">4. 导入完成后，数据将直接存储在云数据库中</view>
        <view class="help-item">5. 在开发模式下，可以使用useMock=false切换到真实数据</view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">导入选项</view>
      <view class="form-item">
        <text class="label">选择集合</text>
        <picker @change="onCollectionChange" :value="collectionIndex" :range="collections" class="picker">
          <view class="picker-text">{{ collections[collectionIndex] }}</view>
        </picker>
      </view>
      
      <view class="form-item">
        <text class="label">是否清空现有数据</text>
        <switch :checked="clearExisting" @change="onClearChange" color="var(--theme-color)" />
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">操作</view>
      <view class="button-group">
        <button class="import-btn" @tap="importData" :loading="importing" :disabled="importing">
          {{ importing ? '导入中...' : '导入数据' }}
        </button>
      </view>
    </view>
    
    <view class="section" v-if="logs.length > 0">
      <view class="section-title">操作日志</view>
      <view class="log-list">
        <view v-for="(log, index) in logs" :key="index" class="log-item" :class="{ 'log-success': log.type === 'success', 'log-error': log.type === 'error' }">
          <text class="log-time">{{ log.time }}</text>
          <text class="log-message">{{ log.message }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 从模拟数据中获取数据
import mockData from './mock-data.js'

export default {
  data() {
    return {
      collections: ['courses', 'teachers', 'news', 'users', 'bookings'],
      collectionIndex: 0,
      clearExisting: true,
      importing: false,
      logs: []
    }
  },
  methods: {
    // 选择集合改变
    onCollectionChange(e) {
      this.collectionIndex = e.detail.value
    },
    
    // 清空数据选项改变
    onClearChange(e) {
      this.clearExisting = e.detail.value
    },
    
    // 添加日志
    addLog(message, type = 'info') {
      const now = new Date()
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      
      this.logs.unshift({
        time: timeString,
        message,
        type
      })
    },
    
    // 导入数据
    async importData() {
      if (this.importing) return
      
      this.importing = true
      const collection = this.collections[this.collectionIndex]
      
      // 检查是否有对应的模拟数据
      if (!mockData[collection] || !mockData[collection].length) {
        this.addLog(`集合 ${collection} 没有可用的模拟数据`, 'error')
        this.importing = false
        return
      }
      
      try {
        this.addLog(`开始导入 ${mockData[collection].length} 条数据到集合 ${collection}...`)
        this.addLog(`如果集合不存在将自动创建`, 'info')
        
        // 调用云函数导入数据
        const result = await uni.cloud.callFunction({
          name: 'importData',
          data: {
            collection,
            data: mockData[collection],
            clear: this.clearExisting
          }
        })
        
        if (result.result && result.result.success) {
          this.addLog(result.result.message, 'success')
          
          // 检查集合是否是新创建的
          if (result.result.isNewCollection) {
            this.addLog(`集合 ${collection} 已自动创建或已存在`, 'success')
          }
          
          // 提示用户操作成功
          uni.showToast({
            title: '导入成功',
            icon: 'success'
          })
        } else {
          this.addLog(result.result.message || '导入失败', 'error')
          
          // 提示用户操作失败
          uni.showToast({
            title: '导入失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('导入数据出错:', error)
        this.addLog(`导入数据出错: ${error.message || error}`, 'error')
        
        // 提示用户操作失败
        uni.showToast({
          title: '导入失败',
          icon: 'none'
        })
      } finally {
        this.importing = false
      }
    }
  }
}
</script>

<style lang="scss">
.import-data {
  padding: 30rpx;
  
  .header {
    margin-bottom: 30rpx;
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: var(--text-color);
    }
    
    .subtitle {
      display: block;
      font-size: 24rpx;
      color: var(--text-color-light);
      margin-top: 10rpx;
    }
  }
  
  .section {
    margin-bottom: 40rpx;
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      color: var(--text-color);
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid var(--border-color-light);
      margin-bottom: 20rpx;
    }
    
    .form-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      
      .label {
        font-size: 28rpx;
        color: var(--text-color);
      }
      
      .picker {
        flex: 1;
        text-align: right;
        
        .picker-text {
          font-size: 28rpx;
          color: var(--theme-color);
        }
      }
    }
    
    .button-group {
      padding: 20rpx 0;
      
      .import-btn {
        background-color: var(--theme-color);
        color: #fff;
        font-size: 28rpx;
        border-radius: 50rpx;
      }
    }
    
    .log-list {
      .log-item {
        font-size: 26rpx;
        margin-bottom: 10rpx;
        padding: 10rpx;
        border-radius: 6rpx;
        background-color: #f8f8f8;
        
        &.log-success {
          background-color: #e8f5e9;
          color: #4caf50;
        }
        
        &.log-error {
          background-color: #ffebee;
          color: #f44336;
        }
        
        .log-time {
          margin-right: 10rpx;
          color: #999;
        }
      }
    }
  }
  
  .help-section {
    .help-content {
      padding: 10rpx 0;
      
      .help-item {
        font-size: 26rpx;
        color: var(--text-color);
        line-height: 46rpx;
        padding: 6rpx 0;
        position: relative;
      }
    }
  }
}
</style> 