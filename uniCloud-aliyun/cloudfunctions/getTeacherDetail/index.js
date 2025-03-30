'use strict';
const db = uniCloud.database();

/**
 * 获取教师详情
 * @param {Object} event - 请求参数
 * @param {String} event.id - 教师ID
 * @param {String} event.name - 教师名称(可选，当id找不到时尝试通过名称查询)
 * @returns {Object} 查询结果
 */
exports.main = async (event, context) => {
  // 克隆入参以避免修改原始对象
  const params = { ...event };
  
  console.log('获取教师详情请求原始参数:', JSON.stringify(params));
  
  // 处理id参数，确保格式正确
  if (params.id !== undefined) {
    if (typeof params.id === 'string') {
      // 处理可能被包裹在引号中的ID
      params.id = params.id.trim();
      if (params.id.startsWith('"') && params.id.endsWith('"')) {
        params.id = params.id.substring(1, params.id.length - 1);
        console.log('ID参数被引号包裹，已清理:', params.id);
      }
      
      // 如果经过处理后为空字符串，置为undefined
      if (params.id === '') {
        console.log('ID参数清理后为空字符串，将其置为undefined');
        params.id = undefined;
      }
    } else if (typeof params.id !== 'number') {
      console.error('ID参数类型无效:', typeof params.id);
      params.id = undefined;  // 无效类型，置为undefined
    }
  }
  
  // 处理name参数
  if (params.name !== undefined && typeof params.name === 'string') {
    params.name = params.name.trim();
    // 如果经过处理后为空字符串，置为undefined
    if (params.name === '') {
      params.name = undefined;
    }
  }
  
  console.log('处理后的参数:', {
    id: params.id ? params.id : '未提供',
    name: params.name ? params.name : '未提供'
  });
  
  if (!params.id && !params.name) {
    return {
      code: -1,
      message: '教师ID或名称不能同时为空'
    };
  }
  
  try {
    // 如果提供了ID，先尝试通过ID查询
    if (params.id) {
      console.log('通过ID获取教师详情，ID:', params.id, '类型:', typeof params.id);
      
      try {
        // 查询教师详情
        const teacherResult = await db.collection('teachers').doc(params.id).get();
        
        if (teacherResult.data && teacherResult.data.length > 0) {
          const teacher = teacherResult.data[0];
          
          // 查询该教师的课程
          const coursesResult = await db.collection('courses')
            .where({
              teacherId: params.id
            })
            .limit(5)
            .get();
          
          // 查询该教师的评价
          const reviewsResult = await db.collection('reviews')
            .where({
              teacherId: params.id
            })
            .orderBy('createTime', 'desc')
            .limit(5)
            .get();
          
          return {
            code: 0,
            data: {
              ...teacher,
              courses: coursesResult.data || [],
              reviews: reviewsResult.data || []
            }
          };
        }
        
        // 如果通过ID没有找到，且没有提供名称，返回错误
        if (!params.name) {
          console.log('通过ID未找到教师，ID:', params.id);
          return {
            code: -1,
            message: '教师不存在'
          };
        }
        
        // 如果通过ID没有找到，但提供了名称，继续尝试通过名称查询
        console.log('通过ID未找到教师，尝试通过名称查询，名称:', params.name);
      } catch (err) {
        console.error('通过ID查询教师出错:', err);
        
        // 如果有名称，继续尝试通过名称查询
        if (params.name) {
          console.log('通过ID查询出错，尝试通过名称查询');
        } else {
          return {
            code: -1,
            message: '获取教师详情失败: ' + err.message
          };
        }
      }
    }
    
    // 如果没有提供有效ID，或通过ID查询失败/未找到，尝试通过名称查询
    if (params.name) {
      console.log('通过名称获取教师详情，名称:', params.name);
      
      // 去除可能的"老师"后缀进行查询
      const normalizedName = params.name.replace(/老师$/, '');
      
      // 查询教师详情
      const teacherResult = await db.collection('teachers')
        .where({
          name: new RegExp(normalizedName)
        })
        .limit(1)
        .get();
      
      if (!teacherResult.data || teacherResult.data.length === 0) {
        console.log('通过名称未找到教师，名称:', params.name);
        return {
          code: -1,
          message: '未找到匹配的教师'
        };
      }
      
      const teacher = teacherResult.data[0];
      console.log('通过名称找到教师:', teacher.name, 'ID:', teacher._id);
      
      // 查询该教师的课程
      const coursesResult = await db.collection('courses')
        .where({
          teacherId: teacher._id
        })
        .limit(5)
        .get();
      
      // 查询该教师的评价
      const reviewsResult = await db.collection('reviews')
        .where({
          teacherId: teacher._id
        })
        .orderBy('createTime', 'desc')
        .limit(5)
        .get();
      
      return {
        code: 0,
        data: {
          ...teacher,
          courses: coursesResult.data || [],
          reviews: reviewsResult.data || []
        }
      };
    }
    
    // 如果执行到这里，说明既没有有效的ID，也没有名称
    return {
      code: -1,
      message: '无法获取教师信息：参数无效'
    };
    
  } catch (err) {
    console.error('获取教师详情错误:', err);
    return {
      code: -1,
      message: '获取教师详情失败: ' + err.message
    };
  }
}; 