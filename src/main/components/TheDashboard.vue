<template>
  <div class="scrollbar">
    <div class="flex-row" style="margin-top: 20px">
      <div class="flex-1 box blockLayout scrollbar">
        <el-button @click="handleRegiste()">注册全局事件</el-button>
        <el-button @click="handleEmit()">触发全局事件</el-button>
        <el-button @click="log = []">清空日志</el-button>
        <div>
          <div v-for="(item, index) in log" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="flex-1 box blockLayout"></div>
      <div class="flex-1 box blockLayout"></div>
    </div>
    <div class="flex-row">
      <div class="flex-1 box blockLayout"></div>
      <div class="flex-1 box blockLayout"></div>
    </div>
  </div>
</template>

<script>
import * as util from "@/main/assets/util";

export default {
  data() {
    return {
      log: [],
    };
  },
  methods: {
    handleRegiste() {
      const eventName = `utilEvent__${this.log.length}`;
      this.log.push(`注册了事件监听 ${eventName}`);
      util.on(`${eventName}`, () => {
        this.log.push(`触发了事件监听 ${eventName}`);
      });
    },
    handleEmit() {
      util.emit("utilEvent");
    },
  },
};
</script>

<style scoped>
.box {
  height: 250px;
}
</style>
