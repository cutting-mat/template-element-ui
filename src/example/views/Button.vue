<template>
  <div>
    <h2>基础样式</h2>
    <div class="demo">
      <div class="block">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </div>
      
      <div class="block">
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </div>

      <div class="block">
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </div>
      <div class="block">
        <el-button round>圆角朴素按钮</el-button>
        <el-button type="primary" plain round>主要按钮</el-button>
        <el-button type="success" plain round>成功按钮</el-button>
        <el-button type="info" plain round>信息按钮</el-button>
        <el-button type="warning" plain round>警告按钮</el-button>
        <el-button type="danger" plain round>危险按钮</el-button>
      </div>

    </div>

    <h2>禁用状态</h2>
    <div class="demo">
      <div class="block">
        <el-button disabled>默认按钮</el-button>
        <el-button type="primary" disabled>主要按钮</el-button>
        <el-button type="success" disabled>成功按钮</el-button>
        <el-button type="info" disabled>信息按钮</el-button>
        <el-button type="warning" disabled>警告按钮</el-button>
        <el-button type="danger" disabled>危险按钮</el-button>
      </div>

      <div class="block">
        <el-button plain disabled>朴素按钮</el-button>
        <el-button type="primary" plain disabled>主要按钮</el-button>
        <el-button type="success" plain disabled>成功按钮</el-button>
        <el-button type="info" plain disabled>信息按钮</el-button>
        <el-button type="warning" plain disabled>警告按钮</el-button>
        <el-button type="danger" plain disabled>危险按钮</el-button>
      </div>
    </div>

    <h2>图标按钮</h2>
    <div class="demo">
      <div class="block">
        <el-button type="primary" icon="el-icon-success">确认</el-button>
        <el-button type="primary" icon="el-icon-receiving">保存</el-button>
        <el-button type="primary" icon="el-icon-s-claim">提交</el-button>
        <el-button type="primary" icon="el-icon-upload">上传</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <el-button type="primary" icon="el-icon-folder-add">新建</el-button>
        <el-button type="primary" icon="el-icon-edit">编辑</el-button>
      </div>
    </div>

    <h2>文字按钮</h2>
    <div class="demo">
      <div class="block">
        <el-button type="text">文字按钮</el-button>
        <el-button type="text" disabled>文字按钮</el-button>
        <el-button type="text" icon="el-icon-success">文字按钮</el-button>
        
      </div>
    </div>

    <h2>不同尺寸</h2>
    <div class="demo">
      <div class="block">
        <el-button>默认按钮</el-button>
        <el-button size="medium">中等按钮</el-button>
        <el-button size="small">小型按钮</el-button>
        <el-button size="mini">超小按钮</el-button>
      </div>

      <div class="block">
        <el-button round>默认按钮</el-button>
        <el-button size="medium" round>中等按钮</el-button>
        <el-button size="small" round>小型按钮</el-button>
        <el-button size="mini" round>超小按钮</el-button>
      </div>
    </div>


  </div>
</template>

<script>
//import * as util from "@/core";

export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
</style>
