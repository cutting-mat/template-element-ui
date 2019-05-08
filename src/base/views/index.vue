<template>
  <div>
    <HelloWorld msg="HelloWorld" />
    <div>
      <el-button @click="logout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
//import * as util from "@/main/assets/util";

export default {
  data() {
    return {};
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
    },
    fetchData: function() {
      //
    }
  },
  created: function() {
    this.fetchData();
  }
};
</script>

<style scoped>

</style>
