const components = {
    DictCascader:  () => import("./components/CURD.vue"),
    DictCheckbox:  () => import("./components/CURDColumn.vue"),
    DictRadio:  () => import("./components/CURDForm.vue"),
}
export const install = function (Vue, option) {
    Vue.$CURD = option || {};

    for(let name in components){
        Vue.component(name, components[name])
    }
}