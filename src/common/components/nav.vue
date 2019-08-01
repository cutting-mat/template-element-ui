<template>
  <el-menu :collapse="state.isCollapse" 
    :default-active="$route.name" 
    :default-openeds="[activeMenu.name]"
    router 
    unique-opened
    class="custom-menu">
    <template v-for="(route, index) in state.menu">
      <!-- 两层 -->
      <el-submenu v-if="route.children && route.children.length"
        :route="route"
        :index="route.name"
        :key="'nav'+index"
      >
        <template slot="title">
          <i class="ion" v-html="(route.meta && route.meta.icon) || '&#xe731;'"></i>
          <span slot="title">{{(route.meta && route.meta.title) || route.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(child, ci) in route.children"
            :route="child"
            :index="child.name"
            :key="'child'+ci"
            >
            {{(child.meta && child.meta.title) || child.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 一层 -->
      <el-menu-item v-else
        :route="route"
        :index="route.name"
        :key="'nav'+index"
      >
        <i class="ion" v-html="(route.meta && route.meta.icon) || '&#xe731;'"></i>
        <span slot="title">{{(route.meta && route.meta.title) || route.name}}</span>
      </el-menu-item>
    
    </template>
  </el-menu>
</template>

<script>
import {store} from "@/store"

export default {
  data() {
    return {
      state: store.state
    };
  },
  computed: {
    mainMenus: function() {
      if (this.state.menu) {
        return this.state.menu.concat([
          {
            name: "首页",
            path: "/"
          }
        ]);
      }
      return [];
    },
    activeMenu: function() {
      const targetIndex = this.mainMenus.findIndex(e => {
        return this.$route.fullPath.indexOf(e.path) === 0;
      });
      if (targetIndex !== -1) {
        return this.mainMenus[targetIndex];
      }
      return this.$route;
    }
  }
};
</script>

<style scoped>
.custom-menu{
  margin-right:20px;
  box-shadow: 2px 0 8px rgba(0,0,0,.1);
}
.custom-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.custom-menu >>> .ion{font-size:1.4em;margin-right:6px;}
.custom-menu >>> .el-menu-item-group{
  background:#f5f8ff;
}
.custom-menu >>> .is-active{
  background:#e8f3fe;
}
.custom-menu >>> .is-active:not(.is-opened) .el-submenu__title::before,
.custom-menu >>> .el-menu-item.is-active::before{
  content:"";
  position: absolute;
  left: 0;
  top:0;
  height: 100%;
  width: 3px;
  background:#1a8ff7;
}
</style>
