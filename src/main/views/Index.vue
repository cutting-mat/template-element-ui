<template>
  <!-- data-v 模板 -->
  <LayoutBlank v-if="$route.path.indexOf('/data-v') === 0" />
  <!-- 默认模板 -->
  <LayoutMain v-else />
</template>

<script>
import LayoutMain from "./LayoutMain";
import LayoutBlank from "./LayoutBlank";

export default {
  components: {
    LayoutMain,
    LayoutBlank,
  },
};
</script>

