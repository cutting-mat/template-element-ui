/**
 * 身份验证
 * 输出：
 * 全局组件<auth>
 * */
import Auth from "./components/Auth.vue";
import InputCaptchaImage from "./components/InputCaptchaImage.vue";


export const install = function (Vue) {
    Vue.component('Auth', Auth)
    Vue.component('InputCaptchaImage', InputCaptchaImage)
}