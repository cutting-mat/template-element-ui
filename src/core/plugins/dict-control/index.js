/**
 * 字典控件
 * 输出：
 * 全局组件<DictCascader>
 * 全局组件<DictCheckbox>
 * 全局组件<DictRadio>
 * 全局组件<DictSelect>
 * */
import config from "@/plugin.dict-control.config";

const components = {
  DictCascader: () => import("./components/DictCascader.vue"),
  DictCheckbox: () => import("./components/DictCheckbox.vue"),
  DictRadio: () => import("./components/DictRadio.vue"),
  DictSelect: () => import("./components/DictSelect.vue"),
};

export const install = function (Vue) {
  Vue.$DictControl = config || {};

  for (const name in components) {
    Vue.component(name, components[name]);
  }
};
