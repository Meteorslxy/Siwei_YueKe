<template>
  <view class="teacher-detail">
    <view class="teacher-header">
      <view class="avatar-container">
        <image class="teacher-avatar" :src="teacher.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
      </view>
      
      <view class="teacher-info">
        <view class="teacher-name">{{teacher.name}}</view>
        <view class="teacher-title">{{teacher.title}}</view>
      </view>
    </view>
    
    <view class="teacher-tabs">
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
    
    <view class="teacher-content">
      <!-- 教师简介 -->
      <view v-if="currentTab === 0" class="intro-container">
        <view class="section-title">教师简介</view>
        <view class="intro-text">{{teacher.introduction || '暂无简介'}}</view>
        
        <view class="section-title">教学经历</view>
        <view class="experience-list">
          <view class="experience-item" v-for="(item, index) in teacher.experiences || []" :key="index">
            <view class="experience-time">{{item.time}}</view>
            <view class="experience-desc">{{item.description}}</view>
          </view>
          <empty-tip v-if="!teacher.experiences || teacher.experiences.length === 0" tip="暂无教学经历" :show="true"></empty-tip>
        </view>
        
        <view class="section-title">所获奖项</view>
        <view class="awards-list">
          <view class="award-item" v-for="(item, index) in teacher.awards || []" :key="index">
            <view class="award-time">{{item.time}}</view>
            <view class="award-name">{{item.name}}</view>
          </view>
          <empty-tip v-if="!teacher.awards || teacher.awards.length === 0" tip="暂无获奖信息" :show="true"></empty-tip>
        </view>
      </view>
      
      <!-- 课程列表 -->
      <view v-if="currentTab === 1" class="course-container">
        <view v-if="courseList.length > 0" class="course-list">
          <course-card 
            v-for="(course, index) in courseList" 
            :key="course._id || index" 
            :course="course"
            @click="onCourseClick"
            @book="onBookClick"
          ></course-card>
        </view>
        <empty-tip v-else tip="暂无课程" :show="!loading"></empty-tip>
        
        <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
      </view>
      
      <!-- 学员评价 -->
      <view v-if="currentTab === 2" class="reviews-container">
        <view v-if="reviewList.length > 0" class="review-list">
          <view class="review-item" v-for="(review, index) in reviewList" :key="review._id || index">
            <view class="review-header">
              <image class="reviewer-avatar" :src="review.avatar || '/static/images/default-avatar.png'" mode="aspectFill"></image>
              <view class="reviewer-info">
                <view class="reviewer-name">{{review.userName}}</view>
                <view class="review-time">{{formatDate(review.createTime)}}</view>
              </view>
              <view class="review-rating">
                <text class="iconfont icon-favorite" v-for="i in 5" :key="i" :class="{ active: i <= review.rating }"></text>
              </view>
            </view>
            <view class="review-content">{{review.content}}</view>
          </view>
        </view>
        <empty-tip v-else tip="暂无评价" :show="!reviewLoading"></empty-tip>
        
        <load-more :status="reviewLoadMoreStatus" @click="loadMoreReviews"></load-more>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      teacherId: '',
      teacher: {
        name: '',
        title: '',
        avatar: '',
        introduction: '',
        experiences: [],
        awards: []
      },
      tabs: [
        { name: '个人简介', id: 'intro' },
        { name: '课程列表', id: 'courses' },
        { name: '学员评价', id: 'reviews' }
      ],
      currentTab: 0,
      courseList: [],
      reviewList: [],
      page: 1,
      reviewPage: 1,
      pageSize: 10,
      loading: false,
      reviewLoading: false,
      loadMoreStatus: 'more',
      reviewLoadMoreStatus: 'more',
      hasMore: true,
      hasMoreReviews: true
    }
  },
  onLoad(options) {
    if (options.id) {
      this.teacherId = options.id;
      this.getTeacherDetail();
    }
  },
  methods: {
    // 获取教师详情
    getTeacherDetail() {
      uni.showLoading({ title: '加载中' });
      
      // 这里假设有一个获取教师详情的接口
      wx.cloud.callFunction({
        name: 'getTeacherDetail',
        data: {
          teacherId: this.teacherId
        },
        success: res => {
          if (res.result && res.result.data) {
            this.teacher = res.result.data;
            uni.setNavigationBarTitle({ title: this.teacher.name });
          } else {
            uni.showToast({
              title: '获取教师信息失败',
              icon: 'none'
            });
          }
        },
        fail: err => {
          console.error('获取教师详情失败', err);
          uni.showToast({
            title: '获取教师信息失败',
            icon: 'none'
          });
        },
        complete: () => {
          uni.hideLoading();
          
          // 初始加载课程列表
          if (this.currentTab === 1) {
            this.getCourseList();
          } else if (this.currentTab === 2) {
            this.getReviewList();
          }
        }
      });
    },
    
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      
      // 切换到课程列表时加载课程
      if (index === 1 && this.courseList.length === 0) {
        this.getCourseList();
      } else if (index === 2 && this.reviewList.length === 0) {
        this.getReviewList();
      }
    },
    
    // 获取教师课程列表
    getCourseList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        teacherId: this.teacherId
      };
      
      uni.showLoading({ title: '加载中' });
      
      // 调用获取课程列表接口
      this.$api.course.getCourseList(params)
        .then(res => {
          const list = res.data || [];
          
          if (this.page === 1) {
            this.courseList = list;
          } else {
            this.courseList = [...this.courseList, ...list];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
        })
        .catch(err => {
          console.error('获取课程列表失败', err);
          uni.showToast({
            title: '获取课程列表失败',
            icon: 'none'
          });
          this.loadMoreStatus = 'more';
        })
        .finally(() => {
          this.loading = false;
          uni.hideLoading();
        });
    },
    
    // 获取教师评价列表
    getReviewList() {
      if (this.reviewLoading) return;
      
      this.reviewLoading = true;
      this.reviewLoadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.reviewPage,
        pageSize: this.pageSize,
        teacherId: this.teacherId
      };
      
      uni.showLoading({ title: '加载中' });
      
      // 这里假设有一个获取教师评价的接口
      wx.cloud.callFunction({
        name: 'getTeacherReviews',
        data: params,
        success: res => {
          if (res.result && res.result.data) {
            const list = res.result.data || [];
            
            if (this.reviewPage === 1) {
              this.reviewList = list;
            } else {
              this.reviewList = [...this.reviewList, ...list];
            }
            
            this.hasMoreReviews = list.length === this.pageSize;
            this.reviewLoadMoreStatus = this.hasMoreReviews ? 'more' : 'noMore';
          } else {
            uni.showToast({
              title: '获取评价失败',
              icon: 'none'
            });
            this.reviewLoadMoreStatus = 'more';
          }
        },
        fail: err => {
          console.error('获取评价失败', err);
          uni.showToast({
            title: '获取评价失败',
            icon: 'none'
          });
          this.reviewLoadMoreStatus = 'more';
        },
        complete: () => {
          this.reviewLoading = false;
          uni.hideLoading();
        }
      });
    },
    
    // 加载更多课程
    loadMore() {
      if (this.hasMore && !this.loading && this.currentTab === 1) {
        this.page++;
        this.getCourseList();
      }
    },
    
    // 加载更多评价
    loadMoreReviews() {
      if (this.hasMoreReviews && !this.reviewLoading && this.currentTab === 2) {
        this.reviewPage++;
        this.getReviewList();
      }
    },
    
    // 点击课程
    onCourseClick(course) {
      uni.navigateTo({
        url: `/pages/course/detail?id=${course._id}`
      });
    },
    
    // 点击预约
    onBookClick(course) {
      uni.navigateTo({
        url: `/pages/booking/create?id=${course._id}`
      });
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  }
}
</script>

<style lang="scss">
.teacher-detail {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  
  .teacher-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx 0;
    background-color: #fff;
    margin-bottom: 20rpx;
    
    .avatar-container {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
      
      .teacher-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    
    .teacher-info {
      text-align: center;
      
      .teacher-name {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
      }
      
      .teacher-title {
        font-size: 28rpx;
        color: #666;
      }
    }
  }
  
  .teacher-tabs {
    display: flex;
    background-color: #fff;
    padding: 0 20rpx;
    border-bottom: 1rpx solid #eee;
    margin-bottom: 20rpx;
    
    .tab-item {
      flex: 1;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      &.active {
        color: #FF6B00;
        font-weight: 500;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background-color: #FF6B00;
          border-radius: 2rpx;
        }
      }
    }
  }
  
  .teacher-content {
    flex: 1;
    padding: 20rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin: 30rpx 0 20rpx;
      position: relative;
      padding-left: 20rpx;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6rpx;
        height: 30rpx;
        background-color: #FF6B00;
        border-radius: 3rpx;
      }
    }
    
    .intro-text {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      background-color: #fff;
      padding: 20rpx;
      border-radius: 8rpx;
    }
    
    .experience-list, .awards-list {
      background-color: #fff;
      border-radius: 8rpx;
      padding: 10rpx 20rpx;
      
      .experience-item, .award-item {
        padding: 20rpx 0;
        border-bottom: 1rpx solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
      }
      
      .experience-time, .award-time {
        font-size: 26rpx;
        color: #999;
        margin-bottom: 10rpx;
      }
      
      .experience-desc, .award-name {
        font-size: 28rpx;
        color: #333;
      }
    }
    
    .review-list {
      .review-item {
        background-color: #fff;
        border-radius: 8rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;
        
        .review-header {
          display: flex;
          align-items: center;
          margin-bottom: 16rpx;
          
          .reviewer-avatar {
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
            margin-right: 16rpx;
          }
          
          .reviewer-info {
            flex: 1;
            
            .reviewer-name {
              font-size: 28rpx;
              color: #333;
              font-weight: 500;
            }
            
            .review-time {
              font-size: 24rpx;
              color: #999;
            }
          }
          
          .review-rating {
            display: flex;
            
            .iconfont {
              font-size: 28rpx;
              color: #ccc;
              margin-right: 6rpx;
              
              &.active {
                color: #FF6B00;
              }
            }
          }
        }
        
        .review-content {
          font-size: 28rpx;
          color: #666;
          line-height: 1.5;
        }
      }
    }
  }
}
</style> 