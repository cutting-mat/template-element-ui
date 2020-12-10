export default [{
    path: '/library',
    name: '组件',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    children: [{
        path: 'button',
        name: '按钮',
        component: (resolve) => require(['./views/Button.vue'], resolve)
    }, {
        path: 'messagebox',
        name: '提示框',
        component: (resolve) => require(['./views/MessageBox.vue'], resolve)
    }, {
        path: 'dialog',
        name: '弹窗',
        component: (resolve) => require(['./views/Dialog.vue'], resolve)
    }, {
        path: 'upload',
        name: '上传',
        component: (resolve) => require(['./views/Upload.vue'], resolve)
    }]
}]
