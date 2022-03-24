<template>
  <div class="flex-row align-center justify-center loginPage">
    <div>
      <h1 class="main-title">平台名称文字占位符后台管理系统</h1>

      <el-form
        ref="validForm"
        :model="formData"
        :rules="rules"
        class="login-form"
        @submit.native.prevent="login"
      >
        <h2 class="sub-title">
          <span class="_text">请登录</span>
        </h2>
        <el-form-item prop="account">
          <el-input :autofocus="true" placeholder="输入用户名" v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="输入密码" type="password" v-model="formData.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <inputCapthaImage ref="validCode" />
        </el-form-item>
        <div>
          <el-checkbox
            :value="$store.state.rememberLogin"
            @change="$store.set('rememberLogin', $event)"
          >记住我</el-checkbox>
        </div>
        <el-form-item class="submit-item">
          <el-button native-type="submit" class="submit-button" type="primary" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer-info">
        @2022 版权所有 占位文字
        <span class="_s">|</span>
        Github：
        <el-link type="primary" href="https://github.com/cutting-mat" target="_blank">cutting-mat</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from "@/core";
import { login } from "@/main/api/common";

export default {
  components: {
    inputCapthaImage: (resolve) => require(['../components/InputCaptchaImage.vue'], resolve)
  },
  data() {
    const validImage = () => {
      return new Promise((resolve) => {
        if (this.formData.captcha) {
          resolve()
        } else {
          return this.$refs.validCode.valid().then(captcha => this.formData.captcha = captcha)
        }
      })
    };

    return {
      loading: false,
      formData: {
        account: "",
        password: "",
        captcha: ""
      },
      rules: {
        account: [
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
        captcha: [
          { validator: validImage, trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    login() {
      if(this.loading){
        return null;
      }
      this.loading = true;
      this.$refs.validForm.validate((valid) => {
        if (valid) {
          login(this.formData)
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
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.loginPage {
  background: url(../assets/img/b.jpg) center no-repeat;
  background-size: cover;
}

.login-form {
  width: 320px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 40px;
  margin: auto;
}
.main-title {
  font-size: 28px;
  color: #257ff7;
  margin-bottom: 40px;
  text-align: center;
}
.sub-title {
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  color: #257ff7;
  margin-bottom: 20px;
}
.sub-title ._text {
  display: inline-block;
  line-height: 1.4;
  border-bottom: 3px solid #257ff7;
}
.des {
  text-align: center;
  color: #999;
  margin-bottom: 2em;
}

.submit-item {
  margin-top: 20px;
}
.submit-button {
  width: 100%;
}
.footer-info {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  font-size: 0.9em;
  color: #999;
}
.footer-info ._s {
  display: inline-block;
  margin: 0 0.5em;
}
</style>