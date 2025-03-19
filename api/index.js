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
  getCourseList(data, useMock = false) {
    console.log('调用getCourseList，参数:', data);
    return request({
      name: 'getCourseList',
      data,
      useMock
    }).then(res => debugAPI('getCourseList返回', res));
  },
  
  // 获取课程详情
  getCourseDetail(id, useMock = false) {
    console.log('调用getCourseDetail，ID:', id);
    return request({
      name: 'getCourseDetail',
      data: { id },
      useMock
    }).then(res => debugAPI('getCourseDetail返回', res));
  },
  
  // 获取新闻列表
  getNewsList(data = {}, useMock = false) {
    console.log('调用getNewsList，参数:', data);
    return request({
      name: 'getNewsList',
      data,
      useMock
    }).then(res => debugAPI('getNewsList返回', res));
  },
  
  // 获取推荐课程
  getRecommendCourses(data = {}, useMock = false) {
    console.log('调用getRecommendCourses，参数:', data);
    return request({
      name: 'getRecommendCourses',
      data,
      useMock
    }).then(res => debugAPI('getRecommendCourses返回', res));
  },
  
  // 预订课程
  bookCourse(data, useMock = false) {
    return request({
      name: 'bookCourse',
      data,
      useMock
    });
  }
}

// 用户相关API
const userApi = {
  // 用户登录
  login(data, useMock = false) {
    return request({
      name: 'login',
      data,
      useMock
    });
  },
  
  // 获取用户信息
  getUserInfo(useMock = false) {
    return request({
      name: 'getUserInfo',
      data: {},
      useMock
    });
  },
  
  // 获取预订列表
  getBookingList(data, useMock = false) {
    return request({
      name: 'getBookingList',
      data,
      useMock
    });
  },
  
  // 获取预订详情
  getBookingDetail(id, useMock = false) {
    return request({
      name: 'getBookingDetail',
      data: { id },
      useMock
    });
  },
  
  // 取消预订
  cancelBooking(id, useMock = false) {
    return request({
      name: 'cancelBooking',
      data: { id },
      useMock
    });
  },
  
  // 获取预订数量
  getBookingCount(useMock = false) {
    return request({
      name: 'getBookingCount',
      data: {},
      useMock
    });
  }
}

// 教师相关API
const teacherApi = {
  // 获取教师列表
  getTeacherList(data, useMock = false) {
    console.log('调用getTeacherList，参数:', data);
    return request({
      name: 'getTeacherList',
      data,
      useMock
    }).then(res => debugAPI('getTeacherList返回', res));
  },
  
  // 获取教师详情
  getTeacherDetail(id, useMock = false) {
    console.log('调用getTeacherDetail，ID:', id);
    return request({
      name: 'getTeacherDetail',
      data: { id },
      useMock
    }).then(res => debugAPI('getTeacherDetail返回', res));
  }
}

export default {
  course: courseApi,
  user: userApi,
  teacher: teacherApi
} 