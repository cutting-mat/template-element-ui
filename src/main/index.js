import index from './views/Index'

export default [
    {
        path: '/',
        name: '首页',
        component: index
    }, {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['./views/Login.vue'], resolve)
    }, {
        path: '/500',
        name: '服务异常',
        component: (resolve) => require(['./views/500.vue'], resolve)
    }, {
        path: '/404',
        name: '找不到页面',
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
]
