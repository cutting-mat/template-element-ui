<template>
  <div>
    <!-- 可视化模板 -->
    <LayoutBlank v-if="$route.path.indexOf('/data-v') === 0" />
    <!-- 常规模板 -->
    <Layout v-else />
  </div>
</template>

<script>
import Layout from "../components/Layout";
import LayoutBlank from "../components/LayoutBlank";

export default {
  components: {
    Layout,
    LayoutBlank,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
