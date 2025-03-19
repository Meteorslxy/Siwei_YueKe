<template>
  <view class="booking-create">
    <view class="form-container">
      <view class="form-item">
        <text class="form-label">联系人</text>
        <input class="form-input" type="text" v-model="formData.studentName" placeholder="请输入联系人姓名" />
      </view>
      
      <view class="form-item">
        <text class="form-label">联系电话</text>
        <input class="form-input" type="number" v-model="formData.contactPhone" placeholder="请输入联系电话" />
      </view>
      
      <view class="form-item">
        <text class="form-label">备注</text>
        <textarea class="form-textarea" v-model="formData.remark" placeholder="请输入备注信息（选填）"></textarea>
      </view>
      
      <view class="agreement">
        <checkbox :checked="agreed" @click="agreed = !agreed" color="#FF6B00" />
        <text class="agreement-text">我已阅读并同意《预约服务条款》</text>
      </view>
    </view>
    
    <view class="footer">
      <view class="price-container">
        <text class="price-label">费用：</text>
        <text class="price-value">¥{{course.price || 0}}</text>
      </view>
      <view class="submit-btn" :class="{'disabled': !canSubmit}" @click="submitBooking">提交预约</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseId: '',
      course: {},
      formData: {
        studentName: '',
        contactPhone: '',
        remark: ''
      },
      agreed: false
    }
  },
  computed: {
    canSubmit() {
      return this.formData.studentName && 
             this.formData.contactPhone && 
             this.agreed;
    }
  },
  onLoad(options) {
    if (options.id) {
      this.courseId = options.id;
      this.getCourseDetail();
    }
  },
  methods: {
    // 获取课程详情
    getCourseDetail() {
      uni.showLoading({ title: '加载中' });
      this.$api.course.getCourseDetail({ id: this.courseId })
        .then(res => {
          this.course = res.data || {};
          uni.setNavigationBarTitle({ title: `预约 - ${this.course.title || ''}` });
        })
        .catch(err => {
          console.error('获取课程详情失败', err);
          uni.showToast({
            title: '获取课程信息失败',
            icon: 'none'
          });
        })
        .finally(() => {
          uni.hideLoading();
        });
    },
    
    // 提交预约
    submitBooking() {
      if (!this.canSubmit) return;
      
      // 表单验证
      if (!/^1\d{10}$/.test(this.formData.contactPhone)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none'
        });
        return;
      }
      
      uni.showLoading({ title: '提交中' });
      
      // 获取用户ID
      const userInfo = uni.getStorageSync('userInfo');
      const userId = userInfo ? JSON.parse(userInfo).userId : '';
      
      // 构建预约数据
      const bookingData = {
        courseId: this.courseId,
        userId: userId,
        studentName: this.formData.studentName,
        contactPhone: this.formData.contactPhone,
        remark: this.formData.remark
      };
      
      // 调用预约接口
      wx.cloud.callFunction({
        name: 'bookCourse',
        data: bookingData,
        success: res => {
          if (res.result && res.result.success) {
            uni.showToast({
              title: '预约成功',
              icon: 'success'
            });
            
            // 预约成功后跳转到预约详情页
            setTimeout(() => {
              uni.redirectTo({
                url: `/pages/booking/detail?id=${res.result.bookingId}`
              });
            }, 1500);
          } else {
            uni.showToast({
              title: res.result.message || '预约失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: err => {
          console.error('预约失败', err);
          uni.showToast({
            title: '预约失败，请重试',
            icon: 'none'
          });
        },
        complete: () => {
          uni.hideLoading();
        }
      });
    }
  }
}
</script>

<style lang="scss">
.booking-create {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
  
  .form-container {
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .form-item {
      margin-bottom: 30rpx;
      
      .form-label {
        display: block;
        font-size: 28rpx;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .form-input {
        width: 100%;
        height: 88rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        padding: 0 20rpx;
        font-size: 28rpx;
        box-sizing: border-box;
      }
      
      .form-textarea {
        width: 100%;
        height: 200rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        padding: 20rpx;
        font-size: 28rpx;
        box-sizing: border-box;
      }
    }
    
    .agreement {
      display: flex;
      align-items: center;
      margin-top: 40rpx;
      
      .agreement-text {
        font-size: 26rpx;
        color: #666;
        margin-left: 10rpx;
      }
    }
  }
  
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 100rpx;
    background-color: #fff;
    padding: 0 30rpx;
    box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .price-container {
      flex: 1;
      
      .price-label {
        font-size: 28rpx;
        color: #666;
      }
      
      .price-value {
        font-size: 36rpx;
        font-weight: bold;
        color: #FF6B00;
      }
    }
    
    .submit-btn {
      width: 240rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background-color: #FF6B00;
      color: #fff;
      font-size: 30rpx;
      border-radius: 40rpx;
      
      &.disabled {
        background-color: #ccc;
      }
    }
  }
}
</style> 