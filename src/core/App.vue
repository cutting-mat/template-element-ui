<template>
  <router-view id="app" />
</template>

<script>
import { store } from "@/core";

export default {
  methods: {},
  created: function () {
    /*
     * Start from here!
     */
    this.$AccountAuth({
      loginCallback: () => {
        // 初始化用户信息
        store.action("user", true)
      },
    });
  },
};
</script>

<style>
@import url(./global.css);
</style>
