<template>
  <div class="flex-col">
    <!-- 头部 -->
    <Header />
    <div class="flex-1 flex-row">
      <!-- 菜单 -->
      <SubNav v-if="$route.path !== '/'" />
      <!-- 首页 -->
      <dashboard v-if="$route.path == '/'" class="flex-1" />
      <!-- 内页 -->
      <div v-else class="flex-1 flex-col">
        <Breadcrumb />
        <router-view class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script>
import {info} from "@/user/api/user"

export default {
  components: {
    dashboard: () => import("../components/TheDashboard.vue"),
  },
  data() {
    return {};
  },
  methods: {
    fetchData(mark, reload) {
      info(null, {
        cache: !reload
      }).then(res => {
        console.log(mark, res)
      }).catch(err => {
        console.warn(mark, err)
      })
    }
  },
  created(){
    this.fetchData(1);
    this.fetchData(1.5);
    
    setTimeout(() => {
      this.fetchData(3);
    }, 2000)
  }
};
</script>

<style>
@import url(../assets/style.css);

/* 工具栏 */

.toolBar {
  margin-bottom: 20px;
}

/* 左边栏 */

.sideBar {
  width: 260px;
  margin-right: 20px;
}

/* 内容快 */

.blockLayout {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  margin: 6px 14px 14px 6px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
