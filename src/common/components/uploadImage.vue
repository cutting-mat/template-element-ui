<template>
  <div v-loading="loading" class="upload_image">
    <template v-if="disabled">
      <div class="previewlist">
        <el-image
          v-for="(item,index) in list"
          :key="'img'+index"
          class="_item"
          :src="item.url"
          fit="cover"
          :id="'prevImg'+index"
          @click.native="handlePictureCardPreview(item)"
        ></el-image>
      </div>
    </template>
    <template v-else>
      <el-upload
        :class="{
          'avatar-uploader': !multiple,
          'hidePicker': multiple && !(list.length<limit)
        }"
        action=""
        :headers="{Authorization: state.user.accessToken}"
        accept="image/*"
        :file-list="list"
        :show-file-list="multiple"
        :list-type="!multiple ? 'text' : 'picture-card'"
        :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeUpload"
        :disabled="disabled"
        :limit="limit"
        :http-request="customUpload"
      >
        <template v-if="!multiple">
          <el-image v-if="list[0]" class="avatar" :src="list[0].url" fit="cover"></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon" id="upload_image_trigger"></i>
        </template>
        <template v-else>
          <template v-if="list.length<limit">
            <i class="el-icon-plus" id="upload_image_trigger"></i>
          </template>
          <template v-else>达到上传上限</template>
        </template>
      </el-upload>
    </template>

    <!-- 图片预览 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="previewVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg } from "@/common/api/common";
import * as util from "@/common/assets/util";
let { fixImgFile } = require("ios-photo-repair")
import {store} from "@/store"

export default {
  props: {
    propvalue: {
      type: [Object, Array],
      required: false,
      default: function() {
        return null;
      }
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      state: store.state,
      loading: false,
      previewVisible: false,
      dialogImageUrl: "",
      list: []
    };
  },
  watch: {
    propvalue: {
      handler: function(propvalue) {
        if(propvalue){
          if (!this.multiple) {
            if (propvalue.id) {
              this.list = [propvalue];
            } else {
              this.list = [];
            }
          } else {
            if(propvalue[0] && propvalue[0].id){
              this.list = propvalue;
            }
          }
        }
        
      },
      deep: true,
      immediate: true
    },
    list: {
      handler: function(list) {
        const result = !this.multiple ? list[0] || {} : list;
        this.$emit("change", result);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.previewVisible = true;
    },
    handleSuccess: function(res) {
      this.loading = false;
      if(res && res.data){
        if (!this.multiple) {
          this.list = [res.data];
        } else {
          this.list.push(res.data);
        }
      }
      
    },
    handleRemove(file) {
      this.list = this.list.filter(e => {
        return e.id != file.id;
      });
    },
    handleError: function(err) {
      this.loading = false;
      return util.catchError(err);
    },
    beforeUpload: function(file) {
      this.loading = true;
      const imgExt = ["jpg", "jpeg", "png"];
      const ext = util.get_suffix(file.name);
      if(ext && imgExt.indexOf(ext)!==-1){
        return true
      }
      this.$message.warning('文件格式错误');
      this.loading = false;
      return false;
    },
    customUpload: function(params){
      //console.log(params)
      fixImgFile(params.file, {
        width: 1000,
        height: 1000
      }).then(base64 => {
        const name = params.file.name.split('.')[0]+'.png';
        if(base64 && name){
          uploadImg({
            base64,
            name
          }).then(res => {
            this.handleSuccess(res.data)
          }).catch((err) => {
            this.handleError(err)
          })
        }else{
          console.warn('error', base64, name)
        }
      })
    }
  },
  created: function() {}
};
</script>

<style scoped>
.hidePicker >>> .el-upload--picture-card {
  display: none;
}
.upload_image >>> .el-upload--picture-card,
.upload_image >>> .el-upload-list--picture-card .el-upload-list__item{width: 90px;height: 90px;line-height: 90px;}
.upload_image >>> .el-upload-list--picture-card .el-upload-list__item-actions{opacity: 1;background:rgba(0,0,0,.2);}
.upload_image >>> .el-upload-list__item-delete,
.upload_image >>> .el-upload-list--picture-card .el-upload-list__item-actions span{display: initial;}
.upload_image >>> .el-upload-list--picture-card .el-upload-list__item-thumbnail{object-fit: cover;}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.previewlist {
  overflow: hidden;
}
.previewlist ._item {
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  margin: 0 8px 8px 0;
  display: inline-block;
}
</style>

