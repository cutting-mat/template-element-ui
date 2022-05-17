<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    label-position="left"
    class="auth_image"
    :v-loading="loading"
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
    return {
      loading: false,
      formData: {},
      rules: {
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.$refs.validCode
        .valid()
        .then((resData) => {
          this.loading = false;
          this.$emit("success", resData);
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
