<template>
  <div class="scrollbar blockLayout" v-loading.fullpage="loading">
    <div class="flex-row align-center toolBar">
      <div class="flex-1">
        <!-- title -->
      </div>
      <el-button
        v-if="!picker"
        v-auth="apiObj.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="$refs.theCURD.create()"
        >添加</el-button
      >
    </div>
    <!-- list -->
    <BaseCURD
      ref="theCURD"
      :api="apiObj"
      dataKey="dictCode"
      :model="model"
      :columns="columns"
      :dialogAttribute="{
        title: '字典信息'
      }"
      @loading-state="loading = $event"
      @row-click="handleRowClick"
    >
      <template v-slot:pick="scope">
        <i
          class="el-icon-success"
          :class="{
            checkIcon: true,
            checked: scope.row.dictCode === currentChecked.dictCode,
          }"
        ></i>
      </template>
      <template v-slot:action="scope">
        <el-button v-auth="apiObj.update" size="mini" @click="$refs.theCURD.update(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-auth="apiObj.itemEdit"
          size="mini"
          type="warning"
          @click="editItem(scope.row)"
          >数据维护</el-button
        >
        <el-button
          v-auth="apiObj.delete"
          size="mini"
          type="danger"
          @click="$refs.theCURD.delete(scope.row)"
          >删除</el-button
        >
      </template>
    </BaseCURD>
    <!-- 数据维护 -->
    <DictEditer
      :visible="editerVisible"
      :dict-code="currentDictCode"
      @close="editerVisible = false"
    />
  </div>
</template>

<script>
//import * as util from "@/core";
import * as api from "@/system/api/dict";

export default {
  props: {
    picker: {
      type: Boolean,
      required: false,
      default: false,
    },
    picked: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  },
  components: {
    DictEditer: (resolve) => require(["@/system/components/DictEditer"], resolve),
  },
  data() {
    return {
      apiObj: {
        list: api.list,
        detail: api.itemList,
        create: api.add,
        update: api.edit,
        delete: api.remove,
        itemEdit: api.itemEdit
      },
      editerVisible: false,
      loading: false,
      model: {
        dictName: {
          label: "名称",
          required: true,
        },
        dictCode: {
          label: "CODE",
          required: true,
        },
        remark: {
          label: "备注",
        },
      },
      columns: [
        {
          label: "选择",
          slotName: "pick",
          width: 50,
          hidden: !this.picker,
        },
        {
          type: "index",
          width: 50,
          hidden: this.picker,
        },
        {
          label: "名称",
          prop: "dictName",
        },
        {
          label: "CODE",
          prop: "dictCode",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "操作",
          slotName: "action",
          width: 300,
          hidden: this.picker,
        },
      ],
      currentDictCode: null,
      currentChecked: {},
    };
  },
  watch: {
    picked: {
      handler: function (picked) {
        this.currentChecked = picked;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleRowClick(row) {
      if (this.picker) {
        this.currentChecked = row;
        this.$emit("change", row);
      }
    },
    editItem(data) {
      this.currentDictCode = data.dictCode;
      this.editerVisible = true;
    },
  },
};
</script>

<style scoped>
.dict-box {
  padding: 20px 20px 0;
}
.checkIcon {
  color: #ccc;
}
.checkIcon.checked {
  color: #409eff;
}
</style>
