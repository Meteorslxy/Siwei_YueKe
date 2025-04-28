<template>
  <view class="calendar-container">
    <!-- 使用uni-calendar组件 -->
    <uni-calendar 
      :insert="true"
      :lunar="false"
      :start-date="startDate"
      :end-date="endDate"
      @change="dateChange"
      @monthSwitch="handleMonthSwitch"
      :selected="selectedInfo"
    />
    
    <view class="course-list-container">
      <view class="list-title">
        <text>{{ selectedDate ? formatDate(selectedDate) : '未选择日期' }} 的课程</text>
      </view>
      
      <view v-if="courseList.length > 0" class="course-list">
        <view 
          class="course-item" 
          v-for="(item, index) in courseList" 
          :key="index"
          @tap="viewCourseDetail(item.id)">
          <view class="course-time">
            <text>{{ item.startTime }} - {{ item.endTime }}</text>
          </view>
          <view class="course-info">
            <view class="course-name">{{ item.name }}</view>
            <view class="course-detail">
              <text class="teacher">{{ item.teacher }}</text>
              <text class="location">{{ item.location }}</text>
            </view>
            <view class="course-status" :class="['status-' + item.status]">
              {{ getStatusText(item.status) }}
            </view>
          </view>
        </view>
      </view>
      
      <view v-else class="empty-tip">
        <image src="/static/images/default/empty.png" mode="aspectFit"></image>
        <text>当天暂无课程安排~</text>
      </view>
    </view>
    
    <!-- 日历图例 -->
    <view class="calendar-legend">
      <view class="legend-item">
        <view class="legend-dot has-course"></view>
        <text>有课程安排</text>
      </view>
      <view class="legend-item">
        <view class="legend-dot today"></view>
        <text>今天</text>
      </view>
      <view class="legend-item">
        <view class="legend-dot selected"></view>
        <text>已选择</text>
      </view>
    </view>
    
    <!-- 课程状态图例 -->
    <view class="status-legend">
      <view class="legend-title">课程状态说明</view>
      <view class="legend-content">
        <view class="status-item">
          <view class="status-tag status-pending">待确认</view>
        </view>
        <view class="status-item">
          <view class="status-tag status-confirmed">已确认</view>
        </view>
        <view class="status-item">
          <view class="status-tag status-cancelled">已取消</view>
        </view>
        <view class="status-item">
          <view class="status-tag status-available">可预约</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 导入课程日历功能
import * as courseCalendarUtils from '@/utils/courseCalendar.js';
import { parseTimeToMinutes } from '@/utils/courseCalendar.js';
// 导入uni-calendar组件
import uniCalendar from '@/uni_modules/uni-calendar/components/uni-calendar/uni-calendar.vue';

export default {
  components: {
    uniCalendar
  },
  data() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    return {
      // 日历相关
      startDate: `${year - 1}-${month + 1}-1`,
      endDate: `${year + 1}-${month + 1}-28`,
      selectedDate: '',
      selectedInfo: {
        selected: []
      },
      courseList: [],
      // 已预约课程列表
      bookedCourses: [],
      // 课程日期映射，用于快速检查某一天是否有课程
      courseDatesMap: {},
      // 当前显示的月份
      currentYear: year,
      currentMonth: month + 1,
      // 课程日期缓存，避免重复计算
      courseDateCache: {},
      loading: false,
      loadingText: ''
    }
  },
  onLoad() {
    // 设置导航栏标题
    uni.setNavigationBarTitle({
      title: '课程日历'
    });
    
    // 设置默认日期为今天
    const today = new Date();
    this.selectedDate = this.formatDateString(today);
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth() + 1;
    
    // 加载用户已预约课程
    this.loadBookings();
    
    // 添加延迟确保日历组件渲染完毕后刷新数据
    setTimeout(() => {
      if (this.bookedCourses.length > 0) {
        this.updateCalendarCourseDates();
      }
    }, 1000);
  },
  onShow() {
    // 页面显示时重新加载课程数据
    this.loadBookings();
    
    // 添加延迟确保日历组件渲染完毕后刷新数据
    setTimeout(() => {
      if (this.bookedCourses.length > 0) {
        this.updateCalendarCourseDates();
      }
    }, 500);
  },
  methods: {
    // 获取用户预约
    async loadBookings() {
      try {
        // 检查用户是否已登录
        if (!this.isUserLoggedIn()) {
          console.log('用户未登录，无法加载预约数据');
          return;
        }
        
        this.loading = true;
        this.loadingText = '加载预约数据中...';
        
        const { result } = await uniCloud.callFunction({
          name: 'getUserBookings',
          data: {
            userId: this.userInfo._id,
            status: 'pending' // 过滤未参加的预约
          }
        });
        
        if (result.code === 0) {
          this.bookings = result.data;
          console.log(`成功加载预约数据: ${this.bookings.length}条记录`);
          this.updateCalendarCourseDates();
        } else {
          console.error('加载预约失败：', result.message);
        }
      } catch (e) {
        console.error('加载预约出错:', e);
      } finally {
        this.loading = false;
        this.loadingText = '';
      }
    },
    
    // 日期变更事件
    dateChange(e) {
      console.log('日期变更:', e);
      const { year, month, date, fulldate } = e;
      this.selectedDate = fulldate || `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      
      // 如果月份变了，重新计算日历标记
      if (year !== this.currentYear || month !== this.currentMonth) {
        this.currentYear = year;
        this.currentMonth = month;
        this.updateCalendarCourseDates();
      }
      
      this.fetchCourseList(this.selectedDate);
    },
    
    // 处理月份切换事件
    handleMonthSwitch(e) {
      console.log('月份切换:', e);
      const { year, month } = e;
      
      // 更新当前显示的年月
      this.currentYear = year;
      this.currentMonth = month;
      
      // 更新日历标记
      this.updateCalendarCourseDates();
    },
    
    // 加载用户已预约的课程
    loadBookedCourses() {
      uni.showLoading({ title: '加载中...' });
      
      // 获取用户ID
      let userId = '';
      
      try {
        const userInfoStorage = uni.getStorageSync('userInfo');
        console.log('userInfo类型:', typeof userInfoStorage);
        
        if (userInfoStorage) {
          if (typeof userInfoStorage === 'string') {
            try {
              const parsed = JSON.parse(userInfoStorage);
              userId = parsed.userId || '';
              console.log('从字符串解析的userId:', userId);
            } catch (e) {
              console.error('解析userInfo字符串出错:', e);
            }
          } else if (typeof userInfoStorage === 'object') {
            userId = userInfoStorage.userId || '';
            console.log('从对象获取的userId:', userId);
          }
        }
      } catch (e) {
        console.error('获取userInfo时出错:', e);
      }
      
      if (!userId) {
        // 尝试从本地全局状态获取
        const globalUserInfo = getApp().globalData ? getApp().globalData.userInfo : null;
        if (globalUserInfo && globalUserInfo.userId) {
          userId = globalUserInfo.userId;
          console.log('从全局状态获取userId:', userId);
        }
      }
      
      if (!userId) {
        uni.hideLoading();
        console.error('未找到用户ID');
        this.showLoginTip();
        return;
      }
      
      // 组织Promise队列，同时查询三个数据表的数据
      Promise.all([
        // 1. 获取用户预约课程 (getUserBookings云函数)
        new Promise((resolve) => {
          uniCloud.callFunction({
            name: 'getUserBookings',
            data: { userId },
            success: res => {
              console.log('获取用户预约课程成功:', res);
              resolve(res.result?.data || []);
            },
            fail: err => {
              console.error('获取用户预约课程失败:', err);
              resolve([]);
            }
          });
        }),
        
        // 2. 查询课程的日程表 (course_schedule表)
        new Promise((resolve) => {
          // 首先获取用户关联的课程ID
          const db = uniCloud.database();
          const courseScheduleDB = db.collection('course_schedule');
          
          // 获取所有课程日程表数据，不进行过滤
          courseScheduleDB.limit(500).get().then(res => {
            console.log('获取课程日程表成功:', res);
            resolve(res.result?.data || []);
          }).catch(err => {
            console.error('获取课程日程表失败:', err);
            resolve([]);
          });
        }),
        
        // 3. 查询学生选课记录 (student_schedules表)
        new Promise((resolve) => {
          const db = uniCloud.database();
          const studentSchedulesDB = db.collection('student_schedules');
          
          studentSchedulesDB.where({
            studentId: userId
          }).get().then(res => {
            console.log('获取学生选课记录成功:', res);
            resolve(res.result?.data || []);
          }).catch(err => {
            console.error('获取学生选课记录失败:', err);
            resolve([]);
          });
        }),
        
        // 4. 直接查询预约表获取所有状态的预约
        new Promise((resolve) => {
          const db = uniCloud.database();
          db.collection('bookings').where({
            userId: userId
            // 不筛选状态，获取所有预约
          }).get().then(res => {
            console.log('获取所有预约记录成功:', res);
            resolve(res.result?.data || []);
          }).catch(err => {
            console.error('获取所有预约记录失败:', err);
            resolve([]);
          });
        })
      ]).then(([bookingData, courseScheduleData, studentScheduleData, allBookingsData]) => {
        // 重置数据
        this.bookedCourses = [];
        this.selectedInfo.selected = [];
        this.courseDatesMap = {};
        this.clearCourseDateCache();
        
        // 从预约记录中提取课程ID
        const courseIdsFromBooking = bookingData.map(booking => 
          booking.courseId || (booking.courseInfo ? booking.courseInfo._id : null)
        ).filter(id => id);
        
        // 从直接查询的预约表中提取课程ID
        const courseIdsFromAllBookings = allBookingsData.map(booking => 
          booking.courseId || (booking.courseInfo ? booking.courseInfo._id : null)
        ).filter(id => id);
        
        console.log('从预约记录提取的课程ID:', courseIdsFromBooking);
        console.log('从所有预约记录提取的课程ID:', courseIdsFromAllBookings);
        
        // 从学生选课记录中提取课程ID
        const courseIdsFromStudentSchedule = [];
        if (studentScheduleData.length > 0) {
          studentScheduleData.forEach(schedule => {
            if (schedule.courses && Array.isArray(schedule.courses)) {
              schedule.courses.forEach(course => {
                if (course.courseId) {
                  courseIdsFromStudentSchedule.push(course.courseId);
                }
              });
            }
          });
        }
        
        console.log('从学生选课记录提取的课程ID:', courseIdsFromStudentSchedule);
        
        // 合并所有课程ID并去重
        const allCourseIds = [...new Set([...courseIdsFromBooking, ...courseIdsFromStudentSchedule, ...courseIdsFromAllBookings])];
        console.log('合并后的所有课程ID:', allCourseIds);
        
        if (allCourseIds.length === 0) {
          // 如果没有找到任何课程ID，尝试获取所有可用课程（测试用）
          console.log('没有找到任何相关课程ID，尝试获取所有可用课程');
          this.loadAllAvailableCourses();
          return;
        }
        
        // 获取相关课程的详细信息
        const db = uniCloud.database();
        db.collection('courses').where({
          _id: db.command.in(allCourseIds)
        }).get().then(courseRes => {
          console.log('获取课程详情成功:', courseRes);
          const coursesData = courseRes.result?.data || [];
          
          // 构建课程映射表
          const courseMap = {};
          coursesData.forEach(course => {
            courseMap[course._id] = course;
          });
          
          // 提取并处理课程日程数据
          const relevantSchedules = courseScheduleData.filter(schedule => 
            allCourseIds.includes(schedule.courseId)
          );
          
          console.log('相关的课程日程数据:', relevantSchedules);
          
          // 处理学生具体选择的课程时间
          let selectedTimeSlots = [];
          
          studentScheduleData.forEach(studentSchedule => {
            if (studentSchedule.courses && Array.isArray(studentSchedule.courses)) {
              studentSchedule.courses.forEach(course => {
                if (course.selectedSlots && Array.isArray(course.selectedSlots)) {
                  selectedTimeSlots = [...selectedTimeSlots, ...course.selectedSlots];
                }
              });
            }
          });
          
          console.log('学生选择的时间槽:', selectedTimeSlots);
          
          // 构建预约课程列表
          this.bookedCourses = allCourseIds.map(courseId => {
            // 查找课程信息
            const course = courseMap[courseId];
            if (!course) return null;
            
            // 查找对应的日程数据
            const schedule = relevantSchedules.find(s => s.courseId === courseId);
            
            return {
              _id: courseId,
              status: 'confirmed', // 默认为已确认状态
              courseInfo: {
                _id: courseId,
                title: course.title || course.courseTitle || '未命名课程',
                startDate: course.startDate,
                endDate: course.endDate,
                startTime: course.startTime,
                endTime: course.endTime,
                teacherName: course.teacherName || '未知',
                schoolName: course.schoolName || course.location || '未知',
                location: course.location || course.schoolName || '未知',
                classTime: course.classTime
              },
              // 保存日程表的时间槽信息，用于日历显示
              scheduleData: schedule ? {
                timeSlots: schedule.timeSlots || [],
                timeHash: schedule.timeHash || []
              } : null,
              // 记录学生选择的时间槽
              selectedTimeSlots: selectedTimeSlots.filter(slot => {
                // 只保留与当前课程相关的时间槽
                if (!schedule || !schedule.timeSlots) return false;
                
                // 检查该时间槽是否在课程的timeSlots中
                return schedule.timeSlots.some(timeSlot => {
                  const slotDate = new Date(timeSlot);
                  const timeSlotStart = new Date(timeSlot.start);
                  
                  // 简单比较日期（忽略时间）
                  return slotDate.toDateString() === timeSlotStart.toDateString();
                });
              })
            };
          }).filter(Boolean); // 过滤掉null值
          
          console.log('处理后的预约课程:', this.bookedCourses);
          
          // 更新日历上的课程标记
          this.updateCalendarCourseDates();
          
          // 如果当前有选中日期，刷新课程列表
          if (this.selectedDate) {
            this.fetchCourseList(this.selectedDate);
          }
          
          uni.hideLoading();
        }).catch(err => {
          console.error('获取课程详情失败:', err);
          uni.hideLoading();
        });
      });
    },
    
    // 新增：加载所有可用课程（当用户没有任何预约或选课记录时使用）
    loadAllAvailableCourses() {
      const db = uniCloud.database();
      db.collection('courses').limit(20).get().then(res => {
        console.log('获取所有可用课程成功:', res);
        
        const courses = res.result?.data || [];
        if (courses.length === 0) {
          uni.hideLoading();
          return;
        }
        
        // 获取这些课程的日程表
        const courseIds = courses.map(course => course._id);
        
        db.collection('course_schedule').where({
          courseId: db.command.in(courseIds)
        }).get().then(scheduleRes => {
          console.log('获取可用课程日程表成功:', scheduleRes);
          const schedulesData = scheduleRes.result?.data || [];
          
          // 构建课程数据
          this.bookedCourses = courses.map(course => {
            // 查找对应的日程数据
            const schedule = schedulesData.find(s => s.courseId === course._id);
            
            return {
              _id: course._id,
              status: 'available', // 设置为可用状态
              courseInfo: {
                _id: course._id,
                title: course.title || course.courseTitle || '未命名课程',
                startDate: course.startDate,
                endDate: course.endDate,
                startTime: course.startTime,
                endTime: course.endTime,
                teacherName: course.teacherName || '未知',
                schoolName: course.schoolName || course.location || '未知',
                location: course.location || course.schoolName || '未知',
                classTime: course.classTime
              },
              // 保存日程表的时间槽信息
              scheduleData: schedule ? {
                timeSlots: schedule.timeSlots || [],
                timeHash: schedule.timeHash || []
              } : null,
              // 空的选择时间槽
              selectedTimeSlots: []
            };
          }).filter(item => item.scheduleData?.timeSlots?.length > 0); // 只保留有时间槽的课程
          
          console.log('处理后的可用课程:', this.bookedCourses);
          
          // 更新日历上的课程标记
          this.updateCalendarCourseDates();
          
          // 如果当前有选中日期，刷新课程列表
          if (this.selectedDate) {
            this.fetchCourseList(this.selectedDate);
          }
          
          uni.hideLoading();
        }).catch(err => {
          console.error('获取可用课程日程表失败:', err);
          uni.hideLoading();
        });
      }).catch(err => {
        console.error('获取所有可用课程失败:', err);
        uni.hideLoading();
      });
    },
    
    // 更新日历中的课程日期标记
    updateCalendarCourseDates() {
      console.log('开始更新日历课程标记');
      console.log(`当前显示月份: ${this.currentYear}年${this.currentMonth}月`);
      console.log('预约课程数量:', this.bookedCourses.length);
      
      // 清空现有日期标记
      this.courseDatesMap = {};
      const selectedDates = [];
      
      // 计算当前月的开始和结束日期
      const monthStart = new Date(this.currentYear, this.currentMonth - 1, 1);
      const nextMonth = new Date(this.currentYear, this.currentMonth, 1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const monthEnd = new Date(nextMonth - 1); // 当前月的最后一天
      
      // 为了显示完整的日历视图，我们需要包括前一个月和后一个月的部分日期
      // 获取当前月第一天是星期几（0是星期日，6是星期六）
      const firstDayOfWeek = monthStart.getDay();
      // 获取显示的第一天（可能是上个月的日期）
      const calendarStart = new Date(monthStart);
      calendarStart.setDate(calendarStart.getDate() - firstDayOfWeek);
      
      // 获取显示的最后一天（可能是下个月的日期）
      // 通常日历会显示6周，所以我们加上42天（6周 * 7天）再减去已经显示的天数
      const daysToShow = 42;
      const calendarEnd = new Date(calendarStart);
      calendarEnd.setDate(calendarStart.getDate() + daysToShow - 1);
      
      console.log(`日历视图范围: ${calendarStart.toISOString().split('T')[0]} 至 ${calendarEnd.toISOString().split('T')[0]}`);
      
      // 生成当前视图的月份标识，用于缓存
      const currentViewKey = `${this.currentYear}-${this.currentMonth}`;
      
      // 遍历所有课程
      this.bookedCourses.forEach(booking => {
        // 跳过无效课程
        if (!booking || !booking.courseInfo) return;
        
        const course = booking.courseInfo;
        console.log('处理课程:', course.title || course.courseTitle || '未命名课程');
        
        // 生成课程的缓存键
        const courseKey = `${course._id || booking._id}_${currentViewKey}`;
        
        // 第一部分：处理course_schedule中的时间槽
        if (booking.scheduleData && booking.scheduleData.timeSlots && booking.scheduleData.timeSlots.length > 0) {
          console.log(`课程[${course.title || '未命名课程'}]有${booking.scheduleData.timeSlots.length}个时间槽`);
          const courseDates = [];
          const timeSlots = booking.scheduleData.timeSlots;
          
          // 处理timeSlots中的每个时间槽
          timeSlots.forEach(slot => {
            // 检查时间槽状态，跳过已取消的课程
            if (slot.status === 'cancelled') {
              return;
            }
            
            // 从时间槽的开始时间提取日期
            let slotDate;
            try {
              // 直接处理ISO格式的日期字符串
              slotDate = new Date(slot.start);
              
              // 确保slotDate是有效的Date对象
              if (isNaN(slotDate.getTime())) {
                console.log('无效的时间槽日期:', slot.start);
                return;
              }
              
              // 检查日期是否在当前日历视图范围内
              if (slotDate >= calendarStart && slotDate <= calendarEnd) {
                const dateKey = this.formatDate(slotDate);
                console.log(`找到课程时间槽: ${dateKey}, ${course.title}`);
                
                // 判断是否是学生选择的时间槽
                const isSelected = booking.selectedTimeSlots && booking.selectedTimeSlots.some(selectedSlot => {
                  const selectedDate = new Date(selectedSlot);
                  return selectedDate.toDateString() === slotDate.toDateString();
                });
                
                // 如果该日期已经有其他课程，则合并信息
                if (this.courseDatesMap[dateKey]) {
                  // 如果该日期已经有课程记录，添加到courses数组
                  if (!this.courseDatesMap[dateKey].courses) {
                    this.courseDatesMap[dateKey].courses = [];
                  }
                  
                  // 添加当前课程到courses数组
                  this.courseDatesMap[dateKey].courses.push({
                    courseId: course._id,
                    courseTitle: course.title || course.courseTitle || '未命名课程',
                    startTime: course.startTime || slotDate.getHours() + ':' + String(slotDate.getMinutes()).padStart(2, '0'),
                    endTime: course.endTime || '--:--',
                    isSelected: isSelected
                  });
                } else {
                  // 根据是否被选择使用不同的标记颜色
                  this.courseDatesMap[dateKey] = {
                    info: {
                      color: isSelected ? '#4CD964' : '#FF6B00', // 被选择的用绿色，未选择的用橙色
                      text: isSelected ? '✓' : '●'
                    },
                    courseTitle: course.title || course.courseTitle || '未命名课程',
                    courseTime: course.startTime + ' - ' + course.endTime,
                    isSelected: isSelected,
                    courses: [{
                      courseId: course._id,
                      courseTitle: course.title || course.courseTitle || '未命名课程',
                      startTime: course.startTime || slotDate.getHours() + ':' + String(slotDate.getMinutes()).padStart(2, '0'),
                      endTime: course.endTime || '--:--',
                      isSelected: isSelected
                    }]
                  };
                }
                
                selectedDates.push(dateKey);
                courseDates.push(dateKey);
              }
            } catch (e) {
              console.log('处理时间槽时出错:', e);
            }
          });
          
          // 缓存本次计算的日期
          if (courseDates.length > 0) {
            this.courseDateCache[courseKey] = courseDates;
          }
          
      } else {
          // 第二部分：如果没有time_slots，尝试使用课程的开始日期、结束日期以及classTime
          try {
            // 解析开始和结束日期
            const courseStartDate = courseCalendarUtils.parseDate(course.startDate);
            const courseEndDate = courseCalendarUtils.parseDate(course.endDate);
            
            if (!courseStartDate || !courseEndDate) {
              console.log('课程没有有效的开始/结束日期');
              return;
            }
            
            // 检查课程日期范围是否与当前日历视图有重叠
            if (courseEndDate < calendarStart || courseStartDate > calendarEnd) {
              return;
            }
            
            // 确定要处理的日期范围（课程日期范围与日历视图的交集）
            const startDate = new Date(Math.max(courseStartDate.getTime(), calendarStart.getTime()));
            const endDate = new Date(Math.min(courseEndDate.getTime(), calendarEnd.getTime()));
            
            // 获取在日期范围内符合上课时间的所有日期
            // 处理特殊情况：如果classTime为空数组或包含"每天"，则表示每天上课
            let classTimeArray = course.classTime;
            if (!Array.isArray(classTimeArray) || classTimeArray.length === 0) {
              classTimeArray = ['每天'];
            }
            
            const classDates = courseCalendarUtils.getMatchingDates(startDate, endDate, classTimeArray);
            console.log(`根据课程时间匹配到${classDates.length}个日期`);
            
            // 存储当前课程在当前视图的日期，用于缓存
            const courseDates = [];
            
            // 标记每个上课日期
            classDates.forEach(date => {
              const dateKey = this.formatDate(date);
              console.log(`找到课程日期: ${dateKey}, ${course.title}`);
              
              // 如果该日期已经有其他课程，则合并信息
              if (this.courseDatesMap[dateKey]) {
                // 如果该日期已经有课程记录，添加到courses数组
                if (!this.courseDatesMap[dateKey].courses) {
                  this.courseDatesMap[dateKey].courses = [];
                }
                
                // 添加当前课程到courses数组
                this.courseDatesMap[dateKey].courses.push({
                  courseId: course._id,
                  courseTitle: course.title || course.courseTitle || '未命名课程',
                  startTime: course.startTime || '--:--',
                  endTime: course.endTime || '--:--',
                  isSelected: false
                });
              } else {
                this.courseDatesMap[dateKey] = {
                  info: {
                    color: '#FF6B00',
                    text: '●'
                  },
                  courseTitle: course.title || course.courseTitle || '未命名课程',
                  courseTime: course.startTime + ' - ' + course.endTime,
                  courses: [{
                    courseId: course._id,
                    courseTitle: course.title || course.courseTitle || '未命名课程',
                    startTime: course.startTime || '--:--',
                    endTime: course.endTime || '--:--',
                    isSelected: false
                  }]
                };
              }
              
              selectedDates.push(dateKey);
              courseDates.push(dateKey);
            });
            
            // 缓存本次计算的日期
            if (courseDates.length > 0) {
              this.courseDateCache[courseKey] = courseDates;
            }
          } catch (e) {
            console.error('处理课程时出错:', e);
          }
        }
      });
      
      // 更新选中日期信息
      const uniqueDates = Array.from(new Set(selectedDates));
      console.log('标记的日期数量:', uniqueDates.length);
      
      // 转换为uni-calendar组件需要的selected格式
      this.selectedInfo = {
        selected: uniqueDates.map(date => {
          return {
            date: date,
            info: this.courseDatesMap[date].info
          };
        })
      };
      
      console.log('日历标记更新完成，标记天数:', this.selectedInfo.selected.length);
      
      // 如果当前有选中日期，刷新课程列表
      if (this.selectedDate) {
        this.fetchCourseList(this.selectedDate);
      }
    },
    
    // 格式化日期字符串
    formatDateString(date) {
      if (!date) {
        console.error('formatDateString: 参数为空');
        return '';
      }
      
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error('formatDateString: 无效的日期对象', date);
        return '';
      }
      
      try {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      } catch (e) {
        console.error('formatDateString: 格式化日期时出错', e);
        return '';
      }
    },
    
    // 检查用户是否已登录
    isUserLoggedIn() {
      return this.userInfo && this.userInfo._id && this.userInfo._id.length > 0;
    },
    
    // 格式化日期为YYYY-MM-DD格式
    formatDate(date) {
      try {
        // 如果是字符串，尝试转换为Date对象
        if (typeof date === 'string') {
          // 尝试转换字符串为Date对象
          date = new Date(date);
        }
        
        // 确保date是有效的Date对象
        if (!(date instanceof Date) || isNaN(date.getTime())) {
          console.error('无效的日期对象:', date);
          return '无效日期';
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } catch (e) {
        console.error('日期格式化出错:', e);
        return typeof date === 'string' ? date : '无效日期';
      }
    },
    
    // 获取指定日期的课程列表
    fetchCourseList(dateStr) {
      console.log('获取日期课程列表:', dateStr);
      // 初始化空列表
      this.courseList = [];
      
      // 如果没有课程或者没有日期标记，直接返回
      if (!this.bookedCourses || this.bookedCourses.length === 0) {
        console.log('没有可显示的课程数据');
        return;
      }
      
      console.log('检查课程数据，预约课程数量:', this.bookedCourses.length);
      
      // 解析选中日期
      let selectedDateObj;
      try {
        // 先尝试使用Date构造函数直接解析
        selectedDateObj = new Date(dateStr);
        
        // 验证解析结果是否有效
        if (isNaN(selectedDateObj.getTime())) {
          // 如果无效，尝试替换分隔符后再解析
          selectedDateObj = new Date(dateStr);
          
          // 再次验证
          if (isNaN(selectedDateObj.getTime())) {
            console.error('无法解析选中的日期:', dateStr);
            return;
          }
        }
      } catch (e) {
        console.error('解析选中日期出错:', e, dateStr);
        return;
      }
      
      console.log('解析选中日期结果:', selectedDateObj);
      
      // 获取选中日期是星期几
      const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const dayOfWeek = weekDays[selectedDateObj.getDay()];
      
      // 尝试直接从courseDatesMap获取该日期的课程列表
      const formattedSelectedDate = this.formatDate(selectedDateObj);
      if (this.courseDatesMap[formattedSelectedDate]) {
        const dateInfo = this.courseDatesMap[formattedSelectedDate];
        if (dateInfo.courses && dateInfo.courses.length > 0) {
          console.log(`从日历标记中找到${dateInfo.courses.length}门课程`, dateInfo.courses);
          
          // 转换为courseList格式
          dateInfo.courses.forEach(course => {
            this.courseList.push({
              id: course.courseId,
              name: course.courseTitle,
              startTime: course.startTime,
              endTime: course.endTime,
              teacher: this.findCourseTeacherById(course.courseId),
              location: this.findCourseLocationById(course.courseId),
              status: course.status || 'pending' // 使用课程的实际状态
            });
          });
          
          // 按时间排序
          this.sortCourseList(this.courseList, formattedSelectedDate);
          return;
        }
      }
      
      // 如果从courseDatesMap中找不到，则回退到遍历课程查找
      // 这部分查找已预约的课程
      this.bookedCourses.forEach(booking => {
        try {
          if (!booking.courseInfo) {
            return;
          }
          
          const course = booking.courseInfo;
          
          // 首先检查日程表的时间槽
          if (booking.scheduleData && booking.scheduleData.timeSlots) {
            const formattedSelectedDate = this.formatDate(selectedDateObj);
            
            // 过滤出选中日期的时间槽
            const matchingTimeSlots = booking.scheduleData.timeSlots.filter(slot => {
              // 忽略已取消的时间槽
              if (slot.status === 'cancelled') return false;
              
              // 尝试解析slot.start
              try {
                const slotDate = new Date(slot.start);
                
                if (isNaN(slotDate.getTime())) {
                  return false;
                }
                
                const formattedSlotDate = this.formatDate(slotDate);
                return formattedSlotDate === formattedSelectedDate;
              } catch (e) {
                return false;
              }
            });
            
            if (matchingTimeSlots.length > 0) {
              console.log('找到匹配的时间槽数量:', matchingTimeSlots.length);
              // 有匹配的时间槽，为每个时间槽添加一个课程
              matchingTimeSlots.forEach(slot => {
                // 从时间槽提取开始和结束时间
                let startTime = course.startTime;
                let endTime = course.endTime;
                
                try {
                  if (slot.start) {
                    const startDate = new Date(slot.start);
                    startTime = startDate.getHours() + ':' + String(startDate.getMinutes()).padStart(2, '0');
                  }
                  if (slot.end) {
                    const endDate = new Date(slot.end);
                    endTime = endDate.getHours() + ':' + String(endDate.getMinutes()).padStart(2, '0');
                  }
                } catch (e) {
                  console.log('解析时间槽时间出错:', e);
                }
                
                // 检查这个时间槽是否是学生选择的
                const isSelected = booking.selectedTimeSlots && booking.selectedTimeSlots.some(selectedSlot => {
                  const selectedDate = new Date(selectedSlot);
                  const slotStartDate = new Date(slot.start);
                  return selectedDate.toDateString() === slotStartDate.toDateString();
                });
                
                // 添加到课程列表
                this.courseList.push({
                  id: course._id,
                  name: course.title || course.courseTitle || '未命名课程',
                  startTime: startTime,
                  endTime: endTime,
                  teacher: course.teacherName || '未知',
                  location: course.location || course.schoolName || '未知',
                  status: isSelected ? 'confirmed' : 'available', // 根据是否选择设置状态
                  isSelected: isSelected
                });
              });
              
              // 这里不要return，还需要继续查找其他课程
            }
          }
          
          // 备选：回退到旧的处理方式
          // 此部分代码已不再是主要逻辑，这里简化一下
          const startDate = courseCalendarUtils.parseDate(course.startDate);
          const endDate = courseCalendarUtils.parseDate(course.endDate);
          
          if (!startDate || !endDate) {
            return;
          }
          
          // 检查选中日期是否在课程日期范围内
          if (selectedDateObj < startDate || selectedDateObj > endDate) {
            return;
          }
          
          // 检查选中日期是否是课程上课日
          let isClassDay = false;
          
          if (!course.classTime || !Array.isArray(course.classTime) || course.classTime.length === 0 || course.classTime.includes('每天')) {
            isClassDay = true;
          } else if (course.classTime.includes(dayOfWeek)) {
            isClassDay = true;
          }
          
          if (!isClassDay) {
            return;
          }
          
          console.log('找到匹配课程(从课程日期):', course.title || course.courseTitle, '时间:', course.startTime, '-', course.endTime);
          
          // 添加到课程列表
          this.courseList.push({
            id: course._id,
            name: course.title || course.courseTitle || '未命名课程',
            startTime: course.startTime || '--:--',
            endTime: course.endTime || '--:--',
            teacher: course.teacherName || '未知',
            location: course.location || course.schoolName || '未知',
            status: 'scheduled'
          });
        } catch (e) {
          console.error('处理课程时出错:', e);
        }
      });
      
      // 按时间排序
      this.sortCourseList(this.courseList, formattedSelectedDate);
    },
    
    // 根据开始时间排序课程列表
    sortCourseList(courses, date) {
      if (!courses || !Array.isArray(courses) || courses.length === 0) {
        return [];
      }
      
      try {
        return [...courses].sort((a, b) => {
          // 确保startTime存在并且是字符串
          const timeA = a.startTime && typeof a.startTime === 'string' ? this.parseTimeToMinutes(a.startTime) : 0;
          const timeB = b.startTime && typeof b.startTime === 'string' ? this.parseTimeToMinutes(b.startTime) : 0;
          return timeA - timeB;
        });
      } catch (e) {
        console.error('排序课程列表出错:', e);
        return courses; // 出错时返回原始列表
      }
    },
    
    // 根据课程ID查找教师名称
    findCourseTeacherById(courseId) {
      const course = this.bookedCourses.find(item => item._id === courseId || (item.courseInfo && item.courseInfo._id === courseId));
      return course && course.courseInfo ? (course.courseInfo.teacherName || '未知') : '未知';
    },
    
    // 根据课程ID查找地点
    findCourseLocationById(courseId) {
      const course = this.bookedCourses.find(item => item._id === courseId || (item.courseInfo && item.courseInfo._id === courseId));
      return course && course.courseInfo ? (course.courseInfo.location || course.courseInfo.schoolName || '未知') : '未知';
    },
    
    // 获取课程状态文本
    getStatusText(status) {
      const statusMap = {
        'pending': '待确认',
        'confirmed': '已确认',
        'cancelled': '已取消',
        'finished': '已完成',
        'available': '可预约'
      };
      return statusMap[status] || '未知状态';
    },
    
    // 查看课程详情
    viewCourseDetail(courseId) {
      if (!courseId) return;
      
      uni.navigateTo({
        url: `/pages/course/detail?id=${courseId}`
      });
    },
    
    // 显示登录提示
    showLoginTip() {
      uni.showModal({
        title: '提示',
        content: '请先登录后查看您的课程',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/login/index'
            });
          }
        }
      });
    },
    
    // 清除课程日期缓存
    clearCourseDateCache() {
      this.courseDateCache = {};
    }
  }
}
</script>

<style lang="scss">
.calendar-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 30rpx;
}

.course-list-container {
  margin: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.list-title {
  font-size: 32rpx;
  font-weight: bold;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20rpx;
}

.course-list {
  .course-item {
    display: flex;
    padding: 20rpx 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .course-time {
      width: 180rpx;
      font-size: 28rpx;
      color: #666;
    }
    
    .course-info {
      flex: 1;
      
      .course-name {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
      
      .course-detail {
        font-size: 28rpx;
        color: #666;
        margin-bottom: 10rpx;
        
        .teacher {
          margin-right: 20rpx;
        }
      }
      
      .course-status {
        display: inline-block;
        font-size: 24rpx;
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
        
        &.status-pending {
          background-color: #e6f7ff;
          color: #1890ff;
        }
        
        &.status-confirmed {
          background-color: #f6ffed;
          color: #52c41a;
        }
        
        &.status-cancelled {
          background-color: #fff2f0;
          color: #ff4d4f;
        }
        
        &.status-finished {
          background-color: #f0f0f0;
          color: #999;
        }
      }
    }
  }
}

.empty-tip {
  padding: 60rpx 0;
  text-align: center;
  color: #999;
  
  image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 20rpx;
  }
}

// 日历图例样式
.calendar-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .legend-item {
    display: flex;
    align-items: center;
    margin: 0 20rpx;
    
    .legend-dot {
      width: 20rpx;
      height: 20rpx;
      border-radius: 50%;
      margin-right: 10rpx;
      
      &.has-course {
        background-color: #FF6B00;
      }
      
      &.today {
        background-color: #007AFF;
      }
      
      &.selected {
        background-color: #4CD964;
      }
    }
    
    text {
      font-size: 24rpx;
      color: #666;
    }
  }
}

// 美化日历日期样式
:deep(.uni-calendar-item__weeks-box-item) {
  position: relative;
  
  &.uni-calendar-item--checked {
    background-color: rgba(76, 217, 100, 0.2);
    
    .uni-calendar-item__weeks-box-circle {
      background-color: #4CD964;
    }
  }
  
  &.uni-calendar-item--today {
    background-color: rgba(0, 122, 255, 0.1);
    
    .uni-calendar-item__weeks-box-circle {
      background-color: #007AFF;
    }
  }
  
  &.uni-calendar-item--disable {
    opacity: 0.4;
  }
  
  .uni-calendar-item__weeks-box-text {
    font-size: 28rpx;
  }
  
  .uni-calendar-item__weeks-lunar {
    font-size: 20rpx;
    color: #666;
  }
  
  .uni-calendar-item__weeks-box-dot {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    background-color: #FF6B00;
  }
}

// 课程状态图例样式
.status-legend {
  display: flex;
  flex-direction: column;
  margin-top: 10rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .legend-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 15rpx;
    padding-bottom: 10rpx;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .legend-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .status-item {
    display: flex;
    align-items: center;
    margin: 10rpx;
    
    .status-tag {
      display: inline-block;
      font-size: 22rpx;
      padding: 4rpx 16rpx;
      border-radius: 20rpx;
      
      &.status-pending {
        background-color: #e6f7ff;
        color: #1890ff;
      }
      
      &.status-confirmed {
        background-color: #f6ffed;
        color: #52c41a;
      }
      
      &.status-cancelled {
        background-color: #fff2f0;
        color: #ff4d4f;
      }
      
      &.status-available {
        background-color: #f0f0f0;
        color: #999;
      }
    }
  }
}
</style> 