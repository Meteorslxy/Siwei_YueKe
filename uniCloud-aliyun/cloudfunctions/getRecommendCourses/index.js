'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  console.log('getRecommendCourses接收到的参数:', event);
  
  const { limit = 10 } = event;
  
  try {
    const collection = db.collection('courses');
    
    // 根据tags字段筛选推荐课程
    let query = collection;
    
    // 尝试使用多种查询方式，确保能找到推荐课程
    const result1 = await query
      .where({ tags: dbCmd.all(['推荐']) })
      .limit(limit)
      .get();
      
    console.log(`查询方式1找到${result1.data.length}条推荐课程`);
      
    // 如果第一种方式找不到数据，尝试第二种方式
    if (!result1.data || result1.data.length === 0) {
      const result2 = await collection
        .where({ isRecommend: true })
        .limit(limit)
        .get();
        
      console.log(`查询方式2找到${result2.data.length}条推荐课程`);
      
      // 如果第二种方式也找不到，尝试第三种方式 - 简单返回最新课程
      if (!result2.data || result2.data.length === 0) {
        const result3 = await collection
          .orderBy('createTime', 'desc')
          .limit(limit)
          .get();
          
        console.log(`查询方式3找到${result3.data.length}条最新课程`);
        
        // 获取教师信息，包括头像
        const coursesWithTeacherInfo = await addTeacherInfo(result3.data);
        
        return {
          code: 0,
          success: true,
          data: coursesWithTeacherInfo,
          message: '获取最新课程成功(无推荐课程)',
          queryMethod: 3
        };
      }
      
      // 获取教师信息，包括头像
      const coursesWithTeacherInfo = await addTeacherInfo(result2.data);
      
      return {
        code: 0,
        success: true,
        data: coursesWithTeacherInfo,
        message: '获取推荐课程成功(方式2)',
        queryMethod: 2
      };
    }
    
    // 获取教师信息，包括头像
    const coursesWithTeacherInfo = await addTeacherInfo(result1.data);
    
    return {
      code: 0,
      success: true,
      data: coursesWithTeacherInfo,
      message: '获取推荐课程成功',
      queryMethod: 1
    };
  } catch (error) {
    console.error('获取推荐课程失败:', error);
    return {
      code: -1,
      success: false,
      data: [],
      message: '获取推荐课程失败: ' + error.message
    };
  }
};

// 为课程添加教师信息（包括头像）
async function addTeacherInfo(courses) {
  if (!courses || courses.length === 0) return courses;
  
  try {
    // 获取所有课程中涉及的教师名称
    const teacherNames = [...new Set(courses.map(course => course.teacherName).filter(Boolean))];
    
    if (teacherNames.length === 0) {
      console.log('没有找到教师名称，无法获取教师信息');
      return courses;
    }
    
    console.log('查询以下教师的信息:', teacherNames);
    
    // 从教师集合中查询教师信息
    const teachersResult = await db.collection('teachers')
      .where({
        name: dbCmd.in(teacherNames)
      })
      .get();
    
    const teachers = teachersResult.data || [];
    console.log(`从数据库中找到了${teachers.length}位教师的信息`);
    
    // 创建教师名称到头像的映射
    const teacherAvatarMap = {};
    teachers.forEach(teacher => {
      if (teacher.name && teacher.avatar) {
        teacherAvatarMap[teacher.name] = teacher.avatar;
      }
    });
    
    console.log('教师头像映射:', teacherAvatarMap);
    
    // 更新课程中的教师头像
    return courses.map(course => {
      // 如果有教师名称，并且在映射中找到对应的头像
      if (course.teacherName && teacherAvatarMap[course.teacherName]) {
        console.log(`为教师 ${course.teacherName} 设置头像:`, teacherAvatarMap[course.teacherName]);
        return {
          ...course,
          teacherAvatar: teacherAvatarMap[course.teacherName]
        };
      }
      return course;
    });
  } catch (error) {
    console.error('获取教师信息失败:', error);
    return courses;
  }
} 