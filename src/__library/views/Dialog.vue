<template>
  <div>
    <h2>基本用法</h2>
    <div class="demo">
      <div class="block">
        <el-button @click="dialogVisible1=true">打开Dialog</el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible1"
          width="30%"
          >
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      
    </div>

  </div>
</template>

<script>
//import * as util from "@/common/assets/util";

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
