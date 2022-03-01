// 根据.browserslistrc 配置加载polyfill, 需同时替换babel.config.js中注释的presets配置
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

// 上传组件
import ElUploadPlugin from '@cutting-mat/el-upload';
import uploadConfig from "@/upload.config";
Vue.use(ElUploadPlugin, uploadConfig);

// 状态管理插件
import store from '@cutting-mat/vue-store';
import storeConfig from "@/store.config";
Vue.use(store, storeConfig);

// 全局功能注册
import { register } from '@/core';
Vue.use(register);

// 用户鉴权
import { AccountAuth } from "@/core";
Vue.use(AccountAuth);

// 权限控制
// import { AccessControl } from "@/core";
// Vue.use(AccessControl);

// 路由
import { routeGenerator } from '@/core';

// 应用启动
import App from './App.vue';

new Vue({
    router: routeGenerator(),
    render: h => h(App)
}).$mount('#app');