<template>
  <div class="flex-row align-center justify-center loginPage">
    <el-form
      ref="validForm"
      :model="queryParam"
      :rules="rules"
      class="login-form"
      @submit.native.prevent="login"
    >
      <h1 class="main-title">用户登录</h1>
      <p class="des">
        基于 Vue / Element-UI / Axios / Vue-Router 的大中型项目脚手架
      </p>
      <el-form-item prop="accountNumber">
        <el-input
          :autofocus="true"
          placeholder="输入用户名"
          v-model="queryParam.accountNumber"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="输入密码"
          type="password"
          v-model="queryParam.password"
        ></el-input>
      </el-form-item>
      <div class="flex-row align-center">
        <div class="flex-1">
          <el-checkbox v-model="rememberLogin" @change="$store.set('rememberLogin', $event)">记住我</el-checkbox>
        </div>
      </div>
      <el-form-item class="submit-item">
        <el-button
          native-type="submit"
          class="submit-button"
          type="primary"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
      <p class="footer-info">
        Author：<el-link
          type="primary"
          href="https://refined-x.com"
          target="blank"
          >refined-x</el-link
        >
        Github：<el-link
          type="primary"
          href="https://github.com/cutting-mat"
          target="_blank"
          >cutting-mat</el-link
        >
      </p>
    </el-form>
  </div>
</template>

<script>
import * as user from "@/user/api/user";
import { util } from "@/core";

export default {
  data() {
    return {
      loading: false,
      queryParam: {
        accountNumber: "",
        password: "",
      },
      rules: {
        accountNumber: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      rememberLogin: this.$store.state.rememberLogin
    };
  },
  methods: {
    login() {
      this.$refs.validForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          user
            .login(this.queryParam)
            .then((res) => {
              this.loading = false;
              // 登录后全局发布 login 事件, 将在app.vue里接收
              util.emit("login", {
                redirect: this.$router.currentRoute.query.redirect || "/",
                data: res.data,
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.loginPage {
  background: #f4f4f4;
}

.login-form {
  width: 320px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 50px;
}
.main-title {
  text-align: center;
}
.des {
  text-align: center;
  color: #999;
  margin-bottom: 2em;
}

.submit-item {
  margin-top: 30px;
}
.submit-button {
  width: 100%;
}
.footer-info {
  text-align: center;
  font-size: 0.9em;
  color: #999;
}
</style>