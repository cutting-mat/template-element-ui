export default [{
    path: '/library',
    name: '组件示例',
    component: (resolve) => require(['./views/Index.vue'], resolve),
    children: [{
        path: 'Element',
        name: 'Element组件',
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
            path: 'pagenation',
            name: '分页',
            component: (resolve) => require(['./views/Pagenation.vue'], resolve)
        }, {
            path: 'table',
            name: '表格',
            component: (resolve) => require(['./views/Table.vue'], resolve)
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
    }, {
        path: 'encap',
        name: '框架封装',
        component: (resolve) => require(['./views/Index.vue'], resolve),
        children: [{
            path: 'Breadcrumb',
            name: '面包屑',
            component: (resolve) => require(['./views/Breadcrumb.vue'], resolve)
        }, {
            path: 'InputNumber',
            name: '数字输入框',
            component: (resolve) => require(['./views/InputNumber.vue'], resolve)
        }, {
            path: 'TagManage',
            name: '标签栏',
            component: (resolve) => require(['./views/TagManage.vue'], resolve)
        }, {
            path: 'upload',
            name: '上传',
            component: (resolve) => require(['./views/Upload.vue'], resolve)
        }, {
            path: 'DickControl',
            name: '字典控件',
            component: (resolve) => require(['./views/DickControl.vue'], resolve)
        }, {
            path: 'CURD',
            name: '增删改查组件',
            component: (resolve) => require(['./views/CURD.vue'], resolve),
            children: [{
                path: 'CURDRoleList',
                name: '增删改查-基本应用',
                component: (resolve) => require(['./views/CURDRoleList.vue'], resolve),
                meta: {
                    title: '基本应用'
                }
            }, {
                path: 'CURDDict',
                name: '增删改查-Table高级配置',
                component: (resolve) => require(['./views/CURDDict.vue'], resolve),
                meta: {
                    title: 'Table高级配置'
                }
            }, {
                path: 'CURDAccount',
                name: '增删改查-From高级配置',
                component: (resolve) => require(['./views/CURDAccount.vue'], resolve),
                meta: {
                    title: 'From高级配置'
                }
            },{
                path: 'CURDMultiHeader',
                name: '增删改查-多级表头',
                component: (resolve) => require(['./views/CURDMultiHeader.vue'], resolve),
                meta: {
                    title: '多级表头'
                }
            }
            ]
        }]
    },]
}]
