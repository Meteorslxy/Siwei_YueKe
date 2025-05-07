<template>
  <view class="favorite-page">
    <!-- 顶部栏 -->
    <view class="filter-bar">
      <view class="page-title">购物车</view>
      <view class="manage-btn" @click="toggleManageMode">{{isManageMode ? '完成' : '管理'}}</view>
    </view>
    
    <!-- 购物车列表 -->
    <view class="favorite-list">
      <block v-if="favoriteList.length > 0">
        <view class="favorite-item" v-for="(item, index) in favoriteList" :key="index" :class="{'inactive': item.inactive}">
          <view class="checkbox-wrapper" @click.stop.prevent="toggleSelect(index)" v-if="!item.inactive">
            <checkbox :checked="item.selected" color="#FF6B00" />
          </view>
          <view class="checkbox-wrapper" v-else>
            <view class="inactive-icon">失效</view>
          </view>
            
          <view class="item-content" @click="handleClick(index)">
            <view class="item-image">
              <image :src="item.itemCover || getDefaultImage(item.itemType)" 
                mode="aspectFill" 
                @error="handleImageError(index)"></image>
            </view>
              
            <view class="item-info">
              <view class="item-title">{{item.itemTitle || '未命名'}}</view>
              <view class="item-type">{{getItemTypeName(item.itemType)}}</view>
              <view class="item-price" v-if="!item.inactive">¥{{item.price || 0}}.00</view>
              <view class="item-notice" v-if="item.inactive">{{item.noticeText || '该课程已下架或不存在'}}</view>
              <view class="item-time">{{formatDate(item.createTime)}}</view>
            </view>
          </view>
            
          <view class="item-action">
            <button class="action-btn book-btn" @click.stop="bookCourse(item)" v-if="!isManageMode && !item.inactive">立即预约</button>
            <view class="action-btn delete-btn" @click="handleDelete(index)" v-else>
              <text class="iconfont icon-delete"></text>
              <text class="delete-text">删除</text>
            </view>
          </view>
        </view>
      </block>
      
      <empty-tip v-else tip="购物车空空如也" :show="!loading"></empty-tip>
      
      <load-more :status="loadMoreStatus" @click="loadMore"></load-more>
    </view>
    
    <!-- 底部结算栏 -->
    <view class="cart-footer" v-if="favoriteList.length > 0">
      <view class="select-all" @click="toggleSelectAll">
        <checkbox :checked="isAllSelected" color="#FF6B00" />
        <text>全选</text>
      </view>
      
      <view class="total-price">
        <text>合计：</text>
        <text class="price-value">¥{{totalPrice}}.00</text>
      </view>
      
      <button class="checkout-btn" @click="checkout" :disabled="selectedCount === 0">
        {{isManageMode ? '删除' : '一键预约'}}({{selectedCount}})
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: '全部', type: 'all' },
        { name: '课程', type: 'course' },
        { name: '讲座', type: 'lecture' },
        { name: '教师', type: 'teacher' }
      ],
      currentTab: 0,
      favoriteList: [],
      page: 1,
      pageSize: 10,
      loading: false,
      loadMoreStatus: 'more',
      hasMore: true,
      isManageMode: false, // 是否为管理模式
      isAllSelected: false, // 是否全选
      currentBookingCourseId: null,
      currentSelectedCourseIds: [],
      userInfo: null  // 添加用户信息
    }
  },
  computed: {
    // 选中的数量
    selectedCount() {
      console.log('计算已选中数量，当前列表项数:', this.favoriteList.length);
      return this.favoriteList.filter(item => item.selected && !item.inactive).length;
    },
    // 计算总价
    totalPrice() {
      console.log('计算总价，当前列表项数:', this.favoriteList.length);
      return this.favoriteList
        .filter(item => item.selected && !item.inactive)
        .reduce((sum, item) => {
          // 确保价格是有效的数字
          const price = parseFloat(item.price) || 0;
          console.log(`选中项目 ${item.itemTitle} 价格: ${price}`);
          return sum + price;
        }, 0);
    }
  },
  onLoad() {
    // 获取用户信息
    this.getUserInfo();
    console.log("购物车页面加载，用户信息:", this.userInfo);
    
    // 清除课程缓存
    try {
      console.log('清除课程缓存');
      uni.getStorageInfo({
        success: (res) => {
          const keys = res.keys;
          keys.forEach(key => {
            if (key.startsWith('course_')) {
              uni.removeStorageSync(key);
              console.log(`已删除缓存: ${key}`);
            }
          });
        }
      });
    } catch (e) {
      console.error('清除缓存失败:', e);
    }
    // 获取收藏列表
    this.getFavoriteList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 添加一个安全地获取数组元素的辅助函数
    safeGetArrayItem(arr, index = 0, defaultValue = null) {
      if (!arr) return defaultValue;
      if (!Array.isArray(arr)) return arr; // 如果不是数组就直接返回
      if (index < 0 || index >= arr.length) return defaultValue;
      return arr[index];
    },
    
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.refreshList();
    },
    
    // 刷新列表
    refreshList() {
      console.log('刷新列表');
      this.page = 1;
      this.hasMore = true;
      this.loadMoreStatus = 'more';
      this.favoriteList = [];
      this.getFavoriteList();
    },
    
    // 获取收藏列表
    async getFavoriteList() {
      if (this.loading) return;
      
      this.loading = true;
      this.loadMoreStatus = 'loading';
      
      try {
        // 确保有有效的用户信息
        if (!this.userInfo) {
          this.getUserInfo();
        }
        
        if (!this.userInfo) {
          this.loading = false;
          this.loadMoreStatus = 'more';
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        
        // 获取用户ID，支持多种字段格式
        const userId = this.userInfo.userId || this.userInfo._id || this.userInfo.uid || 
                     (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                     (this.userInfo.userInfo && this.userInfo.userInfo.uid) || '';
                     
        // 检查用户ID
        if (!userId) {
          console.error('获取收藏列表失败: 无法获取用户ID', this.userInfo);
          this.loading = false;
          this.loadMoreStatus = 'more';
          uni.showToast({
            title: '用户信息不完整，请重新登录',
            icon: 'none'
          });
          return;
        }
        
        // 构建请求参数
        const params = {
          userId,
          page: this.page,
          pageSize: this.pageSize,
          type: this.tabs[this.currentTab].type
        };
        
        console.log('获取收藏列表，参数:', params);
        uni.showLoading({ title: '加载中' });
        
        const res = await this.$api.user.getFavoriteList(params);
        
        if (res && res.code === 0) {
          const list = res.data || [];
          console.log('获取到的收藏列表:', list);
          
          // 确保列表项都有必要的属性
          const processedList = list.map(item => {
            // 处理可能的数据结构问题
            const processedItem = {...item, selected: false};
            
            // 如果缺少必要的属性，添加默认值
            if (!processedItem.itemType) {
              console.warn('收藏项缺少itemType:', item);
              processedItem.itemType = 'unknown';
            }
            
            // 确保itemId存在
            if (!processedItem.itemId && processedItem.itemUrl) {
              // 尝试从URL提取ID
              const match = processedItem.itemUrl.match(/id=([^&]+)/);
              if (match && match[1]) {
                processedItem.itemId = match[1];
              }
            }
            
            // 确保图片地址有效
            if (!processedItem.itemCover) {
              processedItem.itemCover = this.getDefaultImage(processedItem.itemType);
            }
            
            return processedItem;
          });
          
          if (this.page === 1) {
            this.favoriteList = processedList;
          } else {
            this.favoriteList = [...this.favoriteList, ...processedList];
          }
          
          // 对所有课程类型的商品立即获取最新价格信息
          this.favoriteList.forEach(item => {
            if (item.itemType === 'course' && item.itemId) {
              this.fetchCoursePrice(item);
            }
          });
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
          
          console.log('处理后的收藏列表:', this.favoriteList);
        } else {
          uni.showToast({
            title: '获取购物车列表失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取购物车列表失败:', error);
        uni.showToast({
          title: '获取购物车列表失败',
          icon: 'none'
        });
      } finally {
        this.loading = false;
        uni.hideLoading();
        uni.stopPullDownRefresh();
      }
    },
    
    // 获取课程价格信息
    async fetchCoursePrice(item, retryCount = 0) {
      try {
        console.log(`开始获取课程${item.itemId}的价格信息，绕过缓存${retryCount > 0 ? ' (重试次数: ' + retryCount + ')' : ''}`);
        
        // 直接调用云函数获取最新课程价格，不使用API缓存
        const res = await uniCloud.callFunction({
          name: 'getCourseDetail',
          data: { courseId: item.itemId }
        });
        
        console.log(`直接获取课程价格结果:`, res.result);
        
        if (res.result && res.result.success && res.result.data) {
          // 检查数据是否为空数组或null
          if (Array.isArray(res.result.data) && res.result.data.length === 0) {
            console.log(`课程${item.itemId}不存在或已被删除`);
            // 标记为失效课程
            item.inactive = true;
            item.noticeText = '该课程已下架或不存在';
            // 取消选择状态
            item.selected = false;
            // 强制更新视图
            this.$forceUpdate();
            return;
          }
          
          let course = res.result.data;
          // 处理可能返回的数组格式
          if (Array.isArray(course)) {
            course = course[0];
          }
          
          // 如果没有获取到课程数据
          if (!course || !course._id) {
            console.log(`未获取到有效的课程数据:`, course);
            // 标记为失效课程
            item.inactive = true;
            item.noticeText = '该课程已下架或不存在';
            // 取消选择状态
            item.selected = false;
            // 强制更新视图
            this.$forceUpdate();
            return;
          }
          
          // 输出课程的完整属性，帮助调试
          console.log(`课程完整信息:`, JSON.stringify({
            id: course._id,
            title: course.title,
            classFee: course.classFee,
            materialFee: course.materialFee,
            price: course.price,
            totalFee: course.totalFee,
            fee: course.fee,
            courseFee: course.courseFee,
            discountPrice: course.discountPrice,
            originalPrice: course.originalPrice
          }));
          
          // 获取价格信息，优先使用课时费和材料费
          const classFee = parseFloat(course.classFee || 0);
          const materialFee = parseFloat(course.materialFee || 0);
          
          // 计算总价：课时费和材料费的总和
          let finalPrice = classFee + materialFee;
          console.log(`课时费: ${classFee}, 材料费: ${materialFee}, 总价: ${finalPrice}`);
          
          // 如果课时费和材料费都为0，尝试使用其他价格字段
          if (finalPrice === 0) {
            finalPrice = parseFloat(course.price || 0);
            console.log(`使用课程原价: ${finalPrice}`);
          }
          
          // 如果还是0，尝试其他可能的价格字段
          if (finalPrice === 0 && course.totalFee) {
            finalPrice = parseFloat(course.totalFee || 0);
            console.log(`使用总费用: ${finalPrice}`);
          }
          
          if (finalPrice === 0 && course.fee) {
            finalPrice = parseFloat(course.fee || 0);
            console.log(`使用费用: ${finalPrice}`);
          }
          
          if (finalPrice === 0 && course.courseFee) {
            finalPrice = parseFloat(course.courseFee || 0);
            console.log(`使用课程费用: ${finalPrice}`);
          }
          
          if (finalPrice === 0 && course.discountPrice) {
            finalPrice = parseFloat(course.discountPrice || 0);
            console.log(`使用折扣价: ${finalPrice}`);
          } else if (finalPrice === 0 && course.originalPrice) {
            finalPrice = parseFloat(course.originalPrice || 0);
            console.log(`使用原价: ${finalPrice}`);
          }
          
          // 设置最终价格，确保为数字
          item.price = finalPrice;
          // 确保课程不是失效状态
          item.inactive = false;
          console.log(`更新课程 ${item.itemTitle} 价格为: ${item.price}`);
          
          // 如果价格为0，并且重试次数小于3，则延迟2秒后重试
          if (item.price === 0 && retryCount < 3) {
            console.log(`课程价格为0，将在2秒后重试, 当前重试次数: ${retryCount}`);
            setTimeout(() => {
              this.fetchCoursePrice(item, retryCount + 1);
            }, 2000);
          }
          
          // 强制更新视图
          this.$forceUpdate();
        } else {
          console.error('获取课程价格失败, 返回结果:', res.result);
          
          // 检查是否因为课程不存在
          if (res.result && (res.result.message === "课程不存在" || res.result.data === null || 
             (Array.isArray(res.result.data) && res.result.data.length === 0))) {
            // 标记为失效课程
            item.inactive = true;
            item.noticeText = '该课程已下架或不存在';
            // 取消选择状态
            item.selected = false;
            // 强制更新视图
            this.$forceUpdate();
          }
          // 如果获取失败且重试次数小于3，则延迟2秒后重试
          else if (retryCount < 3) {
            console.log(`获取失败，将在2秒后重试, 当前重试次数: ${retryCount}`);
            setTimeout(() => {
              this.fetchCoursePrice(item, retryCount + 1);
            }, 2000);
          }
        }
      } catch (error) {
        console.error('获取课程价格失败:', error);
        
        // 判断是否因为课程不存在导致的错误
        if (error && error.message && (
            error.message.includes("Cannot read property '_id' of undefined") ||
            error.message.includes("课程不存在") ||
            error.message.includes("无效的课程ID")
        )) {
          // 标记为失效课程
          item.inactive = true;
          item.noticeText = '该课程已下架或不存在';
          // 取消选择状态
          item.selected = false;
          // 强制更新视图
          this.$forceUpdate();
          console.log(`课程${item.itemId}已标记为失效`);
          return;
        }
        
        // 如果发生异常且重试次数小于3，则延迟2秒后重试
        if (retryCount < 3) {
          console.log(`发生异常，将在2秒后重试, 当前重试次数: ${retryCount}`);
          setTimeout(() => {
            this.fetchCoursePrice(item, retryCount + 1);
          }, 2000);
        }
      }
    },
    
    // 切换管理模式
    toggleManageMode() {
      this.isManageMode = !this.isManageMode;
    },
    
    // 切换选择状态
    toggleSelect(index) {
      console.log('切换选择状态:', index, '当前列表长度:', this.favoriteList.length);
      // 检查是否为失效课程
      if (this.favoriteList[index].inactive) {
        uni.showToast({
          title: '该课程已下架或不存在',
          icon: 'none'
        });
        return;
      }
      this.favoriteList[index].selected = !this.favoriteList[index].selected;
      // 检查是否全选
      this.checkAllSelected();
    },
    
    // 切换全选状态
    toggleSelectAll() {
      this.isAllSelected = !this.isAllSelected;
      this.favoriteList.forEach(item => {
        // 只有非失效的课程才能被选中
        if (!item.inactive) {
          item.selected = this.isAllSelected;
        }
      });
    },
    
    // 检查是否全选
    checkAllSelected() {
      // 过滤掉失效课程
      const validItems = this.favoriteList.filter(item => !item.inactive);
      const allSelected = validItems.length > 0 && 
                        validItems.every(item => item.selected);
      console.log('检查是否全选:', allSelected, '列表长度:', validItems.length);
      this.isAllSelected = allSelected;
    },
    
    // 获取用户信息
    getUserInfo() {
      try {
        const userInfoStr = uni.getStorageSync('userInfo');
        if (userInfoStr) {
          this.userInfo = typeof userInfoStr === 'string' ? JSON.parse(userInfoStr) : userInfoStr;
          console.log("获取到用户信息:", this.userInfo);
        } else {
          console.warn("本地存储中没有用户信息");
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    },
    
    // 立即预约单个课程
    async bookCourse(item) {
      console.log("准备预约课程:", item);
      if (!item || item.itemType !== 'course') {
        uni.showToast({
          title: '只能预约课程',
          icon: 'none'
        });
        return;
      }
      
      // 检查是否有有效的课程ID
      if (!item.itemId) {
        uni.showToast({
          title: '无效的课程ID',
          icon: 'none'
        });
        return;
      }
      
      // 存储当前预约的课程ID，用于预约成功后删除
      this.currentBookingCourseId = item._id;
      
      // 直接预约课程，传递字符串格式的ID
      const courseId = typeof item.itemId === 'object' ? 
        (item.itemId._id || item.itemId.id || '') : 
        String(item.itemId || '');
      
      await this.submitBooking(courseId);
    },
    
    // 一键预约或批量删除
    checkout() {
      if (this.selectedCount === 0) {
        uni.showToast({
          title: '请先选择课程',
          icon: 'none'
        });
        return;
      }
      
      if (this.isManageMode) {
        // 批量删除
        this.batchDelete();
      } else {
        // 批量预约
        this.batchBook();
      }
    },
    
    // 批量预约
    async batchBook() {
      const selectedCourses = this.favoriteList.filter(item => 
        item.selected && item.itemType === 'course'
      );
      
      if (selectedCourses.length === 0) {
        uni.showToast({
          title: '请选择课程进行预约',
          icon: 'none'
        });
        return;
      }
      
      // 存储当前选中的所有课程ID，用于预约成功后删除
      this.currentSelectedCourseIds = selectedCourses.map(item => item._id);
      
      // 依次预约所有选中的课程
      let successCount = 0;
      let failCount = 0;
      
      uni.showLoading({ title: '批量预约中...' });
      
      try {
        // 依次处理每个课程
        for (const course of selectedCourses) {
          try {
            // 确保使用正确格式的ID
            const courseId = course.itemId;
            
            if (!courseId) {
              console.error('课程ID为空，无法预约:', course);
              failCount++;
              continue;
            }
            
            // 预约当前课程
            const result = await this.submitBooking(courseId, false); // 不显示单个预约的loading
            
            if (result && result.success) {
              successCount++;
              // 预约成功后从购物车移除
              if (course._id) {
                await this.removeFromCartAfterBooking(course._id, false); // 不显示移除的toast
              }
            } else {
              failCount++;
            }
          } catch (error) {
            console.error('预约课程失败:', error);
            failCount++;
          }
        }
        
        uni.hideLoading();
        
        // 显示预约结果
        const message = successCount > 0 
          ? (failCount > 0 
             ? `成功预约${successCount}个课程，${failCount}个失败` 
             : `已成功预约${successCount}个课程`)
          : '预约失败，请稍后重试';
        
        uni.showToast({
          title: message,
          icon: successCount > 0 ? 'success' : 'none',
          duration: 2000
        });
        
        // 如果全部预约成功，跳转到预约列表页
        if (successCount > 0 && failCount === 0) {
          setTimeout(() => {
            uni.navigateTo({
              url: '/pkgs/user/booking'
            });
          }, 2000);
        }
      } catch (error) {
        console.error('批量预约过程中发生异常:', error);
        uni.hideLoading();
        uni.showToast({
          title: '预约失败，请稍后重试',
          icon: 'none'
        });
      } finally {
        // 刷新列表
        setTimeout(() => {
          this.refreshList();
        }, 2500);
      }
    },
    
    // 提交预约
    async submitBooking(courseId, showLoading = true) {
      if (showLoading) {
        uni.showLoading({ title: '预约中...' });
      }
      
      try {
        // 确保有有效的用户ID和信息
        if (!this.userInfo) {
          await this.getUserInfo();
        }
        
        if (!this.userInfo) {
          if (showLoading) uni.hideLoading();
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return null;
        }
        
        const userId = this.userInfo.userId || this.userInfo._id || this.userInfo.uid || 
                     (this.userInfo.userInfo && this.userInfo.userInfo._id) || 
                     (this.userInfo.userInfo && this.userInfo.userInfo.uid);
        
        if (!userId) {
          if (showLoading) uni.hideLoading();
          uni.showToast({
            title: '用户信息不完整，请重新登录',
            icon: 'none'
          });
          return null;
        }
        
        // 获取用户名称
        const userName = this.userInfo.nickName || 
                       this.userInfo.nickname || 
                       this.userInfo.username || 
                       (this.userInfo.userInfo && this.userInfo.userInfo.nickname) ||
                       '微信用户';
                       
        // 获取手机号
        const phoneNumber = this.userInfo.phoneNumber || 
                          this.userInfo.mobile ||
                          (this.userInfo.userInfo && this.userInfo.userInfo.mobile) ||
                          '';
        
        console.log('提交预约数据：用户ID:', userId, '课程ID:', courseId);
        console.log('用户名称:', userName, '手机号:', phoneNumber || '(未提供)');
        
        // 获取当前课程详情
        let course = null;
        let courseClassTime = null;
        
        try {
          // 先获取课程详情
          const courseRes = await uniCloud.callFunction({
            name: 'getCourseDetail',
            data: { courseId }
          });
          
          console.log('课程详情API返回:', JSON.stringify(courseRes?.result));
          
          // 使用安全的辅助函数获取课程数据
          if (courseRes?.result?.data) {
            course = this.safeGetArrayItem(courseRes.result.data);
            
            if (!course) {
              if (showLoading) uni.hideLoading();
              uni.showToast({ 
                title: '课程不存在或已下架', 
                icon: 'none' 
              });
              return null;
            }
            
            // 获取classTime数据
            courseClassTime = course.classTime;
            console.log('获取到课程信息:', course.title, '上课时间:', courseClassTime);
            
            console.log('处理后的课程数据:', course);
          } else {
            console.warn('未获取到课程详情或格式不正确:', courseRes);
            
            // 如果无法通过云函数获取，尝试直接从数据库获取classTime
            try {
              const db = uniCloud.database();
              const courseResult = await db.collection('courses')
                .doc(courseId)
                .field({
                  _id: true,
                  title: true,
                  classTime: true
                })
                .get();
                
              if (courseResult.data) {
                courseClassTime = courseResult.data.classTime;
                console.log('通过数据库获取课程上课时间:', courseClassTime);
              }
            } catch (dbError) {
              console.error('从数据库获取课程信息失败:', dbError);
            }
          }
        } catch (error) {
          console.error('获取课程详情失败:', error);
          
          // 获取课程详情失败，尝试直接从数据库获取classTime
          try {
            const db = uniCloud.database();
            const courseResult = await db.collection('courses')
              .doc(courseId)
              .field({
                _id: true,
                title: true,
                classTime: true
              })
              .get();
              
            if (courseResult.data) {
              courseClassTime = courseResult.data.classTime;
              console.log('通过数据库获取课程上课时间:', courseClassTime);
            }
          } catch (dbError) {
            console.error('从数据库获取课程信息失败:', dbError);
          }
          
          // 获取课程详情失败，继续预约流程
        }
        
        // 检查课程冲突
        try {
          if (course) {
            // 检查课程冲突
            const conflictRes = await this.checkCourseConflict(course, userId);
            
            if (conflictRes && conflictRes.hasConflict) {
              // 有冲突，显示冲突对话框
              if (showLoading) uni.hideLoading();
              return this.showConflictDialog(conflictRes, course, userId);
            }
          }
        } catch (error) {
          console.error('检查课程冲突失败:', error);
          // 冲突检查失败，继续预约流程
        }
        
        // 确保courseId是字符串格式
        const finalCourseId = typeof courseId === 'object' ? 
          (courseId._id || courseId.id || '') : 
          String(courseId || '');
        
        if (!finalCourseId) {
          if (showLoading) uni.hideLoading();
          uni.showToast({
            title: '无效的课程ID',
            icon: 'none'
          });
          return null;
        }
        
        // 构建预约请求参数，确保所有字段格式正确
        const bookingParams = {
          userId: String(userId),
          courseId: finalCourseId,
          userName: String(userName || ''),
          phoneNumber: String(phoneNumber || ''),
          remark: ''
        };
        
        // 添加classTime字段
        if (courseClassTime) {
          // 确保classTime是数组格式
          if (Array.isArray(courseClassTime)) {
            bookingParams.classTime = courseClassTime;
          } else {
            // 如果是字符串，转换为数组
            bookingParams.classTime = [courseClassTime];
          }
          console.log('将课程classTime添加到预约数据中:', bookingParams.classTime);
        }
        
        console.log('调用bookCourse云函数，参数:', JSON.stringify(bookingParams));
        
        // 调用云函数预约课程
        const res = await uniCloud.callFunction({
          name: 'bookCourse',
          data: bookingParams
        });
        
        console.log('预约结果详情:', JSON.stringify(res?.result));
        
        if (showLoading) uni.hideLoading();
        
        if (res?.result?.success) {
          console.log('预约成功:', res.result);
          
          if (showLoading) {
            uni.showToast({
              title: '预约成功',
              icon: 'success'
            });
          }
          
          // 发送预约成功事件，用于其他页面更新
          uni.$emit('booking:success', {
            courseId: finalCourseId,
            userId: userId
          });
          
          // 如果预约成功，从购物车中移除
          if (this.currentBookingCourseId) {
            this.removeFromCartAfterBooking(this.currentBookingCourseId);
          }
          
          // 预约成功后显示支付时间限制提示
          if (showLoading) {
            setTimeout(() => {
              uni.showModal({
                title: '支付提醒',
                content: '您需要在7天内完成支付，否则预约将被自动取消',
                showCancel: false,
                success: () => {
                  // 预约成功后，跳转到预约详情页
                  if (res.result.data && res.result.data.bookingId) {
                    uni.navigateTo({
                      url: '/pkgs/user/booking-detail?id=' + res.result.data.bookingId
                    });
                  } else {
                    // 跳转到预约列表页
                    uni.navigateTo({
                      url: '/pkgs/user/booking'
                    });
                  }
                }
              });
            }, 1500);
          }
          
          return res.result;
        } else {
          console.error('预约失败:', res?.result);
          
          if (showLoading) {
            const errorMessage = res?.result?.message || '预约失败，请稍后重试';
            uni.showToast({
              title: errorMessage,
              icon: 'none'
            });
          }
          
          return res?.result || { success: false };
        }
      } catch (error) {
        if (showLoading) uni.hideLoading();
        console.error('预约课程过程中发生异常:', error);
        
        if (showLoading) {
          uni.showToast({
            title: '预约失败，请稍后重试',
            icon: 'none'
          });
        }
        
        return { success: false, message: error.message || '预约过程发生异常' };
      }
    },
    
    // 检查课程冲突
    async checkCourseConflict(course, userId) {
      try {
        console.log('开始检查课程冲突，课程:', course?.title || course?.courseTitle || '未命名课程', '用户ID:', userId);
        
        // 1. 从预约表获取用户已确认的预约
        const bookedCoursesRes = await uniCloud.callFunction({
          name: 'getUserBookings',
          data: {
            userId: userId,
            status: ['confirmed'] // 确保使用数组格式传递status参数
          }
        });
        
        console.log('获取用户预约结果:', JSON.stringify(bookedCoursesRes?.result));
        
        let conflictResult = { hasConflict: false, conflictCourses: [] };
        
        // 安全地加载工具模块
        let courseCalendarUtils = null;
        try {
          courseCalendarUtils = require('@/utils/courseCalendar.js');
        } catch (error) {
          console.error('加载courseCalendar模块失败:', error);
          return conflictResult; // 如果模块加载失败，直接返回无冲突结果
        }
        
        // 定义一个处理冲突检测的内部函数
        const handleCourseConflictCheck = (existingCourse) => {
          // 忽略无效课程
          if (!existingCourse) return;
          
          console.log('检查课程冲突 - 已预约课程:', existingCourse?.title || existingCourse?.courseTitle || '未命名课程');
          
          try {
            // 使用courseCalendar工具检测冲突
            if (typeof courseCalendarUtils.checkCoursesConflict !== 'function') {
              console.error('checkCoursesConflict 不是有效函数');
              return;
            }
            
            const result = courseCalendarUtils.checkCoursesConflict(
              course, 
              existingCourse
            );
            
            if (result && result.hasConflict) {
              console.log('检测到课程冲突!', result);
              conflictResult.hasConflict = true;
              conflictResult.conflictCourses.push({
                course: existingCourse,
                conflictDates: result.conflictDates || []
              });
            }
          } catch (error) {
            console.error('冲突检测出错:', error);
          }
        };
        
        // 2. 检查从预约表获取的课程冲突
        if (bookedCoursesRes?.result?.data) {
          const bookedCourses = bookedCoursesRes.result.data;
          
          // 确保bookedCourses是数组
          if (Array.isArray(bookedCourses)) {
            // 遍历已预约的课程，检查冲突
            for (const booking of bookedCourses) {
              // 检查booking.courseInfo
              if (booking && booking.courseInfo) {
                handleCourseConflictCheck(booking.courseInfo);
              }
            }
          } else if (bookedCourses && bookedCourses.courseInfo) {
            // 如果不是数组但有单个课程信息，也进行检查
            handleCourseConflictCheck(bookedCourses.courseInfo);
          }
        }
        
        // 3. 如果没有找到冲突，尝试从course_schedule表中查询
        if (!conflictResult.hasConflict) {
          console.log('从预约记录中未检测到冲突，准备从course_schedule表查询');
          
          try {
            // 从课程日程表中获取用户课程
            const db = uniCloud.database();
            const scheduleRes = await db.collection('course_schedule')
              .where({
                students: db.command.all([userId])
              })
              .get();
              
            console.log('获取课程日程表数据:', scheduleRes);
            
            const scheduleData = scheduleRes?.data;
            
            if (Array.isArray(scheduleData) && scheduleData.length > 0) {
              // 获取所有相关课程ID
              const courseIds = scheduleData
                .map(schedule => schedule?.courseId)
                .filter(id => id);
              
              if (courseIds.length > 0) {
                // 查询这些课程的详细信息
                const courseRes = await db.collection('course')
                  .where({
                    _id: db.command.in(courseIds)
                  })
                  .get();
                  
                console.log('获取课程详情数据:', courseRes);
                
                const courseData = courseRes?.data;
                
                if (Array.isArray(courseData) && courseData.length > 0) {
                  const courseMap = {};
                  courseData.forEach(course => {
                    if (course && course._id) {
                      courseMap[course._id] = course;
                    }
                  });
                  
                  // 检查课程日程表中的每个课程
                  for (const schedule of scheduleData) {
                    if (schedule?.courseId && courseMap[schedule.courseId]) {
                      const existingCourse = courseMap[schedule.courseId];
                      
                      // 检查timeSlots是否有冲突
                      if (Array.isArray(schedule?.timeSlots) && schedule.timeSlots.length > 0) {
                        // 从timeSlots提取上课时间范围
                        const validTimeSlots = schedule.timeSlots.filter(slot => 
                          slot && slot.status !== 'cancelled'
                        );
                        
                        if (validTimeSlots.length > 0) {
                          try {
                            // 为course添加必要的时间字段
                            const startTimes = validTimeSlots.map(s => new Date(s.start).getTime()).filter(t => !isNaN(t));
                            const endTimes = validTimeSlots.map(s => new Date(s.end).getTime()).filter(t => !isNaN(t));
                            
                            if (startTimes.length > 0 && endTimes.length > 0) {
                              existingCourse.startDate = new Date(Math.min(...startTimes));
                              existingCourse.endDate = new Date(Math.max(...endTimes));
                              
                              // 从第一个时间槽提取上课时间
                              const firstSlot = validTimeSlots[0];
                              if (firstSlot) {
                                const firstStart = new Date(firstSlot.start);
                                const firstEnd = new Date(firstSlot.end);
                                
                                if (!isNaN(firstStart) && !isNaN(firstEnd)) {
                                  existingCourse.startTime = `${firstStart.getHours().toString().padStart(2, '0')}:${firstStart.getMinutes().toString().padStart(2, '0')}`;
                                  existingCourse.endTime = `${firstEnd.getHours().toString().padStart(2, '0')}:${firstEnd.getMinutes().toString().padStart(2, '0')}`;
                                  
                                  // 提取classTime (星期几)
                                  existingCourse.classTime = validTimeSlots.map(slot => {
                                    if (!slot || !slot.start) return null;
                                    const date = new Date(slot.start);
                                    if (isNaN(date)) return null;
                                    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
                                    return weekday;
                                  }).filter(day => day !== null).filter((v, i, a) => a.indexOf(v) === i); // 去重
                                  
                                  console.log('从course_schedule提取的课程信息:', existingCourse);
                                  
                                  // 检查冲突
                                  handleCourseConflictCheck(existingCourse);
                                }
                              }
                            }
                          } catch (error) {
                            console.error('处理时间槽数据出错:', error);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } catch (err) {
            console.error('获取课程日程表失败:', err);
          }
        }
        
        return conflictResult;
      } catch (error) {
        console.error('检查课程冲突出错:', error);
        return { hasConflict: false };
      }
    },
    
    // 显示课程冲突提示对话框
    showConflictDialog(conflictResult, course, userId) {
      // 确保conflictCourses是数组
      const conflictCourses = Array.isArray(conflictResult?.conflictCourses) 
        ? conflictResult.conflictCourses 
        : [conflictResult.conflictCourses].filter(Boolean);
        
      if (!conflictCourses || conflictCourses.length === 0) {
        console.warn('没有有效的冲突课程信息');
        return this.proceedWithBooking(course?._id || course?.id, userId);
      }
      
      // 构建冲突信息文本
      const courseCalendarUtils = require('@/utils/courseCalendar.js');
      let conflictMessage = '您已预约的课程与此课程时间冲突：\n\n';
      
      conflictCourses.forEach((item, index) => {
        if (!item || !item.course) return;
        
        const conflictCourse = item.course;
        conflictMessage += `${index + 1}. ${conflictCourse?.title || conflictCourse?.courseTitle || '未命名课程'}\n`;
        
        if (conflictCourse?.startTime && conflictCourse?.endTime) {
          conflictMessage += `   时间：${conflictCourse.startTime}-${conflictCourse.endTime}\n`;
        }
        
        // 添加冲突日期
        if (Array.isArray(item?.conflictDates) && item.conflictDates.length > 0) {
          try {
            // 安全调用 formatDate 方法
            const formatDateSafe = (date) => {
              if (!date) return '';
              
              if (typeof courseCalendarUtils?.formatDate === 'function') {
                return courseCalendarUtils.formatDate(date);
              }
              
              if (date instanceof Date) {
                return date.toLocaleDateString();
              }
              
              return String(date);
            };
            
            const formattedDates = item.conflictDates
              .filter(Boolean)
              .map(formatDateSafe)
              .filter(Boolean);
              
            if (formattedDates.length > 0) {
              conflictMessage += `   冲突日期：${formattedDates.join('、')}\n`;
            }
          } catch (error) {
            console.error('格式化冲突日期出错:', error);
          }
        }
        
        conflictMessage += '\n';
      });
      
      conflictMessage += '确定要继续预约吗？';
      
      // 返回一个Promise
      return new Promise((resolve) => {
        // 显示确认对话框
        uni.showModal({
          title: '课程时间冲突',
          content: conflictMessage,
          confirmText: '继续预约',
          cancelText: '取消',
          success: async res => {
            if (res.confirm) {
              // 用户确认继续预约
              const courseIdToUse = course?.id || course?._id;
              if (!courseIdToUse) {
                console.error('课程ID不存在:', course);
                resolve({ success: false, message: '课程ID不存在' });
                return;
              }
              
              const result = await this.proceedWithBooking(courseIdToUse, userId);
              resolve(result);
            } else {
              resolve({ success: false, message: '用户取消预约' });
            }
          }
        });
      });
    },
    
    // 继续预约流程
    async proceedWithBooking(courseId, userId) {
      try {
        // 获取用户名称
        const userName = this.userInfo.nickName || 
                      this.userInfo.nickname || 
                      this.userInfo.username || 
                      (this.userInfo.userInfo && this.userInfo.userInfo.nickname) ||
                      '微信用户';
                      
        // 获取手机号
        const phoneNumber = this.userInfo.phoneNumber || 
                          this.userInfo.mobile ||
                          (this.userInfo.userInfo && this.userInfo.userInfo.mobile) ||
                          '';
        
        uni.showLoading({ title: '预约中...' });
        
        // 确保courseId是字符串格式
        const finalCourseId = typeof courseId === 'object' ? 
          (courseId._id || courseId.id || '') : 
          String(courseId || '');
          
        if (!finalCourseId) {
          uni.hideLoading();
          uni.showToast({
            title: '无效的课程ID',
            icon: 'none'
          });
          return { success: false, message: '无效的课程ID' };
        }
        
        // 尝试获取课程的classTime信息
        let courseClassTime = null;
        try {
          const db = uniCloud.database();
          const courseResult = await db.collection('courses')
            .doc(finalCourseId)
            .field({
              classTime: true
            })
            .get();
            
          if (courseResult.data && courseResult.data.classTime) {
            courseClassTime = courseResult.data.classTime;
            console.log('获取到课程上课时间:', courseClassTime);
          }
        } catch (error) {
          console.error('获取课程classTime失败:', error);
        }
        
        // 构建预约请求参数
        const bookingParams = {
          userId: String(userId),
          courseId: finalCourseId,
          userName: String(userName || ''),
          phoneNumber: String(phoneNumber || ''),
          remark: ''
        };
        
        // 添加classTime字段
        if (courseClassTime) {
          // 确保classTime是数组格式
          if (Array.isArray(courseClassTime)) {
            bookingParams.classTime = courseClassTime;
          } else {
            // 如果是字符串，转换为数组
            bookingParams.classTime = [courseClassTime];
          }
          console.log('将课程classTime添加到预约数据中:', bookingParams.classTime);
        }
        
        console.log('继续预约流程 - 确认预约参数:', JSON.stringify(bookingParams));
        
        // 调用云函数预约课程
        const res = await uniCloud.callFunction({
          name: 'bookCourse',
          data: bookingParams
        });
        
        uni.hideLoading();
        
        if (res?.result?.success) {
          uni.showToast({
            title: '预约成功',
            icon: 'success'
          });
          
          // 发送预约成功事件
          uni.$emit('booking:success', {
            courseId: finalCourseId,
            userId: userId
          });
          
          // 如果预约成功，从购物车中移除
          if (this.currentBookingCourseId) {
            this.removeFromCartAfterBooking(this.currentBookingCourseId);
          }
          
          return res.result;
        } else {
          const errorMessage = res?.result?.message || '预约失败，请稍后重试';
          uni.showToast({
            title: errorMessage,
            icon: 'none'
          });
          
          return res?.result || { success: false, message: errorMessage };
        }
      } catch (error) {
        uni.hideLoading();
        console.error('预约课程过程中发生异常:', error);
        
        uni.showToast({
          title: '预约失败，请稍后重试',
          icon: 'none'
        });
        
        return { success: false, message: error.message || '预约过程发生异常' };
      }
    },
    
    // 批量删除
    async batchDelete() {
      try {
        if (this.isManageMode && this.selectedCount === 0) {
          uni.showToast({
            title: '请选择要删除的项目',
            icon: 'none'
          });
          return;
        }

        // 使用uni.showModal代替this.$helper.showModal
        uni.showModal({
          title: '确认删除',
          content: '确定要删除选中的项目吗？',
          success: async (result) => {
            if (result.confirm) {
              uni.showLoading({
                title: '处理中'
              });

              const deleteItems = this.isManageMode ? 
                this.favoriteList.filter(item => item.selected) : 
                [this.favoriteList.find(item => item._id === this.currentBookingCourseId)];
              
              if (!deleteItems.length || !deleteItems[0]) {
                uni.hideLoading();
                uni.showToast({
                  title: '没有找到要删除的项目',
                  icon: 'none'
                });
                return;
              }
              
              const promises = deleteItems.map(async (item) => {
                try {
                  if (!item || !item._id) {
                    console.error('删除项目无效:', item);
                    return Promise.reject(new Error('无效的删除项目'));
                  }
                  
                  // 直接传递ID字符串
                  const favoriteId = item._id;
                  console.log('准备删除收藏，ID:', favoriteId);
                  await this.$api.user.removeFavorite(favoriteId);
                  return Promise.resolve();
                } catch (error) {
                  console.error('删除失败:', error, 'item:', item);
                  return Promise.reject(error);
                }
              });

              try {
                await Promise.allSettled(promises);
                
                // 更新列表
                this.favoriteList = this.favoriteList.filter(item => 
                  !deleteItems.some(deleteItem => deleteItem._id === item._id)
                );

                uni.showToast({
                  title: '删除成功',
                  icon: 'success'
                });

                // 退出管理模式
                if (this.isManageMode) {
                  this.toggleManageMode();
                }
              } catch (error) {
                console.error('执行删除操作失败:', error);
                uni.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              } finally {
                uni.hideLoading();
              }
            }
          }
        });
      } catch (err) {
        console.error('批量删除失败:', err);
        uni.hideLoading();
        uni.showToast({
          title: '删除失败',
          icon: 'none'
        });
      }
    },
    
    // 获取默认图片
    getDefaultImage(itemType) {
      switch (itemType) {
        case 'course':
          return '/static/images/default-course.jpg';
        case 'lecture':
          return '/static/images/default-lecture.jpg';
        case 'teacher':
          return '/static/images/default-teacher.jpg';
        default:
          return '/static/images/default.jpg';
      }
    },
    
    // 加载更多
    loadMore() {
      if (this.hasMore && !this.loading) {
        this.page++;
        this.getFavoriteList();
      }
    },
    
    // 处理点击项目
    handleClick(index) {
      if (index < 0 || index >= this.favoriteList.length) {
        console.error('无效的索引:', index);
        return;
      }
      
      const item = this.favoriteList[index];
      if (!item) {
        console.error('索引对应的收藏项为空:', index);
        return;
      }
      
      // 如果课程已失效，显示提示
      if (item.inactive) {
        uni.showToast({
          title: item.noticeText || '该课程已下架或不存在',
          icon: 'none'
        });
        return;
      }
      
      console.log('点击收藏项, 索引:', index);
      this.openDetail(index);
    },
    
    // 处理删除
    handleDelete(index) {
      if (index < 0 || index >= this.favoriteList.length) {
        console.error('无效的索引:', index);
        return;
      }
      
      const item = this.favoriteList[index];
      if (!item) {
        console.error('索引对应的收藏项为空:', index);
        return;
      }
      
      console.log('删除收藏项, 索引:', index);
      this.cancelFavorite(index);
    },
    
    // 打开详情页
    openDetail(index) {
      const item = this.favoriteList[index];
      
      if (!item) {
        uni.showToast({
          title: '收藏项不存在',
          icon: 'none'
        });
        return;
      }
      
      // 构建跳转URL
      let url = '';
      
      if (item.itemUrl) {
        url = item.itemUrl;
      } else if (item.itemType && item.itemId) {
        // 根据类型和ID构建URL
        switch (item.itemType) {
          case 'course':
            url = `/pkgs/course/detail?id=${item.itemId}`;
            break;
          case 'lecture':
            url = `/pkgs/course/lecture-detail?id=${item.itemId}`;
            break;
          case 'teacher':
            url = `/pages/teacher/detail?id=${item.itemId}`;
            break;
          default:
            url = '';
        }
      }
      
      // 检查url是否有效
      if (!url) {
        uni.showToast({
          title: '链接无效',
          icon: 'none'
        });
        return;
      }
      
      // 执行跳转
      console.log('跳转到:', url);
      uni.navigateTo({
        url,
        fail: (err) => {
          console.error('页面跳转失败:', err);
          uni.showToast({
            title: '页面不存在',
            icon: 'none'
          });
        }
      });
    },
    
    // 取消收藏
    async cancelFavorite(index) {
      const item = this.favoriteList[index];
      
      if (!item) {
        uni.showToast({
          title: '收藏项不存在',
          icon: 'none'
        });
        return;
      }
      
      if (!item._id) {
        uni.showToast({
          title: '收藏ID不存在',
          icon: 'none'
        });
        return;
      }
      
      uni.showModal({
        title: '提示',
        content: '确定要取消收藏吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '处理中' });
              
              const favoriteId = item._id;
              console.log('准备删除收藏，ID:', favoriteId);
              
              // 直接传递ID字符串，而不是包含ID的对象
              const result = await this.$api.user.removeFavorite(favoriteId);
              
              if (result && result.code === 0) {
                // 从列表中移除
                this.favoriteList.splice(index, 1);
                
                uni.showToast({
                  title: '已取消收藏',
                  icon: 'success'
                });
              } else {
                uni.showToast({
                  title: '操作失败',
                  icon: 'none'
                });
              }
            } catch (error) {
              console.error('取消收藏失败:', error);
              uni.showToast({
                title: '操作失败',
                icon: 'none'
              });
            } finally {
              uni.hideLoading();
            }
          }
        }
      });
    },
    
    // 获取项目类型名称
    getItemTypeName(type) {
      const typeMap = {
        'course': '课程',
        'lecture': '讲座',
        'teacher': '教师',
        'news': '资讯'
      };
      
      return typeMap[type] || '未知';
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    },
    
    // 处理图片加载错误
    handleImageError(index) {
      if (index < 0 || index >= this.favoriteList.length) {
        console.error('无效的索引:', index);
        return;
      }
      
      const item = this.favoriteList[index];
      if (!item) {
        console.error('索引对应的收藏项为空:', index);
        return;
      }
      
      console.log('图片加载错误, 索引:', index);
      item.itemCover = this.getDefaultImage(item.itemType);
    },
    
    // 预约成功后从购物车中移除
    async removeFromCartAfterBooking(favoriteId, showToast = true) {
      if (!favoriteId) {
        console.error('移除购物车项失败: 缺少ID');
        return;
      }
      
      try {
        console.log('从购物车移除已预约课程，ID:', favoriteId);
        
        // 直接传递ID字符串，而不是包含ID的对象
        const result = await this.$api.user.removeFavorite(favoriteId);
        
        if (result && result.code === 0) {
          // 从列表中移除
          const index = this.favoriteList.findIndex(item => item._id === favoriteId);
          if (index !== -1) {
            this.favoriteList.splice(index, 1);
          }
          
          if (showToast) {
            uni.showToast({
              title: '已从购物车移除',
              icon: 'success'
            });
          }
          
          // 清除当前处理的ID
          this.currentBookingCourseId = null;
          this.currentSelectedCourseIds = [];
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('移除购物车项失败:', error);
        return false;
      }
    }
  }
}
</script>

<style lang="scss">
.favorite-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
}

.filter-bar {
  display: flex;
  padding: 30rpx 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eee;
  
  .page-title {
    flex: 1;
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
  
  .manage-btn {
    padding: 0 20rpx;
    font-size: 30rpx;
    color: #FF6B00;
  }
}

.favorite-list {
  flex: 1;
  padding: 20rpx;
  padding-bottom: 120rpx;
  
  .favorite-item {
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    
    // 添加失效状态样式
    &.inactive {
      opacity: 0.6;
      background-color: #f8f8f8;
      
      .item-content {
        .item-image {
          filter: grayscale(100%);
        }
      }
    }
    
    .checkbox-wrapper {
      padding: 0 10rpx;
      width: 60rpx;
      min-width: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      
      .inactive-icon {
        font-size: 20rpx;
        color: #999;
        background-color: #eee;
        padding: 4rpx 8rpx;
        border-radius: 4rpx;
      }
    }
    
    .item-content {
      flex: 1;
      display: flex;
      margin-right: 20rpx;
      
      .item-image {
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;
        
        image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
      }
      
      .item-info {
        flex: 1;
        
        .item-title {
          font-size: 28rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .item-type {
          font-size: 24rpx;
          color: #FF6B00;
          background-color: rgba(255, 107, 0, 0.1);
          padding: 6rpx 12rpx;
          border-radius: 4rpx;
          display: inline-block;
          margin-bottom: 10rpx;
        }
        
        .item-price {
          font-size: 32rpx;
          color: #FF3B30;
          font-weight: bold;
          margin: 10rpx 0;
        }
        
        .item-time {
          font-size: 22rpx;
          color: #999;
        }
      }
    }
    
    .item-action {
      .action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        &.delete-btn {
          color: #FF3B30;
        }
        
        &.book-btn {
          padding: 12rpx 24rpx;
          background-color: #FF6B00;
          color: #fff;
          border-radius: 40rpx;
          font-size: 24rpx;
          border: none;
          line-height: 1.5;
          min-width: 140rpx;
          text-align: center;
        }
        
        .delete-text {
          font-size: 24rpx;
          margin-top: 8rpx;
        }
      }
    }
  }
}

.cart-footer {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  
  .select-all {
    flex: 1;
    display: flex;
    align-items: center;
    
    text {
      margin-left: 10rpx;
      font-size: 28rpx;
    }
  }
  
  .total-price {
    flex: 1;
    text-align: right;
    
    .price-value {
      font-size: 32rpx;
      font-weight: bold;
      color: #FF3B30;
    }
  }
  
  .checkout-btn {
    min-width: 240rpx;
    padding: 16rpx 30rpx;
    background-color: #FF6B00;
    color: #fff;
    border: none;
    border-radius: 40rpx;
    margin-left: 20rpx;
    font-size: 28rpx;
    
    &:disabled {
      background-color: #ccc;
    }
  }
}
</style> 