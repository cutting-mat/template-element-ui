import AccessControl from "./access-control";
import { event, axiosInstance, routeGenerator } from "@/core";
import { MainRoute, BypassRoute } from "@/route.config";
import {
  GetAccountToken,
  SetAccountToken,
  AuthFailedCallback,
} from "@/plugin.permission.config";

const routeInstance = routeGenerator();

let routeAuthWhiteList;

export const install = function (Vue, config) {
  // 路由访问免登录白名单
  routeAuthWhiteList = BypassRoute.map((e) => e.path);

  console.log("[Core] Permission Open. BypassRoute:", routeAuthWhiteList);

  // 权限关闭 注册主路由
  if (!config.AccessControl) {
    MainRoute.forEach((route) => {
      routeInstance.addRoute(route);
    });
    routeInstance.addRoute({
      path: "*",
      redirect: "/404",
    });
  }

  routeInstance.beforeEach((to, from, next) => {
    // console.log('路由守卫', to)
    if (!GetAccountToken()) {
      if (routeAuthWhiteList.indexOf("/" + to.path.split("/")[1]) !== -1) {
        // console.log('未登录访问白名单')
        return next();
      } else {
        return AuthFailedCallback(to, from, next);
      }
    }
    next();
  });

  Vue.prototype.$Permission = function (authCallback) {
    const checkAccount = (loginCallback) => {
      const userToken = GetAccountToken();
      if (userToken) {
        // 设置请求头
        axiosInstance.defaults.headers.common["Authorization"] = userToken;

        new Promise((resolve) => {
          if (config.AccessControl) {
            resolve(
              AccessControl(Vue, routeInstance, config.interceptorsRequest)
            );
          } else {
            resolve();
          }
        }).then(() => {
          typeof loginCallback === "function" && loginCallback(userToken);
          typeof authCallback === "function" && authCallback(userToken);
        });
      }
    };

    event.on("login", (loginCallback) => {
      /*
       * 监听 "login" 事件
       */
      checkAccount(loginCallback);
    });

    event.on("logout", () => {
      /*
       * 监听 "logout" 事件
       */
      SetAccountToken("");

      if (
        routeAuthWhiteList.indexOf(
          "/" + this.$router.currentRoute.path.split("/")[1]
        ) === -1
      ) {
        // 非白名单路由刷新, 触发路由守卫的未登录逻辑
        window.location.reload();
      }
    });

    return checkAccount();
  };
};
