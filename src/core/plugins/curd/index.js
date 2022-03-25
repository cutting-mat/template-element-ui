/**
 * 增删改查组件
 * 输出：
 * 全局组件<CURD>
 * */ 

const components = {
    CURD:  () => import("./components/CURD.vue"),
    CURDColumn:  () => import("./components/CURDColumn.vue"),
    CURDForm:  () => import("./components/CURDForm.vue"),
}
export const install = function (Vue, option) {
    Vue.$CURD = option || {};

    for(let name in components){
        Vue.component(name, components[name])
    }
}