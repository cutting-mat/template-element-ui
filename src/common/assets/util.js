/* eslint-disable */
import Vue from 'vue'

/*
 * 本地存储
 */
export const storage = function(key, value) {
    const store = sessionStorage;

    if (value === void(0)) {
        let lsVal = store.getItem(key);
        if (lsVal && lsVal.indexOf('autostringify-') === 0) {
            return JSON.parse(lsVal.split('autostringify-')[1]);
        } else {
            return lsVal;
        }
    } else {
        if (typeof(value) === "object" || Array.isArray(value)) {
            value = 'autostringify-' + JSON.stringify(value);
        };
        return store.setItem(key, value);
    }
}

/*
 * 生成随机数
 */
export const getUUID = function(len) {
    len = parseInt(len, 10);
    len = isNaN(len) ? 32 : len;
    const seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
    const seedLen = seed.length - 1;
    let uuid = [];
    while (len--) {
        uuid.push(seed[Math.round(Math.random() * seedLen)]);
    }
    return uuid.join('');
};

/*
 * 深拷贝
 */
export const deepcopy = function(source) {
    if (!source) {
        return source;
    }
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
    }
    return sourceCopy;
};

/*
 * 一维数组转树形结构
 */
export const buildTree = function(array, ckey) {
    let menuData = [];
    let indexKeys = Array.isArray(array) ? array.map((e) => {
        return e.id
    }) : [];
    ckey = ckey || 'pid';
    array.forEach(function(e) {
        //一级菜单
        if (!e[ckey] || (e[ckey] === e.id)) {
            delete e[ckey];
            menuData.push(deepcopy(e)); //深拷贝
        } else if (Array.isArray(indexKeys)) {
            //检测ckey有效性
            let parentIndex = indexKeys.findIndex(function(id) {
                return id == e[ckey];
            });
            if (parentIndex === -1) {
                menuData.push(deepcopy(e));
            }
        }
    });
    let findChildren = function(parentArr) {
        if (Array.isArray(parentArr) && parentArr.length) {
            parentArr.forEach(function(parentNode) {
                array.forEach(function(node) {
                    if (parentNode.id === node[ckey]) {
                        if (parentNode.children) {
                            parentNode.children.push(deepcopy(node));
                        } else {
                            parentNode.children = [deepcopy(node)];
                        }
                    }
                });
                if (parentNode.children) {
                    findChildren(parentNode.children);
                }
            });
        }
    };
    findChildren(menuData);
    return menuData;
}

/*
 * 日期格式化
 */
export const formatDate = (value, fmt) => {
    if (!value) {
        return "--"
    }
    switch (fmt) {
        case 'year':
            fmt = "yyyy"
            break;
        case 'month':
            fmt = "yyyy/MM"
            break;
        case 'day':
            fmt = "yyyy/MM/dd"
            break;
        default:
            fmt = "yyyy/MM/dd hh:mm"
    }
    if (!isNaN(parseInt(value))) {
        value = parseInt(value)
    }

    let getDate = new Date(value);
    let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

/*
 * 事件总线
 */
const bus = new Vue();
let busQueue = {};
//监听事件
export const on = function(eventName, eventHandle) {
    if (eventName && (typeof eventHandle === 'function'))
        if (busQueue[eventName]) {
            bus.$off(eventName, busQueue[eventName])
        }
    busQueue[eventName] = eventHandle;
    return bus.$on(eventName, eventHandle)
};
//触发事件
export const emit = function(eventName, msg) {
    return bus.$emit(eventName, msg)
};

/*
 * ajax错误处理
 */
export const catchError = function(error) {
    //业务代码拦截
    if (error.data) {
        error.response = error.data
    }
    //原生错误对象
    if (error.response) {
        switch (error.response.status) {
            case 400:
                Vue.prototype.$message({
                    message: error.response.data.message || '请求参数异常',
                    type: 'error'
                });
                break;
            case 401:

                Vue.prototype.$message({
                    message: error.response.data.message || '未授权或授权已过期',
                    type: 'warning',
                    onClose: function() {
                        emit('logout')
                    }
                });
                break;
            case 403:
                Vue.prototype.$message({
                    message: error.response.data.message || '无访问权限，请联系企业管理员',
                    type: 'warning'
                });
                break;
            default:
                Vue.prototype.$message({
                    message: error.response.data.message || '服务端异常，请联系技术支持',
                    type: 'error'
                });
        }
    } else if (error.message) {
        let message = error.message;
        if (message.indexOf('timeout') > -1) {
            message = '请求超时，请重试'
        }
        if (message.indexOf('Network') > -1) {
            message = '网络异常'
        }
        Vue.prototype.$message({
            message,
            type: 'error'
        });

    }
    return Promise.reject(error);
}

// filePreview 预览
export const filePreview = (item) => {
    window.open(item.url)
}
// 上传前检查
export const checkUpload = function(file) {
    if (!file.size) {
        return Vue.prototype.$message.warning('文件异常')
    }
    const limitSize = 50 * 1024; // KB
    if (file.size > limitSize * 1024) {
        Vue.prototype.$message.warning('文件超出最大限制')
        return false
    }

    return true
}

// 获取扩展名
export const get_suffix = (filename) => {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos + 1)
    }
    return suffix;
}

// 获取url文件名
export const getUrlName = (url) => {
    const str = url.match(/[^\/]+\.[^\.]+$/);
    if (str.length) {
        return str[0]
    }
    return ''
}

// 下载文件
import {
    download
} from '@/common/api/common';
import {
    mime
} from "./mime";

export const downloadFile = (config) => {
    /* config:
    {
      name: "xxx.jpg",
      url: ""
    }
    */
    const fileName = config.name || getUrlName(url);
    const extName = get_suffix(fileName);

    download(url).then(res => {
        const blob = new Blob([res.data], {
            type: mime[extName] || 'application/vnd.ms-excel'
        })

        const objectURL = URL.createObjectURL(blob);
        if (objectURL) {
            Vue.prototype.$alert(`<div style="text-align:center"><a href="${objectURL}" download="${fileName}" target="_blank" class="el-button el-button--default">点击下载</a></div>`, '文件下载', {
                dangerouslyUseHTMLString: true,
                showConfirmButton: false,
                beforeClose(action, instance, done) {
                    URL.revokeObjectURL(objectURL);
                    done()
                }
            });
        } else {
            Vue.prototype.$message.warning('下载失败，请联系技术支持')
        }
    })
}


// 非生产环境日志
export const log = (msg) => {
    if(process.env.NODE_ENV!=='production'){
        console.log(msg)
    }
}
export const warn = (msg) => {
    if(process.env.NODE_ENV!=='production'){
        console.warn(msg)
    }
}
export const error = (msg) => {
    if(process.env.NODE_ENV!=='production'){
        console.error(msg)
    }
}
