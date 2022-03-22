import { axiosInstance as instance } from "@/core";

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

// 发手机验证码
export const mobileValidCode = params => {
    return instance.get(`/mobileValidCode`, { params })
}
// 发邮箱验证码
export const emailValidCode = params => {
    return instance.get(`/emailValidCode`, { params })
}