// 根据package.json [browserslist]配置加载polyfill，需同时替换babel.config.js中注释的presets配置
// import '@babel/polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局资源
import common from '@/common'
Vue.use(common.register);

//路由
import router from './router'


/*
* v-has
*/

Vue.directive('has', {
  inserted: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

import App from './App.vue'

new Vue({
  data(){
    return {
      useVSC: false,
      globalData: {}
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
