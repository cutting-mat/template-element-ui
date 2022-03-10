<template>
  <div class="scrollbar" v-loading.fullscreen="fullLoading">
    <div class="flex-row" style="margin-top: 20px">
      <div class="flex-1 box blockLayout scrollbar">
        <!--  -->
        <el-upload-plugin v-model="uploadList" :limit="2" :show-file-list="false" />
        <TheFileList v-model="uploadList" :beforeDelete="beforeDelete" />
      </div>
      <div class="flex-1 box blockLayout">
        <h2>Vue全局资源测试</h2>

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
        <el-button @click="testStoreFun1"> 同步操作 </el-button>
        <el-button :loading="loading" @click="testStoreFun4">
          异步操作
        </el-button>
        <div>$store.state.testValue = {{ state.testValue }}</div>

        <el-button @click="testStoreFun3">
          获取异步数据, 观察控制台输出
        </el-button>
        <div style="width: 100%; white-space: nowrap; overflow-x: auto">
          $store.state.user = {{ state.user }}
        </div>

        <el-button @click="testStoreFun2">
          设置不存在的Store值, 观察控制台输出
        </el-button>
      </div>
    </div>
    <div class="flex-row">
      <div class="flex-1 box blockLayout">
        <h2>axios缓存测试</h2>
        <el-button @click="testRequest(true)"> 请求(缓存开) </el-button>
        <el-button @click="testRequest(false)"> 请求(缓存关) </el-button>
        <el-button @click="multiRequest(true)"> 并发3次请求(缓存开) </el-button>
        <el-button @click="multiRequest(false)">
          并发3次请求(缓存关)
        </el-button>
        <div class="log">
          <el-button size="mini" @click="clear()"> 清空日志 </el-button>
          <div v-for="(item, index) in log" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="flex-1 box blockLayout"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//import { util } from "@/core";
import axios from "@cutting-mat/axios";
// 创建请求实例
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  components: {
    TheFileList: () => import("./TheFileList.vue"),
  },
  data() {
    return {
      fullLoading: false,
      loading: false,
      uploadList: [],
      log: [],
      globalMethodOutput: "",
      instanceMethodOutput: "",
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  methods: {
    beforeDelete(){
      this.fullLoading = true;
      return new Promise(resolve => {
        setTimeout(() => {
          this.fullLoading = false;
          resolve(true)
        },1000)
      })
    },  
    testGlobalFunc() {
      this.globalMethodOutput = Vue.globalMethod();
      this.instanceMethodOutput = this.$myMethod();
    },
    testStoreFun1() {
      this.$store.set("testValue", Math.random());
    },
    testStoreFun2() {
      this.$store.set("non-existent", Math.random());
    },
    testStoreFun3() {
      this.$store.action("user").then((user) => {
        console.log("获取成功", user);
      });
    },
    testStoreFun4() {
      this.loading = true;
      this.$store.action("testAction").then(() => {
        this.loading = false;
      });
    },
    clear() {
      this.log = [];
    },
    testRequest(cacheOption) {
      return instance
        .get("http://rap2api.taobao.org/app/mock/3567/return/test", null, {
          cache: cacheOption,
        })
        .then((res) => {
          this.log.push(`${new Date().getTime()}: ${JSON.stringify(res.data)}`);
        })
        .catch((err) => {
          this.log.push(`${new Date().getTime()}: ${err.message || err}`);
        });
    },
    multiRequest(cacheOption) {
      for (let i = 0; i < 3; i++) {
        this.testRequest(cacheOption);
      }
    },
  },
  created() {
    this.testGlobalFunc();

    // getError().then(res => {
    //   console.log('then', res)
    // }).catch(err => {
    //   console.log('catch', err)
    // })
  },
};
</script>

<style scoped>
.box {
  height: 350px;
}

.log {
  text-align: left;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 20px 0;
  min-height: 10em;
  background: #dedede;
  border-radius: 8px;
  padding: 20px;
}
</style>
