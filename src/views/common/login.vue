<template>
  <div class="mainCont flex-row align-center justify-center">
      <el-form ref="validForm" :model="queryParam" :rules="rules" class="login-form" @keyup.enter="login">
        <el-form-item prop="username">
          <el-input
            :autofocus="true"
            placeholder="输入用户名"
            v-model="queryParam.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="输入密码"
            type="password"
            v-model="queryParam.password">
          </el-input>
        </el-form-item>
        <el-form-item class="submit-item">
          <el-button class="submit-button" @click="login" type="primary" :loading="loading">登录</el-button>
        </el-form-item>
        
      </el-form>
  </div>
</template>

<script>
import * as util from "@/assets/util.js";
import * as account from "@/api/account";

export default {
  data() {
    return {
      loading: false,
      queryParam: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.validForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          account.login(this.queryParam).then(res => {
              this.loading = false;
              util.storage("user", res.data.data);
              this.$emit("login", this.$router.currentRoute.query.from);
            })
        } else {
          return false;
        }
      });
      
    }
  }
};
</script>

<style scoped>

.login-form {
  width: 419px;
}

.login-form .submit-item{
  margin-top: 30px;
  padding-left:0;
}
</style>
