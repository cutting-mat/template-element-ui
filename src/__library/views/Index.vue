<template>
  <div class="scrollbar">
    <router-view class="wrap lib-content" />
  </div>
</template>

<script>
//import * as util from "@/common/assets/util";

export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
/* 演示样式 */
.lib-content >>> h2 {
  font-size: 28px;
  color: #1f2f3d;
  margin-bottom: 12px;
}
.lib-content >>> .demo {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 24px;
  margin-bottom: 24px;
}
.lib-content >>> .block{
  margin-bottom: 20px;
}
</style>
