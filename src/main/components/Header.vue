<template>
  <header class="flex-row align-center myheader">
    <h1 class="logo" @click="$router.push('/')">LOGO</h1>

    <ul class="flex-1 navlist">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="_item"
        @click="$router.push(item)"
      >
        {{ (item.meta && item.meta.title) || item.name }}
      </li>
    </ul>

    <el-dropdown
      v-if="user && user.name"
      class="userAvat"
      trigger="click"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        <div class="_image">
          <img :src="user.avatar" v-if="user.avatar" />
        </div>
        <span class="name">{{ user.name }}</span>
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import { event } from "@/core";

export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleCommand: function (command) {
      switch (command) {
        case "userInfo":
          this.$router.push({ name: "个人信息" });
          break;
        case "logout":
          this.logout();
          break;

        default:
          break;
      }
    },
    logout: function () {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        event.emit("logout");
      });
    },
  },
};
</script>

<style scoped>
.myheader {
  padding: 0 20px;
  height: 60px;
  background: #257ff7;
  background-size: cover;
  color: #fff;
}

.logo {
  cursor: pointer;
  margin-right: 15px;
}

.userAvat .el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.userAvat ._image {
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background: #ccc;
  overflow: hidden;
}
.userAvat ._image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.userAvat .name {
  display: inline-block;
  vertical-align: middle;
  margin: 0 5px 0 10px;
}

.navlist {
  height: 100%;
  text-align: right;
  padding: 0 20px;
}
.navlist ._item {
  display: inline-block;
  height: 100%;
  line-height: 60px;
  color: #cbe3fe;
  cursor: pointer;
  width: 8em;
  text-align: center;
  font-size: 16px;
}
.navlist .cur {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}
</style>
