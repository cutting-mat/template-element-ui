<template>
  <div>
    <h2>文件上传</h2>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>限制格式</h2>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          accept="t-document"
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>可以多选</h2>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          multiple 
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>限制最大上传数</h2>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          multiple 
          :limit="1"
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
