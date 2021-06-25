<template>
  <el-drawer
    title="字典数据维护"
    :visible="visible"
    direction="rtl"
    size="900px"
    @opened="handleInit"
    @close="requireClose"
    v-loading.fullscreen="loading"
  >
    <div class="myform flex-col">
      <div class="flex-row toolBar">
        <div class="flex-1">
          <!--  -->
        </div>
        <el-button
          v-auth="dict.itemAdd"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="dialogVisible=true"
        >添加数据</el-button>
      </div>
      <div class="flex-1 scrollbar">
        <el-table
          :data="list"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column prop="value" label="值"></el-table-column>
          <el-table-column prop="code" label="CODE" align="center"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button v-auth="dict.itemEdit" size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button v-auth="dict.itemEdit" size="mini" @click="append(scope.row)">添加下级</el-button>
              <el-button v-auth="dict.itemRemove" size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 数据编辑 -->
      <el-dialog :close-on-click-modal="false"
        title="字典数据"
        :visible="dialogVisible"
        width="800px"
        append-to-body
        @close="handleCloseDialog"
      >
        <el-form size="small" ref="editForm" :rules="rules" :model="editForm" label-width="80px">
          <el-form-item label="值" prop="value">
            <el-input v-model="editForm.value"></el-input>
          </el-form-item>
          <el-form-item label="CODE" prop="code">
            <el-input v-model="editForm.code"></el-input>
          </el-form-item>
          
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </el-drawer>
</template>

<script>
import * as util from "@/core";
import * as dict from "../api/dict";

export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    dictCode: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      dict,
      loading: true,
      dialogVisible: false,
      queryParam: {
        dictCode: ""
      },
      list: [],
      editForm: {
        pid: '',
        value: '',
        code: ''
      },
      rules: {
        value: [
          { required: true, message: "请输入数据值", trigger: "blur" },
          { min: 1, max: 100, message: '长度 1 到 100 个字符', trigger: 'blur' }
        ],
        code: [
          { min: 1, max: 100, message: '长度 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    dictCode: function() {
      this.$set(this.queryParam, "dictCode", this.dictCode);
    }
  },
  methods: {
    append(data) {
      this.$set(this.editForm, 'pid', data.id);
      this.dialogVisible = true;
    },
    edit(data) {
      const editObj = Object.assign({}, data);
      this.editForm = editObj;
      this.dialogVisible = true;
    },
    save() {
      
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          let formData = util.deepcopy(this.editForm);
          formData.dictCode = this.queryParam.dictCode;
          this.handleCloseDialog();
          this.loading = true;

          if (!formData.id) {
            dict.itemAdd(formData).then(() => {
              this.fetchData();
              this.$message({
                message: "添加成功",
                type: "success"
              });
            });
          } else {
            dict.itemEdit(formData).then(() => {
              this.fetchData();
              this.$message({
                message: "编辑成功",
                type: "success"
              });
            });
          }
        }
      });
    },
    remove(item) {
      if (!item) {
        return null;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        dict.itemRemove({
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
    handleCloseDialog: function() {
      this.editForm = {
        pid: '',
        value: '',
        code: ''
      };
      this.dialogVisible = false;
    },
    requireClose() {
      this.list = [];
      this.$emit("close");
    },
    fetchData() {
      this.loading = true;
      dict.itemList(this.queryParam).then(res => {
        this.loading = false;
        this.list = util.buildTree(res.data.data);
      });
    },
    handleInit() {
      if (this.queryParam.dictCode) {
        this.fetchData();
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.myform {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
