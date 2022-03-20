/**
 * 身份验证方式
 * */ 

export default [
    {
        name: "email",
        title: "邮箱验证",
        component: (resolve) => require(["./components/auth_email"], resolve),
        icon: require("./assets/img/email.png")
    },
    {
        name: "mobile",
        title: "手机验证",
        component: (resolve) => require(["./components/auth_mobile"], resolve),
        icon: require("./assets/img/mobile.png")
    },
    {
        name: "password",
        title: "密码验证",
        component: (resolve) => require(["./components/auth_password"], resolve),
        icon: require("./assets/img/password.png")
    }
]