import axios from 'axios';

// 请求缓存对象
let responseCache = {}

const cacheAxios = {
    instance: null,
    create: function (config) {
        /**
         * 创建/设置请求实例
         * @param config[axiosInstance | Object] axios实例 或者 axios实例化参数
         * @return [axiosInstance] axios实例
         * */

        if (config && config.interceptors) {
            this.instance = config
        } else {
            this.instance = axios.create(config);
        }

        return this.instance;
    },
    get: function (url, params, opt) {
        /**
         * get请求缓存功能
         * @param url[String] 请求地址
         * @param params[Object] 请求参数
         * @param opt[Object] 扩展配置，默认值{cache: true}
         * @return [Promise] 请求Promse
         * */

        if (!this.instance) {
            return console.warn('cache-axios: 先调用create()初始化axios实例')
        }
        opt = Object.assign({
            cache: false,
            instance: this.instance
        }, opt || {})

        let paramsStr = (Object.prototype.toString.call(params) === '[object Object]') ? JSON.stringify(params) : ''
        let requestKey = (`request_${url}?${paramsStr}`)

        if (opt.cache) {
            // console.log('希望缓存')
            if (!responseCache[requestKey]) {
                // console.log('无缓存')
                responseCache[requestKey] = this.instance.get(url, params)
            }
            responseCache[requestKey].catch(() => {
                delete responseCache[requestKey];
            })
            return responseCache[requestKey]
        } else {
            //console.log('无需缓存')
            delete responseCache[requestKey];
            return this.instance.get(url, params)
        }
    }
}

export default cacheAxios;
