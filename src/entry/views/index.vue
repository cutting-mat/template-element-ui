<template>
  <div class="mainCont flex-col">
    <my-header @logout="$emit('logout')" />
    <template v-if="$route.path=='/'">
      <dashboard class="flex-1" />
    </template>
    <template v-else>
      <router-view  class="flex-1" id="main" />
    </template>
  </div>
</template>

<script>
//import * as util from "@/common/assets/util";

export default {
  data() {
    return {};
  },
  components: {
    myHeader: () => import("../components/myHeader.vue"),
    dashboard: () => import("../components/dashboard.vue")
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
    },
    fetchData: function() {
      //
    }
  },
  created: function() {
    this.fetchData();
  }
};
</script>

<style scoped>

</style>
