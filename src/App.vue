<template>
  <router-view id="app" />
</template>

<script>

export default {
  methods: {},
  created: function () {
    /*
     * Start from here!
     */
    this.$AccountAuth({
      loginCallback: () => {
        // 初始化用户信息
        this.$store.action("user", true)
      },
    });
  },
};
</script>

<style scoped>

</style>
