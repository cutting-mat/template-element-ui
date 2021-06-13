<template>
  <div v-loading="loading">
    <h2>增删改查组件</h2>
    <div class="demo">
      <!-- 搜索 -->
      <el-form inline size="small" ref="searchForm" :model="queryParam">
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
      <!-- 增删改查列表 -->
      <BaseCURD
        ref="theCURD"
        :api="apiObj"
        :model="model"
        :columns="columns"
        :queryParam="queryParam"
        :getDetailFromListItem="false"
        @loadingState="loading = $event"
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
  </div>
</template>

<script>
//import * as util from '@/main/assets/util';
import * as api from "@/system/api/account";
import BaseCURD from "@/main/components/BaseCURD";
import { list as requestRoles } from "@/system/api/role";

export default {
  components: {
    BaseCURD,
  },
  data() {
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
          controlOption: {
            // 除 v-model 外的控件属性
          },
          // 校验
          required: true,
          message: null,
        },
        accountNumber: {
          label: "账号",
          required: true,
        },
        password: {
          label: "密码",
          required: true,
          scope: "create",
        },
        orgId: {
          type: 'number',
          label: "所属组织",
          required: true,
        },
        roleId: {
          type: 'number',
          label: "角色",
          required: true,
          control: "DictSelect",
          controlOption: {
            load: this.loadRole,
            labelKey: 'name'
          },
        },
        state: {
          type: 'number',
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
          align: "center",
        },
        {
          label: "用户名",
          prop: "accountName",
          width: 150,
          align: "center",
        },
        {
          label: "角色",
          align: "center",
          formatter(row) {
            if (Array.isArray(row.roles)) {
              return row.roles
                .map((role) => {
                  return `${role.orgName} - ${role.roleName}`;
                })
                .join("、");
            }
            return "无";
          },
        },
        {
          label: "状态",
          width: 80,
          align: "center",
          slot: "status",
        },
        {
          label: "操作",
          width: 300,
          align: "center",
          slot: "action",
        },
      ],
      queryParam: {
        name: "",
      },
    };
  },
  methods: {
    resetPassword: function (data) {
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
      return requestRoles().then((res) => {
        return res.data.data;
      });
    },
  },
  created() {},
};
</script>

<style scoped>
</style>
