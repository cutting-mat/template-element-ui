// 根据package.json [browserslist]配置加载polyfill，需同时替换babel.config.js中注释的presets配置
// import '@babel/polyfill'

import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import App from './App.vue'

//全局资源
import plugins from '@/base/plugins'
Vue.use(plugins);

//路由
import router from './router'
router.beforeEach((to, from, next) => {
  if(to.name){
    document.title = to.meta.name || to.name;
  }
  //如果需要登录的操作
  if (to.meta.requiresAuth === true) {
    let user =  util.storage('user')
    //如果用户没有登录跳转到登录页面
    if( !user){
      setTimeout(() => {
        next({ path: '/login', query: { from: to.path } })
      },0)
    }
  }
  next()
})

new Vue({
  data(){
    return {
      globalData: {
        user: {}
      }
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
