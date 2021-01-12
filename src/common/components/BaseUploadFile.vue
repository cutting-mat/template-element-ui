<template>
  <el-upload
    :action="uploadUrl"
    :headers="{ Authorization: state.accessToken }"
    :show-file-list="false"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
    :before-upload="handleBeforeUpload"
    :accept="accept"
    :disabled="disabled"
    :multiple="multiple"
  >
    <slot>
      <el-button size="small" type="primary" :disabled="disabled">点击上传</el-button>
    </slot>
  </el-upload>
</template>

<script>
import { upload } from "@/common/api/common";
import * as util from "@/common/assets/util";
import { store } from "@/store";
import {getExtByType} from "../assets/FileType";

export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    accept: {
      type: String,
      required: false,
      default: "*"
    },
    action: {
      type: String,
      required: false,
      default: null
    },
    beforeUpload: {
      type: Function,
      required: false,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      state: store.state,
      uploadUrl: this.action || upload,
    };
  },
  computed: {
    extWhitelist() {
      // 根据accept得到的扩展名白名单
      const typeArray = this.accept.replace(/\./g, '').split(',');
      let result = [];
      typeArray.forEach(type => {
        result = result.concat(getExtByType(type))
      })
      return result
    }
  },
  methods: {
    handleSuccess(res) {
      this.$emit("success", res.data);
    },
    handleError(err) {
      util.catchError(err);
      this.$emit("error", err);
    },
    handleProgress($event) {
      this.$emit("progress", $event);
    },
    handleBeforeUpload(file) {
      // 格式校验
      const fileExt = util.getSuffix(file.name);
      if(this.extWhitelist.findIndex(ext => ext==='*' || (ext===fileExt))===-1){
        this.$message.warning('文件格式错误');
        return false
      }
      
      // 尺寸校验
      const limitSize = 100 * 1024 * 1024; // 100M
      if (file.size > limitSize) {
          this.$message.warning('文件超出最大限制')
          return false
      }

     // 扩展校验方法
    return this.beforeUpload(file)
    },
  },
  created: function () {},
};
</script>

<style scoped>
</style>
