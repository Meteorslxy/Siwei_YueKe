<template>
  <view class="lecture-detail">
    <!-- 固定在右上角的收藏按钮 -->
    <view class="fixed-favorite-wrapper" :style="{top: statusBarHeight + 'px'}">
      <favorite-button 
        :itemId="lectureId" 
        itemType="lecture" 
        :itemTitle="lecture.title" 
        :itemCover="lecture.coverImage || '/static/images/course-default.jpg'"
        @favorite-change="onFavoriteChange"
        @statusBarHeight="onStatusBarHeight"
      ></favorite-button>
    </view>
    
    <view class="lecture-header">
      <image class="lecture-image" :src="lecture.coverImage || '/static/images/course-default.jpg'" mode="aspectFill"></image>
      <view class="lecture-overlay"></view>
      <view class="lecture-title">{{lecture.title}}</view>
    </view>
    
    <view class="lecture-info">
      <view class="info-item">
        <text class="iconfont icon-time info-icon"></text>
        <text>{{formatDate(lecture.startTime)}} - {{formatTime(new Date(lecture.endTime))}}</text>
      </view>
      
      <view class="info-item">
        <text class="iconfont icon-location info-icon"></text>
        <text>{{lecture.location || '待定'}}</text>
      </view>
      
      <view class="info-item">
        <text class="iconfont icon-teacher info-icon"></text>
        <text>{{lecture.speaker || '待定'}}</text>
      </view>
      
      <view class="info-price">
        <text class="price-label">讲座价格:</text>
        <text class="price-value" v-if="lecture.price > 0">¥{{lecture.price}}</text>
        <text class="price-free" v-else>免费</text>
      </view>
      
      <view class="info-status">
        <text class="status-label">讲座状态:</text>
        <text class="status-value" :class="{ 'status-ongoing': isOngoing(lecture), 'status-end': isEnded(lecture) }">
          {{getLectureStatus(lecture)}}
        </text>
      </view>
      
      <view class="info-attendees">
        <text class="attendees-label">已报名:</text>
        <text class="attendees-value">{{lecture.currentAttendees || 0}}/{{lecture.maxAttendees || '不限'}}</text>
      </view>
    </view>
    
    <view class="lecture-tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="tab-item" 
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{tab.name}}
      </view>
    </view>
    
    <view class="lecture-content">
      <!-- 讲座简介 -->
      <view v-if="currentTab === 0" class="intro-container">
        <view class="section-title">讲座简介</view>
        <view class="intro-text">{{lecture.description || '暂无简介'}}</view>
        
        <view class="section-title">讲座内容</view>
        <view class="content-text" v-if="lecture.content">
          <text>{{lecture.content}}</text>
        </view>
        <empty-tip v-else tip="暂无详细内容" :show="true"></empty-tip>
      </view>
      
      <!-- 讲师介绍 -->
      <view v-if="currentTab === 1" class="speaker-container">
        <view v-if="lecture.speakerInfo" class="speaker-info">
          <image class="speaker-avatar" :src="lecture.speakerInfo.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
          <view class="speaker-detail">
            <view class="speaker-name">{{lecture.speakerInfo.name}}</view>
            <view class="speaker-title">{{lecture.speakerInfo.title}}</view>
          </view>
          <view class="speaker-intro">
            <view class="section-title">讲师介绍</view>
            <view class="intro-text">{{lecture.speakerInfo.introduction || '暂无介绍'}}</view>
          </view>
        </view>
        <empty-tip v-else tip="暂无讲师信息" :show="true"></empty-tip>
      </view>
      
      <!-- 相关讲座 -->
      <view v-if="currentTab === 2" class="related-container">
        <view v-if="lecture.recommendLectures && lecture.recommendLectures.length > 0" class="related-list">
          <view class="related-item" v-for="(item, index) in lecture.recommendLectures" :key="index" @click="goToLecture(item)">
            <image class="related-image" :src="item.coverImage || '/static/images/course-default.jpg'" mode="aspectFill"></image>
            <view class="related-info">
              <view class="related-title">{{item.title}}</view>
              <view class="related-time">{{formatDate(item.startTime)}}</view>
            </view>
          </view>
        </view>
        <empty-tip v-else tip="暂无相关讲座" :show="true"></empty-tip>
      </view>
    </view>
    
    <!-- 暂时隐藏报名按钮 -->
    <!-- <view class="action-bar">
      <button class="action-button" :disabled="isEnded(lecture)" @click="registerLecture">
        {{isEnded(lecture) ? '已结束' : '立即报名'}}
      </button>
    </view> -->
  </view>
</template>

<script>
import FavoriteButton from '@/components/favorite-button/favorite-button.vue';

export default {
  components: {
    FavoriteButton
  },
  data() {
    return {
      lectureId: '',
      lecture: {
        title: '',
        description: '',
        content: '',
        coverImage: '',
        speaker: '',
        location: '',
        startTime: '',
        endTime: '',
        price: 0,
        maxAttendees: 0,
        currentAttendees: 0,
        speakerInfo: null,
        recommendLectures: []
      },
      tabs: [
        { name: '讲座详情', id: 'intro' },
        { name: '讲师介绍', id: 'speaker' },
        { name: '相关讲座', id: 'related' }
      ],
      currentTab: 0,
      loading: false,
      statusBarHeight: 90 // 默认状态栏高度（rpx单位）
    }
  },
  onLoad(options) {
    if (options.id) {
      this.lectureId = options.id;
      this.getLectureDetail();
    }
  },
  methods: {
    // 获取讲座详情
    getLectureDetail() {
      this.loading = true;
      uni.showLoading({ title: '加载中' });
      
      this.$api.lecture.getLectureDetail(this.lectureId)
        .then(res => {
          if (res && res.data) {
            this.lecture = res.data;
            
            // 处理封面图片路径
            this.processImageUrls();
            
            uni.setNavigationBarTitle({ title: this.lecture.title });
          } else {
            uni.showToast({
              title: '获取讲座信息失败',
              icon: 'none'
            });
          }
        })
        .catch(err => {
          console.error('获取讲座详情失败', err);
          uni.showToast({
            title: '获取讲座信息失败',
            icon: 'none'
          });
        })
        .finally(() => {
          this.loading = false;
          uni.hideLoading();
        });
    },
    
    // 处理图片URL
    processImageUrls() {
      // 处理主图片
      if (this.lecture.coverImage) {
        // 检查是否为完整URL（以http或https开头）
        if (this.lecture.coverImage.startsWith('http://') || this.lecture.coverImage.startsWith('https://')) {
          // 保持原样，这是完整的URL
          console.log('使用云存储URL作为讲座封面图:', this.lecture.coverImage);
        } 
        // 检查是否为本地路径（以/开头）
        else if (this.lecture.coverImage.startsWith('/')) {
          // 已经是本地路径，保持原样
          console.log('使用本地绝对路径作为讲座封面图:', this.lecture.coverImage);
        } 
        // 其他情况，可能是相对路径
        else {
          this.lecture.coverImage = `/static/images/course/${this.lecture.coverImage}`;
          console.log('转换为本地相对路径作为讲座封面图:', this.lecture.coverImage);
        }
      } else {
        this.lecture.coverImage = '/static/images/course-default.jpg';
      }
      
      // 处理推荐讲座的图片
      if (this.lecture.recommendLectures && this.lecture.recommendLectures.length > 0) {
        this.lecture.recommendLectures.forEach(item => {
          if (item.coverImage) {
            // 检查是否为完整URL
            if (item.coverImage.startsWith('http://') || item.coverImage.startsWith('https://')) {
              // 保持原样
              console.log('使用云存储URL作为推荐讲座封面图:', item.coverImage);
            } 
            // 检查是否为本地路径
            else if (item.coverImage.startsWith('/')) {
              // 已经是本地路径，保持原样
              console.log('使用本地绝对路径作为推荐讲座封面图:', item.coverImage);
            } 
            // 其他情况，转为本地相对路径
            else {
              item.coverImage = `/static/images/course/${item.coverImage}`;
              console.log('转换为本地相对路径作为推荐讲座封面图:', item.coverImage);
            }
          } else {
            item.coverImage = '/static/images/course-default.jpg';
          }
        });
      }
      
      // 处理讲师头像
      if (this.lecture.speakerInfo && this.lecture.speakerInfo.avatar) {
        // 检查是否为完整URL
        if (this.lecture.speakerInfo.avatar.startsWith('http://') || this.lecture.speakerInfo.avatar.startsWith('https://')) {
          // 保持原样
          console.log('使用云存储URL作为讲师头像:', this.lecture.speakerInfo.avatar);
        } 
        // 检查是否为本地路径
        else if (this.lecture.speakerInfo.avatar.startsWith('/')) {
          // 已经是本地路径，保持原样
          console.log('使用本地绝对路径作为讲师头像:', this.lecture.speakerInfo.avatar);
        } 
        // 其他情况，转为本地相对路径
        else {
          this.lecture.speakerInfo.avatar = `/static/images/teacher/${this.lecture.speakerInfo.avatar}`;
          console.log('转换为本地相对路径作为讲师头像:', this.lecture.speakerInfo.avatar);
        }
      }
    },
    
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
    },
    
    // 跳转到其他讲座
    goToLecture(lecture) {
      uni.navigateTo({
        url: `/pkgs/course/lecture-detail?id=${lecture._id}`
      });
    },
    
    // 报名讲座
    registerLecture() {
      // 判断讲座是否已结束
      if (this.isEnded(this.lecture)) {
        uni.showToast({
          title: '讲座已结束，无法报名',
          icon: 'none'
        });
        return;
      }
      
      // 判断讲座是否已满员
      if (this.lecture.currentAttendees >= this.lecture.maxAttendees) {
        uni.showToast({
          title: '讲座已满员，无法报名',
          icon: 'none'
        });
        return;
      }
      
      // 这里实现报名逻辑
      uni.showToast({
        title: '报名功能尚未实现',
        icon: 'none'
      });
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '待定';
      
      const date = new Date(timestamp);
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${this.formatTime(date)}`;
    },
    
    // 格式化时间
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    
    // 是否进行中
    isOngoing(lecture) {
      if (!lecture.startTime || !lecture.endTime) return false;
      
      const now = Date.now();
      return now >= lecture.startTime && now <= lecture.endTime;
    },
    
    // 是否已结束
    isEnded(lecture) {
      if (!lecture.endTime) return false;
      
      return Date.now() > lecture.endTime;
    },
    
    // 获取讲座状态
    getLectureStatus(lecture) {
      if (this.isEnded(lecture)) {
        return '已结束';
      } else if (this.isOngoing(lecture)) {
        return '进行中';
      } else {
        return '即将开始';
      }
    },
    
    // 收藏状态变更
    onFavoriteChange(isFavorite) {
      console.log('收藏状态变更:', isFavorite);
    },
    
    // 获取状态栏高度
    onStatusBarHeight(height) {
      // 状态栏高度 + 10px的间距
      this.statusBarHeight = height + 10;
      console.log('讲座详情页设置状态栏高度:', this.statusBarHeight);
    }
  }
}
</script>

<style lang="scss">
.lecture-detail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
  
  .lecture-header {
    position: relative;
    height: 400rpx;
    
    .lecture-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .lecture-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
    }
    
    .lecture-title {
      position: absolute;
      bottom: 40rpx;
      left: 30rpx;
      right: 90rpx;
      color: #fff;
      font-size: 38rpx;
      font-weight: bold;
      line-height: 1.4;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
  }
  
  .lecture-info {
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      font-size: 28rpx;
      color: #333;
      
      .info-icon {
        font-size: 32rpx;
        color: #FF6B00;
        margin-right: 15rpx;
      }
    }
    
    .info-price, .info-status, .info-attendees {
      display: flex;
      align-items: center;
      margin-top: 30rpx;
      font-size: 28rpx;
      
      .price-label, .status-label, .attendees-label {
        color: #666;
        margin-right: 15rpx;
      }
      
      .price-value {
        color: #FF6B00;
        font-weight: bold;
      }
      
      .price-free {
        color: #4CAF50;
      }
      
      .status-value {
        color: #FF6B00;
        
        &.status-ongoing {
          color: #007AFF;
        }
        
        &.status-end {
          color: #999;
        }
      }
      
      .attendees-value {
        color: #333;
      }
    }
  }
  
  .lecture-tabs {
    display: flex;
    background-color: #fff;
    padding: 0 20rpx;
    border-bottom: 1rpx solid #eee;
    
    .tab-item {
      padding: 24rpx 30rpx;
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      &.active {
        color: #FF6B00;
        font-weight: bold;
        
        &:after {
          content: '';
          position: absolute;
          left: 30rpx;
          right: 30rpx;
          bottom: 0;
          height: 6rpx;
          background-color: #FF6B00;
          border-radius: 3rpx;
        }
      }
    }
  }
  
  .lecture-content {
    flex: 1;
    background-color: #fff;
    padding: 30rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      margin: 20rpx 0;
      padding-left: 15rpx;
      border-left: 6rpx solid #FF6B00;
    }
    
    .intro-text, .content-text {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      margin-bottom: 30rpx;
      white-space: pre-wrap;
    }
    
    .speaker-info {
      display: flex;
      flex-direction: column;
      
      .speaker-avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        margin-bottom: 20rpx;
      }
      
      .speaker-detail {
        margin-bottom: 20rpx;
        
        .speaker-name {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
        }
        
        .speaker-title {
          font-size: 26rpx;
          color: #666;
          margin-top: 10rpx;
        }
      }
      
      .speaker-intro {
        margin-top: 20rpx;
      }
    }
    
    .related-list {
      .related-item {
        display: flex;
        margin-bottom: 30rpx;
        padding-bottom: 30rpx;
        border-bottom: 1rpx solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
        
        .related-image {
          width: 200rpx;
          height: 120rpx;
          border-radius: 8rpx;
        }
        
        .related-info {
          flex: 1;
          margin-left: 20rpx;
          
          .related-title {
            font-size: 28rpx;
            font-weight: bold;
            color: #333;
            margin-bottom: 15rpx;
          }
          
          .related-time {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
    }
  }
}

/* 固定在右上角的收藏按钮 */
.fixed-favorite-wrapper {
  position: fixed;
  right: 30rpx;
  z-index: 9999;
}
</style> 