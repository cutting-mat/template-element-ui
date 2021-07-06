<template>
  <div>
    <h2>说明</h2>
    <p>字典控件是可以自动请求指定数据字典做为选项的表单控件，请求字典接口约定为：`@/system/api/dict => itemList()`</p>
    <h3>公共参数</h3>
    <p> `load[String|Function]`: 必传。String类型代表字典code，Function类型代表自定义请求方法，必须返回一个Promise，见示例:级联选择器。</p>
    <p> `valueKey[String]`: 字典数据中用做控件值的字段，默认'id'</p>
    <p> `labelKey[String]`: 用做名称的字段，默认'value'</p>
    <p> `nullAble[Boolean]`: 是否需要添加空值选项，空值为null；DictRadio组件默认false，其他字典组件均默认true</p>
    <p> `placeholder[String]`: 空值展示，默认'请选择'</p>
    <p> `attribute[Object]`: 原element组件支持的属性</p>
    
    <h2>单选框</h2>
    <h3>通过attribute支持element组件参数</h3>
    <p>参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/radio' target='_blank'>原组件</el-link></p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="单选框">
            <DictRadio v-model="value1" load="team_approve_state" />
          </el-form-item>
        </el-form>
    </div>
    
    <h2>多选框</h2>
    <h3>通过attribute支持element组件参数</h3>
    <p>参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/radio' target='_blank'>原组件</el-link></p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="多选框">
            <DictCheckbox v-model="value2" load="team_approve_state" />
          </el-form-item>
        </el-form>
    </div>

    <h2>选择器</h2>
    <h3>通过attribute支持element组件参数</h3>
    <p> 参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/select' target='_blank'>原组件</el-link></p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="选择器">
            <DictSelect v-model="value3" load="team_approve_state" />
          </el-form-item>
        </el-form>
    </div>

    <h2>级联选择器</h2>
    <h3>通过attribute支持element组件参数</h3>
    <p> 参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/cascader' target='_blank'>原组件</el-link></p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="级联选择器">
            <DictCascader v-model="value4" :load="fetchDict" />
          </el-form-item>
        </el-form>
    </div>

  </div>
</template>

<script>
//import * as util from '@/core';
import { buildTree } from "@/core";
import { itemList } from "@/system/api/dict";

export default {
  data () {
    return {
      value1: null,
      value2: [498],
      value3: null,
      value4: [],
    }
  },
  methods: {
    fetchDict() {
      return itemList(
        {
          dictCode: 'xzgh',
        },
        {
          cache: true,
        }
      ).then((res) => {
        return buildTree(res.data.data);
      });
    },
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
