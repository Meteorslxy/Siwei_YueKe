/**
 * 云函数请求封装
 * @param {Object} options
 * @param {String} options.name 云函数名称
 * @param {Object} options.data 请求参数
 * @param {Boolean} options.showLoading 是否显示加载提示
 * @param {Boolean} options.useMock 是否使用模拟数据
 */
function request(options = {}) {
  const { name, data = {}, showLoading = true, useMock = false } = options;
  
  // 检查云函数名称是否存在
  if (!name) {
    console.error('云函数名称不能为空');
    return Promise.reject(new Error('云函数名称不能为空'));
  }
  
  if (showLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
  }
  
  // 检查是否为游客模式
  const systemInfo = uni.getSystemInfoSync();
  const isGuestMode = systemInfo && systemInfo.result && systemInfo.result.isGuest || false;
  
  // 判断是否使用模拟数据
  // 1. 指定使用模拟数据
  // 2. 在游客模式下
  // 3. 在开发模式下
  const shouldUseMockData = useMock || isGuestMode || (getApp() && getApp().globalData && getApp().globalData.$isDevMode) || false;
  
  if (shouldUseMockData) {
    console.log(`[模拟数据] 使用模拟数据调用云函数: ${name}`);
  }
  
  return new Promise((resolve, reject) => {
    // 使用模拟数据
    if (shouldUseMockData) {
      console.warn('使用模拟数据，原因:', useMock ? '手动指定' : (isGuestMode ? '游客模式' : '开发模式'));
      // 延迟模拟网络请求
      setTimeout(() => {
        if (showLoading) {
          uni.hideLoading();
        }
        
        // 根据不同的云函数名返回不同的模拟数据
        let mockData = getMockData(name, data);
        
        resolve(mockData);
      }, 500);
      return;
    }
    
    // 正常调用云函数 - 使用uniCloud
    // 先确保阿里云环境正确初始化
    const spaceId = getApp().globalData.$spaceId || 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29';
    
    // 微信小程序特殊处理 - 只使用阿里云UniCloud
    // #ifdef MP-WEIXIN
    console.log(`微信小程序环境下调用云函数[${name}]，使用阿里云UniCloud，spaceId: ${spaceId}`);
    // 确保微信云函数被禁用
    if (typeof wx !== 'undefined' && wx.cloud) {
      wx.cloud = null;
      console.log('在request.js中禁用微信云开发');
    }
    // #endif
    
    console.log(`调用阿里云云函数[${name}]，环境ID: ${spaceId}`);
    
    // 检查uniCloud是否存在
    if (typeof uniCloud === 'undefined') {
      console.error('uniCloud对象不存在，可能是平台不支持，使用模拟数据');
      // 使用模拟数据
      let mockData = getMockData(name, data);
      if (mockData) {
        if (showLoading) {
          uni.hideLoading();
        }
        resolve(mockData);
        return;
      }
    }
    
    // 使用uniCloud调用云函数
    uniCloud.callFunction({
      name,
      data,
      success: res => {
        console.log(`云函数 ${name} 调用成功:`, res.result);
        
        // 检查返回数据是否为空或有错误
        if (!res.result) {
          console.warn(`云函数 ${name} 返回数据为空`);
          // 使用模拟数据
          let mockData = getMockData(name, data);
          return resolve(mockData);
        }
        
        // 检查是否有mongo数据库错误(mongo_cell_decision_not_found)
        if (res.result.code === -1 && 
            res.result.message && 
            (res.result.message.includes('mongo_cell_decision_not_found') || 
             res.result.message.includes('获取') && res.result.message.includes('失败'))) {
          console.warn(`云函数 ${name} 数据库连接错误，使用模拟数据:`, res.result.message);
          // 显示提示
          uni.showToast({
            title: '正在使用演示数据',
            icon: 'none',
            duration: 2000
          });
          // 使用模拟数据
          let mockData = getMockData(name, data);
          return resolve(mockData);
        }
        
        resolve(res.result);
      },
      fail: err => {
        console.error(`云函数 ${name} 调用失败:`, err);
        
        // 云函数不存在或失败时，自动切换到模拟数据模式
        console.warn(`云函数 ${name} 调用失败，使用模拟数据`);
        
        // 使用对应的模拟数据
        let mockData = getMockData(name, data);
        
        if (mockData) {
          return resolve(mockData);
        }
        
        uni.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none'
        });
        reject(err);
      },
      complete: () => {
        if (showLoading) {
          uni.hideLoading();
        }
      }
    });
  });
}

// 获取模拟数据
function getMockData(name, data = {}) {
  let mockData = { code: 0, success: true, data: [], message: '模拟数据' };
  
  // 根据不同的云函数名返回不同的模拟数据
  if (name === 'getCourseList' || name === 'getCourses') {
    mockData.data = [
      {
        id: '1',
        title: '高中数学进阶课程',
        image: '/static/images/course/course1.jpg',
        tags: ['热门', '推荐'],
        price: 299,
        originalPrice: 399,
        teacher: {
          name: '张老师',
          avatar: '/static/images/teacher/teacher1.jpg'
        }
      },
      {
        id: '2',
        title: '初中英语强化训练',
        image: '/static/images/course/course2.jpg',
        tags: ['新课'],
        price: 199,
        originalPrice: 299,
        teacher: {
          name: '李老师',
          avatar: '/static/images/teacher/teacher2.jpg'
        }
      },
      {
        id: '3',
        title: '物理实验与应用',
        image: '/static/images/course/course3.jpg',
        tags: ['畅销'],
        price: 259,
        originalPrice: 359,
        teacher: {
          name: '王老师',
          avatar: '/static/images/teacher/teacher3.jpg'
        }
      },
      {
        id: '4',
        title: '高考语文冲刺班',
        image: '/static/images/course/course4.jpg',
        tags: ['推荐'],
        price: 329,
        originalPrice: 429,
        teacher: {
          name: '刘老师',
          avatar: '/static/images/teacher/teacher4.jpg'
        }
      }
    ];
  }
  else if (name === 'getNewsList' || name === 'getNews') {
    mockData.data = [
      {
        id: '1',
        title: '关于2023年暑期课程安排的通知',
        image: '/static/images/news/news1.jpg',
        date: '2023-05-15',
        views: 256,
        summary: '2023年暑期课程现已开放报名，本次课程涵盖多个学科领域...'
      },
      {
        id: '2',
        title: '名师讲座：如何提高学习效率',
        image: '/static/images/news/news2.jpg',
        date: '2023-05-10',
        views: 198,
        summary: '著名教育专家王教授将于下周六在我校举办讲座，主题为"如何提高学习效率"...'
      },
      {
        id: '3',
        title: '2023年寒假班课程即将开始报名',
        image: '/static/images/news/news3.jpg',
        date: '2023-05-05',
        views: 176,
        summary: '寒假即将来临，为了帮助学生更好地利用假期时间，提高学习成绩...'
      },
      {
        id: '4',
        title: '教学成果展示：学生优秀作品赏析',
        image: '/static/images/news/news4.jpg',
        date: '2023-04-28',
        views: 143,
        summary: '本次展示汇集了我校学生在各个学科领域的优秀作品，展现了学生们的创造力和学习成果...'
      },
      {
        id: '5',
        title: '教师团队：专业能力提升培训',
        image: '/static/images/news/news5.jpg',
        date: '2023-04-20',
        views: 128,
        summary: '为提升教师团队的专业能力和教学水平，学校组织了一系列的培训活动...'
      }
    ];
  }
  else if (name === 'getRecommendCourses') {
    mockData.data = [
      {
        id: '1',
        title: '高中数学进阶课程',
        image: '/static/images/course/course1.jpg',
        tags: ['热门', '推荐'],
        price: 299,
        originalPrice: 399,
        bookingCount: 120,
        teacher: {
          name: '张老师',
          avatar: '/static/images/teacher/teacher1.jpg',
          title: '高级讲师'
        }
      },
      {
        id: '2',
        title: '初中英语强化训练',
        image: '/static/images/course/course2.jpg',
        tags: ['新课'],
        price: 199,
        originalPrice: 299,
        bookingCount: 98,
        teacher: {
          name: '李老师',
          avatar: '/static/images/teacher/teacher2.jpg',
          title: '英语教研组长'
        }
      },
      {
        id: '3',
        title: '初中英语提升班',
        image: '/static/images/course/course3.jpg',
        tags: ['畅销'],
        price: 259,
        originalPrice: 359,
        bookingCount: 85,
        teacher: {
          name: '王老师',
          avatar: '/static/images/teacher/teacher3.jpg',
          title: '英语教研组长'
        }
      },
      {
        id: '4',
        title: '高考语文冲刺班',
        image: '/static/images/course/course4.jpg',
        tags: ['推荐'],
        price: 329,
        originalPrice: 429,
        bookingCount: 75,
        teacher: {
          name: '刘老师',
          avatar: '/static/images/teacher/teacher4.jpg',
          title: '语文特级教师'
        }
      }
    ];
  }
  else if (name === 'getCourseDetail') {
    mockData.data = {
      id: data.id || '1',
      title: data.id === '2' ? '初中英语强化训练' : (data.id === '3' ? '初中英语提升班' : '高中数学进阶课程'),
      image: `/static/images/course/course${data.id || '1'}.jpg`,
      description: '这是一个针对学生学习需求定制的专业课程，由经验丰富的教师团队精心设计。',
      content: '课程内容包括多个章节，每个章节有不同的主题和内容。通过系统学习，学生将掌握核心知识点和解题技巧。',
      price: data.id === '2' ? 199 : (data.id === '3' ? 259 : 299),
      originalPrice: data.id === '2' ? 299 : (data.id === '3' ? 359 : 399),
      bookingCount: data.id === '2' ? 98 : (data.id === '3' ? 85 : 120),
      chapter: [
        { title: '第一章：基础知识', lessons: ['1.1 基本概念', '1.2 基本方法', '1.3 典型例题'] },
        { title: '第二章：核心技巧', lessons: ['2.1 解题思路', '2.2 常见错误', '2.3 练习题解析'] },
        { title: '第三章：提高应用', lessons: ['3.1 综合运用', '3.2 实战演练', '3.3 能力提升'] }
      ],
      teacher: {
        id: data.id === '2' ? '2' : (data.id === '3' ? '3' : '1'),
        name: data.id === '2' ? '李老师' : (data.id === '3' ? '王老师' : '张老师'),
        avatar: `/static/images/teacher/teacher${data.id || '1'}.jpg`,
        title: data.id === '2' ? '英语教研组长' : (data.id === '3' ? '英语教研组长' : '高级讲师'),
        description: '有多年教学经验，曾获得多项教学奖项。擅长针对学生的不同特点制定个性化教学方案。'
      }
    };
  }
  else if (name === 'yuekeCloudTest') {
    mockData = {
      code: 0,
      success: true,
      message: '云函数连接成功(模拟数据)',
      timestamp: new Date().toISOString()
    };
  }
  
  return mockData;
}

export default request; 