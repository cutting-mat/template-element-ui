<template>
  <div v-loading="loading" class="upload_image">
    <div
      v-for="(item,index) in list"
      :key="'img'+index"
      class="previewItem"
    >
      <img :src="item.url" @click="handlePictureCardPreview(item)" />
      <i class="el-icon-delete-solid _del" title="删除" @click="handleRemove(item)"></i>
    </div>

    <BaseUploadImage 
      :disabled="disabled || !(list.length<limit)"
      :multiple="multiple"
      :accept="accept"
      @progress="handleProgress"
      @success="handleSuccess"
    >
    </BaseUploadImage>

    <!-- 图片预览 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="previewVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import BaseUploadImage from "../components/BaseUploadImage";

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
      default: "image/*",
    },
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
  },
  created: function () {},
};
</script>

<style scoped>
.previewItem {
  position: relative;
  display: inline-block;
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
  font-size: 18px;
}
.previewItem ._del:hover {
  opacity: 0.8;
}
</style>

