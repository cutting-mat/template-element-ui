<template>
  <span class="countdown">
    <span v-if="renderNumber">
      {{ format(renderNumber) }}
    </span>
    <slot v-else></slot>
  </span>
</template>

<script>
export default {
  name: "countdown",
  props: {
    count: {
      type: Number,
      required: true,
    },
    format: {
      type: Function,
      default(value) {
        return `${value}s`;
      },
    },
  },
  data() {
    return {
      renderNumber: null,
      timer: null,
    };
  },
  methods: {
    start() {
      return new Promise((resolve) => {
        this.renderNumber = this.count;
        this.timer = setInterval(() => {
          if (this.renderNumber - 1 > 0) {
            this.renderNumber--;
          } else {
            this.reset();
            resolve();
          }
        }, 1000);
      });
    },
    reset() {
      this.timer = clearInterval(this.timer);
      this.renderNumber = null;
    },
  },
};
</script>

<style scoped></style>
