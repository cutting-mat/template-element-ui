<template>
  <el-input v-model="formData.userInput" placeholder="请输入验证码">
    <template slot="append">
      <el-button :disabled="buttonDisabled" @click="$emit('click')">
        <CountDown
          ref="countdownButton"
          :count="30"
          @start="buttonDisabled = true"
          @end="buttonDisabled = false"
        >
          获取验证码
        </CountDown>
      </el-button>
    </template>
  </el-input>
</template>

<script>
import {
  sendMobileValidCode,
  sendMobileValidCodeRegister,
  sendMobileValidCodeLogin,
  sendMobileValidCodeResetPassword,
  validateMobileValidCode,
} from "@/core/plugins/auth/api/auth";

const requestFunction = {
  common: sendMobileValidCode,
  register: sendMobileValidCodeRegister,
  login: sendMobileValidCodeLogin,
  reset: sendMobileValidCodeResetPassword,
};

export default {
  props: {
    type: {
      type: String,
      default: "common", // 短信类型："common" | "register" | "login" | "reset"
    },
    mobile: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      formData: {
        id: null,
        userInput: null,
      },
      buttonDisabled: false,
    };
  },
  methods: {
    send() {
      if (this.mobile) {
        this.loading = true;
        const requestMethod =
          requestFunction[this.type] || requestFunction.common;

        requestMethod({
          mobile: this.mobile,
        })
          .then((res) => {
            this.loading = false;
            // 验证码已经发送
            if (res.status === 200) {
              this.formData.id = res.data.id;
              this.$refs.countdownButton.start();
            } else {
              this.$message.warning(`验证码发送失败，请稍后重试`);
            }
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        console.warn(`inputSMS: 缺少mobile参数`, this.mobile);
      }
    },
    valid() {
      return new Promise((resolve, reject) => {
        if (this.loading) {
          return reject("loading");
        }

        if (!this.formData.id) {
          return reject("请先发送验证码");
        }

        if (this.formData.userInput) {
          this.loading = true;
          validateMobileValidCode(this.formData)
            .then((res) => {
              this.loading = false;
              if (res.status === 200) {
                resolve(res.data);
              } else {
                reject(`验证失败，请重试`);
              }
            })
            .catch(() => {
              this.loading = false;
              reject(`验证失败，请重试`);
            });
        } else {
          reject(`请填写验证码`);
        }
      });
    },
  },
};
</script>

<style scoped></style>
