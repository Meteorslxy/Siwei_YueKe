<template>
  <view class="admin-upload-page">
    <view class="header">
      <view class="title">内容管理系统</view>
      <view class="subtitle">上传并管理各类内容</view>
    </view>
    
    <view class="main-content">
      <view class="tab-header">
        <view 
          class="tab-item" 
          v-for="(tab, index) in tabs" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
        >
          {{ tab.name }}
        </view>
      </view>
      
      <view class="tab-content">
        <!-- 教师上传 -->
        <view class="content-section" v-if="currentTab === 0">
          <form @submit="submitTeacher">
            <view class="form-group">
              <view class="form-title">添加名师信息</view>
              
              <view class="form-item">
                <text class="label">姓名</text>
                <input class="input" type="text" v-model="teacherForm.name" placeholder="请输入教师姓名" />
              </view>
              
              <view class="form-item">
                <text class="label">职称</text>
                <input class="input" type="text" v-model="teacherForm.title" placeholder="请输入教师职称" />
              </view>
              
              <view class="form-item">
                <text class="label">科目</text>
                <input class="input" type="text" v-model="teacherForm.subject" placeholder="请输入教授科目" />
              </view>
              
              <view class="form-item">
                <text class="label">简介</text>
                <textarea class="textarea" v-model="teacherForm.description" placeholder="请输入教师简介" />
              </view>
              
              <view class="form-item">
                <text class="label">头像</text>
                <view class="image-uploader">
                  <image-upload v-model="teacherForm.avatarId" @success="onTeacherAvatarUpload" />
                </view>
              </view>
              
              <view class="form-footer">
                <button class="btn reset" @click.prevent="resetTeacherForm">重置</button>
                <button class="btn submit" form-type="submit">提交</button>
              </view>
            </view>
          </form>
        </view>
        
        <!-- 讲座上传 -->
        <view class="content-section" v-if="currentTab === 1">
          <form @submit="submitLecture">
            <view class="form-group">
              <view class="form-title">添加精彩讲座</view>
              
              <view class="form-item">
                <text class="label">讲座标题</text>
                <input class="input" type="text" v-model="lectureForm.title" placeholder="请输入讲座标题" />
              </view>
              
              <view class="form-item">
                <text class="label">主讲人</text>
                <input class="input" type="text" v-model="lectureForm.speaker" placeholder="请输入主讲人" />
              </view>
              
              <view class="form-item">
                <text class="label">地点</text>
                <input class="input" type="text" v-model="lectureForm.location" placeholder="请输入讲座地点" />
              </view>
              
              <view class="form-item">
                <text class="label">开始时间</text>
                <picker 
                  mode="datetime" 
                  @change="onLectureStartTimeChange" 
                  :value="lectureForm.startTime ? new Date(lectureForm.startTime).toISOString() : ''"
                >
                  <view class="picker-box">
                    {{ lectureForm.startTime ? formatDateTime(lectureForm.startTime) : '请选择开始时间' }}
                  </view>
                </picker>
              </view>
              
              <view class="form-item">
                <text class="label">结束时间</text>
                <picker 
                  mode="datetime" 
                  @change="onLectureEndTimeChange" 
                  :value="lectureForm.endTime ? new Date(lectureForm.endTime).toISOString() : ''"
                >
                  <view class="picker-box">
                    {{ lectureForm.endTime ? formatDateTime(lectureForm.endTime) : '请选择结束时间' }}
                  </view>
                </picker>
              </view>
              
              <view class="form-item">
                <text class="label">讲座内容</text>
                <textarea class="textarea" v-model="lectureForm.content" placeholder="请输入讲座内容简介" />
              </view>
              
              <view class="form-item">
                <text class="label">封面图片</text>
                <view class="image-uploader">
                  <image-upload v-model="lectureForm.coverId" @success="onLectureCoverUpload" />
                </view>
              </view>
              
              <view class="form-footer">
                <button class="btn reset" @click.prevent="resetLectureForm">重置</button>
                <button class="btn submit" form-type="submit">提交</button>
              </view>
            </view>
          </form>
        </view>
        
        <!-- 精选好课上传 -->
        <view class="content-section" v-if="currentTab === 2">
          <form @submit="submitCourse">
            <view class="form-group">
              <view class="form-title">添加精选好课</view>
              
              <view class="form-item">
                <text class="label">课程名称</text>
                <input class="input" type="text" v-model="courseForm.title" placeholder="请输入课程名称" />
              </view>
              
              <view class="form-item">
                <text class="label">课程分类</text>
                <input class="input" type="text" v-model="courseForm.category" placeholder="请输入课程分类" />
              </view>
              
              <view class="form-item">
                <text class="label">价格(元)</text>
                <input class="input" type="digit" v-model="courseForm.price" placeholder="请输入课程价格" />
              </view>
              
              <view class="form-item">
                <text class="label">上课地点</text>
                <input class="input" type="text" v-model="courseForm.location" placeholder="请输入上课地点" />
              </view>
              
              <view class="form-item">
                <text class="label">课程介绍</text>
                <textarea class="textarea" v-model="courseForm.description" placeholder="请输入课程介绍" />
              </view>
              
              <view class="form-item">
                <text class="label">授课教师</text>
                <input class="input" type="text" v-model="courseForm.teacher" placeholder="请输入授课教师" />
              </view>
              
              <view class="form-item">
                <text class="label">封面图片</text>
                <view class="image-uploader">
                  <image-upload v-model="courseForm.coverId" @success="onCourseCoverUpload" />
                </view>
              </view>
              
              <view class="form-footer">
                <button class="btn reset" @click.prevent="resetCourseForm">重置</button>
                <button class="btn submit" form-type="submit">提交</button>
              </view>
            </view>
          </form>
        </view>
        
        <!-- 新闻通告上传 -->
        <view class="content-section" v-if="currentTab === 3">
          <form @submit="submitNews">
            <view class="form-group">
              <view class="form-title">添加新闻通告</view>
              
              <view class="form-item">
                <text class="label">标题</text>
                <input class="input" type="text" v-model="newsForm.title" placeholder="请输入新闻标题" />
              </view>
              
              <view class="form-item">
                <text class="label">来源</text>
                <input class="input" type="text" v-model="newsForm.source" placeholder="请输入新闻来源" />
              </view>
              
              <view class="form-item">
                <text class="label">发布日期</text>
                <picker 
                  mode="date" 
                  @change="onNewsDateChange" 
                  :value="newsForm.date ? new Date(newsForm.date).toISOString().split('T')[0] : ''"
                >
                  <view class="picker-box">
                    {{ newsForm.date ? formatDate(newsForm.date) : '请选择发布日期' }}
                  </view>
                </picker>
              </view>
              
              <view class="form-item">
                <text class="label">内容</text>
                <textarea class="textarea" v-model="newsForm.content" placeholder="请输入新闻内容" />
              </view>
              
              <view class="form-item">
                <text class="label">封面图片</text>
                <view class="image-uploader">
                  <image-upload v-model="newsForm.coverId" @success="onNewsCoverUpload" />
                </view>
              </view>
              
              <view class="form-footer">
                <button class="btn reset" @click.prevent="resetNewsForm">重置</button>
                <button class="btn submit" form-type="submit">提交</button>
              </view>
            </view>
          </form>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ImageUpload from '../../../components/image-upload/image-upload.vue';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      currentTab: 0,
      tabs: [
        { name: '上传名师', value: 'teacher' },
        { name: '上传讲座', value: 'lecture' },
        { name: '上传精选好课', value: 'course' },
        { name: '上传新闻通告', value: 'news' }
      ],
      
      // 教师表单数据
      teacherForm: {
        name: '',
        title: '',
        subject: '',
        description: '',
        avatarId: '',
        avatar: ''
      },
      
      // 讲座表单数据
      lectureForm: {
        title: '',
        speaker: '',
        location: '',
        startTime: '',
        endTime: '',
        content: '',
        coverId: '',
        cover: ''
      },
      
      // 课程表单数据
      courseForm: {
        title: '',
        category: '',
        price: '',
        location: '',
        description: '',
        teacher: '',
        coverId: '',
        cover: ''
      },
      
      // 新闻表单数据
      newsForm: {
        title: '',
        source: '',
        date: '',
        content: '',
        coverId: '',
        cover: ''
      }
    }
  },
  onLoad(options) {
    // 根据传入的tab参数切换到对应的标签页
    if (options.tab) {
      const tabIndex = parseInt(options.tab);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < this.tabs.length) {
        this.currentTab = tabIndex;
      }
    }
    
    // 检查管理员登录状态
    const adminInfo = uni.getStorageSync('adminInfo');
    if (!adminInfo) {
      uni.redirectTo({
        url: '/pages/admin/login'
      });
      return;
    }
  },
  methods: {
    // 切换标签页
    switchTab(index) {
      this.currentTab = index;
    },
    
    // 格式化日期
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },
    
    // 格式化日期时间
    formatDateTime(timestamp) {
      const date = new Date(timestamp);
      return `${this.formatDate(timestamp)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    },
    
    // 教师头像上传成功
    async onTeacherAvatarUpload(result) {
      console.log('教师头像上传成功:', result);
      if (result && result._id) {
        try {
          const imageResult = await this.$api.file.getImage(result._id);
          if (imageResult && imageResult.success) {
            this.teacherForm.avatarId = result._id;
            this.teacherForm.avatar = `data:image/${imageResult.imageData.fileType};base64,${imageResult.imageData.base64Data}`;
          }
        } catch (error) {
          console.error('获取图片失败:', error);
        }
      }
    },
    
    // 讲座封面上传成功
    async onLectureCoverUpload(result) {
      console.log('讲座封面上传成功:', result);
      if (result && result._id) {
        try {
          const imageResult = await this.$api.file.getImage(result._id);
          if (imageResult && imageResult.success) {
            this.lectureForm.coverId = result._id;
            this.lectureForm.cover = `data:image/${imageResult.imageData.fileType};base64,${imageResult.imageData.base64Data}`;
          }
        } catch (error) {
          console.error('获取图片失败:', error);
        }
      }
    },
    
    // 课程封面上传成功
    async onCourseCoverUpload(result) {
      console.log('课程封面上传成功:', result);
      if (result && result._id) {
        try {
          const imageResult = await this.$api.file.getImage(result._id);
          if (imageResult && imageResult.success) {
            this.courseForm.coverId = result._id;
            this.courseForm.cover = `data:image/${imageResult.imageData.fileType};base64,${imageResult.imageData.base64Data}`;
          }
        } catch (error) {
          console.error('获取图片失败:', error);
        }
      }
    },
    
    // 新闻封面上传成功
    async onNewsCoverUpload(result) {
      console.log('新闻封面上传成功:', result);
      if (result && result._id) {
        try {
          const imageResult = await this.$api.file.getImage(result._id);
          if (imageResult && imageResult.success) {
            this.newsForm.coverId = result._id;
            this.newsForm.cover = `data:image/${imageResult.imageData.fileType};base64,${imageResult.imageData.base64Data}`;
          }
        } catch (error) {
          console.error('获取图片失败:', error);
        }
      }
    },
    
    // 讲座开始时间变化
    onLectureStartTimeChange(e) {
      this.lectureForm.startTime = new Date(e.detail.value).getTime();
    },
    
    // 讲座结束时间变化
    onLectureEndTimeChange(e) {
      this.lectureForm.endTime = new Date(e.detail.value).getTime();
    },
    
    // 新闻日期变化
    onNewsDateChange(e) {
      this.newsForm.date = new Date(e.detail.value).getTime();
    },
    
    // 提交教师表单
    async submitTeacher() {
      try {
        if (!this.validateTeacherForm()) {
          return;
        }
        
        uni.showLoading({ title: '提交中...' });
        
        // 准备提交数据
        const teacherData = {
          ...this.teacherForm,
          createTime: Date.now(),
          updateTime: Date.now()
        };
        
        // 调用云函数上传教师信息
        const result = await this.$api.admin.uploadContent({
          type: 'teacher',
          data: teacherData
        });
        
        if (result && result.success) {
          uni.showToast({
            title: '教师信息提交成功',
            icon: 'success'
          });
          this.resetTeacherForm();
        } else {
          throw new Error(result.message || '提交失败');
        }
      } catch (error) {
        console.error('提交教师信息失败:', error);
        uni.showToast({
          title: error.message || '提交失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 提交讲座表单
    async submitLecture() {
      try {
        if (!this.validateLectureForm()) {
          return;
        }
        
        uni.showLoading({ title: '提交中...' });
        
        // 准备提交数据
        const lectureData = {
          ...this.lectureForm,
          createTime: Date.now(),
          updateTime: Date.now()
        };
        
        // 调用云函数上传讲座信息
        const result = await this.$api.admin.uploadContent({
          type: 'lecture',
          data: lectureData
        });
        
        if (result && result.success) {
          uni.showToast({
            title: '讲座信息提交成功',
            icon: 'success'
          });
          this.resetLectureForm();
        } else {
          throw new Error(result.message || '提交失败');
        }
      } catch (error) {
        console.error('提交讲座信息失败:', error);
        uni.showToast({
          title: error.message || '提交失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 提交课程表单
    async submitCourse() {
      try {
        if (!this.validateCourseForm()) {
          return;
        }
        
        uni.showLoading({ title: '提交中...' });
        
        // 准备提交数据
        const courseData = {
          ...this.courseForm,
          createTime: Date.now(),
          updateTime: Date.now()
        };
        
        // 调用云函数上传课程信息
        const result = await this.$api.admin.uploadContent({
          type: 'course',
          data: courseData
        });
        
        if (result && result.success) {
          uni.showToast({
            title: '课程信息提交成功',
            icon: 'success'
          });
          this.resetCourseForm();
        } else {
          throw new Error(result.message || '提交失败');
        }
      } catch (error) {
        console.error('提交课程信息失败:', error);
        uni.showToast({
          title: error.message || '提交失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 提交新闻表单
    async submitNews() {
      try {
        if (!this.validateNewsForm()) {
          return;
        }
        
        uni.showLoading({ title: '提交中...' });
        
        // 准备提交数据
        const newsData = {
          ...this.newsForm,
          createTime: Date.now(),
          updateTime: Date.now()
        };
        
        // 调用云函数上传新闻信息
        const result = await this.$api.admin.uploadContent({
          type: 'news',
          data: newsData
        });
        
        if (result && result.success) {
          uni.showToast({
            title: '新闻信息提交成功',
            icon: 'success'
          });
          this.resetNewsForm();
        } else {
          throw new Error(result.message || '提交失败');
        }
      } catch (error) {
        console.error('提交新闻信息失败:', error);
        uni.showToast({
          title: error.message || '提交失败，请重试',
          icon: 'none'
        });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 验证教师表单
    validateTeacherForm() {
      if (!this.teacherForm.name) {
        uni.showToast({ title: '请输入教师姓名', icon: 'none' });
        return false;
      }
      if (!this.teacherForm.title) {
        uni.showToast({ title: '请输入教师职称', icon: 'none' });
        return false;
      }
      if (!this.teacherForm.subject) {
        uni.showToast({ title: '请输入教授科目', icon: 'none' });
        return false;
      }
      if (!this.teacherForm.description) {
        uni.showToast({ title: '请输入教师简介', icon: 'none' });
        return false;
      }
      if (!this.teacherForm.avatarId) {
        uni.showToast({ title: '请上传教师头像', icon: 'none' });
        return false;
      }
      return true;
    },
    
    // 验证讲座表单
    validateLectureForm() {
      if (!this.lectureForm.title) {
        uni.showToast({ title: '请输入讲座标题', icon: 'none' });
        return false;
      }
      if (!this.lectureForm.speaker) {
        uni.showToast({ title: '请输入主讲人', icon: 'none' });
        return false;
      }
      if (!this.lectureForm.location) {
        uni.showToast({ title: '请输入讲座地点', icon: 'none' });
        return false;
      }
      if (!this.lectureForm.startTime) {
        uni.showToast({ title: '请选择开始时间', icon: 'none' });
        return false;
      }
      if (!this.lectureForm.endTime) {
        uni.showToast({ title: '请选择结束时间', icon: 'none' });
        return false;
      }
      if (this.lectureForm.startTime >= this.lectureForm.endTime) {
        uni.showToast({ title: '结束时间必须晚于开始时间', icon: 'none' });
        return false;
      }
      if (!this.lectureForm.content) {
        uni.showToast({ title: '请输入讲座内容', icon: 'none' });
        return false;
      }
      if (!this.lectureForm.coverId) {
        uni.showToast({ title: '请上传讲座封面', icon: 'none' });
        return false;
      }
      return true;
    },
    
    // 验证课程表单
    validateCourseForm() {
      if (!this.courseForm.title) {
        uni.showToast({ title: '请输入课程名称', icon: 'none' });
        return false;
      }
      if (!this.courseForm.category) {
        uni.showToast({ title: '请输入课程分类', icon: 'none' });
        return false;
      }
      if (!this.courseForm.price) {
        uni.showToast({ title: '请输入课程价格', icon: 'none' });
        return false;
      }
      if (isNaN(Number(this.courseForm.price)) || Number(this.courseForm.price) < 0) {
        uni.showToast({ title: '课程价格必须是大于等于0的数字', icon: 'none' });
        return false;
      }
      if (!this.courseForm.location) {
        uni.showToast({ title: '请输入上课地点', icon: 'none' });
        return false;
      }
      if (!this.courseForm.description) {
        uni.showToast({ title: '请输入课程介绍', icon: 'none' });
        return false;
      }
      if (!this.courseForm.teacher) {
        uni.showToast({ title: '请输入授课教师', icon: 'none' });
        return false;
      }
      if (!this.courseForm.coverId) {
        uni.showToast({ title: '请上传课程封面', icon: 'none' });
        return false;
      }
      return true;
    },
    
    // 验证新闻表单
    validateNewsForm() {
      if (!this.newsForm.title) {
        uni.showToast({ title: '请输入新闻标题', icon: 'none' });
        return false;
      }
      if (!this.newsForm.source) {
        uni.showToast({ title: '请输入新闻来源', icon: 'none' });
        return false;
      }
      if (!this.newsForm.date) {
        uni.showToast({ title: '请选择发布日期', icon: 'none' });
        return false;
      }
      if (!this.newsForm.content) {
        uni.showToast({ title: '请输入新闻内容', icon: 'none' });
        return false;
      }
      if (!this.newsForm.coverId) {
        uni.showToast({ title: '请上传新闻封面', icon: 'none' });
        return false;
      }
      return true;
    },
    
    // 重置教师表单
    resetTeacherForm() {
      this.teacherForm = {
        name: '',
        title: '',
        subject: '',
        description: '',
        avatarId: '',
        avatar: ''
      };
    },
    
    // 重置讲座表单
    resetLectureForm() {
      this.lectureForm = {
        title: '',
        speaker: '',
        location: '',
        startTime: '',
        endTime: '',
        content: '',
        coverId: '',
        cover: ''
      };
    },
    
    // 重置课程表单
    resetCourseForm() {
      this.courseForm = {
        title: '',
        category: '',
        price: '',
        location: '',
        description: '',
        teacher: '',
        coverId: '',
        cover: ''
      };
    },
    
    // 重置新闻表单
    resetNewsForm() {
      this.newsForm = {
        title: '',
        source: '',
        date: '',
        content: '',
        coverId: '',
        cover: ''
      };
    }
  }
}
</script>

<style lang="scss">
.admin-upload-page {
  padding: 30rpx;
  background-color: #f7f7f7;
  min-height: 100vh;
  
  .header {
    margin-bottom: 30rpx;
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
    
    .subtitle {
      font-size: 28rpx;
      color: #666;
      margin-top: 10rpx;
    }
  }
  
  .main-content {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .tab-header {
      display: flex;
      border-bottom: 1px solid #eee;
      
      .tab-item {
        padding: 20rpx 30rpx;
        font-size: 28rpx;
        color: #666;
        position: relative;
        
        &.active {
          color: #FF6B00;
          font-weight: bold;
          
          &:after {
            content: '';
            position: absolute;
            left: 30rpx;
            right: 30rpx;
            bottom: -1px;
            height: 4rpx;
            background-color: #FF6B00;
            border-radius: 2rpx;
          }
        }
      }
    }
    
    .tab-content {
      padding: 30rpx 0;
      
      .content-section {
        padding: 0 20rpx;
      }
      
      .form-group {
        .form-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 30rpx;
          padding-left: 20rpx;
          border-left: 6rpx solid #FF6B00;
        }
        
        .form-item {
          margin-bottom: 30rpx;
          
          .label {
            display: block;
            font-size: 28rpx;
            color: #333;
            margin-bottom: 10rpx;
          }
          
          .input, .textarea, .picker-box {
            width: 100%;
            background-color: #f9f9f9;
            border: 1px solid #eee;
            border-radius: 8rpx;
            padding: 16rpx 20rpx;
            font-size: 28rpx;
            color: #333;
            box-sizing: border-box;
          }
          
          .textarea {
            height: 200rpx;
          }
          
          .picker-box {
            color: #666;
          }
          
          .image-uploader {
            margin-top: 10rpx;
          }
        }
        
        .form-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 50rpx;
          
          .btn {
            flex: 1;
            height: 80rpx;
            line-height: 80rpx;
            border-radius: 40rpx;
            font-size: 28rpx;
            margin: 0 20rpx;
            
            &.reset {
              background-color: #f5f5f5;
              color: #666;
            }
            
            &.submit {
              background-color: #FF6B00;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style> 