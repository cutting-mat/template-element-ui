<template>
  <div v-loading="loading">
    <h2>增删改查组件</h2>
    <div class="demo">
      <!-- seasrch param -->
      <el-form inline size="small" ref="searchForm" :model="queryParam">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="queryParam.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$refs.theCURD.retrieve()">搜索</el-button>
          <el-button @click="$refs.searchForm.resetFields();$refs.theCURD.retrieve()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- curd list -->
      <BaseCURD ref="theCURD"
        :api="account"
        :model="model"
        :columns="columns"
        :queryParam="queryParam"
        @loadingState="loading = $event"
        @resetPassword="handleResetPassword"
      />
    </div>
  </div>
</template>

<script>
//import * as util from '@/main/assets/util';
import { list, detail, add, remove, edit } from "@/system/api/account";
import BaseCURD from "@/main/components/BaseCURD";

export default {
  components: {
    BaseCURD,
  },
  data() {
    return {
      account: { list, detail, add, remove, edit },
      loading: false,
      model: {
        accountName: "",
        accountNumber: "",
        avatar: null,
        belongOrgFullName: "",
        belongOrgName: "",
        contact: "",
        contactNumber: null,
        id: 0,
        orgCode: "",
        orgId: 0,
        roleId: 0,
        roleName: "",
        roles: null,
        state: 1,
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
            if(Array.isArray(row.roles)){
              return row.roles
              .map((role) => {
                return `${role.orgName} - ${role.roleName}`;
              })
              .join("、");
            }
            return '无'            
          },
        },
        {
          label: "状态",
          width: 80,
          align: "center",
          formatter(row) {
            return row.state ? "已启用" : "已禁用";
          },
        },
        {
          label: "操作",
          width: 300,
          align: "center",
          actions: [
            {
              label: "编辑",
              event: "edit",
              size: "mini",
            },
            {
              label: "重置密码",
              event: "resetPassword",
              type: "warning",
              size: "mini",
            },
            {
              label: "删除",
              event: "remove",
              type: "danger",
              size: "mini",
            },
          ],
        },
      ],
      queryParam: {
        name: ''
      },
    };
  },
  methods: {
    handleResetPassword(item, index) {
      console.log('handleResetPassword', item, index)
      this.$refs.theCURD.add()
    }
  },
  created() {},
};
</script>

<style scoped>
</style>
