<template>
  <div class="scrollbar blockLayout" v-loading="loading">
    <!-- 搜索 -->
    <div class="flex-row align-center">
      <el-form
        inline
        size="small"
        ref="searchForm"
        :model="queryParam"
        class="flex-1"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="queryParam.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$refs.theCURD.search()"
            >搜索</el-button
          >
          <el-button
            @click="
              $refs.searchForm.resetFields();
              $refs.theCURD.search();
            "
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-button size="small" type="primary" @click="$refs.theCURD.create()"
        >添加</el-button
      >
    </div>
    <!-- 增删改查列表 -->
    <BaseCURD
      ref="theCURD"
      :api="apiObj"
      :model="model"
      :columns="columns"
      :queryParam="queryParam"
      getItemFromDetaiApi
      @loading-state="handleLoading"
    >
      <!-- 自定义slot: 状态 -->
      <template v-slot:status="scope">
        <span style="color: #ff4949" v-if="!scope.row.state">已禁用</span>
        <span style="color: #13ce66" v-else>已启用</span>
      </template>

      <!-- 自定义slot: 操作 -->
      <template v-slot:action="scope">
        <el-button
          v-auth="apiObj.update"
          size="mini"
          @click="$refs.theCURD.update(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="apiObj.resetPassword"
          size="mini"
          type="warning"
          @click="resetPassword(scope.row)"
        >
          重置密码
        </el-button>
        <el-button
          v-auth="apiObj.delete"
          size="mini"
          type="danger"
          @click="$refs.theCURD.delete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </BaseCURD>
  </div>
</template>

<script>
//import * as util from '@/core';
import * as api from "@/system/api/account";
import { list as requestRoles } from "@/system/api/role";

export default {
  data() {
    const validatePass = (editForm, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (value && editForm.checkPass) {
          this.$refs.theCURD.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (editForm, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== editForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      apiObj: {
        list: api.list,
        detail: api.detail,
        create: api.add,
        update: api.edit,
        delete: api.remove,
        resetPassword: api.resetPassword,
      },
      loading: false,
      model: {
        accountName: {
          label: "用户名",
          required: true,
        },
        accountNumber: {
          label: "账号",
          required: true,
        },
        password: {
          label: "密码",
          required: true,
          scope: "create",
          validator: validatePass,
        },
        checkPass: {
          label: "确认密码",
          required: true,
          scope: "create",
          validator: validatePass2,
        },
        orgId: {
          type: "number",
          label: "所属组织",
          required: true,
          control: "OrgPicker",
          controlOption: {
            adapter: (value, obj) => {
              //console.log(value, obj);
              if (obj && obj.id) {
                return obj.fullName;
              }
              if (this.$refs.theCURD.editForm.sysOrg) {
                return this.$refs.theCURD.editForm.sysOrg.fullName;
              }
              return value;
            },
          },
          asynValid: true, // 异步校验，组件@change时自动校验表单项
        },
        roleId: {
          type: "number",
          label: "角色",
          required: true,
          control: "DictSelect",
          controlOption: {
            load: this.loadRole,
            labelKey: "name",
          },
        },
        state: {
          type: "number",
          default: 1,
          label: "状态",
          required: true,
          control: "el-switch",
          controlOption: {
            "active-text": "启用",
            "inactive-text": "禁用",
            "active-value": 1,
            "inactive-value": 0,
          },
        },
      },
      columns: [
        {
          label: "账号",
          prop: "accountNumber",
          width: 150,
        },
        {
          label: "用户名",
          prop: "accountName",
          width: 150,
        },
        {
          label: "角色",
          formatter(row) {
            if (row.roleName) {
              return `${row.belongOrgName} - ${row.roleName}`;
            }
            return "无";
          },
        },
        {
          label: "状态",
          width: 80,
          slotName: "status",
        },
        {
          label: "操作",
          width: 260,
          slotName: "action",
        },
      ],
      queryParam: {
        name: "",
      },
    };
  },
  methods: {
    handleLoading($event){
      console.log($event)
      this.loading = $event
    },
    resetPassword: function (data) {
      // 重置密码
      if (!data) {
        return null;
      }
      this.$confirm(`确定重置账号 ${data.accountNumber} 的密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          api
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
        })
        .catch(() => {});
    },
    loadRole() {
      // 用于字典组件的load方法
      return requestRoles().then((res) => {
        return res.data.data;
      });
    },
  },
};
</script>

<style scoped>
</style>