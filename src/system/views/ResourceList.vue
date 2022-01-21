<template>
  <div class="flex-row blockLayout" v-loading="loading">
    <div class="resourceWrap flex-1 scrollbar">
      <TheResourcePicker
        :listdata="list"
        @edit="edit"
        @append="append"
        @add-resource="addResource"
        @remove="remove"
      />
    </div>
    <!-- 表单 -->
    <el-form
      class="resourceEditFrom"
      size="small"
      ref="editForm"
      :rules="rules"
      :model="editForm"
      label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="editForm.name" :maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="方法" v-if="editForm.type === 1" prop="method">
        <el-radio-group v-model="editForm.method">
          <el-radio
            v-for="(item, i) in requestMethods"
            :key="'m' + i"
            :label="item.label.toLowerCase()"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="editForm.type === 1" label="URL" prop="url">
        <el-input v-model.trim="editForm.url"></el-input>
      </el-form-item>
      <el-form-item v-else label="路由" prop="route">
        <el-input v-model.trim="editForm.route" :maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="父级">
        <el-cascader
          v-model="editForm.pid"
          :options="list"
          :props="{ checkStrictly: true, label: 'name', value: 'id' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model.trim="editForm.orderNum" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="resetFrom">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { util, store } from "@/core";
import * as resource from "../api/resource";

export default {
  components: {
    TheResourcePicker: (resolve) => require(["@/system/components/TheResourcePicker.vue"], resolve)
  },
  data() {
    const checkMethod = (rule, value, callback) => {
      // method字段校验
      if (this.editForm.type === 1 && !value) {
        return callback(new Error("请填写Method!"));
      } else {
        callback();
      }
    };

    return {
      resource,
      loading: false,
      list: [],
      editForm: {
        pid: null,
        method: "get",
        name: "",
        url: "",
        type: 0, // 0路由 1请求
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        url: [{ required: true, message: "请输入路由/URL", trigger: "blur" }],
        method: [{ validator: checkMethod, trigger: "blur" }],
      },
      requestMethods: [
        {
          label: "GET",
        },
        {
          label: "POST",
        },
        {
          label: "PUT",
        },
        {
          label: "DELETE",
        },
      ],
    };
  },
  methods: {
    edit: function (data) {
      this.editForm = util.deepcopy(data);
    },
    append(item) {
      // 初始化子路由数据
      this.editForm = {
        pid: item.id,
        name: "",
        route: "",
        type: 0,
      };
    },
    addResource(item) {
      // 初始化请求资源数据
      this.editForm = {
        pid: item.id,
        method: "get",
        name: "",
        url: "",
        type: 1,
      };
    },
    save() {
      // 表单验证
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          let formData = util.deepcopy(this.editForm);

          const handleApi = resource;
          //处理级联pid数组为单一pid
          if (Array.isArray(formData.pid)) {
            formData.pid = formData.pid.pop();
          }
          //处理method
          if (formData.method) {
            formData.method = formData.method.toLowerCase();
          }
          this.loading = true;
          let doAction = !formData.id ? handleApi.add : handleApi.edit;
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
    resetFrom: function () {
      this.editForm = {
        pid: "",
        name: "",
        route: "",
      };
      this.$refs.editForm && this.$refs.editForm.resetFields();
    },
    remove(item) {
      if (!item || !item.id) {
        return null;
      }
      const handleApi = resource;
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        handleApi
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
      store
        .action("permission", true)
        .then((userPermissions) => {
          this.loading = false;
          this.list = util.buildTree(
            userPermissions.menus.concat(userPermissions.resources)
          );
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
.resourceEditFrom {
  width: 430px;
}
</style>
