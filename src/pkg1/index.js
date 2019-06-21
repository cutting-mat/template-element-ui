
export default [{
    path: 'package',
    name: '模块演示',
    component:  (resolve) => require(['./views/_template.vue'], resolve)
}]