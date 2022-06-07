<template>
  <router-view id="app" />
</template>

<script>
export default {
  name: "CuttingMatApp",
  created: function () {
    this.$Permission(() => {
      // 初始化用户信息
      this.$store.action("user", {
        cache: "update",
      });
    });
  },
};
</script>
