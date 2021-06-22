<template>
  <el-table-column v-bind="column">
    <template slot-scope="scope">
      <div v-if="column.slotName && column.slotName.split">
        <!-- slot自定义内容 -->
        <slot
          :name="column.slotName"
          :row="scope.row"
          :column="scope.column"
          :index="scope.$index"
        ></slot>
      </div>
      <div v-else-if="column.type === 'index'">
        <!-- index 类型 -->
        {{ scope.$index + 1 }}
      </div>
      <div v-else>
        <!-- 支持formatter内容 -->
        {{
          scope.row[column.prop]
            | formatterFilter(
              scope.row,
              scope.column,
              scope.$index,
              column.formatter
            )
        }}
      </div>
    </template>
    <!-- 多级表头 -->
    <template v-if="column.children && column.children.length > 0">
      <BaseCURDColumn
        v-for="(column, columnIndex) in column.children"
        :key="columnIndex"
        :column="column"
      >
        <template
          :slot="slotName"
          slot-scope="scope"
          v-for="slotName in Object.keys($scopedSlots)"
        >
          <slot
            :name="slotName"
            :column="scope.column"
            :row="scope.row"
            :prop="scope.prop"
          ></slot>
        </template>
      </BaseCURDColumn>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "BaseCURDColumn",
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formatterFilter(cellValue, row, column, index, formatter) {
      if (typeof formatter === "function") {
        return formatter(row, column, cellValue, index);
      } else {
        return cellValue;
      }
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
