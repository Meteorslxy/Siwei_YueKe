'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取课程ID，同时支持id和courseId两种参数名
  const courseId = event.courseId || event.id;
  
  // 校验参数
  if (!courseId) {
    return {
      code: -1,
      success: false,
      message: '课程ID不能为空'
    };
  }
  
  // 确保ID是字符串类型
  const docId = typeof courseId === 'object' ? (courseId.id || courseId._id || '') : courseId.toString();
  
  if (!docId) {
    return {
      code: -1,
      success: false,
      message: '获取课程详情失败: docId必须为字符串或数字'
    };
  }
  
  try {
    // 查询课程详情
    const courseResult = await db.collection('courses').doc(docId).get();
    
    if (!courseResult.data) {
      return {
        code: -1,
        success: false,
        message: '课程不存在'
      };
    }
    
    const course = courseResult.data;
    
    // 确保课程费用字段存在且类型正确
    if (!course.classFee || course.classFee === '') {
      console.log('课时费为空，设置默认值为0');
      course.classFee = '0';
    } else if (typeof course.classFee !== 'string') {
      course.classFee = String(course.classFee);
    }
    
    if (!course.materialFee || course.materialFee === '') {
      console.log('材料费为空，设置默认值为0');
      course.materialFee = '0';
    } else if (typeof course.materialFee !== 'string') {
      course.materialFee = String(course.materialFee);
    }
    
    // 强制设置 price 字段为课时费和材料费的总和 (主要用于回退)
    const classFee = parseFloat(course.classFee || 0);
    const materialFee = parseFloat(course.materialFee || 0);
    course.price = String(classFee + materialFee);
    
    // 确保image字段存在，如果不存在则使用coverImage的值
    if (!course.image && course.coverImage) {
      course.image = course.coverImage;
    }
    
    // 确保courseCapacity字段存在，优先使用courseCapacity，如果不存在则使用courseCount
    if (!course.courseCapacity && course.courseCount) {
      course.courseCapacity = course.courseCount;
      console.log('将旧的courseCount值复制到新的courseCapacity字段:', course.courseCapacity);
    } else if (!course.courseCapacity) {
      course.courseCapacity = 20; // 默认值
      console.log('设置默认的courseCapacity值为:', course.courseCapacity);
    }
    
    // 查询通用课程描述（当课程描述为空时）
    if (!course.description || course.description === '') {
      console.log('课程描述为空，尝试从course_description表获取通用描述');
      
      // 从课程中获取科目
      const subject = course.subject;
      
      if (subject) {
        try {
          // 步骤1: 尝试获取classtype信息
          let classtype = null;
          
          // 先检查课程是否有classtypeId字段
          const classtypeId = course.classtypeId || course.classtype_id;
          if (classtypeId) {
            console.log('根据classtypeId获取班级类型, ID:', classtypeId);
            const classtypeResult = await db.collection('course_classtype').doc(classtypeId).get();
            if (classtypeResult.data && classtypeResult.data.length > 0) {
              classtype = classtypeResult.data[0].classtype;
            } else if (classtypeResult.data) {
              classtype = classtypeResult.data.classtype;
            }
            console.log('从course_classtype表获取到classtype:', classtype);
          } 
          
          // 如果上面没找到，尝试直接使用课程的classtype字段
          if (!classtype) {
            classtype = course.classtype || course.classType || course.type;
            console.log('直接使用课程的classtype字段:', classtype);
          }
          
          // 步骤2: 使用subject和classtype在course_description表中查询
          if (classtype) {
            console.log('使用subject和classtype查询课程描述, subject:', subject, 'classtype:', classtype);
            const descResult = await db.collection('course_description')
              .where({
                subject: subject,
                classtype: classtype
              })
              .limit(1)
              .get();
              
            if (descResult.data && descResult.data.length > 0) {
              course.description = descResult.data[0].description;
              console.log('找到匹配的课程描述(subject+classtype)');
            }
          }
          
          // 步骤3: 如果没找到匹配，只用subject查询
          if (!course.description || course.description === '') {
            console.log('使用subject查询课程描述, subject:', subject);
            const generalResult = await db.collection('course_description')
              .where({
                subject: subject
              })
              .limit(1)
              .get();
              
            if (generalResult.data && generalResult.data.length > 0) {
              course.description = generalResult.data[0].description;
              console.log('找到匹配的课程描述(仅subject)');
            } else {
              console.log('未找到任何匹配的课程描述');
            }
          }
        } catch (e) {
          console.error('查询通用课程描述失败:', e);
        }
      } else {
        console.log('课程缺少subject字段，无法查询通用描述');
      }
    }
    
    // 查询教师详情（如果课程中包含教师ID）
    if (course.teacherId) {
      try {
        const teacherResult = await db.collection('teachers').doc(course.teacherId).get();
        if (teacherResult.data) {
          // 合并教师信息到课程中
          course.teacherName = teacherResult.data.name;
          course.teacherTitle = teacherResult.data.title;
          course.teacherAvatar = teacherResult.data.avatar;
          course.teacherDesc = teacherResult.data.description;
        }
      } catch (e) {
        console.error('查询教师信息失败:', e);
      }
    }
    
    // 查询已报名人数
    try {
      const bookingCount = await db.collection('bookings')
        .where({
          courseId: docId,
          status: 'confirmed' // 只统计确认的预约
        })
        .count();
      
      course.enrolled = bookingCount.total;
    } catch (e) {
      console.error('查询报名人数失败:', e);
      course.enrolled = 0;
    }
    
    // 打印关键价格字段，帮助调试
    console.log('返回课程价格信息:', {
      classFee: course.classFee,
      materialFee: course.materialFee,
      price: course.price
    });
    
    return {
      code: 0,
      success: true,
      data: course,
      message: '获取课程详情成功'
    };
  } catch (e) {
    console.error('获取课程详情失败:', e);
    return {
      code: -1,
      success: false,
      data: null,
      message: '获取课程详情失败: ' + e.message
    };
  }
}; 