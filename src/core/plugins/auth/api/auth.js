import { axiosInstance as instance } from "@/core";

// 验证密码
export const validPassword = params => {
    return instance.post(`/auth/password/validate`, params)
}


// 获取图形验证码
export const captchaImage = params => {
    return instance.get(`/captcha/image`, { params })
}
// 验证图形验证码
export const validateCaptchaImage = params => {
    return instance.get(`/captcha/image/validate`, { params })
}


// 发手机验证码（通用）
export const sendMobileValidCode = params => {
    return instance.post(`/captcha/sms`, params)
}
// 发手机验证码（注册）
export const sendMobileValidCodeRegister = params => {
    return instance.post(`/captcha/sms/register`, params)
}
// 发手机验证码（登录）
export const sendMobileValidCodeLogin = params => {
    return instance.post(`/captcha/sms/login`, params)
}
// 发手机验证码（重置密码）
export const sendMobileValidCodeResetPassword = params => {
    return instance.post(`/captcha/sms/reset-password`, params)
}

// 验证手机验证码
export const validateMobileValidCode = params => {
    return instance.get(`/captcha/sms/validate`, { params })
}


// 发邮箱验证码
export const emailValidCode = params => {
    return instance.get(`/emailValidCode`, { params })
}
// 验证邮箱验证码
export const validEmailValidCode = params => {
    return instance.get(`/emailValidCode/valid`, { params })
}


