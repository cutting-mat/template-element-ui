import index from './views/index'

export default [{
    path: '/login',
    name: '登录',
    component: (resolve) => require(['./views/login.vue'], resolve)
}, {
    path: '/',
    name: '首页',
    component: index
}, {
    path: '/blank',
    name: '空白',
    component: (resolve) => require(['./views/blank.vue'], resolve)
}]