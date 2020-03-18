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
        <uploader multiple @change="handleUploadFile" />
      </div>
      <div class="flex-1 box blockLayout">
        <uploadImage @change="handleUploadImage" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    uploader: resolve =>
      require(["@/common/components/uploader"], resolve),
    uploadImage: resolve =>
      require(["@/common/components/uploadImage"], resolve)
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
