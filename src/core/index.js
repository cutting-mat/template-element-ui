import Vue from 'vue'

/**
 * 本地存储
 * @param key[String] 要存/取的键
 * @param value[any] 要存的值，若缺省则返回key的值
 * @return 只传key会返回该key的值
 * */
export const storage = function (key, value) {
    const store = localStorage;
    key = `${process.env.VUE_APP_STORAGE_SPACE || process.env.BASE_URL}_${key}`;           // 防止项目之间存储混淆
    if (value === void (0)) {
        let lsVal = store.getItem(key);
        if (lsVal && lsVal.indexOf('autostringify-') === 0) {
            return JSON.parse(lsVal.split('autostringify-')[1]);
        } else {
            return lsVal;
        }
    } else {
        if ((Object.prototype.toString.call(value) === '[object Object]') || Array.isArray(value)) {
            value = 'autostringify-' + JSON.stringify(value);
        }
        return store.setItem(key, value);
    }
}

/**
 * 对象/数组深拷贝
 * @param source[Object|Array] 要拷贝的对象
 * @return 深拷贝后的对象/数组
 * */
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

/**
 * 一维对象数组转树形结构
 * @param array[对象数组] 对象数组中的对象必须包含id和[parentKey]键，如{id: 1, pid: 0}。pid值为假或等于自身id，则判定为一级节点
 * @param parentKey[String] 指向上级id的key，默认"pid"
 * @param sortFunction[Function] 用于arrayObject.sort(sortFunction)的排序方法，默认不排序
 * @return 由children键建立层级的对象数组
 * */
export const buildTree = function (flatArray, parentKey, sortFunction) {
    let array = deepcopy(flatArray);
    parentKey = parentKey || 'pid';

    let _cleanIndexQueue = [];
    let _learnQueue = function(){
        if (_cleanIndexQueue.length) {
            array = array.filter((e, i) => {
                return _cleanIndexQueue.indexOf(i) === -1
            })
        }
    }
    let menuData = [];
    let indexKeys = Array.isArray(array) ? array.map((e) => {
        return e.id
    }) : [];

    //一级节点
    array.forEach(function (e, index) {
        if (!e[parentKey] || (e[parentKey] === e.id)) {
            menuData.push(deepcopy(e)); //深拷贝
            _cleanIndexQueue.push(index)
        } else {
            //检测parentKey有效性
            if (indexKeys.indexOf(e[parentKey]) === -1) {
                menuData.push(deepcopy(e));
                _cleanIndexQueue.push(index)
            }
        }
    });
    // 清理元素队列
    _learnQueue()
    // 一级节点排序
    if(typeof sortFunction === 'function'){
        menuData.sort(sortFunction)
    }
    // 遍历子级
    let findChildren = function (parentArr) {
        if (Array.isArray(parentArr) && parentArr.length) {
            parentArr.forEach(function (parentNode) {
                _cleanIndexQueue = [];
                array.forEach((e, targetChildIndex) => {
                    if (e[parentKey] === parentNode.id) {
                        if (Array.isArray(parentNode.children)) {
                            parentNode.children.push(array[targetChildIndex]);
                        } else {
                            parentNode.children = [array[targetChildIndex]];
                        }
                        _cleanIndexQueue.push(targetChildIndex)
                    }
                })
                // 清理元素队列
                _learnQueue()

                if (Array.isArray(parentNode.children)) {
                    // 子级排序
                    if(typeof sortFunction === 'function'){
                        parentNode.children.sort(sortFunction)
                    }
                    
                    findChildren(parentNode.children);
                }
            });
        }
    };
    findChildren(menuData);
    return menuData;
}

/**
 * 日期格式化
 * @param value[milliseconds/dateString] 可以通过new Date()方法创建日期对象的毫秒数或日期字符串
 * @param fmt[String/undefined] 日期格式化模板字符串，内置四种快捷方式："year","month","day","day-time" 
 * @return 格式化后的日期字符串
 * */
export const formatDate = (value, fmt) => {
    if (!value) {
        return null
    }
    if (fmt === void (0)) {
        fmt = 'day-time'
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
        case 'day-time':
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

/**
 * 全局事件
 * 特性：
 * 1. 重复注册同一个事件，只保留最后一次。使单页面应用反复进入页面不会重复注册事件
 * 2. 可以通过别名方式将一个事件多次注册。在1的前提下允许同一个事件多次注册
*/
const bus = new Vue();
let busQueue = {};
/**
 * 全局事件监听
 * @param eventName[String] 自定义事件名称，支持用双下划线添加别名，如 eventName__ANYSTRING
 * @param eventHandle[Function] 事件回调方法，参数接收触发事件方法发送的参数；如果不传将关闭该事件监听
*/
export const on = function (eventName, eventHandle) {
    if (eventName && eventName.split) {
        if (busQueue[eventName]) {
            bus.$off(eventName, busQueue[eventName])
        }
        if (typeof eventHandle === 'function') {
            busQueue[eventName] = eventHandle;
            return bus.$on(eventName, eventHandle)
        } else {
            bus.$off(eventName)
        }
    }
};
/**
 * 全局事件触发
 * @param eventName[String] 要触发的事件名称，不需要包含别名部分，如 myEvent__alias1，只需要传入 myEvent
 * @param msg[any] 触发事件时携带的参数
*/
export const emit = function (eventName, msg) {
    const busQueueKeys = Object.keys(busQueue);
    busQueueKeys.forEach(key => {
        if (eventName === key.split('__')[0]) {
            return bus.$emit(key, msg)
        }
    })
};

/**
 * ajax错误处理
 * @param error[axios正常或异常返回数据] 所有服务器捕获的错误，约定返回数据中用msg字段携带错误信息；
 * @return 401状态码会触发登出操作，其他异常状态码只做提醒
*/
export const catchError = function (error) {

    //原生错误对象
    if (error.response) {
        // that falls out of the range of 2xx
        switch (error.response.status) {
            case 400:
                Vue.prototype.$message({
                    message: error.response.data.msg || '请求参数异常',
                    type: 'error'
                });
                break;
            case 401:

                Vue.prototype.$message({
                    message: error.response.data.msg || '未授权或授权已过期',
                    type: 'warning',
                    onClose: function () {
                        emit('logout')
                    }
                });
                break;
            case 403:
                Vue.prototype.$message({
                    message: error.response.data.msg || '无访问权限，请联系企业管理员',
                    type: 'warning'
                });
                break;
            default:
                Vue.prototype.$message({
                    message: error.response.data.msg || '服务端异常，请联系技术支持',
                    type: 'error'
                });
        }
    } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
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

/**
 * 提取文件名中的扩展名
 * @param filename[String] 要提取扩展名的字符串
 * @return 转小写后的扩展名字符串
*/
export const getSuffix = (filename) => {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos + 1)
    }
    return suffix.toLowerCase();
}

/**
 * 函数节流
 * @param method[Function] 要节流的函数方法
 * @param delay[Number] 过滤执行的间隔毫秒数，默认128
 * @param duration 至少执行一次的间隔毫秒数，默认1000
 * @return 具有节流特性的新函数
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

/**
 * 获取url中的query值
 * @param keyName[String] 要获取的参数名
 * @param url[String] 目标url，默认当前窗口url
 * @return keyName参数的值
*/
export const getUrlParam = function (keyName, url) {
    if (keyName && keyName.split) {
        var urlParamReg = new RegExp("(^|&)" + keyName + "=([^&#]*)", "i");
        var s = (url ? url : window.location.href).split('?')[1] || '';
        var r = s.match(urlParamReg);
        if (r !== null) {
            return decodeURI(r[2]);
        }
    }

    return null;
};

/**
 * 从axios请求函数中提取请求信息
 * @param axiosRequest[Function] axios请求方法
 * @return 请求信息字符串，例如 'get,/url1'
 * */
export const matchRequest = function (axiosRequest) {
    let result = null;
    if (typeof axiosRequest === 'function') {
        let regex = new RegExp(/\.([^(]+)\("([^"]+)"/); // 匹配请求函数：instance.post("/org", params)
        result = axiosRequest.toString().match(regex);
        if (result && result.length > 2) {
            result = [result[1], result[2]].join(",")
        }
    }
    return result
}

/**
 * 为axios扩展请求缓存功能
 * @param axiosRequest[Function] axios请求方法
 * @param params[Object] axios请求参数
 * @param opt[Object] 扩展配置，默认值{cache: false}
 * @return 携带请求响应的Promse对象
 * */
let responseCache = {};
let requestQueue = {}
export const requestWrapper = function (axiosRequest, params, opt) {
    opt = Object.assign({
        cache: false
    }, opt || {})
    let requestStr = matchRequest(axiosRequest)
    if (!requestStr) {
        return console.warn('requestWrapper解析失败：', axiosRequest)
    }
    let paramsStr = (Object.prototype.toString.call(params) === '[object Object]') ? JSON.stringify(params) : ''
    let requestKey = (`request_${requestStr}?${paramsStr}`)
    return new Promise((resolve, reject) => {
        if (requestQueue[requestKey]) {
            //console.log('并发情况，无条件等待缓存')
            bus.$once(requestKey, res => {
                resolve(res)
            })
        } else {
            if (opt.cache && responseCache[requestKey]) {
                //console.log('希望缓存且有缓存')
                resolve(responseCache[requestKey])
            } else {
                //console.log('无需缓存或无缓存')
                requestQueue[requestKey] = true;
                return axiosRequest(params).then(res => {
                    responseCache[requestKey] = res;
                    resolve(res)
                    bus.$emit(requestKey, responseCache[requestKey])
                    delete requestQueue[requestKey]
                }).catch(err => {
                    delete requestQueue[requestKey]
                    reject(err)
                })
            }
        }
    })
}