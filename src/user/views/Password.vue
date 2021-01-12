<template>
    <div class="flex-col" v-loading="loading">
      <div class="page-common-cell-box">
        <div class="flex-row align-center page-common-cell-hd">
          <h4 class="title flex-1">
            <i class="title-ico"></i>
            {{$route.name}}
          </h4>
          <el-button type="primary" size="small" @click="handleCreate()">新建</el-button>
        </div>
      </div>
      <el-form class="page-common-cell-box page-common-cell-bd flex-1 flex-col"
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
          <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import * as user from "@/user/api/user";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      // 密码校验
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
      // 再次输入密码校验
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
      // 表单验证
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 预处理提交参数
          let queryParam = Object.assign({}, this.ruleForm);
          delete queryParam.checkPass;
          // 表单提交
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
        }
      });
    },
    resetForm() {
      // 表单重置
      this.$refs.ruleForm.resetFields();
    },
  },
  created: function () {},
};
</script>

<style scoped>
.page-common-box {
  padding-bottom: 20px;
}
.page-common-box .page-box {
  text-align: right !important;
}

.side-col{
  background: #dedede;
  color: #fff;
  width: 260px;
  margin-right: 20px;
}
</style>
