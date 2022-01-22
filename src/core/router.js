import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 加载所有模块路由
import { default as moduleRoute, mainRoute } from './modules'

export default function () {
  // 拼装路由
  mainRoute[0].children = Vue.prototype.$AccessControl ? [] : moduleRoute;

  // 路由实例
  const route = new Router({
    routes: mainRoute
  });

  if (Vue.setRouterGuards) {
    Vue.setRouterGuards(route, mainRoute)
  }

  route.beforeEach((to, from, next) => {
    if (to.name) {
      document.title = to.meta.title || to.name;
    }
    next()
  })

  return route
}
