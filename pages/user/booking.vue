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
        @click="viewDetail(item, $event)"
        :data-booking-id="item._id"
        :data-course-id="item.courseId">
        <!-- 顶部：课程标题 -->
        <view class="course-title-container">
          <view class="course-title">{{item.courseTitle || item.title}}</view>
        </view>
        
        <!-- 主体内容：左右布局 -->
        <view class="booking-content">
          <!-- 左侧区域：预约状态 -->
          <view class="booking-left">
            <view class="booking-status-wrapper">
              <view class="booking-status" :class="'status-' + item.status">{{getStatusText(item)}}</view>
              <view class="status-tag" v-if="item.isCourseDeleted">课程已删除</view>
              <view class="status-tag auto-cancel" v-if="showAutoCancelTag(item)">超时未支付自动取消</view>
            </view>
            
            <view class="payment-countdown" v-if="shouldShowCountdown(item)">
              <text class="countdown-label">支付倒计时：</text>
              <text class="countdown-time">{{formatCountdown(getPaymentCountdown(item))}}</text>
            </view>
            
            <!-- 添加支付时间显示 -->
            <view class="payment-time" v-if="item.paymentStatus === 'paid' || item.isPaid === true">
              <text class="payment-time-label">支付时间：</text>
              <text class="payment-time-value">{{formatPaymentTime(item.paidTime)}}</text>
            </view>
            
            <view class="booking-time">
              预约时间：{{formatBookingTime(item.createTime || item.create_time)}}
            </view>
          </view>
          
          <!-- 右侧区域：课程详细信息 -->
          <view class="booking-right">
            <!-- 课程详细信息 -->
            <view class="detail-info">
              <view class="detail-row">
                <text class="detail-label">校区地点</text>
                <text class="detail-value">{{item.schoolName || '未知'}}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">课程时间</text>
                <text class="detail-value">{{formatCourseTime(item)}}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">课程日期</text>
                <text class="detail-value">{{formatDateRange(item)}}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">学生姓名</text>
                <text class="detail-value">{{item.studentName}}</text>
              </view>
              <view class="detail-row" v-if="item.teacherName">
                <text class="detail-label">任课教师</text>
                <text class="detail-value teacher-name">{{item.teacherName}}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 底部：操作按钮 -->
        <view class="booking-actions" v-if="showActions(item)">
          <!-- 取消预约按钮 -->
          <view class="action-btn cancel-btn" 
                v-if="item && item.status !== 'cancelled' && item.status !== 'finished'"
                @click.stop="$event => cancelBooking(item, $event)">取消预约</view>
          
          <!-- 去缴费按钮 -->
          <view class="action-btn pay-btn" 
                v-if="shouldShowPayButton(item)"
                @click.stop="$event => goToPay(item, $event)">去缴费</view>
                
          <!-- 其他按钮 -->
          <view class="action-btn contact-btn" 
                v-if="shouldShowContactButton(item)"
                @click.stop="$event => contactTeacher(item, $event)">联系老师</view>
                
          <!-- 退费按钮 -->
          <view class="action-btn refund-btn"
                v-if="(item.paymentStatus === 'paid' || item.isPaid === true) && 
                      item.status !== 'cancelled' && 
                      item.status !== 'cancel' && 
                      item.paymentStatus !== 'refunded'"
                @click.stop="$event => handleRefund(item, $event)">申请退费</view>
        </view>
      </view>
      
      <!-- 空数据提示 -->
      <empty-tip v-if="filteredBookingList.length === 0" :tip="getEmptyTipText()"></empty-tip>
      
      <!-- 加载更多 -->
      <uni-load-more :status="loadMoreStatus" v-if="loadMoreStatus !== 'noMore'"></uni-load-more>
    </view>
    
    <!-- 二维码支付弹窗 -->
    <uni-popup ref="qrcodePopup" type="center">
      <view class="qrcode-popup">
        <view class="qrcode-title">{{ isRefunding ? '扫码退费' : '扫码缴费' }}</view>
        <image class="qrcode-image" :src="qrcodeUrl" mode="aspectFit"></image>
        <view class="qrcode-contact">
          <text>如有问题，请联系老师</text>
          <text>电话：13800138000</text>
        </view>
        <button class="close-btn" @click="closeQrcodePopup">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import bookingItem from '@/components/booking-item/booking-item.vue';
import emptyTip from '@/components/empty-tip/empty-tip.vue';
import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue';

export default {
  components: {
    bookingItem,
    emptyTip,
    uniLoadMore
  },
  data() {
    return {
      // 状态筛选标签
      tabs: [
        { label: '全部', value: 'all' },
        { label: '已预约', value: 'booked' },
        { label: '已完成', value: 'finished' },
        { label: '已取消', value: 'cancelled' },
        { label: '已退费', value: 'refunded' }
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
        cancelled: 0,
        refunded: 0
      },
      
      // 是否已加载本地取消记录
      localCancelledLoaded: false,
      
      // 支付倒计时数据
      countdownTimers: {}, // 存储每个预约的倒计时定时器
      countdownValues: {}, // 存储每个预约的倒计时值
      
      // 二维码相关
      qrcodeUrl: '', // 二维码URL
      currentPayingBookingId: '', // 当前正在支付的预约ID
      isRefunding: false // 是否是申请退费操作
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
      
      if (this.currentStatus === 'refunded') {
        // 已退费状态的过滤条件
        return validBookings.filter(booking => 
          booking.paymentStatus === 'refunded'
        );
      }
      
      // 其他状态直接按状态筛选
      return validBookings.filter(booking => booking.status === this.currentStatus);
    }
  },
  onLoad(options) {
    console.log('booking页面加载，参数:', options);
    
    // 先获取自动取消的预约ID列表，用于后续渲染
    const autoCancelIds = this.getAutoCancelledBookingIds();
    console.log('加载时找到自动取消预约IDs:', autoCancelIds);
    
    // 监听支付成功事件
    uni.$on('payment:success', this.handlePaymentSuccess);
    
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
    this.loadBookingList().then(() => {
      // 加载完成后初始化倒计时
      console.log('预约记录加载完成，初始化倒计时');
      setTimeout(() => {
        this.initAllCountdowns();
        
        // 重新检查并标记自动取消的预约
        if (typeof this.ensureAutoCancelTagsDisplayed === 'function') {
          this.ensureAutoCancelTagsDisplayed();
        } else {
          console.log('ensureAutoCancelTagsDisplayed方法未定义，跳过执行');
        }
      }, 500);
    });
  },
  
  // 确保自动取消标签正确显示
  ensureAutoCancelTagsDisplayed() {
    const autoCancelIds = this.getAutoCancelledBookingIds();
    
    if (autoCancelIds.length > 0) {
      console.log('重新检查自动取消标记，找到:', autoCancelIds);
      
      // 更新bookingList中对应ID的预约
      let updatedCount = 0;
      this.bookingList.forEach(booking => {
        if (booking && booking._id && autoCancelIds.includes(booking._id)) {
          if (!booking.autoCancel || !booking.cancelReason) {
            console.log(`强制更新预约 ${booking.bookingId} 的自动取消标记`);
            booking.autoCancel = true;
            booking.cancelReason = '超时未支付，系统自动取消';
            updatedCount++;
          }
        }
      });
      
      if (updatedCount > 0) {
        console.log(`更新了 ${updatedCount} 个预约的自动取消标记状态`);
        this.$forceUpdate();
      }
    }
  },
  onShow() {
    // 检查是否有预约状态变更
    const hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
    if (hasBookingChanged) {
      console.log('检测到预约状态变更，刷新列表');
      this.resetList();
      this.loadBookingList().then(() => {
        // 加载完成后初始化倒计时
        setTimeout(() => {
          this.initAllCountdowns();
          if (typeof this.ensureAutoCancelTagsDisplayed === 'function') {
            this.ensureAutoCancelTagsDisplayed();
          } else {
            console.log('ensureAutoCancelTagsDisplayed方法未定义，跳过执行');
          }
        }, 500);
      });
      // 重置标记
      uni.setStorageSync('booking_changed', 'false');
    } else {
      // 即使没有变更，也重新初始化倒计时
      console.log('页面显示，重新初始化倒计时');
      this.initAllCountdowns();
      if (typeof this.ensureAutoCancelTagsDisplayed === 'function') {
        this.ensureAutoCancelTagsDisplayed();
      } else {
        console.log('ensureAutoCancelTagsDisplayed方法未定义，跳过执行');
      }
    }
  },
  onHide() {
    // 页面隐藏时清除所有定时器
    this.clearAllCountdowns();
  },
  onUnload() {
    // 页面卸载时清除所有定时器
    this.clearAllCountdowns();
    
    // 清除事件监听
    uni.$off('payment:success', this.handlePaymentSuccess);
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
            try {
              // 检查是否已经是对象
              const userData = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
              const userId = userData.userId || userData._id || userData.uid || 
                             (userData.userInfo && userData.userInfo._id) ||
                             (userData.userInfo && userData.userInfo.uid) || '';
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
            } catch (e) {
              console.error('尝试直接加载本地已取消记录失败:', e);
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
      this.loadMoreStatus = 'loading';
      
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (!userInfoStr) {
          console.log('用户未登录，无法获取预约记录');
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          setTimeout(() => {
            uni.redirectTo({ url: '/pages/user/user' });
          }, 1500);
          return Promise.resolve();
        }
        
        let userData = null;
        try {
          // 检查是否已经是对象
          userData = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          console.log('解析到的用户信息:', userData);
        } catch (e) {
          console.error('解析用户信息失败:', e);
          uni.showToast({
            title: '用户数据异常',
            icon: 'none'
          });
          return Promise.resolve();
        }
        
        const userId = userData.userId || userData._id || userData.uid || 
                       (userData.userInfo && userData.userInfo._id) ||
                       (userData.userInfo && userData.userInfo.uid) || '';
        if (!userId) {
          console.error('未找到有效的用户ID');
          uni.showToast({
            title: '用户ID不存在',
            icon: 'none'
          });
          return Promise.resolve();
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
        });
        
        console.log('getBookings原始返回结果:', res.result);
        
        if (res.result && res.result.success) {
          // 过滤掉undefined和null值
          let allBookings = (res.result.data || []).filter(item => item && item._id);
          const totalCount = res.result.total || 0;
          
          console.log(`API获取到${allBookings.length}条预约记录，总数: ${totalCount}`);
          
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
          
          // 统计已退费的预约数量
          const refundedCount = allBookings.filter(item => 
            item && item.paymentStatus === 'refunded'
          ).length;
          this.statusCounts.refunded = refundedCount;
          
          // 确保每个预约都有_id字段
          allBookings = allBookings.filter(item => item && item._id);
          
          // 规范化数据，确保支付状态和显示状态一致
          allBookings.forEach(booking => {
            // 检查是否有支付状态不一致的情况
            if ((booking.paymentStatus === 'paid' || booking.isPaid === true) && 
                (booking.status === 'pending' || booking.status === 'confirmed_unpaid')) {
              // 如果已支付但状态仍为待支付，则更新状态
              console.log(`发现状态不一致：${booking._id} 已支付但状态为 ${booking.status}，修正为confirmed`);
              booking.status = 'confirmed';
            }
            
            // 标准化支付状态字段
            if (booking.isPaid === true && booking.paymentStatus !== 'paid') {
              booking.paymentStatus = 'paid';
            } else if (booking.paymentStatus === 'paid' && booking.isPaid !== true) {
              booking.isPaid = true;
            }
          });
          
          // 更新自动取消标记信息
          allBookings.forEach(booking => {
            if (booking.status === 'cancelled') {
              // 检查本地存储中是否为自动取消
              const isAutoCancel = this.isAutoCancelBookingFromStorage(booking._id);
              if (isAutoCancel) {
                console.log(`更新预约 ${booking.bookingId || booking._id} 的自动取消标记`);
                booking.autoCancel = true;
                booking.cancelReason = '超时未支付，系统自动取消';
              }
            }
          });
          
          // 更新列表
          this.bookingList = allBookings;
          this.total = allBookings.length;
          
          console.log(`前端筛选后的预约记录数: ${this.bookingList.length}`);
          
          // 更新加载状态
          this.loadMoreStatus = 'noMore'; // 已获取全部数据
          
          // 日志显示有多少pending状态的预约
          const pendingCount = allBookings.filter(item => 
            item && item.status === 'pending'
          ).length;
          console.log(`获取到${pendingCount}条待支付预约记录`);
          
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
            else if (this.currentStatus === 'refunded') {
              // 筛选出已退费的预约
              allBookings = allBookings.filter(item => 
                item && item.paymentStatus === 'refunded'
              );
              
              console.log('前端筛选后的已退费预约记录:', allBookings);
            }
          }
        } else {
          console.error('获取预约记录API返回失败:', res.result);
          // 显示错误提示
          uni.showToast({
            title: '获取预约记录失败',
            icon: 'none'
          });
          
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
        console.error('获取预约记录失败:', e);
        // 显示错误提示
        uni.showToast({
          title: '获取预约记录失败',
          icon: 'none'
        });
      }
      
      // 更新UI显示
      this.$forceUpdate();
      
      return Promise.resolve();
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
          // 检查是否已经是数组
          cancelledIds = typeof cancelledIds === 'string' ? JSON.parse(cancelledIds) : cancelledIds;
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
              // 检查是否已经是对象
              const booking = typeof bookingStr === 'string' ? JSON.parse(bookingStr) : bookingStr;
              
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
              
              // 检查并设置自动取消标记
              if (booking.cancelReason === '超时未支付，系统自动取消' && !booking.autoCancel) {
                booking.autoCancel = true;
                console.log(`设置预约 ${id} 的自动取消标记`);
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
        // 检查是否已经是数组
        syncedIds = typeof syncedIds === 'string' ? JSON.parse(syncedIds) : syncedIds;
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
    getStatusText(booking) {
      if (!booking || !booking.status) return '未知状态';
      
      // 优先判断支付状态，如果已支付，直接显示已缴费
      if (booking.paymentStatus === 'paid' || booking.isPaid === true) {
        return '已缴费';
      }
      
      // 根据预约的状态返回对应的文本
      switch (booking.status) {
        case 'pending':
          return '未缴费';
        case 'confirmed_unpaid':
          return '未缴费';
        case 'confirmed':
          return '未缴费';
        case 'cancelled':
        case 'cancel':
          return '已取消';
        case 'finished':
          return '已完成';
        default:
          return booking.status;
      }
    },
    
    // 格式化课程时间
    formatCourseTime(item) {
      // 如果有courseTime字段，优先使用该字段
      if (item.courseTime) {
        return item.courseTime;
      }
      
      // 日期范围格式化
      const formatDateRange = () => {
        // 确保有日期数据
        if (!item.courseStartDate && !item.courseEndDate) {
          return '';
        }
        
        // 格式化单个日期
        const formatDate = (dateStr) => {
          try {
            if (!dateStr) return '';
            
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
              return dateStr;
            }
            
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          } catch (e) {
            return dateStr;
          }
        };
        
        // 如果有开始和结束日期，显示范围
        if (item.courseStartDate && item.courseEndDate) {
          return `${formatDate(item.courseStartDate)}至${formatDate(item.courseEndDate)}`;
        } else if (item.courseStartDate) {
          return formatDate(item.courseStartDate);
        } else if (item.courseEndDate) {
          return formatDate(item.courseEndDate);
        }
        
        return '';
      };
      
      // 时间段格式化
      const formatTimeRange = () => {
        // 确保有时间数据
        if (!item.courseStartTime && !item.courseEndTime) {
          return '';
        }
        
        // 处理简单的时间字符串
        const formatTime = (timeStr) => {
          if (!timeStr) return '';
          
          // 如果是简单的时间字符串，直接返回
          if (typeof timeStr === 'string' && 
              (timeStr.includes(':') || timeStr.match(/^\d{1,2}:\d{2}$/))) {
            return timeStr;
          }
          
          // 如果是日期时间，提取时间部分
          try {
            const date = new Date(timeStr);
            if (!isNaN(date.getTime())) {
              return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            }
          } catch (e) {
            // 忽略错误
          }
          
          return timeStr;
        };
        
        // 如果有开始和结束时间，显示范围
        if (item.courseStartTime && item.courseEndTime) {
          return `${formatTime(item.courseStartTime)}-${formatTime(item.courseEndTime)}`;
        } else if (item.courseStartTime) {
          return formatTime(item.courseStartTime);
        } else if (item.courseEndTime) {
          return formatTime(item.courseEndTime);
        }
        
        return '';
      };
      
      // 组合日期和时间
      const dateRange = formatDateRange();
      const timeRange = formatTimeRange();
      
      if (dateRange && timeRange) {
        return `${dateRange} ${timeRange}`;
      } else if (dateRange) {
        return dateRange;
      } else if (timeRange) {
        return timeRange;
      }
      
      // 处理原始的startTime和endTime（如果存在）
      if (item.startTime || item.endTime) {
        try {
          const formatFullDateTime = (dateTimeStr) => {
            if (!dateTimeStr) return '';
            
            const date = new Date(dateTimeStr);
            if (isNaN(date.getTime())) {
              return dateTimeStr;
            }
            
            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            
            return `${dateStr} ${timeStr}`;
          };
          
          if (item.startTime && item.endTime) {
            return `${formatFullDateTime(item.startTime)}至${formatFullDateTime(item.endTime)}`;
          } else if (item.startTime) {
            return formatFullDateTime(item.startTime);
          } else if (item.endTime) {
            return formatFullDateTime(item.endTime);
          }
        } catch (e) {
          console.error('格式化完整日期时间出错:', e);
        }
      }
      
      return '暂无';
    },
    
    // 格式化预约时间
    formatBookingTime(timeStr) {
      if (!timeStr) return ''
      
      const date = new Date(timeStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 查看预约详情
    viewDetail(booking, event) {
      // 检查点击事件的数据
      try {
        // 如果booking为空，尝试从事件对象中获取数据
        if (!booking) {
          const eventTarget = event && event.currentTarget;
          if (eventTarget) {
            const bookingId = eventTarget.dataset.bookingId;
            const courseId = eventTarget.dataset.courseId;
            
            console.log('从事件对象获取数据:', { bookingId, courseId });
            
            // 如果可以直接获取课程ID，则直接跳转
            if (courseId) {
              this.navigateToCourse(courseId);
              return;
            }
            
            // 如果只有预约ID，则跳转到预约详情
            if (bookingId) {
              uni.navigateTo({
                url: `/pages/user/booking-detail?id=${bookingId}`
              });
              return;
            }
          }
          
          console.warn('预约数据为空，无法处理点击事件');
          return;
        }
        
        // 检查booking参数是否有效
        if (typeof booking !== 'object') {
          console.error('无效的预约数据类型:', typeof booking);
          uni.showToast({
            title: '无效的预约数据',
            icon: 'none'
          });
          return;
        }
        
        // 确保booking对象有_id或courseId至少一个
        if (!booking._id && !booking.courseId) {
          console.error('预约数据缺少必要字段:', booking);
          uni.showToast({
            title: '无效的预约数据',
            icon: 'none'
          });
          return;
        }
        
        // 如果存在课程ID，则直接跳转到课程详情页
        if (booking.courseId) {
          console.log('跳转到课程详情页:', booking.courseId);
          this.navigateToCourse(booking.courseId);
          return;
        }
        
        // 否则跳转到预约详情页
        console.log('跳转到预约详情页:', booking._id);
        uni.navigateTo({
          url: `/pages/user/booking-detail?id=${booking._id}`
        });
      } catch (error) {
        console.error('处理预约点击事件出错:', error);
        uni.showToast({
          title: '处理失败，请重试',
          icon: 'none'
        });
      }
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
      
      // 检查支付状态
      const hasPaid = booking.paymentStatus === 'paid' || 
                      booking.isPaid === true;
      
      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: hasPaid ? '您已完成缴费，确定要取消此次预约吗？' : '确定要取消此次预约吗？',
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
            // 检查是否已经是对象
            const userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
            userId = userInfo.userId || userInfo._id || userInfo.uid || 
                   (userInfo.userInfo && userInfo.userInfo._id) ||
                   (userInfo.userInfo && userInfo.userInfo.uid) || '';
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
      
      // 检查课程ID是否为有效的MongoDB ObjectId格式
      if (typeof courseId !== 'string' || courseId.length !== 24) {
        console.warn('课程ID格式可能不正确:', courseId);
      }
      
      // 跳转到课程详情页
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
        
        // 设置cancelTime
        bookingCopy.cancelTime = bookingCopy.cancelTime || new Date().toISOString();
        
        // 保留或设置取消原因
        if (!bookingCopy.cancelReason && bookingCopy.autoCancel) {
          bookingCopy.cancelReason = '超时未支付，系统自动取消';
        }
        
        // 如果有cancelReason但没有autoCancel标记，设置标记
        if (bookingCopy.cancelReason === '超时未支付，系统自动取消' && !bookingCopy.autoCancel) {
          bookingCopy.autoCancel = true;
        }
        
        console.log('准备保存已取消预约:', JSON.stringify({
          _id: bookingCopy._id,
          status: bookingCopy.status,
          autoCancel: bookingCopy.autoCancel,
          cancelReason: bookingCopy.cancelReason
        }));
        
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
        } else {
          // 即使已存在，仍然更新信息确保autoCancel和cancelReason正确
          console.log('更新已存在的已取消预约数据:', bookingCopy._id);
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
        case 'refunded':
          return '暂无已退费的预约记录';
        default:
          return '暂无预约记录';
      }
    },
    
    // 获取标签对应的预约数量
    getTabCount(status) {
      // 使用缓存的数量
      return this.statusCounts[status] || 0;
    },
    
    // 辅助方法：检查存储中是否存在特定自动取消的预约ID
    getAutoCancelledBookingIds() {
      try {
        // 获取已取消预约ID列表
        let cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
        cancelledIds = typeof cancelledIds === 'string' ? JSON.parse(cancelledIds) : cancelledIds;
        if (!Array.isArray(cancelledIds) || !cancelledIds.length) {
          return [];
        }
        
        // 筛选出自动取消的预约ID
        const autoCancelIds = [];
        for (const id of cancelledIds) {
          try {
            const key = `cancelled_booking_${id}`;
            const bookingStr = uni.getStorageSync(key);
            if (bookingStr) {
              const booking = typeof bookingStr === 'string' ? JSON.parse(bookingStr) : bookingStr;
              if (booking.autoCancel === true || booking.cancelReason === '超时未支付，系统自动取消') {
                autoCancelIds.push(id);
              }
            }
          } catch (e) {
            console.error(`获取预约 ${id} 自动取消状态失败:`, e);
          }
        }
        
        console.log(`找到 ${autoCancelIds.length} 个自动取消的预约ID`);
        return autoCancelIds;
      } catch (e) {
        console.error('获取自动取消预约ID列表失败:', e);
        return [];
      }
    },
    
    // 加载本地已取消记录数量
    loadLocalCancelledCount() {
      if (this.localCancelledLoaded) return;
      
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          // 检查是否已经是对象
          const userData = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          const userId = userData.userId || userData._id || userData.uid || 
                         (userData.userInfo && userData.userInfo._id) ||
                         (userData.userInfo && userData.userInfo.uid) || '';
          if (userId) {
            const cancelledIds = uni.getStorageSync('cancelled_booking_ids') || '[]';
            try {
              // 检查是否已经是数组
              const ids = typeof cancelledIds === 'string' ? JSON.parse(cancelledIds) : cancelledIds;
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
          // 检查是否已经是对象
          const userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          return userInfo.userId || userInfo._id || userInfo.uid || 
                 (userInfo.userInfo && userInfo.userInfo._id) ||
                 (userInfo.userInfo && userInfo.userInfo.uid) || '';
        }
      } catch (e) {
        console.error('获取用户ID失败:', e);
      }
      return '';
    },
    
    // 在methods部分添加检查是否显示操作按钮的方法
    showActions(item) {
      return item && (
        item.status !== 'cancelled' && item.status !== 'finished' ||
        (item.status === 'confirmed' || item.status === 'confirmed_unpaid') ||
        item.status !== 'cancelled'
      );
    },
    
    // 判断是否应该显示联系老师按钮
    shouldShowContactButton(item) {
      if (!item) return false;
      
      // 判断是否已支付
      const isPaid = item.paymentStatus === 'paid' || item.isPaid === true;
      
      // 只有当状态为已确认但未缴费时才显示联系老师按钮
      return (item.status === 'confirmed' && !isPaid) || 
             item.status === 'confirmed_unpaid';
    },
    
    // 判断是否应该显示去缴费按钮
    shouldShowPayButton(item) {
      if (!item) return false;
      
      // 检查支付状态 - 未支付、非取消、非已完成、非退费状态时显示
      const isUnpaid = item.paymentStatus !== 'paid' && item.paymentStatus !== 'refunded';
      const isPayable = item.status === 'pending' || 
                        item.status === 'confirmed_unpaid' || 
                        (item.status === 'confirmed' && !item.isPaid);
      
      return isUnpaid && isPayable;
    },
    
    // 前往支付页面
    goToPay(booking, e) {
      // 阻止事件冒泡，避免触发viewDetail
      if (e) e.stopPropagation();
      
      if (!booking || !booking._id) {
        console.error('无法支付：预约ID无效');
        uni.showToast({ 
          title: '预约ID无效', 
          icon: 'none' 
        });
        return;
      }
      
      // 设置操作状态为缴费
      this.isRefunding = false;
      
      // 根据课程的grade字段确定年级
      let grade = booking.grade || '';
      // 从课程标题中尝试提取年级信息（如果grade字段为空）
      if (!grade && booking.courseTitle) {
        const title = booking.courseTitle;
        if (title.includes('初一') || title.includes('七年级')) {
          grade = '初一';
        } else if (title.includes('初二') || title.includes('八年级')) {
          grade = '初二';
        } else if (title.includes('初三') || title.includes('九年级')) {
          grade = '初三';
        }
      }
      
      // 显示加载提示
      uni.showLoading({
        title: '获取支付码中...'
      });
      
      // 从云数据库查询二维码
      const db = uniCloud.database();
      db.collection('payment_codes')
        .where({
          grade: grade || '初一', // 如果没有年级信息，使用初一作为默认
          paymentStatus: 'unpaid'
        })
        .get()
        .then(res => {
          uni.hideLoading();
          if (res.result.data && res.result.data.length > 0) {
            // 获取二维码地址
            this.qrcodeUrl = res.result.data[0].qrcode;
            console.log('获取到支付二维码:', this.qrcodeUrl);
            
            // 保存当前正在支付的预约ID，用于可能的后续操作
            this.currentPayingBookingId = booking._id;
            
            // 显示二维码弹窗
            this.$refs.qrcodePopup.open();
          } else {
            console.error('未找到匹配的支付二维码');
            uni.showToast({
              title: '获取支付码失败',
              icon: 'none'
            });
            
            // 使用默认二维码
            this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
            this.currentPayingBookingId = booking._id;
            this.$refs.qrcodePopup.open();
          }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('获取支付二维码失败:', err);
          uni.showToast({
            title: '获取支付码失败',
            icon: 'none'
          });
          
          // 使用默认二维码
          this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
          this.currentPayingBookingId = booking._id;
          this.$refs.qrcodePopup.open();
        });
    },
    
    // 关闭二维码弹窗
    closeQrcodePopup() {
      this.$refs.qrcodePopup.close();
      // 重置退费状态
      this.isRefunding = false;
    },
    
    // 处理申请退费
    handleRefund(booking, e) {
      // 阻止事件冒泡，避免触发viewDetail
      if (e) e.stopPropagation();
      
      if (!booking || !booking._id) {
        console.error('无法申请退费：预约ID无效');
        uni.showToast({ 
          title: '预约ID无效', 
          icon: 'none' 
        });
        return;
      }
      
      // 设置操作状态为退费
      this.isRefunding = true;
      
      // 根据课程的grade字段确定年级
      let grade = booking.grade || '';
      // 从课程标题中尝试提取年级信息（如果grade字段为空）
      if (!grade && booking.courseTitle) {
        const title = booking.courseTitle;
        if (title.includes('初一') || title.includes('七年级')) {
          grade = '初一';
        } else if (title.includes('初二') || title.includes('八年级')) {
          grade = '初二';
        } else if (title.includes('初三') || title.includes('九年级')) {
          grade = '初三';
        }
      }
      
      // 显示加载提示
      uni.showLoading({
        title: '获取退费码中...'
      });
      
      // 从云数据库查询二维码
      const db = uniCloud.database();
      db.collection('payment_codes')
        .where({
          grade: grade || '初一', // 如果没有年级信息，使用初一作为默认
          paymentStatus: 'paid'
        })
        .get()
        .then(res => {
          uni.hideLoading();
          if (res.result.data && res.result.data.length > 0) {
            // 获取二维码地址
            this.qrcodeUrl = res.result.data[0].qrcode;
            console.log('获取到退费二维码:', this.qrcodeUrl);
            
            // 保存当前正在退费的预约ID，用于可能的后续操作
            this.currentPayingBookingId = booking._id;
            
            // 显示二维码弹窗
            this.$refs.qrcodePopup.open();
          } else {
            console.error('未找到匹配的退费二维码');
            uni.showToast({
              title: '获取退费码失败',
              icon: 'none'
            });
            
            // 使用默认二维码
            this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
            this.currentPayingBookingId = booking._id;
            this.$refs.qrcodePopup.open();
          }
        })
        .catch(err => {
          uni.hideLoading();
          console.error('获取退费二维码失败:', err);
          uni.showToast({
            title: '获取退费码失败',
            icon: 'none'
          });
          
          // 使用默认二维码
          this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
          this.currentPayingBookingId = booking._id;
          this.$refs.qrcodePopup.open();
        });
    },
    
    // 判断是否应该显示倒计时
    shouldShowCountdown(booking) {
      if (!booking || !booking._id) return false;
      
      // 如果已支付或已退费，不显示倒计时
      if (booking.paymentStatus === 'paid' || booking.paymentStatus === 'refunded') {
        return false;
      }
      
      // 检查状态是否为待支付
      const isPendingPayment = booking.status === 'pending' || 
                              (booking.status === 'pending' && booking.paymentStatus === 'unpaid') ||
                              booking.status === 'confirmed_unpaid';
      
      // 获取倒计时值
      const countdown = this.getPaymentCountdown(booking);
      
      // 调试日志
      console.log(`预约ID: ${booking.bookingId}, 状态: ${booking.status}, 支付状态: ${booking.paymentStatus}, 倒计时: ${countdown}秒`);
      
      return isPendingPayment && countdown > 0;
    },
    
    // 初始化所有倒计时
    initAllCountdowns() {
      // 清除之前的所有定时器
      this.clearAllCountdowns();
      
      console.log('开始初始化所有倒计时, 预约数量:', this.bookingList.length);
      
      // 初始化所有待支付状态的预约倒计时
      if (Array.isArray(this.bookingList)) {
        let initCount = 0;
        this.bookingList.forEach(booking => {
          if (booking && (booking.status === 'pending' || booking.status === 'confirmed_unpaid')) {
            console.log('初始化预约倒计时:', booking.bookingId || booking._id);
            this.initCountdown(booking);
            initCount++;
          }
        });
        console.log(`成功初始化 ${initCount} 个预约的倒计时`);
      }
      
      // 强制更新视图
      this.$forceUpdate();
    },
    
    // 初始化单个预约的倒计时
    initCountdown(booking) {
      if (!booking || !booking._id || (booking.status !== 'pending' && booking.status !== 'confirmed_unpaid')) {
        return;
      }
      
      // 如果已支付或已退费，不初始化倒计时
      if (booking.paymentStatus === 'paid' || booking.paymentStatus === 'refunded') {
        console.log(`预约 ${booking.bookingId || booking._id} 已支付或已退费，不初始化倒计时`);
        return;
      }
      
      console.log(`开始初始化预约 ${booking.bookingId || booking._id} 的倒计时`);
      
      try {
        // 清除可能存在的定时器
        this.clearCountdown(booking._id);
        
        // 计算倒计时初始值（秒）
        const countdownValue = this.calculateRemainingTime(booking);
        console.log(`计算得到倒计时初始值: ${countdownValue}秒`);
        
        if (countdownValue <= 0) {
          // 已超时，设置为0并自动取消
          this.handleExpiredBooking(booking);
          return;
        }
        
        // 设置初始倒计时值
        this.countdownValues[booking._id] = countdownValue;
        
        // 根据剩余时间设置更新频率（秒）
        let updateInterval = this.getUpdateInterval(countdownValue);
        
        // 云端检查频率（毫秒）- 每小时检查一次
        const cloudCheckInterval = 3600 * 1000; 
        
        // 最后一次云端检查时间
        let lastCloudCheck = Date.now();
        
        // 创建定时器 - 使用单一定时器处理UI更新和云端检查
        this.countdownTimers[booking._id] = setInterval(() => {
          // 更新倒计时
          if (this.countdownValues[booking._id] > 0) {
            this.countdownValues[booking._id] -= updateInterval;
            
            // 检查是否需要调整更新频率
            const newInterval = this.getUpdateInterval(this.countdownValues[booking._id]);
            if (newInterval !== updateInterval) {
              console.log(`预约 ${booking.bookingId} 调整更新频率: ${updateInterval}秒 -> ${newInterval}秒`);
              clearInterval(this.countdownTimers[booking._id]);
              updateInterval = newInterval;
              this.countdownTimers[booking._id] = setInterval(arguments.callee, updateInterval * 1000);
            }
            
            // 记录日志 - 在更新频率变化点或每小时记录一次
            if (this.countdownValues[booking._id] % 3600 === 0 || 
                this.countdownValues[booking._id] === 7200 || // 剩余2小时
                this.countdownValues[booking._id] === 3600 ||  // 剩余1小时
                this.countdownValues[booking._id] === 120) {   // 剩余2分钟
              console.log(`预约 ${booking.bookingId} 剩余支付时间: ${this.formatCountdown(this.countdownValues[booking._id])}`);
            }
            
            // 检查是否需要进行云端检查（每小时）
            const now = Date.now();
            if (now - lastCloudCheck >= cloudCheckInterval) {
              console.log(`预约 ${booking.bookingId} 执行每小时云端检查`);
              this.checkBookingStatusFromCloud(booking._id);
              lastCloudCheck = now;
            }
            
            // 强制更新视图
            this.$forceUpdate();
          } else {
            // 倒计时结束，处理超时
            this.handleExpiredBooking(booking);
          }
        }, updateInterval * 1000); // 转换为毫秒
      } catch (e) {
        console.error('初始化倒计时异常:', e);
      }
    },
    
    // 根据剩余时间获取适当的更新间隔（秒）
    getUpdateInterval(remainingSeconds) {
      if (remainingSeconds > 7200) {
        // 大于2小时：每10分钟更新一次
        return 600;
      } else if (remainingSeconds > 3600) {
        // 1-2小时：每5分钟更新一次
        return 300;
      } else if (remainingSeconds > 120) {
        // 2分钟-1小时：每分钟更新一次
        return 60;
      } else {
        // 最后2分钟：每10秒更新一次
        return 10;
      }
    },
    
    // 处理超时预约
    handleExpiredBooking(booking) {
      if (!booking || !booking._id) return;
      
      console.log(`预约 ${booking.bookingId || booking._id} 已超时，自动取消`);
      
      // 清除定时器
      this.clearCountdown(booking._id);
      
      // 设置倒计时为0
      this.countdownValues[booking._id] = 0;
      
      // 检查当前状态，避免重复处理
      if (booking.status === 'cancelled') {
        console.log('预约已经是取消状态，不再处理');
        return;
      }
      
      // 更新预约状态为已取消（超时）
      booking.status = 'cancelled';
      booking.autoCancel = true;
      booking.cancelReason = '超时未支付，系统自动取消';
      
      // 更新列表中的状态
      this.updateBookingStatus(booking._id, 'cancelled');
      
      // 保存到本地存储
      this.storeCancelledBooking(booking);
      
      // 显示提示
      uni.showToast({
        title: '预约已超时未支付，自动取消',
        icon: 'none',
        duration: 2000
      });
      
      // 标记预约状态已变更
      this.markBookingChanged();
      
      // 将超时状态同步到云端（限制频率）
      this.syncExpiredBookingToCloud(booking._id);
      
      // 刷新列表
      this.resetList();
      this.loadBookingList();
    },
    
    // 从云端检查预约状态
    async checkBookingStatusFromCloud(bookingId) {
      try {
        console.log(`从云端检查预约状态: ${bookingId}`);
        
        // 调用云函数获取预约的最新状态
        const result = await uniCloud.callFunction({
          name: 'getBookingStatus',
          data: { bookingId }
        });
        
        if (result.result && result.result.success) {
          const serverBooking = result.result.data;
          console.log(`云端返回预约状态:`, serverBooking);
          
          // 如果云端状态已更改，更新本地状态
          if (serverBooking && serverBooking.status) {
            const localBooking = this.bookingList.find(b => b._id === bookingId);
            if (localBooking && localBooking.status !== serverBooking.status) {
              console.log(`更新本地预约状态: ${localBooking.status} -> ${serverBooking.status}`);
              this.updateBookingStatus(bookingId, serverBooking.status);
              
              // 如果状态为已取消，停止倒计时
              if (serverBooking.status === 'cancelled') {
                this.clearCountdown(bookingId);
              }
              
              // 刷新UI
              this.$forceUpdate();
            }
          }
        }
      } catch (error) {
        console.error('从云端检查预约状态失败:', error);
      }
    },
    
    // 将超时状态同步到云端（限制频率）
    async syncExpiredBookingToCloud(bookingId) {
      // 检查是否已经同步过
      const key = `synced_expired_${bookingId}`;
      const isSynced = uni.getStorageSync(key);
      
      if (isSynced) {
        console.log(`预约 ${bookingId} 已经同步过超时状态，跳过`);
        return;
      }
      
      try {
        console.log(`同步预约 ${bookingId} 的超时状态到云端`);
        
        // 调用云函数更新预约状态
        const result = await uniCloud.callFunction({
          name: 'forceUpdateBooking',
          data: {
            bookingId,
            status: 'cancelled',
            autoCancel: true,
            cancelReason: '超时未支付，系统自动取消',
            updateCourseCount: true
          }
        });
        
        if (result.result && result.result.success) {
          console.log(`同步预约 ${bookingId} 超时状态成功`);
          // 标记为已同步
          uni.setStorageSync(key, 'true');
        } else {
          console.error(`同步预约 ${bookingId} 超时状态失败:`, result.result);
        }
      } catch (error) {
        console.error(`同步预约 ${bookingId} 超时状态出错:`, error);
      }
    },
    
    // 格式化倒计时显示 - 根据时间长度调整显示格式
    formatCountdown(seconds) {
      if (seconds <= 0) return '已超时';
      
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      // 根据剩余时间调整显示格式
      if (days > 0) {
        // 超过1天显示"x天y小时"
        return `${days}天${hours}小时`;
      } else if (hours > 0) {
        // 小于1天但超过1小时显示"x小时y分钟"
        return `${hours}小时${minutes}分钟`;
      } else if (minutes > 0) {
        // 小于1小时但超过1分钟显示"x分y秒"
        return `${minutes}分${secs}秒`;
      } else {
        // 小于1分钟只显示秒
        return `${secs}秒`;
      }
    },
    
    // 计算剩余时间（秒）
    calculateRemainingTime(booking) {
      try {
        if (!booking || !booking.createTime) {
          return 0;
        }
        
        // 转换创建时间 - 修复时区问题
        let createTime = new Date(booking.createTime);
        if (isNaN(createTime.getTime())) {
          console.error('无效的创建时间:', booking.createTime);
          return 0;
        }
        
        const now = new Date();
        
        // 计算已经过去的时间（毫秒）
        const elapsedMs = now.getTime() - createTime.getTime();
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        
        console.log('预约创建时间:', createTime.toLocaleString());
        console.log('当前时间:', now.toLocaleString());
        console.log('已过去秒数:', elapsedSeconds);
        
        // 支付时限为7天
        const timeLimit = 604800 ;
        
        if (elapsedSeconds >= timeLimit) {
          console.log('预约已超过支付时限');
          
          // 如果超时，立即将预约标记为已取消并设置自动取消标记
          if (booking.status === 'pending') {
            booking.status = 'cancelled';
            booking.autoCancel = true;
            booking.cancelReason = '超时未支付，系统自动取消';
            
            // 保存到本地存储
            this.storeCancelledBooking(booking);
            console.log('预约已自动取消:', booking.bookingId);
          }
          
          return 0; // 已超时
        } else {
          const remaining = timeLimit - elapsedSeconds;
          console.log('剩余支付时间(秒):', remaining);
          return remaining; // 剩余秒数
        }
      } catch (e) {
        console.error('计算剩余时间异常:', e);
        return 0;
      }
    },
    
    // 获取预约的倒计时值
    getPaymentCountdown(booking) {
      if (!booking || !booking._id) return 0;
      return this.countdownValues[booking._id] || 0;
    },
    
    // 清除单个预约的倒计时
    clearCountdown(bookingId) {
      if (this.countdownTimers[bookingId]) {
        clearInterval(this.countdownTimers[bookingId]);
        delete this.countdownTimers[bookingId];
      }
    },
    
    // 清除所有倒计时
    clearAllCountdowns() {
      Object.keys(this.countdownTimers).forEach(bookingId => {
        this.clearCountdown(bookingId);
      });
      this.countdownTimers = {};
    },
    
    // 处理支付成功事件
    handlePaymentSuccess(data) {
      console.log('收到支付成功事件:', data);
      
      if (!data || !data.bookingId) {
        console.error('支付成功事件缺少bookingId');
        return;
      }
      
      // 查找并更新指定预约的支付状态
      const bookingIndex = this.bookingList.findIndex(item => 
        item && (item._id === data.bookingId || item.bookingId === data.bookingId)
      );
      
      if (bookingIndex >= 0) {
        // 更新支付状态
        this.bookingList[bookingIndex].paymentStatus = 'paid';
        
        // 添加支付时间（如果没有）
        if (!this.bookingList[bookingIndex].paidTime) {
          this.bookingList[bookingIndex].paidTime = new Date().toISOString();
        }
        
        // 清除该预约的倒计时
        this.clearCountdown(this.bookingList[bookingIndex]._id);
        
        // 强制更新视图
        this.$forceUpdate();
        
        console.log(`成功更新预约${data.bookingId}的支付状态为已支付`);
      } else {
        console.log(`未找到预约${data.bookingId}，刷新列表以获取最新数据`);
        // 刷新列表以获取最新数据
        this.resetList();
        this.loadBookingList();
      }
    },
    
    // 判断是否应该显示"超时未支付自动取消"标签
    showAutoCancelTag(item) {
      if (!item || !item._id || item.status !== 'cancelled') return false;
      
      // 检查预约对象本身的属性
      if (item.autoCancel === true || item.cancelReason === '超时未支付，系统自动取消') {
        return true;
      }
      
      // 检查本地存储中是否为自动取消的预约
      const isAutoCancel = this.isAutoCancelBookingFromStorage(item._id);
      if (isAutoCancel) {
        // 更新当前数据，确保属性同步
        item.autoCancel = true;
        item.cancelReason = '超时未支付，系统自动取消';
      }
      
      return isAutoCancel;
    },
    
    // 检查预约在本地存储中是否为自动取消
    isAutoCancelBookingFromStorage(bookingId) {
      if (!bookingId) return false;
      
      try {
        const key = `cancelled_booking_${bookingId}`;
        const bookingStr = uni.getStorageSync(key);
        
        if (bookingStr) {
          const booking = typeof bookingStr === 'string' ? JSON.parse(bookingStr) : bookingStr;
          return booking.autoCancel === true || booking.cancelReason === '超时未支付，系统自动取消';
        }
      } catch (e) {
        console.error('检查预约自动取消状态失败:', e);
      }
      
      return false;
    },
    
    // 在methods中添加格式化日期范围的方法
    formatDateRange(item) {
      // 如果没有日期数据，返回"暂无"
      if (!item.startDate && !item.endDate) {
        return '暂无';
      }
      
      // 格式化单个日期
      const formatDate = (dateStr) => {
        try {
          if (!dateStr) return '';
          
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            return dateStr;
          }
          
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        } catch (e) {
          return dateStr;
        }
      };
      
      // 如果有开始和结束日期，显示范围
      if (item.startDate && item.endDate) {
        return `${formatDate(item.startDate)}-${formatDate(item.endDate)}`;
      } else if (item.startDate) {
        return formatDate(item.startDate);
      } else if (item.endDate) {
        return formatDate(item.endDate);
      }
      
      // 尝试使用courseStartDate和courseEndDate作为备选
      if (item.courseStartDate && item.courseEndDate) {
        return `${formatDate(item.courseStartDate)}-${formatDate(item.courseEndDate)}`;
      } else if (item.courseStartDate) {
        return formatDate(item.courseStartDate);
      } else if (item.courseEndDate) {
        return formatDate(item.courseEndDate);
      }
      
      return '暂无';
    },
    
    // 添加格式化支付时间的方法
    formatPaymentTime(timeStr) {
      if (!timeStr) return '未知'
      
      const date = new Date(timeStr)
      if (isNaN(date.getTime())) {
        return '未知'
      }
      
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
  }
}
</script>

<style lang="scss">
.booking-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 30rpx;
}

/* 状态筛选选项卡 */
.tab-bar {
  display: flex;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  padding: 0 20rpx;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
    position: relative;
    
    &.active {
      color: #EC7A49;
      font-weight: bold;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 4rpx;
        background-color: #EC7A49;
        border-radius: 2rpx;
      }
    }
    
    .badge {
      position: absolute;
      top: 10rpx;
      right: 25%;
      min-width: 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      border-radius: 16rpx;
      background-color: #FF5151;
      color: #fff;
      font-size: 20rpx;
      padding: 0 6rpx;
      box-sizing: border-box;
      transform: translateX(50%);
    }
  }
}

/* 预约列表 */
.booking-list {
  padding: 20rpx;
}

/* 预约卡片 */
.booking-item {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
}

/* 顶部：课程标题 */
.course-title-container {
  margin-bottom: 16rpx;
  border-bottom: 1rpx solid #f0f0f0;
  padding-bottom: 12rpx;
  
  .course-title {
    font-size: 30rpx;
    font-weight: bold;
    color: #333;
    line-height: 1.4;
  }
}

/* 主体内容：左右布局 */
.booking-content {
  display: flex;
  margin-bottom: 16rpx;
}

/* 左侧区域：预约状态 */
.booking-left {
  width: 200rpx;
  padding-right: 20rpx;
  border-right: 1rpx solid #f0f0f0;
}

.booking-status-wrapper {
  margin-bottom: 8rpx;
}

.booking-status {
  display: inline-block;
  font-size: 24rpx;
  padding: 4rpx 10rpx;
  border-radius: 6rpx;
  color: #fff;
  margin-bottom: 6rpx;
  
  &.status-pending {
    background-color: #3B9BFF;
  }
  
  &.status-confirmed_unpaid, &.status-confirmed {
    background-color: #FA8C16;
  }
  
  &.status-cancelled, &.status-cancel {
    background-color: #BDBDBD;
  }
  
  &.status-finished {
    background-color: #52C41A;
  }
}

.status-tag {
  display: inline-block;
  font-size: 22rpx;
  color: #FF5151;
  margin-top: 4rpx;
  
  &.auto-cancel {
    color: #FF5151;
    font-weight: bold;
  }
}

.payment-countdown {
  font-size: 22rpx;
  color: #FF5151;
  margin-bottom: 12rpx;
  
  .countdown-time {
    font-weight: bold;
  }
}

.payment-time {
  font-size: 22rpx;
  color: #52C41A;
  margin-bottom: 12rpx;
  
  .payment-time-value {
    font-weight: bold;
  }
}

.booking-time {
  font-size: 20rpx;
  color: #999;
  margin-top: 20rpx;
}

/* 右侧区域：课程详细信息 */
.booking-right {
  flex: 1;
  padding-left: 20rpx;
}

.detail-info {
  flex: 1;
}

.detail-row {
  display: flex;
  margin-bottom: 10rpx;
  font-size: 26rpx;
  line-height: 1.4;
  
  .detail-label {
    width: 140rpx;
    color: #999;
    flex-shrink: 0;
  }
  
  .detail-value {
    color: #333;
    flex: 1;
    
    &.teacher-name {
      color: #EC7A49;
    }
  }
}

/* 底部：操作按钮 */
.booking-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 12rpx;
  border-top: 1rpx solid #f0f0f0;
  
  .action-btn {
    min-width: 140rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 30rpx;
    color: #fff;
    font-size: 26rpx;
    text-align: center;
    margin-left: 16rpx;
    padding: 0 20rpx;
    
    &.cancel-btn {
      background-color: #fff;
      color: #EC7A49;
      border: 1rpx solid #EC7A49;
    }
    
    &.pay-btn {
      background-color: #EC7A49;
      color: #fff;
    }
    
    &.contact-btn {
      background-color: #f5f5f5;
      color: #666;
    }
    
    &.refund-btn {
      background-color: #fff;
      color: #3B9BFF;
      border: 1rpx solid #3B9BFF;
    }
  }
}

/* 加载更多 */
.load-more {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 26rpx;
}

/* 空数据提示 */
.empty-tip {
  padding: 100rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}

/* 二维码弹窗样式 */
.qrcode-popup {
  background-color: #fff;
  border-radius: 12px;
  padding: 30rpx;
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
}

.qrcode-image {
  width: 500rpx;
  height: 500rpx;
  margin-bottom: 20rpx;
}

.qrcode-contact {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-btn {
  width: 80%;
  background-color: #2b85e4;
  color: #fff;
  border-radius: 50rpx;
}

@keyframes fadeInOut {
  from { opacity: 0; }
  to { opacity: 1; }
}

.cancelled-tag {
  color: #FF6633;
  margin-right: 5px;
}
</style> 