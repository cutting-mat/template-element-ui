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
