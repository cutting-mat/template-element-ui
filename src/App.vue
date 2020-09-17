<template>
  <router-view id="app" />
</template>

<script>
import Vue from "vue";
import * as util from "@/common/assets/util.js";
import { store } from "@/store";
import { instance } from "@/api";
import * as user from "@/common/api/user";
import AllRoutesData from "./main/index";

export default {
  methods: {
    setInterceptor: function(resourcePermission) {
      instance.interceptors.request.use(config => {
        // Get request path
        let perName = config.url.replace(config.baseURL, "").split("?")[0];

        // Check permissions

        if (!resourcePermission[config.method + "," + perName]) {
          return Promise.reject({
            message: config.method + "," + perName + "无访问权限"
          });
        }
        return config;
      });
    },
    getResources: function(userPermissions) {
      let resourceHash = {};
      if (Array.isArray(userPermissions.resources)) {
        /*
        * Input like this:
        * [{
        *   id: "2c9180895e172348015e1740805d000d"
            method: "GET"
            url: "/some-url"
        * }]
        */
        userPermissions.resources.forEach(e => {
          let key = e.method.toLowerCase() + "," + e.url;
          resourceHash[key] = true;
        });
      }
      // Get hash structure
      return resourceHash;
    },
    getRoutes: function(userPermissions) {
      let routeHash = {};
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.route) {
            let hashKey = ((base ? base + "/" : "") + key.route).replace(
              /^\//,
              ""
            );
            routeHash["/" + hashKey] = true;
            if (Array.isArray(key.children)) {
              setMenu2Hash(key.children, (base ? base + "/" : "") + key.route);
            }
          }
        });
      };
      if (Array.isArray(userPermissions.menus)) {
        /*
         * Input Like this:
         * [{
         *   id: "2c9180895e13261e015e13469b7e0000",
         *   name: "账户管理",
         *   parent_id: "2c9180895e13261e015e13469b7e0000",
         *   route: "some-route"
         * }]
         */
        let arrayMenus = util.buildTree(userPermissions.menus);
        setMenu2Hash(arrayMenus);
      }
      // Get hash structure
      return routeHash;
    },
    extendRoutes: function(routePermission) {
      let originPath = util.deepcopy(AllRoutesData);
      // Filtering local routes, get actual routing
      let redirectValuHit = originPath[0].redirect ? false : null;
      let actualRouter = [];
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(route => {
          let pathKey = (base ? base + "/" : "") + route.path;
          // 检测redirect值是否在权限中
          if (originPath[0].redirect && originPath[0].redirect === pathKey) {
            redirectValuHit = true;
          }
          if (routePermission[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(
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
      findLocalRoute(AllRoutesData[0].children);

      // If the user does not have any routing authority

      if (!actualRouter || !actualRouter.length) {
        // clear token, refresh page will jump to login screen.
        util.storage("auth", "");
        // Interface hints
        return (document.body.innerHTML =
          "<h1>账号访问受限，请联系系统管理员！</h1>");
      }

      actualRouter = actualRouter.map(e => {
        // Copy 'children' to 'meta' for rendering menu.(This step is optional.)

        if (e.children) {
          if (!e.meta) {
            e.meta = {};
          }

          e.meta.children = e.children;
        }

        return e;
      });

      // Add actual routing to application
      originPath[0].children = actualRouter;
      // 首页设置了 redirect，且值不在权限中，默认跳第一个有权限的子路由
      if (redirectValuHit === false) {
        originPath[0].redirect = actualRouter[0];
      }
      this.$router.addRoutes(
        originPath.concat([
          {
            path: "*",
            redirect: "/404"
          }
        ])
      );

      // Save information for rendering menu.(This step is optional.)

      store.set("menu", actualRouter);
    },
    signin: function(callback) {
      let vm = this;
      /*
       * Step 1
       * Check whether the user has access
       */

      let localUser = util.storage("auth");

      if (!localUser || !localUser.accessToken) {
        let query = {};
        if (vm.$router.currentRoute.path !== "/login") {
          query["from"] = vm.$router.currentRoute.fullPath;
        }
        return vm.$router.push({ path: "/login", query });
      }

      /*
       * Step 2
       * Set Authorization
       */

      instance.defaults.headers.common["Authorization"] = localUser.accessToken;
      // Update token info
      store.set("accessToken", localUser.accessToken);

      /*
       * Step 2-1(This step is optional.)
       * Get user`s permissions
       * You can also get permission information upon user login, it depends on the implementation of the backend interface
       */
      if (this.$root.AccessControl) {
        user.permission().then(res => {
          let userPermissions = res.data.data;
          store.set("permission", userPermissions);
          /*
           * Step 3
           * Get resourcePermission form user permissions
           * Like this:
           * { "get,/url1": true, "post,/url2": true, ... }
           */

          let resourcePermission = vm.getResources(userPermissions);

          /*
           * Step 4
           * Get routePermission form user permissions
           * Like this:
           * { "/route1": true, "/route2": true, ... }
           */

          let routePermission = vm.getRoutes(userPermissions);

          /*
           * Step 5
           * Setting request permission control through resourcePermission
           */

          vm.setInterceptor(resourcePermission);

          /*
           * Step 6
           * Adding routing privileges to users
           */

          vm.extendRoutes(routePermission);

          /*
           * Step 7
           * Implementing $_has function, support for the directive "has" (in /main.js)
           * Input: Array, like this: ['get,/some-uri']
           * Output: Boolean
           */

          Vue.prototype.$_has = function(rArray) {
            let RequiredPermissions = [];
            let permission = true;
            let regex = new RegExp(/\.([^(]+)\("([^"]+)"/);

            if (Array.isArray(rArray)) {
              rArray.forEach(e => {
                const res = e.toString().match(regex);
                if (res && res.length > 2) {
                  RequiredPermissions.push([res[1], res[2]].join(","));
                }
              });
            } else if (typeof rArray === "function") {
              const res = rArray.toString().match(regex);
              if (res && res.length > 2) {
                RequiredPermissions.push(
                  [res[1].trim(), res[2].trim()].join(",")
                );
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
        //无权限控制
        this.$router.addRoutes(
          AllRoutesData.concat([
            {
              path: "*",
              redirect: "/404"
            }
          ])
        );

        const currentUserMenu = AllRoutesData[0].children.map(e => {
          if (!e.meta) {
            e.meta = {};
          }
          return e;
        });

        store.set("menu", currentUserMenu);

        // 容错
        Vue.prototype.$_has = () => true;
        
        typeof callback === "function" && callback();
      }
    },
    loginDirect: function(res) {
      /*
       * Monitor login events
       * Will trigger the events in views/login.vue
       */
      util.storage("auth", res.data);

      this.signin(() => {
        // 登录成功（silent来自token续签）
        if (!res.silent) {
          this.initUser(true)
        }
      });
    },
    logoutDirect: function() {
      /*
       * Monitor logout events
       * Will trigger the events in views/index.vue
       */

      util.storage("auth", "");

      window.location.href = process.env.BASE_URL || "/";
    },
    initUser: function(redirect) {
      user.info().then(res => {
        store.set("user", res.data.data);
        // 如果当前是登录页，跳回首页
        if (this.$router.currentRoute.path == "/login") {
          this.$router.replace({ path: "/" });
        } else if(redirect) {
          this.$router.replace({ path: res.from || "/" });
        }
      });
    }
  },
  created: function() {
    /*
     * Start from here!
     */
    this.signin(this.initUser);

    // global event
    util.on("login", this.loginDirect);
    util.on("logout", this.logoutDirect);
  }
};
</script>

<style>
@import url(common/assets/style.css);
</style>
