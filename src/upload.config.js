/**
 * ElUploadPlugin 配置文件 (el-upload参考: https://element.eleme.cn/#/zh-CN/component/upload)
 * multiple[Boolean]: 支持文件多选, 同el-upload, default: false
 * data[Object]: 随上传附带数据, 同el-upload, default: {}
 * name[String]: 上传文件的表单名, 同el-upload, default: 'file'
 * accept[String]: 允许上传的文件类型, 额外支持自定义文件类型（见下方 quickType ）, default: "*"
 * showFileList[Boolean]: 展示上传文件列表, 同el-upload, default: false
 * listType[String]: 列表类型, 同el-upload, default: "text"
 * fileList[Array]: 已上传文件数据, 同el-upload, default: []
 * disabled[Boolean]: 禁用上传功能, 同el-upload, default: false
 * limit[Number]: 最大可上传文件数, 同el-upload, default: 9
 * beforeUpload[Function]: 上传前校验方法, 同el-upload, default: (file) => true
 * imgCompress[Boolean]: 开启图片上传前压缩, default: true
 * imgCompressOption[Object]: 图片压缩尺寸配置, default: 
    {
        width: 1000,
        height: 1000,
    }
 * limitSize[Number]: 允许上传文件最大尺寸, 单位 B , default: 100 * 1024 * 1024 (100M)
 * uploadRequest[Function]: 上传处理方法, default: 无
 * quickType[Object]: 自定义文件类型, 如： {"t-word": [".docx", ".doc"]}, default: 
    {
        "t-image": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".webp"],
        "t-video": [".mp4", ".rmvb", ".avi", ".mov", "3.gp"],
        "t-word": [".docx", ".doc"],
        "t-excel": [".xlsx", ".xls"],
        "t-ppt": [".ppt", ".pptx"],
        "t-document": [".pdf", "t-word", "t-excel", "t-ppt"],
        "t-zip": [".zip", ".rar"],
    }

 * */

import { upload as uploadRequest } from "@/main/api/common";

export default {
    uploadRequest
}