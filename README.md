# 约课小程序

基于uni-app开发的约课平台微信小程序，使用UniCloud云开发。

## 项目特点

- 使用 uniapp 跨平台框架开发，一套代码可发布到微信小程序、H5、App等多个平台
- 采用 Vue.js 开发，组件化设计，代码易于维护
- UI 设计美观，用户体验良好
- 功能完善，涵盖课程预约、课表管理、个人中心等功能

## 项目结构

```
├── api                   # API接口目录
├── components            # 组件目录
├── pages                 # 页面目录
├── static                # 静态资源目录
├── uniCloud-tcb          # UniCloud云开发目录
│   ├── cloudfunctions    # 云函数目录
│   └── database          # 数据库目录
├── App.vue               # 应用入口文件
├── main.js               # 主入口文件
├── manifest.json         # 配置文件
├── pages.json            # 页面配置
└── uni.scss              # 全局样式变量
```

## 功能模块

1. **首页**
   - 轮播图展示
   - 导航菜单
   - 推荐课程
   - 名师推荐

2. **课程预约**
   - 课程分类
   - 课程筛选
   - 课程列表
   - 课程详情
   - 课程预约

3. **我的课表**
   - 日历展示
   - 课程安排
   - 课程详情

4. **个人中心**
   - 用户信息
   - 我的预约
   - 常用功能
   - 系统设置

## 云函数开发

本项目使用UniCloud-tcb作为云开发平台，云函数位于`uniCloud-tcb/cloudfunctions`目录下：

- `test`: 测试云环境连接状态
- `importData`: 导入模拟数据到云数据库

## 开发说明

1. 创建UniCloud云服务空间：
   - 登录HBuilder X
   - 点击菜单 "工具" > "云开发控制台"
   - 创建新的云服务空间

2. 部署云函数：
   - 右键点击`uniCloud-tcb/cloudfunctions`下的云函数
   - 选择"上传部署云函数"

3. 修改云服务空间ID：
   - 在`main.js`中设置正确的`spaceId`
   - 在`App.vue`中更新相同的`spaceId`

4. 数据导入：
   - 运行小程序
   - 进入"我的"页面
   - 在开发环境下使用"云数据库导入工具"

## 开发环境

- HBuilder X 3.6.18+
- uni-app 2.0+
- 微信开发者工具
- UniCloud云开发

## 运行项目

1. 克隆项目
```bash
git clone https://github.com/yourusername/yueke.git
```

2. 进入项目目录，安装依赖
```bash
cd yueke
npm install
```

3. 运行项目
```bash
# 运行到微信小程序
npm run dev:mp-weixin

# 运行到H5
npm run dev:h5
```

## 打包发布

```bash
# 打包微信小程序
npm run build:mp-weixin

# 打包H5
npm run build:h5
```

## 注意事项

1. 请确保已安装微信开发者工具，并在 HBuilderX 中配置好相关路径
2. 首次运行到微信小程序时，需要在微信开发者工具中打开项目目录下的 dist/dev/mp-weixin 目录
3. 确保已在HBuilder X中登录并创建UniCloud云服务空间
4. 确保`main.js`和`App.vue`中的`spaceId`与云服务空间ID匹配
5. 首次运行需要先部署云函数

## 项目截图

(这里可以放一些项目截图)

# 微信用户信息获取说明

## 当前处理方式

1. 登录流程：
   - 使用 `uni.getUserProfile` 方法获取用户微信信息
   - 微信昵称仅保存到 `wx_nickname` 字段中
   - 不再将微信昵称保存到 `nickname` 字段，使用默认值"微信用户"
   - 这样确保系统能够弹出学生姓名设置弹窗

## 修改文件

1. `uniCloud-aliyun/cloudfunctions/login/index.js`
   - 微信登录处理函数 `handleWechatLogin`
   - 手机号登录处理函数 `handlePhoneLogin`
   - 已修改为只更新wx_nickname，不更新nickname字段

## 变更说明

系统只将微信授权的昵称保存到wx_nickname字段，nickname字段保持默认值"微信用户"，确保学生姓名设置弹窗能够正常显示，引导用户设置真实姓名。 