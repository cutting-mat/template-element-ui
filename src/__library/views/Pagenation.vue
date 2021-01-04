<template>
  <div>
    <h2>基础样式</h2>
    <div class="demo">
      <BasePagination :totalCount="100" :totalPage="20" :pageSize="10" :currentPage="1"/>
    </div>
  </div>
</template>

<script>
//import * as util from '@/common/assets/util';

export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>
