<template>
  <div class="breadcrumb flex-row align-center">
    <i class="el-icon-s-home _home"></i>
    <el-breadcrumb class="flex-1" separator="/">
      <template v-for="route in $route.matched">
        <el-breadcrumb-item :key="route.path" :to="route" v-if="!route.meta.hide">{{
          route.meta.title || route.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <slot>
      <el-button type="text" @click="$router.go(-1)">
        <i class="ion">&#xe687;</i> 返回上一页
      </el-button>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.breadcrumb {
  position: relative;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(57, 73, 93, 0.08);
  height: 40px;
  padding: 0 22px;
  box-sizing: border-box;
  margin-bottom: 15px;
  font-size: 12px;
}
.breadcrumb ._home {
  font-size: 1.2em;
  color: #9b9b9b;
  margin-right: 6px;
}

</style>
