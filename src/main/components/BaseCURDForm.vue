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
        validator: genItemValid(key),
        message: model[key].message,
      }"
    >
      <component v-if="model[key].type==='string'"
        :is="model[key].control"
        v-model.trim="editForm[key]"
        v-bind="model[key].controlOption"
      ></component>
      <component v-else-if="model[key].type==='number'"
        :is="model[key].control"
        v-model.number="editForm[key]"
        v-bind="model[key].controlOption"
      ></component>
      <component v-else
        :is="model[key].control"
        v-model.number="editForm[key]"
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
      required: true,
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
      return Object.keys(this.model).filter((key) => {
        return this.model[key].scope.indexOf(this.action) !== -1;
      });
    },
  },
  methods: {
    validate(callback) {
      return this.$refs.editForm.validate(callback);
    },
    validateField(props, callback){
      return this.$refs.editForm.validateField(props, callback);
    },
    resetFields(){
      return this.$refs.editForm.resetFields();
    },
    clearValidate() {
      return this.$refs.editForm.clearValidate();
    },
    genItemValid(key) {
      if(typeof(this.model[key].validator)==='function'){
        return (rule, value, callback) => {
          this.model[key].validator(this.editForm, value, callback);
        };
      }
      return this.model[key].validator
    },
  },
};
</script>

<style scoped>
</style>
