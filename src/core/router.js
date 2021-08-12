import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { default as FullRoute, mainRoute } from "@/main/index";

const route = new Router({
  routes: FullRoute
});

// 全局路由守卫
import { store } from "@/core/store";
import { storage } from "@/core";

// 路由访问免登录白名单
export let routeAuthWhiteList = [...mainRoute.map((e) => e.path), '/library']; 

// 获取用户登录状态
if (!store.get("accessToken")) {
  let localUser = storage("auth") || {};
  if (localUser.accessToken) {
    store.set("accessToken", localUser.accessToken);
  }
}

route.beforeEach((to, from, next) => {
  if (!store.get("accessToken")) {
    console.log(routeAuthWhiteList, to.path)
    if (routeAuthWhiteList.indexOf('/'+to.path.split('/')[1]) !== -1) {
      // 未登录访问白名单
      return next();
    } else if (to.path !== "/login") {
      // 未登录跳转登录页
      let query = {};
      query["from"] = to.fullPath;
      return next({
        path: "/login",
        query
      });
    }
  }

  if (to.name) {
    document.title = to.meta.title || to.name;
  }
  next()
})

export default route
