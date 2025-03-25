<template>
  <view class="tools-container">
    <view class="page-header">
      <text class="page-title">系统工具</text>
    </view>
    
    <view class="tool-section">
      <view class="section-title">数据库修复工具</view>
      
      <view class="tool-card">
        <view class="card-header">
          <text class="card-title">预约记录修复</text>
        </view>
        <view class="card-body">
          <view class="description">
            分析并修复预约记录中的状态字段、支付状态、预约编号等问题。
          </view>
          <view class="stats" v-if="bookingStats">
            <view class="stats-item">
              <text class="stats-label">总记录数:</text>
              <text class="stats-value">{{bookingStats.total || 0}}</text>
            </view>
            <view class="stats-item">
              <text class="stats-label">需修复记录:</text>
              <text class="stats-value">{{bookingStats.needsUpdate || 0}}</text>
            </view>
          </view>
          <view class="action-buttons">
            <button class="btn btn-primary" @click="analyzeBookings">分析记录</button>
            <button class="btn btn-danger" @click="fixBookings" 
                    :disabled="!bookingStats || bookingStats.needsUpdate <= 0">
              执行修复
            </button>
          </view>
        </view>
      </view>
      
      <view class="tool-card">
        <view class="card-header">
          <text class="card-title">课程记录修复</text>
        </view>
        <view class="card-body">
          <view class="description">
            分析并修复课程记录中的报名人数、字段缺失等问题。
          </view>
          <view class="stats" v-if="courseStats">
            <view class="stats-item">
              <text class="stats-label">总记录数:</text>
              <text class="stats-value">{{courseStats.total || 0}}</text>
            </view>
            <view class="stats-item">
              <text class="stats-label">需修复记录:</text>
              <text class="stats-value">{{courseStats.needsUpdate || 0}}</text>
            </view>
          </view>
          <view class="action-buttons">
            <button class="btn btn-primary" @click="analyzeCourses">分析记录</button>
            <button class="btn btn-danger" @click="fixCourses" 
                    :disabled="!courseStats || courseStats.needsUpdate <= 0">
              执行修复
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <view class="result-section" v-if="lastResult">
      <view class="section-title">操作结果</view>
      <view class="result-card">
        <view class="result-header">
          <text class="result-title">{{lastResult.title || '操作结果'}}</text>
          <text class="result-time">{{formatTime(lastResult.time)}}</text>
        </view>
        <view class="result-body">
          <text class="result-message">{{lastResult.message || ''}}</text>
          <view class="result-detail" v-if="lastResult.detail">
            <text class="detail-text">{{lastResult.detail}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { fixDatabase } from '@/api/booking.js';

export default {
  data() {
    return {
      bookingStats: null,
      courseStats: null,
      lastResult: null,
      loading: false
    }
  },
  methods: {
    // 分析预约记录
    async analyzeBookings() {
      if (this.loading) return;
      this.loading = true;
      
      uni.showLoading({
        title: '分析中...'
      });
      
      try {
        const result = await fixDatabase({
          collection: 'bookings',
          action: 'analyze'
        });
        
        console.log('分析预约记录结果:', result);
        
        this.bookingStats = result.stats;
        this.lastResult = {
          title: '预约记录分析',
          message: result.message,
          detail: JSON.stringify(result.stats, null, 2),
          time: new Date()
        };
        
        uni.showToast({
          title: '分析完成',
          icon: 'success'
        });
      } catch (error) {
        console.error('分析预约记录失败:', error);
        
        uni.showToast({
          title: '分析失败',
          icon: 'none'
        });
        
        this.lastResult = {
          title: '预约记录分析失败',
          message: error.message,
          time: new Date()
        };
      } finally {
        uni.hideLoading();
        this.loading = false;
      }
    },
    
    // 修复预约记录
    async fixBookings() {
      if (this.loading) return;
      
      // 确认执行修复
      uni.showModal({
        title: '执行修复',
        content: `确定要修复${this.bookingStats.needsUpdate}条预约记录吗？此操作不可撤销。`,
        success: async (res) => {
          if (res.confirm) {
            this.loading = true;
            
            uni.showLoading({
              title: '修复中...'
            });
            
            try {
              const result = await fixDatabase({
                collection: 'bookings',
                action: 'fix'
              });
              
              console.log('修复预约记录结果:', result);
              
              this.bookingStats = result.stats;
              this.lastResult = {
                title: '预约记录修复',
                message: result.message,
                detail: JSON.stringify(result.fixResult, null, 2),
                time: new Date()
              };
              
              uni.showToast({
                title: '修复完成',
                icon: 'success'
              });
            } catch (error) {
              console.error('修复预约记录失败:', error);
              
              uni.showToast({
                title: '修复失败',
                icon: 'none'
              });
              
              this.lastResult = {
                title: '预约记录修复失败',
                message: error.message,
                time: new Date()
              };
            } finally {
              uni.hideLoading();
              this.loading = false;
            }
          }
        }
      });
    },
    
    // 分析课程记录
    async analyzeCourses() {
      if (this.loading) return;
      this.loading = true;
      
      uni.showLoading({
        title: '分析中...'
      });
      
      try {
        const result = await fixDatabase({
          collection: 'courses',
          action: 'analyze'
        });
        
        console.log('分析课程记录结果:', result);
        
        this.courseStats = result.stats;
        this.lastResult = {
          title: '课程记录分析',
          message: result.message,
          detail: JSON.stringify(result.stats, null, 2),
          time: new Date()
        };
        
        uni.showToast({
          title: '分析完成',
          icon: 'success'
        });
      } catch (error) {
        console.error('分析课程记录失败:', error);
        
        uni.showToast({
          title: '分析失败',
          icon: 'none'
        });
        
        this.lastResult = {
          title: '课程记录分析失败',
          message: error.message,
          time: new Date()
        };
      } finally {
        uni.hideLoading();
        this.loading = false;
      }
    },
    
    // 修复课程记录
    async fixCourses() {
      if (this.loading) return;
      
      // 确认执行修复
      uni.showModal({
        title: '执行修复',
        content: `确定要修复${this.courseStats.needsUpdate}条课程记录吗？此操作不可撤销。`,
        success: async (res) => {
          if (res.confirm) {
            this.loading = true;
            
            uni.showLoading({
              title: '修复中...'
            });
            
            try {
              const result = await fixDatabase({
                collection: 'courses',
                action: 'fix'
              });
              
              console.log('修复课程记录结果:', result);
              
              this.courseStats = result.stats;
              this.lastResult = {
                title: '课程记录修复',
                message: result.message,
                detail: JSON.stringify(result.fixResult, null, 2),
                time: new Date()
              };
              
              uni.showToast({
                title: '修复完成',
                icon: 'success'
              });
            } catch (error) {
              console.error('修复课程记录失败:', error);
              
              uni.showToast({
                title: '修复失败',
                icon: 'none'
              });
              
              this.lastResult = {
                title: '课程记录修复失败',
                message: error.message,
                time: new Date()
              };
            } finally {
              uni.hideLoading();
              this.loading = false;
            }
          }
        }
      });
    },
    
    // 格式化时间
    formatTime(time) {
      if (!time) return '';
      
      const date = new Date(time);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    }
  }
}
</script>

<style lang="scss">
.tools-container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
}

.page-header {
  padding: 30rpx 0;
  
  .page-title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin: 30rpx 0 20rpx;
  padding-left: 20rpx;
  border-left: 8rpx solid var(--theme-color);
}

.tool-card {
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  margin-bottom: 30rpx;
  overflow: hidden;
  
  .card-header {
    padding: 20rpx;
    background-color: #f2f2f2;
    border-bottom: 1px solid #eee;
    
    .card-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
    }
  }
  
  .card-body {
    padding: 30rpx 20rpx;
    
    .description {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 20rpx;
    }
    
    .stats {
      background-color: #f9f9f9;
      border-radius: 8rpx;
      padding: 15rpx;
      margin-bottom: 20rpx;
      
      .stats-item {
        display: flex;
        margin-bottom: 10rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .stats-label {
          width: 200rpx;
          font-size: 26rpx;
          color: #666;
        }
        
        .stats-value {
          flex: 1;
          font-size: 26rpx;
          color: #333;
          font-weight: bold;
        }
      }
    }
    
    .action-buttons {
      display: flex;
      justify-content: space-between;
      
      .btn {
        flex: 1;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 8rpx;
        font-size: 28rpx;
        
        &:first-child {
          margin-right: 20rpx;
        }
        
        &.btn-primary {
          background-color: var(--theme-color);
          color: #fff;
        }
        
        &.btn-danger {
          background-color: #ff3b30;
          color: #fff;
          
          &:disabled {
            background-color: #ccc;
            color: #999;
          }
        }
      }
    }
  }
}

.result-card {
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  .result-header {
    padding: 20rpx;
    background-color: #f2f2f2;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    
    .result-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
    }
    
    .result-time {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .result-body {
    padding: 20rpx;
    
    .result-message {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 15rpx;
    }
    
    .result-detail {
      background-color: #f5f5f5;
      border-radius: 8rpx;
      padding: 20rpx;
      
      .detail-text {
        font-size: 24rpx;
        color: #666;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
  }
}
</style> 