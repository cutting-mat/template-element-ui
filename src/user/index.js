export default [{
    path: '/user',
    name: '用户管理',
    meta: {
        icon: ''
    },
    component: () => import("./views/Index.vue"),
    redirect: '/user/Account',
    children: [{
        path: 'Account',
        name: '账号管理',
        component: () => import("./views/Account.vue")
    }, {
        path: 'Organization',
        name: '组织管理',
        component: () => import("./views/Organization.vue")
    }, {
        path: 'Role',
        name: '角色管理',
        component: () => import("./views/Role.vue")
    }, {
        path: 'Resource',
        name: '资源管理',
        component: () => import("./views/Resource.vue")
    }]
}]