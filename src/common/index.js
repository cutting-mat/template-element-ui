import register from '@/common/register'

const routes = [{
    path: '/login',
    name: '登录',
    component: (resolve) => require(['./views/login.vue'], resolve)
}, {
    path: '/401',
    name: '无权访问',
    component: (resolve) => require(['./views/401.vue'], resolve)
}, {
    path: '/404',
    name: '找不到页面',
    component: (resolve) => require(['./views/404.vue'], resolve)
}];

export default {
    routes,
    register
}