<template>
  <div v-loading.fullscreen="loading">
    <ToolBar></ToolBar>
    <el-form
      class="wrap"
      :model="formData"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      @submit.native.prevent="submitForm"
    >
      <el-alert
        v-if="!formData.captcha"
        title="未验证用户身份，请返回重试！"
        type="error"
        show-icon
        :closable="false"
        style="margin-bottom:20px"
      ></el-alert>
      <el-form-item label="新密码" prop="newPassword">
        <input-password v-model="formData.newPassword" autocomplete="off"></input-password>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="formData.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as user from "../api/personal";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formData.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      formData: {
        captcha: "",
        checkPass: "",
        newPassword: "",
      },
      rules: {
        newPassword: [
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
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          let queryParam = Object.assign({}, this.formData);
          delete queryParam.checkPass;
          user
            .editPassword(queryParam)
            .then(() => {
              this.loading = false;
              this.$message({
                message: "操作成功",
                type: "success",
                onClose: () => {
                  this.$router.go(-1)
                }
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    
  },
  created: function () {
    if (this.$route.query.authCode) {
      this.formData.captcha = this.$route.query.authCode
    }
  },
};
</script>

<style scoped>
</style>
