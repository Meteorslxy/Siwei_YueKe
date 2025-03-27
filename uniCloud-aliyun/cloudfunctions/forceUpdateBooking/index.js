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
              currentBookingCount + 1
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
            currentCount: 0
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
        
        // 先查询课程当前的报名人数
        let currentCount = 0;
        let courseInfo = null;
        
        try {
          const courseResult = await db.collection('courses').doc(courseId).get();
          if (courseResult && courseResult.data) {
            courseInfo = courseResult.data;
            currentCount = courseInfo.bookingCount || 0;
            console.log('当前课程报名人数:', currentCount, '课程信息:', courseInfo.title);
          } else {
            console.error('未找到课程信息:', courseId);
          }
        } catch (e) {
          console.error('获取课程当前报名人数失败:', e);
        }
        
        // 方法1: 使用dbCmd.inc(-1)
        try {
          console.log('尝试方法1: 使用dbCmd.inc(-1)更新报名人数');
          const courseUpdateResult = await db.collection('courses')
            .doc(courseId)
            .update({
              bookingCount: dbCmd.inc(-1) // 减少bookingCount
            });
          
          console.log('方法1 - 课程报名人数更新结果:', courseUpdateResult);
          
          if (courseUpdateResult && courseUpdateResult.updated > 0) {
            courseUpdateSuccess = true;
            console.log(`方法1 - 课程报名人数已成功减1: ${currentCount} -> ${currentCount - 1}, 课程:[${courseInfo?.title || courseId}]`);
          } else {
            console.warn('方法1 - 课程报名人数更新可能失败，尝试方法2');
          }
        } catch (updateErr) {
          console.error('方法1 - 更新课程报名人数失败:', updateErr);
        }
        
        // 方法2: 如果方法1失败且当前报名人数大于0，直接设置新值
        if (!courseUpdateSuccess && currentCount > 0) {
          try {
            const newCount = Math.max(0, currentCount - 1);
            console.log(`方法2 - 尝试直接设置新报名人数: ${currentCount} -> ${newCount}`);
            
            const directResult = await db.collection('courses')
              .doc(courseId)
              .update({
                bookingCount: newCount
              });
              
            console.log('方法2 - 更新结果:', directResult);
            
            if (directResult && directResult.updated > 0) {
              courseUpdateSuccess = true;
              console.log(`方法2 - 课程报名人数已成功设置为 ${newCount}, 课程:[${courseInfo?.title || courseId}]`);
            } else {
              console.warn('方法2 - 更新失败，尝试方法3');
            }
          } catch (err2) {
            console.error('方法2 - 更新失败:', err2);
          }
        }
        
        // 方法3: 使用事务更新
        if (!courseUpdateSuccess && currentCount > 0) {
          try {
            console.log('方法3 - 尝试使用事务更新');
            const transaction = await db.startTransaction();
            const coursesCollection = transaction.collection('courses');
            
            const newCount = Math.max(0, currentCount - 1);
            const txResult = await coursesCollection
              .doc(courseId)
              .update({
                bookingCount: newCount
              });
              
            await transaction.commit();
            
            console.log('方法3 - 事务结果:', txResult);
            
            if (txResult && txResult.updated > 0) {
              courseUpdateSuccess = true;
              console.log(`方法3 - 事务成功，报名人数已更新为 ${newCount}, 课程:[${courseInfo?.title || courseId}]`);
            } else {
              console.error('方法3 - 事务未能更新课程，可能是权限问题');
            }
          } catch (err3) {
            console.error('方法3 - 事务更新失败:', err3);
          }
        } else if (currentCount <= 0) {
          console.log(`课程 [${courseInfo?.title || courseId}] 报名人数已为0或无法获取，无需减少`);
          courseUpdateSuccess = true; // 标记为成功，因为无需更新
        }
        
        // 更新后再次查询课程报名人数验证
        try {
          const verifyResult = await db.collection('courses').doc(courseId).get();
          if (verifyResult && verifyResult.data) {
            const newBookingCount = verifyResult.data.bookingCount || 0;
            console.log(`验证更新后的课程报名人数: ${currentCount} -> ${newBookingCount}, 差值: ${currentCount - newBookingCount}`);
            
            if (currentCount - newBookingCount !== 1 && currentCount > 0) {
              console.warn('课程报名人数可能未正确更新，检查权限和数据库规则');
            }
          }
        } catch (verifyErr) {
          console.error('验证课程报名人数失败:', verifyErr);
        }
        
        if (courseUpdateSuccess) {
          console.log('✅ 课程报名人数已成功更新');
        } else {
          console.error('❌ 所有方法都失败，课程报名人数可能未减少');
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