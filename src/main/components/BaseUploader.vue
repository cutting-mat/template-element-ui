<template>
  <el-upload
    action=""
    :show-file-list="showFileList"
    :accept="actualAccept"
    :data="data"
    :list-type="listType"
    :file-list="fileList"
    :before-upload="handleBeforeUpload"
    :http-request="customUpload"
    :disabled="disabled"
    :multiple="multiple"
    :limit="limit"
    :on-exceed="handleExceed"
  >
    <div :id="triggerId">
      <slot>
        <el-button size="small" type="primary" :disabled="disabled">
          点击上传
        </el-button>
      </slot>
    </div>
  </el-upload>
</template>

<script>
import { upload, uploadImg } from "@/main/api/common";
import * as util from "@/core";
import { store } from "@/core/store";
import { getExtByType } from "../assets/file-type";
let { fixImgFile } = require("ios-photo-repair");

export default {
  props: {
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    data: {
      type: Object,
      require: false,
      default() {
        return {};
      },
    },
    name: {
      type: String,
      require: false,
      default: "file",
    },
    showFileList: {
      type: Boolean,
      required: false,
      default: true,
    },
    accept: {
      type: String,
      required: false,
      default: "*",
    },
    listType: {
      type: String,
      require: false,
      default: "text",
    },
    fileList: {
      type: Array,
      require: false,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      required: false,
      default: 9
    },
    beforeUpload: {
      type: Function,
      required: false,
      default() {
        return true;
      },
    },
    triggerId: {
      type: String,
      required: false,
      default: "upload_image_trigger" + parseInt(Math.random() * 1e8),
    },
    imgCompress: {
      type: Boolean,
      required: false,
      default: true,
    },
    uploadFunc: {
      type: Function,
      required: false,
      default: upload
    },
    limitSize: {
      type: Number,
      required: false,
      default: 100 * 1024 * 1024  // 100M
    }
  },
  data() {
    return {
      state: store.state,
    };
  },
  computed: {
    actualAccept() {
      if (this.accept.indexOf("t-") !== -1) {
        const typeArray = this.accept.split(",");
        let result = [];
        typeArray.forEach((type) => {
          result = result.concat(getExtByType(type));
        });
        return result.join(",");
      } else {
        return this.accept;
      }
    },
  },
  methods: {
    handleExceed() {
      this.$emit("exceed");
    },
    handleSuccess: function (res) {
      this.$emit("success", res.data);
    },
    handleError: function (err) {
      this.$emit("error", err);
    },
    handleBeforeUpload: function (file) {
      // 格式检查
      const fileExt = util.getSuffix(file.name);
      const extWhite = this.actualAccept.replace(/\./g, "").split(",");
      if (extWhite.findIndex((ext) => ext === "*" || ext === fileExt) === -1) {
        this.$message.warning("文件格式错误");
        return false;
      }
      // 尺寸校验
      if (file.size > this.limitSize) {
        this.$message.warning("文件超出最大限制");
        return false;
      }
      // 扩展校验方法
      return this.beforeUpload(file);
    },
    customUpload: function (params) {
      if (this.imgCompress && params.file.type.indexOf("image/") === 0) {
        // 图片自动压缩
        fixImgFile(params.file, {
          width: 1000,
          height: 1000,
        }).then((base64) => {
          const name = params.file.name.split(".")[0] + ".png";
          if (base64 && name) {
            uploadImg({
              base64,
              name,
            })
              .then((res) => {
                this.handleSuccess(res.data);
              })
              .catch((err) => {
                this.handleError(err);
              });
          } else {
            console.warn("图片压缩error", base64, name);
          }
        });
      } else {
        // 非图片上传
        let formData = new FormData();
        formData.append(this.name, params.file);
        // 扩展数据
        Object.keys(this.data).forEach((key) => {
          formData.append(key, this.data[key]);
        });
        this.uploadFunc(formData)
          .then((res) => {
            this.handleSuccess(res.data);
          })
          .catch((err) => {
            this.handleError(err);
          });
      }
    },
  },
};
</script>

<style scoped>
</style>

