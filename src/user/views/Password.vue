<template>
  <div class="scrollbar blockLayout flex-col" v-loading.fullpage="loading">
    <div class="flex-row align-center toolBar">
      <div class="flex-1">
        <!-- title -->
      </div>
    </div>
    <div class="flex-1 scrollbar content-bd">
      <el-form
        style="width: 50%"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        @submit.native.prevent="submitForm"
      >
        <el-form-item label="原密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="password"
            v-model="ruleForm.newPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as user from "@/user/api/user";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      ruleForm: {
        password: "",
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
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    submit: function () {
      this.loading = true;
      let queryParam = Object.assign({}, this.ruleForm);
      delete queryParam.checkPass;
      user
        .editPassword(queryParam)
        .then(() => {
          this.loading = false;
          this.resetForm();
          this.$message({
            message: "操作成功",
            type: "success",
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
  created: function () {},
};
</script>

<style scoped>
.content-bd {
  padding: 20px;
}
</style>
