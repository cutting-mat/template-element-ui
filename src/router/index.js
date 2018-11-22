import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: (resolve) => require(['../views/common/login.vue'], resolve)
    }, {
      path: '/401',
      name: '无权访问',
      component: (resolve) => require(['../views/common/401.vue'], resolve)
    }, {
      path: '/404',
      name: '找不到页面',
      component: (resolve) => require(['../views/common/404.vue'], resolve)
    }
  ]
})
