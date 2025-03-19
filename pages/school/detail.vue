<template>
  <view class="school-detail">
    <view class="school-header">
      <swiper class="banner" indicator-dots autoplay circular>
        <swiper-item v-for="(item, index) in school.gallery || []" :key="index">
          <image :src="item" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
      
      <view class="school-info">
        <view class="school-name">{{school.name}}</view>
        <view class="school-address" @click="openLocation">
          <text class="iconfont icon-location"></text>
          <text>{{school.address}}</text>
          <text class="navigate">导航</text>
        </view>
        <view class="school-phone" @click="callPhone">
          <text class="iconfont icon-phone"></text>
          <text>{{school.phone}}</text>
          <text class="call">拨打</text>
        </view>
      </view>
    </view>
    
    <view class="school-tabs">
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
    
    <view class="school-content">
      <!-- 学校简介 -->
      <view v-if="currentTab === 0" class="intro-container">
        <view class="section-title">学校简介</view>
        <view class="intro-text">{{school.introduction}}</view>
        
        <view class="section-title">师资力量</view>
        <view class="teacher-list">
          <teacher-card 
            v-for="(teacher, index) in school.teachers" 
            :key="teacher._id || index" 
            :teacher="teacher"
          ></teacher-card>
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
      
      <!-- 环境设施 -->
      <view v-if="currentTab === 2" class="facility-container">
        <view class="section-title">环境设施</view>
        <view class="facility-list">
          <view class="facility-item" v-for="(item, index) in school.facilities || []" :key="index">
            <image :src="item.image" mode="aspectFill"></image>
            <view class="facility-name">{{item.name}}</view>
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
      schoolId: '',
      school: {
        name: '',
        address: '',
        phone: '',
        introduction: '',
        gallery: [],
        teachers: [],
        facilities: []
      },
      tabs: [
        { name: '学校简介', id: 'intro' },
        { name: '课程列表', id: 'courses' },
        { name: '环境设施', id: 'facility' }
      ],
      currentTab: 0,
      courseList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true
    }
  },
  onLoad(options) {
    if (options.id) {
      this.schoolId = options.id;
      this.getSchoolDetail();
    }
  },
  methods: {
    // 获取学校详情
    getSchoolDetail() {
      uni.showLoading({ title: '加载中' });
      
      // 这里假设有一个获取学校详情的接口
      wx.cloud.callFunction({
        name: 'getSchoolDetail',
        data: {
          schoolId: this.schoolId
        },
        success: res => {
          if (res.result && res.result.data) {
            this.school = res.result.data;
            uni.setNavigationBarTitle({ title: this.school.name });
          } else {
            uni.showToast({
              title: '获取学校信息失败',
              icon: 'none'
            });
          }
        },
        fail: err => {
          console.error('获取学校详情失败', err);
          uni.showToast({
            title: '获取学校信息失败',
            icon: 'none'
          });
        },
        complete: () => {
          uni.hideLoading();
          
          // 初始加载课程列表
          if (this.currentTab === 1) {
            this.getCourseList();
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
      }
    },
    
    // 获取学校课程列表
    getCourseList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      // 构建请求参数
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        schoolId: this.schoolId
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
    
    // 加载更多课程
    loadMore() {
      if (this.hasMore && !this.loading && this.currentTab === 1) {
        this.page++;
        this.getCourseList();
      }
    },
    
    // 打开地图导航
    openLocation() {
      if (!this.school.latitude || !this.school.longitude) {
        uni.showToast({
          title: '暂无定位信息',
          icon: 'none'
        });
        return;
      }
      
      uni.openLocation({
        latitude: this.school.latitude,
        longitude: this.school.longitude,
        name: this.school.name,
        address: this.school.address,
        fail: () => {
          uni.showToast({
            title: '打开地图失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 拨打电话
    callPhone() {
      if (!this.school.phone) {
        uni.showToast({
          title: '暂无联系电话',
          icon: 'none'
        });
        return;
      }
      
      uni.makePhoneCall({
        phoneNumber: this.school.phone,
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
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
    }
  }
}
</script>

<style lang="scss">
.school-detail {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  
  .school-header {
    background-color: #fff;
    margin-bottom: 20rpx;
    
    .banner {
      width: 100%;
      height: 400rpx;
      
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    .school-info {
      padding: 30rpx;
      
      .school-name {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .school-address, .school-phone {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #666;
        margin-bottom: 16rpx;
        
        .iconfont {
          font-size: 28rpx;
          color: #999;
          margin-right: 10rpx;
        }
        
        .navigate, .call {
          margin-left: auto;
          color: #FF6B00;
        }
      }
    }
  }
  
  .school-tabs {
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
  
  .school-content {
    flex: 1;
    padding: 0 20rpx 20rpx;
    
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
    }
    
    .facility-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      
      .facility-item {
        width: calc(50% - 20rpx);
        margin: 10rpx;
        
        image {
          width: 100%;
          height: 200rpx;
          border-radius: 8rpx;
        }
        
        .facility-name {
          font-size: 26rpx;
          color: #666;
          margin-top: 10rpx;
          text-align: center;
        }
      }
    }
  }
}
</style> 