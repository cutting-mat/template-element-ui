<template>
  <div class="orgPick-box">
    <el-input
      :size="size"
      readonly
      :value="showTitle"
      @focus="dialogVisible = true"
      placeholder="请选择"
    ></el-input>
    <!-- 弹窗 -->
    <el-dialog
      class="custom-dialog"
      append-to-body
      :close-on-click-modal="false"
      title="选择组织"
      :visible="dialogVisible"
      width="1000px"
      @open="dialogOpen"
      @close="dialogClose"
    >
      <div class="orgPicker flex-col">
        <el-table
          class="flex-1"
          :data="list"
          highlight-current-row
          @current-change="checkedNode=$event"
        >
          <el-table-column prop="name" label="名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="fullName" label="全称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="创建时间" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.createTime | date }}
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="submit"
          >确 定</el-button
        >
        <el-button size="medium" @click="dialogVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { util } from "@/core";
import * as api from "../api/org";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      // 已选中机构id
      type: Number,
      required: false,
    },
    adapter: {
      // 输入框显示适配
      type: Function,
      required: false,
      default(value, obj) {
        return obj.name || value
      }
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      list: [],
      checkedNode: {},
      submitNode: {},
    };
  },
  computed: {
    showTitle() {
      return this.adapter(this.value, this.submitNode);
    },
  },
  methods: {
    dialogOpen(){
      this.checkedNode = {}
      this.submitNode = {}
    },
    dialogClose(){
      this.dialogVisible = false;
    },
    fetchData: function () {
      this.loading = true;
      api
        .list()
        .then((res) => {
          this.loading = false;
          const data = res.data;
          if (data) {
            this.list = util.buildTree(data);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submit() {
      
      if (this.checkedNode && this.checkedNode.id) {
        this.submitNode = util.deepcopy(this.checkedNode)
        this.$emit("change", this.checkedNode.id);
      }

      this.dialogVisible = false;
    },
    
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.orgPicker {
  height: 400px;
}
.orgPicker ._side {
  width: 280px;
  border-right: 1px solid #f5f5f5;
  margin-right: 12px;
}
.orgPicker ._keyword {
  padding: 0 12px 12px;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 12px;
}
.orgPicker ._action {
  text-align: center;
  margin-top: 20px;
}
</style>
