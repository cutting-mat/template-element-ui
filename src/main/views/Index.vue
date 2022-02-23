<template>
  <div>
    <!-- 为模块单独分配模板 -->
    <LayoutBlank v-if="$route.path.indexOf('/data-v') === 0" />
    <!-- 统一模板 -->
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

