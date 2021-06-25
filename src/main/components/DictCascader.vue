<template>
  <el-cascader v-model="bindValue"
    :options="list"
    :props="{
      value: this.valueKey,
      label: this.labelKey
    }"
    v-bind="attribute"
    @change="$emit('change', $event)"
  >
  </el-cascader>
</template>

<script>
import { buildTree } from "@/core";
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
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      bindValue: null,
      list: [],
    };
  },
  computed: {
    useProps() {
      return Object.assign({
        value: this.valueKey,
        label: this.labelKey
      }, this.props)
    }
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
        this.list = buildTree(res.data.data);
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
