'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 获取校区ID
  const { locationId } = event;
  
  // 校验参数
  if (!locationId) {
    return {
      code: -1,
      success: false,
      message: '校区ID不能为空'
    };
  }
  
  try {
    // 查询校区详情
    const locationResult = await db.collection('locations').doc(locationId).get();
    
    if (!locationResult.data || locationResult.data.length === 0) {
      return {
        code: -1,
        success: false,
        message: '校区不存在'
      };
    }
    
    const locationDetail = locationResult.data[0] || locationResult.data;
    
    return {
      code: 0,
      success: true,
      data: locationDetail,
      message: '获取校区详情成功'
    };
  } catch (e) {
    console.error('获取校区详情失败:', e);
    return {
      code: -1,
      success: false,
      data: null,
      message: '获取校区详情失败: ' + e.message
    };
  }
}; 