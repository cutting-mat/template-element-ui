<template>
  <router-view id="app" />
</template>

<script>
import { instance } from "@/core";

export default {
  name: "CuttingMatApp",
  created: function () {
    this.$Permission((userToken) => {
      // 设置请求头 Authorization
      instance.defaults.headers.common["Authorization"] = userToken;

      // 初始化用户信息
      this.$store.action("user", {
        cache: 'update'
      });
    });
  },
};
</script>
