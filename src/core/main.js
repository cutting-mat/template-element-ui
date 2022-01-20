// 根据.browserslistrc 配置加载polyfill，需同时替换babel.config.js中注释的presets配置
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue'

// UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import '@/core/element-theme/index.css';
import '@/core/element-theme/custom.css';
Vue.use(ElementUI);

// 全局资源
import register from '@/core/register'
Vue.use(register);

// 路由
import router from '@/core/router'

// 应用启动
import App from '@/core/App.vue'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')