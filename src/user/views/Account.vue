<template>
  <div v-loading="loading">
    <ToolBar>
      <el-button
        v-auth="account.add"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="dialogVisible = true"
        >添加</el-button
      >
    </ToolBar>
    <!-- search -->
    <el-form ref="searchForm" inline :model="queryParam" size="small">
      <el-form-item label="账号">
        <el-input v-model="queryParam.account"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="queryParam.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData(true)"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="resetSearch()"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <!-- list -->
    <p>
      <i class="el-icon-info"></i> 共
      <el-button type="text">{{ totalCount }}</el-button> 条记录
    </p>
    <el-table :data="list">
      <el-table-column
        prop="account"
        label="账号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.disabled">
            <span style="color: #ff4949">已禁用</span>
          </template>
          <template v-else>
            <span style="color: #13ce66">已启用</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button v-auth="account.edit" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-auth="account.resetPassword"
            size="small"
            type="warning"
            plain
            @click="resetPassword(scope.row)"
            >重置密码</el-button
          >
          <el-button
            v-auth="account.remove"
            size="small"
            type="danger"
            plain
            @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- page -->
    <Pagination
      :page-size="queryParam.pageSize"
      :current-page="queryParam.p"
      :total-count="totalCount"
      :total-page="totalPage"
      @current-change="
        queryParam.p = $event;
        fetchData();
      "
      @size-change="
        queryParam.pageSize = $event;
        fetchData(true);
      "
    />
    <!-- 弹窗 -->
    <el-dialog
      class="userEditDialog"
      :close-on-click-modal="false"
      title="账号信息"
      :visible="dialogVisible"
      width="600px"
      @close="handleCloseDialog"
    >
      <el-form
        size="small"
        ref="editForm"
        :rules="rules"
        :model="editForm"
        label-width="80px"
      >
        <el-form-item label="头像" prop="avatar">
          <uploader
            class="upload_avatar"
            accept="t-image"
            :value="editForm.avatar ? [{ url: editForm.avatar }] : []"
            imgCrop
            :show-file-list="false"
            :on-success="
              (res) => {
                $set(editForm, 'avatar', res.url);
              }
            "
          >
            <img
              v-if="editForm.avatar"
              class="upload_avatar_img"
              :src="editForm.avatar"
              alt
            />
            <span v-else>上传头像</span>
          </uploader>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model.trim="editForm.account" :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model.trim="editForm.name" :maxlength="100"></el-input>
        </el-form-item>
        <template v-if="!editForm.id">
          <el-form-item label="密码" prop="password">
            <input-password
              v-model="editForm.password"
              autocomplete="off"
            ></input-password>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="editForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item label="所属组织" prop="orgId">
          <OrgPicker
            v-model="editForm.orgId"
            :adapter="orgAdapter"
            @change="
              (id, item) => {
                editForm.org = item;
                $refs.editForm.validateField('orgId');
              }
            "
          ></OrgPicker>
        </el-form-item>
        <el-form-item label="角色">
          <DictSelect
            v-model="editForm.roleId"
            :request="requestRoles"
            labelKey="name"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="editForm.disabled"
            active-text="启用"
            inactive-text="禁用"
            :active-value="false"
            :inactive-value="true"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deepcopy } from "@/core";
import * as account from "../api/account";
import { list as requestRoles } from "../api/role";

export default {
  components: {
    OrgPicker: () => import("../components/OrgPicker.vue"),
  },
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
        account: "",
        name: "",
        password: "",
        roles: [],
        disabled: false,
      },
      queryParam: {
        pageSize: 20,
        p: 1,
        account: "",
        name: "",
      },
      totalCount: 0,
      totalPage: 0,
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        orgId: [{ required: true, message: "请选择所属组织" }],
      },
      requestRoles,
    };
  },
  methods: {
    resetSearch() {
      this.queryParam = {
        pageSize: 20,
        p: 1,
        account: "",
        name: "",
      };

      this.fetchData(true);
    },
    orgAdapter(value) {
      return this.editForm.org?.name || value;
    },
    resetPassword: function (data) {
      if (!data) {
        return null;
      }
      this.$confirm(`确定重置账号 ${data.account} 的密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        account
          .resetPassword({
            id: data.id,
          })
          .then((res) => {
            if (res.data.password) {
              this.$clipboard(res.data.password)
                .then(() => {
                  this.$alert(
                    `新密码已复制到剪贴板，请保管好新密码：<code>${res.data.password}</code>`,
                    {
                      confirmButtonText: "我知道了",
                      dangerouslyUseHTMLString: true,
                    }
                  ).then(() => {
                    this.fetchData();
                  });
                })
                .catch(() => {
                  this.$alert(
                    `密码已重置，请牢记新密码：<code>${res.data.password}</code>`,
                    {
                      confirmButtonText: "我知道了",
                      dangerouslyUseHTMLString: true,
                    }
                  ).then(() => {
                    this.fetchData();
                  });
                });
            } else {
              this.$message.warning("操作失败，请重试");
            }
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
    edit: function (data) {
      const editObj = Object.assign({}, data);
      // 角色数据格式转换
      editObj.roles = Array.isArray(editObj.roles)
        ? editObj.roles.map((e) => e.roleId)
        : [];
      this.editForm = editObj;
      this.dialogVisible = true;
    },
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formData = deepcopy(this.editForm);
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
        account: "",
        name: "",
        password: "",
        roles: [],
        disabled: false,
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
          const data = res.data;
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
  },
  created: function () {
    this.fetchData();
  },
};
</script>

<style scoped>
.upload_avatar {
  display: block;
  width: 120px;
  height: 120px;
  line-height: 120px;
  background: #dedede;
  text-align: center;
}
.upload_avatar_img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
</style>
