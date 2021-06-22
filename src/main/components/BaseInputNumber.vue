<template>
  <el-input
    :value="myValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :readonly="readonly"
    @input="handleInput"
    @change="handleChange($event, true)"
  ></el-input>
</template>

<script>
export default {
  name: "el-number",
  props: {
    value: {
      /*外部传值*/
      type: [String, Number],
      require: false,
      default: "",
    },
    range: {
      /*控制输入区间*/
      type: Array,
      require: false,
      default: () => {
        return [];
      },
    },
    decimals: {
      /*保留小数位*/
      type: Number,
      require: false,
      default: 0,
    },
    round: {
      /*是否四舍五入*/
      type: Boolean,
      require: false,
      default: false,
    },
    zeroFill: {
      /*是否补零*/
      type: Boolean,
      require: false,
      default: false,
    },
    placeholder: {
      type: String,
      require: false,
      default: "请输入",
    },
    disabled: {
      type: Boolean,
      require: false,
      default: false,
    },
    size: {
      type: String,
      require: false,
      default: "",
    },
    readonly: {
      type: Boolean,
      require: false,
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
        this.myValue = newVal;
      },
      immediate: true,
    },
    myValue: {
      handler() {
        this.$emit("input", this.myValue);
      },
      immediate: true,
    },
  },
  methods: {
    fillZero(result) {
      // 补零
      if (result === null || result === void 0 || result === '') {
        return null;
      }

      const dec = this.decimals;

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
      if (this.zeroFill && this.decimals > 0) {
        this.$nextTick(() => {
          this.myValue = this.fillZero(this.myValue);
        });
      }
    },
    handleInput(newVal) {
      if (newVal === null || newVal === void 0) {
        return null;
      }
      let n = newVal
        .toString()
        .trim()
        .replace(/[^\d.-]/g, "") // 过滤非数字，非"."，非"-"
        .replace(/\./, "$#$") // 只保留第一个.
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^-/, "$#$") // 只保留开头的-
        .replace(/-/g, "")
        .replace("$#$", "-");
      // 输入区间校验
      if (Array.isArray(this.range) && this.range.length === 2) {
        const rangeNumber = this.range.map((e) => parseFloat(e));
        if (!isNaN(rangeNumber[0]) && n < rangeNumber[0]) {
          n = rangeNumber[0];
        }
        if (!isNaN(rangeNumber[1]) && n > rangeNumber[1]) {
          n = rangeNumber[1];
        }
      }
      // 小数位数处理
      this.myValue = this.retainDecimal(n, this.decimals);
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
          Math.round(Math.round(parseFloat(num) * Math.pow(10, dec))) / Math.pow(10, dec);
      } else {
        result =
          Math.floor(Math.round(parseFloat(num) * Math.pow(10, dec))) / Math.pow(10, dec);
      }
      result = result.toString();

      return result;
    },
  },
};
</script>

<style scoped>
</style>