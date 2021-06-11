export default [{
    path: '/user',
    name: '个人中心',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/user/info',
    children: [{
        path: 'info',
        name: '个人信息',
        meta: {
            icon: '&#xe601;'
        },
        component: (resolve) => require(['./views/Info.vue'], resolve)
    }, {
        path: 'password',
        name: '修改密码',
        meta: {
            icon: '&#xe601;'
        },
        component: (resolve) => require(['./views/Password.vue'], resolve)
    }
    ]
}]