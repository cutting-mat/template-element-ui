<template>
  <ul class="fileList" v-if="Array.isArray(list) && list.length">
    <li v-for="(item, index) in list" :key="index" class="_item">
      <div class="flex-row align-center">
        <div class="_avatar" @click="onClick(item)">
          <img :src="item.url | dynamicAlbum(previewImgOnThumb)" />
        </div>
        <el-link
          :underline="false"
          class="flex-1 _title el"
          @click="onClick(item)"
        >
          {{ item.name }}
        </el-link>
        <i
          class="_btn el-icon-close"
          v-if="!readonly"
          @click="handleRemove(item, index)"
        />
      </div>
    </li>
  </ul>
  <el-empty v-else></el-empty>
</template>

<script>
import { dynamicAlbum } from "../assets/util";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    previewImgOnThumb: {
      type: Boolean,
      required: false,
      default: false,
    },
    onClick: {
      type: Function,
      required: false,
      default(item) {
        if (item && item.url) {
          window.open(item.url);
        }
      },
    },
    beforeDelete: {
      type: Function,
      required: false,
      default(item, index) {
        return true;
      },
    },
  },
  filters: {
    dynamicAlbum,
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.list = this.value;
      },
    },
  },
  methods: {
    handleRemove(item, index) {
      const validRemove = new Promise((resolve) => {
        resolve(this.beforeDelete(item, index));
      });
      validRemove.then((valid) => {
        if (valid) {
          this.list.splice(index, 1);
          this.$emit("change", this.list);
        }else{
          console.warn(`文件列表删除验证失败：`, valid)
        }
      });
    },
  },
};
</script>

<style scoped>
.fileList {
  padding: 0 10px;
}
.fileList ._item {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}
.fileList ._avatar {
  width: 18px;
  height: 18px;
}
.fileList ._avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.fileList ._title {
  justify-content: normal;
  margin: 0 10px;
}
.fileList ._btn {
  cursor: pointer;
  color: #fd444c;
  font-size: 1.2em;
}
.fileList ._btn:hover {
  opacity: 0.8;
}
</style>
