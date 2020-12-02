export default [{
    path: '/template',
    name: '空白模块',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    children: [{
        path: 'list',
        name: '列表',
        component: (resolve) => require(['./views/List.vue'], resolve)
    }]
}]