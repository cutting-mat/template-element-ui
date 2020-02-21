import {
    instance,
    baseURL
} from '@/api';


//上传图片base64
export const uploadImg = params => {
    return instance.post(`/oss/base64`, params)
}

//文件上传地址
export const upload = `${baseURL}/oss/file`

// 下载文件
export const download = url => {
    return instance.get(`${url}`, {params: {}, responseType: 'blob'})
}
