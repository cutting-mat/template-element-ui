// 开启 mock
import mocker from "../mock";
mocker();

import Vue from "vue";

// 加载根组件
import App from "./App.vue";

// 创建路由实例
import { routeGenerator } from "@/core";
const routeInstance = routeGenerator({
  beforeEach: (to, from, next) => {
    if (to.name) {
      document.title = to.meta.title || to.name;
    }
    next();
  },
});

// 全局安装
import preInstall from "@/pre-install";
Vue.use(preInstall);

// 加载框架插件
import plugins from "@/core/plugins";
Vue.use(plugins);

import { pinia } from "@/core/plugins/store";
// 创建应用
const app = new Vue({
  router: routeInstance,
  render: (h) => h(App),
  pinia,
});

// 挂载应用
app.$mount("#app");
