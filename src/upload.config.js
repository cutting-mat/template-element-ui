/**
 * ElUploadPlugin 配置文件 
 * 支持原el-upload的所有配置，额外支持以下配置或默认值
 * (el-upload文档: https://element.eleme.cn/#/zh-CN/component/upload)
 * 
 * accept[String]:              允许上传的文件类型, 额外支持自定义文件类型（见下方 quickType ）, default: "*"
 * showFileList[Boolean]:       展示上传文件列表, 同el-upload, default: false
 * v-model / fileList[Array]:   已上传文件数据, 同el-upload, default: []
 * onExceed[Function]:          文件超出个数限制时的钩子, 同el-upload, default: (files, fileList) => this.$message.warning('文件超出上传数量限制');
 * imgCompress[Boolean]:        开启图片上传前压缩, default: true
 * imgCompressOption[Object]:   图片压缩尺寸配置, default: 
    {
        width: 1000,
        height: 1000,
    }
 * fileSizeLimit[Number]:       允许上传文件最大尺寸, 单位 B , default: 100 * 1024 * 1024 (100M)
 * fileNameLengthLimit[Number]: 允许上传文件名最大字符长度, default: 500
 * uploadRequest[Function]:     上传处理方法, default: 无
 * responseTransfer[Function]:  接口返回数据 与 fileList 数据格式转换函数, 同el-upload, default: (response) => return response.data;
 * quickType[Object]:           自定义文件类型集合, 如： {"t-word": [".docx", ".doc"]}, default: 
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