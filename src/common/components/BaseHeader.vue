<template>
  <header class="flex-row align-center myheader">
    <h1 class="logo" @click="$router.push('/')">LOGO</h1>

    <div class="flex-1">
        <!-- head -->
    </div>
    <el-dropdown v-if="state.user && state.user.username"
      class="userAvat"
      @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <span class="username">{{state.user.username}}</span>
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import {store} from '@/store'
import {emit} from '../assets/util'

export default {
  data() {
    return {
      state: store.state
    }
  },
  methods: {
    handleCommand: function(command){
      switch (command) {
        case 'logout':
          this.logout()
          break;
      
        default:
          break;
      }
    },
    logout: function() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        emit("logout");
      });
    }
  }
};
</script>

<style scoped>
.myheader {
  padding: 0 20px;
  height: 60px;
  background: #257FF7;
  background-size:cover;
  color:#fff;
}

.logo{cursor:pointer;margin-right:15px;}

.userAvat .el-dropdown-link{
  color:#fff;
  cursor:pointer
}
.userAvat .el-avatar{vertical-align:middle;}
.userAvat .username{display:inline-block;vertical-align:middle;margin:0 5px 0 10px;}
</style>
