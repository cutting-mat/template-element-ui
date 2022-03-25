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

