/* eslint-disable */
import Vue from 'vue'

/*
 * 本地存储
 */
export const storage = function (key, value) {
    const store = localStorage;

    if (value === void(0)) {
        let lsVal = store.getItem(key);
        if (lsVal && lsVal.indexOf('autostringify-') === 0) {
            return JSON.parse(lsVal.split('autostringify-')[1]);
        } else {
            return lsVal;
        }
    } else {
        if (typeof (value) === "object" || Array.isArray(value)) {
            value = 'autostringify-' + JSON.stringify(value);
        };
        return store.setItem(key, value);
    }
}

/*
 * 深拷贝
 */
export const deepcopy = function (source) {
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
export const buildTree = function (array, ckey) {
    let menuData = [];
    let indexKeys = Array.isArray(array) ? array.map((e) => {
        return e.id
    }) : [];
    ckey = ckey || 'pid';
    array.forEach(function (e) {
        //一级菜单
        if (!e[ckey] || (e[ckey] === e.id)) {
            delete e[ckey];
            menuData.push(deepcopy(e)); //深拷贝
        } else if (Array.isArray(indexKeys)) {
            //检测ckey有效性
            let parentIndex = indexKeys.findIndex(function (id) {
                return id == e[ckey];
            });
            if (parentIndex === -1) {
                menuData.push(deepcopy(e));
            }
        }
    });
    let findChildren = function (parentArr) {
        if (Array.isArray(parentArr) && parentArr.length) {
            parentArr.forEach(function (parentNode) {
                array.forEach(function (node) {
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
        case undefined:
            fmt = "yyyy/MM/dd hh:mm"
            break;
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
 * 全局事件
 */
const bus = new Vue();
let busQueue = {};
//监听事件
export const on = function (eventName, eventHandle) {
    if (eventName && (typeof eventHandle === 'function')){
        if (busQueue[eventName]) {
            bus.$off(eventName, busQueue[eventName])
        }
        busQueue[eventName] = eventHandle;
        return bus.$on(eventName, eventHandle)
    }
};
//触发事件
export const emit = function (eventName, msg) {
    // eventName 或者 eventName__fix 都会触发
    const busQueueKeys = Object.keys(busQueue);
    busQueueKeys.forEach(key => {
        if(eventName===key.split('__')[0]){
            console.log(key, eventName)
            return bus.$emit(key, msg)
        }
    })
};

/*
 * ajax错误处理
 */
export const catchError = function (error) {
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
                    onClose: function () {
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
export const checkUpload = function (file) {
    if (!file.size) {
        return Vue.prototype.$message.warning('文件异常')
    }
    const limitSize = 100 * 1024 * 1024; // 100M
    if (file.size > limitSize) {
        Vue.prototype.$message.warning('文件超出最大限制')
        return false
    }

    return true
}

// 获取扩展名
export const getSuffix = (filename) => {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos + 1)
    }
    return suffix;
}

// 非生产环境日志
export const log = function () {
    if (process.env.NODE_ENV !== 'production') {
        console.log.call(this, ...arguments)
    }
}
export const warn = function () {
    if (process.env.NODE_ENV !== 'production') {
        console.warn.call(this, ...arguments)
    }
}
export const error = function () {
    if (process.env.NODE_ENV !== 'production') {
        console.error.call(this, ...arguments)
    }
}


/*
 * 函数节流
 * @method: 函数体; @delay: 过滤执行间隔; @duration: 至少执行一次的间隔
 */
export const throttle = function throttle(method, delay, duration) {
    let timer = null,
        begin = new Date();
    delay = delay ? delay : 128;
    duration = duration ? duration : 1000;
    return function () {
        let context = this,
            args = arguments,
            current = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    };
};