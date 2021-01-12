<template>
  <div>
    <h2>文件上传</h2>
    <p>默认支持上传任意格式文件。组件位置：<code>"@/common/components/FileUploader"</code></p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>限制格式</h2>
    <p><code>accept[String]</code>：支持扩展名以及框架约定快捷类别，多个值用","隔开，例如<code>"t-document,txt"</code>，默认"*"不限制格式。框架约定快捷类别描述见`@/common/assets/FileType.js`</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          accept="t-document,txt"
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>可以多选</h2>
    <p><code>multiple[Boolean]</code>：默认'false'不可多选</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          multiple 
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>限制数量</h2>
    <p><code>limit[Number]</code>：设置最大上传文件数，默认0不限制数量</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          multiple 
          :limit="1"
          @change="handleUploadFile" 
        />
      </div>
    </div>

    <h2>禁用状态</h2>
    <p><code>disabled[Boolean]</code>：默认'false'不禁用</p>
    <div class="demo">
      <div class="block">
        <TheFileUploader 
          disabled
        />
      </div>
    </div>
    

    <h2>图片上传</h2>
    <p>上传前默认压缩宽高不超过1000px，配置属性与文件上传相同。组件位置：<code>"@/common/components/ImageUploader"</code></p>
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
