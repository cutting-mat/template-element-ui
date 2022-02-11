<template>
  <router-view id="app" />
</template>

<script>
export default {
  name: 'CuttingMatApp',
  created: function () {
    this.$AccountAuth({
      loginCallback: () => {
        // 初始化用户信息
        this.$store.action("user", {
          cache: false
        })
      },
    });
  },
};
</script>
