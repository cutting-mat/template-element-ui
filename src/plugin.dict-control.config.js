/**
 * DictControl 配置文件 
 * 
 * valueKey[String]:            控件数据中的 value 字段名
 * labelKey[String]:            控件数据中的 label 字段名
 * nullAble[Boolean]:           是否需要值为null的默认选项，默认true
 * request[Function]:           请求方法
 * param[Any]:                  请求参数
 * responseTransfer[Function]:  将请求返回数据转换成控件数据格式的方法
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