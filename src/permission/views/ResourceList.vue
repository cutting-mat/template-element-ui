<template>
  <div class="scrollbar blockLayout" v-loading="loading">
    <div class="flex-row toolBar">
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
      <TheResourcePicker
        :listdata="list"
        @edit="edit"
        @append="append"
        @add-resource="addResource"
        @remove="remove"
      />
    </div>

    <!-- 弹窗 -->
    <el-dialog :close-on-click-modal="false"
      :title="editForm.type==1 ? '路由信息' : '资源信息'"
      :visible="dialogVisible"
      width="800px"
      @close="handleCloseDialog"
    >
      <el-form size="small" ref="editForm" :rules="rules" :model="editForm" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="方法" v-if="!!editForm.method" prop="method">
          <el-radio-group v-model="editForm.method">
            <el-radio 
              v-for="(item, i) in requestMethods"
              :key="'m'+i"
              :label="item.label.toLowerCase()"
            >{{item.label}}</el-radio>
          </el-radio-group>
          
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
        <el-form-item label="序号">
          <el-input v-model.trim="editForm.orderNum" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/common/assets/util";
import * as resource from '../api/resource';
import {store} from '@/store';

export default {
  components: {
    TheResourcePicker: resolve =>
      require(["../components/TheResourcePicker.vue"], resolve)
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
        name: [{ required: true, message: "请输入名称", trigger: "blur" },
        { min: 1, max: 100, message: '长度 1 到 100 个字符', trigger: 'blur' }],
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
          this.handleCloseDialog()

          const handleApi = resource;
          //处理级联pid数组为单一pid
          if(Array.isArray(formData.pid)){
            formData.pid = formData.pid.pop()
          }
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
    handleCloseDialog: function() {
      this.dialogVisible = false;
      this.editForm = {}
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    remove(item) {
      if (!item || !item.id) {
        return null;
      }
      const handleApi = resource;
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
      store.action('permission', true).then(userPermissions => {
        this.loading = false;
        this.list = util.buildTree(userPermissions.menus.concat(userPermissions.resources));
      
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
