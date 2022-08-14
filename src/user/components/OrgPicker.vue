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
      :visible.sync="dialogVisible"
      width="1000px"
      @open="checkedNode = []"
    >
      <div class="orgPicker">
        <OrgTree
          v-if="dialogVisible"
          :value="list"
          picker
          @pick="checkedNode = $event"
        ></OrgTree>
      </div>

      <div slot="footer">
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
import { buildTree, deepcopy } from "@/core/util";
import { list } from "../api/org";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      // 已选中机构id
      type: [Number, String],
      required: false,
    },
    adapter: {
      // 输入框显示适配
      type: Function,
      required: false,
      default(value) {
        return value;
      },
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
  },
  components: {
    OrgTree: () => import("../components/OrgTree.vue"),
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      list: [],
      checkedNode: [],
    };
  },
  computed: {
    showTitle() {
      return this.adapter(this.value);
    },
  },
  methods: {
    fetchData: function () {
      this.loading = true;
      list()
        .then((res) => {
          this.loading = false;
          if (res.data) {
            this.list = buildTree(res.data);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    submit() {
      if (this.checkedNode && this.checkedNode[0]) {
        this.$emit(
          "change",
          this.checkedNode[0].id,
          deepcopy(this.checkedNode[0])
        );
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
  height: 50vh;
  min-height: 350px;
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
