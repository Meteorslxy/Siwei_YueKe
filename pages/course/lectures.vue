<template>
  <view class="lectures">
    <view class="filter-bar">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input type="text" v-model="keyword" placeholder="搜索讲座" confirm-type="search" @confirm="search" />
      </view>
    </view>
    
    <view class="lecture-list">
      <block v-if="lectureList.length > 0">
        <view class="lecture-item" 
              v-for="(lecture, index) in lectureList" 
              :key="lecture._id || index" 
              :data-lecture-id="lecture._id"
              :data-index="index"
              @tap.stop="handleLectureClick($event, lecture)">
          <view class="lecture-image">
            <image :src="lecture.coverImage || '/static/images/course-default.jpg'" mode="aspectFill"></image>
          </view>
          
          <view class="lecture-info">
            <view class="lecture-title">{{lecture.title || '无标题'}}</view>
            
            <view class="lecture-meta">
              <view class="lecture-time">
                <text class="iconfont icon-time"></text>
                <text>{{formatDate(lecture.startTime)}}</text>
              </view>
              
              <view class="lecture-location">
                <text class="iconfont icon-location"></text>
                <text>{{lecture.location || '待定'}}</text>
              </view>
            </view>
            
            <view class="lecture-speaker">
              <text>主讲人：{{lecture.speaker || '待定'}}</text>
            </view>
            
            <view class="lecture-status" :class="{ 'status-ongoing': isOngoing(lecture), 'status-end': isEnded(lecture) }">
              {{getLectureStatus(lecture)}}
            </view>
          </view>
        </view>
      </block>
      <empty-tip v-else tip="暂无讲座" :show="!loading"></empty-tip>
      
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      lectureList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  onLoad() {
    this.getLectureList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 搜索
    search() {
      this.refreshList();
    },
    
    // 刷新列表
    refreshList() {
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.lectureList = [];
      this.getLectureList();
    },
    
    // 获取讲座列表
    getLectureList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword
      };
      
      uni.showLoading({ title: '加载中' });
      
      // 调用获取讲座列表接口
      this.$api.lecture.getLectureList(params)
        .then(res => {
          const list = res.data || [];
          
          // 验证每个讲座对象是否有_id
          const validList = list.map(item => {
            if (!item._id) {
              console.warn('发现没有_id的讲座数据:', item);
            }
            return item;
          });
          
          if (this.page === 1) {
            this.lectureList = validList;
          } else {
            this.lectureList = [...this.lectureList, ...validList];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
          
          uni.stopPullDownRefresh();
        })
        .catch(err => {
          console.error('获取讲座列表失败', err);
          uni.showToast({
            title: '获取讲座列表失败',
            icon: 'none'
          });
          this.loadMoreStatus = 'more';
          uni.stopPullDownRefresh();
        })
        .finally(() => {
          this.loading = false;
          uni.hideLoading();
        });
    },
    
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.getLectureList();
      }
    },
    
    // 处理讲座点击
    handleLectureClick(event, lecture) {
      console.log('handleLectureClick事件触发，event:', event);
      console.log('handleLectureClick传入的lecture:', lecture);
      console.log('事件currentTarget:', event.currentTarget);
      console.log('事件target:', event.target);
      
      // 获取数据集
      const dataset = event.currentTarget.dataset;
      console.log('点击项的dataset:', dataset);
      
      // 使用dataset作为备用
      if (!lecture && dataset && dataset.lectureId) {
        console.log('lecture参数为空，尝试从dataset获取lectureId:', dataset.lectureId);
        const index = dataset.index;
        if (this.lectureList && this.lectureList[index]) {
          console.log('从列表中获取到讲座数据', this.lectureList[index]);
          lecture = this.lectureList[index];
        }
      }
      
      this.goToDetail(lecture);
    },
    
    // 跳转到详情页
    goToDetail(lecture) {
      console.log('goToDetail被调用，lecture:', lecture);
      
      if (!lecture) {
        console.error('讲座对象为undefined');
        const currentRoute = getCurrentPages().pop().route;
        console.log('当前页面路由:', currentRoute);
        
        uni.showToast({
          title: '讲座信息不完整',
          icon: 'none'
        });
        return;
      }
      
      if (!lecture._id) {
        console.error('讲座没有_id字段', lecture);
        uni.showToast({
          title: '讲座信息不完整',
          icon: 'none'
        });
        return;
      }
      
      uni.navigateTo({
        url: `/pages/course/lecture-detail?id=${lecture._id}`
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
    }
  }
}
</script>

<style lang="scss">
.lectures {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
  
  .filter-bar {
    padding: 20rpx;
    background-color: #fff;
    
    .search-box {
      display: flex;
      align-items: center;
      height: 70rpx;
      background-color: #f5f5f5;
      border-radius: 35rpx;
      padding: 0 20rpx;
      
      .iconfont {
        font-size: 28rpx;
        color: #999;
        margin-right: 10rpx;
      }
      
      input {
        flex: 1;
        height: 100%;
        font-size: 26rpx;
      }
    }
  }
  
  .lecture-list {
    flex: 1;
    padding: 20rpx;
  }
  
  .lecture-item {
    display: flex;
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 8rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .lecture-image {
      width: 220rpx;
      height: 160rpx;
      
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    .lecture-info {
      flex: 1;
      padding: 16rpx;
      position: relative;
      
      .lecture-title {
        font-size: 28rpx;
        font-weight: bold;
        margin-bottom: 16rpx;
        line-height: 1.3;
      }
      
      .lecture-meta {
        display: flex;
        flex-wrap: wrap;
        font-size: 24rpx;
        color: #666;
        margin-bottom: 10rpx;
        
        .lecture-time, .lecture-location {
          display: flex;
          align-items: center;
          margin-right: 20rpx;
          
          .iconfont {
            font-size: 24rpx;
            color: #999;
            margin-right: 6rpx;
          }
        }
      }
      
      .lecture-speaker {
        font-size: 24rpx;
        color: #666;
      }
      
      .lecture-status {
        position: absolute;
        right: 16rpx;
        bottom: 16rpx;
        font-size: 24rpx;
        color: #FF6B00;
        
        &.status-ongoing {
          color: #007AFF;
        }
        
        &.status-end {
          color: #999;
        }
      }
    }
  }
}
</style> 