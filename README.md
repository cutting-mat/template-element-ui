
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
    |--api.js                           // axios实例化配置（仅开发用，不提交代码仓库）
    |--api.sample.js                    // axios实例化配置（生产环境提交，运维部门修改host配置，并将文件名改成api.js）
    |--App.vue                          // 根组件
    |--main.js                          // 入口文件
    |--register.js                      // 全局资源注册
    |--router.js                        // 路由实例（仅包含基础路由）
    |--store.js                         // 维护一个简单store模式
```

### 模块文件结构

```
[Moudle Folder]
    |--api/                             // 接口
    |   `--user.js 
    |--assets/                          // 静态资源/样式/脚本
    |   |--img/ 
    |   |--style.css 
    |   `--util.js 
    |--components/                      // 组件
    |   |--myHeader.vue
    |   `--subMenu.vue
    |--views/                           // 页面
    |   |--401.vue
    |   |--404.vue
    |   `--login.vue
    `--index.js                         // 模块路由
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

### 权限相关

#### 权限控制方案

[Vue-Access-Control](https://github.com/tower1229/Vue-Access-Control)提供了可能是目前最灵活、细致的前端权限控制能力，完全兼容RESTful，教科书级的权限关系，清晰易懂，`菜单 + 请求 = 角色`， 通过角色为账号赋权。

脚手架基于Vue-Access-Control实现了动态菜单和请求拦截，在此基础上将菜单权限和请求权限关联起来，使它们通过上下级关系组成一棵树，让权限配置界面更容易理解。

Vue-Access-Control为了支持RESTful，导致定义api时要一起加上权限定义：

```
// 获取用户列表
export const list = {
  p: ['get,/user'],
  r: params => {
    return instance.get(`/user`, {params})
  }
}
```

p代表permission（权限），r代表request（请求），一个api的permission就是这个请求的请求动词+URL，然后实现了一个axios拦截器，会根据服务端给的用户权限列表，判断这个请求是否有权发起。在非RESTful环境中其实可以自动拼出permission，但是在RESTful环境中因为请求URL可能包含参数，因此必须约定参数在权限中的表现规则，比如用`*`代替，所以就需要用户手动定义每个api的permission，axios拦截器也会先对符合规则的url进行转换，再进行权限校验。

这里我们为了省掉手动定义permission这一步，约定舍弃RESTFul的URL参数，全部改用常规参数：

```
// RESTFul

get member/1

// URL参数改成常规参数

get member?id=1

```

这样就可以跟平常一样的定义API，axios拦截器可以通过请求配置拼出permission，`v-has`指令可以通过正则匹配从请求方法的字符串中拿到permission，完成权限验证。

这里会产生一个小问题，有的英文名词单词不区分单复数，比如 *news*，去掉URL参数后请求列表和请求单条数据都是`get /news`，没办法区分，这里我们使用一种简单粗暴的方式去解决，遇到这种单词，请求列表时强制加上*es*。

#### 权限控制工具

- `Vue.$_has`方法，用于脚本中判断当前用户是否具有某个资源权限，参数就是api请求方法，支持数组格式，数组用于多个权限联合判断
- `v-has`指令，用于模板中控制元素是否显示，基于`Vue.$_has`方法实现，参数同上

#### 可能遇到的问题

- 后端需要一个root用户不受权限限制，拥有平台所有资源，第一批资源创建、角色创建都要由这个root用户来完成
- 前端刚开始开发的时候，项目里没有任何权限，开启权限控制后应该看不到任何页面，需要先关闭权限控制(`main.js里AccessControl:false`)，用root账号创建第一批权限、角色、账号
- 拥有创建角色的账号可以创建新角色，但给新角色的赋权不能超过自身权限的范围，这是一个容易忽略的bug 

#### Mock数据

说再多不如看一眼接口，整个项目的Mock数据基于[RAP2](http://rap2.taobao.org)，搜索`"Vue-Scaffold"`可以找到模拟接口仓库。

### 开发相关

以下几点未必是最佳实践，只是做一下说明，使用者自行取舍。

- 代码仓库一般来说有dev\test\master三个分支，开发、测试、运维各用一个分支，每个环境的后端地址在api.js中配置
- 开发团队如果是多模块并行，且独立提测的情况，可以开dev_module1,dev_module2...分支，各分支分别开发并提交test，任意开发分支提交后，通知其他开发分支合并orgin/test代码
- 代码仓库只管理源码，开发者不负责部署。需要部署的环节（测试部门、运维部门）拉取代码后自行配置`api.js`，构建生产环境代码。因为多分支修改`api.js`会产生冲突，所以`api.js`文件不提交到代码仓库
- 导航菜单乃至整个项目的图标，都尽可能用[图标字体](https://www.iconfont.cn)实现，图标项目由设计师创建、维护。
- 大多数项目其实不需要vuex，`store.js`维护了一个[简单store模式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)
- IE兼容问题[解决方案](https://refined-x.com/2018/12/04/VueCLI3%20%E5%85%BC%E5%AE%B9%E6%80%A7%E9%85%8D%E7%BD%AE/)

### "开箱即用"都有啥？

首先，我不喜欢那种有不管用没用每样都来一套的杂货铺型脚手架，我觉得这是在侮辱用户的智商，就那些个破烂谁不会做？不会做还不会抄？你捡一麻袋破烂送到我面前是想说明啥？

脚手架讲究的就是个最小依赖，解决的是架构问题，不是业务问题，期望的情况是拿来就接着做，而不是拿来先一顿删。

Vue-Scaffold在架构之外，UI和工具集层面只提供少量的必要实现。

#### UI实现

- 一个四平八稳的登录界面，加上背景改改名字就完事了 
- 一个经典控制台框架，头部+侧边伸缩导航+标签管理器分别组件化放在公共模块里，并且全局注册了
- 公共样式里附赠少量必要的CSS实现，比如flex栅格系统，字体图标，滚动条美化

#### 完整的权限管理模块

- 账号管理
- 资源管理
- 角色管理
- 当前用户修改密码

基本上这块只需要跟后端看明白思路，直接实现接口就行了，真正的开箱即用。

#### 公共模块里的util.js 

- 必备的函数封装，不太能精简了 
- 集中ajax异常处理
- 事件总线机制

#### 简单store模式

- 根目录下的store.js，`common/components/nav.vue`和`common/components/header.vue`里都有用例
- 是的，我们不需要vuex

其他没了。
