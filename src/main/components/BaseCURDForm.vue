<template>
  <el-form
    size="small"
    ref="editForm"
    :model="editForm"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="key in modelKey"
      :key="key"
      :label="model[key].label"
      :prop="key"
      :rules="{
        type: model[key].type,
        required: model[key].required,
        validator: model[key].validator,
        message: model[key].message,
      }"
    >
      <component
        :is="model[key].control"
        v-model.trim="editForm[key]"
        v-bind="model[key].controlOption"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script>
//import { deepcopy } from "@/main/assets/util";

export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    default: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    labelWidth: {
      type: String,
      required: false,
      default: "80px",
    },
    action: {
      type: String,
      required: false,
      default: "update",
    },
  },
  data() {
    return {
      editForm: this.default,
    };
  },
  computed: {
    modelKey() {
      return Object.keys(this.model).filter(key => {
        return this.model[key].scope.indexOf(this.action)!==-1
      });
    },
    
  },
  methods: {
    validate(callback) {
      return this.$refs.editForm.validate(callback)
    },
  },
};
</script>

<style scoped>
</style>
