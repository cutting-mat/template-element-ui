<template>
  <div>
    <el-table border default-expand-all row-key="id" :data="list">
      <el-table-column
        v-for="(column, index) in columns"
        :key="'col' + index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :type="column.type"
        :index="column.index"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align"
        :header-align="column.headerAlign"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
      >
        <template slot-scope="scope">
          <div v-if="column.slot && column.slot.split">
            <!-- slot自定义内容 -->
            <slot
              :name="column.slot"
              :row="scope.row"
              :column="scope.column"
              :index="scope.$index"
            ></slot>
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
      :close-on-click-modal="false"
      title="详情"
      :visible="dialogVisible"
      width="800px"
      @close="handleCloseDialog"
    >
      <BaseCURDForm v-if="dialogVisible"
        ref="editForm"
        :model="modelData"
        :default="editForm"
        :action="editScope"
      />
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
      default() {
        return {
          list() {},
          detail() {},
          create() {},
          update() {},
          delete() {},
        };
      },
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
            type: 'string',
            default: null,
            // 表单
            label: "用户名",
            control: "el-input",
            controlOption: {
              // 除 v-model 外的控件属性
            },
            scope: ["create","update"],
            // 校验
            required: true,
            validator: null,
            message: null,
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
            label: "序号",
            prop: "index",
            width: null,
            type: null,
            index: null,
            minWidth: null,
            fixed: null,
            renderHeader: null,
            resizable: true,
            formatter: null,
            showOverflowTooltip: false,
            align: "left",
            headerAlign: null,
            className: null,
            labelClassName: null,
            selectable: null,
          },
        ];
      },
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
    getDetailFromListItem: {
      type: Boolean,
      required: false,
      default: true,
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
      queryParamFinnal: {
        p: 1,
        pageSize: 10,
      },
      totalCount: 0,
      totalPage: 0,
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
      this.modelKey.map(key => {
        let obj = result[key];
        // 默认类型 string
        if(obj.type===void(0)){
          obj.type = 'string'
        }
        // 默认值 null
        if(obj.default===void(0)){
          obj.default = null
        }
        //默认控件: string => el-input, number => BaseInputNumber, boolean => el-switch, array => DictCheckbox
        if(obj.control===void(0)){
          obj.control = {
            number: 'BaseInputNumber',
            boolean: 'el-switch',
            array: 'DictCheckbox'
          }[obj.type] || 'el-input'
        }

        // 默认生成控件时机
        if(!obj.scope || !obj.scope.indexOf) {
          obj.scope = ["create","update"]
        }
        // 默认非必填
        obj.required = !!obj.required;

      })
      return result;
    },
    modelValue() {
      let result = {};
      this.modelKey.map(key => {
        result[key] = this.modelData[key].default;
      })
      return result;
    }
  },
  watch: {
    loading() {
      this.$emit("loadingState", this.loading);
    },
  },
  methods: {
    handleCurrentChange: function (currentPage) {
      this.queryParamFinnal.p = currentPage;
      this.fetchList();
    },
    create() {
      this.editForm = this.modelValue;
      this.editScope = 'create';
      this.dialogVisible = true;
    },
    update: async function (data) {
      this.editForm = this.getDetailFromListItem
        ? deepcopy(data)
        : await this.fetchDetail(data.id);
      this.editScope = 'update';
      this.dialogVisible = true;
    },
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formData = deepcopy(this.editForm);
          this.handleCloseDialog();
          let doAction = !formData.id ? this.api.create : this.api.update;
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
    handleCloseDialog: function () {
      this.dialogVisible = false;
      this.editForm = this.modelValue;
      //this.$refs.editForm && this.$refs.editForm.resetFields();
    },
    delete(item) {
      if (!item) {
        return null;
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
              id: item.id,
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
    fetchDetail: function (id) {
      this.loading = true;
      return this.api
        .detail({ id })
        .then((res) => {
          this.loading = false;
          return res.data.data;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchList: function (reload) {
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
      Object.assign(this.queryParamFinnal, this.queryParam, {
        p: this.queryParamFinnal.p,
        pageSize: this.queryParamFinnal.pageSize,
      });
      this.fetchList(true);
    },
  },
  created() {
    if (this.immediate) {
      this.search();
    }
  },
};
</script>

<style scoped>
</style>
