
// 内部变量：文件类型与扩展名映射关系
const FileTypeMap = {
    "t-image": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".webp"],
    "t-video": [".mp4", ".rmvb", ".avi", ".mov", "3.gp"],
    "t-word": [".docx", ".doc"],
    "t-excel": [".xlsx", ".xls"],
    "t-ppt": [".ppt", ".pptx"],
    "t-document": [".pdf", "t-word", "t-excel", "t-ppt"],
    "t-zip": [".zip", ".ar"]
}

/**
 * 通过文件类型获取扩展名列表
 * @param type[String] FileTypeMap 中约定的类型名
 * @return 目标类型的扩展名数组
 * */
export const getExtByType = (type) => {
    if (type && Array.isArray(FileTypeMap[type])) {
        let classList = [];
        let extList = [];
        FileTypeMap[type].forEach(e => {
            if (e.indexOf('t-') === 0) {
                classList.push(e)
            } else {
                extList.push(e)
            }
        })
        if (classList.length) {
            classList.forEach(classType => {
                extList = extList.concat(getExtByType(classType))
            })
        }
        return extList
    } else if(type && type.split){
        return [type.toLowerCase()]
    }
}
