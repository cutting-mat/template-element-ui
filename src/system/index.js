export default [{
    path: '/system',
    name: '系统设置',
    meta: {
        icon: ''
    },
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/system/account',
    children: [{
        path: 'account',
        name: '账号管理',
        component: (resolve) => require(['./views/AccountList.vue'], resolve)
    }, {
        path: 'role',
        name: '角色管理',
        component: (resolve) => require(['./views/RoleList.vue'], resolve)
    }, {
        path: 'resource',
        name: '资源管理',
        component: (resolve) => require(['./views/ResourceList.vue'], resolve)
    }, {
        path: 'dict',
        name: '字典管理',
        meta: {
            icon: ''
        },
        component: (resolve) => require(['./views/Dict.vue'], resolve)
    }]
}]