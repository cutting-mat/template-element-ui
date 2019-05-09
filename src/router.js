import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import base from '@/base'
import layout from '@/layout'

export default new Router({
  routes: [
    ...base,
    ...layout,
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
