<template>
  <div class="tags flex-row" v-if="this.list.length">
    <div class="flex-1 tagsWrap">
      <el-tag
        v-for="(item,index) in list"
        :key="index"
        closable
        :type="getType(item)"
        effect="plain"
        @close="closeTags(index)"
        @click.native="$router.push(item)"
      >
        {{(item.meta && item.meta.title) || item.name}}
      </el-tag>
    </div>
    <!-- 其他操作按钮 -->
    <el-dropdown @command="handleTags">
      <el-button type="text">
        <i class="el-icon-arrow-down"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  watch: {
    $route: {
      handler: function(r) {
        this.setTags(r);
      },
      immediate: true
    }
  },
  methods: {
    getType: function(item){
      return item.path === this.$route.fullPath ? 'primary' : 'info'
    },
    closeTags(index) {
      const delItem = this.list.splice(index, 1)[0];
      const item = this.list[index]
        ? this.list[index]
        : this.list[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push("/");
      }
    },
    closeAll() {
      this.list = [];
      this.$router.push("/");
    },
    closeOther() {
      const curItem = this.list.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.list = curItem;
    },
    setTags(route) {
      const targetIndex = this.list.findIndex(item => {
        return item.path === route.fullPath;
      });
      if(targetIndex===-1){
        this.list.push(route);
      }
    },
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    }
  }
};
</script>

<style scoped>
.tags {
  padding-right:20px;
  box-sizing:border-box;
  margin: 10px 0;
}
.tagsWrap{
  overflow-x:auto;
  overflow-y:hidden;
}
.tagsWrap .el-tag{margin-right: 5px;cursor:pointer}

</style>
