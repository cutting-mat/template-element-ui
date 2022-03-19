import { axiosInstance as instance } from "@/core";

// 上传文件
export const upload = params => {
    return instance.post(`/file/upload`, params, {
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
// (test)未授权请求
export const Unauthorized = (params, opt) => {
    return instance.get(`/Unauthorized`, opt)
}
// 发手机验证码
export const mobileValidCode = params => {
    return instance.get(`/mobileValidCode`, { params })
}
// 发邮箱验证码
export const emailValidCode = params => {
    return instance.get(`/emailValidCode`, { params })
}