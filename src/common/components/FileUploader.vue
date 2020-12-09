<template>
  <div v-loading="loading" :element-loading-text="loadingText">
    <div class="flex-row align-center">
      <BaseUploadFile 
        :disabled="disabled"
        :multiple="multiple && !limit"
        :accept="actualAccept"
        :beforeUpload="handleBeforeUpload"
        @progress="handleProgress"
        @success="handleSuccess"
        @error="handleError"
      />
      <div class="flex-1 data-list-hd">
        支持{{actualAccept | typeDescription}}
      </div>
    </div>
    <div class="data-list-bd" v-if="list&&list.length">
      <div class="list-item flex-row align-center" v-for="(item, index) in list" :key="index">
        <div class="flex-1"> 
          <i class="icon" :class="getFileType(item.url)">{{getFileType(item.url)}}</i>
          {{ item.name }}
        </div>
        <el-link type="primary" class="tools-btn" @click.native="filePreview(item)">查看</el-link>
        <el-link type="danger" class="tools-btn" v-if="!disabled" @click="handleRemove(item,list)">删除</el-link>
      </div>
    </div>
    <BasePlaceholder v-else message="暂无" />
  </div>
</template>

<script>
import * as util from "@/common/assets/util";
import BaseUploadFile from '../components/BaseUploadFile'
import {getFileType, getExtByType} from "../assets/FileType";

export default {
  props: {
    propvalue: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
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
    limit: {
      type: Number,
      required: false,
      default: 0
    },
    accept: {
      type: String,
      required: false,
      default: '*'
    }
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
    BaseUploadFile
  },
  data() {
    return {
      loading: false,
      loadingText: "",
      list: []
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
          return "*"
        }
      }else{
        return this.accept
      }
    }
  },
  watch: {
    propvalue: {
      handler: function(propvalue) {
        this.list = propvalue;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getFileType, 
    filePreview: util.filePreview,
    triggerSubmit() {
      this.$emit("change", this.list);
    },
    handleBeforeUpload() {
      if(!(this.limit>this.list.length)){
        this.$message.warning('已达到最大上传数');
        return false
      }
      return true;
    },
    handleSuccess(file) {
      this.loading = false;
      this.list.push(file);
      this.triggerSubmit()
    },
    handleRemove(file, filelist) {
      if (this.multiple) {
        if (file.url) {
          this.list = filelist.filter(f => {
            return f.url !== file.url;
          });
        }
      } else {
        this.list.splice(0, 1);
      }
      this.triggerSubmit();
    },
    handleProgress(event) {
      this.loading = true;
      this.loadingText = `已上传${parseInt(event.percent, 10)}%`;
    },
    handleError(){
      this.loading = false
    }
  },
  created: function() {}
};
</script>

<style scoped>
.data-list-hd {
    color: #888888;
    margin-left: 20px;
}
.data-list-bd{
  margin-top: 12px;
}
.list-item {
    background-color: #F5F7F9;
    padding: 6px 20px;
    margin-bottom: 10px;
    border-radius: 4px;
}
.list-item:last-child{
    margin-bottom: 0;
}
.tools-btn {
  margin-left: 20px;
}
.list-item .icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background:#dedede;
  vertical-align: middle;
  margin-right: 6px;
}
.list-item .t-image {
  background: #F95A3F;
}
.list-item .t-video {
  background: #8789E0;
}
.list-item .t-word {
  background: #6CA2FF;
}
.list-item .t-excel {
  background: #5ACC9B;
}
.list-item .t-pdf {
  background: #F95A3F;
}
.list-item .t-ppt {
  background: #F95A3F;
}
</style>
