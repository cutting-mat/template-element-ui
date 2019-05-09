<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect" />
</template>

<script>
import * as util from "@/base/assets/util";
import {instance} from "@/base/api";


export default {
  name: 'app',
  methods: {
    signin: function(callback) {
      let localUser = util.storage('user');
      if(!localUser){
        return this.$router.replace({path: '/login', query: { from: this.$router.currentRoute.path }})
      }
      //全局挂载
      this.$root.user = localUser;
      //设置请求头统一携带token
      instance.defaults.headers.common["Authorization"] = localUser.token;
      
      //执行回调
      typeof callback === 'function' && callback();
    },
    loginDirect: function(newPath){
      this.signin(() => {
        this.$router.replace({path: newPath || '/'});
      });
    },
    logoutDirect: function(){
      //清除user
      util.storage('user','');
      //清除请求头token
      instance.defaults.headers.common['Authorization'] = '';
      //回到登录页
      this.$router.replace({path: '/login'});
    }
  },
  created: function() {
    this.signin();
  }
}
</script>

<style>
@import url(base/assets/common.css);
</style>
