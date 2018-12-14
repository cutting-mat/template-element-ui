// 根据package.json [browserslist]配置加载polyfill，需同时替换babel.config.js中注释的presets配置
// import '@babel/polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

Vue.use(ElementUI);

//全局资源
import globalResource from '@/plugins/global-resource'
Vue.use(globalResource);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.name){
    document.title = to.meta.name || to.name;
  }
  next()
})

new Vue({
  data(){
    return {
      user: {}
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
