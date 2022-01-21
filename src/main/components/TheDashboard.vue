<template>
  <div class="scrollbar">
    <div class="flex-row" style="margin-top: 20px">
      <div class="flex-1 box blockLayout scrollbar">
        <!--  -->
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
//import { util } from "@/core";

export default {
  data() {
    return {
      log: [],
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.box {
  height: 250px;
}
</style>
