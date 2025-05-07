<template>
  <view class="edit-field-container">
    <view class="content-wrapper">
      <view class="header">
        <view class="back-button" @click="goBack">
          <text>←</text>
        </view>
        <text class="title">{{title}}</text>
        <view class="save-button" @click="saveField">
          <text>保存</text>
        </view>
      </view>
      
      <view class="edit-form">
        <!-- 普通文本输入 -->
        <view v-if="fieldType === 'text'" class="form-item">
          <input 
            class="input" 
            v-model="fieldValue" 
            :placeholder="'请输入' + title"
            :maxlength="fieldMaxLength"
            focus
          />
          <text class="count">{{fieldValue.length}}/{{fieldMaxLength}}</text>
        </view>
        
        <!-- 多行文本输入(用于个人简介) -->
        <view v-if="fieldType === 'textarea'" class="form-item">
          <textarea 
            class="textarea" 
            v-model="fieldValue" 
            :placeholder="'请输入' + title"
            :maxlength="fieldMaxLength"
            auto-height
            focus
          />
          <text class="count">{{fieldValue.length}}/{{fieldMaxLength}}</text>
        </view>
        
        <!-- 性别选择 -->
        <view v-if="fieldType === 'gender'" class="form-item">
          <view 
            class="gender-option" 
            :class="{'selected': fieldValue == 1}"
            @click="fieldValue = 1"
          >
            <text>男</text>
          </view>
          <view 
            class="gender-option" 
            :class="{'selected': fieldValue == 2}"
            @click="fieldValue = 2"
          >
            <text>女</text>
          </view>
        </view>
        
        <!-- 日期选择 -->
        <view v-if="fieldType === 'date'" class="form-item">
          <picker 
            mode="date" 
            :value="fieldValue" 
            @change="onDateChange"
            fields="day"
            start="1900-01-01"
            :end="currentDate"
          >
            <view class="date-picker">
              <text>{{fieldValue || '请选择日期'}}</text>
            </view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      field: '', // 当前编辑的字段名
      title: '', // 页面标题
      fieldValue: '', // 字段值
      fieldType: 'text', // 字段类型：text/textarea/gender/date
      fieldMaxLength: 20, // 默认最大长度
      isLoading: false,
      currentDate: ''
    }
  },
  onLoad(options) {
    // 获取传递的参数
    this.field = options.field || '';
    this.title = options.title || '编辑';
    this.fieldValue = decodeURIComponent(options.value || '');
    
    // 根据字段名设置字段类型和最大长度
    this.setFieldTypeAndLength();
    
    // 获取当前日期（用于日期选择器）
    const now = new Date();
    this.currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  },
  methods: {
    // 设置字段类型和最大长度
    setFieldTypeAndLength() {
      switch(this.field) {
        case 'nickname':
          this.fieldType = 'text';
          this.fieldMaxLength = 20;
          break;
        case 'username':
          this.fieldType = 'text';
          this.fieldMaxLength = 20;
          break;
        case 'gender':
          this.fieldType = 'gender';
          this.fieldValue = parseInt(this.fieldValue) || 0;
          break;
        case 'birthday':
          this.fieldType = 'date';
          break;
        case 'location':
          this.fieldType = 'text';
          this.fieldMaxLength = 50;
          break;
        case 'introduction':
          this.fieldType = 'textarea';
          this.fieldMaxLength = 200;
          break;
        default:
          this.fieldType = 'text';
          this.fieldMaxLength = 20;
      }
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 日期变更
    onDateChange(e) {
      this.fieldValue = e.detail.value;
    },
    
    // 保存字段
    async saveField() {
      if (this.isLoading) return;
      
      // 检查必填项
      if ((this.fieldType === 'text' || this.fieldType === 'textarea') && !this.fieldValue.trim()) {
        uni.showToast({
          title: this.title + '不能为空',
          icon: 'none'
        });
        return;
      }
      
      this.isLoading = true;
      
      // 显示加载状态
      uni.showLoading({
        title: '保存中...'
      });
      
      try {
        // 首先从存储中获取用户信息
        const userInfoStr = uni.getStorageSync('userInfo');
        const userInfo = userInfoStr ? (typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr) : {};
        
        // 更新用户信息
        userInfo[this.field] = this.fieldValue;
        
        // 保存到本地存储
        uni.setStorageSync('userInfo', userInfo);
        
        // 获取用户ID和token
        const userId = userInfo._id || userInfo.uid;
        const token = uni.getStorageSync('uni_id_token');
        
        if (!userId) {
          throw new Error('用户ID不存在');
        }
        
        // 调用云函数更新用户信息
        const updateData = {};
        updateData[this.field] = this.fieldValue;
        
        const result = await uniCloud.callFunction({
          name: 'updateUserProfile',
          data: {
            userId,
            uniIdToken: token,
            userInfo: updateData
          }
        });
        
        if (result.result && result.result.code === 0) {
          uni.hideLoading();
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          });
          
          // 同步更新uni-id-pages的用户信息
          const uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
          uniIdUserInfo[this.field] = this.fieldValue;
          uni.setStorageSync('uni-id-pages-userInfo', uniIdUserInfo);
          
          // 通知用户信息更新事件
          uni.$emit('user:updated', userInfo);
          
          // 返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          throw new Error(result.result?.message || '保存失败');
        }
      } catch (error) {
        console.error('保存用户信息失败:', error);
        uni.hideLoading();
        uni.showToast({
          title: error.message || '保存失败，请重试',
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
.edit-field-container {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

.content-wrapper {
  width: 90%;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 20vh; /* 稍微上移，避免完全居中看起来太低 */
  overflow: hidden;
}

.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid $border-color;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
  }
  
  .back-button, .save-button {
    font-size: 32rpx;
    color: $theme-color;
    padding: 10rpx;
  }
}

.edit-form {
  background-color: #fff;
  padding: 30rpx;
  
  .form-item {
    position: relative;
    padding-top: 30rpx;
    
    .input, .textarea {
      width: 100%;
      font-size: 32rpx;
      color: $text-color;
      padding: 30rpx 0;
      border-bottom: 1rpx solid $border-color;
      margin-top: 20rpx;
    }
    
    .textarea {
      min-height: 200rpx;
      padding: 20rpx;
      border: 1rpx solid $border-color;
      border-radius: 8rpx;
      margin-top: 40rpx;
    }
    
    .count {
      position: absolute;
      right: 0;
      bottom: 10rpx;
      font-size: 24rpx;
      color: $text-color-light;
    }
    
    .gender-option {
      height: 90rpx;
      line-height: 90rpx;
      margin: 20rpx 0;
      text-align: center;
      border: 1rpx solid $border-color;
      border-radius: 8rpx;
      font-size: 30rpx;
      color: $text-color;
      
      &.selected {
        background-color: $theme-color;
        color: #fff;
        border-color: $theme-color;
      }
    }
    
    .date-picker {
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1rpx solid $border-color;
      font-size: 30rpx;
      color: $text-color;
      text-align: center;
      margin-top: 20rpx;
    }
  }
}
</style> 