<template>
  <div class="flex-col align-center justify-center">
    <img src="../assets/img/404.png" alt="" />
    <div>
      {{$route.query.message || '服务异常'}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerError",
  
};
</script>
