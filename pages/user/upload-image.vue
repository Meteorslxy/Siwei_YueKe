<template>
  <view class="upload-page">
    <view class="page-header">
      <view class="header-title">图片上传示例</view>
      <view class="header-desc">支持选择图片并上传到云端</view>
    </view>
    
    <view class="upload-section">
      <view class="section-title">单张图片上传</view>
      <view class="upload-container">
        <image-upload 
          v-model="imageId" 
          width="300rpx" 
          height="300rpx"
          @success="onUploadSuccess"
        ></image-upload>
      </view>
      
      <view class="image-info" v-if="imageId">
        <view class="info-item">
          <text class="info-label">图片ID:</text>
          <text class="info-value">{{imageId}}</text>
        </view>
        <view class="info-item" v-if="imageData">
          <text class="info-label">文件名:</text>
          <text class="info-value">{{imageData.fileName}}</text>
        </view>
        <view class="image-preview" v-if="imageBase64">
          <image :src="imageBase64" mode="widthFix" style="width: 100%;"></image>
        </view>
      </view>
    </view>
    
    <view class="upload-section">
      <view class="section-title">多张图片上传</view>
      <view class="multi-upload">
        <view class="upload-item" v-for="(item, index) in multiImages" :key="index">
          <view class="item-container">
            <image-upload 
              :value="item.id" 
              width="200rpx" 
              height="200rpx"
              @input="val => updateMultiImage(index, val)"
              @success="result => onMultiUploadSuccess(result, index)"
            ></image-upload>
            <view class="image-preview" v-if="item.base64">
              <image :src="item.base64" mode="aspectFill" style="width: 200rpx; height: 200rpx;"></image>
            </view>
          </view>
        </view>
        
        <view class="upload-item add-btn" @click="addImage" v-if="multiImages.length < 9">
          <text class="iconfont icon-add"></text>
          <text class="add-text">添加图片</text>
        </view>
      </view>
    </view>
    
    <view class="action-btns">
      <button class="btn clear-btn" @click="clearImages">清空图片</button>
      <button class="btn save-btn" @click="saveImages">保存图片</button>
    </view>
  </view>
</template>

<script>
import ImageUpload from '@/components/image-upload/image-upload.vue';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      imageId: '', // 单张图片ID
      imageData: null, // 图片详细数据
      imageBase64: '', // 单张图片的base64数据
      multiImages: [{ id: '', base64: '' }], // 多张图片
      uploadResults: [] // 上传结果
    }
  },
  onLoad() {
    console.log('图片上传页面加载');
  },
  onReady() {
    // 页面就绪时通知App
    setTimeout(() => {
      uni.$emit('page-ready', this);
      console.log('页面准备完成，已通知App');
    }, 100);
  },
  watch: {
    // 监听单张图片ID变化，获取图片数据
    imageId(newVal) {
      if (newVal) {
        this.getImageById(newVal);
      } else {
        this.imageData = null;
        this.imageBase64 = '';
      }
    }
  },
  methods: {
    // 根据ID获取图片
    async getImageById(imageId) {
      try {
        uni.showLoading({ title: '加载图片中...' });
        // 使用API函数获取图片
        const result = await this.$api.file.getImage(imageId);
        
        // 处理结果
        if (result && result.success) {
          this.imageData = result.imageData;
          this.imageBase64 = 'data:image/' + this.imageData.fileType + ';base64,' + this.imageData.base64Data;
        } else {
          throw new Error(result.message || '获取图片失败');
        }
      } catch (error) {
        console.error('获取图片失败:', error);
        uni.showToast({
          title: error.message || '获取图片失败',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 根据ID获取多图中某一张图片
    async getMultiImageById(imageId, index) {
      try {
        // 使用API函数获取图片
        const result = await this.$api.file.getImage(imageId);
        
        // 处理结果
        if (result && result.success) {
          const base64 = 'data:image/' + result.imageData.fileType + ';base64,' + result.imageData.base64Data;
          this.$set(this.multiImages[index], 'base64', base64);
        } else {
          throw new Error(result.message || '获取图片失败');
        }
      } catch (error) {
        console.error('获取多图片失败:', error);
      }
    },
    
    // 单张图片上传成功
    onUploadSuccess(result) {
      console.log('图片上传成功:', result);
      // 直接保存图片ID
      this.imageId = result._id;
      uni.showToast({
        title: '上传成功',
        icon: 'success'
      });
    },
    
    // 多张图片上传成功
    onMultiUploadSuccess(result, index) {
      console.log('多图上传成功:', result, '索引:', index);
      this.uploadResults.push(result);
      
      // 获取上传的图片显示
      if (result._id) {
        this.getMultiImageById(result._id, index);
      }
    },
    
    // 更新多图中的某一张
    updateMultiImage(index, value) {
      this.$set(this.multiImages[index], 'id', value);
      
      // 如果有ID但没有base64，尝试获取图片
      if (value && !this.multiImages[index].base64) {
        this.getMultiImageById(value, index);
      }
    },
    
    // 添加图片
    addImage() {
      if (this.multiImages.length < 9) {
        this.multiImages.push({ id: '', base64: '' });
      } else {
        uni.showToast({
          title: '最多只能上传9张图片',
          icon: 'none'
        });
      }
    },
    
    // 清空图片
    clearImages() {
      this.imageId = '';
      this.imageData = null;
      this.imageBase64 = '';
      this.multiImages = [{ id: '', base64: '' }];
      this.uploadResults = [];
      uni.showToast({
        title: '已清空所有图片',
        icon: 'none'
      });
    },
    
    // 保存图片信息
    saveImages() {
      // 过滤掉空值
      const validImages = this.multiImages.filter(item => item.id).map(item => item.id);
      
      if (!this.imageId && validImages.length === 0) {
        uni.showToast({
          title: '请先上传图片',
          icon: 'none'
        });
        return;
      }
      
      // 这里可以添加将图片保存到数据库的逻辑
      console.log('保存的图片信息:', {
        single: this.imageId,
        multiple: validImages
      });
      
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      });
    }
  }
}
</script>

<style lang="scss">
.upload-page {
  padding: 30rpx;
  background-color: #f7f7f7;
  min-height: 100vh;
  
  .page-header {
    margin-bottom: 40rpx;
    
    .header-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    .header-desc {
      font-size: 28rpx;
      color: #666;
    }
  }
  
  .upload-section {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 30rpx;
      padding-left: 15rpx;
      border-left: 6rpx solid #FF6B00;
    }
    
    .upload-container {
      display: flex;
      justify-content: center;
      margin: 20rpx 0;
    }
    
    .image-info {
      margin-top: 30rpx;
      background-color: #f5f5f5;
      padding: 20rpx;
      border-radius: 8rpx;
      
      .info-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10rpx;
        
        .info-label {
          font-size: 26rpx;
          color: #666;
          margin-right: 10rpx;
          white-space: nowrap;
        }
        
        .info-value {
          font-size: 26rpx;
          color: #333;
          word-break: break-all;
          flex: 1;
        }
      }
      
      .image-preview {
        margin-top: 10rpx;
      }
    }
    
    .multi-upload {
      display: flex;
      flex-wrap: wrap;
      
      .upload-item {
        margin: 10rpx;
        
        .item-container {
          position: relative;
        }
      }
      
      .add-btn {
        width: 200rpx;
        height: 200rpx;
        background-color: #f5f5f5;
        border: 1px dashed #ddd;
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        .iconfont {
          font-size: 48rpx;
          color: #999;
          margin-bottom: 10rpx;
        }
        
        .add-text {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
  
  .action-btns {
    display: flex;
    margin-top: 50rpx;
    
    .btn {
      flex: 1;
      margin: 0 15rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      font-size: 28rpx;
      
      &.clear-btn {
        background-color: #f5f5f5;
        color: #666;
      }
      
      &.save-btn {
        background-color: #FF6B00;
        color: #fff;
      }
    }
  }
}
</style> 