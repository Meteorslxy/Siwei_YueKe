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
  const isGuestMode = uni.getSystemInfoSync().result?.isGuest || false;
  
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
        let mockData = { code: 0, data: [], message: '模拟数据' };
        
        // 课程列表
        if (name === 'getCourseList') {
          mockData.data = [
            {
              id: '1',
              title: '模拟课程1',
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
              title: '模拟课程2',
              image: '/static/images/course/course2.jpg',
              tags: ['新课'],
              price: 199,
              originalPrice: 299,
              teacher: {
                name: '李老师',
                avatar: '/static/images/teacher/teacher2.jpg'
              }
            }
          ];
        }
        // 新闻列表
        else if (name === 'getNewsList') {
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
            }
          ];
        }
        // 推荐课程
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
            }
          ];
        }
        // 课程详情
        else if (name === 'getCourseDetail') {
          mockData.data = {
            id: data.id || '1',
            title: '模拟课程详情',
            image: '/static/images/course/course1.jpg',
            description: '这是一个模拟的课程详情描述，包含课程的详细信息。',
            content: '课程内容包括多个章节，每个章节有不同的主题和内容。',
            price: 299,
            originalPrice: 399,
            bookingCount: 120,
            teacher: {
              id: '1',
              name: '张老师',
              avatar: '/static/images/teacher/teacher1.jpg',
              title: '高级讲师',
              description: '有多年教学经验，曾获得多项教学奖项。'
            }
          };
        }
        // 用户信息
        else if (name === 'getUserInfo') {
          mockData.data = {
            id: '1',
            nickname: '模拟用户',
            avatar: '/static/images/avatar.png',
            phone: '13800138000'
          };
        }
        // 预订列表
        else if (name === 'getBookingList') {
          mockData.data = [
            {
              id: '1',
              courseId: '1',
              courseTitle: '模拟课程1',
              courseImage: '/static/images/course/course1.jpg',
              bookingTime: '2025-03-18 15:30',
              status: 1 // 1已预订，2已完成，3已取消
            }
          ];
        }
        // 教师列表
        else if (name === 'getTeacherList') {
          mockData.data = [
            {
              id: '1',
              name: '张老师',
              avatar: '/static/images/teacher/teacher1.jpg',
              title: '高级讲师',
              subject: '数学',
              experience: '10年',
              rating: 4.9,
              studentCount: 2000,
              description: '有多年教学经验，曾获得多项教学奖项。'
            },
            {
              id: '2',
              name: '李老师',
              avatar: '/static/images/teacher/teacher2.jpg',
              title: '特级教师',
              subject: '英语',
              experience: '15年',
              rating: 4.8,
              studentCount: 1800,
              description: '英语教学专家，注重培养学生的学习兴趣和应用能力。'
            },
            {
              id: '3',
              name: '王老师',
              avatar: '/static/images/teacher/teacher3.jpg',
              title: '教研组长',
              subject: '物理',
              experience: '12年',
              rating: 4.7,
              studentCount: 1500,
              description: '理论与实践相结合，让物理学习变得轻松有趣。'
            }
          ];
        }
        // 教师详情
        else if (name === 'getTeacherDetail') {
          mockData.data = {
            id: data.id || '1',
            name: '张老师',
            avatar: '/static/images/teacher/teacher1.jpg',
            title: '高级讲师',
            subject: '数学',
            experience: '10年',
            rating: 4.9,
            studentCount: 2000,
            description: '有多年教学经验，曾获得多项教学奖项。',
            courses: [
              {
                id: '1',
                title: '高中数学进阶课程',
                image: '/static/images/course/course1.jpg'
              },
              {
                id: '2',
                title: '数学思维训练营',
                image: '/static/images/course/course2.jpg'
              }
            ],
            achievements: ['全国优秀教师', '市级教学能手', '最受学生欢迎教师'],
            introduction: '张老师毕业于北京师范大学数学系，拥有10年高中数学教学经验...'
          };
        }
        
        resolve(mockData);
      }, 500);
      return;
    }
    
    // 正常调用云函数 - 使用uniCloud
    uni.cloud.callFunction({
      name,
      data,
      success: res => {
        console.log(`云函数 ${name} 调用成功:`, res.result);
        // 检查返回数据是否为空
        if (!res.result || (Array.isArray(res.result.data) && res.result.data.length === 0)) {
          console.warn(`云函数 ${name} 返回数据为空`);
        }
        resolve(res.result);
      },
      fail: err => {
        console.error(`云函数 ${name} 调用失败:`, err);
        
        // 云函数不存在时，自动切换到模拟数据模式
        if (err.errMsg && err.errMsg.includes('FunctionName parameter could not be found')) {
          console.warn(`云函数 ${name} 不存在，自动使用模拟数据`);
          
          // 使用对应的模拟数据
          let mockData = { code: 0, data: [], message: '模拟数据（云函数不存在）' };
          
          // 根据不同的云函数名返回不同的模拟数据
          if (name === 'getCourseList' || name === 'getCourses') {
            mockData.data = [
              {
                id: '1',
                title: '模拟课程1',
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
                title: '模拟课程2',
                image: '/static/images/course/course2.jpg',
                tags: ['新课'],
                price: 199,
                originalPrice: 299,
                teacher: {
                  name: '李老师',
                  avatar: '/static/images/teacher/teacher2.jpg'
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
              }
            ];
          }
          
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

export default request; 