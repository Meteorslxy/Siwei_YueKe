// 完全禁用微信云开发
if (typeof wx !== 'undefined' && wx.cloud) {
  console.log('禁用微信云开发 - pages/app.js');
  wx.cloud = null;
} 