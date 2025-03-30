<template>
  <view class="container">
    <view class="header">
      <text class="title">课程教师关联管理</text>
    </view>
    
    <view class="form-group">
      <text class="label">操作模式：</text>
      <view class="radio-group">
        <radio-group @change="onModeChange">
          <label class="radio-item">
            <radio value="batch" :checked="mode === 'batch'" />
            <text>批量更新</text>
          </label>
          <label class="radio-item">
            <radio value="single" :checked="mode === 'single'" />
            <text>单个更新</text>
          </label>
        </radio-group>
      </view>
    </view>
    
    <!-- 单个课程更新表单 -->
    <block v-if="mode === 'single'">
      <view class="form-group">
        <text class="label">选择课程：</text>
        <picker @change="onCourseChange" :value="courseIndex" :range="courseOptions" range-key="label">
          <view class="picker-item">
            <text v-if="selectedCourse">{{ selectedCourse.label }}</text>
            <text v-else class="placeholder">请选择课程</text>
          </view>
        </picker>
      </view>
      
      <view class="form-group">
        <text class="label">选择教师：</text>
        <picker @change="onTeacherChange" :value="teacherIndex" :range="teacherOptions" range-key="label">
          <view class="picker-item">
            <text v-if="selectedTeacher">{{ selectedTeacher.label }}</text>
            <text v-else class="placeholder">请选择教师</text>
          </view>
        </picker>
      </view>
      
      <view class="form-group">
        <text class="label">当前关联信息：</text>
        <view class="info-card">
          <view class="info-item" v-if="selectedCourse">
            <text class="info-label">课程：</text>
            <text class="info-value">{{ selectedCourse.label }}</text>
          </view>
          <view class="info-item" v-if="selectedCourse && selectedCourse.teacherId">
            <text class="info-label">当前教师ID：</text>
            <text class="info-value">{{ selectedCourse.teacherId || '未设置' }}</text>
          </view>
          <view class="info-item" v-if="selectedCourse && selectedCourse.teacherName">
            <text class="info-label">当前教师名称：</text>
            <text class="info-value">{{ selectedCourse.teacherName || '未设置' }}</text>
          </view>
          <view class="info-item" v-if="selectedTeacher">
            <text class="info-label">将要关联的教师：</text>
            <text class="info-value">{{ selectedTeacher.label }}</text>
          </view>
        </view>
      </view>
      
      <button class="submit-btn" @click="updateSingleCourse" :disabled="!selectedCourse || !selectedTeacher">更新关联关系</button>
    </block>
    
    <!-- 批量更新表单 -->
    <block v-if="mode === 'batch'">
      <view class="form-group">
        <text class="tips">批量更新会自动查找所有有教师姓名但没有设置教师ID的课程，尝试匹配并更新。</text>
      </view>
      
      <view class="info-card">
        <view class="info-item">
          <text class="info-label">待更新课程数：</text>
          <text class="info-value">{{ pendingCoursesCount }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">教师总数：</text>
          <text class="info-value">{{ teacherOptions.length }}</text>
        </view>
      </view>
      
      <button class="submit-btn" @click="runBatchUpdate">执行批量更新</button>
    </block>
    
    <!-- 更新结果 -->
    <view class="result-section" v-if="updateResult">
      <view class="section-title">更新结果</view>
      <view class="result-card">
        <view class="result-item">
          <text class="result-label">总数：</text>
          <text class="result-value">{{ updateResult.total || 0 }}</text>
        </view>
        <view class="result-item">
          <text class="result-label">成功：</text>
          <text class="result-value success">{{ updateResult.success || 0 }}</text>
        </view>
        <view class="result-item" v-if="updateResult.failed">
          <text class="result-label">失败：</text>
          <text class="result-value failed">{{ updateResult.failed || 0 }}</text>
        </view>
        <view class="result-message" v-if="updateResult.message">
          <text>{{ updateResult.message }}</text>
        </view>
      </view>
    </view>
    
    <!-- 结果详情 -->
    <view class="result-details" v-if="updateResult && updateResult.results && updateResult.results.length > 0">
      <view class="section-title">详细结果</view>
      <view class="result-list">
        <view 
          class="result-list-item" 
          v-for="(item, index) in updateResult.results" 
          :key="index"
          :class="{ 'success': item.success, 'failed': !item.success }"
        >
          <view class="result-list-title">{{ item.title || '未知课程' }}</view>
          <view class="result-list-detail">
            <text>教师: {{ item.teacherName }}</text>
            <text v-if="item.success"> → ID: {{ item.teacherId }}</text>
            <text v-else class="error-text"> → {{ item.error }}</text>
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
      mode: 'batch', // 默认模式：batch 批量更新 | single 单个更新
      courses: [], // 所有课程
      teachers: [], // 所有教师
      courseOptions: [], // 课程选择项
      teacherOptions: [], // 教师选择项
      courseIndex: -1, // 选中的课程索引
      teacherIndex: -1, // 选中的教师索引
      selectedCourse: null, // 当前选中的课程
      selectedTeacher: null, // 当前选中的教师
      pendingCoursesCount: 0, // 待更新的课程数量
      updateResult: null, // 更新结果
      loading: false // 加载状态
    }
  },
  onLoad() {
    this.loadData();
  },
  methods: {
    // 加载数据
    async loadData() {
      uni.showLoading({
        title: '加载中...'
      });
      
      try {
        // 加载所有课程
        const coursesResult = await this.$api.course.getCourseList();
        if (coursesResult && coursesResult.data) {
          this.courses = coursesResult.data;
          
          // 格式化课程选项
          this.courseOptions = this.courses.map(course => ({
            id: course._id,
            label: course.title,
            teacherId: course.teacherId,
            teacherName: course.teacherName
          }));
          
          // 计算待更新课程数
          this.pendingCoursesCount = this.courses.filter(course => 
            course.teacherName && (!course.teacherId || course.teacherId === '')
          ).length;
        }
        
        // 加载所有教师
        const teachersResult = await this.$api.teacher.getTeacherList();
        if (teachersResult && teachersResult.data) {
          this.teachers = teachersResult.data;
          
          // 格式化教师选项
          this.teacherOptions = this.teachers.map(teacher => ({
            id: teacher._id,
            label: `${teacher.name}${teacher.title ? ' (' + teacher.title + ')' : ''}`,
            name: teacher.name,
            title: teacher.title
          }));
        }
        
        uni.hideLoading();
      } catch (error) {
        console.error('加载数据失败:', error);
        uni.hideLoading();
        uni.showToast({
          title: '加载数据失败',
          icon: 'none'
        });
      }
    },
    
    // 模式切换
    onModeChange(e) {
      this.mode = e.detail.value;
      console.log('切换模式:', this.mode);
      
      // 重置选择和结果
      this.courseIndex = -1;
      this.teacherIndex = -1;
      this.selectedCourse = null;
      this.selectedTeacher = null;
      this.updateResult = null;
    },
    
    // 课程选择变更
    onCourseChange(e) {
      this.courseIndex = e.detail.value;
      this.selectedCourse = this.courseOptions[this.courseIndex];
      console.log('选择课程:', this.selectedCourse);
      
      // 重置结果
      this.updateResult = null;
    },
    
    // 教师选择变更
    onTeacherChange(e) {
      this.teacherIndex = e.detail.value;
      this.selectedTeacher = this.teacherOptions[this.teacherIndex];
      console.log('选择教师:', this.selectedTeacher);
      
      // 重置结果
      this.updateResult = null;
    },
    
    // 单个课程更新
    async updateSingleCourse() {
      if (!this.selectedCourse || !this.selectedTeacher) {
        uni.showToast({
          title: '请选择课程和教师',
          icon: 'none'
        });
        return;
      }
      
      this.loading = true;
      uni.showLoading({
        title: '更新中...'
      });
      
      try {
        // 调用云函数更新课程的teacherId
        const result = await uniCloud.callFunction({
          name: 'updateCourseTeacher',
          data: {
            courseId: this.selectedCourse.id,
            teacherId: this.selectedTeacher.id
          }
        });
        
        console.log('更新结果:', result);
        
        uni.hideLoading();
        this.loading = false;
        
        if (result.result && result.result.success) {
          // 显示成功消息
          uni.showToast({
            title: '更新成功',
            icon: 'success'
          });
          
          // 保存更新结果
          this.updateResult = {
            total: 1,
            success: 1,
            failed: 0,
            message: '成功更新课程教师关联',
            results: [{
              courseId: this.selectedCourse.id,
              title: this.selectedCourse.label,
              teacherName: this.selectedTeacher.name || this.selectedTeacher.label,
              teacherId: this.selectedTeacher.id,
              success: true
            }]
          };
          
          // 重新加载数据
          setTimeout(() => {
            this.loadData();
          }, 1000);
        } else {
          // 显示失败消息
          uni.showToast({
            title: result.result.message || '更新失败',
            icon: 'none'
          });
          
          // 保存更新结果
          this.updateResult = {
            total: 1,
            success: 0,
            failed: 1,
            message: result.result.message || '更新失败',
            results: [{
              courseId: this.selectedCourse.id,
              title: this.selectedCourse.label,
              teacherName: this.selectedTeacher.name || this.selectedTeacher.label,
              error: result.result.message || '未知错误',
              success: false
            }]
          };
        }
      } catch (error) {
        console.error('更新失败:', error);
        uni.hideLoading();
        this.loading = false;
        
        uni.showToast({
          title: '更新失败',
          icon: 'none'
        });
        
        // 保存更新结果
        this.updateResult = {
          total: 1,
          success: 0,
          failed: 1,
          message: error.message || '更新失败',
          results: [{
            courseId: this.selectedCourse.id,
            title: this.selectedCourse.label,
            teacherName: this.selectedTeacher.name || this.selectedTeacher.label,
            error: error.message || '未知错误',
            success: false
          }]
        };
      }
    },
    
    // 批量更新
    async runBatchUpdate() {
      this.loading = true;
      uni.showLoading({
        title: '批量更新中...'
      });
      
      try {
        // 调用云函数执行批量更新
        const result = await uniCloud.callFunction({
          name: 'updateCourseTeacher',
          data: {} // 空参数表示执行批量更新
        });
        
        console.log('批量更新结果:', result);
        
        uni.hideLoading();
        this.loading = false;
        
        if (result.result && result.result.success) {
          // 显示成功消息
          uni.showToast({
            title: result.result.message || '批量更新成功',
            icon: 'success'
          });
          
          // 保存更新结果
          this.updateResult = result.result.data || {
            total: 0,
            success: 0,
            failed: 0,
            message: result.result.message,
            results: []
          };
          
          // 重新加载数据
          setTimeout(() => {
            this.loadData();
          }, 1000);
        } else {
          // 显示失败消息
          uni.showToast({
            title: result.result.message || '批量更新失败',
            icon: 'none'
          });
          
          // 保存更新结果
          this.updateResult = {
            total: 0,
            success: 0,
            failed: 0,
            message: result.result.message || '批量更新失败',
            results: []
          };
        }
      } catch (error) {
        console.error('批量更新失败:', error);
        uni.hideLoading();
        this.loading = false;
        
        uni.showToast({
          title: '批量更新失败',
          icon: 'none'
        });
        
        // 保存更新结果
        this.updateResult = {
          total: 0,
          success: 0,
          failed: 0,
          message: error.message || '批量更新失败',
          results: []
        };
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.header {
  margin-bottom: 40rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.form-group {
  margin-bottom: 30rpx;
  
  .label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 10rpx;
    display: block;
  }
  
  .tips {
    font-size: 26rpx;
    color: #999;
    line-height: 1.5;
  }
  
  .radio-group {
    display: flex;
    flex-direction: row;
    
    .radio-item {
      margin-right: 30rpx;
      font-size: 28rpx;
      display: flex;
      align-items: center;
    }
  }
  
  .picker-item {
    background-color: #fff;
    border: 1px solid #eee;
    padding: 20rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    
    .placeholder {
      color: #999;
    }
  }
}

.info-card {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-top: 10rpx;
  
  .info-item {
    display: flex;
    margin-bottom: 16rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 200rpx;
      font-size: 26rpx;
      color: #666;
    }
    
    .info-value {
      flex: 1;
      font-size: 26rpx;
      color: #333;
    }
  }
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #007AFF;
  color: #fff;
  font-size: 30rpx;
  border-radius: 8rpx;
  margin-top: 20rpx;
  
  &:disabled {
    background-color: #ccc;
  }
}

.result-section {
  margin-top: 50rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.result-card {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 20rpx;
  
  .result-item {
    display: flex;
    margin-bottom: 16rpx;
    
    .result-label {
      width: 100rpx;
      font-size: 26rpx;
      color: #666;
    }
    
    .result-value {
      flex: 1;
      font-size: 26rpx;
      
      &.success {
        color: #4CD964;
        font-weight: bold;
      }
      
      &.failed {
        color: #FF3B30;
        font-weight: bold;
      }
    }
  }
  
  .result-message {
    margin-top: 16rpx;
    padding-top: 16rpx;
    border-top: 1px solid #eee;
    font-size: 26rpx;
    color: #666;
  }
}

.result-details {
  margin-top: 40rpx;
  
  .result-list {
    .result-list-item {
      background-color: #fff;
      border-radius: 8rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      border-left: 4rpx solid #ccc;
      
      &.success {
        border-left-color: #4CD964;
      }
      
      &.failed {
        border-left-color: #FF3B30;
      }
      
      .result-list-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
      }
      
      .result-list-detail {
        font-size: 26rpx;
        color: #666;
        display: flex;
        flex-direction: column;
        
        .error-text {
          color: #FF3B30;
        }
      }
    }
  }
}
</style> 