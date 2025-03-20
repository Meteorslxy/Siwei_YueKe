'use strict';
const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  try {
    const { collection, data = [], clear = false } = event;
    
    // 检查集合名是否存在
    if (!collection) {
      return {
        code: -1,
        success: false,
        message: '集合名称不能为空'
      };
    }
    
    // 检查数据是否存在
    if (!Array.isArray(data) || data.length === 0) {
      return {
        code: -1,
        success: false,
        message: '导入数据不能为空'
      };
    }
    
    // 如果需要清空集合
    if (clear) {
      // 阿里云不支持直接删除集合，需要分批删除数据
      console.log(`清空集合 ${collection} 中的数据`);
      const countResult = await db.collection(collection).count();
      const total = countResult.total;
      
      if (total > 0) {
        // 分批次删除数据，每次最多删除100条
        const batchSize = 100;
        for (let i = 0; i < Math.ceil(total / batchSize); i++) {
          const tempList = await db.collection(collection)
            .limit(batchSize)
            .get();
          
          const ids = tempList.data.map(item => item._id);
          if (ids.length > 0) {
            await db.collection(collection)
              .where({
                _id: dbCmd.in(ids)
              })
              .remove();
          }
        }
      }
    }
    
    // 批量导入数据
    console.log(`导入 ${data.length} 条数据到 ${collection} 集合`);
    
    // 添加创建时间字段
    const now = new Date();
    data.forEach(item => {
      if (!item.createTime) {
        item.createTime = now;
      }
      if (!item.updateTime) {
        item.updateTime = now;
      }
    });
    
    // 分批导入数据，每次最多导入100条
    const batchSize = 100;
    const results = [];
    
    for (let i = 0; i < Math.ceil(data.length / batchSize); i++) {
      const batch = data.slice(i * batchSize, (i + 1) * batchSize);
      const result = await db.collection(collection).add(batch);
      results.push(result);
    }
    
    return {
      code: 0,
      success: true,
      message: `成功导入 ${data.length} 条数据到 ${collection} 集合`,
      data: {
        collection,
        count: data.length,
        results
      }
    };
  } catch (error) {
    console.error('导入数据失败:', error);
    return {
      code: -1,
      success: false,
      message: '导入数据失败: ' + error.message,
      data: null
    };
  }
}; 