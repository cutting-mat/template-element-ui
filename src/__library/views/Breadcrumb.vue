<template>
  <div>
    <h2>基础样式</h2>
    <div class="demo">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
//import * as util from '@/common/assets/util';

export default {
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
