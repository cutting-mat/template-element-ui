export default [{
    path: '/user',
    name: '个人中心',
    meta: {
        hide: true
    },
    component: (resolve) => require(['./views/Index.vue'], resolve),
    children: [{
        path: 'password',
        name: '修改密码',
        component: (resolve) => require(['./views/Password.vue'], resolve)
    }]
}]