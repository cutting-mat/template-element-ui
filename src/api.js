import axios from 'axios';
import qs from 'qs';
import * as util from '@/common/assets/util';

const HOST = {
    mock: 'http://rap2api.taobao.org/app/mock/223572',
    dev: 'http://ysxt.kaifa/japi',
    test: 'http://test.com/api',
    master: '//master.com/api'
};

const HASH = {
    "test.com": HOST.test,
    "master.com": HOST.master
}

export const baseURL = HASH[window.location.host] || HOST.dev;

export const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false, skipNulls: true })
    }
});

// 请求处理
instance.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 响应处理
instance.interceptors.response.use(function(response) {
    if (response.status != 200) {
        return util.catchError(response);
    }
    // token续期
    if (response.headers['jwt-update-token']) {
        util.emit('login', {
            silent: true,
            data: {
                accessToken: response.headers['jwt-update-token']
            }
        })
    }
    return response;
}, function(error) {
    return util.catchError(error);
});