  // 获取资讯数据
  async getNews() {
    try {
      // 使用API接口调用云函数
      const result = await this.$api.course.getNewsList({ page: 1, pageSize: 5 }, true);
      if (result.code === 0) {
        this.newsList = result.data || [];
      } else {
        throw new Error(result.message || '获取资讯失败');
      }
    } catch (error) {
      console.error('获取资讯失败:', error);
      uni.showToast({
        title: '获取资讯失败',
        icon: 'none'
      });
    }
  },
  
  // 获取推荐课程
  async getRecommendCourses() {
    try {
      // 使用API接口调用云函数
      const result = await this.$api.course.getRecommendCourses({}, true);
      if (result.code === 0) {
        this.recommendCourses = result.data || [];
      } else {
        throw new Error(result.message || '获取推荐课程失败');
      }
    } catch (error) {
      console.error('获取推荐课程失败:', error);
      uni.showToast({
        title: '获取推荐课程失败',
        icon: 'none'
      });
    }
  } 