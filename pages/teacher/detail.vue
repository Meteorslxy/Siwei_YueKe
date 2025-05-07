<template>
  <view class="teacher-detail">
    <!-- 固定在右上角的收藏按钮 -->
    <view class="fixed-favorite-wrapper" :style="{top: statusBarHeight + 'px'}">
      <favorite-button 
        ref="favoriteBtn"
        :itemId="teacherId" 
        itemType="teacher" 
        :itemTitle="teacher.name" 
        :itemCover="teacher.avatar || '/static/image/teacher-avatar.png'"
        :initialFavorite="initialFavorite"
        @favorite-change="onFavoriteChange"
        @statusBarHeight="onStatusBarHeight"
      ></favorite-button>
    </view>
    
    <view class="teacher-header">
      <view class="avatar-container">
        <image class="teacher-avatar" :src="getImageUrl(teacher.avatarId || teacher.avatar)" mode="aspectFit"></image>
      </view>
      
      <view class="teacher-info">
        <view class="name-favorite">
          <view class="teacher-name">{{teacher.name}}</view>
          <!-- 注释掉原来的收藏按钮 -->
          <!-- <view class="header-favorite">
            <favorite-button 
              :itemId="teacherId" 
              itemType="teacher" 
              :itemTitle="teacher.name" 
              :itemCover="teacher.avatar || '/static/images/default-avatar.png'"
              @favorite-change="onFavoriteChange"
            ></favorite-button>
          </view> -->
        </view>
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
        <view class="intro-text">{{teacher.description || teacher.introduction || '暂无简介'}}</view>
        
        <view class="section-title">教学经历</view>
        <view class="experience-list">
          <!-- 使用计算属性或方法来处理复杂条件，避免在模板中使用typeof -->
          <view class="experience-item" v-if="hasArrayExperience">
            <view v-for="(item, idx) in teacher.experience" :key="idx" class="experience-desc">
              {{item}}
            </view>
          </view>
          <!-- 使用简单条件判断 -->
          <view class="experience-item" v-else-if="hasStringExperience">
            <view class="experience-desc">{{teacher.experience}}</view>
          </view>
          <!-- 如果有experiences数组，显示数组内容 -->
          <view class="experience-item" v-for="(item, index) in teacher.experiences || []" :key="'exp-'+index">
            <view class="experience-time">{{item.time}}</view>
            <view class="experience-desc">{{item.description}}</view>
          </view>
          <empty-tip v-if="showEmptyExperienceTip" tip="暂无教学经历" :show="true"></empty-tip>
        </view>
        
        <view class="section-title">所获奖项</view>
        <view class="awards-list">
          <view class="award-item" v-for="(item, index) in teacher.awards || []" :key="index">
            <view class="award-time">{{item.time}}</view>
            <view class="award-name">{{item.name}}</view>
          </view>
          <empty-tip v-if="showEmptyAwardsTip" tip="暂无获奖信息" :show="true"></empty-tip>
        </view>
      </view>
      
      <!-- 课程列表 -->
      <view v-if="currentTab === 1" class="course-container">
        <view v-if="hasCourses" class="course-list">
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
        <view v-if="hasReviews" class="review-list">
          <view class="review-item" v-for="(review, index) in reviewList" :key="review._id || index">
            <view class="review-header">
              <image class="reviewer-avatar" :src="review.avatar || '/static/image/teacher-avatar.png'" mode="aspectFill"></image>
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

    <!-- 移除底部横幅中的收藏按钮，使用顶部的收藏按钮 -->
    <view class="teacher-banner" v-if="false">
      <image class="banner-image" :src="'/static/images/banner-bg.jpg'" mode="aspectFill"></image>
      <view class="banner-overlay"></view>
    </view>
  </view>
</template>

<script>
// 引入收藏按钮组件
import FavoriteButton from '@/components/favorite-button/favorite-button.vue';

export default {
  components: {
    FavoriteButton
  },
  data() {
    return {
      teacherId: '',
      teacherName: '',
      teacher: {
        name: '',
        title: '',
        avatar: '',
        avatarId: '',
        introduction: '',
        description: '',
        experience: '',
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
      hasMoreReviews: true,
      imageCache: {},
      defaultAvatar: '/static/image/teacher-avatar.png',
      statusBarHeight: 90, // 默认状态栏高度（rpx单位）
      initialFavorite: false
    }
  },
  computed: {
    // 使用计算属性处理复杂条件判断
    hasArrayExperience() {
      return Array.isArray(this.teacher.experience) && this.teacher.experience.length > 0;
    },
    hasStringExperience() {
      return this.teacher.experience && typeof this.teacher.experience === 'string';
    },
    showEmptyExperienceTip() {
      if (Array.isArray(this.teacher.experience) && this.teacher.experience.length > 0) {
        return false;
      }
      if (this.teacher.experience && typeof this.teacher.experience === 'string') {
        return false;
      }
      if (this.teacher.experiences && this.teacher.experiences.length > 0) {
        return false;
      }
      return true;
    },
    showEmptyAwardsTip() {
      return !this.teacher.awards || this.teacher.awards.length === 0;
    },
    hasCourses() {
      return this.courseList && this.courseList.length > 0;
    },
    hasReviews() {
      return this.reviewList && this.reviewList.length > 0;
    }
  },
  onLoad(options) {
    console.log('教师详情页收到原始参数:', options);
    
    // 正确处理参数，确保对URL编码的值进行解码
    this.teacherId = options.id || '';
    
    // 解码教师名称参数
    if (options.name) {
      try {
        // 如果名称是URL编码的，先进行解码
        if (options.name.includes('%')) {
          this.teacherName = decodeURIComponent(options.name);
          console.log('解码后的教师名称:', this.teacherName);
        } else {
          this.teacherName = options.name;
        }
      } catch (e) {
        console.error('解码教师名称失败:', e);
        this.teacherName = options.name; // 使用原始值
      }
    } else {
      this.teacherName = '';
    }
    
    // 检查是否传入收藏状态
    this.initialFavorite = options.favorite === '1';
    if (this.initialFavorite) {
      console.log('教师已被收藏，初始化收藏状态为true');
      // 在DOM更新后，手动更新收藏按钮状态
      this.$nextTick(() => {
        // 获取收藏按钮组件实例
        const favoriteBtn = this.$refs.favoriteBtn;
        if (favoriteBtn) {
          favoriteBtn.updateFavoriteStatus(true);
        }
      });
    }
    
    console.log('处理后的参数: teacherId =', this.teacherId, 'teacherName =', this.teacherName, 'initialFavorite =', this.initialFavorite);
    
    // 需要至少有ID或名称之一
    if (this.teacherId || this.teacherName) {
      this.getTeacherDetail();
    } else {
      uni.showToast({
        title: '参数错误',
        icon: 'none'
      });
    }
  },
  methods: {
    // 获取教师详情
    getTeacherDetail() {
      uni.showLoading({ title: '加载中' });
      
      // 构建请求参数
      const params = {};
      
      // 对ID参数进行处理，确保格式正确
      if (this.teacherId) {
        // 处理可能被包裹在引号中的ID
        let validTeacherId = this.teacherId.trim();
        
        if (validTeacherId.startsWith('"') && validTeacherId.endsWith('"')) {
          validTeacherId = validTeacherId.substring(1, validTeacherId.length - 1);
          console.log('去除引号后的teacherId:', validTeacherId);
        }
        
        // 如果有效，添加到参数中
        if (validTeacherId) {
          params.id = validTeacherId;
          console.log('使用处理后的teacherId:', validTeacherId);
        }
      }
      
      // 对名称参数进行处理
      if (this.teacherName) {
        // 确保名称是已解码的
        params.name = this.teacherName.trim();
        console.log('使用教师名称:', params.name);
      }
      
      console.log('获取教师详情参数:', params);
      
      // 如果既没有ID也没有名称，显示错误
      if (!params.id && !params.name) {
        console.error('缺少有效参数，无法获取教师详情');
        uni.hideLoading();
        uni.showToast({
          title: '参数错误',
          icon: 'none'
        });
        return;
      }
      
      // 使用uniCloud调用云函数
      this.$api.teacher.getTeacherDetail(params).then(res => {
        if (res && res.data) {
          console.log('教师原始数据:', JSON.stringify(res.data));
          
          // 确保数据中有avatarId字段，如果没有尝试其他可能的字段名
          const teacherData = { ...this.teacher }; // 创建一个副本，包含默认值
          
          // 合并接口返回的数据
          Object.assign(teacherData, res.data);
          
          // 如果原本没有ID但现在获取到了，更新teacherId
          if (!this.teacherId && teacherData._id) {
            this.teacherId = teacherData._id;
            console.log('从教师数据中更新teacherId:', this.teacherId);
          }
          
          // 处理头像字段
          if (!teacherData.avatarId && teacherData.avatarID) {
            teacherData.avatarId = teacherData.avatarID;
          }
          if (!teacherData.avatarId && teacherData.avatar_id) {
            teacherData.avatarId = teacherData.avatar_id;
          }
          
          // 如果没有description字段，尝试使用introduction
          if (!teacherData.description && teacherData.introduction) {
            teacherData.description = teacherData.introduction;
          }
          
          // 确保awards是数组
          if (!teacherData.awards) {
            teacherData.awards = [];
          }
          
          this.teacher = teacherData;
          console.log('教师处理后数据:', this.teacher);
          console.log('头像ID:', this.teacher.avatarId);
          console.log('教师简介(description):', this.teacher.description);
          console.log('教学经历(experience):', this.teacher.experience);
          
          uni.setNavigationBarTitle({ title: this.teacher.name });
          
          // 预加载头像
          if (this.teacher.avatarId) {
            console.log('头像ID:', this.teacher.avatarId);
            // 不再调用preloadImage方法
          } else if (this.teacher.avatar) {
            console.log('头像URL:', this.teacher.avatar);
            // 不再调用preloadImage方法
          } else {
            console.log('教师没有头像数据');
          }
        } else {
          console.warn('API返回数据异常:', res);
          
          // 使用可用的信息显示基本内容
          if (this.teacherName) {
            this.teacher.name = this.teacherName;
            this.teacher.description = `暂时无法获取"${this.teacherName}"的详细信息，请稍后再试。`;
            uni.setNavigationBarTitle({ title: this.teacherName });
          }
          
          uni.showToast({
            title: '获取教师信息不完整',
            icon: 'none'
          });
        }
        uni.hideLoading();
        
        // 初始加载课程列表
        if (this.currentTab === 1) {
          this.getCourseList();
        } else if (this.currentTab === 2) {
          this.getReviewList();
        }
      }).catch(err => {
        console.error('获取教师详情失败', err);
        
        // 使用可用的信息显示基本内容
        if (this.teacherName) {
          this.teacher.name = this.teacherName;
          this.teacher.description = `暂时无法获取"${this.teacherName}"的详细信息，请稍后再试。`;
          uni.setNavigationBarTitle({ title: this.teacherName });
        }
        
        uni.showToast({
          title: '获取教师信息失败',
          icon: 'none'
        });
        uni.hideLoading();
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
        teacherId: this.teacherId // 确保传递教师ID参数
      };
      
      uni.showLoading({ title: '加载中' });
      
      console.log('获取教师课程，参数:', params);
      console.log('当前教师名称:', this.teacher.name);
      
      // 处理教师名称，去掉可能的"老师"后缀
      const teacherNameForMatch = this.teacher.name.replace(/老师$/, '');
      console.log('用于匹配的教师名称:', teacherNameForMatch);
      
      // 使用教师详情接口返回的课程数据
      if (this.teacher && this.teacher.courses && this.teacher.courses.length > 0) {
        console.log('使用教师详情中的课程数据，课程数量:', this.teacher.courses.length);
        // 筛选出当前教师的课程 - 通过teacherName匹配老师名称
        const filteredCourses = this.teacher.courses.filter(course => {
          // 检查课程的teacherName字段是否包含当前教师的名字
          return course.teacherName && 
                 (course.teacherName.includes(teacherNameForMatch) || 
                  (teacherNameForMatch.includes(course.teacherName)));
        });
        
        console.log('筛选后的教师课程数量:', filteredCourses.length);
        this.courseList = filteredCourses;
        this.hasMore = false; // 因为已经一次性获取了所有匹配的课程
        this.loadMoreStatus = 'noMore';
        this.loading = false;
        uni.hideLoading();
        return;
      }
      
      // 调用获取课程列表接口
      this.$api.course.getCourseList(params)
        .then(res => {
          const list = res.data || [];
          console.log('获取到课程列表原始数据:', list.length);
          
          // 筛选出当前教师的课程 - 通过teacherName匹配老师名称
          const filteredList = list.filter(course => {
            return course.teacherName && 
                   (course.teacherName.includes(teacherNameForMatch) || 
                    (teacherNameForMatch.includes(course.teacherName)));
          });
          
          console.log('筛选后的教师课程数量:', filteredList.length);
          
          if (this.page === 1) {
            this.courseList = filteredList;
          } else {
            this.courseList = [...this.courseList, ...filteredList];
          }
          
          // 根据筛选后的列表长度与原列表长度判断是否有更多数据
          // 如果筛选后的列表小于原列表，可能意味着有些课程被过滤掉了
          this.hasMore = list.length === this.pageSize && filteredList.length > 0;
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
      
      console.log('获取教师评价，参数:', params);
      
      // 检查 API 是否存在
      if (this.$api.teacher.getTeacherReviews) {
        // 使用 this.$api 接口
        this.$api.teacher.getTeacherReviews(params)
          .then(res => {
            const list = res.data || [];
            console.log('获取到教师评价列表:', list.length);
            
            if (this.reviewPage === 1) {
              this.reviewList = list;
            } else {
              this.reviewList = [...this.reviewList, ...list];
            }
            
            this.hasMoreReviews = list.length === this.pageSize;
            this.reviewLoadMoreStatus = this.hasMoreReviews ? 'more' : 'noMore';
          })
          .catch(err => {
            console.error('获取评价列表失败', err);
            this.handleReviewError();
          })
          .finally(() => {
            this.reviewLoading = false;
            uni.hideLoading();
          });
      } else {
        console.warn('教师评价接口未定义，使用空数据');
        this.handleReviewError();
        this.reviewLoading = false;
        uni.hideLoading();
      }
    },
    
    // 处理评价获取失败
    handleReviewError() {
      // 设置空数据
      if (this.reviewPage === 1) {
        this.reviewList = [];
      }
      
      uni.showToast({
        title: '暂无评价数据',
        icon: 'none'
      });
      
      this.hasMoreReviews = false;
      this.reviewLoadMoreStatus = 'noMore';
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
        url: `/pkgs/course/detail?id=${course._id}`
      });
    },
    
    // 预约课程
    bookCourse(course) {
      if (!course || !course._id) return;
      
      // 跳转到课程详情页面进行预约
      uni.navigateTo({
        url: `/pkgs/course/detail?id=${course._id}`
      });
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    },
    
    // 处理图片URL，确保正确加载
    getImageUrl(src) {
      if (!src) {
        console.log('使用默认头像');
        return this.defaultAvatar;
      }
      
      // 检查是否为完整URL（以http或https开头）
      if (src.startsWith('http://') || src.startsWith('https://')) {
        console.log('使用云存储URL作为头像:', src);
        return src;
      } 
      
      // 检查是否为本地路径（以/开头）
      if (src.startsWith('/')) {
        // 已经是本地路径，保持原样
        console.log('使用本地路径作为头像:', src);
        return src;
      } 
      
      // 其他情况，可能是相对路径
      console.log('转换为本地相对路径作为头像:', `/static/images/teacher/${src}`);
      return `/static/images/teacher/${src}`;
    },
    
    // 强制刷新图片（处理可能的缓存问题）
    refreshImage() {
      this.$forceUpdate();
    },
    
    // 收藏状态变更
    onFavoriteChange(isFavorite) {
      console.log('收藏状态变更:', isFavorite);
    },
    
    // 获取状态栏高度
    onStatusBarHeight(height) {
      // 状态栏高度 + 10px的间距
      this.statusBarHeight = height + 10;
      console.log('教师详情页设置状态栏高度:', this.statusBarHeight);
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
    padding: 30rpx;
    display: flex;
    background-color: #fff;
    
    .avatar-container {
      width: 160rpx;
      height: 160rpx;
      margin-right: 30rpx;
      border-radius: 50%;
      overflow: hidden;
      border: 6rpx solid rgba(236, 122, 73, 0.2);
      
      .teacher-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    
    .teacher-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      .name-favorite {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10rpx;
      }
      
      .teacher-name {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
      }
      
      .header-favorite {
        margin-right: 10rpx;
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
        line-height: 1.6;
        margin-bottom: 10rpx;
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

  .teacher-banner {
    height: 260rpx;
    position: relative;
    
    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
    }
  }
}

/* 固定在右上角的收藏按钮 */
.fixed-favorite-wrapper {
  position: fixed;
  right: 30rpx;
  z-index: 9999;
}
</style> 