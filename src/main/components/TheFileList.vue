<template>
  <ul class="fileList" v-if="Array.isArray(list) && list.length">
    <li v-for="(item, index) in list" :key="index" class="_item">
      <div class="flex-row align-center">
        <div class="_avatar" @click="$emit('click', item)">
          <img :src="item.url | dynamicAlbum" />
        </div>
        <div class="flex-1 _title" @click="$emit('click', item)">
          {{ item.name }}
        </div>
        <i
          class="_btn el-icon-close"
          v-if="!readonly"
          @click="$emit('remove', index)"
        />
      </div>
    </li>
  </ul>
  <BasePlaceholder v-else message="暂无" :img="false" />
</template>

<script>
import * as util from "@/main/assets/util";

export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  filters: {
    dynamicAlbum(url) {
      const fileTypes = {
        img: {
          type: ["png", "jpg", "jpeg"],
          album: require("../assets/img/file/img.png"),
        },
        word: {
          type: ["doc", "docx"],
          album: require("../assets/img/file/word.png"),
        },
        excel: {
          type: ["xls", "xlsx"],
          album: require("../assets/img/file/excel.png"),
        },
        pdf: {
          type: ["pdf"],
          album: require("../assets/img/file/pdf.png"),
        },
        video: {
          type: ["mp4","wmv","mov"],
          album: require("../assets/img/file/video.png"),
        },
        txt: {
          type: ["txt"],
          album: require("../assets/img/file/txt.png"),
        },
        rar: {
          type: ["rar","zip"],
          album: require("../assets/img/file/rar.png"),
        }
      };
      // other
      let fileAlbum = require("../assets/img/file/other.png");

      let fileExt = util.getSuffix(url);
      const typeIndex = Object.keys(fileTypes).findIndex(type => {
        const targetIndex = fileTypes[type].type.findIndex(ext => ext===fileExt)
        return targetIndex !==-1
      })
      if(typeIndex!==-1){
        let fileType = Object.keys(fileTypes)[typeIndex];
        if(fileType==='img'){
          fileAlbum = url
        }else{
          fileAlbum = (fileTypes[fileType].album)
        }
        
      }
      return fileAlbum;
    },
  },
};
</script>

<style scoped>
.fileList {
  padding: 0 16px;
}
.fileList ._item {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}
.fileList ._avatar {
  width: 3em;
  height: 3em;
}
.fileList ._avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.fileList ._title {
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
  color: #999;
  padding: 0 10px;
  cursor: pointer;
}
.fileList ._btn {
  cursor: pointer;
  color: #fd444c;
  font-size: 1.5em;
}
</style>
