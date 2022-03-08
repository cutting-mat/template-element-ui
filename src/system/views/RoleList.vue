<template>
  <div class="scrollbar blockLayout" v-loading="loading">
    <div class="flex-row toolBar">
      <div class="flex-1">
        <!-- title -->
      </div>
      <el-button
        v-auth="role.add"
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
        prop="name"
        label="角色名称"
        align="center"
      ></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            v-auth="role.edit"
            size="mini"
            type="info"
            @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-auth="role.remove"
            size="mini"
            type="danger"
            @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      class="comDialog"
      title="权限信息"
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="editForm.name" :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="editForm.remark" type="textarea" :maxlength="1000"></el-input>
        </el-form-item>

        <el-form-item label="权限">
          <TheResourcePicker
            picker
            :checked="editForm.resources"
            @check="editForm.resources = $event.map((e) => e.id)"
          />
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
import { util } from "@/core";
import * as role from "../api/role";

export default {
  components: {
    TheResourcePicker: (resolve) => require(["@/system/components/TheResourcePicker.vue"], resolve)
  },
  data() {
    return {
      role,
      dialogVisible: false,
      loading: false,
      list: [],
      editForm: {
        name: "",
        remark: "",
        resources: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        remark: [
          {
            min: 0,
            max: 255,
            message: "长度 0 到 255 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    edit(data) {
      this.editForm = util.deepcopy(data);
      this.$set(this.editForm, "resources", data.resources);
      this.dialogVisible = true;
    },
    save() {
      
      // 表单验证
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formData = util.deepcopy(this.editForm);
          this.handleCloseDialog();
          let doAction = !formData.id ? role.add : role.edit;
          // 分类型提交
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
        name: "",
        remark: "",
        resources: [],
      };
      this.$refs.editForm && this.$refs.editForm.resetFields();
    },
    remove(item) {
      if (!item || !item.id) {
        return null;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        role
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
    fetchData: function () {
      this.loading = true;
      role
        .list()
        .then((res) => {
          this.loading = false;
          this.list = res.data;
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
</style>
