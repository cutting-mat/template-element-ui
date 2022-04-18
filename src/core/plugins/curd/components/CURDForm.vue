<template>
  <el-form
    ref="editForm"
    :model="editForm"
    v-bind="
      Object.assign(
        {
          size: 'small',
          'label-width': '80px',
        },
        formAttribute
      )
    "
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
      <component
        v-if="model[key].type === 'string'"
        :is="model[key].control"
        v-model.trim="editForm[key]"
        v-bind="model[key].controlOption"
        @change="handleChange(key)"
      ></component>
      <component
        v-else-if="model[key].type === 'number'"
        :is="model[key].control"
        v-model.number="editForm[key]"
        v-bind="model[key].controlOption"
        @change="handleChange(key)"
      ></component>
      <component
        v-else
        :is="model[key].control"
        v-model="editForm[key]"
        v-bind="model[key].controlOption"
        @change="handleChange(key)"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script>
// import { deepcopy } from "@/core";

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
    action: {
      type: String,
      required: false,
      default: "update",
    },
    formAttribute: {
      type: Object,
      required: false,
      default() {
        return {};
      },
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
    validateField(props, callback) {
      return this.$refs.editForm.validateField(props, callback);
    },
    resetFields() {
      return this.$refs.editForm.resetFields();
    },
    clearValidate() {
      return this.$refs.editForm.clearValidate();
    },
    genItemValid(key) {
      if (typeof this.model[key].validator === "function") {
        return (rule, value, callback) => {
          this.model[key].validator(this.editForm, value, callback);
        };
      }
      return this.model[key].validator;
    },
    handleChange(key) {
      // 异步校验
      if (this.model[key].asynValid) {
        this.validateField(key);
      }
    },
  },
};
</script>

<style scoped></style>
