!function(){var t=document.createElement("style");t.innerHTML=".auth_mobile[data-v-a036503c] .el-input-group__append{background-color:#409eff;border:0}.auth_mobile[data-v-a036503c] .el-input-group__append .el-button{border-radius:0;margin:0 -20px}.auth_mobile[data-v-a036503c] .el-input-group__append .countdownButton{color:#fff;background-color:#409eff;border:1px solid #409eff}.auth_mobile[data-v-a036503c] .el-input-group__append .el-button.is-disabled{background-color:#a0cfff;border-color:#a0cfff}\n",document.head.appendChild(t),System.register(["./index-legacy.951ebb78.js","./ui-legacy.d1f3cf38.js"],(function(t){"use strict";var e,n,o,r;return{setters:[function(t){e=t.n,n=t.s,o=t.k,r=t.m},function(){}],execute:function(){var a={},i=e({props:{command:{type:String,required:!1}},data:function(){var t=this;return{loading:!1,formData:{id:null,userInput:null,inputMobile:null},rules:{inputMobile:[{validator:function(e,n,o){if(n){if(t.userMobile&&t.userMobile!==n)return o(new Error("手机号不正确"));o()}else o(new Error("请输入绑定手机"))},trigger:[]}],userInput:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:4,max:6,message:"请输入正确的验证码",trigger:"blur"}]}}},computed:{userMobile:function(){return String(this.$store.state.user.contactNumber||"")},anonymousMobile:function(){if(this.userMobile){var t=this.userMobile.split(""),e=t.map((function(e,n){return n<3||t.length-n<3?e:"*"})).join("");return"".concat(e)}return""}},methods:{sendValidCode:function(){var t=this;console.log("sendValidCode"),this.$refs.form.validateField("inputMobile",(function(e){e||(t.loading=!0,("reset-pw"===t.command?n:o)({mobile:t.formData.inputMobile}).then((function(e){t.loading=!1,200===e.status?(t.formData.id=e.data.id,t.$refs.countdownButton.start()):t.$message.warning("验证码发送失败，请稍后重试")})).catch((function(){t.loading=!1})))}))},handleSubmit:function(){var t=this;this.$refs.form.validateField("userInput",(function(e){e||(t.loading=!0,r(t.formData).then((function(e){t.loading=!1,200===e.status?t.$emit("success",e.data):(t.$refs.form.resetFields(),t.$message.warning("验证失败"))})).catch((function(){t.loading=!1})))}))}}},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-form",{ref:"form",staticClass:"auth_mobile",attrs:{model:t.formData,rules:t.rules,"label-position":"left","v-loading":t.loading}},[t.anonymousMobile?n("el-form-item",[t._v("绑定手机："+t._s(t.anonymousMobile))]):t._e(),n("el-form-item",{attrs:{prop:"inputMobile"}},[n("el-input",{attrs:{placeholder:"请输入绑定手机","prefix-icon":"el-icon-message"},model:{value:t.formData.inputMobile,callback:function(e){t.$set(t.formData,"inputMobile",e)},expression:"formData.inputMobile"}})],1),n("el-form-item",{attrs:{prop:"userInput"}},[n("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:t.formData.userInput,callback:function(e){t.$set(t.formData,"userInput",e)},expression:"formData.userInput"}},[n("CountdownButton",{ref:"countdownButton",attrs:{slot:"append",count:30},on:{click:t.sendValidCode},slot:"append"},[t._v(" 获取验证码 ")])],1)],1),n("el-form-item",[n("el-button",{staticStyle:{width:"100%"},attrs:{"native-type":"button",type:"primary"},on:{click:t.handleSubmit}},[t._v("立即验证")])],1)],1)}),[],!1,u,"a036503c",null,null);function u(t){for(var e in a)this[e]=a[e]}t("default",function(){return i.exports}())}}}))}();
