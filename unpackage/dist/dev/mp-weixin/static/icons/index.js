/**
 * 图标工具函数
 * 用于获取图标路径，避免因图标不存在导致加载失败
 */

// 默认图标路径
const defaultIcon = '/static/images/tabbar/home.png';

/**
 * 获取图标路径
 * @param {String} name 图标名称
 * @returns {String} 图标路径
 */
export function getIconPath(name) {
  // 实际开发中应该将每个图标添加到项目中
  // 这里为了简化，返回默认图标
  return defaultIcon;
}

// 导出
export default {
  getIconPath
}; 