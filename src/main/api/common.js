import { instance } from '@/core';

// 上传图片base64
export const uploadImg = params => {
    return instance.post(`/file/upload/base64`, params)
}

// 上传文件
export const upload = params => {
    return instance.post(`/file/upload`, params, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}
// 上传富文本
export const saveText = params => {
    return instance.post(`/oss/${params.id || 'text'}`, params)
}
// 获取富文本详情
export const getText = params => {
    return instance.get(`/oss/${params}`)
}
