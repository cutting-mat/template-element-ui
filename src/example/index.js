export default [{
    path: '/library',
    name: '组件示例',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    redirect: '/library/button',
    children: [{
        path: 'button',
        name: '按钮',
        component: (resolve) => require(['./views/Button.vue'], resolve)
    }, {
        path: 'messagebox',
        name: '提示框',
        component: (resolve) => require(['./views/MessageBox.vue'], resolve)
    }, {
        path: 'CURD',
        name: '增删改查',
        component: (resolve) => require(['./views/CURD.vue'], resolve)
    }, {
        path: 'dialog',
        name: '弹窗',
        component: (resolve) => require(['./views/Dialog.vue'], resolve)
    }, {
        path: 'DickControl',
        name: '字典控件',
        component: (resolve) => require(['./views/DickControl.vue'], resolve)
    },
    {
        path: 'upload',
        name: '上传',
        component: (resolve) => require(['./views/Upload.vue'], resolve)
    }, {
        path: 'pagenation',
        name: '分页',
        component: (resolve) => require(['./views/Pagenation.vue'], resolve)
    }, {
        path: 'breadcrumb',
        name: '面包屑',
        component: (resolve) => require(['./views/Breadcrumb.vue'], resolve)
    }, {
        path: 'table',
        name: '表格',
        component: (resolve) => require(['./views/Table.vue'], resolve)
    }, {
        path: 'placeholder',
        name: '无数据占位',
        component: (resolve) => require(['./views/Placeholder.vue'], resolve)
    }, {
        path: 'form',
        name: '表单组件',
        component: (resolve) => require(['./views/Form.vue'], resolve)
    }, {
        path: 'icon',
        name: '字体图标',
        component: (resolve) => require(['./views/Icon.vue'], resolve)
    }, {
        path: 'tag',
        name: '标签',
        component: (resolve) => require(['./views/Tag.vue'], resolve)
    }, {
        path: 'radio',
        name: '单选框',
        component: (resolve) => require(['./views/Radio.vue'], resolve)
    }, {
        path: 'checkbox',
        name: '多选框',
        component: (resolve) => require(['./views/Checkbox.vue'], resolve)
    }, {
        path: 'loading',
        name: 'Loading 加载',
        component: (resolve) => require(['./views/Loading.vue'], resolve)
    }, {
        path: 'rate',
        name: '评分',
        component: (resolve) => require(['./views/Rate.vue'], resolve)
    }, {
        path: 'carousel',
        name: '走马灯',
        component: (resolve) => require(['./views/Carousel.vue'], resolve)
    }, {
        path: 'switch',
        name: '开关',
        component: (resolve) => require(['./views/Switch.vue'], resolve)
    }, {
        path: 'message',
        name: '消息提示',
        component: (resolve) => require(['./views/Message.vue'], resolve)
    }, {
        path: 'time/line',
        name: '时间线',
        component: (resolve) => require(['./views/TimeLine.vue'], resolve)
    }, {
        path: 'drawer',
        name: '抽屉',
        component: (resolve) => require(['./views/Drawer.vue'], resolve)
    }]
}]
