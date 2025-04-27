<template>
  <view class="schedule-container">
    <!-- 日期选择器 -->
    <view class="date-picker">
      <view class="picker-title">
        <text>{{ currentYear }}年{{ currentMonth }}月</text>
        <view class="date-actions">
          <text class="prev-btn" @click="prevMonth">上月</text>
          <text class="today-btn" @click="goToday">今天</text>
          <text class="next-btn" @click="nextMonth">下月</text>
        </view>
      </view>
      <view class="week-header">
        <text v-for="(item, index) in weekDays" :key="index">{{ item }}</text>
      </view>
      <view class="days-grid">
        <view 
          class="day-cell" 
          v-for="(day, index) in daysArray" 
          :key="index"
          :class="{ 
            other: day.other, 
            today: day.isToday,
            active: isActiveDay(day)
          }"
          @click="selectDay(day)">
          <text class="day-num">{{ day.day }}</text>
          <view class="day-marker" v-if="day.hasSchedule"></view>
        </view>
      </view>
    </view>
    
    <!-- 当日课程列表 -->
    <view class="schedule-list">
      <view class="day-title">
        {{ formatDay(selectedDay) }} 的课程
      </view>
      
      <view v-if="scheduleList.length > 0">
        <view 
          class="schedule-item" 
          v-for="(item, index) in scheduleList" 
          :key="index"
          @click="navigateTo(`/pages/course/detail?id=${item.courseId}`)">
          <view class="time-box">
            <text class="time">{{ item.startTime }} - {{ item.endTime }}</text>
          </view>
          <view class="content-box">
            <view class="course-name">{{ item.courseName }}</view>
            <view class="info-row">
              <text class="teacher">{{ item.teacher }}</text>
              <text class="location">{{ item.location }}</text>
            </view>
            <view class="status-box" :class="{
              'status-upcoming': item.status === 'upcoming',
              'status-ongoing': item.status === 'ongoing',
              'status-completed': item.status === 'completed',
              'status-cancelled': item.status === 'cancelled'
            }">
              {{ getStatusText(item.status) }}
            </view>
          </view>
        </view>
      </view>
      
      <empty-tip v-else tip="今日暂无课程安排~"></empty-tip>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      weekDays: ['日', '一', '二', '三', '四', '五', '六'],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      selectedDay: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      },
      daysArray: [],
      scheduleList: []
    }
  },
  onLoad() {
    this.initCalendar()
    this.fetchScheduleData()
  },
  methods: {
    // 初始化日历
    initCalendar() {
      const year = this.currentYear
      const month = this.currentMonth
      
      const firstDay = new Date(year, month - 1, 1)
      const lastDay = new Date(year, month, 0)
      
      const daysInMonth = lastDay.getDate()
      const firstDayWeek = firstDay.getDay()
      
      let days = []
      
      // 获取上个月的最后几天
      if (firstDayWeek > 0) {
        const prevMonthLastDay = new Date(year, month - 1, 0).getDate()
        for (let i = prevMonthLastDay - firstDayWeek + 1; i <= prevMonthLastDay; i++) {
          days.push({
            day: i,
            month: month - 1,
            year: month === 1 ? year - 1 : year,
            other: true,
            isToday: false,
            hasSchedule: false
          })
        }
      }
      
      // 获取当前月的天数
      const today = new Date()
      for (let i = 1; i <= daysInMonth; i++) {
        const isToday = year === today.getFullYear() && month === today.getMonth() + 1 && i === today.getDate()
        days.push({
          day: i,
          month: month,
          year: year,
          other: false,
          isToday: isToday,
          hasSchedule: this.checkHasSchedule(year, month, i)
        })
      }
      
      // 获取下个月的前几天，补满6行
      const daysNeeded = 42 - days.length
      if (daysNeeded > 0) {
        for (let i = 1; i <= daysNeeded; i++) {
          days.push({
            day: i,
            month: month + 1,
            year: month === 12 ? year + 1 : year,
            other: true,
            isToday: false,
            hasSchedule: false
          })
        }
      }
      
      this.daysArray = days
    },
    // 检查该日期是否有课程安排
    checkHasSchedule(year, month, day) {
      // TODO: 实际应该根据课程数据判断
      // 这里简单模拟一些日期有课程
      return Math.random() > 0.7
    },
    // 获取当天的课程数据
    fetchScheduleData() {
      // 模拟数据，实际应该从API获取
      const { year, month, day } = this.selectedDay
      
      // 模拟请求延迟
      setTimeout(() => {
        if (this.checkHasSchedule(year, month, day)) {
          this.scheduleList = [
            {
              id: '1',
              courseId: '101',
              courseName: '钢琴入门课程',
              teacher: '李老师',
              startTime: '10:00',
              endTime: '11:30',
              location: 'A栋 303教室',
              status: 'upcoming' // upcoming, ongoing, completed, cancelled
            },
            {
              id: '2',
              courseId: '102',
              courseName: '声乐训练课',
              teacher: '张老师',
              startTime: '14:00',
              endTime: '15:30',
              location: 'B栋 音乐厅',
              status: 'completed'
            }
          ]
        } else {
          this.scheduleList = []
        }
      }, 300)
    },
    // 前一个月
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentYear--
        this.currentMonth = 12
      } else {
        this.currentMonth--
      }
      this.initCalendar()
    },
    // 下一个月
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentYear++
        this.currentMonth = 1
      } else {
        this.currentMonth++
      }
      this.initCalendar()
    },
    // 回到今天
    goToday() {
      const today = new Date()
      this.currentYear = today.getFullYear()
      this.currentMonth = today.getMonth() + 1
      this.selectedDay = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      }
      this.initCalendar()
      this.fetchScheduleData()
    },
    // 选择日期
    selectDay(day) {
      if (day.other) {
        // 如果点击的是其他月份的天数，则切换到对应月份
        this.currentYear = day.year
        this.currentMonth = day.month
        this.initCalendar()
      }
      
      this.selectedDay = {
        year: day.year,
        month: day.month,
        day: day.day
      }
      
      this.fetchScheduleData()
    },
    // 判断是否是当前选中的日期
    isActiveDay(day) {
      const { year, month, day: dayNum } = this.selectedDay
      return day.year === year && day.month === month && day.day === dayNum
    },
    // 格式化显示日期
    formatDay(day) {
      return `${day.month}月${day.day}日 ${this.weekDays[new Date(day.year, day.month - 1, day.day).getDay()]}`
    },
    // 获取课程状态文字
    getStatusText(status) {
      switch (status) {
        case 'upcoming':
          return '待上课'
        case 'ongoing':
          return '上课中'
        case 'completed':
          return '已完成'
        case 'cancelled':
          return '已取消'
        default:
          return ''
      }
    },
    // 页面跳转
    navigateTo(url) {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss">
.schedule-container {
  min-height: 100vh;
  background-color: $bg-color;
}

.date-picker {
  background-color: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  
  .picker-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $font-size-base;
    color: $text-color;
    font-weight: bold;
    margin-bottom: 30rpx;
    
    .date-actions {
      display: flex;
      align-items: center;
      
      .prev-btn, .next-btn, .today-btn {
        font-size: $font-size-sm;
        color: $text-color-grey;
        padding: 0 16rpx;
      }
      
      .today-btn {
        color: $theme-color;
      }
    }
  }
  
  .week-header {
    display: flex;
    width: 100%;
    margin-bottom: 20rpx;
    
    text {
      flex: 1;
      text-align: center;
      font-size: $font-size-sm;
      color: $text-color-grey;
    }
  }
  
  .days-grid {
    display: flex;
    flex-wrap: wrap;
    
    .day-cell {
      width: 14.28%;
      height: 100rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      
      .day-num {
        font-size: $font-size-base;
        color: $text-color;
      }
      
      .day-marker {
        width: 8rpx;
        height: 8rpx;
        border-radius: 50%;
        background-color: $theme-color;
        margin-top: 8rpx;
      }
      
      &.other {
        .day-num {
          color: $text-color-light;
        }
      }
      
      &.today {
        .day-num {
          color: $theme-color;
          font-weight: bold;
        }
      }
      
      &.active {
        .day-num {
          background-color: $theme-color;
          color: #fff;
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          border-radius: 50%;
        }
      }
    }
  }
}

.schedule-list {
  background-color: #fff;
  padding: 20rpx;
  
  .day-title {
    font-size: $font-size-lg;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 30rpx;
  }
  
  .schedule-item {
    display: flex;
    margin-bottom: 30rpx;
    background-color: $bg-color-white;
    border-radius: $border-radius-lg;
    padding: 20rpx;
    box-shadow: $box-shadow;
    
    .time-box {
      width: 160rpx;
      
      .time {
        font-size: $font-size-sm;
        color: $text-color-grey;
        white-space: nowrap;
      }
    }
    
    .content-box {
      flex: 1;
      
      .course-name {
        font-size: $font-size-base;
        font-weight: bold;
        color: $text-color;
        margin-bottom: 10rpx;
      }
      
      .info-row {
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;
        
        .teacher, .location {
          font-size: $font-size-sm;
          color: $text-color-grey;
          margin-right: 20rpx;
        }
      }
      
      .status-box {
        display: inline-block;
        padding: 4rpx 16rpx;
        border-radius: $border-radius-sm;
        font-size: $font-size-xs;
        
        &.status-upcoming {
          background-color: rgba($theme-color, 0.1);
          color: $theme-color;
        }
        
        &.status-ongoing {
          background-color: rgba(#ff9500, 0.1);
          color: #ff9500;
        }
        
        &.status-completed {
          background-color: rgba(#8e8e93, 0.1);
          color: #8e8e93;
        }
        
        &.status-cancelled {
          background-color: rgba(#ff3b30, 0.1);
          color: #ff3b30;
        }
      }
    }
  }
}
</style> 