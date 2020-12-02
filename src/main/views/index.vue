<template>
  <div class="mainCont flex-col">
    <!-- 头部 -->
    <global-header />
    <div class="flex-1 flex-row">
      <!-- 菜单 -->
      <global-nav  />
      <!-- 内容 -->
      <template v-if="$route.path=='/'">
        <dashboard class="flex-1" />
      </template>
      <template v-else>
        <div class="flex-1 flex-col">
          <global-tag-manage />

          <router-view class="flex-1" />
        </div>
      </template> 
    </div>
  </div>
</template>

<script>

export default {
  components: {
    dashboard: () => import("../components/TheDashboard.vue")
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>
.mainCont{background:#f5f5f5;}
</style>
