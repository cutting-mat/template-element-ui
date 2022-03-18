/**
 * DictControl 配置文件 
 * 
 * valueKey[String]:              允许上传的文件类型, 同el-upload, 额外支持自定义文件类型（见下方 quickType ）
 * labelKey[String]:
 * nullAble[Boolean]:
 * request[Function]:
 * param[Any]:
 * responseTransfer[Function]:
 * */
import { itemList } from "@/system/api/dict";

export default {
    valueKey: "id",
    labelKey: "value",
    request(param) {
        return itemList({
            dictCode: param,
        }, {
            cache: true,
        })
    },
    responseTransfer(res) {
        return res.data
    }
}