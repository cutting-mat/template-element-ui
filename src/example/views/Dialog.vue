<template>
  <div>
    <h2>基本用法</h2>
    <div class="demo">
      <div class="block">
        <el-button @click="dialogVisible1=true">打开Dialog</el-button>
        <el-dialog
          title="弹窗标题"
          :visible.sync="dialogVisible1"
          width="640px"
          >
          <div style="padding: 5em 0;">
            弹窗通常用来展示相对复杂的弹出式界面，弹出内容样式独立，不受弹窗影响
          </div>
          <div slot="footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      
    </div>

  </div>
</template>

<script>
//import * as util from "@/core";

export default {
  data() {
    return {
      dialogVisible1: false
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
</style>
