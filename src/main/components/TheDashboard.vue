<template>
  <div class="scrollbar">
    <div class="flex-row" style="margin-top: 20px">
      <div class="flex-1 box blockLayout scrollbar">
        <!--  -->
        <BaseUploader />
      </div>
      <div class="flex-1 box blockLayout">
        <h2>测试全局功能</h2>

        <div>时间戳格式化过滤器：{{new Date().getTime()}} => {{ new Date().getTime() | date }}</div>
        <div v-test></div>
        <div>{{ globalMethodOutput }}</div>
        <div>{{ instanceMethodOutput }}</div>
      </div>
      <div class="flex-1 box blockLayout"></div>
    </div>
    <div class="flex-row">
      <div class="flex-1 box blockLayout"></div>
      <div class="flex-1 box blockLayout"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//import { util } from "@/core";

export default {
  data() {
    return {
      log: [],
      globalMethodOutput: "",
      instanceMethodOutput: "",
    };
  },
  methods: {
    testGlobalFunc() {
      this.globalMethodOutput = Vue.globalMethod();
      this.instanceMethodOutput = this.$myMethod();
    },
  },
  created() {
    this.testGlobalFunc();
  },
};
</script>

<style scoped>
.box {
  height: 250px;
}
</style>
