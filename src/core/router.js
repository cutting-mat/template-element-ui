import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import { util , store } from "@/core";

// 业务模块（开启权限控制模式下，业务模块受登录用户权限控制）
import moduleRoute from './modules'
export {moduleRoute}

// 主模块
import { default as mainRoute } from "@/main/index";
mainRoute[0].children = process.env.VUE_APP_AUTH === "true" ? [] : moduleRoute;
export { mainRoute };

// 路由访问免登录白名单
export let routeAuthWhiteList = [...mainRoute.filter(e => e.path!=='/').map((e) => e.path), '/library']; 

// 获取用户登录状态
if (!store.get("accessToken")) {
  let localUser = util.storage("auth") || {};
  if (localUser.accessToken) {
    store.set("accessToken", localUser.accessToken);
  }
}

// 路由实例
const route = new Router({
  routes: mainRoute
});

route.beforeEach((to, from, next) => {
  if (!store.get("accessToken")) {
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
