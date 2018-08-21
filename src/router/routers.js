import index from '@/views/index'

export default [
  {
    path: '/',
    name: '首页',
    component: index
  }, {
    path: '/blank',
    name: '空白',
    component: (resolve) => require(['../views/blank.vue'], resolve)
  }
]
