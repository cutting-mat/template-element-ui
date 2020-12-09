<template>
  <div v-loading="loading" class="upload_image">
    <div
      v-for="(item,index) in list"
      :key="'img'+index"
      class="previewItem"
    >
      <img :src="item.url" @click="handlePictureCardPreview(item)" />
      <i class="el-icon-delete _del" title="删除" @click="handleRemove(item)"></i>
    </div>

    <BaseUploadImage 
      :disabled="disabled || !(list.length<limit)"
      :multiple="multiple"
      :accept="actualAccept"
      @progress="handleProgress"
      @success="handleSuccess"
      @error="handleError"
    >
    </BaseUploadImage>
    <div class="data-list-hd">
      支持{{actualAccept | typeDescription}}
    </div>

    <!-- 图片预览 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="previewVisible" append-to-body class="upload_image_preview">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import BaseUploadImage from "../components/BaseUploadImage";
import {getExtByType} from "../assets/FileType";

export default {
  props: {
    propvalue: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    limit: {
      type: Number,
      default: 9,
    },
    accept: {
      type: String,
      required: false,
      default: "t-image",
    },
  },
  filters: {
    typeDescription(typeString) {
      if(typeString==='*'){
        return "任意文件"
      }else{
        return typeString.split(',').join('、')
      }
    }
  },
  components: {
    BaseUploadImage,
  },
  data() {
    return {
      loading: false,
      previewVisible: false,
      dialogImageUrl: "",
      list: [],
    };
  },
  computed: {
    actualAccept() {
      if(this.accept.indexOf('t-')!==-1){
        const typeArray = this.accept.split(',');
        let result = [];
        typeArray.forEach(type => {
          result = result.concat(getExtByType(type))
        })
        if(result.length){
          return result.map(ext => `.${ext}`).join(',')
        }else{
          return "t-image"
        }
      }else{
        return this.accept
      }
    }
  },
  watch: {
    propvalue: {
      handler: function (propvalue) {
        this.list = propvalue;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    triggerSubmit() {
      this.$emit("change", this.list);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.previewVisible = true;
    },
    handleSuccess: function (file) {
      this.loading = false;
      this.list.push(file);
      this.triggerSubmit();
    },
    handleRemove(file) {
      this.list = this.list.filter((e) => {
        return e.id != file.id;
      });
      this.triggerSubmit();
    },
    handleProgress(event) {
      this.loading = true;
      this.loadingText = `已上传${parseInt(event.percent, 10)}%`;
    },
    handleError() {
      this.loading = false;
    }
  },
  created: function () {},
};
</script>

<style scoped>
.data-list-hd{
  display: inline-block;
  vertical-align: bottom;
  color: #888;
  margin-left: 20px;
}

.previewItem {
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  width: 100px;
  height: 100px;
  margin: 0 8px 8px 0;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
}
.previewItem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.previewItem ._del {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  background:#fff;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  opacity: 0.9;
}
.previewItem ._del:hover {
  opacity: 1;
}

.upload_image >>> .el-upload-image, .upload_image >>> .data-list-hd{
  margin: 0 8px 8px 0;
}

.upload_image_preview >>> .el-dialog__header{
  border:0;
}
</style>

