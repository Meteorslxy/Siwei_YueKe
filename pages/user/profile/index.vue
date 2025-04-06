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
      
      <view class="form-item" @click="editField('introduction')">
        <text class="item-label">个人简介</text>
        <view class="item-content">
          <text class="item-value">{{userInfo.introduction || '未设置'}}</text>
          <text class="item-arrow iconfont icon-right"></text>
        </view>
      </view>
    </view>
    
    <!-- 弹出式编辑框 -->
    <view class="popup-mask" v-if="showPopup" @click="cancelEdit"></view>
    <view class="popup-container" v-if="showPopup">
      <view class="popup-header">
        <view class="popup-cancel" @click="cancelEdit">取消</view>
        <view class="popup-title">{{editTitle}}</view>
        <view class="popup-save" @click="savePopupEdit">保存</view>
      </view>
      
      <view class="popup-content">
        <!-- 文本输入 -->
        <input 
          v-if="editType === 'text'" 
          class="popup-input" 
          v-model="tempFieldValue" 
          :placeholder="'请输入' + editTitle"
          :maxlength="maxLength"
          focus
        />
        
        <!-- 多行文本输入 -->
        <textarea 
          v-if="editType === 'textarea'" 
          class="popup-textarea" 
          v-model="tempFieldValue" 
          :placeholder="'请输入' + editTitle"
          :maxlength="maxLength"
          auto-height
          focus
        />
        
        <!-- 字数计数 -->
        <text class="popup-count" v-if="editType === 'text' || editType === 'textarea'">
          {{tempFieldValue.length}}/{{maxLength}}
        </text>
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
      },
      isLoading: false,
      
      // 弹出框相关
      showPopup: false,
      currentEditField: '',
      editTitle: '',
      editType: 'text',
      tempFieldValue: '',
      maxLength: 20
    }
  },
  computed: {
    genderText() {
      // 明确转换为数字类型
      const gender = Number(this.userInfo.gender || 0);
      console.log('计算性别文本，当前值:', gender, typeof gender);
      
      const genderMap = {
        0: '未设置',
        1: '男',
        2: '女'
      };
      
      const text = genderMap[gender] || '未设置';
      console.log('性别显示文本:', text);
      return text;
    }
  },
  onLoad() {
    this.loadUserInfo();
    
    // 监听头像上传成功事件
    uni.$on('uploadSuccess', this.handleUploadSuccess);
  },
  onUnload() {
    // 移除事件监听
    uni.$off('uploadSuccess', this.handleUploadSuccess);
  },
  methods: {
    // 加载用户信息
    loadUserInfo() {
      try {
        // 显示加载中
        uni.showLoading({
          title: '加载中'
        });
        
        const userInfoStorage = uni.getStorageSync('userInfo');
        if (userInfoStorage) {
          // 检查是否已经是对象，避免重复解析
          const userInfo = typeof userInfoStorage === 'string' ? JSON.parse(userInfoStorage) : userInfoStorage;
          // 将获取到的用户信息合并到当前对象
          Object.assign(this.userInfo, userInfo);
          
          // 如果用户已登录，尝试从云数据库获取最新信息
          if (userInfo._id || userInfo.uid) {
            this.fetchUserFromDatabase(userInfo._id || userInfo.uid);
          }
        }
        
        uni.hideLoading();
      } catch (e) {
        console.error('加载用户信息失败:', e);
        uni.hideLoading();
      }
    },
    
    // 从数据库获取用户信息
    async fetchUserFromDatabase(userId) {
      try {
        // 获取token
        const token = uni.getStorageSync('uni_id_token');
        
        // 调用云函数获取用户信息
        const result = await uniCloud.callFunction({
          name: 'getUserInfoById',
          data: {
            userId,
            uniIdToken: token
          }
        });
        
        if (result.result && result.result.code === 0 && result.result.userInfo) {
          const dbUserInfo = result.result.userInfo;
          console.log('从数据库获取的用户信息:', dbUserInfo);
          
          // 更新本地信息
          Object.assign(this.userInfo, {
            nickname: dbUserInfo.nickname || '',
            gender: dbUserInfo.gender || 0,
            birthday: dbUserInfo.birthday || '',
            location: dbUserInfo.location || '',
            introduction: dbUserInfo.introduction || '',
            avatar: dbUserInfo.avatar || '',
            email: dbUserInfo.email || '',
            mobile: dbUserInfo.mobile || ''
          });
          
          // 更新本地存储
          const storedUserInfo = uni.getStorageSync('userInfo') || {};
          const updatedUserInfo = {
            ...storedUserInfo,
            ...this.userInfo
          };
          uni.setStorageSync('userInfo', updatedUserInfo);
        }
      } catch (err) {
        console.error('获取数据库用户信息失败:', err);
      }
    },
    
    // 更换头像
    changeAvatar() {
      uni.navigateTo({
        url: '/pages/user/upload-image?type=avatar',
        fail: (err) => {
          console.error('页面跳转失败:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 编辑字段
    editField(field) {
      this.isLoading = true;
      
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
          success: async (res) => {
            try {
              console.log('选择了性别选项:', res.tapIndex, '(0:男,1:女)');
              const gender = res.tapIndex + 1; // 1:男, 2:女
              
              // 显示加载中
              uni.showLoading({
                title: '更新中...',
                mask: true // 添加蒙层防止重复点击
              });
              
              // 获取用户ID和token
              const userInfoStr = uni.getStorageSync('userInfo');
              const userInfo = userInfoStr ? (typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr) : {};
              const userId = userInfo._id || userInfo.uid;
              const token = uni.getStorageSync('uni_id_token');
              
              if (!userId) {
                throw new Error('用户ID不存在');
              }
              
              console.log('正在更新性别, 用户ID:', userId, '性别值:', gender);
              
              // 调用云函数更新用户信息
              const result = await uniCloud.callFunction({
                name: 'updateUserProfile',
                data: {
                  userId,
                  uniIdToken: token,
                  userInfo: {
                    gender: gender
                  }
                }
              });
              
              console.log('更新性别云函数返回结果:', result);
              
              if (result.result && result.result.code === 0) {
                // 更新本地信息
                this.userInfo.gender = Number(gender);
                
                // 更新本地存储
                userInfo.gender = Number(gender);
                uni.setStorageSync('userInfo', userInfo);
                
                // 同步更新uni-id-pages的用户信息
                const uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
                uniIdUserInfo.gender = Number(gender);
                uni.setStorageSync('uni-id-pages-userInfo', uniIdUserInfo);
                
                // 触发用户信息更新事件
                uni.$emit('user:updated', userInfo);
                
                uni.hideLoading();
                uni.showToast({
                  title: '更新成功',
                  icon: 'success'
                });
                
                // 使用nextTick确保界面更新
                this.$nextTick(() => {
                  console.log('性别已更新, 当前值:', this.userInfo.gender, '性别文本:', this.genderText);
                  // 强制刷新界面
                  this.$forceUpdate();
                });
                
                // 关闭ActionSheet
                setTimeout(() => {
                  // 刷新整个页面数据
                  this.fetchUserFromDatabase(userId);
                }, 500);
              } else {
                throw new Error(result.result?.message || '更新失败');
              }
            } catch (error) {
              console.error('更新性别失败:', error);
              uni.hideLoading();
              uni.showToast({
                title: error.message || '更新失败，请重试',
                icon: 'none',
                duration: 2000
              });
            } finally {
              this.isLoading = false;
            }
          },
          fail: (err) => {
            console.error('性别选择失败:', err);
            this.isLoading = false;
          },
          complete: () => {
            // Complete处理已经移到其他位置
          }
        });
        return;
      } else if (field === 'nickname' || field === 'introduction') {
        // 使用弹出框编辑昵称和个人简介
        this.isLoading = false;
        this.showEditPopup(field, title);
      } else {
        // 其他字段仍然使用页面跳转
        this.isLoading = false;
        uni.navigateTo({
          url: `/pages/user/edit-field?field=${field}&title=${title}&value=${encodeURIComponent(this.userInfo[field] || '')}`,
          fail: (err) => {
            console.error('页面跳转失败:', err);
            uni.showToast({
              title: '页面跳转失败',
              icon: 'none'
            });
          }
        });
      }
    },
    
    // 显示编辑弹出框
    showEditPopup(field, title) {
      this.currentEditField = field;
      this.editTitle = title;
      this.tempFieldValue = this.userInfo[field] || '';
      
      // 设置编辑类型和长度限制
      if (field === 'introduction') {
        this.editType = 'textarea';
        this.maxLength = 200;
      } else {
        this.editType = 'text';
        this.maxLength = 20;
      }
      
      // 显示弹出框
      this.showPopup = true;
    },
    
    // 取消编辑
    cancelEdit() {
      this.showPopup = false;
      this.tempFieldValue = '';
    },
    
    // 保存弹出框编辑
    async savePopupEdit() {
      if (!this.tempFieldValue.trim()) {
        uni.showToast({
          title: this.editTitle + '不能为空',
          icon: 'none'
        });
        return;
      }
      
      // 使用已有的updateField方法更新字段
      const success = await this.updateField(this.currentEditField, this.tempFieldValue);
      
      if (success) {
        // 关闭弹出框
        this.showPopup = false;
        this.tempFieldValue = '';
      }
    },
    
    // 处理上传成功事件
    handleUploadSuccess(data) {
      console.log('收到上传成功事件:', data);
      if (data && data.fileID && data.type === 'avatar') {
        // 更新头像
        this.userInfo.avatar = data.fileID;
        // 刷新用户信息
        this.refreshUserInfo();
      }
    },
    
    // 刷新用户信息
    refreshUserInfo() {
      console.log('刷新用户信息');
      // 获取最新用户信息
      this.fetchUserFromDatabase();
    },
    
    // 添加通用的updateField方法
    // 更新字段
    async updateField(field, value) {
      if (this.isLoading) return false;
      
      this.isLoading = true;
      
      try {
        // 显示加载中
        uni.showLoading({
          title: '更新中...',
          mask: true
        });
        
        // 获取用户ID和token
        const userInfoStr = uni.getStorageSync('userInfo');
        const userInfo = userInfoStr ? (typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr) : {};
        const userId = userInfo._id || userInfo.uid;
        const token = uni.getStorageSync('uni_id_token');
        
        if (!userId) {
          throw new Error('用户ID不存在');
        }
        
        // 准备更新数据
        const updateData = {};
        updateData[field] = value;
        
        console.log(`准备更新用户${field}:`, value);
        
        // 调用云函数更新用户信息
        const result = await uniCloud.callFunction({
          name: 'updateUserProfile',
          data: {
            userId,
            uniIdToken: token,
            userInfo: updateData
          }
        });
        
        console.log(`${field}更新结果:`, result);
        
        if (result.result && result.result.code === 0) {
          // 更新本地信息
          this.userInfo[field] = value;
          
          // 特别处理性别字段，确保界面更新
          if (field === 'gender') {
            console.log('更新性别成功，旧值:', this.userInfo.gender, '新值:', value);
            // 确保值被转换为数字
            this.userInfo.gender = Number(value);
            console.log('转换后的性别值:', this.userInfo.gender, '显示文本:', this.genderText);
          }
          
          // 更新本地存储
          userInfo[field] = value;
          uni.setStorageSync('userInfo', userInfo);
          
          // 同步更新uni-id-pages的用户信息
          const uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
          uniIdUserInfo[field] = value;
          uni.setStorageSync('uni-id-pages-userInfo', uniIdUserInfo);
          
          // 触发用户信息更新事件
          uni.$emit('user:updated', userInfo);
          
          uni.hideLoading();
          uni.showToast({
            title: '更新成功',
            icon: 'success'
          });
          
          // 强制刷新页面显示
          this.$forceUpdate();
          
          // 使用nextTick确保界面更新
          this.$nextTick(() => {
            console.log(`${field}已更新, 当前值:`, this.userInfo[field]);
          });
          
          return true;
        } else {
          throw new Error(result.result?.message || '更新失败');
        }
      } catch (error) {
        console.error(`更新${field}失败:`, error);
        uni.hideLoading();
        uni.showToast({
          title: error.message || '更新失败，请重试',
          icon: 'none',
          duration: 2000
        });
        return false;
      } finally {
        this.isLoading = false;
      }
    },
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

// 弹出框样式
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.popup-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  overflow: hidden;
  z-index: 999;
  padding-bottom: 50rpx; /* 适配底部安全区 */
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  padding: 0 30rpx;
  border-bottom: 1rpx solid $border-color;
  
  .popup-title {
    font-size: 32rpx;
    font-weight: bold;
    color: $text-color;
  }
  
  .popup-cancel, .popup-save {
    font-size: 30rpx;
    padding: 20rpx 10rpx;
  }
  
  .popup-cancel {
    color: $text-color-light;
  }
  
  .popup-save {
    color: $theme-color;
  }
}

.popup-content {
  padding: 30rpx;
  position: relative;
  
  .popup-input {
    width: 100%;
    font-size: 32rpx;
    color: $text-color;
    padding: 20rpx 0;
    border-bottom: 1rpx solid $border-color;
  }
  
  .popup-textarea {
    width: 100%;
    min-height: 200rpx;
    font-size: 32rpx;
    color: $text-color;
    padding: 20rpx;
    border: 1rpx solid $border-color;
    border-radius: 8rpx;
    margin-bottom: 40rpx;
  }
  
  .popup-count {
    position: absolute;
    right: 30rpx;
    bottom: 10rpx;
    font-size: 24rpx;
    color: $text-color-light;
  }
}
</style> 