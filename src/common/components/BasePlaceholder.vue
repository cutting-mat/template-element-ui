<template>
  <div class="placeholder">
    {{ message }}
  </div>
</template>

<script>

export default {
  props: {
    message: {
      type: String,
      required: false,
      default: "暂无数据"
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>

.placeholder {
    text-align: center;
    margin: 20px 0
}
</style>
