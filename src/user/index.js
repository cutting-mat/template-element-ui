export default [{
    path: '/user',
    name: '用户管理',
    meta: {
        icon: ''
    },
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/user/account',
    children: [{
        path: 'Account',
        name: '账号管理',
        component: (resolve) => require(['./views/Account.vue'], resolve)
    }, {
        path: 'Organization',
        name: '组织管理',
        component: (resolve) => require(['./views/Organization.vue'], resolve)
    }, {
        path: 'Role',
        name: '角色管理',
        component: (resolve) => require(['./views/Role.vue'], resolve)
    }, {
        path: 'Resource',
        name: '资源管理',
        component: (resolve) => require(['./views/Resource.vue'], resolve)
    }]
}]