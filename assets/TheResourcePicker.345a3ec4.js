import{n as c,b as l,t as u}from"./index.d870fe9f.js";import{r as d}from"./resource.bbb20e36.js";import"./ui.62ab6f2f.js";var p=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("el-tree",{ref:"tree",staticClass:"custom-tree",attrs:{data:e.list,props:e.defaultProps,"node-key":"id","default-expand-all":"","show-checkbox":e.picker,"check-strictly":""},on:{"check-change":e.handleCheckChange},scopedSlots:e._u([{key:"default",fn:function(i){var n=i.node,a=i.data;return t("div",{staticClass:"custom-tree-item"},[t("div",{staticClass:"flex-1 extendLable"},[a.type===1?t("span",{staticStyle:{color:"#67c23a"}},[t("i",{staticClass:"el-icon-medal"})]):e._e(),t("span",{class:{source:a.type===1},staticStyle:{"margin-right":"20px"}},[e._v(" "+e._s(a.name)+" ")]),a.type===1?t("el-tag",{attrs:{size:"small",type:e.typeColor[a.method]}},[t("i",{staticClass:"el-icon-position"}),e._v(" "+e._s(a.method.toUpperCase())+" ")]):e._e(),t("el-tag",{attrs:{size:"small",type:"info"}},[a.type===0?t("i",{staticClass:"el-icon-link"}):e._e(),e._v(" "+e._s(a.type===0?a.route:a.url)+" ")])],1),e.picker?t("span",{staticClass:"extendGroup"},[t("el-button",{attrs:{size:"small",type:"text"},on:{click:function(r){return r.stopPropagation(),e.handleCheckChange(a,!n.checked,!0)}}},[e._v(" \u6279\u91CF\u9009\u62E9 ")])],1):t("span",{staticClass:"extendGroup"},[t("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.edit,expression:"resource.edit"}],attrs:{size:"small",type:"text"},on:{click:function(r){return r.stopPropagation(),e.$emit("edit",a)}}},[e._v(" \u7F16\u8F91 ")]),a.type===0?t("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.add,expression:"resource.add"}],attrs:{size:"small",type:"text"},on:{click:function(r){return r.stopPropagation(),e.$emit("append",a)}}},[e._v(" \u6DFB\u52A0\u5B50\u83DC\u5355 ")]):e._e(),a.type===0?t("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.add,expression:"resource.add"}],attrs:{size:"small",type:"text"},on:{click:function(r){return r.stopPropagation(),e.$emit("add-resource",a)}}},[e._v(" \u6DFB\u52A0\u8D44\u6E90 ")]):e._e(),t("el-button",{directives:[{name:"auth",rawName:"v-auth",value:e.resource.remove,expression:"resource.remove"}],attrs:{size:"small",type:"text"},on:{click:function(r){return r.stopPropagation(),e.$emit("remove",a)}}},[e._v(" \u5220\u9664 ")])],1)])}}])})},h=[];const f={props:{picker:{type:Boolean,required:!1,default:!1},checked:{type:Array,required:!1},listdata:{type:Array,required:!1}},data(){return{resource:d,list:[],defaultProps:{children:"children",label:"title"},typeColor:{get:"success",post:"primary",put:"warning",delete:"danger"},trigger:null}},watch:{listdata:{handler:function(e){Array.isArray(e)&&(this.list=e)},immediate:!0},checked:{handler:function(){this.$refs.tree.setCheckedKeys(this.checked)},deep:!0}},methods:{handleCheckChange(e,s,t){const i=this.$refs.tree.getNode(e);i&&(this.$refs.tree.setChecked(i,s),t&&Array.isArray(e.children)&&e.children.length&&e.children.forEach(n=>{this.handleCheckChange(n,s,t)})),this.$nextTick(()=>{this.trigger()})},fetchData:function(){this.$store.action("permission").then(e=>{this.list=l(e.menus.concat(e.resources)),this.$nextTick(()=>{this.$refs.tree.setCheckedKeys(this.checked)})})}},created:function(){this.listdata||this.fetchData()},mounted(){this.trigger=u(()=>{this.$emit("check",this.$refs.tree.getCheckedNodes())})}},o={};var m=c(f,p,h,!1,_,"2f3ab0a4",null,null);function _(e){for(let s in o)this[s]=o[s]}var x=function(){return m.exports}();export{x as default};