'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

/**
 * 更新课程的teacherId字段，关联到teachers表
 * @param {Object} event - 请求参数
 * @param {String} event.courseId - 课程ID，如果传入则只更新指定课程
 * @param {String} event.teacherName - 教师名称，如果传入则根据名称查找教师
 * @param {String} event.teacherId - 教师ID，如果传入则直接使用该ID更新课程
 * @returns {Object} 更新结果
 */
exports.main = async (event, context) => {
  console.log('收到更新课程教师ID请求:', event);
  
  // 从请求参数中获取信息
  const { courseId, teacherName, teacherId } = event;
  
  try {
    // 如果指定了courseId和teacherId，则直接更新指定课程的教师ID
    if (courseId && teacherId) {
      console.log(`直接更新课程ID ${courseId} 的教师ID为 ${teacherId}`);
      
      const updateResult = await db.collection('courses').doc(courseId).update({
        teacherId: teacherId
      });
      
      return {
        code: 0,
        success: true,
        data: updateResult,
        message: '更新课程教师ID成功'
      };
    }
    
    // 如果指定了courseId和teacherName，则查找教师ID并更新
    if (courseId && teacherName) {
      console.log(`根据教师名称 ${teacherName} 查找教师ID并更新课程ID ${courseId}`);
      
      // 查找教师
      const teacherResult = await db.collection('teachers')
        .where({
          name: teacherName
        })
        .limit(1)
        .get();
      
      if (!teacherResult.data || teacherResult.data.length === 0) {
        return {
          code: -1,
          success: false,
          message: `未找到名为 ${teacherName} 的教师`
        };
      }
      
      const teacher = teacherResult.data[0];
      console.log(`找到教师: ${teacher.name}, ID: ${teacher._id}`);
      
      // 更新课程的teacherId
      const updateResult = await db.collection('courses').doc(courseId).update({
        teacherId: teacher._id
      });
      
      return {
        code: 0,
        success: true,
        data: {
          courseId: courseId,
          teacherId: teacher._id,
          teacherName: teacher.name,
          updateResult
        },
        message: '更新课程教师ID成功'
      };
    }
    
    // 批量更新模式：处理所有未设置teacherId但有teacherName的课程
    if (!courseId && !teacherId) {
      console.log('批量更新所有未设置teacherId但有teacherName的课程');
      
      // 查找所有有teacherName但没有teacherId的课程
      const coursesResult = await db.collection('courses')
        .where({
          teacherName: dbCmd.exists(true),
          teacherId: dbCmd.eq(null).or(dbCmd.eq(''))
        })
        .field({
          _id: true,
          title: true,
          teacherName: true
        })
        .get();
      
      if (!coursesResult.data || coursesResult.data.length === 0) {
        return {
          code: 0,
          success: true,
          message: '没有找到需要更新的课程'
        };
      }
      
      const courses = coursesResult.data;
      console.log(`找到 ${courses.length} 个需要更新的课程`);
      
      // 获取所有教师
      const teachersResult = await db.collection('teachers').get();
      const teachers = teachersResult.data || [];
      
      if (teachers.length === 0) {
        return {
          code: -1,
          success: false,
          message: '没有找到任何教师记录'
        };
      }
      
      // 创建教师名称到ID的映射
      const teacherMap = {};
      teachers.forEach(teacher => {
        // 使用标准化的名称作为键，去除可能的"老师"后缀
        const normalizedName = teacher.name.replace(/老师$/, '');
        teacherMap[normalizedName] = teacher._id;
      });
      
      // 更新每个课程
      const updateResults = [];
      const updatePromises = [];
      
      for (const course of courses) {
        // 标准化课程中的教师名称
        const normalizedTeacherName = course.teacherName.replace(/老师$/, '');
        
        // 查找对应的教师ID
        const matchedTeacherId = teacherMap[normalizedTeacherName];
        
        if (matchedTeacherId) {
          console.log(`找到匹配: 课程 "${course.title}" 的教师 "${normalizedTeacherName}" ID: ${matchedTeacherId}`);
          
          // 添加更新操作到队列
          const updatePromise = db.collection('courses').doc(course._id).update({
            teacherId: matchedTeacherId
          }).then(res => {
            updateResults.push({
              courseId: course._id,
              title: course.title,
              teacherName: course.teacherName,
              teacherId: matchedTeacherId,
              success: true
            });
            return res;
          }).catch(err => {
            console.error(`更新课程 ${course._id} 失败:`, err);
            updateResults.push({
              courseId: course._id,
              title: course.title,
              teacherName: course.teacherName,
              error: err.message,
              success: false
            });
          });
          
          updatePromises.push(updatePromise);
        } else {
          console.log(`未找到匹配: 课程 "${course.title}" 的教师 "${normalizedTeacherName}"`);
          updateResults.push({
            courseId: course._id,
            title: course.title,
            teacherName: course.teacherName,
            error: '未找到匹配的教师',
            success: false
          });
        }
      }
      
      // 等待所有更新完成
      await Promise.all(updatePromises);
      
      // 返回更新结果
      const successCount = updateResults.filter(r => r.success).length;
      
      return {
        code: 0,
        success: true,
        data: {
          total: courses.length,
          success: successCount,
          failed: courses.length - successCount,
          results: updateResults
        },
        message: `成功更新 ${successCount} 个课程的教师ID`
      };
    }
    
    return {
      code: -1,
      success: false,
      message: '参数不足，请提供courseId和teacherId，或courseId和teacherName，或不提供任何参数进行批量更新'
    };
  } catch (e) {
    console.error('更新课程教师ID失败:', e);
    return {
      code: -1,
      success: false,
      message: '更新课程教师ID失败: ' + e.message
    };
  }
}; 