// 根据.browserslistrc 配置加载polyfill，需同时替换babel.config.js中注释的presets配置
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue'

// UI库
import ElementUI from 'element-ui';
import '@/main/element-theme/index.css';
import '@/main/element-theme/custom.css';
Vue.use(ElementUI);

// 全局资源
import register from '@/register'
Vue.use(register);

// 路由
import router from './router'

// 应用启动
import App from './App.vue'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')