!function(){var e=document.createElement("style");e.innerHTML="",document.head.appendChild(e),System.register(["./index-legacy.951ebb78.js","./ui-legacy.d1f3cf38.js"],(function(e){"use strict";var t,a;return{setters:[function(e){t=e.i,a=e.n},function(){}],execute:function(){var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:e.loading,expression:"loading",modifiers:{fullscreen:!0}}]},[a("ToolBar"),a("el-form",{ref:"form",staticClass:"wrap",attrs:{model:e.formData,"status-icon":"",rules:e.rules,"label-width":"100px"},nativeOn:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[e.formData.token?e._e():a("el-alert",{staticStyle:{"margin-bottom":"20px"},attrs:{title:"未验证用户身份，请返回重试！",type:"error","show-icon":"",closable:!1}}),a("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[a("input-password",{attrs:{autocomplete:"off"},model:{value:e.formData.newPassword,callback:function(t){e.$set(e.formData,"newPassword",t)},expression:"formData.newPassword"}})],1),a("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.formData.checkPass,callback:function(t){e.$set(e.formData,"checkPass",t)},expression:"formData.checkPass"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},o={},n=a({data:function(){var e=this;return{loading:!1,formData:{token:"",checkPass:"",newPassword:""},rules:{newPassword:[{validator:function(t,a,r){""===a?r(new Error("请输入密码")):(""!==e.formData.checkPass&&e.$refs.form.validateField("checkPass"),r())},trigger:"blur"},{min:6,max:30,message:"长度在 6 到 30 个字符",trigger:"blur"}],checkPass:[{validator:function(t,a,r){""===a?r(new Error("请再次输入密码")):a!==e.formData.newPassword?r(new Error("两次输入密码不一致!")):r()},trigger:"blur"}]}}},methods:{submitForm:function(){var e=this;this.$refs.form.validate((function(a){if(a){e.loading=!0;var r=Object.assign({},e.formData);delete r.checkPass,(o=r,t.put("/updatePassword",o,n)).then((function(){e.loading=!1,e.$alert("密码修改成功",{callback:function(){e.$router.go(-1)}})})).catch((function(){e.loading=!1}))}var o,n}))}},created:function(){this.$route.query.authCode&&(this.formData.token=this.$route.query.authCode)}},r,[],!1,s,"84322940",null,null);function s(e){for(var t in o)this[t]=o[t]}e("default",function(){return n.exports}())}}}))}();
