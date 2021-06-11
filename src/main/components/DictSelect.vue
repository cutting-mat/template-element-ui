<template>
  <el-select v-model="bindValue"
    :multiple="multiple"
    :disabled="disabled"
    :size="size"
    :clearable="clearable"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    :filterable="filterable"
    :popper-append-to-body="popperAppendToBody"
    @change="$emit('change', $event)"
  >
    <el-option :label="placeholder" :value="null" v-if="nullAble"> </el-option>
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item[labelKey]"
      :value="item[valueKey]"
    >
    </el-option>
  </el-select>
</template>

<script>
import { buildTree } from "@/main/assets/util";
import { itemList } from "@/system/api/dict";

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    dictCode: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: false
    },
    valueKey: {
      type: String,
      required: false,
      default: "id",
    },
    labelKey: {
      type: String,
      required: false,
      default: "value",
    },
    nullAble: {
      type: Boolean,
      required: false,
      default: true
    },
    placeholder: {
      type: String,
      required: false,
      default: "请选择",
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: null
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    collapseTags: {
      type: Boolean,
      required: false,
      default: false
    },
    multipleLimit: {
      type: Number,
      required: false,
      default: 0
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      required: false,
      default: true
    },
  },
  data() {
    return {
      bindValue: null,
      list: [],
    };
  },
  watch: {
    value: {
      handler() {
        if(this.value){
          this.bindValue = this.value;
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchData() {
      itemList(
        {
          dictCode: this.dictCode,
        },
        {
          cache: true,
        }
      ).then((res) => {
        this.list = buildTree(res.data.data);
      });
    },
  },
  created() {
    if (this.dictCode) {
      this.fetchData();
    }
  },
};
</script>

<style scoped>
</style>
