<template>
  <div class="mainCont flex-row align-center justify-center">
    <el-form
      ref="validForm"
      :model="queryParam"
      :rules="rules"
      class="login-form"
      @keyup.enter="login"
    >
      <h1 class="main-title">Vue-Scaffold</h1>
      <p class="des">基于 Vue / Element-UI / Axios / Vue-Router 的大中型项目脚手架</p>
      <el-form-item prop="username">
        <el-input :autofocus="true" placeholder="输入用户名" v-model="queryParam.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="输入密码" type="password" v-model="queryParam.password"></el-input>
      </el-form-item>
      <el-form-item class="submit-item">
        <el-button
          native-type="submit"
          class="submit-button"
          @click="login"
          type="primary"
          :loading="loading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as user from "../api/user";

export default {
  data() {
    return {
      loading: false,
      queryParam: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.validForm.validate(valid => {
        if (valid) {
          this.loading = true;
          user
            .login(this.queryParam)
            .then(res => {
              this.loading = false;
             
              this.$emit("login", {
                from: this.$router.currentRoute.query.from,
                data: res.data.data
              });
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.main-title {
  text-align: center;
}
.des {
  text-align: center;
  color: #999;
  margin-bottom: 2em;
}

.login-form {
  width: 419px;
}
.submit-item {
  margin-top: 30px;
}
.submit-button{
   width: 100%;
}
</style>