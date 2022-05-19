<template>
  <el-dialog
    append-to-body
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">验证身份（{{ currentAuthType.title }}）</div>
    <el-alert
      title="为确保您的账号安全，请先验证身份"
      type="success"
      show-icon
      :closable="false"
      style="margin-bottom: 20px"
    ></el-alert>
    <component
      :is="currentAuthType.name"
      :command="command"
      @success="handleSuccess"
    />
    <div class="otherType" v-if="otherTypes.length">
      <ul class="flex-row">
        <li
          v-for="(type, index) in otherTypes"
          :key="index"
          class="flex-1 _item"
          :title="type.title"
          @click="currentAuthType = type"
        >
          <div class="_ico">
            <img :src="type.icon" />
          </div>
          {{ type.title }}
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import AlluthTypes from "../config";
let components = {};
AlluthTypes.forEach((type) => [(components[type.name] = type.component)]);

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    types: {
      type: Array,
      required: false,
      default() {
        return AlluthTypes.map((e) => e.name);
      },
    },
    command: {
      type: String,
      required: false,
      default: "common", // reset
    },
  },
  components,
  data() {
    return {
      authTypes: [],
      dialogVisible: false,
      currentAuthType: null,
      result: null,
    };
  },
  computed: {
    otherTypes() {
      return this.authTypes.filter((type) => {
        return type.name !== this.currentAuthType.name;
      });
    },
  },
  watch: {
    types: {
      handler() {
        this.authTypes = AlluthTypes.filter((item) => {
          return this.types.indexOf(item.name) !== -1;
        });
        this.currentAuthType = this.authTypes[0];
      },
      immediate: true,
    },
    value: {
      handler() {
        if (this.currentAuthType) {
          this.dialogVisible = this.value;
        }
      },
      immediate: true,
    },
    dialogVisible: {
      handler() {
        this.$emit("change", this.dialogVisible);
      },
    },
  },
  methods: {
    handleSuccess(authCode) {
      this.result = authCode;
      this.dialogVisible = false;
      this.$emit("success", authCode);
    },
    auth() {
      if (this.dialogVisible !== true) {
        this.result = null;
        this.dialogVisible = true;
        return new Promise((resolve) => {
          this.$watch("result", resolve);
        });
      }
    },
  },
};
</script>

<style scoped>
.otherType {
  position: relative;
  margin: 40px 0 20px;
  border-top: 1px solid #dedede;
  padding-top: 20px;
  text-align: center;
}
.otherType::before {
  content: "其他验证方式";
  position: absolute;
  left: 50%;
  top: -1.5em;
  margin-left: -4em;
  width: 8em;
  background: #fff;
  height: 3em;
  line-height: 3em;
}
.otherType ._item {
  font-size: 12px;
  cursor: pointer;
}
.otherType ._ico {
  width: 40px;
  height: 40px;
  margin: auto;
}
.otherType ._ico img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
