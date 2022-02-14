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
          @click="list.splice(index,1);$emit('change', list)"
        />
      </div>
    </li>
  </ul>
  <el-empty v-else ></el-empty>
</template>

<script>
import { dynamicAlbum } from "../assets/util";

export default {
  model: {
    prop: 'value',
    event: 'change'
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
  },
  filters: {
    dynamicAlbum,
  },
  data(){
    return {
      list: []
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(){
        this.list = this.value
      }
    }
  }
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
  width: 36px;
  height: 36px;
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
