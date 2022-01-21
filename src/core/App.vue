<template>
  <router-view id="app" />
</template>

<script>
import Vue from "vue";
import { util, store, AccessControl } from "@/core";
import { instance } from "@/core";
import { routeAuthWhiteList } from "@/core/router";

Vue.use(AccessControl);

console.warn("免登录白名单:", routeAuthWhiteList);

export default {
  methods: {
    initAuth: function () {
      instance.defaults.headers.common["Authorization"] = store.get("accessToken");
      return Vue.AccessControl(this.$router);
    },
    initUser: function (loginRes) {
      // 初始化用户信息
      store.action("user", true).then(() => {
        // 路由redirect
        if (loginRes && loginRes.redirect) {
          this.$router.replace({ path: loginRes.redirect });
        }
      });
    },
    handleLogin: function (res) {
      /*
       * 监听 "login" 事件
       */
      util.storage("auth", res.data);
      store.set("accessToken", res.data.accessToken);

      this.initAuth().then((actualRouter) => {
        store.set("menu", actualRouter);

        if (res.silent) {
          console.log("token已自动续期");
        } else {
          this.initUser(res);
        }
      });
    },
    handleLogout: function () {
      /*
       * 监听 "logout" 事件
       */
      util.storage("auth", "");

      if (
        routeAuthWhiteList.indexOf(
          "/" + this.$router.currentRoute.path.split("/")[1]
        ) === -1
      ) {
        // 非白名单路由刷新，触发路由守卫的未登录逻辑
        window.location.reload();
      }
    },
  },
  created: function () {
    /*
     * Start from here!
     */
    if (store.get("accessToken")) {
      this.initAuth().then((actualRouter) => {
        store.set("menu", actualRouter);
        return this.initUser();
      });
    }

    // global event
    util.on("login", this.handleLogin);
    util.on("logout", this.handleLogout);
  },
};
</script>

<style>
@import url(./global.css);
</style>
