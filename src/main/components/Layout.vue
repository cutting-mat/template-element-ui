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
      <div v-else class="flex-1 flex-col">
        <Breadcrumb />
        <router-view class="flex-1" />
      </div>
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

/* 工具栏 */

.mainLayout >>> .toolBar {
  margin-bottom: 20px;
}

/* 左边栏 */

.mainLayout >>> .sideBar {
  width: 260px;
  margin-right: 20px;
}

/* 内容快 */

.mainLayout >>> .blockLayout {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin: 6px 14px 14px 6px;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
