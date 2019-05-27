import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import common from '@/common'

const route = new Router({
  routes: common
});

route.beforeEach((to, from, next) => {
  if(to.name){
    document.title = to.meta.name || to.name;
  }
  next()
})

export default route
