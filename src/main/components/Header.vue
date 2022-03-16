<template>
  <header class="flex-row align-center myheader">
    <h1 class="logo" @click="$router.push('/')">LOGO</h1>

    <ul class="flex-1 navlist">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="_item"
        :class="{ cur: $route.path.indexOf(item.path) === 0 }"
        @click="toggleNav(item)"
      >
        {{ (item.meta && item.meta.title) || item.name }}
      </li>
    </ul>
    <el-dropdown
      v-if="state.user && state.user.accountName"
      class="userAvat"
      trigger="click"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <span class="accountName">{{ state.user.accountName }}</span>
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import { util } from "@/core";
import { MainRoute } from "@/route.config";

export default {
  data() {
    return {
      state: this.$store.state,
    };
  },
  computed: {
    list: function () {
      return (
        this.$AccessControl ? this.state.DynamicRoute[0].children : MainRoute[0].children
      ).filter((e) => !e.meta || !e.meta.hide);
    },
  },
  methods: {
    toggleNav(item) {
      if (item.path) {
        if (item.redirect !== this.$route.path) {
          this.$router.push(item.path);
        }
      } else {
        window.open(item.url, "_blank");
      }
    },
    handleCommand: function (command) {
      switch (command) {
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
        util.emit("logout");
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
.userAvat .el-avatar {
  vertical-align: middle;
}
.userAvat .accountName {
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
