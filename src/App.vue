<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as util from "./assets/util.js";
import instance from "./api";
import routers from './router/routers';


export default {
  name: 'app',
  methods: {
    signin: function(token) {
      //检查登录状态
      if (!token) {
        return null;
      }
      //全局挂载
      this.$root.token = localUser;
      //设置请求头统一携带token
      instance.defaults.headers.common["Authorization"] = token;
      //注入路由
      this.$router.addRoutes(routers.concat([{
        path: '*',
        redirect: '/404'
      }]));
    },
    getUserToken: function(){
      let localUser = util.session('token');
      if(localUser){
        this.signin(localUser);
      }else{
        this.$router.push('/401')
      }
    }
  },
  created: function() {
    this.getUserToken();
  }
}
</script>

<style>
@import url(assets/common.css);
</style>
