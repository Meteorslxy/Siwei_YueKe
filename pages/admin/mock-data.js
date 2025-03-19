// 模拟数据集合
const mockData = {
  // 课程数据
  courses: [
    {
      id: '1',
      title: '高中数学进阶课程',
      image: '/static/images/course/course1.jpg',
      tags: ['热门', '推荐'],
      price: 299,
      originalPrice: 399,
      bookingCount: 120,
      gradeLevel: '高中',
      subject: '数学',
      teacherId: '1',
      teacher: {
        id: '1',
        name: '张老师',
        avatar: '/static/images/teacher/teacher1.jpg',
        title: '高级讲师'
      },
      description: '本课程针对高中数学难点进行深入讲解，帮助学生快速提高数学成绩。',
      content: '课程内容包括函数、导数、三角函数、立体几何等重要章节，通过系统讲解和大量练习，全面提升学生的数学能力。'
    },
    {
      id: '2',
      title: '初中英语提高班',
      image: '/static/images/course/course2.jpg',
      tags: ['新课'],
      price: 199,
      originalPrice: 299,
      bookingCount: 85,
      gradeLevel: '初中',
      subject: '英语',
      teacherId: '2',
      teacher: {
        id: '2',
        name: '李老师',
        avatar: '/static/images/teacher/teacher2.jpg',
        title: '英语教研组长'
      },
      description: '本课程专为初中学生设计，提高英语听说读写能力。',
      content: '课程涵盖初中英语重点语法、词汇和阅读理解，注重培养学生的语言应用能力和学习兴趣。'
    },
    {
      id: '3',
      title: '小学语文阅读写作班',
      image: '/static/images/course/course3.jpg',
      tags: ['热门'],
      price: 159,
      originalPrice: 259,
      bookingCount: 130,
      gradeLevel: '小学',
      subject: '语文',
      teacherId: '3',
      teacher: {
        id: '3',
        name: '王老师',
        avatar: '/static/images/teacher/teacher3.jpg',
        title: '语文特级教师'
      },
      description: '培养小学生的阅读兴趣和写作能力。',
      content: '通过经典文学作品阅读和多种写作训练，培养学生的文学素养和表达能力。'
    }
  ],
  
  // 教师数据
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
      description: '有多年教学经验，曾获得多项教学奖项。',
      introduction: '张老师毕业于北京师范大学数学系，拥有10年高中数学教学经验。教学风格严谨而有趣，善于用生动的例子讲解抽象的数学概念，深受学生喜爱。',
      achievements: ['全国优秀教师', '市级教学能手', '最受学生欢迎教师']
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
      description: '英语教学专家，注重培养学生的学习兴趣和应用能力。',
      introduction: '李老师毕业于上海外国语大学，拥有海外留学背景和丰富的英语教学经验。教学方法灵活多样，课堂氛围活跃，能有效激发学生的学习兴趣。',
      achievements: ['省级骨干教师', '优秀英语教师', '教学创新奖']
    },
    {
      id: '3',
      name: '王老师',
      avatar: '/static/images/teacher/teacher3.jpg',
      title: '语文特级教师',
      subject: '语文',
      experience: '20年',
      rating: 4.9,
      studentCount: 2500,
      description: '语文教育专家，致力于培养学生的人文素养。',
      introduction: '王老师毕业于北京大学中文系，从教20年来，培养了大批优秀学生。教学注重培养学生的阅读理解能力和写作表达能力，深受学生和家长好评。',
      achievements: ['特级教师', '全国语文教学大赛一等奖', '教育部优秀教师']
    }
  ],
  
  // 新闻资讯
  news: [
    {
      id: '1',
      title: '关于2023年暑期课程安排的通知',
      image: '/static/images/news/news1.jpg',
      date: '2023-05-15',
      views: 256,
      summary: '2023年暑期课程现已开放报名，本次课程涵盖多个学科领域...',
      content: '2023年暑期课程现已开放报名，本次课程涵盖语文、数学、英语、物理、化学等多个学科领域，并设有科学实验、艺术创作、体育活动等特色课程。暑期课程将于7月1日正式开始，8月25日结束，分为上、下两个阶段。家长可根据学生的实际情况选择适合的课程。报名请联系各校区前台或通过小程序在线报名。'
    },
    {
      id: '2',
      title: '名师讲座：如何提高学习效率',
      image: '/static/images/news/news2.jpg',
      date: '2023-05-10',
      views: 198,
      summary: '著名教育专家王教授将于下周六在我校举办讲座，主题为"如何提高学习效率"...',
      content: '著名教育专家王教授将于下周六(5月17日)下午2点在总校区报告厅举办讲座，主题为"如何提高学习效率"。王教授将分享科学的学习方法和时间管理技巧，帮助学生提高学习效率，减轻学习压力。讲座面向所有年级学生和家长开放，请提前报名预约座位。'
    }
  ],
  
  // 用户数据
  users: [
    {
      id: '1',
      openid: 'test_openid_1',
      nickname: '张三',
      avatar: '/static/images/avatar.png',
      phone: '13800138001',
      gender: 1,
      city: '北京',
      province: '北京',
      country: '中国',
      registerTime: new Date('2023-01-15').toISOString()
    },
    {
      id: '2',
      openid: 'test_openid_2',
      nickname: '李四',
      avatar: '/static/images/avatar.png',
      phone: '13800138002',
      gender: 2,
      city: '上海',
      province: '上海',
      country: '中国',
      registerTime: new Date('2023-02-20').toISOString()
    }
  ],
  
  // 预订数据
  bookings: [
    {
      id: '1',
      userId: '1',
      courseId: '1',
      courseTitle: '高中数学进阶课程',
      courseImage: '/static/images/course/course1.jpg',
      teacherName: '张老师',
      price: 299,
      status: 1, // 1已预订，2已完成，3已取消
      bookingTime: new Date('2023-05-01').toISOString(),
      createTime: new Date('2023-04-28').toISOString()
    },
    {
      id: '2',
      userId: '1',
      courseId: '2',
      courseTitle: '初中英语提高班',
      courseImage: '/static/images/course/course2.jpg',
      teacherName: '李老师',
      price: 199,
      status: 2, // 1已预订，2已完成，3已取消
      bookingTime: new Date('2023-04-15').toISOString(),
      createTime: new Date('2023-04-10').toISOString()
    }
  ]
};

export default mockData; 