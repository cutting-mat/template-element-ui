<template>
  <div>
    <el-table ref="table"
      :data="list"
      v-bind="Object.assign({
        'border': true,
        'default-expand-all': true,
        'row-key': 'id'
      }, tableAttribute)"
      @select="(selection, row) => $emit('select', selection, row)"
      @select-all="(selection) => $emit('select-all', selection)"
      @selection-change="(selection) => $emit('selection-change', selection)"
      @cell-mouse-enter="(row, column, cell, event) => $emit('cell-mouse-enter', row, column, cell, event)"
      @cell-mouse-leave="(row, column, cell, event) => $emit('cell-mouse-leave', row, column, cell, event)"
      @cell-click="(row, column, cell, event) => $emit('cell-click', row, column, cell, event)"
      @cell-dblclick="(row, column, cell, event) => $emit('cell-dblclick', row, column, cell, event)"
      @row-click="(row, column, event) => $emit('row-click', row, column, event)"
      @row-contextmenu="(row, column, event) => $emit('row-click', row, column, event)"
      @row-dblclick="(row, column, event) => $emit('row-dblclick', row, column, event)"
      @header-click="(column, event) => $emit('header-click', column, event)"
      @header-contextmenu="(column, event) => $emit('header-contextmenu', column, event)"
      @sort-change="(column, prop, order) => $emit('sort-change', column, prop, order)"
      @filter-change="(filters) => $emit('filter-change', filters)"
      @current-change="(currentRow, oldCurrentRow) => $emit('current-change', currentRow, oldCurrentRow)"
      @header-dragend="(newWidth, oldWidth, column, event) => $emit('header-dragend', newWidth, oldWidth, column, event)"
      @expand-change="(row, expandedRows ) => $emit('expand-change', row, expandedRows)"
    >
      <el-table-column
        v-for="(column, index) in columnsData"
        :key="'col' + index"
        v-bind="column"
      >
        <template slot-scope="scope">
          <div v-if="column.slotName && column.slotName.split">
            <!-- slot自定义内容 -->
            <slot
              :name="column.slotName"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
            ></slot>
          </div>
          <div v-else-if="column.type==='index'">
            <!-- index 类型 -->
            {{scope.$index+1}}
          </div>
          <div v-else>
            <!-- 支持formatter内容 -->
            {{
              scope.row[column.prop]
                | formatterFilter(
                  scope.row,
                  scope.column,
                  scope.$index,
                  column.formatter
                )
            }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- page -->
    <BasePagination
      v-if="showPagination"
      :page-size="queryParamFinnal.pageSize"
      :current-page="queryParamFinnal.p"
      :total-count="totalCount"
      :total-page="totalPage"
      @current-change="handleCurrentChange"
    />
    <!-- 弹窗 -->
    <el-dialog
      :visible="dialogVisible"
      v-bind="Object.assign({
        'title': '详情',
        'width': '800px',
        'close-on-click-modal': false,
        'append-to-body': true
      }, dialogAttribute)"
      @close="handleCloseDialog"
    >
      <BaseCURDForm v-if="dialogVisible"
        ref="editForm"
        :model="modelData"
        :default="editForm"
        :action="editScope"
        :formAttribute="formAttribute"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepcopy, buildTree } from "@/main/assets/util";

export default {
  props: {
    api: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      required: true,
      default() {
        /**
         * 默认数据模型示例
         * type 用于推导默认控件和数据校验: array,object,number,string,boolean
         * scope 用于确认当前模型字段的提交时机，默认更新和创建均提交
         * */
        return {
          accountName: {
            // 数据
            type: "string",
            default: null,
            // 表单
            label: "用户名",
            control: "el-input",
            controlOption: {
              // 除 v-model 外的控件属性
            },
            scope: ["create", "update"],
            // 校验
            required: false,
            validator: null,
            message: null,
            asynValid: false
          },
        };
      },
    },
    columns: {
      type: Array,
      required: true,
      default() {
        /**
         * 默认列定义示例
         * */
        return [
          {
            // tableColumnAttributes,
            hidden: false,
            slotName: ''
          },
        ];
      },
    },
    dataKey: {
      type: String,
      required: false,
      default: "id"
    },
    immediate: {
      type: Boolean,
      required: false,
      default: true,
    },
    queryParam: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    getItemFromDetaiApi: {
      type: Boolean,
      required: false,
      default: false,
    },
    tableAttribute: {
      type: Object,
      required: false,
      default(){
        return {}
      }
    },
    dialogAttribute: {
      type: Object,
      required: false,
      default(){
        return {}
      }
    },
    formAttribute: {
      type: Object,
      required: false,
      default(){
        return {}
      }
    },
  },
  filters: {
    formatterFilter(cellValue, row, column, index, formatter) {
      if (typeof formatter === "function") {
        return formatter(row, column, cellValue, index);
      } else {
        return cellValue;
      }
    },
  },
  components: {
    BaseCURDForm: (resolve) => require(["./BaseCURDForm"], resolve),
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      list: [],
      editForm: {},
      editScope: '',
      queryParamFinnal: {
        p: 1,
        pageSize: 10,
      },
      totalCount: 0,
      totalPage: 0,
      table: {
        // 暴露 el-table 方法
        clearSelection: () => {
          return this.$refs.table.clearSelection()
        },
        toggleRowSelection: (row, selected) => {
          return this.$refs.table.toggleRowSelection(row, selected)
        },
        toggleAllSelection: () => {
          return this.$refs.table.toggleAllSelection()
        },
        toggleRowExpansion: (row, expanded) => {
          return this.$refs.table.toggleRowExpansion(row, expanded)
        },
        setCurrentRow: (row) => {
          return this.$refs.table.setCurrentRow(row)
        },
        clearSort: () => {
          return this.$refs.table.clearSort()
        },
        clearFilter: (columnKey) => {
          return this.$refs.table.clearFilter(columnKey)
        },
        doLayout: () => {
          return this.$refs.table.doLayout()
        },
        sort: (prop, order) => {
          return this.$refs.table.clearFilter(prop, order)
        },
      },
      form: {
        // 暴露 el-form 方法
        validate: (callback) => {
          return this.$refs.editForm.validate(callback);
        },
        validateField: (props, callback) => {
          return this.$refs.editForm.validateField(props, callback);
        },
        resetFields: () => {
          return this.$refs.editForm.resetFields();
        },
        clearValidate: () => {
          return this.$refs.editForm.clearValidate();
        },
      }
    };
  },
  computed: {
    showPagination() {
      return this.list.length && this.totalCount && this.totalPage;
    },
    modelKey() {
      return Object.keys(this.model);
    },
    modelData() {
      let result = Object.assign({}, this.model);
      this.modelKey.map((key) => {
        let obj = result[key];
        // 默认类型 string
        if (obj.type === void 0) {
          obj.type = "string";
        }
        // 默认值处理
        if(obj.type==='array'){
          obj.default = [];
        }else if(obj.type==='object'){
           obj.default = {};
        }else if (obj.default === void 0) {
          obj.default = null;
        }
        //默认控件: string => el-input, number => BaseInputNumber, boolean => el-switch, array => DictCheckbox
        if (obj.control === void 0) {
          obj.control =
            {
              boolean: "el-switch",
              array: "DictCheckbox",
            }[obj.type] || "el-input";
        }
        // 默认控件属性
        if(obj.control==='el-input'){
          obj.controlOption = Object.assign({
            maxlength: 100
          }, obj.controlOption)
        }
        // 默认生成控件时机
        if (!obj.scope || !obj.scope.indexOf) {
          obj.scope = ["create", "update"];
        }
        // 默认非必填
        obj.required = !!obj.required;
 
      });
      return result;
    },
    modelValue() {
      let result = {};
      this.modelKey.map((key) => {
        result[key] = this.modelData[key].default;
      });
      return result;
    },
    columnsData() {
      return this.columns.filter(column => !column.hidden).map((column) => {
        // 默认居中
        if (!column.align) {
          column.align = "center";
        }
        // type selection/expand 警告
        if(column.type==='selection' || column.type==='expand'){
          console.warn('BaseCURD组件：columns=>type属性只支持"default"和"index"')
        }
        return column;
      });
    },
  },
  watch: {
    loading() {
      // 暴露loading状态
      this.$emit("loadingState", this.loading);
    },
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      // 翻页组件回调
      this.queryParamFinnal.p = currentPage;
      this.fetchList();
    },
    create() {
      // 暴露方法：创建
      this.editForm = Object.assign({}, this.modelValue);
      this.editScope = "create";
      this.dialogVisible = true;
    },
    update: async function(data) {
      // 暴露方法：更新
      this.editForm = !this.getItemFromDetaiApi
        ? deepcopy(data)
        : await this.fetchDetail(data[this.dataKey]);
      this.editScope = "update";
      this.dialogVisible = true;
    },
    save() {
      // 保存
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          let formData = deepcopy(this.editForm);
          this.handleCloseDialog();
          let doAction = this.api[this.editScope];
          if(typeof doAction !== 'function'){
            return console.warn(`api.${this.editScope}()未定义`)
          }
          this.loading = true;
          doAction(formData)
            .then(() => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.fetchList();
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    delete(item) {
      // 暴露方法：删除
      if (!item || !item[this.dataKey]) {
        return console.warn(`api.delete(): 参数${this.dataKey}无效`);
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.api
            .delete({
              [this.dataKey]: item[this.dataKey],
            })
            .then(() => {
              this.fetchList();
              this.$message({
                message: "删除成功",
                type: "success",
              });
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    handleCloseDialog: function() {
      this.dialogVisible = false;
      this.editForm = Object.assign({}, this.modelValue);
    },
    fetchDetail: function(dataKey) {
      if(!dataKey){
        return console.warn(`api.detail(): 参数${this.dataKey}无效`)
      }
      this.loading = true;
      return this.api
        .detail({ 
          [this.dataKey]: dataKey
         })
        .then((res) => {
          this.loading = false;
          return res.data.data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchList: function(reload) {
      if (reload) {
        this.queryParamFinnal.p = 1;
      }
      this.loading = true;
      this.api
        .list(this.queryParamFinnal)
        .then((res) => {
          this.loading = false;
          const data = res.data.data;
          if (Array.isArray(data)) {
            this.list = buildTree(data);
          } else if (Array.isArray(data.list)) {
            this.list = buildTree(data.list);
            this.totalCount = data.totalCount;
            this.totalPage = data.totalPage;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    search() {
      // 暴露方法：搜索（应用 queryParam 参数）
      Object.assign(this.queryParamFinnal, this.queryParam, {
        p: this.queryParamFinnal.p,
        pageSize: this.queryParamFinnal.pageSize,
      });
      this.fetchList(true);
    },
    
  },
  created() {
    // props:api检查
    let missingActions = [
      "list",
      "detail",
      "create",
      "update",
      "delete",
    ].filter((action) => {
      return typeof this.api[action] !== "function";
    });
    if (missingActions.length) {
      console.warn(
        `${missingActions
          .map((actname) => "api." + actname + "()")
          .join("、")}未定义`
      );
    }

    if (this.immediate) {
      this.search();
    }
  },
};
</script>

<style scoped>
</style>
