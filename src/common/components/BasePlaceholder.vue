<template>
  <div class="placeholder flex-col align-center justify-center" style="height:100%">
    <div class="flex-1">
      <div class="img" v-if="img">
        <img src="../assets/img/no_data.png" />
      </div>
      <div class="text">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: false,
      default: "暂无数据",
    },
    img: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.placeholder {
  text-align: center;
  margin: 20px 0;
  font-size: 1.71em;
  color: #B6B9C3;
}
.placeholder .text {
  padding-top: 10px;
}
</style>
