<template>
  <div>
    <!-- 不用全局模板 -->
    <LayoutBlank v-if="$route.path.indexOf('/data-v') === 0" />
    <!-- 全局模板 -->
    <LayoutMain v-else />
  </div>
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

