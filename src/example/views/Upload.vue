<template>
  <div>
    <h2>基本文件上传</h2>
    <p>
      Element-Upload二次封装。组件位置：<code
        >"@/main/components/BaseUploader"</code
      >
    </p>
    <p>
      保留原组件参数：<code
        >multiple, data, name, showFileList, accept, listType, fileList,
        disabled, limit, beforeUpload</code
      >
    </p>
    <p>新增参数：<code>triggerId, imgCompress, uploadFunc</code></p>
    <p>支持事件：<code>exceed, success, error</code></p>
    <div class="demo">
      <div class="block">
        <BaseUploader @success="handleUploadFile" />
      </div>
    </div>

    <h2>限制格式</h2>
    <p>
      <code>accept[String]</code
      >：支持扩展名以及框架约定快捷类别，多个值用","隔开，例如<code>"t-document,.txt"</code>，默认"*"不限制格式。框架约定快捷类别描述见`@/main/assets/file-type.js`
    </p>
    <div class="demo">
      <div class="block">
        <BaseUploader accept="t-document,.txt" @success="handleUploadFile" />
      </div>
    </div>

    <h2>附带数据</h2>
    <p><code>data[Object]</code>：上传时附带的额外参数</p>
    <div class="demo">
      <div class="block">
        <BaseUploader :data="{ test: 123 }" />
      </div>
    </div>

    <h2>可以多选</h2>
    <p><code>multiple[Boolean]</code>：默认'false'不可多选</p>
    <div class="demo">
      <div class="block">
        <BaseUploader multiple @success="handleUploadFile" />
      </div>
    </div>

    <h2>限制数量</h2>
    <p><code>limit[Number]</code>：设置最大上传文件数，默认9</p>
    <div class="demo">
      <div class="block">
        <BaseUploader
          :limit="1"
          @exceed="handleExceed"
          @success="handleUploadFile"
        />
      </div>
    </div>

    <h2>禁用状态</h2>
    <p><code>disabled[Boolean]</code>：默认'false'不禁用</p>
    <div class="demo">
      <div class="block">
        <BaseUploader disabled />
      </div>
    </div>

    <h2>自定义触发元素id</h2>
    <p><code>triggerId[String]</code>：默认自动生成随机字符串</p>
    <div class="demo">
      <div class="block">
        <BaseUploader triggerId="myUploadTrigger" />
      </div>
    </div>

    <h2>图片上传前压缩</h2>
    <p>
      <code>imgCompress[Boolean]</code
      >：默认'true'，上传图片压缩，宽高不超过1000px，走base64上传接口：<code
        >"@/main/api/common.js" => uploadImg</code
      >
    </p>
    <div class="demo">
      <div class="block">
        <BaseUploader accept="t-image" @success="handleUploadImage" />
      </div>
    </div>

    <h2>自定义上传函数</h2>
    <p>
      <code>uploadFunc[Function]</code>：默认<code
        >"@/main/api/common.js" => upload</code
      >
    </p>
    <div class="demo">
      <div class="block">
        <BaseUploader :uploadFunc="uploadFunc" @success="handleUploadFile" />
      </div>
    </div>

    <h2>自定义上传列表展示</h2>
    <p>
      通过关闭<code>showFileList[Boolean]</code>，配合： TheFileList 组件<code
        >"@/main/components/TheFileList"</code
      >
    </p>
    <div class="demo">
      <div class="block">
        <TheFileList :list="list" @click="handlePreview" @remove="handleRemove" />
        <BaseUploader :showFileList="false" @success="handleUploadFile2" />
      </div>
    </div>

    <h2>单个上传文件大小限制</h2>
    <p>
      <code>limitSize[Number]</code>：默认<code>100 * 1024 * 1024  // 100M</code>
    </p>
    <div class="demo">
      <div class="block">
        <BaseUploader :limitSize="150 * 1024 * 1024" @success="handleUploadFile" />
      </div>
    </div>

    
  </div>
</template>

<script>
//import * as util from "@/core";
import { upload as uploadFunc } from "@/main/api/common";

export default {
  components: {
    BaseUploader: (resolve) =>
      require(["@/main/components/BaseUploader"], resolve),
    TheFileList: (resolve) =>
      require(["@/main/components/TheFileList"], resolve),
  },
  data() {
    return {
      images: [],
      files: [],
      list: [],
      uploadFunc,
    };
  },
  methods: {
    handleRemove(index) {
      this.files.splice(index, 1)
    },
    handlePreview(file) {
      console.log(file);
      if (file && file.url) {
        window.open(file.url);
      }
    },
    handleExceed() {
      this.$message("超出最大可上传文件数");
    },
    handleUploadImage(files) {
      this.images.push(files);
    },
    handleUploadFile(files) {
      this.files.push(files);
    },
    handleUploadFile2(files) {
      this.list.push(files);
    },
  },
};
</script>

<style scoped>
</style>
