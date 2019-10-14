<template>
  <div class="scrollbar blockLayout" v-loading="loading">
    <div class="flex-row align-center toolBar">
      <div class="flex-1">
        <!-- page title -->
      </div>
      <el-button
        v-has="resource.add"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="createRoot"
      >添加</el-button>
    </div>

    <div class="resourceWrap">
      <resourcePicker
        :listdata="list"
        @edit="edit"
        @append="append"
        @addResource="addResource"
        @remove="remove"
      />
    </div>

    <!-- 弹窗 -->
    <el-dialog
      :title="editForm.type==1 ? '路由信息' : '资源信息'"
      :visible="dialogVisible"
      width="800px"
      :show-close="false"
      :close-on-click-modal="false"
      @closed="resetForm"
    >
      <el-form size="small" ref="editForm" :rules="rules" :model="editForm" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.trim="editForm.orderNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="方法" v-if="!!editForm.method" prop="method">
          <el-select v-model="editForm.method" placeholder="请选择">
            <el-option
              v-for="(item, i) in requestMethods"
              :key="'m'+i"
              :label="item.label"
              :value="item.label.toLowerCase()"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!!editForm.method" label="URL" prop="url">
          <el-input v-model.trim="editForm.url"></el-input>
        </el-form-item>
        <el-form-item v-else label="路由" prop="route">
          <el-input v-model.trim="editForm.route"></el-input>
        </el-form-item>
        <el-form-item label="父级">
          <el-cascader
            v-model="editForm.pid"
            :options="list"
            :props="{ checkStrictly: true, label: 'name', value: 'id' }"
          ></el-cascader>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/common/assets/util";
import * as resource from '../api/resource';
import * as menu from '../api/menu';
import * as user from "@/common/api/user";
import {store} from '@/store';

export default {
  components: {
    resourcePicker: resolve =>
      require(["../components/resourcePicker.vue"], resolve)
  },
  data() {
    const checkMethod = (rule, value, callback) => {
      if (this.editForm.type === 2 && !value) {
        return callback(new Error("请填写Method!"));
      } else {
        callback();
      }
    };

    return {
      resource,
      dialogVisible: false,
      loading: false,
      list: [],
      editForm: {
        pid: null,
        method: "get",
        name: '',
        url: ''
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入路由/URL", trigger: "blur" }],
        method: [{ validator: checkMethod, trigger: "blur" }]
      },
      requestMethods: [
        {
          label: "GET"
        },
        {
          label: "POST"
        },
        {
          label: "PUT"
        },
        {
          label: "DELETE"
        }
      ]
    };
  },
  methods: {
    createRoot() {
      this.editForm = {
        pid: '',
        name: '',
        route: ''
      };
      this.dialogVisible = true;
    },
    edit: function(data) {
      this.editForm = util.deepcopy(data);
      this.dialogVisible = true;
    },
    append(item) {
      this.editForm = {
        pid: item.id,
        name: '',
        route: ''
      };
      this.dialogVisible = true;
    },
    addResource(item) {
      this.editForm = {
        pid: item.id,
        method: "get",
        name: '',
        url: ''
      };
      this.dialogVisible = true;
    },
    save() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          let formData = util.deepcopy(this.editForm);
          const handleApi = formData.route ? menu : resource;
          //处理method
          if (formData.method) {
            formData.method = formData.method.toLowerCase();
          }
          this.loading = true;
          if (!formData.id) {
            //添加菜单
            handleApi.add(formData).then(() => {
              this.fetchData();
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.dialogVisible = false;
            });
          } else {
            handleApi.edit(formData).then(() => {
              this.fetchData();
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    resetForm: function() {
      this.editForm = {}
    },
    remove(item) {
      if (!item || !item.id) {
        return null;
      }
      const handleApi = this.editForm.route ? menu : resource;
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        handleApi.remove({
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
    fetchData: function() {
      this.loading = true;
      user.permission().then(res => {
        this.loading = false;
        let userPermissions = res.data.data;
        store.set('permission', userPermissions);
        this.list = util.buildMenu(userPermissions.menus.concat(userPermissions.resources));
      
      });
    }
  },
  created: function() {
    this.fetchData();
  }
};
</script>

<style scoped>
</style>
