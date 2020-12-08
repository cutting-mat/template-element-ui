export default [{
    path: '/library',
    name: '基础UI库',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    children: [{
        path: 'button',
        name: '按钮',
        component: (resolve) => require(['./views/Button.vue'], resolve)
    }, {
        path: 'dialog',
        name: '弹窗',
        component: (resolve) => require(['./views/Dialog.vue'], resolve)
    }]
}]
