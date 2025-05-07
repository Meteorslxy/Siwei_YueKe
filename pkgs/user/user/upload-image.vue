<template>
  <view class="upload-container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text>←</text>
      </view>
      <text class="title">{{pageTitle}}</text>
      <view class="save-button" @click="saveImage">
        <text>保存</text>
      </view>
    </view>
    
    <view class="upload-content">
      <view class="preview-area" @click="chooseImage">
        <image 
          v-if="tempFilePath" 
          :src="tempFilePath" 
          mode="aspectFill" 
          class="preview-image"
        ></image>
        <view v-else class="placeholder">
          <text class="placeholder-text">{{placeholderText}}</text>
        </view>
      </view>
      
      <view class="button-group">
        <button class="upload-btn" @click="chooseImage">选择图片</button>
        <button v-if="tempFilePath" class="upload-btn cancel-btn" @click="cancelUpload">取消</button>
      </view>
    </view>

    <!-- 调试信息 -->
    <view class="debug-info" v-if="isDebug">
      <text>临时路径: {{tempFilePath || '无'}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: 'avatar', // 默认为头像上传
      tempFilePath: '', // 临时文件路径
      uploadedFileId: '', // 上传成功后的文件ID
      isUploading: false, // 是否正在上传
      pageTitle: '上传头像',
      placeholderText: '请选择一张头像图片',
      isDebug: false // 是否显示调试信息
    }
  },
  onLoad(options) {
    // 获取上传类型
    if (options.type) {
      this.type = options.type;
      
      // 根据类型设置标题和提示文本
      if (this.type === 'avatar') {
        this.pageTitle = '上传头像';
        this.placeholderText = '请选择一张头像图片';
      } else {
        this.pageTitle = '上传图片';
        this.placeholderText = '请选择一张图片';
      }
    }
    
    // 监听裁剪完成事件
    uni.$on('cropImage', this.handleCropDone);
    
    // 检查是否有临时保存的图片路径
    const tempPath = uni.getStorageSync('temp_avatar_path');
    if (tempPath) {
      console.log('发现临时保存的图片路径:', tempPath);
      this.tempFilePath = tempPath;
    }
  },
  onUnload() {
    // 页面卸载时移除事件监听
    uni.$off('cropImage', this.handleCropDone);
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.removeStorageSync('temp_avatar_path');
      uni.navigateBack();
    },
    
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1, // 只能选一张
        sizeType: ['compressed'], // 使用压缩图片
        sourceType: ['album', 'camera'], // 允许从相册和相机选择
        success: (res) => {
          if (res.tempFilePaths && res.tempFilePaths.length > 0) {
            // 获取临时文件路径
            this.tempFilePath = res.tempFilePaths[0];
            
            console.log('选择的图片路径:', this.tempFilePath);
            
            // 保存临时路径
            uni.setStorageSync('temp_avatar_path', this.tempFilePath);
            
            // 显示提示，引导用户点击保存按钮
            uni.showToast({
              title: '请点击保存按钮上传',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: (err) => {
          console.error('选择图片失败:', err);
          uni.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 裁剪图片
    cropImage() {
      try {
        // 跳转到裁剪页面
        const cropPagePath = '/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage';
        uni.navigateTo({
          url: `${cropPagePath}?path=${this.tempFilePath}&options=${JSON.stringify({
            width: 300,
            height: 300
          })}`,
          fail: (err) => {
            console.error('跳转裁剪页面失败，使用原图:', err);
          }
        });
        
        // 不需要在success回调中使用eventChannel.onMessage
        // 我们已经通过全局事件监听cropImage来获取结果
      } catch (err) {
        console.error('裁剪图片操作失败，使用原图:', err);
      }
    },
    
    // 处理裁剪完成事件
    handleCropDone(data) {
      console.log('收到裁剪完成事件:', data);
      if (data && data.path) {
        this.tempFilePath = data.path;
        // 更新临时存储
        uni.setStorageSync('temp_avatar_path', this.tempFilePath);
        console.log('设置裁剪后图片路径:', this.tempFilePath);
      }
    },
    
    // 取消上传
    cancelUpload() {
      this.tempFilePath = '';
      this.uploadedFileId = '';
      uni.removeStorageSync('temp_avatar_path');
    },
    
    // 保存图片
    saveImage() {
      if (!this.tempFilePath) {
        uni.showToast({
          title: '请先选择图片',
          icon: 'none'
        });
        return;
      }
      
      if (this.isUploading) {
        uni.showToast({
          title: '正在上传中，请稍候',
          icon: 'none'
        });
        return;
      }
      
      this.isUploading = true;
      
      // 显示上传中
      uni.showLoading({
        title: '上传中...',
        mask: true
      });
      
      // 上传图片
      this.uploadFile(this.tempFilePath)
        .then(uploadResult => {
          console.log('图片上传结果:', uploadResult);
          
          if (!uploadResult.fileID) {
            throw new Error('上传失败，未获取到文件ID');
          }
          
          this.uploadedFileId = uploadResult.fileID;
          
          // 更新用户头像
          if (this.type === 'avatar') {
            return this.updateUserAvatar(this.uploadedFileId);
          }
          
          return Promise.resolve();
        })
        .then(() => {
          uni.hideLoading();
          uni.showToast({
            title: '上传成功',
            icon: 'success'
          });
          
          // 延迟操作
          setTimeout(() => {
            // 返回前清除临时数据
            uni.removeStorageSync('temp_avatar_path');
            
            // 设置上传成功的结果，为了通知上一页更新头像
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            if (prevPage && prevPage.$vm) {
              prevPage.$vm.$emit('uploadSuccess', {
                fileID: this.uploadedFileId,
                type: this.type
              });
              
              // 如果是个人资料页面，尝试直接更新头像显示
              if (prevPage.route && prevPage.route.includes('profile')) {
                if (typeof prevPage.$vm.refreshUserInfo === 'function') {
                  prevPage.$vm.refreshUserInfo();
                } else if (prevPage.$vm.userInfo) {
                  // 直接更新上一页的用户信息中的头像
                  prevPage.$vm.userInfo.avatar = this.uploadedFileId;
                }
              }
            }
            
            // 跳转到"我的"页面，而不是返回上一页
            uni.switchTab({
              url: '/pages/user/user',
              success: () => {
                console.log('跳转到"我的"页面成功');
              },
              fail: (err) => {
                console.error('跳转到"我的"页面失败:', err);
                // 失败时尝试普通导航
                uni.navigateTo({
                  url: '/pages/user/user'
                });
              }
            });
          }, 1000); // 保持1秒延迟
        })
        .catch(error => {
          console.error('保存图片失败:', error);
          uni.hideLoading();
          uni.showToast({
            title: error.message || '上传失败，请重试',
            icon: 'none'
          });
        })
        .finally(() => {
          this.isUploading = false;
        });
    },
    
    // 上传文件
    uploadFile(filePath) {
      return new Promise((resolve, reject) => {
        // 构建云存储路径
        const fileName = filePath.split('/').pop();
        const cloudPath = `user_uploads/${this.type}/${Date.now()}_${Math.random().toString(36).slice(2)}_${fileName}`;
        
        console.log('准备上传文件:', filePath);
        console.log('云存储路径:', cloudPath);
        
        // 使用uniCloud提供的上传方法
        uniCloud.uploadFile({
          filePath: filePath,
          cloudPath: cloudPath,
          success: (res) => {
            console.log('上传成功:', res);
            resolve({
              fileID: res.fileID,
              url: res.fileID
            });
          },
          fail: (err) => {
            console.error('上传失败:', err);
            reject(new Error('文件上传失败: ' + (err.errMsg || JSON.stringify(err))));
          }
        });
      });
    },
    
    // 更新用户头像
    updateUserAvatar(fileID) {
      return new Promise((resolve, reject) => {
        // 获取用户信息
        const userInfoStr = uni.getStorageSync('userInfo');
        const userInfo = userInfoStr ? (typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr) : {};
        
        // 获取用户ID和token
        const userId = userInfo._id || userInfo.uid;
        const token = uni.getStorageSync('uni_id_token');
        
        if (!userId) {
          reject(new Error('用户ID不存在'));
          return;
        }
        
        console.log('准备更新用户头像:', userId, fileID);
        
        // 准备更新数据
        const updateData = {
          avatar: fileID
        };
        
        // 调用云函数更新用户头像
        uniCloud.callFunction({
          name: 'updateUserProfile',
          data: {
            userId,
            uniIdToken: token,
            userInfo: updateData
          },
          success: (result) => {
            if (result.result && result.result.code === 0) {
              console.log('头像更新成功:', result.result.data);
              
              // 更新本地用户信息
              userInfo.avatar = fileID;
              userInfo.avatarUrl = fileID;
              uni.setStorageSync('userInfo', userInfo);
              
              // 同步更新uni-id-pages的用户信息
              const uniIdUserInfo = uni.getStorageSync('uni-id-pages-userInfo') || {};
              uniIdUserInfo.avatar = fileID;
              uniIdUserInfo.avatar_file = {
                name: 'avatar.jpg',
                extname: 'jpg',
                url: fileID
              };
              uni.setStorageSync('uni-id-pages-userInfo', uniIdUserInfo);
              
              // 触发用户信息更新事件
              uni.$emit('user:updated', userInfo);
              
              resolve(true);
            } else {
              reject(new Error(result.result?.message || '头像更新失败'));
            }
          },
          fail: (error) => {
            console.error('更新用户头像失败:', error);
            reject(error);
          }
        });
      });
    }
  }
}
</script>

<style lang="scss">
.upload-container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 30rpx;
  border-bottom: 1px solid #eee;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
  
  .back-button, .save-button {
    font-size: 32rpx;
    color: #ff6a3c;
  }
}

.upload-content {
  padding: 40rpx;
  
  .preview-area {
    width: 100%;
    height: 500rpx;
    background-color: #f5f5f5;
    border-radius: 8rpx;
    margin-bottom: 40rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 1px dashed #ddd;
    
    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
      
      .placeholder-text {
        font-size: 28rpx;
      }
    }
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    
    .upload-btn {
      flex: 1;
      height: 90rpx;
      line-height: 90rpx;
      background-color: #ff6a3c;
      color: #fff;
      border-radius: 45rpx;
      font-size: 32rpx;
      
      &.cancel-btn {
        margin-left: 20rpx;
        background-color: #f5f5f5;
        color: #666;
      }
    }
  }
}

.debug-info {
  padding: 20rpx;
  font-size: 24rpx;
  color: #999;
  word-break: break-all;
}
</style> 