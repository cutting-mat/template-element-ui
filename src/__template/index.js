export default [{
    path: '/template',
    name: '空白模块',
    component: (resolve) => require(['./views/index.vue'], resolve),
    children: [{
        path: 'list',
        name: '列表',
        component: (resolve) => require(['./views/list.vue'], resolve)
    }]
}]