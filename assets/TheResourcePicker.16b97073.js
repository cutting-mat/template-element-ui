import{n as e,b as t,t as s}from"./index.4ba80ac1.js";import{r}from"./resource.9970ce1c.js";import"./ui.98a3144a.js";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-tree",{ref:"tree",staticClass:"custom-tree",attrs:{data:e.list,props:e.defaultProps,"node-key":"id","default-expand-all":"","show-checkbox":e.picker,"check-strictly":""},on:{"check-change":e.handleCheckChange},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,a=t.data;return s("div",{staticClass:"custom-tree-item"},[s("div",{staticClass:"flex-1 extendLable"},[1===a.type?s("span",{staticStyle:{color:"#67c23a"}},[s("i",{staticClass:"el-icon-medal"})]):e._e(),s("span",{class:{source:1===a.type},staticStyle:{"margin-right":"20px"}},[e._v(" "+e._s(a.name)+" ")]),1===a.type?s("el-tag",{attrs:{size:"small",type:e.typeColor[a.method]}},[s("i",{staticClass:"el-icon-position"}),e._v(" "+e._s(a.method.toUpperCase())+" ")]):e._e(),s("el-tag",{attrs:{size:"small",type:"info"}},[0===a.type?s("i",{staticClass:"el-icon-link"}):e._e(),e._v(" "+e._s(0===a.type?a.route:a.url)+" ")])],1),e.picker?s("span",{staticClass:"extendGroup"},[s("el-button",{attrs:{size:"small",type:"text"},on:{click:function(t){return t.stopPropagation(),e.handleCheckChange(a,!r.checked,!0)}}},[e._v(" 批量选择 ")])],1):s("span",{staticClass:"extendGroup"},[s("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.edit,expression:"resource.edit"}],attrs:{size:"small",type:"text"},on:{click:function(t){return t.stopPropagation(),e.$emit("edit",a)}}},[e._v(" 编辑 ")]),0===a.type?s("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.add,expression:"resource.add"}],attrs:{size:"small",type:"text"},on:{click:function(t){return t.stopPropagation(),e.$emit("append",a)}}},[e._v(" 添加子菜单 ")]):e._e(),0===a.type?s("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.add,expression:"resource.add"}],attrs:{size:"small",type:"text"},on:{click:function(t){return t.stopPropagation(),e.$emit("add-resource",a)}}},[e._v(" 添加资源 ")]):e._e(),s("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.remove,expression:"resource.remove"}],attrs:{size:"small",type:"text"},on:{click:function(t){return t.stopPropagation(),e.$emit("remove",a)}}},[e._v(" 删除 ")])],1)])}}])})},i=[];const c={props:{picker:{type:Boolean,required:!1,default:!1},checked:{type:Array,required:!1},listdata:{type:Array,required:!1}},data:()=>({resource:r,list:[],defaultProps:{children:"children",label:"title"},typeColor:{get:"success",post:"primary",put:"warning",delete:"danger"},trigger:null}),watch:{listdata:{handler:function(e){Array.isArray(e)&&(this.list=e)},immediate:!0},checked:{handler:function(){this.$refs.tree.setCheckedKeys(this.checked)},deep:!0}},methods:{handleCheckChange(e,t,s){const r=this.$refs.tree.getNode(e);r&&(this.$refs.tree.setChecked(r,t),s&&Array.isArray(e.children)&&e.children.length&&e.children.forEach((e=>{this.handleCheckChange(e,t,s)}))),this.$nextTick((()=>{this.trigger()}))},fetchData:function(){this.$store.getPermission().then((e=>{this.list=t(e.menus.concat(e.resources)),this.$nextTick((()=>{this.$refs.tree.setCheckedKeys(this.checked)}))}))}},created:function(){this.listdata||this.fetchData()},mounted(){this.trigger=s((()=>{this.$emit("check",this.$refs.tree.getCheckedNodes())}))}},n={};var o=e(c,a,i,!1,l,"ce424fc8",null,null);function l(e){for(let t in n)this[t]=n[t]}var d=function(){return o.exports}();export{d as default};
