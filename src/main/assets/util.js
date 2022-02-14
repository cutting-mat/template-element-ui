import { util } from "@/core";

const fileTypes = {
    img: {
        type: ["png", "jpg", "jpeg"],
        album: require("./img/file/img.png"),
    },
    word: {
        type: ["doc", "docx"],
        album: require("./img/file/word.png"),
    },
    excel: {
        type: ["xls", "xlsx"],
        album: require("./img/file/excel.png"),
    },
    ppt: {
        type: ["ppt", "pptx"],
        album: require("./img/file/ppt.png"),
    },
    pdf: {
        type: ["pdf"],
        album: require("./img/file/pdf.png"),
    },
    video: {
        type: ["mp4", "wmv", "mov"],
        album: require("./img/file/video.png"),
    },
    txt: {
        type: ["txt"],
        album: require("./img/file/txt.png"),
    },
    rar: {
        type: ["rar", "zip"],
        album: require("./img/file/rar.png"),
    },
    default: {
        type: [],
        album: require("./img/file/other.png")
    }
};

/**
 * 根据文件url获得封面图
 * @param url[String] 文件url
 * @param previewImg[Boolean] 图片文件是否直接预览
 * @return fileAlbum[src] 封面图地址
*/
export const dynamicAlbum = (url, previewImg) => {
    let fileAlbum = fileTypes.default.album;

    if (!url) {
        console.warn('dynamicAlbum()参数异常：', url, previewImg)
        return fileAlbum
    }

    let fileExt = util.getSuffix(url);
    const typeIndex = Object.keys(fileTypes).findIndex(type => {
        return fileTypes[type].type.findIndex(ext => ext === fileExt) !== -1
    })

    if (typeIndex !== -1) {
        let fileType = Object.keys(fileTypes)[typeIndex];
        if (fileType === 'img' && previewImg) {
            fileAlbum = url
        } else {
            fileAlbum = (fileTypes[fileType].album)
        }

    }
    return fileAlbum;
}