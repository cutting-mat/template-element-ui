import {
    instance
} from '@/core/api';


//上传图片base64
export const uploadImg = params => {
    return instance.post(`/file/upload/base64`, params)
}

//文件上传地址
export const upload = params => {
    return instance.post(`/file/upload`, params, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}