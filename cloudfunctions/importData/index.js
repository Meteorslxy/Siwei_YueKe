'use strict';
const db = uniCloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { collection, data, clear = false } = event
  
  if (!collection || !data) {
    return {
      success: false,
      message: '缺少必要参数'
    }
  }
  
  try {
    // 检查集合是否存在，不存在则自动创建
    try {
      // 尝试获取集合信息
      await db.collection(collection).limit(1).get()
      console.log(`集合 ${collection} 已存在`)
    } catch (err) {
      if (err.code === 'SCHEMA_COLLECTION_NOT_EXISTS') { // UniCloud集合不存在的错误码
        console.log(`集合 ${collection} 不存在，将自动创建`)
        // 集合不存在时，会在首次添加数据时自动创建
      } else {
        console.error(`检查集合 ${collection} 时出错:`, err)
        throw err
      }
    }
    
    // 如果需要清除集合中的数据
    if (clear) {
      try {
        const dbCollection = db.collection(collection)
        // 查询所有数据
        const countResult = await dbCollection.count()
        const total = countResult.total
        
        // 如果集合中有数据，先删除
        if (total > 0) {
          // 批量删除时，需要获取所有_id
          const MAX_LIMIT = 100
          const batchTimes = Math.ceil(total / MAX_LIMIT)
          
          // 分批次删除
          for (let i = 0; i < batchTimes; i++) {
            // 查询当前批次的数据
            const items = await dbCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
            
            // 批量删除
            for (let item of items.data) {
              await dbCollection.doc(item._id).remove()
            }
          }
          
          console.log(`已清空集合 ${collection} 中的数据`)
        }
      } catch (error) {
        console.error(`清空集合 ${collection} 失败:`, error)
        return {
          success: false,
          message: `清空集合 ${collection} 失败`,
          error
        }
      }
    }
    
    // 根据传入的数据类型处理
    if (Array.isArray(data)) {
      // 如果是数组，则批量导入
      const addPromises = data.map(item => {
        // 添加时间戳
        const now = new Date()
        item.createdAt = now
        item.updatedAt = now
        
        return db.collection(collection).add(item)
      })
      
      await Promise.all(addPromises)
      
      return {
        success: true,
        message: `成功导入 ${data.length} 条数据到集合 ${collection}`,
        isNewCollection: true
      }
    } else if (typeof data === 'object') {
      // 如果是对象，则导入单条数据
      const now = new Date()
      data.createdAt = now
      data.updatedAt = now
      
      await db.collection(collection).add(data)
      
      return {
        success: true,
        message: `成功导入 1 条数据到集合 ${collection}`,
        isNewCollection: true
      }
    } else {
      return {
        success: false,
        message: '数据格式不正确'
      }
    }
  } catch (error) {
    console.error(`导入数据到集合 ${collection} 失败:`, error)
    return {
      success: false,
      message: `导入数据到集合 ${collection} 失败`,
      error
    }
  }
} 