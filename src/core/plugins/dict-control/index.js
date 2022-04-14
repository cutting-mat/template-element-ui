/**
 * 字典控件
 * 输出：
 * 全局组件<DictCascader>
 * 全局组件<DictCheckbox>
 * 全局组件<DictRadio>
 * 全局组件<DictSelect>
 * */

const components = {
    DictCascader: () => import("./components/DictCascader.vue"),
    DictCheckbox: () => import("./components/DictCheckbox.vue"),
    DictRadio: () => import("./components/DictRadio.vue"),
    DictSelect: () => import("./components/DictSelect.vue"),
}
export const install = function (Vue, option) {
    Vue.$DictControl = option || {};

    for (let name in components) {
        Vue.component(name, components[name])
    }
}

export { default as config } from "@/plugin.dict-control.config";
