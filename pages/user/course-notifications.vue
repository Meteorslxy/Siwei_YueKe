<template>
  <view class="notification-container">
    <!-- 顶部导航栏 -->
    <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-back" @click="goBack">
        <view class="back-arrow"></view>
      </view>
      <view class="nav-title">课程通知</view>
      <view class="nav-right"></view>
    </view>
    
    <view class="notification-content">
      <!-- 加载中状态 -->
      <view v-if="loading" class="loading-state">
        <uni-icons type="spinner-cycle" size="40" color="#EC7A49"></uni-icons>
        <text>正在加载通知...</text>
      </view>
      
      <!-- 空数据状态 -->
      <view v-else-if="notifications.length === 0" class="empty-state">
        <uni-icons type="info" size="60" color="#CCCCCC"></uni-icons>
        <text class="empty-text">暂无课程通知</text>
        <text class="empty-desc">您暂时没有任何课程通知，请稍后再来查看</text>
      </view>
      
      <!-- 通知列表 -->
      <scroll-view v-else class="notification-list" scroll-y="true" @scrolltolower="onScrollToBottom">
        <view 
          v-for="(item, index) in notifications" 
          :key="index" 
          class="notification-item"
          :class="{'unread': !item.isRead}"
        >
          <view class="notification-status" v-if="!item.isRead"></view>
          <view class="course-info">
            <text class="course-name">{{item.title || '未命名课程'}}</text>
            <text class="course-time">{{formatDate(item.updateTime || item.create_date)}}</text>
          </view>
          <view class="notification-content-text">
            <text>{{item.courseNoted || '暂无通知内容'}}</text>
          </view>
          <view class="course-details">
            <text class="teacher-name">授课教师: {{item.teacherName || '未指定'}}</text>
            <text class="location">上课地点: {{item.location || '未指定'}}</text>
            <text class="time">上课时间: {{item.startTime}}-{{item.endTime}}</text>
          </view>
        </view>
      </scroll-view>
      
      <!-- 加载更多 -->
      <view 
        v-if="hasMore && !loading && notifications.length > 0" 
        @click="loadMoreNotifications" 
        class="load-more"
      >
        <text>点击加载更多</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
      loading: false,
      page: 1,
      pageSize: 10,
      hasMore: false,
      userInfo: null,
      userBookings: [], // 存储用户已预约的课程ID
      statusBarHeight: 20 // 默认状态栏高度
    }
  },
  onLoad() {
    // 获取状态栏高度
    this.getStatusBarHeight();
    
    // 获取用户信息
    this.userInfo = uni.getStorageSync('userInfo');
    if (!this.userInfo || !this.userInfo._id) {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
      return;
    }
    
    // 直接获取课程通知
    this.getUserBookingsFromBookingList().then(() => {
      // 然后加载通知
      this.loadNotifications();
    }).catch(() => {
      // 如果获取预约失败，尝试从课程中获取通知
      this.getCoursesWithNotifications().then(() => {
        this.loadNotifications();
      });
    });
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
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 从用户预约列表获取课程ID
    async getUserBookingsFromBookingList() {
      try {
        const userId = this.userInfo.userId || this.userInfo._id;
        if (!userId) {
          throw new Error('无法获取用户ID');
        }
        
        console.log('正在获取用户ID为', userId, '的预约课程');
        
        // 使用数据库直接查询booking表
        const db = uniCloud.database();
        const bookingResult = await db.collection('bookings')
          .where({
            userId: userId,
            status: db.command.in(['pending', 'confirmed', 'confirmed_unpaid'])
          })
          .get();
        
        if (bookingResult && bookingResult.result && bookingResult.result.data) {
          const bookings = bookingResult.result.data || [];
          console.log('数据库直接查询获取到预约记录:', bookings.length, '条');
          
          // 提取课程ID
          const validCourseIds = bookings
            .map(booking => booking.courseId || booking.course_id)
            .filter(id => id);
          
          if (validCourseIds.length > 0) {
            this.userBookings = [...validCourseIds];
            console.log('从数据库获取的预约课程ID:', this.userBookings);
            return;
          }
        }
        
        // 如果数据库查询失败，尝试云函数
        return this.getUserBookings();
      } catch (error) {
        console.error('从数据库获取预约失败:', error);
        // 尝试云函数
        return this.getUserBookings();
      }
    },
    
    // 获取用户预约的课程ID (原有方法)
    async getUserBookings() {
      try {
        const userId = this.userInfo.userId || this.userInfo._id;
        if (!userId) {
          throw new Error('无法获取用户ID');
        }
        
        console.log('使用云函数获取用户ID为', userId, '的预约课程');
        
        // 调用云函数获取用户预约的课程ID
        const result = await uniCloud.callFunction({
          name: 'getBookings',
          data: {
            userId: userId,
            status: 'all' // 获取所有状态的预约
          }
        });
        
        if (result.result && result.result.code === 0 && result.result.data) {
          const bookings = result.result.data || [];
          console.log('云函数获取到预约记录:', bookings.length, '条');
          
          // 提取所有pending和confirmed状态的预约课程ID
          const validBookings = bookings
            .filter(booking => {
              // 包含pending, confirmed和confirmed_unpaid状态的预约
              return booking.status === 'pending' || 
                     booking.status === 'confirmed' || 
                     booking.status === 'confirmed_unpaid';
            })
            .map(booking => booking.courseId)
            .filter(id => id);
          
          // 使用普通数组而不是直接赋值，避免响应式问题
          this.userBookings = [...validBookings];
          console.log('云函数获取的可用预约课程ID:', this.userBookings);
          
          // 如果没有找到预约课程ID，尝试从全部bookings中提取
          if (this.userBookings.length === 0) {
            const allBookingIds = bookings
              .map(booking => booking.courseId || booking.course_id)
              .filter(id => id);
            
            // 使用普通数组赋值
            this.userBookings = [...allBookingIds];
            console.log('从全部预约记录中提取课程ID:', this.userBookings);
          }
        } else {
          console.warn('获取用户预约数据失败:', result);
          throw new Error('获取用户预约数据失败');
        }
      } catch (error) {
        console.error('获取用户预约课程ID出错:', error);
        throw error; // 继续向上抛出错误
      }
    },
    
    // 直接从courses集合获取有通知的课程
    async getCoursesWithNotifications() {
      try {
        console.log('正在直接从courses集合中查询所有有通知的课程');
        
        // 使用数据库API查询courses集合
        const db = uniCloud.database();
        // 查询所有有courseNoted字段的课程
        const { result } = await db.collection('courses')
          .where({
            courseNoted: db.command.exists(true)
          })
          .limit(100) // 获取最多100条记录
          .get();
        
        if (result && result.data && result.data.length > 0) {
          // 提取课程ID
          const courseIds = result.data
            .filter(course => course.courseNoted && course.courseNoted.trim() !== '')
            .map(course => course._id);
          
          console.log('从courses集合获取到有通知的课程ID:', courseIds);
          
          // 更新userBookings，使用普通数组赋值，避免响应式问题
          if (this.userBookings.length === 0) {
            this.userBookings = [...courseIds];
          } else {
            // 合并两个数组并去重，使用普通数组
            const mergedIds = [...new Set([...this.userBookings, ...courseIds])];
            this.userBookings = mergedIds;
          }
          
          console.log('合并后的课程ID:', this.userBookings);
        } else {
          console.log('未找到任何有通知的课程');
        }
      } catch (error) {
        console.error('获取有通知的课程出错:', error);
      }
    },
    
    // 加载通知
    async loadNotifications() {
      if (this.loading) return;
      
      this.loading = true;
      
      try {
        // 检查userBookings是否为空数组
        if (!this.userBookings || this.userBookings.length === 0) {
          console.log('没有预约的课程ID，无法获取通知');
          this.notifications = [];
          this.hasMore = false;
          this.loading = false;
          return;
        }
        
        console.log('准备查询课程通知，课程ID:', this.userBookings);
        
        // 使用数据库API直接查询courses集合
        const db = uniCloud.database();
        
        // 查询用户已预约的并且有课程通知的课程
        const { result } = await db.collection('courses')
          .where({
            _id: db.command.in(this.userBookings),
            courseNoted: db.command.exists(true) // 只查询有courseNoted字段的课程
          })
          .skip((this.page - 1) * this.pageSize)
          .limit(this.pageSize)
          .orderBy('updateTime', 'desc')
          .get();
        
        console.log('从courses数据库获取的通知:', result);
        
        if (result && result.data) {
          const courseNotifications = result.data.filter(course => 
            course.courseNoted && course.courseNoted.trim() !== ''
          );
          
          console.log('过滤后的课程通知:', courseNotifications.length, '条');
          
          // 标记通知为未读（这里可以根据需要添加已读状态的逻辑）
          const notificationsWithReadStatus = courseNotifications.map(notification => {
            return {...notification, isRead: false}; // 创建新对象，避免直接修改原对象
          });
          
          // 更新通知列表
          if (this.page === 1) {
            this.notifications = notificationsWithReadStatus;
          } else {
            this.notifications = [...this.notifications, ...notificationsWithReadStatus];
          }
          
          // 判断是否有更多数据
          this.hasMore = courseNotifications.length === this.pageSize;
          
          // 如果没有通知但有课程ID，尝试不使用条件查询
          if (courseNotifications.length === 0 && this.page === 1) {
            console.log('没有找到通知，尝试不使用courseNoted条件查询');
            await this.loadAllCoursesNotifications();
          }
        } else {
          if (this.page === 1) {
            console.log('查询结果为空，尝试不使用courseNoted条件查询');
            await this.loadAllCoursesNotifications();
          }
        }
      } catch (error) {
        console.error('获取课程通知出错:', error);
        uni.showToast({
          title: '获取通知失败',
          icon: 'none'
        });
        if (this.page === 1) {
          this.notifications = [];
          // 尝试不使用条件查询
          await this.loadAllCoursesNotifications();
        }
      } finally {
        this.loading = false;
      }
    },
    
    // 不使用courseNoted条件，直接获取所有课程
    async loadAllCoursesNotifications() {
      try {
        if (!this.userBookings || this.userBookings.length === 0) return;
        
        console.log('正在获取所有预约课程，不使用courseNoted条件');
        
        const db = uniCloud.database();
        
        // 直接查询用户已预约的所有课程
        const { result } = await db.collection('courses')
          .where({
            _id: db.command.in(this.userBookings)
          })
          .limit(this.pageSize)
          .get();
        
        console.log('获取到所有预约课程:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 过滤出有通知内容的课程
          const courseNotifications = result.data.filter(course => 
            course.courseNoted && course.courseNoted.trim() !== ''
          );
          
          console.log('过滤后有通知的课程:', courseNotifications.length, '条');
          
          if (courseNotifications.length > 0) {
            // 标记为未读
            const notificationsWithReadStatus = courseNotifications.map(notification => {
              return {...notification, isRead: false};
            });
            
            // 更新通知列表
            this.notifications = notificationsWithReadStatus;
          }
        }
      } catch (error) {
        console.error('获取所有预约课程失败:', error);
      }
    },
    
    // 监听滚动到底部事件
    onScrollToBottom() {
      if (this.hasMore && !this.loading) {
        this.loadMoreNotifications();
      }
    },
    
    // 加载更多通知
    loadMoreNotifications() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.loadNotifications();
      }
    },
    
    // 格式化日期
    formatDate(dateString) {
      if (!dateString) return '未知时间';
      
      try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      } catch (e) {
        console.error('日期格式化错误:', e);
        return '格式错误';
      }
    }
  }
}
</script>

<style lang="scss">
.notification-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏样式 */
.navbar {
  background-color: #EC7A49;
  display: flex;
  align-items: center;
  height: 44px;
  position: relative;
  z-index: 100;
}

.nav-back {
  width: 60px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  width: 12px;
  height: 12px;
  border-top: 2px solid #FFFFFF;
  border-left: 2px solid #FFFFFF;
  transform: rotate(-45deg);
}

.nav-title {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  // font-weight: normal;
  color: #FFFFFF;
}

.nav-right {
  width: 60px;
  height: 44px;
}

.notification-content {
  flex: 1;
  padding: 30rpx;
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}

.loading-image {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 20rpx;
}

.empty-image {
  width: 240rpx;
  height: 240rpx;
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.empty-desc {
  font-size: 26rpx;
  color: #999;
  text-align: center;
  line-height: 1.5;
}

.loading-state text {
  font-size: 28rpx;
  color: #999;
}

.notification-list {
  padding: 10rpx 0;
  max-height: calc(100vh - 130rpx);
}

.notification-item {
  position: relative;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
}

.notification-item:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.notification-item.unread {
  border-left: 8rpx solid #EC7A49;
}

.notification-status {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #EC7A49;
}

.notification-item .course-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
  padding-bottom: 20rpx;
}

.notification-item .course-info .course-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.notification-item .course-info .course-time {
  font-size: 26rpx;
  color: #999;
}

.notification-item .notification-content-text {
  font-size: 30rpx;
  color: #666;
  line-height: 1.6;
  padding: 10rpx 0;
  margin-bottom: 20rpx;
  border-bottom: 1rpx dashed #f0f0f0;
}

.notification-item .course-details {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  font-size: 26rpx;
  color: #888;
}

.load-more {
  text-align: center;
  padding: 30rpx 0;
  color: #666;
  font-size: 28rpx;
  background: rgba(236, 122, 73, 0.1);
  border-radius: 12rpx;
  margin-top: 20rpx;
}

.load-more:active {
  opacity: 0.7;
}
</style> 