<template>
  <el-upload class="el-upload-image"
    action=""
    :headers="{Authorization: state.accessToken}"
    :show-file-list="false"
    :accept="accept"
    :on-progress="handleProgress"
    :before-upload="beforeUpload"
    :http-request="customUpload"
    :disabled="disabled"
    :multiple="multiple"
  >
    <slot>
      <i class="el-icon-plus avatar-uploader-icon" id="upload_image_trigger"></i>
    </slot>
  </el-upload>
</template>

<script>
import { uploadImg } from "@/common/api/common";
import * as util from "@/common/assets/util";
let { fixImgFile } = require("ios-photo-repair")
import {store} from "@/store"

export default {
  props: {
    multiple: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    accept: {
      type: String,
      required: false,
      default: "image/*",
    },
  },
  data() {
    return {
      state: store.state,
    };
  },
  methods: {
    handleSuccess: function(res) {
      this.$emit("success", res.data);
    },
    handleError: function(err) {
      this.$emit("error", err);
    },
    handleProgress($event) {
      this.$emit("progress", $event);
    },
    beforeUpload: function(file) {
      const imgExt = ["jpg", "jpeg", "png"];
      const ext = util.getSuffix(file.name);
      if(ext && imgExt.indexOf(ext)!==-1){
        return true
      }
      this.$message.warning('文件格式错误');
      return false;
    },
    customUpload: function(params){
      //console.log(params)
      fixImgFile(params.file, {
        width: 1000,
        height: 1000
      }).then(base64 => {
        const name = params.file.name.split('.')[0]+'.png';
        if(base64 && name){
          uploadImg({
            base64,
            name
          }).then(res => {
            this.handleSuccess(res.data)
          }).catch((err) => {
            this.handleError(err)
          })
        }else{
          console.warn('error', base64, name)
        }
      })
    }
  },
  created: function() {}
};
</script>

<style scoped>
.el-upload-image{
  display:inline-block;
  vertical-align: top;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 6px;
  border:1px solid #dedede;
}

</style>

