/**
 * 科目相关API
 */
import request from '../request';

/**
 * 获取科目列表
 * @returns {Promise} API请求Promise
 */
export function getSubjectList() {
  return request({
    name: 'getSubjectList',
    data: {}
  });
}

export default {
  getSubjectList
}; 