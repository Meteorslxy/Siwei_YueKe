<template>
  <view class="school-detail">
    <!-- 顶部背景 -->
    <view class="header-background" :style="{ paddingTop: statusBarHeight + 'px' }">
      <!-- 校区选择 -->
      <view class="school-selector">
        <view class="selector-label">选择校区</view>
        <view class="selector-box" @click="showSchoolPicker">
          <text>{{selectedSchool.name}}</text>
          <view class="arrow-icon"></view>
        </view>
      </view>
    </view>
    
    <!-- 校区信息卡片 -->
    <view class="school-card">
      <view class="card-section">
        <view class="section-title">详细地址：</view>
        <view class="address-content">{{selectedSchool.address}}</view>
      </view>
      
      <!-- 地图展示 -->
      <view class="map-container">
        <image class="map-image" :src="selectedSchool.mapImage" mode="aspectFill"></image>
        <view class="map-marker"></view>
      </view>
      
      <view class="card-section">
        <view class="section-title">校区介绍：</view>
        <view class="intro-content">{{selectedSchool.introduction}}</view>
      </view>
    </view>
    
    <!-- 校区选择弹窗 -->
    <view class="school-picker" v-if="showPicker">
      <view class="picker-mask" @click="hidePicker"></view>
      <view class="picker-content">
        <view class="picker-header">
          <text>选择校区</text>
          <text class="close-icon" @click="hidePicker">×</text>
        </view>
        <view class="picker-options">
          <view 
            class="picker-option" 
            v-for="(school, index) in schoolList" 
            :key="index"
            :class="{ active: selectedSchool.id === school.id }"
            @click="selectSchool(school)">
            {{school.name}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      showPicker: false,
      selectedSchool: {
        id: 'yuhuatai',
        name: '雨花台校区',
        address: '南京市雨花区XX街道XX号',
        introduction: '于2020年建设，主要面向......所授课程包括......为主。',
        mapImage: '/static/images/school/map-yuhuatai.jpg'
      },
      schoolList: [
        {
          id: 'yuhuatai',
          name: '雨花台校区',
          address: '南京市雨花区XX街道XX号',
          introduction: '于2020年建设，主要面向......所授课程包括......为主。',
          mapImage: '/static/images/school/map-yuhuatai.jpg'
        },
        {
          id: 'daxinggong',
          name: '大行宫校区',
          address: '南京市秦淮区XX路XX号',
          introduction: '于2018年建设，主要面向......所授课程包括......为主。',
          mapImage: '/static/images/school/map-daxinggong.jpg'
        },
        {
          id: 'minxing',
          name: '闵行校区',
          address: '上海市闵行区XX路XX号',
          introduction: '于2021年建设，主要面向......所授课程包括......为主。',
          mapImage: '/static/images/school/map-minxing.jpg'
        }
      ]
    }
  },
  onLoad() {
    this.getStatusBarHeight();
  },
  methods: {
    // 获取状态栏高度
    getStatusBarHeight() {
      try {
        const systemInfo = uni.getSystemInfoSync();
        this.statusBarHeight = systemInfo.statusBarHeight || 20;
      } catch (e) {
        console.error('获取状态栏高度失败:', e);
        this.statusBarHeight = 20;
      }
    },
    
    // 显示校区选择器
    showSchoolPicker() {
      this.showPicker = true;
    },
    
    // 隐藏校区选择器
    hidePicker() {
      this.showPicker = false;
    },
    
    // 选择校区
    selectSchool(school) {
      this.selectedSchool = school;
      this.hidePicker();
    }
  }
}
</script>

<style lang="scss">
.school-detail {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 顶部背景 */
.header-background {
  background-color: #EC7A49;
  padding-bottom: 180rpx;
  position: relative;
}

/* 校区选择器 */
.school-selector {
  display: flex;
  align-items: center;
  padding: 0rpx 30rpx 25rpx;
  margin-top: -30rpx;
  justify-content: center;
  
  .selector-label {
    color: #fff;
    font-size: 28rpx;
    margin-right: 50rpx;
    white-space: nowrap;
  }
  
  .selector-box {
    width: 400rpx;
    height: 65rpx;
    background-color: #fff;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15rpx;
    font-size: 26rpx;
    
    .arrow-icon {
      width: 0;
      height: 0;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      border-top: 8rpx solid #666;
    }
  }
}

/* 校区信息卡片 */
.school-card {
  margin: 0 30rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  padding: 30rpx;
  margin-top: -130rpx;
  position: relative;
  z-index: 10;
  
  .card-section {
    margin-bottom: 30rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .section-title {
    font-size: 30rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 10rpx;
  }
  
  .address-content, .intro-content {
    font-size: 28rpx;
    color: $text-color-grey;
    line-height: 1.6;
  }
  
  .map-container {
    width: 100%;
    height: 300rpx;
    background-color: #f5f5f5;
    margin-bottom: 30rpx;
    position: relative;
    border-radius: 8rpx;
    overflow: hidden;
    
    .map-image {
      width: 100%;
      height: 100%;
    }
    
    .map-marker {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 40rpx;
      height: 40rpx;
      background-color: $theme-color;
      border-radius: 50%;
      border: 6rpx solid rgba(255, 255, 255, 0.8);
    }
  }
}

/* 校区选择弹窗 */
.school-picker {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  
  .picker-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .picker-content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top-left-radius: 20rpx;
    border-top-right-radius: 20rpx;
    overflow: hidden;
    
    .picker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid $border-color-light;
      
      .close-icon {
        font-size: 40rpx;
        color: $text-color-light;
      }
    }
    
    .picker-options {
      max-height: 600rpx;
      overflow-y: auto;
      
      .picker-option {
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 30rpx;
        font-size: 30rpx;
        border-bottom: 1rpx solid $border-color-light;
        
        &.active {
          color: $theme-color;
          font-weight: bold;
        }
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style> 