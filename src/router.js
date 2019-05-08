import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import main from '@/main/index'
import base from '@/base/index'

export default new Router({
  routes: [
    ...main,
    ...base,
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
