<template>
  <div>

    <h2>标签栏</h2>
    <div class="demo">
      <TagManage />
    </div>
  </div>
</template>

<script>
//import { util } from '@/core';

export default {
  components: {
    TagManage:() => import("@/main/components/TagManage.vue")
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
