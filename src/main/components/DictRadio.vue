<template>
  <el-radio-group v-model="bindValue"
    v-bind="attribute"
    @change="$emit('change', $event)"
  >
    <el-radio :label="null" v-if="nullAble">
      {{placeholder}}
    </el-radio>
    <el-radio
      v-for="item in list"
      :key="item.value"
      :label="item[valueKey]"
    >
      {{item[labelKey]}}
    </el-radio>
  </el-radio-group>
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
      default: false
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
