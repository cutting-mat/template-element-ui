<template>
  <div class="password-container">
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
      @paste.native.capture.prevent="false;"
      @copy.native.capture.prevent="false;"
      @cut.native.capture.prevent="false;"
      @input="handleInput"
    ></el-input>
    <span class="label" v-if="myValue">{{format(score)}}</span>
  </div>
</template>

<script>
/**
 * 最少6位字符
 * 最少符合下列四项规则中的三项:
 * - 大写字母
 * - 小写字母
 * - 数字
 * - 特殊符号
 */
const strReverse = function (str) {
  let newstring = "";
  for (let s = 0; s < str.length; s++) {
    newstring = str.charAt(s) + newstring;
  }
  return newstring;
};

const checkPassword = function (pwd, nMinPwdLen) {
  // Simultaneous variable declaration and value assignment aren't supported in IE apparently
  // so I'm forced to assign the same value individually per var to support a crappy browser *sigh*
  let nScore = 0,
    nLength = 0,
    nAlphaUC = 0,
    nAlphaLC = 0,
    nNumber = 0,
    nSymbol = 0,
    nMidChar = 0,
    nRequirements = 0,
    nAlphasOnly = 0,
    nNumbersOnly = 0,
    nUnqChar = 0,
    nRepChar = 0,
    nRepInc = 0,
    nConsecAlphaUC = 0,
    nConsecAlphaLC = 0,
    nConsecNumber = 0,
    nConsecSymbol = 0,
    nConsecCharType = 0,
    nSeqAlpha = 0,
    nSeqNumber = 0,
    nSeqSymbol = 0,
    nSeqChar = 0,
    nReqChar = 0,
    nMultConsecCharType = 0,
    category = 0; // Types of Statistical Characters
  let nMultMidChar = 2,
    nMultConsecAlphaUC = 2,
    nMultConsecAlphaLC = 2,
    nMultConsecNumber = 2;
  let nMultSeqAlpha = 3,
    nMultSeqNumber = 3,
    nMultSeqSymbol = 3;
  let nMultLength = 4,
    nMultNumber = 4;
  let nMultSymbol = 6;
  let nTmpAlphaUC = "",
    nTmpAlphaLC = "",
    nTmpNumber = "",
    nTmpSymbol = "";
  let sAlphas = "abcdefghijklmnopqrstuvwxyz";
  let sNumerics = "01234567890";
  let sSymbols = "~!@#$%^&*()_+,./";
  nMinPwdLen = nMinPwdLen || 6;

  if (pwd) {
    nScore = parseInt(pwd.length * nMultLength);
    nLength = pwd.length;
    let arrPwd = pwd.replace(/\s+/g, "").split(/\s*/);
    let arrPwdLen = arrPwd.length;

    /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
    for (let a = 0; a < arrPwdLen; a++) {
      if (arrPwd[a].match(/[A-Z]/g)) {
        // 匹配大写字母
        if (nTmpAlphaUC !== "") {
          if (nTmpAlphaUC + 1 == a) {
            nConsecAlphaUC++;
            nConsecCharType++;
          }
        }
        nTmpAlphaUC = a;
        nAlphaUC++;
      } else if (arrPwd[a].match(/[a-z]/g)) {
        // 匹配小写字母
        if (nTmpAlphaLC !== "") {
          if (nTmpAlphaLC + 1 == a) {
            nConsecAlphaLC++;
            nConsecCharType++;
          }
        }
        nTmpAlphaLC = a;
        nAlphaLC++;
      } else if (arrPwd[a].match(/[0-9]/g)) {
        // 匹配数字
        if (a > 0 && a < arrPwdLen - 1) {
          nMidChar++;
        }
        if (nTmpNumber !== "") {
          if (nTmpNumber + 1 == a) {
            nConsecNumber++;
            nConsecCharType++;
          }
        }
        nTmpNumber = a;
        nNumber++;
      } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
        if (a > 0 && a < arrPwdLen - 1) {
          nMidChar++;
        }
        if (nTmpSymbol !== "") {
          if (nTmpSymbol + 1 == a) {
            nConsecSymbol++;
            nConsecCharType++;
          }
        }
        nTmpSymbol = a;
        nSymbol++;
      }
      /* Internal loop through password to check for repeat characters */
      let bCharExists = false;
      for (let b = 0; b < arrPwdLen; b++) {
        if (arrPwd[a] == arrPwd[b] && a != b) {
          /* repeat character exists */
          bCharExists = true;
          /* 
              Calculate icrement deduction based on proximity to identical characters
              Deduction is incremented each time a new match is discovered
              Deduction amount is based on total password length divided by the
              difference of distance between currently selected match
              */
          nRepInc += Math.abs(arrPwdLen / (b - a));
        }
      }
      if (bCharExists) {
        nRepChar++;
        nUnqChar = arrPwdLen - nRepChar;
        nRepInc = nUnqChar ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
      }
    }

    /* Check for sequential alpha string patterns (forward and reverse) */
    for (let s = 0; s < 23; s++) {
      let sFwd = sAlphas.substring(s, parseInt(s + 3));
      let sRev = strReverse(sFwd);
      if (
        pwd.toLowerCase().indexOf(sFwd) != -1 ||
        pwd.toLowerCase().indexOf(sRev) != -1
      ) {
        nSeqAlpha++;
        nSeqChar++;
      }
    }

    /* Check for sequential numeric string patterns (forward and reverse) */
    for (let s = 0; s < 8; s++) {
      let sFwd = sNumerics.substring(s, parseInt(s + 3));
      let sRev = strReverse(sFwd);
      if (
        pwd.toLowerCase().indexOf(sFwd) != -1 ||
        pwd.toLowerCase().indexOf(sRev) != -1
      ) {
        nSeqNumber++;
        nSeqChar++;
      }
    }

    /* Check for sequential symbol string patterns (forward and reverse) */
    for (let s = 0; s < 8; s++) {
      let sFwd = sSymbols.substring(s, parseInt(s + 3));
      let sRev = strReverse(sFwd);
      if (
        pwd.toLowerCase().indexOf(sFwd) != -1 ||
        pwd.toLowerCase().indexOf(sRev) != -1
      ) {
        nSeqSymbol++;
        nSeqChar++;
      }
    }

    /* Modify overall score value based on usage vs requirements */
    /* General point assignment */
    if (nAlphaUC > 0 && nAlphaUC < nLength) {
      nScore = parseInt(nScore + (nLength - nAlphaUC) * 2);
    }
    if (nAlphaLC > 0 && nAlphaLC < nLength) {
      nScore = parseInt(nScore + (nLength - nAlphaLC) * 2);
    }
    if (nNumber > 0 && nNumber < nLength) {
      nScore = parseInt(nScore + nNumber * nMultNumber);
    }
    if (nSymbol > 0) {
      nScore = parseInt(nScore + nSymbol * nMultSymbol);
    }
    if (nMidChar > 0) {
      nScore = parseInt(nScore + nMidChar * nMultMidChar);
    }
    /* Point deductions for poor practices */
    if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {
      // Only Letters
      nScore = parseInt(nScore - nLength);
      nAlphasOnly = nLength;
    }
    if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {
      // Only Numbers
      nScore = parseInt(nScore - nLength);
      nNumbersOnly = nLength;
    }
    /* Types of Statistical Characters */
    if(nAlphaLC > 0) category++;
    if(nAlphaUC > 0) category++;
    if(nSymbol > 0) category++;
    if(nNumber > 0) category++;

    if (nRepChar > 0) {
      // Same character exists more than once
      nScore = parseInt(nScore - nRepInc);
    }
    /* Consecutive */
    if (nConsecAlphaUC > 0) {
      // Consecutive Uppercase Letters exist
      nScore = parseInt(nScore - nConsecAlphaUC * nMultConsecAlphaUC);
    }
    if (nConsecAlphaLC > 0) {
      // Consecutive Lowercase Letters exist
      nScore = parseInt(nScore - nConsecAlphaLC * nMultConsecAlphaLC);
    }
    if (nConsecNumber > 0) {
      // Consecutive Numbers exist
      nScore = parseInt(nScore - nConsecNumber * nMultConsecNumber);
    }
    /**存在连续字符串包括字母、数字、特殊字符 */
    if (nSeqAlpha > 0) {
      // Sequential alpha strings exist (3 characters or more)
      nScore = parseInt(nScore - nSeqAlpha * nMultSeqAlpha);
    }
    if (nSeqNumber > 0) {
      // Sequential numeric strings exist (3 characters or more)
      nScore = parseInt(nScore - nSeqNumber * nMultSeqNumber);
    }
    if (nSeqSymbol > 0) {
      // Sequential symbol strings exist (3 characters or more)
      nScore = parseInt(nScore - nSeqSymbol * nMultSeqSymbol);
    }

    /* Determine if mandatory requirements have been met and set image indicators accordingly */
    let arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
    let arrCharsIds = ["nLength", "nAlphaUC", "nAlphaLC", "nNumber", "nSymbol"];
    let arrCharsLen = arrChars.length;
    for (let c = 0; c < arrCharsLen; c++) {
      let minVal = 0;
      if (arrCharsIds[c] == "nLength") {
        minVal = parseInt(nMinPwdLen - 1);
      }
      if (arrChars[c] == parseInt(minVal + 1)) {
        nReqChar++;
      } else if (arrChars[c] > parseInt(minVal + 1)) {
        nReqChar++;
      }
    }
    nRequirements = nReqChar;
    let nMinReqChars = 4;
    if (pwd.length >= nMinPwdLen) {
      nMinReqChars = 3;
    }
    if (nRequirements > nMinReqChars) {
      // One or more required characters exist
      nScore = parseInt(nScore + nRequirements * 2);
    }
    /* Determine complexity based on overall score */
    if (nScore > 100) {
      nScore = 100;
    } else if (nScore < 0) {
      nScore = 0;
    }
  }
  return {nScore, category};
};
export default {
  name: "el-password",
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
        if (percentage >= 0 && percentage < 20) {
          return "弱";
        } else if (percentage >= 20 && percentage < 40) {
          return "较弱";
        } else if (percentage >= 40 && percentage < 60) {
          return "一般";
        } else if (percentage >= 60 && percentage < 80) {
          return "较强";
        } else {
          return "强";
        }
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
        .replace(/[^a-zA-Z0-9!@#$%^&*(),./]/g,'');
      this.$emit('verify', this.score)
    },
  },
};
</script>

<style scoped>
.password-container {
  display: flex;
}
.password-container .el-input {
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
}
.label {
  padding: 0 6px;
}
</style>