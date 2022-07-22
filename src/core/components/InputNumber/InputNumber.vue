<template>
  <el-input
    :value="myValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :readonly="readonly"
    @input="handleInput"
    @change="handleChange($event, true)"
  >
    <template slot="prepend">
      <slot name="prepend"></slot>
    </template>
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-input>
</template>

<script>
export default {
  name: "input-number",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      /* 外部传值 */
      type: [String, Number],
      required: false,
      default: "",
    },
    min: {
      type: Number,
      required: false,
      default: -Infinity,
    },
    max: {
      type: Number,
      required: false,
      default: Infinity,
    },
    precision: {
      /* 保留小数位 */
      type: Number,
      required: false,
      default: 0,
    },
    round: {
      /* 是否四舍五入 */
      type: Boolean,
      required: false,
      default: false,
    },
    zeroFill: {
      /* 是否补零 */
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "请输入",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: "",
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      myValue: null,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        let inputValue = newVal;
        if (!isNaN(parseFloat(inputValue))) {
          if (inputValue < this.min && this.myValue !== "") {
            inputValue = this.min;
          }
          if (inputValue > this.max) {
            inputValue = this.max;
          }
        }

        this.myValue = inputValue;
      },
      immediate: true,
    },
    myValue: {
      handler() {
        this.$emit("change", this.myValue);
      },
      immediate: true,
    },
  },
  methods: {
    fillZero(result) {
      // 补零
      if (result === null || result === void 0 || result === "") {
        return null;
      }

      const dec = this.precision;

      if (result.split && this.zeroFill && dec > 0) {
        const pointIndex = result.indexOf(".");
        let zeroLength;
        if (pointIndex === -1) {
          zeroLength = dec;
          result += ".";
        } else {
          zeroLength = dec - (result.length - 1 - pointIndex);
        }

        for (let i = 0; i < zeroLength; i++) {
          result += "0";
        }
      }
      return result;
    },
    handleChange() {
      let inputValue = this.myValue;
      // 输入区间校验
      if (inputValue < this.min && this.myValue !== "") {
        inputValue = this.min;
      }
      if (inputValue > this.max) {
        inputValue = this.max;
      }
      // 小数位数处理
      this.myValue = this.retainDecimal(inputValue, this.precision);
      // 补零
      if (this.zeroFill && this.precision > 0) {
        this.$nextTick(() => {
          this.myValue = this.fillZero(this.myValue);
        });
      }
    },
    handleInput(newVal) {
      if (newVal === null || newVal === void 0) {
        return null;
      }
      this.myValue = newVal
        .toString()
        .trim()
        .replace(/[^\d.-]/g, "") // 过滤非数字, 非".", 非"-"
        .replace(/\./, "$#$") // 只保留第一个.
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^-/, "$#$") // 只保留开头的-
        .replace(/-/g, "")
        .replace("$#$", "-");
    },
    retainDecimal(num, dec) {
      // dec合法性校验
      if (dec < 0) {
        dec = 0;
      }
      // .在末尾的情况
      if (num.split && num.indexOf(".") === num.length - 1 && dec > 0) {
        return num;
      }
      // -在末尾的情况
      if (num.split && num.indexOf("-") === num.length - 1) {
        return num;
      }

      // 过滤非法输入
      if (isNaN(parseFloat(num))) {
        return null;
      }
      // 小数点位数保留
      let result;
      if (this.round) {
        result =
          Math.round(Math.round(parseFloat(num) * Math.pow(10, dec))) /
          Math.pow(10, dec);
      } else {
        result =
          Math.floor(Math.round(parseFloat(num) * Math.pow(10, dec))) /
          Math.pow(10, dec);
      }
      result = result.toString();

      return result;
    },
  },
};
</script>

<style scoped></style>
