/* eslint-disable indent */
/**
 * 身份验证方式
 * */

export default [
    {
        name: 'password',
        title: '密码验证',
        component: () => import('./components/AuthPassword.vue'),
        icon: new URL('./assets/img/password.png', import.meta.url).href
    }, {
        name: 'email',
        title: '邮箱验证',
        component: () => import('./components/AuthEmail.vue'),
        icon: new URL('./assets/img/email.png', import.meta.url).href
    }, {
        name: 'mobile',
        title: '手机验证',
        component: () => import('./components/AuthMobile.vue'),
        icon: new URL('./assets/img/mobile.png', import.meta.url).href
    }
]
