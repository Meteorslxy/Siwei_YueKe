<template>
  <view class="profile-container">
    <view class="header">
      <text class="title">个人资料</text>
    </view>
    
    <view class="profile-form">
      <view class="form-item" @click="changeAvatar">
        <text class="item-label">头像</text>
        <view class="item-content">
          <image class="avatar" :src="userInfo.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="form-item" @click="editField('nickname')">
        <text class="item-label">昵称</text>
        <view class="item-content">
          <text class="item-value">{{userInfo.nickname || '未设置'}}</text>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="form-item" @click="editField('gender')">
        <text class="item-label">性别</text>
        <view class="item-content">
          <text class="item-value">{{genderText}}</text>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="form-item" @click="editField('birthday')">
        <text class="item-label">生日</text>
        <view class="item-content">
          <text class="item-value">{{userInfo.birthday || '未设置'}}</text>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="form-item" @click="editField('location')">
        <text class="item-label">所在地</text>
        <view class="item-content">
          <text class="item-value">{{userInfo.location || '未设置'}}</text>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
      
      <view class="form-item" @click="editField('introduction')">
        <text class="item-label">个人简介</text>
        <view class="item-content">
          <text class="item-value">{{userInfo.introduction || '未设置'}}</text>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        nickname: '',
        gender: 0, // 0:未设置, 1:男, 2:女
        birthday: '',
        location: '',
        introduction: ''
      }
    }
  },
  computed: {
    genderText() {
      const genderMap = {
        0: '未设置',
        1: '男',
        2: '女'
      };
      return genderMap[this.userInfo.gender] || '未设置';
    }
  },
  onLoad() {
    this.loadUserInfo();
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          this.userInfo = JSON.parse(userInfoStr);
        }
      } catch (e) {
        console.error('加载用户信息失败:', e);
      }
    },
    
    // 更换头像
    changeAvatar() {
      uni.navigateTo({
        url: '/pages/user/upload-image.vue?type=avatar',
        fail: (err) => {
          console.error('页面跳转失败:', err);
        }
      });
    },
    
    // 编辑字段
    editField(field) {
      const fieldMap = {
        nickname: '昵称',
        gender: '性别',
        birthday: '生日',
        location: '所在地',
        introduction: '个人简介'
      };
      
      const title = fieldMap[field] || '编辑';
      
      if (field === 'gender') {
        // 性别选择弹窗
        uni.showActionSheet({
          itemList: ['男', '女'],
          success: (res) => {
            this.userInfo.gender = res.tapIndex + 1;
            this.saveUserInfo();
          }
        });
        return;
      }
      
      if (field === 'birthday') {
        // 日期选择器
        uni.showActionSheet({
          itemList: ['选择日期'],
          success: () => {
            this.showDatePicker();
          }
        });
        return;
      }
      
      // 其他字段使用输入框
      uni.navigateTo({
        url: `/pages/user/edit-field.vue?field=${field}&title=${title}&value=${encodeURIComponent(this.userInfo[field] || '')}`,
        fail: (err) => {
          console.error('页面跳转失败:', err);
        }
      });
    },
    
    // 显示日期选择器
    showDatePicker() {
      uni.showToast({
        title: '日期选择功能开发中',
        icon: 'none'
      });
    },
    
    // 保存用户信息
    saveUserInfo() {
      try {
        uni.setStorageSync('userInfo', JSON.stringify(this.userInfo));
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        });
      } catch (e) {
        console.error('保存用户信息失败:', e);
        uni.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style lang="scss">
.profile-container {
  min-height: 100vh;
  background-color: $bg-color;
}

.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
  }
}

.profile-form {
  margin-top: 20rpx;
  background-color: #fff;
  
  .form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid $border-color;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-label {
      font-size: 30rpx;
      color: $text-color;
      width: 180rpx;
    }
    
    .item-content {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      
      .item-value {
        font-size: 28rpx;
        color: $text-color-light;
        margin-right: 10rpx;
        text-align: right;
        flex: 1;
      }
      
      .item-arrow {
        font-size: 24rpx;
        color: $text-color-light;
      }
    }
  }
}
</style> 