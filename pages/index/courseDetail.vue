// ... existing code ...
// 寻找取消预约的方法

// ... existing code ...
// 取消预约
async cancelBooking() {
  if (!this.myBooking || !this.myBooking._id) {
    uni.showToast({
      title: '没有找到预约记录',
      icon: 'none'
    });
    return;
  }
  
  uni.showModal({
    title: '取消预约',
    content: '确定要取消此次预约吗？',
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '取消中...'
        });
        
        try {
          const bookingId = this.myBooking._id;
          const courseId = this.course._id;
          
          // 调用取消预约的云函数
          const result = await uniCloud.callFunction({
            name: 'cancelBooking',
            data: {
              bookingId: bookingId,
              userId: this.userInfo._id
            }
          });
          
          console.log('取消预约结果：', JSON.stringify(result));
          
          if (result.result && result.result.code === 0) {
            // 检查课程更新状态
            if (result.result.data && result.result.data.courseUpdated === false) {
              console.warn('❌ 警告：课程报名人数未被更新，尝试直接更新');
              
              // 如果未更新课程报名人数，则尝试使用forceUpdateBooking云函数
              try {
                const updateResult = await uniCloud.callFunction({
                  name: 'forceUpdateBooking',
                  data: {
                    courseId: courseId,
                    updateCourseOnly: true,
                    decreaseBookingCount: true
                  }
                });
                
                console.log('直接更新课程报名人数结果:', JSON.stringify(updateResult.result));
              } catch (updateErr) {
                console.error('直接更新课程报名人数出错:', updateErr);
              }
            } else {
              console.log('✅ 课程报名人数在cancelBooking中已更新');
            }
            
            // 更新页面状态
            this.myBooking.status = 'cancelled';
            this.hasBooked = false;
            
            // 减少本地显示的报名人数
            if (this.course.bookingCount > 0) {
              this.course.bookingCount--;
            }
            
            uni.showToast({
              title: '取消成功',
              icon: 'success'
            });
            
            // 刷新相关页面
            uni.$emit('booking:cancel', {
              courseId: courseId,
              bookingId: bookingId
            });
          } else {
            uni.showToast({
              title: result.result?.message || '取消失败',
              icon: 'none'
            });
          }
        } catch (e) {
          console.error('取消预约失败:', e);
          uni.showToast({
            title: '取消失败',
            icon: 'none'
          });
        } finally {
          uni.hideLoading();
        }
      }
    }
  });
},
// ... existing code ... 