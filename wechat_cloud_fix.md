# 解决阿里云云函数连接问题指南

## 测试真实云函数连接
您的小程序需要连接到阿里云云函数而不是使用模拟数据。请按照以下步骤操作：

### 1. 确认阿里云配置正确
首先，请确认您的阿里云UniCloud配置正确：

```js
// 确保spaceId正确
const spaceId = 'mp-d0c06b27-ec33-40fe-b28b-337811bd2f29'

// 初始化云服务
uni.cloud.init({
  provider: 'aliyun',
  spaceId,
  endpoint: 'https://api.next.bspapp.com'
});
```

### 2. 验证云函数是否存在
请确认您的阿里云服务空间中存在所需的云函数：
- yuekeCloudTest
- getCourseList
- getNewsList
- getRecommendCourses
- 其他您需要的云函数

可以通过HBuilderX的云函数管理界面或阿里云控制台检查。

### 3. 解决微信小程序环境问题
微信开发者工具可能会自动尝试连接微信云开发，为避免这种情况：

1. 在微信开发者工具中点击"详情" -> "本地设置" -> 取消勾选"启用云开发"
2. 在主文件(main.js和app.js)中添加以下代码：
   ```js
   // 禁用微信云开发
   if (typeof wx !== 'undefined' && wx.cloud) {
     wx.cloud = null;
   }
   ```

### 4. 配置微信开发者工具
1. 点击"详情" -> "本地设置"
2. 勾选"不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书"
3. 取消勾选"将JS编译成ES5"和"上传代码时自动压缩混淆"

### 5. 检查project.config.json配置
确保cloudfunctionRoot指向正确的路径：
```json
{
  "cloudfunctionRoot": "uniCloud-aliyun/cloudfunctions/",
  "cloud": false
}
```

### 6. 测试方法
您可以使用以下方法测试云函数连接：
```js
uni.cloud.callFunction({
  name: 'yuekeCloudTest',
  data: { message: '测试消息' }
}).then(res => {
  console.log('云函数返回:', res.result);
}).catch(err => {
  console.error('云函数错误:', err);
});
```

### 7. 调试过程
如遇到问题，请检查控制台输出，关注云函数调用的详细错误信息。对于`-501004`错误，通常表示没有找到云函数或云函数执行错误。 