<template>
  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :current-page="currentPage"
    :total="totalCount"
    @current-change="$emit('current-change', $event)"
  ></el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      required: true,
      default: 10,
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    totalPage: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    totalPage: function () {
      if (this.totalPage < this.currentPage) {
        this.$emit("current-change", 1);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  text-align: center;
  margin: 10px 0;
}
</style>
