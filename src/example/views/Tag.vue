<template>
  <div>
    <h2>基础用法</h2>
    <div class="demo">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
    </div>
    <h2>可移除</h2>
    <div class="demo">
      <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
        {{ tag.name }}
      </el-tag>
    </div>
    <h2>不同主题</h2>
    <div class="demo">
      <div class="tag-group">
        <span class="tag-group__title">Dark</span>
        <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="dark">
          {{ item.label }}
        </el-tag>
      </div>
      <div class="tag-group">
        <span class="tag-group__title">Plain</span>
        <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain">
          {{ item.label }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
//import * as util from '@/core';

export default {
  data() {
    return {
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" },
      ],
      items: [
        { type: "", label: "标签一" },
        { type: "success", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "danger", label: "标签四" },
        { type: "warning", label: "标签五" },
      ],
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.demo span {
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
