<template>
  <div>
    <h2>基础用法</h2>
    <div class="demo">
      <div class="block">
        <span class="demonstration">默认不区分颜色</span>
        <el-rate v-model="value1"></el-rate>
      </div>
      <div class="block">
        <span class="demonstration">区分颜色</span>
        <el-rate v-model="value2" :colors="colors"> </el-rate>
      </div>
    </div>
    <h2>辅助文字</h2>
    <p>用辅助文字直接地表达对应分数</p>
    <div class="demo">
      <el-rate v-model="value" show-text> </el-rate>
    </div>
    <h2>其它 icon</h2>
    <div class="demo">
      <el-rate
        v-model="value3"
        :icon-classes="iconClasses"
        void-icon-class="el-icon-sunrise"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      >
      </el-rate>
    </div>
    <h2>只读</h2>
    <div class="demo">
      <el-rate v-model="value4" disabled show-score text-color="#ff9900" score-template="{value}"> </el-rate>
    </div>
  </div>
</template>

<script>
//import * as util from '@/main/assets/util';

export default {
  data() {
    return {
      value1: null,
      value2: null,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      value: null,
      value3: null,
      value4: 3.7,
      iconClasses: ["el-icon-sunrise", "el-icon-sunrise-1", "el-icon-sunny"], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.block:last-child {
  border: none;
}
</style>
