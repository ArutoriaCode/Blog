### 项目说明

第一个[Nuxt](https://nuxtjs.org/)项目

项目仿照(抄)[yevpt](https://www.yevpt.com/)的页面做的。

使用的技术框架和包如下：

1. Vue2
2. Vuetify
3. dayjs
4. ...

后端语言框架考虑中

1. java
2. koa
3. egg

### 部署方式

1. 拉取仓库代码到本地
2. npm install
3. 进行打包：`npm run build`
4. 测试运行: `npm run start`
5. 使用PM2进程守护：`pm2 start npm --name "blog" -- run start`
6. 使用nginx转发到nuxt的端口


仓库代码更新后，拉取下来需要重新进行打包，之后再重启PM2的进程


