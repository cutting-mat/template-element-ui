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
        <el-form-item prop="mobile" label="手机号：">
          <input-valid
            v-model="formData.mobile"
            validType="mobile"
            required
            label="手机号"
            @ready="(rule) => (rules.mobile = rule)"
          />
        </el-form-item>
        <el-form-item prop="validCodeUserInput" label="验证码：">
          <el-input v-model="formData.validCodeUserInput">
            <template slot="append">
              <el-button @click="sendValidCode">
                <countdown ref="countdownButton" :count="30">
                  获取验证码
                </countdown>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input v-model.trim="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="company" label="工作单位：">
          <el-input v-model.trim="formData.company"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="设置密码：">
          <input-password
            v-model="formData.password"
            autocomplete="off"
          ></input-password>
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
import { register } from "@/main/api/common";
import { smsRegister, validateMobileValidCode } from "@/main/api/auth";

export default {
  data() {
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
        account: null,
        mobile: null,
        token: null,
        name: null,
        company: null,
        password: null,
        checkPass: null,
        orgId: 3, // 其他
        validCodeUserInput: null, // 验证码
      },
      sendCode: {
        captcha: null,
      },
      validCode: {
        id: null,
      },
      rules: {
        mobile: [],
        validCodeUserInput: [
          { required: true, message: "请输入验证码", trigger: "change" },
        ],
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
    };
  },
  methods: {
    sendValidCode() {
      if (this.loading) {
        return null;
      }
      this.$refs.validForm.validateField("mobile", (err) => {
        if (!err) {
          this.loading = true;
          smsRegister(
            Object.assign(
              {},
              {
                mobile: this.formData.mobile,
              },
              this.sendCode
            )
          )
            .then((res) => {
              this.loading = false;
              // 验证码已经发送
              if (res.status === 200) {
                this.validCode.id = res.data.id;
                this.$refs.countdownButton.start();
              } else if (res.status === 298) {
                // 需要图形验证
                this.$refs.auth.auth().then((authCode) => {
                  this.sendCode.captcha = authCode;
                  this.sendValidCode();
                });
              } else {
                this.$message.warning(
                  `${res.data.message || "验证码发送失败，请稍后重试"}`
                );
              }
            })
            .catch(() => {
              this.loading = false;
            });
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
          // 设置账号字段
          this.formData.account = this.formData.mobile;
          // 校验短信验证码
          const validCodeRes = await validateMobileValidCode(
            Object.assign({}, this.validCode, {
              userInput: this.formData.validCodeUserInput,
            })
          );
          console.log("validCodeRes", validCodeRes);
          if (validCodeRes.status == 200) {
            this.formData.token = validCodeRes.data;
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
            this.$message.error(validCodeRes.data.message);
            console.warn(`校验短信验证码:`, validCodeRes);
          }
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
