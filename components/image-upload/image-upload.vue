<template>
  <view class="image-upload">
    <view class="upload-box" @click="chooseImage" v-if="!tempFilePath && !value">
      <text class="iconfont icon-add">+</text>
      <text class="upload-text">点击上传图片</text>
    </view>
    
    <view class="image-preview" v-else>
      <image class="preview-image" :src="tempFilePath || value" mode="aspectFill"></image>
      <view class="image-actions">
        <view class="action-btn delete-btn" @click="clearImage">
          <text class="iconfont icon-delete">×</text>
          <text class="btn-text">删除</text>
        </view>
        <view class="action-btn upload-btn" @click="uploadImage" v-if="tempFilePath && !uploading">
          <text class="iconfont icon-upload">↑</text>
          <text class="btn-text">上传</text>
        </view>
        <view class="upload-loading" v-if="uploading">
          <text>上传中...</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '200rpx'
    },
    height: {
      type: String,
      default: '200rpx'
    },
    fileType: {
      type: String,
      default: 'jpg'
    }
  },
  data() {
    return {
      tempFilePath: '', // 本地临时文件路径
      uploading: false  // 是否正在上传
    }
  },
  methods: {
    // 选择图片
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.tempFilePath = res.tempFilePaths[0];
        },
        fail: (err) => {
          // 用户取消选择时不显示错误
          if (err.errMsg && err.errMsg.indexOf('cancel') !== -1) {
            console.log('用户取消选择图片');
            return;
          }
          console.error('选择图片失败:', err);
        }
      });
    },
    
    // 清除图片
    clearImage() {
      this.tempFilePath = '';
      this.$emit('input', '');
      this.$emit('clear');
    },
    
    // 上传图片
    async uploadImage() {
      if (!this.tempFilePath) {
        uni.showToast({
          title: '请先选择图片',
          icon: 'none'
        });
        return;
      }
      
      try {
        this.uploading = true;
        uni.showLoading({ title: '上传中...' });
        
        // 读取图片为base64
        let base64Data = await this.getImageBase64(this.tempFilePath);
        
        if (!base64Data) {
          throw new Error('图片转换失败');
        }
        
        // 从data:image/jpeg;base64,XXXX格式中提取base64数据
        const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const fileType = matches[1];
          const base64 = matches[2];
          
          // 调用云函数上传图片
          const fileName = `image_${Date.now()}.${fileType}`;
          const result = await this.$api.file.uploadImage(base64, fileName, fileType);
          
          if (result && result.success) {
            this.$emit('input', result._id || result.fileID);
            this.$emit('success', result);
            
            // 清除临时文件
            this.tempFilePath = '';
            
            uni.showToast({
              title: '上传成功',
              icon: 'success'
            });
          } else {
            throw new Error(result.message || '上传失败');
          }
        } else {
          throw new Error('图片格式错误');
        }
      } catch (error) {
        console.error('上传图片失败:', error);
        uni.showToast({
          title: error.message || '上传失败，请重试',
          icon: 'none'
        });
      } finally {
        this.uploading = false;
        uni.hideLoading();
      }
    },
    
    // 获取图片的base64编码
    getImageBase64(filePath) {
      return new Promise((resolve, reject) => {
        // 微信小程序环境
        // #ifdef MP-WEIXIN
        const fs = wx.getFileSystemManager();
        fs.readFile({
          filePath: filePath,
          encoding: 'base64',
          success: (res) => {
            const base64 = `data:image/${this.fileType};base64,${res.data}`;
            resolve(base64);
          },
          fail: (err) => {
            console.error('读取文件失败:', err);
            reject(err);
          }
        });
        // #endif
        
        // 非微信小程序环境，可以根据需要扩展其他平台的实现
        // #ifndef MP-WEIXIN
        uni.showToast({
          title: '当前平台不支持图片上传',
          icon: 'none'
        });
        reject(new Error('当前平台不支持图片上传'));
        // #endif
      });
    }
  }
}
</script>

<style lang="scss">
.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  
  .upload-box {
    width: 200rpx;
    height: 200rpx;
    border: 2rpx dashed #ddd;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    
    .iconfont {
      font-size: 48rpx;
      color: #999;
      margin-bottom: 10rpx;
    }
    
    .upload-text {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .image-preview {
    position: relative;
    width: 200rpx;
    height: 200rpx;
    border-radius: 8rpx;
    overflow: hidden;
    
    .preview-image {
      width: 100%;
      height: 100%;
    }
    
    .image-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 10rpx 0;
      
      .action-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        .iconfont {
          font-size: 32rpx;
          color: #fff;
        }
        
        .btn-text {
          font-size: 20rpx;
          color: #fff;
        }
      }
      
      .upload-loading {
        flex: 1;
        text-align: center;
        font-size: 20rpx;
        color: #fff;
      }
    }
  }
}
</style> 