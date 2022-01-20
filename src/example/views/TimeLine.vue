<template>
  <div>
    <h2>基础用法</h2>
    <div class="demo">
      <div class="radio">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>

      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
    <h2>⾃定义节点样式</h2>
    <div class="demo">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities1"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
    <h2>⾃定义时间戳</h2>
    <p>当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。</p>
    <div class="demo">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
//import { util } from '@/core';

export default {
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
      activities1: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
        },
      ],
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.radio {
  margin-bottom: 20px;
}
</style>
