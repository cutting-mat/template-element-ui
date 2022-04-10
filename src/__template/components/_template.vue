<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      required: false
    },
  },
  data() {
    return {

    }
  }
};
</script>

<style scoped>
</style>
