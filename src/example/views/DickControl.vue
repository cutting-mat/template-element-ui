<template>
  <div>
    <h2>说明</h2>
    <p>字典控件是可以自动请求指定数据字典数据做为选项的表单控件，请求字典接口约定为：`@/system/api/dict => itemList()`</p>
    <h3>公共参数</h3>
    <p> `dictCode[String]`: 需要请求的字典code，必传</p>
    <p> `valueKey[String]`: 字典数据中用做控件值的字段，默认'id'</p>
    <p> `labelKey[String]`: 用做名称的字段，默认'value'</p>
    <p> `nullAble[Boolean]`: 是否需要添加空值选项，空值为null；DictRadio组件默认false，其他字典组件均默认true</p>
    <p> `placeholder[String]`: 空值展示，默认'请选择'</p>
    
    <h2>单选框</h2>
    <h3>支持参数</h3>
    <p>参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/radio' target='_blank'>原组件</el-link>： `disabled、border、size`</p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="单选框">
            <DictRadio v-model="value1" dictCode="team_approve_state" />
          </el-form-item>
        </el-form>
    </div>
    
    <h2>多选框</h2>
    <h3>支持参数</h3>
    <p>参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/radio' target='_blank'>原组件</el-link>： `disabled、border、size`</p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="多选框">
            <DictCheckbox v-model="value2" dictCode="team_approve_state" />
          </el-form-item>
        </el-form>
    </div>

    <h2>选择器</h2>
    <h3>支持参数</h3>
    <p> 参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/select' target='_blank'>原组件</el-link>：`multiple、disabled、size、clearable、collapseTags、multipleLimit、filterable、popperAppendToBody`</p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="选择器">
            <DictSelect v-model="value3" dictCode="team_approve_state" />
          </el-form-item>
        </el-form>
    </div>

    <h2>级联选择器</h2>
    <h3>支持参数</h3>
    <p> 参考 <el-link type="primary" href='https://element.eleme.cn/#/zh-CN/component/cascader' target='_blank'>原组件</el-link>：`multiple、props、disabled、size、clearable、showAllLevels、collapseTags、separator、filterable、filterMethod、debounce、beforeFilter`</p>
    <div class="demo">
      <el-form size="small">
          <el-form-item label="级联选择器">
            <DictCascader v-model="value4" dictCode="xzgh" />
          </el-form-item>
        </el-form>
    </div>

  </div>
</template>

<script>
//import * as util from '@/main/assets/util';

export default {
  components: {
    DictRadio:  (resolve) => require(["@/main/components/DictRadio"], resolve),
    DictCheckbox:  (resolve) => require(["@/main/components/DictCheckbox"], resolve),
    DictSelect:  (resolve) => require(["@/main/components/DictSelect"], resolve),
    DictCascader:  (resolve) => require(["@/main/components/DictCascader"], resolve),
  },
  data () {
    return {
      value1: null,
      value2: [498],
      value3: null,
      value4: [],
      value5: null
    }
  },
  methods: {
    
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
