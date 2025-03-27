'use strict';
const db = uniCloud.database();

/**
 * 上传内容到云数据库
 * @param {Object} event - 请求参数
 * @param {String} event.type - 内容类型：teacher/lecture/course/news
 * @param {Object} event.data - 内容数据
 * @returns {Object} 上传结果
 */
exports.main = async (event, context) => {
  console.log('上传内容云函数被调用，参数:', { type: event.type });
  
  try {
    const { type, data } = event;
    
    if (!type) {
      return {
        code: -1,
        success: false,
        message: '缺少内容类型参数'
      };
    }
    
    if (!data) {
      return {
        code: -1,
        success: false,
        message: '缺少内容数据'
      };
    }
    
    // 根据不同的内容类型进行不同的处理
    switch (type) {
      case 'teacher':
        return await handleTeacher(data);
      case 'lecture':
        return await handleLecture(data);
      case 'course':
        return await handleCourse(data);
      case 'news':
        return await handleNews(data);
      default:
        return {
          code: -1,
          success: false,
          message: '不支持的内容类型: ' + type
        };
    }
  } catch (error) {
    console.error('上传内容时发生错误:', error);
    return {
      code: -1,
      success: false,
      message: '上传内容时发生错误: ' + (error.message || error)
    };
  }
};

/**
 * 处理教师信息上传
 * @param {Object} data - 教师数据
 */
async function handleTeacher(data) {
  try {
    console.log('处理教师数据上传:', data.name);
    
    // 必要字段检查
    if (!data.name || !data.title || !data.subject || !data.description || !data.avatarId) {
      return {
        code: -1,
        success: false,
        message: '教师信息缺少必要字段'
      };
    }
    
    // 准备数据
    const teacherData = {
      name: data.name,
      title: data.title,
      subject: data.subject,
      description: data.description,
      avatarId: data.avatarId,
      createTime: data.createTime || Date.now(),
      updateTime: data.updateTime || Date.now()
    };
    
    // 插入数据库
    const result = await db.collection('teachers').add(teacherData);
    
    return {
      code: 0,
      success: true,
      message: '教师信息上传成功',
      data: {
        _id: result.id
      }
    };
  } catch (error) {
    console.error('教师信息上传失败:', error);
    return {
      code: -1,
      success: false,
      message: '教师信息上传失败: ' + (error.message || error)
    };
  }
}

/**
 * 处理讲座信息上传
 * @param {Object} data - 讲座数据
 */
async function handleLecture(data) {
  try {
    console.log('处理讲座数据上传:', data.title);
    
    // 必要字段检查
    if (!data.title || !data.speaker || !data.location || 
        !data.startTime || !data.endTime || !data.content || !data.coverId) {
      return {
        code: -1,
        success: false,
        message: '讲座信息缺少必要字段'
      };
    }
    
    // 准备数据
    const lectureData = {
      title: data.title,
      speaker: data.speaker,
      location: data.location,
      startTime: data.startTime,
      endTime: data.endTime,
      content: data.content,
      coverId: data.coverId,
      createTime: data.createTime || Date.now(),
      updateTime: data.updateTime || Date.now()
    };
    
    // 插入数据库
    const result = await db.collection('lectures').add(lectureData);
    
    return {
      code: 0,
      success: true,
      message: '讲座信息上传成功',
      data: {
        _id: result.id
      }
    };
  } catch (error) {
    console.error('讲座信息上传失败:', error);
    return {
      code: -1,
      success: false,
      message: '讲座信息上传失败: ' + (error.message || error)
    };
  }
}

/**
 * 处理课程信息上传
 * @param {Object} data - 课程数据
 */
async function handleCourse(data) {
  try {
    console.log('处理课程数据上传:', data.title);
    
    // 必要字段检查
    if (!data.title || !data.category || data.price === undefined || 
        !data.location || !data.description || !data.teacher || !data.coverId) {
      return {
        code: -1,
        success: false,
        message: '课程信息缺少必要字段'
      };
    }
    
    // 准备数据
    const courseData = {
      title: data.title,
      category: data.category,
      price: Number(data.price),
      location: data.location,
      description: data.description,
      teacher: data.teacher,
      coverId: data.coverId,
      createTime: data.createTime || Date.now(),
      updateTime: data.updateTime || Date.now()
    };
    
    // 插入数据库
    const result = await db.collection('courses').add(courseData);
    
    return {
      code: 0,
      success: true,
      message: '课程信息上传成功',
      data: {
        _id: result.id
      }
    };
  } catch (error) {
    console.error('课程信息上传失败:', error);
    return {
      code: -1,
      success: false,
      message: '课程信息上传失败: ' + (error.message || error)
    };
  }
}

/**
 * 处理新闻信息上传
 * @param {Object} data - 新闻数据
 */
async function handleNews(data) {
  try {
    console.log('处理新闻数据上传:', data.title);
    
    // 必要字段检查
    if (!data.title || !data.source || !data.date || !data.content || !data.coverId) {
      return {
        code: -1,
        success: false,
        message: '新闻信息缺少必要字段'
      };
    }
    
    // 准备数据
    const newsData = {
      title: data.title,
      source: data.source,
      date: data.date,
      content: data.content,
      coverId: data.coverId,
      createTime: data.createTime || Date.now(),
      updateTime: data.updateTime || Date.now()
    };
    
    // 如果有coverImage，设置image字段，反之亦然
    if (data.coverImage) {
      newsData.coverImage = data.coverImage;
      newsData.image = data.coverImage; // 同时设置image字段
    } else if (data.image) {
      newsData.image = data.image;
      newsData.coverImage = data.image; // 同时设置coverImage字段
    }
    
    // 插入数据库
    const result = await db.collection('news').add(newsData);
    
    return {
      code: 0,
      success: true,
      message: '新闻信息上传成功',
      data: {
        _id: result.id
      }
    };
  } catch (error) {
    console.error('新闻信息上传失败:', error);
    return {
      code: -1,
      success: false,
      message: '新闻信息上传失败: ' + (error.message || error)
    };
  }
} 