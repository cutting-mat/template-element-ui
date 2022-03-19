<template>
  <div class="scrollbar" v-loading="fullLoading">
    <div class="flex-row main">
      <div class="flex-1 box scrollbar">
        <!--  -->
        <uploader v-model="uploadList" :limit="2" />
      </div>
      <div class="flex-1 box">
        <h2>Vue全局资源测试</h2>

        <div>
          时间戳格式化过滤器：{{ new Date().getTime() }} =>
          {{ new Date().getTime() | date }}
        </div>
        <div v-test></div>
        <div>{{ globalMethodOutput }}</div>
        <div>{{ instanceMethodOutput }}</div>
      </div>
      <div class="flex-1 box">
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
      <div class="flex-1 box">
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
      <div class="flex-1 box">
        <h2>存取JSON</h2>
        <el-button @click="saveJSON()"> 保存JSON </el-button>
        <el-button @click="Unauthorized()">
          未授权请求
        </el-button>
      </div>
      <div class="flex-1 box">
        <h2>字典控件</h2>
        <dict-select v-model="dictSelectValue" param="select123"></dict-select>
        <dict-radio v-model="dictRadioValue" param="radio123"></dict-radio>
        <dict-checkbox v-model="dictCheckbox" param="check123"></dict-checkbox>
        <dict-cascader v-model="dictCasader" param="cascader123"></dict-cascader>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
//import { util } from "@/core";
import { saveJSON, Unauthorized } from "@/main/api/common";
import { info } from "@/user/api/user";

export default {
  data() {
    return {
      fullLoading: false,
      loading: false,
      uploadList: [],
      log: [],
      globalMethodOutput: "",
      instanceMethodOutput: "",
      dictSelectValue: null,
      dictRadioValue: null,
      dictCheckbox: [],
      dictCasader: [],
      num: null
    };
  },
  computed: {
    state() {
      return this.$store.state;
    },
  },
  methods: {
    Unauthorized(){
      Unauthorized()
    },
    saveJSON() {
      saveJSON({
        content: `test: ${parseInt(Math.random() * 1e3)}`,
      });
    },
    beforeDelete() {
      this.fullLoading = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          this.fullLoading = false;
          resolve(true);
        }, 1000);
      });
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
      return info(null, {
        cache: cacheOption,
      })
        .then((res) => {
          this.log.push(`success: ${res.data.createTime}`);
        })
        .catch((err) => {
          this.log.push(`error: ${err.message || err}`);
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
.main{
  padding: 10px;
}
.box {
  height: 350px;
  border-radius: 6px;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 0 6px rgba(0,0,0,.1);
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
