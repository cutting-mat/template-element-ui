<template>
  <el-select v-model="bindValue"
    v-bind="attribute"
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
import { util } from "@/core";
import { itemList } from "@/system/api/dict";

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    load: {
      type: [String, Function],
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
    attribute: {
      type: Object,
      required: false,
      default(){
        return {}
      }
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
    fetchDict() {
      itemList(
        {
          dictCode: this.load,
        },
        {
          cache: true,
        }
      ).then((res) => {
        this.list = util.buildTree(res.data.data);
      });
    },
    fetchRemoteData: async function() {
      this.list = await this.load()
    }
  },
  created() {
    if (this.load && this.load.split) {
      this.fetchDict();
    } else if(typeof this.load === 'function'){
      this.fetchRemoteData()
    }
  },
};
</script>

<style scoped>
</style>
