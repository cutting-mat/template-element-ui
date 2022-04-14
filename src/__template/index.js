export default [{
    path: '/template',
    name: '模块模板',
    component: () => import("./views/Index.vue"),
    redirect: '/template/list',
    children: [{
        path: 'list',
        name: '列表',
        component: () => import("./views/List.vue"),
        meta: {
            icon: '',                   // 字体图标
            title: '',                  // 展示名
            hide: true,                 // 在导航中隐藏
            belong: 'ROUTE NAME'        // 导航当前状态归属
        }
    }]
}]