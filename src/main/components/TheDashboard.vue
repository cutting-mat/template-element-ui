<template>
  <div class="scrollbar">
    <div class="flex-row" style="margin-top: 20px;">
      <div class="flex-1 box blockLayout">
        
      </div>
      <div class="flex-1 box blockLayout"></div>
      <div class="flex-1 box blockLayout"></div>
    </div>
    <div class="flex-row">
      <div class="flex-1 box blockLayout">
        <TheFileUploader multiple @change="handleUploadFile" />
      </div>
      <div class="flex-1 box blockLayout">
        <TheImageUploader @change="handleUploadImage" />
      </div>
    </div>
  </div>
</template>

<script>

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
.box{
  height: 250px;
}
</style>
