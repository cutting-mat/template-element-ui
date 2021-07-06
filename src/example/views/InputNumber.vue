<template>
  <div>

    <h2>数字输入框</h2>
    <p>
      引用数字输入组件：<code>@/main/components/BaseInputNumber.vue</code>
    </p>
    <div class="demo">
      <el-form>
        <el-form-item label="保留两位小数">
          <BaseInputNumber v-model="inputNumber" zeroFill :decimals="2" style="width:800px" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//import * as util from '@/core';

export default {
  components: {
    BaseInputNumber:  () => import("@/main/components/BaseInputNumber.vue"),
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
