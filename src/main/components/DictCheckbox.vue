<template>
  <el-checkbox-group v-model="bindValue"
    :disabled="disabled"
    :border="border"
    :size="size"
    @change="$emit('change', $event)"
  >
    <el-checkbox :label="null" v-if="nullAble">
      {{placeholder}}
    </el-checkbox>
    <el-checkbox
      v-for="item in list"
      :key="item.value"
      :label="item[valueKey]"
    >
      {{item[labelKey]}}
    </el-checkbox>
  </el-checkbox-group>
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
      type: Array,
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
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: "请选择",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: null
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
