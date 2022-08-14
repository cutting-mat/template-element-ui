<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    label-position="left"
    class="auth_image"
    @submit.native.prevent="handleSubmit"
  >
    <el-form-item prop="captcha">
      <InputCaptchaImage ref="validCode" />
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
  data() {
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
      formData: {},
      rules: {
        captcha: [{ validator: validCode, trigger: [] }],
      },
      resData: null,
    };
  },
  methods: {
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
