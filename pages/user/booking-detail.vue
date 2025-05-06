<template>
  <view class="detail-container">
    <!-- 状态栏 -->
    <view class="status-bar" :class="'status-' + bookingDetail.status">
      <view class="status-icon">
        <text class="iconfont" :class="statusIcon"></text>
      </view>
      <view class="status-info">
        <view class="status-text">{{statusText}}</view>
        
        <!-- 支付倒计时 - 只在未支付且非退费状态下显示 -->
        <view class="status-countdown" v-if="bookingDetail.status === 'pending' && bookingDetail.paymentStatus !== 'paid' && bookingDetail.paymentStatus !== 'refunded'" style="margin-top: 10rpx;">
          <text v-if="paymentCountdown > 0">
            <text class="countdown-label">支付倒计时：</text>
            <text class="countdown-time">{{formatCountdown(paymentCountdown)}}</text>
          </text>
          <text v-else class="countdown-time">正在加载支付时限...</text>
        </view>
        
        <view class="status-desc">{{statusDesc}}</view>
        <view class="status-desc course-deleted" v-if="bookingDetail.isCourseDeleted">
          {{ bookingDetail.courseDeletedNote || '课程已删除' }}
        </view>
        <view class="status-desc auto-cancel" v-if="bookingDetail.status === 'cancelled' && bookingDetail.autoCancel">
          {{ bookingDetail.cancelReason || '超时未支付，系统自动取消' }}
        </view>
      </view>
    </view>
    
    <!-- 课程信息 -->
    <view class="info-card">
      <view class="card-title">课程信息</view>
      <view class="course-title">{{bookingDetail.courseTitle}}</view>
      <view class="course-deleted-tag" v-if="bookingDetail.isCourseDeleted">课程已删除</view>
      <view class="info-row">
        <text class="info-label">课程时间：</text>
        <text class="info-value">{{formattedCourseTime}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">课程日期：</text>
        <text class="info-value">{{bookingDetail.startDate}} 至 {{bookingDetail.endDate}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">校区地点：</text>
        <text class="info-value">{{bookingDetail.schoolName}}</text>
      </view>
      <view class="info-row teacher-info">
        <text class="info-label">任课教师：</text>
        <text class="info-value teacher-name">{{bookingDetail.teacherName || '暂无指定教师'}}</text>
        <text class="phone-link" v-if="bookingDetail.teacherPhone" @click="callTeacher">
          {{bookingDetail.teacherPhone}}
          <text class="iconfont icon-phone"></text>
        </text>
      </view>
      <view class="info-row">
        <text class="info-label">预约时间：</text>
        <text class="info-value">{{formatBookingTime(bookingDetail.createTime)}}</text>
      </view>
    </view>
    
    <!-- 学生信息 -->
    <view class="info-card">
      <view class="card-title">学生信息</view>
      <view class="info-row">
        <text class="info-label">学生姓名：</text>
        <text class="info-value">{{bookingDetail.studentName}}</text>
      </view>
      <view class="info-row">
        <text class="info-label">联系电话：</text>
        <text class="info-value">{{bookingDetail.userPhoneNumber || '暂无'}}</text>
      </view>
      <view class="info-row" v-if="bookingDetail.remark">
        <text class="info-label">备注信息：</text>
        <text class="info-value">{{bookingDetail.remark}}</text>
      </view>
    </view>
    
    <!-- 底部空白区域，防止内容被操作按钮遮挡 -->
    <view class="bottom-space"></view>
    
    <!-- 操作区域 -->
    <view class="action-area">
      <view class="action-bar">
        <!-- 取消预约按钮 - 未支付状态下显示 -->
        <block v-if="bookingDetail.status === 'pending' || bookingDetail.status === 'confirmed_unpaid' || (bookingDetail.status === 'confirmed' && bookingDetail.paymentStatus !== 'paid')">
          <view class="action-btn primary" @click="cancelBooking">取消预约</view>
        </block>
        
        <!-- 去缴费按钮 - 待确认或已确认未支付状态下显示 -->
        <view 
          class="action-btn pay-btn" 
          v-if="(bookingDetail.status === 'pending' || bookingDetail.status === 'confirmed_unpaid' || (bookingDetail.status === 'confirmed' && bookingDetail.paymentStatus !== 'paid')) && bookingDetail.paymentStatus !== 'refunded'"
          @click="goToPay"
        >去缴费</view>
        
        <!-- 已确认但未缴费时才显示联系老师按钮 -->
        <block v-if="isNeedContactTeacher">
          <view class="action-btn primary" @click="contactTeacher">联系老师</view>
        </block>
        
        <!-- 退款按钮 - 只有已支付状态才显示 -->
        <view 
          class="action-btn refund-btn" 
          v-if="bookingDetail.paymentStatus === 'paid'"
          @click="handleRefund"
        >申请退费</view>
        
        <!-- 返回按钮始终放在最后 -->
        <view class="action-btn outline" @click="goBack">返回列表</view>
      </view>
    </view>
    
    <!-- 取消预约弹窗 -->
    <uni-popup ref="cancelPopup" type="dialog">
      <uni-popup-dialog
        title="取消预约"
        content="确定要取消此预约吗？取消后无法恢复"
        :before-close="true"
        @confirm="confirmCancel"
        @close="closePopup">
      </uni-popup-dialog>
    </uni-popup>
    
    <!-- 二维码支付弹窗 -->
    <uni-popup ref="qrcodePopup" type="center">
      <view class="qrcode-popup">
        <view class="qrcode-title">扫码缴费</view>
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
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue';

export default {
  components: {
    uniPopup,
    uniPopupDialog
  },
  data() {
    return {
      bookingId: '',
      bookingDetail: {
        _id: '',
        bookingId: '',
        courseId: '',
        courseTitle: '',
        courseStartTime: '',
        courseEndTime: '',
        schoolName: '',
        studentName: '',
        userPhoneNumber: '',
        remark: '',
        status: 'pending',
        paymentStatus: '',
        createTime: '',
        isCourseDeleted: false,
        courseDeletedNote: '',
        teacherName: '',
        teacherPhone: '',
        grade: '' // 添加grade字段
      },
      // 倒计时相关
      paymentCountdown: 0, // 支付倒计时（秒）
      countdownTimer: null, // 倒计时定时器
      
      // 二维码相关
      qrcodeUrl: '' // 支付二维码URL
    }
  },
  onLoad(options) {
    console.log('booking-detail页面加载，参数:', options);
    if (options.id) {
      this.bookingId = options.id
      this.fetchBookingDetail()
      
      // 立即开始倒计时检查，不等待fetchBookingDetail完成
      if (this.bookingId) {
        console.log('预约详情页面加载后立即检查支付状态');
        setTimeout(() => {
          this.checkPaymentTimeout();
        }, 500); // 稍微延迟一下，确保页面已渲染
      }
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  },
  onShow() {
    // 页面显示时，立即检查所有预约状态
    if (this.bookingDetail && this.bookingDetail._id) {
      console.log('页面显示时，检查预约状态:', this.bookingDetail.status);
      
      // 对所有待确认预约，始终检查支付状态
      if (this.bookingDetail.status === 'pending') {
        console.log('页面显示：发现pending状态预约，强制检查支付超时');
        this.checkPaymentTimeout();
      }
    } else if (this.bookingId) {
      // 如果预约详情还没加载但有ID，尝试直接检查
      console.log('页面显示：预约详情未加载，直接检查ID:', this.bookingId);
      setTimeout(() => {
        this.checkPaymentTimeout();
      }, 300);
    }
  },
  onUnload() {
    // 在页面卸载时清除定时器
    this.clearCountdownTimer();
  },
  computed: {
    statusIcon() {
      return this.getStatusIcon(this.bookingDetail.status);
    },
    statusText() {
      return this.getStatusText(this.bookingDetail.status, this.bookingDetail.paymentStatus);
    },
    statusDesc() {
      return this.getStatusDesc(this.bookingDetail.status, this.bookingDetail.paymentStatus);
    },
    formattedCourseTime() {
      // 从课程开始和结束时间格式化课程时间
      let result = '';
      if (this.bookingDetail.courseStartTime && this.bookingDetail.courseEndTime) {
        result = `${this.bookingDetail.courseStartTime}-${this.bookingDetail.courseEndTime}`;
      } else {
        result = this.bookingDetail.courseTime || '暂无';
      }
      
      // 添加classTime字段内容（每周几）
      if (this.bookingDetail.classTime) {
        // 处理classTime字段，可能是字符串或数组
        let classTimeStr = '';
        if (Array.isArray(this.bookingDetail.classTime)) {
          // 处理数组中可能包含的字符串，如 ["周一，周三"]
          const extractWeekdays = (str) => {
            if (!str) return [];
            // 处理包含逗号、顿号或空格分隔的字符串
            return str.split(/[,，、\s]+/).filter(Boolean);
          };
          
          // 提取和扁平化所有周几数据
          let weekdaysArray = [];
          this.bookingDetail.classTime.forEach(entry => {
            if (typeof entry === 'string') {
              if (entry.includes('周') || entry.includes('每')) {
                weekdaysArray = weekdaysArray.concat(extractWeekdays(entry));
              } else {
                weekdaysArray.push(entry);
              }
            } else {
              weekdaysArray.push(entry);
            }
          });
          
          // 标准化处理，确保所有数据格式一致
          const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          const classTimeSet = new Set();
          
          weekdaysArray.forEach(day => {
            const trimmedDay = String(day).trim();
            // 处理标准格式
            if (weekdays.includes(trimmedDay)) {
              classTimeSet.add(trimmedDay);
            } 
            // 处理数字格式，如 "1" 表示周一
            else if (/^[1-7]$/.test(trimmedDay)) {
              const index = parseInt(trimmedDay, 10) - 1;
              if (index >= 0 && index < 7) {
                classTimeSet.add(weekdays[index]);
              }
            }
            // 处理带有"周"前缀但不完整的格式，如"周一"可能缩写为"一"
            else if (/^[一二三四五六日天]$/.test(trimmedDay)) {
              const dayMap = {一: '周一', 二: '周二', 三: '周三', 四: '周四', 五: '周五', 六: '周六', 日: '周日', 天: '周日'};
              if (dayMap[trimmedDay]) {
                classTimeSet.add(dayMap[trimmedDay]);
              }
            }
          });
          
          // 检查是否为"每天"
          const isEveryday = weekdays.every(day => classTimeSet.has(day));
          if (isEveryday) {
            classTimeStr = '天';
          } else {
            // 不是每天，按照周一到周日的顺序排序
            const sortedDays = [];
            weekdays.forEach(day => {
              if (classTimeSet.has(day)) {
                sortedDays.push(day);
              }
            });
            classTimeStr = sortedDays.join('、');
          }
        } else if (typeof this.bookingDetail.classTime === 'string') {
          // 如果是字符串，检查是否为"每天"或包含"每天"字样
          const classTimeString = this.bookingDetail.classTime.trim();
          
          if (classTimeString === '每天' || classTimeString === '天天' || 
              classTimeString === '每日' || classTimeString.includes('每天')) {
            classTimeStr = '天';
          } else {
            // 处理可能包含逗号分隔的字符串，如 "周一，周三"
            const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            const parts = classTimeString.split(/[,，、\s]+/).filter(Boolean);
            
            if (parts.length > 1) {
              // 包含多个周几数据，标准化并排序
              const daySet = new Set();
              parts.forEach(part => {
                const trimmed = part.trim();
                if (weekdays.includes(trimmed)) {
                  daySet.add(trimmed);
                }
              });
              
              const sortedDays = [];
              weekdays.forEach(day => {
                if (daySet.has(day)) {
                  sortedDays.push(day);
                }
              });
              
              classTimeStr = sortedDays.join('、');
            } else {
              // 单个值，直接使用
              classTimeStr = classTimeString;
            }
          }
        }
        
        // 如果classTime有内容，添加到结果中
        if (classTimeStr) {
          result += ` (每${classTimeStr})`;
        }
      }
      
      return result;
    },
    // 判断是否需要显示联系老师按钮
    isNeedContactTeacher() {
      // 只有当状态为已确认但未缴费时才显示联系老师按钮
      return this.bookingDetail.status === 'confirmed' && 
             this.bookingDetail.paymentStatus !== 'paid' &&
             !this.isPaid;
    },
    // 判断是否已支付
    isPaid() {
      return this.bookingDetail.paymentStatus === 'paid' || 
             this.bookingDetail.isPaid === true;
    }
  },
  methods: {
    // 获取预约详情
    async fetchBookingDetail() {
      if (!this.bookingId) {
        console.error('预约ID为空，无法获取详情')
        uni.showToast({
          title: '参数错误',
          icon: 'none'
        })
        return
      }
      
      uni.showLoading({
        title: '加载中...'
      })
      
      try {
        // 调用云函数获取预约详情
        const res = await uniCloud.callFunction({
          name: 'getBookingDetail',
          data: {
            bookingId: this.bookingId
          }
        })
        
        console.log('预约详情云函数返回结果:', res.result)
        
        if (res.result && res.result.success && res.result.data) {
          // 合并返回的数据
          this.bookingDetail = {
            ...this.bookingDetail,
            ...res.result.data,
            courseTime: res.result.data.courseTime || this.formatCourseTimeFromFields(res.result.data),
            userPhoneNumber: res.result.data.userPhoneNumber || '',
            // 确保teacherName有默认值
            teacherName: res.result.data.teacherName || '暂无指定教师',
            teacherPhone: res.result.data.teacherPhone || '',
            grade: res.result.data.grade || '' // 添加grade字段
          }
          console.log('获取到预约详情:', this.bookingDetail)
          
          // 确保支付状态字段存在
          if (!this.bookingDetail.paymentStatus) {
            console.log('预约记录缺少paymentStatus字段，设置为默认值unpaid');
            this.bookingDetail.paymentStatus = 'unpaid';
          }
          
          // 如果有课程ID，尝试获取课程的classTime信息
          if (this.bookingDetail.courseId) {
            this.fetchCourseClassTime(this.bookingDetail.courseId);
          }
          
          // 对于所有待确认状态的预约，无论支付状态如何，都检查倒计时
          if (this.bookingDetail.status === 'pending') {
            console.log('发现待确认预约，立即检查倒计时');
            this.checkPaymentTimeout();
          }
        } else {
          console.error('获取预约详情失败:', res.result)
          uni.showToast({
            title: '获取预约详情失败',
            icon: 'none'
          })
        }
      } catch (e) {
        console.error('获取预约详情出错:', e)
        uni.showToast({
          title: '获取预约详情失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // 获取课程的classTime信息
    async fetchCourseClassTime(courseId) {
      if (!courseId) return;
      
      try {
        console.log('获取课程classTime信息，课程ID:', courseId);
        // 首先尝试使用getCourseDetail云函数
        let classTimeData = null;
        
        try {
          const res = await uniCloud.callFunction({
            name: 'getCourseDetail',
            data: { courseId }
          });
          
          if (res.result && res.result.success && res.result.data) {
            console.log('获取课程详情成功:', res.result.data);
            
            // 更新课程信息中的classTime字段
            if (res.result.data.classTime) {
              classTimeData = res.result.data.classTime;
            }
          }
        } catch (err) {
          console.error('获取课程详情信息失败:', err);
        }
        
        // 如果通过云函数获取失败，尝试直接从数据库获取
        if (!classTimeData) {
          try {
            console.log('尝试直接从数据库获取课程classTime信息');
            const db = uniCloud.database();
            const result = await db.collection('courses')
              .doc(courseId)
              .field({ classTime: true })
              .get();
              
            if (result.data && result.data.classTime) {
              classTimeData = result.data.classTime;
            }
          } catch (e) {
            console.error('从数据库获取课程classTime失败:', e);
          }
        }
        
        // 如果获取到了classTime数据，更新预约详情
        if (classTimeData) {
          console.log('成功获取到课程classTime数据:', classTimeData);
          this.bookingDetail.classTime = classTimeData;
          
          // 确保classTime是数组格式
          if (!Array.isArray(this.bookingDetail.classTime)) {
            let formattedClassTime;
            
            // 处理可能的字符串格式
            if (typeof this.bookingDetail.classTime === 'string') {
              const classTimeStr = this.bookingDetail.classTime.trim();
              
              // 处理逗号或顿号分隔的字符串
              if (classTimeStr.includes(',') || 
                  classTimeStr.includes('，') || 
                  classTimeStr.includes('、')) {
                formattedClassTime = classTimeStr
                  .split(/[,，、\s]+/)
                  .filter(Boolean)
                  .map(day => day.trim());
              } else {
                formattedClassTime = [classTimeStr];
              }
            } else {
              formattedClassTime = [String(this.bookingDetail.classTime)];
            }
            
            this.bookingDetail.classTime = formattedClassTime;
          }
          
          console.log('处理后的classTime数据:', this.bookingDetail.classTime);
        } else {
          console.warn('无法获取课程classTime信息');
        }
      } catch (err) {
        console.error('获取并处理课程classTime信息失败:', err);
      }
    },
    
    // 从字段格式化课程时间
    formatCourseTimeFromFields(data) {
      if (data.courseStartTime && data.courseEndTime) {
        return `${data.courseStartTime} - ${data.courseEndTime}`;
      }
      return '';
    },
    
    // 格式化预约时间
    formatBookingTime(timeStr) {
      if (!timeStr) return ''
      
      const date = new Date(timeStr)
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    },
    
    // 返回列表
    goBack() {
      // 如果有课程ID，则跳转到课程详情
      if (this.bookingDetail && this.bookingDetail.courseId) {
        // 检查是否是从课程详情页来的
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        
        // 如果前一个页面不是课程详情，且课程未取消，则跳转到课程详情
        if (prevPage && !prevPage.route.includes('/pages/course/detail') && this.bookingDetail.status !== 'cancelled') {
          console.log('返回并跳转到课程详情页');
          uni.redirectTo({
            url: `/pages/course/detail?id=${this.bookingDetail.courseId}`
          });
          return;
        }
      }
      
      // 默认返回上一页
      uni.navigateBack();
    },
    
    // 取消预约
    cancelBooking() {
      // 检查支付状态，更准确地判断是否已支付
      const hasPaid = this.bookingDetail.paymentStatus === 'paid' || 
                      this.bookingDetail.isPaid === true;
      
      // 确认是否取消
      uni.showModal({
        title: '取消预约',
        content: hasPaid ? '您已完成缴费，确定要取消此次预约吗？' : '确定要取消此次预约吗？',
        success: async (res) => {
          if (res.confirm) {
            uni.showLoading({ title: '取消中...' });
      
            try {
              // 获取当前用户ID
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
              
              // 确保bookingId有值
              const bookingId = this.bookingDetail._id || this.bookingId;
              if (!bookingId) {
                console.error('预约ID无效');
                uni.showToast({
                  title: '预约ID无效',
                  icon: 'none'
                });
                uni.hideLoading();
                return;
              }
              
              // 标记是否更新成功
              let updateSuccess = false;
        
              // 尝试方法1：使用cancelBooking云函数
              try {
                console.log('尝试方法1：使用cancelBooking云函数');
                const cloudResult = await uniCloud.callFunction({
          name: 'cancelBooking',
          data: {
                    bookingId: bookingId,
                    userId: userId
          }
                });
        
                console.log('方法1结果:', cloudResult.result);
        
                if (cloudResult.result && cloudResult.result.success) {
                  updateSuccess = true;
                  console.log('方法1成功：使用cancelBooking云函数更新成功');
                }
              } catch (err1) {
                console.error('方法1失败:', err1);
              }
              
              // 无论是否成功更新数据库，都更新本地状态
              this.bookingDetail.status = 'cancelled';
              this.bookingDetail.cancelTime = new Date().toISOString();
              
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
          
              // 保存到本地存储
              this.saveToLocalStorage();
              
              // 标记预约状态已变更，通知其他页面刷新
              uni.setStorageSync('booking_changed', 'true');
          
              // 发送取消事件，更新相关页面
          uni.$emit('booking:cancel', {
                courseId: this.bookingDetail.courseId || '',
                userId: userId,
                bookingId: bookingId
          });
          
              // 通知预约列表页面刷新数据
          setTimeout(() => {
                uni.navigateBack();
              }, 1000);
            } catch (e) {
              console.error('取消预约失败:', e);
              uni.showToast({ 
                title: '取消失败，请稍后重试', 
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // 保存已取消的预约到本地存储
    saveToLocalStorage() {
      try {
        if (!this.bookingDetail || !this.bookingDetail._id) return;
        
        // 保存已取消的预约数据
        const key = `cancelled_booking_${this.bookingDetail._id}`;
        uni.setStorageSync(key, JSON.stringify({
          ...this.bookingDetail,
          status: 'cancelled',
          cancelTime: this.bookingDetail.cancelTime || new Date().toISOString()
        }));
        
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
        if (!cancelledIds.includes(this.bookingDetail._id)) {
          // 添加到列表头部
          cancelledIds.unshift(this.bookingDetail._id);
          // 最多保存20条
          if (cancelledIds.length > 20) {
            cancelledIds = cancelledIds.slice(0, 20);
          }
          // 保存更新后的ID列表
          uni.setStorageSync('cancelled_booking_ids', JSON.stringify(cancelledIds));
        }
        
        console.log('已保存已取消预约数据:', this.bookingDetail._id);
      } catch (e) {
        console.error('保存已取消预约数据失败:', e);
      }
    },
    
    // 联系老师
    contactTeacher() {
      // 检查是否有联系电话
      const phoneNumber = this.bookingDetail.teacherPhone || this.bookingDetail.userPhoneNumber || '';
      
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
    
    // 直接拨打教师电话
    callTeacher() {
      if (!this.bookingDetail.teacherPhone) {
        uni.showToast({
          title: '暂无教师电话',
          icon: 'none'
        });
        return;
      }
      
      uni.makePhoneCall({
        phoneNumber: this.bookingDetail.teacherPhone,
        fail: () => {
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 获取状态图标
    getStatusIcon(status) {
      switch(status) {
        case 'pending':
          return 'icon-time';
        case 'confirmed':
          return 'icon-check-circle';
        case 'finished':
          return 'icon-success';
        case 'cancelled':
          return 'icon-close-circle';
        default:
          return 'icon-help';
      }
    },
    
    // 获取状态文本
    getStatusText(status, paymentStatus) {
      // 如果支付状态为已付款，优先显示已支付状态
      if (paymentStatus === 'paid') {
        return status === 'confirmed' ? '已确认（已缴费）' : 
               status === 'finished' ? '已完成' : 
               status === 'cancelled' ? '已取消' : '已缴费';
      }
      
      // 如果支付状态为已退费
      if (paymentStatus === 'refunded') {
        return '已退费';
      }
      
      switch(status) {
        case 'pending':
          return '待确认（未缴费）';
        case 'confirmed_unpaid':
          return '已确认（未缴费）';
        case 'confirmed':
          return paymentStatus === 'paid' ? '已确认（已缴费）' : '已确认（未缴费）';
        case 'finished':
          return '已完成';
        case 'cancelled':
          return '已取消';
        default:
          return '未知状态';
      }
    },
    
    // 获取状态描述
    getStatusDesc(status, paymentStatus) {
      // 如果支付状态为已付款，优先显示已支付状态的描述
      if (paymentStatus === 'paid') {
        return status === 'confirmed' ? '教师已确认您的预约，您已完成缴费，请按时参加课程' : 
               status === 'finished' ? '课程已顺利完成，感谢您的参与' : 
               status === 'cancelled' ? '预约已取消' : '您已完成缴费，等待教师确认';
      }
      
      // 如果支付状态为已退费
      if (paymentStatus === 'refunded') {
        return '您的课程费用已退还，预约已结束';
      }
      
      switch(status) {
        case 'pending':
          return '您的预约正在等待教师确认，未缴费状态可随时取消';
        case 'confirmed_unpaid':
          return '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'confirmed':
          return paymentStatus === 'paid' ? '教师已确认您的预约，您已完成缴费，请按时参加课程' : '教师已确认您的预约，但您尚未缴费，请及时缴费或取消';
        case 'finished':
          return '课程已顺利完成，感谢您的参与';
        case 'cancelled':
          return '预约已取消';
        default:
          return '';
      }
    },
    
    // 检查支付超时
    async checkPaymentTimeout() {
      try {
        // 取两个ID中任何一个有效的
        const bookingId = this.bookingDetail._id || this.bookingId;
        console.log('开始检查支付超时...预约ID:', bookingId);
        
        if (!bookingId) {
          console.error('没有有效的预约ID，无法检查支付超时');
          return;
        }
        
        // 直接调用云函数强制检查
        const res = await uniCloud.callFunction({
          name: 'autoExpireBooking',
          data: {
            forceCheck: true,
            bookingId: bookingId
          }
        });
        
        console.log('强制检查预约超时结果:', JSON.stringify(res.result));
        
        // 如果云函数成功取消了预约，则刷新预约详情
        if (res.result && res.result.updatedBookingIds && res.result.updatedBookingIds.includes(bookingId)) {
          console.log('预约已被自动取消，刷新详情');
          this.fetchBookingDetail();
          
          // 显示提示
          uni.showToast({
            title: '预约已超时未支付，自动取消',
            icon: 'none',
            duration: 2000
          });
          
          // 标记预约状态已变更，通知列表页刷新
          uni.setStorageSync('booking_changed', 'true');
          return;
        }
        
        // 检查时间计算
        await this.calculateTimeManually();
      } catch (err) {
        console.error('检查支付超时异常:', err);
        // 发生异常时，尝试本地计算
        this.calculateTimeManually();
      }
    },
    
    // 申请退款
    async handleRefund() {
      // 确认是否退款
      uni.showModal({
        title: '申请退费',
        content: '确认要申请退费吗？退费后将无法恢复。',
        success: async (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: '处理中...'
            });
            
            try {
              // 获取当前用户ID
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
              
              if (!userId) {
                uni.showToast({
                  title: '用户未登录',
                  icon: 'none'
                });
                uni.hideLoading();
                return;
              }
              
              // 确保bookingId有值
              const bookingId = this.bookingDetail._id || this.bookingId;
              if (!bookingId) {
                console.error('预约ID无效');
                uni.showToast({
                  title: '预约ID无效',
                  icon: 'none'
                });
                uni.hideLoading();
                return;
              }
              
              // 调用退款云函数
              const result = await uniCloud.callFunction({
                name: 'refundBookingPayment',
                data: {
                  bookingId,
                  userId,
                  refundReason: '用户申请退款'
                }
              });
              
              console.log('退款处理结果:', result);
              
              if (result.result && result.result.success) {
                // 更新本地数据
                this.bookingDetail.paymentStatus = 'refunded';
                this.bookingDetail.refundTime = new Date();
                this.bookingDetail.refundReason = '用户申请退款';
                
                // 设置标记，通知列表页刷新
                uni.setStorageSync('booking_changed', 'true');
                
                uni.showToast({
                  title: '退费申请已处理',
                  icon: 'success'
                });
                
                // 刷新页面数据
                setTimeout(() => {
                  this.fetchBookingDetail();
                }, 1500);
              } else {
                uni.showToast({
                  title: result.result?.message || '处理失败',
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('退款处理出错:', error);
              uni.showToast({
                title: '处理失败，请重试',
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // 去缴费
    goToPay() {
      // 确保有预约ID
      const bookingId = this.bookingDetail._id || this.bookingId;
      if (!bookingId) {
        uni.showToast({
          title: '预约ID无效',
          icon: 'none'
        });
        return;
      }
      
      // 根据课程的grade字段确定二维码URL
      let grade = this.bookingDetail.grade || '';
      // 从课程标题中尝试提取年级信息（如果grade字段为空）
      if (!grade && this.bookingDetail.courseTitle) {
        const title = this.bookingDetail.courseTitle;
        if (title.includes('初一') || title.includes('七年级')) {
          grade = '初一';
        } else if (title.includes('初二') || title.includes('八年级')) {
          grade = '初二';
        } else if (title.includes('初三') || title.includes('九年级')) {
          grade = '初三';
        }
      }
      
      // 设置二维码URL
      if (grade === '初一') {
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
      } else if (grade === '初二') {
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初二.png';
      } else if (grade === '初三') {
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初三.png';
      } else {
        // 如果未找到匹配的年级，使用初一年级的二维码作为默认
        this.qrcodeUrl = 'https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/qrcode/初一.png';
      }
      
      // 显示二维码弹窗
      this.$refs.qrcodePopup.open();
    },
    
    // 关闭二维码弹窗
    closeQrcodePopup() {
      this.$refs.qrcodePopup.close();
    },
    
    // 手动计算支付剩余时间（备用方案）
    calculateTimeManually() {
      try {
        if (!this.bookingDetail || !this.bookingDetail.createTime) {
          console.error('无法手动计算时间：无效的预约数据');
          this.paymentCountdown = 60; // 默认设置60秒
          this.startCountdown();
          return;
        }
        
        // 转换创建时间
        let createTime = new Date(this.bookingDetail.createTime);
        if (isNaN(createTime.getTime())) {
          console.error('无效的创建时间，使用当前时间:', this.bookingDetail.createTime);
          // 如果时间无效，使用当前时间减去30秒作为创建时间
          createTime = new Date();
          createTime.setSeconds(createTime.getSeconds() - 30);
        }
        
        const now = new Date();
        
        // 计算已经过去的时间（毫秒）
        const elapsedMs = now.getTime() - createTime.getTime();
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        
        console.log(`手动计算：预约创建于 ${createTime.toISOString()}`);
        console.log(`已经过去 ${elapsedSeconds} 秒`);
        
        if (elapsedSeconds >= 60) {
          // 已超过1分钟，自动取消
          console.log('预约已超过1分钟，应自动取消');
          
          // 更新本地状态
          this.bookingDetail.status = 'cancelled';
          this.bookingDetail.paymentStatus = 'cancelled';
          this.bookingDetail.cancelReason = '超时未支付，系统自动取消';
          this.bookingDetail.autoCancel = true;
          
          // 清除倒计时
          this.clearCountdownTimer();
          
          // 显示提示
          uni.showToast({
            title: '预约已超时未支付，自动取消',
            icon: 'none',
            duration: 2000
          });
          
          // 标记状态变更
          uni.setStorageSync('booking_changed', 'true');
        } else {
          // 未超时，设置倒计时
          const remainingSeconds = 60 - elapsedSeconds;
          console.log(`预约未超时，剩余 ${remainingSeconds} 秒`);
          
          this.paymentCountdown = remainingSeconds;
          this.startCountdown();
        }
      } catch (e) {
        console.error('手动计算支付时间异常:', e);
        // 出错时设置默认倒计时
        this.paymentCountdown = 30; 
        this.startCountdown();
      }
    },
    
    // 更新已超时预约的状态
    async updateExpiredStatus() {
      try {
        if (!this.bookingDetail._id) return;
        
        console.log('尝试更新已超时预约状态:', this.bookingDetail._id);
        const res = await uniCloud.callFunction({
          name: 'autoExpireBooking',
          data: { forceCheck: true }
        });
        
        console.log('更新超时预约状态结果:', res.result);
      } catch (e) {
        console.error('更新超时预约状态失败:', e);
      }
    },
    
    // 开始倒计时
    startCountdown() {
      // 先清除可能存在的定时器
      this.clearCountdownTimer();
      
      // 创建新的定时器
      this.countdownTimer = setInterval(() => {
        if (this.paymentCountdown > 0) {
          this.paymentCountdown--;
        } else {
          // 倒计时结束，重新检查状态
          this.clearCountdownTimer();
          this.fetchBookingDetail();
        }
      }, 1000);
    },
    
    // 清除倒计时定时器
    clearCountdownTimer() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    },
    
    // 格式化倒计时显示
    formatCountdown(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;
      return `${min}:${sec.toString().padStart(2, '0')}`;
    },
  }
}
</script>

<style lang="scss">
.detail-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
  position: relative;
}

/* 图标样式 */
.iconfont {
  font-family: "iconfont";
  font-size: 48rpx;
  font-style: normal;
  display: inline-block;
  
  &.icon-time:before { content: "\e657"; }
  &.icon-check-circle:before { content: "\e645"; }
  &.icon-success:before { content: "\e6b3"; }
  &.icon-close-circle:before { content: "\e646"; }
  &.icon-help:before { content: "\e6a8"; }
}

/* 状态栏 */
.status-bar {
  display: flex;
  align-items: center;
  padding: 40rpx 30rpx;
  color: #fff;
  
  &.status-pending {
    background: linear-gradient(to right, #FF9500, #FF7800);
  }
  
  &.status-confirmed {
    background: linear-gradient(to right, #4CD964, #3CC651);
  }
  
  &.status-finished {
    background: linear-gradient(to right, #007AFF, #0055CC);
  }
  
  &.status-cancelled {
    background: linear-gradient(to right, #8E8E93, #636366);
  }
  
  .status-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30rpx;
    
    .iconfont {
      font-size: 60rpx;
    }
  }
  
  .status-info {
    flex: 1;
    
    .status-text {
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .status-desc {
      font-size: 26rpx;
      opacity: 0.8;
    }
  }
}

/* 信息卡片 */
.info-card {
  margin: 20rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  
  .card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid $theme-color;
  }
  
  .course-title {
    font-size: 36rpx;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 30rpx;
    line-height: 1.4;
    word-break: break-all;
  }
  
  .course-deleted-tag {
    display: inline-block;
    background-color: #ff4d4f;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  
  .info-row {
    display: flex;
    margin-bottom: 24rpx;
    padding: 8rpx 0;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 180rpx;
      font-size: 28rpx;
      color: $text-color-grey;
    }
    
    .info-value {
      flex: 1;
      font-size: 28rpx;
      color: $text-color;
      word-break: break-all;
    }
    
    // 教师信息样式
    &.teacher-info {
      background-color: rgba(255, 107, 0, 0.08);
      border-radius: 8rpx;
      padding: 16rpx 20rpx;
      margin: 12rpx 0;
      
      .teacher-name {
        color: #FF6B00;
        font-weight: bold;
        font-size: 30rpx;
      }
    }
  }
}

/* 底部空白区域，防止内容被操作按钮遮挡 */
.bottom-space {
  height: 350rpx;
}

/* 操作区域 */
.action-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .action-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 20rpx;
    width: 100%;
    
    .action-btn {
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      margin: 0 0 10rpx 0;
      text-align: center;
      border-radius: 45rpx;
      font-size: 32rpx;
      
      &.outline {
        border: 1rpx solid $theme-color;
        color: $theme-color;
      }
      
      &.primary {
        background-color: $theme-color;
        color: #fff;
      }
      
      &.cancel-btn {
        background-color: #f5f5f5;
        color: #666;
      }
      
      &.refund-btn {
        background-color: #ff9736;
        color: #fff;
      }
      
      &.pay-btn {
        background-color: #1989fa;
        color: #fff;
      }
      
      &.back-btn {
        background-color: #f5f5f5;
        color: #666;
      }
    }
  }
}

/* 课程删除标记 */
.course-deleted {
  color: #ff4d4f;
  font-weight: bold;
}

/* 自动取消提示 */
.auto-cancel {
  color: #ff7a45;
  font-weight: bold;
  margin-top: 10rpx;
}

/* 倒计时样式 */
.status-countdown {
  margin-top: 15rpx;
  background-color: rgba(255, 0, 0, 0.15);
  padding: 10rpx 15rpx;
  border-radius: 10rpx;
  display: inline-block;
  border: 2px solid rgba(255, 0, 0, 0.4);
  animation: pulse 1s infinite;
  font-weight: bold;
  box-shadow: 0 0 10rpx rgba(255, 0, 0, 0.3);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10rpx rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

.countdown-label {
  font-size: 28rpx;
  color: #ff0000;
}

.countdown-time {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff0000;
}

.phone-link {
  margin-left: 20rpx;
  font-size: 26rpx;
  color: #007aff;
  display: inline-flex;
  align-items: center;
  
  .iconfont {
    margin-left: 8rpx;
    font-size: 30rpx;
  }
}

.teacher-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  .info-label, .info-value {
    margin-right: 10rpx;
  }
  
  .teacher-name {
    font-weight: 500;
  }
}

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
</style> 