<template>
  <div>
    <h2>基础用法</h2>
    <div class="demo">
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
    </div>
    <h2>禁用状态</h2>
    <div class="demo">
      <el-radio disabled v-model="radio1" label="禁用">备选项</el-radio>
      <el-radio disabled v-model="radio1" label="选中且禁用">备选项</el-radio>
    </div>
    <h2>单选组</h2>
    <div class="demo">
      <el-radio-group v-model="radio2">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
    </div>
    <h2>按钮样式</h2>
    <div class="demo">
      <div>
        <el-radio-group v-model="radio4">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio5" size="medium">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio6" size="small">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京" disabled></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio7" disabled size="mini">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <h2>带有边框</h2>
    <div class="demo">
      <div>
        <el-radio v-model="radio8" label="1" border>备选项1</el-radio>
        <el-radio v-model="radio8" label="2" border>备选项2</el-radio>
      </div>
      <div style="margin-top: 20px">
        <el-radio v-model="radio9" label="1" border size="medium">备选项1</el-radio>
        <el-radio v-model="radio9" label="2" border size="medium">备选项2</el-radio>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio10" size="small">
          <el-radio label="1" border>备选项1</el-radio>
          <el-radio label="2" border disabled>备选项2</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio11" size="mini" disabled>
          <el-radio label="1" border>备选项1</el-radio>
          <el-radio label="2" border>备选项2</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
//import * as util from '@/common/assets/util';

export default {
  data() {
    return {
      radio: "1",
      radio1: "选中且禁用",
      radio2: 3,
      radio4: "上海",
      radio5: "上海",
      radio6: "上海",
      radio7: "上海",
      radio8: "1",
      radio9: "1",
      radio10: "1",
      radio11: "1",
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>
