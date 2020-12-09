<template>
  <div>
    <h2>文件上传</h2>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          accept="t-document"
          multiple 
          @change="handleUploadFile" 
        />
      </div>
      
    </div>

    <h2>图片上传</h2>
    <div class="demo">
      <div class="block">
        <TheImageUploader 
          @change="handleUploadImage" 
        />
      </div>
      
    </div>

  </div>
</template>

<script>
//import * as util from "@/common/assets/util";

export default {
  components: {
    TheFileUploader: resolve =>
      require(["@/common/components/FileUploader"], resolve),
    TheImageUploader: resolve =>
      require(["@/common/components/ImageUploader"], resolve)
  },
  data() {
    return {
      images: [],
      files: []
    }
  },
  methods: {
    handleUploadImage(files) {
      this.images = files;
    },
    handleUploadFile(files) {
      this.files = files;
    }
  }
}
</script>

<style scoped>
</style>
