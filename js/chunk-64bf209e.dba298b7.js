(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64bf209e"],{1470:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[r("ToolBar",[r("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.role.add,expression:"role.add"}],attrs:{type:"primary",size:"small",icon:"el-icon-plus"},on:{click:function(t){e.dialogVisible=!0}}},[e._v(" 添加 ")])],1),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list}},[r("el-table-column",{attrs:{prop:"name",label:"角色名称",align:"center"}}),r("el-table-column",{attrs:{prop:"remark",label:"备注"}}),r("el-table-column",{attrs:{label:"操作",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.role.edit,expression:"role.edit"}],attrs:{size:"small",type:"info",plain:""},on:{click:function(r){return e.edit(t.row)}}},[e._v("编辑")]),r("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.role.remove,expression:"role.remove"}],attrs:{size:"small",type:"danger",plain:""},on:{click:function(r){return e.remove(t.row)}}},[e._v("删除")])]}}])})],1),r("el-dialog",{staticClass:"comDialog",attrs:{"close-on-click-modal":!1,title:"权限信息",visible:e.dialogVisible,width:"600px"},on:{close:e.handleCloseDialog}},[r("el-form",{ref:"editForm",attrs:{size:"small",rules:e.rules,model:e.editForm,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[r("el-input",{attrs:{maxlength:100},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name","string"===typeof t?t.trim():t)},expression:"editForm.name"}})],1),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",maxlength:1e3},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark","string"===typeof t?t.trim():t)},expression:"editForm.remark"}})],1),r("el-form-item",{attrs:{label:"权限"}},[r("TheResourcePicker",{attrs:{picker:"",checked:e.editForm.resources},on:{check:function(t){e.editForm.resources=t.map((function(e){return e.id}))}}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("确 定")]),r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)],1)],1)},a=[],n=r("c7b2"),o=r("2127"),l={components:{TheResourcePicker:function(){return r.e("chunk-ddfd76c4").then(r.bind(null,"68fa"))}},data:function(){return{role:o,dialogVisible:!1,loading:!1,list:[],editForm:{name:"",remark:"",resources:[]},rules:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"},{min:1,max:100,message:"长度 1 到 100 个字符",trigger:"blur"}],remark:[{min:0,max:255,message:"长度 0 到 255 个字符",trigger:"blur"}]}}},methods:{edit:function(e){this.editForm=Object(n["c"])(e),this.$set(this.editForm,"resources",e.resources),this.dialogVisible=!0},save:function(){var e=this;this.$refs["editForm"].validate((function(t){if(t){e.loading=!0;var r=Object(n["c"])(e.editForm);e.handleCloseDialog();var i=r.id?o["edit"]:o["add"];i(r).then((function(){e.fetchData(),e.$message({message:"添加成功",type:"success"})})).catch((function(){e.loading=!1}))}}))},handleCloseDialog:function(){this.dialogVisible=!1,this.editForm={name:"",remark:"",resources:[]},this.$refs.editForm&&this.$refs.editForm.resetFields()},remove:function(e){var t=this;if(!e||!e.id)return null;this.$confirm("是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.loading=!0,o["remove"]({id:e.id}).then((function(){t.fetchData(),t.$message({message:"删除成功",type:"success"})})).catch((function(){t.loading=!1}))}))},fetchData:function(){var e=this;this.loading=!0,o["list"]().then((function(t){e.loading=!1,e.list=t.data})).catch((function(){e.loading=!1}))}},created:function(){this.fetchData()}},s=l,c=r("2877"),u=Object(c["a"])(s,i,a,!1,null,"aa5c1c2a",null);t["default"]=u.exports},2127:function(e,t,r){"use strict";r.r(t),r.d(t,"list",(function(){return a})),r.d(t,"detail",(function(){return n})),r.d(t,"add",(function(){return o})),r.d(t,"edit",(function(){return l})),r.d(t,"remove",(function(){return s}));var i=r("c7b2"),a=function(e){return i["a"].get("/role/s",{params:e})},n=function(e){return i["a"].get("/role",{params:e})},o=function(e){return i["a"].post("/role",e)},l=function(e){return i["a"].put("/role",e)},s=function(e){return i["a"].delete("/role",{params:e})}}}]);