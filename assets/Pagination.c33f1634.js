import{n as i}from"./index.d870fe9f.js";import"./ui.62ab6f2f.js";var u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-pagination",{staticClass:"pagination",attrs:{background:"","page-sizes":[10,20,30,50],layout:"prev, pager, next, sizes","page-size":e.pageSize,"current-page":e.currentPage,total:e.totalCount},on:{"current-change":function(n){return e.$emit("current-change",n)},"size-change":function(n){return e.$emit("size-change",n)}}})},c=[];const o={props:{pageSize:{type:Number,required:!0,default:10},currentPage:{type:Number,required:!0,default:1},totalCount:{type:Number,required:!0},totalPage:{type:Number,required:!1}},data(){return{}},watch:{totalPage:function(){this.totalPage<this.currentPage&&this.$emit("current-change",1)}}},r={};var s=i(o,u,c,!1,l,"c5c1b40c",null,null);function l(e){for(let t in r)this[t]=r[t]}var _=function(){return s.exports}();export{_ as default};
