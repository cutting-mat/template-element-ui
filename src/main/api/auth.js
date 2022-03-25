import { axiosInstance as instance } from "@/core";

// 验证密码
export const validPassword = params => {
    return instance.get(`/password/valid`, { params })
}

// 获取图形验证码
export const captchaImage = params => {
    return instance.get(`/captcha/image`, { params })
}
// 验证图形验证码
export const validateCaptchaImage = params => {
    return instance.get(`/captcha/image/validate`, { params })
}

// 发手机验证码
export const mobileValidCode = params => {
    return instance.get(`/captcha/sms`, { params })
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
