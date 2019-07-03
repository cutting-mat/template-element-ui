<template>
  <header class="flex-row align-center myheader">
    <h1 class="logo">LOGO</h1>
    <div class="flex-1">
      <el-menu :default-active="activeMenu" mode="horizontal" router style="float:right">
        <el-menu-item route="/" index="首页">首页</el-menu-item>
        <template v-for="(route, index) in $root.globalData.menu">
          <el-menu-item
            :route="route"
            :index="route.name"
            :key="'nav'+index"
          >{{route.meta.title || route.name}}</el-menu-item>
        </template>
        <el-menu-item v-if="user && user.token" @click="logout">退出登录</el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
import * as util from "@/common/assets/util";

export default {
  props: {},
  data() {
    return {
      user: util.storage("user")
    };
  },
  computed: {
    mainMenus: function(){
      if(this.$root.globalData.menu){
        return this.$root.globalData.menu.concat([{
          name: '首页',
          path: '/'
        }])
      }
      return []
    },
    activeMenu: function() {
      const targetIndex = this.mainMenus.findIndex(e => {
        return this.$route.fullPath.indexOf(e.path) === 0
      })
      if(targetIndex!==-1){
        return this.mainMenus[targetIndex].name
      }
      return this.$route.name;
    }
  },
  methods: {
    logout: function() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit("logout");
      });
    }
  }
};
</script>

<style scoped>
.myheader {
  border-bottom: solid 1px #e6e6e6;
  padding: 0 20px;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>
