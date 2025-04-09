'use strict';
// 阿里云云函数入口文件
const db = uniCloud.database();
const dbCmd = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('forceUpdateBooking函数收到请求:', JSON.stringify(event));
  const { bookingId, courseId, status = 'cancelled', updateCourseCount = true, updateCourseOnly = false, decreaseBookingCount = true } = event;
  
  // 如果指定了只更新课程
  if (updateCourseOnly && courseId) {
    console.log(`仅更新课程 ${courseId} 的报名人数，${decreaseBookingCount ? '减少' : '增加'}`);
    try {
      // 获取课程当前信息
      const courseResult = await db.collection('courses').doc(courseId).get();
      
      if (!courseResult || !courseResult.data) {
        console.error('无法获取课程信息，可能课程已被删除');
        return {
          code: -1,
          success: false,
          message: '无法获取课程信息'
        };
      }
      
      // 处理课程数据
      let courseInfo = Array.isArray(courseResult.data) ? courseResult.data[0] : courseResult.data;
      console.log('课程数据:', JSON.stringify(courseInfo));
      
      // 确保bookingCount是数字类型
      let currentBookingCount = 0;
      if (courseInfo.hasOwnProperty('bookingCount')) {
        if (typeof courseInfo.bookingCount === 'number') {
          currentBookingCount = courseInfo.bookingCount;
        } else if (typeof courseInfo.bookingCount === 'string') {
          currentBookingCount = parseInt(courseInfo.bookingCount, 10) || 0;
        }
      }
      
      console.log(`当前课程报名人数:`, currentBookingCount);
      
      // 记录课程容量，优先使用courseCapacity，如果不存在则使用courseCount
      let courseCapacity = 20; // 默认值
      if (courseInfo.hasOwnProperty('courseCapacity') && typeof courseInfo.courseCapacity === 'number') {
        courseCapacity = courseInfo.courseCapacity;
      } else if (courseInfo.hasOwnProperty('courseCount') && typeof courseInfo.courseCount === 'number') {
        courseCapacity = courseInfo.courseCount;
      }
      
      console.log(`课程容量: ${courseCapacity}`);
      
      // 如果是减少且当前报名人数大于0，或者是增加
      if ((decreaseBookingCount && currentBookingCount > 0) || !decreaseBookingCount) {
        let updateSuccess = false;
        
        // 尝试方法1: 使用inc操作符
        try {
          console.log(`尝试方法1: 使用dbCmd.inc(${decreaseBookingCount ? '-1' : '1'})操作符`);
          const result1 = await db.collection('courses')
            .doc(courseId)
            .update({
              bookingCount: decreaseBookingCount ? dbCmd.inc(-1) : dbCmd.inc(1)
            });
            
          console.log('方法1结果:', JSON.stringify(result1));
          
          if (result1 && result1.updated > 0) {
            updateSuccess = true;
            console.log(`✅ 方法1成功: 已${decreaseBookingCount ? '减少' : '增加'}课程报名人数`);
          } else {
            console.warn('⚠️ 方法1失败，尝试方法2');
          }
        } catch (err1) {
          console.error('方法1失败:', err1);
        }
        
        // 如果方法1失败，尝试方法2: 直接设置新值
        if (!updateSuccess) {
          try {
            // 计算新的报名人数
            const newBookingCount = decreaseBookingCount ? 
              Math.max(0, currentBookingCount - 1) : 
              currentBookingCount + 1;
              
            console.log('尝试方法2: 直接设置新报名人数为', newBookingCount);
            const result2 = await db.collection('courses')
              .doc(courseId)
              .update({
                bookingCount: newBookingCount
              });
              
            console.log('方法2结果:', JSON.stringify(result2));
            
            if (result2 && result2.updated > 0) {
              updateSuccess = true;
              console.log(`✅ 方法2成功: 已设置课程报名人数为 ${newBookingCount}`);
            } else {
              console.error('❌ 方法2失败，尝试方法3');
              
              // 尝试方法3: 使用where条件更新
              try {
                console.log('尝试方法3: 使用where查询条件更新');
                const result3 = await db.collection('courses')
                  .where({ _id: courseId })
                  .update({
                    bookingCount: newBookingCount
                  });
                  
                console.log('方法3结果:', JSON.stringify(result3));
                
                if (result3 && result3.updated > 0) {
                  updateSuccess = true;
                  console.log(`✅ 方法3成功: 已设置课程报名人数为 ${newBookingCount}`);
                } else {
                  console.error('❌ 所有方法都失败，无法更新课程报名人数');
                }
              } catch (err3) {
                console.error('方法3失败:', err3);
              }
            }
          } catch (err2) {
            console.error('方法2失败:', err2);
          }
        }
        
        // 返回结果
        return {
          code: updateSuccess ? 0 : -1,
          success: updateSuccess,
          message: updateSuccess ? 
            (decreaseBookingCount ? '课程报名人数已减少' : '课程报名人数已增加') : 
            '更新课程报名人数失败',
          data: {
            courseId: courseId,
            updated: updateSuccess,
            currentCount: currentBookingCount,
            newCount: decreaseBookingCount ? 
              Math.max(0, currentBookingCount - 1) : 
              currentBookingCount + 1,
            courseCapacity: courseCapacity // 返回课程容量信息
          }
        };
      } else if (decreaseBookingCount && currentBookingCount <= 0) {
        console.log('课程报名人数已为0，无需减少');
        return {
          code: 0,
          success: true,
          message: '课程报名人数已为0，无需减少',
          data: {
            courseId: courseId,
            updated: false,
            currentCount: 0,
            courseCapacity: courseCapacity // 返回课程容量信息
          }
        };
      }
    } catch (err) {
      console.error('更新课程报名人数失败:', err);
      return {
        code: -1,
        success: false,
        message: '更新课程报名人数失败: ' + (err.message || '未知错误')
      };
    }
  }
  
  if (!bookingId && !updateCourseOnly) {
    console.log('缺少bookingId参数，更新预约失败');
    return {
      code: -1,
      success: false,
      message: '预约ID不能为空'
    };
  }
  
  try {
    console.log(`强制更新预约 ${bookingId} 状态为 ${status}`);
    
    // 先获取预约信息，以便后续更新课程报名人数
    let booking = null;
    try {
      const bookingResult = await db.collection('bookings')
        .doc(bookingId)
        .get();
        
      if (bookingResult && bookingResult.data) {
        booking = bookingResult.data;
        console.log('获取到预约记录:', booking);
      }
    } catch (errGet) {
      console.error('获取预约信息失败:', errGet);
    }
    
    // 不检查任何权限，直接更新数据库
    let updateResult;
    let updated = false;
    
    // 尝试方法1：使用doc方式更新
    try {
      updateResult = await db.collection('bookings')
        .doc(bookingId)
        .update({
          status: status,
          updateTime: new Date(),
          cancelTime: new Date()
        });
      
      console.log('更新方法1结果:', updateResult);
      if (updateResult && updateResult.updated > 0) {
        updated = true;
      }
    } catch (err1) {
      console.error('更新方法1失败:', err1);
    }
    
    // 如果方法1失败，尝试方法2：使用where条件更新
    if (!updated) {
      try {
        updateResult = await db.collection('bookings')
          .where({ _id: bookingId })
          .update({
            status: status,
            updateTime: new Date(),
            cancelTime: new Date()
          });
        
        console.log('更新方法2结果:', updateResult);
        if (updateResult && updateResult.updated > 0) {
          updated = true;
        }
      } catch (err2) {
        console.error('更新方法2失败:', err2);
      }
    }
    
    // 如果前两种方法都失败，尝试方法3：使用数据库事务
    if (!updated) {
      try {
        const transaction = await db.startTransaction();
        
        const bookingCollection = transaction.collection('bookings');
        updateResult = await bookingCollection
          .doc(bookingId)
          .update({
            status: status,
            updateTime: new Date(),
            cancelTime: new Date()
          });
          
        await transaction.commit();
        
        console.log('更新方法3结果:', updateResult);
        if (updateResult && updateResult.updated > 0) {
          updated = true;
        }
      } catch (err3) {
        console.error('更新方法3失败:', err3);
      }
    }
    
    // 如果状态更新成功且需要更新课程报名人数
    let courseUpdateSuccess = false;
    if (updated && updateCourseCount && status === 'cancelled' && booking && booking.courseId) {
      try {
        console.log('更新课程报名人数, 课程ID:', booking.courseId);
        
        // 获取课程ID字符串
        const courseId = typeof booking.courseId === 'object' && booking.courseId.toString ? 
          booking.courseId.toString() : String(booking.courseId);
        
        console.log('处理后的课程ID:', courseId);
        
        // 调用updateCourseBookingCount云函数
        const updateResult = await uniCloud.callFunction({
          name: 'updateCourseBookingCount',
          data: { courseId: courseId }
        });
        
        console.log('updateCourseBookingCount结果:', JSON.stringify(updateResult.result));
        
        if (updateResult.result && updateResult.result.success) {
          console.log('✅ 课程报名人数更新成功:', courseId);
          courseUpdateSuccess = true;
        } else {
          console.warn('⚠️ 更新课程报名人数可能失败:', courseId);
        }
      } catch (courseErr) {
        console.error('更新课程报名人数失败:', courseErr);
        // 继续执行，不影响取消预约的结果
      }
    }
    
    // 最终结果
    if (updated) {
      return {
        code: 0,
        success: true,
        message: '预约状态已更新',
        data: {
          bookingId: bookingId,
          status: status,
          courseUpdated: courseUpdateSuccess
        }
      };
    } else {
      return {
        code: -1,
        success: false,
        message: '无法更新预约状态，请检查ID是否正确'
      };
    }
  } catch (err) {
    console.error('强制更新预约状态失败:', err);
    return {
      code: -1,
      success: false,
      message: err.message || '更新预约状态失败'
    };
  }
}; 