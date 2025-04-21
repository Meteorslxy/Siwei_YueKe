/**
 * 筛选选项工具类
 * 用于统一管理和获取筛选选项数据
 */

// 直接定义筛选选项数据，不再依赖外部JSON文件
const filterOptions = {
  "gradeOptions": {
    "description": "年级筛选选项",
    "options": [
      { "label": "全部年级", "value": "all" },
      { "label": "初中", "value": "初中" },
      { "label": "初一", "value": "初一" },
      { "label": "初二", "value": "初二" },
      { "label": "初三", "value": "初三" }
    ]
  },
  
  "subjectOptions": {
    "description": "学科筛选选项",
    "options": [
      { "label": "全部", "value": "all" },
      { "label": "语文", "value": "语文" },
      { "label": "数学", "value": "数学" },
      { "label": "英语", "value": "英语" },
      { "label": "物理", "value": "物理" },
      { "label": "化学", "value": "化学" }
    ]
  },

  "schoolOptions": {
    "description": "校区筛选选项",
    "options": [
      { "label": "全部校区", "value": "all" },
      { "label": "江宁万达", "value": "江宁万达" },
      { "label": "江宁黄金海岸", "value": "江宁黄金海岸" },
      { "label": "大行宫", "value": "大行宫" },
      { "label": "新街口", "value": "新街口" },
      { "label": "雨花", "value": "雨花" },
      { "label": "桥北", "value": "桥北" },
      { "label": "奥体", "value": "奥体" },
      { "label": "龙江", "value": "龙江" },
      { "label": "六合", "value": "六合" }
    ]
  },

  "educationalStages": {
    "description": "教育阶段筛选选项",
    "options": [
      { "label": "全部", "value": "all" },
      { "label": "初中", "value": "初中" }
    ]
  },

  "courseTypes": {
    "description": "课程类型筛选选项",
    "options": [
      { "label": "全部", "value": "all" },
      { "label": "普通课程", "value": "regular" },
      { "label": "精品小班", "value": "premium" },
      { "label": "一对一", "value": "oneToOne" },
      { "label": "线上课程", "value": "online" }
    ]
  },

  "teacherTitles": {
    "description": "教师职称筛选选项",
    "options": [
      { "label": "全部", "value": "all" },
      { "label": "特级教师", "value": "特级教师" },
      { "label": "高级教师", "value": "高级教师" },
      { "label": "一级教师", "value": "一级教师" },
      { "label": "二级教师", "value": "二级教师" }
    ]
  },

  "statusOptions": {
    "description": "状态筛选选项",
    "options": [
      { "label": "全部状态", "value": "all" },
      { "label": "未开始", "value": "pending" },
      { "label": "进行中", "value": "inProgress" },
      { "label": "已结束", "value": "completed" },
      { "label": "已取消", "value": "canceled" }
    ]
  },

  "bookingStatus": {
    "description": "预约状态筛选选项",
    "options": [
      { "label": "全部", "value": "all" },
      { "label": "待确认", "value": "pending" },
      { "label": "已确认", "value": "confirmed" },
      { "label": "已取消", "value": "canceled" },
      { "label": "已完成", "value": "completed" }
    ]
  },

  "databaseFields": {
    "description": "数据库字段名称映射",
    "teacher": {
      "name": "name",
      "avatar": "avatar",
      "avatarId": "avatarId",
      "grade": "grade",
      "subject": "subject",
      "education": "education",
      "experience": "experience",
      "description": "description",
      "rating": "rating",
      "studentCount": "studentCount"
    },
    "course": {
      "title": "title",
      "description": "description",
      "coverImage": "coverImage",
      "teacherId": "teacherId",
      "subject": "subject",
      "grade": "grade",
      "schoolId": "schoolId",
      "location": "location",
      "price": "price",
      "startTime": "startTime",
      "endTime": "endTime",
      "maxEnroll": "maxEnroll",
      "enrollCount": "enrollCount",
      "status": "status"
    },
    "school": {
      "name": "name",
      "address": "address",
      "location": "location",
      "phone": "phone",
      "description": "description",
      "images": "images"
    },
    "booking": {
      "userId": "userId",
      "courseId": "courseId",
      "status": "status",
      "bookingTime": "bookingTime",
      "paymentStatus": "paymentStatus"
    },
    "news": {
      "title": "title",
      "content": "content",
      "digest": "digest",
      "coverImage": "coverImage",
      "publishTime": "publishTime",
      "author": "author",
      "source": "source",
      "viewCount": "viewCount"
    }
  }
};

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