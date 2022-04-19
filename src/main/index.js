import index from './views/Index.vue'

export default [
    {
        path: '/',
        name: '首页',
        component: index
    }, {
        path: '/login',
        name: '登录',
        component: () => import('./views/Login.vue')
    }, {
        path: '/Edit-Password',
        name: '修改密码',
        meta: {
            hide: true
        },
        component: () => import("./views/Password.vue")
    }, {
        path: '/500',
        name: '服务异常',
        component: () => import('./views/500.vue')
    }, {
        path: '/404',
        name: '找不到页面',
        component: () => import('./views/404.vue')
    }
]