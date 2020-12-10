<template>
  <div>
    <h2>文件上传</h2>
    <p>默认支持上传任意格式文件</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>限制格式</h2>
    <p>`accept`属性支持扩展名以及快捷类别，多个值用","隔开，快捷类别见`@/common/assets/FileType.js`</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          accept="t-document,txt"
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>可以多选</h2>
    <p>`multiple`属性，默认'false'</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          multiple 
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>限制数量</h2>
    <p>`limit`设置最大上传文件数</p>
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
    <p>上传前默认压缩宽高不超过1000px，配置属性与文件上传相同</p>
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
