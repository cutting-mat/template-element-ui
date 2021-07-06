<template>
  <div>
    <h2>基本用法</h2>
    <div class="demo">
      <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    </div>
    <h2>文字描述</h2>
    <div class="demo">
      <el-switch
        v-model="value1"
        active-text="按月付费"
        inactive-text="按年付费"
        style="margin-bottom:40px"
      ></el-switch>
      <el-switch
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按月付费"
        inactive-text="按年付费"
      >
      </el-switch>
    </div>
    <h2>禁用状态</h2>
    <div class="demo">
      <el-switch v-model="value3" disabled style="margin-right:20px"> </el-switch>
      <el-switch v-model="value4" disabled> </el-switch>
    </div>
    <h2>value 数据类型扩展</h2>
    <div class="demo">
      <el-tooltip :content="'Switch value: ' + value5" placement="top">
        <el-switch
          v-model="value5"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="100"
          inactive-value="0"
        >
        </el-switch>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
//import * as util from '@/core';

export default {
  data() {
    return {
      value: true,
      value1: true,
      value2: true,
      value3: false,
      value4: true,
      value5: '100'
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>
