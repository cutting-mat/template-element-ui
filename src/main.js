// 根据.browserslistrc 配置加载polyfill，需同时替换babel.config.js中注释的presets配置
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';

// UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import '@/core/element-theme/index.css';
Vue.use(ElementUI);

// 全局样式
import '@/core/assets/global.css';

// Store
import store from '@/core/utils/store';
Vue.use(store);

// 全局功能注册
import { register } from '@/core';
Vue.use(register);

// 账号鉴权
import { AccountAuth } from "@/core";
Vue.use(AccountAuth);

// 权限控制
import { AccessControl } from "@/core";
Vue.use(AccessControl);

// 路由
import { routeGenerator } from '@/core';

// 应用启动
import App from './App.vue';

new Vue({
    router: routeGenerator(),
    render: h => h(App)
}).$mount('#app');