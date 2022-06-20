<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    label-position="left"
    class="auth_mobile"
    @submit.native.prevent="handleSubmit"
  >
    <el-form-item v-if="anonymousMobile"
      >绑定手机：{{ anonymousMobile }}</el-form-item
    >
    <el-form-item prop="inputMobile">
      <el-input
        v-model="formData.inputMobile"
        placeholder="请输入绑定手机"
        prefix-icon="el-icon-message"
      ></el-input>
    </el-form-item>
    <el-form-item prop="userInput">
      <InputSMS
        ref="InputSMS"
        :type="command"
        :mobile="formData.inputMobile"
        @click="sendValidCode"
      />
    </el-form-item>
    <el-form-item>
      <el-button native-type="submit" type="primary" style="width: 100%">
        立即验证
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    command: {
      type: String,
      required: false,
    },
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入绑定手机"));
      } else {
        if (this.userMobile) {
          // 已登录/有手机号用户，校验手机号是否匹配
          if (this.userMobile !== value) {
            return callback(new Error("手机号不正确"));
          }
        }

        callback();
      }
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

    return {
      formData: {
        id: null,
        inputMobile: null,
      },
      rules: {
        inputMobile: [{ validator: validateMobile, trigger: [] }],
        userInput: [{ validator: validCode, trigger: [] }],
      },
      resData: null,
    };
  },
  computed: {
    userMobile() {
      return String(this.$store.user.mobile || "");
    },
    anonymousMobile() {
      if (this.userMobile) {
        const mobileArray = this.userMobile.split("");
        const mobileString = mobileArray
          .map((s, i) => {
            if (i < 3 || mobileArray.length - i < 3) {
              return s;
            }
            return "*";
          })
          .join("");
        return `${mobileString}`;
      }
      return "";
    },
  },
  methods: {
    sendValidCode() {
      this.$refs.form.validateField("inputMobile", (err) => {
        if (!err) {
          this.$refs.InputSMS.send();
        }
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("success", this.resData);
        }
      });
    },
  },
};
</script>

<style scoped></style>
