<template>
  <div class="scrollbar blockLayout" v-loading.fullpage="loading">
    <div class="flex-row align-center toolBar">
      <div class="flex-1">
        <!-- title -->
      </div>
      <el-button
        v-auth="account.add"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >添加</el-button
      >
    </div>
    <!-- list -->
    <el-table :data="list" style="width: 100%">
      <el-table-column
        prop="accountNumber"
        label="账号"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="accountName"
        label="用户名"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <div v-for="(role, index) in scope.row.roles" :key="index">
            {{ `${role.orgName} - ${role.roleName}` }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <template v-if="!scope.row.state">
            <span style="color: #ff4949">已禁用</span>
          </template>
          <template v-else>
            <span style="color: #13ce66">已启用</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button v-auth="account.edit" size="mini" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-auth="account.resetPassword"
            size="mini"
            type="warning"
            @click="resetPassword(scope.row)"
            >重置密码</el-button
          >
          <el-button
            v-auth="account.remove"
            size="mini"
            type="danger"
            @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- page -->
    <BasePagination
      :page-size="queryParam.pageSize"
      :current-page="queryParam.p"
      :total-count="totalCount"
      :total-page="totalPage"
      @current-change="handleCurrentChange"
    />
    <!-- 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      title="账号信息"
      :visible="dialogVisible"
      width="800px"
      @close="handleCloseDialog"
    >
      <el-form
        size="small"
        ref="editForm"
        :rules="rules"
        :model="editForm"
        label-width="80px"
      >
        <el-form-item label="账号" prop="accountNumber">
          <el-input v-model.trim="editForm.accountNumber" :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="accountName">
          <el-input v-model.trim="editForm.accountName" :maxlength="100"></el-input>
        </el-form-item>
        <template v-if="!editForm.id">
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="editForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="editForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item label="角色">
          <el-checkbox-group v-model="editForm.roles">
            <el-checkbox
              v-for="role in rolesList"
              :key="'role' + role.id"
              :label="role.id"
              >{{ role.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="editForm.state"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/main/assets/util";
import * as account from "../api/account";
import { list as requestRoles } from "../api/role";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (this.editForm.checkPass !== "") {
          this.$refs.editForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      account,
      dialogVisible: false,
      loading: false,
      list: [],
      editForm: {
        id: "",
        accountNumber: "",
        accountName: "",
        password: "",
        roles: [],
        state: 1,
      },
      queryParam: {
        pageSize: 10,
        p: 1,
      },
      totalCount: 0,
      totalPage: 0,
      rules: {
        accountNumber: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        accountName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      rolesList: [],
    };
  },
  methods: {
    handleCurrentChange: function (currentPage) {
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    resetPassword: function (data) {
      if (!data) {
        return null;
      }
      this.$confirm(`确定重置账号 ${data.accountNumber} 的密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        account
          .resetPassword({
            id: data.id,
          })
          .then(() => {
            this.fetchData();
            this.$alert(`密码已重置！`, {
              confirmButtonText: "我知道了",
            });
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
    edit: function (data) {
      const editObj = Object.assign({}, data);
      // 角色数据格式转换
      editObj.roles = Array.isArray(editObj.roles) ? editObj.roles.map((e) => e.roleId) : [];
      this.editForm = editObj;
      this.dialogVisible = true;
    },
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formData = util.deepcopy(this.editForm);
          this.handleCloseDialog();
          let doAction = !formData.id ? account.add : account.edit;
          doAction(formData)
            .then(() => {
              this.fetchData();
              this.$message({
                message: "添加成功",
                type: "success",
              });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    handleCloseDialog: function () {
      this.dialogVisible = false;
      this.editForm = {
        id: "",
        accountNumber: "",
        accountName: "",
        password: "",
        roles: [],
        state: 1,
      };
      this.$refs.editForm && this.$refs.editForm.resetFields();
    },
    remove(item) {
      if (!item) {
        return null;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        account
          .remove({
            id: item.id,
          })
          .then(() => {
            this.fetchData();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
    fetchData: function (reload) {
      if (reload) {
        this.queryParam.p = 1;
      }
      this.loading = true;
      account
        .list(this.queryParam)
        .then((res) => {
          this.loading = false;
          const data = res.data.data;
          if (data) {
            this.list = data.list;
            this.totalCount = data.totalCount;
            this.totalPage = data.totalPage;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchRoles: function () {
      requestRoles().then((res) => {
        this.rolesList = res.data.data;
      });
    },
  },
  created: function () {
    this.fetchData();
    this.fetchRoles();
  },
};
</script>

<style scoped>
</style>
