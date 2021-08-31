<template>
  <div>

    <h2>数字输入框</h2>
    <p>
      引用数字输入组件：<code>@/main/components/BaseInputNumber.vue</code>
    </p>
    <div class="demo">
      <el-form label-width="160px">
        <el-form-item label="两位小数自动补零">
          <BaseInputNumber v-model="inputNumber1" zeroFill :decimals="2" style="width:800px" />
        </el-form-item>
        <el-form-item label="限制输入区间1~100">
          <BaseInputNumber v-model="inputNumber2" :range="[1,100]" style="width:800px" />
        </el-form-item>
        <el-form-item label="四舍五入">
          <BaseInputNumber v-model="inputNumber3" round style="width:800px" />
        </el-form-item>
        <el-form-item label="两位小数四舍五入">
          <BaseInputNumber v-model="inputNumber4" round :decimals="2" style="width:800px" />
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
      inputNumber1: null,
      inputNumber2: null,
      inputNumber3: null,
      inputNumber4: null
    };
  },
  methods: {
    
  },
  created() {},
};
</script>

<style scoped></style>
