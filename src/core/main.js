// 根据.browserslistrc 配置加载polyfill，需同时替换babel.config.js中注释的presets配置
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';

// UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import '@/core/element-theme/index.css';
import '@/core/element-theme/custom.css';
Vue.use(ElementUI);

// 全局资源
import register from '@/core/register';
Vue.use(register);

// 账号鉴权
import { AccountAuth } from "@/core";
Vue.use(AccountAuth);

// 权限控制
import { AccessControl } from "@/core";
Vue.use(AccessControl);

// 路由
import genRouter from '@/core/router';

// 应用启动
import App from '@/core/App.vue';

new Vue({
    router: genRouter(),
    render: h => h(App)
}).$mount('#app');