<template>
  <el-menu :collapse="state.isCollapse" 
    :default-active="activeIndex" 
    router 
    unique-opened
    class="custom-menu scrollbar">
    <template v-for="(route, index) in list">
      
      <el-submenu v-if="route.children && filterShowMenu(route.children).length"
        :route="route"
        :index="route.name"
        :key="'nav'+index"
      >
        <template slot="title">
          <i class="ion" v-html="(route.meta && route.meta.icon) || '&#xe731;'"></i>
          <span slot="title">{{(route.meta && route.meta.title) || route.name}}</span>
        </template>
        <template v-for="(child, ci) in filterShowMenu(route.children)">
          <!-- 三层 -->
          <el-menu-item-group v-if="child.children && filterShowMenu(child.children).length"
            :route="child"
            :index="child.name"
            :key="'child'+ci"
            >
            <template slot="title">
              <span slot="title">{{(child.meta && child.meta.title) || child.name}}</span>
            </template>
            <el-menu-item v-for="(grandson, grandsonindex) in filterShowMenu(child.children)"
              :route="grandson"
              :index="grandson.name"
              :key="'grandson'+grandsonindex"
            >
              <span slot="title">{{(grandson.meta && grandson.meta.title) || grandson.name}}</span>
            </el-menu-item>
          </el-menu-item-group>
          <!-- 两层 -->
          <el-menu-item v-else
            :route="child"
            :index="child.name"
            :key="'child'+ci"
          >
            <span slot="title">{{(child.meta && child.meta.title) || child.name}}</span>
          </el-menu-item>
        </template>
        
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
    activeIndex(){
      if(this.$route.meta && this.$route.meta.belong){
        return this.$route.meta.belong
      }
      return this.$route.name
    },
    list: function(){
      const filt = (arr) => {
        let res = arr.filter(e => !e.meta || !e.meta.hide);
        res = res.map(e => {
          let _route = Object.assign({}, e);
          if(_route.children){
            _route.children = filt(_route.children);
          }
          return _route
        })
        return res;
      }
      return filt(this.state.menu)
    }
  },
  methods: {
    filterShowMenu(routes) {
      return routes.filter(e => {
        return !e.meta || !e.meta.hide
      })
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
