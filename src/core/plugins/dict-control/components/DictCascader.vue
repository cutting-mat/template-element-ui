<template>
  <el-cascader
    v-bind="$attrs"
    v-model="bindValue"
    :options="list"
    :props="{
      value: this.valueKey,
      label: this.labelKey,
    }"
    @change="$emit('change', $event)"
  ></el-cascader>
</template>

<script>
import Vue from "vue";
import { getDefaultValue } from "../assets/util";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Array,
      required: false,
    },
    valueKey: {
      type: String,
      required: false,
      default() {
        return getDefaultValue("valueKey", "value");
      },
    },
    labelKey: {
      type: String,
      required: false,
      default() {
        return getDefaultValue("labelKey", "label");
      },
    },
    nullAble: {
      type: Boolean,
      required: false,
      default() {
        return getDefaultValue("nullAble", true);
      },
    },
    request: {
      type: Function,
      required: false,
    },
    param: {
      type: String,
      required: false,
      default() {
        return getDefaultValue("param", undefined);
      },
    },
    responseTransfer: {
      type: Function,
      required: false,
      default(response) {
        if (
          Vue.$DictControl &&
          typeof Vue.$DictControl.responseTransfer === "function"
        ) {
          return Vue.$DictControl.responseTransfer(response);
        } else {
          return response;
        }
      },
    },
  },
  data() {
    return {
      bindValue: [],
      list: [],
    };
  },
  watch: {
    value: {
      handler() {
        if (this.value) {
          this.bindValue = this.value;
        }
      },
      immediate: true,
    },
  },
  methods: {
    fetchData: async function () {
      if (!Vue.$DictControl && !Vue.$DictControl.request && !this.request) {
        return console.warn(
          "DictControl: The required configuration [request] is missing!"
        );
      }

      const DataRequest = this.request || Vue.$DictControl.request;
      if (typeof DataRequest !== "function") {
        return console.warn("DictControl: [request] must be a Function!");
      }
      this.list = this.responseTransfer(await DataRequest(this.param));
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
