<template>
  <div>

    <h2>标签栏</h2>
    <div class="demo">
      <BaseTagManage />
    </div>
  </div>
</template>

<script>
//import * as util from '@/core';

export default {
  components: {
    BaseTagManage:() => import("@/main/components/BaseTagManage.vue")
  },
  data() {
    return {
      inputNumber: null,
      
    };
  },
  methods: {
    
  },
  created() {},
};
</script>

<style scoped></style>
