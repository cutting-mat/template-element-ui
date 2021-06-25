<template>
  <div class="scrollbar blockLayout flex-col" v-loading.fullpage="loading">
    <div class="flex-row align-center toolBar">
      <div class="flex-1">
        <!-- title -->
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <el-form class="infoBox" label-width="100px">
        <div class="_user">
          <div class="_accountName">
            {{ state.user.accountName }}
          </div>
          <div class="_accountNumber">
            {{ state.user.accountNumber }}
          </div>
          <div class="_accountNumber">
            创建时间：{{ state.user.createTime | date }}
          </div>
          
        </div>

        
      </el-form>
    </div>
  </div>
</template>

<script>
import { store } from "@/core/store";

export default {
  data() {
    return {
      state: store.state,
      loading: false,
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>

.infoBox {
  width: 300px;
  margin: auto;
  padding: 2em 0;
}
.infoBox ._avat {
  text-align: center;
}
.infoBox ._user {
  text-align: center;
}
.infoBox ._accountName {
  color: #333;
  font-size: 1.5em;
}
.infoBox ._accountNumber {
  color: #999;
}
.infoBox >>> .el-form-item {
  margin-bottom: 0;
}
</style>
