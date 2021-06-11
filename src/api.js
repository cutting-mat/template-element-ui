import axios from 'axios';
import * as util from '@/main/assets/util';
// 环境配置
const ENVIRONMENT = {
    mock: 'http://rap2api.taobao.org/app/mock/223572',
    dev: 'http://zjsz.kaifa/japi',
    test: 'http://test.com/api',
    master: '//master.com/api'
};

const HASH = {
    "dev.com": ENVIRONMENT.dev,
    "test.com": ENVIRONMENT.test,
    "master.com": ENVIRONMENT.master
}

export const baseURL = HASH[window.location.host] || ENVIRONMENT.dev;
// 统一请求实例
export const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求前处理
instance.interceptors.request.use(function (config) {
    if(config.method==='get' || config.method==='delete'){
        // 过滤get和delete请求中的空字符参数
        for(let x in config.params){
            if(config.params[x]===''){
                config.params[x] = null
                console.log(`[${config.method} ${config.url}]参数[${x}]由''重置为null`)
            }
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应后处理
instance.interceptors.response.use(function (response) {
    if (response.status != 200) {
        return util.catchError(response);
    }
    if(response.data.code === 500 && response.data.msg) {
        // 业务失败抛错
        return util.catchError({response})
    }
    
    if (response.headers['jwt-update-token']) {
        // token临近过期，后端重新签发token
        util.emit('login', {
            silent: true,
            data: {
                accessToken: response.headers['jwt-update-token']
            }
        })
    }
    return response;
}, function (error) {
    return util.catchError(error);
});