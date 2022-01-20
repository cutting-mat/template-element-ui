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
      append-to-body
      :close-on-click-modal="false"
      title="选择机构"
      :visible="dialogVisible"
      width="1000px"
      @close="dialogVisible = false"
      class="custom-dialog"
    >
      <div class="dialog-hd" slot="title">
        <i class="title-ico ion" v-html="'&#xe680;'"></i>选择学校
      </div>
      <div class="flex-row orgPicker">
        <div class="_side">
          <!-- 名称搜索 -->
          <div class="_keyword">
            <el-input
              v-model.trim="queryParam.name"
              placeholder="学校名称搜索"
              :maxlength="100"
              size="medium"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="fetchSchool(true)"
              ></el-button>
            </el-input>
          </div>
          <!-- 联盟树 -->
          <el-tree
            ref="tree"
            :data="list"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            visible-arrow
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
        <div class="_list flex-col flex-1 scrollbar">
          <!-- 学校列表 -->
          <el-table
            class="flex-1"
            height="100%"
            :data="schoolList"
            highlight-current-row
            @current-change="handleCheckSchool"
          >
            <el-table-column prop="name" label="名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="所属联盟" show-overflow-tooltip>
              <template slot-scope="scope">
                {{
                  scope.row.fullName &&
                  scope.row.fullName.split("/")[
                    scope.row.fullName.split("/").length - 2
                  ]
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="contacts"
              label="负责人"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="contactsTel"
              label="联系电话"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          <!-- 翻页 -->
          <base-pagination
            class="page-box"
            :page-size="queryParam.pageSize"
            :current-page="queryParam.p"
            :total-count="totalCount"
            :total-page="totalPage"
            @current-change="handleCurrentChange"
          ></base-pagination>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="submit"
          >确 定</el-button
        >
        <el-button size="medium" @click="dialogVisible = false"
          >取 消</el-button
        >
      </span>
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
      // 显示适配器
      type: Function,
      required: false,
      default() {
        return (value) => value;
      },
    },
    targetType: {
      // 选择机构类型
      type: Number,
      required: false,
      default: 0, // 0 不限 1 联盟 2 学校
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
      defaultProps: {
        children: "children",
        label: "name",
      },
      checkedNode: {},
      queryParam: {
        pageSize: 10,
        p: 1,
        name: null,
        pid: null,
      },
      schoolList: [],
      totalCount: 0,
      totalPage: 0,
    };
  },
  computed: {
    showTitle() {
      return this.adapter(this.value, this.checkedNode);
    },
  },
  methods: {
    handleCheckSchool(currentSchool) {
      // 选择学校
      if (currentSchool) {
        this.checkedNode = currentSchool;
      }
    },
    handleCurrentChange(currentPage) {
      // 翻页
      this.queryParam.p = currentPage;
      this.fetchSchool();
    },
    fetchData: function () {
      // 请求联盟树
      this.loading = true;
      api
        .unions()
        .then((res) => {
          this.loading = false;
          const data = res.data.data;
          if (data) {
            this.list = util.buildTree(data);
            this.queryParam.pid = data[0].id;
            this.fetchSchool(true);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchSchool(reload) {
      // 请求学校
      if (reload) {
        this.queryParam.p = 1;
      }
      this.loading = true;
      api
        .schools(
          Object.assign(
            {
              pid: (this.checkedNode && this.checkedNode.id) || null,
            },
            this.queryParam
          )
        )
        .then((res) => {
          this.loading = false;
          const data = res.data.data;
          if (data) {
            this.schoolList = data.list;
            this.totalCount = data.totalCount;
            this.totalPage = data.totalPage;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleNodeClick(data) {
      this.checkedNode = data;
      this.queryParam.pid = data.id;
      this.fetchSchool(true);
    },
    submit() {
      if (this.targetType === 1 || this.targetType === 2) {
        if (this.targetType !== this.checkedNode.type) {
          let targetType = {
            1: "联盟",
            2: "学校",
          }[this.targetType];
          return this.$message.warning(`请选择${targetType}！`);
        }
      }
      if (this.checkedNode && this.checkedNode.id) {
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
