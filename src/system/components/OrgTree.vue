<template>
  <el-table
    ref="table"
    :data="tableData"
    style="width: 100%"
    row-key="id"
    lazy
    :load="load"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="picker" type="selection" width="45"></el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="fullName" label="全称"></el-table-column>
    <el-table-column label="创建时间">
      <template slot-scope="scope">{{ scope.row.createTime | date }}</template>
    </el-table-column>
    <slot name="action" />
  </el-table>
</template>

<script>
import { list } from "../api/org";

export default {
  props: {
    value: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    picker: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      tableData: [],
      selection: []
    };
  },
  watch: {
    value: {
      handler() {
        this.tableData = this.value;
      },
      deep: true
    },
    selection: {
      handler() {
        if (this.picker) {
          this.$emit('pick', this.selection)
        }
      },
      deep: true
    }
  },
  methods: {
    handleSelectionChange(selection) {
      if (selection.length > 1 && !this.multiple) {
        // 单选模式
        selection.forEach((row, index) => {
          this.$refs.table.toggleRowSelection(row, index === selection.length - 1)
        })
      } else {
        this.selection = selection;
      }
    },
    load(treeNode, tree, resolve) {
      this.fetchData(treeNode ? { pid: treeNode.id } : null).then(res => {
        resolve(res.data)
      })
    },
    fetchData(params) {
      this.loading = true;
      return list(params).then(res => {
        this.loading = false;
        return res
      }).catch(() => {
        this.loading = false;
      })
    }
  },
  created() {
    if (this.value.length) {
      this.tableData = this.value;
    } else {
      this.fetchData().then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style scoped>
</style>
