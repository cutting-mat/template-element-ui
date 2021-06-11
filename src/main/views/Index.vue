<template>
  <div class="flex-col">
    <!-- 头部 -->
    <BaseHeader />
    <div class="flex-1 flex-row">
      <!-- 菜单 -->
      <BaseSubNav v-if="$route.path !== '/'" />
      <!-- 首页 -->
      <dashboard v-if="$route.path == '/'" class="flex-1" />
      <!-- 内页 -->
      <div v-else class="flex-1 flex-col">
        <BaseBreadcrumb />
        <router-view class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    dashboard: () => import("../components/TheDashboard.vue"),
    BaseBreadcrumb: () => import("../components/BaseBreadcrumb.vue"),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
@import url(../assets/style.css);

/* 工具栏 */

.toolBar {
  margin-bottom: 20px;
}

/* 左边栏 */

.sideBar {
  width: 260px;
  margin-right: 20px;
}

/* 内容快 */

.blockLayout {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin: 6px 14px 14px 6px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
