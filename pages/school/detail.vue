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
        id: 'jnwd',
        name: '江宁万达校区',
        address: '南京市江宁区万达广场XX号',
        introduction: '于2020年建设，主要面向江宁区学生，提供全面的教学服务。',
        mapImage: '/static/images/school/jnwd.png'
      },
      schoolList: [
        {
          id: 'jnwd',
          name: '江宁万达校区',
          address: '南京市江宁区万达广场XX号',
          introduction: '于2020年建设，主要面向江宁区学生，提供全面的教学服务。',
          mapImage: '/static/images/school/jnwd.png'
        },
        {
          id: 'jnhjhy',
          name: '江宁黄金海岸',
          address: '南京市江宁区黄金海岸XX街区XX号',
          introduction: '于2019年建设，环境优雅，设施完善，是学习的理想场所。',
          mapImage: '/static/images/school/jnhjhy.png'
        },
        {
          id: 'dxg',
          name: '大行宫校区',
          address: '南京市秦淮区大行宫XX路XX号',
          introduction: '于2018年建设，位于市中心，交通便利，师资力量雄厚。',
          mapImage: '/static/images/school/dxg.png'
        },
        {
          id: 'xjk',
          name: '新街口校区',
          address: '南京市玄武区新街口XX街XX号',
          introduction: '于2017年建设，我校最早成立的校区之一，拥有丰富的教学经验。',
          mapImage: '/static/images/school/xjk.png'
        },
        {
          id: 'yh',
          name: '雨花校区',
          address: '南京市雨花台区XX路XX号',
          introduction: '于2020年建设，环境幽静，适合专注学习，课程设置丰富。',
          mapImage: '/static/images/school/yh.png'
        },
        {
          id: 'qb',
          name: '桥北校区',
          address: '南京市桥北区XX街XX号',
          introduction: '于2021年建设，新兴校区，设施先进，师资优良。',
          mapImage: '/static/images/school/qb.png'
        },
        {
          id: 'at',
          name: '奥体校区',
          address: '南京市建邺区奥体中心附近XX路XX号',
          introduction: '于2019年建设，位于奥体中心附近，环境优美，交通便利。',
          mapImage: '/static/images/school/at.png'
        },
        {
          id: 'lj',
          name: '龙江校区',
          address: '南京市鼓楼区龙江XX路XX号',
          introduction: '于2020年建设，位于龙江地区，社区氛围浓厚，适合学生发展。',
          mapImage: '/static/images/school/lj.png'
        },
        {
          id: 'lh',
          name: '六合校区',
          address: '南京市六合区XX广场XX号',
          introduction: '于2021年建设，我校最新校区之一，设施完善，师资力量强大。',
          mapImage: '/static/images/school/lh.png'
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
    height: 400rpx;
    background-color: #f5f5f5;
    margin-bottom: 30rpx;
    position: relative;
    border-radius: 8rpx;
    overflow: hidden;
    
    .map-image {
      width: 100%;
      height: 100%;
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
      max-height: 800rpx;
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