<template>
  <div>
    <h2>说明</h2>
    <p>增删改查组件基于`el-table + el-dialog + el-form`实现，用于快速实现数据模型的CURD操作。</p>
    <h2>属性</h2>
    <p>`api[Object]`: 必传。必要的请求函数。list: 列表请求函数；detail：详情请求函数，当`getItemFromDetaiApi:true`时必须；create：新增请求函数；update：更新请求函数；delete：删除请求函数；</p>
    <p>`model[Object]`：必传。数据模型定义，控制动态表单生成、表单校验、自定义控件交互。对象的key对应数据的key，key的值为该数据的具体描述，详见【model props】</p>
    <p>`columns[Array]`：必传。Table列定义，详见【columns props】</p>
    <p>`dataKey[String]`：数据主键，默认'id'。影响`api.detail()`和`api.delete()`方法的传参。</p>
    <p>`immediate[Boolean]`：是否创建组件后立即请求列表，默认true。</p>
    <p>`queryParam[Object]`：初始加载及调用`search()`方法时将做为api.list()的请求参数。</p>
    <p>`getItemFromDetaiApi[Boolean]`：调用`update()`方法时是否通过`api.detail()`请求详情数据，默认false，将把列表项作为详情数据。</p>
    <p>`tableAttribute[Object]`：el-table组件属性，用于实现列表，详见<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/table#table-attributes" target="_blank">Element文档</el-link></p>
    <p>`dialogAttribute[Object]`：el-dialog组件属性，用于实现弹出编辑，详见<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/dialog#attributes" target="_blank">Element文档</el-link></p>
    <p>`formAttribute[Object]`：el-form组件属性，用于实现编辑表单，详见<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/form#form-attributes" target="_blank">Element文档</el-link></p>
    
    <h3>model props</h3>
    <p>`type[String]`: 数据类型，用于推导默认控件和数据校验，支持 array,object,number,string,boolean</p>
    <p>`default[Any]`：数据默认值，创建数据时候将直接赋值到表单</p>
    <p>`label[String]`：动态表单相关，表单项标题</p>
    <p>`control[String]`：动态表单相关，控件名称，必须全局注册，如果是自定义组件需要实现`v-model`，如果需要异步校验需要实现@change事件</p>
    <p>`controlOption[Object]`： 动态表单相关，除 v-model 外的控件属性</p>
    <p>`scope[Array|String]`：动态表单相关，数据需要提交的场景，可选"create" | "update"，默认["create", "update"]</p>
    <p>`required[Boolean]`：表单校验相关，是否必填，默认false</p>
    <p>`validator[Function]`：表单校验相关，自定义校验函数，参数(formData, value, callback)</p>
    <p>`message[String]`：表单校验相关，提示信息，默认无，将自动生成英文提示</p>
    <p>`asynValid[Boolean]`：表单校验相关，是否开启异步校验，当监听到自定义组件@change时自动校验该表单项</p>

    <h3>columns props</h3>
    <p>支持<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes" target="_blank">Table-column Attributes</el-link>；</p>
    <p>`hidden[Boolean]`: 用于判断列是否需要渲染；</p>
    <p>`slotName[String]`: 用于指定该列的slot名称，从而可以通过具名slot实现自定义列。通过具名slot的scope可以获取到row, column, index数据</p>

    <h2>事件</h2>
    <p>支持el-table的所有事件，详见<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/table#table-events" target="_blank">Element文档</el-link></p>
    <p>loadingState:(state[Boolean])，当请求状态发生变化时触发事件。</p>
    
    <h2>方法</h2>
    <p>create()，用于弹出创建数据表单。</p>
    <p>update(row)，用于弹出数据编辑表单。</p>
    <p>delete(row)，用于删除数据。</p>
    <p>search()，用于配合`queryParam`属性实现列表筛选。</p>
    <p>通过'table'命名空间支持el-table的所有方法，例如table.clearSelection()。详见<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/table#table-methods" target="_blank">Element文档</el-link></p>
    <p>通过'form'命名空间支持el-form的所有方法，例如form.validate()。详见<el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/form#form-methods" target="_blank">Element文档</el-link></p>
    <h2>示例</h2>
    <p>基本应用：重构数据字典列表，文件位置`src\example\views\CURDDict.vue`，实现效果一致，代码行数对比`184: 309`</p>
    <p>自定义Table列：重构角色列表，文件位置`src\example\views\CURDRoleList.vue`，实现效果一致，代码行数对比`105: 210`</p>
    <p>自定义表单校验：重构账号列表，文件位置`src\example\views\CURDAccount.vue`，在原基础上增加列表筛选功能，代码行数对比`255: 331`</p>
    <el-button-group>
      <el-button @click="$router.push({name: '增删改查-基本应用'})">基本应用</el-button>
      <el-button @click="$router.push({name: '增删改查-自定义Table列'})">自定义Table列</el-button>
      <el-button @click="$router.push({name: '增删改查-自定义表单校验'})">自定义表单校验</el-button>
    </el-button-group>
    <router-view  class="demo" />
  </div>
</template>

<script>
//import * as util from '@/main/assets/util';

export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {},
};
</script>

<style scoped>
</style>
