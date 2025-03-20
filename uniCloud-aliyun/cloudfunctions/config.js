'use strict';

// UniCloud阿里云环境配置
module.exports = {
  // 云环境配置
  provider: 'aliyun',
  spaceId: 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29',
  
  // 数据库集合
  collections: {
    courses: 'courses',       // 课程集合
    teachers: 'teachers',     // 教师集合
    bookings: 'bookings',     // 预约集合
    users: 'users',           // 用户集合
    news: 'news',             // 新闻资讯
    schools: 'schools'        // 校区信息
  }
}; 