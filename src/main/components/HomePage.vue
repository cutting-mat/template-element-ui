<template>
  <div class="scrollbar">HomePage</div>
</template>

<script>
// import { util } from "@/core";
import { loadScript } from "@/core";

export default {
  created() {
    loadScript([
      "/lib/jquery-3.6.0.min.js?v=1",
      "/lib/jquery-3.6.0.min.js?v=2",
    ]).then(() => {
      console.log(window.jQuery);
    });
  },
};
</script>

<style scoped></style>
