<template>
  <view class="detail-container">
    <!-- 状态栏 -->
    <view class="status-bar" :class="'status-' + bookingDetail.status">
      <view class="status-icon">
        <text class="iconfont" :class="statusIcon"></text>
      </view>
      <view class="status-info">
        <view class="status-text">{{statusText}}</view>
        <view class="status-desc">{{statusDesc}}</view>
      </view>
    </view>
    
    <!-- 课程信息 -->
    <view class="info-card">
      <view class="card-title">课程信息</view>
      <view class="course-title">{{bookingDetail.courseTitle}}</view>
      <view class="info-row">
        <text class="info-label">预约编号：</text>
        <text class="info-value">{{bookingDetail.bookingId}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">课程时间：</text>
        <text class="info-value">{{formattedCourseTime}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">校区地点：</text>
        <text class="info-value">{{bookingDetail.schoolName}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">预约时间：</text>
        <text class="info-value">{{formatBookingTime(bookingDetail.createTime)}}</text>
      </view>
    </view>
    
    <!-- 学生信息 -->
    <view class="info-card">
      <view class="card-title">学生信息</view>
      <view class="info-row">
        <text class="info-label">学生姓名：</text>
        <text class="info-value">{{bookingDetail.studentName}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">联系电话：</text>
        <text class="info-value">{{bookingDetail.userPhoneNumber || '暂无'}}</text>
      </view>
      <view class="info-row" v-if="bookingDetail.remark">
        <text class="info-label">备注信息：</text>
        <text class="info-value">{{bookingDetail.remark}}</text>
      </view>
    </view>
    
    <!-- 操作区域 -->
    <view class="action-area">
      <view class="action-bar">
        <view class="action-btn outline" @click="goBack">返回列表</view>
        
        <block v-if="bookingDetail.status === 'pending' || bookingDetail.status === 'confirmed_unpaid'">
          <view class="action-btn primary" @click="cancelBooking">取消预约</view>
        </block>
        
        <block v-if="bookingDetail.status === 'confirmed'">
          <view class="action-btn primary" @click="contactTeacher">联系老师</view>
        </block>
      </view>
    </view>
    
    <!-- 取消预约弹窗 -->
    <uni-popup ref="cancelPopup" type="dialog">
      <uni-popup-dialog
        title="取消预约"
        content="确定要取消此预约吗？取消后无法恢复"
        :before-close="true"
        @confirm="confirmCancel"
        @close="closePopup">
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bookingId: '',
      bookingDetail: {
        _id: '',
        bookingId: '',
        courseId: '',
        courseTitle: '',
        courseTime: '',
        courseStartTime: '',
        courseEndTime: '',
        schoolName: '',
        studentName: '',
        userPhoneNumber: '',
        remark: '',
        status: 'pending',
        paymentStatus: '',
        createTime: ''
      }
    }
  },
  onLoad(options) {
    if (options.id) {
      this.bookingId = options.id
      this.fetchBookingDetail()
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  },
  computed: {
    statusIcon() {
      return this.getStatusIcon(this.bookingDetail.status);
    },
    statusText() {
      return this.getStatusText(this.bookingDetail.status, this.bookingDetail.paymentStatus);
    },
    statusDesc() {
      return this.getStatusDesc(this.bookingDetail.status, this.bookingDetail.paymentStatus);
    },
    formattedCourseTime() {
      // 从课程开始和结束时间格式化课程时间
      if (this.bookingDetail.courseStartTime && this.bookingDetail.courseEndTime) {
        return `${this.bookingDetail.courseStartTime} - ${this.bookingDetail.courseEndTime}`;
      } else {
        return this.bookingDetail.courseTime || '暂无';
      }
    }
  },
  methods: {
    // 获取预约详情
    async fetchBookingDetail() {
      if (!this.bookingId) {
        console.error('预约ID为空，无法获取详情')
        uni.showToast({
          title: '参数错误',
          icon: 'none'
        })
        return
      }
      
      uni.showLoading({
        title: '加载中...'
      })
      
      try {
        // 调用云函数获取预约详情
        const res = await uniCloud.callFunction({
          name: 'getBookingDetail',
          data: {
            bookingId: this.bookingId
          }
        })
        
        console.log('预约详情云函数返回结果:', res.result)
        
        if (res.result && res.result.success && res.result.data) {
          // 合并返回的数据
          this.bookingDetail = {
            ...this.bookingDetail,
            ...res.result.data,
            courseTime: res.result.data.courseTime || this.formatCourseTimeFromFields(res.result.data),
            userPhoneNumber: res.result.data.userPhoneNumber || ''
          }
          console.log('获取到预约详情:', this.bookingDetail)
        } else {
          console.error('获取预约详情失败:', res.result)
          uni.showToast({
            title: '获取预约详情失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取预约详情出错:', e)
        uni.showToast({
          title: '获取预约详情失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // 从字段格式化课程时间
    formatCourseTimeFromFields(data) {
      if (data.courseStartTime && data.courseEndTime) {
        return `${data.courseStartTime} - ${data.courseEndTime}`;
      }
      return '';
    },
    
    // 格式化预约时间
    formatBookingTime(timeStr) {
      if (!timeStr) return ''
      
      const date = new Date(timeStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 返回列表
    goBack() {
      // 如果有课程ID，则跳转到课程详情
      if (this.bookingDetail && this.bookingDetail.courseId) {
        // 检查是否是从课程详情页来的
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        
        // 如果前一个页面不是课程详情，且课程未取消，则跳转到课程详情
        if (prevPage && !prevPage.route.includes('/pages/course/detail') && this.bookingDetail.status !== 'cancelled') {
          console.log('返回并跳转到课程详情页');
          uni.redirectTo({
            url: `/pages/course/detail?id=${this.bookingDetail.courseId}`
          });
          return;
        }
      }
      
      // 默认返回上一页
      uni.navigateBack();
    },
    
    // 取消预约
    cancelBooking() {
      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: '确定要取消此次预约吗？',
        success: async (res) => {
          if (res.confirm) {
            uni.showLoading({ title: '取消中...' });
      
      try {
              // 获取当前用户ID
              const userInfoStr = uni.getStorageSync('userInfo');
              let userId = '';
              if (userInfoStr) {
                try {
                  const userInfo = JSON.parse(userInfoStr);
                  userId = userInfo.userId || userInfo._id || '';
                } catch (e) {
                  console.error('解析用户信息失败:', e);
                }
              }
              
              // 确保bookingId有值
              const bookingId = this.bookingDetail._id || this.bookingId;
              if (!bookingId) {
                console.error('预约ID无效');
                uni.showToast({
                  title: '预约ID无效',
                  icon: 'none'
                });
                uni.hideLoading();
                return;
              }
              
              // 标记是否更新成功
              let updateSuccess = false;
        
              // 尝试方法1：使用cancelBooking云函数
              try {
                console.log('尝试方法1：使用cancelBooking云函数');
                const cloudResult = await uniCloud.callFunction({
          name: 'cancelBooking',
          data: {
                    bookingId: bookingId,
                    userId: userId
          }
                });
        
                console.log('方法1结果:', cloudResult.result);
        
                if (cloudResult.result && cloudResult.result.success) {
                  updateSuccess = true;
                  console.log('方法1成功：使用cancelBooking云函数更新成功');
                }
              } catch (err1) {
                console.error('方法1失败:', err1);
              }
              
              // 无论是否成功更新数据库，都更新本地状态
              this.bookingDetail.status = 'cancelled';
              this.bookingDetail.cancelTime = new Date().toISOString();
              
              if (updateSuccess) {
          uni.showToast({
            title: '取消成功',
            icon: 'success'
                });
              } else {
                console.log('云端更新失败，仅更新本地状态');
                uni.showToast({ 
                  title: '取消成功(仅本地)', 
                  icon: 'success'
                });
              }
          
              // 保存到本地存储
              this.saveToLocalStorage();
              
              // 标记预约状态已变更，通知其他页面刷新
              uni.setStorageSync('booking_changed', 'true');
          
              // 发送取消事件，更新相关页面
          uni.$emit('booking:cancel', {
                courseId: this.bookingDetail.courseId || '',
                userId: userId,
                bookingId: bookingId
          });
          
              // 通知预约列表页面刷新数据
          setTimeout(() => {
                uni.navigateBack();
              }, 1000);
            } catch (e) {
              console.error('取消预约失败:', e);
              uni.showToast({ 
                title: '取消失败，请稍后重试', 
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // 保存已取消的预约到本地存储
    saveToLocalStorage() {
      try {
        if (!this.bookingDetail || !this.bookingDetail._id) return;
        
        // 保存已取消的预约数据
        const key = `cancelled_booking_${this.bookingDetail._id}`;
        uni.setStorageSync(key, JSON.stringify({
          ...this.bookingDetail,
          status: 'cancelled',
          cancelTime: this.bookingDetail.cancelTime || new Date().toISOString()
        }));
        
        // 记录最近取消的预约ID列表
        let cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
        try {
          cancelledIds = JSON.parse(cancelledIds);
          if (!Array.isArray(cancelledIds)) {
            cancelledIds = [];
          }
        } catch (e) {
          console.error('解析已取消预约ID列表失败:', e);
          cancelledIds = [];
        }
        
        // 检查是否已经存在
        if (!cancelledIds.includes(this.bookingDetail._id)) {
          // 添加到列表头部
          cancelledIds.unshift(this.bookingDetail._id);
          // 最多保存20条
          if (cancelledIds.length > 20) {
            cancelledIds = cancelledIds.slice(0, 20);
          }
          // 保存更新后的ID列表
          uni.setStorageSync('cancelled_booking_ids', JSON.stringify(cancelledIds));
        }
        
        console.log('已保存已取消预约数据:', this.bookingDetail._id);
      } catch (e) {
        console.error('保存已取消预约数据失败:', e);
      }
    },
    
    // 联系老师
    contactTeacher() {
      // 检查是否有联系电话
      const phoneNumber = this.bookingDetail.userPhoneNumber || this.bookingDetail.teacherPhone || '';
      
      if (!phoneNumber) {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }
      
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 获取状态图标
    getStatusIcon(status) {
      switch(status) {
        case 'pending':
          return 'icon-time';
        case 'confirmed':
          return 'icon-check-circle';
        case 'finished':
          return 'icon-success';
        case 'cancelled':
          return 'icon-close-circle';
        default:
          return 'icon-help';
      }
    },
    
    // 获取状态文本
    getStatusText(status, paymentStatus) {
      // 如果支付状态为已付款，优先显示已支付状态
      if (paymentStatus === 'paid') {
        return status === 'confirmed' ? '已确认（已缴费）' : 
               status === 'finished' ? '已完成' : 
               status === 'cancelled' ? '已取消' : '已缴费';
      }
      
      switch(status) {
        case 'pending':
          return '待确认（未缴费）';
        case 'confirmed_unpaid':
          return '已确认（未缴费）';
        case 'confirmed':
          return paymentStatus === 'paid' ? '已确认（已缴费）' : '已确认（未缴费）';
        case 'finished':
          return '已完成';
        case 'cancelled':
          return '已取消';
        default:
          return '未知状态';
      }
    },
    
    // 获取状态描述
    getStatusDesc(status, paymentStatus) {
      // 如果支付状态为已付款，优先显示已支付状态的描述
      if (paymentStatus === 'paid') {
        return status === 'confirmed' ? '教师已确认您的预约，您已完成缴费，请按时参加课程' : 
               status === 'finished' ? '课程已顺利完成，感谢您的参与' : 
               status === 'cancelled' ? '预约已取消' : '您已完成缴费，等待教师确认';
      }
      
      switch(status) {
        case 'pending':
          return '您的预约正在等待教师确认，未缴费状态可随时取消';
        case 'confirmed_unpaid':
          return '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'confirmed':
          return paymentStatus === 'paid' ? '教师已确认您的预约，您已完成缴费，请按时参加课程' : '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'finished':
          return '课程已顺利完成，感谢您的参与';
        case 'cancelled':
          return '预约已取消';
        default:
          return '';
      }
    },
  }
}
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
  position: relative;
}

/* 图标样式 */
.iconfont {
  font-family: "iconfont";
  font-size: 48rpx;
  font-style: normal;
  display: inline-block;
  
  &.icon-time:before { content: "\e657"; }
  &.icon-check-circle:before { content: "\e645"; }
  &.icon-success:before { content: "\e6b3"; }
  &.icon-close-circle:before { content: "\e646"; }
  &.icon-help:before { content: "\e6a8"; }
}

/* 状态栏 */
.status-bar {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  color: #fff;
  
  &.status-pending {
    background: linear-gradient(to right, #FF9500, #FF7800);
  }
  
  &.status-confirmed {
    background: linear-gradient(to right, #4CD964, #3CC651);
  }
  
  &.status-finished {
    background: linear-gradient(to right, #007AFF, #0055CC);
  }
  
  &.status-cancelled {
    background: linear-gradient(to right, #8E8E93, #636366);
  }
  
  .status-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30rpx;
    
    .iconfont {
      font-size: 60rpx;
    }
  }
  
  .status-info {
    flex: 1;
    
    .status-text {
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .status-desc {
      font-size: 26rpx;
      opacity: 0.8;
    }
  }
}

/* 信息卡片 */
.info-card {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  
  .card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid $theme-color;
  }
  
  .course-title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20rpx;
  }
  
  .info-row {
    display: flex;
    margin-bottom: 16rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 160rpx;
      font-size: 28rpx;
      color: $text-color-grey;
    }
    
    .info-value {
      flex: 1;
      font-size: 28rpx;
      color: $text-color;
    }
  }
}

/* 操作区域 */
.action-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .action-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30rpx;
    
    .action-btn {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 40rpx;
      font-size: 28rpx;
      
      &.outline {
        border: 1rpx solid $theme-color;
        color: $theme-color;
      }
      
      &.primary {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }
}
</style> 