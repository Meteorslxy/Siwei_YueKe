<template>
  <view class="detail-container">
    <!-- 固定在右上角的收藏按钮 -->
    <view class="fixed-favorite-wrapper" :style="{top: statusBarHeight + 'px'}">
      <favorite-button 
        ref="favoriteBtn"
        :itemId="courseId" 
        itemType="course" 
        :itemTitle="courseInfo.title" 
        :itemCover="courseInfo.image || courseInfo.coverImage || '/static/images/course-default.jpg'"
        :price="getTotalPrice()"
        @favorite-change="onFavoriteChange"
        @statusBarHeight="onStatusBarHeight"
      ></favorite-button>
    </view>
    
    <!-- 课程封面 -->
    <view class="course-header">
      <image class="course-cover" :src="courseInfo.image || courseInfo.coverImage || '/static/images/course-default.jpg'" mode="aspectFill"></image>
      <view class="course-overlay"></view>
      <view class="course-title">{{courseInfo.title}}</view>
    </view>
    
    <!-- 课程ID调试信息，仅在调试模式下显示 -->
    <view class="debug-info" v-if="false" style="padding: 10px; background-color: #f0f0f0; margin: 10px;">
      <text style="display: block;">课程ID: {{courseId}}</text>
      <text style="display: block;">用户ID: {{userInfo ? userInfo.userId : '未登录'}}</text>
      <text style="display: block;">预约状态: {{hasBooked ? '已预约' : '未预约'}}</text>
      <view style="display: flex; margin-top: 5px;">
        <button @click="toggleBookStatus" style="flex: 1; font-size: 12px; padding: 2px 5px; margin-right: 5px;">切换预约状态</button>
        <button @click="forceRefreshStatus" style="flex: 1; font-size: 12px; padding: 2px 5px;">重新检查状态</button>
      </view>
    </view>
    
    <!-- 课程信息卡片 -->
    <view class="info-card">
      <view class="info-price">
        <text class="price-value">¥{{getTotalPrice()}}.00</text>
        <text class="price-label">/{{courseInfo.courseCount}}课时</text>
      </view>
      
      <view class="info-item" v-if="courseInfo.classFee || courseInfo.materialFee">
        <image class="item-icon" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/价格明细.png" mode="aspectFit"></image>
        <text class="item-label">价格明细：</text>
        <view class="item-value price-details">
          <text>课时费：¥{{courseInfo.classFee || 0}}.00</text>
          <text>材料费：¥{{courseInfo.materialFee || 0}}.00</text>
        </view>
      </view>
      
      <view class="info-item">
        <image class="item-icon" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/授课老师.png" mode="aspectFit"></image>
        <text class="item-label">授课老师：</text>
        <text class="item-value">{{courseInfo.teacherName}}</text>
        <text class="teacher-title">{{courseInfo.teacherTitle}}</text>
      </view>
      
      <view class="info-item">
        <image class="item-icon" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/授课地点.png" mode="aspectFit"></image>
        <text class="item-label">授课地点：</text>
        <text class="item-value">{{courseInfo.location || courseInfo.schoolName || '未指定'}}</text>
      </view>
      
      <view class="info-item">
        <image class="item-icon" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/授课时间.png" mode="aspectFit"></image>
        <text class="item-label">课程时间：</text>
        <text class="item-value">{{formatCourseDateAndTime(courseInfo.startDate, courseInfo.endDate, courseInfo.startTime, courseInfo.endTime)}}</text>
      </view>
      
      <view class="info-item">
        <image class="item-icon" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/招生人数.png" mode="aspectFit"></image>
        <text class="item-label">招生人数：</text>
        <text class="item-value">{{courseInfo.courseCapacity || courseInfo.courseCount || courseInfo.capacity || 20}}人 (已报名{{courseInfo.bookingCount || 0}}人，剩余{{calculateRemainingSeats()}}人)</text>
      </view>
    </view>
    
    <!-- 课程详情 -->
    <view class="course-detail">
      <view class="detail-title">课程详情</view>
      <view class="detail-content">
        <rich-text :nodes="courseInfo.description || '暂无课程详情'"></rich-text>
      </view>
    </view>
    
    <!-- 课程备注 -->
    <view class="course-notes" v-if="courseInfo.courseNoted">
      <view class="detail-title">课程备注</view>
      <view class="detail-content">
        <rich-text :nodes="courseInfo.courseNoted"></rich-text>
      </view>
    </view>
    
    <!-- 师资介绍 -->
    <view class="teacher-intro">
      <view class="detail-title">
        师资介绍
      </view>
      <view class="teacher-card" @click="navigateToTeacherDetail">
        <image class="teacher-avatar" 
               :src="courseInfo.teacherAvatarUrl || courseInfo.teacherAvatar || '/static/images/teacher/default-avatar.png'" 
               mode="aspectFill"></image>
        <view class="teacher-info">
          <view class="teacher-header">
            <text class="teacher-name">{{courseInfo.teacherName}}</text>
            <text class="teacher-title">{{courseInfo.teacherTitle}}</text>
          </view>
          <view class="teacher-desc">{{courseInfo.teacherDescription || courseInfo.teacherDesc || '暂无介绍'}}</view>
          
          <!-- 调试按钮，仅开发环境可见 -->
          <view v-if="false" style="margin-top: 10rpx;">
            <button @click="debugTeacherInfo" size="mini" type="default">刷新师资信息</button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 预约信息 -->
    <view class="booking-info" v-if="hasBooked">
      <view class="detail-title">预约状态</view>
      <view class="booking-status">
        <text class="status-icon iconfont icon-success"></text>
        <text class="status-text">您已成功预约该课程</text>
      </view>
      <view class="booking-tips">
        可在<text class="tips-link" @click="navigateToBookingList">我的预约</text>中查看详情
      </view>
    </view>
    
    <!-- 底部栏 -->
    <view class="footer">
      <view class="contact-btn" @click="contactTeacher">
        <image class="btn-icon" src="https://mp-a876f469-bab5-46b7-8863-2e7147900fdd.cdn.bspapp.com/icons/联系老师.png" mode="aspectFit"></image>
        <text>联系老师</text>
      </view>
      <button class="book-btn" 
        v-if="!hasBooked" 
        :class="{'disabled': isCourseFulled}"
        :disabled="isCourseFulled"
        @click="bookCourse">{{isCourseFulled ? '已约满' : '立即预约'}}</button>
      <button class="book-btn booked" v-else @click="navigateToBookingList">查看预约</button>
    </view>
  </view>
</template>

<script>
// 引入收藏按钮组件
import FavoriteButton from '@/components/favorite-button/favorite-button.vue';
// 导入课程日历工具
import courseCalendarUtils from '@/utils/courseCalendar.js';

export default {
  components: {
    FavoriteButton
  },
  data() {
    return {
      courseId: '',
      fromCart: false, // 是否来自购物车
      showBookBtn: true, // 是否显示预约按钮
      courseInfo: {},
      hasBooked: false,
      userInfo: null,
      statusBarHeight: 90 // 默认状态栏高度（rpx单位）
    }
  },
  computed: {
    // 添加计算属性：判断课程是否已满
    isCourseFulled() {
      const total = this.courseInfo.courseCapacity || this.courseInfo.courseCount || this.courseInfo.capacity || 20;
      const enrolled = this.courseInfo.bookingCount || 0;
      return enrolled >= total;
    }
  },
  mounted() {
    console.log('课程详情页已挂载，当前状态:', {
      courseId: this.courseId,
      userInfo: this.userInfo ? '已登录' : '未登录',
      hasBooked: this.hasBooked
    });
    
    // 监听预约取消事件
    uni.$on('booking:cancel', this.handleBookingCancelled);
  },
  beforeDestroy() {
    // 移除事件监听
    uni.$off('booking:cancel', this.handleBookingCancelled);
    uni.$off('login:success', this.handleLoginSuccess);
  },
  onLoad(options) {
    console.log('课程详情页面加载, options:', options);
    
    // 设置课程ID
    this.courseId = options.id || '';
    
    // 检查是否来自购物车
    this.fromCart = options.fromCart === 'true';
    
    // 检查是否显示预约按钮
    this.showBookBtn = options.showBookBtn !== 'false';
    
    console.log('加载课程详情页面, 参数:', options);
    
    // 监听预约取消事件，更新本页面的预约状态
    uni.$on('booking:cancel', this.handleBookingCancelled);
    
    // 加载用户信息
    this.loadUserInfo();
    
    if (options.id) {
      this.courseId = options.id;
      
      // 检查是否有状态变更标记
      const hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
      if (hasBookingChanged) {
        console.log('检测到预约状态变更标记，将优先从云端获取最新状态');
        // 清除本地缓存中可能过时的预约状态
        try {
          if (this.userInfo && this.userInfo.userId) {
            const userKey = `booking_${this.userInfo.userId}_${this.courseId}`;
            uni.removeStorageSync(userKey);
          }
          const courseKey = `booking_course_${this.courseId}`;
          uni.removeStorageSync(courseKey);
          console.log('已清除可能过时的预约状态缓存');
        } catch(e) {
          console.error('清除缓存失败:', e);
        }
      }
      
      // 检查URL中是否已直接包含预约状态参数
      if (options.hasBooked === 'true') {
        console.log('从URL参数获取预约状态: 已预约');
        this.hasBooked = true;
      } else if (options.hasBooked === 'false') {
        console.log('从URL参数获取预约状态: 未预约');
        this.hasBooked = false;
      } else {
        // 尝试从本地缓存加载预约状态（立即执行以避免闪烁）
        if (this.loadBookingStatusFromCache()) {
          console.log('从缓存获取到预约状态，设置hasBooked =', this.hasBooked);
        }
      }
      
      // 获取课程详情
      this.getCourseDetail();
      
      // 立即检查云端预约状态（优先级高于本地缓存）
      this.checkBookingStatus().then(booked => {
        console.log('初始检查预约状态完成，结果:', booked);
        
        // 如果云端状态与本地状态不一致，以云端为准
        if (booked !== this.hasBooked) {
          console.log('检测到状态不一致，更新本地状态:', {云端状态: booked, 本地状态: this.hasBooked});
          this.hasBooked = booked;
          this.saveBookingStatusToCache(booked);
          this.$forceUpdate();
        }
        
        // 清除状态变更标记
        if (hasBookingChanged) {
          uni.setStorageSync('booking_changed', 'false');
          console.log('已清除预约状态变更标记');
        }
      }).catch(err => {
        console.error('初始检查预约状态失败:', err);
      });
      
      // 延迟再次检查，确保页面显示正确的状态
      setTimeout(() => {
        // 再次检查本地缓存
        this.checkBookingStatus().then(booked => {
          console.log('延迟检查预约状态结果:', booked);
          if (booked !== this.hasBooked) {
            console.log('延迟检查发现状态不一致，更新状态');
            this.hasBooked = booked;
            this.$forceUpdate();
          }
        }).catch(err => {
          console.warn('延迟检查预约状态失败，忽略错误:', err);
        });
      }, 1000);
      
      // 主动检查课程收藏状态，确保收藏按钮正确显示
      this.checkFavoriteStatus();
    } else {
      uni.showToast({
        title: '未找到课程ID',
        icon: 'none'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  },
  
  onUnload() {
    // 页面卸载时移除事件监听，防止内存泄漏
    uni.$off('booking:cancel', this.handleBookingCancelled);
    uni.$off('login:success', this.handleLoginSuccess);
  },
  methods: {
    getTotalPrice() {
      const classFee = parseFloat(this.courseInfo.classFee || 0);
      const materialFee = parseFloat(this.courseInfo.materialFee || 0);
      const totalPrice = classFee + materialFee;
      return totalPrice || this.courseInfo.price || 0;
    },
    // 获取课程详情
    async fetchCourseDetail(retryCount = 0) {
      // 验证课程ID是否有效
      if (!this.courseId) {
        console.error('课程ID为空，无法获取详情');
        return;
      }
      
      try {
        // 显示加载提示
        uni.showLoading({
          title: '加载中...'
        });
        
        console.log('开始获取课程详情，ID:', this.courseId);
        
        // 直接使用MongoDB ObjectId格式调用API
        const result = await this.$api.course.getCourseDetail(this.courseId);
        
        // 隐藏加载提示
        uni.hideLoading();
        
        console.log('课程详情API返回结果:', result);
        
        if (result && result.data) {
          // 处理返回的数组数据 - 获取第一个元素作为课程信息
          if (Array.isArray(result.data) && result.data.length > 0) {
            this.courseInfo = result.data[0];
            console.log('课程详情数据(数组第一项):', this.courseInfo);
          } else {
            this.courseInfo = result.data;
            console.log('课程详情数据(对象):', this.courseInfo);
          }
          
          // 预处理数据，确保所有字段都有值
          this.processCourseData();
          
          // 主动获取教师详情，无论是否已有教师描述
          if (this.courseInfo.teacherId) {
            console.log('主动获取教师详情，teacherId:', this.courseInfo.teacherId);
            this.fetchTeacherDescription(this.courseInfo.teacherId);
          } else if (this.courseInfo.teacherName) {
            console.log('通过教师名称获取教师详情:', this.courseInfo.teacherName);
            this.fetchTeacherByName(this.courseInfo.teacherName);
          }
          
          // 主动更新课程报名人数
          this.updateCourseBookingCount();
        } else if (result && result.code === -1 && retryCount < 3) {
          // 如果是超时错误且重试次数小于3次，尝试重试
          console.log(`获取课程详情失败，准备第${retryCount + 1}次重试...`);
          uni.hideLoading();
          
          // 延迟1秒后重试
          setTimeout(() => {
            this.fetchCourseDetail(retryCount + 1);
          }, 1000);
        } else {
          // 获取失败时显示错误提示
          console.error('获取课程详情失败: 未找到数据');
          // 尝试使用静态数据
          this.handleDetailFetchError();
        }
      } catch (error) {
        // 隐藏加载提示
        uni.hideLoading();
        
        console.error('获取课程详情失败:', error);
        
        // 如果是网络错误或超时错误，且重试次数小于3次，尝试重试
        if (retryCount < 3) {
          console.log(`获取课程详情出错，准备第${retryCount + 1}次重试...`);
          
          // 延迟1秒后重试
          setTimeout(() => {
            this.fetchCourseDetail(retryCount + 1);
          }, 1000);
        } else {
          // 尝试使用静态数据
          this.handleDetailFetchError();
        }
      }
    },
    
    // 处理获取课程详情失败的情况
    handleDetailFetchError() {
      // 显示错误提示
      uni.showToast({
        title: '获取课程详情失败',
        icon: 'none'
      });
      
      // 使用预设的默认数据
      console.log('使用默认课程数据作为备选');
      this.courseInfo = {
        title: '课程详情加载失败',
        price: 0,
        teacherName: '未知',
        location: '未知',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '抱歉，无法加载课程详情，请返回后重试或联系客服。',
        coverImage: '/static/images/course/default.jpg',
        courseCapacity: 20,
        courseCount: 20, // 保留兼容性
        bookingCount: 0
      };
      
      // 预处理数据
      this.processCourseData();
    },
    
    // 新函数，与onLoad中使用的方法名匹配
    getCourseDetail() {
      // 调用原有的获取课程详情函数
      this.fetchCourseDetail();
    },
    
    // 预处理课程数据，确保所有需要的字段都存在
    processCourseData() {
      if (!this.courseInfo) return;
      
      console.log('预处理课程数据:', this.courseInfo);
      
      // 特别检查教师描述相关的字段
      console.log('教师描述字段检查:', {
        teacherDesc: this.courseInfo.teacherDesc,
        teacherDescription: this.courseInfo.teacherDescription,
        teacherId: this.courseInfo.teacherId,
        teacherName: this.courseInfo.teacherName
      });
      
      // 确保基本字段有默认值
      this.courseInfo.title = this.courseInfo.title || '未命名课程';
      this.courseInfo.price = this.courseInfo.price || 0;
      this.courseInfo.teacherName = this.courseInfo.teacherName || '未指定';
      this.courseInfo.location = this.courseInfo.location || '未指定';
      
      // 处理课程容量和报名人数
      this.courseInfo.courseCapacity = this.courseInfo.courseCapacity || this.courseInfo.courseCount || 20; // 优先使用courseCapacity
      this.courseInfo.capacity = this.courseInfo.capacity || this.courseInfo.courseCapacity || this.courseInfo.courseCount || 20;
      this.courseInfo.bookingCount = this.courseInfo.bookingCount || 0;
      
      // 处理日期和时间
      if (!this.courseInfo.startDate && this.courseInfo.startTime && this.courseInfo.startTime.includes(' ')) {
        // 从旧格式提取日期和时间
        const parts = this.courseInfo.startTime.split(' ');
        this.courseInfo.startDate = parts[0];
        this.courseInfo.startTime = parts[1];
      }
      
      if (!this.courseInfo.endDate && this.courseInfo.endTime && this.courseInfo.endTime.includes(' ')) {
        // 从旧格式提取日期和时间
        const parts = this.courseInfo.endTime.split(' ');
        this.courseInfo.endDate = parts[0];
        this.courseInfo.endTime = parts[1];
      }
      
      this.courseInfo.description = this.courseInfo.description || '暂无课程详情';
      
      // 处理教师描述信息，确保teacherDescription字段有值
      if (!this.courseInfo.teacherDescription && this.courseInfo.teacherDesc) {
        this.courseInfo.teacherDescription = this.courseInfo.teacherDesc;
        console.log('复制教师描述信息到teacherDescription字段');
      }
      
      // 处理teacherId字段，确保它是有效的字符串类型
      if (this.courseInfo.teacherId) {
        console.log('原始teacherId值:', JSON.stringify(this.courseInfo.teacherId), '类型:', typeof this.courseInfo.teacherId);
        
        // 检查teacherId的类型
        if (typeof this.courseInfo.teacherId === 'object') {
          // 如果是对象（可能是MongoDB的ObjectId），尝试转换为字符串
          try {
            if (this.courseInfo.teacherId._id) {
              console.log('从teacherId对象中提取_id属性');
              this.courseInfo.teacherId = this.courseInfo.teacherId._id.toString();
            } else if (typeof this.courseInfo.teacherId.toString === 'function') {
              console.log('使用toString()方法转换teacherId');
              this.courseInfo.teacherId = this.courseInfo.teacherId.toString();
            } else {
              console.warn('无法从对象中提取有效的teacherId');
              this.courseInfo.teacherId = null;
            }
          } catch (e) {
            console.error('转换teacherId失败:', e);
            this.courseInfo.teacherId = null;
          }
        } else if (typeof this.courseInfo.teacherId !== 'string' && typeof this.courseInfo.teacherId !== 'number') {
          // 如果不是字符串或数字类型，置为null
          console.warn('teacherId不是有效的字符串或数字类型:', typeof this.courseInfo.teacherId);
          this.courseInfo.teacherId = null;
        } else {
          // 确保是字符串类型，并去除可能的空格或特殊字符
          this.courseInfo.teacherId = String(this.courseInfo.teacherId).trim();
          
          // 检查字符串是否包含特殊格式，如引号或Unicode转义
          if (this.courseInfo.teacherId.startsWith('"') && this.courseInfo.teacherId.endsWith('"')) {
            // 处理可能被错误地包含了引号的ID
            this.courseInfo.teacherId = this.courseInfo.teacherId.substring(1, this.courseInfo.teacherId.length - 1);
            console.log('去除引号后的teacherId:', this.courseInfo.teacherId);
          }
          
          // 确保ID不为空字符串
          if (!this.courseInfo.teacherId || this.courseInfo.teacherId === '') {
            console.warn('处理后的teacherId为空，置为null');
            this.courseInfo.teacherId = null;
          } else {
            console.log('最终的teacherId格式化后值:', this.courseInfo.teacherId);
          }
        }
      }
      
      // 获取教师描述信息 - 先尝试通过名称查询，这样更可靠
      if (this.courseInfo.teacherName) {
        console.log('优先通过教师名称查询教师信息:', this.courseInfo.teacherName);
        this.fetchTeacherByName(this.courseInfo.teacherName);
      }
      // 如果有teacherId但没有通过名称查询，也尝试通过ID查询
      else if (this.courseInfo.teacherId) {
        console.log('通过teacherId获取教师详情:', this.courseInfo.teacherId);
        this.fetchTeacherDescription(this.courseInfo.teacherId);
      }
      
      // 处理封面图片路径
      if (this.courseInfo.coverImage) {
        if (this.courseInfo.coverImage.startsWith('http')) {
          // 如果是完整URL，直接使用
          this.courseInfo.coverImageUrl = this.courseInfo.coverImage;
        } else {
          // 如果是相对路径，拼接为完整URL
          this.courseInfo.coverImageUrl = this.courseInfo.coverImage;
        }
      } else if (this.courseInfo.courseImage) {
        // 兼容老数据结构
        this.courseInfo.coverImageUrl = this.courseInfo.courseImage;
      } else {
        // 使用默认图片
        this.courseInfo.coverImageUrl = '/static/images/course/default.jpg';
      }
      
      // 预加载教师头像
      if (this.courseInfo.teacherName || this.courseInfo.teacherId) {
        this.preloadTeacherAvatar();
      }
      
      console.log('预处理后的课程数据:', this.courseInfo);
      
      // 获取课程时间安排数据
      this.fetchCourseSchedule();
    },
    
    // 获取课程时间安排数据
    async fetchCourseSchedule() {
      if (!this.courseId) return Promise.resolve(false);
      
      return new Promise(async (resolve, reject) => {
        try {
          console.log('开始获取课程时间安排数据，ID:', this.courseId);
          
          const db = uniCloud.database();
          const scheduleRes = await db.collection('course_schedule')
            .where({
              courseId: this.courseId
            })
            .get();
          
          console.log('课程时间安排数据:', scheduleRes);
          
          let success = false;
          
          // 检查多种可能的返回数据格式
          let scheduleData = null;
          
          // 处理不同的返回数据格式
          if (scheduleRes.data && scheduleRes.data.length > 0) {
            // 标准格式 {data: [...]}
            scheduleData = scheduleRes.data[0];
            console.log('从标准格式中获取到课程安排数据');
          } else if (scheduleRes.result && scheduleRes.result.data && scheduleRes.result.data.length > 0) {
            // 嵌套格式 {result: {data: [...]}}
            scheduleData = scheduleRes.result.data[0];
            console.log('从嵌套result格式中获取到课程安排数据');
          } else if (scheduleRes.result && Array.isArray(scheduleRes.result) && scheduleRes.result.length > 0) {
            // 直接数组格式 {result: [...]}
            scheduleData = scheduleRes.result[0];
            console.log('从result数组格式中获取到课程安排数据');
          }
          
          if (scheduleData) {
            console.log('获取到课程安排数据:', scheduleData);
            
            // 将timeSlots数据添加到courseInfo中
            if (scheduleData.timeSlots && scheduleData.timeSlots.length > 0) {
              console.log('从course_schedule获取到timeSlots数据，数量:', scheduleData.timeSlots.length);
              
              // 过滤出有效的时间槽（未取消的）
              const validTimeSlots = scheduleData.timeSlots.filter(slot => 
                slot.status !== 'cancelled'
              );
              
              if (validTimeSlots.length > 0) {
                // 添加timeSlots到courseInfo
                this.courseInfo.timeSlots = validTimeSlots;
                console.log('已添加timeSlots到courseInfo', this.courseInfo.timeSlots);
                success = true;
                
                // 如果课程没有设置classTime字段，从timeSlots提取
                if (!this.courseInfo.classTime || 
                   (Array.isArray(this.courseInfo.classTime) && this.courseInfo.classTime.length === 0)) {
                  this.courseInfo.classTime = validTimeSlots.map(slot => {
                    const date = new Date(slot.start);
                    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
                    return weekday;
                  }).filter((v, i, a) => a.indexOf(v) === i); // 去重
                  
                  console.log('从timeSlots提取的上课日:', this.courseInfo.classTime);
                }
              }
            }
          } else {
            console.log('未找到课程时间安排数据');
          }
          
          resolve(success);
        } catch (error) {
          console.error('获取课程时间安排数据失败:', error);
          reject(error);
        }
      });
    },
    
    // 通过教师名称查询
    async fetchTeacherByName(teacherName) {
      if (!teacherName) return;
      
      try {
        console.log('开始通过名称查询教师:', teacherName);
        
        // 从教师名称中去除可能的"老师"后缀
        const nameForSearch = teacherName.replace(/老师$/, '');
        console.log('处理后的教师名称:', nameForSearch);
        
        // 直接调用获取教师列表的API接口
        const result = await this.$api.teacher.getTeacherList({
          name: nameForSearch
        });
        
        console.log('教师查询API结果:', result);
        
        if (result && result.data && result.data.length > 0) {
          // 确保查询匹配的是准确的教师名称
          const foundTeacher = result.data.find(item => item.name === nameForSearch);
          
          if (foundTeacher) {
            console.log('通过教师列表API找到匹配的教师数据:', foundTeacher);
            
            // 更新教师信息
            if (foundTeacher.description) {
              this.courseInfo.teacherDescription = foundTeacher.description;
              console.log('已更新教师描述信息:', foundTeacher.description);
            } else if (foundTeacher.introduction) {
              this.courseInfo.teacherDescription = foundTeacher.introduction;
              console.log('使用教师introduction作为描述:', foundTeacher.introduction);
            } else {
              // 如果都没有，尝试直接给定简介
              this.courseInfo.teacherDescription = '该教师暂无详细介绍';
            }
            
            // 更新教师头像
            if (foundTeacher.avatar) {
              console.log('从教师列表API获取到头像:', foundTeacher.avatar);
              this.courseInfo.teacherAvatarUrl = foundTeacher.avatar;
            }
          } else {
            console.log('API返回的教师数据中没有找到精确匹配:', nameForSearch);
            this.courseInfo.teacherDescription = `${teacherName}，暂无详细介绍。`;
          }
        } else {
          // API没有找到任何教师信息
          console.log('未能从API查询到教师信息，显示默认信息');
          this.courseInfo.teacherDescription = `暂无详细介绍`;
        }
        
        // 强制更新UI
        this.$forceUpdate();
      } catch (error) {
        console.error('通过名称查询教师失败:', error);
        
        // 错误情况下，显示默认信息
        this.courseInfo.teacherDescription = `暂无详细介绍`;
        this.$forceUpdate();
      }
    },
    
    // 预加载教师头像
    async preloadTeacherAvatar() {
      if (!this.courseInfo.teacherName) return;
      
      try {
        // 尝试通过名称获取
        await this.fetchTeacherAvatarByName(this.courseInfo.teacherName);
      } catch (error) {
        console.error('预加载教师头像失败:', error);
      }
    },
    
    // 通过名称从数据库获取教师头像
    async fetchTeacherAvatarByName(teacherName) {
      if (!teacherName) return false;
      
      try {
        console.log('通过名称从数据库获取教师头像:', teacherName);
        
        // 准备查询参数，去除可能的空格
        const nameForSearch = teacherName.trim();
        
        // 调用API获取教师信息，使用names参数进行精确查询
        const result = await this.$api.teacher.getTeacherList({ 
          names: [nameForSearch] // 使用names数组参数进行精确查询
        });
        
        if (result && result.code === 0 && result.data && result.data.length > 0) {
          // 查找精确匹配的教师
          const foundTeacher = result.data.find(item => item.name === nameForSearch);
          
          if (foundTeacher && foundTeacher.avatar) {
            console.log('从数据库获取到教师头像URL:', foundTeacher.avatar);
            this.courseInfo.teacherAvatarUrl = foundTeacher.avatar;
            this.$forceUpdate();
            return true;
          }
        }
        
        return false;
      } catch (error) {
        console.error('通过名称获取教师头像失败:', error);
        return false;
      }
    },
    
    // 直接获取教师描述信息
    async fetchTeacherDescription(teacherId) {
      if (!teacherId) {
        // 如果没有teacherId但有teacherName，尝试通过名称查询
        if (this.courseInfo.teacherName) {
          console.log('尝试通过教师名称查询教师信息:', this.courseInfo.teacherName);
          this.fetchTeacherByName(this.courseInfo.teacherName);
        }
        return;
      }
      
      console.log('fetchTeacherDescription接收到的原始teacherId:', JSON.stringify(teacherId), '类型:', typeof teacherId);
      
      // 确保teacherId是有效的字符串类型
      let validTeacherId = teacherId;
      if (typeof teacherId === 'object') {
        try {
          if (teacherId._id) {
            validTeacherId = teacherId._id.toString();
            console.log('从对象中提取教师ID:', validTeacherId);
          } else if (typeof teacherId.toString === 'function') {
            validTeacherId = teacherId.toString();
            console.log('使用toString()方法转换教师ID:', validTeacherId);
          } else {
            console.warn('无法从对象中提取有效教师ID，改用名称查询');
            if (this.courseInfo.teacherName) {
              this.fetchTeacherByName(this.courseInfo.teacherName);
            }
            return;
          }
        } catch (e) {
          console.error('尝试转换教师ID失败:', e);
          if (this.courseInfo.teacherName) {
            this.fetchTeacherByName(this.courseInfo.teacherName);
          }
          return;
        }
      } else if (typeof teacherId !== 'string' && typeof teacherId !== 'number') {
        console.warn('教师ID不是有效的字符串或数字类型:', typeof teacherId);
        if (this.courseInfo.teacherName) {
          this.fetchTeacherByName(this.courseInfo.teacherName);
        }
        return;
      } else {
        // 确保是字符串类型并进行清理
        validTeacherId = String(teacherId).trim();
        
        // 检查是否被包裹在引号中
        if (validTeacherId.startsWith('"') && validTeacherId.endsWith('"')) {
          validTeacherId = validTeacherId.substring(1, validTeacherId.length - 1);
          console.log('去除引号后的teacherId:', validTeacherId);
        }
        
        // 检查字符串是否为空
        if (!validTeacherId || validTeacherId === '') {
          console.warn('处理后的teacherId为空，改用名称查询');
          if (this.courseInfo.teacherName) {
            this.fetchTeacherByName(this.courseInfo.teacherName);
          }
          return;
        }
      }
      
      console.log('处理后的最终有效teacherId:', validTeacherId);
      
      try {
        // 构建请求参数
        const params = {};
        
        // 仅当ID有效时才添加
        if (validTeacherId) {
          params.id = validTeacherId;
          console.log('向API传递teacherId:', validTeacherId);
        }
        
        // 如果有教师名称，也一并传入作为备选
        if (this.courseInfo.teacherName) {
          params.name = this.courseInfo.teacherName;
          console.log('向API传递teacherName:', this.courseInfo.teacherName);
        }
        
        // 如果既没有有效ID也没有名称，则无法查询
        if (!validTeacherId && !this.courseInfo.teacherName) {
          console.error('缺少教师查询条件，无法获取教师详情');
          this.courseInfo.teacherDescription = '暂无详细介绍';
          this.$forceUpdate();
          return;
        }
        
        const result = await this.$api.teacher.getTeacherDetail(params);
        
        console.log('教师详情API返回结果:', result);
        
        if (result && result.data) {
          const teacherData = result.data;
          console.log('获取到教师数据:', teacherData);
          
          // 更新教师信息
          if (teacherData.description) {
            this.courseInfo.teacherDescription = teacherData.description;
            console.log('已更新教师描述信息:', teacherData.description);
          } else if (teacherData.introduction) {
            this.courseInfo.teacherDescription = teacherData.introduction;
            console.log('使用教师introduction作为描述:', teacherData.introduction);
          }
          
          // 更新教师头像
          if (teacherData.avatar) {
            console.log('从教师详情API获取到头像:', teacherData.avatar);
            this.courseInfo.teacherAvatarUrl = teacherData.avatar;
          }
          
          // 添加其他可能的描述字段
          if (!this.courseInfo.teacherDescription) {
            if (teacherData.desc) {
              this.courseInfo.teacherDescription = teacherData.desc;
              console.log('使用教师desc字段作为描述');
            } else if (teacherData.bio) {
              this.courseInfo.teacherDescription = teacherData.bio;
              console.log('使用教师bio字段作为描述');
            } else if (teacherData.profile) {
              this.courseInfo.teacherDescription = teacherData.profile;
              console.log('使用教师profile字段作为描述');
            } else {
              console.log('教师数据中没有找到任何可用的描述字段');
              // 如果实在没有描述，设置一个默认值
              this.courseInfo.teacherDescription = teacherData.name ? 
                `${teacherData.name}${teacherData.title ? '，' + teacherData.title : ''}，暂无详细介绍。` : 
                '暂无详细介绍';
            }
          }
          
          // 强制更新UI
          this.$forceUpdate();
        } else {
          console.log('未获取到教师数据，尝试通过名称查询');
          // 如果通过ID查询失败，尝试通过名称查询
          if (this.courseInfo.teacherName) {
            this.fetchTeacherByName(this.courseInfo.teacherName);
          } else {
            this.courseInfo.teacherDescription = '暂无详细介绍';
            this.$forceUpdate();
          }
        }
      } catch (error) {
        console.error('获取教师详情失败:', error);
        
        // 尝试通过名称查询
        if (this.courseInfo.teacherName) {
          console.log('ID查询失败，尝试通过名称查询:', this.courseInfo.teacherName);
          this.fetchTeacherByName(this.courseInfo.teacherName);
        } else {
          // 设置默认描述
          this.courseInfo.teacherDescription = '暂无详细介绍';
          this.$forceUpdate();
        }
      }
    },
    
    // 格式化课程时间
    formatCourseTime(startTime, endTime) {
      if (!startTime) return ''
      
      const formatDateTime = (dateStr) => {
        const date = new Date(dateStr)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
      }
      
      if (endTime) {
        return `${formatDateTime(startTime)} - ${formatDateTime(endTime)}`
      }
      
      return formatDateTime(startTime)
    },
    
    // 加载用户信息
    loadUserInfo() {
      console.log('加载用户信息');
      
      // 检查uni-id-token是否存在
      const token = uni.getStorageSync('uni_id_token');
      console.log('uni-id-token:', token ? '存在' : '不存在');
      
      // 调试全局用户信息
      const globalUserInfo = getApp().globalData.userInfo;
      console.log('全局用户信息:', globalUserInfo);
      
      const userInfoStr = uni.getStorageSync('userInfo');
      console.log('本地存储用户信息字符串:', userInfoStr ? '存在' : '不存在');
      
      // 尝试从本地存储获取用户信息
      if (userInfoStr) {
        try {
          // 判断userInfoStr的类型，如果已经是对象，则直接使用，否则尝试JSON解析
          this.userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          console.log('从本地存储获取用户信息成功, 类型:', typeof this.userInfo);
          
          // 检查并处理ID字段
          if (this.userInfo) {
            // 检查各种可能的ID字段
            const userId = this.userInfo.userId || this.userInfo.uid || 
                          this.userInfo._id || 
                          (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                          (this.userInfo.userInfo && this.userInfo.userInfo.uid);
            
            // 如果找到了有效的ID，将其规范化保存到userId字段
            if (userId) {
              this.userInfo.userId = userId;
              console.log('规范化用户ID:', userId);
            } else {
              console.warn('用户信息中没有找到有效的ID字段', this.userInfo);
              console.log('用户信息对象包含的字段:', Object.keys(this.userInfo));
              
              // 输出子属性
              if (this.userInfo.userInfo) {
                console.log('userInfo子对象包含的字段:', Object.keys(this.userInfo.userInfo));
              }
            }
          }
        } catch (e) {
          console.error('从本地存储重新解析用户信息失败:', e);
        }
      }
      
      // 如果没有从userInfo中获取到有效信息，尝试从token中获取
      if (!this.userInfo || !this.userInfo.userId) {
        if (token) {
          console.log('尝试通过uni-id-token获取用户信息');
          
          // 调用云函数获取当前用户信息
          uniCloud.callFunction({
            name: 'getUserInfoByToken',
            success: (res) => {
              console.log('通过token获取用户信息结果:', res);
              if (res.result && res.result.code === 0 && res.result.userInfo) {
                this.userInfo = res.result.userInfo;
                this.userInfo.userId = res.result.userInfo._id;
                console.log('通过token成功获取用户信息:', this.userInfo);
                
                // 更新本地存储
                uni.setStorageSync('userInfo', this.userInfo);
                
                // 重新检查预约状态
                this.checkBookingStatus();
              }
            },
            fail: (err) => {
              console.error('通过token获取用户信息失败:', err);
            }
          });
        }
      }
      
      // 如果本地存储没有，但全局变量有，则使用全局变量
      if (!this.userInfo && globalUserInfo) {
        this.userInfo = globalUserInfo;
        console.log('从全局变量获取用户信息成功');
        
        // 同样处理全局变量中的ID
        if (this.userInfo) {
          const userId = this.userInfo.userId || this.userInfo.uid || 
                       this.userInfo._id || 
                       (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                       (this.userInfo.userInfo && this.userInfo.userInfo.uid);
            
          if (userId) {
            this.userInfo.userId = userId;
            console.log('规范化全局用户ID:', userId);
          }
        }
      }
      
      // 最终检查
      if (this.userInfo && this.userInfo.userId) {
        console.log('最终用户信息有效，使用ID:', this.userInfo.userId);
      } else if (this.userInfo) {
        console.warn('有用户信息但无法确定用户ID');
      } else {
        console.log('用户未登录');
      }
      
      // 添加登录成功事件监听
      uni.$on('login:success', this.handleLoginSuccess);
    },
    
    // 处理登录成功事件
    handleLoginSuccess(userData) {
      console.log('收到登录成功事件，更新用户数据:', userData);
      
      if (userData) {
        this.userInfo = userData;
        
        // 规范化处理用户ID
        const userId = userData.userId || userData.uid || userData._id || 
                     (userData.userInfo && userData.userInfo._id) ||
                     (userData.userInfo && userData.userInfo.uid);
        
        if (userId) {
          this.userInfo.userId = userId;
          console.log('登录成功后规范化用户ID:', userId);
        } else {
          console.warn('登录成功但无法确定用户ID，可能导致预约失败', userData);
        }
      }
      
      // 登录成功后重新检查预约状态
      setTimeout(() => {
        this.checkBookingStatus();
      }, 500);
    },
    
    // 从本地缓存加载预约状态
    loadBookingStatusFromCache() {
      try {
        if (this.courseId) {
          // 检查是否有状态变更标记
          const hasBookingChanged = uni.getStorageSync('booking_changed') === 'true';
          if (hasBookingChanged) {
            console.log('检测到预约状态变更标记，避免使用可能过时的缓存状态');
            return false;
          }
          
          // 先尝试使用用户特定的缓存
          if (this.userInfo && this.userInfo.userId) {
            const userKey = `booking_${this.userInfo.userId}_${this.courseId}`;
            const userCachedStatus = uni.getStorageSync(userKey);
            
            if (userCachedStatus) {
              console.log('从用户特定缓存加载预约状态:', userCachedStatus);
              this.hasBooked = userCachedStatus === 'true';
              console.log('用户特定缓存预约状态:', this.hasBooked);
              return true;
            }
          }
          
          // 尝试使用课程通用缓存
          const courseKey = `booking_course_${this.courseId}`;
          const courseCachedStatus = uni.getStorageSync(courseKey);
          
          if (courseCachedStatus) {
            console.log('从课程通用缓存加载预约状态:', courseCachedStatus);
            this.hasBooked = courseCachedStatus === 'true';
            console.log('课程通用缓存预约状态:', this.hasBooked);
            return true;
          }
        }
      } catch (e) {
        console.error('加载本地预约状态失败:', e);
      }
      return false;
    },
    
    // 保存预约状态到本地缓存
    saveBookingStatusToCache(status) {
      try {
        if (this.courseId) {
          const debugMode = false; // 控制是否输出详细日志
          
          if (debugMode) console.log('保存预约状态到缓存:', status);
          
          // 清除所有相关的缓存键，确保状态一致性
          const clearRelatedCaches = () => {
            // 清除可能存在的过期状态
            if (this.userInfo && this.userInfo.userId) {
              const userKey = `booking_${this.userInfo.userId}_${this.courseId}`;
              uni.removeStorageSync(userKey);
              if (debugMode) console.log('已清除用户特定缓存');
            }
            
            // 清除课程通用缓存
            const courseKey = `booking_course_${this.courseId}`;
            uni.removeStorageSync(courseKey);
            if (debugMode) console.log('已清除课程通用缓存');
          };
          
          // 在设置新值前先清除相关缓存
          if (!status) {
            clearRelatedCaches();
          }
          
          // 同时保存用户特定缓存和课程通用缓存
          if (this.userInfo && this.userInfo.userId) {
            const userKey = `booking_${this.userInfo.userId}_${this.courseId}`;
            uni.setStorageSync(userKey, status ? 'true' : 'false');
            if (debugMode) console.log('预约状态已保存到用户特定缓存:', status);
          }
          
          // 保存课程通用缓存
          const courseKey = `booking_course_${this.courseId}`;
          uni.setStorageSync(courseKey, status ? 'true' : 'false');
          if (debugMode) console.log('预约状态已保存到课程通用缓存:', status);
          
          // 设置全局标记，通知其他页面可能需要刷新状态
          uni.setStorageSync('booking_changed', 'true');
          if (debugMode) console.log('已设置booking_changed标记通知其他页面');
          
          // 立即刷新页面显示
          this.hasBooked = status;
          if (debugMode) console.log('hasBooked状态已更新为:', status);
          
          // 强制DOM更新
          this.$forceUpdate();
          
          // 确保下一帧渲染生效
          this.$nextTick(() => {
            // 再次确认状态已更新
            if(this.hasBooked !== status) {
              console.warn('状态更新失败，强制再次更新');
              this.hasBooked = status;
              this.$forceUpdate();
            }
          });
        }
      } catch (e) {
        console.error('保存预约状态到本地缓存失败:', e);
      }
    },
    
    // 检查是否已预约
    async checkBookingStatus() {
      // 简化日志输出
      const debugMode = false; // 控制是否输出详细日志
      
      if (debugMode) console.log('开始检查预约状态，当前用户信息:', this.userInfo);
      
      // 检查本地缓存中是否有预约状态记录
      if (this.userInfo && this.userInfo.userId && this.courseId) {
        const key = `booking_${this.userInfo.userId}_${this.courseId}`;
        const cachedStatus = uni.getStorageSync(key);
        
        if (cachedStatus === 'true') {
          if (debugMode) console.log('从本地缓存确认预约状态: 已预约');
          this.hasBooked = true;
          // 仍然继续查询云端状态来确认
        }
      }
      
      if (!this.userInfo || !this.userInfo.userId || !this.courseId) {
        if (debugMode) console.log('用户未登录或缺少必要参数，设置为未预约状态');
        this.hasBooked = false;
        return Promise.resolve(false);
      }
      
      try {
        if (debugMode) console.log('检查预约状态，用户ID:', this.userInfo.userId, '课程ID:', this.courseId);
        
        // 首先尝试调用getBookings云函数
        const res = await uniCloud.callFunction({
          name: 'getBookings',
          data: {
            userId: this.userInfo.userId,
            courseId: this.courseId,
            // 包括所有未取消的状态
            status: ['pending', 'confirmed', 'confirmed_unpaid'] 
          }
        });
        
        if (debugMode) console.log('查询预约状态结果详情:', JSON.stringify(res.result));
        
        // 判断是否预约过
        let booked = false;
        
        if (res.result && res.result.success && res.result.data && res.result.data.length > 0) {
          booked = true;
          if (debugMode) console.log('用户已预约该课程，预约记录:', res.result.data[0]);
        } else {
          if (debugMode) console.log('第一次查询未找到记录，尝试不带状态参数再次查询');
          
          // 如果没有找到记录，尝试不带状态参数再次查询
          try {
            const allRes = await uniCloud.callFunction({
              name: 'getBookings',
              data: {
                userId: this.userInfo.userId,
                courseId: this.courseId
                // 不指定状态，查询所有状态的预约
              }
            });
            
            if (debugMode) console.log('第二次查询结果:', JSON.stringify(allRes.result));
            
            if (allRes.result && allRes.result.success && allRes.result.data) {
              // 只有在找到未取消的预约记录时才设置为已预约
              const activeBookings = allRes.result.data.filter(b => 
                b.status !== 'cancelled' && 
                b.status !== 'cancel'
              );
              
              // 检查是否所有记录都是已取消状态
              const allCancelled = allRes.result.data.length > 0 && 
                                   allRes.result.data.every(b => 
                                     b.status === 'cancelled' || 
                                     b.status === 'cancel'
                                   );
              
              if (allCancelled) {
                if (debugMode) console.log('所有预约记录均为已取消状态，设置为未预约');
                booked = false;
              } else if (activeBookings.length > 0) {
                booked = true;
                if (debugMode) console.log('找到未取消的预约:', activeBookings[0]);
              } else {
                if (debugMode) console.log('云端没有找到有效预约记录');
                
                // 如果仍然没有找到记录，再尝试使用常规数据库API查询
                const db = uniCloud.database();
                try {
                  const dbRes = await db.collection('bookings')
                    .where({
                      courseId: this.courseId,
                      userId: this.userInfo.userId,
                      status: db.command.neq('cancelled')
                    })
                    .limit(1)
                    .get();
                    
                  if (debugMode) console.log('数据库直接查询结果:', dbRes);
                  
                  if (dbRes && dbRes.data && dbRes.data.length > 0) {
                    booked = true;
                    if (debugMode) console.log('通过数据库API找到有效预约:', dbRes.data[0]);
                  }
                } catch (dbErr) {
                  console.error('数据库查询失败:', dbErr);
                }
              }
            }
          } catch (err) {
            console.error('第二次查询失败:', err);
          }
        }
        
        // 如果查询到所有预约都已取消，则设置为未预约状态，无论本地缓存状态如何
        if (booked === false) {
          if (debugMode) console.log('云端确认用户没有有效预约，覆盖本地缓存状态');
          this.hasBooked = false;
        }
        // 如果查询失败但本地缓存认为已预约，仅在没有确认所有预约都已取消的情况下保留已预约状态
        else if (!booked && this.hasBooked) {
          if (debugMode) console.log('云端查询失败但本地缓存显示已预约，保留已预约状态');
          booked = true;
        }
        
        // 更新预约状态
        if (debugMode) console.log('最终预约状态:', booked);
        this.hasBooked = booked;
        
        // 更新本地缓存
        this.saveBookingStatusToCache(booked);
        
        // 强制刷新视图
        this.$forceUpdate();
        
        return Promise.resolve(booked);
      } catch (e) {
        console.error('检查预约状态失败，详细错误:', e);
        // 出错时保持当前状态不变
        return Promise.reject(e);
      }
    },
    
    // 预约课程
    bookCourse() {
      // 先检查是否登录
      if (!this.userInfo || !this.userInfo.userId) {
        uni.showToast({
          title: '请先登录',
          icon: 'none'
        });
        
        // 跳转到登录页
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/login'
          });
        }, 1500);
        
        return;
      }

      // 显示加载提示
      uni.showLoading({
        title: '检查课程冲突...'
      });

      // 确保课程信息中有timeSlots数据
      if (!this.courseInfo.timeSlots) {
        console.log('课程信息中没有timeSlots数据，尝试获取课程时间安排');
        this.fetchCourseSchedule().then(() => {
          // 获取到时间安排后开始冲突检测
          this.startConflictDetection();
        }).catch(err => {
          console.error('获取课程时间安排失败:', err);
          // 即使获取失败也尝试进行冲突检测
          this.startConflictDetection();
        });
      } else {
        console.log('课程信息中已有timeSlots数据，直接进行冲突检测');
        this.startConflictDetection();
      }
    },
    
    // 开始课程冲突检测
    startConflictDetection() {
      // 课程冲突检测
      this.checkCourseConflict().then(conflictResult => {
        uni.hideLoading();
        
        if (conflictResult.hasConflict) {
          // 有冲突，显示冲突信息，但不自动继续预约
          console.log('检测到课程冲突，显示冲突对话框');
          this.showConflictDialog(conflictResult);
        } else {
          // 无冲突，继续预约流程
          console.log('未检测到课程冲突，继续预约流程');
          this.proceedWithBooking();
        }
      }).catch(err => {
        uni.hideLoading();
        console.error('课程冲突检测失败:', err);
        
        // 提示用户检测失败
        uni.showModal({
          title: '课程冲突检测失败',
          content: '无法完成课程冲突检测，您仍要继续预约吗？',
          success: (res) => {
            if (res.confirm) {
              this.proceedWithBooking();
            }
          }
        });
      });
    },
    
    // 检查课程冲突
    checkCourseConflict() {
      return new Promise((resolve, reject) => {
        // 获取用户ID
        const userId = this.userInfo.userId;
        console.log('开始检查课程冲突，用户ID:', userId);
        
        // 调用云函数获取用户已预约的课程
        uniCloud.callFunction({
          name: 'getUserBookings',
          data: { 
            userId, 
            status: ['pending', 'confirmed', 'confirmed_unpaid', 'processing'] // 检查所有非取消状态的预约
          },
          success: res => {
            console.log('获取用户预约成功:', res.result);
            
            // 处理不同的返回数据格式
            let bookingsData = [];
            
            if (res.result && res.result.data && res.result.data.length > 0) {
              // 标准格式 {result: {data: [...]}}
              bookingsData = res.result.data;
              console.log('从标准格式中获取到用户预约数据');
            } else if (res.result && res.result.success && res.result.data) {
              // 成功响应格式 {result: {success: true, data: [...]}}
              bookingsData = res.result.data;
              console.log('从成功响应格式中获取到用户预约数据');
            } else if (res.result && Array.isArray(res.result)) {
              // 直接数组格式 {result: [...]}
              bookingsData = res.result;
              console.log('从result数组格式中获取到用户预约数据');
            } else if (res.data && Array.isArray(res.data)) {
              // 直接数据格式 {data: [...]}
              bookingsData = res.data;
              console.log('从data数组格式中获取到用户预约数据');
            }
            
            // 如果无返回数据，尝试再次不指定状态查询所有预约
            if (!bookingsData || bookingsData.length === 0) {
              console.log('未找到指定状态的预约，尝试查询所有未取消的预约');
              
              // 再次调用但不指定status，然后在前端过滤非cancelled状态
              uniCloud.callFunction({
                name: 'getUserBookings',
                data: { 
                  userId
                },
                success: allRes => {
                  console.log('获取全部预约成功:', allRes.result);
                  
                  let allBookingsData = [];
                  
                  // 处理不同的返回数据格式
                  if (allRes.result && allRes.result.data && allRes.result.data.length > 0) {
                    allBookingsData = allRes.result.data;
                  } else if (allRes.result && allRes.result.success && allRes.result.data) {
                    allBookingsData = allRes.result.data;
                  } else if (allRes.result && Array.isArray(allRes.result)) {
                    allBookingsData = allRes.result;
                  } else if (allRes.data && Array.isArray(allRes.data)) {
                    allBookingsData = allRes.data;
                  }
                  
                  // 过滤出非取消状态的预约
                  const validBookings = allBookingsData.filter(booking => 
                    booking.status !== 'cancelled' && 
                    booking.status !== 'cancel'
                  );
                  
                  console.log('过滤后的有效预约数量:', validBookings.length);
                  
                  if (validBookings.length > 0) {
                    // 处理有效的预约
                    this.checkBookingsForConflict(validBookings, resolve, reject);
                  } else {
                    resolve({ hasConflict: false });
                  }
                },
                fail: err => {
                  console.error('获取全部预约失败:', err);
                  resolve({ hasConflict: false });
                }
              });
              return;
            }
            
            // 有预约数据，检查冲突
            this.checkBookingsForConflict(bookingsData, resolve, reject);
          },
          fail: err => {
            console.error('获取用户预约失败:', err);
            reject(err);
          }
        });
      });
    },
    
    // 辅助方法：检查一组预约的冲突情况
    checkBookingsForConflict(bookedCourses, resolve, reject) {
      const bookedCourseInfo = [];
      
      // 提取课程信息
      for (const booking of bookedCourses) {
        // 检查booking.courseInfo
        if (booking.courseInfo) {
          console.log('从预约中提取课程信息:', booking.courseInfo.title || '未命名课程');
          bookedCourseInfo.push(booking.courseInfo);
        } else if (booking.courseId) {
          // 如果没有courseInfo但有courseId，创建一个简单的对象
          console.log('从预约ID创建临时课程对象:', booking.courseId);
          bookedCourseInfo.push({
            _id: booking.courseId,
            title: booking.courseTitle || '未命名课程',
            timeSlots: booking.timeSlots || []
          });
        }
      }
      
      // 如果没有有效的课程信息，尝试从course_schedule查询
      if (bookedCourseInfo.length === 0) {
        this.checkScheduleConflict(resolve, reject);
        return;
      }
      
      // 获取用户当前选择的课程信息
      const currentCourse = this.courseInfo;
      console.log('当前预约课程信息:', currentCourse.title || '未命名课程');
      
      // 检查currentCourse是否有有效的timeSlots数据
      if (currentCourse.timeSlots && currentCourse.timeSlots.length > 0) {
        console.log('当前课程已有timeSlots数据，timeSlots数量:', currentCourse.timeSlots.length);
      } else {
        console.warn('当前课程缺少timeSlots数据，这可能导致冲突检测不准确');
      }
      
      // 检查每个已预约课程是否与当前课程冲突
      let conflictResult = { hasConflict: false, conflictCourses: [] };
      
      // 使用courseCalendar工具批量检测冲突
      const result = courseCalendarUtils.checkCoursesConflict(
        currentCourse, 
        bookedCourseInfo
      );
      
      if (result.hasConflict) {
        console.log('检测到课程冲突!', result);
        
        // 转换冲突结果格式为页面所需格式
        conflictResult.hasConflict = true;
        
        // 处理各种可能的冲突结果格式
        if (result.conflicts && Array.isArray(result.conflicts)) {
          result.conflicts.forEach(conflict => {
            // 找到对应的完整课程信息
            const courseInfo = bookedCourseInfo.find(c => 
              c._id === conflict.courseId || 
              c.id === conflict.courseId || 
              c.courseId === conflict.courseId
            );
            
            if (courseInfo) {
              conflictResult.conflictCourses.push({
                course: courseInfo,
                conflictDates: conflict.conflictDates || result.conflictDays || []
              });
            }
          });
        }
      }
      
      // 如果没有找到冲突，继续从course_schedule表中查询
      if (!conflictResult.hasConflict) {
        this.checkScheduleConflict(resolve, reject, conflictResult);
      } else {
        resolve(conflictResult);
      }
    },
    
    // 显示课程冲突提示对话框
    showConflictDialog(conflictResult) {
      // 构建冲突信息文本
      let conflictMessage = '您已预约的课程与此课程时间冲突：\n\n';
      
      conflictResult.conflictCourses.forEach((item, index) => {
        const course = item.course;
        conflictMessage += `${index + 1}. ${course.title || course.courseTitle}\n`;
        conflictMessage += `   时间：${course.startTime}-${course.endTime}\n`;
        
        // 添加冲突日期
        const conflictDates = item.conflictDates || [];
        if (conflictDates.length > 0) {
          const formattedDates = conflictDates.map(date => 
            typeof date === 'string' ? date : courseCalendarUtils.formatDate(date)
          );
          conflictMessage += `   冲突日期：${formattedDates.join('、')}\n`;
        }
        
        conflictMessage += '\n';
      });
      
      conflictMessage += '课程时间冲突，请选择其他课程。';
      
      // 显示提示对话框
      uni.showModal({
        title: '课程时间冲突',
        content: conflictMessage,
        showCancel: false,
        confirmText: '我知道了'
      });
    },
    
    // 继续预约流程
    proceedWithBooking() {
      // 删除跳转到预约页面的代码，直接在当前页面完成预约
      console.log('直接完成课程预约');
      
      // 显示加载提示
      uni.showLoading({
        title: '预约中...'
      });
      
      // 获取用户信息
      const userId = this.userInfo.userId;
      const userName = this.userInfo.nickname || this.userInfo.nickName || '未知用户';
      
      // 构建预约数据
      const bookingData = {
        userId: userId,
        courseId: this.courseId,
        studentName: this.userInfo.studentName || userName,
        contactPhone: this.userInfo.mobile || this.userInfo.phoneNumber || '',
        remark: ''
      };
      
      // 添加课程时间槽数据，用于服务端冲突检测
      if (this.courseInfo && this.courseInfo.timeSlots && this.courseInfo.timeSlots.length > 0) {
        bookingData.courseTimeSlots = this.courseInfo.timeSlots;
        console.log('将课程时间槽数据传递给bookCourse云函数，用于服务端冲突检测');
      } else {
        console.warn('当前课程没有timeSlots数据，服务端冲突检测可能不准确');
      }
      
      // 调用云函数预约课程
      uniCloud.callFunction({
        name: 'bookCourse',
        data: bookingData,
        success: res => {
          uni.hideLoading();
          
          if (res.result && res.result.success) {
            // 预约成功
            this.hasBooked = true;
            
            // 更新预约人数
            if (this.courseInfo) {
              this.courseInfo.bookingCount = (this.courseInfo.bookingCount || 0) + 1;
            }
            
            // 发送预约成功事件
            uni.$emit('booking:success', {
              courseId: this.courseId,
              userId: userId
            });
            
            // 如果是从购物车跳转来的，从购物车中移除该课程
            if (this.fromCart) {
              console.log('检测到从购物车跳转预约，准备从购物车移除课程');
              
              // 调用云函数或API移除购物车中的课程
              try {
                // 需要获取购物车中的记录ID，通过查询获取
                uniCloud.callFunction({
                  name: 'getFavoriteList',
                  data: {
                    userId: userId,
                    type: 'course',
                    itemId: this.courseId
                  },
                  success: (result) => {
                    if (result.result && result.result.data && result.result.data.length > 0) {
                      const favoriteId = result.result.data[0]._id;
                      console.log('找到购物车记录，ID:', favoriteId);
                      
                      // 调用移除收藏API
                      this.$api.user.removeFavorite(favoriteId).then(() => {
                        console.log('成功从购物车移除课程');
                      }).catch(err => {
                        console.error('从购物车移除课程失败:', err);
                      });
                    } else {
                      console.log('未找到购物车中对应的课程记录');
                    }
                  },
                  fail: (err) => {
                    console.error('获取购物车记录失败:', err);
                  }
                });
              } catch (e) {
                console.error('移除购物车项目失败:', e);
              }
            }
            
            // 显示成功提示
            uni.showToast({
              title: '预约成功',
              icon: 'success'
            });
            
            // 刷新页面以显示预约成功状态
            setTimeout(() => {
              this.reloadPage();
            }, 1500);
          } else {
            // 预约失败
            uni.showToast({
              title: res.result && res.result.message ? res.result.message : '预约失败，请重试',
              icon: 'none'
            });
          }
        },
        fail: err => {
          uni.hideLoading();
          console.error('预约课程失败:', err);
          
          uni.showToast({
            title: '预约失败，请重试',
            icon: 'none'
          });
        }
      });
    },
    
    // 重新加载页面
    reloadPage() {
      console.log('重新加载页面以确保显示预约状态');
      
      // 先缓存必要数据
      const courseId = this.courseId;
      const hasBooked = this.hasBooked;
      
      // 也确保本地缓存已更新
      this.saveBookingStatusToCache(hasBooked);
      
      // 显示加载提示
      uni.showLoading({
        title: '刷新页面...'
      });
      
      // 重新导航到当前页面（完全重新加载）
      uni.redirectTo({
        url: `/pages/course/detail?id=${courseId}&hasBooked=${hasBooked}&_t=${Date.now()}`,
        success: () => {
          console.log('页面重新加载成功，预约状态:', hasBooked);
          uni.hideLoading();
        },
        fail: (err) => {
          console.error('页面重新加载失败:', err);
          uni.hideLoading();
          
          // 失败时，再次尝试强制更新状态
          this.hasBooked = hasBooked;
          
          // 立即更新按钮显示
          this.$forceUpdate();
          
          // 确保下一帧更新
          this.$nextTick(() => {
            this.hasBooked = hasBooked;
            console.log('强制更新状态完成, hasBooked =', this.hasBooked);
          });
        }
      });
    },
    
    // 跳转到预约列表
    navigateToBookingList() {
      uni.navigateTo({
        url: '/pages/user/booking?status=all'
      });
    },
    
    // 联系老师
    contactTeacher() {
      // 获取教师电话号码
      const teacherPhone = this.courseInfo.teacherPhone || '';
      
      console.log('尝试联系老师，电话:', teacherPhone);
      
      if (!teacherPhone || teacherPhone.trim() === '') {
        uni.showToast({
          title: '暂无联系方式',
          icon: 'none'
        });
        return;
      }
      
      // 检查电话号码格式
      const isValidPhone = /^1[3-9]\d{9}$/.test(teacherPhone) || /^0\d{2,3}-?\d{7,8}$/.test(teacherPhone);
      
      if (!isValidPhone) {
        console.warn('教师电话格式可能不正确:', teacherPhone);
        // 尽管格式可能不正确，仍然尝试拨打，但显示警告
        uni.showModal({
          title: '提示',
          content: '电话号码格式可能不正确，是否继续拨打？',
          success: (res) => {
            if (res.confirm) {
              this.makePhoneCall(teacherPhone);
            }
          }
        });
        return;
      }
      
      // 格式正确，直接拨打
      this.makePhoneCall(teacherPhone);
    },
    
    // 拨打电话
    makePhoneCall(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        success: () => {
          console.log('拨打电话成功');
        },
        fail: (err) => {
          console.error('拨打电话失败:', err);
          uni.showToast({
            title: '拨打电话失败',
            icon: 'none'
          });
        }
      });
    },
    
    // 格式化课程日期和时间
    formatCourseDateAndTime(startDate, endDate, startTime, endTime) {
      // 检查必要参数，如果没有新格式的字段，则使用原来的时间格式
      if (!startDate && !endDate) {
        if (this.courseInfo.startTime && this.courseInfo.endTime) {
          return this.formatCourseTime(this.courseInfo.startTime, this.courseInfo.endTime);
        }
        return '时间待定';
      }
      
      // 格式化日期部分
      const formatDate = (dateStr) => {
        if (!dateStr) return '';
        let date;
        try {
          date = new Date(dateStr);
          // 检查日期是否有效
          if (isNaN(date.getTime())) {
            return '';
          }
        } catch (e) {
          console.error('日期格式化错误:', e);
          return '';
        }
        return `${date.getFullYear()}年${(date.getMonth() + 1)}月${date.getDate()}日`;
      };
      
      // 格式化时间部分
      const formatTime = (timeStr) => {
        if (!timeStr) return '';
        
        // 如果timeStr是标准时间格式，则直接使用Date对象解析
        if (timeStr.includes(':')) {
          try {
            // 处理"HH:MM"格式
            const parts = timeStr.split(':');
            const hours = parseInt(parts[0]);
            const minutes = parts.length > 1 ? parseInt(parts[1]) : 0;
            
            if (!isNaN(hours) && !isNaN(minutes)) {
              return `${hours}:${minutes.toString().padStart(2, '0')}`;
            }
          } catch (e) {
            console.error('时间格式化错误:', e);
          }
        }
        
        // 如果不是标准格式，尝试作为完整日期解析
        try {
          const time = new Date(timeStr);
          if (!isNaN(time.getTime())) {
            return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
          }
        } catch (e) {
          console.error('时间格式化错误:', e);
        }
        
        return timeStr; // 兜底返回原始值
      };
      
      let result = '';
      
      // 添加日期范围
      const startDateFormatted = formatDate(startDate);
      const endDateFormatted = formatDate(endDate);
      
      if (startDateFormatted && endDateFormatted) {
        if (startDateFormatted === endDateFormatted) {
          // 如果开始和结束日期相同
          result = startDateFormatted;
        } else {
          result = `${startDateFormatted} 至 ${endDateFormatted}`;
        }
      } else if (startDateFormatted) {
        result = startDateFormatted;
      } else if (endDateFormatted) {
        result = endDateFormatted;
      }
      
      // 添加时间范围
      const startTimeFormatted = formatTime(startTime);
      const endTimeFormatted = formatTime(endTime);
      
      if (startTimeFormatted && endTimeFormatted) {
        if (result) {
          result += ` ${startTimeFormatted}-${endTimeFormatted}`;
        } else {
          result = `${startTimeFormatted}-${endTimeFormatted}`;
        }
      }
      
      return result || '时间待定';
    },
    
    // 计算剩余名额
    calculateRemainingSeats() {
      const total = this.courseInfo.courseCapacity || this.courseInfo.courseCount || this.courseInfo.capacity || 20;
      const enrolled = this.courseInfo.bookingCount || 0;
      const remaining = Math.max(0, total - enrolled);
      return remaining;
    },
    
    // 新增：调试方法，简单切换预约状态
    toggleBookStatus() {
      this.hasBooked = !this.hasBooked;
      console.log('手动切换预约状态，当前值:', this.hasBooked);
    },
    
    // 添加强制刷新预约状态的方法
    forceRefreshStatus() {
      console.log('手动强制刷新预约状态');
      
      // 从缓存中删除状态，强制重新检查
      try {
        if (this.courseId) {
          // 清除用户特定缓存
          if (this.userInfo && this.userInfo.userId) {
            const userKey = `booking_${this.userInfo.userId}_${this.courseId}`;
            uni.removeStorageSync(userKey);
          }
          
          // 清除课程通用缓存
          const courseKey = `booking_course_${this.courseId}`;
          uni.removeStorageSync(courseKey);
          
          console.log('已清除本地预约状态缓存');
        }
      } catch (e) {
        console.error('清除预约缓存失败:', e);
      }
      
      // 显示加载状态
      uni.showLoading({
        title: '刷新中...'
      });
      
      // 立即检查最新预约状态
      this.checkBookingStatus().then(() => {
        uni.hideLoading();
        uni.showToast({
          title: this.hasBooked ? '您已预约此课程' : '您未预约此课程',
          icon: 'none'
        });
        
        // 强制刷新页面
        this.$forceUpdate();
      }).catch(() => {
        uni.hideLoading();
        uni.showToast({
          title: '刷新失败',
          icon: 'none'
        });
      });
    },
    
    // 处理预约取消事件
    handleBookingCancelled(data) {
      console.log('收到预约取消事件:', data);
      
      // 判断是否是当前课程的预约取消
      if (data && data.courseId === this.courseId) {
        console.log('当前课程的预约已被取消，立即更新状态');
        
        // 强制清除缓存中的预约状态
        try {
          if (this.userInfo && this.userInfo.userId) {
            const userKey = `booking_${this.userInfo.userId}_${this.courseId}`;
            uni.removeStorageSync(userKey);
            console.log('已强制清除用户特定预约状态缓存');
          }
          
          const courseKey = `booking_course_${this.courseId}`;
          uni.removeStorageSync(courseKey);
          console.log('已强制清除课程通用预约状态缓存');
        } catch (e) {
          console.error('清除预约缓存失败:', e);
        }
        
        // 更新预约状态
        this.hasBooked = false;
        this.bookingId = '';
        this.bookingStatus = '';
        
        // 更新本地缓存（设置为false）
        this.saveBookingStatusToCache(false);
        
        // 立即更新课程的报名人数
        if (this.courseInfo && this.courseInfo.bookingCount && this.courseInfo.bookingCount > 0) {
          this.courseInfo.bookingCount -= 1;
          console.log('已减少当前页面课程报名人数，更新后:', this.courseInfo.bookingCount);
        }
        
        // 强制更新UI
        this.$forceUpdate();
        
        // 确保下一帧状态一致
        this.$nextTick(() => {
          if (this.hasBooked !== false) {
            console.warn('状态未正确更新，强制再次设置为未预约');
            this.hasBooked = false;
            this.$forceUpdate();
          }
        });
        
        uni.showToast({
          title: '预约已取消',
          icon: 'none'
        });
        
        // 刷新课程详情，获取最新的报名人数
        setTimeout(() => {
          this.getCourseDetail();
        }, 1000);
      }
    },
    
    // 调试教师信息
    debugTeacherInfo() {
      // 获取真实教师数据信息
      console.log('当前教师信息:', {
        teacherId: this.courseInfo.teacherId,
        teacherName: this.courseInfo.teacherName,
        teacherDesc: this.courseInfo.teacherDesc,
        teacherDescription: this.courseInfo.teacherDescription
      });
      
      // 直接设置一个测试值
      this.courseInfo.teacherDescription = '这是一段测试的教师描述信息，用于验证UI显示是否正常。';
      console.log('已手动设置教师描述为测试值');
      
      // 如果有teacherId，尝试获取真实数据
      if (this.courseInfo.teacherId) {
        this.fetchTeacherDescription(this.courseInfo.teacherId);
      } else {
        uni.showToast({
          title: '未找到教师ID',
          icon: 'none'
        });
      }
      
      // 强制更新UI
      this.$forceUpdate();
    },
    
    // 收藏状态变更
    onFavoriteChange(isFavorite) {
      console.log('购物车状态变更:', isFavorite);
    },
    
    // 检查课程收藏状态
    async checkFavoriteStatus() {
      try {
        if (!this.courseId || !this.$refs.favoriteBtn) return;
        
        console.log('检查课程购物车状态, courseId:', this.courseId);
        
        // 调用API检查是否已加入购物车
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) return;
        
        // 检查课程是否已在购物车中
        const result = await this.$api.user.checkFavorite({
          userId: this.getUserId(userInfo),
          itemId: this.courseId,
          itemType: 'course'
        });
        
        if (result && result.code === 0 && result.data) {
          console.log('课程已在购物车中，更新按钮状态');
          
          // 获取收藏按钮组件实例并更新状态
          if (this.$refs.favoriteBtn && typeof this.$refs.favoriteBtn.updateFavoriteStatus === 'function') {
            this.$refs.favoriteBtn.updateFavoriteStatus(true, result.data._id || '');
          } else {
            console.warn('收藏按钮组件实例或方法不存在');
          }
        }
      } catch (error) {
        console.error('检查课程购物车状态失败:', error);
      }
    },
    
    // 从用户信息中获取用户ID
    getUserId(userInfo) {
      // 如果参数是字符串，尝试解析JSON
      if (typeof userInfo === 'string') {
        try {
          userInfo = JSON.parse(userInfo);
        } catch (error) {
          console.error('解析用户信息字符串失败:', error);
          return null;
        }
      }
      
      // 检查解析后的对象是否有效
      if (!userInfo) {
        console.warn('用户信息对象无效');
        return null;
      }
      
      // 优先使用userId字段，如果不存在则尝试使用_id字段
      const userId = userInfo.userId || userInfo._id;
      
      if (!userId) {
        console.warn('未找到有效的用户ID', userInfo);
        return null;
      }
      
      console.log('获取到用户ID:', userId);
      return userId;
    },
    
    // 获取状态栏高度
    onStatusBarHeight(height) {
      // 状态栏高度 + 10px的间距
      this.statusBarHeight = height + 10;
      console.log('课程详情页设置状态栏高度:', this.statusBarHeight);
    },
    
    // 新增：点击师资介绍跳转到教师详情页
    navigateToTeacherDetail() {
      console.log('尝试导航到教师详情页');
      
      // 获取教师ID和名称
      let teacherId = this.courseInfo.teacherId;
      let teacherName = this.courseInfo.teacherName;
      
      console.log('准备导航用的原始teacherId:', JSON.stringify(teacherId), '类型:', typeof teacherId);
      
      // 检查是否有可用的教师信息
      if (!teacherId && !teacherName) {
        console.warn('教师信息不完整，没有找到teacherId或teacherName');
        uni.showToast({
          title: '教师信息不完整',
          icon: 'none'
        });
        return;
      }
      
      // 记录teacherId的原始类型
      console.log('教师ID类型检查:', {
        id: teacherId,
        type: typeof teacherId,
        isObject: teacherId !== null && typeof teacherId === 'object',
        toString: teacherId ? teacherId.toString() : null
      });
      
      // 确保teacherId是字符串格式
      if (teacherId && typeof teacherId === 'object') {
        // 如果ID是对象(可能是MongoDB ObjectId)，尝试转换
        try {
          if (teacherId._id) {
            teacherId = teacherId._id;
            console.log('从对象中提取_id属性:', teacherId);
          } else {
            teacherId = teacherId.toString();
            console.log('将对象转换为字符串:', teacherId);
          }
        } catch (error) {
          console.error('转换teacherId失败:', error);
          teacherId = null;
        }
      }
      
      // 如果ID不是字符串或数字，设置为空
      if (teacherId && typeof teacherId !== 'string' && typeof teacherId !== 'number') {
        console.warn('teacherId类型无效:', typeof teacherId);
        teacherId = null;
      }
      
      // 检查最终结果
      if (!teacherId && !teacherName) {
        console.error('处理后没有有效的teacherId或teacherName');
        uni.showToast({
          title: '教师信息不完整',
          icon: 'none'
        });
        return;
      }
      
      console.log('处理后的最终teacherId:', teacherId, '教师名称:', teacherName);
      
      // 构建URL查询参数，传递ID和名称（在ID无效时作为备选）
      let url = '/pages/teacher/detail?';
      const params = [];
      
      if (teacherId) {
        params.push(`id=${encodeURIComponent(teacherId)}`);
      }
      
      if (teacherName) {
        params.push(`name=${encodeURIComponent(teacherName)}`);
      }
      
      // 检查教师是否已被收藏，并传递收藏状态
      this.checkTeacherFavoriteStatus(teacherId).then(isFavorite => {
        if (isFavorite) {
          // 添加收藏状态参数
          params.push(`favorite=1`);
        }
        
        url += params.join('&');
        console.log('跳转URL:', url);
        
        // 导航到教师详情页面
        uni.navigateTo({
          url: url,
          success: () => {
            console.log('成功导航到教师详情页');
          },
          fail: (error) => {
            console.error('导航到教师详情页失败:', error);
            uni.showToast({
              title: '页面跳转失败',
              icon: 'none'
            });
          }
        });
      });
    },
    
    // 检查教师收藏状态
    async checkTeacherFavoriteStatus(teacherId) {
      if (!teacherId) return false;
      
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) return false;
        
        // 修复这里的问题：检查userInfo是否已经是对象
        let userData;
        if (typeof userInfo === 'string') {
          try {
            userData = JSON.parse(userInfo);
          } catch (e) {
            console.error('解析用户信息字符串失败:', e);
            return false;
          }
        } else {
          // 已经是对象，直接使用
          userData = userInfo;
        }
        
        const userId = userData.userId || userData._id;
        if (!userId) return false;
        
        // 构建检查参数
        const checkData = {
          userId,
          itemType: 'teacher',
          itemId: teacherId
        };
        
        // 调用API检查是否已收藏
        const res = await this.$api.user.checkFavorite(checkData);
        
        if (res && res.code === 0 && res.data) {
          console.log('教师已被收藏');
          return true;
        } else {
          console.log('教师未被收藏');
          return false;
        }
      } catch (error) {
        console.error('检查教师收藏状态失败:', error);
        return false;
      }
    },
    
    // 添加一个显示登录提示的方法
    showLoginTip() {
      console.log('用户未登录，跳转到登录页面');
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      });
      
      setTimeout(() => {
        // 跳转到登录页面，并设置重定向回当前页面
        const currentUrl = `/pages/course/detail?id=${this.courseId}`;
        console.log('设置登录后重定向地址:', currentUrl);
        uni.navigateTo({
          url: `/pages/login/login?redirect=${encodeURIComponent(currentUrl)}`
        });
      }, 1500);
    },
    
    // 更新课程报名人数
    async updateCourseBookingCount() {
      try {
        console.log('主动更新课程报名人数:', this.courseId);
        // 使用API更新课程报名人数
        const result = await this.$api.course.updateCourseBookingCount(this.courseId);
        
        console.log('更新课程报名人数结果:', result);
        
        // 如果更新成功并返回了最新的报名人数，更新本地数据
        if (result && result.success && result.data) {
          const bookingCount = result.data.bookingCount;
          console.log('获取到最新报名人数:', bookingCount);
          
          // 更新本地courseInfo中的bookingCount
          this.courseInfo.bookingCount = bookingCount;
          this.$forceUpdate();
        }
      } catch (error) {
        console.error('更新课程报名人数失败:', error);
      }
    },
    
    // 从课程日程表中检查冲突
    checkScheduleConflict(resolve, reject, conflictResult = { hasConflict: false, conflictCourses: [] }) {
      if (conflictResult.hasConflict) {
        // 已找到冲突，直接返回结果
        resolve(conflictResult);
        return;
      }
      
      console.log('从预约记录中未检测到冲突，准备从course_schedule表查询');
      
      // 从课程日程表中获取用户课程
      const userId = this.userInfo.userId;
      const db = uniCloud.database();
      
      db.collection('course_schedule')
        .where({
          students: db.command.all([userId])
        })
        .get()
        .then(scheduleRes => {
          console.log('获取课程日程表数据:', scheduleRes);
          
          // 处理不同的返回数据格式
          let scheduleData = [];
          
          if (scheduleRes.data && scheduleRes.data.length > 0) {
            // 标准格式 {data: [...]}
            scheduleData = scheduleRes.data;
            console.log('从标准格式中获取到课程日程表数据');
          } else if (scheduleRes.result && scheduleRes.result.data && scheduleRes.result.data.length > 0) {
            // 嵌套格式 {result: {data: [...]}}
            scheduleData = scheduleRes.result.data;
            console.log('从嵌套result格式中获取到课程日程表数据');
          } else if (scheduleRes.result && Array.isArray(scheduleRes.result) && scheduleRes.result.length > 0) {
            // 直接数组格式 {result: [...]}
            scheduleData = scheduleRes.result;
            console.log('从result数组格式中获取到课程日程表数据');
          }
          
          if (scheduleData && scheduleData.length > 0) {
            // 获取所有相关课程ID，排除当前要预约的课程
            const courseIds = scheduleData
              .map(schedule => schedule.courseId)
              .filter(id => id && id !== this.courseId);
            
            console.log('从课程日程表获取的课程ID:', courseIds);
            
            if (courseIds.length > 0) {
              // 查询这些课程的详细信息
              db.collection('course')
                .where({
                  _id: db.command.in(courseIds)
                })
                .get()
                .then(courseRes => {
                  console.log('获取课程详情数据:', courseRes);
                  
                  // 处理不同的返回数据格式
                  let courseData = [];
                  
                  if (courseRes.data && courseRes.data.length > 0) {
                    // 标准格式
                    courseData = courseRes.data;
                    console.log('从标准格式中获取到课程详情数据');
                  } else if (courseRes.result && courseRes.result.data && courseRes.result.data.length > 0) {
                    // 嵌套格式
                    courseData = courseRes.result.data;
                    console.log('从嵌套result格式中获取到课程详情数据');
                  } else if (courseRes.result && Array.isArray(courseRes.result) && courseRes.result.length > 0) {
                    // 直接数组格式
                    courseData = courseRes.result;
                    console.log('从result数组格式中获取到课程详情数据');
                  }
                  
                  // 准备一个包含所有课程及其时间槽的数组
                  const coursesToCheck = [];
                  
                  // 处理课程和时间槽
                  if (courseData && courseData.length > 0) {
                    const courseMap = {};
                    courseData.forEach(course => {
                      courseMap[course._id] = course;
                    });
                    
                    // 处理每个课程日程
                    scheduleData.forEach(schedule => {
                      if (schedule.courseId && courseMap[schedule.courseId]) {
                        const course = courseMap[schedule.courseId];
                        
                        // 只处理有效的时间槽
                        if (schedule.timeSlots && schedule.timeSlots.length > 0) {
                          // 过滤未取消状态的时间槽
                          const validTimeSlots = schedule.timeSlots.filter(slot => 
                            slot.status !== 'cancelled'
                          );
                          
                          if (validTimeSlots.length > 0) {
                            // 为course添加必要的时间字段
                            const courseWithTimeSlots = {
                              ...course,
                              timeSlots: validTimeSlots,
                              startDate: new Date(Math.min(...validTimeSlots.map(s => new Date(s.start).getTime()))),
                              endDate: new Date(Math.max(...validTimeSlots.map(s => new Date(s.end).getTime())))
                            };
                            
                            // 从第一个时间槽提取上课时间
                            const firstSlot = validTimeSlots[0];
                            const firstStart = new Date(firstSlot.start);
                            const firstEnd = new Date(firstSlot.end);
                            
                            courseWithTimeSlots.startTime = `${firstStart.getHours().toString().padStart(2, '0')}:${firstStart.getMinutes().toString().padStart(2, '0')}`;
                            courseWithTimeSlots.endTime = `${firstEnd.getHours().toString().padStart(2, '0')}:${firstEnd.getMinutes().toString().padStart(2, '0')}`;
                            
                            console.log('处理课程日程表中的课程:', courseWithTimeSlots.title || '未命名课程', '时间槽数量:', validTimeSlots.length);
                            coursesToCheck.push(courseWithTimeSlots);
                          }
                        }
                      }
                    });
                  }
                  
                  // 如果有课程需要检查
                  if (coursesToCheck.length > 0) {
                    console.log('从课程日程表中获取到课程数量:', coursesToCheck.length);
                    
                    // 批量检查课程冲突
                    const result = courseCalendarUtils.checkCoursesConflict(
                      this.courseInfo, 
                      coursesToCheck
                    );
                    
                    if (result.hasConflict) {
                      console.log('在课程日程表中检测到课程冲突!', result);
                      
                      // 更新冲突结果
                      conflictResult.hasConflict = true;
                      
                      // 处理冲突结果格式
                      if (result.conflicts && Array.isArray(result.conflicts)) {
                        result.conflicts.forEach(conflict => {
                          // 找到对应的课程信息
                          const courseInfo = coursesToCheck.find(c => 
                            c._id === conflict.courseId || 
                            c.id === conflict.courseId || 
                            c.courseId === conflict.courseId
                          );
                          
                          if (courseInfo) {
                            conflictResult.conflictCourses.push({
                              course: courseInfo,
                              conflictDates: conflict.conflictDates || result.conflictDays || []
                            });
                          }
                        });
                      }
                    }
                  }
                  
                  // 返回最终的冲突结果
                  resolve(conflictResult);
                })
                .catch(err => {
                  console.error('获取课程详情失败:', err);
                  resolve(conflictResult);
                });
            } else {
              resolve(conflictResult);
            }
          } else {
            resolve(conflictResult);
          }
        })
        .catch(err => {
          console.error('获取课程日程表失败:', err);
          resolve(conflictResult);
        });
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  background-color: $bg-color;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* 课程封面 */
.course-header {
  position: relative;
  height: 400rpx;
  
  .course-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .course-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  }
  
  .course-title {
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

/* 课程信息卡片 */
.info-card {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .info-price {
    margin-bottom: 20rpx;
    
    .price-value {
      font-size: 48rpx;
      font-weight: bold;
      color: #FF3B30;
    }
    
    .price-label {
      font-size: 24rpx;
      color: $text-color-grey;
      margin-left: 8rpx;
    }
  }
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .item-icon {
      font-size: 32rpx;
      color: $theme-color;
      margin-right: 10rpx;
      width: 36rpx;
      height: 36rpx;
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-grey;
      width: 150rpx;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      flex: 1;
    }
    
    .teacher-title {
      font-size: 24rpx;
      color: $text-color-light;
      background-color: #f5f5f5;
      padding: 6rpx 12rpx;
      border-radius: 6rpx;
      margin-left: 10rpx;
    }
  }
}

.info-card .info-item .teacher-title {
  font-size: 24rpx;
  color: var(--text-color-light);
  background-color: #f5f5f5;
  padding: 6rpx 12rpx;
  border-radius: 6rpx;
  margin-left: 10rpx;
}

.info-card .info-item .price-details {
  display: flex;
  flex-direction: column;
}

.info-card .info-item .price-details text {
  margin-bottom: 8rpx;
}

/* 课程详情和师资介绍 */
.course-detail, .teacher-intro {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.detail-title {
  font-size: 32rpx;
  font-weight: bold;
  color: $text-color;
  margin-bottom: 20rpx;
  position: relative;
  padding-left: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8rpx;
    height: 32rpx;
    width: 6rpx;
    background-color: $theme-color;
    border-radius: 3rpx;
  }
  
  .title-hint {
    font-size: 24rpx;
    font-weight: normal;
    color: $text-color-light;
    margin-left: auto;
    
    .iconfont {
      font-size: 24rpx;
    }
  }
}

.detail-content {
  font-size: 28rpx;
  color: $text-color;
  line-height: 1.8;
}

/* 师资介绍 */
.teacher-card {
  display: flex;
  margin-top: 30rpx;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8rpx;
  padding: 20rpx;
  
  &:hover, &:active {
    background-color: #f8f8f8;
    transform: translateY(-2rpx);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  }
  
  .teacher-avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    margin-right: 20rpx;
  }
  
  .teacher-info {
    flex: 1;
    
    .teacher-header {
      margin-bottom: 10rpx;
      
      .teacher-name {
        font-size: 32rpx;
        font-weight: bold;
        color: $text-color;
        margin-right: 16rpx;
      }
      
      .teacher-title {
        font-size: 24rpx;
        color: $text-color-light;
        background-color: #f5f5f5;
        padding: 4rpx 12rpx;
        border-radius: 6rpx;
      }
    }
    
    .teacher-desc {
      font-size: 28rpx;
      color: $text-color-grey;
      line-height: 1.6;
    }
  }
}

/* 预约信息 */
.booking-info {
  margin: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .booking-status {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
    
    .status-icon {
      font-size: 48rpx;
      color: #4CD964;
      margin-right: 20rpx;
    }
    
    .status-text {
      font-size: 32rpx;
      color: $text-color;
      font-weight: bold;
    }
  }
  
  .booking-tips {
    text-align: center;
    font-size: 28rpx;
    color: $text-color-grey;
    padding-bottom: 30rpx;
    
    .tips-link {
      color: $theme-color;
    }
  }
}

/* 底部栏 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  border-top: 1rpx solid $border-color-light;
  z-index: 100;
  
  .contact-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120rpx;
    border-right: 1rpx solid $border-color-light;
    
    .btn-icon {
      font-size: 36rpx;
      color: $text-color-grey;
      width: 42rpx;
      height: 42rpx;
      margin-bottom: 4rpx;
    }
    
    text {
      font-size: 22rpx;
      color: $text-color-grey;
    }
  }
  
  .book-btn, .submit-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: bold;
    color: #fff;
    background-color: #FF6B00; /* 主题色 */
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    line-height: 100rpx;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    
    &::after {
      border: none;
    }
  }
  
  .book-btn {
    &.booked {
      background-color: #4CD964;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '✓';
        display: inline-block;
        margin-right: 10rpx;
        font-weight: bold;
      }
    }
    
    &.disabled {
      background-color: #999;
      color: #fff;
      cursor: not-allowed;
    }
  }
}

/* 固定在右上角的收藏按钮 */
.fixed-favorite-wrapper {
  position: fixed;
  right: 30rpx;
  z-index: 9999;
}

.course-notes {
  background-color: #fff;
  border-radius: 20rpx;
  margin: 30rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}
</style> 