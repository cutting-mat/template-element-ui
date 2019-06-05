<template>
  <header class="flex-row align-center myheader">
    <div class="flex-1">
      <el-menu :default-active="activeMenu" mode="horizontal" router >
        <template v-for="(route, index) in $root.globalData.menu">
          <el-menu-item :route="route" :index="route.name" :key="'nav'+index">{{route.meta.title || route.name}}</el-menu-item>
        </template>
      </el-menu>
    </div>
    <div>
      <el-button @click="$emit('logout')">退出登录</el-button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    
  },
  data() {
    return {
      
    }
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.myheader{border-bottom: solid 1px #e6e6e6;}
.el-menu.el-menu--horizontal{border-bottom: 0;}

</style>
