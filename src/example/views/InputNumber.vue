<template>
  <div>

    <h2>数字输入框</h2>
    <p>
      引用数字输入组件：<code>@/main/components/BaseInputNumber.vue</code>
    </p>
    <div class="demo">
      <BaseInputNumber v-model="inputNumber" zeroFill :decimals="2" style="width:800px" />
    </div>
  </div>
</template>

<script>
//import * as util from '@/main/assets/util';

export default {
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
