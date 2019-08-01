
# Vue-Scaffold

> :hamburger:基于 Vue / Element-UI / Axios / Vue-Router 的大中型项目脚手架

(演示项目接口数据来自RAP2，由于不支持https请求，演示项目可能无法正常登录，请自行下载代码，本地运行)

## 特性

- 成熟的基础设施 ElementUI/Axios/Vue-Router
- 灵活的权限控制方案 [Vue-Access-Control](https://github.com/tower1229/Vue-Access-Control)
- 微服务化代码组织
- 简单 store 模式
- 开箱即用的控制台脚手架

## 安装

- 拉取[tower1229/Vue-Scaffold](https://github.com/tower1229/Vue-Scaffold.git)代码
- 安装依赖 `npm i`
- 启动开发服务 `npm run serve`
- 执行构建 `npm run build`

## 你可能想知道

### 项目文件结构

```
Vue-Scaffold
    |--public/ 
    |--src/
    |   |--__template/                  // 空模块模板
    |   |   |--...
    |   |
    |   |--common/                      // 公共资源模块
    |   |   |--...
    |   |
    |   |--main/                        // 主模块
    |   |   |--...
    |   |
    |   |--permission/                  // 权限管理模块
    |   |   |--...
    |   |
    |--api.js                         // axios实例化配置（仅开发用，不提交代码仓库）
    |--api.sample.js                  // axios实例化配置（生产环境提交，运维部门修改host配置后将文件名改成index.js）
    |--App.vue                          // 根组件
    |--main.js                          // 入口文件
    |--register.js                      // 全局资源注册
    |--router.js                        // 路由实例（仅包含基础路由）
    |--store.js                         // 管理一个简单store模式
```

### 模块文件结构

```
[Moudle Folder]
    |--api/                     // 接口
    |   `--user.js 
    |--assets/                  // 静态资源/样式/脚本
    |   |--img/ 
    |   |--style.css 
    |   `--util.js 
    |--components/              // 组件
    |   |--myHeader.vue
    |   `--subMenu.vue
    |--views/                   // 页面
    |   |--401.vue
    |   |--404.vue
    |   `--login.vue
    `--index.js                 // 模块路由
```

### 代码拆分的思路和实现

上面的【模块文件结构】基本上就是一个经典的Vue项目`src/`目录结构，这个结构在大型项目中缺点明显，随着持续开发很容易产生巨大的`components/`和`views/`文件夹，以及庞杂的接口和静态资源，给团队协作和代码拆分复用带来极大挑战，大项目中我们需要一种更具扩展性的代码组织。

代码组织的思路是，将整个项目以功能模块为单位进行拆分，每个模块管理自己的接口、静态资源、组件、页面、路由，理论上每个模块都具备了独立运行的所有代码（当然肯定会有外部依赖），类似于微服务。当开发每个模块时，开发者的注意力可以只集中在当前模块相关的文件上，只有涉及外部依赖，或者对外共享时，才会接触到外部模块。

模块之间是相互独立的，这使得模块内部如何实现变得不重要，但所有的模块最终要融合到项目中去，这就需要模块有一个明确、规则的对外表达，告诉别人我做了什么，路由可以完美充当这个角色，模块的合并就是路由的合并。

以【权限管理模块】为例，看一下这个模块的路由文件里是什么样的：

```
export default [{
    path: '/permission',
    name: '权限设置',
    meta: {
        icon: "&#xe606;"
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    redirect: '/permission/account',
    children: [{
        path: 'account',
        name: '账号管理',
        component: (resolve) => require(['./views/account.vue'], resolve)
    }, {
        path: 'role',
        name: '角色管理',
        component: (resolve) => require(['./views/role.vue'], resolve)
    }, {
        path: 'resource',
        name: '权限管理',
        component: (resolve) => require(['./views/resource.vue'], resolve)
    }, {
        path: 'password',
        name: '修改密码',
        component: (resolve) => require(['./views/password.vue'], resolve)
    }]
}]
```

就是输出了一段普通的路由，这段路由就是这个模块的所有功能体现。怎样将他们添加到项目路由中呢，在主模块路由里（`main/index.js`）

```
import index from './views/index'

import permission from '../permission'

export default [{
    path: '/',
    name: '首页',
    component: index,
    children: [
        ...permission
    ]
}]

```

可以看到主模块路由掌握着主页(`'/'`)这个路径，只要将其他模块路由作为子路由合并进来，模块就可以被成功加载了。主模块的路由其实相当于服务注册表，将所有可用模块注册进来；同时，主模块还掌握着根节点，所以整个项目的框架布局只能在主模块里实现，这是主模块与其他模块不同的地方。

另外一个稍微有点特殊的模块是【公共资源模块】(`common/`)，用来实现基础功能和提供全局资源，比如登录注册页面，还有全局样式或脚本，都在这里实现。这些功能将作为初始路由，在项目初始化时载入，需要注意的是，这些路由都是跟`'/'`平级的。


### 开发相关

以下几点未必是最佳实践，只是做一下说明，使用者自行取舍。

- 代码仓库一般来说有dev\test\master三个分支，开发、测试、运维各用一个分支，每个环境的后端地址在api.js中配置
- 开发团队如果是多模块并行，且独立提测的情况，可以开dev_module1,dev_module2...分支，各分支分别开发并提交test，任意开发分支提交后，通知其他开发分支合并orgin/test代码
- 代码仓库只管理源码，开发者不负责部署。需要部署的环节（测试部门、运维部门）拉取代码后自行配置`api.js`，构建生产环境代码。因为多分支修改`api.js`会产生冲突，所以`api.js`文件不提交到代码仓库
- 导航菜单乃至整个项目的图标，都尽可能用[图标字体](https://www.iconfont.cn)实现，图标项目由设计师创建、维护。
- 大多数项目其实不需要vuex，`store.js`维护了一个[简单store模式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)
