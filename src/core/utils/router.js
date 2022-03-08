import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 加载所有模块路由
import { subModules, mainModule } from '../../module.config'

let routeInstance;

export default function () {
  console.log('Router Start')
  // 拼装路由
  mainModule[0].children = Vue.prototype.$AccessControl ? [] : subModules;

  // 路由实例
  if (!routeInstance) {
    routeInstance = new Router({
      routes: mainModule
    });

    if (Vue.setRouterGuards) {
      Vue.setRouterGuards(routeInstance, mainModule)
    }

    routeInstance.beforeEach((to, from, next) => {
      if (to.name) {
        document.title = to.meta.title || to.name;
      }
      next()
    })
  }

  return routeInstance
}
