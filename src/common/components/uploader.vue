<template>
  <div v-loading="loading" :element-loading-text="loadingText">
    <elUploadFile 
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @progress="handleProgress"
      @success="handleSuccess"
    />
    <div v-if="showFileList">
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
import * as util from "@/common/assets/util";
import elUploadFile from '../components/elUploadFile'

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
    showFileList: {
      type: Boolean,
      required: false,
      default: false
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
  components: {
    elUploadFile
  },
  data() {
    return {
      loading: false,
      loadingText: "",
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
      this.$emit("change", this.files);
    },
    handleSuccess(file) {
      this.loading = false;
      this.files.push(file);
      this.triggerSubmit()
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
    handleProgress(event) {
      this.loading = true;
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
