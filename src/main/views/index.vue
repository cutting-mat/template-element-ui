<template>
  <div class="mainCont flex-col">
    <!-- 头部 -->
    <global-header @logout="$emit('logout')" />
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
import * as util from "@/common/assets/util";

export default {
  components: {
    dashboard: () => import("../components/dashboard.vue")
  },
  data () {
    return {
      
    }
  },
  methods: {
    logout: function() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit("logout");
      });
    }
  }
};
</script>

<style scoped>
.mainCont{background:#f5f5f5;}
</style>
