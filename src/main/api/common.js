import { axiosInstance as instance } from "@/core";

//登录
export const login = params => {
    return instance.post(`/login`, params)
}

//用户权限
export const permission = (params, opt) => {
    return instance.get(`/getPermissions`, { params }, opt)
}

// 上传文件
export const upload = (file, fileName) => {
    let formData = new FormData();
    formData.append('file', file, fileName);

    return instance.post(`/file/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}
// 保存JSON
export const saveJSON = params => {
    return instance.post(`/oss/${params.id || 'text'}`, params, {
        headers: {
            "X-Request-Permission": "post,/oss/**"
        }
    })
}
// 获取JSON
export const getJSON = (params, opt) => {
    return instance.get(`/oss/${params.id}`, {
        headers: {
            "X-Request-Permission": "get,/oss/*"
        }
    }, opt)
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
