!function(){var t=document.createElement("style");t.innerHTML=".auth_email[data-v-7f9c3a67] .el-input-group__append{background-color:#409eff;border:0}.auth_email[data-v-7f9c3a67] .el-input-group__append .el-button{border-radius:0;margin:0 -20px}.auth_email[data-v-7f9c3a67] .el-input-group__append .countdownButton{color:#fff;background-color:#409eff;border:1px solid #409eff}.auth_email[data-v-7f9c3a67] .el-input-group__append .el-button.is-disabled{background-color:#a0cfff;border-color:#a0cfff}\n",document.head.appendChild(t),System.register(["./index-legacy.951ebb78.js","./ui-legacy.d1f3cf38.js"],(function(t){"use strict";var e,a,n;return{setters:[function(t){e=t.n,a=t.h,n=t.j},function(){}],execute:function(){var i={},r=e({data:function(){var t=this;return{loading:!1,formData:{id:null,userInput:null,inputEmail:null},rules:{inputEmail:[{validator:function(e,a,n){if(a){if(t.userEmail&&t.userEmail!==a)return n(new Error("邮箱不正确"));n()}else n(new Error("请输入安全邮箱"))},trigger:[]}],userInput:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:4,max:6,message:"请输入正确的验证码",trigger:"blur"}]}}},computed:{userEmail:function(){return this.$store.state.user.email||""},anonymousEmail:function(){if(this.userEmail){var t=this.userEmail.split("@")[0].split(""),e=t.map((function(e,a){return 0===a||a===t.length-1?e:"*"})).join("");return"".concat(e,"@").concat(this.userEmail.split("@")[1])}return""}},methods:{sendValidCode:function(){var t=this;this.$refs.form.validateField("inputEmail",(function(e){e||(t.loading=!0,a({email:t.formData.inputEmail}).then((function(e){t.loading=!1,200===e.status?(t.formData.id=e.data.id,t.$refs.countdownButton.start()):t.$message.warning("验证邮件发送失败，请稍后重试")})).catch((function(){t.loading=!1})))}))},handleSubmit:function(){var t=this;this.$refs.form.validateField("userInput",(function(e){e||(t.loading=!0,n(t.formData).then((function(e){t.loading=!1,200===e.status?t.$emit("success",e.data):(t.$refs.form.resetFields(),t.$message.warning("验证失败"))})).catch((function(){t.loading=!1})))}))}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{ref:"form",staticClass:"auth_email",attrs:{model:t.formData,rules:t.rules,"label-position":"left","v-loading":t.loading}},[t.anonymousEmail?a("el-form-item",[t._v("安全邮箱："+t._s(t.anonymousEmail))]):t._e(),a("el-form-item",{attrs:{prop:"inputEmail"}},[a("el-input",{attrs:{placeholder:"请输入安全邮箱","prefix-icon":"el-icon-message"},model:{value:t.formData.inputEmail,callback:function(e){t.$set(t.formData,"inputEmail",e)},expression:"formData.inputEmail"}})],1),a("el-form-item",{attrs:{prop:"userInput"}},[a("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:t.formData.userInput,callback:function(e){t.$set(t.formData,"userInput",e)},expression:"formData.userInput"}},[a("CountdownButton",{ref:"countdownButton",attrs:{slot:"append",count:30},on:{click:t.sendValidCode},slot:"append"},[t._v(" 获取验证码 ")])],1)],1),a("el-form-item",[a("el-button",{staticStyle:{width:"100%"},attrs:{"native-type":"button",type:"primary"},on:{click:t.handleSubmit}},[t._v("立即验证")])],1)],1)}),[],!1,o,"7f9c3a67",null,null);function o(t){for(var e in i)this[e]=i[e]}t("default",function(){return r.exports}())}}}))}();
