export default [{
    path: '/user',
    name: '个人中心',
    meta: {
        hide: true
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    children: [{
        path: 'password',
        name: '修改密码',
        component: (resolve) => require(['./views/password.vue'], resolve)
    }]
}]