<template>
  <div class="input-password">
    <el-input
      :name="name"
      :value="myValue"
      :placeholder="placeholder"
      :size="size"
      :maxlength="maxlength"
      :minlength="minlength"
      :suffix-icon="suffixIcon"
      :prefix-icon="prefixIcon"
      :autocomplete="autocomplete"
      :show-password="showPassword"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      :autofocus="autofocus"
      @paste.native.capture.prevent="false"
      @copy.native.capture.prevent="false"
      @cut.native.capture.prevent="false"
      @input="handleInput"
    >
      <div slot="append" v-if="myValue">
        <div class="_text" :style="scoreStyle.textStyle">
          {{ format(score) }}
        </div>
        <div class="_progress">
          <div class="_bar" :style="scoreStyle.progressStyle"></div>
        </div>
      </div>
    </el-input>
  </div>
</template>

<script>
import { checkPassword } from "./assets/checkpassword";

export default {
  name: "input-password",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    name: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      type: [String, Number],
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "请输入密码",
    },
    size: {
      /**组件大小 */
      type: String,
      required: false,
      default: "",
    },
    minlength: {
      /**密码最小位数 */
      type: Number,
      require: false,
      default: 6,
    },
    maxlength: {
      /**密码最大位数 */
      type: Number,
      require: false,
      default: 16,
    },
    suffixIcon: {
      /**后缀图标 */
      type: String,
      required: false,
      default: "",
    },
    prefixIcon: {
      /**前缀图标 */
      type: String,
      required: false,
      default: "",
    },
    autocomplete: {
      /**自动补全 */
      type: String,
      required: false,
      default: "off",
    },
    showPassword: {
      /**是否显示切换密码图标 */
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      /**禁用 */
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      /**只读 */
      type: Boolean,
      required: false,
      default: false,
    },
    clearable: {
      /**是否显示清空图标 */
      type: Boolean,
      required: false,
      default: false,
    },
    autofocus: {
      /**自动获取焦点 */
      type: Boolean,
      required: false,
      default: false,
    },
    format: {
      type: Function,
      required: false,
      default(percentage) {
        if (percentage >= 0 && percentage < 25) {
          return "弱";
        } else if (percentage >= 25 && percentage < 50) {
          return "中";
        } else if (percentage >= 50 && percentage < 75) {
          return "强";
        } else {
          return "很强";
        }
      },
    },
    color: {
      type: Array,
      required: false,
      default() {
        return ["#F56C6C", "#E6A23C", "#9fcc8a", "#67c23a"];
      },
    },
  },
  data() {
    return {
      myValue: null,
    };
  },
  computed: {
    // 密码强度得分
    score() {
      return checkPassword(this.myValue, this.minlength).nScore;
    },
    scoreStyle() {
      let targetIndex;
      for (let i = 0; i < this.color.length; i++) {
        const maxScore = parseInt(((i + 1) / this.color.length) * 100);
        const minScore = parseInt((i / this.color.length) * 100);
        if (this.score < maxScore && this.score >= minScore) {
          targetIndex = i;
          break;
        }
      }
      return {
        textStyle: {
          color: this.color[targetIndex],
        },
        progressStyle: {
          width: `${parseInt(((targetIndex + 1) / this.color.length) * 100)}%`,
          background: `linear-gradient(
            to right,
            ${this.color[targetIndex]},
            ${this.color[targetIndex]} 12px,
            transparent 12px,
            transparent
          ) 0  0/16px 100%`,
        },
      };
    },
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
        this.$emit("change", this.myValue);
      },
      immediate: true,
    },
  },
  methods: {
    handleInput(newVal) {
      if (newVal === null || newVal === void 0) {
        return null;
      }
      this.myValue = newVal
        .toString()
        .trim()
        .replace(/[^a-zA-Z0-9!@#$%^&*(),./]/g, "");
      this.$emit("verify", this.score);
    },
  },
};
</script>

<style scoped>
.input-password {
  display: flex;
}
.input-password .el-input {
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
}
.input-password >>> .el-input-group__append {
  background: #fcfcfc;
  padding: 0 12px;
}
.input-password ._text {
  text-align: center;
  font-size: 12px;
  line-height: 1;
  margin-bottom: 6px;
}
.input-password ._progress {
  position: relative;
  width: 60px;
  height: 4px;
  background: linear-gradient(
    to right,
    #d8d8d8,
    #d8d8d8 12px,
    transparent 12px,
    transparent
  );
  background-size: 16px 100%;
}
.input-password ._bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
</style>
