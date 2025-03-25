/**
 * 修复数据库
 * @param {Object} params - 参数
 * @param {string} params.collection - 要修复的集合名称
 * @param {string} params.action - 操作类型：analyze分析/fix修复
 */
export function fixDatabase(params = {}) {
  return new Promise((resolve, reject) => {
    uniCloud.callFunction({
      name: 'fixDatabase',
      data: params
    }).then(res => {
      if (res.result && res.result.code === 0) {
        resolve(res.result);
      } else {
        reject(new Error(res.result && res.result.message || '修复数据库失败'));
      }
    }).catch(err => {
      reject(err);
    });
  });
} 