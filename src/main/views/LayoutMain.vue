<template>
  <div class="flex-col mainLayout">
    <!-- 头部 -->
    <Header />
    <div class="flex-1 flex-row">
      <!-- 菜单 -->
      <SubNav v-if="$route.path !== '/'" />
      <!-- 首页 -->
      <dashboard v-if="$route.path == '/'" class="flex-1" />
      <!-- 内页 -->
      <router-view v-else class="flex-1 flex-col _main" />
        
    </div>
  </div>
</template>

<script>

export default {
  components: {
    dashboard: () => import("../components/TheDashboard.vue"),
  },
  data() {
    return {};
  },
  
};
</script>

<style scoped>
@import url(../assets/style.css);

/* 内容快 */
.mainLayout ._main {
  padding-right: 20px;
}
</style>
