<template>
  <view class="booking-container">
    <!-- 状态筛选选项卡 -->
    <view class="tab-bar">
      <view 
        class="tab-item" 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="{ active: currentStatus === tab.value }"
        @click="changeTab(tab.value)">
        {{tab.label}}
        <view class="badge" v-if="getTabCount(tab.value) > 0">{{getTabCount(tab.value)}}</view>
      </view>
    </view>
    
    <!-- 预约记录列表 -->
    <view class="booking-list">
      <view 
        class="booking-item" 
        v-for="(item, index) in filteredBookingList" 
        :key="item._id || index"
        @click="viewDetail(item)">
        <view class="booking-header">
          <view class="course-title">{{item.courseTitle}}</view>
          <view class="booking-status" :class="'status-' + item.status">{{getStatusText(item.status)}}</view>
        </view>
        
        <view class="booking-info">
          <view class="info-row">
            <text class="info-label">预约编号：</text>
            <text class="info-value">{{item.bookingId}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">课程时间：</text>
            <text class="info-value">{{formatCourseTime(item.courseStartTime, item.courseEndTime)}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">校区地点：</text>
            <text class="info-value">{{item.schoolName}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">学生姓名：</text>
            <text class="info-value">{{item.studentName}}</text>
          </view>
          <view class="info-row">
            <text class="info-label">联系电话：</text>
            <text class="info-value">{{item.contactPhone}}</text>
          </view>
        </view>
        
        <view class="booking-footer">
          <view class="booking-time">{{formatBookingTime(item.createTime)}}</view>
          
          <view class="booking-actions">
            <view class="action-btn primary" 
                  v-if="item && item.status !== 'cancelled' && item.status !== 'finished'"
                  @click.stop="$event => cancelBooking(item, $event)">取消预约</view>
            <view class="action-btn" 
                  v-if="item && (item.status === 'confirmed' || item.status === 'confirmed_unpaid')"
                  @click.stop="$event => contactTeacher(item, $event)">联系老师</view>
            <view class="action-btn" 
                  v-if="item && item.status !== 'cancelled'"
                  @click.stop="$event => navigateToCourse(item.courseId, $event)">查看课程</view>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
      
      <!-- 空数据提示 -->
      <empty-tip v-if="filteredBookingList.length === 0" :tip="getEmptyTipText()"></empty-tip>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 状态筛选标签
      tabs: [
        { label: '全部', value: 'all' },
        { label: '已预约', value: 'booked' },
        { label: '已完成', value: 'finished' },
        { label: '已取消', value: 'cancelled' }
      ],
      currentStatus: 'all',
      
      // 列表数据
      bookingList: [],
      page: 1,
      limit: 10,
      total: 0,
      loadMoreStatus: 'more', // more-加载更多 loading-加载中 noMore-没有更多了
      
      // 当前操作的预约
      currentBooking: null,
      
      // 缓存的各状态预约数量
      statusCounts: {
        all: 0,
        booked: 0,
        finished: 0,
        cancelled: 0
      },
      
      // 是否已加载本地取消记录
      localCancelledLoaded: false
    }
  },
  computed: {
    // 根据当前选择的状态过滤预约列表
    filteredBookingList() {
      // 首先确保bookingList是数组且过滤掉无效项
      const validBookings = Array.isArray(this.bookingList) 
        ? this.bookingList.filter(item => item && typeof item === 'object' && item._id)
        : [];
      
      if (this.currentStatus === 'all') {
        return validBookings;
      }
      
      if (this.currentStatus === 'booked') {
        // 已预约包含所有非取消和非完成的状态
        return validBookings.filter(booking => 
          booking.status === 'pending' || 
          booking.status === 'confirmed_unpaid' || 
          booking.status === 'confirmed'
        );
      }
      
      if (this.currentStatus === 'cancelled') {
        // 已取消状态的过滤条件
        return validBookings.filter(booking => 
          booking.status === 'cancelled' || 
          booking.paymentStatus === 'cancelled' ||
          booking.status === 'cancel'
        );
      }
      
      // 其他状态直接按状态筛选
      return validBookings.filter(booking => booking.status === this.currentStatus);
    }
  },
  onLoad(options) {
    console.log('booking页面加载，参数:', options);
    
    // 处理特殊状态
    if (options.status) {
      // 处理booked状态（表示已预约的课程，包括待确认和已确认）
      if (options.status === 'usable' || options.status === 'booked') {
        this.currentStatus = 'booked';
      } 
      // 处理expired状态（表示已过期，即已完成）
      else if (options.status === 'expired' || options.status === 'finished') {
        this.currentStatus = 'finished';
      }
      // 处理canceled/cancelled状态（表示已取消）
      else if (options.status === 'canceled' || options.status === 'cancelled') {
        this.currentStatus = 'cancelled';
      }
      // 其他状态直接使用all
      else {
        this.currentStatus = 'all';
      }
    }
    
    console.log('设置当前状态为:', this.currentStatus);
    
    // 无论当前标签是什么，先加载本地已取消记录的数量
    this.loadLocalCancelledCount();
    
    // 加载预约记录
    this.loadBookingList();
  },
  onShow() {
    // 检查是否有预约状态变更
    const hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
    if (hasBookingChanged) {
      console.log('检测到预约状态变更，刷新列表');
      this.resetList();
      this.loadBookingList();
      // 重置标记
      uni.setStorageSync('booking_changed', 'false');
    }
  },
  onPullDownRefresh() {
    this.resetList()
    this.loadBookingList().then(() => {
      uni.stopPullDownRefresh()
    })
  },
  onReachBottom() {
    if (this.loadMoreStatus === 'more') {
      this.loadMore()
    }
  },
  methods: {
    // 切换筛选标签
    changeTab(status) {
      if (this.currentStatus === status) return
      
      this.currentStatus = status
      this.resetList()
      
      // 如果切换到已取消标签页，确保本地存储的已取消记录被加载
      if (status === 'cancelled') {
        console.log('切换到已取消标签页，确保加载本地记录');
        // 先尝试显示本地已取消记录
        try {
          const userInfoStr = uni.getStorageSync('userInfo');
          if (userInfoStr) {
            const userData = JSON.parse(userInfoStr);
            const userId = userData.userId || userData._id;
            if (userId) {
              // 从本地存储获取已取消预约
              const localCancelledBookings = this.getLocalCancelledBookings(userId);
              if (localCancelledBookings && localCancelledBookings.length > 0) {
                console.log(`找到${localCancelledBookings.length}条本地已取消记录，立即显示`);
                this.bookingList = localCancelledBookings;
                this.total = localCancelledBookings.length;
                this.$forceUpdate();
              }
            }
          }
        } catch (e) {
          console.error('尝试直接加载本地已取消记录失败:', e);
        }
      }
      
      this.loadBookingList();
    },
    
    // 重置列表数据
    resetList() {
      this.page = 1
      this.bookingList = []
    },
    
    // 加载更多
    loadMore() {
      this.page++
      this.loadBookingList()
    },
    
    // 加载预约记录列表
    async loadBookingList() {
      this.loadMoreStatus = 'loading'
      
      try {
        const userInfoStr = uni.getStorageSync('userInfo')
        if (!userInfoStr) {
          console.log('用户未登录，无法获取预约记录')
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.redirectTo({ url: '/pages/user/user' })
          }, 1500)
          return Promise.resolve()
        }
        
        let userData = null
        try {
          userData = JSON.parse(userInfoStr)
          console.log('解析到的用户信息:', userData)
        } catch (e) {
          console.error('解析用户信息失败:', e)
          uni.showToast({
            title: '用户数据异常',
            icon: 'none'
          })
          return Promise.resolve()
        }
        
        const userId = userData.userId || userData._id
        if (!userId) {
          console.error('未找到有效的用户ID')
          uni.showToast({
            title: '用户ID不存在',
            icon: 'none'
          })
          return Promise.resolve()
        }
        
        // 如果是已取消标签，先检查本地存储中是否有取消记录
        if (this.currentStatus === 'cancelled') {
          console.log('当前为已取消标签，优先检查本地存储');
          const localCancelledBookings = this.getLocalCancelledBookings(userId)
            .filter(item => item && item._id);
          
          if (localCancelledBookings.length > 0) {
            console.log(`找到${localCancelledBookings.length}条本地已取消记录，立即显示`);
            // 不完全替换，而是先加载本地数据
            this.bookingList = localCancelledBookings;
            this.total = localCancelledBookings.length;
            // 更新计数
            this.statusCounts.cancelled = localCancelledBookings.length;
            // 强制刷新UI
            this.$forceUpdate();
            uni.showToast({
              title: `加载了${localCancelledBookings.length}条已取消记录`,
              icon: 'none',
              duration: 1500
            });
          }
        }
        
        // 根据当前选择的状态获取查询参数
        // 注意：为了解决服务器可能存在的问题，始终获取所有预约记录，然后在前端过滤
        let status = '';
        let useClientFiltering = false;
        
        // 只为日志显示
        let statusForLog = this.currentStatus;
        
        // 如果请求特定状态并且不是全部，使用前端过滤
        if (this.currentStatus !== 'all') {
          useClientFiltering = true;
        }
        
        console.log('查询预约记录，状态:', statusForLog, '用户ID:', userId, '使用前端过滤:', useClientFiltering)
        
        // 调用云函数获取预约记录
        const res = await uniCloud.callFunction({
          name: 'getBookings',
          data: {
            userId: userId,
            status: '', // 获取所有状态的预约
            limit: this.limit * 5, // 增加获取数量以确保足够多的记录用于筛选
            skip: 0 // 从0开始获取以确保全部记录都获取到
          }
        })
        
        console.log('getBookings原始返回结果:', res.result)
        
        if (res.result && res.result.success) {
          // 过滤掉undefined和null值
          let allBookings = (res.result.data || []).filter(item => item && item._id);
          const totalCount = res.result.total || 0;
          
          console.log(`API获取到${allBookings.length}条预约记录，总数: ${totalCount}`)
          
          // 更新总计数
          this.statusCounts.all = allBookings.length;
          
          // 计算各状态数量
          this.statusCounts.booked = allBookings.filter(item => 
            item && (
              item.status === 'pending' || 
              item.status === 'confirmed_unpaid' || 
              item.status === 'confirmed'
            )
          ).length;
          
          this.statusCounts.finished = allBookings.filter(item => 
            item && item.status === 'finished'
          ).length;
          
          const cancelledInList = allBookings.filter(item => 
            item && (
              item.status === 'cancelled' || 
              item.paymentStatus === 'cancelled' ||
              item.status === 'cancel'
            )
          ).length;
          
          // 如果已经从本地加载了取消记录，使用更大的值
          if (!this.localCancelledLoaded || cancelledInList > this.statusCounts.cancelled) {
            this.statusCounts.cancelled = cancelledInList;
          }
          
          // 确保每个预约都有_id字段
          allBookings = allBookings.filter(item => item && item._id);
          
          // 更新列表
          this.bookingList = allBookings;
          this.total = allBookings.length;
          
          console.log(`前端筛选后的预约记录数: ${this.bookingList.length}`);
          
          // 更新加载状态
          this.loadMoreStatus = 'noMore'; // 已获取全部数据
          
          // 在前端根据状态筛选
          if (useClientFiltering) {
            if (this.currentStatus === 'booked') {
              allBookings = allBookings.filter(item => 
                item && (
                  item.status === 'pending' || 
                  item.status === 'confirmed_unpaid' || 
                  item.status === 'confirmed'
                )
              );
            } 
            else if (this.currentStatus === 'finished') {
              allBookings = allBookings.filter(item => item && item.status === 'finished');
            }
            else if (this.currentStatus === 'cancelled') {
              // 重点：筛选出已取消的预约（包含本地存储的）
              let cancelledBookings = allBookings.filter(item => 
                item && (
                  item.status === 'cancelled' || 
                  item.paymentStatus === 'cancelled' ||
                  item.status === 'cancel'
                )
              );
              
              // 获取本地已取消的预约
              const localCancelledBookings = this.getLocalCancelledBookings(userId)
                .filter(item => item && item._id);
              
              // 合并本地和远程的已取消预约，避免重复
              if (localCancelledBookings.length > 0) {
                const existingIds = cancelledBookings.map(item => item._id);
                const newLocalCancelled = localCancelledBookings.filter(
                  item => !existingIds.includes(item._id)
                );
                
                if (newLocalCancelled.length > 0) {
                  console.log(`添加${newLocalCancelled.length}条本地已取消预约到列表`);
                  cancelledBookings = [...cancelledBookings, ...newLocalCancelled];
                }
              }
              
              allBookings = cancelledBookings;
              
              // 打印筛选后的已取消记录
              console.log('前端筛选后的已取消预约记录:', allBookings);
            }
          }
        } else {
          console.error('获取预约记录API返回失败:', res.result)
          // 显示错误提示
          uni.showToast({
            title: '获取预约记录失败',
            icon: 'none'
          })
          
          // 错误情况下，尝试从本地加载已取消预约
          if (this.currentStatus === 'cancelled') {
            try {
              const userId = this.getUserId();
              if (userId) {
                const localCancelledBookings = this.getLocalCancelledBookings(userId);
                if (localCancelledBookings.length > 0) {
                  this.bookingList = localCancelledBookings;
                  this.statusCounts.cancelled = localCancelledBookings.length;
                  this.total = localCancelledBookings.length;
                  this.localCancelledLoaded = true;
                  console.log(`加载了${localCancelledBookings.length}条本地已取消记录`);
                  this.$forceUpdate();
                }
              }
            } catch (localErr) {
              console.error('加载本地已取消记录失败:', localErr);
            }
          }
        }
      } catch (e) {
        console.error('获取预约记录失败:', e)
        // 显示错误提示
        uni.showToast({
          title: '获取预约记录失败',
          icon: 'none'
        })
      }
      
      // 更新UI显示
      this.$forceUpdate();
      
      return Promise.resolve()
    },
    
    // 从本地存储获取已取消的预约记录
    getLocalCancelledBookings(userId) {
      try {
        // 参数检查
        if (!userId) {
          console.warn('获取本地已取消预约记录: 用户ID为空');
          return [];
        }
        
        // 获取已取消预约ID列表
        let cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
        try {
          cancelledIds = JSON.parse(cancelledIds);
          if (!Array.isArray(cancelledIds)) {
            console.warn('已取消预约ID列表格式不正确，重置为空数组');
            cancelledIds = [];
          }
        } catch (e) {
          console.error('解析已取消预约ID列表失败:', e);
          cancelledIds = [];
        }
        
        if (!cancelledIds.length) {
          return [];
        }
        
        // 从本地存储获取每个已取消预约的详细信息
        const cancelledBookings = [];
        for (const id of cancelledIds) {
          if (!id) continue; // 跳过无效ID
          
          const key = `cancelled_booking_${id}`;
          let bookingStr;
          
          try {
            bookingStr = uni.getStorageSync(key);
          } catch (e) {
            console.error(`获取预约数据失败 (ID: ${id}):`, e);
            continue;
          }
          
          if (bookingStr) {
            try {
              const booking = JSON.parse(bookingStr);
              
              // 确保必要字段存在
              if (!booking || !booking._id) {
                console.warn(`无效的预约数据 (ID: ${id})，跳过`);
                continue;
              }
              
              // 确保状态为cancelled
              booking.status = 'cancelled';
              
              // 确保有取消时间
              if (!booking.cancelTime) {
                booking.cancelTime = new Date().toISOString();
              }
              
              // 确保有课程标题
              if (!booking.title && booking.courseName) {
                booking.title = booking.courseName;
              }
              
              // 确保有课程ID
              if (!booking.courseId && booking.course_id) {
                booking.courseId = booking.course_id;
              }
              
              // 确保用户ID匹配
              if (booking.userId === userId) {
                cancelledBookings.push(booking);
              } else if (String(booking.userId) === String(userId)) {
                // 类型不同但值相同的情况
                console.log(`预约用户ID类型不同，修正后匹配 (预约ID: ${id})`);
                booking.userId = userId; // 统一为传入的userId格式
                cancelledBookings.push(booking);
              } else {
                console.log(`预约用户ID不匹配 (预约ID: ${id}, 预约用户: ${booking.userId}, 当前用户: ${userId})`);
              }
            } catch (e) {
              console.error('解析已取消预约数据失败:', e);
            }
          }
        }
        
        console.log(`为用户 ${userId} 获取到 ${cancelledBookings.length} 条本地已取消预约记录`);
        
        // 异步同步本地已取消预约到数据库
        this.syncCancelledBookingsToCloud(cancelledBookings);
        
        return cancelledBookings;
      } catch (e) {
        console.error('获取本地已取消预约记录失败:', e);
        return [];
      }
    },
    
    // 将本地已取消的预约同步到云数据库
    async syncCancelledBookingsToCloud(bookings) {
      if (!bookings || !bookings.length) return;
      
      console.log(`尝试同步 ${bookings.length} 条已取消预约到云数据库`);
      
      // 获取已同步ID缓存，避免重复同步
      let syncedIds = uni.getStorageSync('synced_cancelled_ids') || '[]';
      try {
        syncedIds = JSON.parse(syncedIds);
        if (!Array.isArray(syncedIds)) {
          syncedIds = [];
        }
      } catch (e) {
        console.error('解析已同步ID列表失败:', e);
        syncedIds = [];
      }
      
      const newSyncedIds = [...syncedIds];
      let syncCount = 0;
      
      for (const booking of bookings) {
        try {
          if (!booking._id) continue;
          
          // 检查是否已经同步过，避免重复请求
          if (syncedIds.includes(booking._id)) {
            continue;
          }
          
          // 使用forceUpdateBooking云函数，跳过schema验证
          try {
            const result = await uniCloud.callFunction({
              name: 'forceUpdateBooking',
              data: {
                bookingId: booking._id,
                status: 'cancelled',
                updateCourseCount: true // 确保更新课程报名人数
              }
            });
            
            if (result.result && result.result.success) {
              syncCount++;
              newSyncedIds.push(booking._id);
              
              // 不要频繁打印日志，只在首次同步和最后一条时打印
              if (syncCount === 1 || syncCount === bookings.length) {
                console.log(`已成功同步 ${syncCount}/${bookings.length} 条已取消预约`);
              }
              
              // 每成功同步5条记录就保存一次同步缓存
              if (syncCount % 5 === 0) {
                uni.setStorageSync('synced_cancelled_ids', JSON.stringify(newSyncedIds));
              }
            }
          } catch (e) {
            console.error(`同步已取消预约 ${booking._id} 失败:`, e);
          }
        } catch (e) {
          console.error(`处理已取消预约 ${booking._id} 出错:`, e);
        }
      }
      
      // 保存最终的同步缓存
      if (syncCount > 0) {
        uni.setStorageSync('synced_cancelled_ids', JSON.stringify(newSyncedIds));
        console.log(`本次共同步 ${syncCount} 条已取消预约，更新同步缓存`);
      }
    },
    
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        'pending': '未缴费',
        'confirmed_unpaid': '未缴费',
        'confirmed': '已缴费',
        'finished': '已完成',
        'cancelled': '已取消'
      };
      return statusMap[status] || '未知状态';
    },
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return ''
      
      const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return `${date.getMonth() + 1}月${date.getDate()}日`
      }
      
      if (endTime) {
        return `${formatDate(startTime)} - ${formatDate(endTime)}`
      }
      
      return formatDate(startTime)
    },
    
    // 格式化预约时间
    formatBookingTime(timeStr) {
      if (!timeStr) return ''
      
      const date = new Date(timeStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 查看预约详情
    viewDetail(booking) {
      // 检查参数有效性
      if (!booking || typeof booking !== 'object' || !booking._id) {
        console.error('无效的预约数据:', booking);
        uni.showToast({
          title: '无效的预约数据',
          icon: 'none'
        });
        return;
      }
      
      uni.navigateTo({
        url: `/pages/user/booking-detail?id=${booking._id}`
      })
    },
    
    // 取消预约
    cancelBooking(booking, e) {
      // 阻止事件冒泡（使用传入的事件参数e）
      if (e) e.stopPropagation();
      
      // 确保booking参数存在且有效
      if (!booking || typeof booking !== 'object') {
        console.error('无效的预约数据:', booking);
        uni.showToast({
          title: '无效的预约数据',
          icon: 'none'
        });
        return;
      }
      
      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: '确定要取消此次预约吗？',
        success: async (res) => {
          if (res.confirm) {
            this.handleCancel(booking);
          }
        }
      });
    },
    
    // 新增处理取消操作的方法
    async handleCancel(booking) {
      console.log('准备取消预约:', JSON.stringify(booking));
      
      try {
        uni.showLoading({ title: '取消中...' });
        
        // 获取当前用户ID，提高安全性
        const userInfoStr = uni.getStorageSync('userInfo');
        let userId = '';
        if (userInfoStr) {
          try {
            const userInfo = JSON.parse(userInfoStr);
            userId = userInfo.userId || userInfo._id || '';
          } catch (e) {
            console.error('解析用户信息失败:', e);
          }
        }
        
        // 确保bookingDocId有值
        const bookingDocId = booking._id || '';
        if (!bookingDocId) {
          console.error('预约ID无效:', booking);
          uni.showToast({
            title: '预约ID无效',
            icon: 'none'
          });
          uni.hideLoading();
          return;
        }
        
        console.log('取消预约:', {
          _id: bookingDocId,
          bookingId: booking.bookingId || '',
          courseId: booking.courseId || '',
          userId: userId,
          bookingUserId: booking.userId || '',
          status: booking.status || 'unknown'
        });
        
        let updateSuccess = false;
        
        // 尝试方法1：使用cancelBooking云函数
        try {
          console.log('尝试方法1：使用cancelBooking云函数');
          const cloudResult = await uniCloud.callFunction({
            name: 'cancelBooking',
            data: {
              bookingId: bookingDocId,
              userId: userId
            }
          });
          
          console.log('方法1结果:', JSON.stringify(cloudResult.result));
          
          if (cloudResult.result && cloudResult.result.success) {
            updateSuccess = true;
            console.log('方法1成功：使用cancelBooking云函数更新成功');
            
            // 检查课程更新状态
            if (cloudResult.result.data && cloudResult.result.data.courseUpdated !== undefined) {
              console.log('课程更新状态:', cloudResult.result.data.courseUpdated ? '成功' : '失败');
              if (!cloudResult.result.data.courseUpdated) {
                console.warn('❌ 警告: 预约已取消，但课程报名人数可能未减少，尝试直接更新');
                
                // 如果课程bookingCount未更新，尝试使用forceUpdateBooking云函数直接更新
                if (booking.courseId) {
                  try {
                    console.log('尝试使用forceUpdateBooking云函数直接更新课程报名人数, 课程ID:', booking.courseId);
                    
                    const updateResult = await uniCloud.callFunction({
                      name: 'forceUpdateBooking',
                      data: {
                        courseId: booking.courseId,
                        updateCourseOnly: true,
                        decreaseBookingCount: true
                      }
                    });
                    
                    console.log('直接更新课程报名人数结果:', JSON.stringify(updateResult.result));
                    if (updateResult.result && updateResult.result.code === 0) {
                      console.log('✅ 直接更新课程报名人数成功');
                    } else {
                      console.warn('❌ 直接更新课程报名人数失败:', updateResult.result?.message || '未知错误');
                    }
                  } catch (courseUpdateErr) {
                    console.error('直接更新课程报名人数失败:', courseUpdateErr);
                  }
                }
              }
            }
          }
        } catch (err1) {
          console.error('方法1失败:', err1);
        }
        
        // 如果方法1失败，尝试方法2：使用forceUpdateBooking云函数
        if (!updateSuccess) {
          try {
            console.log('尝试方法2：使用forceUpdateBooking云函数');
            const forceResult = await uniCloud.callFunction({
              name: 'forceUpdateBooking',
              data: {
                bookingId: bookingDocId,
                status: 'cancelled',
                updateCourseCount: true // 确保更新课程报名人数
              }
            });
            
            console.log('方法2结果:', JSON.stringify(forceResult.result));
            
            if (forceResult.result && forceResult.result.success) {
              updateSuccess = true;
              console.log('方法2成功：使用forceUpdateBooking云函数更新成功');
              
              // 检查课程更新状态，如果未更新，则尝试直接更新
              if (forceResult.result.data && forceResult.result.data.courseUpdated !== undefined && !forceResult.result.data.courseUpdated) {
                if (booking.courseId) {
                  try {
                    console.log('尝试使用forceUpdateBooking云函数直接更新课程报名人数, 课程ID:', booking.courseId);
                    
                    const updateResult = await uniCloud.callFunction({
                      name: 'forceUpdateBooking',
                      data: {
                        courseId: booking.courseId,
                        updateCourseOnly: true,
                        decreaseBookingCount: true
                      }
                    });
                    
                    console.log('直接更新课程报名人数结果:', JSON.stringify(updateResult.result));
                  } catch (directUpdateErr) {
                    console.error('直接更新课程报名人数失败:', directUpdateErr);
                  }
                }
              }
            } else {
              console.error('方法2失败，返回结果:', forceResult.result);
            }
          } catch (err2) {
            console.error('方法2失败，错误信息:', err2);
          }
        }
        
        // 如果以上方法都失败，尝试方法3：直接更新数据库
        if (!updateSuccess) {
          try {
            console.log('尝试方法3：直接操作数据库');
            const db = uniCloud.database();
            const updateResult = await db.collection('bookings')
              .doc(bookingDocId)
              .update({
                status: 'cancelled',
                updateTime: new Date(),
                cancelTime: new Date()
              });
            
            console.log('方法3结果:', updateResult);
            
            if (updateResult && updateResult.updated > 0) {
              updateSuccess = true;
              console.log('方法3成功：直接更新数据库成功');
              
              // 更新课程报名人数，使用forceUpdateBooking云函数
              if (booking.courseId) {
                try {
                  console.log('尝试使用forceUpdateBooking云函数直接更新课程报名人数, 课程ID:', booking.courseId);
                  
                  const updateResult = await uniCloud.callFunction({
                    name: 'forceUpdateBooking',
                    data: {
                      courseId: booking.courseId,
                      updateCourseOnly: true,
                      decreaseBookingCount: true
                    }
                  });
                  
                  console.log('直接更新课程报名人数结果:', JSON.stringify(updateResult.result));
                } catch (courseErr) {
                  console.error('更新课程报名人数失败:', courseErr);
                }
              }
            }
          } catch (err3) {
            console.error('方法3失败:', err3);
          }
        }
        
        // 无论是否成功更新数据库，都更新本地状态
        if (updateSuccess) {
          uni.showToast({
            title: '取消成功', 
            icon: 'success'
          });
        } else {
          console.log('云端更新失败，仅更新本地状态');
          uni.showToast({
            title: '取消成功(仅本地)', 
            icon: 'success'
          });
        }
        
        // 更新预约状态计数（无论是否成功更新服务器）
        const previousStatus = booking.status || 'unknown';
        // 如果之前是已预约状态，减少已预约计数
        if (previousStatus !== 'cancelled' && 
            (previousStatus === 'pending' || 
             previousStatus === 'confirmed_unpaid' || 
             previousStatus === 'confirmed')) {
          this.statusCounts.booked = Math.max(0, this.statusCounts.booked - 1);
        }
        // 如果之前是已完成状态，减少已完成计数
        else if (previousStatus === 'finished') {
          this.statusCounts.finished = Math.max(0, this.statusCounts.finished - 1);
        }
        
        // 增加已取消计数，确保不重复计算
        const previouslyCancelled = booking.status === 'cancelled';
        if (!previouslyCancelled) {
          this.statusCounts.cancelled++;
        }
        
        // 在内存中更新预约状态
        this.updateBookingStatus(bookingDocId, 'cancelled');
        
        // 如果当前不是"已取消"选项卡，从当前列表中移除该项
        if (this.currentStatus !== 'cancelled') {
          this.removeBookingFromList(bookingDocId);
          
          // 提示用户可以在"已取消"标签查看
          setTimeout(() => {
            uni.showToast({
              title: `已取消，可在"已取消(${this.getTabCount('cancelled')})"标签查看`,
              icon: 'none',
              duration: 2000
            });
          }, 1500);
        }
        
        // 保存到本地存储
        const cancelledBooking = {...booking, 
          status: 'cancelled', 
          cancelTime: new Date().toISOString()
        };
        this.storeCancelledBooking(cancelledBooking);
        
        // 标记预约状态已变更
        this.markBookingChanged();
        
        // 发送取消事件，更新相关页面
        uni.$emit('booking:cancel', {
          courseId: booking.courseId || '',
          userId: userId,
          bookingId: bookingDocId
        });
        
        // 如果当前在"已取消"标签页，重新加载列表以显示最新数据
        if (this.currentStatus === 'cancelled') {
          // 将刚刚取消的预约添加到列表头部
          if (cancelledBooking && cancelledBooking._id) {
            // 避免重复添加
            const existingIndex = this.bookingList.findIndex(item => item && item._id === cancelledBooking._id);
            if (existingIndex === -1) {
              console.log('在已取消标签中添加最新取消的预约记录到头部');
              this.bookingList.unshift(cancelledBooking);
              this.total = this.bookingList.length;
              this.$forceUpdate();
            } else {
              console.log('预约记录已存在于列表中，更新状态');
              this.bookingList[existingIndex].status = 'cancelled';
              this.$forceUpdate();
            }
          } else {
            // 如果无法直接添加，则重新加载整个列表
            console.log('无法直接添加取消的预约，刷新整个列表');
            this.resetList();
            this.loadBookingList();
          }
        }
      } catch (e) {
        console.error('取消预约失败:', e);
        uni.showToast({
          title: '取消失败，请稍后重试', 
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 联系老师
    contactTeacher(booking, e) {
      // 阻止事件冒泡
      if (e) e.stopPropagation();
      
      // 检查参数有效性
      if (!booking || typeof booking !== 'object') {
        console.error('无效的预约数据:', booking);
        uni.showToast({
          title: '无效的预约数据',
          icon: 'none'
        });
        return;
      }
      
      // 检查是否有联系电话
      const phoneNumber = booking.contactPhone || booking.teacherPhone || '';
      
      if (!phoneNumber) {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }
      
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 查看课程详情
    navigateToCourse(courseId, e) {
      // 阻止事件冒泡
      if (e) e.stopPropagation();
      
      // 检查参数有效性
      if (!courseId) {
        console.error('无效的课程ID:', courseId);
        uni.showToast({
          title: '无效的课程ID',
          icon: 'none'
        });
        return;
      }
      
      uni.navigateTo({
        url: `/pages/course/detail?id=${courseId}`
      })
    },
    
    // 存储已取消的预约
    storeCancelledBooking(booking) {
      try {
        // 参数检查
        if (!booking || typeof booking !== 'object') {
          console.error('存储已取消预约失败: 无效的预约数据', booking);
          return;
        }
        
        // 确保booking有_id字段
        if (!booking._id) {
          console.error('无法保存没有_id的预约记录', booking);
          return;
        }
        
        // 深拷贝booking对象，避免引用问题
        const bookingCopy = JSON.parse(JSON.stringify(booking));
        
        // 确保booking有完整的信息
        bookingCopy.status = 'cancelled';
        bookingCopy.cancelTime = bookingCopy.cancelTime || new Date().toISOString();
        
        // 构建存储键名
        const key = `cancelled_booking_${bookingCopy._id}`;
        
        // 检查是否已经存储过
        const existingData = uni.getStorageSync(key);
        const isNewStorage = !existingData;
        
        // 保存已取消的预约数据
        uni.setStorageSync(key, JSON.stringify(bookingCopy));
        
        // 只有首次存储才打印日志和执行后续逻辑
        if (isNewStorage) {
          console.log('已保存已取消预约数据:', bookingCopy._id);
          
          // 记录最近取消的预约ID列表
          let cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
          try {
            cancelledIds = JSON.parse(cancelledIds);
            if (!Array.isArray(cancelledIds)) {
              cancelledIds = [];
            }
          } catch (e) {
            console.error('解析已取消预约ID列表失败:', e);
            cancelledIds = [];
          }
          
          // 检查是否已经存在
          const alreadyExists = cancelledIds.includes(bookingCopy._id);
          
          // 添加到列表头部（如果不存在）
          if (!alreadyExists) {
            cancelledIds.unshift(bookingCopy._id);
            // 最多保存20条
            if (cancelledIds.length > 20) {
              cancelledIds = cancelledIds.slice(0, 20);
            }
            
            // 更新计数和标记
            this.statusCounts.cancelled = cancelledIds.length;
            this.localCancelledLoaded = true;
            
            // 保存更新后的ID列表
            uni.setStorageSync('cancelled_booking_ids', JSON.stringify(cancelledIds));
            
            // 如果是通过按钮取消的预约，且不在已取消标签页，延迟后切换到已取消标签
            if (this.currentStatus !== 'cancelled' && !this.autoSwitchToCancel) {
              this.switchToCancelledTab();
            }
          }
        }
      } catch (e) {
        console.error('保存已取消预约数据失败:', e);
      }
      
      return true;
    },
    
    // 切换到已取消标签页
    switchToCancelledTab() {
      setTimeout(() => {
        uni.showToast({
          title: '正在前往已取消列表',
          icon: 'none',
          duration: 1500
        });
        
        setTimeout(() => {
          this.changeTab('cancelled');
        }, 1500);
      }, 800);
    },
    
    // 获取空数据提示文本
    getEmptyTipText() {
      switch (this.currentStatus) {
        case 'all':
          return '暂无任何预约记录';
        case 'booked':
          return '暂无进行中的预约';
        case 'finished':
          return '暂无已完成的预约';
        case 'cancelled':
          return '暂无已取消的预约记录';
        default:
          return '暂无预约记录';
      }
    },
    
    // 获取标签对应的预约数量
    getTabCount(status) {
      // 使用缓存的数量
      return this.statusCounts[status] || 0;
    },
    
    // 加载本地已取消记录数量
    loadLocalCancelledCount() {
      if (this.localCancelledLoaded) return;
      
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          const userData = JSON.parse(userInfoStr);
          const userId = userData.userId || userData._id;
          if (userId) {
            const cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
            try {
              const ids = JSON.parse(cancelledIds);
              if (Array.isArray(ids)) {
                this.statusCounts.cancelled = ids.length;
                this.localCancelledLoaded = true;
                console.log(`加载到${ids.length}条本地已取消预约`);
              }
            } catch (e) {
              console.error('解析已取消预约ID列表失败:', e);
            }
          }
        }
      } catch (e) {
        console.error('加载本地已取消预约数量失败:', e);
      }
    },
    
    // 更新预约状态
    updateBookingStatus(bookingId, status) {
      if (!bookingId || !status) return;
      
      console.log(`更新预约${bookingId}状态为${status}`);
      
      // 查找匹配的预约
      const index = this.bookingList.findIndex(item => item && item._id === bookingId);
      if (index !== -1) {
        console.log(`找到预约在列表中的位置: ${index}, 更新状态`);
        this.bookingList[index].status = status;
        this.$forceUpdate();
      } else {
        console.log(`未在当前列表中找到预约: ${bookingId}`);
      }
    },
    
    // 从列表中移除预约
    removeBookingFromList(bookingId) {
      if (!bookingId) return;
      
      console.log(`从列表中移除预约: ${bookingId}`);
      
      // 查找匹配的预约
      const index = this.bookingList.findIndex(item => item && item._id === bookingId);
      if (index !== -1) {
        console.log(`找到预约在列表中的位置: ${index}, 移除它`);
        this.bookingList.splice(index, 1);
        this.total = Math.max(0, this.total - 1);
        this.$forceUpdate();
      } else {
        console.log(`未在当前列表中找到预约: ${bookingId}`);
      }
    },
    
    // 标记预约状态已变更
    markBookingChanged() {
      console.log('标记预约状态已变更');
      uni.setStorageSync('booking_changed', 'true');
    },
    
    // 获取用户ID
    getUserId() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          return userInfo.userId || userInfo._id || '';
        }
      } catch (e) {
        console.error('获取用户ID失败:', e);
      }
      return '';
    }
  }
}
</script>

<style lang="scss">
.booking-container {
  min-height: 100vh;
  background-color: $bg-color;
}

/* 状态筛选选项卡 */
.tab-bar {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid $border-color-light;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .tab-item {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: $text-color;
    position: relative;
    
    .badge {
      position: absolute;
      top: 6rpx;
      right: 10%;
      min-width: 28rpx;
      height: 28rpx;
      line-height: 28rpx;
      padding: 0 6rpx;
      font-size: 18rpx;
      text-align: center;
      color: #fff;
      background-color: #FF3B30;
      border-radius: 14rpx;
      transform: translateX(50%);
      z-index: 2;
      
      @media screen and (max-width: 375px) {
        right: 5%;
        min-width: 24rpx;
        height: 24rpx;
        line-height: 24rpx;
        font-size: 16rpx;
      }
    }
    
    &.active {
      color: $theme-color;
      font-weight: bold;
      
      .badge {
        background-color: $theme-color;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background-color: $theme-color;
        border-radius: 2rpx;
      }
    }
  }
}

/* 预约记录列表 */
.booking-list {
  padding: 20rpx;
  
  .booking-item {
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    
    &.highlight-new {
      animation: highlight-pulse 2s ease-in-out;
      border: 2rpx solid #FF3B30;
    }
    
    .booking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-bottom: 1rpx solid $border-color-light;
      
      .course-title {
        font-size: 32rpx;
        font-weight: bold;
        color: $text-color;
        flex: 1;
      }
      
      .booking-status {
        font-size: 24rpx;
        padding: 6rpx 12rpx;
        border-radius: 6rpx;
        
        &.status-pending {
          color: #FF9500;
          background-color: rgba(#FF9500, 0.1);
        }
        
        &.status-confirmed_unpaid {
          color: #FF9500;
          background-color: rgba(#FF9500, 0.1);
        }
        
        &.status-confirmed {
          color: #4CD964;
          background-color: rgba(#4CD964, 0.1);
        }
        
        &.status-finished {
          color: #007AFF;
          background-color: rgba(#007AFF, 0.1);
        }
        
        &.status-cancelled {
          color: #FF3B30;
          background-color: rgba(#FF3B30, 0.1);
          position: relative;
          padding-left: 20rpx;
          
          &::before {
            content: "✕";
            position: absolute;
            left: 6rpx;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18rpx;
            font-weight: bold;
          }
        }
      }
    }
    
    .booking-info {
      padding: 20rpx;
      
      .info-row {
        display: flex;
        margin-bottom: 16rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .info-label {
          width: 160rpx;
          font-size: 26rpx;
          color: $text-color-grey;
        }
        
        .info-value {
          flex: 1;
          font-size: 26rpx;
          color: $text-color;
        }
      }
    }
    
    .booking-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-top: 1rpx solid $border-color-light;
      
      .booking-time {
        font-size: 24rpx;
        color: $text-color-grey;
      }
      
      .booking-actions {
        display: flex;
        
        .action-btn {
          margin-left: 20rpx;
          height: 56rpx;
          line-height: 56rpx;
          padding: 0 20rpx;
          font-size: 24rpx;
          color: $text-color;
          background-color: #f5f5f5;
          border-radius: 28rpx;
          
          &.primary {
            color: #fff;
            background-color: $theme-color;
          }
        }
      }
    }
  }
}

@keyframes highlight-pulse {
  0% { box-shadow: 0 0 0 rgba(255, 59, 48, 0.4); }
  50% { box-shadow: 0 0 20rpx rgba(255, 59, 48, 0.6); }
  100% { box-shadow: 0 0 0 rgba(255, 59, 48, 0.4); }
}
</style> 