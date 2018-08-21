import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

Vue.use(ElementUI);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.name){
    document.title = to.name;
  }
  next()
})

new Vue({
  data(){
    return {
      token: null
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')

// 异常处理
Vue.config.errorHandler = function (err, vm, info) {
  console.warn(err, info)
}