<template>
  <div v-loading="loading" :element-loading-text="loadingText">
    <el-upload
      :action="upload"
      :headers="{Authorization: state.accessToken}"
      :file-list="files"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :accept="accept"
      v-if="!disabled"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div v-if="files.length">
      <el-tag
        v-for="file in files"
        :key="'file'+file.id"
        :closable="!disabled"
        type="primary"
        disable-transitions
        @click.native="filePreview(file)"
        @close="handleRemove(file, files)"
      >{{file.name}}</el-tag>
    </div>
    <global-placeholder v-else message="暂无" />
  </div>
</template>

<script>
import { upload } from "@/common/api/common";
import * as util from "@/common/assets/util";
import { store } from "@/store";

export default {
  props: {
    propvalue: {
      type: Array,
      required: false,
      default: function() {
        /*
        [{id: '', name: "food.jpeg", url:"..."}]
        */
        return [];
      }
    },
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
      default: '*'
    }
  },
  data() {
    return {
      state: store.state,
      loading: false,
      loadingText: "",
      upload,
      files: []
    };
  },
  watch: {
    propvalue: {
      handler: function(propvalue) {
        this.files = propvalue;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    filePreview: util.filePreview,
    triggerSubmit() {
      const result = this.multiple ? this.files : [this.files[0]];
      this.$emit("change", result);
    },
    handleSuccess(res, file, filelist) {
      this.loading = false;
      if(res && res.data){
        if (this.multiple) {
          this.files.push(res.data);
        } else {
          this.files = [res.data];
        }
        this.triggerSubmit();
      }
    },
    handleRemove(file, filelist) {
      if (this.multiple) {
        if (file.url) {
          this.files = filelist.filter(f => {
            return f.url !== file.url;
          });
        }
      } else {
        this.files.splice(0, 1);
      }
      this.triggerSubmit();
    },
    handleError(err) {
      this.loading = false;
      return util.catchError(err);
    },
    beforeUpload(file) {
      this.loading = true;
      this.loadingText = "";
      const filePass = util.checkUpload(file);
      if (!filePass) {
        this.loading = false;
      }
      return filePass;
    },
    handleProgress(event) {
      this.loadingText = `已上传${parseInt(event.percent, 10)}%`;
    }
  },
  created: function() {}
};
</script>

<style scoped>
.el-tag {
  margin: 0 5px 5px 0;
}
</style>
