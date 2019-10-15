<template>
  <div class="scrollbar blockLayout" v-loading="loading">
    <div class="flex-row align-center toolBar">
      <div class="flex-1">
        <!-- title -->
      </div>
      <el-button
        v-has="account.add"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="dialogVisible=true"
      >添加</el-button>
    </div>
    <!-- list -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="username" label="账号" width="150" align="center"></el-table-column>
      <el-table-column prop="realname" label="用户名" width="150" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.status!=1">
            <span style="color:#ff4949">已禁用</span>
          </template>
          <template v-else>
            <span style="color:#13ce66">已启用</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button v-has="account.edit" size="mini" type="info" @click="edit(scope.row)">编辑</el-button>
          <el-button
            v-has="account.resetPassword"
            size="mini"
            type="warning"
            @click="resetPassword(scope.row)"
          >重置密码</el-button>
          <el-button v-has="account.remove" size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- page -->
    <global-pagination
      v-if="list.length"
      :page-size="queryParam.pageSize"
      :current-page="queryParam.p"
      :total-count="totalCount"
      :total-page="totalPage"
      @current-change="handleCurrentChange"
    ></global-pagination>

    <!-- 弹窗 -->
    <el-dialog
      title="账号信息"
      :visible="dialogVisible"
      width="800px"
      :show-close="false"
      :close-on-click-modal="false"
      @close="resetForm"
    >
      <el-form size="small" ref="editForm" :rules="rules" :model="editForm" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="realname">
          <el-input v-model="editForm.realname"></el-input>
        </el-form-item>
        <template v-if="!editForm.id">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="editForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="editForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="角色">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group
            style="margin: 15px 0;"
            v-model="editForm.roleIds"
            @change="handleCheckedChange"
          >
            <el-row :gutter="20">
              <el-col :span="10" v-for="role in rolesList" :key="'role'+ role.id">
                <el-checkbox :label="role.id">{{role.name}}</el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="editForm.status"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save();dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/common/assets/util";
import * as account from "../api/account";
import { list as requestRoles } from "../api/role";

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
      } else if (value !== this.ruleForm.password) {
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
        id: '',
        username: '',
        realname: '',
        password: '',
        roleIds: [],
        status: 1
      },
      queryParam: {
        pageSize: 10,
        p: 1
      },
      totalCount: 0,
      totalPage: 0,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        realname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      isIndeterminate: true,
      checkAll: true,
      rolesList: []
    };
  },
  methods: {
    handleCheckAllChange(checked) {
      this.$set(
        this.editForm,
        "roleIds",
        checked ? this.rolesList.map(x => x.id) : []
      );
      this.isIndeterminate = false;
    },
    handleCheckedChange() {
      let checkedCount = this.editForm.roleIds.length;
      this.checkAll = checkedCount === this.rolesList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.rolesList.length;
    },
    handleCurrentChange: function(currentPage) {
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    resetPassword: function(data) {
      if (!data) {
        return null;
      }
      this.$confirm(`确定重置账号 ${data.username} 的密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        account.resetPassword(data).then(() => {
          this.fetchData();
          this.$alert(`密码已重置！`, {
            confirmButtonText: "我知道了"
          });
        });
      });
    },
    edit: function(data) {
      this.editForm = Object.assign({}, data);
      this.dialogVisible = true;
    },
    save() {
      let vm = this;
      vm.$refs["editForm"].validate(valid => {
        if (valid) {
          let formData = util.deepcopy(vm.editForm);

          if (!formData.id) {
            account.add(formData).then(() => {
              vm.fetchData();
              vm.$message({
                message: "添加成功",
                type: "success"
              });
            });
          } else {
            account.edit(formData).then(() => {
              vm.fetchData();
              vm.$message({
                message: "编辑成功",
                type: "success"
              });
            });
          }
        }
      });
    },
    resetForm: function() {
      this.editForm = {
        id: '',
        username: '',
        realname: '',
        password: '',
        roleIds: [],
        status: 1
      };
    },
    remove(item) {
      if (!item || !item.id) {
        return null;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        account.remove({
          id: item.id
        }).then(() => {
          this.fetchData();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        });
      });
    },
    fetchData: function(reload) {
      if (reload) {
        this.queryParam.p = 1;
      }
      this.loading = true;
      account.list(this.queryParam).then(res => {
        this.loading = false;
        const data = res.data.data;
        if(data){
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalPage = data.totalPage;
        }
        
      });
    },
    fetchRoles: function() {
      requestRoles().then(res => {
        this.rolesList = res.data.data;
      });
    }
  },
  created: function() {
    this.fetchData();
    this.fetchRoles();
  }
};
</script>

<style scoped>
</style>
