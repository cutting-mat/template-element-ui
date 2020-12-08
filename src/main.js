// 根据.browserslistrc 配置加载polyfill，需同时替换babel.config.js中注释的presets配置
import 'regenerator-runtime/runtime';

import Vue from 'vue'
import ElementUI from 'element-ui';
import '@/common/assets/theme/index.css';
Vue.use(ElementUI);

// 注册全局资源
import register from '@/register'
Vue.use(register);

// 加载路由
import router from './router'

/*
 * 注册 v-has 指令（权限控制）
 */

Vue.directive('has', {
    inserted: function(el, binding) {
        if (Vue.prototype.$_has && !Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});

import App from './App.vue'

new Vue({
    data() {
        return {
            AccessControl: false
        }
    },
    router,
    render: h => h(App)
}).$mount('#app')