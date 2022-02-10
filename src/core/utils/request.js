import Vue from 'vue'
//import axios from 'axios';
import axios from '@cutting-mat/axios';
import { util } from '@/core'
import requestConfig from '@/request.config';

// 创建请求实例
const instance = axios.create(requestConfig);

// 请求前处理
instance.interceptors.request.use(function (config) {
    if (config.method === 'get' || config.method === 'delete') {
        // 过滤get和delete请求中的空字符参数
        for (let x in config.params) {
            if (config.params[x] === '') {
                config.params[x] = null
                console.log(`[${config.method} ${config.url}]参数[${x}]由''重置为null`)
            }
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


/**
 * 请求错误处理
 * @param error[axios正常或异常返回数据] 所有服务器捕获的错误，约定返回数据中用msg字段携带错误信息；
 * @return 401状态码会触发登出操作，其他异常状态码只做提醒
*/
const catchError = function (error) {

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
                        util.emit('logout')
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

// 响应后处理
instance.interceptors.response.use(function (response) {
    // 请求失败处理
    if (response.status != 200) {
        return catchError(response);
    }
    // 业务失败处理
    if (response.data.code === 500 && response.data.msg) {
        return catchError({ response })
    }
    // token临近过期，重新签发token
    if (response.headers['jwt-update-token']) {
        util.emit('login', {
            silent: true,
            data: {
                accessToken: response.headers['jwt-update-token']
            }
        })
    }
    return response;
}, function (error) {
    return catchError(error);
});

export default instance;
