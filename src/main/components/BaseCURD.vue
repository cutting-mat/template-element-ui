<template>
  <div>
    <el-table :data="list" border>
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
          <div v-if="Array.isArray(column.actions)">
            <el-button
              v-for="(item, btnIndex) in column.actions"
              :key="btnIndex"
              :size="item.size"
              :type="item.type"
              :plain="item.plain"
              :round="item.round"
              :disabled="item.disabled"
              :icon="item.icon"
              :native-type="item.nativeType"
              @click="$emit(item.event, scope.row, scope.$index)"
            >
              {{ item.label }}
            </el-button>
          </div>
          <div v-else>
            {{ scope.row[column.prop] | formatterFilter(scope.row, scope.column, scope.$index, column.formatter) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- page -->
    <BasePagination
      :page-size="queryParam.pageSize"
      :current-page="queryParam.p"
      :total-count="totalCount"
      :total-page="totalPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { deepcopy } from "@/main/assets/util";

export default {
  props: {
    api: {
      type: Object,
      required: true,
      default() {
        return {
          list() {},
          detail() {},
          add() {},
          edit() {},
          remove() {},
        };
      },
    },
    model: {
      type: Object,
      required: true,
      default() {
        // value type:  array,object,number,string,boolean
        return {
          index: "abc",
          name: "张三",
        };
      },
    },
    columns: {
      type: Array,
      required: true,
      default() {
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
          {
            label: "姓名",
            prop: "name",
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
          {
            label: "操作",
            actions: [
              {
                label: "编辑",
                event: "handleEdit",
                size: null,
                type: null,
                plain: false,
                round: false,
                disabled: false,
                icon: null,
                nativeType: "button",
              },
              {
                label: "删除",
                event: "handleRemove",
              },
            ],
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
      if(typeof formatter === 'function'){
        return formatter(row, column, cellValue, index)
      }else{
        return cellValue
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      list: [],
      editForm: this.model,
      queryParamFinnal: {
        p: 1,
        pageSize: 10,
      },
      totalCount: 0,
      totalPage: 0,
    };
  },
  watch: {
    loading() {
      this.$emit("loadingState", this.loading);
    },
  },
  methods: {
    handleCurrentChange: function (currentPage) {
      this.queryParamFinnal.p = currentPage;
      this.fetchData();
    },
    add() {
      console.log('add')
      this.editForm = this.model;
      this.dialogVisible = true;
    },
    edit: function (data) {
      this.editForm = deepcopy(data);
      this.dialogVisible = true;
    },
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          let formData = deepcopy(this.editForm);
          this.handleCloseDialog();
          let doAction = !formData.id ? this.api.add : this.api.edit;
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
      this.editForm = this.model;
      this.$refs.editForm && this.$refs.editForm.resetFields();
    },
    remove(item) {
      if (!item) {
        return null;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        this.api
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
    fetchData: function (reload) {
      if (reload) {
        this.queryParamFinnal.p = 1;
      }
      this.loading = true;
      this.api
        .list(this.queryParamFinnal)
        .then((res) => {
          this.loading = false;
          const data = res.data.data;
          if (data) {
            this.list = data.list;
            this.totalCount = data.totalCount;
            this.totalPage = data.totalPage;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    retrieve() {
      Object.assign(this.queryParamFinnal, this.queryParam);
      this.fetchData(true)
    }
  },
  created() {
    if (this.immediate) {
      Object.assign(this.queryParamFinnal, this.queryParam);
      this.fetchData();
    }
  },
};
</script>

<style scoped>
</style>
