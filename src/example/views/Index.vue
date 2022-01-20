<template>
  <div class="scrollbar">
    <router-view class="wrap lib-content" />
  </div>
</template>

<script>
import { util } from "@/core";

export default {
  data() {
    return {
      list: require('../assets/big-tree.json').data,
      tree: []
    };
  },
  methods: {
    runBuild() {
      let now = Date.now();
      let tree = util.buildTree(this.list, 'pid', function(a, b){
        return a.name.length - b.name.length
      });
      this.tree = tree;
      console.log('runBuild耗时：', Date.now() - now);
    }
  },
  created() {
    this.runBuild()
  },
};
</script>

<style scoped>
@import url(../assets/style.css);

</style>
