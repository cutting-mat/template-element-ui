<template>
  <router-view id="app" />
</template>

<script>
import Vue from "vue";
import * as util from "@/core";
import { store } from "@/core/store";
import { instance } from "@/core/api";
import {default as FullRoute, moduleRoute} from "@/main/index";
import {routeAuthWhiteList} from "@/core/router";

let checkRouteRedirectResult = []; // 临时变量
if (process.env.VUE_APP_AUTH === "true") {
  console.warn("权限已开启，路由白名单:", routeAuthWhiteList);
}

export default {
  methods: {
    setInterceptor: function (resourcePermission) {
      // 添加请求权限校验
      instance.interceptors.request.use((config) => {
        let requestURL = config.url.replace(config.baseURL, "").split("?")[0];

        if (!resourcePermission[config.method + "," + requestURL]) {
          return Promise.reject({
            message: config.method + "," + requestURL + "无访问权限",
          });
        }
        return config;
      });
    },
    getResourcePermission: function (userPermissions) {
      // 从用户权限数据中提取请求权限
      let resourcePermission = {};
      if (Array.isArray(userPermissions.resources)) {
        userPermissions.resources.forEach((e) => {
          let key = e.method.toLowerCase() + "," + e.url;
          resourcePermission[key] = true;
        });
      }
      return resourcePermission;
    },
    getRoutePermission: function (userPermissions) {
      // 从用户权限数据中提取路由权限
      let routePermission = {};
      let setMenu2Hash = function (array, base) {
        array.map((key) => {
          if (key.route) {
            let hashKey = ((base ? base + "/" : "") + key.route).replace(
              /^\//,
              ""
            );
            routePermission["/" + hashKey] = true;
            if (Array.isArray(key.children)) {
              setMenu2Hash(key.children, (base ? base + "/" : "") + key.route);
            }
          }
        });
      };
      if (Array.isArray(userPermissions.menus)) {
        let arrayMenus = util.buildTree(userPermissions.menus);
        setMenu2Hash(arrayMenus);
      }
      return routePermission;
    },
    extendRoutes: function (routePermission) {
      // 根据用户权限动态注入路由
      let actualRouter = [];
      // 递归校验路由权限
      let checkRoutePermission = function (array, base) {
        let replyResult = [];
        array.forEach((route) => {
          let pathKey = (base ? base + "/" : "") + route.path;
          // 扩展fullPath
          route.fullPath = pathKey;

          if (routePermission[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = checkRoutePermission(
                route.children,
                (base ? base + "/" : "") + route.path
              );
            }
            replyResult.push(route);
          }
        });
        if (base) {
          return replyResult;
        } else {
          actualRouter = actualRouter.concat(replyResult);
        }
      };
      // 此处跳过首页（'/'）的权限校验，也可以传入 moduleRoute 全部校验
      checkRoutePermission(moduleRoute[0].children);

      // 如果没有任何路由权限，判断为非法用户，登出并终止应用执行
      if (!actualRouter || !actualRouter.length) {
        util.storage("auth", "");
        return (document.body.innerHTML =
          "<h1>账号访问受限，请联系系统管理员！</h1>");
      }

      checkRouteRedirectResult = [];
      this.checkRouteRedirect(actualRouter);
      moduleRoute[0].children = checkRouteRedirectResult;
      moduleRoute.push({
        path: "*",
        redirect: "/404",
      });
      moduleRoute.forEach((route) => {
        this.$router.addRoute(route);
      });

      // 保存菜单数据，用于实现全局导航
      store.set("menu", actualRouter);
    },
    checkRouteRedirect: function (array, base) {
      // 递归校验路由'redirect'路径权限
      let replyResult = [];
      array.forEach((route) => {
        let pathKey = (base ? base + "/" : "") + route.path;
        // 扩展fullPath
        route.fullPath = pathKey;
        // 扩展meta
        if (!route.meta) {
          route.meta = {};
        }
        const currentRouteRedirect =
          route.redirect && route.redirect.split ? route.redirect : null;
        if (
          currentRouteRedirect &&
          Array.isArray(route.children) &&
          route.children.length
        ) {
          const targetIndex = route.children.findIndex((e) => {
            return !e.fullPath || e.fullPath === currentRouteRedirect;
          });
          if (targetIndex === -1) {
            console.warn(
              `${route.redirect}不在路由权限内，自动重置为${route.children[0].fullPath}`
            );
            route.redirect = route.children[0].fullPath;
          }
        }
        if (Array.isArray(route.children) && route.children.length) {
          this.checkRouteRedirect(
            route.children,
            (base ? base + "/" : "") + (route.path !== "/" ? route.path : "")
          );
        }
        replyResult.push(route);
      });
      if (base) {
        return replyResult;
      } else {
        checkRouteRedirectResult = checkRouteRedirectResult.concat(replyResult);
      }
    },
    signin: function (callback) {
      /*
       * Step 1
       * 检查用户登录状态
       */
      if (store.get("accessToken")) {
        // 已登录
        instance.defaults.headers.common["Authorization"] =store.get("accessToken");
      } else {
        // 未登录逻辑通过路由守卫（@/router.js）处理
        console.warn('未登录')
      }

      if (store.get("accessToken") && process.env.VUE_APP_AUTH === "true") {
        /*
         * Step 2-1
         * 权限控制开启模式
         */
        store.action("permission").then((userPermissions) => {
          /*
           * Step 3
           * 请求用户权限数据，格式如下:
            {
              menus: [{
                id: (...)
                method: (...)
                name: (...)
                remark: (...)
                route: (...)
                type: 0
                url: (...)
              }],
              resources: [{
                id: (...)
                method: (...)
                name: (...)
                pid: (...)
                remark: (...)
                route: (...)
                type: (...)
                url: (...)
              }]
            }
           */

          let resourcePermission = this.getResourcePermission(userPermissions);
          let routePermission = this.getRoutePermission(userPermissions);

          /*
           * Step 5
           * 根据请求权限设置请求拦截
           */

          this.setInterceptor(resourcePermission);

          /*
           * Step 6
           * 根据路由权限动态添加路由
           */

          this.extendRoutes(routePermission);

          /*
           * Step 7
           * 注册 this.$_auth 方法和 v-auth 指令 (指令在@/register.js里注册)
           */

          Vue.prototype.$_auth = function (axiosRequest) {
            let RequiredPermissions = [];
            let permission = true;

            if (Array.isArray(axiosRequest)) {
              axiosRequest.forEach((fun) => {
                let res = util.matchRequest(fun);
                if (res) {
                  RequiredPermissions.push(res);
                }
              });
            } else if (typeof axiosRequest === "function") {
              let res = util.matchRequest(axiosRequest);
              if (res) {
                RequiredPermissions.push(res);
              }
            }
            //console.log(RequiredPermissions, resourcePermission)
            for (let i = 0; i < RequiredPermissions.length; i++) {
              let p = RequiredPermissions[i];
              if (!resourcePermission[p]) {
                permission = false;
                break;
              }
            }

            return permission;
          };

          typeof callback === "function" && callback();
        });
      } else {
        /*
         * Step 2-2
         * 权限控制关闭模式
         */
        checkRouteRedirectResult = [];
        this.checkRouteRedirect(FullRoute[0].children);
        store.set("menu", checkRouteRedirectResult);

        // 容错
        Vue.prototype.$_auth = () => true;

        store.get("accessToken") && typeof callback === "function" && callback();
      }
    },
    initUser: function (loginRes) {
      // 初始化用户信息
      store.action("user", true).then(() => {
        if (loginRes && loginRes.from) {
          // 如果携带来路路由，跳转到来路路由
          this.$router.replace({ path: loginRes.from });
        } else if (this.$router.currentRoute.path == "/login") {
          // 如果当前是登录页，跳回首页
          this.$router.replace({ path: "/" });
        }
      });
    },
    handleLogin: function (res) {
      /*
       * 监听 "login" 事件
       */
      util.storage("auth", res.data);
      store.set("accessToken", res.data.accessToken)

      this.signin(() => {
        // 登录成功（silent来自token续签）
        if (!res.silent) {
          this.initUser(res);
        }
      });
    },
    handleLogout: function () {
      /*
       * 监听 "logout" 事件
       */
      util.storage("auth", "");
      console.log(routeAuthWhiteList,'/'+this.$router.currentRoute.path.split('/')[1])
      if (routeAuthWhiteList.indexOf('/'+this.$router.currentRoute.path.split('/')[1]) === -1) {
        // 非白名单路由刷新，触发路由守卫的未登录逻辑
        window.location.reload()
      }
    },
  },
  created: function () {
    /*
     * Start from here!
     */
    this.signin(this.initUser);
    // global event
    util.on("login", this.handleLogin);
    util.on("logout", this.handleLogout);
  },
};
</script>

<style>
@import url(./global.css);
</style>
