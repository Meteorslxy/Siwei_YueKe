/**
 * 筛选选项工具类
 * 用于统一管理和获取筛选选项数据
 */

import filterOptions from '@/static/data/filter-options.json';

/**
 * 获取所有筛选选项
 */
export function getAllFilterOptions() {
  return filterOptions;
}

/**
 * 获取年级筛选选项
 */
export function getGradeOptions() {
  return filterOptions.gradeOptions.options;
}

/**
 * 获取学科筛选选项
 */
export function getSubjectOptions() {
  return filterOptions.subjectOptions.options;
}

/**
 * 获取校区筛选选项
 */
export function getSchoolOptions() {
  return filterOptions.schoolOptions.options;
}

/**
 * 获取预约状态筛选选项
 */
export function getBookingStatusOptions() {
  return filterOptions.bookingStatus.options;
}

/**
 * 通过值获取选项标签
 * @param {Array} options - 选项数组
 * @param {String} value - 选项值
 * @returns {String} 选项标签
 */
export function getLabelByValue(options, value) {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : '';
}

/**
 * 通过年级值获取年级标签
 * @param {String} value - 年级值
 * @returns {String} 年级标签
 */
export function getGradeLabelByValue(value) {
  return getLabelByValue(getGradeOptions(), value);
}

/**
 * 通过学科值获取学科标签
 * @param {String} value - 学科值
 * @returns {String} 学科标签
 */
export function getSubjectLabelByValue(value) {
  return getLabelByValue(getSubjectOptions(), value);
}

/**
 * 通过校区值获取校区标签
 * @param {String} value - 校区值
 * @returns {String} 校区标签
 */
export function getSchoolLabelByValue(value) {
  return getLabelByValue(getSchoolOptions(), value);
}

/**
 * 通过预约状态值获取预约状态标签
 * @param {String} value - 预约状态值
 * @returns {String} 预约状态标签
 */
export function getBookingStatusLabelByValue(value) {
  return getLabelByValue(getBookingStatusOptions(), value);
}

/**
 * 判断筛选值是否有效（不是'all'且不为空）
 * @param {String} value - 筛选值
 * @returns {Boolean} 是否为有效的筛选值
 */
export function isValidFilterValue(value) {
  return value && value !== 'all';
}

export default {
  getAllFilterOptions,
  getGradeOptions,
  getSubjectOptions,
  getSchoolOptions,
  getBookingStatusOptions,
  getLabelByValue,
  getGradeLabelByValue,
  getSubjectLabelByValue,
  getSchoolLabelByValue,
  getBookingStatusLabelByValue,
  isValidFilterValue
}; 