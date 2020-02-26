<template>
  <el-input readonly :value="optionsValue" />
</template>

<script>
const defaultProps = {
  value: "value",
  label: "label",
  split: "/"
};

export default {
  props: {
    value: {
      type: [String, Number, Array],
      required: false,
      default: ""
    },
    options: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    props: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      optionsValue: ""
    };
  },
  computed: {
    propsData() {
      return Object.assign({}, defaultProps, this.props || {});
    },
    optionsData() {
      const trans = array => {
        if (Array.isArray(array)) {
          return array.map(e => {
            return {
              value: e[this.propsData.value] || "",
              label: e[this.propsData.label] || "",
              children: trans(e.children)
            };
          });
        } else {
          return array;
        }
      };

      return trans(this.options);
    }
  },
  watch: {
    value: {
      handler(value) {
        if (Array.isArray(value)) {
          let result = [];
          let _catch = this.optionsData;
          for (let i = 0; i < value.length; i++) {
            const v = value[i];
            const targetIndex = _catch.findIndex(e => {
              return e.value === v;
            });
            if (targetIndex !== -1) {
              result.push(_catch[targetIndex].label);
              if (Array.isArray(_catch[targetIndex].children)) {
                _catch = _catch[targetIndex].children;
              } else {
                break;
              }
            } else {
              break;
            }
          }
          this.optionsValue = result.join(this.propsData.split);
        } else if (value !== void 0) {
          const targetIndex = this.optionsData.findIndex(e => {
            return e.value === value;
          });
          if (targetIndex !== -1) {
            this.optionsValue = this.optionsData[targetIndex].label;
          } else {
            this.optionsValue = "";
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>
</style>
