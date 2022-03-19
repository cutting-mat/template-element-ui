<template>
  <div class="flex-col align-center justify-center errPage">
    <div class="flex-3 _image flex-row align-center">
      <img src="../assets/img/404.png" alt="" />
    </div>
    <div class="flex-1 _cont">
      <h2 class="_title">
        访问的页面不存在
      </h2>
      <p class="_desc">服务器没有找到您要访问的页面，可能这个页面并不存在您可以选择返回上一页</p>
      <el-button size="small" type="primary" @click="$router.go(-1)">
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.errPage ._image {
  overflow: hidden;
  margin: 20px;
}
.errPage ._image img{
  max-height: 100%;
}
.errPage ._cont{
  text-align: center;
  min-height: 120px;
}
.errPage ._title{
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}
.errPage ._desc{
  color: #888;
  margin-bottom: 30px;
}
</style>