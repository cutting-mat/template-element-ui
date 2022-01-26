<template>
  <div class="scrollbar">
    <div class="flex-row" style="margin-top: 20px">
      <div class="flex-1 box blockLayout scrollbar">
        <!--  -->
        <BaseUploader />
      </div>
      <div class="flex-1 box blockLayout">
        <h2>测试全局功能</h2>

        <div>
          时间戳格式化过滤器：{{ new Date().getTime() }} =>
          {{ new Date().getTime() | date }}
        </div>
        <div v-test></div>
        <div>{{ globalMethodOutput }}</div>
        <div>{{ instanceMethodOutput }}</div>
      </div>
      <div class="flex-1 box blockLayout">
        <h2>Store 功能测试</h2>
        <el-button @click="testStoreFun1"
          >$store.set('test', random())</el-button
        >
        <el-button @click="testStoreFun2"
          >设置不存在的Store值，观察控制台输出</el-button
        >

        <div>$store.state.test = {{ $store.state.test }}</div>

        <el-button @click="testStoreFun3">获取异步数据，观察控制台输出</el-button>
        <div>用户信息：{{ $store.state.user }}</div>
      </div>
    </div>
    <div class="flex-row">
      <div class="flex-1 box blockLayout"></div>
      <div class="flex-1 box blockLayout"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//import { util } from "@/core";

export default {
  data() {
    return {
      log: [],
      globalMethodOutput: "",
      instanceMethodOutput: "",
    };
  },
  computed: {
    ctest(){
      return 'computed' + this.$store.state.test
    }
  },
  methods: {
    testGlobalFunc() {
      this.globalMethodOutput = Vue.globalMethod();
      this.instanceMethodOutput = this.$myMethod();
    },
    testStoreFun1() {
      this.$store.set("test", Math.random());
    },
    testStoreFun2() {
      this.$store.set("non-existent", Math.random());
    },
    testStoreFun3() {
      this.$store.action("user").then((user) => {
        console.log('获取成功', user)
      });
    },
  },
  created() {
    this.testGlobalFunc();

  },
};
</script>

<style scoped>
.box {
  height: 250px;
}
</style>
