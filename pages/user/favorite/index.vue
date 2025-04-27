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
        <view 
          class="favorite-item" 
          v-for="(item, index) in favoriteList" 
          :key="index"
        >
          <view class="checkbox-wrapper">
            <checkbox :checked="item.selected" color="#FF6B00" @tap.stop="toggleSelect(index)" />
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
              <view class="item-price">¥{{item.price || 0}}.00</view>
              <view class="item-time">{{formatDate(item.createTime)}}</view>
            </view>
          </view>
          
          <view class="item-action">
            <button class="action-btn book-btn" @click.stop="bookCourse(item)" v-if="!isManageMode">立即预约</button>
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
      isAllSelected: false // 是否全选
    }
  },
  computed: {
    // 选中的数量
    selectedCount() {
      return this.favoriteList.filter(item => item.selected).length;
    },
    // 计算总价
    totalPrice() {
      return this.favoriteList
        .filter(item => item.selected)
        .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
    }
  },
  onLoad() {
    this.getFavoriteList();
  },
  onPullDownRefresh() {
    this.refreshList();
  },
  methods: {
    // 切换标签
    switchTab(index) {
      if (this.currentTab === index) return;
      this.currentTab = index;
      this.refreshList();
    },
    
    // 刷新列表
    refreshList() {
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
        const userInfo = uni.getStorageSync('userInfo');
        if (!userInfo) {
          this.loading = false;
          this.loadMoreStatus = 'more';
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        
        // 安全地解析用户数据
        let userData;
        try {
          userData = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
        } catch (e) {
          console.error('解析用户数据失败:', e);
          userData = userInfo; // 如果解析失败，使用原始数据
        }
        
        // 获取用户ID，支持多种字段格式
        const userId = userData.userId || userData._id || userData.uid || 
                     (userData.userInfo && userData.userInfo._id) || 
                     (userData.userInfo && userData.userInfo.uid) || '';
                     
        // 检查用户ID
        if (!userId) {
          console.error('获取收藏列表失败: 无法获取用户ID', userData);
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
            
            // 如果价格为空，尝试获取课程信息
            if (!processedItem.price && processedItem.itemId && processedItem.itemType === 'course') {
              this.fetchCoursePrice(processedItem);
            }
            
            return processedItem;
          });
          
          if (this.page === 1) {
            this.favoriteList = processedList;
          } else {
            this.favoriteList = [...this.favoriteList, ...processedList];
          }
          
          this.hasMore = list.length === this.pageSize;
          this.loadMoreStatus = this.hasMore ? 'more' : 'noMore';
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
    async fetchCoursePrice(item) {
      try {
        // 调用获取课程详情的API
        const res = await this.$api.course.getCourseDetail(item.itemId);
        
        if (res && res.code === 0 && res.data) {
          const course = res.data;
          // 计算课时费和材料费的总和
          const classFee = parseFloat(course.classFee || 0);
          const materialFee = parseFloat(course.materialFee || 0);
          const totalPrice = classFee + materialFee;
          
          // 如果总价为0，则使用course.price
          item.price = totalPrice || course.price || 0;
          
          // 强制更新视图
          this.$forceUpdate();
        }
      } catch (error) {
        console.error('获取课程价格失败:', error);
      }
    },
    
    // 切换管理模式
    toggleManageMode() {
      this.isManageMode = !this.isManageMode;
    },
    
    // 切换选择状态
    toggleSelect(index) {
      this.favoriteList[index].selected = !this.favoriteList[index].selected;
      // 检查是否全选
      this.checkAllSelected();
    },
    
    // 切换全选状态
    toggleSelectAll() {
      this.isAllSelected = !this.isAllSelected;
      this.favoriteList.forEach(item => {
        item.selected = this.isAllSelected;
      });
    },
    
    // 检查是否全选
    checkAllSelected() {
      this.isAllSelected = this.favoriteList.length > 0 && 
                          this.favoriteList.every(item => item.selected);
    },
    
    // 立即预约单个课程
    bookCourse(item) {
      if (item.itemType !== 'course') {
        uni.showToast({
          title: '只能预约课程',
          icon: 'none'
        });
        return;
      }
      
      // 跳转到课程详情页面，并传递fromCart=true参数，表明是从收藏页面来的
      uni.navigateTo({
        url: `/pages/course/detail?id=${item.itemId}&fromCart=true`
      });
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
    batchBook() {
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
      
      // 跳转到第一个课程的详情页
      uni.navigateTo({
        url: `/pages/course/detail?id=${selectedCourses[0].itemId}`
      });
    },
    
    // 批量删除
    async batchDelete() {
      const selectedItems = this.favoriteList.filter(item => item.selected);
      
      if (selectedItems.length === 0) return;
      
      uni.showModal({
        title: '确认删除',
        content: `确定删除这${selectedItems.length}个项目吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({ title: '删除中' });
              
              for (const item of selectedItems) {
                await this.$api.user.removeFavorite({
                  id: item._id
                });
              }
              
              // 更新列表
              this.favoriteList = this.favoriteList.filter(item => !item.selected);
              
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              });
              
              // 如果列表为空，则刷新
              if (this.favoriteList.length === 0) {
                this.refreshList();
              }
            } catch (error) {
              console.error('批量删除失败:', error);
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
            url = `/pages/course/detail?id=${item.itemId}`;
            break;
          case 'lecture':
            url = `/pages/course/lecture-detail?id=${item.itemId}`;
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
    cancelFavorite(index) {
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
    
    .checkbox-wrapper {
      padding: 0 10rpx;
      width: 60rpx;
      min-width: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
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