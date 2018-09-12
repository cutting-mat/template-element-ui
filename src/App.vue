<template>
  <div id="app">
    <router-view class="child-view"></router-view>
  </div>
</template>

<script>
import * as util from "./assets/util.js";
import instance from "./api";
import routers from './router/routers';


export default {
  name: 'app',
  methods: {
    signin: function(localUser) {
      //检查登录状态
      if (!localUser) {
        return console.warn("未登录！");
      }
      //设置请求头统一携带token
      instance.defaults.headers.common["Authorization"] = localUser;
      //注入路由
      this.$router.addRoutes(routers.concat([{
        path: '*',
        redirect: '/404'
      }]));
    },
    getUserToken: function(token){
      let vm = this;
      if(token){
        vm.$root.token = token;
        vm.signin(token);
      }else{
        console.warn('缺少参数');
      }
    }
  },
  created: function() {
    if(!this.$root.token){
      this.getUserToken('b9cdf44483f0c7e0abd51d90109d5dd1');
    }
  }
}
</script>

<style>
@import url(assets/common.css);
</style>
