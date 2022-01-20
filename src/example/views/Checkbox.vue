<template>
  <div>
    <h2>基础用法</h2>
    <div class="demo">
      <el-checkbox v-model="checked">备选项</el-checkbox>
    </div>
    <h2>禁用状态</h2>
    <div class="demo">
      <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
      <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
    </div>
    <h2>多选框组</h2>
    <div class="demo">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    </div>
    <h2>indeterminate 状态</h2>
    <p>indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果</p>
    <div class="demo">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <h2>可选项目数量的限制</h2>
    <div class="demo">
      <el-checkbox-group v-model="checkedCities2" :min="1" :max="2">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <h2>按钮样式</h2>
    <div class="demo">
      <div>
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup2" size="medium">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup3" size="small">
          <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '北京'" :key="city">{{
            city
          }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <h2>带有边框</h2>
    <div class="demo">
      <div>
        <el-checkbox v-model="checked3" label="备选项1" border></el-checkbox>
        <el-checkbox v-model="checked4" label="备选项2" border></el-checkbox>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox v-model="checked5" label="备选项1" border size="medium"></el-checkbox>
        <el-checkbox v-model="checked6" label="备选项2" border size="medium"></el-checkbox>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup5" size="small">
          <el-checkbox label="备选项1" border></el-checkbox>
          <el-checkbox label="备选项2" border disabled></el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
          <el-checkbox label="备选项1" border></el-checkbox>
          <el-checkbox label="备选项2" border></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
//import { util } from '@/core';
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      checked: true,
      checked1: false,
      checked2: true,
      checkList: ["选中且禁用", "复选框 A"],
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
      checkedCities2: ["上海", "北京"],
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkboxGroup3: ["上海"],
      checkboxGroup4: ["上海"],
      checked3: true,
      checked4: false,
      checked5: false,
      checked6: true,
      checkboxGroup5: [],
      checkboxGroup6: [],
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
  created() {},
};
</script>

<style scoped></style>
