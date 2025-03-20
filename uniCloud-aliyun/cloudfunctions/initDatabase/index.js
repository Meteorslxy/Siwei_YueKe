'use strict';
const db = uniCloud.database();

// 模拟数据
const mockData = {
  teachers: [
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
      title: '英语教研组长',
      subject: '英语',
      experience: '15年',
      rating: 4.8,
      studentCount: 1800,
      description: '英语教学专家，注重培养学生的学习兴趣和应用能力。'
    }
  ],
  courses: [
    {
      id: '1',
      title: '高中数学进阶课程',
      image: '/static/images/course/course1.jpg',
      tags: ['热门', '推荐'],
      price: 299,
      originalPrice: 399,
      bookingCount: 120,
      teacherId: '1',
      description: '这是一个针对学生学习需求定制的专业课程。'
    },
    {
      id: '2',
      title: '初中英语强化训练',
      image: '/static/images/course/course2.jpg',
      tags: ['新课'],
      price: 199,
      originalPrice: 299,
      bookingCount: 98,
      teacherId: '2',
      description: '专为初中生设计的英语强化训练课程。'
    }
  ],
  news: [
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
      summary: '著名教育专家王教授将于下周六在我校举办讲座...'
    }
  ]
};

// 直接创建表并插入数据
exports.main = async (event, context) => {
  const results = {};
  
  try {
    // 创建教师表
    try {
      // 直接添加数据，会自动创建表
      const teachersRes = await db.collection('teachers').add(mockData.teachers);
      results.teachers = {
        success: true,
        message: `成功创建教师表并添加${mockData.teachers.length}条数据`,
        data: teachersRes
      };
    } catch (error) {
      results.teachers = {
        success: false,
        message: `创建教师表失败: ${error.message}`,
        error: error.message
      };
    }
    
    // 创建课程表
    try {
      const coursesRes = await db.collection('courses').add(mockData.courses);
      results.courses = {
        success: true,
        message: `成功创建课程表并添加${mockData.courses.length}条数据`,
        data: coursesRes
      };
    } catch (error) {
      results.courses = {
        success: false,
        message: `创建课程表失败: ${error.message}`,
        error: error.message
      };
    }
    
    // 创建新闻表
    try {
      const newsRes = await db.collection('news').add(mockData.news);
      results.news = {
        success: true,
        message: `成功创建新闻表并添加${mockData.news.length}条数据`,
        data: newsRes
      };
    } catch (error) {
      results.news = {
        success: false,
        message: `创建新闻表失败: ${error.message}`,
        error: error.message
      };
    }
    
    return {
      success: true,
      results: results,
      message: '数据库初始化完成'
    };
  } catch (error) {
    console.error('初始化数据库失败:', error);
    return {
      success: false,
      error: error.message,
      message: '初始化数据库失败: ' + error.message
    };
  }
};
