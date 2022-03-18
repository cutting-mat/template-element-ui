/**
 * uploader 配置文件 
 * 支持原el-upload的所有Props（除 http-request 以外），额外支持以下配置
 * (el-upload文档: https://element.eleme.cn/#/zh-CN/component/upload)
 * 
 * accept[String]:              允许上传的文件类型, 同el-upload, 额外支持自定义文件类型（见下方 quickType ）
 * v-model / value[Array]:      已上传文件数据, 同el-upload, default: []
 * beforeUpload[Function]:      上传文件之前的钩子，同el-upload, 将作为默认配置，可以被组件配置覆盖
 * onExceed[Function]:          文件超出个数限制时的钩子, 同el-upload, 将作为默认配置，可以被组件配置覆盖
 * limitSize[Number]:           允许上传的最大文件尺寸，默认 100 * 1024 * 1024（100M）
 * imgCompress[Boolean]:        开启图片上传前压缩, default: true
 * imgCompressOption[Object]:   图片压缩尺寸配置, default: 
    {
        width: 1000,            // 最大宽度
        height: 1000,           // 最大高度
    }
 * imgCrop[Boolean]:            开启图片上传前剪裁, default: false
 * imgCropOption[Object]:       图片剪裁配置, default: 
    {
        ratio: 1,               // 剪裁框宽高比
        minWidth: 0,            // 最小输出宽度
        minHeight: 0,           // 最小输出高度
        maxWidth: 1000,         // 最大输出宽度
        maxHeight: 1000,        // 最大输出高度
    }
 * uploadRequest[Function]:     上传处理方法, default: 无
 * responseTransfer[Function]:  接口返回数据 与 fileList 数据格式转换函数, default: (response) => return response;
 * quickType[Object]:           自定义文件类型, default: 
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
import Vue from "vue";
import { upload as uploadRequest } from "@/main/api/common";

export default {
    uploadRequest,
    beforeUpload(file) {
        // 尺寸校验
        if (file.size > 100 * 1024 * 1024) {
            Vue.prototype.$message.warning("文件超出最大限制");
            return false;
        }
        // 文件名不得超过500字符
        if (file.name.length > 500) {
            Vue.prototype.$message.warning(
                `文件名不得超过 500 字符`
            );
            return false;
        }
    },
    onExceed() {
        Vue.prototype.$message.warning("超出上传数量限制");
    },
}