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
// 未授权请求
export const Unauthorized = (params, opt) => {
    return instance.get(`/Unauthorized`, opt)
}
