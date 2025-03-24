/**
 * 教师相关API
 */
import request from '../request';
import filterUtils from '../utils/filters';

/**
 * 获取教师列表
 * @param {Object} params - 请求参数
 * @param {Number} params.page - 页码
 * @param {Number} params.pageSize - 每页数量
 * @param {String} params.keyword - 搜索关键词
 * @param {String} params.subject - 学科值（从filter-options.json中获取）
 * @param {String} params.grade - 年级值（从filter-options.json中获取）
 * @param {String} params.school - 校区值（从filter-options.json中获取）
 * @returns {Promise} API请求Promise
 */
export function getTeacherList(params = {}) {
  console.log('调用getTeacherList API，参数:', params);
  
  // 确保参数与filter-options.json一致
  const validParams = {};
  
  // 基础分页参数
  validParams.page = params.page || 1;
  validParams.pageSize = params.pageSize || 10;
  
  // 关键词
  if (params.keyword) {
    validParams.keyword = params.keyword;
  }
  
  // 学科筛选 - 'all'表示所有，不进行筛选
  if (filterUtils.isValidFilterValue(params.subject)) {
    // 验证学科值是否存在于筛选选项中
    const subjectOptions = filterUtils.getSubjectOptions();
    const isValidSubject = subjectOptions.some(option => option.value === params.subject);
    if (isValidSubject) {
      validParams.subject = params.subject;
    }
  }
  
  // 年级筛选 - 'all'表示所有，不进行筛选
  if (filterUtils.isValidFilterValue(params.grade)) {
    // 验证年级值是否存在于筛选选项中
    const gradeOptions = filterUtils.getGradeOptions();
    const isValidGrade = gradeOptions.some(option => option.value === params.grade);
    if (isValidGrade) {
      validParams.grade = params.grade;
    }
  }
  
  // 校区筛选 - 'all'表示所有，不进行筛选
  if (filterUtils.isValidFilterValue(params.school)) {
    // 验证校区值是否存在于筛选选项中
    const schoolOptions = filterUtils.getSchoolOptions();
    const isValidSchool = schoolOptions.some(option => option.value === params.school);
    if (isValidSchool) {
      validParams.school = params.school;
    }
  }
  
  return request({
    url: 'getTeacherList',
    method: 'GET',
    data: validParams
  });
}

/**
 * 获取教师详情
 * @param {String} id - 教师ID
 * @returns {Promise} API请求Promise
 */
export function getTeacherDetail(id) {
  if (!id) {
    return Promise.reject(new Error('教师ID不能为空'));
  }
  
  return request({
    url: 'getTeacherDetail',
    method: 'GET',
    data: { id }
  });
}

export default {
  getTeacherList,
  getTeacherDetail
}; 