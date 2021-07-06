<template>
  <div>
    <h2>基本用法</h2>
    <p>标题不设置，默认为`消息提示`</p>
    <div class="demo">
      <div class="block">
        <el-button @click="openMessage()">消息提示</el-button>
        <el-button @click="openConfirm()">确认消息</el-button>
        <el-button @click="openPrompt()">提交内容</el-button>
      </div>
    </div>
    <h2>消息类型</h2>
    <div class="demo">
      <div class="block">
        <el-button type="success" @click="openType('success')">成功</el-button>
        <el-button type="info" @click="openType('info')">信息</el-button>
        <el-button type="warning" @click="openType('warning')">警告</el-button>
        <el-button type="danger" @click="openType('error')">错误</el-button>
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
  methods: {
    openMessage() {
      this.$alert('这是一段内容');
    },
    openConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示')
    },
    openPrompt() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      })
    },
    openType(type) {
      this.$alert('这是一段内容', {
        type
      });
    }
  },
  created() {}
};
</script>

<style scoped>

</style>
