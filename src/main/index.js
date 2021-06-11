import index from './views/Index'
import example from '../example'
import system from '../system'
import user from '../user'

// 业务模块（开启权限控制模式下，业务模块受登录用户权限控制）
export const moduleRoute = [
    {
        path: '/',
        name: '首页',
        component: index,
        children: [
            ...example,
            ...system,
            ...user
        ]
    }
]

// 主模块（开启权限控制模式下，主模块不受权限控制）
const mainRoute = [
    {
        path: '/login',
        name: '登录',
        component: (resolve) => require(['./views/Login.vue'], resolve)
    }, {
        path: '/404',
        name: '找不到页面',
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
]

// 如果开启权限控制，模块路由初始不注入，将由权限系统动态注入
const extRoute = process.env.VUE_APP_AUTH === "true" ? [] : moduleRoute;

export default [
    ...extRoute,
    ...mainRoute
];