<template>
  <div>
    <h2>基本用法</h2>
    <div class="demo">
      <el-radio-group v-model="direction">
        <el-radio label="ltr">从左往右开</el-radio>
        <el-radio label="rtl">从右往左开</el-radio>
        <el-radio label="ttb">从上往下开</el-radio>
        <el-radio label="btt">从下往上开</el-radio>
      </el-radio-group>
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>
      <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
        <span>我来啦!</span>
      </el-drawer>
    </div>

    <h2>不添加 Title</h2>
    <div class="demo">
      <el-button @click="drawer1 = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer title="我是标题" :visible.sync="drawer1" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
    </div>

    <h2>自定义内容</h2>
    <div class="demo">
      <el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button>
      <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
      <el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
        <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="200"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-drawer>

      <el-drawer
        title="我嵌套了 Form !"
        :before-close="handleClose2"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{
              loading ? "提交中 ..." : "确 定"
            }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>

    <h2>多层嵌套</h2>
    <div class="demo">
      <el-button @click="drawer2 = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>

      <el-drawer title="我是外面的 Drawer" :visible.sync="drawer2" size="50%">
        <div>
          <el-button @click="innerDrawer = true">打开里面的!</el-button>
          <el-drawer title="我是里面的" :append-to-body="true" :before-close="handleClose" :visible.sync="innerDrawer">
            <p>_(:зゝ∠)_</p>
          </el-drawer>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
//import * as util from '@/core';

export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawer1: false,
      drawer2: false,
      innerDrawer: false,      
      table: false,
      dialog: false,
      loading: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },

    handleClose2(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then(() => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(() => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
  },
  created() {},
};
</script>

<style scoped></style>
