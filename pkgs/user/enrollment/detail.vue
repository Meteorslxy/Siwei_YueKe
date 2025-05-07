<template>
  <view class="detail-container">
    <!-- 状态卡片 -->
    <view class="status-card">
      <view class="status-icon" :class="getStatusIconClass(enrollment.status)">
        <text class="iconfont" :class="getStatusIcon(enrollment.status)"></text>
      </view>
      <view class="status-title">{{getStatusText(enrollment.status)}}</view>
      <view class="status-desc">{{getStatusDesc(enrollment.status)}}</view>
    </view>
    
    <!-- 讲座信息 -->
    <view class="info-card">
      <view class="card-title">讲座信息</view>
      <view class="info-item">
        <text class="item-label">讲座名称</text>
        <text class="item-value">{{enrollment.courseTitle || '未命名讲座'}}</text>
      </view>
      <view class="info-item">
        <text class="item-label">校区</text>
        <text class="item-value">{{enrollment.schoolName || '未设置'}}</text>
      </view>
      <view class="info-item">
        <text class="item-label">开始时间</text>
        <text class="item-value">{{formatDateTime(enrollment.courseStartTime)}}</text>
      </view>
      <view class="info-item">
        <text class="item-label">结束时间</text>
        <text class="item-value">{{formatDateTime(enrollment.courseEndTime)}}</text>
      </view>
    </view>
    
    <!-- 报名信息 -->
    <view class="info-card">
      <view class="card-title">报名信息</view>
      <view class="info-item">
        <text class="item-label">姓名</text>
        <text class="item-value">{{enrollment.studentName || '未填写'}}</text>
      </view>
      <view class="info-item">
        <text class="item-label">联系电话</text>
        <text class="item-value">{{enrollment.contactPhone || '未填写'}}</text>
      </view>
      <view class="info-item">
        <text class="item-label">报名时间</text>
        <text class="item-value">{{formatDateTime(enrollment.createTime)}}</text>
      </view>
      <view class="info-item" v-if="enrollment.status === 'cancelled'">
        <text class="item-label">取消时间</text>
        <text class="item-value">{{formatDateTime(enrollment.cancelTime)}}</text>
      </view>
      <view class="info-item" v-if="enrollment.status === 'cancelled' && enrollment.cancelReason">
        <text class="item-label">取消原因</text>
        <text class="item-value">{{enrollment.cancelReason}}</text>
      </view>
      <view class="info-item" v-if="enrollment.enrollmentId">
        <text class="item-label">报名编号</text>
        <text class="item-value">{{enrollment.enrollmentId}}</text>
      </view>
      <view class="info-item" v-if="enrollment.remark">
        <text class="item-label">备注</text>
        <text class="item-value">{{enrollment.remark}}</text>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-bar" v-if="canCancel(enrollment.status)">
      <button class="cancel-btn" @click="cancelEnrollment">取消报名</button>
    </view>
    
    <view class="action-bar" v-else-if="enrollment.status === 'cancelled'">
      <button class="re-enroll-btn" @click="reEnroll">重新报名</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      enrollmentId: '',
      enrollment: {},
      loading: true
    };
  },
  onLoad(options) {
    if (options.id) {
      this.enrollmentId = options.id;
      this.getEnrollmentDetail();
    } else {
      uni.showToast({
        title: '缺少报名ID',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  methods: {
    // 获取报名详情
    async getEnrollmentDetail() {
      this.loading = true;
      
      try {
        uni.showLoading({
          title: '加载中...'
        });
        
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) {
          uni.hideLoading();
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
          return;
        }
        
        const result = await this.$api.user.getEnrollmentDetail(this.enrollmentId);
        
        uni.hideLoading();
        this.loading = false;
        
        if (result && result.code === 0 && result.data) {
          this.enrollment = result.data.enrollment || {};
          console.log('报名详情:', this.enrollment);
        } else {
          uni.showToast({
            title: result.message || '获取报名详情失败',
            icon: 'none'
          });
          
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        }
      } catch (error) {
        uni.hideLoading();
        this.loading = false;
        console.error('获取报名详情失败:', error);
        
        uni.showToast({
          title: '获取报名详情失败',
          icon: 'none'
        });
        
        setTimeout(() => {
          uni.navigateBack();
        }, 1500);
      }
    },
    
    // 取消报名
    cancelEnrollment() {
      uni.showModal({
        title: '取消报名',
        content: '确定要取消该报名吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({
                title: '取消中...'
              });
              
              const result = await this.$api.user.cancelEnrollment(this.enrollmentId);
              
              uni.hideLoading();
              
              if (result && result.code === 0) {
                uni.showToast({
                  title: '取消成功',
                  icon: 'success'
                });
                
                // 更新本地状态
                this.enrollment.status = 'cancelled';
                this.enrollment.cancelTime = new Date();
                
                // 发送取消报名事件
                uni.$emit('enrollment:cancel', {
                  courseId: this.enrollment.courseId,
                  enrollmentId: this.enrollmentId
                });
              } else {
                uni.showToast({
                  title: result.message || '取消失败',
                  icon: 'none'
                });
              }
            } catch (error) {
              uni.hideLoading();
              console.error('取消报名失败:', error);
              
              uni.showToast({
                title: '取消失败',
                icon: 'none'
              });
            }
          }
        }
      });
    },
    
    // 重新报名
    reEnroll() {
      if (!this.enrollment.courseId) {
        uni.showToast({
          title: '无法获取讲座信息',
          icon: 'none'
        });
        return;
      }
      
      uni.navigateTo({
        url: `/pages/lecture/detail?id=${this.enrollment.courseId}`
      });
    },
    
    // 格式化日期时间
    formatDateTime(timestamp) {
      if (!timestamp) return '未设置';
      
      try {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } catch (e) {
        console.error('格式化日期时间失败:', e);
        return '未设置';
      }
    },
    
    // 获取状态文本
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return '待确认';
        case 'confirmed':
          return '已确认';
        case 'cancelled':
          return '已取消';
        case 'completed':
          return '已完成';
        default:
          return '未知状态';
      }
    },
    
    // 获取状态描述
    getStatusDesc(status) {
      switch (status) {
        case 'pending':
          return '您的报名正在处理中，请耐心等待';
        case 'confirmed':
          return '您的报名已确认，请按时参加讲座';
        case 'cancelled':
          return '您已取消该报名';
        case 'completed':
          return '讲座已结束，感谢您的参与';
        default:
          return '';
      }
    },
    
    // 获取状态图标
    getStatusIcon(status) {
      switch (status) {
        case 'pending':
          return 'icon-time';
        case 'confirmed':
          return 'icon-success';
        case 'cancelled':
          return 'icon-cancel';
        case 'completed':
          return 'icon-completed';
        default:
          return 'icon-info';
      }
    },
    
    // 获取状态图标样式类
    getStatusIconClass(status) {
      switch (status) {
        case 'pending':
          return 'status-pending';
        case 'confirmed':
          return 'status-confirmed';
        case 'cancelled':
          return 'status-cancelled';
        case 'completed':
          return 'status-completed';
        default:
          return '';
      }
    },
    
    // 检查是否可以取消
    canCancel(status) {
      return status === 'pending' || status === 'confirmed';
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 30rpx;
  padding-bottom: 150rpx;
}

/* 状态卡片 */
.status-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 40rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .status-icon {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
    
    .iconfont {
      font-size: 60rpx;
      color: #fff;
    }
    
    &.status-pending {
      background-color: #FF9500;
    }
    
    &.status-confirmed {
      background-color: #4CD964;
    }
    
    &.status-cancelled {
      background-color: #8E8E93;
    }
    
    &.status-completed {
      background-color: #007AFF;
    }
  }
  
  .status-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }
  
  .status-desc {
    font-size: 28rpx;
    color: #999;
    text-align: center;
  }
}

/* 信息卡片 */
.info-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    position: relative;
    padding-left: 20rpx;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8rpx;
      height: 32rpx;
      width: 6rpx;
      background-color: #FF6B00;
      border-radius: 3rpx;
    }
  }
  
  .info-item {
    display: flex;
    margin-bottom: 20rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .item-label {
      font-size: 28rpx;
      color: #999;
      width: 180rpx;
    }
    
    .item-value {
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }
  }
}

/* 操作栏 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .cancel-btn, .re-enroll-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 45rpx;
    font-size: 32rpx;
    font-weight: bold;
  }
  
  .cancel-btn {
    background-color: #FF3B30;
    color: #fff;
  }
  
  .re-enroll-btn {
    background-color: #FF6B00;
    color: #fff;
  }
}
</style> 