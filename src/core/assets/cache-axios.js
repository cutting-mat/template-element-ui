import axios from 'axios';

const axiosCreate = axios.create;
let axiosGet;

// 请求缓存对象
let responseCache = {}

axios.create = function (config) {
    let instance = axiosCreate(config);
    axiosGet = instance.get;

    instance.get = function (url, params, opt) {
        /**
         * get请求缓存功能
         * @param url[String] 请求地址
         * @param params[Object] 请求参数
         * @param opt[Object] 扩展配置，默认值{cache: true}
         * @return [Promise] 请求Promse
         * */

        opt = Object.assign({
            cache: false
        }, opt || {})

        let paramsStr = (Object.prototype.toString.call(params) === '[object Object]') ? JSON.stringify(params) : ''
        let requestKey = (`request_${url}?${paramsStr}`)

        if (opt.cache) {
            if (!responseCache[requestKey]) {
                console.log('cache-axios create cache:', requestKey)
                responseCache[requestKey] = axiosGet(url, params)
                responseCache[requestKey].catch(() => {
                    delete responseCache[requestKey];
                })
            }else{
                console.log('cache-axios use cache:', requestKey)
            }
            
            return responseCache[requestKey]
        } else {
            if(responseCache[requestKey]){
                console.log('cache-axios clear cache:', requestKey)
                delete responseCache[requestKey];
            }
            
            return axiosGet(url, params)
        }
    }

    return instance;
}

export default axios;
