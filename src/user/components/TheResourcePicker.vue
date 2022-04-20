<template>
  <el-tree
    ref="tree"
    class="custom-tree"
    :data="list"
    :props="defaultProps"
    node-key="id"
    default-expand-all
    :show-checkbox="picker"
    check-strictly
    @check-change="handleCheckChange"
  >
    <div slot-scope="{ node, data }" class="custom-tree-item">
      <div class="flex-1 extendLable">
        <span v-if="data.type === 1" style="color: #67c23a">
          <i class="el-icon-medal"></i>
        </span>
        <span style="margin-right: 20px" :class="{ source: data.type === 1 }">
          {{ data.name }}
        </span>
        <el-tag
          v-if="data.type === 1"
          size="small"
          :type="typeColor[data.method]"
        >
          <i class="el-icon-position"></i>
          {{ data.method.toUpperCase() }}
        </el-tag>
        <el-tag size="small" type="info">
          <i v-if="data.type === 0" class="el-icon-link"></i>
          {{ data.type === 0 ? data.route : data.url }}
        </el-tag>
      </div>
      <span class="extendGroup" v-if="!picker">
        <!-- 根据 data.type===0 / 1 判断是路由还是请求 -->
        <el-button
          v-auth="resource.edit"
          size="small"
          type="text"
          @click.stop="$emit('edit', data)"
        >
          编辑
        </el-button>
        <el-button
          v-auth="resource.add"
          v-if="data.type === 0"
          size="small"
          type="text"
          @click.stop="$emit('append', data)"
        >
          添加子菜单
        </el-button>
        <el-button
          v-auth="resource.add"
          v-if="data.type === 0"
          size="small"
          type="text"
          @click.stop="$emit('add-resource', data)"
        >
          添加资源
        </el-button>
        <el-button
          v-auth="resource.remove"
          size="small"
          type="text"
          @click.stop="$emit('remove', data)"
        >
          删除
        </el-button>
      </span>
      <span class="extendGroup" v-else>
        <el-button
          size="small"
          type="text"
          @click.stop="handleCheckChange(data, !node.checked, true)"
        >
          批量选择
        </el-button>
      </span>
    </div>
  </el-tree>
</template>

<script>
import { throttle, buildTree } from "@/core";
import * as resource from "../api/resource";

export default {
  props: {
    picker: {
      type: Boolean,
      required: false,
      default: false,
    },
    checked: {
      type: Array,
      required: false,
    },
    listdata: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      resource,
      list: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      typeColor: {
        get: "success",
        post: "primary",
        put: "warning",
        delete: "danger",
      },
      trigger: null,
    };
  },
  watch: {
    listdata: {
      handler: function (listdata) {
        if (Array.isArray(listdata)) {
          this.list = listdata;
        }
      },
      immediate: true,
    },
    checked: {
      handler: function () {
        this.$refs.tree.setCheckedKeys(this.checked);
      },
      deep: true,
    },
  },
  methods: {
    handleCheckChange(data, checked, checkChild) {
      const theNode = this.$refs.tree.getNode(data);
      if (theNode) {
        // 选中目标节点
        this.$refs.tree.setChecked(theNode, checked);
        // 如果是批量模式, 选中下级节点
        if (
          checkChild &&
          Array.isArray(data.children) &&
          data.children.length
        ) {
          data.children.forEach((cnode) => {
            this.handleCheckChange(cnode, checked, checkChild);
          });
        }
      }
      // 触发数据变更
      this.$nextTick(() => {
        this.trigger();
      });
    },
    fetchData: function () {
      this.$store.action("permission").then((userPermissions) => {
        this.list = buildTree(
          userPermissions.menus.concat(userPermissions.resources)
        );
        //设置已勾选
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.checked);
        });
      });
    },
  },
  created: function () {
    if (!this.listdata) {
      this.fetchData();
    }
  },
  mounted() {
    // 数据变更监听器, 批量模式支持函数节流
    this.trigger = throttle(() => {
      this.$emit("check", this.$refs.tree.getCheckedNodes());
    });
  },
};
</script>

<style scoped>
.custom-tree-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 6px;
}
.extendLable span {
  margin-right: 4px;
}
.extendLable .source {
  color: #999;
  font-size: 14px;
}
.custom-tree >>> .el-tree-node__content {
  height: 32px;
  line-height: 32px;
}
</style>
