/**
 * 身份验证方式
 * */

export default [
    {
        name: "password",
        title: "密码验证",
        component: () => import("./components/auth_password.vue"),
        icon: require("./assets/img/password.png")
    }, {
        name: "email",
        title: "邮箱验证",
        component: () => import("./components/auth_email.vue"),
        icon: require("./assets/img/email.png")
    }, {
        name: "mobile",
        title: "手机验证",
        component: () => import("./components/auth_mobile.vue"),
        icon: require("./assets/img/mobile.png")
    }

]