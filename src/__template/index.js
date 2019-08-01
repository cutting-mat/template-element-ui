export default [{
    path: '/template',
    name: '空白模块',
    component: (resolve) => require(['./views/index.vue'], resolve)
}]