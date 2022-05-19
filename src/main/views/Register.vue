<template>
  <div class="flex-row align-center justify-center registerPage">
    <div class="register-box">
      <div class="title">注册账号</div>
      <el-form
        ref="validForm"
        :model="formData"
        :rules="rules"
        label-width="100px"
        hide-required-asterisk
        @submit.native.prevent="register"
        size="medium"
      >
        <el-form-item prop="mobile" required label="手机号：">
          <el-input v-model="formData.mobile" />
        </el-form-item>
        <el-form-item prop="userInput" label="验证码：">
          <InputSMS
            ref="InputSMS"
            type="register"
            :mobile="formData.mobile"
            @click="sendValidCode"
          />
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model.trim="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="company" label="工作单位：">
          <el-input v-model.trim="formData.company"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="设置密码：">
          <InputPassword
            v-model="formData.password"
            autocomplete="off"
          ></InputPassword>
        </el-form-item>
        <el-form-item prop="checkPass" label="重复密码：">
          <el-input
            type="password"
            v-model="formData.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="submit-item">
          <el-button
            native-type="submit"
            class="submit-button"
            type="primary"
            :loading="loading"
            >确 认</el-button
          >
        </el-form-item>
      </el-form>
      <div class="flex-row">
        <div class="flex-1"></div>
        已有账号？<el-link
          type="danger"
          class="first"
          @click="$router.push({ name: '登录' })"
        >
          点击登录
        </el-link>
      </div>
    </div>
    <!-- 验证身份 -->
    <auth ref="auth" :types="['captcha']" />
  </div>
</template>

<script>
import { validator } from "@/core";
import { register } from "@/main/api/common";

export default {
  data() {
    const validMobile = () => {
      return validator({
        required: true,
        validType: "mobile",
        value: () => {
          return this.formData?.mobile;
        },
      });
    };

    const validCode = () => {
      return new Promise((resolve, reject) => {
        this.$refs.InputSMS.valid()
          .then((captcha) => {
            this.resData = captcha;
            resolve();
          })
          .catch((msg) => {
            reject(msg);
          });
      });
    };

    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formData.checkPass !== "") {
          this.$refs.validForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      formData: {
        mobile: null,
        token: null,
        name: null,
        company: null,
        password: null,
        checkPass: null,
        userInput: null, // 验证码
      },
      rules: {
        mobile: [
          {
            validator: validMobile,
            trigger: [],
          },
        ],
        userInput: [{ validator: validCode, trigger: [] }],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        company: [
          { required: true, message: "请输入工作单位", trigger: "change" },
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      resData: null,
    };
  },
  methods: {
    sendValidCode() {
      this.$refs.validForm.validateField("mobile", (err) => {
        if (!err) {
          this.$refs.InputSMS.send();
        }
      });
    },
    register() {
      if (this.loading) {
        return null;
      }
      this.loading = true;
      this.$refs.validForm.validate(async (valid) => {
        if (valid) {
          this.formData.token = this.resData;
          // 注册
          register(this.formData)
            .then((res) => {
              this.loading = false;
              if (res.status === 200) {
                this.$alert("注册成功,请登录", "注册成功", {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.$router.replace({ name: "登录" });
                  },
                });
              } else {
                this.$message.error(res.data.message);
              }
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
  created() {},
};
</script>

<style scoped>
.registerPage {
  background: url(../assets/img/b.jpg) center no-repeat;
  background-size: cover;
}
.register-box {
  width: 600px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px #a3a3a3;
  border-radius: 6px;
  padding: 50px 100px;
  box-sizing: border-box;
}
.title {
  font-size: 24px;
  font-weight: 600;
  color: #94070a;
  line-height: 24px;
  letter-spacing: 1px;
  margin-bottom: 20px;
  text-align: center;
}

.submit-button {
  width: 100%;
  font-size: 18px;
}
</style>
