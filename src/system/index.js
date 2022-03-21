export default [{
    path: '/system',
    name: '系统设置',
    meta: {
        icon: ''
    },
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/system/Profile',
    children: [{
        path: 'Profile',
        name: '个人信息',
        component: (resolve) => require(['./views/Profile.vue'], resolve)
    }, {
        path: 'Password',
        name: '修改密码',
        meta: {
            hide: true
        },
        component: (resolve) => require(['./views/Password.vue'], resolve)
    }, {
        path: 'Dict',
        name: '字典管理',
        meta: {
            icon: ''
        },
        component: (resolve) => require(['./views/Dict.vue'], resolve)
    }]
}]