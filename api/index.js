import request from './request.js'

// 基础请求URL
const baseURL = ''

// 调试辅助函数
const debugAPI = (name, result) => {
  console.log(`API调用: ${name}`, result);
  return result;
}

// 课程相关API
const courseApi = {
  // 获取课程列表
  getCourseList(data) {
    console.log('调用getCourseList，参数:', data);
    return request({
      name: 'getCourseList',
      data
    }).then(res => debugAPI('getCourseList返回', res));
  },
  
  // 获取课程详情
  getCourseDetail(id) {
    console.log('调用getCourseDetail，ID:', id);
    return request({
      name: 'getCourseDetail',
      data: { id }
    }).then(res => debugAPI('getCourseDetail返回', res));
  },
  
  // 获取新闻列表
  getNewsList(data = {}) {
    console.log('调用getNewsList，参数:', data);
    return request({
      name: 'getNewsList',
      data
    }).then(res => debugAPI('getNewsList返回', res));
  },
  
  // 获取推荐课程
  getRecommendCourses(data = {}) {
    console.log('调用getRecommendCourses，参数:', data);
    return request({
      name: 'getRecommendCourses',
      data
    }).then(res => debugAPI('getRecommendCourses返回', res));
  },
  
  // 预订课程
  bookCourse(data) {
    return request({
      name: 'bookCourse',
      data
    });
  }
}

// 用户相关API
const userApi = {
  // 用户登录
  login(data) {
    return request({
      name: 'login',
      data
    });
  },
  
  // 获取用户信息
  getUserInfo() {
    return request({
      name: 'getUserInfo',
      data: {}
    });
  },
  
  // 获取预订列表
  getBookingList(data) {
    return request({
      name: 'getBookingList',
      data
    });
  },
  
  // 获取预订详情
  getBookingDetail(id) {
    return request({
      name: 'getBookingDetail',
      data: { id }
    });
  },
  
  // 取消预订
  cancelBooking(id) {
    return request({
      name: 'cancelBooking',
      data: { id }
    });
  },
  
  // 获取预订数量
  getBookingCount() {
    return request({
      name: 'getBookingCount',
      data: {}
    });
  }
}

// 教师相关API
const teacherApi = {
  // 获取教师列表
  getTeacherList(data) {
    console.log('调用getTeacherList，参数:', data);
    return request({
      name: 'getTeacherList',
      data
    }).then(res => debugAPI('getTeacherList返回', res));
  },
  
  // 获取教师详情
  getTeacherDetail(id) {
    console.log('调用getTeacherDetail，ID:', id);
    return request({
      name: 'getTeacherDetail',
      data: { id }
    }).then(res => debugAPI('getTeacherDetail返回', res));
  }
}

export default {
  course: courseApi,
  user: userApi,
  teacher: teacherApi
} 