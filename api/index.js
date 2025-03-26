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
    
    // 确保ID参数有效
    if (!id || id === 'undefined' || id === 'null') {
      console.error('getCourseDetail: ID参数无效:', id);
      return Promise.reject({
        code: -1,
        success: false,
        message: '课程ID不能为空'
      });
    }
    
    // 尝试先从缓存中获取数据
    try {
      const cachedKey = `course_${id}`;
      const cachedData = uni.getStorageSync(cachedKey);
      
      if (cachedData) {
        console.log(`[缓存] 从缓存获取课程详情数据: ${cachedKey}`);
        const parsedData = JSON.parse(cachedData);
        
        // 判断缓存时间是否过期（24小时）
        const cacheTime = uni.getStorageSync(`${cachedKey}_time`);
        const now = Date.now();
        const isExpired = !cacheTime || (now - cacheTime > 24 * 60 * 60 * 1000);
        
        if (!isExpired) {
          console.log('使用缓存的课程详情数据');
          
          // 后台刷新缓存
          setTimeout(() => {
            this.refreshCourseCache(id);
          }, 100);
          
          return Promise.resolve({
            code: 0,
            success: true,
            message: '从缓存获取成功',
            data: parsedData,
            fromCache: true
          });
        } else {
          console.log('缓存已过期，重新获取数据');
        }
      }
    } catch (e) {
      console.error('读取缓存失败:', e);
    }
    
    // 使用courseId作为参数名，与云函数期望一致
    return request({
      name: 'getCourseDetail',
      data: { courseId: id },
      timeout: 15000 // 设置15秒超时
    }).then(res => {
      console.log('getCourseDetail原始返回:', res);
      
      // 如果获取成功，更新缓存时间
      if (res && res.data) {
        try {
          const cachedKey = `course_${id}`;
          uni.setStorageSync(`${cachedKey}_time`, Date.now());
        } catch (e) {
          console.error('更新缓存时间失败:', e);
        }
      }
      
      // 如果返回的data为空但有_id字段，将其规范化
      if (res && !res.data && res._id) {
        return {
          ...res,
          data: res
        };
      }
      
      return debugAPI('getCourseDetail返回', res);
    });
  },
  
  // 刷新课程缓存（后台操作）
  refreshCourseCache(id) {
    console.log('后台刷新课程缓存:', id);
    
    return request({
      name: 'getCourseDetail',
      data: { courseId: id },
      timeout: 30000,
      showLoading: false // 不显示加载提示
    }).then(res => {
      if (res && res.data) {
        try {
          const cachedKey = `course_${id}`;
          uni.setStorageSync(cachedKey, JSON.stringify(res.data));
          uni.setStorageSync(`${cachedKey}_time`, Date.now());
          console.log('后台更新课程缓存成功');
        } catch (e) {
          console.error('后台更新课程缓存失败:', e);
        }
      }
      return res;
    }).catch(err => {
      console.error('后台刷新课程缓存失败:', err);
      return err;
    });
  },
  
  // 获取新闻列表
  getNewsList(data = {}) {
    console.log('调用getNewsList，参数:', data);
    return request({
      name: 'getNewsList',
      data
    }).then(res => debugAPI('getNewsList返回', res));
  },
  
  // 获取新闻详情
  getNewsDetail(id) {
    console.log('调用getNewsDetail，ID:', id);
    return request({
      name: 'getNewsDetail',
      data: { _id: id, id: id } // 同时传递_id和id，增加匹配成功率
    }).then(res => debugAPI('getNewsDetail返回', res));
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
      data: { bookingId: id }
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

// 讲座相关API
const lectureApi = {
  // 获取讲座列表
  getLectureList(data) {
    console.log('调用getLectureList，参数:', data);
    return request({
      name: 'getLectureList',
      data
    }).then(res => debugAPI('getLectureList返回', res));
  },
  
  // 获取讲座详情
  getLectureDetail(id) {
    console.log('调用getLectureDetail，ID:', id);
    return request({
      name: 'getLectureDetail',
      data: { id }
    }).then(res => debugAPI('getLectureDetail返回', res));
  }
}

// 文件相关API
const fileApi = {
  // 上传图片
  uploadImage(base64Data, fileName, fileType) {
    console.log('调用uploadImage, 文件名:', fileName, '类型:', fileType);
    
    // 参数检查
    if (!base64Data) {
      console.error('uploadImage: 缺少图片数据');
      return Promise.reject({
        code: -1,
        success: false,
        message: '缺少图片数据'
      });
    }
    
    console.log('上传图片, base64长度:', base64Data.length);
    
    return request({
      name: 'uploadImage',
      data: {
        base64Data,
        fileName,
        fileType
      },
      showLoading: false // 组件内已有loading
    }).then(res => {
      console.log('uploadImage返回成功:', res);
      return res;
    }).catch(err => {
      console.error('uploadImage返回错误:', err);
      return {
        code: -1,
        success: false,
        message: err.message || '上传图片失败'
      };
    });
  },
  
  // 获取单张图片
  getImage(imageId) {
    console.log('调用getImage，ID:', imageId);
    
    if (!imageId) {
      console.error('getImage: 缺少图片ID');
      return Promise.reject({
        code: -1,
        success: false,
        message: '缺少图片ID'
      });
    }
    
    return request({
      name: 'getImage',
      data: { imageId }
    }).then(res => {
      console.log('getImage返回:', res);
      
      // 处理不同的返回数据结构
      if (res && res.imageData && res.imageData.base64Data) {
        // 如果有base64数据，创建data.url结构便于统一处理
        return {
          ...res,
          data: {
            url: 'data:image/jpeg;base64,' + res.imageData.base64Data
          }
        };
      } else if (res && res.imageData && res.imageData.url) {
        // 将imageData.url提升到data.url
        return {
          ...res,
          data: {
            url: res.imageData.url
          }
        };
      }
      return res;
    });
  },
  
  // 获取多张图片
  getImageList(options = {}) {
    return request({
      name: 'getImageList',
      data: options
    });
  },
  
  // 删除图片
  deleteImage(imageId) {
    if (!imageId) {
      console.error('deleteImage: 缺少图片ID');
      return Promise.reject({
        code: -1,
        success: false,
        message: '缺少图片ID'
      });
    }
    
    return request({
      name: 'deleteImage',
      data: { imageId }
    });
  }
}

// 管理后台相关API
const adminApi = {
  // 上传各种内容（教师、讲座、课程、新闻等）
  uploadContent(data) {
    if (!data.type) {
      console.error('uploadContent: 缺少内容类型');
      return Promise.reject({
        code: -1,
        success: false,
        message: '缺少内容类型'
      });
    }
    
    if (!data.data) {
      console.error('uploadContent: 缺少内容数据');
      return Promise.reject({
        code: -1,
        success: false,
        message: '缺少内容数据'
      });
    }
    
    console.log(`上传${data.type}内容`);
    
    return request({
      name: 'uploadContent',
      data
    });
  }
}

export default {
  course: courseApi,
  user: userApi,
  teacher: teacherApi,
  lecture: lectureApi,
  file: fileApi,
  admin: adminApi
} 