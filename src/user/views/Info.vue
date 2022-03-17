<template>
  <div v-loading.fullscreen="loading">
    <ToolBar></ToolBar>
    <!-- 内容 -->
    <div class="infoBox wrap">
      <div class="_avatar">
        <img :src="userInfo.avatar" alt />
      </div>
      <el-descriptions border>
        <el-descriptions-item label="用户名">{{ userInfo.accountName }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ userInfo.accountNumber }}</el-descriptions-item>
        <el-descriptions-item label="所属组织">{{ userInfo.orgName }}</el-descriptions-item>

        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.infoBox ._avatar {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  background: #dedede;
}
.infoBox ._avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
