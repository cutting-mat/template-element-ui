export default [{
    path: '/system',
    name: '系统设置',
    meta: {
        icon: ''
    },
    component: () => import("./views/Index.vue"),
    redirect: '/system/Profile',
    children: [{
        path: 'Profile',
        name: '个人信息',
        component: () => import("./views/Profile.vue")
    }, {
        path: 'Dict',
        name: '字典管理',
        meta: {
            icon: ''
        },
        component: () => import("./views/Dict.vue")
    }]
}]
