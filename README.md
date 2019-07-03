
# Vue-Scaffold

> 基于 Vue / Element-UI / Axios / Vue-Router 的大中型项目脚手架

(演示项目的mock数据来自RAP2，由于不支持https请求，如无法正常登录，请自行下载代码本地运行)

## 特性

- 默认集成ElementUI/Axios/Vue-Router
- src文件模块级分隔，便于多人协作
- 整合[Vue-Access-Control权限控制方案](https://github.com/tower1229/Vue-Access-Control)
- 生产环境关闭Map

## 主要目录/文件结构

```
Vue-Scaffold
    |--public/
    |--src/
    |   |--common/                      //【公共/基础】
    |   |   |--api/
    |   |   |   |--index.js             //axios实例（不提交代码仓库）
    |   |   |   |--index.sample.js      //index.js备份文件，生产环境由运维修改host
    |   |   |   `--user.js              //用户相关接口
    |   |   |--assets/
    |   |   |   |--img/                 //公用图片
    |   |   |   |--style.css            //全局样式
    |   |   |   `--util.js              //公用方法
    |   |   |--components/              //基础组件
    |   |   |   |--myHeader.vue
    |   |   |   `--subMenu.vue
    |   |   |--views/                   //基础页面
    |   |   |   |--401.vue
    |   |   |   |--404.vue
    |   |   |   `--login.vue
    |   |   |--index.js                 //基础路由
    |   |   `--register.js              //全局资源注册插件
    |   |
    |   |--pkgMain/                     //【入口模块】
    |   |   |--api/
    |   |   |--assets/
    |   |   |--components/
    |   |   |--views/
    |   |   `--index.js                 //总路由，合并各模块路由
    |   |
    |   |--system/                      //【权限管理模块】（目录结构同上）
    |   |   |--api/
    |   |   |--assets/
    |   |   |--components/
    |   |   |--views/
    |   |   `--index.js                 //模块路由
    |--App.vue
    |--main.js
    |--router.js                        //路由实例，初始加载基础路由

```
