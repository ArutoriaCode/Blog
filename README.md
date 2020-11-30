### 项目说明

第一个[Nuxt](https://nuxtjs.org/)项目

博客整体布局和样式参考[Yevpt](https://www.yevpt.com/)

使用的技术框架和包如下：

1. Vue2
2. Vuetify
3. dayjs
4. lodash
5. ...

后端语言框架

1. java（待开发）


2. egg.js（开发中）
   egg仓库地址：https://github.com/Chenwangdexiwang/Blog-egg

### 本地调试
1. 拉取仓库代码到本地
2. npm install
4. 拉取后端仓库代码
5. 修改`plugins/api.js`文件中`api.setBaseURL()`的url
6. npm run dev
7. 如要扩展，请自行解决跨域请求问题

### 部署

1. 拉取仓库代码到本地
2. npm install
3. 进行打包：`npm run build`
4. 测试运行: `npm run start`
5. 使用PM2进程守护：`pm2 start npm --name "blog" -- run start`
6. 使用nginx转发到nuxt的端口


仓库代码更新后，拉取下来需要重新进行打包，之后再重启PM2的进程


