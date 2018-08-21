<template>
  <div>
    <el-button @click="$router.push({name: '空白'})">Button</el-button>
  </div>
</template>

<script>
import * as util from "../assets/util";
//import * as home from "../api/home";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    fetchData: function(){
      this.$message('fetch')
    }
  },
  created: function() {
    this.fetchData()
  }
};
</script>

<style>

</style>
