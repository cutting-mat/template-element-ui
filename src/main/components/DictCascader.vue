<template>
  <el-cascader v-model="bindValue"
    :options="list"
    :props="useProps"
    :multiple="multiple"
    :disabled="disabled"
    :size="size"
    :placeholder="placeholder"
    :clearable="clearable"
    :show-all-levels="showAllLevels"
    :collapse-tags="collapseTags"
    :separator="separator"
    :filterable="filterable"
    :filter-method="filterMethod"
    :debounce="debounce"
    :before-filter="beforeFilter"
    @change="$emit('change', $event)"
  >
  </el-cascader>
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
      default: true
    },
    props: {
      type: Object,
      required: false,
      default() {
        return {}
      }
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
    showAllLevels: {
      type: Boolean,
      required: false,
      default: true
    },
    collapseTags: {
      type: Boolean,
      required: false,
      default: false
    },
    separator: {
      type: String,
      required: false,
      default: '/'
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false
    },
    filterMethod: {
      type: Function,
      required: false
    },
    debounce: {
      type: Number,
      required: false,
      default: 300
    },
    beforeFilter: {
      type: Function,
      required: false,
    },
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
