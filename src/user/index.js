export default [{
    path: '/user',
    name: '个人中心',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    meta: {
        hide: true
    },
    children: [{
        path: 'info',
        name: '个人信息',
        component: (resolve) => require(['./views/Info.vue'], resolve)
    }, {
        path: 'password',
        name: '修改密码',
        component: (resolve) => require(['./views/Password.vue'], resolve)
    }
    ]
}]