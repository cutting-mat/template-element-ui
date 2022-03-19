<template>
  <div class="flex-row align-center toolBar">
    <span class="_back" title="返回" @click="back()">
      <i class="el-icon-back"></i>
    </span>
    <div class="flex-1 _title">{{ title }}</div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return (this.$route.meta && this.$route.meta.title) || this.$route.name;
      },
    },
    back: {
      type: Function,
      required: false,
      default() {
        this.$router.go(-1);
      },
    },
  },
};
</script>

<style scoped>
.toolBar {
  position: sticky;
  top: 0;
  z-index: 9;
  padding: 10px 0;
  background: #fff;
}
.toolBar ._back {
  font-size: 20px;
  cursor: pointer;
  color: #333;
  padding: 0 10px;
}
.toolBar ._back:hover {
  opacity: 0.8;
}
.toolBar ._title {
  font-size: 18px;
  color: #333;
}
</style>
