<template>
  <el-upload
    :action="upload"
    :headers="{ Authorization: state.accessToken }"
    :show-file-list="false"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
    :before-upload="beforeUpload"
    :accept="accept"
    :disabled="disabled"
    :multiple="multiple"
  >
    <slot>
      <el-button size="small" type="primary">点击上传</el-button>
    </slot>
  </el-upload>
</template>

<script>
import { upload } from "@/common/api/common";
import * as util from "@/common/assets/util";
import { store } from "@/store";

export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    accept: {
      type: String,
      required: false,
      default: "*",
    },
  },
  data() {
    return {
      state: store.state,
      loading: false,
      upload,
    };
  },
  methods: {
    handleSuccess(res) {
      this.loading = false;
      this.$emit("success", res.data);
    },
    handleError(err) {
      this.loading = false;
      return util.catchError(err);
    },
    handleProgress($event) {
      this.$emit("progress", $event);
    },
    beforeUpload(file) {
      this.loading = true;
      const filePass = util.checkUpload(file);
      if (!filePass) {
        this.loading = false;
      }
      return filePass;
    },
  },
  created: function () {},
};
</script>

<style scoped>
</style>
